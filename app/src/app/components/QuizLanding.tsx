import { motion } from "motion/react";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";
import { quizMetadata } from "./QuizData";

interface QuizLandingProps {
  onStartQuiz: () => void;
}

export function QuizLanding({ onStartQuiz }: QuizLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
            className="w-32 h-32 drop-shadow-lg"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6 text-slate-700"
        >
          {quizMetadata.title}
        </motion.h1>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8 mb-6"
        >
          <h2 className="text-center mb-6">
            {quizMetadata.subtitle}
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-center">
              {quizMetadata.warning}
            </p>
            <p className="text-center text-slate-600">
              {quizMetadata.subwarning}
            </p>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Start the Quiz!
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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