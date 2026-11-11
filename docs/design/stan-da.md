# Stan sesji DA (rola 04, build): nazwy akcji, „Liczby” F2–F4, ekran ICM
Aktualizacja: 2026-11-11 · gałąź `sesja-da-teksty` (start 46197812) · polecenie `docs/koordynacja/polecenia/DA.md` @ 26918d9 · stan: **zakończona, czeka na koordynatora**

## E0
- Środowisko: Linux, Node v22, Playwright z obrazu (narzędzia `docs/design/narzedzia/*.mjs` uruchamiane z katalogu w scratchpadzie z dowiązaniem do globalnego `playwright`), push na `sesja-da-teksty` (hook pre-push: typecheck, po `pnpm install --frozen-lockfile`). Transport promptu roli: 71686 B, sha256 zgodny.
- Tylko dokumenty (`docs/design/**`, `docs/decyzje/DA.md`); `tokeny.ts` bez zmian, więc `pnpm run ci` nie jest wymagane (pkt 3.4 polecenia); kontrola: `git diff --stat 46197812..HEAD` obejmuje wyłącznie te ścieżki.
- Źródła zadań: D-782–D-785 (`docs/decyzje/CN.md:8-11`), D-807 (`CP.md:8`), D-817 (`CR.md:8`), D-825 (`CS.md:6`), D-846 (`CU.md:7`), `content/pl/lessons/m2-l2-pot-odds.md:25`.

## Zrobione
- Zadanie 1: nazwy akcji (grupa `scenario.action`, pl/en, range-spot z etykiet solvera), ocena D-784 — `scenariusz-akcje-i-liczby.md` §1–2; D-886, D-887.
- Zadanie 2: „Liczby” c-bet, size-spot, ICM, nadkarty — §3; D-888; próg w grze o żetony z blindem (45%, nie 0,5) D-890.
- Zadanie 3: ekran ICM — `design-spec.md` sekcja „Scenariusz: punkt ICM”, makieta `ekrany/scenariusz-icm.html` + `.css`, zrzuty `wzorce-zrzuty/scenariusz-icm/` (3 ekrany × 390 jasny, 390 ciemny, 320 AX5; para przed/po krytyce: `przed-krytyka/icm-4-graczy-390.png` → `icm-4-graczy-390.png`); D-889.
- Pomiary: `przepelnienie-da.txt` (kod 0), `warsztat-da.txt` (kod 0; ostrzeżenia z siatki stołu i wspólnych arkuszy jak w BE), `kontrast-da.txt` (8/8 ≥ 3:1).
- Krytyka zrzutów (usterki poprawione): „all-in” łamane na miejscu SB → stan bez słowa „rywal” i `nowrap`; osierocone „stos” w wierszu puli → osobny przypis; „3. / miejsce” → spacja nierozdzielająca; dziennik w formacie `play.log.*`; „13,5 / bb” przy AX5 → spacja nierozdzielająca przed „bb”.

## Znaleziska dla innych ról
- D-890 (08, `packages/poker-core`): `requiredChips` = stałe 0,5 bez blindów; zdanie „Liczb” wymaga (S − b) ÷ (2S). Dziś brzegowe (SC-34 w szkicach), po powrocie WYSOKIE (błędna liczba).
- 08: stos „ty” przy miejscu i dopłata icm-call liczone dziś ze `stackBb`, a nie z twojego stosu (kryterium 2 sekcji ICM).
- NIS-DA-01 (09): `play.log.*` „9bb” bez spacji obok „9 bb”.
- NIS-DA-02 (04/08, niskie): istniejący przycisk „Zobacz podsumowanie” łamie wyraz „podsumowanie” przy AX5 także na 390 i 430 pt (poza wyjątkiem D-122); propozycja przy wdrożeniu: mniejszy poziomy margines przycisku przy AX5 albo rozszerzenie wyjątku D-122 o pojedyncze wyrazy dłuższe niż wiersz.

## Otwarte
- Przekład grup `scenario.action` i `scenario.numbers.*` na 11 słowników (rola 09); forma „preflop” w 11 słownikach (D-887).
- Wdrożenie (08): nazwy akcji, „Liczby”, ekran ICM z kryteriami; potem `icm-call` wraca na `RODZAJE_NA_EKRANIE` razem z warunkiem 06-tresci-002 (CQ) dla SC-34.
- Audyt roli 04 po wdrożeniu: porównanie z `wzorce-zrzuty/scenariusz-icm/`.

## Punkt czyszczenia
Rola 04, build, polecenie DA; plik stanu `docs/design/stan-da.md`; następny krok: decyzja koordynatora (scalenie, przekazanie do 08 i 09).
