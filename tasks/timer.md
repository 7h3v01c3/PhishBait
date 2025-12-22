## Timer Extension Feature – Notes and Tasks

### Goal

Make it easier (and funnier) for people to **finish the quiz** instead of just timing out:

- Base quiz time stays **5 minutes**.
- When time is nearly up, show a humorous **“need more time?”** button that **adds 1 extra minute**.
- If a user still doesn’t finish, give them a short **grace period (e.g. 20 seconds)** before auto‑scoring.

### Planned Behavior

- **Extra time button**
  - Appears only when the timer gets low (e.g. under 30 seconds).
  - Text something like:  
    “Give me 1 more minute (I swear I’m almost done).”
  - On click:
    - Add **+60 seconds** to `timer`.
    - Update the timer display immediately.
    - Optionally hide/disable the button until the timer is low again.

- **Grace period + auto‑finish**
  - When `timer` would hit 0:
    - If not already in a “final grace” state, switch to a **20‑second grace countdown** instead of ending immediately.
    - Show a clear but humorous message, e.g.:  
      “Time’s basically up. We’ll score this in 20 seconds—no pressure, just do your best click‑panic.”
  - When grace timer hits 0, **call `endQuiz()` regardless of progress**.

### Implementation Targets (for later)

- Update `startQuizWithQuestions` in `app.js`:
  - Add state:
    - `extraMinutesUsed` counter and a simple `inGracePeriod` flag.
  - Extend the timer interval logic to:
    - Show/hide the “+1 minute” button based on remaining time.
    - Handle switching to a short grace period before final `endQuiz()`.
  - Add a click handler for the extra‑time button.
- Update quiz container HTML template (within `app.js`) to include:
  - A `timer-area` block containing:
    - The main timer text.
    - An `extra-time-container` with helper copy and a clearly visible **Add 1 minute** button.
    - A `grace-message` line for short, humorous status text.

### UX / Visual Decisions

- Extra-time control follows Nielsen-style visibility and affordance:
  - Placed directly under the timer and **above** the question text (separate from answers).
  - Uses a distinct button style so it does not blend with answer buttons.
- Button label is short and explicit: e.g. **“+1 minute”** / **“Add 1 minute”**.
- Additional copy:
  - “Running low on time? You get one mercy minute.” shown next to the button when time is low.
  - On click: “Bonus minute activated. Real scammers aren't this kind.” shown briefly in `grace-message`, auto-cleared after a few seconds.

### File Backup Rule for This Branch (`timer`)

For **every file changed on this branch**, create a simple backup copy before editing:

- Naming convention: `FILENAME.backup-timer` in the same directory, e.g.:
  - `app.js.backup-timer`
  - `index.html.backup-timer`
- Backups are just for safety while iterating on the `timer` branch.
- They can be **deleted before merging/pushing** once we’re happy with the changes.


