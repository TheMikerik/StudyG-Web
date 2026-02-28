# StudyG — SEO Directory Silo Roadmap

> Marketing landing page (conversions) + flashcard directory silo (SEO).
> Homepage is clean and conversion-focused. SEO content lives behind a subtle footer link ("Flashcard Directory").
> Stack: Next.js (App Router) + Supabase + Claude Pro (MCP) + macOS launchd.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI Generation | Claude Pro (Claude Code CLI + MCP, no API cost) |
| Automation | macOS LaunchAgent (launchd) |
| Hosting | Cloudflare Pages (`@opennextjs/cloudflare`) |
| Analytics | Cloudflare Web Analytics + Google Search Console |
| Rendering | SSR / ISR (content crawlable by Google, no JS-only render) |

---

## SEO Architecture: Landing + Directory Silo

The site has two distinct zones:

```
studyg.app/                        ← Marketing landing page (conversion)
studyg.app/flashcards/             ← Directory root (hidden from nav, footer only)
studyg.app/flashcards/[category]/              ← L1 Category hub
studyg.app/flashcards/[category]/[subcategory]/        ← L2 Subcategory hub
studyg.app/flashcards/[category]/[subcategory]/[slug]/ ← L3 Topic page (SEO target)
```

**Entry point:** One small link in the site footer (e.g., "Flashcard Directory" or "Study Subjects").
- Normal users rarely click it; crawlers follow it and discover all pages.
- Homepage nav stays clean — no visible blog/directory links.

**Why a silo?**
- Topic pages inherit authority from their parent hubs.
- No orphan pages — every L3 page is reachable via L2 → L1 → root.
- Internal links reinforce topical relevance signals.

### URL Examples

| Level | Example URL |
|---|---|
| L1 Category | `/flashcards/biology/` |
| L2 Subcategory | `/flashcards/biology/ap-biology/` |
| L3 Topic | `/flashcards/biology/ap-biology/cell-respiration-flashcards/` |

### Category Seed List (start here, expand later)

| Category (L1) | Subcategory Examples (L2) |
|---|---|
| Biology | AP Biology, Genetics, Microbiology, Anatomy |
| Medicine | Pharmacology, Pathology, USMLE Step 1, Biochemistry |
| Computer Science | Data Structures, Algorithms, Operating Systems, Networking |
| Languages | Spanish Vocabulary, French Grammar, Japanese Kanji, Latin |
| Law | Constitutional Law, Contract Law, Criminal Law, Evidence |
| History | World War II, Ancient Rome, US History, Cold War |
| Math | Calculus, Linear Algebra, Statistics, Discrete Math |

---

## Page Template: Level 1 / Level 2 / Level 3

### Level 1 — Category Hub (`/flashcards/[category]/`)

