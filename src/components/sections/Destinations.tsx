"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { destinationsData as defaultDestinationsData } from "@/data/home";
import { useCountries } from "@/hooks/useWebsiteData";
import { client } from "@/sanity/lib/client";
import { destinationsQuery } from "@/sanity/queries/destinations";

type Destination = {
  flag?: string;
  country: string;
  tagline: string;
  image: string;
  color: string;
  opportunities?: Array<{
    label: string;
    value: string;
  }>;
  highlights?: string[];
  featured?: boolean;
  href?: string;
};

export default function Destinations() {
  const { countries: dynamicCountries, loading } = useCountries();
  const [destinations, setDestinations] = useState<Destination[]>(defaultDestinationsData);

  useEffect(() => {
    async function fetchDestinationsData() {
      try {
        const data = await client.fetch(destinationsQuery);
        if (data && data.length > 0) {
          setDestinations(data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations data:", error);
      }
    }
    fetchDestinationsData();
  }, []);

  const countriesToUse = dynamicCountries || destinations;

  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  return (

    <section
      ref={ref}
      id="destinations"
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

        <div className="text-center mb-16">


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
            inline-block
            text-blue-700
            font-semibold
            text-sm
            uppercase
            tracking-widest
            mb-4
            "
          >

            Destinations

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

            transition={{
              duration:0.6
            }}

            className="
            section-title
            mb-4
            "
          >

            Your Dream{" "}

            <span
              className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-blue-700
              to-navy
              "
            >

              Destinations

            </span>


          </motion.h2>




          <motion.p

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

            transition={{
              delay:0.2
            }}

            className="
            section-subtitle
            "
          >

            Discover international opportunities with expert
            immigration guidance.

          </motion.p>


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
            countriesToUse.map(
              (
                item: any,
                i
              ) => {
                // Handle both API response and hardcoded data formats
                const country = item.country || item.name || item;
                const name = item.name || item.country;
                const href = item.href || `/${item.slug || item.country?.toLowerCase()}`;
                const flag = item.flag;
                const tagline = item.tagline;
                const imageData = item.image;
                const colorData = item.color;
                const opportunitiesData = item.opportunities;
                const highlightsData = item.highlights;
                const featuredData = item.featured;

                return (
              <motion.div

                key={country}

                initial={{
                  opacity:0,
                  y:40,
                  scale: 0.95
                }}

                animate={
                  inView
                  ?
                  {
                    opacity:1,
                    y:0,
                    scale: 1
                  }
                  :
                  {}
                }

                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateX: 5
                }}

                transition={{
                  duration:0.6,
                  delay:i*0.15,
                  type: "spring",
                  stiffness: 100
                }}

                className={`
                group
                relative
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:shadow-2xl
                transition-all
                cursor-pointer
                ${
                  featuredData
                  ?
                  "ring-2 ring-gold ring-offset-2"
                  :
                  ""
                }
                `}
              >


                {
                  featuredData && (

                    <div
                      className="
                      absolute
                      top-5
                      right-5
                      z-20
                      bg-gold
                      text-navy
                      text-xs
                      font-bold
                      px-3
                      py-1
                      rounded-full
                      "
                    >

                      Most Popular

                    </div>

                  )
                }




                {/* Image */}


                <div
                  className="
                  relative
                  h-56
                  overflow-hidden
                  "
                >

                  <img
                    src={imageData}
                    alt={country}
                    className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                    "
                  />


                  <div
                    className={`
                    absolute
                    inset-0
                    bg-gradient-to-b
                    ${colorData}
                    `}
                  />


                  <div
                    className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-end
                    p-6
                    "
                  >

                    <div className="text-5xl mb-2">
                      {flag}
                    </div>


                    <h3
                      className="
                      font-heading
                      font-bold
                      text-3xl
                      text-white
                      "
                    >

                      {country}

                    </h3>


                    <p
                      className="
                      text-white/80
                      text-sm
                      "
                    >

                      {tagline}

                    </p>


                  </div>


                </div>





                {/* Content */}


                <div
                  className="
                  bg-white
                  p-6
                  "
                >



                  <div
                    className="
                    space-y-3
                    mb-5
                    "
                  >

                    {
                      opportunitiesData.map(
                        ({
                          icon: Icon,
                          label,
                          value
                        }: any) => (

                        <div
                          key={label}
                          className="
                          flex
                          items-center
                          gap-3
                          "
                        >

                          <div
                            className="
                            w-9
                            h-9
                            bg-blue-50
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            "
                          >

                            {typeof Icon === 'function' ? (
                              <Icon
                                size={16}
                                className="
                                text-blue-700
                                "
                              />
                            ) : (
                              <span className="text-blue-700 text-sm">✓</span>
                            )}

                          </div>


                          <div>

                            <p
                              className="
                              text-navy
                              font-semibold
                              text-sm
                              "
                            >

                              {label}

                            </p>


                            <p
                              className="
                              text-gray-500
                              text-xs
                              "
                            >

                              {value}

                            </p>


                          </div>


                        </div>

                      ))
                    }


                  </div>




                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                    mb-5
                    "
                  >

                    {
                      highlightsData.map((item: any)=>(
                        <span
                          key={item}
                          className="
                          text-xs
                          bg-blue-50
                          text-blue-700
                          px-3
                          py-1
                          rounded-full
                          font-medium
                          "
                        >

                          {item}

                        </span>
                      ))
                    }

                  </div>




                  <Link
                    href={href}
                    className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-navy
                    text-white
                    font-heading
                    font-semibold
                    py-3
                    rounded-full
                    hover:bg-blue-800
                    transition-all
                    "
                  >

                    Discover {country}


                    <ArrowRight size={15}/>


                  </Link>



                </div>



              </motion.div>


                );
              })
          }



        </div>



      </div>


    </section>

  );
}