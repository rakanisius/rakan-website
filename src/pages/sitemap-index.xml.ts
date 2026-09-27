import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://rakan.my.id/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
