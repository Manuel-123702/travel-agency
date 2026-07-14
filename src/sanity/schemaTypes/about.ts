import { UserRound } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  icon: UserRound,

  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      initialValue: "About Our Agency",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
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
      name: "mission",
      title: "Mission",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "vision",
      title: "Vision",
      type: "text",
      rows: 3,
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
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
            }),

            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "number",
            },
          },
        },
      ],
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
      media: "image",
    },
  },
});