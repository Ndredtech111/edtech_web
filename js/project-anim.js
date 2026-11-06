/* Animated, concept-themed scenes for the project cards */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function db(cx, cy, w, h, cls) {
    var rx = w / 2, ry = Math.max(4, h / 5), t = cy - h / 2;
    return '<g class="pa-line ' + (cls || "") + '"><path d="M' + (cx - rx) + ' ' + t + 'v' + h + 'a' + rx + ' ' + ry + ' 0 0 0 ' + w + ' 0v' + (-h) + '"/>' +
      '<ellipse cx="' + cx + '" cy="' + t + '" rx="' + rx + '" ry="' + ry + '"/>' +
      '<path d="M' + (cx - rx) + ' ' + cy + 'a' + rx + ' ' + ry + ' 0 0 0 ' + w + ' 0" opacity=".6"/></g>';
  }
  function pk(path, dur, delay, shape, r) {
    r = r || 3;
    var core = shape === "sq"
      ? '<rect class="pa-pk" x="' + (-r) + '" y="' + (-r) + '" width="' + (2 * r) + '" height="' + (2 * r) + '" rx="1"/>'
      : '<circle class="pa-pk" r="' + r + '"/>';
    /* moved every frame by one shared rAF loop (see bottom): constant speed, no restarts */
    return '<g class="pa-mv" opacity="0" data-d="' + path + '" data-dur="' + dur + '" data-delay="' + delay + '">' +
      '<circle class="pa-halo" r="' + (r * 2.6) + '"/>' + core + '</g>';
  }
  function trace(d) { return '<path class="pa-trace" d="' + d + '"/>'; }
  function gear(cx, cy, r) {
    return '<g class="pa-spin" style="transform-origin:' + cx + 'px ' + cy + 'px">' +
      '<circle class="pa-line" cx="' + cx + '" cy="' + cy + '" r="' + r + '" stroke-dasharray="4.5 3.5"/>' +
      '<circle class="pa-line" cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.55) + '"/></g>';
  }
  function bars(x, base, hs, w, gap) {
    var s = "";
    hs.forEach(function (h, i) {
      var bx = x + i * (w + gap);
      s += '<rect class="pa-bar" style="animation-delay:' + (i * 0.35) + 's;transform-origin:' + (bx + w / 2) + 'px ' + base + 'px" x="' + bx + '" y="' + (base - h) + '" width="' + w + '" height="' + h + '" rx="1.5"/>';
    });
    return s;
  }

  var scenes = {
    "Data Engineering": function () {
      var s = "";
      [42, 88, 134].forEach(function (y, i) {
        s += db(34, y, 26, 22);
        var d = "M48 " + y + " C92 " + y + ",92 88,128 88";
        s += trace(d) + pk(d, 3, i * 0.9) + pk(d, 3, i * 0.9 + 1.5, "", 2.4);
      });
      s += '<rect class="pa-line" x="128" y="62" width="62" height="52" rx="9"/>' + gear(159, 88, 14);
      s += trace("M190 88H236") + pk("M190 88H236", 1.4, 0, "sq") + pk("M190 88H236", 1.4, 0.7, "sq");
      s += db(252, 88, 32, 40, "pa-glow");
      s += trace("M268 88H280");
      s += bars(282, 112, [30, 52, 40], 8, 4);
      return s;
    },
    "Cloud Migration": function () {
      var s = "";
      for (var i = 0; i < 3; i++) s += '<rect class="pa-line" x="30" y="' + (50 + i * 30) + '" width="56" height="22" rx="3"/><circle class="pa-dot" cx="40" cy="' + (61 + i * 30) + '" r="2" style="animation-delay:' + i * 0.4 + 's"/>';
      s += '<path class="pa-line pa-glow" d="M214 118a20 20 0 010-40 28 28 0 0153-6 22 22 0 016 46z"/>';
      [58, 88, 118].forEach(function (y, i) {
        var d = "M88 " + y + " C140 " + (y - 40) + ",180 70,236 96";
        s += trace(d) + pk(d, 3.2, i * 1.0, "sq") + pk(d, 3.2, i * 1.0 + 1.6, "sq", 2.4);
      });
      return s;
    },
    "ETL Pipelines": function () {
      var s = "";
      s += '<path class="pa-line" d="M38 52h50l-18 28v22H56V80z"/><text class="pa-cap" x="63" y="124">EXTRACT</text>';
      s += '<rect class="pa-line" x="126" y="60" width="64" height="48" rx="8"/>' + gear(158, 84, 13) + '<text class="pa-cap" x="158" y="124">TRANSFORM</text>';
      s += db(252, 84, 34, 40, "pa-glow") + '<text class="pa-cap" x="252" y="124">LOAD</text>';
      s += trace("M92 84H124") + trace("M192 84H232");
      s += pk("M92 84H124", 1.5, 0, "sq") + pk("M92 84H124", 1.5, 0.75, "sq") + pk("M192 84H232", 1.5, 0.4) + pk("M192 84H232", 1.5, 1.15);
      return s;
    },
    "Data Warehousing": function () {
      var s = "";
      [[56, 48], [264, 48], [56, 124], [264, 124]].forEach(function (p, i) {
        var d = "M" + p[0] + " " + p[1] + "L160 86";
        s += trace(d) + db(p[0], p[1], 30, 22) + pk(d, 2.6, i * 0.6) + pk("M160 86L" + p[0] + " " + p[1], 2.6, i * 0.6 + 1.3, "sq", 2.4);
      });
      s += db(160, 86, 44, 46, "pa-glow") + '<text class="pa-cap" x="160" y="132">FACT</text>';
      return s;
    },
    "DevOps Automation": function () {
      var path = "M80 86C80 40,150 40,160 86S240 132,240 86C240 40,170 40,160 86S80 132,80 86Z";
      var s = '<path class="pa-trace" d="' + path + '"/>' + pk(path, 6, 0, "", 4) + pk(path, 6, 3, "", 3);
      [["PLAN", 80, 86], ["BUILD", 160, 62], ["TEST", 240, 86], ["DEPLOY", 160, 110]].forEach(function (n, i) {
        s += '<circle class="pa-line pa-node" style="animation-delay:' + i * 1.5 + 's" cx="' + n[1] + '" cy="' + n[2] + '" r="6"/><text class="pa-cap" x="' + n[1] + '" y="' + (n[2] + (i === 1 ? -11 : 17)) + '">' + n[0] + '</text>';
      });
      return s;
    },
    "Software Development": function () {
      var s = '<rect class="pa-line" x="52" y="28" width="216" height="112" rx="8"/><path class="pa-line" d="M52 46H268"/><circle class="pa-dot" cx="64" cy="37" r="2"/><circle class="pa-dot" cx="73" cy="37" r="2" style="animation-delay:.3s"/><circle class="pa-dot" cx="82" cy="37" r="2" style="animation-delay:.6s"/>';
      [[70, 60, 90], [86, 76, 120], [86, 92, 70], [70, 108, 60], [70, 124, 100]].forEach(function (l, i) {
        s += '<rect class="pa-code" style="animation-delay:' + i * 0.8 + 's" x="' + l[0] + '" y="' + l[1] + '" width="' + l[2] + '" height="5" rx="2.5"/>';
      });
      s += '<rect class="pa-cursor" x="178" y="122" width="3" height="9"/>';
      return s;
    },
    "Testing Automation": function () {
      var s = "";
      for (var i = 0; i < 4; i++) {
        var y = 40 + i * 28;
        s += '<rect class="pa-line" x="70" y="' + (y - 9) + '" width="180" height="20" rx="5"/><rect class="pa-code" style="animation-delay:' + i * 0.4 + 's" x="100" y="' + (y - 2.5) + '" width="' + (80 + i * 14) + '" height="5" rx="2.5"/>' +
          '<circle class="pa-line" cx="85" cy="' + y + '" r="6"/><path class="pa-tick" style="animation-delay:' + (i * 1.1) + 's" d="M81.5 ' + y + 'l2.5 2.8 5-5.6"/>';
      }
      return s;
    },
    "Business Intelligence": function () {
      var s = '<path class="pa-line" d="M50 28V140H278" opacity=".7"/>' + bars(70, 140, [44, 70, 52, 88, 64], 18, 12);
      s += '<path class="pa-draw" d="M79 100L121 74 163 88 205 46 247 56"/>';
      return s;
    },
    "Cyber Security": function () {
      var s = '<path class="pa-line pa-glow" d="M160 28l48 20v34c0 30-20 52-48 64-28-12-48-34-48-64V48z"/><path class="pa-tick2" d="M141 84l15 15 26-30"/>';
      s += '<rect class="pa-scan" x="112" y="30" width="96" height="3" rx="1.5"/>';
      [[30, 60, 105], [30, 110, 125], [290, 80, 215], [290, 128, 195]].forEach(function (t, i) {
        var d = "M" + t[0] + " " + t[1] + "L" + t[2] + " " + (t[1] + (i % 2 ? -4 : 4));
        s += trace(d) + pk(d, 2.4, i * 0.6, "sq");
      });
      return s;
    }
  };

  /* ===== Course-specific scenes ===== */
  function cap(x, y, t, extra) { return '<text class="pa-cap" x="' + x + '" y="' + y + '"' + (extra ? ' style="' + extra + '"' : "") + ">" + t + "</text>"; }
  function box(x, y, w, h, cls, st) { return '<rect class="pa-line ' + (cls || "") + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4"' + (st ? ' style="' + st + '"' : "") + "/>"; }
  function mvst(dx, dy, dur, del) { return 'style="--dx:' + dx + "px;--dy:" + dy + "px;animation-duration:" + dur + "s;animation-delay:" + del + 's"'; }
  function person(cx, cy, cls, st) {
    return '<g class="' + (cls || "") + '"' + (st ? ' style="' + st + '"' : "") + '><circle class="pa-line" cx="' + cx + '" cy="' + (cy - 6) + '" r="4.5"/><path class="pa-line" d="M' + (cx - 9) + " " + (cy + 9) + 'a9 8 0 0118 0z"/></g>';
  }
  function cloud(tx, ty, cls) { return '<g transform="translate(' + tx + "," + ty + ')"><path class="pa-line ' + (cls || "") + '" d="M214 118a20 20 0 010-40 28 28 0 0153-6 22 22 0 016 46z"/></g>'; }
  function hex(cx, cy, r, i, n) { var a = (i / n) * Math.PI * 2 - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function tick(x, y, d) { return '<path class="pa-tick" style="animation-delay:' + d + 's" d="M' + (x - 5) + " " + y + 'l3.5 4 7-8"/>'; }
  function link(d, dur, del, shape) { return trace(d) + pk(d, dur, del, shape) + pk(d, dur, del + dur / 2, shape, 2.4); }

  var more = {
    "Kanban": function () {
      var s = "";
      [["TO DO", 24], ["DOING", 118], ["DONE", 212]].forEach(function (c) { s += '<rect class="pa-line" x="' + c[1] + '" y="30" width="84" height="118" rx="7"/>' + cap(c[1] + 42, 44, c[0]); });
      [[32, 54], [32, 78], [126, 54], [220, 54]].forEach(function (p) { s += box(p[0], p[1], 68, 18) + '<rect class="pa-bit" x="' + (p[0] + 8) + '" y="' + (p[1] + 7) + '" width="34" height="4" rx="2"/>'; });
      s += '<rect class="pa-line pa-a pa-hot" x="32" y="102" width="68" height="18" rx="4" ' + mvst(94, -24, 6, 0) + "/>";
      s += '<rect class="pa-line pa-a pa-hot" x="126" y="78" width="68" height="18" rx="4" ' + mvst(94, 0, 6, 3) + "/>";
      return s;
    },
    "Containers": function () {
      var s = '<path class="pa-line pa-glow" d="M34 144h252l-24 22H58z"/>';
      for (var i = 0; i < 4; i++) {
        var x = 50 + i * 56;
        s += '<g class="pa-drop" style="animation-delay:' + (i * 0.55) + 's"><rect class="pa-line" x="' + x + '" y="100" width="48" height="38" rx="4"/><path class="pa-trace" d="M' + (x + 12) + " 100v38M" + (x + 24) + " 100v38M" + (x + 36) + ' 100v38"/></g>';
      }
      s += '<g class="pa-drop" style="animation-delay:2.2s"><rect class="pa-line pa-hot" x="106" y="58" width="48" height="38" rx="4"/></g>';
      s += '<g class="pa-drop" style="animation-delay:2.8s"><rect class="pa-line pa-hot" x="162" y="58" width="48" height="38" rx="4"/></g>';
      return s;
    },
    "Kubernetes": function () {
      var s = '<g class="pa-spin" style="transform-origin:160px 88px;animation-duration:24s"><circle class="pa-trace" cx="160" cy="88" r="58"/></g>';
      s += '<circle class="pa-line pa-glow" cx="160" cy="88" r="20"/>' + gear(160, 88, 9);
      for (var i = 0; i < 6; i++) {
        var p = hex(160, 88, 58, i, 6), d = "M160 88L" + p[0].toFixed(1) + " " + p[1].toFixed(1);
        s += trace(d) + '<rect class="pa-line pa-node" style="animation-delay:' + i + 's" x="' + (p[0] - 11) + '" y="' + (p[1] - 8) + '" width="22" height="16" rx="3"/>' + (i % 2 ? "" : pk(d, 3, i * 0.5, "", 2.6));
      }
      return s;
    },
    "Terminal": function () {
      var s = box(44, 26, 232, 122) + '<path class="pa-line" d="M44 44H276"/><circle class="pa-dot" cx="56" cy="35" r="2"/><circle class="pa-dot" cx="65" cy="35" r="2" style="animation-delay:.3s"/><circle class="pa-dot" cx="74" cy="35" r="2" style="animation-delay:.6s"/>';
      [[60, 100], [78, 140], [96, 80], [114, 120], [132, 60]].forEach(function (l, i) {
        s += cap(58, l[0] + 12, "$", "text-anchor:start;fill:#8dffc5") + '<rect class="pa-code" style="animation-delay:' + i * 0.8 + 's" x="70" y="' + (l[0] + 6) + '" width="' + l[1] + '" height="5" rx="2.5"/>';
      });
      return s;
    },
    "VMs": function () {
      var s = box(58, 26, 204, 104) + cap(160, 40, "HOST");
      for (var i = 0; i < 3; i++) s += '<rect class="pa-line pa-node" style="animation-delay:' + i * 1.5 + 's" x="76" y="' + (48 + i * 26) + '" width="168" height="20" rx="4"/><circle class="pa-dot" cx="88" cy="' + (58 + i * 26) + '" r="2.4" style="animation-delay:' + i * 0.4 + 's"/><rect class="pa-code" style="animation-delay:' + i * 0.7 + 's" x="100" y="' + (55.5 + i * 26) + '" width="90" height="5" rx="2.5"/>';
      s += '<rect class="pa-line pa-glow" x="48" y="140" width="224" height="22" rx="4"/>' + cap(160, 154, "HYPERVISOR");
      return s;
    },
    "Cloud Services": function () {
      var s = cloud(-80, -12, "pa-glow");
      [[58, 46], [262, 46], [58, 132], [262, 132]].forEach(function (p, i) {
        var d = "M" + p[0] + " " + p[1] + "L160 90";
        s += trace(d) + '<rect class="pa-line pa-node" style="animation-delay:' + i * 1.5 + 's" x="' + (p[0] - 20) + '" y="' + (p[1] - 13) + '" width="40" height="26" rx="5"/>' + pk(d, 3, i * 0.7) + pk("M160 90L" + p[0] + " " + p[1], 3, i * 0.7 + 1.5, "sq", 2.4);
      });
      return s;
    },
    "Integration": function () {
      var s = "";
      [52, 88, 124].forEach(function (y, i) {
        s += box(28, y - 13, 44, 26) + box(248, y - 13, 44, 26);
        s += link("M72 " + y + " C104 " + y + ",104 88,128 88", 3, i * 0.6, "sq") + link("M192 88 C216 88,216 " + y + ",248 " + y, 3, i * 0.6 + 0.3);
      });
      s += '<rect class="pa-line pa-glow" x="128" y="64" width="64" height="48" rx="9"/>' + gear(160, 88, 13);
      return s;
    },
    "Dashboard": function () {
      var s = box(34, 22, 252, 128).replace('rx="4"', 'rx="9"');
      s += '<circle class="pa-trace" cx="86" cy="68" r="22"/><circle class="pa-ring" cx="86" cy="68" r="22"/>' + cap(86, 106, "SALES");
      s += bars(140, 100, [24, 40, 30, 52, 38], 15, 9) + cap(196, 112, "REGION");
      s += '<path class="pa-draw" d="M52 138 C92 118,112 142,152 126 S214 112,268 122"/>';
      return s;
    },
    "Spreadsheet": function () {
      var s = box(34, 26, 252, 122);
      s += '<path class="pa-trace" d="M34 48H286M34 70H286M34 92H286M34 114H286M96 26V148M158 26V148M220 26V148"/>';
      s += '<rect class="pa-hl" x="36" y="50" width="248" height="20" rx="3" style="--dy:44px"/>';
      [[104, 56], [166, 78], [228, 100]].forEach(function (c, i) { s += '<rect class="pa-code" style="animation-delay:' + i * 0.9 + 's" x="' + c[0] + '" y="' + c[1] + '" width="36" height="5" rx="2.5"/>'; });
      s += '<rect class="pa-line pa-glow" x="224" y="118" width="54" height="24" rx="4"/>' + cap(251, 134, "SUM");
      return s;
    },
    "Workflow": function () {
      var s = "", xs = [50, 124, 198, 272], names = ["REQUEST", "ASSIGN", "RESOLVE", "CLOSE"];
      for (var i = 0; i < 3; i++) s += link("M" + (xs[i] + 15) + " 86H" + (xs[i + 1] - 15), 1.8, i * 0.5, "sq");
      xs.forEach(function (x, i) { s += '<circle class="pa-line pa-node" style="animation-delay:' + i * 1.5 + 's" cx="' + x + '" cy="86" r="15"/>' + tick(x, 87, i * 1.1) + cap(x, 120, names[i]); });
      return s;
    },
    "Test Tree": function () {
      var s = box(122, 28, 76, 26, "pa-glow") + cap(160, 44, "SUITE");
      [76, 160, 244].forEach(function (x, i) {
        var d = "M160 54 C160 84," + x + " 80," + x + " 108";
        s += link(d, 3, i * 0.5) + box(x - 36, 108, 72, 28, "pa-node", "animation-delay:" + i * 1.5 + "s") + tick(x, 123, i * 1.1);
      });
      return s;
    },
    "Browser Test": function () {
      var s = box(48, 24, 224, 124) + '<path class="pa-line" d="M48 44H272"/><circle class="pa-dot" cx="60" cy="34" r="2"/><circle class="pa-dot" cx="69" cy="34" r="2" style="animation-delay:.3s"/><rect class="pa-line" x="86" y="29" width="140" height="10" rx="5"/>';
      s += box(72, 58, 150, 16) + box(72, 84, 150, 16) + box(72, 112, 62, 18, "pa-glow");
      s += tick(240, 66, 0.3) + tick(240, 92, 1.9) + tick(240, 121, 3.4);
      var d = "M96 66 C150 66,150 92,190 92 S110 121,100 121";
      s += trace(d) + pk(d, 5.5, 0, "", 4);
      return s;
    },
    "Marketing": function () {
      var s = '<path class="pa-line pa-glow" d="M26 38h78l-28 38v40H54V76z"/>';
      ["M40 22L62 84V120", "M65 22V120", "M90 22L68 84V120"].forEach(function (d, i) { s += trace(d) + pk(d, 3, i * 0.9, "", 2.8); });
      s += link("M74 120 C110 130,120 130,150 124", 2.4, 0, "sq");
      s += '<path class="pa-line" d="M150 22V148H292" style="fill:none" opacity=".7"/>' + bars(164, 148, [26, 42, 62, 88], 22, 12);
      s += '<path class="pa-draw" d="M175 118 L209 98 L243 74 L277 40"/>';
      return s;
    },
    "ETL Compare": function () {
      var s = db(52, 88, 32, 44) + db(268, 88, 32, 44, "pa-glow");
      s += link("M70 88H138", 2.4, 0, "sq") + link("M182 88H250", 2.4, 0.4, "sq");
      s += '<circle class="pa-line pa-glow" cx="160" cy="84" r="20"/><path class="pa-line" d="M175 99l12 12" style="fill:none"/>' + tick(160, 86, 0);
      s += cap(52, 130, "SOURCE") + cap(268, 130, "TARGET");
      return s;
    },
    "Query": function () {
      var s = box(36, 26, 176, 124) + '<path class="pa-line" d="M36 48H212" style="fill:none"/><path class="pa-trace" d="M96 26V150M154 26V150M36 70H212M36 92H212M36 114H212M36 136H212"/>';
      s += '<rect class="pa-hl" x="38" y="50" width="172" height="20" rx="3" style="--dy:66px"/>';
      s += db(268, 88, 34, 44, "pa-glow") + link("M212 88H250", 2, 0, "sq") + cap(268, 130, "RESULT");
      [[46, 54], [106, 54], [164, 54]].forEach(function (c, i) { s += '<rect class="pa-code" style="animation-delay:' + i * 0.5 + 's" x="' + c[0] + '" y="' + (c[1] - 1.5) + '" width="30" height="4" rx="2"/>'; });
      return s;
    },
    "DB Admin": function () {
      var s = '<g class="pa-spin" style="transform-origin:160px 80px;animation-duration:16s"><circle class="pa-trace" cx="160" cy="80" r="50"/></g>' + db(160, 80, 54, 62, "pa-glow") + gear(160, 80, 38);
      [[48, 140], [272, 140]].forEach(function (p, i) {
        s += link("M" + (i ? 200 : 120) + " 108 C" + (i ? 236 : 84) + " 120," + p[0] + " 110," + p[0] + " " + (p[1] - 20), 3, i * 0.8) + db(p[0], p[1], 32, 26) + cap(p[0], 168, "BACKUP");
      });
      return s;
    },
    "CRM": function () {
      var s = cloud(-80, -12, "pa-glow");
      [[48, 46], [272, 46], [48, 138], [272, 138]].forEach(function (p, i) {
        var d = "M" + p[0] + " " + (p[1] + 8) + "L160 92";
        s += trace(d) + person(p[0], p[1], "pa-pulse", "animation-delay:" + i * 0.6 + "s") + pk(d, 3, i * 0.7, "", 2.8) + pk("M160 92L" + p[0] + " " + (p[1] + 8), 3, i * 0.7 + 1.5, "sq", 2.4);
      });
      return s;
    },
    "Scatter": function () {
      var s = '<path class="pa-line" d="M44 24V148H290" style="fill:none" opacity=".7"/>';
      [[70, 128], [94, 118], [112, 124], [136, 100], [158, 96], [180, 82], [202, 84], [226, 62], [248, 56], [268, 44], [120, 106], [214, 74]].forEach(function (p, i) {
        s += '<circle class="pa-dot" style="animation-delay:' + (i * 0.22).toFixed(2) + 's;animation-duration:2.6s" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>';
      });
      s += '<path class="pa-draw" d="M60 134 L278 40"/>';
      return s;
    },
    "Neural": function () {
      var xs = [58, 132, 208, 282], counts = [3, 4, 4, 2], pts = [], s = "";
      counts.forEach(function (n, l) { pts[l] = []; for (var i = 0; i < n; i++) pts[l].push([xs[l], 86 + (i - (n - 1) / 2) * 30]); });
      for (var l = 0; l < 3; l++) pts[l].forEach(function (a) { pts[l + 1].forEach(function (b) { s += '<path class="pa-trace" d="M' + a[0] + " " + a[1] + "L" + b[0] + " " + b[1] + '"/>'; }); });
      [[0, 1], [1, 2], [2, 0], [0, 3]].forEach(function (r, i) {
        var d = "M58 " + pts[0][r[0] % 3][1] + " L132 " + pts[1][r[1] % 4][1] + " L208 " + pts[2][(r[0] + r[1]) % 4][1] + " L282 " + pts[3][i % 2][1];
        s += pk(d, 4, i * 1, "", 3);
      });
      pts.forEach(function (layer, l) { layer.forEach(function (p, i) { s += '<circle class="pa-line pa-node" style="animation-delay:' + (l * 1.2 + i * 0.15).toFixed(2) + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="7"/>'; }); });
      return s;
    },
    "ERP Modules": function () {
      var s = "";
      [46, 88, 130].forEach(function (y, i) {
        s += link("M128 88 C104 88,104 " + y + ",94 " + y, 3, i * 0.7, "sq") + link("M192 88 C216 88,216 " + y + ",226 " + y, 3, i * 0.7 + 0.3, "sq");
        s += '<rect class="pa-line pa-node" style="animation-delay:' + i * 1.0 + 's" x="38" y="' + (y - 13) + '" width="56" height="26" rx="5"/><rect class="pa-line pa-node" style="animation-delay:' + (i * 1.0 + 3) + 's" x="226" y="' + (y - 13) + '" width="56" height="26" rx="5"/>';
      });
      s += '<rect class="pa-line pa-glow" x="128" y="62" width="64" height="52" rx="9"/>' + gear(160, 88, 13);
      return s;
    },
    "Case Flow": function () {
      var s = '<circle class="pa-line pa-glow" cx="34" cy="88" r="9"/>' + box(62, 72, 56, 32, "pa-node", "animation-delay:0s") + '<path class="pa-line pa-node" style="animation-delay:1.5s" d="M168 62l26 26-26 26-26-26z"/>' + box(232, 32, 58, 28, "pa-node", "animation-delay:3s") + box(232, 116, 58, 28, "pa-node", "animation-delay:4.5s");
      s += link("M43 88H62", 1.4, 0, "sq") + link("M118 88H142", 1.4, 0.5, "sq") + link("M194 88 C214 88,214 46,232 46", 2.4, 0) + link("M194 88 C214 88,214 130,232 130", 2.4, 1.2);
      s += cap(168, 92, "?") + cap(212, 62, "YES") + cap(212, 122, "NO");
      return s;
    },
    "Requirements": function () {
      var s = box(32, 30, 74, 108, "pa-glow");
      [48, 64, 80, 96, 112].forEach(function (y, i) { s += '<rect class="pa-code" style="animation-delay:' + i * 0.5 + 's" x="42" y="' + y + '" width="' + (46 - (i % 2) * 12) + '" height="5" rx="2.5"/>'; });
      s += link("M110 84H152", 2, 0, "sq") + box(152, 30, 64, 26, "pa-node", "animation-delay:0s") + box(152, 71, 64, 26, "pa-node", "animation-delay:1.5s") + box(152, 112, 64, 26, "pa-node", "animation-delay:3s");
      s += link("M184 56V71", 1, 0, "sq") + link("M184 97V112", 1, 0.5, "sq") + link("M216 84H262", 1.8, 0) + '<circle class="pa-line pa-glow" cx="276" cy="84" r="14"/>' + tick(276, 85, 0.5);
      return s;
    },
    "Candles": function () {
      var s = '<path class="pa-line" d="M40 24V146H290" style="fill:none" opacity=".7"/>';
      [[58, 40, 26], [88, 52, 20], [118, 34, 32], [148, 62, 18], [178, 44, 30], [208, 28, 36], [238, 40, 24], [268, 22, 38]].forEach(function (c, i) {
        var x = c[0], top = 120 - c[1] - c[2];
        s += '<path class="pa-wick" d="M' + x + " " + (top - 10) + "V" + (top + c[2] + 12) + '"/><rect class="pa-bar" style="animation-delay:' + (i * 0.3).toFixed(2) + "s;transform-origin:" + x + "px " + (top + c[2]) + 'px" x="' + (x - 7) + '" y="' + top + '" width="14" height="' + c[2] + '" rx="2"/>';
      });
      s += '<path class="pa-draw" d="M58 100 L88 92 L118 84 L148 92 L178 70 L208 54 L238 62 L268 38"/>';
      return s;
    },
    "Change": function () {
      var s = '<path class="pa-trace" d="M60 92 C110 30,210 30,262 92"/>';
      [0, 1, 2].forEach(function (i) {
        var y = 56 + i * 34;
        s += person(36, y, "pa-pulse", "animation-delay:" + i * 0.5 + "s") + person(284, y, "pa-node", "animation-delay:" + (i * 1.2) + "s");
        s += pk("M52 " + y + " C112 " + (y - 30) + ",208 " + (y - 30) + ",268 " + y, 4, i * 1.2, "", 3.2);
      });
      s += '<circle class="pa-line pa-glow" cx="160" cy="68" r="18"/>' + gear(160, 68, 8) + cap(160, 118, "TRANSITION");
      return s;
    },
    "Vault": function () {
      var s = '<circle class="pa-line pa-glow" cx="160" cy="84" r="54"/><circle class="pa-line" cx="160" cy="84" r="42"/>';
      for (var i = 0; i < 8; i++) { var p = hex(160, 84, 48, i, 8); s += '<circle class="pa-dot" style="animation-delay:' + (i * 0.2).toFixed(1) + 's" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2"/>'; }
      s += '<g class="pa-spin" style="transform-origin:160px 84px;animation-duration:9s"><circle class="pa-line" cx="160" cy="84" r="20"/><path class="pa-line" d="M160 64V76M160 92V104M140 84H152M168 84H180" style="fill:none"/></g><circle class="pa-line" cx="160" cy="84" r="5"/>';
      s += cap(160, 158, "• • • •", "font-size:11px;letter-spacing:.35em");
      return s;
    },
    "Java Code": function () { return scenes["Software Development"]() + '<text class="pa-glyph" x="236" y="104">{ }</text>'; },
    "Python Code": function () { return scenes["Software Development"]() + '<text class="pa-glyph" x="236" y="104">def</text>'; },
    "NET Code": function () { return scenes["Software Development"]() + '<text class="pa-glyph" x="236" y="104">.NET</text>'; }
  };
  for (var k in more) scenes[k] = more[k];

  var N = 160, movers = [];

  /* Mount animated scenes into thumbs (elements whose text is a scene name). Safe to call repeatedly. */
  function mount(list) {
    var thumbs = Array.prototype.slice.call(list).filter(function (t) {
      if (t.getAttribute("data-pa")) return false;
      t.setAttribute("data-pa", "1");
      return true;
    });
    thumbs.forEach(function (t) {
      var label = t.textContent.trim();
      var fn = scenes[label];
      if (!fn) return;
      t.textContent = "";
      t.classList.add("pa-thumb");
      t.insertAdjacentHTML("beforeend",
        '<svg class="pa-svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + fn() + '</svg><span class="pa-label">' + label + "</span>");
    });

    /* ---- smooth shared animation loop for all moving dots ---- */
    thumbs.forEach(function (t) {
      var svg = t.querySelector("svg");
      if (!svg) return;
      var list = [];
      svg.querySelectorAll(".pa-mv").forEach(function (g) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", g.getAttribute("data-d"));
        var len = path.getTotalLength(), xs = new Float32Array(N + 1), ys = new Float32Array(N + 1);
        for (var i = 0; i <= N; i++) { var pt = path.getPointAtLength(len * i / N); xs[i] = pt.x; ys[i] = pt.y; }   /* precomputed once */
        list.push({ g: g, xs: xs, ys: ys, dur: +g.getAttribute("data-dur"), delay: +g.getAttribute("data-delay") });
      });
      var rec = { t: t, list: list, on: false };
      movers.push(rec);
      t.classList.add("pa-off");
      if ("IntersectionObserver" in window)
        new IntersectionObserver(function (es) {
          rec.on = es[0].isIntersecting;
          t.classList.toggle("pa-off", !rec.on);
        }, { threshold: 0.05 }).observe(t);
      else { rec.on = true; t.classList.remove("pa-off"); }
    });
  }
  window.paMount = mount;
  mount(document.querySelectorAll(".project-thumb"));

  /* pause while the filter re-layouts the grid, resume right after */
  var filters = document.getElementById("projectFilters");
  var hold = 0;
  if (filters) filters.addEventListener("click", function () { hold = performance.now() + 650; });

  function frame(now) {
    if (now > hold) {
      var sec = now / 1000;
      for (var i = 0; i < movers.length; i++) {
        var m = movers[i];
        if (!m.t.isConnected) { movers.splice(i--, 1); continue; }   /* card was re-rendered away */
        if (!m.on) continue;
        for (var j = 0; j < m.list.length; j++) {
          var d = m.list[j];
          var ph = ((sec - d.delay) / d.dur) % 1; if (ph < 0) ph += 1;
          var f = ph * N, k = f | 0, w = f - k, k2 = k < N ? k + 1 : N;
          var x = d.xs[k] + (d.xs[k2] - d.xs[k]) * w, y = d.ys[k] + (d.ys[k2] - d.ys[k]) * w;
          var fade = Math.min(1, ph / 0.12, (1 - ph) / 0.12);
          d.g.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
          d.g.style.opacity = (fade * fade * (3 - 2 * fade)).toFixed(2);
        }
      }
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
