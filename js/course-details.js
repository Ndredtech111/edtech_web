/* =========================================================
   NDR EdTech — Course Details Page Renderer
   Reads ?course=<id> from the URL and renders full details
   using the shared course data in js/courses.js. Missing rich
   fields (topics/curriculum/tools/etc.) fall back to sensible
   generic content generated from category + course name.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course");
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    renderNotFound();
    return;
  }

  document.title = `${course.name} Training | NDR EdTech`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", course.description);

  renderCourse(course);
});

function renderNotFound() {
  const main = document.getElementById("courseDetailsMain");
  if (!main) return;
  main.innerHTML = `
    <div class="container course-not-found reveal in-view">
      <h1>Course Not Found</h1>
      <p>The course you're looking for doesn't exist or may have been renamed.</p>
      <a class="btn btn-primary" href="courses.html">Browse All Courses</a>
    </div>`;
}

function genericLearn(course) {
  return [
    `Core concepts and fundamentals of ${course.name}`,
    `Hands-on configuration and real-world use cases`,
    `Industry best practices followed by working professionals`,
    `Integration with related enterprise tools and platforms`,
    `Performance optimization and troubleshooting techniques`,
    `Real-time project implementation from scratch to completion`
  ];
}

function genericCurriculum(course) {
  return [
    "Introduction & Environment Setup",
    `Core Concepts of ${course.name}`,
    "Hands-on Configuration & Practice",
    "Intermediate Techniques",
    "Advanced Concepts",
    "Integration with Related Tools",
    "Real-Time Project Work",
    "Interview Preparation & Mock Sessions"
  ];
}

function genericTools(course) {
  return [course.name, "Industry-Standard Tooling", "Hands-on Lab Environment", "Git & Version Control"];
}

function genericProjects(course) {
  return [
    `A real-time scenario project applying ${course.name} end-to-end`,
    `A guided assignment covering common ${course.category} challenges`,
    `A capstone project reviewed with feedback from your trainer`
  ];
}

function genericWhoShouldJoin() {
  return ["Students & Freshers", "Working Professionals", "Career Switchers", "Corporate Teams"];
}

function genericFaqs(course) {
  return [
    { q: `Is ${course.name} suitable for beginners?`, a: `Yes, the course is structured to take you from fundamentals to advanced, real-world application.` },
    { q: "Will I get hands-on practice?", a: "Yes, every module includes hands-on exercises, assignments and real-time projects." },
    { q: "Do you provide interview preparation?", a: "Yes, interview preparation and mock sessions are part of the training." }
  ];
}

function renderCourse(course) {
  const main = document.getElementById("courseDetailsMain");
  if (!main) return;

  const learn = course.topics && course.topics.length ? course.topics : genericLearn(course);
  const curriculum = course.curriculum && course.curriculum.length ? course.curriculum : genericCurriculum(course);
  const tools = course.tools && course.tools.length ? course.tools : genericTools(course);
  const projects = course.projects && course.projects.length ? course.projects : genericProjects(course);
  const whoShouldJoin = course.whoShouldJoin && course.whoShouldJoin.length ? course.whoShouldJoin : genericWhoShouldJoin();
  const prerequisites = course.prerequisites || "No specific prior experience is required — every course starts from fundamentals and builds up to advanced, real-world concepts.";
  const faqs = course.faqs && course.faqs.length ? course.faqs : genericFaqs(course);
  const related = courses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3);
  const relatedFallback = related.length ? related : courses.filter((c) => c.id !== course.id).slice(0, 3);

  const demoBtn = course.demoUrl
    ? `<button class="btn btn-ghost-light" type="button" data-demo-url="${encodeURIComponent(course.demoUrl)}">
         <span aria-hidden="true">&#9654;</span> Watch Free Demo
       </button>`
    : "";

  const initials = course.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  main.innerHTML = `
    <section class="cd-hero">
      <div class="container cd-hero-inner">
        <div>
          <p class="cd-breadcrumb"><a href="index.html">Home</a> / <a href="courses.html">Courses</a> / ${course.name}</p>
          <h1>${course.name} Training</h1>
          <div class="cd-meta">
            <span>${course.category}</span>
            <span>${course.level}</span>
            <span>Hands-on Projects</span>
            <span>Interview Preparation</span>
          </div>
          <p class="cd-desc">${course.description}</p>
          <div class="cd-cta-row">
            ${demoBtn}
            <a class="btn btn-primary" href="demo.html?course=${encodeURIComponent(course.id)}">Enquire Now</a>
          </div>
        </div>
        <div class="cd-visual">
          <img class="lazy-img" src="${course.image}" alt="${course.name} training" loading="lazy"
               onload="this.classList.add('loaded')"
               data-category="${course.category}" data-id="${course.id}" onerror="courseThumbFallback(this)">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container cd-body">
        <div>
          <div class="cd-section reveal">
            <h2>Course Overview</h2>
            <p>${course.name} is offered as part of NDR EdTech's ${course.category} training track, designed for ${course.level.toLowerCase()} learners. The program blends instructor-led sessions with hands-on labs so you build practical, job-ready skills rather than just theory.</p>
            <p>Training is delivered through live sessions, guided practice and real-time projects, with dedicated time for doubt-clearing and interview preparation.</p>
          </div>

          <div class="cd-section reveal">
            <h2>What You Will Learn</h2>
            <ul class="cd-list">
              ${learn.map((t) => `<li>${t}</li>`).join("")}
            </ul>
          </div>

          <div class="cd-section reveal">
            <h2>Curriculum</h2>
            <div class="curriculum-list">
              ${curriculum.map((m, i) => `<div class="curriculum-module"><span class="mod-num">${String(i + 1).padStart(2, "0")}</span> ${m}</div>`).join("")}
            </div>
          </div>

          <div class="cd-section reveal">
            <h2>Tools &amp; Technologies</h2>
            <div class="tools-tags">
              ${tools.map((t) => `<span>${t}</span>`).join("")}
            </div>
          </div>

          <div class="cd-section reveal">
            <h2>Real-Time Projects</h2>
            <ul class="cd-list">
              ${projects.map((p) => `<li>${p}</li>`).join("")}
            </ul>
          </div>

          <div class="cd-section reveal">
            <h2>Who Should Join?</h2>
            <ul class="cd-list">
              ${whoShouldJoin.map((w) => `<li>${w}</li>`).join("")}
            </ul>
          </div>

          <div class="cd-section reveal">
            <h2>Prerequisites</h2>
            <p>${prerequisites}</p>
          </div>

          <div class="cd-section reveal">
            <h2>Interview Preparation</h2>
            <p>Every course includes structured interview preparation — curated question banks, resume tips relevant to ${course.name}, and mock interview sessions with feedback so you walk in confident.</p>
          </div>

          <div class="cd-section reveal">
            <h2>Career Support</h2>
            <p>Beyond training, you get access to NDR EdTech's full career support process — skill assessment, resume building, mock interviews, career guidance and placement assistance. <a href="career-support.html">See how career support works &rarr;</a></p>
          </div>

          <div class="cd-section reveal">
            <h2>FAQ</h2>
            <div class="faq-list">
              ${faqs.map((f, i) => `
                <div class="faq-item">
                  <button class="faq-question" aria-expanded="false">
                    ${f.q}
                    <span class="faq-icon" aria-hidden="true">+</span>
                  </button>
                  <div class="faq-answer"><p>${f.a}</p></div>
                </div>`).join("")}
            </div>
          </div>
        </div>

        <aside class="cd-sidebar">
          <div class="sidebar-card reveal">
            <h3>Course Snapshot</h3>
            <ul>
              <li>Category: ${course.category}</li>
              <li>Level: ${course.level}</li>
              <li>Mode: Online / Classroom / Weekend</li>
              <li>Includes: Hands-on Projects</li>
              <li>Includes: Interview Preparation</li>
            </ul>
            ${demoBtn}
            <a class="btn btn-outline" href="demo.html?course=${encodeURIComponent(course.id)}">Enquire Now</a>
          </div>
          <div class="sidebar-card reveal">
            <h3>Need Guidance?</h3>
            <p style="font-size:0.85rem;margin-bottom:16px;">Talk to our career counsellor to check if this course fits your goals.</p>
            <a class="btn btn-dark btn-block" data-whatsapp-link href="#">Chat on WhatsApp</a>
          </div>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2>Related Courses</h2>
          <p>Explore other programs in ${course.category} and beyond.</p>
        </div>
        <div class="related-grid" id="relatedCourses"></div>
      </div>
    </section>`;

  renderCourseGrid("relatedCourses", relatedFallback);
  bindDemoButtons(main);
  initFaqAccordion();
  initWhatsappLinks();
  addConceptStrip(main.querySelector(".cd-visual"), learn, course.id);
  if (window.observeReveal) window.observeReveal(main.querySelectorAll(".reveal"));
}
