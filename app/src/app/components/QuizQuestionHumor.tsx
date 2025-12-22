import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { QuizQuestion as QuizQuestionType, quizMetadata } from "./QuizDataHumor";
import phishbaitLogo from "@/assets/6a98b269b38aa42f00b0158773e4a25b19995fb7.png";
import { Fish, Shield, Wallet, Brain, Zap, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer: number | null;
  showFeedback: boolean;
  showExtraTimeButton: boolean;
  onAddExtraTime: () => void;
  extraTimeHint: string | null;
  timerMessage: string | null;
  inGracePeriod: boolean;
  graceRemaining: number;
}

const iconMap = {
  fish: Fish,
  shield: Shield,
  wallet: Wallet,
  brain: Brain,
  zap: Zap
};

export function QuizQuestionHumor({
  question,
  currentQuestion,
  totalQuestions,
  timeRemaining,
  onAnswer,
  selectedAnswer,
  showFeedback,
  showExtraTimeButton,
  onAddExtraTime,
  extraTimeHint,
  timerMessage,
  inGracePeriod,
  graceRemaining
}: QuizQuestionProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;
  const Icon = iconMap[question.icon];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={phishbaitLogo} 
              alt="PhishBait" 
              className="w-12 h-12 drop-shadow-md"
            />
            <div>
              <div className="text-xs text-slate-500">Crypto Survival Training</div>
              <div className="font-semibold text-slate-700">PhishBait Quiz</div>
            </div>
          </motion.div>
          
          <div className="flex flex-col items-end gap-2">
            {extraTimeHint && (
              <div className="text-xs text-slate-600 max-w-xs text-right">
                {extraTimeHint}
              </div>
            )}

            <div className="flex items-center gap-2">
              {showExtraTimeButton && (
                <button
                  type="button"
                  onClick={onAddExtraTime}
                  className="px-3 py-2 rounded-full text-xs font-bold bg-green-500 text-white border-2 border-green-600 shadow hover:bg-green-600 active:scale-[0.99] transition"
                >
                  +1 minute
                </button>
              )}

              <motion.div 
                className={`px-4 py-2 rounded-full font-mono font-semibold ${
                  inGracePeriod
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : timeRemaining < 60 
                      ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                      : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                }`}
                animate={{ 
                  scale: !inGracePeriod && timeRemaining < 60 && timeRemaining % 2 === 0 ? 1.05 : 1
                }}
              >
                ⏱️ {inGracePeriod ? `GRACE ${formatTime(graceRemaining)}` : formatTime(timeRemaining)}
              </motion.div>
            </div>

            {timerMessage && (
              <div className="text-xs text-slate-600 max-w-xs text-right">
                {timerMessage}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden border-2 border-slate-200 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-2xl border-4 border-slate-200 p-8 mb-6"
        >
          {/* Scam type badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-cyan-100 px-4 py-2 rounded-full border-2 border-orange-200">
              <Icon className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-slate-700">{question.scamType}</span>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <p className="text-slate-800 leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              const showCorrect = showFeedback && isCorrectAnswer;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.label
                  key={index}
                  whileHover={!showFeedback ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                  onHoverStart={() => !showFeedback && setHoveredOption(index)}
                  onHoverEnd={() => setHoveredOption(null)}
                  className={`
                    block p-5 rounded-2xl border-3 cursor-pointer transition-all duration-300
                    ${showCorrect 
                      ? 'border-green-500 bg-green-50 shadow-lg' 
                      : showWrong
                      ? 'border-red-500 bg-red-50 shadow-lg'
                      : isSelected 
                      ? 'border-orange-500 bg-orange-50 shadow-md' 
                      : hoveredOption === index
                      ? 'border-cyan-400 bg-cyan-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                    }
                    ${showFeedback ? 'cursor-default' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-6 h-6 rounded-full border-3 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all
                      ${showCorrect
                        ? 'border-green-500 bg-green-500'
                        : showWrong
                        ? 'border-red-500 bg-red-500'
                        : isSelected 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-slate-300 bg-white'
                      }
                    `}>
                      {showCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                      {showWrong && (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                      {!showFeedback && isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="quiz-answer"
                      value={index}
                      checked={isSelected}
                      onChange={() => !showFeedback && onAnswer(index)}
                      disabled={showFeedback}
                      className="sr-only"
                    />
                    <span className="flex-1 text-slate-700">
                      {option}
                    </span>
                  </div>
                </motion.label>
              );
            })}
          </div>

          {/* Feedback section */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Finley's reaction */}
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-16 h-16 rounded-full p-1 ${
                      isCorrect 
                        ? 'bg-gradient-to-br from-green-400 to-green-500' 
                        : 'bg-gradient-to-br from-red-400 to-red-500'
                    }`}>
                      <img 
                        src={phishbaitLogo} 
                        alt="Finley" 
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`rounded-2xl rounded-tl-none p-5 border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="font-bold text-green-700">Nice! You avoided the bait! 🎉</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="font-bold text-red-700">Yikes! You got hooked! 🎣</span>
                          </>
                        )}
                      </div>
                      
                      {!isCorrect && (
                        <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-3 rounded">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-900">
                              <strong>What would happen:</strong> {question.funnyWrongAnswer}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-slate-800 leading-relaxed">
                        <strong className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                          Why this matters:
                        </strong>{' '}
                        {question.explanation}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-slate-500"
        >
          <p>💡 Take your time—learning now saves money later!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
