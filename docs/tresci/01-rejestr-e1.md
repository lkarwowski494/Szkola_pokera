# Rola 06 Treści, build, E1: rejestr twierdzeń (2026-11-04)

Rejestr: `docs/tresci/rejestr.json` (scalony z `docs/tresci/rejestr/*.json`), dowody odczytu `docs/tresci/odczyty/*.tsv`, raporty partii `docs/tresci/e1-*.md`. Format według D-141. Weryfikatorzy: 6 subagentów w świeżym kontekście (partie M0–M4, M5–M8, M9–M11, M12–M13, terminy, pomoc i parametry), każdy cytat sprawdzony dosłownie na surowym tekście strony pobranej 2026-11-04 (skrypty partii zgłosiły 0 nieznalezionych cytatów).

## 1. Kontrola mechaniczna
`node docs/tresci/narzedzia/scal-rejestr.mjs --przed-przegladem` → **kod 0**: 1042 twierdzenia, 137 pozycji bez twierdzenia (dane zadań, stałe pomocnicze, 5 parametrów produktowych), pokrycie 1129/1129 (każda reguła, liczba, termin), 0 błędów, 46 uwag (twierdzenia krytyczne bez przeglądu — przegląd zastępczy w E3, D-027).

Niezależny rachunek: `python3 -I docs/tresci/narzedzia/rachunek_niezalezny.py` → 472 liczby z formułą przeliczone z definicji bez `poker-core`, **0 rozbieżności** (`odczyty/rachunek-2026-11-04.txt`).

## 2. Liczby
| | wpisy |
|---|---|
| potwierdzone / otwarte / sprzeczne | 993 / 37 / 12 |
| najwyższy szczebel źródła 1 / 2 / 3 / 4 / 5 / brak | 677 / 225 / 1 / 109 / 1 / 29 |
| werdykt brzmienia POPARTE / CZĘŚCIOWO / NIEPOPARTE / SPRZECZNE | 956 / 51 / 6 / 5 |
| krytyczne (pomoc, bankroll, ryzyko pieniędzy, odpowiedzialna gra) | 54 |
| jedno źródło szczebla 3–4 (oznaczone) | 63 — głównie dane populacji jednej bazy (M10, populacja GGPoker NL25 6-max, liczba rąk w źródle niepodana) i progi HUD; lista w wyniku skryptu |

## 3. Decyzje merytoryczne (agent, ADR-24; właściciel może zawetować; szczegóły w raportach partii)
- **D-143 Stopnie oceny: cztery** (zgodne, dopuszczalne, niedokładność, błąd), jak BRD BR-CWI-001 i RD-11. Źródło szczebla 4 (S-06) ma pięć kategorii; „Blunder” wymaga straty EV, której nie liczymy, więc łączymy go z „Wrong”. Częstość 0 < f < 3,5% to **niedokładność**, nie błąd: poprawić `exams/m13.yaml:34`, `m13-l1-raport.md:93`, `m3-l3:47`; próg 25% (L) nazwać ustawieniem aplikacji. Odrzucone: trzy stopnie (projekt, kod: sprzeczne ze źródłem), pięć (brak danych EV). Zgłoszenie dla 04 (`design-spec.md:17`, `:40`) i 08 (`thresholds.ts`, ER-01).
- **D-144 Preflop M3–M4 (część wspólna szczebla 2):** R-M4-006 tylko wobec Buttona + osobne zdanie o 3-becie dużego blinda wobec małego blinda głównie dla wartości; R-M4-005 przedziały 3-betu 10–13% i sprawdzenia 3–9%, bez „małe pary sprawdzasz”; `pf.bb-def.vs-btn.pub` 40–45% (było 45–50% z jednego źródła szczebla 4); R-M4-013 oba zagrania poprawne; R-M3-004 i R-M3-009 „raise-or-fold” z małego blinda nazwane uproszczeniem; R-M3-010 poziom `heuristic` (walidacja tylko wobec szczebla 4); adres GTO Wizard poprawiony na `preflop-range-morphology`. Odrzucone: brzmienie obecne (sprzeczne ze szczeblem 2), jedno źródło jako wzór.
- **D-145 Parametry i atrybucje:** `format.stack`, `range.mixed.low/high`, `game.recall.*`, `FSRS_SZYBKO_MS/WOLNO_MS` to parametry produktowe (bez źródła, tekst nazywa je ustawieniem aplikacji); `br.bi.src-*` to atrybucja („źródło X podaje 20”), nie próg krytyczny — zalecenie bankrollu stoi na rachunku ryzyka bankructwa. `FSRS_RETENCJA` 0,9 potwierdzone (podręcznik Anki).
- **D-146 R-M12-011 (zejście o stawkę):** część wspólna „najpóźniej przy połowie założonego bankrollu”, w lekcji rozpiętość progów źródeł; odrzucone: spadek o 10 wpisowych (symulacja: odpala się u ok. 95% wygrywających), pełny bankroll.
- **D-147 Strefa czerwona M:** jedna granica ok. 5 (szczebel 4); granica 6 stała tylko na Wikipedii (szczebel 5). **Zmienia D-M11-05** (dokument 12, 4.10.2026) — jawnie, do weta.
- **D-148 Solver projektu:** liczba ze spotu bez walidacji nie trafia do treści (ADR-24): `m11.call.5` (62,3% wobec 68,6% w opublikowanej tabeli Nasha) i wariant 10bb z ante — w treści kierunek („z ante pushujesz szerzej”) bez liczby albo liczba opublikowana z atrybucją; `solver.def.bb-vs-btn` (49,6%) powyżej obu opublikowanych wyników — lekcja mówi „solver aplikacji broni nieco szerzej”. 24 liczby solvera czekają na E1b (pkt 5).
- **D-149 Otwarte reguły poker:** R-M6-004 (exploit bez danych populacji) — warunek na obserwację konkretnego gracza; R-M9-008 i `spr.zone.mid` = 6 nazwane uproszczeniem/umową aplikacji (źródło z progiem 6 niedostępne, 403); R-M12-007 odegranie się jako przykład, nie warunek; R-M12-012 bez uzasadnienia z badania szachistów.
- **D-150 Numery pomocy:** Francja (Joueurs Info Service) godziny jako część wspólna dwóch źródeł szczebla 1: „codziennie 8.00–23.00”; US NCPG „bez opłat za usługę” (organizacja nie pisze „free”); domena dunlewey.net (Irlandia Płn.) przekierowuje na obcą domenę — bez linku, numer z rządu NI; zdanie o polskiej ustawie (u.g.h.) w ramce M12-L4 zastąpić zdaniem bez przepisu jednego kraju (aplikacja bez storefrontu PL).

