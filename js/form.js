/* =========================================================
   NDR EdTech — Form Handling & Validation
   Frontend-only validation + success state. Wire up the
   `action`/fetch call in submitForm() to a real email API,
   backend endpoint, Google Sheet or CRM when one is ready.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-validate]").forEach(setupForm);
});
/* Exposed globally: call this AFTER populating a page's course <select> options
   (see index.html / demo.html inline scripts) so the value can actually be matched. */
window.prefillCourseSelect = prefillCourseSelect;

const NAME_REGEX = /^[a-zA-Z\s.'-]{2,60}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setupForm(form) {
  const successBox = form.querySelector(".form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll("[data-rule]").forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      const firstInvalid = form.querySelector(".form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitForm(form, successBox);
  });

  form.querySelectorAll("[data-rule]").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group && group.classList.contains("invalid")) validateField(field);
    });
  });
}

function validateField(field) {
  const rule = field.getAttribute("data-rule");
  const group = field.closest(".form-group");
  const value = field.value.trim();
  let valid = true;

  switch (rule) {
    case "name":
      valid = NAME_REGEX.test(value);
      break;
    case "phone":
      valid = PHONE_REGEX.test(value.replace(/\D/g, "").slice(-10));
      break;
    case "email":
      valid = EMAIL_REGEX.test(value);
      break;
    case "required":
      valid = value.length > 0;
      break;
    default:
      valid = true;
  }

  if (group) group.classList.toggle("invalid", !valid);
  return valid;
}

/**
 * Simulates a successful submission. Replace the body of this
 * function with a real integration, e.g.:
 *   fetch("https://your-api.example.com/leads", { method: "POST", body: new FormData(form) })
 */
function submitForm(form, successBox) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
  }

  setTimeout(() => {
    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText;
    }
    if (successBox) {
      successBox.classList.add("show");
      successBox.setAttribute("role", "status");
      successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(() => successBox.classList.remove("show"), 6000);
    }
  }, 700);
}

/** If arriving from a course-details page's "Enquire Now" link, preselect the course. */
function prefillCourseSelect() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course");
  if (!courseId) return;
  document.querySelectorAll('select[name="course"]').forEach((select) => {
    const option = Array.from(select.options).find((o) => o.value === courseId);
    if (option) select.value = courseId;
  });
}
