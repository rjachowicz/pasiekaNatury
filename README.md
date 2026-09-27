# Pasieka 100% Natury

Statyczna witryna w Astro, ze zwykłym CSS i niewielkim skryptem menu mobilnego. Projekt korzysta z istniejących plików w `public/assets`; nie wymaga frameworka UI ani adaptera serwerowego.

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
- `src/styles/variables.css` — kolory, fonty, szerokość kontenera i odstępy.
- `src/styles/global.css` — reset, typografia, kontener i wspólne układy.
- `src/data/site.ts` — menu, kontakt i podstawowe opisy produktów.
- `public/assets/` — istniejące zdjęcia, logo oraz dekoracje.

Style poszczególnych komponentów są lokalne. Dwie kolumny hero na desktopie mają proporcje 42/58. Wysokości sekcji wynikają z treści, odstępów i ograniczonych wartości `min-height`; obrazy korzystają z `object-fit` i `aspect-ratio`.

## Uzupełnianie szablonu

Dane kontaktowe w `src/data/site.ts` są robocze. Pole `facebookUrl` pozostaje puste, dopóki nie zostanie podany właściwy adres profilu; wtedy komponent automatycznie wyświetli link. Obecnie Facebook jest etykietą bez fikcyjnego odnośnika.

Teksty historii i opisu pszczelarza w `o-pasiece.astro` są szablonowe. Opisy właściwości konkretnych partii i gramatury należy uzupełnić w `produkty.astro`. Strona nie zawiera cen ani funkcji sklepu. Kontakt ma oznaczony kontener pod przyszłą mapę, bez integracji z usługą mapową.

W momencie przebudowy w repozytorium nie było `reference/home-desktop.png`. Układ powstał na podstawie opisu projektu i dostępnych grafik; porównanie z referencją wymaga dodania tego pliku.

## Wdrożenie

Na Vercel wybierz preset Astro, polecenie budowania `npm run build` i katalog wynikowy `dist`. Astro generuje cztery statyczne strony. Fonty Cormorant Garamond i Montserrat są pobierane z Google Fonts, z lokalnymi fontami zastępczymi na wypadek braku połączenia.
