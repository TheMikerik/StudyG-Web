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
| AI | Claude Pro (Claude Code CLI, no API cost) |
| Automation | macOS LaunchAgent (launchd, runs locally) |
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
- [x] 1.6 Install Cloudflare adapter + Wrangler (`@opennextjs/cloudflare` v1.17.1, `wrangler` v4.69.0)
- [x] 1.7 Created `wrangler.toml` (nodejs_compat flag, pages_build_output_dir)
- [x] 1.8 Added `build:cf` and `preview` scripts to `package.json`; created `open-next.config.ts`
- [x] 1.8a Verified Cloudflare build passes locally (`npm run build:cf` → "OpenNext build complete")
- [ ] 1.9 Connect GitHub repo to **Cloudflare Pages** (dash.cloudflare.com → Pages → Create project)
  - Build command: `npm run build:cf`
  - Output dir: `.open-next/assets`
  - Add all env vars in Settings → Environment Variables
- [ ] 1.10 Verify Cloudflare Pages build passes (automatic after 1.9)

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

## Phase 4 — AI Post Generation (Local, Claude Pro + MCP)

**Goal:** Claude Code CLI generates a high-quality post via self-reflection loop and inserts it directly into Supabase using the MCP server. No external API costs.

### How it works

```
launchd (every 3 days)
  → runs scripts/generate-post.sh
  → script calls: claude -p "$(cat scripts/generate-post-prompt.md)"
  → Claude (Pro) executes the reflection loop internally:
      Step 1: pick unused topic from topics list
      Step 2: generate article outline
      Step 3: write full article from outline
      Step 4: self-evaluate (SEO score, readability, accuracy)
      Step 5: if score < 8, rewrite weak sections and re-evaluate
      Step 6: repeat up to 3 rounds
  → Claude uses Supabase MCP to INSERT final post directly into posts table
  → script stamps last-run timestamp to prevent duplicate runs
```

No API keys in the Next.js app. No API route needed for generation.
Claude Pro subscription covers all generation costs.

### Steps

- [x] 4.0 Created `scripts/generate-post-prompt.md` — the full prompt Claude receives
- [x] 4.0a Created `scripts/generate-post.sh` — wrapper script (timestamp guard + CLI call)
- [x] 4.1 Configure Supabase MCP server in Claude settings:
  ```bash
  # Add to ~/.claude/settings.json under "mcpServers":
  {
    "mcpServers": {
      "supabase": {
        "command": "npx",
        "args": ["-y", "@supabase/mcp-server-supabase@latest",
                 "--supabase-url", "YOUR_SUPABASE_URL",
                 "--supabase-key", "YOUR_SERVICE_ROLE_KEY"]
      }
    }
  }
  ```
  Verify with: `claude mcp list`
- [x] 4.2 Test generation manually:
  ```bash
  bash scripts/generate-post.sh --force
  ```
  Check Supabase dashboard — new row should appear in `posts` table.
- [ ] 4.3 Create the `used_topics` column in Supabase to avoid repeats:
  ```sql
  alter table posts add column if not exists topic text;
  ```
  The prompt queries existing topics to skip already-covered ones.

**Deliverable:** Running the script manually produces a published post in the DB

---

## Phase 5 — Automation (macOS LaunchAgent)

**Goal:** MacBook runs the generation script every 3 days automatically, including after waking from sleep.

### Why launchd over cron

- launchd runs `StartCalendarInterval` jobs that were missed while the Mac slept
- More reliable than `cron` which silently skips missed runs
- Native macOS — no extra tools

### Steps

- [x] 5.0 Created `scripts/com.studyg.generate-post.plist` — the LaunchAgent definition
- [x] 5.1 Install the LaunchAgent:
  ```bash
  cp scripts/com.studyg.generate-post.plist ~/Library/LaunchAgents/
  launchctl load ~/Library/LaunchAgents/com.studyg.generate-post.plist
  ```
- [x] 5.2 Verify it loaded:
  ```bash
  launchctl list | grep studyg
  ```
- [x] 5.3 Test a manual trigger:
  ```bash
  launchctl start com.studyg.generate-post
  ```
  Check `scripts/generate-post.log` for output.
- [x] 5.4 To update the schedule or prompt — unload, edit, reload:
  ```bash
  launchctl unload ~/Library/LaunchAgents/com.studyg.generate-post.plist
  # edit plist or prompt
  launchctl load ~/Library/LaunchAgents/com.studyg.generate-post.plist
  ```

> **Missed runs:** The plist uses `StartCalendarInterval` (not `StartInterval`).
> launchd will run the job on next wake if the scheduled time was missed during sleep.
> The shell script adds a 3-day timestamp guard so it never generates twice in one window.

**Deliverable:** MacBook auto-generates a post every 3 days with no manual action

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
| `SUPABASE_URL` + `SERVICE_ROLE_KEY` | `~/.claude/settings.json` (MCP config) | Claude MCP connects to Supabase |

---

## Recommended Development Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8
Setup      DB        UI        AI          Cron       SEO       Analytics  Launch
(CF Pages)          (done)  (Claude+MCP) (launchd)
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
├── scripts/
│   ├── generate-post-prompt.md     # Full prompt sent to Claude CLI
│   ├── generate-post.sh            # Wrapper: timestamp guard + claude -p call
│   ├── generate-post.log           # Runtime log (git-ignored)
│   └── com.studyg.generate-post.plist  # LaunchAgent (copy to ~/Library/LaunchAgents/)
├── .env.local
└── roadmap.md
```
