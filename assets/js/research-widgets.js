/**
 * research-widgets.js — v5 final
 * sierraporta.github.io
 *
 * Layout:
 *   Left  (40%): [Metrics] [SDGs] / [Chart]
 *   Right (60%): [Fingerprint] / [Publications]
 *
 * Usage:
 *   <div id="research-profile"></div>
 *   <script src="/assets/js/research-widgets.js" defer></script>
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

  const STOP = new Set([
    "the","a","an","of","in","for","on","and","to","with","using","based",
    "via","from","its","by","as","at","is","are","this","that","we","our",
    "new","high","low","data","analysis","study","method","approach","model",
    "results","paper","through","during","between","after","over","into",
    "their","within","has","been","was","were","have","use","used","two",
    "three","first","second","different","large","small","simple","one",
  ]);

  // ── CSS ────────────────────────────────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

    .rp { font-family:'DM Sans',sans-serif; font-size:13.5px; color:#1e293b; margin:1.5rem 0; }

    /* Two-column grid with fixed total height */
    .rp-grid {
      display: grid;
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 420px;
      gap: 12px;
    }
    @media (max-width: 700px) {
      .rp-grid { grid-template-columns: 1fr; grid-template-rows: none; }
    }

    /* Columns */
    .rp-left  { display:flex; flex-direction:column; gap:12px; height:420px; overflow:hidden; }
    .rp-right { display:flex; flex-direction:column; gap:12px; height:420px; overflow:hidden; }
    @media (max-width:700px) {
      .rp-left, .rp-right { height:auto; overflow:visible; }
    }

    /* Shared card */
    .rp-card {
      background:#fff; border:1px solid #e2e8f0;
      border-radius:10px; padding:.85rem 1rem;
      box-shadow:0 1px 4px rgba(0,0,0,.05);
    }
    .rp-card-title {
      font-size:.65rem; font-weight:600; text-transform:uppercase;
      letter-spacing:.08em; color:#94a3b8; margin-bottom:.6rem;
    }

    /* ── Left: metrics ── */
    .rp-metrics-stack { display:flex; flex-direction:column; gap:.4rem; }
    .rp-metric-row    { display:flex; align-items:baseline; gap:.4rem; }
    .rp-mval { font-family:'DM Mono',monospace; font-size:1.4rem; font-weight:500; color:#0f172a; line-height:1; }
    .rp-mlbl { font-size:.72rem; color:#94a3b8; }
    .rp-divider { border:none; border-top:1px solid #f1f5f9; margin:.25rem 0; }

    /* ── Left: SDGs ── */
    .rp-sdg-list { display:flex; flex-direction:column; gap:.4rem; }
    .rp-sdg-row  { display:flex; align-items:center; gap:.45rem; }
    .rp-sdg-dot  {
      width:20px; height:20px; border-radius:4px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-family:'DM Mono',monospace; font-size:.58rem; font-weight:700; color:#fff;
    }
    .rp-sdg-info { flex:1; min-width:0; }
    .rp-sdg-lbl  { font-size:.7rem; font-weight:500; color:#334155; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .rp-sdg-track { height:3px; background:#f1f5f9; border-radius:2px; margin-top:2px; overflow:hidden; }
    .rp-sdg-bar   { height:100%; border-radius:2px; }

    /* ── Left: chart ── */
    .rp-chart-card { flex:1; min-height:0; display:flex; flex-direction:column; }
    .rp-chart-wrap { flex:1; min-height:0; overflow:hidden; display:flex; flex-direction:column; }
    .rp-chart      { flex:1; min-height:40px; display:flex; align-items:flex-end; gap:3px; overflow:hidden; }
    .rp-bc         { flex:1; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; overflow:hidden; min-width:0; }
    .rp-b          { width:100%; min-height:2px; background:#3b82f6; border-radius:2px 2px 0 0; transition:background .15s; cursor:default; }
    .rp-b:hover    { background:#2563eb; }
    .rp-byl        { font-size:.48rem; color:#cbd5e1; margin-top:2px; line-height:1; }
    /* tooltip via JS + position:fixed */
    .rp-tip {
      position:fixed; display:none; z-index:9999; pointer-events:none;
      background:#0f172a; color:#fff; font-size:.65rem;
      padding:2px 7px; border-radius:4px; white-space:nowrap;
    }
    .rp-tip.on { display:block; }

    /* ── Right: fingerprint ── */
    .rp-fp-card { flex-shrink:0; }
    .rp-fp-grid { display:grid; grid-template-columns:1fr 1fr; gap:.22rem .7rem; }
    .rp-fp-row  { display:flex; align-items:center; gap:.35rem; }
    .rp-fp-term { font-size:.67rem; font-weight:500; color:#374151; min-width:78px; max-width:78px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-transform:capitalize; }
    .rp-fp-track { flex:1; height:4px; background:#f1f5f9; border-radius:2px; overflow:hidden; }
    .rp-fp-bar   { height:100%; background:linear-gradient(90deg,#3b82f6,#7c3aed); border-radius:2px; }
    .rp-fp-pct   { font-family:'DM Mono',monospace; font-size:.58rem; color:#94a3b8; min-width:24px; text-align:right; }

    /* ── Right: publications ── */
    .rp-pub-card { flex:1; min-height:0; display:flex; flex-direction:column; background:#fff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 1px 4px rgba(0,0,0,.05); }
    .rp-pub-head { padding:.7rem 1rem .45rem; border-bottom:1px solid #f1f5f9; flex-shrink:0; }
    .rp-pub-ctrl { display:flex; gap:.35rem; margin-top:.45rem; }
    .rp-pub-ctrl input,
    .rp-pub-ctrl select {
      padding:.26rem .5rem; border:1px solid #e2e8f0; border-radius:6px;
      font-size:.74rem; font-family:inherit; outline:none;
      color:#334155; background:#f8fafc; transition:border-color .15s;
    }
    .rp-pub-ctrl input { flex:1; }
    .rp-pub-ctrl input:focus,
    .rp-pub-ctrl select:focus { border-color:#3b82f6; background:#fff; }

    .rp-pub-scroll { flex:1; min-height:0; overflow-y:auto; padding:.2rem 1rem; }
    .rp-pub-scroll::-webkit-scrollbar       { width:3px; }
    .rp-pub-scroll::-webkit-scrollbar-track { background:#f8fafc; }
    .rp-pub-scroll::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:2px; }

    .rp-pub-ul { list-style:none; padding:0; margin:0; }
    .rp-pub-li { padding:.5rem 0; border-bottom:1px solid #f8fafc; display:flex; gap:.5rem; align-items:flex-start; }
    .rp-pub-li:last-child { border-bottom:none; }
    .rp-yr { font-family:'DM Mono',monospace; font-size:.63rem; color:#cbd5e1; min-width:26px; padding-top:2px; flex-shrink:0; }
    .rp-pub-body { flex:1; }
    .rp-pub-t { font-size:.79rem; font-weight:500; color:#1e293b; line-height:1.35; margin-bottom:.15rem; }
    .rp-pub-t a { color:inherit; text-decoration:none; }
    .rp-pub-t a:hover { color:#2563eb; }
    .rp-pub-m { font-size:.67rem; color:#94a3b8; display:flex; flex-wrap:wrap; gap:.3rem; align-items:center; }
    .rp-cite  { background:#fefce8; color:#b45309; border-radius:3px; padding:0 4px; font-size:.61rem; font-weight:600; }

    .rp-pub-footer { padding:.35rem 1rem; border-top:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
    .rp-pub-count  { font-size:.67rem; color:#94a3b8; }
    .rp-more-btn   { font-size:.69rem; color:#3b82f6; background:none; border:none; cursor:pointer; font-family:inherit; padding:0; }
    .rp-more-btn:hover { text-decoration:underline; }
    .rp-updated    { font-size:.6rem; color:#d1d5db; }
    .rp-no-res     { font-size:.79rem; color:#94a3b8; padding:.5rem 0; }
  `;

  // ── DOM helper ─────────────────────────────────────────────────────────────
  function el(tag, attrs={}, ...children) {
    const e = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)) {
      if (k==="class") e.className=v; else e.setAttribute(k,v);
    }
    children.flat(Infinity).forEach(c => {
      if (c==null) return;
      e.append(typeof c==="string" ? document.createTextNode(c) : c);
    });
    return e;
  }

  // ── Fingerprint from titles (fallback when keywords empty) ─────────────────
  function computeFingerprint(publications) {
    const counts = {};
    publications.forEach(p => {
      const bag = new Set();
      // from explicit keywords
      (p.keywords||[]).forEach(k => {
        const w = k.toLowerCase().trim();
        if (w && !STOP.has(w) && w.length>2) bag.add(w);
      });
      // from title words
      (p.title||"").toLowerCase().replace(/[^a-záéíóú ]/g," ")
        .split(/\s+/).forEach(w => {
          if (w && !STOP.has(w) && w.length>2) bag.add(w);
        });
      bag.forEach(w => { counts[w]=(counts[w]||0)+1; });
    });
    const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,16);
    if (!sorted.length) return [];
    const max = sorted[0][1];
    return sorted.map(([term,cnt])=>({ term, score: Math.round(100*cnt/max) }));
  }

  // ── Card builders ──────────────────────────────────────────────────────────

  function buildMetricsCard(author) {
    return el("div",{class:"rp-card"},
      el("div",{class:"rp-card-title"},"Research Metrics"),
      el("div",{class:"rp-metrics-stack"},
        el("div",{class:"rp-metric-row"},
          el("span",{class:"rp-mval"},String(author.document_count)),
          el("span",{class:"rp-mlbl"},"Works")),
        el("hr",{class:"rp-divider"}),
        el("div",{class:"rp-metric-row"},
          el("span",{class:"rp-mval"},String(author.citation_count)),
          el("span",{class:"rp-mlbl"},"Citations")),
        el("hr",{class:"rp-divider"}),
        el("div",{class:"rp-metric-row"},
          el("span",{class:"rp-mval"},`h${author.h_index}`),
          el("span",{class:"rp-mlbl"},"h-index")),
      )
    );
  }

  function buildSDGCard(sdgs) {
    const rows = (sdgs||[]).map(({id,name,score})=>{
      const c = SDG_COLORS[id]||"#64748b";
      return el("div",{class:"rp-sdg-row"},
        el("div",{class:"rp-sdg-dot",style:`background:${c}`},String(id)),
        el("div",{class:"rp-sdg-info"},
          el("div",{class:"rp-sdg-lbl",title:name},name),
          el("div",{class:"rp-sdg-track"},
            el("div",{class:"rp-sdg-bar",style:`width:${score}%;background:${c}`})
          )
        )
      );
    });
    return el("div",{class:"rp-card"},
      el("div",{class:"rp-card-title"},"UN SDGs"),
      el("div",{class:"rp-sdg-list"},...rows)
    );
  }

  function buildChartCard(byYear) {
    const entries = Object.entries(byYear||{});
    if (!entries.length) return el("div",{class:"rp-card rp-chart-card"},el("div",{class:"rp-card-title"},"Output by Year"));
    const maxVal = Math.max(...entries.map(([,v])=>v),1);

    const tip = el("div",{class:"rp-tip"});
    document.body.appendChild(tip);

    const bars = entries.map(([year,count])=>{
      const pct = Math.round((count/maxVal)*100);
      const bar = el("div",{class:"rp-b",style:`height:${Math.max(pct,2)}%`});
      bar.addEventListener("mouseenter", ()=>{ tip.textContent=`${year}: ${count}`; tip.classList.add("on"); });
      bar.addEventListener("mousemove",  e =>{ tip.style.left=(e.clientX+10)+"px"; tip.style.top=(e.clientY-32)+"px"; });
      bar.addEventListener("mouseleave", ()=> tip.classList.remove("on"));
      return el("div",{class:"rp-bc"}, bar, el("span",{class:"rp-byl"},year.slice(2)));
    });

    return el("div",{class:"rp-card rp-chart-card"},
      el("div",{class:"rp-card-title"},"Output by Year"),
      el("div",{class:"rp-chart-wrap"},
        el("div",{class:"rp-chart"},...bars)
      )
    );
  }

  function buildFingerprintCard(fingerprint, publications) {
    // Use precomputed fingerprint; fallback to computing from titles
    let fp = (fingerprint && fingerprint.length) ? fingerprint : computeFingerprint(publications||[]);
    if (!fp.length) return null;
    fp = fp.slice(0,16);
    const rows = fp.map(({term,score})=>
      el("div",{class:"rp-fp-row"},
        el("span",{class:"rp-fp-term",title:term},term),
        el("div",{class:"rp-fp-track"},el("div",{class:"rp-fp-bar",style:`width:${score}%`})),
        el("span",{class:"rp-fp-pct"},`${score}%`)
      )
    );
    return el("div",{class:"rp-card rp-fp-card"},
      el("div",{class:"rp-card-title"},"Digital Fingerprint"),
      el("div",{class:"rp-fp-grid"},...rows)
    );
  }

  function buildPublicationsCard(publications, generatedAt) {
    const PAGE=10; let shown=PAGE; let filtered=[...publications];
    const searchEl=el("input",{type:"text",placeholder:"Search title or journal…"});
    const yearEl=el("select",{});
    [...new Set(publications.map(p=>p.year).filter(Boolean))].sort((a,b)=>b-a)
      .forEach(y=>{ if(!yearEl.options.length) yearEl.appendChild(el("option",{value:""},"All years")); yearEl.appendChild(el("option",{value:y},String(y))); });
    if(!yearEl.options.length) yearEl.appendChild(el("option",{value:""},"All years"));

    const scrollEl=el("div",{class:"rp-pub-scroll"});
    const countEl=el("span",{class:"rp-pub-count"});
    const moreBtn=el("button",{class:"rp-more-btn"},"Load more ↓");

    function render() {
      const items=filtered.slice(0,shown).map(p=>{
        const tNode=p.doi
          ? el("a",{href:`https://doi.org/${p.doi}`,target:"_blank"},p.title)
          : document.createTextNode(p.title||"Untitled");
        return el("li",{class:"rp-pub-li"},
          el("span",{class:"rp-yr"},String(p.year||"—")),
          el("div",{class:"rp-pub-body"},
            el("div",{class:"rp-pub-t"},tNode),
            el("div",{class:"rp-pub-m"},
              p.journal ? el("span",{},p.journal) : null,
              p.cited_by>0 ? el("span",{class:"rp-cite"},`↑${p.cited_by}`) : null,
            )
          )
        );
      });
      scrollEl.innerHTML="";
      scrollEl.appendChild(items.length
        ? el("ul",{class:"rp-pub-ul"},...items)
        : el("div",{class:"rp-no-res"},"No results."));
      countEl.textContent=`${Math.min(shown,filtered.length)} / ${filtered.length}`;
      moreBtn.style.display=shown<filtered.length?"inline":"none";
    }

    function applyFilters(){
      const q=searchEl.value.toLowerCase(), yr=yearEl.value;
      filtered=publications.filter(p=>
        (!q||(p.title||"").toLowerCase().includes(q)||(p.journal||"").toLowerCase().includes(q))&&
        (!yr||String(p.year)===yr));
      shown=PAGE; render();
    }

    searchEl.addEventListener("input",applyFilters);
    yearEl.addEventListener("change",applyFilters);
    moreBtn.addEventListener("click",()=>{shown+=PAGE;render();});
    render();

    return el("div",{class:"rp-pub-card"},
      el("div",{class:"rp-pub-head"},
        el("div",{class:"rp-card-title"},"Publications"),
        el("div",{class:"rp-pub-ctrl"},searchEl,yearEl)
      ),
      scrollEl,
      el("div",{class:"rp-pub-footer"},
        countEl, moreBtn,
        generatedAt?el("span",{class:"rp-updated"},`↻ ${generatedAt}`):null,
      )
    );
  }

  // ── Widget root ────────────────────────────────────────────────────────────
  function buildWidget(data, container) {
    const {author,sdgs,fingerprint,publications,publications_by_year,generated_at}=data;

    const style=document.createElement("style");
    style.textContent=CSS;
    document.head.appendChild(style);

    const fpCard=buildFingerprintCard(fingerprint, publications);

    container.innerHTML="";
    container.appendChild(
      el("div",{class:"rp"},
        el("div",{class:"rp-grid"},
          // Left column
          el("div",{class:"rp-left"},
            el("div",{class:"rp-top-row",style:"display:grid;grid-template-columns:1fr 1fr;gap:12px;flex-shrink:0"},
              buildMetricsCard(author),
              buildSDGCard(sdgs)
            ),
            buildChartCard(publications_by_year)
          ),
          // Right column
          el("div",{class:"rp-right"},
            fpCard,
            buildPublicationsCard(publications,generated_at)
          )
        )
      )
    );
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  async function init() {
    const container=document.getElementById("research-profile");
    if (!container) return;
    try {
      const r=await fetch(DATA_URL);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      buildWidget(await r.json(), container);
    } catch(e) {
      console.warn("research-widgets:",e);
    }
  }

  document.readyState==="loading"
    ? document.addEventListener("DOMContentLoaded",init)
    : init();
})();
