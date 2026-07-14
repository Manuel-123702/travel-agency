// src/lib/sanity/home.ts

import { client } from "@/sanity/lib/client";

export async function getHomePage() {
  return client.fetch(
    `{
      "hero": *[_type == "heroSection"][0]{
        badge,
        title,
        subtitle,
        backgroundImage{
          asset->{
            url
          }
        },
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
        successRate,
        successLabel,
        trustedSince
      },

      "services": *[_type == "service"] | order(order asc){
        _id,
        title,
        description,
        tag,
        featured,
        icon,
        color,
        href,
        features
      },

      "countries": *[_type == "countryContent"] | order(order asc){
        _id,
        country,
        slug,
        flag,
        tagline,
        featured,
        image{
          asset->{
            url
          }
        }
      },

      "pricing": *[_type == "pricingTier"] | order(order asc),

      "faqs": *[_type == "faq"] | order(order asc),

      "testimonials": *[_type == "testimonial"] | order(order asc),

      "posts": *[_type == "blogPost"] | order(publishedAt desc)[0...3],

      "settings": *[_type == "globalSettings"][0]
    }`
  );
}