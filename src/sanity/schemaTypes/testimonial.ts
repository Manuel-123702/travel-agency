import { MessageSquareQuote } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: MessageSquareQuote,

  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Visa Type",
      type: "string",
      description:
        "Student Visa, Work Permit, Visitor Visa...",
    }),

    defineField({
      name: "country",
      title: "Destination Country",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Client Review",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),

    defineField({
      name: "avatar",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "approvalDate",
      title: "Approval Date",
      type: "date",
    }),

    defineField({
      name: "featured",
      title: "Featured",
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
      title: "name",
      subtitle: "country",
      media: "avatar",
    },
  },
});