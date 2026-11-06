/* Click an approach box -> popup with a description */
(function () {
  var D = {
    "Instructor-led learning": "Learn directly from experienced trainers in structured sessions. You can ask questions, get instant clarification and follow a guided path instead of figuring things out alone.",
    "Hands-on exercises": "Every concept is followed by practical lab work. You write code, build pipelines and work with real tools, so the skills stick and you can show what you can do.",
    "Real-world use cases": "Training is built around scenarios from real projects and workplaces, so you understand how the technology is actually used on the job.",
    "Projects & assignments": "Work on projects and regular assignments that build a portfolio you can discuss in interviews, and that give you feedback on your progress.",
    "Interview preparation": "Practice common technical and HR questions, mock interviews and scenario-based problems so you walk into interviews prepared and confident.",
    "Resume guidance": "Get help shaping a clear, role-focused resume and profile that highlights your skills, projects and training outcomes.",
    "Career support": "Guidance on career paths, skill planning and job-readiness, from choosing the right course to preparing for your next role.",
    "Flexible training modes": "Choose the format that suits you: classroom, online live sessions or a blended approach, for students, working professionals and corporate teams."
  };
  var items = document.querySelectorAll(".approach-list li.has-ico");
  if (!items.length) return;

  var m = document.createElement("div");
  m.className = "ap-modal"; m.setAttribute("aria-hidden", "true");
  m.innerHTML = '<div class="ap-card" role="dialog" aria-modal="true" aria-labelledby="apT">' +
    '<button class="ap-close" aria-label="Close">&times;</button>' +
    '<div class="ap-ico"></div><h3 id="apT"></h3><p></p></div>';
  document.body.appendChild(m);
  var ico = m.querySelector(".ap-ico"), h = m.querySelector("h3"), p = m.querySelector("p"), last;

  function open(li) {
    var t = li.querySelector("span").textContent.trim();
    ico.innerHTML = li.querySelector("svg").outerHTML;
    h.textContent = t;
    p.textContent = D[t] || "";
    last = li;
    m.classList.add("open"); m.setAttribute("aria-hidden", "false");
    m.querySelector(".ap-close").focus();
  }
  function close() {
    m.classList.remove("open"); m.setAttribute("aria-hidden", "true");
    if (last) last.focus();
  }
  items.forEach(function (li) {
    li.setAttribute("tabindex", "0"); li.setAttribute("role", "button");
    li.addEventListener("click", function () { open(li); });
    li.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(li); }
    });
  });
  m.addEventListener("click", function (e) { if (e.target === m || e.target.closest(".ap-close")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && m.classList.contains("open")) close(); });
})();
