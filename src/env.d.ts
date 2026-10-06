/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_SITE_VERIFICATION?: string;
  readonly SITE_URL?: string;
  readonly VERCEL_ENV?: "production" | "preview" | "development";
}
