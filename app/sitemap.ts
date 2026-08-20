import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://jup.bar/",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jup.bar/feedback",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://jup.bar/llms.txt",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: "https://jup.bar/llms-full.txt",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}
