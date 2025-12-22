import { motion } from "motion/react";
import { useState } from "react";
import { QuizQuestion as QuizQuestionType, quizMetadata } from "./QuizData";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer: number | null;
}

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  timeRemaining,
  onAnswer,
  selectedAnswer
}: QuizQuestionProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.img 
            src={phishbaitLogo} 
            alt="PhishBait" 
            className="w-20 h-20 mx-auto mb-4 drop-shadow-md"
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          />
          <h2 className="text-slate-700 mb-2">
            {quizMetadata.title}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-slate-600">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <motion.span 
              className="font-mono"
              animate={{ 
                color: timeRemaining < 60 ? '#ef4444' : '#f97316' 
              }}
            >
              Time Left: {formatTime(timeRemaining)}
            </motion.span>
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8 mb-6"
        >
          <p className="mb-6">
            {question.question}
          </p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.label
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onHoverStart={() => setHoveredOption(index)}
                onHoverEnd={() => setHoveredOption(null)}
                className={`
                  block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${selectedAnswer === index 
                    ? 'border-orange-500 bg-orange-50/50' 
                    : hoveredOption === index
                    ? 'border-slate-300 bg-slate-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all
                    ${selectedAnswer === index 
                      ? 'border-orange-500 bg-orange-500' 
                      : 'border-slate-300'
                    }
                  `}>
                    {selectedAnswer === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="quiz-answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => onAnswer(index)}
                    className="sr-only"
                  />
                  <span className="flex-1 text-slate-700">
                    {option}
                  </span>
                </div>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <p className="text-orange-600 text-sm">
            {quizMetadata.shareText}
          </p>
          <p className="text-slate-500 text-xs">
            {quizMetadata.footerText}
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <a href="#" className="text-orange-600 hover:text-orange-700">
              {quizMetadata.supportLink}
            </a>
            <span className="text-slate-300">·</span>
            <a href="#" className="text-orange-600 hover:text-orange-700">
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