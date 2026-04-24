#!/usr/bin/env python3
"""
fetch_research.py  v4
---------------------
Fuente única: OpenAlex API (https://openalex.org)
  - Completamente libre, sin API key
  - Usa tu ORCID directamente → papers exactamente los tuyos
  - Incluye cited_by_count por paper sin rate limit severo
  - h-index y métricas globales del autor también desde OpenAlex

Uso:
    python3 scripts/fetch_research.py
"""

import json, re, time, os
from collections import Counter, defaultdict
from datetime import date
import urllib.request, urllib.parse, urllib.error

# ── Configuración ─────────────────────────────────────────────────────────────
AUTHOR_NAME   = "David Sierra-Porta"
ORCID         = "0000-0003-3461-1347"
SCOPUS_ID     = "57191333650"
CONTACT_EMAIL = "sierraporta@utb.edu.co"   # OpenAlex pide polite pool email

# DOIs que OpenAlex no vincula automáticamente a tu ORCID.
# Agrégalos aquí manualmente cuando detectes que faltan.
EXTRA_DOIS = [
    "10.1109/ENO-CANCOA61307.2024.10751134","10.1016/j.jsames.2021.103248","10.1016/j.scs.2024.106076",
    "10.1063/5.0167156","10.1016/j.physa.2022.128159","10.33232/001c.159506","10.1371/journal.pone.0327716",
    "10.1016/j.asr.2024.10.065","10.1016/j.chaos.2024.115089","10.1088/1748-0221/15/09/P09006",
    "10.3847/1538-4357/ac92ea","10.37773/ees.v9i1.1691","10.1016/j.asr.2024.08.031","10.1016/j.jastp.2025.106661",
    "10.1016/j.jastp.2024.106407","10.1016/j.ascom.2024.100857","10.1016/j.asr.2023.02.044","10.1007/s10509-022-04151-5",
    "10.1007/s10509-018-3360-8","10.1109/ENO-CANCOA61307.2024.10751088","10.1080/01431161.2024.2373338",
    "10.1016/j.dib.2025.112076","10.1016/j.asr.2025.09.072","10.1134/S1995423918020076",
    "10.1002/clen.202200222","10.33232/001c.159191","10.1016/j.jastp.2025.106418","10.1007/s42417-019-00170-9",
    "10.3847/1538-3881/accff8","10.33232/001c.157585","10.1016/j.compbiomed.2025.110599","10.4401/ag-8353",
    "10.1007/s40710-020-00426-7","10.1103/PhysRevD.91.064015","10.1088/0305-4470/39/4/L03",
    "10.1016/j.asr.2026.02.010","10.1016/j.dib.2023.109728","10.31349/RevMexFis.20.020208","10.3847/1538-4357/aca5fa"
]


OA_BASE    = "https://api.openalex.org"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "research.json")

# ── Tipos a excluir ───────────────────────────────────────────────────────────
#SKIP_TYPES = {"dataset", "paratext", "libguides", "supplementary-materials"}
SKIP_TYPES = {}

TYPE_LABELS = {
    "article":          "Journal Article",
    "journal-article":  "Journal Article",
    "proceedings-article": "Conference Paper",
    "book-chapter":     "Book Chapter",
    "book":             "Book",
    "preprint":         "Preprint",
    "dissertation":     "Dissertation",
    "review":           "Review",
    "editorial":        "Editorial",
    "letter":           "Letter",
    "erratum":          "Erratum",
    "other":            "Other",
}

