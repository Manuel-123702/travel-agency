import { defineField, defineType } from "sanity";

export default defineType({
  name: "university",
  title: "Universities",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "University Name",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "University Logo",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "ranking",
      title: "World Ranking",
      type: "number",
    }),
    defineField({
      name: "programs",
      title: "Programs Offered",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Program Name", type: "string" },
            { name: "level", title: "Level (Undergraduate/Graduate)", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            { name: "tuitionFee", title: "Tuition Fee", type: "string" },
            { name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    }),
    defineField({
      name: "scholarships",
      title: "Available Scholarships",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Scholarship Name", type: "string" },
            { name: "amount", title: "Amount", type: "string" },
            { name: "eligibility", title: "Eligibility", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "admissionRequirements",
      title: "General Admission Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "intakeDates",
      title: "Intake Dates",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured University",
      type: "boolean",
    }),
  ],
});
