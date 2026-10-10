import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { resolveConfiguredSiteUrl } from "./src/config/siteUrl.mjs";

const site = resolveConfiguredSiteUrl({ root: ".", mode: "production" });

export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => page !== new URL("404/", site).href,
    }),
  ],
});
