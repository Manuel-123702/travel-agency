import { Flag } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroFlag",
  title: "Floating Flag",
  type: "object",
  icon: Flag,

  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "flag",
      title: "Flag Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: "country",
      media: "flag",
    },
  },
});