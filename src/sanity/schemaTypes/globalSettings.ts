import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: Settings,

  fields: [
    defineField({
      name: "siteName",
      title: "Website Name",
      type: "string",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
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
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
    }),

    defineField({
      name: "googleMaps",
      title: "Google Maps Embed URL",
      type: "url",
    }),

    defineField({
      name: "googleAnalytics",
      title: "Google Analytics ID",
      type: "string",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Global Website Settings",
      };
    },
  },
});