/**
 * research-widgets.js
 * -------------------
 * Self-contained module that renders four research-profile sections
 * into any page that includes this script, given a <data/research.json>
 * file at the same origin.
 *
 * Sections:
 *   1. #research-metrics     â€” h-index, citations, document count
 *   2. #publications-by-year â€” bar chart (pure CSS, no library)
 *   3. #fingerprint          â€” keyword cloud with percentage bars
 *   4. #sdg-section          â€” ODS/SDG icon badges
 *   5. #publications-list    â€” searchable/filterable publication list
 *
 * Usage:
 *   <script src="assets/js/research-widgets.js" defer></script>
 *   Add the matching placeholder <div>s anywhere in your HTML.
 *
 * Dependencies: none (vanilla JS + inline SVG for SDG icons)
 */

(function () {
  "use strict";

  const DATA_URL = "/data/research.json";

  // â”€â”€ SDG icon URLs (official UN assets via jsdelivr CDN) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const SDG_COLORS = {
    1:"#E5243B",2:"#DDA63A",3:"#4C9F38",4:"#C5192D",5:"#FF3A21",
    6:"#26BDE2",7:"#FCC30B",8:"#A21942",9:"#FD6925",10:"#DD1367",
    11:"#FD9D24",12:"#BF8B2E",13:"#3F7E44",14:"#0A97D9",15:"#56C02B",
    16:"#00689D",17:"#19486A",
  };

  // â”€â”€ Utilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  function $(id) { return document.getElementById(id); }

  function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html")  e.innerHTML = v;
      else e.setAttribute(k, v);
    }
    for (const c of children.flat(Infinity)) {
      if (c == null) continue;
      e.append(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return e;
  }

  function inject(styles) {
    const s = document.createElement("style");
    s.textContent = styles;
    document.head.appendChild(s);
  }

  // â”€â”€ CSS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  inject(`
    /* â”€â”€ shared â”€â”€ */
    .rw-section {
      font-family: inherit;
      margin: 2rem 0;
    }
    .rw-section h2 {
      font-size: 1.25rem;
      font-weight: 700;
      border-bottom: 2px solid #2563eb;
      padding-bottom: .4rem;
      margin-bottom: 1.2rem;
      color: #1e293b;
    }

    /* â”€â”€ metrics strip â”€â”€ */
    .rw-metrics {
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
