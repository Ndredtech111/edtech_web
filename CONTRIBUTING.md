NDR EdTech Website — Contributors
=================================

Thank you to everyone who has helped build this website.

Core Team
  - T Devamani Raju (manirajdeva) — project lead, development, content, deployment
    LinkedIn: https://www.linkedin.com/in/tdevamani
  - NDR EdTech team (Ndredtech111) — repository owner, course and business content

Assistance
  - Claude (Anthropic) — AI coding assistant

Course Trainers & Learners
  Course information, learner feedback and photographs are provided by the
  NDR EdTech trainers and learners who agreed to be featured on the website.

How to contribute
  Contributions are by invitation only (see LICENSE). If you have been given
  access:
    1. Create a branch from `main` and make your change.
    2. Test it locally (for example: `python -m http.server 8000`).
    3. Open a pull request and describe what changed and why.
    4. Never commit passwords, database credentials or `server/config.php`.

Security rules for contributors
  - Never commit secrets: passwords, database credentials, API keys, tokens or
    `server/config.php` (it is git-ignored — keep it that way).
  - Never commit real visitor or learner data (enquiry exports, phone numbers,
    emails). Use made-up test data only.
  - Treat all user input as untrusted: validate it on the server as well as in
    the browser, use prepared statements for every database query, and escape
    anything shown back on a page. No links are allowed in form text fields.
  - Do not add third-party scripts, trackers or fonts without approval from the
    Lead Author, and prefer pinned versions from trusted CDNs.
  - Keep the enquiry API restricted to the allowed origins listed in
    `server/config.php` and keep the rate limit and honeypot checks in place.
  - Report security problems privately (see AUTHORS), not in public issues.
  - Enable two-factor authentication on your GitHub account.

Current protections (for reference)
  - Site and enquiry API are served over HTTPS.
  - Enquiry API: server-side validation, prepared SQL statements, origin
    allow-list (CORS), honeypot field, and a limit of 5 submissions per IP per
    10 minutes. PHP errors are hidden from visitors.
  - Database credentials exist only on the GoDaddy server, never in this repo.

To be added to this list, send a pull request that adds your name below.

Additional contributors
  (none yet)
