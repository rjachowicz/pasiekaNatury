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
import rape from "../assets/images/rape-apiary.png";
import bees from "../assets/images/bees.png";
import spadz from "../assets/images/products/spadz.png";
import wielokwiat from "../assets/images/products/wielokwiat.png";
import lipa from "../assets/images/products/lipa.png";
import nawloc from "../assets/images/products/nawloc.png";
import pylek from "../assets/images/products/pylek.png";
import pierzga_miod from "../assets/images/products/pierzga_miod.png";
import ziol_mailna from "../assets/images/products/ziol_mailna.png";
import ziol_pokrzywa from "../assets/images/products/ziol_pokrzywa.png";
import winter_apiary from "../assets/images/winter_apiary.png";

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
  "/assets/rape-apiary.png": rape,
  "/assets/bees.png": bees,
  "/assets/spadz.png": spadz,
  "/assets/wielokwiat.png": wielokwiat,
  "/assets/lipa.png": lipa,
  "/assets/nawloc.png": nawloc,
  "/assets/pylek.png": pylek,
  "/assets/pierzga_miod.png": pierzga_miod,
  "/assets/ziol_pokrzywa.png": ziol_pokrzywa,
  "/assets/ziol_mailna.png": ziol_mailna,
  "/assets/winter_apiary.png": winter_apiary
} as const;

export type ImageAssetPath = keyof typeof imageAssets;
