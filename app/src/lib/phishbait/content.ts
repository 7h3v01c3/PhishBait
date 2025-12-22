import { fetchYaml } from "./yaml";
import type { QuizQuestion as UiQuizQuestion } from "@/app/components/QuizDataHumor";

type QuestionsYaml = {
  questions: Array<{
    text: string;
    options: string[];
    correct: number;
    weight?: number;
    not_ready?: string;
    scam_type?: string;
    icon?: "fish" | "shield" | "wallet" | "brain" | "zap";
    explanation?: string;
    wrong_consequence?: string;
  }>;
};

type GeneralTextYaml = {
  general_text: {
    tagline?: string;
    error?: string;
    warning?: string;
    encouragement?: string;
    share?: string;
    footer?: string;
    version?: string;
  };
};

type TimerYaml = {
  timer: {
    low_hints?: string[];
    bonus_messages?: string[];
    grace_messages?: string[];
  };
};

type RankingsYaml = {
  rankings: {
    tiers: Array<{
      id: string;
      min_percent: number;
      titles: string[];
      review?: string;
    }>;
  };
};

export type PhishBaitContent = {
  questions: EngineQuestion[];
  generalText: GeneralTextYaml["general_text"];
  timerText: TimerYaml["timer"];
  rankings: RankingsYaml["rankings"];
};

export type EngineQuestion = UiQuizQuestion & {
  weight: number;
  notReady?: string;
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function remapQuestionOptions(q: QuestionsYaml["questions"][number]): {
  options: string[];
  correctAnswer: number;
} {
  const indexed = q.options.map((opt, idx) => ({ opt, idx }));
  const shuffled = shuffle(indexed);
  const newCorrect = shuffled.findIndex((x) => x.idx === q.correct);
  return { options: shuffled.map((x) => x.opt), correctAnswer: newCorrect };
}

function toUiQuestion(q: QuestionsYaml["questions"][number], id: number): EngineQuestion {
  const { options, correctAnswer } = remapQuestionOptions(q);

  const explanation =
    q.explanation ??
    q.not_ready ??
    "Slow down. Verify the official site/app yourself. Ignore DMs. Never share seed words or private keys.";

  const funnyWrongAnswer =
    q.wrong_consequence ??
    q.not_ready ??
    "Wrong click. Real scammers don’t do refunds.";

  return {
    id,
    question: q.text,
    options,
    correctAnswer,
    explanation,
    scamType: q.scam_type ?? "Security Pattern",
    funnyWrongAnswer,
    icon: q.icon ?? "shield",
    weight: q.weight ?? 5,
    notReady: q.not_ready,
  };
}

export async function loadPhishBaitContent(): Promise<PhishBaitContent> {
  const [questionsYaml, generalTextYaml, timerYaml, rankingsYaml] = await Promise.all([
    fetchYaml<QuestionsYaml>("/data/questions.yaml"),
    fetchYaml<GeneralTextYaml>("/data/general_text.yaml"),
    fetchYaml<TimerYaml>("/data/timer.yaml"),
    fetchYaml<RankingsYaml>("/data/rankings.yaml"),
  ]);

  const selected = shuffle(questionsYaml.questions).slice(0, 20);
  const questions = selected.map((q, idx) => toUiQuestion(q, idx + 1));

  return {
    questions,
    generalText: generalTextYaml.general_text,
    timerText: timerYaml.timer,
    rankings: rankingsYaml.rankings,
  };
}