- H1: `[Category] Flashcards — Study Guide & Topic Directory`
- Short intro: 50–80 words (what this category covers, who it's for)
- Grid of subcategories with card count
- Internal links: back to `/flashcards/` root
- `noindex` if fewer than 3 subcategories with published topics

### Level 2 — Subcategory Hub (`/flashcards/[category]/[subcategory]/`)

- H1: `[Subcategory] Flashcards — [N] Topics`
- Short intro: 50–100 words
- Paginated list of L3 topic pages (max 20 per page)
- Breadcrumb: Home → Flashcard Directory → [Category] → [Subcategory]
- Internal links: back to L1 parent + sibling subcategories
- `noindex` if fewer than 3 published topics

### Level 3 — Topic Page (`/flashcards/[category]/[subcategory]/[slug]/`)

This is the primary SEO target. Every topic page must include:

| Element | Spec |
|---|---|
| H1 | Exact-match high-intent query (e.g., "Cell Respiration Flashcards — AP Biology") |
| Intro | 150–250 words. Unique per page. Covers what the topic is and why these flashcards help. No long essays. |
| Flashcard Preview | Exactly 5 flashcards. Rendered as crawlable HTML (`<dl>` or `<details>` elements, NOT JS-hidden). |
| FAQ Section | 3–5 questions + answers. Include `FAQPage` JSON-LD schema. |
| Related Topics | 3–5 links to sibling or related L3 pages. |
| Breadcrumbs | UI breadcrumb + `BreadcrumbList` JSON-LD schema. |
| Metadata | Unique `<title>` + `<meta description>` (under 160 chars). |
| Canonical | Self-referencing canonical tag. |

---

## Database Schema

Three tables. Run in Supabase SQL Editor.

```sql
-- Level 1: Category hubs
create table categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  description  text,
  created_at   timestamptz default now()
);

-- Level 2: Subcategory hubs
create table subcategories (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid references categories(id) on delete cascade,
  slug         text unique not null,
  name         text not null,
  description  text,
  created_at   timestamptz default now()
);

-- Level 3: Topic pages (the SEO targets)
create table flashcard_pages (
  id              uuid primary key default gen_random_uuid(),
  subcategory_id  uuid references subcategories(id) on delete cascade,
  slug            text unique not null,
  h1              text not null,         -- exact-match H1
  intro           text not null,         -- 150-250 words, unique
  flashcards      jsonb not null,        -- array of {front, back}
  faq             jsonb not null,        -- array of {question, answer}
  related_slugs   text[],               -- slugs of related L3 pages
  published       boolean default false,
  published_at    timestamptz,
  created_at      timestamptz default now()
);

-- RLS: public read on all tables
alter table categories       enable row level security;
alter table subcategories    enable row level security;
alter table flashcard_pages  enable row level security;

create policy "Public read categories"      on categories      for select using (true);
create policy "Public read subcategories"   on subcategories   for select using (true);
create policy "Public read flashcard_pages" on flashcard_pages for select using (published = true);
-- Service role handles all writes (no public write policy needed)
```

---

## Indexation & Quality Gate (Must Pass)

A topic page is only published (and included in the sitemap) if it passes ALL checks:

| Check | Requirement |
|---|---|
| Flashcards | Exactly 5 flashcards present in `flashcards` column |
| Intro | 150–250 words, not a boilerplate template string |
| FAQ | At least 3 FAQ items present |
| Related Links | At least 3 `related_slugs` pointing to valid published pages |
| H1 | Unique across all pages (no duplicate H1s) |

Pages that fail the gate:
- Set `published = false` → `noindex` meta tag added by default
- Excluded from `sitemap.xml`
- Shown a `noindex` robots meta tag even if accidentally reachable

Hub pages (L1, L2):
- `noindex` if they have fewer than 3 published children
- `index` once threshold is met (check at build/ISR time)

---

## Internal Linking & Topic Clusters

### Rules

| From | Links To |
|---|---|
| L3 Topic page | L2 Subcategory (parent) + L1 Category (grandparent) via breadcrumb |
| L3 Topic page | 3–5 related L3 pages via "Related Topics" module |
| L2 Subcategory | All its L3 topic pages (paginated list) + L1 parent |
| L1 Category | All its L2 subcategories |
| `/flashcards/` root | All L1 categories |
| Footer (sitewide) | `/flashcards/` root only |

### Related Topics Logic

- Related slugs are stored in `related_slugs[]` column on each topic page.
- Generation prompt instructs Claude to pick 3–5 siblings from the same subcategory.
- Related pages must already exist in the DB (validated before insert).

---

## Sitemap + Robots + Canonicals

### `sitemap.xml`

- Generated by `src/app/sitemap.ts` (Next.js built-in).
- Only includes pages where `published = true`.
- Includes: `/` homepage, all L1, L2, and L3 pages that pass the quality gate.
- Excludes: draft pages, thin hubs with < 3 children, admin routes.
- Regenerated on each ISR revalidation.

### `robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://studyg.app/sitemap.xml
```

### Canonical Tags

- Every page has a self-referencing canonical: `<link rel="canonical" href="[current URL]" />`
- Implemented in `generateMetadata()` on every route.
- Prevents duplicates from trailing slashes, query params, or pagination.

---

## Phase 1 — Project Setup ✅

**Goal:** Working Next.js project connected to Supabase, deployable to Cloudflare Pages.

- [x] 1.1 Bootstrap Next.js app
- [x] 1.2 Push to GitHub (`studyg-blog`)
- [x] 1.3 Create Supabase project
- [x] 1.4 Install `@supabase/supabase-js`
- [x] 1.5 Add `.env.local` + `src/lib/supabase.ts`
- [x] 1.6 Install Cloudflare adapter + Wrangler
- [x] 1.7 `wrangler.toml` (nodejs_compat, pages_build_output_dir)
- [x] 1.8 `build:cf` script + `open-next.config.ts`
- [x] 1.8a Verified `npm run build:cf` passes locally
- [ ] 1.9 Connect GitHub repo to Cloudflare Pages
  - Build command: `npm run build:cf`
  - Output dir: `.open-next/assets`
  - Add all env vars under Settings → Environment Variables
- [ ] 1.10 Verify Cloudflare Pages build passes

**Deliverable:** Live `https://studyg-blog.pages.dev`

---

## Phase 2 — Database Schema (3-Table Silo)

**Goal:** Replace single `posts` table with the 3-table silo schema above.

- [x] 2.1 Run the 3-table SQL (categories, subcategories, flashcard_pages) in Supabase
- [x] 2.2 Add RLS policies (public read, service role writes)
- [x] 2.3 Seed first categories and subcategories manually (from the Category Seed List above)
- [x] 2.4 Update `src/lib/supabase.ts` with typed queries for all 3 tables
- [x] 2.5 Test a manual insert of one L3 topic page via Supabase dashboard

**Deliverable:** 3-table schema live in Supabase with at least 3 categories and 9 subcategories seeded

---

## Phase 3 — Directory UI (4 Route Levels)

**Goal:** Next.js routes for all silo levels. SSR/ISR — content visible to crawlers without JS.

### Routes to build

| Route | File | Render |
|---|---|---|
| `/` | `app/page.tsx` | SSR — marketing landing page, no directory links in nav |
| `/flashcards/` | `app/flashcards/page.tsx` | ISR — L1 category grid |
| `/flashcards/[category]/` | `app/flashcards/[category]/page.tsx` | ISR — L2 subcategory list |
| `/flashcards/[category]/[subcategory]/` | `app/flashcards/[category]/[subcategory]/page.tsx` | ISR — L3 topic list |
| `/flashcards/[category]/[subcategory]/[slug]/` | `app/flashcards/[category]/[subcategory]/[slug]/page.tsx` | ISR — Topic page |

### Steps

- [x] 3.1 Update homepage (`app/page.tsx`): add one small "Flashcard Directory" link in footer only
- [x] 3.2 Build `/flashcards/` root — category grid with card counts
- [x] 3.3 Build L1 category page — subcategory list + breadcrumb
- [x] 3.4 Build L2 subcategory page — topic list (paginated, 20/page) + breadcrumb
- [x] 3.5 Build L3 topic page:
  - [x] 3.5a Exact-match H1
  - [x] 3.5b Intro text block
  - [x] 3.5c Flashcard preview (5 cards as crawlable HTML `<details>` elements)
  - [x] 3.5d FAQ section with `FAQPage` JSON-LD
  - [x] 3.5e Related Topics module (3–5 links)
  - [x] 3.5f `BreadcrumbList` JSON-LD schema
- [x] 3.6 `generateMetadata()` on all routes (title, meta description, OG, canonical)
- [x] 3.7 `noindex` meta on thin hubs (< 3 children) and unpublished pages
- [x] 3.8 ISR `revalidate` set to 86400 (24h) on all directory routes
- [x] 3.9 `generateStaticParams()` for L3 pages (pre-render at build time)
- [x] 3.10 Update `src/app/sitemap.ts` to include only published, passing-quality-gate pages
- [x] 3.11 Add `src/app/robots.ts`

**Deliverable:** All 4 route levels rendering correctly, content visible in `curl` (no JS required)

---

## Phase 4 — AI Page Generation (Claude Pro + MCP)

**Goal:** Claude Code CLI generates L3 topic pages that pass the quality gate and inserts them into Supabase via MCP.

### How it works

```
launchd (3× per day)
  → runs scripts/generate-pages.sh
  → calls: claude -p "$(cat scripts/generate-pages-prompt.md)"
  → Claude (Pro) internally:
      Step 1: Query DB for subcategories with fewest published topics
      Step 2: Pick 3 high-intent topic titles not yet in the DB
      Step 3: For each topic, generate: H1, intro (150-250w), 5 flashcards, 3-5 FAQ, related_slugs
      Step 4: Self-evaluate against quality gate checklist
      Step 5: If any check fails, rewrite that section only
      Step 6: Insert passing pages into flashcard_pages with published = true
  → Script stamps last-run timestamp (prevents duplicate runs within same window)
```

### Generation Prompt Requirements

The prompt (`scripts/generate-pages-prompt.md`) must instruct Claude to:
- Write intros that are unique (no boilerplate openers like "In this guide, we'll cover...")
- Generate flashcard fronts as concise questions or terms, backs as precise answers
- Write FAQs that match actual Google "People Also Ask" patterns for the topic
- Pick `related_slugs` from slugs already in the DB (query before inserting)
- Keep H1 under 65 characters and match search intent (not clickbait)

### Steps

- [x] 4.0 Supabase MCP configured in Claude settings (`claude mcp list` shows it)
- [ ] 4.1 Rewrite `scripts/generate-pages-prompt.md` for the new 3-table schema and quality gate
- [ ] 4.2 Update `scripts/generate-pages.sh` (rename from `generate-post.sh`)
- [ ] 4.3 Test manually: `bash scripts/generate-pages.sh --force`
  - Check Supabase dashboard — 3 new rows in `flashcard_pages`, all `published = true`
  - Verify each page passes quality gate (5 cards, 150+ word intro, 3+ FAQ)
- [ ] 4.4 Test that generated pages render correctly in the UI

**Deliverable:** Running the script produces 3 quality-gate-passing L3 pages in the DB

---

## Phase 5 — Automation (macOS LaunchAgent)

**Goal:** Auto-generate 3 topic pages per day at scheduled times.

- [x] 5.0 `scripts/com.studyg.generate-pages.plist` LaunchAgent definition
- [x] 5.1 Install and verify LaunchAgent:
  ```bash
  cp scripts/com.studyg.generate-pages.plist ~/Library/LaunchAgents/
  launchctl load ~/Library/LaunchAgents/com.studyg.generate-pages.plist
  launchctl list | grep studyg
  ```
- [x] 5.2 Schedule: `StartCalendarInterval` at 09:00, 14:00, 20:00
  - Generates 1 page per run (3/day total)
  - Shell script timestamp guard prevents duplicate runs in the same window

**Deliverable:** MacBook auto-generates 1 L3 topic page 3× daily without manual action

---

## Launch Sequence (First 30 Days)

**Goal:** Reach 50 published, indexed L3 topic pages before submitting sitemap.

### Pre-launch Checklist

- [ ] L1 seed: 5+ categories in DB
- [ ] L2 seed: 15+ subcategories (3+ per category)
- [ ] L3 seed batch: First 15 topic pages created manually (curated, not automated)
  - Choose highest-intent topics (e.g., "USMLE Pharmacology Flashcards", "AP Biology Cell Respiration Flashcards")
  - Manually review each for quality gate pass
- [ ] All routes rendering correctly on production URL
- [ ] `sitemap.xml` accessible and only contains published pages
- [ ] `robots.txt` deployed
- [ ] Breadcrumbs + JSON-LD visible in Google Rich Results Test
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (test with PageSpeed Insights)
- [ ] Custom domain connected (e.g., `studyg.app` or `flashcards.studyg.app`)

### Submit to Google

- [ ] Submit sitemap in Google Search Console
- [ ] Request indexing on the first 15 L3 pages manually (GSC → URL Inspection → Request Indexing)
- [ ] Submit to Bing Webmaster Tools

### Week 2–4

- [ ] Monitor GSC: Index Coverage report (are pages being indexed?)
- [ ] Monitor GSC: Performance report (any impressions yet?)
- [ ] Fix any crawl errors before enabling automation
- [ ] Enable launchd automation once first 15 pages show indexing signals

---

## Scaling Plan (After Validation)

**Trigger:** At least 20 L3 pages indexed in GSC and showing impressions.

### Scale Steps

- [ ] Automation running at 3 pages/day → target 300 pages in first 3 months
- [ ] Expand to new categories once existing ones have 10+ pages each
- [ ] Add paginated L2 hub pages once subcategories exceed 20 topics
- [ ] Submit updated sitemap weekly (automated via script or Cloudflare cron)
- [ ] Monitor for duplicate content issues (GSC Coverage → Duplicate without canonical)
- [ ] Add more FAQ items to existing pages if they rank page 2–5 (GSC queries report)

### Quality Maintenance

- [ ] Monthly audit: any pages with 0 impressions after 60 days → review and improve or depublish
- [ ] Track which subcategories drive most traffic → prioritize generating more pages there
- [ ] Check for cannibalisation: two pages ranking for same query → merge or redirect one

### Traffic → Conversion

- [ ] Add soft CTA on L3 topic pages: "Study these flashcards in StudyG — free"
- [ ] Link to StudyG app's relevant deck if one exists for the topic
- [ ] Track click-through rate from directory pages to app (Cloudflare Analytics events)

---

## Phase 6 — SEO Monitoring & Iteration

- [ ] 6.1 Google Search Console: weekly review of Index Coverage + Performance
- [ ] 6.2 Cloudflare Web Analytics: traffic by route, bounce signals
- [ ] 6.3 Set up GSC email alerts for coverage drops
- [ ] 6.4 Core Web Vitals: monthly PageSpeed Insights check on L3 template
- [ ] 6.5 Update generation prompt based on what's ranking (expand winning subcategories)

---

## Phase 7 — Polish & Launch

- [ ] 7.1 Favicon + brand colors applied
- [ ] 7.2 OG images: static branded image per category (dynamic via `satori` optional, Cloudflare-compatible)
- [ ] 7.3 Admin page `/admin` (password-protected):
  - Last 20 generated pages + pass/fail quality gate status
  - Manual trigger for generation
  - GSC index status per page (optional, via GSC API)
- [ ] 7.4 Newsletter CTA on directory root (optional, Resend or ConvertKit)

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | CF Pages + `.env.local` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | CF Pages + `.env.local` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | CF Pages (secret) | Server-side DB writes |
| `SUPABASE_URL` + `SERVICE_ROLE_KEY` | `~/.claude/settings.json` (MCP) | Claude MCP writes to Supabase |

---

## File Structure (target)

```
studyg-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                         # Homepage (marketing, conversion)
│   ├── flashcards/
│   │   ├── page.tsx                     # L0: Directory root (category grid)
│   │   └── [category]/
│   │       ├── page.tsx                 # L1: Category hub
│   │       └── [subcategory]/
│   │           ├── page.tsx             # L2: Subcategory hub (topic list)
│   │           └── [slug]/
│   │               └── page.tsx         # L3: Topic page (SEO target)
│   ├── sitemap.ts                       # Published pages only
│   └── robots.ts
├── src/
│   ├── components/
│   │   ├── FlashcardPreview.tsx         # 5-card crawlable HTML component
│   │   ├── FAQSection.tsx               # FAQ + JSON-LD schema
│   │   ├── Breadcrumb.tsx               # UI + BreadcrumbList JSON-LD
│   │   └── RelatedTopics.tsx            # 3-5 internal links
│   └── lib/
│       ├── supabase.ts                  # Typed queries for all 3 tables
│       └── qualityGate.ts               # Validates pages before publish
├── scripts/
│   ├── generate-pages-prompt.md         # Full prompt for Claude CLI
│   ├── generate-pages.sh                # Timestamp guard + claude -p call
│   ├── generate-pages.log               # Runtime log (git-ignored)
│   └── com.studyg.generate-pages.plist  # LaunchAgent (copy to ~/Library/LaunchAgents/)
├── .env.local
└── roadmap.md
```

---

## Development Order

```
Phase 1 ✅   Phase 2      Phase 3       Phase 4         Phase 5       Phase 6/7
Setup        DB Schema    Directory UI  AI Generation   Automation    SEO + Polish
(CF Pages)   (3 tables)   (4 levels)    (Claude+MCP)    (launchd)     (GSC + CWV)
```

Do not enable automation (Phase 5) before manually verifying Phase 4 output meets the quality gate.
Do not submit the sitemap before at least 15 L3 pages pass the quality gate and are live.
