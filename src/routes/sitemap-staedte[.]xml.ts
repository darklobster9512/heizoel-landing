import { createFileRoute } from "@tanstack/react-router";

import { CITIES } from "@/data/cities";
import { renderUrlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-staedte.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return xmlResponse(
          renderUrlset(
            CITIES.map((c) => ({
              loc: `${origin}/heizoelpreise/${c.slug}`,
              priority: "0.7",
              changefreq: "daily" as const,
            })),
          ),
        );
      },
    },
  },
});
