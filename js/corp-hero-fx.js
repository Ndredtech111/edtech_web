/* Corporate Training hero: AI chip head <-> human brain head, with energy flowing between them */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".cp")) return;
  hero.classList.add("has-cp");

  var layer = document.createElement("div");
  layer.className = "cp"; layer.setAttribute("aria-hidden", "true");
  hero.insertBefore(layer, hero.firstChild);

  var HEAD = "M28 220C34 196 42 180 42 164C18 146 6 108 12 72C20 28 66 4 108 10C146 15 168 40 168 74L170 94L186 122Q186 128 176 129Q178 138 172 140Q176 146 170 150Q172 158 164 164Q160 170 146 174L136 176L134 190C134 204 136 212 138 220";

  function head(kind) {
    var inner;
    if (kind === "ai") {
      var traces = [
        "M54 74H40L28 62", "M54 86H34", "M54 98H38L26 110", "M54 110H44L36 120",
        "M137 74H150L158 66", "M137 86H152", "M137 98H148L156 108", "M137 110H146",
        "M82 54V40L72 30", "M95 54V34", "M108 54V42L118 32",
        "M82 118V132L72 142", "M95 118V138", "M108 118V130L118 140"
      ];
      var t = "", nodes = "";
      traces.forEach(function (d, i) {
        t += '<path class="tr" d="' + d + '"/><path class="tp" style="animation-delay:-' + (i * 0.37).toFixed(2) + 's" pathLength="100" d="' + d + '"/>';
      });
      [[28, 62], [34, 86], [26, 110], [36, 120], [158, 66], [152, 86], [156, 108], [146, 110], [72, 30], [95, 34], [118, 32], [72, 142], [95, 138], [118, 140]]
        .forEach(function (p) { nodes += '<circle class="nd" cx="' + p[0] + '" cy="' + p[1] + '" r="2.2"/>'; });
      inner = t + nodes +
        '<rect class="chip" x="66" y="56" width="58" height="58" rx="9"/><rect class="chip2" x="75" y="65" width="40" height="40" rx="5"/>' +
        '<text class="aitxt" x="95" y="93" text-anchor="middle">AI</text>';
    } else {
      inner =
        '<path class="brain" d="M60 96C48 88 50 70 64 66C62 52 80 44 92 52C100 44 118 46 122 58C136 56 146 70 140 82C150 92 144 108 130 108C128 120 110 122 102 114C92 124 74 120 74 108C64 110 56 104 60 96Z"/>' +
        '<path class="fold" pathLength="100" d="M92 52C90 66 98 70 96 84"/><path class="fold" pathLength="100" d="M122 58C112 66 114 78 122 82"/>' +
        '<path class="fold" pathLength="100" d="M64 66C74 70 76 80 70 88"/><path class="fold" pathLength="100" d="M96 84C104 90 116 88 120 98"/>' +
        '<path class="fold" pathLength="100" d="M74 108C80 98 90 100 96 106"/><path class="fold" pathLength="100" d="M110 70C116 76 128 74 134 82"/>';
    }
    return '<div class="ai-head ' + kind + '"><span class="ai-glow"></span>' +
      '<svg viewBox="0 0 200 220"><path class="hd" d="' + HEAD + '"/>' + inner + "</svg></div>";
  }

  var words = "ARTIFICIAL INTELLIGENCE · MACHINE LEARNING · DATA ENGINEERING · CLOUD · AUTOMATION · ANALYTICS · ";
  layer.innerHTML =
    '<div class="ai-words"><span>' + words + words + '</span></div>' +
    '<svg class="ai-flow" viewBox="0 0 1000 240" preserveAspectRatio="none">' +
    '<defs><linearGradient id="aiGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0"><stop offset="0" stop-color="#3aa0ff"/><stop offset="1" stop-color="#ffa63d"/></linearGradient></defs>' +
    '<path class="fl" d="M105 98C300 10 700 10 895 98"/><path class="fp" pathLength="1000" d="M105 98C300 10 700 10 895 98"/>' +
    '<path class="fl" d="M105 122C300 230 700 230 895 122"/><path class="fp f2" pathLength="1000" d="M105 122C300 230 700 230 895 122"/>' +
    '<path class="fl" d="M105 110C350 150 650 150 895 110"/><path class="fp f3" pathLength="1000" d="M105 110C350 150 650 150 895 110"/></svg>' +
    head("ai") + head("brain");
})();
