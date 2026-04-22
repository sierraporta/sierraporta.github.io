/**
 * research-widgets.js  v2  —  Compact tabbed layout
 * ---------------------------------------------------
 * Un solo bloque con 4 tabs: Overview · Fingerprint · SDGs · Publications
 * Diseño minimalista, tipografía limpia, sin dependencias externas.
 */

(function () {
  "use strict";

  const DATA_URL = "/data/research.json";

  const SDG_COLORS = {
    1:"#E5243B",2:"#DDA63A",3:"#4C9F38",4:"#C5192D",5:"#FF3A21",
    6:"#26BDE2",7:"#FCC30B",8:"#A21942",9:"#FD6925",10:"#DD1367",
    11:"#FD9D24",12:"#BF8B2E",13:"#3F7E44",14:"#0A97D9",15:"#56C02B",
    16:"#00689D",17:"#19486A",
  };

  // ── CSS ──────────────────────────────────────────────────────────────────

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

    .rp-wrap {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: #1a1a2e;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      margin: 2rem 0;
      box-shadow: 0 2px 12px rgba(0,0,0,.06);
      background: #fff;
    }

    /* ── header ── */
    .rp-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .75rem 1.25rem;
      background: #0f172a;
      color: #fff;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .rp-author {
      font-size: .8rem;
      font-weight: 500;
      letter-spacing: .04em;
      text-transform: uppercase;
      opacity: .8;
    }
    .rp-metrics-inline {
      display: flex;
      gap: 1.5rem;
    }
    .rp-metric {
      text-align: center;
      line-height: 1.2;
    }
    .rp-metric-val {
      font-family: 'DM Mono', monospace;
      font-size: 1.2rem;
      font-weight: 500;
      color: #60a5fa;
    }
    .rp-metric-lbl {
      font-size: .62rem;
      opacity: .55;
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    /* ── tabs ── */
    .rp-tabs {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }
    .rp-tab {
      padding: .55rem 1rem;
      font-size: .78rem;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: color .15s, border-color .15s;
      user-select: none;
      white-space: nowrap;
    }
    .rp-tab:hover  { color: #1a1a2e; }
    .rp-tab.active { color: #1a1a2e; border-bottom-color: #2563eb; }

    /* ── panels ── */
    .rp-panels { padding: 1rem 1.25rem; min-height: 180px; }
    .rp-panel  { display: none; }
    .rp-panel.active { display: block; }

    /* ── overview: chart ── */
    .rp-chart-outer { overflow-x: auto; padding-bottom: .25rem; }
    .rp-chart {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 80px;
      min-width: 360px;
    }
    .rp-bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 14px;
      height: 100%;
      justify-content: flex-end;
      position: relative;
    }
    .rp-bar {
      width: 100%;
      background: #2563eb;
      border-radius: 2px 2px 0 0;
      transition: background .15s;
      position: relative;
      min-height: 2px;
    }
    .rp-bar:hover { background: #1d4ed8; }
    .rp-bar-tip {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      color: #fff;
      font-size: .65rem;
      padding: 1px 5px;
      border-radius: 3px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity .15s;
      z-index: 10;
    }
    .rp-bar:hover .rp-bar-tip { opacity: 1; }
    .rp-bar-yr {
      font-size: .55rem;
      color: #9ca3af;
      margin-top: 3px;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      line-height: 1;
    }
    .rp-chart-note {
      font-size: .7rem;
      color: #9ca3af;
      margin-top: .5rem;
      font-style: italic;
    }

    /* ── fingerprint ── */
    .rp-fp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: .35rem .8rem;
    }
    .rp-fp-row {
      display: flex;
      align-items: center;
      gap: .5rem;
    }
    .rp-fp-term {
      font-size: .75rem;
      font-weight: 500;
      min-width: 100px;
      color: #374151;
      text-transform: capitalize;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rp-fp-track {
      flex: 1;
      height: 5px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
    }
    .rp-fp-fill {
      height: 100%;
      background: linear-gradient(90deg,#2563eb,#7c3aed);
      border-radius: 3px;
    }
    .rp-fp-pct {
      font-family: 'DM Mono', monospace;
      font-size: .65rem;
      color: #9ca3af;
      min-width: 28px;
      text-align: right;
    }

    /* ── SDGs ── */
    .rp-sdg-row {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
    }
    .rp-sdg-chip {
      display: flex;
      align-items: center;
      gap: .4rem;
      border-radius: 6px;
      padding: .3rem .6rem;
      font-size: .72rem;
      font-weight: 500;
      color: #fff;
      cursor: default;
      transition: transform .15s;
    }
    .rp-sdg-chip:hover { transform: translateY(-1px); }
    .rp-sdg-num {
      font-family: 'DM Mono', monospace;
      font-size: .9rem;
      font-weight: 600;
      opacity: .9;
    }
    .rp-sdg-name { opacity: .92; line-height: 1.2; max-width: 120px; }
    .rp-sdg-bar-wrap {
      width: 36px;
      height: 4px;
      background: rgba(255,255,255,.3);
      border-radius: 2px;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
    }
    .rp-sdg-bar { height: 100%; background: rgba(255,255,255,.85); }
    .rp-sdg-note {
      font-size: .7rem;
      color: #9ca3af;
      margin-top: .75rem;
      font-style: italic;
    }

    /* ── publications ── */
    .rp-pub-ctrl {
      display: flex;
      gap: .5rem;
      margin-bottom: .75rem;
      flex-wrap: wrap;
    }
    .rp-pub-ctrl input,
    .rp-pub-ctrl select {
      padding: .3rem .6rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: .78rem;
      font-family: inherit;
      outline: none;
      color: #374151;
      background: #f9fafb;
    }
    .rp-pub-ctrl input { flex: 1; min-width: 150px; }
    .rp-pub-ctrl input:focus,
    .rp-pub-ctrl select:focus { border-color: #2563eb; background: #fff; }

    .rp-pub-list { list-style: none; padding: 0; margin: 0; }
    .rp-pub-item {
      padding: .55rem 0;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      gap: .7rem;
      align-items: baseline;
    }
    .rp-pub-item:last-child { border-bottom: none; }
    .rp-pub-year {
      font-family: 'DM Mono', monospace;
      font-size: .7rem;
      color: #9ca3af;
      min-width: 30px;
      flex-shrink: 0;
    }
    .rp-pub-content { flex: 1; }
    .rp-pub-title {
      font-size: .82rem;
      font-weight: 500;
      color: #1a1a2e;
      line-height: 1.35;
      margin-bottom: .15rem;
    }
    .rp-pub-title a {
      color: inherit;
      text-decoration: none;
    }
    .rp-pub-title a:hover { color: #2563eb; }
    .rp-pub-meta {
      font-size: .7rem;
      color: #9ca3af;
      display: flex;
      gap: .4rem;
      flex-wrap: wrap;
      align-items: center;
    }
    .rp-badge {
      background: #eff6ff;
      color: #2563eb;
      border-radius: 3px;
      padding: 0 4px;
      font-size: .64rem;
      font-weight: 600;
    }
    .rp-badge-cite {
      background: #fefce8;
      color: #92400e;
      border-radius: 3px;
      padding: 0 4px;
      font-size: .64rem;
      font-weight: 600;
    }
    .rp-pub-more {
      display: none;
      margin-top: .5rem;
      font-size: .72rem;
      color: #6b7280;
      cursor: pointer;
      background: none;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      padding: .25rem .7rem;
      font-family: inherit;
    }
    .rp-pub-more:hover { background: #f9fafb; }
    .rp-pub-count {
      font-size: .7rem;
      color: #9ca3af;
      text-align: right;
      margin-top: .3rem;
    }
    .rp-no-results {
      color: #9ca3af;
      font-size: .82rem;
      padding: .5rem 0;
    }
    .rp-updated {
      font-size: .65rem;
      color: #d1d5db;
      text-align: right;
      margin-top: .5rem;
    }
  `;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html")  e.innerHTML = v;
      else e.setAttribute(k, v);
    }
    children.flat(Infinity).forEach(c => {
      if (c == null) return;
      e.append(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }

  // ── Panel builders ────────────────────────────────────────────────────────

  function buildOverview(data) {
    const byYear = data.publications_by_year || {};
    const entries = Object.entries(byYear);
    if (!entries.length) return el("div", {}, "No data.");

    const maxVal = Math.max(...entries.map(([,v]) => v), 1);
    const bars = entries.map(([year, count]) => {
      const pct = Math.round((count / maxVal) * 100);
      const bar = el("div", { class: "rp-bar", style: `height:${Math.max(pct,2)}%` },
        el("div", { class: "rp-bar-tip" }, `${year}: ${count}`)
      );
      return el("div", { class: "rp-bar-col" }, bar,
        el("span", { class: "rp-bar-yr" }, year)
      );
    });

    return el("div", {},
      el("div", { class: "rp-chart-outer" },
        el("div", { class: "rp-chart" }, ...bars)
      ),
      el("p", { class: "rp-chart-note" },
        `${data.author.document_count} publications · data via OpenAlex`
      )
    );
  }

  function buildFingerprint(fingerprint) {
    if (!fingerprint?.length) return el("div", {}, "No data.");
    const rows = fingerprint.map(({ term, score }) =>
      el("div", { class: "rp-fp-row" },
        el("span", { class: "rp-fp-term", title: term }, term),
        el("div", { class: "rp-fp-track" },
          el("div", { class: "rp-fp-fill", style: `width:${score}%` })
        ),
        el("span", { class: "rp-fp-pct" }, `${score}%`)
      )
    );
    return el("div", { class: "rp-fp-grid" }, ...rows);
  }

  function buildSDGs(sdgs) {
    if (!sdgs?.length) return el("div", {}, "No SDG data.");
    const chips = sdgs.map(({ id, name, score }) => {
      const color = SDG_COLORS[id] || "#2563eb";
      const chip  = el("div", {
        class: "rp-sdg-chip",
        style: `background:${color}`,
        title: `${name} — relevance ${score}%`,
      },
        el("span", { class: "rp-sdg-num" }, `${id}`),
        el("span", { class: "rp-sdg-name" }, name),
        el("span", { class: "rp-sdg-bar-wrap" },
          el("span", { class: "rp-sdg-bar", style: `width:${score}%` })
        )
      );
      return chip;
    });
    return el("div", {},
      el("div", { class: "rp-sdg-row" }, ...chips),
      el("p", { class: "rp-sdg-note" },
        "UN Sustainable Development Goals linked to research topics."
      )
    );
  }

  function buildPublications(publications, generatedAt) {
    if (!publications?.length) return el("div", {}, "No publications.");

    const PAGE = 8;
    let shown = PAGE;
    let filtered = [...publications];

    const searchEl  = el("input",  { type:"text", placeholder:"Search…" });
    const yearEl    = el("select", {});
    const listWrap  = el("div",    {});
    const countEl   = el("div",    { class: "rp-pub-count" });
    const moreBtn   = el("button", { class: "rp-pub-more" }, "Show more");

    // year options
    const years = [...new Set(publications.map(p => p.year).filter(Boolean))].sort((a,b)=>b-a);
    yearEl.appendChild(el("option", { value:"" }, "All years"));
    years.forEach(y => yearEl.appendChild(el("option", { value:y }, String(y))));

    function renderList() {
      const slice = filtered.slice(0, shown);
      const items = slice.map(p => {
        const titleNode = p.doi
          ? el("a", { href:`https://doi.org/${p.doi}`, target:"_blank" }, p.title)
          : document.createTextNode(p.title || "Untitled");
        return el("li", { class: "rp-pub-item" },
          el("span", { class: "rp-pub-year" }, String(p.year || "—")),
          el("div",  { class: "rp-pub-content" },
            el("div", { class: "rp-pub-title" }, titleNode),
            el("div", { class: "rp-pub-meta" },
              p.journal ? el("span", {}, p.journal) : null,
              p.type    ? el("span", { class:"rp-badge" }, p.type) : null,
              p.cited_by > 0
                ? el("span", { class:"rp-badge-cite" }, `↑ ${p.cited_by}`) : null,
            )
          )
        );
      });

      listWrap.innerHTML = "";
      if (!items.length) {
        listWrap.appendChild(el("div", { class: "rp-no-results" }, "No publications match."));
      } else {
        listWrap.appendChild(el("ul", { class: "rp-pub-list" }, ...items));
      }
      moreBtn.style.display = shown < filtered.length ? "block" : "none";
      countEl.textContent   = `${Math.min(shown, filtered.length)} of ${filtered.length}`;
    }

    function applyFilters() {
      const q  = searchEl.value.toLowerCase();
      const yr = yearEl.value;
      filtered = publications.filter(p =>
        (!q  || (p.title||"").toLowerCase().includes(q) || (p.journal||"").toLowerCase().includes(q)) &&
        (!yr || String(p.year) === yr)
      );
      shown = PAGE;
      renderList();
    }

    searchEl.addEventListener("input",  applyFilters);
    yearEl.addEventListener("change",   applyFilters);
    moreBtn.addEventListener("click",   () => { shown += PAGE; renderList(); });

    renderList();

    return el("div", {},
      el("div", { class: "rp-pub-ctrl" }, searchEl, yearEl, countEl),
      listWrap,
      moreBtn,
      generatedAt ? el("div", { class: "rp-updated" }, `Updated: ${generatedAt}`) : null,
    );
  }

  // ── Main widget ───────────────────────────────────────────────────────────

  function buildWidget(data, container) {
    const { author, fingerprint, sdgs, publications, generated_at } = data;

    // Header
    const header = el("div", { class: "rp-header" },
      el("div", { class: "rp-author" }, author.name),
      el("div", { class: "rp-metrics-inline" },
        el("div", { class: "rp-metric" },
          el("div", { class: "rp-metric-val" }, String(author.document_count)),
          el("div", { class: "rp-metric-lbl" }, "Works"),
        ),
        el("div", { class: "rp-metric" },
          el("div", { class: "rp-metric-val" }, String(author.citation_count)),
          el("div", { class: "rp-metric-lbl" }, "Citations"),
        ),
        el("div", { class: "rp-metric" },
          el("div", { class: "rp-metric-val" }, `h${author.h_index}`),
          el("div", { class: "rp-metric-lbl" }, "h-index"),
        ),
      )
    );

    // Tabs definition
    const tabs = [
      { id:"overview",     label:"📊 Output",       build: () => buildOverview(data)             },
      { id:"fingerprint",  label:"🔬 Fingerprint",  build: () => buildFingerprint(fingerprint)   },
      { id:"sdgs",         label:"🌍 SDGs",          build: () => buildSDGs(sdgs)                 },
      { id:"publications", label:"📄 Publications",  build: () => buildPublications(publications, generated_at) },
    ];

    // Tab buttons
    const tabBar = el("div", { class: "rp-tabs" });
    const panels = el("div", { class: "rp-panels" });

    tabs.forEach((t, i) => {
      const btn   = el("div", { class: `rp-tab${i===0?" active":""}` }, t.label);
      const panel = el("div", { class: `rp-panel${i===0?" active":""}` });
      let built   = false;

      btn.addEventListener("click", () => {
        tabBar.querySelectorAll(".rp-tab").forEach(b => b.classList.remove("active"));
        panels.querySelectorAll(".rp-panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        panel.classList.add("active");
        if (!built) { panel.appendChild(t.build()); built = true; }
      });

      tabBar.appendChild(btn);
      panels.appendChild(panel);

      // Build first tab immediately
      if (i === 0) { panel.appendChild(t.build()); built = true; }
    });

    const wrap = el("div", { class: "rp-wrap" }, header, tabBar, panels);
    container.innerHTML = "";
    container.appendChild(wrap);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  async function init() {
    const container = document.getElementById("research-profile");
    if (!container) return;

    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    let data;
    try {
      const r = await fetch(DATA_URL);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      data = await r.json();
    } catch (e) {
      console.warn("research-widgets:", e);
      return;
    }

    buildWidget(data, container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();    .rw-metrics {
      display: flex;
      gap: 1.2rem;
      flex-wrap: wrap;
      margin: 1rem 0 2rem;
    }
    .rw-metric-card {
      background: #f0f6ff;
      border: 1px solid #bfdbfe;
      border-radius: 10px;
      padding: .85rem 1.4rem;
      text-align: center;
      min-width: 110px;
      flex: 1;
    }
    .rw-metric-card .rw-mval {
      font-size: 2rem;
      font-weight: 800;
      color: #2563eb;
      line-height: 1;
    }
    .rw-metric-card .rw-mlabel {
      font-size: .78rem;
      color: #64748b;
      margin-top: .3rem;
    }

    /* â”€â”€ bar chart â”€â”€ */
    .rw-chart-wrap {
      overflow-x: auto;
      padding-bottom: .5rem;
    }
    .rw-chart {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 140px;
      min-width: 400px;
    }
    .rw-bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 22px;
      height: 100%;
      justify-content: flex-end;
      cursor: default;
    }
    .rw-bar {
      width: 100%;
      background: #2563eb;
      border-radius: 3px 3px 0 0;
      transition: background .2s;
      position: relative;
    }
    .rw-bar:hover { background: #1d4ed8; }
    .rw-bar-label {
      font-size: .62rem;
      color: #64748b;
      margin-top: 4px;
      transform: rotate(-40deg);
      transform-origin: top center;
      white-space: nowrap;
    }
    .rw-bar-tooltip {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: #fff;
      font-size: .7rem;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity .15s;
    }
    .rw-bar:hover .rw-bar-tooltip { opacity: 1; }

    /* â”€â”€ fingerprint â”€â”€ */
    .rw-fingerprint {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: .6rem;
    }
    .rw-fp-item {
      display: flex;
      align-items: center;
      gap: .7rem;
    }
    .rw-fp-term {
      font-size: .82rem;
      font-weight: 600;
      min-width: 130px;
      color: #1e293b;
      text-transform: capitalize;
    }
    .rw-fp-bar-track {
      flex: 1;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    .rw-fp-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #2563eb, #7c3aed);
      border-radius: 4px;
    }
    .rw-fp-pct {
      font-size: .75rem;
      color: #64748b;
      min-width: 34px;
      text-align: right;
    }

    /* â”€â”€ SDG badges â”€â”€ */
    .rw-sdg-grid {
      display: flex;
      flex-wrap: wrap;
      gap: .8rem;
    }
    .rw-sdg-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .35rem;
      width: 76px;
      text-align: center;
    }
    .rw-sdg-icon {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.3rem;
      font-weight: 900;
      position: relative;
      overflow: hidden;
    }
    .rw-sdg-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .rw-sdg-name {
      font-size: .6rem;
      color: #475569;
      line-height: 1.2;
    }
    .rw-sdg-score {
      font-size: .65rem;
      font-weight: 700;
      color: #2563eb;
    }

    /* â”€â”€ publications list â”€â”€ */
    .rw-pub-controls {
      display: flex;
      gap: .7rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .rw-pub-controls input,
    .rw-pub-controls select {
      padding: .4rem .7rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: .85rem;
      outline: none;
    }
    .rw-pub-controls input { flex: 1; min-width: 200px; }
    .rw-pub-list { list-style: none; padding: 0; margin: 0; }
    .rw-pub-item {
      border-left: 3px solid #2563eb;
      padding: .7rem 1rem;
      margin-bottom: .7rem;
      background: #f8fafc;
      border-radius: 0 8px 8px 0;
      transition: background .15s;
    }
    .rw-pub-item:hover { background: #eff6ff; }
    .rw-pub-title {
      font-size: .9rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: .25rem;
    }
    .rw-pub-title a { color: inherit; text-decoration: none; }
    .rw-pub-title a:hover { text-decoration: underline; color: #2563eb; }
    .rw-pub-meta {
      font-size: .76rem;
      color: #64748b;
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
    }
    .rw-pub-badge {
      background: #dbeafe;
      color: #1d4ed8;
      border-radius: 4px;
      padding: 1px 6px;
      font-size: .7rem;
      font-weight: 600;
    }
    .rw-pub-cited {
      background: #fef9c3;
      color: #92400e;
      border-radius: 4px;
      padding: 1px 6px;
      font-size: .7rem;
      font-weight: 600;
    }
    .rw-no-results {
      color: #94a3b8;
      font-size: .9rem;
      padding: 1rem 0;
    }
    .rw-show-more {
      margin-top: .8rem;
      background: none;
      border: 1px solid #2563eb;
      color: #2563eb;
      padding: .4rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: .85rem;
      transition: background .15s;
    }
    .rw-show-more:hover { background: #eff6ff; }
    .rw-updated {
      font-size: .72rem;
      color: #94a3b8;
      margin-top: .5rem;
      text-align: right;
    }
  `);

  // â”€â”€ Renderers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  function renderMetrics(container, author) {
    const items = [
      { val: author.document_count, label: "Publications" },
      { val: author.citation_count, label: "Citations" },
      { val: author.h_index,        label: "h-index" },
    ];
    const strip = el("div", { class: "rw-metrics" },
      ...items.map(({ val, label }) =>
        el("div", { class: "rw-metric-card" },
          el("div", { class: "rw-mval" }, String(val)),
          el("div", { class: "rw-mlabel" }, label),
        )
      )
    );
    container.innerHTML = "";
    container.appendChild(strip);
  }

  function renderByYear(container, byYear) {
    if (!byYear || !Object.keys(byYear).length) return;
    const entries = Object.entries(byYear);
    const maxVal  = Math.max(...entries.map(([, v]) => v));

    const bars = entries.map(([year, count]) => {
      const pct  = maxVal ? Math.round((count / maxVal) * 100) : 0;
      const bar  = el("div", { class: "rw-bar", style: `height:${pct}%` },
        el("div", { class: "rw-bar-tooltip" }, `${year}: ${count}`)
      );
      return el("div", { class: "rw-bar-col" },
        bar,
        el("span", { class: "rw-bar-label" }, year),
      );
    });

    container.innerHTML = "";
    container.appendChild(
      el("div", { class: "rw-section" },
        el("h2", {}, "Research Output by Year"),
        el("div", { class: "rw-chart-wrap" },
          el("div", { class: "rw-chart" }, ...bars)
        )
      )
    );
  }

  function renderFingerprint(container, fingerprint) {
    if (!fingerprint?.length) return;
    const items = fingerprint.map(({ term, score }) =>
      el("div", { class: "rw-fp-item" },
        el("span", { class: "rw-fp-term" }, term),
        el("div", { class: "rw-fp-bar-track" },
          el("div", { class: "rw-fp-bar-fill", style: `width:${score}%` })
        ),
        el("span", { class: "rw-fp-pct" }, `${score}%`),
      )
    );
    container.innerHTML = "";
    container.appendChild(
      el("div", { class: "rw-section" },
        el("h2", {}, "Digital Fingerprint"),
        el("p", { style: "font-size:.82rem;color:#64748b;margin-bottom:.8rem" },
          "Research topics derived from publications and keywords."
        ),
        el("div", { class: "rw-fingerprint" }, ...items)
      )
    );
  }

  function renderSDGs(container, sdgs) {
    if (!sdgs?.length) return;
    const badges = sdgs.map(({ id, name, score }) => {
      const color = SDG_COLORS[id] || "#2563eb";
      const iconUrl = `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-0${String(id).padStart(2,"0")}.jpg`;
      const iconEl = el("div", { class: "rw-sdg-icon", style: `background:${color}` });
      const img = new Image();
      img.src = iconUrl;
      img.alt = `SDG ${id}`;
      img.onload = () => iconEl.appendChild(img);
      img.onerror = () => { iconEl.innerHTML = `<span>${id}</span>`; };
      return el("div", { class: "rw-sdg-badge", title: name },
        iconEl,
        el("span", { class: "rw-sdg-name" }, name),
        el("span", { class: "rw-sdg-score" }, `${score}%`),
      );
    });
    container.innerHTML = "";
    container.appendChild(
      el("div", { class: "rw-section" },
        el("h2", {}, "UN Sustainable Development Goals"),
        el("p", { style: "font-size:.82rem;color:#64748b;margin-bottom:.8rem" },
          "Research contributions aligned with the 2030 Agenda."
        ),
        el("div", { class: "rw-sdg-grid" }, ...badges)
      )
    );
  }

  function renderPublications(container, publications, generated) {
    if (!publications?.length) return;

    const PAGE = 10;
    let shown   = PAGE;
    let filtered = [...publications];

    function buildList() {
      const slice = filtered.slice(0, shown);
      const items = slice.map(p => {
        const titleEl = p.doi
          ? el("a", { href: `https://doi.org/${p.doi}`, target: "_blank" }, p.title)
          : document.createTextNode(p.title || "Untitled");
        return el("li", { class: "rw-pub-item" },
          el("div", { class: "rw-pub-title" }, titleEl),
          el("div", { class: "rw-pub-meta" },
            el("span", {}, p.year || "â€”"),
            el("span", {}, p.journal || ""),
            p.type  ? el("span", { class: "rw-pub-badge" }, p.type)  : null,
            p.cited_by > 0
              ? el("span", { class: "rw-pub-cited" }, `Cited: ${p.cited_by}`) : null,
          )
        );
      });

      const list = el("ul", { class: "rw-pub-list" }, ...items);
      if (!items.length) list.appendChild(el("li", { class: "rw-no-results" }, "No publications match your search."));
      return list;
    }

    function rebuild() {
      listWrap.innerHTML = "";
      listWrap.appendChild(buildList());
      btnMore.style.display = shown < filtered.length ? "inline-block" : "none";
      counter.textContent = `Showing ${Math.min(shown, filtered.length)} of ${filtered.length}`;
    }

    // controls
    const searchInput = el("input", { type: "text", placeholder: "Search publicationsâ€¦" });
    const yearSelect  = el("select", {});
    const typeSelect  = el("select", {});

    // populate year select
    const years = [...new Set(publications.map(p => p.year).filter(Boolean))].sort((a,b)=>b-a);
    yearSelect.appendChild(el("option", { value: "" }, "All years"));
    years.forEach(y => yearSelect.appendChild(el("option", { value: y }, String(y))));

    // populate type select
    const types = [...new Set(publications.map(p => p.type).filter(Boolean))].sort();
    typeSelect.appendChild(el("option", { value: "" }, "All types"));
    types.forEach(t => typeSelect.appendChild(el("option", { value: t }, t)));

    function applyFilters() {
      const q  = searchInput.value.toLowerCase();
      const yr = yearSelect.value;
      const tp = typeSelect.value;
      filtered = publications.filter(p =>
        (!q  || (p.title || "").toLowerCase().includes(q) || (p.journal || "").toLowerCase().includes(q)) &&
        (!yr || String(p.year) === yr) &&
        (!tp || p.type === tp)
      );
      shown = PAGE;
      rebuild();
    }

    searchInput.addEventListener("input",  applyFilters);
    yearSelect.addEventListener("change",  applyFilters);
    typeSelect.addEventListener("change",  applyFilters);

    const listWrap = el("div", {});
    const counter  = el("span", { style: "font-size:.75rem;color:#94a3b8" });
    const btnMore  = el("button", { class: "rw-show-more" }, "Show more");
    btnMore.addEventListener("click", () => { shown += PAGE; rebuild(); });

    container.innerHTML = "";
    container.appendChild(
      el("div", { class: "rw-section" },
        el("h2", {}, `Publications (${publications.length})`),
        el("div", { class: "rw-pub-controls" }, searchInput, yearSelect, typeSelect, counter),
        listWrap,
        btnMore,
        generated ? el("div", { class: "rw-updated" }, `Data updated: ${generated}`) : null,
      )
    );
    rebuild();
  }

  // â”€â”€ Bootstrap â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  async function init() {
    let data;
    try {
      const resp = await fetch(DATA_URL);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      data = await resp.json();
    } catch (err) {
      console.warn("research-widgets: could not load", DATA_URL, err);
      return;
    }

    const { author, publications_by_year, fingerprint, sdgs,
            publications, generated_at } = data;

    if ($("research-metrics"))   renderMetrics($("research-metrics"), author);
    if ($("publications-by-year")) renderByYear($("publications-by-year"), publications_by_year);
    if ($("fingerprint"))         renderFingerprint($("fingerprint"), fingerprint);
    if ($("sdg-section"))         renderSDGs($("sdg-section"), sdgs);
    if ($("publications-list"))   renderPublications($("publications-list"), publications, generated_at);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
