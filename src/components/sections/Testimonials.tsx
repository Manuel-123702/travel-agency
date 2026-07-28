"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { testimonialsData as defaultTestimonialsData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { testimonialsQuery } from "@/sanity/queries/testimonials";

type Testimonial = {
  name: string;
  role: string;
  country: string;
  message: string;
  rating: number;
  avatar: string;
  image?: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonialsData);

  useEffect(() => {
    async function fetchTestimonialsData() {
      try {
        const data = await client.fetch(testimonialsQuery);
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials data:", error);
      }
    }
    fetchTestimonialsData();
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
            testimonials.map(
              (
                {
                  name,
                  role,
                  country,
                  message,
                  rating,
                  avatar,
                  image
                },
                index: number
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


                  {image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
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
                  )}



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