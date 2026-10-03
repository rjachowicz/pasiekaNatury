export const fallbackSiteUrl = "https://pasiekanatury.vercel.app";

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
