"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { trustBadgesData } from "@/data/home";


export default function TrustBadges() {

  const {
    ref,
    inView
  } = useInView({
    triggerOnce:true,
    threshold:0.2
  });


  return (

    <section
      ref={ref}
      className="
      py-16
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
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          "
        >


          {
            trustBadgesData.map(
              (
                badge,
                index
              ) => (

              <motion.div

                key={badge.title}

                initial={{
                  opacity:0,
                  y:30
                }}

                animate={
                  inView
                  ?
                  {
                    opacity:1,
                    y:0
                  }
                  :
                  {}
                }

                transition={{
                  duration:0.5,
                  delay:index*0.1
                }}

                className="
                text-center
                bg-[#F8FAFC]
                rounded-3xl
                p-6
                hover:shadow-lg
                transition-all
                "
              >


                <div
                  className="
                  text-4xl
                  mb-4
                  "
                >

                  {badge.icon}

                </div>



                <h3
                  className="
                  font-heading
                  font-bold
                  text-navy
                  text-lg
                  "
                >

                  {badge.title}

                </h3>



                <p
                  className="
                  text-gray-500
                  text-sm
                  mt-2
                  leading-relaxed
                  "
                >

                  {badge.description}

                </p>


              </motion.div>

            ))
          }


        </div>


      </div>


    </section>

  );
}