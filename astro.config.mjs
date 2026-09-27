import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv("", ".", "SITE_URL");

export default defineConfig({
  site: SITE_URL || undefined,
});
