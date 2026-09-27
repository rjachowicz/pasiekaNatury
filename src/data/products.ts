export interface Product {
  id: string;
  name: string;
  description: string;
  detail: string;
  character: string;
  sizes?: string;
  preview: { src: string; index: 0 | 1 | 2 | 3; columns: number };
  homeImage: string;
}

export const products: Product[] = [
  {
    id: "faceliowy",
    homeImage: "/assets/product-faceliowy-placeholder.svg",
    preview: { src: "/assets/products.png", index: 0, columns: 4 },
    character: "Łagodny, kwiatowy, subtelny.",
    name: "Miód faceliowy",
    description: "Delikatny, jasny miód o łagodnym, kwiatowym smaku.",
    detail:
      "Subtelny aromat dobrze komponuje się z pieczywem, jogurtem i lekkimi deserami.",
  },
  {
    id: "lipowy",
    homeImage: "/assets/product-lipowy-placeholder.svg",
    preview: { src: "/assets/products.png", index: 1, columns: 4 },
    character: "Wyrazisty, z aromatem kwiatów lipy.",
    name: "Miód lipowy",
    description: "Charakterystyczny aromat lipy i pełny, wyrazisty smak.",
    detail:
      "Dla miłośników intensywnych kwiatowych nut. Sprawdzi się jako dodatek do letniej herbaty.",
  },
  {
    id: "gryczany",
    homeImage: "/assets/product-gryczany-placeholder.svg",
    preview: { src: "/assets/products.png", index: 2, columns: 4 },
    character: "Zdecydowany, intensywny, głęboki.",
    name: "Miód gryczany",
    description: "Ciemny miód o zdecydowanym smaku i głębokim aromacie.",
    detail:
      "Wyrazisty towarzysz domowych wypieków, twarogu i śniadań z charakterem.",
  },
  {
    id: "spadziowy",
    homeImage: "/assets/product-spadziowy-placeholder.svg",
    preview: { src: "/assets/products.png", index: 3, columns: 4 },
    character: "Leśny, bogaty, z żywiczną nutą.",
    name: "Miód spadziowy",
    description: "Głęboki smak i leśny charakter miodu ze spadzi.",
    detail:
      "Bogaty aromat dla osób, które szukają mniej kwiatowych, bardziej żywicznych nut.",
  },
];
