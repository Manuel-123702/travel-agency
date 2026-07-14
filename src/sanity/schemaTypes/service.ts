import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Briefcase,

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Example: Student, Professional, Visitor",
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
        "GraduationCap, Briefcase, Plane, Globe, BookOpen...",
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "href",
      title: "Button Link",
      type: "string",
      initialValue: "/services",
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Learn More",
    }),

    defineField({
      name: "gradientFrom",
      title: "Gradient From",
      type: "string",
      initialValue: "blue-600",
    }),

    defineField({
      name: "gradientTo",
      title: "Gradient To",
      type: "string",
      initialValue: "blue-800",
    }),

    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      initialValue: false,
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
      subtitle: "tag",
      media: "image",
    },
  },
});