"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { faqData as defaultFaqData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { faqQuery } from "@/sanity/queries/faq";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqData);

  useEffect(() => {
    async function fetchFaqData() {
      try {
        const data = await client.fetch(faqQuery);
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQ data:", error);
      }
    }
    fetchFaqData();
  }, []);

  const [open, setOpen] = useState<number | null>(0);


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
        max-w-4xl
        mx-auto
        px-6
        "
      >



        {/* Heading */}

        <div
          className="
          text-center
          mb-14
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
            text-sm
            font-semibold
            uppercase
            tracking-widest
            "
          >

            FAQ

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

            Frequently Asked Questions

          </motion.h2>


        </div>




        {/* Questions */}


        <div
          className="
          space-y-4
          "
        >

          {
            faqs.map(
              (
                item,
                index: number
              ) => (

              <motion.div

                key={item.question}

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
                  delay:index*0.1
                }}

                className="
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                "
              >


                <button

                  onClick={() =>
                    setOpen(
                      open === index
                      ?
                      null
                      :
                      index
                    )
                  }

                  className="
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-4
                  p-6
                  text-left
                  "
                >


                  <span
                    className="
                    font-heading
                    font-semibold
                    text-navy
                    "
                  >

                    {item.question}

                  </span>



                  <ChevronDown

                    size={20}

                    className={`
                    text-blue-700
                    transition-transform
                    ${
                      open === index
                      ?
                      "rotate-180"
                      :
                      ""
                    }
                    `}

                  />


                </button>





                {
                  open === index && (

                    <div
                      className="
                      px-6
                      pb-6
                      text-gray-600
                      leading-relaxed
                      "
                    >

                      {item.answer}

                    </div>

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