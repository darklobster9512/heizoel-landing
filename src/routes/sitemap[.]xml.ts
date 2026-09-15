import { createFileRoute } from "@tanstack/react-router";

const CHILDREN = ["/sitemap-seiten.xml", "/sitemap-bundeslaender.xml", "/sitemap-staedte.xml"];

function buildIndex(origin: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CHILDREN.map(
  (p) => `  <sitemap><loc>${origin}${p}</loc><lastmod>${today}</lastmod></sitemap>`,
).join("\n")}
</sitemapindex>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return new Response(buildIndex(origin), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
