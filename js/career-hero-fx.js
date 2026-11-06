/* Career Support hero: a glowing six-step journey (assessment -> placement) */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".cr")) return;
  hero.classList.add("has-cr");

  var steps = [
    ["Assessment", '<path d="M4 17a8 8 0 1 1 16 0M12 17l4-5M3 20h18"/>'],
    ["Resume", '<path d="M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6"/>'],
    ["Interview", '<path d="M4 5h16v10H9l-5 4zM8 9h8"/>'],
    ["Mock Interviews", '<path d="M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM6 11a6 6 0 0012 0M12 17v4M9 21h6"/>'],
    ["Guidance", '<path d="M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z"/>'],
    ["Placement", '<path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16"/>']
  ];
  var Y = [58, 38, 58, 38, 58, 38], W = 600, H = 96;

  /* per-node keyframes so each milestone lights up exactly when the path reaches it */
  var css = "";
  steps.forEach(function (s, i) {
    var tp = Math.round(((i + 0.5) / 6) * 11 / 14 * 1000) / 10;
    css += "@keyframes crN" + i + "{0%," + (tp - 1) + "%{border-color:rgba(140,190,255,.45);background:rgba(8,30,95,.7);color:rgba(190,225,255,.8);transform:scale(1)}" +
      tp + "%{border-color:#ffd28a;background:rgba(255,170,50,.28);color:#fff;transform:scale(1.22)}" +
      (tp + 4) + "%,93%{border-color:#ffc15a;background:rgba(255,170,50,.2);color:#fff;transform:scale(1.06)}" +
      "97%,100%{border-color:rgba(140,190,255,.45);background:rgba(8,30,95,.7);color:rgba(190,225,255,.8);transform:scale(1)}}" +
      "@keyframes crG" + i + "{0%," + (tp - 1) + "%{opacity:0}" + tp + "%{opacity:1}" + (tp + 4) + "%,93%{opacity:.7}97%,100%{opacity:0}}" +
      "@keyframes crL" + i + "{0%," + (tp - 1) + "%{color:rgba(190,225,255,.55)}" + tp + "%,93%{color:#fff}97%,100%{color:rgba(190,225,255,.55)}}";
  });
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var pts = steps.map(function (s, i) { return [(i + 0.5) * (W / 6), Y[i]]; });
  var d = "M0 " + Y[0];
  pts.forEach(function (p, i) {
    var prev = i ? pts[i - 1] : [0, Y[0]];
    var mx = (prev[0] + p[0]) / 2;
    d += "C" + mx + " " + prev[1] + " " + mx + " " + p[1] + " " + p[0] + " " + p[1];
  });
  d += "C" + (W - 25) + " " + Y[5] + " " + (W - 10) + " " + Y[5] + " " + W + " " + Y[5];

  var nodes = "";
  steps.forEach(function (s, i) {
    var last = i === 5;
    nodes += '<div class="cr-node" style="left:' + ((i + 0.5) / 6 * 100) + '%;top:' + Y[i] + 'px">' +
      '<span class="cr-dot" style="animation-name:crN' + i + ';--gn:crG' + i + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + s[1] + "</svg></span>" +
      (last ? '<i class="cr-ring"></i><i class="cr-ring r2"></i>' : "") +
      '<em style="animation-name:crL' + i + '">' + s[0] + "</em></div>";
  });

  var stars = "";
  for (var k = 0; k < 16; k++)
    stars += '<i class="cr-star" style="left:' + (4 + k * 6) + '%;animation-duration:' + (9 + (k % 5) * 2.5) + 's;animation-delay:-' + (k * 1.7).toFixed(1) + 's"></i>';

  var cap = '<svg class="cr-icon cap" viewBox="0 0 64 64"><path d="M32 12L5 25L32 38L59 25Z"/><path d="M16 31V43C16 47 24 51 32 51C40 51 48 47 48 43V31"/><path d="M59 25V41M59 41v6"/></svg>';
  var brief = '<svg class="cr-icon bag" viewBox="0 0 64 64"><rect x="8" y="22" width="48" height="32" rx="4"/><path d="M24 22V14H40V22M8 36H56M28 36V43H36V36"/></svg>';

  hero.insertAdjacentHTML("afterbegin",
    '<div class="cr" aria-hidden="true"><span class="cr-rise"></span>' + stars + cap + brief +
    '<div class="cr-lane"><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><path class="cr-base" d="' + d + '"/>' +
    '</svg><div class="cr-clip"><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><path class="cr-glow" d="' + d + '"/><path class="cr-line" d="' + d + '"/></svg></div>' + nodes + "</div></div>");
})();
