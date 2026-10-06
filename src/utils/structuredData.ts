import type { Product } from "../data/products";
import { canonicalUrl } from "../config/siteUrl.mjs";
import { site } from "../data/site";

type JsonLdValue = string | number | boolean | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue };

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface StructuredDataOptions {
  siteUrl: URL;
  pageUrl: URL;
  title: string;
  description: string;
  imageUrl: URL;
  imageWidth: number;
  imageHeight: number;
  imageType: string;
  logoUrl: URL;
  breadcrumbs?: BreadcrumbItem[];
  catalogProducts?: readonly Pick<Product, "id" | "name">[];
}

const absoluteFragment = (siteUrl: URL, fragment: string) =>
  new URL(fragment, siteUrl).href;

export function createStructuredData({
  siteUrl,
  pageUrl,
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
  imageType,
  logoUrl,
  breadcrumbs,
  catalogProducts,
}: StructuredDataOptions): JsonLdObject {
  const organizationId = absoluteFragment(
    siteUrl,
    site.structuredDataIds.organization,
  );
  const websiteId = absoluteFragment(siteUrl, site.structuredDataIds.website);
  const webpageId = `${pageUrl.href}#webpage`;
  const breadcrumbId = `${pageUrl.href}#breadcrumb`;
  const itemListId = `${pageUrl.href}#item-list`;
  const isCollectionPage = Boolean(catalogProducts);

  const organization: JsonLdObject = {
    "@type": "LocalBusiness",
    "@id": organizationId,
    name: site.name,
    url: siteUrl.href,
    logo: logoUrl.href,
    image: logoUrl.href,
    description:
      "Rodzinna pasieka w Jasiennej w gminie Korzenna, prezentująca miody i produkty pszczele.",
    founder: {
      "@type": "Person",
      name: site.ownerName,
    },
    telephone: site.contact.phones[0].display,
    contactPoint: site.contact.phones.map(({ display }) => ({
      "@type": "ContactPoint",
      telephone: display,
      contactType: "customer service",
      availableLanguage: site.language,
    })),
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: "małopolskie",
      addressCountry: site.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.coordinates.latitude,
      longitude: site.contact.coordinates.longitude,
    },
    hasMap: site.contact.directionsUrl,
    sameAs: [...site.contact.socialProfiles],
  };
  const website: JsonLdObject = {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: siteUrl.href,
    inLanguage: site.language,
    publisher: { "@id": organizationId },
  };
  const webpage: JsonLdObject = {
    "@type": isCollectionPage ? "CollectionPage" : "WebPage",
    "@id": webpageId,
    url: pageUrl.href,
    name: title,
    description,
    inLanguage: site.language,
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: imageUrl.href,
      url: imageUrl.href,
      width: imageWidth,
      height: imageHeight,
      encodingFormat: imageType,
    },
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    ...(breadcrumbs?.length ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(catalogProducts ? { mainEntity: { "@id": itemListId } } : {}),
  };
  const graph: JsonLdObject[] = [organization, website, webpage];

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map(({ name, path }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: canonicalUrl(path, siteUrl).href,
      })),
    });
  }

  if (catalogProducts) {
    graph.push({
      "@type": "ItemList",
      "@id": itemListId,
      itemListElement: catalogProducts.map(({ id, name }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: canonicalUrl(`/produkty/${id}`, siteUrl).href,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
