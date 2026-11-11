# Stan sesji CZ (rola 07-jakosc, tryb fix, moduł e2e-mobilne)

Koordynator: session_01T66VBz4mtBEPwdkS219BVy · gałąź `sesja-cz-jakosc` od `46197812` (= `claude/sleepy-brahmagupta-2065nu`, zgodne z poleceniem).

## E0 (2026-11-11)
Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; Maestro/symulator iOS brak (E2E „nie sprawdzono”, krok koordynatora); repo publiczne; CI na starcie wg polecenia: 42964699775 i E2E 42964699807 zielone (nie sprawdzane ponownie).
Kontrola transportu promptu: nie wykonana — sesja nie ma surowych bajtów wiadomości, a przepisanie 54 KB przez model nie jest kontrolą sha256.

| Zadanie | Źródło (potwierdzone) | Klasa | Plan |
|---|---|---|---|
| ŚR-006 (06-tresci-006) | `docs/tresci/recenzje/recenzja-co-ad62a2d.md:162` | D | filtr `some(draw-call)` + pętla po `v.points` z indeksem szablonu (range-spot przesuwa indeks `expected`); rachunek D-630 w funkcji wołanej też na fixture `fixtures/cz-range-draw/` (range-spot + draw-call: dobry → 0 błędów, zły → błąd D-630); nowy `cz-pokrycie-szablonow.test.ts`: każdy szablon pl ma punkt objęty testem zgodności (rodzaj → plik testu, plik zawiera filtr `some`) |
| NIS-007 (06-tresci-007) | tamże `:176` | D | wyrocznia air w `szablony-co.test.ts:87`: para z rang (`maPare`), draw z rang i kolorów (kolor: 4 w kolorze z kartą gracza; strit: liczba rang dopełniających do strita z kartą gracza → outy), próg = `HOLDING_LIMITS.drawOutsMin` (parametr konfiguracji, JAK-02), zakres otwarcia z surowego `content/ranges/preflop-6max-100bb.json` (nie `compileRanges`) |
| 08-programista-004 | `docs/programista/recenzje/recenzja-cd-07b04fb.md:105` | — | **już zrobione** w CK: `apps/mobile/src/features/scenariusz/__tests__/wybor-pusta-lista-ck.test.tsx` (93ccfba3); proponuję nie dublować, tylko dowód mutacji (test pada po usunięciu gałęzi „wkrótce” w kopii) |
| flow 07-scenariusz | `docs/zakres/scenariusze-plan.md:73` (krok J), `apps/mobile/e2e/oczekujace/07-scenariusz.yaml` | D | rozjazdy z ekranem: SC-01 ma 2 decyzje (po flopie „Dalej: Turn”, nie „Zobacz podsumowanie”); brak stanu odblokowania (D-647: lekcja m2) → przygotowanie w flow: Lekcje → `modul-m2` → `lesson-m2.l1` → części i ćwiczenia; „Zgłoś błąd” tylko z `ADRES_KONTAKTOWY`; README mówi `akcja-<i>`, ekran ma `option-<i>` (PasekStrategii); do sprawdzenia: czy „Zagraj to samo jeszcze raz” zużywa limit dnia; statyczna kontrola id rozszerzona na flowy oczekujące |
