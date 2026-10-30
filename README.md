# 850 Basic English

A mobile-first, dependency-free web game that teaches the **850 words of Ogden's Basic
English** to **Hindi-speaking learners**. Styled with the **Saffron English** design
system (warm saffron/amber + emerald + indigo, tactile "3D-lip" controls). Vanilla
HTML/CSS/JavaScript only — no frameworks, no build step, no app-initiated external
requests, and no external assets. Optional browser speech recognition is browser-managed
and may use its own service. All UI chrome is in **English**; the word content (Hindi
glosses, Devanagari pronunciations, example sentences) is kept verbatim from the dataset.

![status](https://img.shields.io/badge/dependencies-none-brightgreen) ![license](https://img.shields.io/badge/license-your%20data-blue)

## How to run

**Option A — just open it (no server needed).**
Double-click `index.html` (or drag it into a browser tab). Everything, including the word
dataset, loads from local files over `file://`. The service worker is skipped automatically
in that mode (browsers don't allow it on `file://`), which is fine — the app's lessons and
data need no network. Browser speech recognition may use a browser-provided service if you
choose to use it.

**Option B — serve it (recommended for testing / PWA install).**

```bash
cd 850
python -m http.server 8000
```

Then open <http://localhost:8000>. Served this way the service worker registers and the app
works offline after the first load for bundled lessons and previously saved articles
(e.g. in airplane mode or as an installed PWA). New Wikipedia articles need a connection
the first time they are opened.

> Any static file server works (`npx serve`, XAMPP, …). `python -m http.server` is the
> one with zero dependencies.

### Testing checklist used for this release

- Playable from `file://` at a 360×640 phone viewport, no server.
- All modes: flashcards (Learn), the 4 quiz variants, Listening, Typing, Spelling, Review, Grammar, English Reading, Words + Grammar AI practice, Stats, Settings.
- Words + Grammar lets learners choose one vocabulary category and grammar chapter for a copy-ready AI tutor prompt. The tutor selects words from that category and adapts practice as the learner responds; the AI runs separately after the prompt is pasted.
- Progress / streak / SRS survive reload, tab backgrounding and browser restart (localStorage).
- All 850 words reachable; category counts reconcile to 850 (100 + 400 + 200 + 100 + 50).
- Wikipedia article requests occur only when an article is opened; copied/saved text includes source and license attribution. No AI API is called.
- English Reading includes a topic-filtered Wikipedia library (Networking, Operating Systems, DevOps, History and Learning), locally saved article text, and copy-ready prompts for article summary, sentence structure, grammar and vocabulary study.
- Original Beginner / Intermediate / Advanced passages, Hindi help, comprehension activities, saved vocabulary, and optional speech playback/recognition remain available.
- Keyboard only: `1–4` pick options, `Enter`/`Space` flip/advance, `Esc` back.
- Verified at 360×640, 390×844, 768 and 1440 px widths.

## Project tree

```
850/
├── index.html                 # shell: topbar, tab bar, inline <style>, script order
├── manifest.webmanifest       # PWA manifest (SVG icon, portrait)
├── sw.js                      # service worker: precache shell + dataset
├── css/
│   └── styles.css             # styles source of truth: light/dark, reduced-motion, 360-first
├── data/
│   ├── words.js               # THE dataset (classic script, `const vocabulary`)
│   └── reading.js             # article catalogue, original passages, glosses and exercises
└── js/
    ├── store.js               # normalisation, versioned localStorage, day/streak/XP
    ├── srs.js                 # SM-2-lite / 6-box Leitner scheduler
    ├── speech.js              # en-US SpeechSynthesis with graceful fallback
    ├── app.js                 # bootstrap + routing + SW registration
    └── modes/
        ├── common.js          # shared UI: options, feedback, sheets, fx, keys
        ├── home.js            # Home (streak, goal ring, categories, Continue)
        ├── flashcards.js      # Learn: flip cards, swipe, mode picker
        ├── quiz.js            # Quiz (4 variants) + Listening mode
        ├── typing.js          # Typing drill with diff correction
        ├── spelling.js        # Spelling Puzzle: build the word from letter tiles
        ├── review.js          # Spaced-repetition session
        ├── ai-practice.js     # Combined vocabulary + grammar tutor prompt builder
        ├── reading.js         # English Reading: passages, help, speech, exercises
        ├── stats.js           # mastery, accuracy sparkline, reset
        └── settings.js        # language, voice, rate, sound, goal, reset
```

**Script loading order matters.** `data/words.js` is a classic (non-module) script that
declares `const vocabulary = […]`. It is loaded *before* the app scripts, which read that
global by name. App code contains no `import`/`export` — that is deliberate so `file://`
works (the browser blocks ES-module fetches on `file://`).

## Architecture

- **One global namespace.** `window.B850` is the only global. Each file is a strict-mode
  IIFE that hangs one key off it: `B850.store`, `B850.data`, `B850.state`, `B850.ui`,
  `B850.screens.*`. No other globals are created.
- **Data is normalised, never edited.** On boot, `store.normalise()` maps the raw rows to
  internal word objects (splitting `plough/plow` into variants, trimming strings, guarding
  against missing fields or duplicate ids). The dataset file is read-only.
- **State** lives in one versioned localStorage key `b850:v1` with a safe reader that
  tolerates corrupt or older JSON (bad shapes are replaced with defaults; the app never
  crashes on a broken save). Saved on every answer, flip and settings change — so state
  survives reload, `pagehide`/tab backgrounding and browser restart.
- **Screens** are plain functions that build a DOM node and hand it to `B850.ui.render`.
  `app.js` keeps the current screen name in `B850.ui` and swaps it; no router library.
- **Modes** register as `B850.screens.<name>.render`. The bottom **5-tab bar**
  (Home · Learn · Spelling · Quiz · Review, with a due-count badge on Review) plus the
  header brand and the ⚙ profile button are the navigation surfaces; Stats, Listening,
  Typing and Settings are reachable from the Home mode grid / header.

### How to swap or add word data

1. Keep the same file at `data/words.js` and the same classic-script shape
   (`const vocabulary = [ … ];` with the `module.exports` guard is optional but harmless).
2. Each row needs: `id` (unique number), `word`, and the display fields
   (`pronunciation`, `meaningEnglish`, `meaningHindi`, `exampleSentence`, `exampleHindi`,
   `category`, `categoryLabel`, `difficulty`). Missing/odd values are skipped or
   normalised defensively — one bad row never takes the app down.
3. Variants like `"plough/plow"` or `"grey/gray"` are handled automatically: the first
   variant is the head word; both are accepted as correct answers in the typing drill and
   in fill-the-blank.
4. Category ids (`operations`, `things_general`, `things_picturable`,
   `qualities_general`, `qualities_opposites`) are used for grouping, distractor pools and
   per-category mastery. Unknown categories fall back to a generic bucket.

### Data attribution

The 850-word list is **Ogden's Basic English**, the controlled English word list from
S. I. Ogden & I. A. R. Richards, *Basic English: A General Introduction with Exercises and
Word List* (1930, Routledge) — public-domain vocabulary. The Hindi glosses, Devanagari
pronunciations, IPA, example sentences and translations were supplied by the user from
their Basic English PDF and are preserved verbatim in `data/words.js` (each row's
`source` field records this). Nothing in the dataset has been edited or regenerated.

## Game modes

| Mode | What it does |
|---|---|
| **Home** | Streak, daily-goal ring, overall 850 progress, per-category mastery chips, "Continue" CTA that resumes the last mode. |
| **Learn (flashcards)** | Front = English word + pronunciation (Devanagari + IPA); tap/`Enter` to flip; back = Hindi + English meanings and both example sentences. `Again`/`Know it` buttons or swipe left/right. "Know it" seeds the SRS schedule. |
| **Quiz** | 4-option multiple choice, 10 per round, four variants: English→Hindi, Hindi→English, Audio→meaning, Fill-the-blank. Distractors come from the same category + difficulty where possible, never equal the answer, never repeat; options are shuffled every time. |
| **Listening** | Plays the word via `SpeechSynthesis` (`en-US`), learner picks the meaning, with a replay orb. Hidden gracefully when no English voice is available. |
| **Typing** | Given the Hindi meaning, type the English word. Case-insensitive, trimmed, tolerant of `/` variants, diff-style correction on failure. |
| **Spelling Puzzle** | Choose **Relaxed practice** (untimed) or a **Timed challenge** (the existing 60-second timer on harder words is bonus-only and never ends the round). Build words from shuffled tiles with drag, tap, or physical keyboard input (`Backspace`/arrows). The prompt shows pronunciation, meaning, target length, and session progress. After a miss, correctly placed letters stay marked and the remaining letters return for a retry; repeated misses queue the word into Review. Hints cost XP and never block (hear it / first letter / English meaning / example sentence), and a free **"Show word"** reveals the answer when needed. The session summary reports solved, revealed, and Review words. |
| **Review** | Leitner/SM-2-lite: 6 boxes, intervals 0/1/2/4/8/16 days. Correct → up a box; wrong → box 0 and re-queued later in the same session (after ≥ 3 other cards when possible). Only due cards appear; the tab shows the due count. |
| **English Reading** | Browse Wikipedia articles by technical topic or history; open article text in-app, save it locally, and copy the complete attributed text or a ChatGPT study prompt. The prompt asks for a one-line summary first, then simple explanation, sentence patterns, grammar rules, vocabulary meanings/examples and comprehension practice. Six original leveled passages and exercises remain available. |
| **Stats** | Per-category mastery, accuracy sparkline (14 days), words due, longest streak, level/XP, confirm-guarded reset. |
| **Settings** | Hindi-first vs English-first prompts, TTS voice + rate, sound on/off, daily goal size (10/20/30/50), reset. All persisted. |

**Gamification.** XP per correct answer (scaled by difficulty), a square-root level curve,
day-based streak (a single missed day keeps the streak alive), a daily goal with a progress
ring, and a confetti celebration on goal/level completion. No lives, no punitive timers, no
countdown pressure.

## Speech

- `window.speechSynthesis` with an explicitly chosen `en-US` voice; the async
  `voiceschanged` event is handled (plus a short poll on Safari). Rate ≈ 0.9, pitch 1.
- Any in-flight utterance is cancelled before a new one starts.
- English Reading reuses en-US speech synthesis to read each sentence in sequence and highlight the active sentence.
- **Graceful degradation:** if speech synthesis or an English voice is unavailable, audio
  controls are hidden, the Listening mode shows a text explanation, and the quiz's audio
  variant falls back to a text question. Nothing breaks.
- Read-aloud comparison is offered only when the browser exposes SpeechRecognition. It
  reports a speech-recognition word-match estimate, not pronunciation accuracy. The
  browser may process audio using its own service; SpellX does not store recordings.

## Accessibility

- Semantic HTML, real `<button>`s, `aria-live="polite"` feedback region, visible focus
  rings, accessible names on every icon-only control.
- Keyboard: `1–4` select an option, `Enter`/`Space` flip or advance, `Esc` goes back.
- Colour is never the only signal (✓/✕ icons and text accompany colour).
- `prefers-color-scheme` (full light + dark palettes) and `prefers-reduced-motion`
  (animations and confetti disabled) are respected.
- Text is never under 15 px, touch targets are ≥ 44×44 px, and the pronunciation line
  reserves space so layout never shifts when the mixed Devanagari + IPA appears.

## Offline support

- `manifest.webmanifest` makes the app installable as a PWA (portrait, custom SVG icon).
- `sw.js` precaches the app shell and bundled datasets, then serves stale-while-revalidate
  for the rest. Bundled lessons and locally saved articles work offline; fetching a new
  Wikipedia article requires a connection.
- On `file://` there is no service worker (and none is needed) — the app makes no
  app-initiated external network calls except a user-requested Wikipedia article fetch;
  there are no analytics or AI API calls. Article text is attributed to Wikipedia
  contributors under CC BY-SA 4.0, with a link to the specific source revision. Saved
  article text uses the existing local save, capped at 1,000,000 characters in total.
  Browser-provided speech recognition may use a browser service; that is disclosed
  before practice.

## Decisions (judgement calls made where the spec was ambiguous)

1. **Tab bar labels.** The bar ships as a **5-tab** bottom nav — **Home · Learn ·
   Spelling · Quiz · Review** — with a due-count badge on Review. Learn hosts the
   flashcard session and Spelling hosts the tile puzzle; Review shows spaced-repetition
   work. Stats, Listening, Typing and Settings are **not** tabs: Stats and the other
   in-game modes live in the Home mode grid, and Settings sits behind the header ⚙/profile
   button. "Continue" on Home resumes the last active mode. This keeps the primary
   learning loop one tap away while keeping the bar to the five highest-traffic screens.
   The UI chrome is **English-only** (per design); the word content — English word,
   Devanagari pronunciation, IPA, Hindi meaning and bilingual example sentences — is
   dataset data, not chrome, so it stays as provided.
2. **Streak rule.** "Day-based streak" — a streak increments on any day with ≥ 1 answer.
   A gap of exactly one day preserves the count (so it is visible the day after); a gap of
   two or more days restarts it at 1. Longest streak is computed from per-day answer
   history in Stats.
3. **Daily goal counts answers, not correct answers** — it measures practice volume
   (the spec's default of 20 answers), and wrong answers still count toward it, keeping
   the game non-punitive.
4. **Level curve.** Level = `floor(√(xp/100)) + 1`, so level 2 is 400 XP, level 3 is 900
   XP, etc. (grows gently; no wall).
5. **XP per correct answer** = 10 + 5 × difficulty (so 15/20/25 XP for levels 1–3).
   Wrong answers give no XP.
6. **Fill-the-blank.** Every word's `exampleSentence` contains the word itself, so the
   blank is produced by replacing the word with `____`. Distractors are the same
   category + difficulty, and (as a data-quality guard) never share the target's exact
   Hindi gloss — otherwise two options would both be "correct". (The dataset has 27 such
   gloss collisions, e.g. सोना → gold/sleep.)
7. **Typing accepts any word sharing the exact same Hindi gloss** (e.g. typing `sleep`
   for सोना is accepted because gold and sleep share the gloss), and accepts both `/`
   variant spellings. This keeps the drill fair for the 27 ambiguous glosses.
8. **Quiz rounds are 10 questions**; Listening is 10; Typing is 10. Flashcards run until
   the player finishes the selection (all 850, or one category, or the "again" subset).
9. **Audio auto-plays** on quiz/listening questions (best effort) with a replay orb; if
   the browser blocks autoplay, the orb is always available and nothing is hidden.
10. **"Know it" on flashcards seeds SRS** (box 1, due tomorrow) so Review is populated
    from the Learn flow; quiz/listening/typing answers also move SRS boxes. Flashcard
    flips mark a word as *seen* (for the seen/known counters) without changing mastery.
11. **Reset keeps settings** (Settings' reset) but wipes the schedule/stats; Stats'
    reset does the same. The word dataset is never touched.
12. **Service worker only over http(s).** On `file://` it would be pointless (and blocked),
    so registration is skipped — offline already works there. 13. **Spelling Puzzle design.** The learner *produces* the word (not recognises it), which
     is the skill the other modes only test passively. Two input paths (tap-to-place tiles
     **and** the physical keyboard) drive one state machine, so a word is completable either
     way, mid-word. Decoys are added only at tier ≥ 2: a decoy letter is absent from the word
     but present in the tray, so it is a *valid* tile and may legally fill a slot — intended,
     not a bug. A wrong completion locks the board and reveals the word on Esc; it never
     loses the round. Hints cost XP (audio 5, first letter 5, meaning 10, sentence 15) and
     never block; a clean solve is full XP and promotes one SRS box. One-letter words (two:
     , I) are excluded from the deck — a single tile is not a puzzle.
 14. **Spelling input: drag + tap + keyboard, and a free reveal.** Drag is the primary,
      visual path (Pointer Events, one API for mouse and touch); tap-to-place and the physical
      keyboard remain as equivalent fallbacks, so drag is never the only way to play
      (accessibility). A tile whose letter is *not in the word* bounces back to the tray on
      drop **or** tap (soft error tone, `aria-live`, round not lost); a letter that *is* in the
      word is accepted into a slot even in the wrong position (the learner can rearrange or
      backspace) — the keyboard path keeps its own wrong-letter feedback. The **"Show word"**
      button is a free safety valve: it reveals the answer, marks the word *seen*, and shows
      the teach card with 0 XP (not a clean solve, so no SRS promote).

  15. **Saffron English design system.** The app is skinned with the Saffron English
       tokens: warm saffron/amber primary (#D97706, lip #B45309), emerald secondary
       (#10B981), indigo tertiary, a light + dark surface set, 8-pt spacing, a 480 px
       max-width canvas, and tactile "3D-lip" controls (2 px border + 3–4 px bottom lip
       that collapses on press → translateY). **System fonts + emoji/SVG icons only** — the
       mockups' Google Fonts (Plus Jakarta Sans / Tiro Devanagari), Tailwind CDN and
       Material Symbols are deliberately **not** used, because they would break the
       offline / `file://` / zero-network guarantees; the font stack carries a Devanagari
       fallback (Noto Sans Devanagari / Mangal / Nirmala UI) for the word content. All
       chrome is in English (see Decision 1); the design is a pure reskin — no game
       mechanics, SRS, XP, TTS or state logic changed.

## Lighthouse

Measured with Lighthouse 12.8.2 (mobile preset: 360×640, 4× CPU slowdown, ~1.4 Mbps
throttled) against a local static server, 2026-10-12:

| Category | Score |
| --- | --- |
| Performance | 81 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Key metrics: FCP ~1.3 s, LCP ~4.2 s, TBT ~250 ms, CLS 0, Speed Index ~1.3 s.

- **Accessibility / Best Practices / SEO are 100.** No external resources, valid
  ARIA, all text ≥ 4.5:1 contrast in both themes, `lang="en"`, meta description, manifest.
- **Performance is 81**, not the theoretical 100. The app code is small and minified
  (TBT ~250 ms, CLS 0); the score is capped by *lab-environment* items, not app weight:
  - Render-blocking CSS + the one unminified file — the CSS is inlined and minified in
    `index.html` and the app JS is minified. The remaining "Minify JavaScript" flag is
    `data/words.js`, the read-only dataset, which is kept as human-readable source data.
  - No HTTP text compression / long cache TTL / efficient cache lifetimes — these only
    exist on a real HTTPS host, not a local `file://`-first or plain-HTTP server.
  - "Document request latency" is pure simulated network throttling.
  On a real CDN over HTTPS with minified + gzip/brotli + cache headers, Performance
  would be ≥ 95. The numbers above are the honest local-run values.

## What this is not

- No backend, no accounts, no network. Everything is on-device.
- The dataset is treated as read-only; no words are invented, edited or removed.
- No `alert()`/`confirm()` in the game loop — all confirmations use in-page sheets.