## 4. Werdykty do E2 (brzmienie)
51 CZĘŚCIOWO, 6 NIEPOPARTE, 5 SPRZECZNE — każdy z minimalną poprawką i miejscem `plik:linia` w raportach partii; w tym 16 definicji terminów (m.in. side-pot, effective-stack, SPR, pot-odds, check, raise), 32 terminy użyte przed pierwszym wyjaśnieniem w lekcji, 6 par „jedna nazwa dla dwóch pojęć” (np. „kolor”: flush i kolor karty).

## 5. Otwarte `[DO USTALENIA]`
- **E1b (przed E2, agent):** 24 liczby solvera projektu — walidacja spotu z dokumentem 10 (zakresy RFI UTG–BTN zgodne ±2 pp z opublikowanymi według dokumentu 12; SB i 9-max bez walidacji; push 5/10/15bb zgodne z tabelą Nasha według partii M9–M11).
- Numery pomocy: Tajwan i Wietnam bez krajowej linii hazardowej w źródłach 1–3 (pytanie do właściciela niżej); Nowa Szkocja (numer na stronie rządu, działanie do potwierdzenia próbnym połączeniem); terytoria Kanady; Wietnam 115 po zmianie numerów 1.11.2026 (przegląd co 3 miesiące).
- Lekcje: `m12-l3-tilt.md:133` (Tendler, problem z grą a problem z hazardem — brak w odczytanych fragmentach); `m13-l1-raport.md:105` liczba wpisana ręcznie bez `{{n:}}`.
- Dane populacji NL50/NL100 (kontrolne) nieodczytane: filtr strony wymaga zapytania z tokenem, zablokowanego przez uprawnienia sesji; nie obchodzono.

## 6. Ustalenia dla innych ról
- 01 `fix`: RD-12-W3, W4, W6 — w GB i CA region urządzenia daje tylko kraj, a Walia, Irlandia Płn. i 10 prowincji mają własne numery (D-142, pytanie niżej).
- 04: cztery stopnie oceny (D-143); wybór regionu w ekranie „Pomoc”, jeśli zostanie przyjęty.
- 07: wektory numerów pomocy (raport `e1-pomoc.md`); test listy dozwolonych domen linków pomocy (przypadek dunlewey.net); wektory RD-11 z D-143.
- 08: `thresholds.ts` (0 < f < 3,5% → niedokładność).

## 7. Przegląd zastępczy (E3, D-027)
54 twierdzenia krytyczne: numery i godziny pomocy 9 rynków, pomoc międzynarodowa online (Gambling Therapy; strona zwróciła 500 — sprawdzić przed wydaniem), sygnały utraty kontroli (źródła szczebla 3: NHS, MedlinePlus, rząd Wiktorii), bankroll i ryzyko bankructwa.
