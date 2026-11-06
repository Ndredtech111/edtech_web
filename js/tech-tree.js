/* Animated IT Technology Tree for the hero panel — generated entirely in code (SVG + CSS + a tiny rAF loop). */
(function () {
  var host = document.getElementById("techTree");
  if (!host) return;
  var frame = host.closest(".tt-frame") || host.parentNode;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  /* ---------- data ---------- */
  var ROOT_Y = 402, CROWN = { x: 320, y: 96 };
  var branches = [
    { label: "DATA ENGINEERING", glyph: "DE",  side: "L", y: 110, attach: 188, color: "#1726A8", leaves: ["Snowflake", "SQL", "Python", "dbt", "Apache Airflow"] },
    { label: "CLOUD COMPUTING",  glyph: "CL",  side: "L", y: 215, attach: 268, color: "#0891B2", leaves: ["AWS", "Microsoft Azure", "Google Cloud", "Cloud Architecture", "DevOps"] },
    { label: "DATA ANALYTICS",   glyph: "BI",  side: "L", y: 320, attach: 348, color: "#7C3AED", leaves: ["Power BI", "Tableau", "Advanced SQL", "Data Visualization"] },
    { label: "DEVELOPMENT",      glyph: "</>", side: "R", y: 110, attach: 198, color: "#2563EB", leaves: ["Java", "Python", "JavaScript", "React", "API Development"] },
    { label: "CYBER SECURITY",   glyph: "SEC", side: "R", y: 215, attach: 278, color: "#E8590C", leaves: ["Network Security", "Ethical Hacking", "Cloud Security", "Security Operations"] },
    { label: "DATABASES",        glyph: "DB",  side: "R", y: 320, attach: 358, color: "#4F46E5", leaves: ["Snowflake", "MySQL", "PostgreSQL", "Oracle"] }
  ];
  var snippets = ["01", "{ }", "</>", "SELECT", "def", "git", "=>", "10110", "SQL", "API", "()", "#", "AWS", "0xFF", "if", "ETL"];

  /* ---------- helpers ---------- */
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function txt(parent, x, y, s, cls) { var t = el("text", { x: x, y: y, "class": cls }, parent); t.textContent = s; return t; }
  function grow(path, delay, dur) { path.setAttribute("pathLength", "1"); path.classList.add("tt-grow"); path.style.setProperty("--d", delay + "s"); path.style.setProperty("--t", (dur || 1.1) + "s"); }
  function fade(node, delay) { node.classList.add("tt-fade"); node.style.setProperty("--d", delay + "s"); }
  function pop(node, delay) { node.classList.add("tt-pop"); node.style.setProperty("--d", delay + "s"); }

  /* ---------- svg scaffold ---------- */
  var rainSvg = el("svg", { viewBox: "0 0 640 420", "class": "tt-svg tt-svg-rain", "aria-hidden": "true", focusable: "false" }, host);
  host.classList.add("tt-wait"); /* animations stay paused until the page has settled (see start() below) */
  var svg = el("svg", { viewBox: "0 0 640 420", "class": "tt-svg tt-svg-main", role: "img", "aria-label": "Animated technology tree: Software and IT technology growing into Data Engineering, Cloud Computing, Data Analytics, Development, Cyber Security and Databases." }, host);
  var defs = el("defs", {}, svg);
  var g1 = el("linearGradient", { id: "ttTrunk", gradientUnits: "userSpaceOnUse", x1: "0", y1: String(ROOT_Y), x2: "0", y2: String(CROWN.y) }, defs);
  [["0", "#1726A8"], ["55", "#22D3EE"], ["100", "#8B5CF6"]].forEach(function (s) { el("stop", { offset: s[0] + "%", "stop-color": s[1] }, g1); });
  var gRoot = el("linearGradient", { id: "ttRoot", x1: "0", y1: "0", x2: "1", y2: "0" }, defs);
  [["0", "#1726A8"], ["100", "#3B5BFF"]].forEach(function (s) { el("stop", { offset: s[0] + "%", "stop-color": s[1] }, gRoot); });

  /* background code rain (parallax layer) */
  var rain = el("g", { "class": "tt-rain" }, rainSvg);
  for (var i = 0; i < 16; i++) {
    var rx = 14 + ((i * 97) % 612), ry = 30 + ((i * 53) % 360);
    var t = txt(rain, rx, ry, snippets[i % snippets.length], "tt-code");
    t.style.animationDuration = (9 + (i % 7) * 1.6) + "s";
    t.style.animationDelay = "-" + ((i * 1.7) % 12).toFixed(1) + "s";
  }

  /* tree (parallax layer) */
  var tree = el("g", { "class": "tt-tree" }, svg);
  var flowPaths = [];

  /* trunk */
  var trunk = el("path", { "class": "tt-line tt-trunk", d: "M320 " + (ROOT_Y - 18) + " V" + (CROWN.y + 12), stroke: "url(#ttTrunk)" }, tree);
  grow(trunk, 0.35, 1.6);
  flowPaths.push({ d: trunk.getAttribute("d"), dur: 3.4, delay: 0, after: 2.1 }, { d: trunk.getAttribute("d"), dur: 3.4, delay: 1.7, after: 2.1 });

  /* branches */
  branches.forEach(function (b, bi) {
    var L = b.side === "L", dx = L ? 170 : 470, base = 0.95 + bi * 0.22;
    var grp = el("g", { "class": "tt-b", style: "--c:" + b.color }, tree);

    var d = "M320 " + b.attach + " C" + (L ? 262 : 378) + " " + b.attach + "," + (L ? 232 : 408) + " " + b.y + "," + (L ? dx + 15 : dx - 15) + " " + b.y;
    var bp = el("path", { "class": "tt-line tt-branch", d: d, stroke: b.color }, grp);
    grow(bp, base, 1.0);
    flowPaths.push({ d: d, dur: 3 + (bi % 3) * 0.4, delay: bi * 0.55, color: b.color, after: base + 1.2 });

    /* leaves */
    var n = b.leaves.length;
    b.leaves.forEach(function (name, li) {
      var ly = b.y + (li - (n - 1) / 2) * 18.5;
      var pillX = L ? 12 : 538, dotX = L ? 108 : 532, startX = L ? dx - 15 : dx + 15;
      var ld = "M" + startX + " " + b.y + " C" + (L ? dx - 38 : dx + 38) + " " + b.y + "," + (L ? dotX + 24 : dotX - 24) + " " + ly + "," + dotX + " " + ly;
      var lp = el("path", { "class": "tt-line tt-twig", d: ld, stroke: b.color }, grp);
      fade(lp, base + 0.95 + li * 0.07);
      var leaf = el("g", { "class": "tt-leaf", tabindex: "0" }, grp);
      el("circle", { "class": "tt-dot", cx: dotX, cy: ly, r: 3.2, fill: b.color }, leaf);
      el("rect", { "class": "tt-pill", x: pillX, y: ly - 8, width: 96, height: 16, rx: 8, stroke: b.color }, leaf);
      txt(leaf, pillX + 48, ly + 3.4, name, "tt-leaf-t");
      el("title", {}, leaf).textContent = name;
      fade(leaf, base + 1.15 + li * 0.07);
    });

    /* domain node */
    var node = el("g", { "class": "tt-domain", tabindex: "0" }, grp);
    el("circle", { "class": "tt-halo", cx: dx, cy: b.y, r: 22, fill: b.color }, node);
    el("circle", { "class": "tt-core", cx: dx, cy: b.y, r: 15, stroke: b.color }, node);
    txt(node, dx, b.y + 3, b.glyph, "tt-glyph").setAttribute("fill", b.color);
    txt(node, dx, b.y - 24, b.label, "tt-label");
    el("title", {}, node).textContent = b.label;
    pop(node, base + 0.85);
  });

  /* crown + root */
  var crown = el("g", { "class": "tt-crown" }, tree);
  el("circle", { "class": "tt-halo tt-crown-halo", cx: CROWN.x, cy: CROWN.y, r: 26, fill: "#FF914D" }, crown);
  el("circle", { "class": "tt-orbit", cx: CROWN.x, cy: CROWN.y, r: 24 }, crown);
  el("circle", { "class": "tt-crown-core", cx: CROWN.x, cy: CROWN.y, r: 15 }, crown);
  txt(crown, CROWN.x, CROWN.y + 3.4, "</>", "tt-crown-t");
  pop(crown, 1.7);

  var root = el("g", { "class": "tt-root" }, tree);
  el("rect", { x: 208, y: ROOT_Y - 12, width: 224, height: 24, rx: 12 }, root);
  txt(root, 320, ROOT_Y + 3.6, "SOFTWARE & IT TECHNOLOGY", "tt-root-t");
  pop(root, 0.1);

  /* travelling particles */
  var movers = [];
  if (!reduce) {
    var pg = el("g", { "class": "tt-pg", "aria-hidden": "true" }, svg);
    flowPaths.forEach(function (f) {
      var probe = el("path", { d: f.d }, svg), len = probe.getTotalLength(), N = 120, xs = [], ys = [];
      for (var i = 0; i <= N; i++) { var p = probe.getPointAtLength(len * i / N); xs.push(p.x); ys.push(p.y); }
      svg.removeChild(probe);
      var g = el("g", { "class": "tt-pt", opacity: "0" }, pg);
      el("circle", { r: 7, fill: f.color || "#22D3EE", opacity: ".22" }, g);
      el("circle", { r: 2.6, fill: "#fff", stroke: f.color || "#22D3EE", "stroke-width": "1.4" }, g);
      movers.push({ g: g, xs: xs, ys: ys, N: N, dur: f.dur, delay: f.after + f.delay });
    });
  }

  /* ---------- animation loop (only while visible) ---------- */
  var on = true, started = false, t0 = performance.now();
  var tx = 0, ty = 0, cx = 0, cy = 0, lx = 9, ly = 9;
  function frameLoop(now) {
    if (on && started && !document.hidden) {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      if (Math.abs(cx - lx) + Math.abs(cy - ly) > 0.002) {
        lx = cx; ly = cy;
        rainSvg.style.transform = "translate3d(" + (cx * -9).toFixed(2) + "px," + (cy * -7).toFixed(2) + "px,0)";
        svg.style.transform = "translate3d(" + (cx * 6).toFixed(2) + "px," + (cy * 4).toFixed(2) + "px,0)";
      }
      var sec = (now - t0) / 1000;
      for (var i = 0; i < movers.length; i++) {
        var m = movers[i], ph = ((sec - m.delay) / m.dur);
        if (ph < 0) { continue; }
        ph = ph % 1;
        var f = ph * m.N, k = f | 0, w = f - k, k2 = k < m.N ? k + 1 : m.N;
        var x = m.xs[k] + (m.xs[k2] - m.xs[k]) * w, y = m.ys[k] + (m.ys[k2] - m.ys[k]) * w;
        var fade = Math.min(1, ph / 0.14, (1 - ph) / 0.14);
        m.g.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
        m.g.style.opacity = (fade * fade * (3 - 2 * fade)).toFixed(2);
      }
    }
    requestAnimationFrame(frameLoop);
  }
  if (!reduce) requestAnimationFrame(frameLoop);
  if ("IntersectionObserver" in window)
    new IntersectionObserver(function (es) { on = es[0].isIntersecting; frame.classList.toggle("tt-paused", !on); }, { threshold: 0.05 }).observe(frame);

  /* ---------- mouse parallax (desktop, pointer devices only): eased in the loop above ---------- */
  if (!reduce && window.matchMedia("(pointer:fine)").matches) {
    frame.addEventListener("pointermove", function (e) {
      var r = frame.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    frame.addEventListener("pointerleave", function () { tx = 0; ty = 0; });
  }

  /* ---------- start only when the page is idle: fonts ready, window loaded, hero unveil finished ---------- */
  function start() {
    if (started) return;
    started = true; t0 = performance.now();
    requestAnimationFrame(function () { requestAnimationFrame(function () { host.classList.remove("tt-wait"); }); });
  }
  var gates = [
    new Promise(function (r) { if (document.readyState === "complete") r(); else window.addEventListener("load", r, { once: true }); }),
    (document.fonts && document.fonts.ready) || Promise.resolve(),
    new Promise(function (r) { setTimeout(r, 1700); })
  ];
  Promise.all(gates).then(function () { (window.requestIdleCallback || function (f) { setTimeout(f, 60); })(start, { timeout: 800 }); });
  setTimeout(start, 4500); /* safety net */
})();
