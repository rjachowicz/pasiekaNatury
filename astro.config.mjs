import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { resolveSiteUrl } from "./src/config/siteUrl.mjs";

const { SITE_URL } = loadEnv("", ".", "");
const site = resolveSiteUrl(SITE_URL);

export default defineConfig({
  site,
  integrations: [sitemap()],
});
