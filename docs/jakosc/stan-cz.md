# Stan sesji CZ (rola 07-jakosc, tryb fix, moduł e2e-mobilne)

Koordynator: session_01T66VBz4mtBEPwdkS219BVy · gałąź `sesja-cz-jakosc` od `46197812` (= `claude/sleepy-brahmagupta-2065nu`, zgodne z poleceniem).

## E0 (2026-11-11)
Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; Maestro/symulator iOS brak (E2E „nie sprawdzono”, krok koordynatora); repo publiczne; CI na starcie wg polecenia: 42964699775 i E2E 42964699807 zielone (nie sprawdzane ponownie).
Kontrola transportu promptu: nie wykonana — sesja nie ma surowych bajtów wiadomości, a przepisanie 54 KB przez model nie jest kontrolą sha256.

| Zadanie | Źródło (potwierdzone) | Klasa | Plan |
|---|---|---|---|
| ŚR-006 (06-tresci-006) | `docs/tresci/recenzje/recenzja-co-ad62a2d.md:162` | D | filtr `some(draw-call)` + pętla po `v.points` z indeksem szablonu (range-spot przesuwa indeks `expected`); rachunek D-630 w funkcji wołanej też na fixture `fixtures/cz-range-draw/` (range-spot + draw-call: dobry → 0 błędów, zły → błąd D-630); nowy `cz-pokrycie-szablonow.test.ts`: każdy szablon pl ma punkt objęty testem zgodności (rodzaj → plik testu, plik zawiera filtr `some`) |
| NIS-007 (06-tresci-007) | tamże `:176` | D | wyrocznia air w `tools/content-build/test/szablony-co.test.ts` (dawna linia 87): para z rang (`maPare`), draw z rang i kolorów (kolor: 4 w kolorze z kartą gracza; strit: liczba rang dopełniających do strita z kartą gracza → outy), próg = `HOLDING_LIMITS.drawOutsMin` (parametr konfiguracji, JAK-02), zakres otwarcia z surowego `content/ranges/preflop-6max-100bb.json` (nie `compileRanges`) |
| 08-programista-004 | `docs/programista/recenzje/recenzja-cd-07b04fb.md:105` | — | **już zrobione** w CK: `apps/mobile/src/features/scenariusz/__tests__/wybor-pusta-lista-ck.test.tsx` (93ccfba3); proponuję nie dublować, tylko dowód mutacji (test pada po usunięciu gałęzi „wkrótce” w kopii) |
| flow 07-scenariusz | krok J w `docs/zakres/scenariusze-plan.md:73`, `apps/mobile/e2e/oczekujace/07-scenariusz.yaml` | D | rozjazdy z ekranem: SC-01 ma 2 decyzje (uwaga błędna, korekta niżej); brak stanu odblokowania (D-647: lekcja m2) → przygotowanie w flow: Lekcje → `modul-m2` → `lesson-m2.l1` → części i ćwiczenia; "Zgłoś błąd" tylko z `ADRES_KONTAKTOWY`; README mówi `akcja-<i>`, ekran ma `option-<i>` (PasekStrategii); do sprawdzenia: czy "Zagraj to samo jeszcze raz" zużywa limit dnia; statyczna kontrola id rozszerzona na flowy oczekujące |

Korekta E0: pas w SC-01 kończy rozdanie (`apps/mobile/src/features/scenariusz/wariant.ts:81`, `dalej: 'koniec'`), więc po pierwszej decyzji jest "Zobacz podsumowanie"; uwaga E0 o "Dalej: Turn" była błędna. "Zagraj to samo jeszcze raz" jest poza limitem (KO-043, `apps/mobile/src/app/scenario.tsx:155`).

## E1/E2 (2026-11-11)
| ID | Commit | Testy | Przed/po | Dowód |
|---|---|---|---|---|
| ŚR-006 (06-tresci-006) | 63dfd1a1 | `szablony-bs` (+3 testy CZ), `stos-zakladu-bu`, `bv-gotowa-reka`, nowy `cz-pokrycie-szablonow` | mutant „every” 2 czerwone, mutant „indeks draw-call” 2 czerwone; po: 25/25, 15/15, 6/6 | `dowody/cz-sr006.txt` |
| NIS-007 (06-tresci-007) | 6f7ae630 | `szablony-co` (wyrocznia air + zakres, 6 wektorów outów) | mutant „air przepuszcza draw” 1 czerwony (SC-11 Ś), mutant „ręka spoza zakresu” 4 czerwone; po: 16/16 | `dowody/cz-nis007.txt` |
| 08-programista-004 | b7b23e47 | istniejący `wybor-pusta-lista-ck.test.tsx` (D-881) | 2 mutanty ekranu czerwone, bez mutacji zielony | `dowody/cz-08-004.txt` |
| flow 07-scenariusz | 9c38b12e | `tests/narzedzia/e2e-flowy.test.mjs` 11/11 | 3 mutanty (lekcja, literówka id, treść SC-01) czerwone; stara wersja testu przepuszcza literówkę | `dowody/cz-flow07.txt`; przebieg Maestro: NIE SPRAWDZONO (symulator) |

Wyjątek nazwany (zasada wspólna 7): pełny zestaw uruchomiony raz po wszystkich commitach, nie po każdym; kontrola zastępcza — testy pliku zmienionego po każdym commicie i `git diff --exit-code` kodu aplikacji.

## Do sprawdzenia (rola 06)
- Gutshot jako „air” w SC-11 Ś i SC-12 (D-882): 19,5–24% wariantów. Czy wyjaśnienie „ręka bez pary i drawa” i ocena c-betu obejmują gutshot.

## Krok koordynatora
- Przebieg E2E (`e2e-ios.yml`) z flowem 07 po scaleniu: flow jest w `oczekujace/`, więc bramka go nie uruchomi; potrzebny przebieg ręczny lokalnie (`maestro test $(node apps/mobile/e2e/helplines-env.mjs) apps/mobile/e2e/oczekujace/07-scenariusz.yaml`) albo przeniesienie do `apps/mobile/e2e/` w osobnym commicie z przebiegiem informacyjnym (minuty macOS).

## Pełna weryfikacja i kontrola raportu
- `pnpm run ci` na 9c38b12e: kod 0 (mobile 910/910, content-build 430 + 1 oczekiwany fail, domena 347 + 1, postep 160, poker-core 179, node --test 194/0); `docs/programista/dowody/cz-ci-9c38b12e.txt`. Pliki generowane bez zmian (`git status` czysty po CI).
- Kontrola dowodów i sekretów (skrypt roli, kopia w scratchpadzie) na tym pliku i `docs/decyzje/CZ.md`: OK. Odwołania do Treningu sprawdzone ręcznie na klonie @ 2e4b0f8.
- Przegląd ścieżki wrażliwej (D-043): nie dotyczy — zmienione tylko testy, fixture, flow oczekujący i dokumenty (`tools/content-build/test/` nie jest na liście, `tools/content-build/` src nietknięty).
