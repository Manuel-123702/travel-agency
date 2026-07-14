import { Globe } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroCountry",
  title: "Hero Country",
  type: "object",
  icon: Globe,

  fields: [
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "flag",
      title: "Flag",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "url",
      title: "Link",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "flag",
    },
  },
});