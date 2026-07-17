export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "content", title: "Content", type: "text" },
    { name: "rating", title: "Rating", type: "number" },
    { name: "photo", title: "Photo", type: "image" },
  ],
};
