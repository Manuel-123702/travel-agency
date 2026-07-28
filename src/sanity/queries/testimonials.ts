import { defineQuery } from 'next-sanity'

export const testimonialsQuery = defineQuery(`*[_type == "testimonial"] | order(order asc){
  name,
  role,
  country,
  message,
  rating,
  avatar
}`)