# ── SDG mapping ───────────────────────────────────────────────────────────────
SDG_KEYWORDS = {
    1:  {"poverty","income","inequality","social protection","vulnerable"},
    2:  {"food","hunger","agriculture","nutrition","crop","famine"},
    3:  {"health","disease","mortality","epidemic","medicine","pandemic","cancer"},
    4:  {"education","learning","school","literacy","training","pedagogy"},
    5:  {"gender","women","equality","feminist","girls","discrimination"},
    6:  {"water","sanitation","drought","groundwater","irrigation","hydrology"},
    7:  {"energy","solar","wind","renewable","photovoltaic","electricity"},
    8:  {"employment","economic growth","labour","productivity","gdp","decent work"},
    9:  {"infrastructure","innovation","industry","technology","manufacturing"},
    10: {"inequality","inclusion","migration","refugees"},
    11: {"urban","city","sustainable cities","transport","housing","mobility"},
    12: {"consumption","production","waste","recycling","circular economy"},
    13: {"climate","greenhouse","emission","carbon","warming","meteorology","atmosphere",
         "cosmic ray","forbush","space weather","solar wind","geomagnetic","cosmic"},
    14: {"ocean","marine","sea","coral","fisheries","aquatic"},
    15: {"forest","ecosystem","terrestrial","biodiversity","land","species","vegetation"},
    16: {"peace","justice","institution","governance","corruption","violence"},
    17: {"partnership","global","cooperation","international","sustainable development"},
}
SDG_LABELS = {
    1:"No Poverty", 2:"Zero Hunger", 3:"Good Health and Well-being",
    4:"Quality Education", 5:"Gender Equality", 6:"Clean Water and Sanitation",
    7:"Affordable and Clean Energy", 8:"Decent Work and Economic Growth",
    9:"Industry, Innovation and Infrastructure", 10:"Reduced Inequalities",
    11:"Sustainable Cities and Communities",12:"Responsible Consumption and Production",
    13:"Climate Action", 14:"Life Below Water", 15:"Life on Land",
    16:"Peace, Justice and Strong Institutions", 17:"Partnerships for the Goals",
}

STOP = {
    "the","a","an","of","in","for","on","and","to","with","using","based",
    "via","from","its","by","as","at","is","are","this","that","we","our",
    "new","high","low","data","analysis","study","method","approach","model",
    "results","paper","through","during","between","after","over","into",
    "their","within","has","been","was","were","have","use","used","two",
    "three","first","second","different","large","small","simple","one",
}

# ── HTTP helper ───────────────────────────────────────────────────────────────

def oa_get(path: str, params: dict = {}) -> dict:
    params["mailto"] = CONTACT_EMAIL
    url = f"{OA_BASE}/{path}?{urllib.parse.urlencode(params)}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": f"research-profile/4.0 (mailto:{CONTACT_EMAIL})"}
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 15 * (attempt + 1)
                print(f"     rate limit — esperando {wait}s…")
                time.sleep(wait)
            elif e.code in (404, 400):
                return {}
            else:
                print(f"     HTTP {e.code}: {url}")
                return {}
        except Exception as ex:
            print(f"     error: {ex}")
            return {}
    return {}

# ── Reconstruir abstract desde inverted index de OpenAlex ────────────────────

def reconstruct_abstract(inverted: dict | None) -> str:
    if not inverted:
        return ""
    try:
        pos_word = {}
        for word, positions in inverted.items():
            for p in positions:
                pos_word[p] = word
        words = [pos_word[i] for i in sorted(pos_word)]
        return " ".join(words)[:400]
    except Exception:
        return ""

# ── OpenAlex: autor ───────────────────────────────────────────────────────────

def fetch_author_stats() -> dict:
    print("  → Métricas del autor desde OpenAlex…")
    data = oa_get(f"authors/https://orcid.org/{ORCID}")
    summary = data.get("summary_stats", {})
    return {
        "h_index":        summary.get("h_index", 0),
        "citation_count": data.get("cited_by_count", 0),
        "oa_id":          data.get("id", ""),
        "affiliation":    "Universidad Tecnológica de Bolívar",
    }

# ── OpenAlex: works con cursor paging ────────────────────────────────────────

