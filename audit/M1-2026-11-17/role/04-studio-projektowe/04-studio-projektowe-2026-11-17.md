# Audyt: Studio Projektowe (UX, marka, przepływy) — Szkoła Pokera — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed (gałąź `claude/sesja-ir-audyt-m1`; poza `audit/M1-2026-11-17/` i `docs/decyzje/IR.md` bez różnic w kodzie aplikacji, sprawdzone `git diff --name-only f75acdff HEAD`) · Tryb: audit (M1, plan zatwierdzony przez właściciela 2026-11-17 ok. 11:02 UTC, „c: głęboki”) · Moduły: render-i-krytyka, pamiec-portfolio · Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, git, Playwright 1.63.0 z Chromium (`/opt/pw-browsers`), eksport Expo web z wejściem zastępczym (kod 0, `dowody/eksport-web.txt`); bez macOS, Xcode, symulatora i telefonu, bez SF Pro (krój zastępczy Inter), bez Dynamic Type (AX5 = mnożnik 3,12 jak `scripts/zrzuty/hl-zrzuty.mjs`)

## Podsumowanie
System „Stół w granacie” jest wdrożony wiernie: tokeny w aplikacji są kopią 1:1 projektu, 173 z 174 par kontrastu w czterech wariantach spełnia próg, ikona i ekran startowy pochodzą z tokenów, stopnie oceny nie zależą od koloru (sprawdzone w skali szarości). Najważniejsze ryzyko dotyczy elementu firmowego: po ocenie pasek strategii nie pokazuje granicy między dwiema akcjami innymi niż pas (cała „nie-pas” część jest jednym kremowym blokiem), więc przy zadaniach z trzema akcjami pasek przestaje nieść dane, które ma nieść (001). Drugi obszar to duży tekst: kontrolka poziomu scenariusza ucina nazwy poziomów przy AX5 (003), liczby wyników mają stałe rozmiary bez sufitu i nie mieszczą się przy AX5 (004), a słowo „Dopuszczalna” na skali stopni łamie się w środku wyrazu już przy tekście domyślnym (007). Dodatkowo haptyka wyboru akcji ignoruje wyłączony przełącznik „Wibracje przy odpowiedzi” (002). Żadne znalezisko nie należy do kategorii blokujących z `CLAUDE.md` pkt 1 (dane, awaria, błędne liczby, prywatność, bezpieczeństwo, odrzucenie przez Apple); trzy decyzje czekają na właściciela (wygląd trzeciego segmentu paska, przejście poznawcze, wpis w pamięci portfolio).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 04-studio-projektowe-001 | P1 | D | Pasek strategii po ocenie nie pokazuje granicy między akcjami innymi niż pas | otwarte |
| 04-studio-projektowe-002 | P1 | D | Haptyka wyboru akcji działa mimo wyłączonych „Wibracji przy odpowiedzi” | otwarte |
| 04-studio-projektowe-003 | P1 | D | Kontrolka poziomu scenariusza ucina nazwy poziomów przy dużym tekście | otwarte |
| 04-studio-projektowe-004 | P1 | D | Liczby wyników (wskaźnik, wynik sesji) w stałych rozmiarach poza skalą nie mieszczą się przy AX5 | otwarte |
| 04-studio-projektowe-005 | P1 | D | Tytuły w Literacie nie reagują na „Pogrubiony tekst” | otwarte |
| 04-studio-projektowe-006 | P1 | D | Linki „Słowniczek” i „Pomoc” na ekranie Postęp mają cel dotyku 24 pt | otwarte |
| 04-studio-projektowe-007 | P1 | D | Skala stopni łamie „Dopuszczalna” w środku wyrazu przy tekście domyślnym | otwarte |
| 04-studio-projektowe-008 | P2 | D | Pasek stosu „ty” w ICM poniżej 3:1 w ciemnym motywie ze zwiększonym kontrastem | otwarte |
| 04-studio-projektowe-009 | P2 | D | Postęp pokazuje i czyta surowe identyfikatory rodzin zadań („m0.best-hand”) | otwarte |
| 04-studio-projektowe-010 | P2 | P | Kryteria „Intuicyjność” z kontraktu zakresu nie mają przejścia poznawczego ani wyniku dla roli 03 | otwarte |

Mapowanie na próg wydania (`CLAUDE.md`, „Audyty i wydania” pkt 1): P1 001–007 to WYSOKIE z dopiskiem „bez blokady wg CLAUDE.md pkt 1” (jakość interfejsu i dostępność bez utraty funkcji: dane niesie też tekst albo VoiceOver); P2 = ŚREDNIE/NISKIE do backlogu. KRYTYCZNYCH: 0.

## Linia bazowa i założenia
**E0, stan projektu:** przyjęty z polecenia M1 (w budowie, TestFlight tylko testy wewnętrzne, build 1011, bez użytkowników poza właścicielem; iOS; rynek główny US; standard marki wysoki; 35 języków; przegląd treści zastępczy D-027). Bramka opłacalności: wyjątek nazwany właściciela z 2026-11-17 („Pomiń, wyjątek nazwany”), bez werdyktu w tym audycie. Stan CI (`audit/M1-2026-11-17/wspolne/ci-stan.txt`): CI na f75acdff zielone, E2E w toku przy odczycie, `main` CI zielone; czerwone ręczne workflowy ASC na `main` należą do roli 10. Pełne `pnpm run ci` (wspólne `ci-pelne.log`): kod 0.

