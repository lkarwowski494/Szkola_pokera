# Rola 04, E0: rozpoznanie (2026-11-04)
Rola 04-studio-projektowe, tryb build (prompt: `assemble.mjs 04-studio-projektowe --tryb build`, prompts c025063, moduły: render-i-krytyka, pamiec-portfolio, kontekst-oczy-zajete — ten ostatni pominięty, uzasadnienie w „Konteksty”). Wejście: `docs/scope-contract.md` (E3, D-112), `docs/brd/wymagania.md` (PR-01–PR-09, NFR-DOST-001–002), `docs/monetyzacja.md`, `docs/decyzje.md` (D-101–D-113), `docs/zalozenia.md`, `CLAUDE.md`.

## Środowisko (sprawdzone komendami 2026-11-04)
| Sprawdź | Wynik |
|---|---|
| System, Node, git | Linux 6.18 (chmura, `CLAUDE_CODE_REMOTE=true`), Node 22.23.4; gałąź `claude/sleepy-brahmagupta-2065nu` @ 2964ec2 (lokalnie `rola04-sleepy` śledzi zdalną; stara lokalna gałąź o tej nazwie ma inną historię i została nietknięta) |
| GitHub | MCP GitHub działa (odczyt przebiegów); push przez git na gałąź roboczą |
| Przeglądarka | Playwright 1.63.0, Chromium w `/opt/pw-browsers`; skrypty `zrzuty.mjs`, `kontrast.mjs`, `warsztat.mjs`, `ikona.mjs` z modułu uruchomione próbnie w scratchpadzie (kod 0) |
| Symulator iOS / Xcode | brak (Linux): makiety HTML; SF Pro niedostępny, treść w makiecie krojem zastępczym (podpis na stronie porównania); krój treści oceniany dopiero na telefonie |
| Sieć | `itunes.apple.com/search` 200 (skan E1), Google Fonts CSS 200 (pliki OFL do `docs/design/fonty/`); `github.com/google/fonts/raw` 403 przez proxy — licencje OFL z pakietu kroju albo z Google Fonts |
| Widoczność repo | publiczne: obrazy konkurencji tylko w scratchpadzie, w repo tylko lista z adresami |
| Stan CI na `main` | E2E (Maestro iOS) czerwony w przebiegach 11–18 (13–20.10.2026, odczyt MCP 2026-11-04), potem bez przebiegów; znane znalezisko dla roli 07 (zasada 21), bez wpływu na projekt |
| Dokumenty poza repo | Dysk „Szkoła Pokera” (03 Rejestr, 13 Audyt): konektor bez edycji Google Docs — wpisy decyzji roli 04 trafiają do `docs/decyzje.md`, przeniesienie to krok właściciela |

## Istniejący interfejs (wejście, nie wzór)
- `docs/design/` nie istniało: rola 04 nie miała artefaktów, więc tryb build bez pytania „rozbudować czy porównać”.
- Kod `apps/mobile/src/theme/tokens.ts`: kierunek „stół do gry i notatnik”, akcent sukno `#1F5E45`, tło `#F3F5F2`, krój systemowy, indeksy kart Georgia, promienie 6/10/14. Zakładki: Dziś (`index`), Powtórki, Postęp, Reguły (D-104: Reguły poza interfejsem). Właściciel: „Całkiem od nowa UX, przepływy” (2026-11-03), więc obecny wygląd to inwentarz do E1 (zielone sukno to kandydat na kliszę kategorii, do potwierdzenia skanem), nie punkt wyjścia.

## Przepływy (z kontraktu: wszystkie PR-01–PR-09 w zakresie)
| PR | Kto | Cel (J) | Kroki (skrót) | Częstotliwość | Funkcje |
|---|---|---|---|---|---|
| PR-01 | P-1, P-2, P-3 | J-05 | czym jest aplikacja → ≤ 8 pytań z „Pomiń” → punkt startu → pierwsza lekcja | raz, z powtórzeniem | F-02, F-01, F-16 |
| PR-02 | P-2, P-1 | J-02 | następna lekcja jednym przyciskiem → części z przykładami → ćwiczenia → postęp modułu → dalej albo test modułu | kilka razy w tygodniu [OCENA] | F-03, F-04, F-05, F-06 |
| PR-03 | P-1, P-3 | J-01 | start sesji jednym ruchem → decyzja → ocena w 4 stopniach + „dlaczego” z liczbami → koniec w dowolnej chwili | kilka razy w tygodniu (S-01) | F-07, F-05, F-06, F-08, F-09, F-18 |
| PR-04 | P-1, P-3 | J-03 | liczba powtórek na dziś → kolejka → błędy wracają wcześniej → po przerwie bez kary | codziennie (S-02) | F-10, F-11, F-18 |
| PR-05 | P-1, P-3 | J-04 | wybór scenariusza (pozycja, stack w bb, typ rywala) → decyzje od preflopu do rivera, tylko akcje z oceną (D-109) → podsumowanie decyzji, bez wygranej | kilka razy w tygodniu [OCENA] | F-12, F-05 |
| PR-06 | P-1, P-3 | J-01, J-06 | treść płatna albo wyczerpany limit → co dostaje, plany i ceny ze sklepu → zakup → odblokowanie; przywrócenie; anulowanie | raz | F-13, F-18 |
| PR-07 | wszyscy | J-06 | eksport do pliku → import z podglądem → ten sam postęp; usunięcie z potwierdzeniem | rzadko | F-14 |
| PR-08 | P-1 | RD-12 | „Pomoc” z ustawień albo z lekcji M12 → numer dla kraju → dzwoni jednym dotknięciem | rzadko, możliwy stres | F-15 |
| PR-09 | wszyscy | J-07 | „Zgłoś błąd” przy ocenie zadania → e-mail z identyfikatorem; prośba systemowa o ocenę od 3. pracy co 14 dni (D-110); „Oceń w sklepie”, „Napisz do nas” | rzadko | F-17 |

