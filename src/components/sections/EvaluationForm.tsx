"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { evaluationFormData } from "@/data/home";

export default function EvaluationForm() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit evaluation");
      }
    } catch (error) {
      alert("Failed to submit evaluation. Please try again.");
    } finally {
      setLoading(false);
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
        max-w-5xl
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
          shadow-xl
          p-8
          md:p-12
          "
        >
          {submitted ? (
            <div
              className="
              text-center
              py-10
              "
            >
              <h3
                className="
                text-3xl
                font-bold
                text-navy
                "
              >
                Thank you!
              </h3>

              <p
                className="
                text-gray-600
                mt-3
                "
              >
                Our team will review your information and contact you soon.
              </p>
            </div>
          ) : (
            <>
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
                  {evaluationFormData.title}
                </h2>

                <p
                  className="
                  text-gray-600
                  mt-3
                  "
                >
                  {evaluationFormData.description}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="
                grid
                md:grid-cols-2
                gap-6
                "
              >
                {evaluationFormData.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      className="
                        block
                        text-sm
                        font-semibold
                        text-navy
                        mb-2
                        "
                    >
                      {field.label}
                    </label>

                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="
                        w-full
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:border-gold
                        bg-white
                        "
                      >
                        <option value="">Select destination</option>
                        {field.options?.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="
                        w-full
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:border-gold
                        "
                      />
                    )}
                  </div>
                ))}

                <div
                  className="
                  md:col-span-2
                  "
                >
                  <label
                    className="
                    block
                    text-sm
                    font-semibold
                    text-navy
                    mb-2
                    "
                  >
                    Immigration Goal
                  </label>

                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                    "
                  >
                    <option value="">Select immigration goal</option>
                    {evaluationFormData.projectTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                  md:col-span-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-navy
                  text-white
                  py-4
                  rounded-full
                  font-bold
                  hover:bg-blue-800
                  transition
                  disabled:opacity-70
                  "
                >
                  {loading ? "Submitting..." : "Submit Evaluation"}
                  {!loading && <Send size={18} />}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