def fetch_all_works() -> list[dict]:
    print("  → Descargando works desde OpenAlex (ORCID filter)…")
    works   = []
    cursor  = "*"
    per_page = 200

    while True:
        data = oa_get("works", {
            "filter":   f"author.orcid:{ORCID}",
            "per-page": per_page,
            "cursor":   cursor,
            "select":   "title,publication_year,cited_by_count,doi,primary_location,"
                        "type,keywords,abstract_inverted_index,authorships",
            "sort":     "publication_year:desc",
        })

        results = data.get("results", [])
        if not results:
            break

        total = data.get("meta", {}).get("count", "?")
        for w in results:
            work_type = (w.get("type") or "other").lower()
            if work_type in SKIP_TYPES:
                continue

            # DOI — limpiar prefijo URL si viene con https://doi.org/
            raw_doi = w.get("doi") or ""
            doi = raw_doi.replace("https://doi.org/", "").replace("http://doi.org/", "")

            # Journal
            primary = w.get("primary_location") or {}
            source  = primary.get("source") or {}
            journal = source.get("display_name", "") or ""

            # Keywords (OpenAlex devuelve lista de objetos)
            kw_raw  = w.get("keywords") or []
            keywords = [k.get("display_name", "") for k in kw_raw if k.get("display_name")]

            # Abstract
            abstract = reconstruct_abstract(w.get("abstract_inverted_index"))

            # Prefer journal volume year over epub year when available
            pub_year = w.get("publication_year")
            primary_loc = w.get("primary_location") or {}
            # published_date in primary_location is the formal journal date
            formal_date = primary_loc.get("published_date") or w.get("publication_date") or ""
            if formal_date and len(formal_date) >= 4:
                formal_year = int(formal_date[:4])
                # Only update if formal year is later (epub→print) and plausible
                if formal_year > (pub_year or 0) and formal_year <= date.today().year + 1:
                    pub_year = formal_year

            works.append({
                "title":    (w.get("title") or "").strip(),
                "year":     pub_year,
                "journal":  journal,
                "doi":      doi,
                "cited_by": w.get("cited_by_count", 0) or 0,
                "keywords": keywords,
                "abstract": abstract,
                "type":     TYPE_LABELS.get(work_type, "Other"),
            })

        print(f"     descargados {len(works)}/{total}")

        next_cursor = data.get("meta", {}).get("next_cursor")
        if not next_cursor or len(results) < per_page:
            break
        cursor = next_cursor
        time.sleep(0.2)

    print(f"     {len(works)} works (sin datasets ni paratextos)")
    return works

# ── Análisis ──────────────────────────────────────────────────────────────────

def publications_by_year(works):
    c = Counter(w["year"] for w in works if w["year"])
    if not c: return {}
    return {str(y): c.get(y, 0) for y in range(min(c), max(c)+1)}

def citation_trend(works):
    by_year = defaultdict(int)
    for w in works:
        if w["year"] and w["cited_by"]:
            by_year[str(w["year"])] += w["cited_by"]
    return dict(sorted(by_year.items()))

def compute_fingerprint(works, top_n=24):
    kw_counts = Counter()
    for w in works:
        bag = set()
        for kw in (w.get("keywords") or []):
            kw = kw.lower().strip()
            if kw and kw not in STOP and len(kw) > 2:
                bag.add(kw)
        for word in re.findall(r"[a-záéíóú]{3,}", (w.get("title") or "").lower()):
            if word not in STOP:
                bag.add(word)
        kw_counts.update(bag)
    if not kw_counts:
        return []
    top = kw_counts.most_common(top_n)
    mx  = top[0][1]
    return [{"term": kw, "score": round(100*cnt/mx)} for kw, cnt in top]

