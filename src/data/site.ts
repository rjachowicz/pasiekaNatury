export const navigation = [
  { href: "/", label: "Strona główna" },
  { href: "/o-pasiece", label: "O pasiece" },
  { href: "/produkty", label: "Produkty" },
  { href: "/kontakt", label: "Kontakt" },
];

export const contact = {
  phones: [
    {
      display: "+48 516 473 831",
      href: "tel:+48516473831",
      label: "Telefon 1",
    },
    {
      display: "+48 575 303 550",
      href: "tel:+48575303550",
      label: "Telefon 2",
    },
  ] as const,
  email: "ksowa86@interia.pl",
  address: "Jasienna 171, 33-322 Korzenna, Polska",
  addressLines: ["Jasienna 171", "33-322 Korzenna", "Polska"],
  facebookUrl:
    "https://www.facebook.com/profile.php?id=61592104056766&locale=pl_PL",
  instagramUrl: "https://www.instagram.com/pasieka_100_natura",
  coordinates: {
    latitude: 49.7262776,
    longitude: 20.845293,
  },
  directionsUrl:
    "https://www.google.com/maps/place/Pasieka+100%25+Natury/@49.7259374,20.8423142,1686m/data=!3m1!1e3!4m6!3m5!1s0x473ded6b3d2e3019:0x89f06fb6bdd77003!8m2!3d49.7262776!4d20.845293!16s%2Fg%2F11zy0ps05l",
  mapEmbedUrl:
    "https://www.google.com/maps?q=49.7262776%2C20.845293&z=17&output=embed",
};
