# StudyG Blog — Development Roadmap

> Automated AI blog for the StudyG flashcard app.
> Posts generated daily via xAI Grok with a self-reflection loop, stored in Supabase, served by Next.js on Cloudflare Pages.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI | xAI Grok API (OpenAI-compatible, `openai` SDK) |
| Automation | Cloudflare Workers Cron Triggers |
| Hosting | Cloudflare Pages (via `@opennextjs/cloudflare` adapter) |
| Analytics | Cloudflare Web Analytics (free, built-in) |
| Images | Static OG images per category (optional satori for dynamic) |

---

## Phase 1 — Project Setup

**Goal:** Working Next.js project connected to Supabase, deployable to Cloudflare Pages.

### Steps

- [x] 1.1 Bootstrap Next.js app (scaffolded manually due to dir name casing)
- [x] 1.2 Push to GitHub (new repo `studyg-blog`)
- [x] 1.3 Create Supabase project at supabase.com
- [x] 1.4 Install Supabase client — `@supabase/supabase-js` installed
- [x] 1.5 Add environment variables to `.env.local` (template created)
- [x] 1.5a Created `src/lib/supabase.ts` (public client + server admin client)
- [ ] 1.6 Install Cloudflare adapter + Wrangler
  ```bash
  npm install -D @opennextjs/cloudflare wrangler
  ```
- [ ] 1.7 Add `wrangler.toml` to project root:
  ```toml
  name = "studyg-blog"
  compatibility_date = "2024-12-18"
  compatibility_flags = ["nodejs_compat"]
  pages_build_output_dir = ".open-next/assets"

  [vars]
  # Public vars here — secrets go in Cloudflare dashboard
  ```
- [ ] 1.8 Add build script to `package.json`:
  ```json
  "build:cf": "opennextjs-cloudflare build"
  ```
- [ ] 1.9 Connect GitHub repo to **Cloudflare Pages** (dash.cloudflare.com → Pages → Create project)
  - Build command: `npm run build:cf`
  - Output dir: `.open-next/assets`
  - Add all env vars in Settings → Environment Variables
- [ ] 1.10 Verify Cloudflare Pages build passes

**Deliverable:** Live `https://studyg-blog.pages.dev` (blank page is fine)

> **Why `@opennextjs/cloudflare`?** Cloudflare has two adapters for Next.js:
> `@cloudflare/next-on-pages` (restrictive, edge-only) and `@opennextjs/cloudflare`
> (broader support, Node.js compat flag). The latter handles dynamic routes,
> API routes, and server components much better.

---

## Phase 2 — Database Schema

**Goal:** Supabase table that stores all blog posts.

### SQL — run in Supabase SQL Editor

```sql
create table posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text not null,          -- markdown
  category    text,                   -- e.g. "Study Tips", "Memory", "Flashcards"
  tags        text[],
  published   boolean default false,
  published_at timestamptz,
  created_at  timestamptz default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Anyone can read published posts
create policy "Public read" on posts
  for select using (published = true);

-- Only service role can insert/update (used by cron job)
```

### Steps

- [x] 2.1 Run SQL above in Supabase
- [x] 2.2 Create a typed Supabase client helper `src/lib/supabase.ts`
- [x] 2.3 Test a manual insert from the Supabase dashboard

**Deliverable:** `posts` table with correct RLS policies

---

## Phase 3 — Blog UI (Frontend)

**Goal:** Users can read posts. Good looking, fast, SEO-ready.

### Pages to build

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — hero + latest posts grid |
| `/blog` | `app/blog/page.tsx` | All posts list (paginated) |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Single post |
| `/blog/category/[cat]` | `app/blog/category/[cat]/page.tsx` | Filter by category |

### Steps

- [x] 3.1 Build `PostCard` component (title, excerpt, date, category badge)
- [x] 3.2 Build homepage — hero + 6 latest posts + CTA banner
- [x] 3.3 Build `/blog` listing page with pagination (9 posts/page)
- [x] 3.4 Build `/blog/[slug]` — markdown via react-markdown + rehype-highlight + remark-gfm
- [x] 3.5 Add `/blog/category/[cat]` filter page
- [x] 3.6 `generateMetadata` on all pages (title, description, OG, Twitter card)
- [x] 3.7 Sitemap at `src/app/sitemap.ts`
- [x] 3.8 Robots.txt at `src/app/robots.ts`
- [x] 3.9 Tailwind typography plugin for article body
- [x] 3.10 Mock data (6 sample posts) — site fully works without Supabase in dev

**Deliverable:** Full blog UI reading from Supabase, SEO metadata, sitemap

---

## Phase 4 — AI Post Generation

**Goal:** API route that generates a high-quality blog post using a self-reflection loop and saves it to Supabase.

### Post generation flow (self-reflection loop)

```
Trigger (cron/manual)
  → pick topic from topic bank
  → Step 1: generate outline (title, H2 sections, key points)
  → Step 2: write full article from outline
  → Step 3: self-evaluate — score SEO, readability, accuracy (returns JSON)
  → if score < 8/10: rewrite weak sections using critique as context
  → repeat evaluation up to 3 rounds
  → insert best version into Supabase (published = true)
```

