export default {
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteTitle", title: "Site Title", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    { name: "footerText", title: "Footer Text", type: "text" },
    { name: "socials", title: "Social Links", type: "array", of: [{ type: "object", fields: [
      { name: "label", title: "Label", type: "string" },
      { name: "url", title: "URL", type: "url" },
    ]}] },
  ],
};
