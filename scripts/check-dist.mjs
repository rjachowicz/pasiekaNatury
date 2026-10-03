import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSiteUrl } from "../src/config/siteUrl.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const sourceImages = join(root, "src", "assets", "images");
const site = new URL(resolveSiteUrl(process.env.SITE_URL));
const errors = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

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

const getMeta = (tags, attribute, name) =>
  tags.filter((tag) => getAttribute(tag, attribute)?.toLowerCase() === name);

const pageFiles = walk(dist)
  .filter((file) => file.endsWith("index.html"))
  .sort();

const pageRoute = (file) => {
  const path = relative(dist, file).replaceAll("\\", "/");
  return path === "index.html" ? "/" : `/${path.replace(/index\.html$/, "")}`;
};

const localTargetExists = (pathname) => {
  const target = join(
    dist,
    ...decodeURIComponent(pathname).split("/").filter(Boolean),
  );
  return existsSync(target) || existsSync(join(target, "index.html"));
};

const isSameSite = (value) => {
  try {
    return new URL(value).origin === site.origin;
  } catch {
    return false;
  }
};

const verifyLocalReference = (route, value) => {
  if (!value || value.startsWith("#") || /^(?:data|mailto|tel):/i.test(value))
    return;
  let target;
  try {
    target = new URL(value.replaceAll("&amp;", "&"), new URL(route, site));
  } catch {
    errors.push(`${route}: invalid local reference ${value}`);
    return;
  }
  if (target.origin === site.origin) {
    assert(
      localTargetExists(target.pathname),
      `${route}: missing local file ${value}`,
    );
  }
};

const verifyImageMagic = (file) => {
  const extension = extname(file).toLowerCase();
  if (!new Set([".png", ".jpg", ".jpeg", ".webp"]).has(extension)) return;
  const bytes = readFileSync(file).subarray(0, 12);
  const actual = bytes
    .subarray(0, 8)
    .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    ? "png"
    : bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
      ? "jpeg"
      : bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
          bytes.subarray(8, 12).toString("ascii") === "WEBP"
        ? "webp"
        : undefined;
  const expected =
    extension === ".jpg" || extension === ".jpeg" ? "jpeg" : extension.slice(1);
  assert(
    actual === expected,
    `${relative(root, file)}: extension does not match file signature`,
  );
};

const verifyJsonLdOrigins = (value, route) => {
  if (Array.isArray(value))
    return value.forEach((item) => verifyJsonLdOrigins(item, route));
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (
      typeof child === "string" &&
      ["@id", "url", "item", "logo", "image", "primaryImageOfPage"].includes(
        key,
      ) &&
      /^https:\/\//.test(child)
    ) {
      assert(
        isSameSite(child),
        `${route}: JSON-LD ${key} uses a different domain`,
      );
    }
    verifyJsonLdOrigins(child, route);
  }
};

const requiredMeta = [
  ["property", "og:title"],
  ["property", "og:description"],
  ["property", "og:url"],
  ["property", "og:image"],
  ["property", "og:image:type"],
  ["property", "og:image:width"],
  ["property", "og:image:height"],
  ["property", "og:image:alt"],
  ["name", "twitter:card"],
  ["name", "twitter:title"],
  ["name", "twitter:description"],
  ["name", "twitter:image"],
  ["name", "twitter:image:alt"],
];

