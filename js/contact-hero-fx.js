/* Contact hero: a message leaves an envelope, flies across as a paper plane and lands on our location pin */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".ct")) return;
  hero.classList.add("has-ct");

  var CYCLE = 6;   /* seconds, matches the CSS loop */

  var env =
    '<div class="ct-env"><svg viewBox="0 0 150 110">' +
    '<g class="paper"><rect x="26" y="40" width="98" height="50" rx="4"/><path d="M38 54H100M38 66H88"/></g>' +
    '<path class="front" d="M8 40V94a8 8 0 0 0 8 8H134a8 8 0 0 0 8-8V40L75 84Z"/>' +
    '<path class="line" d="M8 100L56 64M142 100L94 64"/>' +
    '<g class="flap"><path d="M8 38L75 84L142 38Z"/></g></svg>' +
    '<span class="badge">1</span></div>';

  var map =
    '<div class="ct-map"><svg class="rd" viewBox="0 0 220 150" preserveAspectRatio="none">' +
    '<path d="M0 100C50 95 80 60 130 64S190 40 220 30"/><path d="M60 0C70 40 64 90 90 150"/><path d="M150 0C146 50 170 100 160 150"/></svg>' +
    '<div class="ct-pinbox"><i class="rip"></i><i class="rip r2"></i><svg class="pin" viewBox="-20 -34 40 40"><path d="M0 0C-9-12-16-18-16-27a16 16 0 0 1 32 0C16-18 9-12 0 0Z"/><circle cx="0" cy="-27" r="5.500"/></svg></div>' +
    '<span class="tag">BTM Layout, Bengaluru</span>' +
    '<div class="ct-phone"><i class="wv"></i><i class="wv w2"></i><svg viewBox="0 0 24 24"><path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.250.2 2.450.6 3.600a1 1 0 0 1-.25 1z"/></svg></div></div>';

  var bits = "";
  for (var k = 0; k < 8; k++)
    bits += '<span class="ct-bit" style="left:' + (8 + k * 12) + '%;animation-duration:' + (10 + (k % 4) * 3) + 's;animation-delay:-' + (k * 2.1).toFixed(1) + 's">' + (k % 2 ? "@" : "✉") + "</span>";

  hero.insertAdjacentHTML("afterbegin",
    '<div class="ct" aria-hidden="true"><span class="ct-glow l"></span><span class="ct-glow r"></span>' + bits +
    '<svg class="ct-route"></svg>' + env + map + "</div>");

  var layer = hero.querySelector(".ct"), svg = layer.querySelector(".ct-route"),
      envEl = layer.querySelector(".ct-env"), mapEl = layer.querySelector(".ct-map"), pinEl = layer.querySelector(".ct-pinbox");
  /* the decorative map card opens the real location */
  if (mapEl) {
    mapEl.style.pointerEvents = "auto"; mapEl.style.cursor = "pointer"; mapEl.title = "Open in Google Maps";
    mapEl.addEventListener("click", function () { window.open("https://maps.app.goo.gl/LKn871JTzhqkNUef9", "_blank", "noopener"); });
  }
  var NS = "http://www.w3.org/2000/svg", path, trail, plane, len = 0, t0 = performance.now(), run = false;

  function build() {
    var h = layer.getBoundingClientRect(), a = envEl.getBoundingClientRect(), b = pinEl.getBoundingClientRect();
    if (!h.width || getComputedStyle(envEl).display === "none") { run = false; return; }
    var sx = a.right - h.left - 40, sy = a.top - h.top + 18, ex = b.left - h.left + b.width / 2, ey = b.top - h.top + b.height * 0.55;
    var dx = ex - sx, top = 12;
    svg.setAttribute("width", h.width); svg.setAttribute("height", h.height);
    svg.setAttribute("viewBox", "0 0 " + h.width + " " + h.height);
    var d = "M" + sx + " " + sy + "C" + (sx + dx * 0.28) + " " + top + " " + (ex - dx * 0.28) + " " + top + " " + ex + " " + (ey - 26);
    svg.innerHTML =
      '<path class="rt" d="' + d + '"/><path class="tr" d="' + d + '"/>' +
      '<g class="pl"><path d="M16 0L-11 -9L-4 0L-11 9Z"/><path class="fd" d="M16 0L-4 0"/></g>';
    path = svg.querySelector(".tr"); trail = path; plane = svg.querySelector(".pl");
    len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    run = true;
  }

  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function frame(now) {
    if (run) {
      var s = ((now - t0) / 1000) % CYCLE, p = 0, vis = 0;
      var f0 = 0.8, f1 = 3.8;                                   /* flight window inside the 6s loop */
      if (s >= f0 && s <= f1) p = ease((s - f0) / (f1 - f0));
      else if (s > f1) p = 1;
      vis = s < 0.6 ? 0 : s < 0.9 ? (s - 0.6) / 0.3 : s < f1 ? 1 : s < f1 + 0.25 ? 1 - (s - f1) / 0.25 : 0;
      var L = p * len, pt = path.getPointAtLength(L), q = path.getPointAtLength(Math.min(len, L + 2));
      var ang = Math.atan2(q.y - pt.y, q.x - pt.x) * 180 / Math.PI;
      plane.setAttribute("transform", "translate(" + pt.x.toFixed(1) + " " + pt.y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")");
      plane.style.opacity = vis;
      trail.style.strokeDashoffset = (len - L).toFixed(1);
      trail.style.opacity = s < f1 + 0.6 ? 1 : Math.max(0, 1 - (s - f1 - 0.6) / 0.8);
    }
    requestAnimationFrame(frame);
  }
  build();
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(build, 150); });
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(frame);
})();
