import { PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: PanelBottom,

  fields: [
    defineField({
      name: "about",
      title: "Company Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),

    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "legal",
      title: "Legal Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Website Footer",
      };
    },
  },
});