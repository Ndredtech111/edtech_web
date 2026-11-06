/* Realistic water in the footer: a 2D wave-equation height field.
   Cursor movement disturbs the surface; waves spread, reflect off the
   edges, lose energy, and are lit like a real water surface. */
(function () {
  var f = document.querySelector(".site-footer");
  if (!f || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CELL = 4, DAMP = 0.972;
  var cv = document.createElement("canvas");
  cv.className = "fw-canvas";
  f.insertBefore(cv, f.firstChild);
  var ctx = cv.getContext("2d");
  var W, H, cur, prev, img, running = false, energy = 0, lastX = null, lastY = null;

  function resize() {
    var b = f.getBoundingClientRect();
    W = Math.max(8, Math.ceil(b.width / CELL));
    H = Math.max(8, Math.ceil(b.height / CELL));
    cv.width = W; cv.height = H;
    cur = new Float32Array(W * H); prev = new Float32Array(W * H);
    img = ctx.createImageData(W, H);
  }
  resize();
  window.addEventListener("resize", resize);

  function disturb(cx, cy, strength, r) {
    for (var y = -r; y <= r; y++) for (var x = -r; x <= r; x++) {
      var d = Math.sqrt(x * x + y * y);
      if (d > r) continue;
      var px = cx + x, py = cy + y;
      if (px < 1 || py < 1 || px >= W - 1 || py >= H - 1) continue;
      cur[py * W + px] += strength * Math.cos((d / r) * Math.PI / 2);
    }
    energy = 1; start();
  }

  function step() {
    var maxv = 0;
    for (var y = 1; y < H - 1; y++) {
      for (var x = 1; x < W - 1; x++) {
        var i = y * W + x;
        var v = ((cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) / 2 - prev[i]) * DAMP;
        prev[i] = v;
        if (v > maxv) maxv = v; else if (-v > maxv) maxv = -v;
      }
    }
    var t = cur; cur = prev; prev = t;
    return maxv;
  }

  function render() {
    var d = img.data;
    for (var y = 1; y < H - 1; y++) {
      for (var x = 1; x < W - 1; x++) {
        var i = y * W + x;
        var dx = cur[i - 1] - cur[i + 1];          /* surface slope */
        var dy = cur[i - W] - cur[i + W];
        var light = dx * 0.7 + dy * 0.7;           /* light from upper-left */
        var o = i * 4, a;
        if (light > 0) {                           /* sun-lit crest: white sparkle */
          a = Math.min(light * 2.2, 34);
          d[o] = 255; d[o + 1] = 255; d[o + 2] = 255; d[o + 3] = a;
        } else {                                   /* shaded trough: deep water blue */
          a = Math.min(-light * 2, 22);
          d[o] = 40; d[o + 1] = 110; d[o + 2] = 190; d[o + 3] = a;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function loop() {
    var m = step();
    render();
    if (m < 0.02 && energy <= 0) { running = false; ctx.clearRect(0, 0, W, H); return; }
    energy -= 0.01;
    requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; requestAnimationFrame(loop); } }

  f.addEventListener("mousemove", function (e) {
    var b = f.getBoundingClientRect();
    var x = Math.round((e.clientX - b.left) / CELL), y = Math.round((e.clientY - b.top) / CELL);
    if (lastX !== null) {                           /* trace the path so fast moves stay smooth */
      var dist = Math.hypot(x - lastX, y - lastY), n = Math.max(1, Math.ceil(dist / 2));
      var speed = Math.min(dist, 12);
      for (var k = 1; k <= n; k++)
        disturb(Math.round(lastX + (x - lastX) * k / n), Math.round(lastY + (y - lastY) * k / n), 3 + speed * 0.8, 3);
    }
    lastX = x; lastY = y;
  });
  /* touch: finger drag / tap disturbs the water too */
  function touchMove(e) {
    var t = e.touches[0]; if (!t) return;
    var b = f.getBoundingClientRect();
    var x = Math.round((t.clientX - b.left) / CELL), y = Math.round((t.clientY - b.top) / CELL);
    if (lastX !== null) {
      var dist = Math.hypot(x - lastX, y - lastY), n = Math.max(1, Math.ceil(dist / 2)), speed = Math.min(dist, 12);
      for (var k = 1; k <= n; k++)
        disturb(Math.round(lastX + (x - lastX) * k / n), Math.round(lastY + (y - lastY) * k / n), 3 + speed * 0.8, 3);
    } else disturb(x, y, 40, 5);
    lastX = x; lastY = y;
  }
  f.addEventListener("touchstart", function (e) { lastX = lastY = null; touchMove(e); }, { passive: true });
  f.addEventListener("touchmove", touchMove, { passive: true });
  f.addEventListener("touchend", function () { lastX = lastY = null; }, { passive: true });
  f.addEventListener("mouseleave", function () { lastX = lastY = null; });
  f.addEventListener("click", function (e) {         /* a click drops a "stone" */
    var b = f.getBoundingClientRect();
    disturb(Math.round((e.clientX - b.left) / CELL), Math.round((e.clientY - b.top) / CELL), 60, 5);
  });
})();
