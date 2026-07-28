import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Default meta title for the website",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Default meta description for the website",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary with Large Image", value: "summary_large_image" },
        ],
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "robotsTxt",
      title: "Robots.txt Content",
      type: "text",
      description: "Custom robots.txt content",
    }),
  ],
});
