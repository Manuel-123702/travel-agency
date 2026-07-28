"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const defaultNotifications = [
  {
    name: "Amara K.",
    location: "Nigeria → France 🇫🇷",
    action: "just booked a free consultation",
    time: "2 min ago",
    avatar: "A",
    color: "bg-blue-600",
  },
  {
    name: "Marcus O.",
    location: "Ghana → Canada 🇨🇦",
    action: "started their Express Entry file",
    time: "5 min ago",
    avatar: "M",
    color: "bg-green-600",
  },
  {
    name: "Fatou D.",
    location: "Senegal → Luxembourg 🇱🇺",
    action: "received their EU Blue Card",
    time: "8 min ago",
    avatar: "F",
    color: "bg-purple-600",
  },
  {
    name: "Yusuf A.",
    location: "Morocco → France 🇫🇷",
    action: "just submitted their visa application",
    time: "12 min ago",
    avatar: "Y",
    color: "bg-orange-600",
  },
  {
    name: "Sophie M.",
    location: "Cameroon → Canada 🇨🇦",
    action: "got their study permit approved ✓",
    time: "15 min ago",
    avatar: "S",
    color: "bg-red-600",
  },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [notifications, setNotifications] = useState(defaultNotifications);

  useEffect(() => {
    async function fetchSocialProof() {
      try {
        const response = await fetch("/api/social-proof");
        if (response.ok) {
          const data = await response.json();
          if (data.notifications && data.notifications.length > 0) {
            setNotifications(data.notifications);
          }
        }
      } catch (error) {
        console.error("Failed to fetch social proof:", error);
      }
    }
    fetchSocialProof();
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const show = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(show);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % notifications.length);
        setVisible(true);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [visible, dismissed]);

  const notif = notifications[current];

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -60, y: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-24 left-6 z-[8000] max-w-xs w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-full ${notif.color} flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0`}
            >
              {notif.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-navy font-semibold text-sm">
                {notif.name}{" "}
                <span className="font-normal text-gray-500">
                  {notif.action}
                </span>
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{notif.location}</p>
              <p className="text-gray-300 text-xs mt-1">🕐 {notif.time}</p>
            </div>
            <button
              onClick={() => {
                setVisible(false);
                setDismissed(true);
              }}
              className="text-gray-300 hover:text-gray-500 flex-shrink-0 mt-0.5"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
