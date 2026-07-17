export default {
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "overview", title: "Overview", type: "text" },
    { name: "hero", title: "Hero", type: "image" },
    { name: "sections", title: "Sections", type: "array", of: [{ type: "block" }, { type: "image" }] },
  ],
};
