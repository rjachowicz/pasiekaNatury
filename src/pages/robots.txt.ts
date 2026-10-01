import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const productionSite = site ?? new URL("https://pasiekanatury.vercel.app");
  const sitemapUrl = new URL("/sitemap-index.xml", productionSite);

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl.href}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};
