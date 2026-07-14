import type { StructureResolver } from "sanity/structure";

import {
  Home,
  Globe,
  FileText,
  Settings,
  Users,
  LayoutDashboard,
  Route,
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Travel Agency CMS")
    .items([
      // ===========================
      // HOMEPAGE
      // ===========================

      S.listItem()
        .title("Homepage")
        .icon(Home)
        .child(
          S.list()
            .title("Homepage")
            .items([
              S.documentTypeListItem("hero").title("Hero"),

              S.documentTypeListItem("about").title("About"),

              S.documentTypeListItem("stat").title("Statistics"),

              S.documentTypeListItem("service").title("Services"),

              S.documentTypeListItem("process").title("Process"),

              S.documentTypeListItem("destination").title("Destinations"),

              S.documentTypeListItem("testimonial").title("Testimonials"),

              S.documentTypeListItem("successStory").title("Success Stories"),

              S.documentTypeListItem("pricingTier").title("Pricing"),

              S.documentTypeListItem("faq").title("FAQ"),
            ])
        ),

      // ===========================
      // COUNTRIES
      // ===========================

      S.listItem()
        .title("Countries")
        .icon(Globe)
        .child(
          S.documentTypeList("countryContent").title("Countries")
        ),

      // ===========================
      // BLOG
      // ===========================

      S.listItem()
        .title("Blog")
        .icon(FileText)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),

              S.documentTypeListItem("teamMember").title("Authors"),
            ])
        ),

      // ===========================
      // WEBSITE
      // ===========================

      S.listItem()
        .title("Website")
        .icon(Settings)
        .child(
          S.list()
            .title("Website")
            .items([
              S.documentTypeListItem("navigation").title("Navigation"),

              S.documentTypeListItem("footer").title("Footer"),

              S.documentTypeListItem("socialLinks").title("Social Links"),

              S.documentTypeListItem("globalSettings").title("Global Settings"),
            ])
        ),

      S.divider(),

      S.documentTypeListItem("page")
        .title("Pages")
        .icon(LayoutDashboard),

      S.documentTypeListItem("heroSlide")
        .title("Hero Slides")
        .icon(Route),

      S.documentTypeListItem("teamMember")
        .title("Team Members")
        .icon(Users),
    ]);