import { defineQuery } from 'next-sanity'

export const servicesQuery = defineQuery(`*[_type == "service"] | order(order asc){
  title,
  tag,
  description,
  features,
  color,
  href,
  featured,
  image
}`)
