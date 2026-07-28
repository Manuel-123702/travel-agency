import { defineQuery } from 'next-sanity'

export const faqQuery = defineQuery(`*[_type == "faq"] | order(order asc){
  question,
  answer
}`)
