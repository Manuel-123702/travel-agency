import { defineQuery } from 'next-sanity'

export const homepageQuery = defineQuery(`*[_type == "homepage"][0]{
  hero {
    badge,
    titleFirst,
    titleHighlight,
    titleLast,
    description,
    backgroundImage,
    successRate,
    successLabel,
    testimonial {
      avatar,
      text,
      author
    }
  },
  stats[] {
    number,
    suffix,
    label,
    sub,
    color
  },
  services[] {
    tag,
    title,
    description,
    features,
    color,
    href,
    featured
  },
  destinations[] {
    country,
    tagline,
    image,
    color,
    opportunities[] {
      label,
      value
    },
    highlights,
    featured
  }
}`)
