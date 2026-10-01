import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv("", ".", "SITE_URL");
const site = SITE_URL || "https://pasiekanatury.vercel.app";

export default defineConfig({
  site,
  integrations: [sitemap()],
});
