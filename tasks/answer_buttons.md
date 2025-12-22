## Answer Buttons UI (0.2.0) – Notes and Tasks

### Goal

Replace the current answer `<button>` list with a **radio-style answer control** that:

- Feels more “form-like” and familiar for normies (clear selected state).
- Matches the PhishBait theme (orange + green + red).
- Shows **correct / incorrect** feedback clearly after selection.
- Keeps the current scoring + timing logic intact.

### UX Requirements (practical + Nielsen-minded)

- **Affordance**: answers must look obviously clickable/tappable.
- **Visibility of system status**: after selection, user instantly sees whether they were right/wrong.
- **Error prevention**: only one selection allowed; inputs disabled after pick.
- **Consistency**: answer UI should not look like the timer “+1 minute” button.

### Implementation Outline

- **Markup** (rendered per question in `app.js`):
  - Render a `<form>` / container with four radio inputs (`name="answer"`) and labels.
  - Make the **label** the main clickable target.

- **Styling** (`styles.css`):
  - Create theme variables for:
    - neutral / hover / selected
    - correct green, incorrect red
  - Add classes for:
    - `.answer-option`
    - `.answer-option--selected`
    - `.answer-option--correct`
    - `.answer-option--incorrect`

- **Behavior** (`app.js`):
  - On click/selection:
    - disable all radios
    - apply correct/incorrect styles
    - keep existing scoring + “next question after delay” flow

### Backup Rule (answers_0.2.0)

Before editing any file, create a copy in `/tasks` using:

`<filename>.<ext>.backup-answers_0.2.0-YYYY-MM-DD`

Example:

- `tasks/app.js.backup-answers_0.2.0-2025-12-15`
- `tasks/styles.css.backup-answers_0.2.0-2025-12-15`

Backups can be removed before final merge/push once the feature is stable.


