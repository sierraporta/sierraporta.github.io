#!/usr/bin/env python3
"""
fetch_scopus.py
---------------
Fetches publication data from the Scopus API for a given author
and generates a self-contained `data/research.json` file consumed
by the research-widgets.js front-end.

Usage:
    python scripts/fetch_scopus.py

Environment variables:
    SCOPUS_API_KEY   — Elsevier Developer Portal API key (required)

Author: sierraporta.github.io
"""

import os
import json
import math
import re
import time
from collections import Counter, defaultdict
from datetime import date
import urllib.request
import urllib.parse
import urllib.error

# ─── Configuration ────────────────────────────────────────────────────────────
AUTHOR_ID   = "57191333650"
AUTHOR_NAME = "David Sierra-Porta"
ORCID       = "0000-0003-3461-1347"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "research.json")

API_KEY     = os.environ.get("SCOPUS_API_KEY", "")
BASE_URL    = "https://api.elsevier.com/content"
MAX_RESULTS = 200   # Scopus allows up to 200 per page

# ─── SDG keyword mapping ──────────────────────────────────────────────────────
# Each SDG is mapped to a set of discriminating keywords. A publication
# contributes to an SDG when ≥2 of its keywords/title words match the set.
SDG_KEYWORDS = {
    1:  {"poverty","income","inequality","social protection","vulnerable","livelihood"},
    2:  {"food","hunger","agriculture","nutrition","crop","farming","yield","famine"},
    3:  {"health","disease","mortality","epidemic","medicine","pandemic","cancer","mental"},
    4:  {"education","learning","school","literacy","training","university","pedagogy"},
    5:  {"gender","women","equality","feminist","girls","discrimination"},
    6:  {"water","sanitation","drought","groundwater","aquifer","irrigation","hydrology"},
    7:  {"energy","solar","wind","renewable","photovoltaic","electricity","geothermal"},
    8:  {"employment","economic growth","labour","productivity","gdp","job","decent work"},
    9:  {"infrastructure","innovation","industry","technology","manufacturing","ict"},
    10: {"inequality","inclusion","migration","refugees","discriminat"},
    11: {"urban","city","sustainable cities","transport","housing","communities"},
    12: {"consumption","production","waste","recycling","circular economy","sustainable"},
    13: {"climate","greenhouse","emission","carbon","warming","meteorology","atmosphere"},
    14: {"ocean","marine","sea","coral","fisheries","biodiversity","aquatic"},
    15: {"forest","ecosystem","terrestrial","biodiversity","land","species","vegetation"},
    16: {"peace","justice","institution","governance","corruption","violence","security"},
    17: {"partnership","global","cooperation","international","aid","sustainable development"},
    # Physics / space science SDGs (less obvious but valid)
    # SDG 13 catches most cosmic-ray / space-weather work (atmosphere, climate)
}

