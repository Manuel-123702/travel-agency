"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import { processData } from "@/data/home";


export default function Process() {

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


        <div
          className="
          text-center
          mb-16
          "
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

            Our Process

          </span>


          <h2
            className="
            section-title
            mt-4
            "
          >

            Simple Steps To Your Dream Destination

          </h2>


          <p
            className="
            section-subtitle
            mt-4
            "
          >

            A transparent and professional process from consultation to arrival.

          </p>


        </div>





        <div
          className="
          grid
          md:grid-cols-4
          gap-8
          relative
          "
        >


          {
            processData.map(
              (
                item,
                index
              ) => (


              <motion.div

                key={item.step}

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
                  delay:index*0.15
                }}

                className="
                relative
                text-center
                "
              >



                {/* Number */}

                <div
                  className="
                  w-16
                  h-16
                  mx-auto
                  rounded-full
                  bg-navy
                  text-gold
                  flex
                  items-center
                  justify-center
                  text-xl
                  font-black
                  shadow-lg
                  "
                >

                  {item.step}

                </div>

                {item.image && (
                  <div className="relative w-full h-32 mt-4 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}




                <h3
                  className="
                  mt-6
                  text-xl
                  font-heading
                  font-bold
                  text-navy
                  "
                >

                  {item.title}

                </h3>



                <p
                  className="
                  mt-3
                  text-gray-600
                  text-sm
                  leading-relaxed
                  "
                >

                  {item.description}

                </p>



                {
                  index !== processData.length - 1 && (
                    <div
                      className="
                      hidden
                      md:block
                      absolute
                      top-8
                      left-[65%]
                      w-full
                      h-px
                      bg-gray-200
                      "
                    />

                  )
                }



              </motion.div>


            ))
          }


        </div>


      </div>


    </section>

  );

}