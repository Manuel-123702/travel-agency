import { client } from "@/sanity/lib/client";

export const aboutQuery = `*[_type == "about"][0]{
  badge,
  title,
  description,
  mission,
  vision,
  image,
  stats[]{
    number,
    label
  }
}`;

export async function getAboutData() {
  try {
    const data = await client.fetch(aboutQuery);
    return data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}
