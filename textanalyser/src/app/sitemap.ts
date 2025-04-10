import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL || "https://textanalyserosc.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL + "/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: SITE_URL + "/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: SITE_URL + "/tools/analyser",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: SITE_URL + "/tools/styler",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: SITE_URL + "/showcase",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
