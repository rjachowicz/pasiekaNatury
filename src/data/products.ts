export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  character: string;
  tags: string[];
  sizes?: string[];
  image: string;
  featured: boolean;
  [key: string]: unknown;
}

export const products: Product[] = [
  {
    id: "faceliowy",
    name: "Miód faceliowy",
    shortDescription: "Delikatny, jasny miód o łagodnym, kwiatowym smaku.",
    description:
      "Subtelny aromat dobrze komponuje się z pieczywem, jogurtem i lekkimi deserami.",
    character: "Łagodny, kwiatowy, subtelny.",
    tags: ["łagodny", "kwiatowy", "subtelny"],
    image: "/assets/product-faceliowy-placeholder.svg",
    featured: true,
  },
  {
    id: "lipowy",
    name: "Miód lipowy",
    shortDescription: "Charakterystyczny aromat lipy i pełny, wyrazisty smak.",
    description:
      "Dla miłośników intensywnych kwiatowych nut. Sprawdzi się jako dodatek do letniej herbaty.",
    character: "Wyrazisty, z aromatem kwiatów lipy.",
    tags: ["wyrazisty", "lipowy", "kwiatowy"],
    image: "/assets/product-lipowy-placeholder.svg",
    featured: true,
  },
  {
    id: "gryczany",
    name: "Miód gryczany",
    shortDescription: "Ciemny miód o zdecydowanym smaku i głębokim aromacie.",
    description:
      "Wyrazisty towarzysz domowych wypieków, twarogu i śniadań z charakterem.",
    character: "Zdecydowany, intensywny, głęboki.",
    tags: ["zdecydowany", "intensywny", "głęboki"],
    image: "/assets/product-gryczany-placeholder.svg",
    featured: true,
  },
  {
    id: "spadziowy",
    name: "Miód spadziowy",
    shortDescription: "Głęboki smak i leśny charakter miodu ze spadzi.",
    description:
      "Bogaty aromat dla osób, które szukają mniej kwiatowych, bardziej żywicznych nut.",
    character: "Leśny, bogaty, z żywiczną nutą.",
    tags: ["leśny", "bogaty", "żywiczny"],
    image: "/assets/product-spadziowy-placeholder.svg",
    featured: true,
  },
];
