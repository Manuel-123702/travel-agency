"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { servicesData as defaultServicesData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/queries/services";

type Service = {
  icon?: any;
  tag: string;
  title: string;
  desc: string;
  features: string[];
  color: string;
  featured?: boolean;
  href: string;
  image?: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServicesData);

  useEffect(() => {
    async function fetchServicesData() {
      try {
        const data = await client.fetch(servicesQuery);
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services data:", error);
      }
    }
    fetchServicesData();
  }, []);

  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });


  return (
    <section
      ref={ref}
      id="services"
      className="
      py-24
      bg-[#F8FAFC]
      relative
      overflow-hidden
      "
    >


      <div
        className="
        absolute
        top-0
        left-0
        w-full
        h-1
        bg-gradient-to-r
        from-navy
        via-blue-700
        to-gold
        "
      />



      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >



        {/* Header */}

        <div className="text-center mb-16">


          <motion.span

            initial={{
              opacity:0
            }}

            animate={
              inView
              ? {opacity:1}
              : {}
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

            Our Services

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
            mb-4
            "
          >

            Comprehensive Immigration{" "}

            <span
              className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-blue-700
              to-navy
              "
            >
              Solutions
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

            className="
            section-subtitle
            "
          >

            Tailored services for every type of immigration
            project, backed by expertise and personal guidance.

          </motion.p>


        </div>





        {/* Services Cards */}

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >


          {
            services.map(
              (
                {
                  icon: Icon,
                  tag,
                  title,
                  desc,
                  features,
                  color,
                  featured,
                  href,
                  image
                },
                i: number
              ) => (


                <motion.div

                  key={title}

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
                    duration:0.6,
                    delay:i*0.15
                  }}

                  className={`
                  relative
                  group
                  rounded-3xl
                  overflow-hidden
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  ${
                    featured
                    ?
                    "ring-2 ring-gold ring-offset-2"
                    :
                    ""
                  }
                  `}
                >



                  {
                    featured && (

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





                  {/* Header */}

                  <div
                    className={`
                    bg-gradient-to-br
                    ${color}
                    p-8
                    relative
                    `}
                  >



                    <span
                      className="
                      inline-block
                      bg-white/20
                      text-white
                      text-xs
                      font-semibold
                      px-3
                      py-1
                      rounded-full
                      mb-4
                      "
                    >

                      {tag}

                    </span>




                    {image ? (
                      <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="
                        w-14
                        h-14
                        bg-white/20
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        mb-4
                        "
                      >

                        <Icon
                          size={26}
                          className="text-white"
                        />

                      </div>
                    )}



                    <h3
                      className="
                      font-heading
                      font-bold
                      text-2xl
                      text-white
                      mb-2
                      "
                    >

                      {title}

                    </h3>




                    <p
                      className="
                      text-white/75
                      text-sm
                      leading-relaxed
                      "
                    >

                      {desc}

                    </p>



                  </div>





                  {/* Body */}

                  <div
                    className="
                    bg-white
                    p-8
                    flex
                    flex-col
                    "
                  >


                    <ul
                      className="
                      space-y-3
                      mb-8
                      flex-1
                      "
                    >

                      {
                        features.map((feature)=>(
                          <li
                            key={feature}
                            className="
                            flex
                            items-center
                            gap-3
                            "
                          >

                            <CheckCircle
                              size={15}
                              className="
                              text-blue-700
                              flex-shrink-0
                              "
                            />


                            <span
                              className="
                              text-gray-600
                              text-sm
                              "
                            >

                              {feature}

                            </span>


                          </li>
                        ))
                      }


                    </ul>





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
                      py-3.5
                      rounded-full
                      hover:bg-blue-800
                      transition-all
                      "
                    >

                      Learn More


                      <ArrowRight size={16}/>


                    </Link>


                  </div>



                </motion.div>

              )
            )
          }


        </div>


      </div>


    </section>
  );
}