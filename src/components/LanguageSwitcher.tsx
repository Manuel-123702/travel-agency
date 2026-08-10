"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { locales, localeLabels, type Locale, defaultLocale } from "@/i18n/config";

export default function LanguageSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("preferredLocale") : null;
    const browser = typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : defaultLocale;
    const detected: Locale = locales.includes(saved as Locale)
      ? saved as Locale
      : locales.includes(browser as Locale)
        ? browser as Locale
        : defaultLocale;
    setCurrentLocale(detected);
  }, []);

  const changeLocale = (locale: Locale) => {
    setCurrentLocale(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLocale", locale);
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setOpen(false);
    
    // Navigate to the locale-prefixed version of current path
    const segments = pathname.split('/').filter(Boolean);
    const currentLocaleInPath = segments[0];
    
    let newPath: string;
    if (locales.includes(currentLocaleInPath as Locale)) {
      // Replace current locale with new locale
      segments[0] = locale;
      newPath = '/' + segments.join('/');
    } else {
      // Add locale prefix
      newPath = '/' + locale + '/' + segments.join('/');
    }
    
    router.push(newPath);
  };

  const current = localeLabels[currentLocale];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
          scrolled
            ? "text-navy hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
      >
        <Globe size={14} />
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-1.5 min-w-[150px] z-50 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            {locales.map((loc) => {
              const info = localeLabels[loc];
              const active = currentLocale === loc;
              return (
                <button
                  key={loc}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => changeLocale(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                    active
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-navy hover:text-blue-600"
                  }`}
                >
                  <span className="text-lg">{info.flag}</span>
                  <span className="flex-1 text-left">{info.native}</span>
                  {active && (
                    <motion.span
                      layoutId="lang-check"
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