**E0b, kontekst użycia ustalony od zera** (przed lekturą `design-spec.md`, z `docs/brd/wymagania.md` PR-01–PR-09):
- PR-03/PR-04 (sesja, powtórki): dojazd, przerwa; jedna ręka, uwaga częściowa, często bez sieci, 5–10 min. Najtrudniejszy kontekst aplikacji; dźwięk nie może nieść znaczenia (hałas), haptyka pomaga, ale musi dać się wyłączyć.
- PR-02/PR-05 (lekcja, scenariusz): dom, pełna uwaga, 10–30 min; czytelność długiego tekstu i stołu.
- PR-08 (pomoc przy hazardzie): rzadko, możliwy stres: wejście musi być łatwe do trafienia.
- Moduł `kontekst-oczy-zajete`: nie dotyczy (żaden przepływ nie dzieje się bez patrzenia).

**Klisze kategorii:** zielone sukno, karty i ciemny granat to klisza aplikacji pokerowych; tu sukno i karty niosą dane zadania (D-119: stół zależy od danych, bez pustych miejsc), a element firmowy to pasek strategii mieszanej (D-116). Klisza z funkcją przestaje być kliszą (lekcja z Treningu). Żetony i pula są wyłączone (cel właściciela „bez hazardu”), co odróżnia aplikację od kategorii.

**Wymiary pokrycia:**
| Wymiar | Wynik |
|---|---|
| Konteksty użycia głównych przepływów | jedna ręka w PR-03: akcje decyzji w pasku ≥ 64 pt (D-121), „Zakończ” z hitSlop 12 (`apps/mobile/src/app/session.tsx:361`); haptyka nie respektuje ustawienia → 002 |
| Stany kluczowych ekranów | macierz `design-spec.md` „Macierz stanów” ma pokrycie w kodzie i tekstach (`dowody/sp11-teksty-grep.txt`; teksty błędów ceny, przywracania, zapisu, braku miejsca, pustych powtórek); stan pierwszej oceny i offline: z kodu, bez zrzutu |
| Element firmowy | pasek przed decyzją: równe segmenty z etykietami; po ocenie: granica pas/reszta widoczna, granica między akcjami nie-pas nie → 001 |
| Podłogi dostępności | kontrast 173/174 (`dowody/sp04-kontrast.txt`) → 008; nic tylko kolorem: ok (zrzuty w skali szarości); AX5 → 003, 004, 007; cele → 006; „Ogranicz ruch”: jedyna animacja (pasek po ocenie) go respektuje (`apps/mobile/src/components/PasekStrategii.tsx:114`) |
| Ruch, haptyka, dźwięk | dźwięku brak (zgodnie ze spec); haptyka z tokenów, przełącznik w ustawieniach → 002 |
| Obecność poza ekranami | ikona iOS 1024 RGB bez alfy, wariant ciemny, Android adaptive z monochrome, pliki identyczne z `docs/design/ikona/` (`dowody/sp21-ikona.txt`); ekran startowy z tokenów `bg` (jasny `#E9EDF5`, ciemny `#0A1430`); widżetów brak; zrzuty sklepu: rola 10 |
| Głos i teksty | wzory spec zachowane, bez wykrzykników na końcu tekstów (0), bez emoji poza symbolami kolorów kart (`dowody/sp11-teksty-grep.txt`); surowe identyfikatory na Postępie → 009 |
| Motyw ciemny i zwiększony kontrast | pełne warianty w tokenach (4 palety, nie odwrócenie), przełączanie z `isDarkerSystemColorsEnabled` (`apps/mobile/src/theme/tokens.ts:56`); 008 |
| Lokalizacja | sufity tytułów liczone od szerokości (D-122); najdłuższy język nie sprawdzony na obrazie w tym audycie (wcześniejsze zrzuty de: `docs/design/dowody/ij-*`) |

**Soczewki** (po kolei, bez subagentów, zgodnie z poleceniem): (1) jedna ręka i uwaga częściowa → 002, 006; (2) VoiceOver i AX5 → 003, 004, 005, 007; (3) krytyk klisz → paleta i sukno mają decyzję (D-117, D-118), kalibracja bez śladów szablonu (brak gradientów, emoji, wersalików z rozstrzeleniem; numeracja tylko w sekwencjach), ale element firmowy traci dane przy trzech akcjach → 001; (4) nowa osoba w pierwszych minutach → ocena poziomu i ekran Dziś nie dają się wyrenderować w web (pełna aplikacja nie startuje w przeglądarce, `apps/mobile/zrzuty-web/wejscie.tsx:2`), brak przejścia poznawczego → 010.

**Wzorzec najlepszych:** porównanie oparte na wzorcach z promptu roli (HIG Branding, Accessibility, Typography; Flighty, Halide, Crouton) i na skanie konkurencji projektu (`docs/design/00-rozpoznanie.md`, `docs/design/01-swiat.md`). W tym audycie nie otwierano stron źródeł ani sklepu US ponownie `[DO USTALENIA: odczyt HIG Typography „Bold Text” w dniu naprawy 005]`. Wniosek: najlepsi trzymają jeden element z danymi czytelny w każdym stanie (Flighty: tablica w każdym stanie lotu); tu stan „trzy akcje po ocenie” wypada z systemu (001).

