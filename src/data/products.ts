export type ProductCategory = "honey" | "bee-product";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
  sizes?: string[];
  variants?: string[];
  featured: boolean;
  available?: boolean;
  details?: {
    label: string;
    value: string;
  }[];
}

export const productCategoryLabels = {
  honey: "Miody",
  "bee-product": "Produkty pszczele",
} satisfies Record<ProductCategory, string>;

export const products: Product[] = [
  {
    id: "faceliowy",
    name: "Miód faceliowy",
    category: "honey",
    shortDescription: "Delikatny, jasny miód o łagodnym, kwiatowym smaku.",
    description:
      "Subtelny aromat dobrze komponuje się z pieczywem, jogurtem i lekkimi deserami.",
    details: [
      {
        label: "Charakter",
        value: "Łagodny, kwiatowy, subtelny.",
      },
    ],
    tags: ["łagodny", "kwiatowy", "subtelny"],
    image: "/assets/product-faceliowy.png",
    featured: true,
  },
  {
    id: "lipowy",
    name: "Miód lipowy",
    category: "honey",
    shortDescription: "Charakterystyczny aromat lipy i pełny, wyrazisty smak.",
    description:
      "Dla miłośników intensywnych kwiatowych nut. Sprawdzi się jako dodatek do letniej herbaty.",
    details: [
      {
        label: "Charakter",
        value: "Wyrazisty, z aromatem kwiatów lipy.",
      },
    ],
    tags: ["wyrazisty", "lipowy", "kwiatowy"],
    image: "/assets/product-lipowy.png",
    featured: true,
  },
  {
    id: "gryczany",
    name: "Miód gryczany",
    category: "honey",
    shortDescription: "Ciemny miód o zdecydowanym smaku i głębokim aromacie.",
    description:
      "Wyrazisty towarzysz domowych wypieków, twarogu i śniadań z charakterem.",
    details: [
      {
        label: "Charakter",
        value: "Zdecydowany, intensywny, głęboki.",
      },
    ],
    tags: ["zdecydowany", "intensywny", "głęboki"],
    image: "/assets/product-gryczany.png",
    featured: true,
  },
  {
    id: "spadziowy",
    name: "Miód spadziowy",
    category: "honey",
    shortDescription: "Głęboki smak i leśny charakter miodu ze spadzi.",
    description:
      "Bogaty aromat dla osób, które szukają mniej kwiatowych, bardziej żywicznych nut.",
    details: [
      {
        label: "Charakter",
        value: "Leśny, bogaty, z żywiczną nutą.",
      },
    ],
    tags: ["leśny", "bogaty", "żywiczny"],
    image: "/assets/product-spadziowy.png",
    featured: true,
  },
];
