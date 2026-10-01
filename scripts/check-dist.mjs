import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const site = new URL("https://pasiekanatury.vercel.app");
const errors = [];
const titles = new Map();
const descriptionsByContent = new Map();
const canonicalsByUrl = new Map();

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2];
};

const pageFiles = walk(dist)
  .filter((file) => file.endsWith("index.html"))
  .sort();

const pageRoute = (file) => {
  const path = relative(dist, file).replaceAll("\\", "/");
  return path === "index.html" ? "/" : `/${path.replace(/index\.html$/, "")}`;
};

const localTargetExists = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  const target = join(dist, ...decoded.split("/").filter(Boolean));
  if (existsSync(target)) return true;
  return existsSync(join(target, "index.html"));
};

for (const file of pageFiles) {
  const route = pageRoute(file);
  const label = route === "/" ? "/" : route.replace(/\/$/, "");
  const html = readFileSync(file, "utf8");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const titleTags = head.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) ?? [];
  const metaTags = head.match(/<meta\b[^>]*>/gi) ?? [];
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];
  const anchorTags = html.match(/<a\b[^>]*>/gi) ?? [];
  const descriptions = metaTags.filter(
    (tag) => getAttribute(tag, "name")?.toLowerCase() === "description",
  );
  const canonicals = linkTags.filter((tag) =>
    (getAttribute(tag, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical"),
  );
  const expectedUrl = new URL(route, site).href;

  assert(titleTags.length === 1, `${label}: expected exactly one <title>`);
  const title = titleTags[0]?.replace(/<[^>]+>/g, "").trim() ?? "";
  assert(Boolean(title), `${label}: title must not be empty`);
  if (title) {
    const previousRoute = titles.get(title);
    assert(
      !previousRoute,
      `${label}: duplicate title also used by ${previousRoute}`,
    );
    titles.set(title, label);
  }
  assert(
    descriptions.length === 1 &&
      Boolean(getAttribute(descriptions[0], "content")?.trim()),
    `${label}: expected one non-empty meta description`,
  );
  const description =
    getAttribute(descriptions[0] ?? "", "content")?.trim() ?? "";
  if (description) {
    const previousRoute = descriptionsByContent.get(description);
    assert(
      !previousRoute,
      `${label}: duplicate meta description also used by ${previousRoute}`,
    );
    descriptionsByContent.set(description, label);
  }
  assert(canonicals.length === 1, `${label}: expected exactly one canonical`);
  assert(
    canonicals.length === 1 &&
      getAttribute(canonicals[0], "href") === expectedUrl,
    `${label}: canonical must be ${expectedUrl}`,
  );
  const canonical = getAttribute(canonicals[0] ?? "", "href");
  if (canonical) {
    const previousRoute = canonicalsByUrl.get(canonical);
    assert(
      !previousRoute,
      `${label}: duplicate canonical also used by ${previousRoute}`,
    );
    canonicalsByUrl.set(canonical, label);
  }
  assert(
    (html.match(/<h1\b/gi) ?? []).length === 1,
    `${label}: expected exactly one h1`,
  );
  assert(
    (html.match(/<main\b/gi) ?? []).length === 1,
    `${label}: expected exactly one main`,
  );

  const ogUrl = metaTags.find(
    (tag) => getAttribute(tag, "property")?.toLowerCase() === "og:url",
  );
  assert(
    ogUrl && getAttribute(ogUrl, "content") === expectedUrl,
    `${label}: og:url must be the absolute canonical URL`,
  );

  for (const name of [
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:image:alt",
  ]) {
    const tag = metaTags.find(
      (meta) => getAttribute(meta, "name")?.toLowerCase() === name,
    );
    assert(
      tag && Boolean(getAttribute(tag, "content")?.trim()),
      `${label}: missing ${name}`,
    );
    if (name === "twitter:image" && tag) {
      assert(
        /^https:\/\//.test(getAttribute(tag, "content") ?? ""),
        `${label}: twitter:image must be absolute`,
      );
    }
  }

  const jsonLd = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  assert(jsonLd.length > 0, `${label}: missing JSON-LD`);
  for (const [, value] of jsonLd) {
    try {
      JSON.parse(value);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const tag of anchorTags) {
    const href = getAttribute(tag, "href")?.replaceAll("&amp;", "&");
    if (!href || href.startsWith("#")) continue;
    let target;
    try {
      target = new URL(href, new URL(route, site));
    } catch {
      errors.push(`${label}: invalid link ${href}`);
      continue;
    }
    if (target.origin !== site.origin) continue;
    assert(
      localTargetExists(target.pathname),
      `${label}: broken internal link ${href}`,
    );
  }
}

const routes = new Set(pageFiles.map(pageRoute));
for (const route of [
  "/",
  "/o-pasiece/",
  "/produkty/",
  "/kontakt/",
  "/polityka-prywatnosci/",
]) {
  assert(routes.has(route), `missing required public route ${route}`);
}
const productRoutes = [...routes].filter((route) =>
  /^\/produkty\/[^/]+\/$/.test(route),
);
assert(productRoutes.length > 0, "missing generated product pages");

const robotsPath = join(dist, "robots.txt");
assert(existsSync(robotsPath), "missing robots.txt");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  assert(/^User-agent: \*$/m.test(robots), "robots.txt: missing User-agent: *");
  assert(/^Allow: \/$/m.test(robots), "robots.txt: missing Allow: /");
  const sitemapUrl = robots.match(/^Sitemap: (https:\/\/\S+)$/m)?.[1];
  assert(Boolean(sitemapUrl), "robots.txt: missing absolute HTTPS sitemap URL");
  if (sitemapUrl) {
    const sitemap = new URL(sitemapUrl);
    assert(
      localTargetExists(sitemap.pathname),
      "robots.txt: referenced sitemap is missing",
    );
  }
}

const sitemapIndexPath = join(dist, "sitemap-index.xml");
assert(existsSync(sitemapIndexPath), "missing sitemap-index.xml");
if (existsSync(sitemapIndexPath)) {
  const sitemapIndex = readFileSync(sitemapIndexPath, "utf8");
  const childUrls = [...sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, url]) => url,
  );
  assert(childUrls.length > 0, "sitemap-index.xml: no child sitemaps");
  const publicUrls = new Set();
  for (const childUrl of childUrls) {
    const url = new URL(childUrl);
    const childPath = join(dist, ...url.pathname.split("/").filter(Boolean));
    assert(existsSync(childPath), `missing child sitemap ${url.pathname}`);
    if (!existsSync(childPath)) continue;
    const child = readFileSync(childPath, "utf8");
    for (const [, location] of child.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const pageUrl = new URL(location);
      assert(
        !pageUrl.search,
        `sitemap URL contains a query string: ${location}`,
      );
      publicUrls.add(pageUrl.href);
    }
  }
  for (const file of pageFiles) {
    const expectedUrl = new URL(pageRoute(file), site).href;
    assert(publicUrls.has(expectedUrl), `sitemap is missing ${expectedUrl}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${pageFiles.length} pages, robots.txt, and sitemap.`);
