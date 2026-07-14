import { Share2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLinks",
  title: "Social Links",
  type: "document",
  icon: Share2,

  fields: [
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    }),

    defineField({
      name: "twitter",
      title: "Twitter / X",
      type: "url",
    }),

    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
    }),

    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",
    }),

    defineField({
      name: "telegram",
      title: "Telegram",
      type: "url",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Link",
      type: "url",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Social Media",
      };
    },
  },
});