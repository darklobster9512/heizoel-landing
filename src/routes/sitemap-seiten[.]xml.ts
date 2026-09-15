import { createFileRoute } from "@tanstack/react-router";

import { renderUrlset, xmlResponse, type SitemapEntry } from "@/lib/sitemap";

const PAGES: { path: string; priority: string; changefreq: SitemapEntry["changefreq"] }[] = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/preisrechner", priority: "0.9", changefreq: "daily" },
  { path: "/heizoelpreise", priority: "0.9", changefreq: "daily" },
  { path: "/lieferung-zahlung", priority: "0.7", changefreq: "monthly" },
  { path: "/bewertungen", priority: "0.7", changefreq: "weekly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/heizoel-wissen", priority: "0.7", changefreq: "monthly" },
  { path: "/kontakt", priority: "0.6", changefreq: "monthly" },
  { path: "/impressum", priority: "0.3", changefreq: "yearly" },
  { path: "/datenschutz", priority: "0.3", changefreq: "yearly" },
  { path: "/agb", priority: "0.3", changefreq: "yearly" },
  { path: "/widerruf", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie-einstellungen", priority: "0.3", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap-seiten.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return xmlResponse(
          renderUrlset(
            PAGES.map((p) => ({
              loc: origin + p.path,
              priority: p.priority,
              changefreq: p.changefreq,
            })),
          ),
        );
      },
    },
  },
});
