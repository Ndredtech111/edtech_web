/* Projects hero: code window -> blocks travelling across -> finished live app */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".pj")) return;
  hero.classList.add("has-pj");

  var CUBE = '<svg viewBox="0 0 26 28"><path class="t" d="M13 2L24 8L13 14L2 8Z"/><path class="l" d="M2 8L13 14V26L2 20Z"/><path class="r" d="M24 8L13 14V26L24 20Z"/></svg>';
  var cubes = "";
  [[10, 0, 0], [8, 4.5, 0.4], [86, 2.2, 0.8], [88, 6.7, 1.2]].forEach(function (c, i) {
    cubes += '<span class="pj-cube" style="top:' + c[0] + '%;animation-delay:-' + c[1] + 's"><span class="pj-bob" style="animation-delay:-' + c[2] + 's">' + CUBE + "</span></span>";
  });

  var code =
    '<div class="pj-ln" style="--n:25;--d:0s"><i class="k">const</i> app = <i class="f">build</i>();</div>' +
    '<div class="pj-ln" style="--n:19;--d:.9s">app.<i class="f">add</i>(<i class="s">"api"</i>);</div>' +
    '<div class="pj-ln" style="--n:21;--d:1.8s">app.<i class="f">add</i>(<i class="s">"ui"</i>);</div>' +
    '<div class="pj-ln" style="--n:11;--d:2.7s">app.<i class="f">test</i>();</div>' +
    '<div class="pj-ln" style="--n:13;--d:3.6s">app.<i class="f">deploy</i>();<b class="cur"></b></div>';

  var bars = "";
  [46, 70, 54, 86, 64, 96].forEach(function (h, i) { bars += '<i style="height:' + h + '%;animation-delay:-' + (i * 0.45).toFixed(2) + 's"></i>'; });

  hero.insertAdjacentHTML("afterbegin",
    '<div class="pj" aria-hidden="true">' +
      '<span class="pj-grid"></span><span class="pj-scan"></span>' +
      '<div class="pj-win code"><div class="pj-bar"><b></b><b></b><b></b><span>app.js</span></div><div class="pj-code">' + code + "</div></div>" +
      cubes +
      '<div class="pj-win live"><div class="pj-bar"><b></b><b></b><b></b><span><em class="dot"></em> LIVE</span></div>' +
        '<div class="pj-dash"><div class="pj-chart">' + bars + '</div>' +
        '<svg class="pj-line" viewBox="0 0 100 40" preserveAspectRatio="none"><path pathLength="100" d="M2 34L20 24L38 28L58 12L78 18L98 4"/></svg>' +
        '<div class="pj-stats"><span></span><span></span></div></div></div>' +
    "</div>");
})();
