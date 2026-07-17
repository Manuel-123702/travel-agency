export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "hero", title: "Hero", type: "object", fields: [
      { name: "heading", title: "Heading", type: "string" },
      { name: "subheading", title: "Subheading", type: "text" },
      { name: "image", title: "Image", type: "image" },
    ]},
    { name: "sections", title: "Sections", type: "array", of: [{ type: "reference", to: [{ type: "service" }, { type: "testimonial" }] }] },
  ],
};
