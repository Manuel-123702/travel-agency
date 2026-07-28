"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useMemo, useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Star, Sparkles, Play } from "lucide-react";

import {
  heroFlags,
  heroFeatures,
  heroDestinations,
  heroContent as defaultHeroContent,
} from "@/data/home";
import { useWebsiteStats } from "@/hooks/useWebsiteData";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/queries/homepage";

export default function Hero() {
  const { stats } = useWebsiteStats();
  const [heroContent, setHeroContent] = useState(defaultHeroContent);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const data = await client.fetch(homepageQuery);
        if (data?.hero) {
          setHeroContent(data.hero);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    }
    fetchHeroData();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const particles = useMemo(
    () => [
      {
        id: 1,
        left: 10,
        top: 20,
        duration: 6,
        delay: 0,
        size: 1,
        opacity: 0.3,
      },
      {
        id: 2,
        left: 25,
        top: 70,
        duration: 5,
        delay: 1,
        size: 1.5,
        opacity: 0.5,
      },
      {
        id: 3,
        left: 40,
        top: 40,
        duration: 7,
        delay: 2,
        size: 1,
        opacity: 0.4,
      },
      {
        id: 4,
        left: 60,
        top: 15,
        duration: 6,
        delay: 0.5,
        size: 1.5,
        opacity: 0.6,
      },
      {
        id: 5,
        left: 75,
        top: 80,
        duration: 8,
        delay: 1.5,
        size: 1,
        opacity: 0.3,
      },
      {
        id: 6,
        left: 90,
        top: 30,
        duration: 5,
        delay: 2.2,
        size: 1.5,
        opacity: 0.5,
      },
    ],
    [],
  );

  return (
    <section
      ref={ref}
      className="relative isolate min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}

      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${heroContent.backgroundImage}')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/55 to-navy/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/10" />
      </motion.div>

      {/* Particles */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size * 3}px`,
              height: `${p.size * 3}px`,
              background: `rgba(245,158,11,${p.opacity})`,
            }}

            animate={{
              y: [-15, 15, -15],

              opacity: [0.2, 0.9, 0.2],
            }}

            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Flags */}

      {heroFlags.map(({ emoji, label, top, left, right, delay }) => (
        <motion.div
          key={label}
          animate={{
            y: [-6, 6, -6],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
            delay,
          }}

          className="
absolute z-10 pointer-events-none hidden xl:flex
items-center gap-1.5
bg-white/15 backdrop-blur-md
border border-white/25
rounded-2xl px-3 py-1.5
"
          style={{
            top,
            left,
            right,
          }}
        >
          <span className="text-lg">{emoji}</span>

          <span className="text-white text-xs font-semibold">{label}</span>
        </motion.div>
      ))}

      {/* Content */}

      <motion.div
        style={{ y: textY }}
        className="
relative z-10 max-w-7xl mx-auto
px-6 pt-36 pb-24 w-full
"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge */}

            <motion.div
              className="
inline-flex items-center gap-2
bg-gold/25 border border-gold/40
rounded-full px-4 py-2 mb-6
"
            >
              <Sparkles size={14} className="text-gold" />

              <span className="text-gold text-sm font-bold">
                {heroContent.badge}
              </span>
            </motion.div>

            {/* Title */}

            <motion.h1
              className="
font-heading font-black
text-4xl md:text-5xl lg:text-6xl
text-white leading-tight mb-6
"
            >
              {heroContent.titleFirst}
              <br />
              <span
                className="
text-transparent bg-clip-text
bg-gradient-to-r
from-gold via-yellow-300 to-gold
"
              >
                {heroContent.titleHighlight}
              </span>{" "}
              {heroContent.titleLast}
            </motion.h1>

            {/* Description */}

            <motion.p
              className="
text-white/80 text-lg
leading-relaxed mb-8 max-w-lg
"
            >
              {heroContent.description}
            </motion.p>

            {/* Features */}

            <div className="flex flex-wrap gap-4 mb-10">
              {heroFeatures.map((item) => (
                <div
                  key={item}
                  className="
flex items-center gap-2
bg-white/10 backdrop-blur-sm
border border-white/20
rounded-full px-3 py-1.5
"
                >
                  <CheckCircle size={14} className="text-gold" />

                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}

            <motion.div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="
relative overflow-hidden group
flex items-center gap-2
bg-gold text-navy
font-heading font-black
px-8 py-4 rounded-full
hover:shadow-2xl
hover:shadow-gold/50
transition-all
"
              >
                <span className="flex items-center gap-2">
                  Free Consultation
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>

                <motion.div
                  className="
absolute inset-0
bg-gradient-to-r
from-transparent via-white/30 to-transparent
skew-x-12
"
                  initial={{
                    x: "-150%",
                  }}
                  animate={{
                    x: "150%",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </Link>

              <Link
                href="/services"
                className="
flex items-center gap-2
border-2 border-white/50
text-white
font-heading font-bold
px-8 py-4 rounded-full
hover:bg-white
hover:text-navy
transition-all
"
              >
                <Play size={14} />
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* RIGHT CARD */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.9,
            }}

            className="hidden lg:block"
          >
            <div
              className="
relative
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
p-8
shadow-2xl
"
            >
              <div
                className="
absolute top-0 left-6 right-6
h-0.5
bg-gradient-to-r
from-transparent via-gold to-transparent
"
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
w-12 h-12
bg-gradient-to-br
from-gold to-yellow-500
rounded-2xl
flex items-center justify-center
"
                >
                  <Star className="text-navy" size={22} fill="currentColor" />
                </div>

                <div>
                  <p className="text-white font-black text-2xl">
                    {heroContent.successRate}
                  </p>

                  <p className="text-white/60 text-sm">
                    {heroContent.successLabel}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats ? [
                  { number: stats.totalApplications?.toLocaleString() || "2,500+", label: "Cases Processed" },
                  { number: stats.successRate + "%", label: "Success Rate" },
                  { number: stats.countries?.toString() || "3", label: "Destinations" },
                  { number: "24/7", label: "Client Support" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="
bg-white/10
rounded-2xl
p-4
text-center
"
                  >
                    <p
                      className="
font-heading font-black
text-2xl text-gold
"
                    >
                      {item.number}
                    </p>

                    <p
                      className="
text-white/60 text-xs
"
                    >
                      {item.label}
                    </p>
                  </div>
                )) : (
                  // Fallback to hardcoded stats while loading
                  [
                    { number: "2,500+", label: "Cases Processed" },
                    { number: "97%", label: "Success Rate" },
                    { number: "3", label: "Destinations" },
                    { number: "24/7", label: "Client Support" }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="
bg-white/10
rounded-2xl
p-4
text-center
"
                    >
                      <p
                        className="
font-heading font-black
text-2xl text-gold
"
                      >
                        {item.number}
                      </p>

                      <p
                        className="
text-white/60 text-xs
"
                      >
                        {item.label}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div
                className="
border-t border-white/10
pt-5
"
              >
                <p
                  className="
text-white/50
text-xs
mb-3
uppercase
tracking-wider
"
                >
                  Top Destinations
                </p>

                <div className="flex gap-2">
                  {heroDestinations.map((item) => (
                    <div
                      key={item.code}
                      className="
flex-1
bg-white/10
rounded-xl
py-3
text-center
"
                    >
                      <div className="text-base">{item.flag}</div>

                      <p
                        className="
text-white/70
text-xs
font-bold
"
                      >
                        {item.code}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial */}

            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
              }}

              className="
bg-white/15
backdrop-blur-xl
border border-white/25
rounded-2xl
p-4
mt-4 ml-8
flex items-center gap-3
"
            >
              <div
                className="
w-11 h-11
rounded-full
bg-blue-600
flex items-center justify-center
text-white
font-black
"
              >
                {heroContent.testimonial.avatar}
              </div>

              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={10} className="text-gold fill-gold" />
                  ))}
                </div>

                <p
                  className="
text-white/90
text-xs
"
                >
                  “{heroContent.testimonial.text}”
                </p>

                <p
                  className="
text-white/50
text-xs
mt-1
"
                >
                  {heroContent.testimonial.author}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}

      <motion.div
        className="
absolute bottom-8
left-1/2
-translate-x-1/2
z-10
"

        animate={{
          opacity: [0.4, 1, 0.4],
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <span
          className="
text-white/40
text-xs
uppercase
tracking-widest
"
        >
          Scroll
        </span>
      </motion.div>

      <div
        className="
absolute bottom-0
left-0 right-0
h-32
bg-gradient-to-t
from-white
to-transparent
z-10
"
      />
    </section>
  );
}
