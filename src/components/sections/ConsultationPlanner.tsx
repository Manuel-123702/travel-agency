"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { consultationPlannerData } from "@/data/home";
import Link from "next/link";

export default function ConsultationPlanner() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      ref={ref}
      className="
      py-24
      bg-white
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >
        <div
          className="
          text-center
          mb-14
          "
        >
          <span
            className="
            text-blue-700
            uppercase
            text-sm
            tracking-widest
            font-semibold
            "
          >
            Consultation
          </span>

          <h2
            className="
            section-title
            mt-4
            "
          >
            {consultationPlannerData.title}
          </h2>

          <p
            className="
            text-gray-600
            mt-4
            "
          >
            {consultationPlannerData.description}
          </p>
        </div>

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >
          {consultationPlannerData.options.map((item, index) => (
            <motion.div
              key={item.title}

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

              transition={{
                delay: index * 0.15,
              }}

              className="
                bg-[#F8FAFC]
                rounded-3xl
                p-8
                hover:shadow-xl
                transition
                "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gold
                  flex
                  items-center
                  justify-center
                  "
              >
                <Calendar className="text-navy" />
              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-heading
                  font-bold
                  text-navy
                  "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-3
                  text-gray-600
                  text-sm
                  leading-relaxed
                  "
              >
                {item.description}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-5
                  text-sm
                  text-gray-500
                  "
              >
                <Clock size={16} />

                {item.duration}
              </div>

              <Link
                href="/dashboard/appointments"

                className="
                  block
                  text-center
                  mt-6
                  bg-navy
                  text-white
                  py-3
                  rounded-full
                  font-semibold
                  hover:bg-blue-800
                  transition
                  "
              >
                Book Consultation
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