**Rejestr założeń:** bez propozycji zmian statusu (`docs/zalozenia.md` nie zawiera założeń z obszaru tej roli poza ZAL-010 o długości sesji, nietkniętym przez ustalenia).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Moduł motywu `apps/mobile/src/theme/` (tokeny, kroje, skalowanie) | tak | odczyt; diff z `docs/design/tokeny.ts`: tylko komentarz w linii 3 |
| Kolory, kroje, rozmiary poza motywem (SP-03) | tak | `dowody/sp03-kolory-kroje-grep.txt` |
| Kontrast 4 warianty + pary z kodu | tak | `dowody/sp04-kontrast.txt` (kod 1: jedna para) |
| Skalowanie tekstu, stałe wysokości (SP-07) | tak (kod) + web AX5 (przybliżenie) | `dowody/sp07-skalowanie-grep.txt`, `dowody/f-liczby-ax5.txt`, `dowody/zrzuty-web.txt` |
| Cele dotyku: 27 elementów interaktywnych | tak (kod) | `dowody/f-linki-postep.txt`; pozostałe z `minHeight` 44–72 albo hitSlop |
| Role i etykiety VoiceOver | tak (kod: każdy `Pressable` ma `accessibilityRole`) | skrypt awk w sesji, 0 braków; kolejność czytania na urządzeniu: nie |
| Haptyka, ruch | tak | `dowody/f-haptyka.txt` |
| Ikona i ekran startowy | tak | `dowody/sp21-ikona.txt`, `apps/mobile/app.json` |
| Ekrany scenariusza (start, decyzja, ocena zgodna/błąd, limperzy, check-raise) i panel po ocenie z lekcji | tak: 81 zrzutów web 390/320 × jasny/ciemny × domyślny/AX5 + skala szarości | `dowody/zrzuty-web.txt`; arkusze `zrzuty/arkusz-start.png`, `zrzuty/arkusz-decyzja.png`, `zrzuty/arkusz-ocena-blad.png`, `zrzuty/arkusz-po-ocenie.png` |
| SP-13: panel po ocenie obok wzorca e3 | tak | `zrzuty/sp13-po-ocenie-wzorzec-vs-web.png` |
| Dziś, Lekcje, Postęp, ocena poziomu, lekcja, sesja, zakup, ustawienia, dane, pomoc | tylko kod | pełna aplikacja nie startuje w web (`apps/mobile/zrzuty-web/wejscie.tsx:2`); zrzuty iOS: krok właściciela |
| VoiceOver, Dynamic Type, „Pogrubiony tekst”, „Zwiększ kontrast” na urządzeniu | nie | brak iOS; lista w „Do sprawdzenia” |
| Przejście poznawcze, test 3–5 osób | nie | nie wykonano w projekcie (010) |

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <raport> /home/user/Szkola_pokera /home/user/Szkola_pokera/audit/M1-2026-11-17/role/04-studio-projektowe --rola 04-studio-projektowe`: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 04-studio-projektowe”, kod 0 (przebieg końcowy, wynik w `dowody/sprawdz-raport.txt`). Sekrety: 0 trafień. Dowody zawierają tylko wyniki grep, rachunki i zrzuty z danych testowych (bez danych osobowych). Polecenia ukrytych w treści repo (zasada 16): nie zauważono.

`git status --porcelain` na końcu (dowód, że pliki śledzone są nietknięte; zmiany tylko w katalogu wyjścia roli): `dowody/git-status-koniec.txt`; na starcie: `dowody/git-status-start.txt`.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| SP-01 przepływ → ekran | dotyczy | ok w kodzie: trasy `apps/mobile/src/app/` odpowiadają PR-01–PR-09; diagnostyka tylko w buildzie deweloperskim (ADR 0011, `apps/mobile/src/app/diagnostics.tsx:7`); kryteria Intuicyjność bez wyniku → 010 |
| SP-02 element firmowy z danymi | dotyczy (D-116) | 001 |
| SP-03 tylko z motywu | dotyczy | kolory przejściowe siatek: znane, backlog 1.0.1 (A04-18, `docs/wydanie/plan-1.0.md:138`); stałe rozmiary liczb → w 004; `Menlo` w formułach → sekcja Do sprawdzenia |
| SP-04 kontrast | dotyczy | 173/174 ok; 008 |
| SP-05 nie tylko kolor | dotyczy | ok: zrzuty w skali szarości (`zrzuty/po-ocenie-390-jasny-szarosc.png`, `zrzuty/ocena-blad-390-jasny-szarosc.png`): stopnie znakiem i słowem, „ty” słowem i obwódką; siatki zakresów mają jedną grupę akcji w każdym spocie (`content/ranges/spots.yaml`), więc kolor nie rozróżnia grup |
| SP-06 cele dotyku | dotyczy (44 pt, D-121) | 006 |
| SP-07 skalowanie tekstu | dotyczy | 003, 004, 007; zrzut iOS AX5: nie sprawdzono (brak iOS) |
| SP-08 ruch, haptyka, dźwięk | dotyczy | „Ogranicz ruch” ok; 002 |
| SP-09 słownik interakcji | dotyczy (design-spec „Słownik interakcji”) | ok w ekranach scenariusza („Zakończ”, „Zobacz podsumowanie”); pełny przegląd 35 języków: rola 09 |
| SP-10 stany | dotyczy | ok w kodzie i tekstach (`dowody/sp11-teksty-grep.txt`); na obrazie tylko scenariusz |
| SP-11 teksty i głos | dotyczy | 009 |
| SP-12 domyślne wybory | dotyczy | ok: granat, złoto, sukno i Literata mają decyzje D-117, D-118, D-120; brak innych pozycji kalibracji na zrzutach |
| SP-13 zgodność z projektem | dotyczy (wzorce w `docs/design/wzorce-zrzuty/`) | panel po ocenie: kreskowanie pasa zastąpione obwódką kreskowaną (D-284, nazwane), krój Literata nieobecny w web (renderer); 001, 007; ekrany Dziś/Lekcje/Postęp: nie sprawdzono (web nie renderuje) |
| SP-14 kroje i licencja | dotyczy | ok: Literata SemiBold, OFL 1.1 (`apps/mobile/assets/fonts/OFL-literata.txt`), treść krojem systemowym; trzecia rodzina `Menlo` → „Do sprawdzenia” |
| SP-15 standardowe elementy, gesty | dotyczy | malowanie siatki gestem ma alternatywę (pola jako checkbox z akcją `activate`, `apps/mobile/src/components/PaintGrid.tsx:138`); nawigacja i arkusze na urządzeniu: nie sprawdzono (Expo web nie jest dowodem dla SP-15) |
| SP-16 ikona, start, intro | dotyczy | ok: tło startu z tokenów `bg`, brak intro |
| SP-17 kontekst użycia | dotyczy, P1 (nie jazda) | ok co do układu (akcje 64 pt, „Zakończ” 48 pt z hitSlop); 002 dotyczy tego kontekstu |
| SP-18 VoiceOver, „Pogrubiony tekst” | dotyczy | role i etykiety ok w kodzie; 005; kolejność czytania na urządzeniu: nie sprawdzono |
| SP-21 ikona | dotyczy | ok (`dowody/sp21-ikona.txt`); arkusz 29 pt z etapu build (`docs/design/ikona/arkusz.png`) |

## Znaleziska (szczegóły)

### 04-studio-projektowe-001 · Pasek strategii po ocenie nie pokazuje granicy między akcjami innymi niż pas
- Pozycja listy kontrolnej: SP-02
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: procenty niosą podpisy i etykieta VoiceOver)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/components/PasekStrategii.tsx:159` każdy segment nie-pas ma wypełnienie `raiseFill` i granicę `onFelt`; `apps/mobile/src/theme/tokeny.ts:23` i `apps/mobile/src/theme/tokeny.ts:40` oba mają wartość `#FFFDF7`, więc granica ma kontrast 1:1 do obu sąsiadów. Zrzut `zrzuty/po-ocenie-390-jasny.png` (CO, J9o: pas 10%, sprawdzenie 70%, przebicie 20%): oś pokazuje ciemny pas i jeden kremowy blok 90%. Makieta zna tylko dwa segmenty (`docs/design/ekrany/e3.css:115`), więc projekt nie ma stylu dla drugiej akcji nie-pas. Szczegóły: `dowody/f-pasek-granica.txt`.
- Mechanizm: system kolorów paska ma dwa role-kolory (pas, przebicie), a komponent rysuje każdą akcję nie-pas jako „przebicie”; `grep -n "raiseFill" apps/mobile/src` → 1 trafienie w kodzie ekranu (`apps/mobile/src/components/PasekStrategii.tsx:159`). Para kontrastu w tokenach mierzy tylko parę przebicie obok pas.
- Powraca: nie (A04-13 dotyczył wysokości i obrysu osi, naprawiony)
- Wzorzec lub źródło: zasada studia 2 (element firmowy niesie dane); WCAG 2.2, 1.4.11 (3:1 dla grafiki niosącej informację; próg z „Podłóg dostępności” wzorców roli); D-116
- Kroki w aplikacji: lekcja albo sesja z zadaniem strategii o trzech akcjach (pas, sprawdzenie, przebicie) → wybór → ocena: pasek nie pokazuje, ile z 90% to sprawdzenie, a ile przebicie.
- Opcje: (a) granica między segmentami nie-pas w kolorze `actionEdge`/`felt2` (ciemna kreska 1,5 pt na kremie, ≥ 3:1) — najmniejsza zmiana, zachowuje dwa kolory; (b) osobne wypełnienie dla sprawdzenia (np. `onFeltMuted`) — więcej informacji kolorem, wymaga nowej pary i decyzji „jedna barwa = jedno znaczenie”; (c) wzór (kropki) dla sprawdzenia — niezależny od koloru, więcej pracy w RN. Rekomendacja: (a).
- Test akceptacyjny: test komponentu z trzema opcjami nie-pas: granica między segmentami nie-pas ma kolor różny od `raiseFill` i kontrast ≥ 3:1 (nowa para w `pary` tokenów, liczona dla 4 wariantów); zrzut `po-ocenie` 390 jasny pokazuje dwie granice.
- Status: otwarte

