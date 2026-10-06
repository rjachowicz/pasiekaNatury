# Pasieka 100% Natury

Statyczna witryna Astro ze zwykłym CSS oraz małymi, niezależnymi modułami JavaScript. Obrazy i fonty w `src/assets` są optymalizowane przez Astro, a ikonowe SVG w `public/assets` zachowują stabilne publiczne adresy.

Wymagany jest Node.js `>=22.12.0`. Przy blokadzie skryptów PowerShell użyj `npm.cmd` zamiast `npm`.

## Komendy

```sh
npm run dev
npm run check
npm run lint
npm run format:check
npm run build
npm run test:dist
npm run quality
```

Serwer developerski można uruchomić w tle przez `npm run dev -- --background`, a następnie sprawdzić, przejrzeć logi lub zatrzymać go odpowiednio przez `npm run astro -- dev status`, `npm run astro -- dev logs` i `npm run astro -- dev stop`.

`npm run quality` kolejno uruchamia sprawdzenie Astro/TypeScript, ESLint bez ostrzeżeń, kontrolę formatowania Prettier, jeden build oraz walidację wygenerowanego `dist`.

## Struktura

- `src/pages/` — pięć publicznych tras i dynamiczne strony produktów; build generuje obecnie 18 stron HTML.
- `src/layouts/BaseLayout.astro` — dokument HTML, globalny układ, nagłówek, stopka i elementy prywatności.
- `src/components/` — sekcje stron oraz współdzielone komponenty Astro ze scoped styles.
- `src/data/site.ts` — marka, język, kontakt, adres, współrzędne i profile społecznościowe.
- `src/data/productCategories.ts` — niezależne metadane kategorii; `src/data/products.ts` zawiera katalog produktów.
- `src/data/imageAssets.ts` — typowana mapa assetów używana przez `AssetImage.astro`.
- `src/utils/structuredData.ts` — czyste, typowane generowanie grafu JSON-LD.
- `src/scripts/` — obsługa nawigacji, karuzeli, filtrów, lightboxa, mapy, zgód i animacji.
- `scripts/check-dist.mjs` — walidacja tras, linków, metadanych, JSON-LD, sitemap, robots i sygnatur obrazów.

## Konfiguracja produkcyjna

Skopiuj `.env.example` do odpowiedniego pliku środowiskowego i ustaw `SITE_URL` na pełny kanoniczny adres HTTPS bez ścieżki. Jeżeli zmienna nie jest ustawiona, używany jest `https://www.pasiekanatury.com`. Jawna zmienna środowiskowa ma pierwszeństwo przed wartością z pliku `.env`. Canonicale, Open Graph, Twitter, JSON-LD, sitemap i `robots.txt` korzystają z jednej wartości. Opcjonalne `GOOGLE_SITE_VERIFICATION` tworzy wyłącznie na stronie głównej tag wymagany przez weryfikację URL-prefix Google Search Console.

## Kontrola po wdrożeniu

1. Zweryfikuj kanoniczną domenę w Google Search Console i zgłoś `https://www.pasiekanatury.com/sitemap-index.xml`.
2. W URL Inspection sprawdź stronę główną, `/produkty/` i przykładową stronę produktu, a następnie porównaj canonical wybrany przez Google z adresem deklarowanym w kodzie.
3. Sprawdź przekierowanie 308 z `https://pasiekanatury.vercel.app` dla strony głównej oraz adresu z parametrami.
4. Zweryfikuj dane strukturalne w Rich Results Test albo Schema Markup Validator.
5. Po zebraniu danych porównaj w Search Console zapytania, wyświetlenia i kliknięcia. To nie gwarantuje indeksacji ani określonej pozycji.

Szczegółowa lista czynności po wdrożeniu jest w [docs/SEO-SEARCH-CONSOLE.md](docs/SEO-SEARCH-CONSOLE.md).
