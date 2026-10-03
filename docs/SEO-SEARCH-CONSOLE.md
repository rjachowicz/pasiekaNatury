# SEO i Google Search Console po wdrożeniu

## Przed zgłoszeniem witryny

1. Ustaw w środowisku produkcyjnym `SITE_URL` na pełny adres HTTPS bez ścieżki i wykonaj nowy build.
2. Wybierz jedną kanoniczną domenę. Gdy docelowa domena będzie znana, skonfiguruj w Vercel lub DNS przekierowania pozostałych wariantów domeny na ten adres.
3. Otwórz pod wybraną domeną `/robots.txt`, `/sitemap-index.xml` i kilka canonicali; sprawdź również `/favicon.png` oraz dane JSON-LD w kodzie strony.
4. Ujednolić dane NAP (nazwa, adres, telefony) pomiędzy witryną, Google Business Profile, mapą i profilami społecznościowymi.

## Google Search Console

1. Dodaj witrynę w Google Search Console. Preferowana jest **Domain Property** zweryfikowana rekordem DNS.
2. Jeżeli użycie Domain Property nie jest możliwe, dodaj **URL-prefix property** i ustaw dostarczony przez Google token jako `GOOGLE_SITE_VERIFICATION`. Po deployu tag pojawi się na stronie głównej.
3. W raporcie Sitemaps prześlij `sitemap-index.xml` z wybranej kanonicznej domeny.
4. W URL Inspection sprawdź stronę główną, `/produkty`, `/kontakt` i kilka stron produktów.
5. Monitoruj raporty indeksowania oraz Core Web Vitals.
6. Sprawdź dane strukturalne w Rich Results Test i Schema Markup Validator. Katalog nie zawiera ofert handlowych ani danych wymaganych dla product rich results.

Kod może przygotować metadane, sitemapę, robots i JSON-LD, ale nie może sam zweryfikować własności w Search Console, zmienić DNS, skonfigurować przekierowań w Vercel ani zagwarantować pozycji w wynikach wyszukiwania.
