// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv('', '.', 'SITE_URL');

// https://astro.build/config
export default defineConfig({
  // Set SITE_URL to the confirmed production domain before deployment.
  site: SITE_URL || undefined,
});
