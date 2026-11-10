# Sesja BF: generator scenariuszy — format szablonu, warianty z ziarnem, historia (krok B planu) — Szkoła Pokera (PokerGym)
Koordynator: session_01T66VByNdf5NRAj2XqmVkw1 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie build. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bf-generator` @ 8cba034 (= robocza 00b0566 + dokumenty zakresu BD; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md — sprawdź przed pierwszym commitem.
3. Wejście: `docs/zakres/scenariusze-plan.md` (krok B, §1–§2), `docs/brd/wymagania-scenariusze.md` (BR-SZB-001, BR-GEN-001…003, decyzje D-531…D-533 w `docs/decyzje.md`), `docs/zakres/scope-contract.md` ZM-01…04, `packages/domena/src/scenariusz.ts`, `packages/poker-core` (generatory, `permuteSituation`), `apps/mobile/src/features/drills/engine.ts`. Decyzje właściciela: KO-035…KO-043 (`git show origin/koordynacja:docs/koordynacja/decyzje.md`), w tym KO-043: „Zagraj jeszcze raz to samo rozdanie” nie zużywa dziennego limitu.
4. Zadania (każde: test najpierw czerwony, potem zielony; `pnpm run ci` kod 0 z logiem z SHA w `docs/programista/dowody/`):
   1. Format szablonu (BR-SZB-001) w `packages/content-schema` + walidacja w `tools/content-build` (ścieżka wrażliwa: identyfikatory w powtórkach stabilne) — 1–2 przykładowe szablony testowe (nie treść dla użytkownika; treść pisze rola 06).
   2. Generator wariantu: szablon + poziom + ziarno → rozdanie (karty ustalone przed 1. decyzją, D-531), granice losowania, odrzucanie wariantów zmieniających poprawną decyzję; poker-core bez React Native.
   3. Bez powtórzeń (D-532): 0 powtórzeń w sesji, okno 20 ostatnich odcisków, pojemność ≥ 40 — odcisk i historia w danych postępu: **migracja w transakcji, test na kopii bazy poprzedniej wersji, eksport/import/„Usuń postęp” obejmują historię** (`packages/postep/`, ścieżka wrażliwa D-043 — zasada wspólna 10: UPSERT, nie INSERT OR REPLACE).
   4. Test 10 000 losowań z wyrocznią niezależną (D-533; marginesy 10/2 pp) dla przykładowych szablonów.
   5. Limit: powtórka tego samego wariantu nie zużywa limitu (KO-043) — w `packages/domena/` (logika dostępu i limitu, ścieżka wrażliwa) z testem.
   6. Przegląd ścieżek wrażliwych w świeżym kontekście (subagent, bez twoich uzasadnień) przed PRZEKAZANIEM — raport w `docs/programista/dowody/`.
5. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nie piszesz treści dla użytkownika w `content/` (tylko testowe szablony w testach), nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz.
6. Decyzje: najpierw analogia z Treningu (`lkarwowski494/trening`, publiczne; generator: `README.md:39-40`, `docs/24-generator-i-plany.md`), `repo:plik:linia`, wpis do weta. Numery tylko z puli D-550…D-564.
7. Kontekst: od 30% okna kończysz krok, stan w `docs/programista/stan-bf.md` na swojej gałęzi, push, PRZEKAZANIE.
8. Push: zbiorczo, tylko na `sesja-bf-generator`.
9. Raporty (≤ 10 linii, send_message): po E0 plan i szacunek; PYTANIA (opcje + rekomendacja); PRZEKAZANIE: SHA, testy czerwony→zielony, kod CI, przegląd ścieżek wrażliwych, decyzje do weta, otwarte.