Each post uses 3–5 API calls. With Grok this costs fractions of a cent.

### Why this is better than a single call

A single prompt asking an LLM to "write a good article" produces average output.
Breaking it into outline → write → critique → rewrite mimics how a human editor
works and measurably improves structure, SEO, and readability without extra infrastructure.

### xAI Grok API setup

Grok's API is OpenAI-compatible — the standard `openai` npm package works by
pointing it at `https://api.x.ai/v1`. No new SDK needed.

```ts
import OpenAI from "openai";
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});
```

### Steps

- [ ] 4.1 Get your xAI API key at console.x.ai → API Keys
  - Save as `XAI_API_KEY`
- [ ] 4.2 Install the openai package (also used in Step 4):
  ```bash
  npm install openai
  ```
- [ ] 4.3 Create topic bank `src/lib/topics.ts`
  - ~50 topics relevant to flashcards, studying, memory, learning science
  - Track used topics in Supabase to avoid repeats (add `used_topics` table or a column)
- [ ] 4.4 Create `src/lib/generatePost.ts` with the self-reflection loop:
  ```ts
  // Pseudocode — implement each step as a separate async function
  async function generatePost(topic: string) {
    const outline  = await generateOutline(topic);       // Step 1
    let article    = await writeArticle(outline);        // Step 2
    let score      = 0;
    let round      = 0;

    while (score < 8 && round < 3) {
      const eval   = await evaluateArticle(article);    // Step 3 — returns { score, critique }
      score        = eval.score;
      if (score < 8) {
        article    = await rewriteArticle(article, eval.critique); // Step 4
      }
      round++;
    }

    return buildPostObject(article); // { title, slug, excerpt, content, category, tags }
  }
  ```
  - Step 3 prompt: "Rate this article's SEO (keyword density, headings), readability (sentence length, flow), and accuracy. Return JSON: `{ score: number, critique: string }`"
  - Step 3 must use structured output or strict JSON mode to parse reliably
- [ ] 4.5 Create API route `src/app/api/generate-post/route.ts` (POST)
  - Verify `CRON_SECRET` header to prevent unauthorized calls
  - Call `generatePost()`, insert result into Supabase
  - Return `{ success: true, slug, rounds: number, finalScore: number }`
- [ ] 4.6 Test manually with `curl` or Postman
  ```bash
  curl -X POST https://studyg-blog.pages.dev/api/generate-post \
    -H "x-cron-secret: YOUR_SECRET"
  ```
- [ ] 4.7 Log `rounds` and `finalScore` to Supabase for monitoring

> **This stays in the same project.** The self-reflection loop is entirely contained
> inside `generatePost.ts`. The API route, cron, and Supabase schema are unchanged.

**Deliverable:** Calling the API route runs the full loop and creates a polished post

---

## Phase 5 — Automation (Daily Cron)

**Goal:** One new post published automatically every day at a fixed time.

### Option A — Cloudflare Workers Cron Trigger (recommended)

A small dedicated Worker that calls the blog's generate-post API route on a schedule.

- [ ] 5.1 Create `workers/daily-post/index.ts`:
  ```ts
  export default {
    async scheduled(_event: ScheduledEvent, env: Env) {
      const res = await fetch(`${env.BLOG_URL}/api/generate-post`, {
        method: "POST",
        headers: { "x-cron-secret": env.CRON_SECRET },
      });
      if (!res.ok) {
        console.error("Post generation failed:", await res.text());
      }
    },
  } satisfies ExportedHandler<Env>;

  interface Env {
    BLOG_URL: string;
    CRON_SECRET: string;
  }
  ```
- [ ] 5.2 Create `workers/daily-post/wrangler.toml`:
  ```toml
  name = "studyg-daily-post"
  main = "index.ts"
  compatibility_date = "2024-12-18"

  [triggers]
  crons = ["0 8 * * *"]   # Every day at 08:00 UTC
  ```
- [ ] 5.3 Add Worker secrets via Wrangler:
  ```bash
  wrangler secret put BLOG_URL --config workers/daily-post/wrangler.toml
  wrangler secret put CRON_SECRET --config workers/daily-post/wrangler.toml
  ```
- [ ] 5.4 Deploy Worker:
  ```bash
  wrangler deploy --config workers/daily-post/wrangler.toml
  ```
- [ ] 5.5 Test by triggering manually from Cloudflare dashboard
  (Workers → daily-post → Triggers → Send test event)

### Option B — GitHub Actions (simpler fallback)

If you prefer not to manage a separate Worker:

- [ ] Create `.github/workflows/daily-post.yml`
  ```yaml
  name: Daily Post
  on:
    schedule:
      - cron: '0 8 * * *'
    workflow_dispatch:
  jobs:
    generate:
      runs-on: ubuntu-latest
      steps:
        - name: Trigger post generation
          run: |
            curl -X POST ${{ secrets.BLOG_URL }}/api/generate-post \
              -H "x-cron-secret: ${{ secrets.CRON_SECRET }}" --fail
  ```

