import { Route } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "process",
  title: "Immigration Process",
  type: "document",
  icon: Route,

  fields: [
    defineField({
      name: "step",
      title: "Step Number",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Example: 01, 02, 03...",
    }),

    defineField({
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      description:
        "Example: Phone, Search, FileCheck, Plane",
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
      title: "title",
      subtitle: "step",
    },
  },
});