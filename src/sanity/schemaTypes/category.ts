import { FolderOpen } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Blog Category",
  type: "document",
  icon: FolderOpen,

  fields: [
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "color",
      title: "Category Color",
      type: "string",
      initialValue: "#2563eb",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});