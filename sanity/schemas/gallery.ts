import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Success Stories", value: "success-stories" },
          { title: "Office", value: "office" },
          { title: "Team", value: "team" },
          { title: "Countries", value: "countries" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image", type: "image" },
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
    }),
  ],
});
