import { defineField, defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Team Members",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "text",
    }),
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "position", title: "Position", type: "string" },
            { name: "department", title: "Department", type: "string" },
            { name: "bio", title: "Bio", type: "text" },
            { name: "image", title: "Photo", type: "image" },
            {
              name: "socialLinks",
              title: "Social Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "platform", title: "Platform", type: "string" },
                    { name: "url", title: "URL", type: "string" },
                  ],
                },
              ],
            },
            { name: "order", title: "Display Order", type: "number" },
          ],
        },
      ],
    }),
  ],
});