### 04-studio-projektowe-002 · Haptyka wyboru akcji działa mimo wyłączonych „Wibracji przy odpowiedzi”
- Pozycja listy kontrolnej: SP-08
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/components/PasekStrategii.tsx:93` wywołuje haptykę bez sprawdzenia ustawienia; `apps/mobile/src/app/session.tsx:250` dla oceny sprawdza `if (haptics)`; etykieta przełącznika `apps/mobile/src/i18n/locales/pl.json:316` (Wibracje przy odpowiedzi). `dowody/f-haptyka.txt`.
- Mechanizm: ustawienie czytane tylko na ekranie sesji, a komponent paska (sesja, lekcja, scenariusz) wywołuje haptykę sam; `grep -rn "wykonajHaptyke(" apps/mobile/src` → 2 trafienia, 1 bez warunku (`apps/mobile/src/components/PasekStrategii.tsx:93`). Scenariusz nie ma żadnego odczytu ustawienia.
- Powraca: nie
- Wzorzec lub źródło: zasada studia 8 („oba są do wyłączenia”, HIG Playing haptics); kontekst PR-03 (komunikacja, jedna ręka)
- Kroki w aplikacji: Ustawienia → wyłącz „Wibracje przy odpowiedzi” → sesja ćwiczeń albo scenariusz → dotknij akcję: telefon wibruje.
- Opcje: (a) warunek w `wykonajHaptyke` (jedno miejsce, czyta `useSettings`/stan) — jedna kontrola dla wszystkich wywołań; (b) prop `haptyka` w `PasekStrategii` — więcej miejsc do pilnowania. Rekomendacja: (a), z testem strażnikiem.
- Test akceptacyjny: test: przy `haptics = false` dotknięcie segmentu paska nie wywołuje `expo-haptics` (mock), w sesji i w scenariuszu; strażnik grep: `wykonajHaptyke` tylko przez funkcję sprawdzającą ustawienie.
- Status: otwarte

### 04-studio-projektowe-003 · Kontrolka poziomu scenariusza ucina nazwy poziomów przy dużym tekście
- Pozycja listy kontrolnej: SP-07
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: wybór „Automatycznie” jest domyślny, a zdanie pod kontrolką podaje bieżący poziom)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:244` wiersz segmentów bez zawijania (`flexDirection: 'row'`, `overflow: 'hidden'`), `apps/mobile/src/features/scenariusz/komponenty.tsx:245` segment `flex: 1`; tekst `styl.drobny` bez sufitu. Zrzut `zrzuty/start-320-jasny-ax5.png`: słowo Automatycznie widać jako „omatyc”; `dowody/zrzuty-web.txt`: Automatycznie poza ekranem przy 390 i 320 pt AX5, oba motywy. Ten sam wynik był w pomiarze sesji HH (`docs/design/dowody/hh-przepelnienie.txt:207`), bez znaleziska.
- Mechanizm: kontrolka segmentowa bez gałęzi dużego tekstu (pasek akcji ma ją: `podstawaSegmentu` i zawijanie, `apps/mobile/src/theme/skalowanie.ts:11`); `grep -n "WyborPoziomuUI" apps/mobile/src` → 1 komponent. Przy czterech poziomach (Automatycznie, Łatwy, Średni, Trudny) każdy segment ma ok. 70 pt na 320 pt.
- Powraca: tak, pomiar HH bez znaleziska → trwała kontrola: test układu przy `fontScale` 3,12 (segmenty w pionowym stosie) i kontrola „poza ekranem” w `scripts/zrzuty/hl-zrzuty.mjs` dla ekranu `start` jako twarda przy AX5
- Wzorzec lub źródło: podłoga „Tekst” (HIG Typography: przy dużym tekście układ pionowy); D-121 (0 tekstów uciętych przy AX5)
- Kroki w aplikacji: Rozmiar tekstu AX5 → Scenariusze → wybierz scenariusz → ekran startu: nazwy poziomów ucięte.
- Opcje: (a) przy skali ≥ progu kafelków kontrolka jako lista radiowa w pionie — standard HIG, dłuższy ekran; (b) zawijanie segmentów jak `PasekStrategii` — spójne z elementem firmowym. Rekomendacja: (a) (to standardowa kontrolka iOS, nie element firmowy).
- Test akceptacyjny: test ekranu startu przy `fontScale` 3,12: segmenty w kolumnie; zrzut web 320 AX5 bez „poza ekranem”.
- Status: otwarte

