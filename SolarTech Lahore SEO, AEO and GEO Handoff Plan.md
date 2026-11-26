# SolarTech Lahore: SEO, AEO and GEO Handoff Plan

Prepared 26 November 2026 for the SolarTech site (solar-tech-websitee.vercel.app). Goal: top search visibility for solar in Lahore. Purpose of this document: record what has been seen, what has not, and exactly what happens next, so work can continue from the files and access you provide without repeating the research.

## 1. Ground rules

- No ranking, citation or traffic outcome can be guaranteed. Every measure below is tracked as observed movement, not proof of cause.
- Nothing is marked "seen" unless it was actually fetched or found. Everything else is listed as a gap.
- Evidence labels used throughout: **Observed** (fetched directly), **Found in search** (from search results, not verified at source), **Inferred** (my reasoning from observed facts), **Not verified**.
- The web search used is not Google. It shows who exists in the market, not real Google positions. Actual rankings need a dated Google review from Lahore on mobile and desktop.

## 2. What has been seen

### 2.1 Homepage (Observed, one fetch, extracted text only)

| Item | What was observed |
| --- | --- |
| URL fetched | https://solar-tech-websitee.vercel.app/ |
| Canonical | https://www.solartech.pk/ (a different host from the one fetched) |
| OG URL, OG image | Also on www.solartech.pk |
| Title evidence | Two different title strings were returned: "Premium Solar Systems in Pakistan: Panels, Inverters & Net Metering |
| Locality in title | "Pakistan", not "Lahore" |
| Meta description | Lists Lahore, Faisalabad, brands (Solax, GoodWe, Solis, Canadian Solar, Longi, Jinko, Dyness, Soluna), LESCO and FESCO net metering, 10-year warranty, "Punjab's trusted solar company" |
| Robots meta | index, follow, large previews allowed |
| Geo meta | placename Lahore, region PK, locale en\_PK |
| Products listed | Inverters 4 to 12 kW, panels up to 530 W, batteries 5 to 16 kWh |
| Services listed | Residential, commercial and industrial solar, net metering, energy audits, maintenance, 24/7 support |
| Claims made | 500+ installations, 10-year comprehensive warranty, authorized distributor and installer, save up to 80% on electricity bills |
| Contact | +92 323 4004 898, info@solartech.pk, Shahid Electric Store, D-Block Market, Model Town, Lahore, Mon to Sat 9am to 7pm |
| Internal links | Solar Load Calculator, Solar Panel Installation in Lahore, Solar Panel Installation in Faisalabad, all on the Vercel host |

Limits of this fetch: it returned text and metadata, not a rendered page. Heading structure, images, structured data, scripts, performance and layout were not seen.

### 2.2 Market landscape (Found in search)

Companies and directories that appeared for solar in Lahore queries:

- **Solartech (Pvt) Ltd**, solartech.com.pk. Listed at PACE Tower, MM Alam Road, Gulberg. Directory data shows about 250 staff. A job ad describes it as operating since 2005. This is the brand-name collision risk.
- **Solar Me**, solarme.com.pk. Gulberg III. Clutch lists it as founded 2017.
- **Premier Energy**, premierenergy.com.pk. Claims to be the number one solar company in Pakistan.
- **EBR Energy** (est. 2009), **Zero Carbon** (Canadian Solar distributor), **Shams Power** (20+ years), **Paratech Energy** (since 2007, DHA), **Soltech** (soltech.com.pk, since 2018), **Big Tech Solar**, **Uni Solar**, **1 Stop Solar Solutions**, **Cellsolnergy**, **Hadron Solar**.
- **Directories and listicles** appearing: ENF Solar, Clutch, Graana blog ("Solar Companies in Lahore").

Not seen: the actual Google results, local pack members, their titles and metas, their backlinks, their review counts, or search volumes.

### 2.3 Index presence (Inferred, weak)

Searches for the Vercel URL and for solartech.pk did not return the SolarTech site itself. That suggests, but does not prove, that it is not indexed. Search Console would confirm this in minutes.

## 3. Findings so far (hypotheses to confirm with files)

1. **Host conflict.** Canonical and OG point to www.solartech.pk while internal links stay on the Vercel host. If solartech.pk is not serving the same site, the canonical points at nothing useful. Not verified that solartech.pk resolves.
2. **Locality mismatch.** The title says Pakistan while the goal is Lahore. Lahore appears only in the meta description. Observed.
3. **Brand collision.** A well-established company with a near-identical name competes for brand searches and could cause customer confusion or a trademark issue. Found in search. Business decision needed.
4. **Unproven claims.** 500+ installations, authorized distributor, 10-year warranty, up to 80% savings. No evidence seen on the page. These weaken trust and carry consumer-protection risk. Observed claims, evidence not verified.
5. **Identity inconsistency.** "Headquartered in Lahore" versus a store address under the name "Shahid Electric Store". Name, address and phone must match across the site, Google Business Profile and directories. Observed.
6. **Established competition.** Many Lahore competitors have 8 to 20 years of history. Local pack visibility is the realistic first target. Head-term organic leadership is a longer track.

