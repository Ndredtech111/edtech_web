# NDR EdTech — Website

A complete, premium, responsive website for NDR EdTech, an IT training and career
development institute in Bengaluru. Built with plain **HTML5, CSS3 and vanilla
JavaScript only** — no frameworks, no build tools, no npm/Node required.

## Running the site

Just open `index.html` directly in a browser. There is nothing to install and
nothing to build.

> Note: `contact.html`'s Google Maps embed and any `fetch()`-based integrations
> you add later will work best when served over `http://` (e.g. via a simple
> local server) rather than `file://`, but the site itself requires no server.

## Project structure

```
NDR-EDTECH/
├── index.html                 Home page
├── about.html
├── courses.html                Full course catalog with filters + search
├── course-details.html         Dynamic course page — reads ?course=<id>
├── projects.html
├── trainers.html
├── demo.html                    Free demo booking page
├── corporate-training.html
├── career-support.html
├── contact.html
├── faq.html
├── css/
│   ├── style.css               Design system, layout, components
│   ├── responsive.css          Breakpoints: 1440/1200/1024/768/480/375
│   └── animations.css          Keyframes, reveal/hover/menu transitions
├── js/
│   ├── main.js                 Header scroll, mobile nav, reveal, counters,
│   │                           FAQ accordion, testimonial slider, WhatsApp links
│   ├── courses.js               Single source of truth for all course data
│   │                           + card rendering + category filtering
│   ├── course-details.js       Renders course-details.html from the URL param
│   └── form.js                  Frontend validation + simulated submission
└── assets/
    ├── logo/ndr-edtech-logo.png
    ├── hero/
    ├── courses/
    ├── trainers/
    ├── projects/
    └── testimonials/
```

## Updating course content

All course data lives in **`js/courses.js`** in a single `courses` array. To add,
edit or remove a course, edit that file only — every page (home highlights,
the full catalog, course detail pages, footer links) reads from it.

Each course supports optional rich fields for its detail page — `topics`,
`curriculum`, `tools`, `projects`, `whoShouldJoin`, `prerequisites`, `faqs`.
If you leave them out, `js/course-details.js` automatically generates sensible
generic content from the course name/category so the page never looks empty.

### Adding a YouTube demo

Set `demoUrl` on a course to a real YouTube link and a "Watch Demo" button
appears automatically on its card and detail page. Leave it as `""` and the
button is hidden — no broken/placeholder links are ever shown to visitors.

## Images

The folder structure under `assets/` matches the paths referenced in the code
(e.g. `assets/courses/snowflake.jpg`, `assets/hero/hero-image.jpg`,
`assets/trainers/trainer-1.jpg`). These are placeholders for the client to
replace with real photography — until then, every `<img>` on the site has an
`onerror` handler that swaps in a clean, on-brand gradient placeholder instead
of a broken image icon, so the site always looks finished. Once you drop a
correctly-named image into the matching folder, it will display automatically
— no code changes needed.

## Editable placeholder content

A few sections are intentionally left as clearly-marked placeholders per the
project brief, since inventing real-looking data would be misleading:

- **Trainers** (`trainers.html`) — bracketed placeholder names/bios.
- **Testimonials** (home page) — labeled "Sample testimonial — replace with
  actual student review."
- **Statistics** — only verifiable figures (years of experience, course count)
  are shown; no placement percentages or student counts are claimed anywhere.

## Forms

Forms (`demo.html`, `contact.html`, `corporate-training.html`, home page demo
section) run full client-side validation (name/phone/email/required fields)
via `js/form.js` and show a success message on submit. No data is sent
anywhere yet — `submitForm()` in `js/form.js` is the single place to wire up
a real backend, email API, Google Sheet or CRM integration later.

## WhatsApp

The floating WhatsApp button, mobile sticky bar, and any element with
`data-whatsapp-link` all point to the same number and pre-filled message,
defined once in `js/main.js` (`WHATSAPP_NUMBER` / `WHATSAPP_MESSAGE`).

## Brand

- Colors, radii, shadows and spacing are defined as CSS variables in
  `css/style.css` (`:root`) — change them there to re-theme the whole site.
- Fonts: Inter + Poppins, loaded via Google Fonts `<link>` tags.
