# Sesja DK: poprawki 07-jakosc-001…003 po recenzji DF — Szkoła Pokera
Koordynator: session_01T66VBvYWeNrFwMqZNx9zYV (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola: 08-programista w trybie fix. Prompt roli jest w pierwszej wiadomości po linii `=== PROMPT ROLI ===`. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dk-poprawki` @ 1834b144ba785d28d05487c75f5ae79b6d0e1b94 (= `origin/sesja-df-recenzja`: CZ ee7f991a + recenzja DF + test odtwarzający; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania (źródło: `docs/jakosc/recenzje/recenzja-cz-ee7f991.md`):
   1. 07-jakosc-001 (WYSOKIE): flow 07 stuka '(Dalej|Zakończ)', co trafia też w stały „Zakończ” u góry sesji (`session.tsx:361`, porzucAktywnosc). Naprawa wg rekomendacji recenzji: testID na przycisku pod oceną i flow wybierający po id. Test `tests/narzedzia/df-flow-zakoncz.test.mjs` (dziś czerwony, poza `test:skrypty`, D-912) włącz do bramki; ma przejść. Sprawdź pozostałe flowy na ten sam wzorzec dopasowania tekstu. Gotowe: test czerwony przed / zielony po (dowody), `pnpm run ci` kod 0.
   2. 07-jakosc-002 (ŚR): fixture „D-630” ma wymuszać warunek D-630 — mutanty A i B z recenzji mają ginąć. Gotowe: dowód mutacji.
   3. 07-jakosc-003 (ŚR): wyrocznia „air” ma wykluczać gotowego strita — mutant classifyHolding ma ginąć w teście wyroczni, nie tylko w migawce odcisków. Gotowe: dowód mutacji.
   NIS 004/005 — tylko wpis do backlogu w `docs/decyzje/DK.md`.
   Ścieżki wrażliwe (CLAUDE.md, D-043): jeśli dotkniesz którejś, zgłoś w raporcie. Nie zmieniaj odcisków ani ID w powtórkach.
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nie poluzowujesz istniejących testów ani progów, nigdy --no-verify ani force-push, bez AskUserQuestion. STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: techniczne przez analogię z lkarwowski494/trening (`repo:plik:linia`), do weta. Pula D-940…D-949, `docs/decyzje/DK.md`.
6. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułap 8 USD, próg STOP 10,4 USD.
7. Push zbiorczo na `sesja-dk-poprawki`.
8. Raporty (≤ 10 linii, send_message): po zadaniu 1 czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: SHA, dowody, decyzje, koszt, otwarte.
