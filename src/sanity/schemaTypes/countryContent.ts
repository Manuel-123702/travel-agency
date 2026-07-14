import { Globe } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "countryContent",
  title: "Country",
  type: "document",
  icon: Globe,

  fields: [
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "flag",
      title: "Flag",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "capital",
      title: "Capital",
      type: "string",
    }),

    defineField({
      name: "language",
      title: "Language",
      type: "string",
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),

    defineField({
      name: "averageTuition",
      title: "Average Tuition",
      type: "string",
    }),

    defineField({
      name: "averageLivingCost",
      title: "Average Living Cost",
      type: "string",
    }),

    defineField({
      name: "visaTypes",
      title: "Visa Types",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "topUniversities",
      title: "Top Universities",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "featured",
      title: "Featured Country",
      type: "boolean",
      initialValue: false,
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
      title: "name",
      media: "flag",
    },
  },
});