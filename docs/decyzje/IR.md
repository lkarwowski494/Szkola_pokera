# Decyzje sesji IR (M1-audytor-generalny, audit): pełny audyt M1 przed buildem 1012
Pula D-1990…D-2009. Właściciel może każdą zawetować. SHA audytu: f75acdff16915aeb43ff788888216e28616c11ed. Katalog przebiegu: `audit/M1-2026-11-17/`.

Analogia z Treningiem (CLAUDE.md, D-191): repo `lkarwowski494/trening` nie jest dołączone do tej sesji (zakres: Szkola_pokera, prompts) — wyjątek nazwany; zamiast analogii z Treningiem kalibracja z biblioteki ról (Piekarz 19.10.2026, `M1-audytor-generalny` „Rachunek kosztu”).

## D-1990 · 2026-11-17 · Bramka opłacalności pominięta wyjątkiem właściciela
- Decyzja: subagent 02 z modułem `oplacalnosc` (E0a) nie jest uruchamiany; na STOP 1 w miejscu werdyktu bramki wpisany wyjątek nazwany właściciela z 2026-11-17 („Pomiń, wyjątek nazwany”, polecenie IR pkt 3). Model monetyzacji z repo: kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (`docs/monetyzacja.md`, `store/produkty.json`).
- Odrzucone: uruchomienie bramki mimo wyjątku (koszt 0,2–0,4 mln tokenów wbrew słowom właściciela).
- Zależy od: weto właściciela.

## D-1991 · 2026-11-17 · Rekomendacja wariantu standardowego, 12 ról
- Decyzja (rekomendacja na STOP 1, wybór należy do właściciela): wariant standardowy — wszystkie role 01–12 dotyczą (tabela stosowalności w `plan-audytu.md`), 3 soczewki-subagenci, weryfikacja przeciwna P0/P1.
- Odrzucone: lekki (werdykt nie może być GOTOWE, nie spełnia „pełny M1” z 2026-11-17 09:00 ani pkt 4 „Audyty i wydania” przed App Store); głęboki (drugi przebieg 06 podnosi koszt o ok. 1–2 mln tokenów; treść przeszła wcześniej recenzje HD/HZ — do decyzji właściciela jako opcja c).

## D-1992 · 2026-11-17 · Moduły ról
- Decyzja: moduły według opisów `moduly` w `rola.json` (tabela i pominięcia w `plan-audytu.md`); `pakiety-tresci` dla 05 i 12, bo treść jest w bazach na język wersjonowanych skrótem osobno od wersji aplikacji (`apps/mobile/assets/content/tresc-70ddf027b1-*.db`); `tresci-krytyczne` dla 06 (błąd strategii = szkoda finansowa przy grze; numery pomocy hazardowej).
- Odrzucone: `scenariusze-skrypt` dla 07 (bramka już wdrożona, `scripts/sprawdz-scenariusze.mjs`), `tlo-i-sensory-ios` dla 05 (brak pracy w tle poza powiadomieniem).

## D-1993 · 2026-11-17 · Mapowanie progu wydania na poziomy
- Decyzja: P0 → KRYTYCZNE, P1 → WYSOKIE (blokują build 1012); P2 → ŚREDNIE/NISKIE (backlog z wersją). P1 spoza kategorii z CLAUDE.md „Audyty i wydania” pkt 1 oznaczane jako „P1 bez blokady wg CLAUDE.md pkt 1” (próg projektu ma pierwszeństwo, reguła werdyktu GEN-11).
- Odrzucone: każde P1 blokuje (sprzeczne z pkt 1 CLAUDE.md).

## D-1994 · 2026-11-17 · K commitowany na gałęzi audytu (wyjątek KO-126)
- Decyzja: rola każe trzymać `audit/` w `.git/info/exclude`; polecenie IR pkt 5 (KO-126) każe commitować K na `claude/sesja-ir-audyt-m1` po każdym etapie, bo kontener jest ulotny. Wykluczony jest tylko `audit/M1-2026-11-17/prompty/` (biblioteka prywatna, repo publiczne). Przed każdym commitem przegląd `git diff --cached` (sekrety, treść prywatna).

## D-1995 · 2026-11-17 · Wariant głęboki wybrany przez właściciela (STOP 1)
- Słowa właściciela (ok. 11:02 UTC, przekazane przez koordynatora): „c: głęboki”. Zastępuje rekomendację D-1991 (standardowy).
- Skutek: 12 ról + drugi niezależny przebieg 06 (`K/role/06-tresci-b/`, ID od 06-tresci-501; najważniejszy obszar krytyczny: poprawność strategii, liczb i pomoc hazardowa), 5 soczewek-subagentów, weryfikacja przeciwna P0, P1 i P2 w obszarach krytycznych. Koszt 8–15 mln tokenów, 130–260 USD [OCENA]; próg STOP wyjątkowego 22,5 mln tokenów / ok. 390 USD; punkt kontrolny po partii 1.
- Odrzucone przez właściciela: (a) standardowy, (b) lekki.

## D-1996 · 2026-11-17 · Scalanie i poziomy po weryfikacji przeciwnej
- Decyzja: 79 pozycji (78 ról + 1 z GEN-02) scalone do 66 (`plan-napraw.json`); poziomy po weryfikacji 7 grup: P0 0, P1 6 (001–006), P2 60. Odrzucone: zostawić P1 „bez blokady wg CLAUDE.md pkt 1” (skala projektu nie zna takiego poziomu; weryfikatorzy g5, g6 obniżyli do P2).
## D-1997 · 2026-11-17 · Werdykt
- Kurs: trafny; stan: ZABLOKOWANE. Wg CLAUDE.md pkt 1: build TestFlight 1012 blokuje tylko M1-audytor-generalny-002 (+ bramka JAK-19: protokół F 1011 otwarty); App Store blokują 001–006. Odrzucone: „blokuje wszystko P1 także dla 1012” (ryzyko odrzucenia Apple nie dotyczy buildu wewnętrznego — weryfikacja g1, g2).
## D-1998 · 2026-11-17 · Wyciągi > 250 znaków (06-tresci-001) jako P2 z naprawą w partii 1
- Decyzja: poziom P2 dla wydania (pliki poza aplikacją i metadanymi, weryfikacja g1), ale zadanie 007 w partii 1, bo repo jest publiczne (kategoria „prawa autorskie”). Odrzucone: P1 blokujące 1012 (build nie zawiera tych plików).
