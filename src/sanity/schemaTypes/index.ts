import { type SchemaTypeDefinition } from 'sanity'
import about from './about'
import category from './category'
import countryContent from './countryContent'
import destination from './destination'
import faq from './faq'
import footer from './footer'
import globalSettings from './globalSettings'
import hero from './hero'
import heroCountry from './heroCountry'
import heroFeature from './heroFeature'
import heroFlag from './heroFlag'
import heroSlide from './heroSlide'
import heroStat from './heroStat'
import navigation from './navigation'
import page from './page'
import post from './post'
import pricingTier from './pricingTier'
import process from './process'
import service from './service'
import socialLinks from './socialLinks'
import stat from './stat'
import successStory from './successStory'
import teamMember from './teamMember'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    about,
    category,
    countryContent,
    destination,
    faq,
    footer,
    globalSettings,
    hero,
    heroCountry,
    heroFeature,
    heroFlag,
    heroSlide,
    heroStat,
    navigation,
    page,
    post,
    pricingTier,
    process,
    service,
    socialLinks,
    stat,
    successStory,
    teamMember,
    testimonial,
  ],
}
