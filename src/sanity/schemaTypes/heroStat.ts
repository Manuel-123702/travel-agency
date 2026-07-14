import { BarChart3 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroStat",
  title: "Hero Statistic",
  type: "object",
  icon: BarChart3,

  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "label",
      subtitle: "number",
    },
  },
});