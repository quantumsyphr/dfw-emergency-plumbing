import type { MetadataRoute } from "next";
import { DFW_CITIES } from "@/lib/cities";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages = DFW_CITIES.map((city) => ({
    url: `${COMPANY.domain}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: COMPANY.domain,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...cityPages,
  ];
}
