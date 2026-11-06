/* =========================================================
   NDR EdTech — Enquiry chat widget
   Click the WhatsApp button -> chat asks the enquiry-form
   questions one by one -> on the last answer, opens WhatsApp
   with everything pre-filled.
   ========================================================= */
(function () {
  "use strict";
  var WA_NUMBER = "918722355666";
  var MODES = ["Online", "Classroom", "Weekend", "Corporate"];

  var steps = [
    { key: "name", q: "Hi! 👋 Welcome to NDR EdTech. Let's get you a free demo session.\n\nWhat's your full name?",
      type: "text", ph: "Your full name",
      check: function (v) { return /^[a-zA-Z\s.'-]{2,60}$/.test(v) || "Please enter a valid name (letters only)."; } },
    { key: "phone", q: "Nice to meet you, {name}! What's your 10-digit mobile number?",
      type: "tel", ph: "10-digit mobile number",
      check: function (v) { return /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10)) || "Please enter a valid 10-digit Indian mobile number."; },
      norm: function (v) { return v.replace(/\D/g, "").slice(-10); } },
    { key: "email", q: "What's your email address?",
      type: "email", ph: "you@example.com",
      check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Please enter a valid email address."; } },
    { key: "course", q: "Which course are you interested in?", type: "course", ph: "Select a course" },
    { key: "mode", q: "Which training mode do you prefer?", type: "chips", options: MODES },
    { key: "message", q: "Anything else you'd like to tell us about your background and goals? (optional)",
      type: "text", ph: "Type your message or tap Skip", optional: true }
  ];

  var answers = {}, idx = 0, started = false;
  var box, body, foot, input, select, sendBtn;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function scroll() { body.scrollTop = body.scrollHeight; }
  function bot(text, cls) {
    var m = el("div", "ndr-msg bot" + (cls ? " " + cls : ""), text.replace(/\{(\w+)\}/g, function (_, k) { return (answers[k] || "").split(" ")[0]; }));
    body.appendChild(m); scroll();
  }
  function user(text) { body.appendChild(el("div", "ndr-msg user", text)); scroll(); }
  function clearChips() { body.querySelectorAll(".ndr-chips").forEach(function (c) { c.remove(); }); }

  function courseList() {
    try { if (typeof courses !== "undefined" && Array.isArray(courses)) return courses.map(function (c) { return c.name; }); } catch (e) {}
    return null;
  }

  function showChips(options, onPick) {
    var wrap = el("div", "ndr-chips");
    options.forEach(function (o) {
      var b = el("button", "", o); b.type = "button";
      b.addEventListener("click", function () { onPick(o); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap); scroll();
  }

  function ask() {
    var s = steps[idx];
    clearChips();
    bot(s.q);
    input.style.display = "none"; select.style.display = "none"; foot.hidden = false;
    sendBtn.style.display = "";
    if (s.type === "chips") {
      foot.hidden = true;
      showChips(s.options, function (v) { answer(v); });
    } else if (s.type === "course") {
      var list = courseList();
      if (list) {
        select.innerHTML = "";
        var o0 = el("option", "", "Select a course"); o0.value = ""; select.appendChild(o0);
        list.forEach(function (n) { var o = el("option", "", n); o.value = n; select.appendChild(o); });
        select.style.display = ""; select.value = ""; select.focus();
      } else {
        configureInput({ type: "text", ph: "Type the course name" });
      }
    } else {
      configureInput(s);
      if (s.optional) showChips(["Skip"], function () { answer(""); });
    }
  }
  function configureInput(s) {
    input.type = s.type; input.placeholder = s.ph; input.value = "";
    input.style.display = ""; input.focus();
  }

  function answer(raw) {
    var s = steps[idx], v = (raw || "").trim();
    if (!v && !s.optional) return;
    if (v && s.check) {
      var r = s.check(v);
      if (r !== true) { user(v); bot(r, "err"); input.value = ""; return; }
    }
    if (s.norm) v = s.norm(v);
    user(v || "Skip");
    answers[s.key] = v;
    input.value = ""; clearChips();
    idx++;
    if (idx < steps.length) setTimeout(ask, 350); else setTimeout(finish, 350);
  }

  function buildText() {
    var L = { name: "Name", phone: "Phone", email: "Email", course: "Course", mode: "Training Mode", message: "Message" };
    var lines = ["New Free Demo Request - NDR EdTech", ""];
    Object.keys(L).forEach(function (k) { if (answers[k]) lines.push("*" + L[k] + ":* " + answers[k]); });
    lines.push("", "(Sent from the NDR EdTech website chat)");
    return lines.join("\n");
  }

  function finish() {
    foot.hidden = true;
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildText());
    bot("Thank you, " + answers.name.split(" ")[0] + "! 🎉 Opening WhatsApp to send your details to our career counsellor…");
    // Programmatic open is outside a click gesture for typed answers, so also show a button as fallback.
    var w = window.open(url, "_blank", "noopener");
    var a = el("a", "ndr-send-wa", "Open WhatsApp & send");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    if (!w) bot("Your browser blocked the pop-up. Tap the button below to send your enquiry:");
    body.appendChild(a);
    var again = el("div", "ndr-chips");
    var b = el("button", "", "Start a new enquiry"); b.type = "button";
    b.addEventListener("click", reset);
    again.appendChild(b); body.appendChild(again); scroll();
  }

  function reset() {
    body.innerHTML = ""; answers = {}; idx = 0; ask();
  }

  function toggle(open) {
    var want = open == null ? !box.classList.contains("open") : open;
    box.classList.toggle("open", want);
    if (want && !started) { started = true; ask(); }
  }

  function build() {
    box = el("div", "ndr-chat"); box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "NDR EdTech enquiry chat");
    var head = el("div", "ndr-chat-head");
    head.appendChild(el("div", "av", "N"));
    var tt = el("div", "tt"); tt.appendChild(el("b", "", "NDR EdTech")); tt.appendChild(el("span", "", "Typically replies within one working day"));
    head.appendChild(tt);
    var x = el("button", "", "×"); x.type = "button"; x.setAttribute("aria-label", "Close chat");
    x.addEventListener("click", function () { toggle(false); });
    head.appendChild(x);
    body = el("div", "ndr-chat-body"); body.setAttribute("aria-live", "polite");
    foot = el("form", "ndr-chat-foot"); foot.setAttribute("novalidate", "");
    input = el("input"); input.autocomplete = "off";
    select = el("select"); select.style.display = "none";
    sendBtn = el("button", "", "➤"); sendBtn.type = "submit"; sendBtn.setAttribute("aria-label", "Send");
    foot.appendChild(input); foot.appendChild(select); foot.appendChild(sendBtn);
    foot.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = steps[idx];
      answer(s.type === "course" && courseList() ? select.value : input.value);
    });
    select.addEventListener("change", function () { if (select.value) answer(select.value); });
    box.appendChild(head); box.appendChild(body); box.appendChild(foot);
    document.body.appendChild(box);
  }

  function init() {
    build();
    // Intercept every WhatsApp button (floating + mobile bar + contact page) in the capture phase.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-whatsapp-link], .whatsapp-float, .msb-whatsapp");
      if (!a) return;
      e.preventDefault(); e.stopImmediatePropagation();
      toggle();
    }, true);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
