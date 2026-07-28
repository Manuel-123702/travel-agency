import { defineQuery } from 'next-sanity'

export const pricingQuery = defineQuery(`*[_type == "pricingTier"] | order(order asc){
  name,
  price,
  description,
  features,
  popular
}`)
