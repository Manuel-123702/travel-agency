import { client } from "@/sanity/lib/client";

export const blogPreviewQuery = `*[_type == "blogPost"] | order(publishedAt desc)[0...3]{
  title,
  excerpt,
  category,
  publishedAt,
  image,
  slug
}`;

export async function getBlogPreview() {
  try {
    const data = await client.fetch(blogPreviewQuery);
    return data;
  } catch (error) {
    console.error("Error fetching blog preview:", error);
    return null;
  }
}
