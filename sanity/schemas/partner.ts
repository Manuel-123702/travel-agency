import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partners & Certifications",
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
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Partner Name", type: "string" },
            { name: "logo", title: "Logo", type: "image" },
            { name: "website", title: "Website URL", type: "url" },
            { name: "type", title: "Type", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Certification Name", type: "string" },
            { name: "image", title: "Certificate Image", type: "image" },
            { name: "issuingBody", title: "Issuing Body", type: "string" },
            { name: "validUntil", title: "Valid Until", type: "date" },
          ],
        },
      ],
    }),
  ],
});
