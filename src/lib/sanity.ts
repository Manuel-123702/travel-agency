// lib/sanity.ts - Sanity CMS client configuration

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
    token: process.env.SANITY_API_TOKEN, // Only needed for write operations
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// ===== Sanity Query Helpers =====

export async function getSanityData(query: string, params: Record<string, any> = {}) {
    try {
        return await sanityClient.fetch(query, params);
    } catch (error) {
        console.error('Sanity query error:', error);
        throw error;
    }
}

// ===== Homepage Content =====

export async function getHomepageHero() {
    return getSanityData(`
    *[_type == "hero"][0] {
      _id,
      title,
      subtitle,
      cta_text,
      cta_link,
      background_image,
    }
  `);
}

export async function getHeroSlides() {
    return getSanityData(`
    *[_type == "heroSlide"] | order(order asc) {
      _id,
      title,
      subtitle,
      image,
      cta_text,
      cta_link,
    }
  `);
}

// ===== Services =====

export async function getServices() {
    return getSanityData(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      features[],
      image,
    }
  `);
}

// ===== Countries Content =====

export async function getCountriesContent() {
    return getSanityData(`
    *[_type == "countryContent"] | order(order asc) {
      _id,
      name,
      code,
      description,
      visa_types[],
      featured_image,
      universities,
      employers,
    }
  `);
}

// ===== Pricing =====

export async function getPricingTiers() {
    return getSanityData(`
    *[_type == "pricingTier"] | order(order asc) {
      _id,
      name,
      price_monthly,
      price_annual,
      description,
      features[],
      is_popular,
      cta_text,
    }
  `);
}

// ===== FAQ =====

export async function getFAQs(category?: string) {
    const query = category
        ? `*[_type == "faq" && category == "${category}"]`
        : '*[_type == "faq"]';

    return getSanityData(`
    ${query} | order(order asc) {
      _id,
      question,
      answer,
      category,
    }
  `);
}

export async function getFAQCategories() {
    return getSanityData(`
    array::unique(*[_type == "faq"].category)
  `);
}

// ===== Blog =====

export async function getBlogPosts(limit = 10) {
    return getSanityData(`
    *[_type == "post"] | order(_createdAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featured_image,
      author->{
        name,
        avatar,
      },
      _createdAt,
      category,
    }
  `);
}

export async function getBlogPostBySlug(slug: string) {
    return getSanityData(`
    *[_type == "post" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      author->{
        name,
        avatar,
        bio,
      },
      _createdAt,
      _updatedAt,
      category,
      related_posts[]->{
        _id,
        title,
        slug,
        featured_image,
      },
    }
  `);
}

export async function getBlogCategories() {
    return getSanityData(`
    array::unique(*[_type == "post"].category)
  `);
}

// ===== Testimonials =====

export async function getTestimonials(limit = 6) {
    return getSanityData(`
    *[_type == "testimonial"] | order(_createdAt desc)[0...${limit}] {
      _id,
      name,
      role,
      company,
      content,
      avatar,
      rating,
    }
  `);
}

// ===== Team Members =====

export async function getTeamMembers() {
    return getSanityData(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      bio,
      avatar,
      email,
      phone,
      social_links[],
    }
  `);
}

// ===== Global Settings =====

export async function getGlobalSettings() {
    return getSanityData(`
    *[_type == "globalSettings"][0] {
      _id,
      site_title,
      site_description,
      site_url,
      contact_email,
      contact_phone,
      office_address,
      office_hours,
      social_links,
      logo,
      favicon,
      meta_description,
      og_image,
    }
  `);
}

export async function getSocialLinks() {
    return getSanityData(`
    *[_type == "socialLinks"][0] {
      twitter,
      facebook,
      instagram,
      linkedin,
      youtube,
      whatsapp,
    }
  `);
}

// ===== Footer Content =====

export async function getFooterContent() {
    return getSanityData(`
    *[_type == "footer"][0] {
      _id,
      company_description,
      quick_links[],
      services_links[],
      resource_links[],
      legal_links[],
      contact_info,
    }
  `);
}

// ===== Navigation =====

export async function getNavigation() {
    return getSanityData(`
    *[_type == "navigation"][0] {
      _id,
      menu_items[]{
        label,
        url,
        submenu[]{
          label,
          url,
        },
      },
    }
  `);
}

// ===== Page Content =====

export async function getPageContent(slug: string) {
    return getSanityData(`
    *[_type == "page" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
      content,
      seo_title,
      seo_description,
      og_image,
      featured_image,
    }
  `);
}

export async function getAboutPage() {
    return getPageContent('about');
}

export async function getContactPage() {
    return getPageContent('contact');
}

// ===== Helper: Get localized content =====

export async function getLocalizedContent(contentType: string, locale: string) {
    return getSanityData(`
    *[_type == "${contentType}" && language == "${locale}"][0]
  `);
}

// ===== Search across content =====

export async function searchContent(query: string) {
    return getSanityData(`
    *[
      _type in ["post", "service", "faq"] &&
      (
        title match "${query}" ||
        content match "${query}" ||
        description match "${query}"
      )
    ] {
      _id,
      _type,
      title,
      excerpt,
      slug,
    }
  `);
}
