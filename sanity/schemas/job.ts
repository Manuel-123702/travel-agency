import { defineField, defineType } from "sanity";

export default defineType({
  name: "job",
  title: "Jobs Abroad",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "jobType",
      title: "Job Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
        ],
      },
    }),
    defineField({
      name: "salary",
      title: "Salary Range",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "visaSponsorship",
      title: "Visa Sponsorship Available",
      type: "boolean",
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application Deadline",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured Job",
      type: "boolean",
    }),
    defineField({
      name: "active",
      title: "Active Listing",
      type: "boolean",
    }),
  ],
});
