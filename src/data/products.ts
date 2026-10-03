import type { ImageAssetPath } from "./imageAssets";
import type { ProductCategory } from "./productCategories";

export type { ProductCategory } from "./productCategories";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: ImageAssetPath;
  imageAlt: string;
  tags: string[];
  details: { label: string; value: string }[];
}

const placeholderImage = "/assets/logo.png" as const;
const placeholderAlt = "Logo Pasieki 100% Natury";

export const products: Product[] = [
  {
    id: "faceliowy",
    name: "Miód faceliowy",
    category: "honey",
    shortDescription:
      "Jasny, delikatny miód o kwiatowym aromacie i subtelnie świeżym finiszu.",
    description:
      "Powstaje z nektaru facelii. Zwykle ma jasną, słomkową barwę, delikatny kwiatowy aromat oraz słodki smak z lekko świeżą nutą. Po krystalizacji może przyjmować drobnoziarnistą, kremową konsystencję.",
    details: [
      { label: "Pochodzenie", value: "Nektar facelii" },
      { label: "Profil", value: "Delikatny i kwiatowy" },
    ],
    tags: ["łagodny", "kwiatowy", "jasny"],
    image: placeholderImage,
    imageAlt: "Słoik miodu faceliowego",
  },
  {
    id: "wielokwiatowy",
    name: "Miód wielokwiatowy",
    category: "honey",
    shortDescription:
      "Kwiatowy miód, którego barwa i smak zmieniają się wraz z pożytkami danego sezonu.",
    description:
      "Powstaje z nektaru wielu roślin kwitnących w tym samym czasie. Kolejne partie mogą różnić się odcieniem, intensywnością aromatu i tempem krystalizacji. Jego profil odzwierciedla miejsce oraz porę zbioru.",
    details: [
      { label: "Pochodzenie", value: "Nektar wielu roślin" },
      { label: "Profil", value: "Zmienny sezonowo" },
    ],
    tags: ["sezonowy", "kwiatowy", "różnorodny"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "akacjowy",
    name: "Miód akacjowy",
    category: "honey",
    shortDescription:
      "Bardzo jasny i łagodny miód o delikatnie kwiatowym aromacie.",
    description:
      "Powstaje głównie z nektaru robinii akacjowej. Zwykle jest bardzo jasny, łagodny i delikatnie kwiatowy, bez ostrego finiszu. Dzięki przewadze fruktozy na ogół długo zachowuje płynną postać.",
    details: [
      { label: "Pochodzenie", value: "Nektar robinii akacjowej" },
      { label: "Profil", value: "Łagodny i kwiatowy" },
    ],
    tags: ["akacjowy", "łagodny", "jasny"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "lipowy",
    name: "Miód lipowy",
    category: "honey",
    shortDescription:
      "Aromatyczny miód o wyraźnym lipowym profilu i lekko ziołowym finiszu.",
    description:
      "Powstaje z nektaru kwiatów lipy. Ma wyraźny lipowy aromat i słodki smak z ostrzejszą, lekko gorzkawą lub ziołową nutą. Po krystalizacji staje się jaśniejszy i może uzyskać drobnoziarnistą konsystencję.",
    details: [
      { label: "Pochodzenie", value: "Nektar kwiatów lipy" },
      { label: "Profil", value: "Lipowy i lekko ziołowy" },
    ],
    tags: ["lipowy", "wyrazisty", "kwiatowy"],
    image: placeholderImage,
    imageAlt: "Słoik miodu lipowego",
  },
  {
    id: "spadziowy",
    name: "Miód spadziowy",
    category: "honey",
    shortDescription:
      "Ciemniejszy miód o głębokim, leśnym i delikatnie żywicznym charakterze.",
    description:
      "Powstaje ze spadzi, a nie bezpośrednio z nektaru kwiatów. Zwykle jest ciemniejszy, mniej jednoznacznie słodki i wyróżnia się leśnym lub żywicznym aromatem. Barwa oraz intensywność zależą od rodzaju spadzi i konkretnej partii.",
    details: [
      { label: "Pochodzenie", value: "Spadź" },
      { label: "Profil", value: "Leśny i żywiczny" },
    ],
    tags: ["leśny", "głęboki", "spadziowy"],
    image: placeholderImage,
    imageAlt: "Słoik miodu spadziowego",
  },
  {
    id: "nawlociowy",
    name: "Miód nawłociowy",
    category: "honey",
    shortDescription:
      "Późnoletni miód o kwiatowo-ziołowym aromacie i wyrazistym finiszu.",
    description:
      "Powstaje z późnoletniego pożytku nawłociowego. Wyróżnia go kwiatowo-ziołowy aromat i słodki smak z delikatnie kwaśną lub gorzkawą nutą. Zwykle dość szybko krystalizuje, przyjmując drobnoziarnistą konsystencję.",
    details: [
      { label: "Pochodzenie", value: "Późnoletni pożytek nawłociowy" },
      { label: "Profil", value: "Kwiatowo-ziołowy" },
    ],
    tags: ["nawłociowy", "sezonowy", "kwiatowy"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "gryczany",
    name: "Miód gryczany",
    category: "honey",
    shortDescription:
      "Ciemny, intensywny miód o zdecydowanym, korzennym charakterze.",
    description:
      "Powstaje z nektaru kwiatów gryki. Ma ciemnobursztynową lub brunatną barwę, intensywny aromat i zdecydowany, korzenny, lekko ostry smak. To jedna z najbardziej wyrazistych odmian w katalogu pasieki.",
    details: [
      { label: "Pochodzenie", value: "Nektar kwiatów gryki" },
      { label: "Profil", value: "Zdecydowany i korzenny" },
    ],
    tags: ["gryczany", "intensywny", "ciemny"],
    image: placeholderImage,
    imageAlt: "Słoik miodu gryczanego",
  },
  {
    id: "propolis-surowy",
    name: "Propolis surowy",
    category: "bee-product",
    shortDescription:
      "Surowy kit pszczeli o intensywnym, żywicznym zapachu i naturalnie zmiennej barwie.",
    description:
      "Propolis, nazywany również kitem pszczelim, powstaje z żywicznych substancji zbieranych przez pszczoły i służy im do uszczelniania ula. W surowej postaci ma nieregularną formę, wyrazisty zapach oraz barwę zależną od pochodzenia surowca.",
    details: [
      { label: "Forma", value: "Surowy kit pszczeli" },
      { label: "Charakter", value: "Żywiczny i wyrazisty" },
    ],
    tags: ["produkt pszczeli", "surowy", "żywiczny"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "pierzga-w-koreczkach",
    name: "Pierzga pszczela w koreczkach",
    category: "bee-product",
    shortDescription:
      "Fermentowany pyłek pszczeli w zwartej formie wyjętej z komórek plastra.",
    description:
      "Pierzga powstaje z pyłku umieszczonego przez pszczoły w komórkach plastra, połączonego z miodem i poddanego naturalnej fermentacji. W formie koreczków zachowuje kształt komórek, ma zwartą konsystencję oraz żywiczny, lekko kwaskowaty smak.",
    details: [
      { label: "Forma", value: "Koreczki z komórek plastra" },
      { label: "Charakter", value: "Żywiczny i lekko kwaskowaty" },
    ],
    tags: ["produkt pszczeli", "pierzga", "koreczki"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "pierzga-w-miodzie",
    name: "Pierzga w miodzie",
    category: "bee-product",
    shortDescription:
      "Połączenie słodyczy miodu z bardziej wyrazistym, kwaskowatym charakterem pierzgi.",
    description:
      "To połączenie miodu i pierzgi pszczelej w jednej pozycji katalogowej. Miód łagodzi żywiczny i lekko kwaskowaty profil pierzgi. Smak oraz konsystencja zależą od proporcji zastosowanych w danej partii.",
    details: [
      { label: "Forma", value: "Pierzga połączona z miodem" },
      { label: "Charakter", value: "Słodki i lekko kwaskowaty" },
    ],
    tags: ["produkt pszczeli", "pierzga", "miód"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "pylek-pszczeli",
    name: "Pyłek pszczeli",
    category: "bee-product",
    shortDescription:
      "Wielobarwne granulki pyłku zbieranego przez pszczoły z różnych kwitnących roślin.",
    description:
      "Pyłek jest zbierany przez pszczoły z kwiatów, formowany w niewielkie granulki i przenoszony do ula. Jego barwa może zmieniać się od jasnej do bardzo ciemnej zależnie od odwiedzanych roślin. Ma suchą, ziarnistą formę i naturalnie zmienny roślinny profil.",
    details: [
      { label: "Forma", value: "Suche, ziarniste granulki" },
      { label: "Charakter", value: "Naturalnie zmienny roślinny" },
    ],
    tags: ["produkt pszczeli", "pyłek", "granulki"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "ziolomiod-malinowy",
    name: "Ziołomiód malinowy",
    category: "herbal-honey",
    shortDescription:
      "Ziołomiód o słodkim profilu i wyczuwalnej, owocowej nucie malinowej.",
    description:
      "Ziołomiód malinowy jest produktem odrębnym od klasycznego miodu nektarowego. Jego charakter kształtuje składnik malinowy przetwarzany przez pszczoły, nadający całości słodką, owocową nutę. Dokładny skład i dostępność partii potwierdzamy telefonicznie.",
    details: [
      { label: "Rodzaj", value: "Ziołomiód malinowy" },
      { label: "Profil", value: "Słodki i owocowy" },
    ],
    tags: ["ziołomiód", "malinowy", "owocowy"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
  {
    id: "ziolomiod-pokrzywowy",
    name: "Ziołomiód pokrzywowy",
    category: "herbal-honey",
    shortDescription:
      "Ziołomiód o charakterystycznym, roślinnym profilu i delikatnie ziołowym finiszu.",
    description:
      "Ziołomiód pokrzywowy jest produktem odrębnym od klasycznego miodu nektarowego. Jego charakter kształtuje składnik pokrzywowy przetwarzany przez pszczoły, nadający mu wyraźniejszą roślinną i ziołową nutę. Dokładny skład i dostępność partii potwierdzamy telefonicznie.",
    details: [
      { label: "Rodzaj", value: "Ziołomiód pokrzywowy" },
      { label: "Profil", value: "Roślinny i ziołowy" },
    ],
    tags: ["ziołomiód", "pokrzywowy", "ziołowy"],
    image: placeholderImage,
    imageAlt: placeholderAlt,
  },
];
