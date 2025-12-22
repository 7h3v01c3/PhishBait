# Roadmap to 1.0.0 (Make “New Design 2” the App, Integrate Our Quiz Engine Into It)

## Goal (clarified)
We will use **New Design 2** (`tasks/New Design 2/Modernize Minimalist Quiz App`) as the **real production app** (React + Vite + Tailwind + Motion), and integrate **our existing quiz engine and content model** into it:
- YAML-driven questions (`data/questions.yaml`)
- YAML-driven rankings (`data/rankings.yaml`)
- YAML-driven general text/version (`data/general_text.yaml`)
- YAML-driven timer copy (`data/timer.yaml`)
- Our guardrails and philosophy (seed phrase is never correct, distrust DMs, official site/support tickets, etc.)
- Our rules: 5 minutes, 20 questions per run, randomize questions + options, extra minute button + grace period, localStorage missed list, results logic.

**1.0.0 definition:** “New Design 2 look + advanced UX + animations” **and** full parity with our current quiz logic + YAML integrations, deployable to Vercel.

## Non‑Negotiables
- **Free** (no gating / no paywalls)
- **Deployable on Vercel** (build step is OK; must produce a static build output)
- **Content integrity rules stay true**
  - No correct answer can ever involve giving seed phrase / private keys to anyone
  - Prefer official sites/apps and official support paths over DMs
- **Content remains forkable**: questions and text stay in YAML files in repo.

---

## Branch / Release Plan (how we ship this safely)
We will build and test the React/Vite integration on **`0.5.0`**, then ship to `main` as **`1.0.0`** when the gates are met.

- [ ] **Work branch**: `0.5.0`
  - All integration commits go here.
  - Keep commits small and reviewable (loader layer, engine hook, UI wiring, results/rankings, etc.)

- [ ] **Release branch / merge target**: `main`
  - We only merge once the **Feature-Parity Checklist** (bottom) is complete.
  - When merging, bump `data/general_text.yaml` version to `1.0.0` as part of the merge/PR.

- [ ] **Definition of Done gates before merging to `main`**
  - Local run works (dev + build)
  - Deployed preview (Vercel) works: YAML fetch paths + assets + no console errors
  - Timer edge cases behave correctly (extra minute + grace period)
  - Results + rankings behave correctly (review rules + missed list + localStorage)

---

## Decisions to Make Up Front (do these first)
- [ ] **Repo strategy**
  - Option 1: Move the Vite app to repo root (recommended for simplest Vercel)
  - Option 2: Keep Vite app in a subfolder (requires Vercel “Root Directory” config)
  - Keep the existing vanilla version in `/legacy/` (optional) so we can diff behaviors.

- [ ] **YAML parsing approach in React**
  - Use npm package `js-yaml` or `yaml` inside the Vite build (recommended)
  - Do not rely on CDN `js-yaml` script tags (keep it modern and self-contained)

- [ ] **Asset strategy**
  - Use `assets/logo.png` as mascot/brand asset (PhishBait)
  - Adopt any New Design 2 decorative imagery (fish/shield) either as SVG, icon library, or simple inline assets

---

## Phase 1 — Make New Design 2 runnable as “our app” in the repo
**Goal:** Build and preview locally; get a clean baseline before integration.

- [ ] Copy or move `tasks/New Design 2/Modernize Minimalist Quiz App/` into a real app folder, e.g.:
  - `/app/` (or root)
  - Ensure `package.json` exists in that folder

- [ ] Decide Vercel configuration:
  - **Build command**: `npm run build`
  - **Output directory**: `dist`
  - If app is in a subfolder, set Vercel “Root Directory” to that folder

- [ ] Ensure static assets + YAML are served in the Vite build:
  - Move `assets/` and `data/` into the Vite **`public/`** directory (recommended):
    - `public/assets/...`
    - `public/data/...`
  - Then fetch paths remain simple: `fetch('/data/questions.yaml')`

**Acceptance criteria**
- `npm install`, `npm run dev`, `npm run build` succeed.
- Deployed build can fetch `/data/*.yaml` and `/assets/*` paths.

---

## Phase 2 — Replace prototype quiz data with our YAML-driven content
**Goal:** New Design 2 UI renders our real questions and copy.

- [ ] Create a `src/lib/content/` layer:
  - `loadQuestions()` → fetch `/data/questions.yaml` and parse it
  - `loadRankings()` → fetch `/data/rankings.yaml` and parse it
  - `loadGeneralText()` → fetch `/data/general_text.yaml` and parse it
  - `loadTimerText()` → fetch `/data/timer.yaml` and parse it

- [ ] Define TypeScript types that match our YAML schema:
  - Questions: `text`, `options`, `correct`, `weight`, `not_ready` (+ optional `scam_type`, `icon`, `explanation`, `wrong_consequence`)
  - Rankings: tiers, titles, review template
  - General text: tagline, warning, encouragement, share, footer, version
  - Timer text arrays: low_hints, bonus_messages, grace_messages

