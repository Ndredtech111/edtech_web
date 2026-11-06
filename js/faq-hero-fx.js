/* FAQ hero: a live Q&A conversation - questions pop up on the left, answers reply on the right */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".fq")) return;
  hero.classList.add("has-fq");

  var Q = "M16 2H204a14 14 0 0 1 14 14V46a14 14 0 0 1-14 14H52L30 74V60H16A14 14 0 0 1 2 46V16A14 14 0 0 1 16 2Z";
  var A = "M16 2H204a14 14 0 0 1 14 14V46a14 14 0 0 1-14 14H190V74L168 60H16A14 14 0 0 1 2 46V16A14 14 0 0 1 16 2Z";
  var CYCLE = 12;

  /* a start time s (seconds into the 12s loop) -> a negative delay so it is idle until s, then repeats */
  function dl(s) { return "animation-delay:-" + (CYCLE - s).toFixed(2) + "s"; }

  function q(cls, s, l1, l2) {
    return '<div class="fq-b q ' + cls + '" style="' + dl(s) + '"><svg viewBox="0 0 220 76">' +
      '<path class="bd" d="' + Q + '"/><circle class="bg" cx="30" cy="31" r="14"/>' +
      '<path class="qm" d="M25 27a5 5 0 1 1 7 4.500c-1.500 1-2 2-2 3.500M30 40.500v.500"/>' +
      '<path class="ln" d="M56 24H' + l1 + '"/><path class="ln" d="M56 39H' + l2 + '"/></svg></div>';
  }
  function a(cls, s, l1, l2) {
    return '<div class="fq-b a ' + cls + '" style="' + dl(s) + '"><svg viewBox="0 0 220 76">' +
      '<path class="bd" d="' + A + '"/><circle class="bg" cx="30" cy="31" r="14"/>' +
      '<path class="ck" style="' + dl(s + 0.35) + '" d="M23 31l5 5 10-11"/>' +
      '<path class="ln" d="M56 24H' + l1 + '"/><path class="ln" d="M56 39H' + l2 + '"/></svg></div>';
  }
  function dots(cls, s) {
    return '<div class="fq-t ' + cls + '" style="' + dl(s) + '"><i></i><i></i><i></i></div>';
  }

  var marks = "";
  for (var k = 0; k < 9; k++) {
    marks += '<span class="fq-m" style="left:' + (6 + k * 11) + '%;font-size:' + (22 + (k % 4) * 10) + 'px;animation-duration:' + (11 + (k % 4) * 3) + 's;animation-delay:-' + (k * 2.3).toFixed(1) + 's">' + (k % 3 === 2 ? "!" : "?") + "</span>";
  }

  hero.insertAdjacentHTML("afterbegin",
    '<div class="fq" aria-hidden="true"><span class="fq-glow l"></span><span class="fq-glow r"></span>' + marks +
    q("q1", 0, 190, 150) + dots("d1", 1.3) + a("a1", 2.4, 196, 168) +
    q("q2", 5.4, 180, 120) + dots("d2", 6.7) + a("a2", 7.8, 190, 150) + "</div>");
})();
