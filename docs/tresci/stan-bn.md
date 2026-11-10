# Stan sesji BN (rola 06 build, KO-040, następca BG)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bn-wyjasnienia` · Start 02b1fe1 (= `sesja-bg-wyjasnienia`, zgodnie z poleceniem)

## E0 (rozpoznanie) — STOP, raport do koordynatora
- Środowisko: Linux, Node 22.23, pnpm install kod 0, sieć do źródeł działa (upswingpoker, gtowizard: HTTP 200), push na gałąź roboczą.
- Inwentarz 06-tresci-002: `docs/tresci/dowody/bn-e0-inwentarz-rangeDecision.txt` (skrypt na bazie pl, MIXED_HIGH 0,75, bez klas niepewnych): 2396 z 5541 par spot × klasa (43%) dostaje dziś tylko „bo ręka jest w/poza zakresem”. Spoty `tight` (rfi.utg, nine early/lj, call.*, push.btn-3max): brak powodu przy rękach w zakresie; spoty `wide`: przy rękach poza zakresem.
- Zadanie 2: wyjaśnienia egzaminów M6 (alpha, MDF, cena), M9 (SPR, geometria), M11 (fold equity, BF), M12 (wariancja, RoR, bankroll) zaczynają się od wzoru: ok. 20 opcji do odwrócenia kolejności (sens → liczba), bez nowych twierdzeń. R-M2-005 `because` tautologia.

## Partia 1 (06-tresci-002 + NIS 004) — zrobione
- `apps/mobile/src/features/drills/hand-reasons.ts` + `text.ts`: powód z klasy ręki, gdy powód spotu nie wspiera decyzji (D-595); btnVsCo z podmiotem, push.sb-15 → `pushSbDeep` (D-596).
- Reguły R-M3-011…014, R-M11-013 (pl + 11 języków), rejestr: `docs/tresci/rejestr/bn.json`.
- Testy: `powody-reki-bn.test.ts` (czerwony na 02b1fe1: `docs/tresci/dowody/bn-002-test-czerwony.txt`; zielony po), `hand-reasons.test.ts`. Pokrycie: 2396 par spot × klasa → 0 bez powodu, wyjątki nazwane: 0.
- Uwaga: btnVsCo cofnięte do brzmienia sprzed sesji (D-596 po przeglądzie świeżym).
- Do przeglądu 09 (przekład agenta, bez native speakera): klucze `drill.range.hand.*` (pair, high, suited, connected_*, highAllIn, dominated, overcards, overcardsPair), `drill.range.reason.pushSbDeep`, w 11 językach; reguły R-M3-011…014 i R-M11-013 w `content/<język>/rules.yaml`.

## Partia 2 — zrobione
- R-M2-005: `because` bez tautologii (12 języków, rejestr m0-m4).
- Egzaminy (D-565, sens → rachunek, te same klucze `{{n:}}` i poprawne odpowiedzi; `docs/tresci/dowody/bn-egzaminy-porownanie.txt`): m6 l.17, l.47; m9 l.10, l.45; m11 l.25, l.66 (tylko pl; przekład 11 języków `content/<język>/exams` do zrobienia, rola 09).
- Przegląd świeży (subagent): `docs/tresci/dowody/bn-przeglad-swiezy.md`. 15 twierdzeń: POPARTE 10, CZĘŚCIOWO 4, NIEPOPARTE 1. WYSOKIE 3 naprawione: R-M3-011 zakres „jedna luka” (od 5-3 do Q-T), `hand.highAllIn` „ani lepszego układu”, btnVsCo cofnięte.

## Otwarte (do następnej sesji / koordynatora)
- [DO USTALENIA] btnVsCo (NIS 004 część 1): kto „często sprawdza” w R-M4-005 `because`; źródło szczebla 2 podaje 3-bet BTN sprawdzany przez CO ok. 17%. Sprawdzić u źródła i poprawić `because` R-M4-005 razem z powodem.
- ŚREDNIE z przeglądu: R-M11-013 brak przeczytanego zdania o all-in (dodać źródło albo zawęzić do rankingu); `hand.dominated` pada przy AJo, KTo, QJo, QTo, JTo poza zakresem (dwie wysokie karty: brzmienie R-M3-012 „dwie wysokie karty działają odwrotnie” — rozważyć wyjątek albo inną cechę); `highAllIn` przy call.bb-5 T7o słaby powód (właściwy: cena sprawdzenia R-M11-006).
- NISKIE: „bije” → „zwykle bije” w `hand.high`; 99,9% (33, 32) pokazuje „100% (zawsze)” (zaokrąglenie `pct`); brak źródła, że połączenie kart jest powodem gry (R-M3-011 to sam rachunek).
- M12 (egzamin l.9, l.18, l.27, l.73): przeróbka cofnięta — treść krytyczna z przeglądem zastępczym D-027 (zmiana zdań unieważnia `przeglad.sha`); wymaga przeróbki + nowej weryfikacji zastępczej.
- NIS 005 (liczby słowne w treści): do backlogu (koordynator) — test zgodności „co N-te” z `{{n:}}` należy do `tools/content-build` (obszar BM) albo roli 07; dziś 5 zdań zgodnych (BK).
- Wpisy do dokumentów 12/13 na Dysku: D-595, D-596 (koordynator).

## Plan
1. Powód z klasy ręki (`apps/mobile/src/features/drills/hand-reasons.ts`, cechy: para, kolor, połączenie, wysokie karty, słaby kicker) — tylko w kierunku zgodnym z decyzją; twierdzenia jako reguły w `content/pl/rules.yaml`: rachunek (szczebel 1, liczony w teście: strity z dwiema kartami, equity ręki zdominowanej), R-M3-005 (kolor), R-M0-002 (kicker); źródła szczebla 2–4 tylko po przeczytaniu. Czego nie potwierdzę → lista wyjątków w teście + otwarte pytania.
2. Test: dla każdego spotu × statusu × klasy wyjaśnienie ma zdanie powodu inne niż `range.status.*` (wyjątki nazwane).
3. Egzaminy M6/M9/M11/M12 + R-M2-005 (z rejestrem); NIS 004 (podmiot w btnVsCo, pushSb przy 15bb), 005 (test liczb słownych albo backlog).
4. Przekład nowych kluczy (11 języków, subagenci), przegląd w świeżym kontekście, CI.
