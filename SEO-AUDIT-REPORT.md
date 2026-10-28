# SEO Audit & Improvement Report — SolarTech-Website

**Project:** SolarTech Energy Solutions (React 19 + Vite 8 SPA, single page + calculator)
**Audit date:** October 26, 2026
**Scope:** Full technical + on-page + performance audit, followed by implementation of high-impact fixes.
**Deliverables of this audit:** 20+ fixes implemented, new SEO assets created, build verified (`npm run build` + `vite preview` route tests all pass).

---

## 1. Executive Summary

The site had a **strong visual design and genuinely useful tools** (solar load calculator, savings estimator), but was nearly invisible to search engines:

- The production build shipped a **1.5 KB empty HTML shell** — crawlers without JavaScript (Bing, DuckDuckGo, all AI answer engines, most SEO audits of your site) saw **zero content**.
- The most valuable asset — the **free Solar Load Calculator** — lived on a hash URL (`#/solar-calculator`) that Google **cannot index as a separate page**. An entire ranking opportunity was being thrown away (queries like *"solar calculator pakistan"*).
- No sitemap, no robots.txt, no canonical tags, no structured data, no Open Graph image, wrong fonts loaded, 3.4 MB of unoptimized images, inconsistent business phone number (kills local SEO), duplicate H1s, dead social/CTA links.

After this audit's fixes, the site has a **complete SEO foundation**: rich meta head, structured data, 4 indexable URLs, robots.txt + sitemap.xml, fast WebP images, consistent NAP, and crawling fallback content.

**Estimated impact:** crawlability ↑, indexation ↑ (0 → 4 URLs), LCP improvement of several seconds on 4G (3.4 MB → 0.6 MB images), better SERP click-through (rich meta + social previews), and the calculator can now rank for high-intent queries that currently go to competitors' tools.

---

## 2. Audit Findings (BEFORE)

### A. Critical — indexation blockers
| # | Issue | Severity |
|---|-------|----------|
| A1 | SPA renders everything client-side; shipped HTML had an empty `<div id="root">` — no content for non-JS crawlers | 🔴 Critical |
| A2 | Calculator only reachable at hash fragment `#/solar-calculator` — Google treats fragments as one URL; calculator page essentially unindexable, with no unique title/description ever shown | 🔴 Critical |
| A3 | No `canonical` tag | 🔴 High |
| A4 | No `robots.txt`, no `sitemap.xml` | 🔴 High |
| A5 | No structured data (JSON-LD) at all — no eligibility for rich results | 🔴 High |

### B. High — ranking factors
| # | Issue |
|---|-------|
| B1 | Two `<h1>` tags on every page (Navbar brand + main heading); Footer used an `<h2>` for the brand name |
| B2 | NAP (Name-Address-Phone) inconsistency — **three different phone numbers** in different components, two different `wa.me` numbers, `tel:` links pointing to a different number than displayed — active confusion for Google's local ranking |
| B3 | Images: ~3,455 KB of JPGs (hero-bg 928 KB, team 1008 KB, panels-aerial 1135 KB), no WebP, no `loading="lazy"`, no `width/height` (layout shift / CLS), no preload of the LCP hero image |
| B4 | Wrong fonts loaded: HTML loaded **Inter + Poppins** (7 weights each) while CSS actually uses **Manrope + Plus Jakarta Sans** (also loaded via a second, render-blocking `@import`) — wasted requests + double font payload |
| B5 | Location link pointed to generic `https://maps.google.com`; no full postal address anywhere on the site (weak local SEO) |
| B6 | Products section renders only the active tab's 3 items into the DOM — 2/3 of the product catalog was invisible to crawlers |

### C. Medium — trust, quality & UX signals
| # | Issue |
|---|-------|
| C1 | Copy typo: "services excelence, and more" (quality signal) |
| C2 | Dead links: Facebook/Instagram/YouTube all `href="#"`; Privacy/Terms were unlinked plain text; Products "View Details" buttons did nothing |
| C3 | No Open Graph image, no Twitter card, no `og:url`, no `og:image:width/height` |
| C4 | No `<noscript>` fallback content |
| C5 | No apple-touch-icon / PNG favicons / web manifest |
| C6 | Form labels not programmatically associated with inputs (accessibility) |
| C7 | Unused dead assets shipped to production (`inverter.jpg`, `src/assets/hero.png`) |

