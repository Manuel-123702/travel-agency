import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricing",
  title: "Pricing Plans",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Plan Name", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "currency", title: "Currency", type: "string" },
            { name: "period", title: "Period (e.g., 'one-time', 'monthly')", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "featured", title: "Featured Plan", type: "boolean" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "visaTypes",
              title: "Applicable Visa Types",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "additionalServices",
      title: "Additional Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Service Name", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
  ],
});
