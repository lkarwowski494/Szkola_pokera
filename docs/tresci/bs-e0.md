# Sesja BS (rola 06, build): E0 — 14 szablonów „umie”
Stan: 2026-11-10 · gałąź `sesja-bs-szablony` od 70fdf40 · polecenie koordynatora `docs/koordynacja/polecenia/BS.md` @ 8b4e77c

## Środowisko
Linux (chmura), Node v22.23.4, `pnpm install --frozen-lockfile` kod 0, push na gałąź roboczą przez git; tożsamość git ustawiona według `CLAUDE.md`. Xcode i symulatora brak (nie potrzebne w tym kroku).

## Format z kroku B (odczyt kodu @ 70fdf40)
- Schemat: `packages/content-schema/src/index.ts:485-552`. Jedyny rodzaj punktu decyzji: `kind: draw-call` (D-551), akcje tylko `call`/`fold`, linia rywala tylko `bet` (ułamek puli z `fractions`).
- Generator: `packages/poker-core/src/scenario-gen.ts`. Pierwsza decyzja zawsze na flopie, druga (opcjonalna) na turnie po sprawdzeniu flopu (`validateTemplate`, wiersz ~93); jeden przedział marginesu (`marginMin`/`marginMax`) na poziom wspólny dla obu punktów decyzji (`inMargin`, `tryVariant`); ocena = szansa na jedną kartę wobec ceny (`decide`); stos (`stackBb`) generator tylko przenosi (nie liczy implied odds).
- `expected` (D-556): jedna akcja na punkt i poziom; wyjaśnienia są jedne na akcję punktu (nie na poziom), więc w jednym szablonie oczekiwana akcja punktu musi być ta sama na wszystkich poziomach (inaczej tekst „dlaczego dobrze” byłby fałszywy na którymś poziomie).
- Znaczniki `{{w:reka}}`, `{{w:stol}}`, `{{w:pozycja}}` obowiązkowe w pierwszym zdaniu każdej akcji (D-557, D-560, D-561); liczby tylko `{{n:…}}` (ułamek zakładu i kwoty zmieniają się w wariantach, więc tekst nie podaje ceny liczbą; liczy ją ekran „Liczby”, krok F).

## Plan 14 szablonów
| ID | Moduł | Decyzje (expected) | Źródło oceny (ADR-24, szczebel) | Poziomy | Da się w formacie B? |
|---|---|---|---|---|---|
| SC-01 | M2 | flop call, turn call; kolor-draw wobec małych zakładów, 3-bet pot, 100 bb | R-M2-005, R-M7-007 (math, szczebel 1); R-M2-001 | Ł Ś T | tak (zmiana sytuacji z „½ puli”, D-630) |
| SC-02 | M2 | flop call (minimalny/mały zakład), turn pas wobec dużego zakładu; strit dwustronny, 35 bb | R-M2-005, R-M7-007 (math); odporność pasu: R-M7-008 (math) | Ł Ś | tak (bez T, D-631) |
| SC-03 | M2 | flop pas: gutshot wobec dużego zakładu | R-M2-005, R-M2-002 (math) | Ł | **nie**: Ś i T dają „pas” sprzeczny z rachunkiem na dwie karty; potrzebny punkt decyzji od turnu albo linia all-in (zadanie 08) |
| SC-19 | M7 | flop call, turn pas: kolor-draw, niski SPR, implied odds nie ratują | R-M7-007, R-M7-008 (math), R-M7-009 (heuristic, szczebel 4) | Ł Ś | tak (bez T, D-631) |
| SC-04, SC-05 | M3 | preflop otwarcie (solver) → c-bet | R-M3-002/003 (gto, `solver-spot`), R-M5-007/004 (`cbet-case`) | Ł Ś T | **nie**: brak rodzaju `solver-spot` i `cbet-case` (D-551: krok E) |
| SC-06 | M3 | SB: przebicie albo pas | R-M3-009 (gto), R-M3-004 (`no-limp`) | Ł Ś | **nie** (jw.) |
| SC-08 | M4 | 3-bet z Buttona i rozmiar | R-M4-003 (gto), R-M4-001 (`three-bet-size`) | Ł Ś T | **nie** (jw.) |
| SC-11, SC-12, SC-13 | M5 | c-bet: suchy wysoki / niski połączony / mokry flop | R-M5-007, R-M5-004 (`cbet-case`); R-M5-003, R-M5-008, R-M5-011 | Ł Ś T | **nie** (jw.) |
| SC-32, SC-33, SC-34 | M11 | push/fold SB, call BB, bańka | R-M11-002, R-M11-007 (gto, `solver-spot` push/call); R-M11-009 (math), R-M11-010 | Ł Ś T | **nie** (jw.) |

Wniosek: w formacie z kroku B da się napisać 3 szablony (SC-01, SC-02, SC-19); 11 wymaga rozszerzenia formatu przez rolę 08 (PYTANIE do koordynatora, 2026-11-10).

## ŚR-103 (recenzja BO, 08-programista-103): rozstrzygnięcie merytoryczne
Decyzje D-630 i D-631 w `docs/decyzje.md`. Skrót: łatwy „call” jest poprawny i potrzebny (małe i minimalne zakłady), ale „pas” drawem w scenariuszu ze stosem za pulą wolno ocenić jako zgodny tylko wtedy, gdy rachunek R-M7-008 (implied odds z całym pozostałym stosem) też daje pas; inaczej uczylibyśmy pasowania drawów, które solver i rachunek na dwie karty sprawdzają.