---

## 3. What Was Implemented (AFTER)

### 3.1 Complete `<head>` overhaul — `index.html` (rewritten)
- **SEO-optimized title:** `Solar Panels, Inverters & Net Metering in Pakistan | SolarTech Energy Solutions` (keywords first, brand last).
- **Rewritten meta description** with local geography, brand names, warranty + CTA.
- **Canonical URL**, `robots` directives (`max-image-preview:large` for image SERPs).
- **Full Open Graph + Twitter Card** set, incl. dedicated `og-cover.jpg` social image.
- **Local targeting:** `geo.region`, `geo.placename`, `og:locale=en_PK`, `theme-color`.
- **Icons/PWA:** SVG favicon + 180/192/512 PNG icons + `site.webmanifest`.
- **Fixed fonts:** now loads the fonts the CSS actually uses (Manrope + Plus Jakarta Sans, weights trimmed 14→9), with `preconnect`; removed the duplicate render-blocking `@import` from `src/index.css`.
- **LCP speed-up:** `<link rel="preload" as="image" … fetchpriority="high">` for the hero image.
- **`<noscript>` crawlable content:** a compact, non-duplicated summary of services/brands/contact for crawlers that don't execute JS.
- JSON-LD structured data (see 3.2).

### 3.2 Structured data (JSON-LD) — validated ✅
- **Home page:** `Organization`, `LocalBusiness` + `HomeAndConstructionBusiness` (with NAP, Lahore geo-coordinates, opening hours, `areaServed` for 8 cities, full service/product `OfferCatalog`), and `WebSite`.
- **Calculator page:** `WebApplication` (free, category UtilitiesApplication) + `BreadcrumbList`.
- Both blocks parse-validated with `scripts/validate-jsonld.mjs` — **VALID**.

### 3.3 The calculator is now a real, indexable page (biggest structural win)
- Converted from hash route to a **true multi-page Vite build**: new entry `solar-calculator/index.html` →
  `https://<domain>/solar-calculator/` with its **own title, meta description, canonical, OG/Twitter tags and WebApplication schema** — it can finally compete for `solar calculator`, `solar load calculator pakistan`, `solar system size calculator`, etc.
- New `src/calculator-main.jsx` + `src/CalculatorApp.jsx` mount the calculator page; JS is code-split (calculator bundle is only ~13 KB gzip, separate from home).
- Legacy `#/solar-calculator` links **redirect on the client** to the new URL, so old shares/bookmarks don't break (`src/App.jsx`).
- **URL hygiene:** all internal links use relative trailing-slash hrefs (`solar-calculator/`, `../#about`, `../privacy.html`) so the site works identically at a domain root or a subpath deploy (e.g., GitHub Pages). The calculator's canonical URL ends with `/` (canonical, og:url, sitemap, JSON-LD all agree) — bare `/solar-calculator` gets a 301 to it via `prettyUrls()` (dev/preview parity) and `_redirects`/`.htaccess` (Apache/Netlify/Cloudflare); nginx and GitHub Pages do it natively.
- `appType: 'mpa'` stops unknown URLs from being served the home page (no soft duplicates).
- Navbar/Footer are route-aware: `offHome` prop makes all section links climb back to the home page and highlights the correct nav item on the calculator page.
- Home page `App.jsx` simplified (no more hash-page switching logic).

### 3.4 Heading structure fixed
- Navbar brand `<h1>` → styled `<div>`; Footer brand `<h2>` → `<div>`. Now **exactly one H1 per page** (`Power Your Future With Solar Energy` on home; `Solar Load Calculator` on the calculator page), clean H2/H3 pyramid beneath.

