"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LANGUAGES: { code: Language; label: string; flag: string; native: string }[] = [
  { code: "en", label: "English",    flag: "🇬🇧", native: "English"    },
  { code: "fr", label: "French",     flag: "🇫🇷", native: "Français"   },
  { code: "es", label: "Spanish",    flag: "🇪🇸", native: "Español"    },
  { code: "ar", label: "Arabic",     flag: "🇸🇦", native: "العربية"    },
  { code: "pt", label: "Portuguese", flag: "🇧🇷", native: "Português"  },
  { code: "zh", label: "Chinese",    flag: "🇨🇳", native: "中文"        },
];

export default function LanguageSwitcher({ scrolled }: { scrolled?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          scrolled
            ? "text-navy hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
        aria-label="Select language"
      >
        <Globe size={14} className={scrolled ? "text-navy" : "text-white/80"} />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[190px] z-[100]"
          >
            <div className="px-3 pb-2 border-b border-gray-100 mb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Language</p>
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  language === lang.code ? "text-blue-700 font-semibold" : "text-navy"
                }`}
              >
                <span className="text-xl leading-none w-6 text-center">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.native}</span>
                <span className="text-gray-400 text-xs">{lang.label}</span>
                {language === lang.code && (
                  <Check size={13} className="text-blue-700 ml-auto flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
