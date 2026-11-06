/* Courses hero: scrolling course-chip marquees + light beams */
(function () {
  var hero = document.querySelector(".page-hero");
  if (!hero || hero.querySelector(".ch")) return;

  var ic = {
    Snowflake: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>',
    Python: '<path d="M12 3c-4 0-5 1.5-5 3.5V9h5v1H5.5C3.5 10 3 12 3 14s.8 4 3 4h2v-2.5c0-1.8 1.4-3 3-3h4c1.5 0 2.5-1 2.5-2.5v-4C17.5 4 15.5 3 12 3z"/><path d="M12 21c4 0 5-1.5 5-3.5V15h-5v-1h6.5c2 0 2.5-2 2.5-4"/>',
    Java: '<path d="M5 10h12v5a4 4 0 01-4 4H9a4 4 0 01-4-4v-5z"/><path d="M17 11h1.5a2.5 2.5 0 010 5H17M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4"/>',
    "Azure DevOps": '<path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.5 1.5A3.3 3.3 0 0117 18H7z"/><path d="M9.5 14.5l1.5 1.5 3-3"/>',
    "AWS DevOps": '<path d="M4 8l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4M4 16l8 4 8-4"/>',
    "Power BI": '<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>',
    "Cyber Security": '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9.5 12l2 2 3.5-4"/>',
    "Data Engineering": '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3 3 7 3s7-1.3 7-3v-6"/>',
    Testing: '<path d="M9 7a3 3 0 016 0v1H9V7z"/><rect x="7" y="8" width="10" height="11" rx="5"/><path d="M12 8v11M3 12h4M17 12h4"/>',
    Programming: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    SQL: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M4 14h16M10 4v16"/>',
    ERP: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M17.5 14v7"/>'
  };
  function row(names) {
    var one = names.map(function (n) {
      return '<span class="ch-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + ic[n] + "</svg>" + n + "</span>";
    }).join("");
    return '<div class="ch-track">' + one + one + one + one + one + one + "</div>";   /* 6 copies: always wider than the screen */
  }
  var a = ["Snowflake", "Python", "Java", "Azure DevOps", "AWS DevOps", "Power BI", "Cyber Security", "Data Engineering"];
  var b = ["Testing", "SQL", "ERP", "Programming", "Data Engineering", "Cyber Security", "Power BI", "Python"];
  hero.classList.add("has-ch");
  hero.insertAdjacentHTML("afterbegin",
    '<div class="ch" aria-hidden="true"><span class="ch-beam b1"></span><span class="ch-beam b2"></span><span class="ch-beam b3"></span>' +
    '<div class="ch-row top">' + row(a) + '</div><div class="ch-row bot rev">' + row(b) + "</div></div>");
})();
