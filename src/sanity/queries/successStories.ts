import { client } from "@/sanity/lib/client";

export const successStoriesQuery = `*[_type == "successStory"] | order(publishedAt desc){
  name,
  country,
  category,
  result,
  description,
  image
}`;

export async function getSuccessStories() {
  try {
    const data = await client.fetch(successStoriesQuery);
    return data;
  } catch (error) {
    console.error("Error fetching success stories:", error);
    return null;
  }
}