## 4. What has not been seen, and the plan for each

| Gap | Why it matters | What I need from you | What I will do |
| --- | --- | --- | --- |
| Production domain status (solartech.pk) | Decides which host can rank | Confirm whether solartech.pk is live and points at this codebase | Check redirects, canonical alignment, www versus non-www, HTTPS |
| Source code | Needed to implement anything | Repo access or the files in section 8 | Write the actual changes |
| Subpages: /solar-lahore/, /solar-faisalabad/, /solar-calculator/ | Likely the main ranking pages | Page source or fetchable URLs | Review title, meta, H1, copy, intent fit, schema, internal links |
| robots.txt, sitemap.xml | Crawl and discovery control | The files or their URLs | Validate directives, canonical URLs, lastmod, segmentation |
| Rendering and performance | Mobile solar searchers are impatient | Lighthouse or PageSpeed output, or the repo to build | Check JS rendering, Core Web Vitals risks, image weight |
| Structured data | Local business entity clarity | Page source | Detect, validate, then generate truthful LocalBusiness, Service, FAQ-appropriate markup |
| Images | Trust, speed, image search | The image folder or list | Alt text, dimensions, formats, real project photos versus stock |
| Search Console and Bing data | Real queries, impressions, index state | Read access or exports | Baseline, query-to-page mapping, near-win queries |
| Analytics | Conversion baseline (calls, WhatsApp, forms) | Access or export | Define the conversion baseline before changes |
| Google Business Profile | Primary driver for Lahore local pack | Profile link and owner or manager access | Categories, services, hours, photos, posts, reviews process, NAP match |
| Backlinks and citations | Authority gap vs competitors | Any existing link data, directory listings | Authority audit, citation clean-up list, directory targets (ENF, Clutch, local directories) |
| Real Google SERPs for target queries | Know who actually ranks and why | Nothing; I need a Lahore-based check | Dated mobile and desktop SERP review per query family |
| Search volumes | Prioritize head versus long-tail | Keyword tool export if you have one | Rank families by evidence, mark estimates as estimates |
| AI answer behaviour | AEO and GEO opportunity | Nothing | Build a frozen query set, record what AI engines say for Lahore solar, note which sources are cited |
| Evidence for claims | Trust, legal safety | Certificates, authorization letters, warranty terms, project list | Decide which claims stay, which get softened, and which need proof pages |
| Net metering rules | Content accuracy | Nothing | Verify current LESCO, FESCO and NEPRA rules before writing any net-metering copy, since policy has been changing |

## 5. Skill coverage ledger (27 skills screened)

States: **completed**, **partial**, **required** (not started), **blocked** (needs input), **conditional**, **not-applicable** (with reason).

| Skill | State | Note |
| --- | --- | --- |
| seo (router) | active | Owns the plan, ledger and handoffs |
| seo-research | partial | Market landscape only. Needs Google SERP review and volume evidence |
| ai-search-research | required | Build the query corpus and source landscape for AI engines |
| seo-performance | blocked | Needs Search Console, Bing, analytics |
| ai-visibility-monitor | conditional | Runs after a frozen query corpus exists, for baseline and later comparison |
| seo-audit | partial | Homepage only |
| seo-page | partial | Homepage metadata only. Subpages unseen |
| seo-technical | blocked | Needs repo, robots, sitemap, headers, rendering evidence |
| seo-content | required | Gap analysis and briefs after subpages are seen |
| seo-schema | required | Needs page source |
| seo-images | required | Needs image inventory |
| seo-sitemap | required | Needs sitemap and URL inventory |
| seo-hreflang | not-applicable (pending confirmation) | Single en\_PK locale observed. An Urdu version would change this |
| seo-architecture | required | Needs the page graph and navigation |
| seo-authority | required | No backlink data yet |
| seo-aeo | required | Runs after the research pack |
| seo-geo | required | Entity consistency and claim traceability. Runs after the research pack |
| seo-commerce | not-applicable (pending confirmation) | Products are listed but no online checkout was observed |
| seo-local | required, high priority | Google Business Profile, NAP, location signals |
| seo-video | not-applicable | No video observed. Revisit if project videos exist |
| seo-news-discover | not-applicable | Not a publisher site |
| seo-agentic | conditional, low priority | Quote form and WhatsApp journey readiness |
| seo-programmatic | conditional | Area pages could scale, but thin or duplicated area pages are a quality risk. Only with real local substance |
| seo-competitor-pages | conditional | Brand or comparison pages later, only with attributable evidence |
| seo-plan | required | After validated findings |
| seo-action-plan | required | Approval-ready actions with owners, acceptance and rollback |
| optimise-seo | blocked | Needs repo access and your authorization to implement |