Każdy przyszły ekran i przycisk ma wiersz w tej tabeli; czego tu nie ma, tego nie projektujemy (w tym F-19–F-21 i kod z D-104: tryb na czas, księga reguł, diagnostyka, część „gra” wskaźnika, gra z botami).

## Konteksty użycia
| Przepływ | Miejsce i światło | Ręce | Oczy | Spojrzenie / sesja | Hałas | Wniosek projektowy |
|---|---|---|---|---|---|---|
| PR-03, PR-04 | dojazd, przerwa: komunikacja, ulica, światło zmienne (słońce, noc) | jedna ręka, kciuk; drugą trzyma się poręczy | wolne, uwaga częściowa, przerwania | decyzja w kilkanaście s [OCENA], sesja 5–10 min (ZAL-010, hipoteza) | głośno: dźwięk nie może nieść znaczenia samodzielnie | akcje w strefie kciuka, cele ≥ 44 pt (decyzje 56–64 pt), przerwanie bez straty (F-07), kontrast w słońcu, ciemny motyw nie oślepia |
| PR-02 | dom, pełna uwaga | obie wolne | wolne | 10–20 min [OCENA] | cicho | czytelność długiego tekstu (wiersz 45–90 znaków, interlinia 1,2–1,45), termin wyjaśniony dotknięciem |
| PR-05 | dom, pełna uwaga | wolne | wolne | 10–30 min [OCENA] | cicho | układ stołu z akcjami, historia decyzji widoczna; podsumowanie bez wygranej i stosu |
| PR-01 | pierwsze uruchomienie | wolne | wolne | ok. 2 min (D-105) | dowolny | ocena poziomu bez wrażenia ankiety: jedno pytanie na ekran, „Pomiń” zawsze, bez ekranu zakupu na końcu |
| PR-06, PR-07, PR-09 | dom, sieć do sklepu / plik / poczta | wolne | wolne | krótko | — | standardowe kontrolki iOS, ujawnienia z `docs/monetyzacja.md` |
| PR-08 | dowolne, możliwy stres | dowolne | dowolne | jedno spojrzenie | dowolny | numer duży, jedno dotknięcie, bez ozdób i bez akcentu sprzedażowego |

Oczy nie są zajęte w żadnym przepływie (użytkownik patrzy na ekran), więc moduł `kontekst-oczy-zajete` jest pominięty; z jego zasad stosuję tylko pkt 4 (kontrast w zmiennym świetle) i jedną dużą akcję w zasięgu kciuka dla PR-03 i PR-04.

## Ograniczenia z projektu (dla interfejsu)
- F-02: jedno zdanie „nauka decyzji, bez gry na pieniądze” i jeden przycisk dalej (OG-07, NFR-ZGOD-002; bloker).
- Bez żetonów do wygrania, stosu, wygranej, kasynowego blichtru (W-07, OG-01, OG-02, ZAL-012); „Tam nie ma być hazardu” (właściciel, 2026-11-03). Wniosek dla E1: metafory kasyna (żetony, jackpot, neon) odpadają z założenia.
- F-05: stopień oceny słowem i znakiem, nie tylko kolorem (NFR-DOST-001, próg 0); kolory kart też nie tylko kolorem (kształt koloru karty).
- F-18: licznik „dziś 1 darmowa aktywność” przed startem, nigdy w trakcie (S-67); słowo „pula” zakazane dla limitu (D-111); lekcje i pierwszy test bez licznika (D-107).
- F-13: ceny ze sklepu, „Przywróć zakupy” na ekranie zakupu i w ustawieniach; zakazane wzorce ekranu zakupu z `docs/monetyzacja.md` (do przeczytania w E3 przy ekranie oferty).
- F-15: „Pomoc” w ustawieniach i w lekcji M12, nie w zakładce Postęp (D-104).
- F-16: 35 języków, w tym JP, VN, TW (pisma inne niż łacińskie): krój tytułów musi mieć wariant zastępczy dla pism, których nie obsługuje (wzór Piekarza: krój systemowy w tytułach dla takich języków).
- Bez reklam, SDK śledzących i konta (standard marki, `CLAUDE.md`).
- OP-19 (podłogi dostępności, właściciel: 04): proponuję zamknąć w E3 tabelą „Podłogi dostępności” z wzorców roli (WCAG 2.2 AA, HIG): próg NFR-DOST-002 = 100% elementów PR-01–PR-08 z etykietą i układem bez ucięć przy AX5; to decyzja merytoryczno-normatywna (źródła szczebla 1), zapis w `docs/decyzje.md` na bramce E3.

