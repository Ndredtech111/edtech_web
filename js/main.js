/* =========================================================
   NDR EdTech — Main Site Script
   Handles: sticky header, mobile nav, scroll reveal,
   counters, FAQ accordion, testimonial slider, current year.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initFaqAccordion();
  initTestimonialSlider();
  initActiveNavLink();
  initYear();
  initWhatsappLinks();
  initHeroParticles();
  initWhyModal();
});

/* ---------- "Why Choose Us" card detail popup ---------- */
function initWhyModal() {
  const modal = document.getElementById("whyModal");
  const cards = document.querySelectorAll("[data-why-card]");
  if (!modal || !cards.length) return;

  const iconEl = document.getElementById("whyModalIcon");
  const titleEl = document.getElementById("whyModalTitle");
  const pointsEl = document.getElementById("whyModalPoints");

  function openModal(card) {
    const icon = card.querySelector(".why-icon");
    const title = card.querySelector("h3");
    const points = card.querySelectorAll(".why-points li");

    iconEl.innerHTML = icon ? icon.innerHTML : "";
    titleEl.textContent = title ? title.textContent : "";
    pointsEl.innerHTML = "";
    points.forEach((li) => {
      const item = document.createElement("li");
      item.textContent = li.textContent;
      pointsEl.appendChild(item);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  }

  cards.forEach((card) => card.addEventListener("click", () => openModal(card)));
  modal.querySelectorAll("[data-why-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

/* ---------- Connect-the-dots particle network on page hero banners ---------- */
function initHeroParticles() {
  const heroes = document.querySelectorAll(".page-hero");
  if (!heroes.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  heroes.forEach((hero) => {
    const textBlock = hero.querySelector(".container");
    if (!textBlock) return;

    const canvas = document.createElement("canvas");
    canvas.className = "page-hero-canvas";
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext("2d");

    let width, height, particles;
    const mouse = { x: null, y: null };
    const DOT_COLOR = "rgba(255,255,255,0.75)";
    const LINK_DIST = 130;
    const PAD = 48;

    function resize() {
      const heroRect = hero.getBoundingClientRect();
      const textRect = textBlock.getBoundingClientRect();

      const left = Math.max(0, textRect.left - heroRect.left - PAD);
      const top = Math.max(0, textRect.top - heroRect.top - PAD);
      const right = Math.min(heroRect.width, textRect.right - heroRect.left + PAD);
      const bottom = Math.min(heroRect.height, textRect.bottom - heroRect.top + PAD);

      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;
      width = canvas.width = right - left;
      height = canvas.height = bottom - top;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = Math.max(24, Math.round((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      });

      const all = mouse.x !== null ? particles.concat([{ x: mouse.x, y: mouse.y, mouse: true }]) : particles;

      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x;
          const dy = all[i].y - all[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / LINK_DIST) * (all[i].mouse || all[j].mouse ? 0.65 : 0.35)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(all[i].x, all[i].y);
            ctx.lineTo(all[j].x, all[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = DOT_COLOR;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(step);
    }

    hero.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    window.addEventListener("resize", resize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
    requestAnimationFrame(step);
  });
}

/* ---------- Sticky header shrink on scroll ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".hamburger");
  const nav = document.querySelector(".mobile-nav");
  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ---------- Scroll reveal (fade-up on entering viewport) ---------- */
let revealObserver;
function initScrollReveal() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      visible.forEach((entry, i) => {
        const el = entry.target;
        const delay = Math.min(i, 8) * 110; // cascade across a row / grid
        el.style.transitionDelay = delay + "ms";
        el.classList.add("in-view");
        revealObserver.unobserve(el);
        // Hand transitions back to the component (hover effects etc.)
        setTimeout(() => {
          el.classList.remove("reveal", "in-view");
          el.style.transitionDelay = "";
          el.style.willChange = "auto";
          el.style.removeProperty("--tx");
          el.style.removeProperty("--ry");
        }, delay + 1300);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  observeReveal(document.querySelectorAll(".reveal"));
}
/** Exposed globally so dynamically-rendered cards (courses.js) can opt in. */
window.observeReveal = function observeReveal(nodeList) {
  if (!revealObserver) return;
  nodeList.forEach((el, i) => {
    el.classList.add(`stagger-${(i % 6) + 1}`);
    const col = i % 3; // left / centre / right column: sweep in from own side
    el.style.setProperty("--tx", ["-60px", "0px", "60px"][col]);
    el.style.setProperty("--ry", ["12deg", "0deg", "-12deg"][col]);
    revealObserver.observe(el);
  });
};

/* ---------- Animated counters for stats section ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-counter"), 10);
  const suffix = el.getAttribute("data-suffix") || "";
  if (isNaN(target)) return;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- FAQ accordion (works for any .faq-list on any page) ---------- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.closest(".faq-list")
        .querySelectorAll(".faq-item.open")
        .forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });
      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

/* ---------- Testimonial slider ---------- */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".testimonial-slide");
  const dotsWrap = slider.querySelector(".slider-dots");
  const prevBtn = slider.querySelector(".slider-arrow.prev");
  const nextBtn = slider.querySelector(".slider-arrow.next");
  let index = 0;
  let timer;

  if (dotsWrap) {
    dotsWrap.innerHTML = Array.from(slides)
      .map((_, i) => `<button aria-label="Go to testimonial ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`)
      .join("");
  }
  const dots = dotsWrap ? dotsWrap.querySelectorAll("button") : [];

  function show(i) {
    slides.forEach((s, si) => s.classList.toggle("active", si === i));
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
    index = i;
  }

  function next() { show((index + 1) % slides.length); }
  function prev() { show((index - 1 + slides.length) % slides.length); }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAutoplay(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); restartAutoplay(); }));

  show(0);
  restartAutoplay();
}

/* ---------- Highlight the current page in nav ---------- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });
}

/* ---------- Footer year ---------- */
function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Generic broken-image fallback (hero/about/trainer photos) ---------- */
window.imgFallback = function imgFallback(imgEl, label) {
  const wrap = document.createElement("div");
  wrap.className = "visual-fallback";
  wrap.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
    '<rect x="3" y="4" width="18" height="14" rx="2"></rect><path d="M3 15l5-5 4 4 5-6 4 5"></path><circle cx="8" cy="9" r="1.2"></circle>' +
    "</svg>" +
    `<span>${label}</span>`;
  imgEl.replaceWith(wrap);
};

/* ---------- WhatsApp prefilled links (keeps message in one place) ---------- */
const WHATSAPP_NUMBER = "918722355666";
const WHATSAPP_MESSAGE =
  "Hello NDR EdTech, I am interested in your IT training programs. Please share course details and demo information.";

function initWhatsappLinks() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll("[data-whatsapp-link]").forEach((a) => {
    a.setAttribute("href", href);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
}
