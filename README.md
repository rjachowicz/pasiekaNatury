# Pasieka 100% Natury

Statyczna witryna w Astro, ze zwykłym CSS i niewielkimi modułami skryptów klienckich. Obrazy i fonty są importowane z `src/assets`, a ikonowe SVG pozostają w `public/assets`; projekt nie wymaga frameworka UI ani adaptera serwerowego.

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
npm run quality
```

W PowerShell z blokadą skryptów można użyć `npm.cmd` zamiast `npm`.

## Struktura

- `src/pages/` — strony `/`, `/o-pasiece`, `/produkty`, `/kontakt` oraz ich metadane SEO.
- `src/layouts/BaseLayout.astro` — dokument HTML, fonty, nagłówek, treść i stopka.
- `src/components/{about,contact,home,products}/sections/` — kompletne sekcje poszczególnych stron.
- `src/components/{gallery,layout,ui}/` — galeria, wspólny układ i samodzielne elementy interfejsu.
- `src/scripts/` — odseparowana logika przeglądarkowa nawigacji, karuzeli, filtrów, wariantów, lightboxa, mapy, zgód i animacji.
- `src/styles/tokens.css` — kolory, typografia, szerokości kontenerów, odstępy, wymiary i czasy przejść.
- `src/styles/global.css` — punkt wejścia dla resetu, typografii, wspólnych układów i efektów.
- `src/data/site.ts` i `src/data/products.ts` — dane kontaktowe, menu i model produktów.
- `src/utils/` — małe funkcje współdzielone przez render serwerowy i skrypty klienckie.
- `src/assets/` — zdjęcia, logo, dekoracje i lokalne fonty przetwarzane przez Astro i Vite.
- `public/assets/icons/values/` — SVG wymagające stabilnych publicznych URL-i.

Style poszczególnych komponentów są lokalne. Kontener treści ma maksymalnie 1280 px, szeroki 1360 px, tekstowy 720 px. Hero i nawigacja przechodzą na układ mobilny poniżej 900 px, a pozostałe układy dopasowują się przy breakpointach zdefiniowanych w komponentach. Nagłówek sticky ma 110 px na desktopie i 82 px na mobile.

`src/components/ui/AssetImage.astro` korzysta z wbudowanej optymalizacji Astro. Pobiera obraz z typowanej mapy `src/data/imageAssets.ts`, generuje WebP i `srcset`, zachowuje proporcje źródła oraz przekazuje klasy, opisy i atrybuty ładowania. Zdjęcie hero ładuje się z wysokim priorytetem, zdjęcia poniżej pierwszego ekranu korzystają z lazy loading.

## Uzupełnianie szablonu

Gramatury i warianty można uzupełnić w opcjonalnych polach `sizes` i `variants` produktów w `src/data/products.ts`. Strona nie zawiera cen ani funkcji sklepu.

Panel dojazdu korzysta z danych w `src/data/site.ts`. Zewnętrzna mapa Google ładuje się dopiero po wyrażeniu zgody; bez zgody pozostają widoczne adres i odnośnik do wyznaczania trasy.

Przegląd zmian i zakres weryfikacji: [docs/UI-REVIEW.md](docs/UI-REVIEW.md).

## Wdrożenie

Na Vercel wybierz preset Astro, polecenie budowania `npm run build` i katalog wynikowy `dist`. Astro generuje dziewięć statycznych tras. Fonty Cormorant Garamond i Montserrat są lokalnymi fontami zmiennymi, emitowanymi przez Vite z hashowanymi adresami.

Ustaw zmienną środowiskową `SITE_URL` na potwierdzony adres produkcyjny (pełny adres HTTPS). `astro.config.mjs` przekazuje ją do `site`, a layout generuje canonical, `og:url` i bezwzględny adres zdjęcia Open Graph. Bez tej zmiennej pozostają metadane tytułu, opisu, języka i marki oraz favicon; nie generujemy adresów z localhost ani zgadywanej domeny. Po zmianie `SITE_URL` wykonaj ponowny build.
