# Sesja HC: recenzja niezależna kodu HB (401–403) — Szkoła Pokera
Koordynator: session_01T66VByKjXi3s5FFnXyD7C2 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit (recenzja niezależna; raportu autora nie czytasz przed własnym przeglądem). Prompt roli jest w Twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-hc-recenzja` od `claude/sesja-hb-fix` @ d1f4e99d5b9c6b7a1835602680d9e1291698c013 (inny HEAD: zgłoś). Zakres: diff `7740eeab..d1f4e99d` (kod: `apps/mobile/src/features/scenariusz/liczby.ts`, `packages/content-schema/src/index.ts` superRefine RIVER_CATCH_MARGIN_MIN, 3 testy w `apps/mobile/src/features/scenariusz/__tests__/`). Wejście: uwagi 401–403 w `docs/programista/recenzje/recenzja-gb-0ac2679.md`. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadania:
   1. Czy każda poprawka zamyka swoją uwagę; czy testy są najpierw czerwone na mutancie z właściwego powodu (własne mutanty, dowód w pliku); czy schemat nie odrzuca istniejących szablonów i szkiców (`pnpm content:build` kod 0, porównanie baz D-043: ID nie znikają).
   2. Decyzje D-1575…D-1577 (`docs/decyzje/HB.md`): zgodność z analogią Trening i z ADR-24 (próg 0,01 — czy nie zmienia treści merytorycznej).
   3. Werdykt PRZYJĄĆ / PRZYJĄĆ Z UWAGAMI / ODRZUCIĆ z progiem z CLAUDE.md (KRYT/WYS blokują) w `docs/programista/recenzje/recenzja-hb-d1f4e99.md`; `pnpm run ci` kod 0 (`docs/programista/dowody/hc-ci-<sha>.txt`).
4. Zakazy: tylko `docs/programista/**` i `docs/decyzje/HC.md`; kodu nie zmieniasz (znaleziska jako zadania 08-programista-4NN). Nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy `--no-verify` ani force-push, bez AskUserQuestion. STOP-y roli → raport do koordynatora.
5. Decyzje: numery tylko D-1585…D-1589.
6. Kontekst i koszt: od 30% okna PRZEKAZANIE. Orientacyjnie ok. 3 USD; powyżej 4 USD raport.
7. Raport PRZEKAZANIE (≤ 10 linii, send_message): werdykt, znaleziska z wagą, SHA, dowody, decyzje do weta, koszt, polecenie fix dla znalezisk.
