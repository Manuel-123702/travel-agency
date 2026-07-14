import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  icon: HomeIcon,

  fieldsets: [
    {
      name: "general",
      title: "General Information",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "titles",
      title: "Hero Titles",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "buttons",
      title: "Call To Actions",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "statistics",
      title: "Statistics",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "testimonial",
      title: "Client Testimonial",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "background",
      title: "Background",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      fieldset: "general",
      description: "Small badge displayed above the title.",
      validation: (Rule) => Rule.required(),
      initialValue: "#1 International Immigration Agency",
    }),

    defineField({
      name: "titleFirst",
      title: "First Title",
      type: "string",
      fieldset: "titles",
      validation: (Rule) => Rule.required(),
      initialValue: "Your Trusted Partner",
    }),

    defineField({
      name: "titleHighlight",
      title: "Highlighted Word",
      type: "string",
      fieldset: "titles",
      validation: (Rule) => Rule.required(),
      initialValue: "Succeed",
    }),

    defineField({
      name: "titleLast",
      title: "Last Title",
      type: "string",
      fieldset: "titles",
      validation: (Rule) => Rule.required(),
      initialValue: "Abroad",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      fieldset: "general",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "countries",
      title: "Destination Countries",
      type: "array",
      fieldset: "general",
      of: [
        {
          type: "heroCountry",
        },
      ],
    }),

    defineField({
      name: "features",
      title: "Hero Features",
      type: "array",
      fieldset: "general",
      of: [
        {
          type: "heroFeature",
        },
      ],
    }),
    defineField({
      name: "primaryButtonText",
      title: "Primary Button Text",
      type: "string",
      fieldset: "buttons",
      initialValue: "Book Consultation",
    }),

    defineField({
      name: "primaryButtonLink",
      title: "Primary Button Link",
      type: "string",
      fieldset: "buttons",
      initialValue: "/consultation",
    }),

    defineField({
      name: "secondaryButtonText",
      title: "Secondary Button Text",
      type: "string",
      fieldset: "buttons",
      initialValue: "Explore Destinations",
    }),

    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Link",
      type: "string",
      fieldset: "buttons",
      initialValue: "/destinations",
    }),

    defineField({
      name: "statistics",
      title: "Hero Statistics",
      type: "array",
      fieldset: "statistics",
      of: [
        {
          type: "heroStat",
        },
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      fieldset: "background",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "floatingFlags",
      title: "Floating Flags",
      type: "array",
      fieldset: "background",
      of: [
        {
          type: "heroFlag",
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Featured Testimonial",
      type: "object",
      fieldset: "testimonial",

      fields: [
        defineField({
          name: "author",
          title: "Author",
          type: "string",
        }),

        defineField({
          name: "text",
          title: "Message",
          type: "text",
          rows: 3,
        }),

        defineField({
          name: "avatar",
          title: "Avatar",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      fieldset: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
    }),
  ],

  preview: {
    select: {
      title: "titleFirst",
      subtitle: "badge",
      media: "backgroundImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      };
    },
  },
});
