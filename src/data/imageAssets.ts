import apiary from "../assets/images/apiary.jpg";
import beeFlight from "../assets/images/bee-flight.png";
import beekeeper from "../assets/images/beekeeper.jpg";
import beekeeperFace from "../assets/images/beekeeperFace.jpg";
import beeField from "../assets/images/bee-field.jpg";
import flowers from "../assets/images/flowers.png";
import galleryBee from "../assets/images/gallery-bee.jpg";
import galleryComb from "../assets/images/gallery-comb.jpg";
import galleryHoney from "../assets/images/gallery-honey.jpg";
import hero from "../assets/images/hero.jpg";
import logo from "../assets/images/logo.png";
import mountains from "../assets/images/mountains.png";
import productFaceliowy from "../assets/images/product-faceliowy.png";
import productGryczany from "../assets/images/product-gryczany.png";
import productLipowy from "../assets/images/product-lipowy.png";
import productSpadziowy from "../assets/images/product-spadziowy.png";
import products from "../assets/images/products.png";

export const imageAssets = {
  "/assets/apiary.jpg": apiary,
  "/assets/bee-flight.png": beeFlight,
  "/assets/beekeeper.jpg": beekeeper,
  "/assets/beekeeper-face.jpg": beekeeperFace,
  "/assets/bee-field.jpg": beeField,
  "/assets/flowers.png": flowers,
  "/assets/gallery-bee.jpg": galleryBee,
  "/assets/gallery-comb.jpg": galleryComb,
  "/assets/gallery-honey.jpg": galleryHoney,
  "/assets/hero.jpg": hero,
  "/assets/logo.png": logo,
  "/assets/mountains.png": mountains,
  "/assets/product-faceliowy.png": productFaceliowy,
  "/assets/product-gryczany.png": productGryczany,
  "/assets/product-lipowy.png": productLipowy,
  "/assets/product-spadziowy.png": productSpadziowy,
  "/assets/products.png": products,
} as const;

export type ImageAssetPath = keyof typeof imageAssets;
