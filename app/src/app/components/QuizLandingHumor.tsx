import { motion } from "motion/react";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";
import { quizMetadata } from "./QuizDataHumor";
import { Fish, ShieldAlert, Brain } from "lucide-react";

interface QuizLandingProps {
  onStartQuiz: () => void;
}

export function QuizLandingHumor({ onStartQuiz }: QuizLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-orange-200 opacity-20"
        >
          <Fish className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 text-cyan-200 opacity-20"
        >
          <Fish className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 right-1/4 text-purple-200 opacity-10"
        >
          <ShieldAlert className="w-40 h-40" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Logo with bounce */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.8,
            type: "spring",
            bounce: 0.6
          }}
          className="flex justify-center mb-6"
        >
          <motion.img 
            src={phishbaitLogo} 
            alt="PhishBait Logo" 
            className="w-40 h-40 drop-shadow-2xl"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="bg-gradient-to-r from-orange-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {quizMetadata.title}
          </h1>
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            {quizMetadata.subtitle}
          </div>
        </motion.div>

        {/* Main card with Finley's greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl border-4 border-orange-200 p-8 mb-6 relative"
        >
          {/* Speech bubble pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-l-4 border-t-4 border-orange-200 rotate-45" />
          
          {/* Mascot intro */}
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 p-1">
                <img 
                  src={phishbaitLogo} 
                  alt="Finley" 
                  className="w-full h-full rounded-full"
                />
              </div>
            </motion.div>
            <div className="flex-1">
              <div className="bg-orange-50 rounded-2xl rounded-tl-none p-5 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-orange-700">Finley the PhishBait Fish</span>
                  <span className="text-sm">🐟</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {quizMetadata.mascotGreeting}
                </p>
              </div>
            </div>
          </div>

          {/* Warning box */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-5 mb-6"
          >
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-700 mb-2">
                  {quizMetadata.warning}
                </h3>
                <p className="text-red-900/80">
                  {quizMetadata.warningText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border-2 border-orange-200"
            >
              <Fish className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="font-semibold text-slate-800 mb-1">10 Real Scams</div>
              <div className="text-sm text-slate-600">Learn from actual crypto disasters</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 text-center border-2 border-cyan-200"
            >
              <Brain className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <div className="font-semibold text-slate-800 mb-1">Instant Feedback</div>
              <div className="text-sm text-slate-600">See why you're right (or hilariously wrong)</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border-2 border-purple-200"
            >
              <ShieldAlert className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold text-slate-800 mb-1">5 Min Challenge</div>
              <div className="text-sm text-slate-600">Beat the clock & avoid the bait</div>
            </motion.div>
          </div>

          {/* Start button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-cyan-500 hover:from-orange-600 hover:to-cyan-600 text-white px-12 py-4 rounded-2xl shadow-xl text-xl font-semibold">
                🎣 Start the Challenge!
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
