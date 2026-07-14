import { Menu } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,

  fields: [
    defineField({
      name: "title",
      title: "Menu Title",
      type: "string",
      initialValue: "Main Navigation",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "icon",
              title: "Lucide Icon Name",
              type: "string",
              description:
                "Home, Globe, BookOpen, Briefcase, Phone, Users...",
            }),

            defineField({
              name: "openInNewTab",
              title: "Open In New Tab",
              type: "boolean",
              initialValue: false,
            }),

            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                    }),

                    defineField({
                      name: "href",
                      title: "Link",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "label",
                      subtitle: "href",
                    },
                  },
                },
              ],
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});