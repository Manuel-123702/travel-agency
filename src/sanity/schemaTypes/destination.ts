import { MapPinned } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  icon: MapPinned,

  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "flag",
      title: "Flag Emoji",
      type: "string",
      description: "Example: 🇫🇷",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "country",
      },
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Destination Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "colorFrom",
      title: "Gradient From",
      type: "string",
      initialValue: "blue-900",
    }),

    defineField({
      name: "colorTo",
      title: "Gradient To",
      type: "string",
      initialValue: "blue-700",
    }),

    defineField({
      name: "opportunities",
      title: "Opportunities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Lucide Icon",
              type: "string",
            }),

            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),

            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "featured",
      title: "Featured Destination",
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
      title: "country",
      subtitle: "tagline",
      media: "image",
    },
  },
});