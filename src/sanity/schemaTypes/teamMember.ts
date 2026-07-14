import { Users } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: Users,

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    }),

    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),

    defineField({
      name: "twitter",
      title: "Twitter / X",
      type: "url",
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),

    defineField({
      name: "featured",
      title: "Featured Member",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "photo",
    },
  },
});