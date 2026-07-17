export default {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "author", title: "Author", type: "string" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "coverImage", title: "Cover Image", type: "image" },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }, { type: "image" }] },
  ],
};
