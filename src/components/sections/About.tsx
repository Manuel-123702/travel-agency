"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { aboutData as defaultAboutData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/queries/about";

type AboutData = {
  badge: string;
  title: string;
  description: string;
  mission: string;
  vision: string;
  image: string;
  stats: Array<{
    number: string;
    label: string;
  }>;
};

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await client.fetch(aboutQuery);
        if (data) {
          setAboutData(data);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    }
    fetchAboutData();
  }, []);

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


        <div
          className="
          grid
          lg:grid-cols-2
          gap-14
          items-center
          "
        >



          {/* Image */}

          <motion.div

            initial={{
              opacity:0,
              x:-40
            }}

            animate={
              inView
              ?
              {
                opacity:1,
                x:0
              }
              :
              {}
            }

            className="
            relative
            "

          >

            <img

              src={aboutData.image}

              alt="Our agency team"

              className="
              rounded-3xl
              shadow-xl
              w-full
              h-[500px]
              object-cover
              "

            />


            <div
              className="
              absolute
              -bottom-6
              -right-6
              bg-gold
              text-navy
              rounded-2xl
              px-6
              py-4
              font-bold
              shadow-lg
              "
            >

              Trusted Since 2014

            </div>


          </motion.div>




          {/* Content */}

          <motion.div

            initial={{
              opacity:0,
              x:40
            }}

            animate={
              inView
              ?
              {
                opacity:1,
                x:0
              }
              :
              {}
            }

          >


            <span
              className="
              text-blue-700
              uppercase
              tracking-widest
              text-sm
              font-semibold
              "
            >

              {aboutData.badge}

            </span>



            <h2
              className="
              section-title
              mt-4
              "
            >

              {aboutData.title}

            </h2>




            <p
              className="
              text-gray-600
              mt-6
              leading-relaxed
              "
            >

              {aboutData.description}

            </p>



            <div
              className="
              mt-6
              space-y-4
              "
            >

              <div>

                <h3
                  className="
                  font-bold
                  text-navy
                  "
                >

                  Our Mission

                </h3>

                <p
                  className="
                  text-gray-500
                  text-sm
                  mt-1
                  "
                >

                  {aboutData.mission}

                </p>

              </div>



              <div>

                <h3
                  className="
                  font-bold
                  text-navy
                  "
                >

                  Our Vision

                </h3>

                <p
                  className="
                  text-gray-500
                  text-sm
                  mt-1
                  "
                >

                  {aboutData.vision}

                </p>

              </div>


            </div>





            {/* Stats */}

            <div
              className="
              grid
              grid-cols-3
              gap-4
              mt-10
              "
            >

              {
                aboutData.stats.map(
                  stat => (

                  <div
                    key={stat.label}
                    className="
                    text-center
                    bg-[#F8FAFC]
                    rounded-2xl
                    p-4
                    "
                  >

                    <p
                      className="
                      text-2xl
                      font-black
                      text-navy
                      "
                    >

                      {stat.number}

                    </p>


                    <p
                      className="
                      text-xs
                      text-gray-500
                      mt-1
                      "
                    >

                      {stat.label}

                    </p>


                  </div>

                ))
              }


            </div>



          </motion.div>



        </div>


      </div>


    </section>

  );

}