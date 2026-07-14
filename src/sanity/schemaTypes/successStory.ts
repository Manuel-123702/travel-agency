import {defineField, defineType} from "sanity";
import {Award} from "lucide-react";

export default defineType({
  name: "successStory",
  title: "Success Story",
  type: "document",
  icon: Award,

  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "country",
      title: "Destination Country",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: "France", value: "France"},
          {title: "Canada", value: "Canada"},
          {title: "Germany", value: "Germany"},
          {title: "Luxembourg", value: "Luxembourg"},
          {title: "United Kingdom", value: "United Kingdom"},
          {title: "Australia", value: "Australia"},
        ],
      },
    }),

    defineField({
      name: "category",
      title: "Immigration Category",
      type: "string",
    }),

    defineField({
      name: "result",
      title: "Result",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "image",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "featured",
      title: "Featured Story",
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
      subtitle: "country",
      media: "image",
    },
  },
});