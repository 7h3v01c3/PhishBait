## PhishBait Crypto Security Quiz

Browser-based quiz to test (and humble) your crypto scam-awareness before real money is at risk.

### What this is

- **Static app**: simple `index.html + styles.css + app.js` with YAML-driven questions in `data/questions.yaml`.
- **Focus**: phishing, fake support, seed-phrase traps, and social-engineering on Telegram, X (Twitter), Discord, email, and web.
- **Design**: quick **5‑minute**, **20‑question** quiz; questions and answer order are fully randomized each run.

### Why this exists

This quiz comes out of years of helping real users after they’ve been scammed, phished, or confused by “support” that was never real. Under the handle **“TheVoice”**, the work has always been:

- Teach users to keep **sovereignty over their own keys and decisions**.
- Hunt and report fake “support” sites, wallet “fix” tools, and recovery scams.
- Guide people through basics first, so they **don’t learn security from a post‑mortem** on their own funds.

This quiz is just a small, fun way to let people discover how prepared (or unprepared) they are **before** they jump deeper into crypto.

### How to run it locally

From the project root:

```powershell
cd C:\Users\TheVoice\Documents\CryptoQuiz  # or your clone path
py -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000` in your browser and click **“Start the Quiz!”**.

### Question format (YAML)

Questions live in `data/questions.yaml`:

```yaml
questions:
  - text: "Clear, specific scenario-based question"
    options:
      - "First option (distractor)"      # index 0
      - "Second option (correct answer)" # index 1
      - "Third option (distractor)"      # index 2
      - "Fourth option (distractor)"     # index 3
    correct: 1   # zero-based index of correct option (0–3)
    weight: 3    # 2 = important, 3 = critical
```

In the app:

- On each run, the **questions are shuffled**.
- Up to **20 questions** are used per quiz (if there are fewer, all are used).
- For every question, the **options are shuffled and the `correct` index is recomputed**, so the correct answer is not tied to a fixed position.

### Content rules for questions

- **Scenario-based**: Use realistic crypto situations (DM “support”, fake airdrops, “manual wallet connection”, recovery tools, etc.).
- **Clear single decision**: The user should be deciding **one thing** in that moment.
- **4 options only**: Always exactly four choices.
- **Security principles**:
  - The **correct answer is never** “give your seed phrase / recovery phrase / private key / password / 2FA code to anyone”.
  - Prefer answers that send users to **official websites/apps they type or have bookmarked themselves**, not links from DMs or emails.
  - Repeatedly reinforce: no real support needs your seed words, ever.

If you’re unsure, read existing questions and mirror their style and difficulty.

### Contributing / forking

The goal is to grow this into a **large, community‑driven bank of questions**—hundreds or thousands over time—while keeping it fun and honest.

**To contribute questions:**

1. **Fork** this repo on GitHub.
2. **Clone** your fork locally.
3. Edit `data/questions.yaml` and add new questions following the format and rules above.
4. Run the quiz locally (see “How to run it locally”) and sanity‑check:
   - No broken YAML.
   - Options read naturally even after shuffling.
   - Correct answer reflects safe, security‑first behavior.
5. Commit and push to your fork.
6. Open a **pull request** with a short summary of:
   - How many questions you added/changed.
   - What scenarios / platforms they cover (e.g. “Telegram support scam”, “manual wallet connection”, “fake airdrop claim”).

**Other useful contributions:**

- Better wording / clarity on existing questions.
- Translations (while keeping the same threat models).
- UI/UX tweaks that keep things lightweight and accessible.

### Ethos

This project is not about flexing how “early” or “smart” anyone is. It’s about:

- Making it harder for scammers to find easy victims.
- Giving new and veteran users a low‑stakes way to find their blind spots.
- Encouraging people to **slow down, learn first, and move money later**.

If this quiz makes someone pause before trusting a random “support” DM or typing their seed words into a website, it’s doing its job.