def compute_sdgs(works):
    hits = Counter()
    for w in works:
        text = " ".join([
            w.get("title", ""),
            " ".join(w.get("keywords", [])),
            w.get("abstract", ""),
        ]).lower()
        for sdg_id, kws in SDG_KEYWORDS.items():
            if sum(1 for kw in kws if kw in text) >= 2:
                hits[sdg_id] += 1
    if not hits:
        return []
    mx = max(hits.values())
    return [
        {"id": i, "name": SDG_LABELS[i], "score": round(100*h/mx), "hits": h}
        for i, h in sorted(hits.items(), key=lambda x: -x[1]) if h > 0
    ]

# ── Main ──────────────────────────────────────────────────────────────────────


def fetch_extra_works(existing_dois: set) -> list[dict]:
    """Fetches works by DOI that OpenAlex didn't link to the ORCID profile."""
    if not EXTRA_DOIS:
        return []
    print("  → Buscando works extra por DOI…")
    extras = []
    for doi in EXTRA_DOIS:
        if doi.lower() in existing_dois:
            print(f"     ya incluido: {doi}")
            continue
        data = oa_get(f"works/https://doi.org/{doi}")
        if not data or "error" in data:
            print(f"     no encontrado en OpenAlex: {doi}")
            continue
        work_type = (data.get("type") or "other").lower()
        raw_doi = (data.get("doi") or "").replace("https://doi.org/","")
        primary = data.get("primary_location") or {}
        source  = (primary.get("source") or {})
        journal = source.get("display_name","") or ""
        kw_raw  = data.get("keywords") or []
        keywords = [k.get("display_name","") for k in kw_raw if k.get("display_name")]
        abstract = reconstruct_abstract(data.get("abstract_inverted_index"))
        TYPE_LABELS_LOCAL = {
            "article":"Journal Article","journal-article":"Journal Article",
            "proceedings-article":"Conference Paper","book-chapter":"Book Chapter",
            "preprint":"Preprint","other":"Other",
        }
        extras.append({
            "title":    (data.get("title") or "").strip(),
            "year":     data.get("publication_year"),
            "journal":  journal,
            "doi":      raw_doi,
            "cited_by": data.get("cited_by_count",0) or 0,
            "keywords": keywords,
            "abstract": abstract,
            "type":     TYPE_LABELS_LOCAL.get(work_type,"Other"),
        })
        print(f"     añadido: {data.get('title','')[:60]}…")
        time.sleep(0.2)
    return extras

def main():
    print("📡 Generando research.json — OpenAlex API\n")

    stats = fetch_author_stats()
    works = fetch_all_works()
    existing_dois = {w["doi"].lower() for w in works if w["doi"]}
    extras = fetch_extra_works(existing_dois)
    if extras:
        works.extend(extras)
        works.sort(key=lambda w: (w["year"] or 0), reverse=True)
        print(f"     +{len(extras)} works extra añadidos → total: {len(works)}")

    print("\n🔬 Calculando fingerprint, SDGs y estadísticas…")

    payload = {
        "generated_at": date.today().isoformat(),
        "author": {
            "name":           AUTHOR_NAME,
            "scopus_id":      SCOPUS_ID,
            "orcid":          ORCID,
            "scopus_url":     f"https://www.scopus.com/authid/detail.uri?authorId={SCOPUS_ID}",
            "orcid_url":      f"https://orcid.org/{ORCID}",
            "h_index":        stats["h_index"],
            "citation_count": stats["citation_count"],
            "document_count": len(works),
            "affiliation":    stats["affiliation"],
        },
        "publications_by_year": publications_by_year(works),
        "citation_trend":       citation_trend(works),
        "fingerprint":          compute_fingerprint(works),
        "sdgs":                 compute_sdgs(works),
        "publications":         works,
    }

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    by_year = payload["publications_by_year"]
    recent  = {k: v for k, v in by_year.items() if int(k) >= 2020}
    print(f"\n✅  {len(works)} works → {OUTPUT_PATH}")
    print(f"    h-index  : {stats['h_index']}")
    print(f"    citas    : {stats['citation_count']}")
    print(f"    2020-hoy : {recent}")

if __name__ == "__main__":
    main()
