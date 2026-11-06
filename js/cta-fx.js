/* Inject the animated IT-themed background layer into every .cta-banner */
(function () {
  var glyph = {
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    cloud: '<path d="M7 18a4 4 0 010-8 5.500 5.500 0 0110.500 1.500A3.300 3.300 0 0117 18H7z"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.700 3 3 7 3s7-1.300 7-3V6M5 12v6c0 1.700 3 3 7 3s7-1.300 7-3v-6"/>',
    shield: '<path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6l7-3z"/><path d="M9.500 12l2 2 3.500-4"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.500" y="9.500" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    brace: '<path d="M9 4C6 4 7 9 5 12c2 3 1 8 4 8M15 4c3 0 2 5 4 8-2 3-1 8-4 8"/>',
    flake: '<path d="M12 2v20M3.300 7l17.400 10M3.300 17L20.700 7"/>',
    term: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>'
  };
  var pos = [
    ["code", "6%", "14%", 46, 0], ["cloud", "18%", "68%", 54, -3], ["db", "84%", "16%", 48, -6],
    ["shield", "91%", "62%", 50, -2], ["chip", "70%", "74%", 42, -8], ["brace", "32%", "10%", 40, -5],
    ["term", "50%", "80%", 44, -9], ["flake", "76%", "8%", 36, -4]
  ];
  document.querySelectorAll(".cta-banner").forEach(function (b) {
    if (b.querySelector(".cta-fx")) return;
    var g = pos.map(function (p) {
      return '<span class="g" style="left:' + p[1] + ';top:' + p[2] + ';width:' + p[3] + 'px;height:' + p[3] +
        'px;animation-delay:' + p[4] + 's"><svg viewBox="0 0 24 24">' + glyph[p[0]] + '</svg></span>';
    }).join("");
    var t1 = "M0 120 H160 L200 80 H420 L460 120 H700 L740 70 H1000", t2 = "M1000 300 H820 L780 260 H560 L520 300 H300 L260 340 H0",
        t3 = "M0 220 H120 L160 260 H360 L400 200 H640 L680 240 H1000";
    b.insertAdjacentHTML("afterbegin",
      '<div class="cta-fx" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid"></span>' +
      '<svg viewBox="0 0 1000 400" preserveAspectRatio="none">' +
      '<path class="trace" d="' + t1 + '"/><path class="trace" d="' + t2 + '"/><path class="trace" d="' + t3 + '"/>' +
      '<path class="pulse" d="' + t1 + '"/><path class="pulse p2" d="' + t2 + '"/><path class="pulse p3" d="' + t3 + '"/>' +
      '<circle class="node" cx="200" cy="80" r="3.500"/><circle class="node" cx="740" cy="70" r="3.500"/><circle class="node" cx="520" cy="300" r="3.500"/><circle class="node" cx="400" cy="200" r="3.500"/><circle class="node" cx="160" cy="260" r="3.500"/>' +
      '</svg>' + g + '<span class="shine"></span></div>');
  });
})();
