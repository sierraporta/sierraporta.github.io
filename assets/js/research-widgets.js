/**
 * research-widgets.js
 * --------------------
 * Widget de perfil investigador para sierraporta.github.io
 * Lee /data/research.json y renderiza un panel de dos columnas:
 *
 *   Columna izquierda (40%)          Columna derecha (60%)
 *   ┌──────────┬──────────┐          ┌───────────────────────┐
 *   │ Métricas │  SDGs    │          │  Publications         │
 *   ├──────────┴──────────┤          │  (scrolleable,        │
 *   │  Output by Year     │          │   buscable, filtros)  │
 *   └─────────────────────┘          └───────────────────────┘
 *
 * Uso en index.md / cualquier página Jekyll:
 *   <div id="research-profile"></div>
 *   <script src="/assets/js/research-widgets.js" defer></script>
 *
 * Sin dependencias externas. Sin API key.
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

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

    .rp { font-family:'DM Sans',sans-serif; font-size:13.5px; color:#1e293b; margin:1.5rem 0; overflow:hidden; }

    .rp-grid {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 12px;
      align-items: stretch;
      height: 420px;
      overflow: hidden;
    }
    @media (max-width: 700px) {
      .rp-grid { grid-template-columns: 1fr; height: auto; }
    }

    .rp-left { display: flex; flex-direction: column; gap: 12px; overflow: hidden; min-height: 0; height: 100%; }
    .rp-top-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex-shrink: 0; }

    .rp-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
    }
    .rp-card-title {
      font-size: .65rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: .08em;
      color: #94a3b8; margin-bottom: .65rem;
    }

    .rp-metrics-stack { display: flex; flex-direction: column; gap: .5rem; }
    .rp-metric-row { display: flex; align-items: baseline; gap: .45rem; }
    .rp-mval { font-family:'DM Mono',monospace; font-size:1.5rem; font-weight:500; color:#0f172a; line-height:1; }
    .rp-mlbl { font-size:.72rem; color:#94a3b8; }
    .rp-divider { border:none; border-top:1px solid #f1f5f9; margin:.3rem 0; }

    .rp-sdg-list { display:flex; flex-direction:column; gap:.45rem; }
    .rp-sdg-row { display:flex; align-items:center; gap:.5rem; }
    .rp-sdg-dot {
      width:22px; height:22px; border-radius:4px;
      display:flex; align-items:center; justify-content:center;
      font-family:'DM Mono',monospace; font-size:.6rem; font-weight:600;
      color:#fff; flex-shrink:0;
    }
    .rp-sdg-info { flex:1; min-width:0; }
    .rp-sdg-name-txt { font-size:.72rem; font-weight:500; color:#334155; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .rp-sdg-track { height:3px; background:#f1f5f9; border-radius:2px; margin-top:2px; overflow:hidden; }
    .rp-sdg-fill { height:100%; border-radius:2px; }

    .rp-chart-card-inner { flex:1; display:flex; flex-direction:column; overflow:hidden; min-height:0; }
    .rp-chart-wrap { overflow:hidden; flex:1; min-height:0; }
    .rp-chart { display:flex; align-items:flex-end; gap:3px; height:100%; min-width:240px; overflow:hidden; }
    .rp-bc { display:flex; flex-direction:column; align-items:center; flex:1; height:100%; justify-content:flex-end; overflow:hidden; }
    .rp-b { width:100%; background:#3b82f6; border-radius:2px 2px 0 0; min-height:2px; position:relative; transition:background .15s; overflow:hidden; }
    .rp-b:hover { background:#2563eb; }
    .rp-btt {
      display:none; position:fixed;
      background:#0f172a; color:#fff; font-size:.6rem;
      padding:2px 6px; border-radius:3px; white-space:nowrap; z-index:9999;
      pointer-events:none;
    }
    .rp-btt.visible { display:block; }
    .rp-byl { font-size:.5rem; color:#cbd5e1; margin-top:2px; }


    /* ── fingerprint ── */
    .rp-right { display:flex; flex-direction:column; gap:12px; overflow:hidden; height:100%; }
    .rp-fp-card { flex-shrink:0; }
    .rp-fp-grid { display:grid; grid-template-columns:1fr 1fr; gap:.25rem .8rem; }
    .rp-fp-row { display:flex; align-items:center; gap:.4rem; }
    .rp-fp-term { font-size:.68rem; font-weight:500; color:#374151; min-width:80px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-transform:capitalize; }
    .rp-fp-track { flex:1; height:4px; background:#f1f5f9; border-radius:2px; overflow:hidden; }
    .rp-fp-fill { height:100%; background:linear-gradient(90deg,#3b82f6,#7c3aed); border-radius:2px; }
    .rp-fp-pct { font-family:'DM Mono',monospace; font-size:.6rem; color:#94a3b8; min-width:24px; text-align:right; }

    .rp-pub-card {
      background:#fff; border:1px solid #e2e8f0; border-radius:10px;
      box-shadow:0 1px 4px rgba(0,0,0,.05);
      display:flex; flex-direction:column; flex:1; min-height:0;
    }
    .rp-pub-head { padding:.75rem 1rem .5rem; border-bottom:1px solid #f1f5f9; flex-shrink:0; }
    .rp-pub-ctrl { display:flex; gap:.4rem; margin-top:.5rem; }
    .rp-pub-ctrl input, .rp-pub-ctrl select {
      padding:.28rem .55rem; border:1px solid #e2e8f0; border-radius:6px;
      font-size:.75rem; font-family:inherit; outline:none;
      color:#334155; background:#f8fafc; transition:border-color .15s;
    }
    .rp-pub-ctrl input { flex:1; }
    .rp-pub-ctrl input:focus, .rp-pub-ctrl select:focus { border-color:#3b82f6; background:#fff; }

    .rp-pub-scroll { overflow-y:auto; flex:1; padding:.25rem 1rem; }
    .rp-pub-scroll::-webkit-scrollbar { width:4px; }
    .rp-pub-scroll::-webkit-scrollbar-track { background:#f8fafc; }
    .rp-pub-scroll::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:2px; }

    .rp-pub-ul { list-style:none; padding:0; margin:0; }
    .rp-pub-li { padding:.55rem 0; border-bottom:1px solid #f8fafc; display:flex; gap:.55rem; align-items:flex-start; }
    .rp-pub-li:last-child { border-bottom:none; }
    .rp-yr { font-family:'DM Mono',monospace; font-size:.65rem; color:#cbd5e1; min-width:28px; padding-top:2px; flex-shrink:0; }
    .rp-pub-body { flex:1; }
    .rp-pub-t { font-size:.8rem; font-weight:500; color:#1e293b; line-height:1.35; margin-bottom:.2rem; }
    .rp-pub-t a { color:inherit; text-decoration:none; }
    .rp-pub-t a:hover { color:#2563eb; }
    .rp-pub-m { font-size:.68rem; color:#94a3b8; display:flex; flex-wrap:wrap; gap:.3rem; align-items:center; }
    .rp-cite { background:#fefce8; color:#b45309; border-radius:3px; padding:0 4px; font-size:.62rem; font-weight:600; }

    .rp-pub-footer { padding:.4rem 1rem; border-top:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
    .rp-pub-count { font-size:.68rem; color:#94a3b8; }
    .rp-more-btn { font-size:.7rem; color:#3b82f6; background:none; border:none; cursor:pointer; font-family:inherit; padding:0; }
    .rp-more-btn:hover { text-decoration:underline; }
    .rp-updated { font-size:.62rem; color:#e2e8f0; }
    .rp-no-res { font-size:.8rem; color:#94a3b8; padding:.5rem 0; }
  `;

  function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else e.setAttribute(k, v);
    }
    children.flat(Infinity).forEach(c => {
      if (c == null) return;
      e.append(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }

  function buildMetricsCard(author) {
    return el("div", { class: "rp-card" },
      el("div", { class: "rp-card-title" }, "Research Metrics"),
      el("div", { class: "rp-metrics-stack" },
        el("div", { class: "rp-metric-row" },
          el("span", { class: "rp-mval" }, String(author.document_count)),
          el("span", { class: "rp-mlbl" }, "Works"),
        ),
        el("hr", { class: "rp-divider" }),
        el("div", { class: "rp-metric-row" },
          el("span", { class: "rp-mval" }, String(author.citation_count)),
          el("span", { class: "rp-mlbl" }, "Citations"),
        ),
        el("hr", { class: "rp-divider" }),
        el("div", { class: "rp-metric-row" },
          el("span", { class: "rp-mval" }, `h${author.h_index}`),
          el("span", { class: "rp-mlbl" }, "h-index"),
        ),
      )
    );
  }

  function buildSDGCard(sdgs) {
    if (!sdgs?.length) return el("div", { class: "rp-card" },
      el("div", { class: "rp-card-title" }, "UN SDGs"),
      el("p", { style: "font-size:.75rem;color:#94a3b8" }, "No data.")
    );
    const rows = sdgs.map(({ id, name, score }) => {
      const color = SDG_COLORS[id] || "#64748b";
      return el("div", { class: "rp-sdg-row" },
        el("div", { class: "rp-sdg-dot", style: `background:${color}` }, String(id)),
        el("div", { class: "rp-sdg-info" },
          el("div", { class: "rp-sdg-name-txt", title: name }, name),
          el("div", { class: "rp-sdg-track" },
            el("div", { class: "rp-sdg-fill", style: `width:${score}%;background:${color}` })
          )
        )
      );
    });
    return el("div", { class: "rp-card" },
      el("div", { class: "rp-card-title" }, "UN SDGs"),
      el("div", { class: "rp-sdg-list" }, ...rows)
    );
  }

  function buildChartCard(byYear) {
    const entries = Object.entries(byYear);
    const maxVal  = Math.max(...entries.map(([, v]) => v), 1);

    // Single shared tooltip using position:fixed — never overflows
    const tip = el("div", { class: "rp-btt" });
    document.body.appendChild(tip);

    const bars = entries.map(([year, count]) => {
      const pct = Math.round((count / maxVal) * 100);
      const bar = el("div", { class: "rp-b", style: `height:${Math.max(pct, 2)}%` });
      bar.addEventListener("mouseenter", (e) => {
        tip.textContent = `${year}: ${count}`;
        tip.classList.add("visible");
      });
      bar.addEventListener("mousemove", (e) => {
        tip.style.left = (e.clientX + 10) + "px";
        tip.style.top  = (e.clientY - 28) + "px";
      });
      bar.addEventListener("mouseleave", () => tip.classList.remove("visible"));
      return el("div", { class: "rp-bc" }, bar,
        el("span", { class: "rp-byl" }, year.slice(2))
      );
    });
    return el("div", { class: "rp-card rp-chart-card-inner", style: "flex:1" },
      el("div", { class: "rp-card-title" }, "Output by Year"),
      el("div", { class: "rp-chart-wrap" },
        el("div", { class: "rp-chart" }, ...bars)
      )
    );
  }

  function buildFingerprintCard(fingerprint) {
    if (!fingerprint || !fingerprint.length) return null;
    const top = fingerprint.slice(0, 16);
    const rows = top.map(({ term, score }) =>
      el("div", { class: "rp-fp-row" },
        el("span", { class: "rp-fp-term", title: term }, term),
        el("div",  { class: "rp-fp-track" },
          el("div", { class: "rp-fp-fill", style: `width:${score}%` })
        ),
        el("span", { class: "rp-fp-pct" }, `${score}%`)
      )
    );
    return el("div", { class: "rp-card rp-fp-card" },
      el("div", { class: "rp-card-title" }, "Digital Fingerprint"),
      el("div", { class: "rp-fp-grid" }, ...rows)
    );
  }

  function buildPublicationsCard(publications, generatedAt) {
    const PAGE = 12;
    let shown    = PAGE;
    let filtered = [...publications];

    const searchEl = el("input",  { type: "text", placeholder: "Search title or journal…" });
    const yearEl   = el("select", {});
    const years    = [...new Set(publications.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
    yearEl.appendChild(el("option", { value: "" }, "All years"));
    years.forEach(y => yearEl.appendChild(el("option", { value: y }, String(y))));

    const scrollEl = el("div",    { class: "rp-pub-scroll" });
    const countEl  = el("span",   { class: "rp-pub-count" });
    const moreBtn  = el("button", { class: "rp-more-btn" }, "Load more ↓");

    function render() {
      const items = filtered.slice(0, shown).map(p => {
        const tNode = p.doi
          ? el("a", { href: `https://doi.org/${p.doi}`, target: "_blank" }, p.title)
          : document.createTextNode(p.title || "Untitled");
        return el("li", { class: "rp-pub-li" },
          el("span", { class: "rp-yr" }, String(p.year || "—")),
          el("div",  { class: "rp-pub-body" },
            el("div", { class: "rp-pub-t" }, tNode),
            el("div", { class: "rp-pub-m" },
              p.journal    ? el("span", {}, p.journal) : null,
              p.cited_by > 0 ? el("span", { class: "rp-cite" }, `↑${p.cited_by}`) : null,
            )
          )
        );
      });
      scrollEl.innerHTML = "";
      scrollEl.appendChild(
        items.length
          ? el("ul", { class: "rp-pub-ul" }, ...items)
          : el("div", { class: "rp-no-res" }, "No results.")
      );
      countEl.textContent   = `${Math.min(shown, filtered.length)} / ${filtered.length}`;
      moreBtn.style.display = shown < filtered.length ? "inline" : "none";
    }

    function applyFilters() {
      const q  = searchEl.value.toLowerCase();
      const yr = yearEl.value;
      filtered = publications.filter(p =>
        (!q  || (p.title   || "").toLowerCase().includes(q) ||
                (p.journal || "").toLowerCase().includes(q)) &&
        (!yr || String(p.year) === yr)
      );
      shown = PAGE;
      render();
    }

    searchEl.addEventListener("input",  applyFilters);
    yearEl.addEventListener("change",   applyFilters);
    moreBtn.addEventListener("click",   () => { shown += PAGE; render(); });
    render();

    return el("div", { class: "rp-pub-card" },
      el("div", { class: "rp-pub-head" },
        el("div", { class: "rp-card-title" }, "Publications"),
        el("div", { class: "rp-pub-ctrl" }, searchEl, yearEl)
      ),
      scrollEl,
      el("div", { class: "rp-pub-footer" },
        countEl,
        moreBtn,
        generatedAt ? el("span", { class: "rp-updated" }, `↻ ${generatedAt}`) : null,
      )
    );
  }

  function buildWidget(data, container) {
    const { author, sdgs, fingerprint, publications, publications_by_year, generated_at } = data;
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    container.innerHTML = "";
    container.appendChild(
      el("div", { class: "rp" },
        el("div", { class: "rp-grid" },
          el("div", { class: "rp-left" },
            el("div", { class: "rp-top-row" },
              buildMetricsCard(author),
              buildSDGCard(sdgs)
            ),
            buildChartCard(publications_by_year)
          ),
          el("div", { class: "rp-right" },
            buildFingerprintCard(fingerprint),
            buildPublicationsCard(publications, generated_at)
          )
        )
      )
    );
  }

  async function init() {
    const container = document.getElementById("research-profile");
    if (!container) return;
    try {
      const r = await fetch(DATA_URL);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      buildWidget(await r.json(), container);
    } catch (e) {
      console.warn("research-widgets: could not load", DATA_URL, e);
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();