### 04-studio-projektowe-004 · Liczby wyników (wskaźnik, wynik sesji) w stałych rozmiarach poza skalą nie mieszczą się przy AX5
- Pozycja listy kontrolnej: SP-07
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: ta sama liczba jest w etykiecie VoiceOver i w wierszu „Wiedza N”)
- Realność: realny · Pewność: wysoka (rachunek; zrzut iOS nie wykonany)
- Rodzaj: D
- Dowód: `apps/mobile/src/features/advancement/AdvancementCard.tsx:61` liczba 30 pt w kole `apps/mobile/src/features/advancement/AdvancementCard.tsx:59` 72×72 pt; `apps/mobile/src/app/session.tsx:661` wynik sesji 56 pt; `apps/mobile/src/app/advancement.tsx:98` 56 pt. Przy AX5: 93,6 pt w kole 72 pt (wychodzi poza plakietkę i nachodzi na tytuł w pionowym stosie), „12/15” ok. 175 pt nie mieści się w 288 pt i łamie się w środku liczby. Rachunek: `dowody/f-liczby-ax5.txt`.
- Mechanizm: rozmiary wpisane w style ekranów zamiast skali `typografia.skala` z sufitem `maxW` (D-122); `grep -rnE "fontSize: (30|56)" apps/mobile/src` → 3 trafienia (wyżej). Makieta plakietki ma `min-width` i rośnie z tekstem (`docs/design/ekrany/menu.css:96`), aplikacja ma stałe koło.
- Powraca: nie (A04-07 wdrożył sufit tylko dla stylów `tytul*`)
- Wzorzec lub źródło: podłoga „Tekst”: kluczowe liczby nie są ucinane (HIG Typography); D-121; SP-03 (rozmiar spoza modułu motywu)
- Kroki w aplikacji: AX5 → zakładka Postęp (plakietka wskaźnika); zakończ sesję albo egzamin (ekran wyniku).
- Opcje: (a) styl „liczba wyniku” w tokenach z sufitem `maxW` jak tytuły, plakietka z `minWidth` zamiast stałej szerokości; (b) `maxFontSizeMultiplier` lokalnie — szybciej, ale poza systemem. Rekomendacja: (a).
- Test akceptacyjny: test przy `fontScale` 3,12 na szerokości 320: rozmiar liczby ≤ sufitu, plakietka nie ma stałej szerokości; grep `fontSize: [0-9]` w ekranach = 0 poza siatkami (A04-18).
- Status: otwarte

