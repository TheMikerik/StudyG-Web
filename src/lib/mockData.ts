import { Post } from "@/types/post";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "how-spaced-repetition-rewires-your-brain",
    title: "How Spaced Repetition Rewires Your Brain for Better Memory",
    excerpt:
      "Discover the neuroscience behind spaced repetition and why reviewing at the right intervals makes information stick for good.",
    content: `## What Is Spaced Repetition?

Spaced repetition is a learning technique where you review material at carefully timed intervals. Instead of cramming everything the night before an exam, you spread your reviews out — and the science behind it is fascinating.

The core idea is simple: review something just before you're about to forget it. Each successful recall strengthens the neural pathway and resets the forgetting curve, making the memory more durable over time.

## The Forgetting Curve

In 1885, German psychologist Hermann Ebbinghaus conducted landmark experiments on memory. He discovered that we forget roughly **50% of new information within an hour**, and up to 90% within a week if we don't review it.

But here's the key insight: every time you successfully recall something, that forgetting curve becomes less steep. The memory becomes more resistant to decay. After three or four well-timed reviews, the information can stay with you for years.

## How the Algorithm Works

Modern spaced repetition systems (SRS) like the one inside StudyG track your performance on every flashcard. After each review, you rate how well you remembered it:

- **Easy** — card is scheduled far in the future
- **Medium** — card returns in a few days
- **Hard** — card returns tomorrow

The algorithm continuously adjusts each card's schedule based on your history. Cards you struggle with appear more frequently. Cards you know well get pushed out — freeing your study time for what actually needs work.

## Why It Beats Traditional Studying

Most students re-read notes and highlight textbooks. These feel productive but are largely **passive learning** — your brain isn't being challenged to retrieve information. Spaced repetition forces active recall with every review, which is proven to produce far stronger memory traces.

Studies comparing spaced repetition to massed practice (cramming) consistently show retention rates 2–3× higher at the same total study time.

## Getting Started with StudyG

StudyG's built-in spaced repetition engine handles all the scheduling automatically. You create the flashcards; the app decides when you see them next. Even 10 minutes of daily review sessions adds up to powerful long-term retention.

The best time to start using spaced repetition was a year ago. The second best time is today.`,
    category: "Memory Science",
    tags: ["spaced repetition", "memory", "neuroscience", "learning"],
    published: true,
    published_at: "2025-01-20T08:00:00Z",
    created_at: "2025-01-20T08:00:00Z",
  },
  {
    id: "2",
    slug: "ultimate-guide-to-writing-effective-flashcards",
    title: "The Ultimate Guide to Writing Flashcards That Actually Stick",
    excerpt:
      "Most flashcards are written wrong. Learn the exact principles that make the difference between cards that teach and cards that confuse.",
    content: `## Why Most Flashcards Fail

If you've ever made a deck of flashcards and found yourself unable to remember anything after a week, the problem usually isn't the format — it's the content. Writing bad flashcards is easy. Writing good ones takes deliberate thought.

The good news: a handful of principles covers 90% of what makes a flashcard effective.

## Principle 1: One Fact Per Card

The most common mistake is cramming multiple ideas onto a single card. When you can't recall the answer, you have no idea *which* part of it you forgot. And when you do recall it, you might only remember half.

**Bad:** What are the four functions of the hippocampus?
**Good:** What memory type does the hippocampus primarily process?

Break complex topics into atomic units. If a card has three bullets, make it three cards.

## Principle 2: Test Production, Not Recognition

Avoid true/false and multiple-choice formats. Your brain learns what it practises. If you practice recognising the right answer from a list, you'll recognise it — but you won't be able to produce it on an exam or in real life.

Use open-ended prompts that force you to generate the answer from scratch.

## Principle 3: Use Cloze Deletions for Complex Topics

A cloze deletion is a fill-in-the-blank card: "The ______ curve describes the decline of memory over time." (Answer: forgetting)

Cloze cards are powerful for:
- Vocabulary in context
- Formulas and sequences
- Definitions with meaningful keywords

## Principle 4: Add Context

Isolated facts are hard to remember. Connect new information to something you already know.

**Worse:** Capital of Kazakhstan: Astana
**Better:** Kazakhstan moved its capital from Almaty to Astana in 1997 — Astana means "capital city" in Kazakh.

## Principle 5: Keep Cards Honest

If a card is too easy, it's wasting your time. If it's too hard (because it's ambiguous or underspecified), it breeds frustration. Review your deck regularly and delete or rewrite cards that consistently trip you up for the wrong reasons.

## Using StudyG to Build Better Decks

StudyG lets you build cards with rich text, images, and cloze formats — and its AI assistant can help you rewrite badly structured cards. The spaced repetition engine then handles the scheduling, so your well-written cards reach maximum efficiency.`,
    category: "Flashcards",
    tags: ["flashcards", "active recall", "studying", "memory"],
    published: true,
    published_at: "2025-01-18T08:00:00Z",
    created_at: "2025-01-18T08:00:00Z",
  },
  {
    id: "3",
    slug: "pomodoro-technique-for-students",
    title: "5 Pomodoro Technique Hacks for Maximum Study Efficiency",
    excerpt:
      "The classic 25-minute timer is just the start. These five adjustments will help you get dramatically more done in every study session.",
    content: `## The Pomodoro Basics

If you haven't heard of the Pomodoro Technique: you work for 25 minutes with complete focus, then take a 5-minute break. After four rounds, take a longer 15–30 minute break. That's it.

Created by Francesco Cirillo in the late 1980s (named after his tomato-shaped kitchen timer), it's one of the most widely used productivity methods in the world. But most people use it wrong — or use only half of it.

## Hack 1: Match Interval Length to Task Type

The standard 25/5 split works great for reading and note-taking. But for deep problem-solving (math, coding, essay writing), consider **50/10** intervals. Deep work needs longer warm-up times — interrupting it every 25 minutes actually hurts flow.

For tasks requiring high energy or that you find unpleasant, try **15/5** — shorter bursts lower the activation energy to start.

## Hack 2: Plan Before You Start the Timer

The Pomodoro's biggest productivity trap: starting the timer and then deciding what to do. Before your first tomato, spend 5 minutes writing down exactly what you'll accomplish in each session. "Study chemistry" is useless. "Complete practice problems 3.4–3.12 from chapter 5" is a target.

## Hack 3: Use Breaks Actively

Most people check social media on breaks. This is a mistake — social media activates the same dopamine systems as the work you just stopped, making it harder to restart focus.

Better break activities: walk around the room, stretch, get water, stare out a window, or do light breathing exercises. Give your prefrontal cortex genuine downtime.

## Hack 4: Track Your Interruptions

Every time you're interrupted (or interrupt yourself), mark it down. At the end of the day, count the marks. Most people are shocked. This data helps you identify your biggest focus killers — maybe it's your phone, maybe it's a particular chat app, maybe it's hunger.

## Hack 5: End Each Pomodoro with a Review

Spend the last two minutes of every interval writing one sentence: *What did I just learn?* This forces active recall, which strengthens memory, and it creates a written log of your session.

Over time, these end-of-session notes become a personal knowledge base more valuable than any highlight you ever made in a textbook.

## StudyG + Pomodoro

Use Pomodoro intervals for StudyG review sessions — set a timer, work through your flashcard queue without distractions, then break. Twenty-five minutes of focused spaced repetition daily outperforms two hours of scattered re-reading every week.`,
    category: "Study Tips",
    tags: ["pomodoro", "productivity", "focus", "time management"],
    published: true,
    published_at: "2025-01-15T08:00:00Z",
    created_at: "2025-01-15T08:00:00Z",
  },
  {
    id: "4",
    slug: "active-recall-vs-passive-reading",
    title: "Why Active Recall Beats Re-Reading Every Single Time",
    excerpt:
      "Re-reading feels productive but research consistently shows it's one of the least effective study strategies. Here's what to do instead.",
    content: `## The Illusion of Knowing

Re-reading is the most popular study strategy among students. It's also, according to decades of cognitive science research, one of the least effective.

The reason is a phenomenon called the **fluency illusion**: the more familiar text looks, the more confident you feel — even if you haven't actually encoded the information deeply. Highlighting makes this worse. You're telling your brain "this is important" but doing nothing to help it store or retrieve the information later.

## What Active Recall Actually Means

Active recall means retrieving information from memory without looking at the source material. Examples:

- Closing your notes and writing everything you remember about a topic
- Answering questions before re-reading the chapter
- Using flashcards to test yourself
- Explaining a concept out loud to an imaginary student (the Feynman technique)

The key word is *retrieval*. Your brain gets stronger at remembering things it has practised remembering — not things it has passively seen.

## The Testing Effect

The superiority of retrieval practice over re-reading is so well-documented that researchers call it the **testing effect** (or retrieval practice effect). In a landmark 2008 study, Roediger and Karpicke showed that students who studied by testing themselves remembered **50% more** after one week compared to students who re-read the material the same number of times.

The mechanism: every act of retrieval slightly changes the memory trace in your brain, making it easier to access next time. The struggle to retrieve — even a failed attempt — primes the brain for better encoding in the next study session.

## Practical Active Recall Strategies

**1. The blank page method** — After reading a section, flip to a blank page and write everything you can recall. Then check.

**2. Question-based notes** — Instead of writing summaries, write questions on the left margin and answers on the right. Cover the right side during review.

**3. Flashcards** — The classic active recall tool. Works for facts, concepts, vocabulary, formulas, and more.

**4. Practice tests** — Whenever available, do practice exams under realistic conditions before reviewing the material.

## Getting Started Today

The simplest shift you can make right now: after any reading or lecture, spend 5 minutes trying to recall the key points on a blank page — before looking at your notes. That one habit will transform your retention more than any highlighting ever could.

StudyG turns every flashcard review into an active recall exercise, with spaced repetition ensuring you test yourself at the optimal moment for long-term retention.`,
    category: "Memory Science",
    tags: ["active recall", "memory", "testing effect", "studying"],
    published: true,
    published_at: "2025-01-12T08:00:00Z",
    created_at: "2025-01-12T08:00:00Z",
  },
  {
    id: "5",
    slug: "learn-any-language-with-flashcards",
    title: "How to Learn Any Language Faster Using Flashcards",
    excerpt:
      "Vocabulary is the bottleneck in language learning. A structured flashcard system lets you acquire thousands of words in months, not years.",
    content: `## Vocabulary Is the Bottleneck

Grammar gets all the attention in language classes. Vocabulary does all the actual work.

Research by Paul Nation shows that you need to know approximately **8,000 word families** to comfortably read authentic texts in a foreign language. The top 2,000 most frequent words cover about 90% of everyday speech. That's the target.

Good news: 2,000 words is entirely achievable with a systematic flashcard approach. At 20 new words per day — a comfortable pace — you can reach 2,000 in 100 days.

## Why Flashcards Work So Well for Vocabulary

Vocabulary acquisition is an ideal use case for spaced repetition because:

- Each word is a discrete, reviewable unit
- Frequency data tells you which words to prioritise
- You can add context (example sentences, images) to each card
- The forgetting curve is well-studied for vocabulary specifically

## Building an Effective Language Deck

**Step 1: Start with frequency lists.** Don't study random words from a dictionary. Download a frequency list for your target language (widely available for free online) and work down from the most common.

**Step 2: Use sentence cards, not word cards.** Instead of just writing "abandonar — to abandon," add an example sentence: "Él tuvo que abandonar su ciudad natal." Context makes words dramatically easier to remember and teaches grammar simultaneously.

**Step 3: Add audio.** Pronunciation is part of the word. If your flashcard app supports audio (StudyG does), add a native speaker recording to every card.

**Step 4: One card per meaning.** If a word has multiple meanings, make a separate card for each. Don't try to learn five definitions at once.

## Common Mistakes to Avoid

- **Studying too many new words at once** — cap new cards at 20–30 per day
- **Skipping reviews** — consistency beats intensity; 15 minutes daily beats 3 hours on weekends
- **Ignoring pronunciation** — you'll build bad habits that are hard to undo
- **Translating into your native language only** — once you're intermediate, try target-language definitions

## Combining Flashcards with Immersion

Flashcards build your vocabulary inventory. Immersion (reading, watching, listening in the target language) teaches you to access that inventory fluently. The two approaches compound each other: immersion exposes you to words in context, making your flashcard reviews easier; reviews make immersion comprehensible.

StudyG's language decks are built with frequency-ordered vocabulary, native audio, and example sentences — so you can start acquiring the highest-value words from day one.`,
    category: "Learning Languages",
    tags: ["language learning", "vocabulary", "flashcards", "immersion"],
    published: true,
    published_at: "2025-01-10T08:00:00Z",
    created_at: "2025-01-10T08:00:00Z",
  },
  {
    id: "6",
    slug: "exam-preparation-strategy-top-students",
    title: "The Complete Exam Preparation Strategy That Top Students Use",
    excerpt:
      "High-scoring students don't just study more — they study differently. This evidence-based exam strategy works for any subject.",
    content: `## Start Earlier Than You Think

The most important exam preparation decision happens weeks before the exam. Starting too late forces you into cramming — which produces short-term memory that decays within days. The goal is *durable learning*, which requires time.

A general rule: for a major exam, start serious preparation **3–4 weeks out**. For smaller tests, **1–2 weeks**. This gives enough time for spaced repetition to work properly.

## Phase 1: Build Your Overview (Week 3–4 Out)

Before you can memorise details, you need a framework. Spend the first phase understanding the big picture:

- Read chapter summaries and learning objectives
- Create a concept map linking the major topics
- Identify which topics carry the most exam weight (ask your professor, check past papers)

Don't worry about memorising yet. You're building the scaffolding that new information will hang on.

## Phase 2: Active Learning (Week 2–3 Out)

Now engage deeply with the material using active techniques:

- **Flashcard creation** — as you read each section, turn key facts and concepts into flashcards immediately
- **Practice problems** — for quantitative subjects, solve problems without looking at examples
- **Teach-back sessions** — explain each topic out loud as if teaching it to someone else; gaps in your explanation = gaps in your knowledge

Avoid: highlighting, re-reading, summarising without testing yourself.

## Phase 3: Retrieval Practice (Week 1–2 Out)

Your flashcard deck is built. Now review it daily. At this stage:

- Do past exam papers under timed, exam-like conditions
- Identify weak areas from your practice tests and focus extra time there
- Review your StudyG deck twice daily — morning and evening

The evening review before sleep is particularly powerful: memory consolidation happens during sleep, so material reviewed before bed benefits from overnight processing.

## Phase 4: The Day Before

Do a light review of your strongest areas only — this is about confidence, not learning. Do not try to learn new material.

Sleep 8 hours. Seriously. Sleep deprivation impairs retrieval even when the memory is there. One study showed that missing a night of sleep reduces exam performance by roughly one full letter grade.

## The Morning of the Exam

- Light review of key flashcards (20–30 minutes maximum)
- Eat a real meal
- Arrive early to avoid stress cortisol spiking your anxiety before you start

## One Habit That Changes Everything

Students who consistently perform well share one trait: they *test themselves constantly*, rather than reviewing passively. Start treating every study session as a practice exam, and your actual exam will feel familiar — not threatening.

StudyG is built around this principle. Every review session is a retrieval practice session, automatically scheduled at the optimal time to maximise what you retain when it matters most.`,
    category: "Exams",
    tags: ["exams", "test prep", "studying", "spaced repetition"],
    published: true,
    published_at: "2025-01-08T08:00:00Z",
    created_at: "2025-01-08T08:00:00Z",
  },
];
