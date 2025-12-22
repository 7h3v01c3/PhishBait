// Quiz metadata and questions
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizMetadata = {
  title: "The Don't Take the Bait—Learn Before You Burn Quiz.",
  subtitle: "Think you're crypto-ready? Let's find out—before the scammers do!",
  warning: "Warning: If this quiz is rough, the real world will be worse.",
  subwarning: "Failing this is your sign to slow down, learn more, and delay your jump—because you will lose.",
  shareText: "Think your friends can beat your score? Share this and find out.",
  footerText: "PhishBait.xyz was created by TheVoice (@ TheVoice.dev) as a support tool—made with humor and others sharing their hard-earned life lessons.",
  supportLink: "Support PhishBait (donate)",
  githubLink: "GitHub discussions & ideas",
  version: "0.3.0",
  timeLimit: 300 // 5 minutes in seconds
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "On Telegram, a user with the display name 'Project Support' and username '@ProjectSupportHelp1' DMs you first, asking for your seed phrase. How should you verify and respond?",
    options: [
      "Ask them to add you as a contact before sharing anything.",
      "Join more Telegram groups to see if others trust them.",
      "Open the project's official website or docs and only trust Telegram usernames listed there; never share your seed phrase.",
      "Check if their display name looks official, then send your seed phrase if it does."
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "You receive an email claiming to be from your exchange, asking you to verify your account by clicking a link. What should you do?",
    options: [
      "Click the link immediately to avoid account suspension.",
      "Reply to the email asking if it's legitimate.",
      "Go directly to the exchange's official website (not via the email link) and check your account status there.",
      "Forward the email to friends to see if they got it too."
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "A new DeFi project promises 1000% APY returns. What's the most likely scenario?",
    options: [
      "It's a legitimate high-yield opportunity you should invest in immediately.",
      "It's probably a Ponzi scheme or rug pull waiting to happen.",
      "The returns are guaranteed by smart contracts.",
      "You should invest a small amount to test it first."
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Someone DMs you on Discord offering to help you mint an NFT by sending you a 'special contract' to sign. What should you do?",
    options: [
      "Sign it quickly before the opportunity expires.",
      "Ask them to verify their identity first, then sign.",
      "Never sign unknown contracts sent via DM - it's likely a wallet draining scam.",
      "Sign it with a wallet that has only a small amount of crypto."
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the safest way to store large amounts of cryptocurrency long-term?",
    options: [
      "Keep it on a major exchange for convenience.",
      "Use a hardware wallet stored securely offline.",
      "Store it in a hot wallet on your phone.",
      "Write your seed phrase in a note-taking app."
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "You want to connect your wallet to a new DeFi protocol. What should you check first?",
    options: [
      "Just connect - all DeFi protocols are safe.",
      "Check if the website URL is correct and verify it's the official site, then review what permissions you're granting.",
      "Connect with your main wallet to test it out.",
      "Ask in Telegram if anyone has used it."
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "A Twitter account that looks like a famous crypto influencer (but with one letter different) offers you a giveaway. What is this?",
    options: [
      "A legitimate giveaway you should enter.",
      "An impersonation scam - the real influencer wouldn't do giveaways like this.",
      "A test to see if you're paying attention.",
      "A way for the influencer to grow their following."
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "What's the purpose of a smart contract audit?",
    options: [
      "To make the website look more professional.",
      "To identify security vulnerabilities and ensure the contract works as intended.",
      "It's just marketing - audits don't really matter.",
      "To increase the token price."
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "You're on a public WiFi network. What's the safest way to access your crypto wallets?",
    options: [
      "It's fine to access your wallets on any network.",
      "Wait until you're on a secure, private network or use a VPN.",
      "Just make transactions quickly so no one can intercept.",
      "Public WiFi is safer because it's encrypted."
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Someone offers to 'double your Bitcoin' if you send them some first. What is this?",
    options: [
      "A generous offer you should take advantage of.",
      "A classic scam - never send crypto expecting to get more back.",
      "A legitimate trading strategy.",
      "A way to test the blockchain."
    ],
    correctAnswer: 1
  }
];
