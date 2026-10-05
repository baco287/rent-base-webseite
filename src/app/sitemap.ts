import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...["impressum", "datenschutz", "agb"].map((p) => ({ url: `${SITE.url}/${p}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
