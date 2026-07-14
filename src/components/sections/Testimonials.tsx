"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";

import { testimonialsData } from "@/data/home";


export default function Testimonials() {

  const {
    ref,
    inView
  } = useInView({
    triggerOnce:true,
    threshold:0.15
  });


  return (

    <section
      ref={ref}
      className="
      py-24
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


        {/* Header */}

        <div
          className="
          text-center
          mb-16
          "
        >

          <motion.span
            initial={{
              opacity:0
            }}
            animate={
              inView
              ?
              {opacity:1}
              :
              {}
            }
            className="
            text-blue-700
            font-semibold
            text-sm
            uppercase
            tracking-widest
            "
          >

            Testimonials

          </motion.span>


          <motion.h2

            initial={{
              opacity:0,
              y:20
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

            className="
            section-title
            mt-4
            "
          >

            What Our Clients Say

          </motion.h2>


        </div>





        {/* Cards */}

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >


          {
            testimonialsData.map(
              (
                {
                  name,
                  role,
                  country,
                  message,
                  rating,
                  avatar
                },
                index
              ) => (

              <motion.div

                key={name}

                initial={{
                  opacity:0,
                  y:40
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
                  delay:index*0.15
                }}

                className="
                bg-[#F8FAFC]
                rounded-3xl
                p-8
                shadow-sm
                hover:shadow-xl
                transition-all
                "
              >


                <div
                  className="
                  flex
                  gap-1
                  mb-5
                  "
                >

                  {
                    Array.from({
                      length:rating
                    }).map((_,i)=>(
                      <Star
                        key={i}
                        size={16}
                        className="
                        text-gold
                        fill-gold
                        "
                      />
                    ))
                  }

                </div>



                <p
                  className="
                  text-gray-600
                  leading-relaxed
                  mb-6
                  "
                >

                  "{message}"

                </p>



                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >


                  <div
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-navy
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    "
                  >

                    {avatar}

                  </div>



                  <div>

                    <h4
                      className="
                      font-heading
                      font-bold
                      text-navy
                      "
                    >

                      {name}

                    </h4>


                    <p
                      className="
                      text-sm
                      text-gray-500
                      "
                    >

                      {role} · {country}

                    </p>


                  </div>


                </div>


              </motion.div>

            ))
          }


        </div>


      </div>


    </section>

  );
}