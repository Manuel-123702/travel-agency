"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { newsletterData } from "@/data/home";


export default function NewsletterCTA() {

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
      py-24
      bg-navy
      relative
      overflow-hidden
      "
    >


      {/* Background decoration */}

      <div
        className="
        absolute
        top-0
        right-0
        w-96
        h-96
        bg-gold/20
        rounded-full
        blur-3xl
        "
      />



      <div
        className="
        relative
        z-10
        max-w-5xl
        mx-auto
        px-6
        text-center
        "
      >


        <motion.div

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

        >


          <div
            className="
            w-16
            h-16
            bg-gold
            rounded-2xl
            flex
            items-center
            justify-center
            mx-auto
            mb-6
            "
          >

            <Mail
              size={30}
              className="
              text-navy
              "
            />

          </div>



          <h2
            className="
            text-3xl
            md:text-5xl
            font-heading
            font-black
            text-white
            "
          >

            {newsletterData.title}

          </h2>



          <p
            className="
            text-white/70
            max-w-2xl
            mx-auto
            mt-5
            leading-relaxed
            "
          >

            {newsletterData.description}

          </p>




          <form

            className="
            mt-8
            flex
            flex-col
            md:flex-row
            gap-3
            max-w-xl
            mx-auto
            "

          >


            <input

              type="email"

              placeholder={
                newsletterData.placeholder
              }

              className="
              flex-1
              px-6
              py-4
              rounded-full
              outline-none
              text-navy
              "

            />



            <button

              type="submit"

              className="
              bg-gold
              text-navy
              px-8
              py-4
              rounded-full
              font-heading
              font-bold
              flex
              items-center
              justify-center
              gap-2
              hover:scale-105
              transition
              "

            >

              {newsletterData.buttonText}

              <ArrowRight size={16}/>

            </button>


          </form>



        </motion.div>


      </div>


    </section>

  );
}