## 6. Phase plan

Order: research, audit, baseline measurement, owner decisions, action planning, implementation, local acceptance, release, live verification, provider operations, delayed follow-up.

| Phase | What happens | Inputs needed | Output | Status |
| --- | --- | --- | --- | --- |
| 1. Research | Query families, Lahore SERP review, competitor evidence, AI-search source landscape | Files and access in section 8 | Query-to-page map, research pack | Started (landscape only) |
| 2. Audit | Technical, on-page, content, schema, images, architecture, local, authority | Repo, pages, robots, sitemap | Findings list with evidence and owners | Started (homepage only) |
| 3. Baseline | Search Console, Bing, analytics, plus a frozen AI query set | Data access | Baseline before any change | Blocked |
| 4. Owner decisions | Brand name, claims, domain, which pages to build | Your answers | Decision record | Waiting on you |
| 5. Action plan | Prioritized actions with acceptance criteria and rollback | Phases 1 to 4 | Approved plan | Not started |
| 6. Implementation | Code and content changes | Repo access, your approval | Changes ready locally | Blocked |
| 7. Local acceptance | Validate markup, links, canonicals, build | Phase 6 | Pass or fail record | Not started |
| 8. Release | Deploy | Your authorization | Live site | Not started |
| 9. Live verification | Confirm live pages match what was accepted | Live URLs | Delivery record | Not started |
| 10. Provider operations | Sitemap submission, Search Console and Bing actions, Business Profile updates | Separate authorization | Receipts | Not started |
| 11. Follow-up | Compare against baseline after enough time has passed | Baseline | Observational comparison, not causal proof | Not started |

## 7. Two opportunity tracks, run together

These are hypotheses. None is validated for volume or difficulty yet.

**Track A: nearer-term gains**

- Google Business Profile and the Lahore local pack.
- Long-tail and intent-specific pages: net metering process for LESCO, system price by size (for example 5 kW and 10 kW), inverter and battery choices, hybrid versus on-grid.
- Area pages with real local content (for example DHA, Bahria Town, Johar Town, Gulberg, Model Town), only where there is genuine project or service evidence.
- Project case studies with real photos, system size, location and results.
- Citations and directory listings with matching name, address and phone.

**Track B: head-term leadership**

- Families such as solar company or installation in Lahore, solar panels Lahore, solar system price in Lahore.
- Needs authority, reviews, strong category and city pages and clear entity signals. This is the longer track and is not replaced by Track A.

**AEO and GEO angle**

- AEO: direct, structured answers to questions people actually ask (cost, net metering steps, payback, maintenance), with visible support for every claim.
- GEO: one consistent business entity across the site, profile and directories, and claims that trace to evidence, so AI answers can cite you accurately.

## 8. What to send me

**Files and code**

- The full repo, or at least: the root layout and metadata config, every page file for the homepage, Lahore, Faisalabad and calculator pages, robots and sitemap files or generators, next.config or vercel.json, and the public folder listing.
- Whether the site is static, server-rendered or client-rendered.

**Access or exports**

- Search Console and Bing Webmaster Tools exports (queries and pages, last 3 to 16 months) or read access.
- Analytics export with calls, WhatsApp clicks and form submissions if tracked.
- Google Business Profile link, and who controls it.

**Answers**

1. Is solartech.pk live, and is it the intended production domain?
2. Is the brand name fixed, given the near-identical Solartech (Pvt) Ltd?
3. Which claims can be proven (500+ installations, authorized distributor, 10-year warranty), and with what documents?
4. Who actually operates the business and from which address? Which name should appear everywhere?
5. Which services matter most commercially (residential, commercial, industrial) and which areas of Lahore?
6. Is there any Urdu content, video, or online checkout planned?
7. What do you authorize: local changes only, deployment, or also Search Console and Business Profile actions?

## 9. Continuity: what will not be redone

When you return with files, I will treat these as already gathered and will not repeat them:

- The homepage evidence in section 2.1.
- The competitor and directory landscape in section 2.2.
- The findings in section 3, which I will confirm or retire against your files rather than rediscover.

I will still redo anything that goes stale: live SERPs, indexing status, and current net metering rules.

## 10. How success will be judged

- Separate measures, never merged into one score: Search Console impressions, clicks, average position and index coverage; local pack presence for a fixed set of Lahore queries; calls and WhatsApp leads; AI answer mentions, citations and accuracy from the frozen query set.
- Deployment, sitemap submission or a bot visit does not count as proof of indexing or ranking.
- Any later comparison is observational drift, not proof that a specific change caused it.
