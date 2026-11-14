/* Learner review popup.
   Learner reviews, keyed by the name shown on each card.
   If a review is "", the popup shows a short "About NDR EdTech" note instead. */
const ABOUT_NDR = "NDR EdTech is a Bengaluru-based IT training institute offering industry-focused, hands-on courses with real-time projects, personal mentoring and career support for students, freshers and working professionals.";
const LEARNER_REVIEWS = {
  "Mandar K P": "The Snowflake training at NDR Infotech was an excellent learning experience. The trainer explained complex concepts in a simple and practical way. Real-time examples and hands-on sessions helped me improve my understanding.",
  "Swetha B": "I had a great learning experience with NDR Infotech. The trainer was very supportive and explained every topic with patience. Practical sessions and interview preparation were especially helpful.",
  "Bala Sai T": "NDR Infotech provided excellent Snowflake training with a strong focus on real-time industry requirements. The trainer's knowledge and teaching approach helped me gain confidence.",
  "Sudheer M": "The training was well structured and covered important Snowflake concepts in detail. I particularly liked the practical demonstrations, SQL exercises, and real-time project scenarios.",
  "Veena R": "One of the best learning experiences! The trainer made every concept easy to understand and encouraged us to practice regularly.",
  "Sanjay N": "The Snowflake course at NDR Infotech was very useful for improving my technical skills. The trainer explained Snowflake architecture, Snowpipe, Streams, and Tasks with practical examples.",
  "Ganesh Y": "I really appreciate the quality of training provided by NDR Infotech. The sessions were interactive, informative, and focused on real-world scenarios.",
  "Surekha B": "The trainer provided excellent guidance throughout the Snowflake training. Hands-on exercises and doubt-clearing sessions helped me understand concepts much better.",
  "Balas K": "NDR Infotech delivers quality technical training with an industry-oriented approach. I gained valuable knowledge in Snowflake and real-time project implementation.",
  "Varun P": "The training was practical and career-oriented. The trainer explained topics step by step and shared useful interview tips.",
  "Sushma G": "I had a wonderful experience learning Snowflake at NDR Infotech. The trainer was knowledgeable, friendly, and always ready to clarify doubts.",
  "Venkatesh S": "The Snowflake training helped me strengthen my technical foundation. Real-time scenarios, SQL practice, and project-oriented explanations made the sessions valuable.",
  "Babu B": "Excellent training experience! The trainer covered Snowflake concepts in depth and explained how they are used in actual data engineering projects.",
  "Girish V": "NDR Infotech provides an excellent platform for learning modern data technologies. The trainer's teaching methodology and interview guidance were very helpful.",
  "Bagadi V C": "The sessions were informative and focused on industry-relevant skills. I especially appreciated the trainer's ability to explain complex Snowflake topics using simple examples.",
  "Jyothi P": "I am very satisfied with the Snowflake training at NDR Infotech. The trainer provided continuous support, practical assignments, and valuable guidance.",
  "Manoj K": "The training was comprehensive and well organized. From basic SQL to advanced Snowflake concepts, everything was explained clearly.",
  "Joshna R": "A great learning journey with NDR Infotech! The trainer was approachable and supportive. Practical sessions and interview preparation helped me understand industry expectations.",
  "Raviteja S": "The Snowflake training exceeded my expectations. The trainer shared valuable industry knowledge and explained real-time data engineering workflows.",
  "Shankar R": "NDR Infotech offers quality training with a practical learning approach. The trainer's expertise, interactive sessions, and real-time project examples made the course worthwhile.",
  "Raju S V": "I had a positive experience with NDR Infotech. Snowflake concepts were explained in a clear and structured manner. The trainer's dedication and continuous support made a big difference."
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
