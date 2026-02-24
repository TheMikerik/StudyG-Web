# StudyG Blog — Development Roadmap

> Automated AI blog for the StudyG flashcard app.
> Posts generated daily via OpenAI / Gemini, stored in Supabase, served by Next.js.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI | Vercel AI SDK + OpenAI GPT-4o (or Google Gemini) |
| Automation | GitHub Actions (daily cron) |
| Hosting | Vercel |
| Images | Unsplash API or AI-generated (optional) |

---

## Phase 1 — Project Setup

**Goal:** Working Next.js project connected to Supabase, deployable to Vercel.

### Steps

- [x] 1.1 Bootstrap Next.js app (scaffolded manually due to dir name casing)
- [x] 1.2 Push to GitHub (new repo `studyg-blog`)
- [x] 1.3 Create Supabase project at supabase.com
- [x] 1.4 Install Supabase client — `@supabase/supabase-js` installed
- [x] 1.5 Add environment variables to `.env.local` (template created)
- [x] 1.5a Created `src/lib/supabase.ts` (public client + server admin client)
- [ ] 1.6 Deploy to Vercel (connect GitHub repo), set env vars in Vercel dashboard
- [ ] 1.7 Verify Vercel build passes

**Deliverable:** Live `https://studyg-blog.vercel.app` (blank page is fine)

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

- [ ] 2.1 Run SQL above in Supabase
- [ ] 2.2 Create a typed Supabase client helper `src/lib/supabase.ts`
- [ ] 2.3 Test a manual insert from the Supabase dashboard

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

**Goal:** API route that generates a full blog post and saves it to Supabase.

### Post generation flow

```
Trigger (cron/manual)
  → choose topic from topic bank
  → call OpenAI to generate title + content (markdown)
  → generate slug from title
  → insert into Supabase posts table (published = true)
```

### Steps

- [ ] 4.1 Install Vercel AI SDK + OpenAI
  ```bash
  npm install ai openai
  ```
- [ ] 4.2 Create topic bank `src/lib/topics.ts`
  - ~50 topics relevant to flashcards, studying, memory, learning science
  - Topics should be shuffled/rotated to avoid repeats
- [ ] 4.3 Create AI generation function `src/lib/generatePost.ts`
  - Prompt must specify: word count (800–1200), markdown format, H2 headings, practical tips, CTA mentioning StudyG
  - Return structured object: `{ title, slug, excerpt, content, category, tags }`
- [ ] 4.4 Create API route `app/api/generate-post/route.ts` (POST)
  - Verify `CRON_SECRET` header to prevent unauthorized calls
  - Call `generatePost()`, insert result into Supabase
  - Return `{ success: true, slug }`
- [ ] 4.5 Test manually with `curl` or Postman
  ```bash
  curl -X POST https://studyg-blog.vercel.app/api/generate-post \
    -H "x-cron-secret: YOUR_SECRET"
  ```
- [ ] 4.6 Add error handling + logging (console.error is fine for now)

**Deliverable:** Calling the API route creates a real post visible on the blog

---

## Phase 5 — Automation (Daily Cron)

**Goal:** One new post published automatically every day at a fixed time.

### Option A — GitHub Actions (recommended, free)

- [ ] 5.1 Create `.github/workflows/daily-post.yml`
  ```yaml
  name: Daily Post

  on:
    schedule:
      - cron: '0 8 * * *'   # Every day at 08:00 UTC
    workflow_dispatch:       # Manual trigger from GitHub UI

  jobs:
    generate:
      runs-on: ubuntu-latest
      steps:
        - name: Trigger post generation
          run: |
            curl -X POST ${{ secrets.BLOG_URL }}/api/generate-post \
              -H "x-cron-secret: ${{ secrets.CRON_SECRET }}" \
              --fail
  ```
- [ ] 5.2 Add GitHub repo secrets: `BLOG_URL`, `CRON_SECRET`
- [ ] 5.3 Test with `workflow_dispatch` (manual trigger)

### Option B — Vercel Cron Jobs (alternative)

- [ ] Add to `vercel.json`:
  ```json
  {
    "crons": [
      {
        "path": "/api/generate-post",
        "schedule": "0 8 * * *"
      }
    ]
  }
  ```
  Note: Vercel Cron requires Pro plan for custom schedules.

**Deliverable:** GitHub Actions workflow runs daily, post appears on blog

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
  - Option A: Static branded image per category
  - Option B: Dynamic OG image via `app/api/og/route.tsx` (Vercel `@vercel/og`)
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

- [ ] 7.1 Add Vercel Analytics (zero config)
  ```bash
  npm install @vercel/analytics
  ```
  Add `<Analytics />` to `app/layout.tsx`
- [ ] 7.2 Add Google Analytics 4 (optional, more detailed)
- [ ] 7.3 GitHub Actions failure alert: add email notification on workflow failure
  ```yaml
  - name: Notify on failure
    if: failure()
    run: echo "::error::Post generation failed!"
  ```
- [ ] 7.4 Add a simple admin page `/admin` (password protected) to:
  - See last 10 generated posts
  - Manually trigger generation
  - See failed attempts

**Deliverable:** Traffic visible in Vercel Analytics, cron failures send alerts

---

## Phase 8 — Polish & Launch

**Goal:** Blog is production-ready and promoted.

### Steps

- [ ] 8.1 Custom domain (e.g. `blog.studyg.app`)
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
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + `.env.local` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + `.env.local` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel only (secret) | Server-side DB writes |
| `OPENAI_API_KEY` | Vercel only (secret) | AI generation |
| `CRON_SECRET` | Vercel + GitHub Secrets | Protect cron endpoint |
| `BLOG_URL` | GitHub Secrets | Full URL for curl in GH Actions |

---

## Recommended Development Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8
Setup      DB        UI        AI          Cron       SEO       Analytics  Launch
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
├── .github/
│   └── workflows/
│       └── daily-post.yml
├── .env.local
└── roadmap.md
```