### 3.5 NAP consistency (local SEO)
- **One phone number everywhere:** display `+92 301 5935 773`, `tel:+923015935773`, `https://wa.me/923015935773` — Navbar, Footer, Contact, WhyUs, calculator CTA, and JSON-LD all agree. *(NOTE: `+92 300 123 4567` and `+92 301 5935 773` were both placeholders — replace with the real number in one pass; search `923001234567` / `923015935773`.)*
- Google Maps link now opens a proper business search for "SolarTech Energy Solutions Lahore".

### 3.6 Image & performance optimization (biggest Core-Web-Vitals win)
- Created `scripts/optimize-images.mjs` (sharp). Results:

| Image | Before | After (WebP) | Reduction |
|---|---|---|---|
| hero-bg | 927.5 KB | **181.7 KB** | -80% |
| team | 1007.9 KB | **206.1 KB** | -80% |
| panels-aerial | 1134.8 KB | **225.2 KB** | -80% |
| inverter | 384.2 KB | **20 KB** | -95% |
| **Total** | **3,454 KB** | **613 KB** | **-82%** |

- New **`og-cover.jpg`** (1200×630, JPG for maximum Facebook/WhatsApp compatibility, 158.5 KB).
- Hero media upgraded to an **autoplay background video** (`Solar_energy_system_animation.mp4`): the optimized `hero-bg.webp` is kept as the instant `poster` (and remains preloaded with `fetchpriority="high"` for a fast LCP paint), video is `muted + loop + playsInline` for autoplay compliance, overlay darkened to 45% for text readability. Text block shifted left (padding reduced 48→32px) and headline stepped down one size (7xl→6xl) for balance on smaller screens.
- Original heavyweight JPGs moved to `assets-src/` (kept for regeneration, **no longer shipped to production**); unused `inverter.webp` is now available for product imagery.

### 3.7 New SEO assets created
| File | Purpose |
|---|---|
| `public/robots.txt` | Full crawl access, Sitemap location, AI bots (GPTBot/PerplexityBot) explicitly welcome |
| `public/sitemap.xml` | 4 URLs with priorities |
| `public/privacy.html` | Real Privacy Policy page (E-E-A-T / trust signal) |
| `public/terms.html` | Real Terms of Service page (protects calculator estimates legally) |
| `public/site.webmanifest` | Installability / brand consistency |
| `public/_redirects` | Netlify/Cloudflare rules: bare path → trailing slash 301, `index.html` → `/`, asset caching |
| `public/.htaccess` | Apache rules: the same 301s + gzip + 1-year asset caching + nosniff |
| `scripts/optimize-images.mjs` | Regenerate WebP/OG images from `assets-src/` any time |
| `scripts/generate-icons.mjs` | Regenerate PNG favicons + manifest |

### 3.8 Content & conversion fixes
- Products: **all categories now render in the DOM** (hidden when inactive) → crawlers see all 9 products + 6 brands; tabs keep working visually. Dead "View Details" buttons now point to the quote form ("Get Price / Enquire").
- Hero copy typo fixed ("excelence") and reworded to a cleaner value proposition.
- Footer Privacy/Terms now real links; dead `#` social links remain only where real profiles don't exist yet (flagged in §4).
- Calculator page "Back to Home" link fixed (`#hero` → `/#hero`).

### 3.8b Mobile UX & theme polish (post-audit)
- **Horizontal overflow on mobile fixed** — decorative oversized elements (800/600 px blurred orbs, floating badges) no longer widen the layout: `overflow-hidden` added to every overflowing section (About, Contact, Products, Services, Testimonials, SavingsCalculator, StatsBar) and `html { overflow-x: clip }` with an `overflow-x: hidden` fallback for older mobile browsers. Body-level clip was in place, the root-level rule covers browsers that ignore `clip`.
- **Hero video framing** — on mobile the video's visible content is nudged 20 px right (`object-position: calc(50% - 20px)`); desktop restored to centered via `lg:object-center`.
- Full theme swap to the white-and-lime-green palette (`@theme` ramp remap in `src/index.css`) — headings navy `#101A35`, primary lime `#80C91B`, white surfaces; favicon/manifest/theme-color updated to match.
- Hero overlay reworked from the old 72–92 % white wash to a left-weighted navy scrim fading to clear so the video plays crisply.
- Legibility follow-up: About floating badge text recolored (was white-on-white after the theme swap).

