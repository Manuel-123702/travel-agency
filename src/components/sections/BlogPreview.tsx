"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { blogPreviewData as defaultBlogPreviewData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { blogPreviewQuery } from "@/sanity/queries/blogPreview";

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export default function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPreviewData as BlogPost[]);

  useEffect(() => {
    async function fetchBlogPreview() {
      try {
        const data = await client.fetch(blogPreviewQuery);
        if (data && data.length > 0) {
          // Transform Sanity data to match our format
          const transformedData: BlogPost[] = data.map((post: any) => ({
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            date: new Date(post.publishedAt).toLocaleDateString(),
            image: post.image,
            href: `/blog/${post.slug}`,
          }));
          setBlogPosts(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch blog preview:", error);
      }
    }
    fetchBlogPreview();
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



        {/* Header */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          mb-14
          gap-5
          "
        >

          <div>


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

              Latest Articles

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
              mt-3
              "
            >

              Immigration Insights

            </motion.h2>


          </div>




          <Link

            href="/blog"

            className="
            flex
            items-center
            gap-2
            text-blue-700
            font-semibold
            "
          >

            View all articles

            <ArrowRight size={16}/>

          </Link>



        </div>





        {/* Blog cards */}


        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >


          {
            blogPosts.map((post: BlogPost, index: number) => (


              <motion.article

                key={post.title}

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
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition-all
                "
              >



                <div
                  className="
                  h-56
                  overflow-hidden
                  "
                >

                  <img

                    src={post.image}

                    alt={post.title}

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
                    text-xs
                    text-blue-700
                    bg-blue-50
                    px-3
                    py-1
                    rounded-full
                    font-semibold
                    "
                  >

                    {post.category}

                  </span>



                  <h3
                    className="
                    mt-4
                    text-xl
                    font-heading
                    font-bold
                    text-navy
                    "
                  >

                    {post.title}

                  </h3>



                  <p
                    className="
                    mt-3
                    text-gray-600
                    text-sm
                    leading-relaxed
                    "
                  >

                    {post.excerpt}

                  </p>



                  <div
                    className="
                    mt-5
                    flex
                    justify-between
                    items-center
                    "
                  >

                    <span
                      className="
                      text-xs
                      text-gray-400
                      "
                    >

                      {post.date}

                    </span>



                    <Link

                      href={post.href}

                      className="
                      text-blue-700
                      text-sm
                      font-semibold
                      flex
                      items-center
                      gap-1
                      "
                    >

                      Read

                      <ArrowRight size={14}/>

                    </Link>


                  </div>


                </div>



              </motion.article>


            ))
          }


        </div>


      </div>


    </section>

  );
}