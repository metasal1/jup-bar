import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { PEOPLE } from "@/lib/community";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: "https://jup.bar/",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jup.bar/products",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jup.bar/people",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://jup.bar/feedback",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
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
  const productUrls: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `https://jup.bar/p/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const peopleUrls: MetadataRoute.Sitemap = PEOPLE.map((p) => ({
    url: `https://jup.bar/people/${p.handle.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [...staticUrls, ...productUrls, ...peopleUrls];
}
