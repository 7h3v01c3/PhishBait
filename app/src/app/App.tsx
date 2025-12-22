import { useState, useEffect } from "react";
import { QuizLandingHumor } from "./components/QuizLandingHumor";
import { QuizQuestionHumor } from "./components/QuizQuestionHumor";
import { QuizResultsHumor } from "./components/QuizResultsHumor";
import { quizMetadata } from "./components/QuizDataHumor";
import { loadPhishBaitContent, type EngineQuestion } from "@/lib/phishbait/content";

type QuizState = "landing" | "quiz" | "results";

type TimerText = {
  low_hints?: string[];
  bonus_messages?: string[];
  grace_messages?: string[];
};

export default function App() {
  const [questions, setQuestions] = useState<EngineQuestion[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [timerText, setTimerText] = useState<TimerText | null>(null);
  const [rankings, setRankings] = useState<{ tiers: Array<{ id: string; min_percent: number; titles: string[]; review?: string }> } | null>(null);
  const [quizState, setQuizState] = useState<QuizState>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    []
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quizMetadata.timeLimit);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [hasUsedExtraTime, setHasUsedExtraTime] = useState(false);
  const [inGracePeriod, setInGracePeriod] = useState(false);
  const [graceRemaining, setGraceRemaining] = useState(0);
  const [timerMessage, setTimerMessage] = useState<string | null>(null);
  const [lowHintMessage, setLowHintMessage] = useState<string | null>(null);
  const [resultSummary, setResultSummary] = useState<{
    percent: number;
    rankingTitle: string;
    reviewLine: string | null;
  } | null>(null);

  // Load YAML-driven content (questions, rankings, timer text, general text)
  useEffect(() => {
    let cancelled = false;

    loadPhishBaitContent()
      .then((content) => {
        if (cancelled) return;
        setQuestions(content.questions);
        setSelectedAnswers(new Array(content.questions.length).fill(null));
        setTimerText(content.timerText ?? null);
        setRankings(content.rankings ?? null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        setLoadError(msg);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pickRandom = (items?: string[]) => {
    if (!items || items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)];
  };

  const showExtraTimeButton =
    quizState === "quiz" &&
    !inGracePeriod &&
    !hasUsedExtraTime &&
    timeRemaining > 0 &&
    timeRemaining <= 30;

  // Keep the low-time hint stable (no flicker) while the button is visible
  useEffect(() => {
    if (!showExtraTimeButton) {
      setLowHintMessage(null);
      return;
    }
    setLowHintMessage((prev) => prev ?? pickRandom(timerText?.low_hints));
  }, [showExtraTimeButton, timerText]);

  // Timer effect
  useEffect(() => {
    if (quizState !== "quiz") return;

    const timer = setInterval(() => {
      if (inGracePeriod) {
        setGraceRemaining((prev) => {
          if (prev <= 1) {
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
        return;
      }

      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Enter grace period instead of instant-submit
          setInGracePeriod(true);
          setGraceRemaining(20);
          setTimerMessage(pickRandom(timerText?.grace_messages));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, inGracePeriod, timerText]);

  // Handle feedback display and auto-advance
  useEffect(() => {
    if (quizState !== "quiz") return;
    if (!questions) return;
    
    const currentAnswer = selectedAnswers[currentQuestionIndex];
    if (currentAnswer !== null && !showFeedback) {
      // Show feedback immediately
      setShowFeedback(true);
      
      // Wait longer before advancing (to read explanation)
      const timer = setTimeout(() => {
        setShowFeedback(false);
        
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // Last question answered - show results
          finishQuiz();
        }
      }, 5000); // 5 seconds to read feedback

      return () => clearTimeout(timer);
    }
  }, [selectedAnswers, currentQuestionIndex, quizState, showFeedback, questions]);

  // Persist missed questions for review/learning (last attempt)
  useEffect(() => {
    if (quizState !== "results" || !questions) return;
    const missed = questions
      .map((q, idx) => ({
        text: q.question,
        not_ready: q.notReady ?? null,
        missed: selectedAnswers[idx] !== q.correctAnswer,
      }))
      .filter((x) => x.missed)
      .map((x) => ({ text: x.text, not_ready: x.not_ready }));

    try {
      localStorage.setItem("phishbait_last_missed", JSON.stringify(missed));
    } catch {
      // ignore
    }
  }, [quizState, questions, selectedAnswers]);

  // Freeze result title/review (avoid re-randomizing on re-renders)
  useEffect(() => {
    if (quizState !== "results" || !questions) {
      setResultSummary(null);
      return;
    }
    setResultSummary((prev) => {
      if (prev) return prev;
      const { percent, title, reviewLine } = getRankingTitleAndReview();
      return { percent, rankingTitle: title, reviewLine };
    });
    // We intentionally don't depend on selectedAnswers here; answers won't change after results.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState, questions, rankings]);

  const startQuiz = () => {
    if (!questions) return;
    setQuizState("quiz");
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowFeedback(false);
    setTimeRemaining(quizMetadata.timeLimit);
    setQuizStartTime(Date.now());
    setHasUsedExtraTime(false);
    setInGracePeriod(false);
    setGraceRemaining(0);
    setTimerMessage(null);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer during feedback
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const finishQuiz = () => {
    setQuizState("results");
  };

  const restartQuiz = () => {
    setQuizState("landing");
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions?.length ?? 0).fill(null));
    setShowFeedback(false);
    setTimeRemaining(quizMetadata.timeLimit);
    setQuizStartTime(null);
    setHasUsedExtraTime(false);
    setInGracePeriod(false);
    setGraceRemaining(0);
    setTimerMessage(null);
    setResultSummary(null);
  };

  const calculateScore = () => {
    if (!questions) return 0;
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        return score + (questions[index]?.weight ?? 0);
      }
      return score;
    }, 0);
  };

  const calculateCorrectCount = () => {
    if (!questions) return 0;
    return selectedAnswers.reduce((count, answer, index) => {
      if (answer === questions[index]?.correctAnswer) return count + 1;
      return count;
    }, 0);
  };

  const calculateMaxPoints = () => {
    if (!questions) return 0;
    return questions.reduce((sum, q) => sum + (q.weight ?? 0), 0);
  };

  const calculateMissed = () => {
    if (!questions) return { missedCount: 0, missedNotReady: [] as string[] };
    const missedNotReady: string[] = [];
    let missedCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const a = selectedAnswers[i];
      if (a !== q.correctAnswer) {
        missedCount++;
        if (q.notReady) missedNotReady.push(q.notReady);
      }
    }
    return { missedCount, missedNotReady };
  };

  const formatTemplate = (template: string, vars: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));

  const getRankingTitleAndReview = () => {
    const maxPoints = calculateMaxPoints();
    const scorePoints = calculateScore();
    const percent = maxPoints > 0 ? Math.round((scorePoints / maxPoints) * 100) : 0;
    const { missedCount, missedNotReady } = calculateMissed();

    const tiers = rankings?.tiers ?? [];
    const sorted = [...tiers].sort((a, b) => b.min_percent - a.min_percent);
    const tier = sorted.find((t) => percent >= t.min_percent) ?? null;

    const title = tier?.titles?.length ? tier.titles[Math.floor(Math.random() * tier.titles.length)] : `Score: ${percent}%`;

    // Only show review when template exists and user isn't 0%/100% (and not in the lowest tier).
    const shouldReview =
      !!tier?.review &&
      missedCount > 0 &&
      missedCount < (questions?.length ?? 0) &&
      percent < 100 &&
      percent >= 65;

    if (!shouldReview) return { percent, title, reviewLine: null as string | null };

    const notReadyList =
      missedNotReady.length <= 3
        ? missedNotReady.join(" & ")
        : `${missedNotReady.slice(0, 3).join(" & ")} +${missedNotReady.length - 3} more`;

    const reviewLine = formatTemplate(tier!.review!, {
      title,
      missed: missedCount,
      not_ready_list: notReadyList,
    });

    return { percent, title, reviewLine };
  };

  const getTimeTaken = () => {
    if (!quizStartTime) return 0;
    const endTime = Date.now();
    return Math.floor((endTime - quizStartTime) / 1000);
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white border-2 border-red-200 rounded-2xl p-6 shadow-xl">
          <div className="font-bold text-red-700 mb-2">Failed to load quiz data</div>
          <div className="text-slate-700 text-sm break-words">{loadError}</div>
          <div className="text-slate-500 text-xs mt-4">
            Check that <code>/data/questions.yaml</code> is available under <code>app/public</code>.
          </div>
        </div>
      </div>
    );
  }

  if (!questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-xl">
          <div className="font-semibold text-slate-700 mb-2">Loading PhishBait…</div>
          <div className="text-slate-500 text-sm">Hooking the questions…</div>
        </div>
      </div>
    );
  }

  if (quizState === "landing") {
    return <QuizLandingHumor onStartQuiz={startQuiz} />;
  }

  if (quizState === "quiz") {
    const onAddExtraTime = () => {
      if (hasUsedExtraTime || inGracePeriod) return;
      setHasUsedExtraTime(true);
      setTimeRemaining((t) => t + 60);
      const msg = pickRandom(timerText?.bonus_messages);
      if (msg) {
        setTimerMessage(msg);
        window.setTimeout(() => {
          // Don't clear grace messages
          setTimerMessage((current) => (current === msg ? null : current));
        }, 4000);
      }
    };

    return (
      <QuizQuestionHumor
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        showFeedback={showFeedback}
        showExtraTimeButton={showExtraTimeButton}
        onAddExtraTime={onAddExtraTime}
        extraTimeHint={lowHintMessage}
        timerMessage={timerMessage}
        inGracePeriod={inGracePeriod}
        graceRemaining={graceRemaining}
      />
    );
  }

  const maxPoints = calculateMaxPoints();
  const scorePoints = calculateScore();
  const correctCount = calculateCorrectCount();
  const { missedCount } = calculateMissed();
  const percent = resultSummary?.percent ?? (maxPoints > 0 ? Math.round((scorePoints / maxPoints) * 100) : 0);
  const rankingTitle = resultSummary?.rankingTitle ?? `Score: ${percent}%`;
  const reviewLine = resultSummary?.reviewLine ?? null;

  return (
    <QuizResultsHumor
      score={scorePoints}
      maxPoints={maxPoints}
      correctCount={correctCount}
      missedCount={missedCount}
      percent={percent}
      rankingTitle={rankingTitle}
      reviewLine={reviewLine}
      totalQuestions={questions.length}
      timeTaken={getTimeTaken()}
      onRestart={restartQuiz}
      userAnswers={selectedAnswers}
      questions={questions}
    />
  );
}
