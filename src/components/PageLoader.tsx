"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, Plane, ArrowRight } from "lucide-react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-airplane-flying-over-clouds-3281-large.mkv"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
            />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Logo with glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.3)",
                  "0 0 40px rgba(212, 175, 55, 0.5)",
                  "0 0 20px rgba(212, 175, 55, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
              <Image
                src="/logo.png"
                alt="Travel Agency"
                width={120}
                height={120}
                className="relative object-contain brightness-0 invert"
                priority
              />
            </motion.div>

            {/* Brand name with animation */}
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-heading font-bold text-4xl md:text-5xl text-white tracking-wider"
              >
                TRAVEL <span className="text-gold">AGENCY</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/60 text-sm md:text-base tracking-wide"
              >
                Your Gateway to International Success
              </motion.p>
            </div>

            {/* Animated icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-6 text-gold/60"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Globe size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <Plane size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <ArrowRight size={24} />
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 300 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-[300px] space-y-3"
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>Loading experience</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-white/30 text-xs tracking-widest uppercase">
              France • Canada • Luxembourg
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