- [ ] Add “schema fallbacks” so missing optional fields don’t crash the UI.

**Acceptance criteria**
- UI uses our live YAML content (not `QuizDataHumor.ts`).
- If YAML fails to load, show a friendly error state.

---

## Phase 3 — Port our quiz runtime rules into React state machine
**Goal:** Feature parity with current `app.js` logic, inside React.

Implement in React (in `App.tsx` or `useQuizEngine` hook):

- [ ] **Question selection rules**
  - Shuffle full list every run
  - If > 20, slice to 20
  - If ≤ 20, use all

- [ ] **Option randomization with correct remap**
  - Shuffle options per question
  - Recompute correct index safely

- [ ] **Timer rules**
  - 5 minutes start
  - Show “Need more time?” at threshold (e.g., 30s)
  - Clicking adds +60s once, show bonus message (random from timer.yaml)
  - At 0, start grace period (20s) with grace message (random from timer.yaml)
  - Auto-finish at grace end

- [ ] **Answer handling**
  - Disable changes during feedback window
  - Highlight selected answer (correct/incorrect)
  - Always highlight the correct answer (learning)
  - Auto-advance after delay (configurable; e.g. 3–5s)

- [ ] **Scoring + missed tracking**
  - Score by weight (standardize 5 each → 100 max for 20 questions)
  - Track missed questions (wrong + unanswered)
  - Save last missed list to `localStorage` (`phishbait_last_missed`)

- [ ] **Ranking output**
  - Use `rankings.yaml` tiers to pick title
  - Use tier `review` template only for the middle tiers (not 100% and not low tiers), matching our rule set

**Acceptance criteria**
- A user taking the quiz in React gets the same results and behaviors as the vanilla app.

---

## Phase 4 — Map New Design 2 UI/animations to our engine (keep it “identical”)
**Goal:** Keep the New Design 2 layout and animations, but drive it with our data.

- [ ] Landing screen:
  - Replace `quizMetadata` with `general_text.yaml` values where applicable
  - Keep Finley greeting/warnings; allow overrides from YAML later if desired

- [ ] Quiz screen:
  - Keep header row + timer pill styling and behavior
  - Keep progress bar and “Question X of Y”
  - Show scam badge:
    - `scam_type` label + icon mapping

- [ ] Feedback panel:
  - Drive “Why this matters” from `explanation` (fallback to `not_ready`)
  - Drive “What would happen” from `wrong_consequence` (fallback to humorous default or `not_ready`)

- [ ] Results screen:
  - Keep New Design 2 card layout (score ring optional)
  - Replace its tier logic with our `rankings.yaml` logic
  - “Scams you’d fall for” list uses missed questions
  - Buttons: Restart + Share

**Acceptance criteria**
- UX remains New Design 2 “identical” in structure and motion, but reflects our content + integrations.

---

## Phase 5 — Content upgrades to fully support New Design 2 richness
**Goal:** Ensure YAML contains everything the UI wants to show.

- [ ] Extend `data/questions.yaml` to include (optional → then gradually required):
  - `scam_type`
  - `icon` (`fish|shield|wallet|brain|zap`)
  - `explanation`
  - `wrong_consequence`

- [ ] Update `tasks/QUESTION_CREATION_PROMPT.md` with the new fields + examples.
- [ ] Add a validator script in `tasks/` (TypeScript or Python) to enforce:
  - valid icon values
  - required fields for 1.0.0 (once we flip the switch)
  - seed-phrase/private-key rule is respected

**Acceptance criteria**
- “Explanation” and “wrong consequence” are present on all shipped questions by 1.0.0.

---

## Phase 6 — Vercel hardening and release checklist
**Goal:** Make it stable and easy to deploy.

- [ ] Add `.gitignore` entries for Vite/Node build outputs:
  - `node_modules/`, `dist/`, `.vite/`
- [ ] Ensure fetch paths are correct in production (use absolute `/data/...`)
- [ ] Confirm `assets/favicon-96x96.png` is referenced correctly in the React app
- [ ] Confirm footer links open correctly (no global preventDefault)
- [ ] Update displayed version:
  - `data/general_text.yaml` → `1.0.0`

**Acceptance criteria**
- Production build works with no broken asset/YAML fetches.
- No console errors in deployed version.

---

## Feature-Parity Checklist (Must be true for 1.0.0)
- [ ] 5-minute quiz
- [ ] 20 questions per run (random subset if > 20)
- [ ] Random option order per question with correct remap
- [ ] “Need more time?” +1 minute (once) + humorous message
- [ ] 20-second grace period before auto-score
- [ ] Rankings YAML tiers with multiple titles per tier + optional review template
- [ ] Missed questions tracked + stored in localStorage + used in results breakdown
- [ ] No “seed phrase/private key to anyone” correct answers (content rule enforced)

