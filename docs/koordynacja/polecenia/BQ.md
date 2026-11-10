# Sesja BQ: poprawki treści po recenzji BP (wyjaśnienia KO-040) — Szkoła Pokera (PokerGym)
Koordynator: session_01T66VBy5NLDQBe8VJ11xQ3s (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie fix (zadania 06-tresci-001…005 z recenzji BP). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bq-poprawki` @ 8b600ee (= `sesja-bp-recenzja`: praca BN 5cd9d8c + recenzja BP + czerwony test 06-tresci-001; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania (raport recenzji: `docs/tresci/recenzje/recenzja-bn-5cd9d8c.md`; stan poprzednika: `docs/tresci/stan-bn.md`):
   1. 06-tresci-001 WYS: R-M3-012 because — ręka zdominowana w kolorze (A2s–A3o, K2s–K3o) nie wygrywa „rzadziej”; popraw twierdzenie (zastrzeżenie albo zawężenie, zgodne z rachunkiem — szczebel 1) w pl, 11 językach i w `bn.json`. Gotowe: test 8b600ee zielony bez zmiany asercji, `pnpm content:build` 0.
   2. 06-tresci-002…004 ŚR: „dominated” przy QJo/KTo/QTo/JTo wbrew warunkowi R-M3-012; highAllIn „twoja wyższa karta to 10/J” jako powód sprawdzenia bez źródła wniosku; R-M11-013 część all-in bez źródła w rejestrze (źródło TDA reguła 17 przeczytane przez BP — sprawdź sam i wpisz). Każda poprawka z testem czerwonym przed, zielonym po (gdy da się testem).
   3. 06-tresci-005 NIS: nazwij uproszczenie (karty stołu). 006 (egzaminy ×6 tylko pl) zostaw dla roli 09 — wpisz do otwartych.
   4. Jeśli kontekst pozwala (< 25%): 3 ŚR z przeglądu świeżego BN (otwarte w `docs/tresci/stan-bn.md`). Przeróbka M12 ×4 (treść krytyczna, D-027) **nie** w tej sesji — tylko wpis do otwartych.
   Gotowe całości: `pnpm content:build` 0 i `pnpm run ci` 0 na końcowym SHA (log do pliku `docs/tresci/dowody/bq-ci-<sha>.txt`), stan w `docs/tresci/stan-bq.md`.
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). Nie zmieniasz asercji testów recenzenta. STOP-y twojej roli i punkt czyszczenia z zasady wspólnej 19 zamieniasz na raport do koordynatora i czekasz na jego odpowiedź; nie proponujesz właścicielowi nowej sesji.
5. Decyzje: merytoryczne rozstrzyga hierarchia źródeł ADR-24 (CLAUDE.md), techniczne — najpierw analogia z Treningu (`lkarwowski494/trening`, `repo:plik:linia`), wpis do weta. Numery decyzji tylko z puli D-610…D-624.
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w `docs/tresci/stan-bq.md`, push, PRZEKAZANIE. Bez pułapu kosztu (mandat), koszt podaj w raporcie.
7. Push: zbiorczo, tylko na `sesja-bq-poprawki`.
8. Raporty (≤ 10 linii, przez send_message):
   - po pierwszym zadaniu: czas i szacunek reszty;
   - PYTANIE: pełna treść, opcje, rekomendacja (koordynator nie widzi twojego czatu);
   - PRZEKAZANIE: zrobione (SHA, kody content:build i ci), dowody (pliki), decyzje do weta, otwarte, następny krok.
