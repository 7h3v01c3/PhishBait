import { motion } from "motion/react";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";
import { quizMetadata, quizQuestions } from "./QuizData";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, timeTaken, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return {
      title: "🎉 Excellent! You're Phish-Proof!",
      message: "You've got the knowledge to navigate crypto safely. Keep staying vigilant!",
      color: "from-green-500 to-emerald-600"
    };
    if (percentage >= 70) return {
      title: "👍 Good Job! Almost There!",
      message: "You're doing well, but there's still room for improvement. Review the questions you missed.",
      color: "from-cyan-500 to-blue-600"
    };
    if (percentage >= 50) return {
      title: "⚠️ Proceed with Caution",
      message: "You have some knowledge, but you're vulnerable to scams. Study up before investing!",
      color: "from-orange-500 to-amber-600"
    };
    return {
      title: "🚨 High Risk! Learn More First",
      message: "The crypto world is dangerous for you right now. Take time to learn before you lose money!",
      color: "from-red-500 to-rose-600"
    };
  };

  const scoreInfo = getScoreMessage();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <img 
            src={phishbaitLogo} 
            alt="PhishBait Logo" 
            className="w-24 h-24 drop-shadow-lg"
          />
        </motion.div>

        {/* Results card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 mb-6"
        >
          {/* Score circle */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "439.8", strokeDashoffset: "439.8" }}
                  animate={{ 
                    strokeDashoffset: 439.8 - (439.8 * percentage) / 100 
                  }}
                  transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-4xl font-semibold text-slate-700"
                >
                  {percentage}%
                </motion.span>
                <span className="text-sm text-slate-500">
                  {score}/{totalQuestions} correct
                </span>
              </div>
            </motion.div>
          </div>

          {/* Result message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center mb-6"
          >
            <h2 className={`bg-gradient-to-r ${scoreInfo.color} bg-clip-text text-transparent mb-3`}>
              {scoreInfo.title}
            </h2>
            <p className="text-slate-600">
              {scoreInfo.message}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-8 mb-8 text-center"
          >
            <div>
              <div className="text-2xl font-semibold text-slate-700">{score}</div>
              <div className="text-sm text-slate-500">Correct</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <div className="text-2xl font-semibold text-slate-700">{totalQuestions - score}</div>
              <div className="text-sm text-slate-500">Wrong</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <div className="text-2xl font-semibold text-slate-700">{formatTime(timeTaken)}</div>
              <div className="text-sm text-slate-500">Time</div>
            </div>
          </motion.div>

          {/* Action button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Take Quiz Again
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center space-y-3"
        >
          <p className="text-orange-600">
            {quizMetadata.shareText}
          </p>
          <p className="text-slate-500 text-sm">
            {quizMetadata.footerText}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a 
              href="#" 
              className="text-orange-600 hover:text-orange-700 transition-colors"
            >
              {quizMetadata.supportLink}
            </a>
            <span className="text-slate-300">·</span>
            <a 
              href="#" 
              className="text-orange-600 hover:text-orange-700 transition-colors"
            >
              {quizMetadata.githubLink}
            </a>
          </div>
          <p className="text-slate-400 text-sm">
            Version {quizMetadata.version}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}