for (const file of pageFiles) {
  const route = pageRoute(file);
  const label = route === "/" ? "/" : route.replace(/\/$/, "");
  const expectedUrl = new URL(route, site).href;
  const html = readFileSync(file, "utf8");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const titleTags = head.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) ?? [];
  const metaTags = head.match(/<meta\b[^>]*>/gi) ?? [];
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];
  const anchorTags = html.match(/<a\b[^>]*>/gi) ?? [];
  const descriptionTags = getMeta(metaTags, "name", "description");
  const canonicalTags = linkTags.filter((tag) =>
    (getAttribute(tag, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical"),
  );

  assert(titleTags.length === 1, `${label}: expected exactly one title`);
  const title = titleTags[0]?.replace(/<[^>]+>/g, "").trim() ?? "";
  assert(Boolean(title), `${label}: title must not be empty`);
  if (title) {
    assert(
      !titles.has(title),
      `${label}: duplicate title also used by ${titles.get(title)}`,
    );
    titles.set(title, label);
  }
  assert(
    descriptionTags.length === 1 &&
      Boolean(getAttribute(descriptionTags[0], "content")?.trim()),
    `${label}: expected one non-empty meta description`,
  );
  const description =
    getAttribute(descriptionTags[0] ?? "", "content")?.trim() ?? "";
  if (description) {
    assert(
      !descriptions.has(description),
      `${label}: duplicate description also used by ${descriptions.get(description)}`,
    );
    descriptions.set(description, label);
  }
  assert(
    canonicalTags.length === 1,
    `${label}: expected exactly one canonical`,
  );
  const canonical = getAttribute(canonicalTags[0] ?? "", "href");
  assert(
    canonical === expectedUrl,
    `${label}: canonical must be ${expectedUrl}`,
  );
  assert(
    !canonical?.includes("?"),
    `${label}: canonical must not contain a query string`,
  );
  if (canonical) {
    assert(
      !canonicals.has(canonical),
      `${label}: duplicate canonical also used by ${canonicals.get(canonical)}`,
    );
    canonicals.set(canonical, label);
  }
  assert(
    (html.match(/<main\b/gi) ?? []).length === 1,
    `${label}: expected exactly one main`,
  );
  assert(
    (html.match(/<h1\b/gi) ?? []).length === 1,
    `${label}: expected exactly one h1`,
  );
  const robots = getMeta(metaTags, "name", "robots");
  assert(
    robots.length === 1 &&
      getAttribute(robots[0], "content") ===
        "index,follow,max-image-preview:large",
    `${label}: missing required robots metadata`,
  );

  for (const [attribute, name] of requiredMeta) {
    const tags = getMeta(metaTags, attribute, name);
    assert(
      tags.length === 1 && Boolean(getAttribute(tags[0], "content")?.trim()),
      `${label}: missing or duplicate ${name}`,
    );
  }
  assert(
    getAttribute(
      getMeta(metaTags, "property", "og:url")[0] ?? "",
      "content",
    ) === expectedUrl,
    `${label}: og:url must match canonical`,
  );
  for (const [attribute, name] of [
    ["property", "og:image"],
    ["name", "twitter:image"],
  ]) {
    assert(
      /^https:\/\//.test(
        getAttribute(getMeta(metaTags, attribute, name)[0] ?? "", "content") ??
          "",
      ),
      `${label}: ${name} must be absolute`,
    );
  }
  const favicon = linkTags.filter(
    (tag) => (getAttribute(tag, "rel") ?? "").toLowerCase() === "icon",
  );
  assert(
    favicon.length === 1 &&
      getAttribute(favicon[0], "href") === "/favicon.png" &&
      getAttribute(favicon[0], "type") === "image/png",
    `${label}: missing stable PNG favicon`,
  );

  const jsonLdBlocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  assert(
    jsonLdBlocks.length === 1,
    `${label}: expected exactly one JSON-LD graph`,
  );
  let graph = [];
  for (const [, source] of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(source);
      assert(
        parsed["@context"] === "https://schema.org",
        `${label}: invalid JSON-LD context`,
      );
      assert(
        Array.isArray(parsed["@graph"]),
        `${label}: JSON-LD must contain @graph`,
      );
      graph = parsed["@graph"] ?? [];
      verifyJsonLdOrigins(parsed, label);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD (${error.message})`);
    }
  }
  const organization = graph.find((node) => node["@type"] === "LocalBusiness");
  const website = graph.find((node) => node["@type"] === "WebSite");
  const webpage = graph.find((node) =>
    ["WebPage", "CollectionPage"].includes(node["@type"]),
  );
  const organizationId = new URL("#local-business", site).href;
  const websiteId = new URL("#website", site).href;
  assert(
    organization?.["@id"] === organizationId,
    `${label}: missing LocalBusiness @id`,
  );
  assert(website?.["@id"] === websiteId, `${label}: missing WebSite @id`);
  assert(
    webpage?.["@id"] === `${expectedUrl}#webpage`,
    `${label}: missing WebPage @id`,
  );
  assert(
    webpage?.isPartOf?.["@id"] === websiteId,
    `${label}: WebPage must link WebSite`,
  );
  assert(
    website?.publisher?.["@id"] === organizationId,
    `${label}: WebSite must link LocalBusiness`,
  );
  assert(
    webpage?.about?.["@id"] === organizationId,
    `${label}: WebPage must describe LocalBusiness`,
  );
  const breadcrumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
  const needsBreadcrumbs = /^\/produkty\/[^/]+\/$/.test(route);
  assert(
    !needsBreadcrumbs || breadcrumbs,
    `${label}: missing product breadcrumb`,
  );
  if (breadcrumbs) {
    assert(
      breadcrumbs["@id"] === `${expectedUrl}#breadcrumb`,
      `${label}: invalid breadcrumb @id`,
    );
    assert(
      webpage?.breadcrumb?.["@id"] === breadcrumbs["@id"],
      `${label}: page must link breadcrumb`,
    );
    const items = breadcrumbs.itemListElement ?? [];
    assert(items.length > 0, `${label}: empty breadcrumb`);
    items.forEach((item, index) => {
      assert(
        item.position === index + 1,
        `${label}: invalid breadcrumb position`,
      );
      assert(
        isSameSite(item.item),
        `${label}: breadcrumb item uses a different domain`,
      );
    });
    assert(
      items.at(-1)?.item === expectedUrl,
      `${label}: breadcrumb must end at current page`,
    );
  }
  if (route === "/produkty/") {
    assert(
      webpage?.["@type"] === "CollectionPage",
      "/produkty: expected CollectionPage",
    );
    const itemList = graph.find((node) => node["@type"] === "ItemList");
    assert(
      itemList?.["@id"] === `${expectedUrl}#item-list`,
      "/produkty: missing ItemList @id",
    );
    assert(
      webpage?.mainEntity?.["@id"] === itemList?.["@id"],
      "/produkty: page must link ItemList",
    );
    assert(itemList?.itemListElement?.length > 0, "/produkty: empty ItemList");
  }
  for (const tag of anchorTags)
    verifyLocalReference(route, getAttribute(tag, "href"));
  for (const [, , value] of html.matchAll(
    /\b(?:src|href|data-src|data-lightbox-src)\s*=\s*(["'])(.*?)\1/gi,
  )) {
    verifyLocalReference(route, value);
  }
  for (const [, , value] of html.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
    value
      .split(",")
      .forEach((candidate) =>
        verifyLocalReference(route, candidate.trim().split(/\s+/)[0]),
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
])
  assert(routes.has(route), `missing required public route ${route}`);
assert(
  [...routes].some((route) => /^\/produkty\/[^/]+\/$/.test(route)),
  "missing product pages",
);

const robotsPath = join(dist, "robots.txt");
assert(existsSync(robotsPath), "missing robots.txt");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  assert(/^User-agent: \*$/m.test(robots), "robots.txt: missing User-agent: *");
  assert(/^Allow: \/$/m.test(robots), "robots.txt: missing Allow: /");
  const sitemapUrl = robots.match(/^Sitemap: (https:\/\/\S+)$/m)?.[1];
  assert(Boolean(sitemapUrl), "robots.txt: missing absolute HTTPS sitemap URL");
  if (sitemapUrl) {
    assert(
      isSameSite(sitemapUrl),
      "robots.txt: sitemap uses a different domain",
    );
    assert(
      localTargetExists(new URL(sitemapUrl).pathname),
      "robots.txt: referenced sitemap is missing",
    );
  }
}

const sitemapIndexPath = join(dist, "sitemap-index.xml");
assert(existsSync(sitemapIndexPath), "missing sitemap-index.xml");
if (existsSync(sitemapIndexPath)) {
  const childUrls = [
    ...readFileSync(sitemapIndexPath, "utf8").matchAll(/<loc>(.*?)<\/loc>/g),
  ].map(([, url]) => url);
  assert(childUrls.length > 0, "sitemap-index.xml: no child sitemaps");
  const publicUrls = new Set();
  for (const childUrl of childUrls) {
    assert(
      isSameSite(childUrl),
      "sitemap index: child sitemap uses a different domain",
    );
    const childPath = join(
      dist,
      ...new URL(childUrl).pathname.split("/").filter(Boolean),
    );
    assert(
      existsSync(childPath),
      `missing child sitemap ${new URL(childUrl).pathname}`,
    );
    if (!existsSync(childPath)) continue;
    for (const [, location] of readFileSync(childPath, "utf8").matchAll(
      /<loc>(.*?)<\/loc>/g,
    )) {
      const pageUrl = new URL(location);
      assert(
        isSameSite(location),
        `sitemap URL uses a different domain: ${location}`,
      );
      assert(
        !pageUrl.search,
        `sitemap URL contains a query string: ${location}`,
      );
      assert(
        !publicUrls.has(pageUrl.href),
        `sitemap contains a duplicate URL: ${location}`,
      );
      publicUrls.add(pageUrl.href);
    }
  }
  assert(
    publicUrls.size === pageFiles.length,
    "sitemap must contain every public page exactly once",
  );
  for (const file of pageFiles) {
    const expectedUrl = new URL(pageRoute(file), site).href;
    assert(publicUrls.has(expectedUrl), `sitemap is missing ${expectedUrl}`);
  }
}

for (const image of walk(sourceImages)) verifyImageMagic(image);
verifyImageMagic(join(root, "public", "favicon.png"));

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${pageFiles.length} pages, metadata, JSON-LD, images, robots.txt, and sitemap.`,
);