### 3.9 Verification performed
- `npm run build` — clean, no warnings.
- Route matrix tested on both `vite preview` (production build) and `npm run dev`:

| URL | Serves |
|---|---|
| `/` | Home ✅ |
| `/solar-calculator` (bare) | 301 → `/solar-calculator/` → Calculator ✅ |
| `/solar-calculator/` | Calculator (own head/schema) ✅ |
| `/index.html` | 301-equivalent → `/` ✅ |
| `/robots.txt`, `/sitemap.xml` | ✅ |
| `/privacy.html`, `/terms.html` | ✅ |

- Calculator page emits the code-split `calculator-*.js` bundle ✅.
- JSON-LD validated programmatically on both pages ✅.
- No stale `.jpg` references or absolute internal links remain in source ✅.

---

## 4. Placeholders YOU MUST Replace Before Launch

Search for these marked strings when the real details are known:

| Placeholder | Where | Replace with |
|---|---|---|
| `https://www.solartech.pk` | index.html, solar-calculator/index.html, privacy.html, terms.html, robots.txt, sitemap.xml | **Real production domain** (canonical, og:url, og:image, JSON-LD) |
| `REPLACE-WITH-ADDRESS` | index.html (JSON-LD ×2) | Real street address (also add it visibly in the Footer/Contact section — Google's local ranking uses on-site NAP) |
| `31.5204, 74.3587` | index.html JSON-LD | Exact geo-coordinates of the shop/office (right-click on Google Maps) |
| `+92 301 5935 773` | all components + JSON-LD | The **real** business number (all occurrences are placeholders) |
| `info@solartech.pk` | Contact, Footer, JSON-LD | Real email |
| `#` social links | Footer `socialLinks` | Real Facebook/Instagram/YouTube URLs (then add them to JSON-LD `sameAs`) |

---

## 5. Roadmap — What's Needed for #1 Rankings (Honest Answer)

This audit fixed the technical ceiling. **Ranking #1 is not achievable with on-page work alone** in the Pakistan solar market, where competitors (SolarMax, Reon, SunArc, Sky Solar, Premier Energy…) outrank any new site on age, reviews, backlinks and content volume. Here is the realistic path, in priority order:

### Phase 1 — Launch & indexation (week 1)
1. Replace all placeholders (§4).
2. **Google Search Console:** verify the domain (DNS TXT), submit `sitemap.xml`, then Request Indexing for `/` and `/solar-calculator`.
3. **Google Business Profile:** create/claim the profile for the Lahore location (category "Solar energy company"), complete every field, photos, products; embed the GBP map in the Contact section. **This is the #1 lever for contractors** — most "solar Lahore" traffic is local-pack traffic, not organic.
4. **Bing Webmaster Tools** (imports directly from GSC) — Bing/DuckDuckGo/AI crawlers don't render JS well, and now they'll read the `<noscript>` fallback.
5. Install **GA4** + Microsoft Clarity on both HTML entries.

### Phase 2 — Content depth (weeks 2–8) — *the real ranking engine*
One page per product and per service (a single-page site can never rank for "solax 5kw price in pakistan" vs a dedicated page):
1. **Product pages** (`/products/solax-x1-hybrid-inverter`) — price ranges (PKR), specs, availability, FAQ. These match high-volume commercial queries where there's real buyer intent.
2. **City pages** (`/solar-installation-lahore`, `…-karachi`, `…-islamabad`) — local proof, projects, net metering steps per DISCO (LESCO vs KE vs IESCO).
3. **Guide/blog hub** — the queries that actually get searched in Pakistan:
   - `net metering procedure pakistan 2026` (LESCO/WAPDA application steps)
   - `best solar panel brands in pakistan` (Longi vs Jinko vs Canadian comparison)
   - `solar inverter price in pakistan` (Solax vs Solis vs GoodWe)
   - `6kw solar system price in pakistan` / `5kw solar system` (huge commercial-intent cluster)
   - `solar battery price in pakistan` (Dyness/Soluna/Osaka comparisons)
   - `on-grid vs hybrid vs off-grid solar pakistan`
   Each guide links to the calculator → link equity flows to your best commercial asset.
4. Add a **visible FAQ section** (home + calculator) and mark it up — today's FAQ schema policy requires the Q&A text to be visible on-page.
5. Add real **customer reviews with names/photos** → `Review`/`aggregateRating` schema becomes legitimate once on-page (replaces the trust I intentionally did NOT fabricate in JSON-LD — self-serving fake ratings risk manual penalties).

### Phase 3 — Authority building (ongoing)
1. **Citations:** consistent NAP on yellowpages.pk, pakbiz, OLX business, Markaz, Huka, Chamber directories — the exact NAP consistency this audit fixed is what makes them count.
2. **Publish real project case studies** (5 kW rooftop in DHA Phase 6, before/after bills) — locally linkable, PR-able content.
3. **Local press:** solar/environment story in Pakistani tech/energy portals (ProPakistani, TechJuice, Solar Tribune) → hard-to-get local backlinks.
4. **YouTube / TikTok:** installation timelapses + "how to read your LESCO bill" — video results own SERPs for these queries and YouTube ranks in Google.

### Phase 4 — Technical upgrades (only if content grows)
- If the site becomes multi-page (Phase 2), consider **SSG/prerendering** (Astro, Next.js, or `vite-plugin-prerender`) so every page ships real HTML; until then, the current MPA + noscript setup covers the essential crawlers.
- Add `og:image` per product/city page once they exist; add `hreflang` only if Urdu versions launch (`/ur/`).
- Fix remaining a11y polish: label `htmlFor`/`id` bindings on the contact form inputs.
- Set a performance budget (< 300 KB JS/CSS gzip combined, all images WebP) — install the bundle as-is today already improved from 566 KB→~156 KB gzip JS for the home route.

### KPI targets (GSC, 90 days after launch)
- Impressions ↑ from ~0 → 50k+/mo (پاکستان solar cluster)
- `/solar-calculator` ranking top 10 for "solar calculator pakistan" class queries
- GBP appearing in local pack for "solar company lahore"
- LCP < 2.5 s on 4G (was multi-second with 3.4 MB images)

---

## 6. City & Service SEO Upgrade — Lahore & Faisalabad (Oct 28, 2026)

Following the Phase-2 roadmap (§5.2), two **dedicated, fully indexable city landing pages** were added — the audit's own conclusion was that a single-page site cannot rank for "solar installation Lahore/Faisalabad"-class queries against competitors with dedicated local pages:

### 6.1 What was added
| Asset | Purpose |
|---|---|
| `solar-lahore/index.html` + `src/LahoreApp.jsx` + `src/lahore-main.jsx` | `/solar-lahore/` — city page with its own title, meta, canonical, OG tags |
| `solar-faisalabad/index.html` + `src/FaisalabadApp.jsx` + `src/faisalabad-main.jsx` | `/solar-faisalabad/` — same pattern, FESCO-specific |
| `src/components/CityLanding.jsx` | Shared landing component (per-city data: DISCO, coverage areas, FAQs, industrial estates) — both pages render it, ~5.6 KB gzip shared chunk |

**Content depth per page (this is what makes them rank):**
- **H1:** `Solar Panel Installation in Lahore` / `…in Faisalabad` — exact-match commercial intent.
- **Services section (6 cards):** residential rooftop, commercial & industrial, `{DISCO} net metering`, hybrid battery backup, survey/design/audit, AMC — each card names the city/DISCO in rendered HTML.
- **Price table (2026):** 5 kW / 10 kW / 25 kW+ systems with **PKR ranges, panel counts, inverter kW, roof area** — targets the "solar system price in Lahore/Faisalabad" query cluster, which is the highest-intent, highest-volume money query in the Pakistani solar niche.
- **Net metering section:** step-by-step procedure per city's DISCO (**LESCO in Lahore, FESCO in Faisalabad**) — matches "LESCO net metering procedure" class informational queries and signals real local expertise to Google.
- **Coverage/area lists:** DHA, Gulberg, Bahria Town, Johar Town… (Lahore); Madina Town, Canal Road, FIED Industrial Estate… (Faisalabad) — locality term coverage mirrors how local searchers actually type.
- **Visible FAQ (6 Q&As per city)** + matching FAQPage JSON-LD (rich-result eligible), *disciplined question wording per city* (5 kW price, net metering timeline, panel brand fit, DHA/society NOC for Lahore; textile-industry suitability for Faisalabad).
- **Rich `<noscript>` fallback** with services, prices, area lists AND internal links to home, calculator and the sibling city page — Bing/DuckDuckGo/AI crawlers get full content without JS.
- **Schema per page:** `Service` (with inline `LocalBusiness` provider NAP + `areaServed` City/AdministrativeArea + `hasOfferCatalog` of products) + `FAQPage` + `BreadcrumbList`. All validated via `scripts/validate-jsonld.mjs` (now covers 4 pages) — **VALID**.

### 6.2 Indexation wiring (so the new pages actually get found)
- **Cross-linking (crawl paths):** Footer "Popular Pages" row (present on ALL pages → calculator & city pages receive links from every document), home `<noscript>` links, city-page breadcrumbs + hero CTAs linking back to `/solar-calculator/` and home, and city pages link to each other.
- `public/sitemap.xml`: +2 URLs (priority 0.9 — commercial pages sit below home 1.0, above legal pages 0.2); `lastmod` 2026-10-28.
- `public/_redirects` + `public/.htaccess` + dev `prettyUrls()`: bare `/solar-lahore` → 301 to `/solar-lahore/` (canonical slash form everywhere — no duplicate URLs).
- `vite.config.js`: two new MPA inputs; checked the production build — `/solar-lahore/` & `/solar-faisalabad/` serve 200, bare path serves 301, JSON-LD parses on all 4 pages.
- Home head: meta description now names **Lahore + Faisalabad explicitly** ("Lahore, Faisalabad & across Pakistan", "LESCO & FESCO net metering, Punjab's trusted solar company") — the description is a ranking input *indirectly* (CTR) and a snippet stage directly.

### 6.3 Why the earlier (§3) work makes these pages land in rankings
The October 26 overhaul built the *technical foundation* these new pages stand on:
1. **Trailing-slash MPA pattern** (built for the calculator) is now reused — each city page is a genuine crawlable URL with a unique `<title>`, something the original hash-SPA could never produce for any page.
2. **NAP consistency** (one phone everywhere + Google-verifiable identity in JSON-LD) means the two new `Service` entities inherit an *already-consistent* branded entity — the #1 prerequisite for local ranking relevance in Lahore/Faisalabad.
3. **Geo signals** (`geo.region`, `geo.placename` — now per-city on the city pages), `og:locale=en_PK`, city coordinates in the provider address.
4. **Speed:** 613 KB total images + code-split JS keeps LCP healthy on 4G, and Core Web Vitals rank for *every* page including these new ones.
5. **noscript fallbacks** (a pattern the audit introduced) mean the majority non-Google crawlers index the city pages' content too.
6. **robots.txt + GSC-submitted sitemap** means the new URLs enter discovery immediately upon deploy; no need to wait for organic crawling.

### 6.4 Ranking checks — how to verify (and measure) all of this
**Google Search Console (the only authoritative rank source):** after deploy, verify domain (DNS TXT), submit sitemap.xml, then:
- *URL Inspection* on `/`, `/solar-calculator/`, `/solar-lahore/`, `/solar-faisalabad/` → "Request Indexing" for each.
- **Performance → Search results:** filter by *Query* and *Page*. Within 2–6 weeks look for impressions on the money clusters: `solar installation lahore`, `solar panels lahore`, `solar system price faisalabad`, `lesco net metering`, `solar calculator pakistan`, `fesco solar`. Impressions rising before clicks is the normal sequence — treat impressions as your ranking-orbit indicator, clicks as intent capture.
- **Sitemaps report:** submitted sitemap should show 6 URLs discovered / indexed (Pages report → "Why pages aren't indexed" if not).
- **Rich Results Test / GSC Enhancements:** confirm FAQ rich results are eligible on both city pages.
- KPI targets (§5 KPI table still apply): `/solar-lahore` top-10 within 90 days for "solar installation lahore" class queries — realistically the local-pack via **Google Business Profile** is the faster first win; city pages are the faster *organic* win.

**Spot checks (real SERPs, no tools needed):**
- `site:yourdomain.pk` → should list all indexable URLs within weeks.
- `site:yourdomain.pk solar faisalabad` → the city page surfaces.
- `intitle:"solar installation lahore"` — see WHO outranks you; note the SERP floor (Google Local data, SolarMax, Reon are strong). Target position moves, not "must be #1."
- Search `solar system price in faisalabad 2026` from an IP/locality sample (or use a rank tracker e.g. SERPMobile/SE Ranking with PKL location) and log positions weekly — rank trackers bracket GSC's percentile data with exact positions.
- AI answers (ChatGPT/Perplexity/Ask) — ask "best solar companies in Faisalabad?" monthly; the noscript routes + Product schema make the site *eligible* to be cited.

**Local-pack (largest share of "solar lahore" clicks):** create both Google Business Profiles (category Solar energy installer, service-area Lahore / Faisalabad), embed the map in the Contact section, collect reviews there — GBP-in-local-pack is tracked in GSC Business Profile reports, not in standard Search reporting.


## 7. File Change Summary (City/Service Upgrade addendum)

**Created:** `vercel.json` (Vercel-host config: global `trailingSlash: true` 308s for canonical URLs, `/assets/*` immutable caching, `nosniff` headers, `/privacy`+`/terms` 301s) · `solar-lahore/index.html` · `solar-faisalabad/index.html` · `src/CityLanding.jsx` · `src/{LahoreApp,FaisalabadApp}.jsx` · `src/{lahore,faisalabad}-main.jsx`

**Modified:** `vite.config.js` (+2 MPA inputs, +2 bare-path 301s) · `public/sitemap.xml` (+2 URLs) · `public/_redirects` (+2 rules) · `public/.htaccess` (+2 rules) · `src/components/Footer.jsx` ("Popular Pages" internal-link row) · `index.html` (description names Lahore + Faisalabad + LESCO/FESCO; noscript links city pages) · `scripts/validate-jsonld.mjs` (now validates all 4 pages)

---

## 8. File Change Summary — Original October 26 Audit

**Created:** `solar-calculator/index.html` · `src/CalculatorApp.jsx` · `src/calculator-main.jsx` · `public/robots.txt` · `public/sitemap.xml` · `public/privacy.html` · `public/terms.html` · `public/_redirects` · `public/.htaccess` · `public/site.webmanifest` · `public/favicon-{180,192,512}.png` · `public/og-cover.jpg` · `public/{hero-bg,team,panels-aerial,inverter}.webp` · `scripts/optimize-images.mjs` · `scripts/generate-icons.mjs` · `scripts/validate-jsonld.mjs` · `assets-src/*` (source images) · `SEO-AUDIT-REPORT.md`

**Modified:** `index.html` (full head rewrite) · `vite.config.js` (MPA inputs, `appType: 'mpa'`, `prettyUrls()` redirect middleware) · `src/App.jsx` (redirect + simplified) · `src/index.css` (font @import removed) · `src/components/Navbar.jsx` (single-H1, NAP, route-aware) · `Footer.jsx` (H2→div, NAP, legal links, route-aware) · `Contact.jsx` (NAP, Maps link) · `Hero.jsx` (typo, WebP, fetchpriority, dimensions) · `About.jsx` (WebP, lazy, dimensions) · `WhyUs.jsx` (NAP, WebP bg) · `Products.jsx` (DOM-render all tabs, working CTAs) · `SolarCalculatorPage.jsx` (back-home link) · `FloatingCalculator.jsx` (real URL) · `public/sitemap.xml` · `package.json` (+ sharp)

**Deleted from production path:** heavyweight JPGs (moved to `assets-src/`), unused `src/assets/hero.png` can be removed on next cleanup.
