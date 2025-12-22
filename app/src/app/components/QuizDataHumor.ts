// Enhanced quiz data with humor and explanations
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  scamType: string;
  funnyWrongAnswer: string; // What happens if you pick wrong
  icon: "shield" | "wallet" | "fish" | "brain" | "zap";
}

export const quizMetadata = {
  title: "Don't Take the Bait!",
  subtitle: "Your Crypto Survival Training",
  mascotGreeting: "Hey there! I'm Finley the PhishBait fish. I've seen it all in the crypto seas—and trust me, the waters are full of sharks. Let's see if you can swim with the big fish... or if you'll get hooked!",
  warning: "⚠️ Real Talk:",
  warningText: "If this quiz feels tough, imagine losing your life savings in 30 seconds. Take your time, learn the patterns, and don't be the catch of the day.",
  shareText: "Challenge your friends—let's see who becomes fish food first! 🎣",
  footerCredit: "Built by TheVoice (@TheVoice.dev) with stories from the crypto trenches. Every question here has sunk someone's wallet.",
  supportLink: "Buy Finley a Coffee ☕",
  githubLink: "Share Your Horror Stories 💀",
  version: "0.3.0",
  timeLimit: 300
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "On Telegram, a user with display name 'Project Support' DMs you FIRST asking for your seed phrase to 'verify your wallet.' What do you do?",
    options: [
      "Ask them to add you as a contact first—seems polite!",
      "Join more groups to see if others trust them",
      "Open the project's OFFICIAL website and only trust usernames listed there. NEVER share seed phrases. Period.",
      "Check if their display name looks legit, then send it"
    ],
    correctAnswer: 2,
    explanation: "Real support NEVER DMs first and NEVER asks for seed phrases. Display names are faker than a $3 bill. Always verify official channels, and remember: Your seed phrase is like your bank PIN tattooed on your forehead—don't share it!",
    funnyWrongAnswer: "Congrats! You just funded someone's vacation. They're sipping margaritas while you're drinking tears. 🍹💸",
    scamType: "Telegram Impersonator",
    icon: "fish"
  },
  {
    id: 2,
    question: "Email says your exchange account will be SUSPENDED unless you click this link RIGHT NOW! What's your move?",
    options: [
      "Click it fast—I need my account!",
      "Reply asking if it's real (to the scammer... smart)",
      "Type the exchange URL directly into my browser and check my account there. Ignore the email.",
      "Forward to friends to see if they got it too"
    ],
    correctAnswer: 2,
    explanation: "Classic phishing 101! Scammers love urgency because panic makes you dumb. ALWAYS go directly to the real website by typing it yourself. That email link? Goes to www.totallynot-a-scam-bro.com 🎭",
    funnyWrongAnswer: "The link wasn't to your exchange—it was to 'CoinbaseButSpelledWeird.com' and now someone's buying NFTs of cartoon monkeys with YOUR money. 🐵",
    scamType: "Phishing Email",
    icon: "shield"
  },
  {
    id: 3,
    question: "New DeFi project: '1000% APY GUARANTEED! 🚀' What's really happening here?",
    options: [
      "Legitimate opportunity—get in early!",
      "Probably a Ponzi scheme or rug pull. Math doesn't work, wallets will cry.",
      "Smart contracts guarantee it—blockchain magic!",
      "Invest a little to test the waters first"
    ],
    correctAnswer: 1,
    explanation: "If it sounds too good to be true, it's because IT IS. 1000% APY means: early people get paid with YOUR money until devs disappear. That's not DeFi, that's robbery with extra steps. 💰➡️💨",
    funnyWrongAnswer: "You invested $1000. Got $50 in 'rewards.' Tried to withdraw and—SURPRISE—the website's gone! The devs are now 'DogeRocketMoonBaby' and you've learned an expensive lesson. 📚💸",
    scamType: "Ponzi/Rug Pull",
    icon: "zap"
  },
  {
    id: 4,
    question: "Discord DM: 'Hey! Mint this exclusive NFT by signing my special contract 😉' What should you do?",
    options: [
      "Sign it quick before it's gone!",
      "Ask for ID verification, then sign",
      "NEVER sign random contracts from DMs. This drains your entire wallet in one click.",
      "Use a wallet with just a little crypto to be safe"
    ],
    correctAnswer: 2,
    explanation: "That 'special contract' is actually called 'setApprovalForAll' and it hands your wallet keys to the scammer. You're not minting an NFT—you're giving them permission to take EVERYTHING. Don't. Sign. Random. Contracts. 🚫",
    funnyWrongAnswer: "You signed it. Refresh your wallet. Everything's... gone. Your NFTs, your ETH, that random token worth $0.03—ALL gone. The 'NFT' you got? A picture of a clown. Fitting. 🤡",
    scamType: "Wallet Drainer",
    icon: "wallet"
  },
  {
    id: 5,
    question: "You've got $10,000 in crypto for the long haul. Where should it live?",
    options: [
      "Exchange—easy access when I need it!",
      "Hardware wallet, stored offline, seed phrase written on paper (NOT digital), hidden like treasure.",
      "Hot wallet on my phone—so convenient!",
      "Notes app on my phone—I'll remember it"
    ],
    correctAnswer: 1,
    explanation: "Not your keys, not your coins! Exchanges get hacked. Phones get stolen. Notes apps get backed up to clouds (hello hackers!). Hardware wallet + offline seed phrase = Fort Knox for crypto. Be boring, stay rich. 🏰",
    funnyWrongAnswer: "Exchange got hacked / Phone got stolen / Notes got synced to a hacked iCloud. Either way, someone's buying a Lambo and it's not you. 🏎️💨",
    scamType: "Security Best Practice",
    icon: "shield"
  },
  {
    id: 6,
    question: "About to connect your wallet to a new DeFi site. What's your pre-flight checklist?",
    options: [
      "Just connect—all DeFi is safe, right?",
      "Verify the EXACT URL is correct, check what permissions I'm approving, use a burner wallet for first test.",
      "Connect main wallet to test it out",
      "Ask in Telegram if it's legit"
    ],
    correctAnswer: 1,
    explanation: "Wrong URL? Fake site draining wallets. Wrong permissions? They own your tokens. Main wallet on day 1? Living dangerously! Always verify, check permissions, test with small amounts. Slow and steady keeps the crypto. 🐢💰",
    funnyWrongAnswer: "You connected to 'Uniswapp.com' (note the extra 'p'). It looked identical. Your wallet's now empty and the real Uniswap is laughing at you. 😂",
    scamType: "Fake DeFi Site",
    icon: "brain"
  },
  {
    id: 7,
    question: "@elonmusk vs @elonrnusk (with 'rn' looking like 'm'). Twitter account says 'Sending 2 ETH back for every 1 sent!' Your move?",
    options: [
      "Send ETH—Elon's generous today!",
      "SCAM ALERT! Real influencers don't do surprise giveaways. Report and block.",
      "It's a test of faith in the crypto community!",
      "Send a small amount to verify first"
    ],
    correctAnswer: 1,
    explanation: "This scam is older than Bitcoin! Fake accounts with tiny differences (rn vs m, capital I vs lowercase l). Real celebrities don't ask you to send first. This is the 'Nigerian Prince' of crypto. Don't fall for it! 👑🚫",
    funnyWrongAnswer: "You sent 1 ETH ($2000). They sent back... absolutely nothing. Elon's still rich. You're now poor. The real Elon doesn't even know you exist. 😢",
    scamType: "Impersonation Scam",
    icon: "fish"
  },
  {
    id: 8,
    question: "Project says 'Audited by RandomAuditCo!' Should you care about the audit?",
    options: [
      "Nah, it's just marketing fluff",
      "YES! Audits from REPUTABLE firms (CertiK, Trail of Bits, etc.) catch bugs before they eat your money.",
      "Audits are fake—trust the vibes",
      "Just helps pump the token price"
    ],
    correctAnswer: 1,
    explanation: "Good audits find the bugs that would later steal your money. But ONLY from real firms! 'RandomAuditCo' might be the dev's cousin with a WordPress site. Check if the audit firm is legit and actually found (and fixed) issues. 🔍✅",
    funnyWrongAnswer: "You skipped reading the audit. Turns out there was a critical vulnerability. The project got exploited for $10M three weeks later. Your bag? Worthless. Should've read the fine print. 📄💀",
    scamType: "Due Diligence",
    icon: "brain"
  },
  {
    id: 9,
    question: "You're at Starbucks on public WiFi, need to check your crypto portfolio quick. Smart move?",
    options: [
      "It's fine—just checking!",
      "Wait until I'm home on secure WiFi, OR use a VPN if urgent.",
      "Make it quick so hackers can't catch me",
      "Public WiFi is encrypted anyway"
    ],
    correctAnswer: 1,
    explanation: "Public WiFi = hacker playground. They can intercept your connection and steal passwords, session cookies, or worse. Your crypto check can wait. Your money can't grow back. Use VPN or wait for secure network. ☕🚫",
    funnyWrongAnswer: "Someone on that network used a tool called 'WireShark' and captured your session. They now have access to your exchange account. The hacker bought themselves a new laptop. With YOUR money. 💻😈",
    scamType: "Security Hygiene",
    icon: "shield"
  },
  {
    id: 10,
    question: "DM: 'BRO! Send me 1 BTC and I'll send you 2 BTC back! I'm rich and generous!' Your response?",
    options: [
      "Sounds good—let's test the waters!",
      "SCAM. Nobody gives free money. Block, report, laugh at their desperation.",
      "It's just how crypto works—redistribution",
      "Worth trying to test the blockchain"
    ],
    correctAnswer: 1,
    explanation: "This is the 'double your money' scam from RuneScape, now in crypto form! They're not generous. They're thieves. Send 1 BTC, get 0 BTC back. You lose, they win, capitalism is dead. Don't be the sucker. 🎣🚫",
    funnyWrongAnswer: "You sent 1 BTC ($40,000). They sent back... a laugh emoji. You're out 40 grand. They blocked you. You learned the most expensive lesson of your life. Class dismissed. 🎓💸",
    scamType: "Classic Ponzi",
    icon: "fish"
  }
];
