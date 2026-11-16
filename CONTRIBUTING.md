# Contributing to the NDR EdTech Website

Thank you for helping build the NDR EdTech website. This guide explains how the project is organised, how to work on it safely, and who has contributed.

> **Contributions are by invitation only.** See [LICENSE](LICENSE). To report a security problem, follow [Reporting security issues](#reporting-security-issues).

## Contents

- [Project overview](#project-overview)
- [Project structure](#project-structure)
- [How it fits together](#how-it-fits-together)
- [Getting started](#getting-started)
- [Making a change](#making-a-change)
- [Security rules](#security-rules)
- [Reporting security issues](#reporting-security-issues)
- [Contributors](#contributors)

## Project overview

A static website for NDR EdTech, an IT training institute in Bengaluru, built with plain **HTML, CSS and JavaScript**. There is no framework and no build step.

| Part | Where it runs |
| --- | --- |
| Website (HTML, CSS, JS) | GitHub Pages, published from the `main` branch at <https://ndredtech.com> |
| Enquiry API (PHP + MySQL) | GoDaddy hosting at `https://leads.ndrinfotech.com/save-lead.php` |

## Project structure

```text
ndr_edtech_website/
├── index.html                 Home page
├── about.html                 About NDR EdTech
├── courses.html               Course catalogue (search and category filters)
├── course-details.html        One template for every course: ?course=<id>
├── demo.html                  Free demo booking form
├── corporate-training.html    Corporate training enquiry
├── career-support.html        Career support and placement help
├── projects.html              Real-time projects
├── trainers.html              Trainers
├── reviews.html               Learner reviews (click a learner to read their review)
├── faq.html                   Frequently asked questions
├── contact.html               Contact form, map and WhatsApp
│
├── css/
│   ├── style.css              Main styles, colours and layout (start here)
│   ├── responsive.css         Mobile and tablet breakpoints
│   ├── animations.css         Shared animations
│   ├── brand.css              Header logo and "NDR EdTech" wordmark
│   ├── chatbot.css            WhatsApp enquiry chat widget
│   ├── clock.css              Floating date and time widget (desktop only)
│   ├── reviews.css            Reviews page and learner pop-up
│   └── *-hero-fx.css, ...     Per-page hero and visual effects
│
├── js/
│   ├── main.js                Menu, sliders, counters and shared behaviour
│   ├── courses.js             Course data (single source of truth) and card rendering
│   ├── course-details.js      Builds the course page from courses.js
│   ├── form.js                Form validation and WhatsApp redirect
│   ├── chatbot.js             Step-by-step enquiry chat that ends in WhatsApp
│   ├── lead-api.js            Sends each enquiry to the database
│   ├── learners.js            Learner names and their review text
│   ├── clock.js               Floating date and time widget
│   └── *-hero-fx.js, ...      Hero animations and other effects
│
├── assets/                    Images: logo/, courses/, modes/, hero/, trainers/ ...
├── logos/, courses_images/    Original source images
│
├── server/                    Runs on GoDaddy, NOT on GitHub Pages
│   ├── save-lead.php          Receives enquiries and stores them in MySQL
│   ├── config.sample.php      Template for config.php (the real file is git-ignored)
│   ├── schema.sql             Creates the `leads` table
│   └── SETUP.md               Step-by-step server setup
│
├── CNAME                      Custom domain for GitHub Pages
└── README.md, LICENSE, AUTHORS.md, CONTRIBUTING.md
```

## How it fits together

- **Courses:** add or edit a course in `js/courses.js`. The catalogue, the course menu and the course page all read from it. Leave `demoUrl` as `""` until a real demo video exists.
- **Enquiries:** `form.js` and `chatbot.js` validate the details, open WhatsApp, and call `lead-api.js`, which saves the enquiry in MySQL on GoDaddy. If saving fails, WhatsApp still opens.
- **Reviews:** edit review text in `js/learners.js` and the learner cards in `reviews.html`.
- **Publishing:** a push to `main` goes live on GitHub Pages in about a minute.
- **Caching:** after changing a CSS or JS file, increase its `?v=` number in the HTML pages so visitors do not see an old cached copy.

## Getting started

1. Clone the repository.
2. Start a local server from the project folder:

   ```bash
   python -m http.server 8000
   ```

3. Open <http://localhost:8000>.

The enquiry form saves to the live database even when you run it locally (`http://localhost:8000` is an allowed origin), so **use made-up test data only** and delete any test rows afterwards.

## Making a change

1. Create a branch from `main`.
2. Make your change and test it in the browser, on a desktop and a phone-sized window.
3. Open a pull request that explains what changed and why.
4. Wait for the Lead Author to review and merge it.

## Security rules

- **Never commit secrets:** passwords, database credentials, API keys, tokens, or `server/config.php`. It is git-ignored, so keep it that way.
- **Never commit real visitor or learner data**, such as enquiry exports, phone numbers or emails. Use made-up test data.
- **Treat all user input as untrusted.** Validate on the server as well as in the browser, use prepared statements for every database query, and escape anything shown back on a page. Links are not allowed in form text fields.
- **No unapproved third-party scripts, trackers or fonts.** Ask the Lead Author first and prefer pinned versions from trusted CDNs.
- **Keep the enquiry API restricted** to the allowed origins listed in `server/config.php`, and keep the rate limit and honeypot checks in place.
- **Turn on two-factor authentication** on your GitHub account.

### Current protections

- The site and the enquiry API are served over HTTPS.
- The enquiry API uses server-side validation, prepared SQL statements, an origin allow-list (CORS), a honeypot field, and a limit of 5 submissions per IP address per 10 minutes. PHP errors are hidden from visitors.
- Database credentials exist only on the GoDaddy server, never in this repository.

## Reporting security issues

Please **do not** open a public GitHub issue for a security problem. Contact the Lead Author privately using the details in [AUTHORS.md](AUTHORS.md), and include what you found, which page or file is affected, and how to reproduce it. We aim to acknowledge reports within 3 working days. Please do not publish details until the problem is fixed.

## Contributors

Thank you to everyone who has helped build this website.

### Core team

- **T Devamani Raju** ([@manirajdeva](https://github.com/manirajdeva)) — project lead, development, content and deployment. [LinkedIn](https://www.linkedin.com/in/tdevamani)
- **NDR EdTech team** ([@Ndredtech111](https://github.com/Ndredtech111)) — repository owner, course and business content

### Assistance

- **Claude** (Anthropic) — AI coding assistant

### Trainers and learners

Course information, learner feedback and photographs are provided by the NDR EdTech trainers and learners who agreed to be featured on the website.

### Additional contributors

None yet. To be added to this list, include your name here in a pull request.
