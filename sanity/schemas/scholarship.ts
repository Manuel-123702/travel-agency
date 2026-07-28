import { defineField, defineType } from "sanity";

export default defineType({
  name: "scholarship",
  title: "Scholarships",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Scholarship Name",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
    }),
    defineField({
      name: "provider",
      title: "Scholarship Provider",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "amount",
      title: "Award Amount",
      type: "string",
    }),
    defineField({
      name: "coverage",
      title: "Coverage Details",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility Criteria",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "Application Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "deadline",
      title: "Application Deadline",
      type: "date",
    }),
    defineField({
      name: "applicationLink",
      title: "Application Link",
      type: "url",
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of Study",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "degreeLevel",
      title: "Degree Level",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured Scholarship",
      type: "boolean",
    }),
  ],
});
