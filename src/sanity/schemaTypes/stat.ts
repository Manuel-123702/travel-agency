import { BarChart3 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Statistics",
  type: "document",
  icon: BarChart3,

  fields: [
    defineField({
      name: "label",
      title: "Statistic Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "number",
      title: "Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "Example: +, %, /7",
    }),

    defineField({
      name: "sub",
      title: "Small Description",
      type: "string",
    }),

    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      description:
        "Example: FileCheck, TrendingUp, Clock, Headphones",
    }),

    defineField({
      name: "gradientFrom",
      title: "Gradient From",
      type: "string",
      initialValue: "blue-500",
    }),

    defineField({
      name: "gradientTo",
      title: "Gradient To",
      type: "string",
      initialValue: "blue-700",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),

    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "label",
      subtitle: "number",
    },
  },
});