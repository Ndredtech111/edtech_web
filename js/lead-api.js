/* =========================================================
   NDR EdTech — saves every enquiry to the GoDaddy database
   (server/save-lead.php) at the same time the visitor is sent
   to WhatsApp. If the server is down, WhatsApp still works.
   ========================================================= */
(function () {
  "use strict";

  /* >>> Set this to wherever you upload server/save-lead.php on GoDaddy (must be https). <<< */
  var LEAD_API_URL = "https://leads.ndrinfotech.com/save-lead.php";

  var FIELDS = ["name", "phone", "email", "qualification", "course", "mode", "message"];

  /** Reads the standard enquiry fields from a <form>. Dropdowns send the visible text (e.g. the course name). */
  window.ndrFormData = function (form) {
    var out = {};
    FIELDS.forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      if (!el) return;
      var v = el.tagName === "SELECT" ? (el.selectedOptions[0] ? el.selectedOptions[0].textContent : "") : el.value;
      out[k] = (v || "").trim();
    });
    return out;
  };

  /** Fire-and-forget: never blocks or breaks the WhatsApp redirect. */
  window.ndrSaveLead = function (data, source) {
    try {
      var body = new URLSearchParams();
      FIELDS.forEach(function (k) { body.append(k, (data && data[k]) || ""); });
      body.append("source", source || "website");
      body.append("page", location.href);
      body.append("website", ""); // honeypot: must stay empty
      return fetch(LEAD_API_URL, {
        method: "POST",
        body: body,               // form-encoded => no CORS pre-flight needed
        keepalive: true,          // survives the page switching to WhatsApp
        mode: "cors"
      }).catch(function () {});
    } catch (e) { return Promise.resolve(); }
  };
})();
