# Wersja angielska: zrzuty (K6) i lista kontrolna telefonu (K7)

Stan: 2026-11-09, sesja Y (rola 09). Wydanie en: D-349; słowniczek en: D-347, D-354; E2E en: flow `apps/mobile/e2e/08-drugi-jezyk.yaml` (D-353).

## K6: zrzuty en do zrobienia

Zrobione dziś automatycznie: E2E robi zrzuty `08-dzis-en` i `08-lekcja-en` (artefakt `e2e-wyniki`, 7 dni). Reszta ekranów zostaje do zrobienia:
procedurą roli 04 (Expo web, `locale` przeglądarki `en-US`, szerokość 320 pt i największy tekst) albo przez `store-screenshots.yml` (pl, en; D-337).
Na każdym zrzucie: tekst po polsku = brak klucza albo tekst wpisany w kodzie; ucięty tekst albo „…” = zgłoszenie do roli 04 (zasada roli 7).

| # | Ekran | Stan | Na co patrzeć |
|---|---|---|---|
| 1 | Powitanie | pierwsze uruchomienie | „PokerGym”, zdanie „no real-money play”, przycisk „Continue” |
| 2 | Ocena poziomu | pierwsze pytanie | przycisk „Skip”, odpowiedzi w 2 wierszach bez ucięcia |
| 3 | Dziś | po „Skip” | tytuł lekcji m0.l1 „Hand rankings”, liczniki (liczba mnoga en: 1 / 2) |
| 4 | Lekcja | m0.l1 i jedna lekcja z tabelą (m2.l1) | szerokość tabel, liczby z separatorem en |
| 5 | Ćwiczenie | pytanie i ekran wyniku | etykiety oceny, wyjaśnienie, „Next” |
| 6 | Powtórki | z co najmniej 1 kartą | licznik kart |
| 7 | Słowniczek | lista i wyszukiwanie „monotone” | tylko nazwy angielskie i definicje, nagłówek „Glossary” (D-354) |
| 8 | Postęp | z ukończoną lekcją | wiersz „Glossary”, wykresy, procenty |
| 9 | Ustawienia | bez pełnego dostępu | najdłuższe etykiety (przypomnienie, dane, „Full access”) |
| 10 | Język | lista | „Same as phone”, „Polski”, „English”, znacznik wybranego |
| 11 | Zakup | z ustawień i po limicie | ceny ze sklepu (bez StoreKit: tekst ładowania), „Restore purchases” |
| 12 | Pomoc | ekran pomocy | zdanie ogólne, link online po angielsku |

## K7: lista kontrolna na telefonie (właściciel, ok. 20–30 min [OCENA])

Build z TestFlight z commitem co najmniej tej sesji. Przed startem zrób eksport postępu (Ustawienia → Dane), jeśli zależy Ci na obecnych danych testowych.

| # | Krok | Oczekiwany wynik | Wynik |
|---|---|---|---|
| T-en-1 | iOS: Ustawienia → Ogólne → Język i region → dodaj English i ustaw jako pierwszy; usuń aplikację i zainstaluj ponownie z TestFlight | nazwa pod ikoną „PokerGym” (D-378) | |
| T-en-2 | Otwórz aplikację | powitanie po angielsku; nigdzie polskich słów | |
| T-en-3 | „Continue”, „Skip” | ekran „Today” po angielsku, pierwsza lekcja „Hand rankings” | |
| T-en-4 | Otwórz lekcję, zrób jedno ćwiczenie | treść, pytanie, ocena i wyjaśnienie po angielsku; liczby z kropką dziesiętną (np. 2.5) | |
| T-en-5 | Postęp → Glossary, wpisz „monotone” | tylko nazwy angielskie i definicje; brak „PL–EN” | |
| T-en-6 | Settings (koło zębate na „Today”) → Language → Polski | teksty od razu po polsku, bez restartu | |
| T-en-7 | Zamknij aplikację (przesuń w górę w przełączniku aplikacji) i otwórz ponownie | dalej po polsku, mimo telefonu po angielsku | |
| T-en-8 | Language → „Same as phone”, zamknij i otwórz | z powrotem po angielsku | |
| T-en-9 | Telefon z powrotem na polski (T-en-1 w drugą stronę), otwórz aplikację | po polsku | |
| T-en-10 | Największy tekst (Ustawienia iOS → Ekran i jasność → Wielkość tekstu, maksimum) przy en: Today, lekcja, ustawienia | bez uciętych przycisków i etykiet (zrzut, jeśli coś jest ucięte) | |
| T-en-11 | VoiceOver przy en: Today i słowniczek | czytane z wymową angielską; słowniczek: „termin. definicja” | |

Samosprawdzenie `Intl` (liczba mnoga) działa przy starcie aplikacji: w buildzie TestFlight błąd nie jest pokazywany, więc kontrolą jest T-en-3 i T-en-4 (np. „1 term” / „2 terms” w słowniczku po wyszukaniu).
