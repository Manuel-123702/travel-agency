import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroFeature",
  title: "Hero Feature",
  type: "object",
  icon: Star,

  fields: [
    defineField({
      name: "title",
      title: "Feature",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Lucide Icon",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});