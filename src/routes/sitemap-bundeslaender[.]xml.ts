import { createFileRoute } from "@tanstack/react-router";

import { STATES } from "@/data/regions";
import { renderUrlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-bundeslaender.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return xmlResponse(
          renderUrlset(
            STATES.map((s) => ({
              loc: `${origin}/heizoelpreise/bundesland/${s.slug}`,
              priority: "0.8",
              changefreq: "daily" as const,
            })),
          ),
        );
      },
    },
  },
});
