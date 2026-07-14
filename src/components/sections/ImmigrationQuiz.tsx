"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { immigrationQuizData } from "@/data/home";

export default function ImmigrationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);

  const [completed, setCompleted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const question = immigrationQuizData.questions[currentQuestion];

  function selectAnswer(answer: string) {
    const updatedAnswers = [...answers, answer];

    setAnswers(updatedAnswers);

    if (currentQuestion < immigrationQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  }

  return (
    <section
      ref={ref}
      className="
      py-24
      bg-[#F8FAFC]
      "
    >
      <div
        className="
        max-w-4xl
        mx-auto
        px-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }

          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          md:p-12
          "
        >
          <div
            className="
            text-center
            mb-10
            "
          >
            <h2
              className="
              section-title
              "
            >
              {immigrationQuizData.title}
            </h2>

            <p
              className="
              text-gray-600
              mt-3
              "
            >
              {immigrationQuizData.description}
            </p>
          </div>

          {completed ? (
            <div
              className="
              text-center
              "
            >
              <CheckCircle
                size={60}
                className="
                text-green-600
                mx-auto
                "
              />

              <h3
                className="
                text-2xl
                font-bold
                text-navy
                mt-5
                "
              >
                Your evaluation is ready
              </h3>

              <p
                className="
                text-gray-600
                mt-3
                "
              >
                Our experts will analyze your profile and recommend the best
                option.
              </p>
            </div>
          ) : (
            <div>
              <p
                className="
                text-sm
                text-gray-400
                mb-5
                "
              >
                Question {currentQuestion + 1} of{" "}
                {immigrationQuizData.questions.length}
              </p>

              <h3
                className="
                text-xl
                font-bold
                text-navy
                mb-6
                "
              >
                {question.question}
              </h3>

              <div
                className="
                grid
                md:grid-cols-2
                gap-4
                "
              >
                {question.options.map((option) => (
                  <button
                    key={option}

                    onClick={() => selectAnswer(option)}

                    className="
                      border
                      border-gray-200
                      rounded-2xl
                      p-5
                      text-left
                      hover:border-gold
                      hover:bg-gold/10
                      transition
                      text-gray-700
                      "
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
