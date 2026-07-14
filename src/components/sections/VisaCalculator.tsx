"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, CheckCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { visaCalculatorData } from "@/data/home";


export default function VisaCalculator() {

  const [selectedCountry, setSelectedCountry] = useState(
    visaCalculatorData[0]
  );


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
        max-w-5xl
        mx-auto
        px-6
        "
      >


        <motion.div

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

          className="
          bg-[#F8FAFC]
          rounded-3xl
          p-8
          md:p-12
          "
        >



          <div
            className="
            text-center
            mb-10
            "
          >

            <div
              className="
              w-14
              h-14
              bg-gold
              rounded-2xl
              flex
              items-center
              justify-center
              mx-auto
              "
            >

              <Calculator
                className="text-navy"
              />

            </div>



            <h2
              className="
              section-title
              mt-5
              "
            >

              Visa Information Calculator

            </h2>


            <p
              className="
              text-gray-600
              mt-3
              "
            >

              Check estimated processing time and requirements.

            </p>


          </div>




          {/* Countries */}

          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            "
          >

            {
              visaCalculatorData.map(country=>(

                <button

                  key={country.country}

                  onClick={() =>
                    setSelectedCountry(country)
                  }

                  className={`
                  p-4
                  rounded-2xl
                  border
                  transition
                  ${
                    selectedCountry.country === country.country
                    ?
                    "border-gold bg-gold/10"
                    :
                    "border-gray-200 bg-white"
                  }
                  `}
                >

                  <div className="text-3xl">
                    {country.flag}
                  </div>

                  <p
                    className="
                    font-semibold
                    text-navy
                    mt-2
                    "
                  >

                    {country.country}

                  </p>


                </button>

              ))
            }

          </div>




          {/* Result */}


          <div
            className="
            mt-10
            bg-white
            rounded-3xl
            p-6
            "
          >

            <h3
              className="
              text-xl
              font-bold
              text-navy
              "
            >

              {selectedCountry.flag} {selectedCountry.country}

            </h3>



            <div
              className="
              flex
              items-center
              gap-3
              mt-4
              text-gray-600
              "
            >

              <Clock size={18}/>

              Processing:
              
              <span className="font-semibold">
                {selectedCountry.processingTime}
              </span>


            </div>




            <div className="mt-5">

              <p
                className="
                font-semibold
                text-navy
                mb-3
                "
              >

                Requirements

              </p>


              <ul
                className="
                space-y-3
                "
              >

                {
                  selectedCountry.requirements.map(item=>(

                    <li
                      key={item}
                      className="
                      flex
                      gap-2
                      items-center
                      text-gray-600
                      text-sm
                      "
                    >

                      <CheckCircle
                        size={16}
                        className="text-green-600"
                      />

                      {item}

                    </li>

                  ))
                }


              </ul>

            </div>


          </div>


        </motion.div>


      </div>


    </section>

  );

}