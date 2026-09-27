# Przegląd refaktoru UI

## Zmienione pliki

- `src/styles/variables.css`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/PageHero.astro`
- `src/components/Button.astro`
- `src/components/SectionHeading.astro`
- `src/components/ContactDetails.astro`
- `src/components/CallToAction.astro`
- `src/components/home/Hero.astro`
- `src/components/home/ProductsPreview.astro`
- `src/components/home/AboutPreview.astro`
- `src/components/home/ValuesSection.astro`
- `src/components/home/ApiarySection.astro`
- `src/components/home/GallerySection.astro`
- `src/components/home/ContactPreview.astro`
- `src/pages/o-pasiece.astro`
- `src/pages/produkty.astro`
- `src/pages/kontakt.astro`
- `src/data/site.ts`
- `astro.config.mjs`
- `README.md`

Dodane: `src/components/AssetImage.astro`, `docs/UI-REVIEW.md`.

Kompozycja `src/pages/index.astro` pozostaje bez zmian; jej wygląd zmieniają wspólne style i komponenty. Wszystkie oryginały w `public/assets` zostały zachowane. Zależności aplikacji i stack nie zmieniły się.

## Najważniejsze zmiany UI

- Wspólne osie treści: kontener 1280 px, wariant szeroki 1360 px i tekstowy 720 px. Odstępy sekcji 64–104 px, krótszych sekcji 40–64 px.
- Cormorant Garamond w nagłówkach, Montserrat w treści i UI. Płynna skala, mocniejsze nagłówki, tekst 15–16 px z interlinią 1.6.
- Ciemny sticky header 96 px, logo 108 px, aktywny link z żółtym podkreśleniem. Stopka z marką, nawigacją, kontaktem i dolnym paskiem.
- Hero desktop 600–680 px, kontrolowany kadr pszczoły, mniejszy badge i osobne miejsce na ilustrację lotu pszczoły.
- Cztery słoiki z wyrównanymi podpisami na desktopie; osobna lista produktów na mniejszych ekranach.
- Ciemna sekcja historii z dużą fotografią, subtelny podpis, mniejsze ikony wartości i pełna szerokość fotografii pasieki.
- O pasiece: jedno zdjęcie pszczelarza, osobista sekcja typograficzna, wartości, krajobraz, CTA.
- Produkty: katalog z numeracją, separatorami, charakterem miodu i polem na gramatury.
- Kontakt: czytelne dane i panel dojazdu z działającym odnośnikiem telefonicznym. Kwiaty mieszczą się poza kontenerem treści na dużych ekranach.
- Prostokątne żółte CTA, lekkie hover, widoczny focus także na ciemnym tle, respektowanie ograniczonego ruchu.
- Astro generuje warianty WebP, `srcset` i wymiary obrazów. Wybór rozdzielczości dużych fotografii uwzględnia kadrowanie przez `object-fit: cover`.

## Responsive

| Zakres | Zachowanie |
| --- | --- |
| poniżej 600 px | Wartości w jednej kolumnie, ikona obok tekstu. |
| poniżej 640 px | Lista produktów i katalog w jednej kolumnie, galeria 1+2, pionowa stopka, uproszczony PageHero. |
| 640–899 px | Układy treści w jednej kolumnie; lista produktów, katalog i wartości w dwóch. Stopka z marką ponad dwiema kolumnami. |
| poniżej 900 px | Header 76 px, logo 84 px, menu mobilne nad treścią. |
| poniżej 1000 px | Hero: tekst nad zdjęciem. Podpisy produktów stają się osobną listą. Wartości w dwóch kolumnach od 600 px. |
| 1000 px i więcej | Hero około 42/58, cztery podpisy produktów, cztery wartości, trzy zdjęcia galerii. |
| 1600 px i więcej | Proporcja hero dostosowana do stałej osi treści; content nie rozciąga się wraz z ekranem. |

Menu obsługuje Escape, kliknięcie linku, kliknięcie poza nagłówkiem, wyjście fokusu i zmianę breakpointu. Bez JavaScript pozostaje widoczna nawigacja. Zamknięte menu jest wyłączone z kolejności fokusu przez `visibility: hidden`.

## Dane do uzupełnienia

- Prawdziwy telefon, e-mail i adres w `src/data/site.ts`; obecne wartości nadal są robocze.
- `facebookUrl` i `directionsUrl`. Po uzupełnieniu pojawiają się odpowiednie linki; bez adresu mapy panel dojazdu zachęca do telefonu.
- Opcjonalne `products[].sizes` oraz potwierdzone informacje o partiach i sezonowej dostępności.
- Osobista historia właściciela i pasieki. Istniejące opisy ogólne zostały zachowane.
- Potwierdzona domena w `SITE_URL`. Bez niej canonical i bezwzględne adresy Open Graph są pomijane. Tytuły, opisy, podstawowe OG i favicon są obecne.

Nie są potrzebne nowe grafiki, aby obecny układ działał.

## Weryfikacja

- `npm run build`: sukces, cztery statyczne strony, kod wyjścia 0.
- Kontrola Astro/TypeScript: 23 pliki, 0 błędów, 0 ostrzeżeń, 0 podpowiedzi. Narzędzie uruchomione jednorazowo przez `npm exec` z `@astrojs/check` i zgodnym TypeScript 6, bez dopisywania zależności aplikacji.
- Chromium / Microsoft Edge przez Playwright: wszystkie cztery trasy w szerokościach 320, 360, 390, 430, 540, 640, 768, 820, 1024, 1180, 1280, 1366, 1440, 1600 i 1920 px. 60 kombinacji bez poziomego overflow, brakujących obrazów i błędów JavaScript.
- Końcowy przebieg homepage: 23 szerokości, w tym dodatkowo 599, 600, 639, 899, 900, 999, 1000 i 1599 px przy granicach breakpointów; bez overflow i błędów.
- Przegląd wizualny zrzutów każdej trasy: 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844 i 360×800.
- Axe: cztery trasy przy 390, 768, 1024 i 1440 px; brak zgłoszonych naruszeń reguł WCAG A/AA. To test automatyczny uzupełniony kontrolą klawiatury, nie pełny audyt zgodności.
- Interakcje: menu, przywrócenie fokusu po Escape, brak przesunięcia treści, linki do sekcji produktów poniżej sticky headera, skip link, ograniczony ruch i nawigacja bez JavaScript — poprawne.
- Osobny build z domeną testową potwierdził canonical i OG dla wszystkich tras. Końcowy `dist` powstał bez domeny testowej i nie zawiera localhost.
- `git diff --check`: bez błędów formatowania.

Raporty JSON, skrypty kontrolne i zrzuty z tej sesji znajdują się lokalnie w `node_modules/.cache/pasieka-audit/`. Nie są częścią buildu ani repozytorium. Testy nie obejmowały fizycznych telefonów, Safari i Firefox.
