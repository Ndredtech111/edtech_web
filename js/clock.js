/* Floating live date & time widget (uses the visitor's local time) */
(function () {
  var box = document.createElement("div");
  box.className = "ndr-clock";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/><circle cx="12" cy="15.5" r="1.4" fill="currentColor"/></svg>' +
    '<div><span class="nc-date"></span><span class="nc-time"></span></div>';
  var d = box.querySelector(".nc-date"), t = box.querySelector(".nc-time");
  function tick() {
    var n = new Date();
    d.textContent = n.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }).replace(/,/g, ",").toUpperCase();
    t.textContent = n.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  }
  function init() { document.body.appendChild(box); tick(); setInterval(tick, 1000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
