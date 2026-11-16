# Store website enquiries in the GoDaddy database

Every "Request Free Demo" submit (home page, demo page) and every chat enquiry now does two things at once:
1. opens WhatsApp with the details, and
2. sends the same details to `save-lead.php` on your GoDaddy hosting, which saves them in MySQL.

If the GoDaddy server is down, WhatsApp still opens (saving is "fire and forget").

## One-time setup on GoDaddy (cPanel)

1. **Create the database** — cPanel → *MySQL® Databases*
   - Create a database (e.g. `ndrleads`) and a user with a strong password.
   - *Add user to database* → give **ALL PRIVILEGES**.
   - Note the full names (GoDaddy adds a prefix, e.g. `abc123_ndrleads`, `abc123_ndruser`).
2. **Create the table** — cPanel → *phpMyAdmin* → click your database → **SQL** tab → paste the contents of `schema.sql` → *Go*.
3. **Upload the script** — cPanel → *File Manager* → `public_html` → create a folder `api` → upload:
   - `save-lead.php`
   - `config.sample.php`, then **rename it to `config.php`** and edit it with your database name, user, password.
4. **Check the URL** — it should open (a "POST only" message is correct):
   `https://leads.ndrinfotech.com/save-lead.php`
   If you uploaded to a different domain/folder, change `LEAD_API_URL` at the top of `js/lead-api.js` to match (must be `https`).
5. **Test** — submit the demo form on the website, then phpMyAdmin → table `leads` → *Browse*. You should see the new row.

## Notes
- Database credentials are only in `config.php` on the server. They are never in the website's JavaScript and `config.php` is git-ignored.
- Allowed websites are listed in `config.php` (`allowed_origins`). Add any new domain there.
- Saved fields: name, phone, email, qualification, course, mode, message, source (form/chat + page), page URL, IP, browser, time.
- Basic protection: honeypot field, server-side validation (same rules as the site, no links), and max 5 submissions per IP per 10 minutes.
- Only the forms that include *Qualification* (home + demo forms and the chat) are saved. The contact and corporate forms still go to WhatsApp only.
- You collect personal data: keep the database private and add a privacy policy page when you can.
