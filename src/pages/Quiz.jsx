import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "../components/Navbar";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";
import { mockQuizQuestions } from "../data/mockData";

export default function Quiz() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const allQuestions = mockQuizQuestions[language] || mockQuizQuestions.ro;
    const categoryQuestions = allQuestions.filter((q) => q.category === category);
    setQuestions(categoryQuestions.length > 0 ? categoryQuestions : allQuestions.slice(0, 4));
  }, [category, language]);

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswers((prev) => [...prev, { questionId: questions[currentQuestion].id, isCorrect }]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 0 : 0);
      if (finalScore === questions.length) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#003399", "#fbbf24", "#22c55e"]
        });

        const badges = JSON.parse(localStorage.getItem("voxBadges") || "[]");
        if (!badges.includes("quiz-champion")) {
          badges.push("quiz-champion");
          localStorage.setItem("voxBadges", JSON.stringify(badges));
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { text: t("quiz.excellent"), emoji: "🏆" };
    if (percentage >= 70) return { text: t("quiz.good"), emoji: "👏" };
    return { text: t("quiz.needsWork"), emoji: "📚" };
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-surface-500 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div id="quiz-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="md" position="center" />
      <Navbar />

      <div className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="max-w-[2400px] mx-auto w-full">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8">
              <Link
                to="/education"
                className="inline-flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {language === "ro" ? "Înapoi la Educație" : "Retour à l'Éducation"}
              </Link>

              {quizComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-400/50 rounded-2xl border border-white/10 p-12 text-center"
                >
                  <span className="text-7xl mb-6 block">{getScoreMessage().emoji}</span>
                  <h2 className="font-display text-3xl font-medium text-white mb-4">
                    {getScoreMessage().text}
                  </h2>
                  <div className="mb-8">
                    <p className="text-5xl font-display font-medium text-gold-400 mb-2">
                      {score}/{questions.length}
                    </p>
                    <p className="text-xl font-extralight text-white/60">
                      {t("quiz.correct")}
                    </p>
                  </div>

                  {score === questions.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gold-500/20 rounded-xl p-6 mb-8 border border-gold-500/30"
                    >
                      <Trophy className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                      <p className="text-xl font-display font-medium text-gold-400">
                        {t("quiz.badge")}
                      </p>
                      <p className="text-lg font-extralight text-white/60 mt-2">
                        Quiz Champion 🏆
                      </p>
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRestart}
                      className="px-8 py-4 rounded-xl border border-white/20 text-white font-display font-medium text-lg flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      {t("quiz.tryAgain")}
                    </motion.button>
                    <Link to="/education">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-royal-700 to-royal-600 text-white font-display font-medium text-lg"
                      >
                        {language === "ro" ? "Continuă Învățarea" : "Continuer à Apprendre"}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-surface-400/50 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="bg-surface-300 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-extralight text-white/60">
                        {t("quiz.question")} {currentQuestion + 1} {t("quiz.of")} {questions.length}
                      </span>
                      <span className="text-lg font-extralight text-gold-400">
                        {score} {t("quiz.correct").toLowerCase()}
                      </span>
                    </div>
                    <div className="h-2 bg-surface-400 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-royal-600 to-gold-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h2 className="font-display text-2xl font-medium text-white mb-8">
                          {questions[currentQuestion].question}
                        </h2>

                        <div className="space-y-4">
                          {questions[currentQuestion].options.map((option, idx) => {
                            const isCorrect = idx === questions[currentQuestion].correct;
                            const isSelected = selectedAnswer === idx;
                            let buttonClass = "bg-surface-300 border-white/10 hover:border-royal-500";

                            if (showResult) {
                              if (isCorrect) {
                                buttonClass = "bg-green-500/20 border-green-500";
                              } else if (isSelected && !isCorrect) {
                                buttonClass = "bg-red-500/20 border-red-500";
                              } else {
                                buttonClass = "bg-surface-300 border-white/10 opacity-50";
                              }
                            } else if (isSelected) {
                              buttonClass = "bg-royal-700/30 border-royal-500";
                            }

                            return (
                              <motion.button
                                key={idx}
                                whileHover={!showResult ? { scale: 1.01 } : {}}
                                whileTap={!showResult ? { scale: 0.99 } : {}}
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={`w-full p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${buttonClass}`}
                              >
                                <span
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium ${
                                    showResult && isCorrect
                                      ? "bg-green-500 text-white"
                                      : showResult && isSelected && !isCorrect
                                      ? "bg-red-500 text-white"
                                      : "bg-surface-200 text-white/60"
                                  }`}
                                >
                                  {showResult && isCorrect ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : showResult && isSelected && !isCorrect ? (
                                    <XCircle className="w-5 h-5" />
                                  ) : (
                                    String.fromCharCode(65 + idx)
                                  )}
                                </span>
                                <span className="text-lg font-extralight text-white">{option}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 flex justify-end"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNext}
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-lg"
                        >
                          {currentQuestion < questions.length - 1 ? t("quiz.next") : t("quiz.finish")}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
