import apiary from "../assets/images/apiary.png";
import beeFlight from "../assets/images/bee-flight.png";
import beekeeper from "../assets/images/beekeeper.png";
import beekeeperFace from "../assets/images/beekeeper-face.png";
import beeField from "../assets/images/bee-field.png";
import flowers from "../assets/images/flowers.png";
import galleryComb from "../assets/images/gallery-comb.jpg";
import galleryHoney from "../assets/images/gallery-honey.jpg";
import hero from "../assets/images/hero.png";
import logo from "../assets/images/logo.png";
import mountains from "../assets/images/mountains.png";
import productFaceliowy from "../assets/images/product-faceliowy.png";
import productGryczany from "../assets/images/product-gryczany.png";
import productLipowy from "../assets/images/product-lipowy.png";
import productSpadziowy from "../assets/images/product-spadziowy.png";
import products from "../assets/images/products.png";
import rape from "../assets/images/rape.png";
import bees from "../assets/images/bees.png";
import sunset from "../assets/images/sunset.png";

export const imageAssets = {
  "/assets/apiary.png": apiary,
  "/assets/bee-flight.png": beeFlight,
  "/assets/beekeeper.png": beekeeper,
  "/assets/beekeeper-face.png": beekeeperFace,
  "/assets/bee-field.png": beeField,
  "/assets/flowers.png": flowers,
  "/assets/gallery-comb.jpg": galleryComb,
  "/assets/gallery-honey.jpg": galleryHoney,
  "/assets/hero.png": hero,
  "/assets/logo.png": logo,
  "/assets/mountains.png": mountains,
  "/assets/product-faceliowy.png": productFaceliowy,
  "/assets/product-gryczany.png": productGryczany,
  "/assets/product-lipowy.png": productLipowy,
  "/assets/product-spadziowy.png": productSpadziowy,
  "/assets/products.png": products,
  "/assets/rape.png": rape,
  "/assets/bees.png": bees,
  "/assets/sunset.png": sunset,
} as const;

export type ImageAssetPath = keyof typeof imageAssets;
