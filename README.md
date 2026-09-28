# Pasieka 100% Natury

Statyczna witryna w Astro, ze zwykłym CSS i niewielkim skryptem menu mobilnego. Obrazy i fonty są importowane z `src/assets`, a ikonowe SVG pozostają w `public/assets`; projekt nie wymaga frameworka UI ani adaptera serwerowego.

## Uruchamianie

Wymagany Node.js >= 22.12.0.

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
npm run preview
```

W PowerShell z blokadą skryptów można użyć `npm.cmd` zamiast `npm`. W projekcie nie ma skryptu `npm run check`.

## Struktura

- `src/pages/` — strony `/`, `/o-pasiece`, `/produkty`, `/kontakt` oraz ich metadane SEO.
- `src/layouts/BaseLayout.astro` — dokument HTML, fonty, nagłówek, treść i stopka.
- `src/components/` — wspólna nawigacja, przyciski, nagłówki sekcji, dane kontaktowe i CTA.
- `src/components/home/` — siedem sekcji strony głównej; wartości i wędrowna pasieka są też używane na stronie o pasiece.
- `src/styles/variables.css` — kolory, fluid type scale, trzy szerokości kontenerów, odstępy, wysokość nagłówka i czas przejść.
- `src/styles/global.css` — reset, typografia, kontener i wspólne układy.
- `src/data/site.ts` — menu, kontakt i podstawowe opisy produktów.
- `src/assets/` — zdjęcia, logo, dekoracje i lokalne fonty przetwarzane przez Astro i Vite.
- `public/assets/icons/values/` — SVG wymagające stabilnych publicznych URL-i.

Style poszczególnych komponentów są lokalne. Kontener treści ma maksymalnie 1280 px, szeroki 1360 px, tekstowy 720 px. Hero przechodzi na jedną kolumnę poniżej 1000 px, nawigacja poniżej 900 px, a pozostałe układy dopasowują się przy 600 i 640 px. Nagłówek sticky ma 96 px na desktopie i 76 px na mobile.

`src/components/ui/AssetImage.astro` korzysta z wbudowanej optymalizacji Astro. Pobiera obraz z typowanej mapy `src/data/imageAssets.ts`, generuje WebP i `srcset`, zachowuje proporcje źródła oraz przekazuje klasy, opisy i atrybuty ładowania. Zdjęcie hero ładuje się z wysokim priorytetem, zdjęcia poniżej pierwszego ekranu korzystają z lazy loading.

## Uzupełnianie szablonu

Dane kontaktowe w `src/data/site.ts` są robocze. Pole `facebookUrl` pozostaje puste, dopóki nie zostanie podany właściwy adres profilu; wtedy komponent automatycznie wyświetli link. Obecnie Facebook jest etykietą bez fikcyjnego odnośnika.

Teksty historii i opisu pszczelarza w `o-pasiece.astro` są szablonowe. Gramatury można uzupełnić w opcjonalnym polu `sizes` produktów w `src/data/site.ts`; do tego czasu katalog zachęca do zapytania o dostępne rozmiary. Strona nie zawiera cen ani funkcji sklepu.

Panel dojazdu korzysta z adresu w `src/data/site.ts`. Po uzupełnieniu `contact.directionsUrl` wyświetli przycisk „Wyznacz trasę”; bez adresu mapy wyświetla kontakt telefoniczny. Nie ładuje zewnętrznej mapy.

Przegląd zmian i zakres weryfikacji: [docs/UI-REVIEW.md](docs/UI-REVIEW.md).

## Wdrożenie

Na Vercel wybierz preset Astro, polecenie budowania `npm run build` i katalog wynikowy `dist`. Astro generuje cztery statyczne strony. Fonty Cormorant Garamond i Montserrat są lokalnymi fontami zmiennymi, emitowanymi przez Vite z hashowanymi adresami.

Ustaw zmienną środowiskową `SITE_URL` na potwierdzony adres produkcyjny (pełny adres HTTPS). `astro.config.mjs` przekazuje ją do `site`, a layout generuje canonical, `og:url` i bezwzględny adres zdjęcia Open Graph. Bez tej zmiennej pozostają metadane tytułu, opisu, języka i marki oraz favicon; nie generujemy adresów z localhost ani zgadywanej domeny. Po zmianie `SITE_URL` wykonaj ponowny build.
