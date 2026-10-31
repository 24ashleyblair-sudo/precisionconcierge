# Precision Concierge Website (Rebuild)

Static HTML site. No build tools needed. Upload the whole folder to any host (Netlify, Vercel, Hostinger, GoDaddy, etc.).

## What's in the folder
| File | Page |
|---|---|
| index.html | Home |
| about.html | About / Our Standard |
| services.html | Residential, Corporate, Destination Unpacking (new) |
| service-areas.html | Local SEO page: Palm Beach, Broward, Treasure Coast (new) |
| faq.html | FAQ (grouped, with Google FAQ schema) |
| contact.html | Consultation request form |
| privacy.html | Privacy policy (replaces the dead link) |
| sitemap.xml / robots.txt | Submit sitemap.xml in Google Search Console |

## Fixed from the old site
- Email was misspelled everywhere (`precisonconcierge...`). Now `info@precisionconciergeservice.com`
- Phone opened a Google Voice web page. Now taps to call on mobile
- Privacy Policy / Terms linked nowhere
- No meta descriptions, zoom disabled, no structured data

## Before you launch: confirm these
1. **Email inbox works.** Send a test to info@precisionconciergeservice.com and make sure it lands.
2. **City list** in service-areas.html: remove any city you don't actually serve.
3. **New FAQ answers** (pricing, mover recommendations, certificate of insurance): make sure they're accurate.
4. **Unpacking photo:** add `images/unpacking.jpg` (styled kitchen or closet), or the gold placeholder frame shows.
5. **Logo:** add `images/logo.png` and swap it in (see comment in each page's header).
6. **Testimonials:** add first name + city if clients approve (e.g. "Jennifer R., Boca Raton").
7. **Photos** are stored in the `images/` folder (resized for fast loading). To swap one, replace the file and keep the same name.

## Hooking up the form
Right now the form opens the visitor's email app with everything filled in, so no lead is lost.
To send leads straight to a CRM (GoHighLevel, Formspree, etc.), paste the webhook URL into `FORM_ENDPOINT` at the top of the form section in `js/main.js`.

## Hosting note
Links use clean addresses (`/about`, not `about.html`), matching the old site's links. Because of this, clicking around only works on the live site or a local server (run `python3 -m http.server` in this folder, then open http://localhost:8000), not by double-clicking the files.
