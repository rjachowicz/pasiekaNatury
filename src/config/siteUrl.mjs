import { loadEnv } from "vite";

export const fallbackSiteUrl = "https://www.pasiekanatury.com";

export function resolveSiteUrl(value = fallbackSiteUrl) {
  let url;

  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("SITE_URL must be a complete HTTPS URL without a path.");
  }

  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error("SITE_URL must be a complete HTTPS URL without a path.");
  }

  return url.href;
}

export function resolveConfiguredSiteUrl({
  root = process.cwd(),
  mode = "production",
  env = process.env,
} = {}) {
  const fileEnv = loadEnv(mode, root, "");
  return resolveSiteUrl(env.SITE_URL ?? fileEnv.SITE_URL);
}

export function canonicalUrl(path, siteUrl) {
  const pathUrl =
    path instanceof URL ? path : new URL(path, "https://url.invalid");
  const pathname = pathUrl.pathname.replace(/\/{2,}/g, "/");
  const canonicalPath =
    pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;

  return new URL(canonicalPath, siteUrl);
}

export function robotsDirective(vercelEnvironment) {
  return vercelEnvironment === "preview"
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large";
}