### 04-studio-projektowe-005 · Tytuły w Literacie nie reagują na „Pogrubiony tekst”
- Pozycja listy kontrolnej: SP-18
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: tytuły mają już wagę 600, treść systemowa reaguje)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: w `apps/mobile/src` 0 trafień `BoldText`; w aplikacji jest jeden plik kroju `apps/mobile/assets/fonts/Literata-SemiBold.ttf`; RN 0.88.1 ma `isBoldTextEnabled` (`node_modules/react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo.js:86`). Uzasadnienie wyboru kroju w `docs/design/02-kierunki.md:170` zakładało reakcję na ustawienie Pogrubiony tekst. `dowody/f-pogrubiony.txt`.
- Mechanizm: krój własny ładowany po nazwie pliku jednej odmiany (`apps/mobile/src/theme/kroje.ts:7`), bez odczytu ustawienia systemu; dotyczy wszystkich stylów `tytul*`, `slowoStopnia` i indeksu karty (`apps/mobile/src/theme/tokens.ts:86`).
- Powraca: nie (HH oznaczył „nie sprawdzono”)
- Wzorzec lub źródło: podłoga „VoiceOver… własne kroje reagują na »Pogrubiony tekst«” (wzorce roli, HIG Accessibility i Typography)
- Kroki w aplikacji: Ustawienia iOS → Dostępność → Wyświetlanie i rozmiar tekstu → Pogrubiony tekst → tytuły w aplikacji bez zmiany, treść pogrubiona.
- Opcje: (a) dołączyć Literata Bold (OFL) i przełączać przy `isBoldTextEnabled` + zdarzeniu `boldTextChanged` — zgodne z uzasadnieniem D-120, +1 plik kroju; (b) przy włączonym ustawieniu tytuły krojem systemowym bold (jak od AX1) — bez nowego pliku, traci krój tożsamości w tym trybie. Rekomendacja: (b) (ta sama gałąź co D-122, mniej ryzyka).
- Test akceptacyjny: test czystej funkcji `krojTytulu` z flagą pogrubienia; mock `isBoldTextEnabled` = true daje inny krój albo wagę; pozycja na liście telefonu.
- Status: otwarte

### 04-studio-projektowe-006 · Linki „Słowniczek” i „Pomoc” na ekranie Postęp mają cel dotyku 24 pt
- Pozycja listy kontrolnej: SP-06
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: Pomoc jest też w Ustawieniach jako wiersz 44 pt; 24 pt spełnia WCAG 2.2 AA 2.5.8, nie spełnia minimum HIG 28 pt)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/app/(tabs)/progress.tsx:78` i `apps/mobile/src/app/(tabs)/progress.tsx:81`: `Pressable` bez stylu, `minHeight` i `hitSlop`; wysokość = wiersz `styl.tresc` 24 pt. Słowniczek ma tylko to wejście (`grep "'/glossary'"` → 1 trafienie). `dowody/f-linki-postep.txt`.
- Mechanizm: linki tekstowe bez wspólnego komponentu z minimalnym celem; na ekranie Dziś ten sam rodzaj linku ma `minHeight: 44` (`apps/mobile/src/app/(tabs)/index.tsx:115`). 2 trafienia w wydaniu (+1 w buildzie deweloperskim, diagnostyka).
- Powraca: nie
- Wzorzec lub źródło: podłoga „Cel dotykowy” 44×44 pt (decyzja studia, D-121), minimum HIG 28×28; PR-08 (pomoc w stresie)
- Kroki w aplikacji: zakładka Postęp → „Słowniczek”/„Pomoc” na dole ekranu.
- Opcje: (a) wspólny komponent linku z `minHeight: 44` (jak na Dziś) — jedna kontrola; (b) `hitSlop` 10 — mniejsza zmiana, cel nadal niewidoczny w układzie. Rekomendacja: (a), z testem strażnikiem dla `accessibilityRole="link"` bez `minHeight`.
- Test akceptacyjny: test: każdy element z rolą `link` ma `minHeight` ≥ 44 albo `hitSlop` dający ≥ 44.
- Status: otwarte

### 04-studio-projektowe-007 · Skala stopni łamie „Dopuszczalna” w środku wyrazu przy tekście domyślnym
- Pozycja listy kontrolnej: SP-13
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: słowo czytelne, stopień niesie też znak i etykieta)
- Realność: realny · Pewność: wysoka (pomiar web z Inter + rachunek dla SF Pro)
- Rodzaj: D
- Dowód: zrzut `zrzuty/po-ocenie-390-jasny.png` i `zrzuty/sp13-po-ocenie-wzorzec-vs-web.png`: „Dopuszcz/alna” w dwóch wierszach przy 390 pt bez dużego tekstu, gdy twoim stopniem jest „Zgodna”; podstawa przedziału nie-twojego 76 pt (`apps/mobile/src/theme/skalowanie.ts:13`), wzorzec e3 pokazuje słowo Dopuszczalna tylko jako przedział „twój” (112 pt). Rachunek: `dowody/f-skala-dopuszczalna.txt`.
- Mechanizm: podstawy przedziałów liczone dla układu makiety, w której najdłuższe słowo zawsze było „twoje”; słowo stopnia nie wpływa na podstawę (por. `podpisSegmentu` paska, D-1910). 1 komponent (`apps/mobile/src/components/SkalaStopni.tsx:24`).
- Powraca: nie (A04-06 dotyczył AX przy 390/430)
- Wzorzec lub źródło: D-122 (łamanie w środku wyrazu tylko przy AX3–AX5 na 320 pt)
- Kroki w aplikacji: sesja ćwiczeń, zadanie strategii, wybór ocenionej jako Zgodna albo Błąd → skala stopni pod paskiem.
- Opcje: (a) podstawa przedziału z szerokości najdłuższego słowa stopnia w języku (jak `podpisSegmentu`) — działa w 35 językach; (b) trzy równe przedziały, twój tylko złotą obwódką — prostsze, zmienia makietę. Rekomendacja: (a).
- Test akceptacyjny: test czystej funkcji podstawy: dla pl przy 320 i 390 pt pole tekstu ≥ szerokość „Dopuszczalna” w `drobny` semibold; zrzut web 390 bez łamania.
- Status: otwarte

### 04-studio-projektowe-008 · Pasek stosu „ty” w ICM poniżej 3:1 w ciemnym motywie ze zwiększonym kontrastem
- Pozycja listy kontrolnej: SP-04
- Poziom: P2
- Realność: brzegowy (tylko „Zwiększ kontrast” + ciemny; liczba obok niesie tę samą informację) · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/sp04-kontrast.txt`: darkHigh `goldOnBg` `#E9BC4C` na `separator` `#5A6C9C` = 2,90:1 (próg 3); `apps/mobile/src/features/scenariusz/komponenty.tsx:203`; separator wariantu `apps/mobile/src/theme/tokeny.ts:100`. Pomiar projektu `docs/design/kontrast-da.txt` obejmował tylko jasny i ciemny.
- Mechanizm: pary paska stosu nie są w `pary` tokenów, więc tabela czterech wariantów ich nie liczy; jaśniejszy `separator` w darkHigh obniża kontrast toru.
- Powraca: nie
- Wzorzec lub źródło: WCAG 2.2, 1.4.11 (próg z „Podłóg dostępności”)
- Kroki w aplikacji: iOS ciemny + Zwiększ kontrast → scenariusz ICM (bańka) → lista stosów.
- Opcje: (a) dopisać pary paska stosu do `pary` i dobrać `separator` darkHigh albo kolor toru; (b) obwódka paska — więcej rysunku. Rekomendacja: (a).
- Test akceptacyjny: `pary` zawiera „pasek stosu ty/inni na torze”; test kontrastu 4 wariantów zielony.
- Status: otwarte

