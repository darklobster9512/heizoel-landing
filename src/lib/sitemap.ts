export type SitemapEntry = {
  loc: string;
  priority: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
};

export function renderUrlset(entries: SitemapEntry[]) {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
}

export function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