## Pamięć portfolio: czego nie powtarzać
- Trening: talerze na sztandze, papier `#F4F3EF` + tusz + niebieski `#1F5FD1`, IBM Plex Sans.
- Organizer: wstążki, piasek `#F7F2EA` + terakota `#B4471F`, Bricolage Grotesque + Atkinson Hyperlegible Next.
- NaviStories: brązowy drogowskaz, brąz `#6B3815` + biel, Jost ss01.
- Piekarz (z `docs/design/design-spec.md` w repo piekarz, odczyt 2026-11-04): akcent „noc” `#1E4954`, tło `#F5F5F2`, Sofia Sans Semi Condensed, spirala planu.
- Obecna Szkoła Pokera: sukno `#1F5E45` (do oceny w skanie jako klisza kategorii).
- Kalibracja domyślnych wyborów z wzorców roli (fiolet, krem + terakota, czerń + kwas, „duża liczba + statystyki”, Inter/Space Grotesk itd.) — test generyczności z kartami kontrolnymi w E2.

## Ekran kluczowy (do decyzji, pytanie na bramce)
- **Rekomendacja: „Decyzja w sesji” w dwóch stanach obok siebie: „przed decyzją” i „po ocenie”** (PR-03, F-07 + F-05 + F-06). Najczęstsza czynność całej pętli (sesja, powtórki, scenariusz i ćwiczenia w lekcji używają tego samego ekranu), kontekst najtrudniejszy (jedna ręka, dojazd), a stan „po ocenie” to miejsce, gdzie aplikacja ma wyróżnik: stopień słowem i znakiem oraz „dlaczego” z liczbami. Tu element firmowy niesie dane (ręka, pozycja, szanse, ocena).
- Alternatywa: „Dziś” (ekran startowy): następna lekcja, liczba powtórek, licznik dziennego limitu przed startem, start jednym ruchem. Pokazuje pętlę i limit, ale łatwo zjeżdża do domyślnego „duża liczba + statystyki” i nie pokazuje oceny zagrania. Zostaje drugim ekranem w E3.

## Założenia z wcześniejszych ról, na których stoję (wszystkie hipotezy)
ZAL-010 (sesja 5–10 min w dojeździe, offline) → kontekst PR-03/PR-04; ZAL-002 (jedna ścieżka z krótką oceną) → PR-01; ZAL-003 (35 języków) → kroje z pokryciem pism; ZAL-012 (scenariusze bez stosu) → brak metafor wygranej. Żadne nie jest podważone przez E0.

## Plan i szacunek
| Etap | Wynik | Agent | Oczekiwanie | Właściciel |
|---|---|---|---|---|
| E1 świat | `01-swiat.md`: inwentarz dziedziny ze źródłami, skan ok. 12 aplikacji (US i PL), ≥ 8 metafor, 3 do rozwinięcia + rezerwa | 1,5–2 h | — | ok. 10 min (bramka) |
| E2 kierunki | 3 makiety ekranu kluczowego + ikony, karty kontrolne, test generyczności, `porownanie.html/png`; po wyborze ok. 5 krojów tytułów | 3–4 h | — | 15–20 min wybór okiem + 5 min krój; opcjonalnie test 5 osób ok. 1 h |
| E3 system | tokeny + `kontrast.mjs`, komponenty, macierz stanów, głos, ikona do plików, 3–5 ekranów × 320/390/430 × jasny/ciemny × AX5 + najdłuższy język; przejście poznawcze kryteriów „Intuicyjność” → `wynik:` do roli 03 | 4–6 h | — | 15–20 min (ikona i ekrany okiem) |
| E4 przekazanie | `design-spec.md`, `wzorce-zrzuty/`, `ikona/`, wpis do pamięci portfolio, sztafeta | ok. 1 h | — | 5 min + dopisanie wpisu w `prompts` |
Razem agent ok. 10–13 h w 3–4 sesjach; czas właściciela ok. 1 h bez testu z osobami.