SDG_LABELS = {
    1:"No Poverty", 2:"Zero Hunger", 3:"Good Health and Well-being",
    4:"Quality Education", 5:"Gender Equality", 6:"Clean Water and Sanitation",
    7:"Affordable and Clean Energy", 8:"Decent Work and Economic Growth",
    9:"Industry, Innovation and Infrastructure", 10:"Reduced Inequalities",
    11:"Sustainable Cities and Communities", 12:"Responsible Consumption and Production",
    13:"Climate Action", 14:"Life Below Water", 15:"Life on Land",
    16:"Peace, Justice and Strong Institutions", 17:"Partnerships for the Goals",
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def scopus_get(endpoint: str, params: dict) -> dict:
    """GET request against the Scopus API with retry on 429."""
    params["apiKey"] = API_KEY
    url = f"{BASE_URL}/{endpoint}?{urllib.parse.urlencode(params)}"
    for attempt in range(3):
        try:
            req = urllib.request.Request(
                url,
                headers={"Accept": "application/json", "X-ELS-APIKey": API_KEY}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 2:
                time.sleep(10)
                continue
            raise
    return {}


def fetch_author_metrics() -> dict:
    """Retrieve h-index, citation count, document count."""
    print("  → Fetching author metrics…")
    data = scopus_get(f"author/author_id/{AUTHOR_ID}", {
        "field": "h-index,document-count,cited-by-count,affiliation-current"
    })
    profile = data.get("author-retrieval-response", [{}])[0]
    coredata = profile.get("coredata", {})
    affil = profile.get("affiliation-current", {}).get("affiliation", {})
    return {
        "h_index":        int(profile.get("h-index", 0)),
        "document_count": int(coredata.get("document-count", 0)),
        "citation_count": int(coredata.get("cited-by-count", 0)),
        "affiliation":    affil.get("ip-doc", {}).get("afdispname", "UTB"),
    }


def fetch_all_publications() -> list[dict]:
    """Retrieve all publications with full metadata (title, year, keywords, etc.)."""
    print("  → Fetching publications…")
    pubs = []
    start = 0
    count = 25   # start conservatively; increase after first page

    while True:
        data = scopus_get("search/scopus", {
            "query":  f"au-id({AUTHOR_ID})",
            "count":  count,
            "start":  start,
            "field":  "dc:title,prism:coverDate,prism:publicationName,"
                      "prism:doi,citedby-count,authkeywords,"
                      "dc:description,subtypeDescription,prism:aggregationType",
            "sort":   "coverDate"
        })

        results = data.get("search-results", {})
        entries = results.get("entry", [])
        if not entries or "error" in entries[0]:
            break

        for e in entries:
            year_str = e.get("prism:coverDate", "")[:4]
            raw_kws  = e.get("authkeywords", "") or ""
            keywords = [k.strip() for k in re.split(r"[|;,]", raw_kws) if k.strip()]
            pubs.append({
                "title":    e.get("dc:title", ""),
                "year":     int(year_str) if year_str.isdigit() else None,
                "journal":  e.get("prism:publicationName", ""),
                "doi":      e.get("prism:doi", ""),
                "cited_by": int(e.get("citedby-count", 0)),
                "keywords": keywords,
                "abstract": (e.get("dc:description", "") or "")[:400],
                "type":     e.get("subtypeDescription", "Article"),
                "category": e.get("prism:aggregationType", ""),
            })

        total = int(results.get("opensearch:totalResults", 0))
        start += len(entries)
        count  = MAX_RESULTS
        print(f"     fetched {start}/{total}")
        if start >= total:
            break
        time.sleep(0.3)   # be polite

    return pubs


# ─── Analysis ─────────────────────────────────────────────────────────────────

def publications_by_year(pubs: list[dict]) -> dict:
    counter = Counter(p["year"] for p in pubs if p["year"])
    if not counter:
        return {}
    years = range(min(counter), max(counter) + 1)
    return {str(y): counter.get(y, 0) for y in years}


def compute_fingerprint(pubs: list[dict], top_n: int = 20) -> list[dict]:
    """
    TF-IDF-inspired fingerprint: weight each keyword by how frequently it
    appears across the corpus and normalise to 100.
    """
    # stopwords to filter noise
    STOP = {"the","a","an","of","in","for","on","and","to","with","using",
            "based","via","from","its","by","as","at","is","are","this",
            "that","we","our","new","high","low","data","analysis","study",
            "method","approach","model","results","paper"}

    kw_counts: Counter = Counter()
    for p in pubs:
        bag = set()
        for kw in p["keywords"]:
            kw = kw.lower().strip()
            if kw and kw not in STOP and len(kw) > 2:
                bag.add(kw)
        # also pull bigrams from title
        words = re.findall(r"[a-z]{3,}", (p.get("title") or "").lower())
        for w in words:
            if w not in STOP:
                bag.add(w)
        kw_counts.update(bag)

    if not kw_counts:
        return []

    top = kw_counts.most_common(top_n)
    max_count = top[0][1]
    return [
        {"term": kw, "score": round(100 * cnt / max_count)}
        for kw, cnt in top
    ]


def compute_sdgs(pubs: list[dict]) -> list[dict]:
    """
    For each SDG, count publications whose combined text (title + keywords +
    abstract) contains ≥2 matching SDG keywords. Normalise hit count and
    return SDGs with score > 0, sorted descending.
    """
    sdg_hits: Counter = Counter()
    total = len(pubs) or 1

    for p in pubs:
        text = " ".join([
            (p.get("title") or ""),
            " ".join(p.get("keywords", [])),
            (p.get("abstract") or ""),
        ]).lower()

        for sdg_id, kws in SDG_KEYWORDS.items():
            matches = sum(1 for kw in kws if kw in text)
            if matches >= 2:
                sdg_hits[sdg_id] += 1

    if not sdg_hits:
        return []

    max_hits = max(sdg_hits.values())
    results = []
    for sdg_id, hits in sorted(sdg_hits.items(), key=lambda x: -x[1]):
        score = round(100 * hits / max_hits)
        if score > 0:
            results.append({
                "id":    sdg_id,
                "name":  SDG_LABELS[sdg_id],
                "score": score,
                "hits":  hits,
            })
    return results


def citation_trend(pubs: list[dict]) -> dict:
    """Citations per year (based on publication year — approximate)."""
    by_year: dict = defaultdict(int)
    for p in pubs:
        if p["year"]:
            by_year[str(p["year"])] += p["cited_by"]
    return dict(sorted(by_year.items()))


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    if not API_KEY:
        raise ValueError("SCOPUS_API_KEY environment variable is not set.")

    print("📡 Fetching data from Scopus…")
    metrics = fetch_author_metrics()
    pubs    = fetch_all_publications()

    print("🔬 Computing fingerprint, SDGs, and yearly stats…")
    payload = {
        "generated_at": date.today().isoformat(),
        "author": {
            "name":           AUTHOR_NAME,
            "scopus_id":      AUTHOR_ID,
            "orcid":          ORCID,
            "scopus_url":     f"https://www.scopus.com/authid/detail.uri?authorId={AUTHOR_ID}",
            "orcid_url":      f"https://orcid.org/{ORCID}",
            "h_index":        metrics["h_index"],
            "document_count": metrics["document_count"],
            "citation_count": metrics["citation_count"],
            "affiliation":    metrics["affiliation"],
        },
        "publications_by_year": publications_by_year(pubs),
        "citation_trend":       citation_trend(pubs),
        "fingerprint":          compute_fingerprint(pubs, top_n=24),
        "sdgs":                 compute_sdgs(pubs),
        "publications":         sorted(
            pubs, key=lambda p: (p["year"] or 0, p["cited_by"]), reverse=True
        ),
    }

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"✅ Wrote {len(pubs)} publications → {OUTPUT_PATH}")
    print(f"   h-index: {metrics['h_index']}  |  "
          f"citations: {metrics['citation_count']}  |  "
          f"docs: {metrics['document_count']}")


if __name__ == "__main__":
    main()
