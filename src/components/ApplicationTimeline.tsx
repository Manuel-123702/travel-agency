"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, FileText, Send, Calendar, UserCheck, Plane } from "lucide-react";

type TimelineStep = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  date?: string;
  icon: string;
};

type Props = {
  steps: TimelineStep[];
};

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={20} />,
  Send: <Send size={20} />,
  Clock: <Clock size={20} />,
  Calendar: <Calendar size={20} />,
  UserCheck: <UserCheck size={20} />,
  Check: <Check size={20} />,
  Plane: <Plane size={20} />,
};

export default function ApplicationTimeline({ steps }: Props) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-4 w-5 h-5 rounded-full border-4 flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : step.status === "in_progress"
                  ? "bg-gold border-gold animate-pulse"
                  : "bg-white border-gray-300"
              }`}
            >
              {step.status === "completed" && (
                <Check size={10} className="text-white" />
              )}
            </div>

            {/* Timeline content */}
            <div
              className={`p-4 rounded-xl border ${
                step.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : step.status === "in_progress"
                  ? "bg-gold/10 border-gold/30"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      step.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : step.status === "in_progress"
                        ? "bg-gold/20 text-gold"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {iconMap[step.icon] || <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy">{step.title}</h4>
                    {step.date && (
                      <p className="text-xs text-gray-500">{step.date}</p>
                    )}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : step.status === "in_progress"
                      ? "bg-gold/20 text-gold"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.status === "completed"
                    ? "Completed"
                    : step.status === "in_progress"
                    ? "In Progress"
                    : "Pending"}
                </span>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
