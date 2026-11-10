# Stan sesji BN (rola 06 build, KO-040, następca BG)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bn-wyjasnienia` · Start 02b1fe1 (= `sesja-bg-wyjasnienia`, zgodnie z poleceniem)

## E0 (rozpoznanie) — STOP, raport do koordynatora
- Środowisko: Linux, Node 22.23, pnpm install kod 0, sieć do źródeł działa (upswingpoker, gtowizard: HTTP 200), push na gałąź roboczą.
- Inwentarz 06-tresci-002: `docs/tresci/dowody/bn-e0-inwentarz-rangeDecision.txt` (skrypt na bazie pl, MIXED_HIGH 0,75, bez klas niepewnych): 2396 z 5541 par spot × klasa (43%) dostaje dziś tylko „bo ręka jest w/poza zakresem”. Spoty `tight` (rfi.utg, nine early/lj, call.*, push.btn-3max): brak powodu przy rękach w zakresie; spoty `wide`: przy rękach poza zakresem.
- Zadanie 2: wyjaśnienia egzaminów M6 (alpha, MDF, cena), M9 (SPR, geometria), M11 (fold equity, BF), M12 (wariancja, RoR, bankroll) zaczynają się od wzoru: ok. 20 opcji do odwrócenia kolejności (sens → liczba), bez nowych twierdzeń. R-M2-005 `because` tautologia.

## Plan
1. Powód z klasy ręki (`apps/mobile/src/features/drills/hand-reasons.ts`, cechy: para, kolor, połączenie, wysokie karty, słaby kicker) — tylko w kierunku zgodnym z decyzją; twierdzenia jako reguły w `content/pl/rules.yaml`: rachunek (szczebel 1, liczony w teście: strity z dwiema kartami, equity ręki zdominowanej), R-M3-005 (kolor), R-M0-002 (kicker); źródła szczebla 2–4 tylko po przeczytaniu. Czego nie potwierdzę → lista wyjątków w teście + otwarte pytania.
2. Test: dla każdego spotu × statusu × klasy wyjaśnienie ma zdanie powodu inne niż `range.status.*` (wyjątki nazwane).
3. Egzaminy M6/M9/M11/M12 + R-M2-005 (z rejestrem); NIS 004 (podmiot w btnVsCo, pushSb przy 15bb), 005 (test liczb słownych albo backlog).
4. Przekład nowych kluczy (11 języków, subagenci), przegląd w świeżym kontekście, CI.
