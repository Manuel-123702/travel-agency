"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import { homeStats } from "@/data/home";
import { useWebsiteStats } from "@/hooks/useWebsiteData";


export default function Stats() {
  const { stats } = useWebsiteStats();

  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Use dynamic stats if available, otherwise fallback to hardcoded data
  const dynamicStats = stats ? [
    {
      icon: homeStats[0].icon,
      number: stats.totalApplications || 2500,
      suffix: homeStats[0].suffix,
      label: homeStats[0].label,
      sub: homeStats[0].sub,
      color: homeStats[0].color
    },
    {
      icon: homeStats[1].icon,
      number: stats.successRate || 97,
      suffix: "%",
      label: "Success Rate",
      sub: homeStats[1].sub,
      color: homeStats[1].color
    },
    {
      icon: homeStats[2].icon,
      number: stats.countries || 3,
      suffix: "",
      label: "Countries",
      sub: homeStats[2].sub,
      color: homeStats[2].color
    },
    {
      icon: homeStats[3].icon,
      number: stats.totalUsers || 1500,
      suffix: "+",
      label: "Happy Clients",
      sub: homeStats[3].sub,
      color: homeStats[3].color
    }
  ] : homeStats;


  return (
    <section
      ref={ref}
      className="
      py-20
      bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
      relative
      overflow-hidden
      "
    >

      {/* Background decorations */}

      <div className="absolute inset-0 opacity-10">

        <div
          className="
          absolute
          top-0
          left-1/4
          w-96
          h-96
          bg-blue-600
          rounded-full
          filter
          blur-3xl
          "
        />

        <div
          className="
          absolute
          bottom-0
          right-1/4
          w-96
          h-96
          bg-gold
          rounded-full
          filter
          blur-3xl
          "
        />

      </div>



      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        "
      >


        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >


          {
            dynamicStats.map(
              (
                {
                  icon: Icon,
                  number,
                  suffix,
                  label,
                  sub,
                  color
                },
                i
              ) => (

                <motion.div
                  key={label}

                  initial={{
                    opacity:0,
                    y:30,
                    scale: 0.9
                  }}

                  animate={
                    inView
                    ? {
                      opacity:1,
                      y:0,
                      scale: 1
                    }
                    : {}
                  }

                  whileHover={{
                    scale: 1.05,
                    y: -5
                  }}

                  transition={{
                    duration:0.6,
                    delay:i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}

                  className="
                  text-center
                  group
                  "
                >



                  <motion.div
                    className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    ${color}
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-5
                    shadow-lg
                    `}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.15
                    }}
                    transition={{
                      duration: 0.5
                    }}
                  >

                    <Icon
                      size={26}
                      className="text-white"
                    />

                  </motion.div>




                  <div
                    className="
                    font-heading
                    font-bold
                    text-4xl
                    md:text-5xl
                    text-white
                    mb-1
                    "
                  >

                    {
                      inView
                      ?
                      (
                        <CountUp
                          end={number}
                          duration={2.5}
                          separator=","
                        />
                      )
                      :
                      "0"
                    }


                    <span className="text-gold">
                      {suffix}
                    </span>


                  </div>




                  <p
                    className="
                    font-heading
                    font-semibold
                    text-white
                    mb-1
                    "
                  >

                    {label}

                  </p>



                  <p
                    className="
                    text-white/50
                    text-sm
                    "
                  >

                    {sub}

                  </p>



                </motion.div>

              )
            )
          }


        </div>


      </div>


    </section>
  );
}