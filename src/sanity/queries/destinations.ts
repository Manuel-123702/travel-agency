import { defineQuery } from 'next-sanity'

export const destinationsQuery = defineQuery(`*[_type == "country"] | order(featured desc, title asc){
  title,
  tagline,
  image,
  color,
  opportunities[] {
    label,
    value
  },
  highlights,
  featured
}`)
