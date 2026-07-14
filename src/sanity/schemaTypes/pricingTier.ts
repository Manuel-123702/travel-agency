import { CreditCard } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingTier",
  title: "Pricing Plan",
  type: "document",
  icon: CreditCard,

  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "€",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Choose Plan",
    }),

    defineField({
      name: "popular",
      title: "Popular Plan",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),

    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "price",
    },
  },
});