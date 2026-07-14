"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

import { successStoriesData } from "@/data/home";


export default function SuccessStories() {

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
      bg-[#F8FAFC]
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >


        {/* Heading */}

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
              {
                opacity:1
              }
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

            Success Stories

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

            Real People.
            <span className="text-blue-700">
              Real Results.
            </span>

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
            successStoriesData.map(
              (
                {
                  name,
                  country,
                  category,
                  result,
                  description,
                  image
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
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition-all
                "
              >


                <div
                  className="
                  h-64
                  overflow-hidden
                  "
                >

                  <img
                    src={image}
                    alt={name}
                    className="
                    w-full
                    h-full
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-500
                    "
                  />

                </div>




                <div
                  className="
                  p-6
                  "
                >


                  <span
                    className="
                    inline-block
                    text-xs
                    bg-blue-50
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    font-semibold
                    mb-3
                    "
                  >

                    {category}

                  </span>



                  <h3
                    className="
                    text-xl
                    font-heading
                    font-bold
                    text-navy
                    "
                  >

                    {result}

                  </h3>



                  <p
                    className="
                    text-gray-600
                    text-sm
                    mt-3
                    leading-relaxed
                    "
                  >

                    {description}

                  </p>




                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    mt-6
                    "
                  >

                    <div>

                      <p
                        className="
                        font-semibold
                        text-navy
                        "
                      >

                        {name}

                      </p>


                      <p
                        className="
                        text-xs
                        text-gray-500
                        "
                      >

                        {country}

                      </p>

                    </div>




                    <ArrowRight
                      size={18}
                      className="
                      text-blue-700
                      "
                    />


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