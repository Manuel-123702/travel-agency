"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { pricingData } from "@/data/home";


export default function PricingSection() {

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
            uppercase
            text-sm
            font-semibold
            tracking-widest
            "
          >

            Pricing Plans

          </motion.span>



          <h2
            className="
            section-title
            mt-4
            "
          >

            Choose Your Immigration Support

          </h2>


        </div>




        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >

          {
            pricingData.map(
              (
                plan,
                index
              ) => (

              <motion.div

                key={plan.name}

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

                className={`
                rounded-3xl
                p-8
                border
                ${
                  plan.popular
                  ?
                  "border-gold shadow-xl"
                  :
                  "border-gray-200"
                }
                `}
              >


                {
                  plan.popular && (

                    <span
                      className="
                      inline-block
                      bg-gold
                      text-navy
                      px-4
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      mb-4
                      "
                    >

                      Most Popular

                    </span>

                  )
                }



                <h3
                  className="
                  text-2xl
                  font-heading
                  font-bold
                  text-navy
                  "
                >

                  {plan.name}

                </h3>



                <p
                  className="
                  text-gray-500
                  mt-2
                  text-sm
                  "
                >

                  {plan.description}

                </p>




                <div
                  className="
                  mt-6
                  text-4xl
                  font-bold
                  text-navy
                  "
                >

                  ${plan.price}

                </div>



                <ul
                  className="
                  mt-8
                  space-y-4
                  "
                >

                  {
                    plan.features.map(feature=>(

                      <li
                        key={feature}
                        className="
                        flex
                        gap-3
                        items-center
                        text-gray-600
                        text-sm
                        "
                      >

                        <Check
                          size={16}
                          className="
                          text-green-600
                          "
                        />

                        {feature}

                      </li>

                    ))
                  }


                </ul>


              </motion.div>

            ))
          }


        </div>


      </div>


    </section>

  );
}