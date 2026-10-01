import type { ImageAssetPath } from "./imageAssets";

export type ProductCategory = "honey" | "bee-product" | "herbal-honey";

export const productCategories = [
  { id: "honey", label: "Miody", slug: "miody", order: 1 },
  {
    id: "bee-product",
    label: "Produkty pszczele",
    slug: "produkty-pszczele",
    order: 2,
  },
  { id: "herbal-honey", label: "Ziołomiody", slug: "ziolomiody", order: 3 },
] as const satisfies readonly {
  id: ProductCategory;
  label: string;
  slug: string;
  order: number;
}[];

export const productCategoryLabels = Object.fromEntries(
  productCategories.map(({ id, label }) => [id, label]),
) as Record<ProductCategory, string>;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: ImageAssetPath;
  imageAlt: string;
  /** New products use this neutral graphic until their photographs are supplied. */
  imagePlaceholder?: boolean;
  tags: string[];
  featured: boolean;
  details?: { label: string; value: string }[];
}

const placeholderImage = "/assets/logo.png" as const;
const placeholderAlt = "Logo Pasieki 100% Natury";

export const products: Product[] = [
  {
    id: "faceliowy",
    name: "Miód faceliowy",
    category: "honey",
    shortDescription: "Jasny miód o łagodnym, kwiatowym charakterze.",
    description:
      "Miód faceliowy prezentujemy jako delikatną propozycję z katalogu pasieki. O jego aktualną dostępność warto zapytać bezpośrednio.",
    details: [{ label: "Charakter", value: "Łagodny i kwiatowy" }],
    tags: ["łagodny", "kwiatowy", "jasny"],
    image: "/assets/product-faceliowy.png",
    imageAlt: "Słoik miodu faceliowego",
    featured: true,
  },
  {
    id: "wielokwiatowy",
    name: "Miód wielokwiatowy",
    category: "honey",
    shortDescription: "Miód związany z różnorodnością sezonowych pożytków.",
    description:
      "Miód wielokwiatowy odzwierciedla zmienność miejsc i czasu pracy pszczół. Jego obecność w katalogu wynika z pożytków, za którymi wędruje pasieka.",
    tags: ["sezonowy", "kwiatowy", "różnorodny"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "akacjowy",
    name: "Miód akacjowy",
    category: "honey",
    shortDescription: "Miód o wyraźnie akacjowym profilu w katalogu pasieki.",
    description:
      "Miód akacjowy uzupełnia katalog o pozycję związaną z okresem kwitnienia akacji. Szczegóły dotyczące aktualnych wariantów potwierdzamy telefonicznie.",
    tags: ["akacjowy", "sezonowy", "kwiatowy"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "lipowy",
    name: "Miód lipowy",
    category: "honey",
    shortDescription: "Miód o pełnym aromacie kojarzonym z kwitnieniem lipy.",
    description:
      "Miód lipowy ma wyrazisty, kwiatowy charakter. Jest jedną z czterech prezentowanych na stronie głównej pozycji z pasieki.",
    details: [{ label: "Charakter", value: "Wyrazisty i kwiatowy" }],
    tags: ["lipowy", "wyrazisty", "kwiatowy"],
    image: "/assets/product-lipowy.png",
    imageAlt: "Słoik miodu lipowego",
    featured: true,
  },
  {
    id: "spadziowy",
    name: "Miód spadziowy",
    category: "honey",
    shortDescription: "Miód o głębokim, leśnym charakterze.",
    description:
      "Miód spadziowy wyróżnia się w katalogu głębszym profilem i leśnymi nutami. Informację o bieżącej dostępności uzyskasz w kontakcie z pasieką.",
    details: [{ label: "Charakter", value: "Głęboki i leśny" }],
    tags: ["leśny", "głęboki", "spadziowy"],
    image: "/assets/product-spadziowy.png",
    imageAlt: "Słoik miodu spadziowego",
    featured: true,
  },
  {
    id: "nawlociowy",
    name: "Miód nawłociowy",
    category: "honey",
    shortDescription: "Miód związany z późniejszym pożytkiem nawłociowym.",
    description:
      "Miód nawłociowy pojawia się w katalogu dzięki wędrówkom pasieki za pożytkami. Termin i szczegóły jego dostępności zależą od przebiegu sezonu.",
    tags: ["nawłociowy", "sezonowy", "wędrowny"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "gryczany",
    name: "Miód gryczany",
    category: "honey",
    shortDescription:
      "Ciemny miód o zdecydowanym smaku i intensywnym aromacie.",
    description:
      "Miód gryczany to propozycja o mocniejszym charakterze, związana z pożytkiem gryczanym. Został wybrany do stałej czwórki produktów na stronie głównej.",
    details: [{ label: "Charakter", value: "Zdecydowany i intensywny" }],
    tags: ["gryczany", "intensywny", "ciemny"],
    image: "/assets/product-gryczany.png",
    imageAlt: "Słoik miodu gryczanego",
    featured: true,
  },
  {
    id: "propolis-surowy",
    name: "Propolis surowy",
    category: "bee-product",
    shortDescription:
      "Produkt pszczeli prezentowany w naturalnej, surowej postaci.",
    description:
      "Propolis surowy znajduje się w katalogu produktów pszczelich. W sprawie aktualnej dostępności i szczegółów zapraszamy do kontaktu telefonicznego.",
    tags: ["produkt pszczeli", "surowy", "katalog"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "pierzga-w-koreczkach",
    name: "Pierzga pszczela w koreczkach",
    category: "bee-product",
    shortDescription: "Pierzga pszczela w formie koreczków.",
    description:
      "Pierzga pszczela w koreczkach jest osobną pozycją w katalogu produktów pszczelich. O bieżące informacje dotyczące tej pozycji można zapytać pasiekę.",
    tags: ["produkt pszczeli", "pierzga", "koreczki"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "pierzga-w-miodzie",
    name: "Pierzga w miodzie",
    category: "bee-product",
    shortDescription:
      "Połączenie pierzgi i miodu w jednej pozycji katalogowej.",
    description:
      "Pierzga w miodzie to odrębna pozycja katalogu, opisana osobno dla łatwiejszego potwierdzenia dostępności. Nie podajemy wariantów ani gramatur bez aktualnych danych.",
    tags: ["produkt pszczeli", "pierzga", "miód"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "pylek-pszczeli",
    name: "Pyłek pszczeli",
    category: "bee-product",
    shortDescription: "Pyłek pszczeli jako osobna pozycja katalogu pasieki.",
    description:
      "Pyłek pszczeli prezentujemy w grupie produktów pszczelich. Aby potwierdzić szczegóły tej pozycji, skontaktuj się z Pasieką 100% Natury.",
    tags: ["produkt pszczeli", "pyłek", "katalog"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "ziolomiod-malinowy",
    name: "Ziołomiód malinowy",
    category: "herbal-honey",
    shortDescription: "Ziołomiód o odmiennym charakterze, związany z maliną.",
    description:
      "Ziołomiód malinowy wyróżniamy w osobnej kategorii katalogu. W celu uzyskania szczegółów tej pozycji oraz aktualnej dostępności prosimy o kontakt.",
    tags: ["ziołomiód", "malinowy", "katalog"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
  {
    id: "ziolomiod-pokrzywowy",
    name: "Ziołomiód pokrzywowy",
    category: "herbal-honey",
    shortDescription: "Ziołomiód o odmiennym charakterze, związany z pokrzywą.",
    description:
      "Ziołomiód pokrzywowy jest drugą pozycją w tej kategorii. Jego szczegółowy opis oraz dostępne warianty potwierdzamy bezpośrednio w pasiece.",
    tags: ["ziołomiód", "pokrzywowy", "katalog"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
    imagePlaceholder: true,
    featured: false,
  },
];
