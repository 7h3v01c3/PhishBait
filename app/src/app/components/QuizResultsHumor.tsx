import { motion } from "motion/react";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";
import { quizMetadata, type QuizQuestion as QuizQuestionType } from "./QuizDataHumor";
import { Trophy, Skull, AlertTriangle, PartyPopper, Share2, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  score: number; // points
  maxPoints: number;
  correctCount: number;
  missedCount: number;
  percent: number;
  rankingTitle: string;
  reviewLine: string | null;
  totalQuestions: number;
  timeTaken: number;
  onRestart: () => void;
  userAnswers: (number | null)[];
  questions: QuizQuestionType[];
}

export function QuizResultsHumor({
  score,
  maxPoints,
  correctCount,
  missedCount,
  percent,
  rankingTitle,
  reviewLine,
  totalQuestions,
  timeTaken,
  onRestart,
  userAnswers,
  questions
}: QuizResultsProps) {
  
  const getScoreInfo = () => {
    if (percent === 100) return {
      title: "🏆 PERFECT SCORE! You're Unhookable!",
      subtitle: "Finley is proud! You've mastered crypto defense!",
      message: "You spotted every scam, avoided every trap, and protected every satoshi. You're ready for the crypto seas. Just remember: stay paranoid, stay safe!",
      emoji: "🎉",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      icon: Trophy,
      advice: "Keep this energy! The scammers evolve, so keep learning."
    };
    
    if (percent >= 80) return {
      title: "🎯 Crypto Veteran! Well Done!",
      subtitle: "You're swimming with the sharks—confidently!",
      message: "You caught most of the scams! A few tricky ones got past you, but overall you've got solid instincts. Review your mistakes and you'll be unstoppable.",
      emoji: "💪",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      icon: PartyPopper,
      advice: "Review the ones you missed—even pros get caught sometimes."
    };
    
    if (percent >= 60) return {
      title: "⚠️ Decent, But Still Vulnerable",
      subtitle: "You'd survive... but you'd lose money",
      message: "You know some basics, but the crypto world would eat you alive. You're making risky decisions that'll cost you. Time to level up your knowledge!",
      emoji: "😬",
      color: "from-orange-400 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      icon: AlertTriangle,
      advice: "Study the scam types you missed. Your wallet depends on it."
    };
    
    return {
      title: "🚨 DANGER ZONE! You're Fish Food!",
      subtitle: "Finley says: DO NOT invest real money yet!",
      message: "You're walking around with 'ROB ME' tattooed on your forehead. Scammers would eat you for breakfast, lunch, AND dinner. Please, PLEASE learn more before touching crypto!",
      emoji: "💀",
      color: "from-red-400 to-rose-500",
      bgColor: "from-red-50 to-rose-50",
      icon: Skull,
      advice: "Take this quiz again. Study each answer. Your future self will thank you."
    };
  };

  const scoreInfo = getScoreInfo();
  const Icon = scoreInfo.icon;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Find which scam types the user failed
  const failedScams = questions
    .map((q, index) => ({
      question: q,
      userAnswer: userAnswers[index],
      failed: userAnswers[index] !== q.correctAnswer
    }))
    .filter(item => item.failed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.8,
            type: "spring",
            bounce: 0.6
          }}
          className="flex justify-center mb-8"
        >
          <motion.img 
            src={phishbaitLogo} 
            alt="PhishBait Logo" 
            className="w-32 h-32 drop-shadow-2xl"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Results card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl border-4 border-slate-200 p-8 mb-6"
        >
          {/* Score display */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div className="relative">
                {/* Animated circle */}
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e2e8f0"
                    strokeWidth="16"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#scoreGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "552.9", strokeDashoffset: "552.9" }}
                    animate={{ 
                      strokeDashoffset: 552.9 - (552.9 * percent) / 100 
                    }}
                    transition={{ delay: 0.6, duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Score text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="text-7xl mb-1"
                  >
                    {scoreInfo.emoji}
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-5xl font-bold text-slate-700"
                  >
                    {percent}%
                  </motion.span>
                  <span className="text-sm text-slate-500 mt-1">
                    {correctCount}/{totalQuestions} correct • {score}/{maxPoints} pts
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <h2 className={`bg-gradient-to-r ${scoreInfo.color} bg-clip-text text-transparent mb-2`}>
                {rankingTitle}
              </h2>
              <h3 className="text-slate-600 mb-4">
                {scoreInfo.subtitle}
              </h3>
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className={`bg-gradient-to-r ${scoreInfo.bgColor} border-2 border-slate-200 rounded-2xl p-6 mb-6`}
          >
            <div className="flex items-start gap-4">
              <Icon className="w-8 h-8 flex-shrink-0 mt-1" style={{ 
                color: `${percent >= 80 ? '#10b981' : percent >= 60 ? '#f59e0b' : '#ef4444'}` 
              }} />
              <div>
                <p className="text-slate-800 leading-relaxed mb-3">
                  {scoreInfo.message}
                </p>
                <div className="bg-white/50 rounded-lg p-3 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700">
                    💡 {scoreInfo.advice}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review line (rankings.yaml template) */}
          {reviewLine && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.75 }}
              className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-6"
            >
              <div className="text-sm text-slate-700">
                {reviewLine}
              </div>
            </motion.div>
          )}

          {/* Missed count humor */}
          {missedCount > 0 && missedCount < totalQuestions && (
            <div className="text-center text-sm text-slate-600 mb-6">
              <em>Missed {missedCount} question(s)… that’s ~{missedCount * 4}x more ways to get wrecked. (Kidding. Kind Of.)</em>
            </div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-200">
              <div className="text-3xl font-bold text-green-700">{score}</div>
              <div className="text-sm text-green-600">Correct ✅</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border-2 border-red-200">
              <div className="text-3xl font-bold text-red-700">{totalQuestions - score}</div>
              <div className="text-sm text-red-600">Failed ❌</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center border-2 border-cyan-200">
              <div className="text-3xl font-bold text-cyan-700">{formatTime(timeTaken)}</div>
              <div className="text-sm text-cyan-600">Time ⏱️</div>
            </div>
          </motion.div>

          {/* Failed scams breakdown */}
          {failedScams.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 2 }}
              className="mb-6"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
                <h3 className="text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Scams You'd Fall For:
                </h3>
                <div className="space-y-2">
                  {failedScams.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg p-3 border border-red-200 text-sm"
                    >
                      <div className="font-semibold text-red-700 mb-1">
                        {item.question.scamType}
                      </div>
                      <div className="text-slate-600 text-xs">
                        {item.question.funnyWrongAnswer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-cyan-500 hover:from-orange-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl shadow-lg font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again & Learn More
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl shadow-lg border-2 border-slate-300 font-semibold"
            >
              <Share2 className="w-5 h-5" />
              Share Your Score
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="text-center space-y-3"
        >
          <p className="text-orange-700 font-medium">
            {quizMetadata.shareText}
          </p>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            {quizMetadata.footerCredit}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a 
              href="#" 
              className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
            >
              {quizMetadata.supportLink}
            </a>
            <span className="text-slate-300">•</span>
            <a 
              href="#" 
              className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
            >
              {quizMetadata.githubLink}
            </a>
          </div>
          <p className="text-slate-400 text-xs">
            Version {quizMetadata.version}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