**Deliverable:** Post appears on the blog automatically every day at 08:00 UTC

---

## Phase 6 — SEO & Content Quality

**Goal:** Posts are indexed by Google, bring organic traffic.

### Steps

- [ ] 6.1 Submit sitemap to Google Search Console
- [ ] 6.2 Add structured data (JSON-LD) to post pages
  ```json
  {
    "@type": "BlogPosting",
    "headline": "...",
    "datePublished": "...",
    "author": { "@type": "Organization", "name": "StudyG" }
  }
  ```
- [ ] 6.3 Add Open Graph images
  - Option A: Static branded image per category (recommended for Cloudflare)
  - Option B: Dynamic OG image via `satori` + `@resvg/resvg-js` in an API route
    (`@vercel/og` is Vercel-specific and will NOT work on Cloudflare Pages)
- [ ] 6.4 Improve AI prompt with SEO requirements:
  - First paragraph contains primary keyword
  - Natural keyword density
  - Meta description under 160 chars
- [ ] 6.5 Add internal links: every post links to 2-3 related posts
- [ ] 6.6 Add "Related Posts" section at the bottom of each post

**Deliverable:** Posts have structured data, OG images, and are indexed

---

## Phase 7 — Analytics & Monitoring

**Goal:** Know which posts perform well, catch cron failures.

### Steps

- [ ] 7.1 Enable **Cloudflare Web Analytics** (zero config, free, privacy-first)
  - dash.cloudflare.com → Pages → your project → Web Analytics
  - Add the one-line script snippet to `app/layout.tsx`
  - No cookies, no GDPR banner needed
- [ ] 7.2 Add Google Analytics 4 (optional, more detailed event tracking)
- [ ] 7.3 Cron failure alert: Worker logs are visible in Cloudflare dashboard
  - dash.cloudflare.com → Workers → daily-post → Logs
  - Set up email alerts under Notifications if a Worker errors
- [ ] 7.4 Add a simple admin page `/admin` (password protected) to:
  - See last 10 generated posts
  - Manually trigger generation
  - See failed attempts

**Deliverable:** Traffic visible in Cloudflare Web Analytics, cron failures send alerts

---

## Phase 8 — Polish & Launch

**Goal:** Blog is production-ready and promoted.

### Steps

- [ ] 8.1 Custom domain (e.g. `blog.studyg.app`)
  - Cloudflare Pages → Custom Domains → add domain
  - Since your domain is already on Cloudflare DNS, this is a one-click setup
- [ ] 8.2 Favicon and brand colors applied
- [ ] 8.3 Add newsletter signup (Resend or ConvertKit) — optional
- [ ] 8.4 Link blog from main StudyG app
- [ ] 8.5 Write first 5 posts manually (seed content before automation kicks in)
- [ ] 8.6 Submit to Google Search Console + Bing Webmaster Tools
- [ ] 8.7 Share first posts on social media / communities

---

## Post Topic Bank (starter list)

Group posts into categories for better SEO structure:

| Category | Example Topics |
|---|---|
| **Study Tips** | Pomodoro technique, study environment, study schedule, procrastination |
| **Memory Science** | Spaced repetition explained, active recall vs passive reading, forgetting curve |
| **Flashcards** | How to write good flashcards, Anki vs StudyG, best subjects for flashcards |
| **Productivity** | Time blocking, goal setting for students, focus apps |
| **Learning Languages** | Vocabulary with flashcards, immersion tips, best way to learn grammar |
| **Exams** | Last-minute studying, exam anxiety, how to review mistakes |

---

## Environment Variables Checklist

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | CF Pages + `.env.local` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | CF Pages + `.env.local` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | CF Pages (secret) | Server-side DB writes |
| `XAI_API_KEY` | CF Pages (secret) | Grok API key for post generation |
| `CRON_SECRET` | CF Pages + Worker secrets | Protect cron endpoint |
| `BLOG_URL` | Worker secrets | Full URL called by cron Worker |

---

## Recommended Development Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8
Setup      DB        UI        AI          Cron       SEO       Analytics  Launch
(CF Pages)          (done)  (Grok loop)  (CF Cron)
```

Do **not** skip Phase 3 before Phase 4 — you need the UI to verify that generated
posts actually look correct before automating.

---

## File Structure (target)

```
studyg-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Homepage
│   ├── blog/
│   │   ├── page.tsx                # All posts
│   │   ├── [slug]/
│   │   │   └── page.tsx            # Single post
│   │   └── category/
│   │       └── [cat]/page.tsx
│   ├── api/
│   │   ├── generate-post/
│   │   │   └── route.ts            # AI generation endpoint
│   │   └── og/
│   │       └── route.tsx           # Dynamic OG image
│   └── sitemap.ts
├── src/
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── PostBody.tsx
│   │   └── RelatedPosts.tsx
│   └── lib/
│       ├── supabase.ts
│       ├── generatePost.ts
│       └── topics.ts
├── workers/
│   └── daily-post/
│       ├── index.ts            # Cron Worker
│       └── wrangler.toml       # Worker config
├── .env.local
└── roadmap.md
```
