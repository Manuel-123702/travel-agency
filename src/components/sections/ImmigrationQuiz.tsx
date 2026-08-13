"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, RotateCcw, Sparkles, Award, ArrowLeft } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import { immigrationQuizData } from "@/data/home";

export default function ImmigrationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const totalQuestions = immigrationQuizData.questions.length;
  const question = immigrationQuizData.questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  function selectAnswer(answer: string) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  }

  function handlePrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#F8FAFC] via-blue-50/30 to-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-navy via-blue-600 to-gold" />

          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full mb-3 border border-blue-100">
              <Sparkles size={14} className="text-gold" /> Interactive Assessment
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy">
              {immigrationQuizData.title}
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              {immigrationQuizData.description}
            </p>
          </div>

          {!completed && (
            <div className="mb-8">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="text-blue-700 font-bold">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Quiz Content */}
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle size={48} />
                </div>

                <div className="inline-block bg-gold/10 border border-gold/30 rounded-2xl px-5 py-2 mb-4">
                  <span className="text-gold font-heading font-bold text-sm flex items-center gap-1.5">
                    <Award size={16} /> 96% Match Eligibility Profile Found
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-3">
                  Your Profile Evaluation is Complete!
                </h3>
                <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base leading-relaxed">
                  Based on your answers, you qualify for tailored visa pathways to <strong className="text-navy">{answers[1] || "your destination"}</strong>. Our certified immigration experts are ready to process your dossier.
                </p>

                {/* Selected Answers Summary Badge Grid */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 max-w-2xl mx-auto text-left grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">Target Goal</span>
                    <p className="text-navy font-bold text-sm truncate">{answers[0] || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">Destination</span>
                    <p className="text-navy font-bold text-sm truncate">{answers[1] || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">Education</span>
                    <p className="text-navy font-bold text-sm truncate">{answers[2] || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">Work Experience</span>
                    <p className="text-navy font-bold text-sm truncate">{answers[3] || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-navy text-white font-heading font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl flex items-center gap-2 text-base hover:scale-[1.02]"
                  >
                    Claim Free Full Assessment <ArrowRight size={18} />
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-4 bg-gray-100 text-gray-700 font-heading font-semibold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2 text-sm"
                  >
                    <RotateCcw size={16} /> Retake Assessment
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy mb-6">
                  {question.question}
                </h3>

                <div className="grid gap-3.5 mb-8">
                  {question.options.map((option) => {
                    const isSelected = answers[currentQuestion] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(option)}
                        className={`w-full p-4 sm:p-5 rounded-2xl text-left font-medium transition-all duration-200 flex items-center justify-between border ${
                          isSelected
                            ? "border-blue-700 bg-blue-50/80 text-blue-950 font-bold shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gold hover:bg-gold/5"
                        }`}
                      >
                        <span className="text-base">{option}</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                            isSelected
                              ? "border-blue-700 bg-blue-700 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && <CheckCircle size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                      currentQuestion === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-navy hover:bg-gray-100"
                    }`}
                  >
                    <ArrowLeft size={16} /> Previous Question
                  </button>
                  <span className="text-xs text-gray-400">
                    Question {currentQuestion + 1} / {totalQuestions}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
