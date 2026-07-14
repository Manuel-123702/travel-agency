"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import { homeStats } from "@/data/home";


export default function Stats() {

  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });


  return (
    <section
      ref={ref}
      className="
      py-20
      bg-navy
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
            homeStats.map(
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
                    y:30
                  }}

                  animate={
                    inView
                    ? {
                      opacity:1,
                      y:0
                    }
                    : {}
                  }

                  transition={{
                    duration:0.6,
                    delay:i * 0.1
                  }}

                  className="
                  text-center
                  group
                  "
                >



                  <div
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
                    group-hover:scale-110
                    transition-transform
                    shadow-lg
                    `}
                  >

                    <Icon
                      size={26}
                      className="text-white"
                    />

                  </div>




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