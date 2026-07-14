"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("ta-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "ta-cookie-consent",
      JSON.stringify({ essential: true, analytics: true, marketing: true })
    );
    setVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("ta-cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      "ta-cookie-consent",
      JSON.stringify({ essential: true, analytics: false, marketing: false })
    );
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-[9000] max-w-sm w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                  <Cookie size={16} className="text-gold" />
                </div>
                <span className="font-heading font-bold text-navy text-sm">
                  Cookie Settings
                </span>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                We use cookies to enhance your experience and analyze our
                traffic. By clicking &ldquo;Accept All&rdquo;, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-700 underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Cookie detail toggles */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 space-y-2"
                  >
                    {[
                      {
                        key: "essential" as const,
                        label: "Essential",
                        desc: "Required for the site to function",
                        locked: true,
                      },
                      {
                        key: "analytics" as const,
                        label: "Analytics",
                        desc: "Help us improve our website",
                        locked: false,
                      },
                      {
                        key: "marketing" as const,
                        label: "Marketing",
                        desc: "Personalized content and ads",
                        locked: false,
                      },
                    ].map(({ key, label, desc, locked }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <p className="text-navy text-xs font-semibold">{label}</p>
                          <p className="text-gray-400 text-xs">{desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            !locked &&
                            setPrefs((p) => ({ ...p, [key]: !p[key] }))
                          }
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            prefs[key] ? "bg-blue-600" : "bg-gray-300"
                          } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              prefs[key] ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-2">
                <button
                  onClick={acceptAll}
                  className="w-full py-2.5 bg-navy text-white font-heading font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Accept All
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={12} />
                    Customize
                  </button>
                  {showDetails ? (
                    <button
                      onClick={acceptSelected}
                      className="py-2 border border-blue-600 text-blue-700 font-semibold text-xs rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      Save Preferences
                    </button>
                  ) : (
                    <button
                      onClick={rejectAll}
                      className="py-2 border border-gray-200 text-gray-500 font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Reject All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
