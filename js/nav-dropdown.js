/* Courses dropdown: keeps the panel inside the viewport; arrow button toggles it (touch / keyboard). */
(function () {
  var dd = document.querySelector(".nav-dd");
  if (!dd) return;
  var panel = dd.querySelector(".nav-dd-panel");
  var toggle = dd.querySelector(".nav-dd-toggle");

  function clamp() {
    panel.style.setProperty("--dx", "0px");
    var item = dd.getBoundingClientRect();
    var w = Math.min(1000, window.innerWidth - 32);
    var left = item.left + item.width / 2 - w / 2;
    var dx = 0;
    if (left < 16) dx = 16 - left;
    else if (left + w > window.innerWidth - 16) dx = window.innerWidth - 16 - (left + w);
    panel.style.setProperty("--dx", Math.round(dx) + "px");
  }
  function setOpen(open) {
    if (open) clamp();
    dd.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  dd.addEventListener("mouseenter", clamp);
  window.addEventListener("resize", clamp);
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!dd.classList.contains("open"));
  });
  document.addEventListener("click", function (e) {
    if (!dd.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setOpen(false); toggle.blur(); }
  });
  clamp();
})();
