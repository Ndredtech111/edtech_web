/* About hero: aurora glow + floating glass code windows + drifting binary */
(function () {
  var hero = document.querySelector(".about-hero");
  if (!hero || hero.querySelector(".hx")) return;

  var py = [
    ['<i class="k">def</i> <i class="f">build_pipeline</i>(src):', 0],
    ['  df = <i class="f">extract</i>(src)', 1],
    ['  df = <i class="f">transform</i>(df)', 2],
    ['  <i class="f">load</i>(df, <i class="s">"warehouse"</i>)', 3],
    ['  <i class="k">return</i> <i class="s">"ready"</i>', 4]
  ];
  var sql = [
    ['<i class="k">SELECT</i> course, <i class="f">COUNT</i>(*)', 0],
    ['<i class="k">FROM</i> learners', 1],
    ['<i class="k">WHERE</i> placed = <i class="s">true</i>', 2],
    ['<i class="k">GROUP BY</i> course;', 3],
    ['<i class="c">-- career ready</i>', 4]
  ];
  function win(title, lines, cls) {
    var h = '<div class="hx-win ' + cls + '"><div class="hx-bar"><b></b><b></b><b></b><span>' + title + '</span></div><div class="hx-code">';
    lines.forEach(function (l) { h += '<div class="hx-ln" style="animation-delay:' + (0.6 + l[1] * 0.7) + 's">' + l[0] + "</div>"; });
    return h + '<span class="hx-cur"></span></div></div>';
  }
  var bin = "";
  for (var i = 0; i < 14; i++) {
    var col = "";
    for (var j = 0; j < 14; j++) col += (Math.random() > 0.5 ? "1" : "0") + "<br>";
    bin += '<span class="hx-bin" style="left:' + (3 + i * 7.1) + '%;animation-duration:' + (14 + (i % 5) * 3) + 's;animation-delay:-' + (i * 2.3) + 's">' + col + "</span>";
  }
  hero.insertAdjacentHTML("afterbegin",
    '<div class="hx" aria-hidden="true"><span class="hx-a a1"></span><span class="hx-a a2"></span><span class="hx-a a3"></span>' +
    bin + win("pipeline.py", py, "hx-l") + win("insights.sql", sql, "hx-r") +
    '<span class="hx-chip c1">ETL</span><span class="hx-chip c2">Cloud</span><span class="hx-chip c3">DevOps</span><span class="hx-chip c4">Data</span></div>');
})();