### 04-studio-projektowe-009 · Postęp pokazuje i czyta surowe identyfikatory rodzin zadań („m0.best-hand”)
- Pozycja listy kontrolnej: SP-11
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/app/(tabs)/progress.tsx:68` wiersz pod tytułem lekcji pokazuje `w.family`; identyfikatory mają postać `m0.best-hand` (`dowody/f-postep-id.txt`). Tekst nie przechodzi przez `t()`, więc jest taki sam w 35 językach i VoiceOver czyta go jako zwykły tekst.
- Mechanizm: etykieta rodziny to tytuł lekcji (`apps/mobile/src/data/content/repo.ts:203`), więc dwie rodziny z jednej lekcji mają ten sam tytuł, a identyfikator je rozróżnia; 1 trafienie.
- Powraca: nie
- Wzorzec lub źródło: „Głos interfejsu”: słowa użytkownika, nie systemu
- Kroki w aplikacji: kilka sesji z błędami → Postęp → „Najsłabsze”.
- Opcje: (a) nazwa rodziny w treści (pole tytułu w bazie, przekład 35 języków) — poprawne, koszt treści; (b) usunąć wiersz z identyfikatorem, przy powtórzeniu tytułu dopisać „ćwiczenie 1/2” — bez nowej treści. Rekomendacja: (b) teraz, (a) przy następnej fali treści.
- Test akceptacyjny: test ekranu Postęp: brak tekstu pasującego do `^m\d+\.` w drzewie.
- Status: otwarte

### 04-studio-projektowe-010 · Kryteria „Intuicyjność” z kontraktu zakresu nie mają przejścia poznawczego ani wyniku dla roli 03
- Pozycja listy kontrolnej: SP-01
- Poziom: P2
- Realność: realny (luka procesu, nie defekt ekranu) · Pewność: wysoka
- Rodzaj: P
- Dowód: `docs/scope-contract.md:150` „przejście poznawcze na prototypie (rola 04)” w wierszu „Nie sprawdzone”; `docs/design/design-spec.md:113` odkłada je „po implementacji, na TestFlight”; implementacja jest w buildach 1005–1011, a w `docs/` brak wpisu `wynik: pozytywny|negatywny`.
- Mechanizm: kryterium zasady wspólnej 18 (funkcja „da się jej używać bez instrukcji”) nie ma właściciela kroku po implementacji.
- Powraca: nie
- Wzorzec lub źródło: kontrakt roli 04 (wejście: kryteria „Intuicyjność” sprawdzane na prototypie); zasada wspólna 18
- Kroki w aplikacji: —
- Opcje: (a) przejście poznawcze agenta (cztery pytania Flaherty) na zrzutach z iOS PR-01–PR-05 + wynik do 03 — tanio, bez ludzi, słabszy dowód; (b) test 3–5 osób bez instrukcji na TestFlight z listą zadań od agenta — mocniejszy dowód, czas właściciela ok. 1–2 h; (c) odłożyć do przeglądu eksperta (gdy będą użytkownicy). Rekomendacja: (a) przed upublicznieniem, (b) przy pierwszych testerach zewnętrznych.
- Test akceptacyjny: wpis `wynik: …, data, plik` w `docs/scope-contract.md` dla każdego kryterium „Intuicyjność”.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- `Menlo` w formułach lekcji (`apps/mobile/src/components/Blocks.tsx:119`): trzecia rodzina krojów poza modułem motywu (SP-14, SP-03); brak zapisanej decyzji — do potwierdzenia, czy to świadomy wyjątek (cyfry stałej szerokości we wzorach). Brakuje: decyzji albo przeglądu formuł na iOS.
- Siatka zakresów w lekcji (`apps/mobile/src/components/RangeGrid.tsx:18`): etykieta VoiceOver podaje tylko tytuł i procent grania, nie skład zakresu (SP-18, grafika z danymi). Brakuje: ustalenia, czy tekst lekcji obok podaje skład (wtedy ok).
- Przecinek na początku wiersza po kartach w tekście wyjaśnienia (`zrzuty/arkusz-ocena-blad.png`, „, sprawdzą głównie lepsze ręce”): może być efektem renderera web. Brakuje: zrzutu z iOS.
- Panel po ocenie w ciemnym motywie na zrzutach web ma tekst wyjaśnienia jasny na białym (`zrzuty/arkusz-po-ocenie.png`, druga kolumna): to tło fikstury zrzutowej (`apps/mobile/zrzuty-web/wejscie.tsx:107` bez `Screen`), nie aplikacji — nie zgłaszane; do poprawy w narzędziu zrzutów.
- Kolejność czytania VoiceOver, ogłoszenie oceny, Dynamic Type i „Zwiększ kontrast” na urządzeniu: krok właściciela (lista niżej, „Decyzje dla właściciela” pkt 4).

## Co działa dobrze i należy zachować
- Jedno źródło prawdy tokenów: aplikacja ma kopię 1:1 `docs/design/tokeny.ts` z testem zgodności; cztery pełne warianty palety zamiast odwracania.
- Stopnie oceny bez koloru (znak + słowo + obwódka), „złoto = ty” konsekwentnie w stole, pasku, skali i scenariuszu; skala szarości nie traci informacji.
- Stół zależny od danych zadania (D-119) i etykiety VoiceOver budowane z tych samych danych; każdy element interaktywny ma rolę.
- „Ogranicz ruch” w jedynej animacji, haptyka z tokenów, bez dźwięku.
- Ikona: pliki zgodne z wymaganiami iOS (1024, bez alfy, wariant ciemny), identyczne z projektem.
- Teksty błędów mówią, co się stało i co zrobić; brak słowa „pula” dla limitu, brak wykrzykników.

## Decyzje dla właściciela
1. **Wygląd trzeciego segmentu paska strategii (001)** — sprawa wyglądu: (a) ciemna kreska granicy między akcjami (rekomendacja: najmniejsza zmiana, zachowuje dwa kolory paska); (b) osobny kolor dla sprawdzenia (więcej informacji, ryzyko „kolorowej checklisty” z D-116); (c) wzór kropkowany (niezależny od koloru, więcej pracy).
2. **Przejście poznawcze (010)**: (a) przejście agenta na zrzutach iOS przed upublicznieniem (rekomendacja); (b) test 3–5 osób na TestFlight (ok. 1–2 h właściciela); (c) odłożyć do eksperta.
3. **Pamięć portfolio (pierwszy wpis tej aplikacji)** — propozycja wiersza do repo `prompts`: „Szkoła Pokera („Stół w granacie”) | pasek strategii mieszanej jak bateria: równe segmenty-przyciski przed decyzją, po ocenie granice przesunięte do częstości solvera, złoty znacznik nad twoim wyborem; stół z góry zależny od zadania (miejsca tylko przy pozycji); ikona: karty J9 i pasek na granacie | granat `#0A1430`/`#22488A`, złoto `#E2B850` (wyłącznie „ty”), sukno `#23694D`, kość słoniowa `#FFFDF7`, kier `#C8102E` | Literata 600 (tytuły, indeksy kart), treść systemowa | 04.11.2026: rundy 1–2 odrzucone („jak checklista”, „badziewne”), punkt odniesienia: poprzednia aplikacja (granat, złoto); pasek-bateria polubiony; złoto + granat + sukno należą do Szkoły Pokera”. Opcje: (a) wpisać tak (rekomendacja); (b) wpisać po naprawie 001.
4. **Lista zrzutów i sprawdzeń na iPhonie (krok właściciela, ok. 20 min):** pliki `ios-<ekran>-<motyw>-<rozmiar>.png` dla ekranów Dziś, Lekcje, Postęp, sesja (przed decyzją i po ocenie zadania z trzema akcjami), start scenariusza, zakup — jasny i ciemny, tekst domyślny i AX5; plus: „Pogrubiony tekst” włączony (Dziś, ocena), „Zwiększ kontrast” + ciemny (scenariusz ICM), przełącznik wibracji wyłączony i dotknięcie akcji (002).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 04-studio-projektowe --tryb fix --zadania 04-studio-projektowe-001,04-studio-projektowe-002,04-studio-projektowe-003,04-studio-projektowe-004,04-studio-projektowe-005,04-studio-projektowe-006,04-studio-projektowe-007` (001 po decyzji właściciela pkt 1; 008–010 do backlogu z wersją przed upublicznieniem; wdrożenie w kodzie: rola 08).
