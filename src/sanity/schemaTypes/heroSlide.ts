import { Images } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  icon: Images,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "buttonText",
      title: "Primary Button Text",
      type: "string",
      initialValue: "Start Your Journey",
    }),

    defineField({
      name: "buttonLink",
      title: "Primary Button Link",
      type: "string",
      initialValue: "/consultation",
    }),

    defineField({
      name: "secondaryButtonText",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Learn More",
    }),

    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Link",
      type: "string",
      initialValue: "/services",
    }),

    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      initialValue: "Trusted Immigration Experts",
    }),

    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "badge",
      media: "image",
    },
  },
});