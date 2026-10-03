import apiary from "../assets/images/apiary.png";
import beeFlight from "../assets/images/bee-flight.png";
import beekeeper from "../assets/images/beekeeper.png";
import beekeeperFace from "../assets/images/beekeeper-face.png";
import beeField from "../assets/images/bee-field.png";
import flowers from "../assets/images/flowers.png";
import hero from "../assets/images/hero.png";
import logo from "../assets/images/logo.png";
import mountains from "../assets/images/mountains.png";
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
  "/assets/hero.png": hero,
  "/assets/logo.png": logo,
  "/assets/mountains.png": mountains,
  "/assets/products.png": products,
  "/assets/rape.png": rape,
  "/assets/bees.png": bees,
  "/assets/sunset.png": sunset,
} as const;

export type ImageAssetPath = keyof typeof imageAssets;
