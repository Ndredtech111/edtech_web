/* Learner review popup.
   Add each learner's REAL review text below (matching the name on the card).
   Leave "" until you have it — the popup then shows a short "About NDR EdTech" note instead. */
const ABOUT_NDR = "NDR EdTech is a Bengaluru-based IT training institute offering industry-focused, hands-on courses with real-time projects, personal mentoring and career support for students, freshers and working professionals.";
const LEARNER_REVIEWS = {
  "Mandar K P": "",
  "Swetha B": "",
  "Bala Sai T": "",
  "Sudheer M": "",
  "Veena R": "",
  "Sanjay N": "",
  "Ganesh Y": "",
  "Surekha B": "",
  "Balas K": "",
  "Varun P": "",
  "Sushma G": "",
  "Venkatesh S": "",
  "Babu B": "",
  "Girish V": "",
  "Bagadi V C": "",
  "Jyothi P": "",
  "Manoj K": "",
  "Joshna R": "",
  "Raviteja S": "",
  "Shankar R": "",
  "Raju S V": ""
};

(function () {
  var modal = document.getElementById("lwModal");
  if (!modal) return;
  var last = null;
  function open(card) {
    var n = card.getAttribute("data-name"), t = (LEARNER_REVIEWS[n] || "").trim();
    last = card;
    document.getElementById("lwAv").textContent = n.charAt(0);
    document.getElementById("lwName").textContent = n;
    var q = document.getElementById("lwText");
    q.textContent = t || ABOUT_NDR;
    document.getElementById("lwLabel").textContent = t ? "Review" : "About NDR EdTech";
    modal.hidden = false; document.body.style.overflow = "hidden";
    modal.querySelector(".lw-x").focus();
  }
  function close() { modal.hidden = true; document.body.style.overflow = ""; if (last) last.focus(); }
  document.querySelectorAll(".lw-card").forEach(function (c) { c.addEventListener("click", function () { open(c); }); });
  modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".lw-x")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) close(); });
})();
