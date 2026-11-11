# Sesja DG: poprawki 06-tresci-001 i 003 po recenzji DD — Szkoła Pokera
Koordynator: session_01T66VBvYWeNrFwMqZNx9zYV (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola: 06-tresci w trybie fix. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dg-poprawki` @ 431cb885e0dc5c4bc472eb82a9e7811b97785474 (= `origin/sesja-dd-recenzja`: CW 0ef7785 + recenzja DD + test it.fails f029231; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania (źródło: `docs/tresci/recenzje/recenzja-cw-0ef7785.md`):
   1. 06-tresci-001 (WYSOKIE): zdanie NIS-003 „każda karta wyższa od stołu daje jeszcze 3 niepewne outy” jest fałszywe przy drawie do koloru z 3 kartami koloru na stole i nadkartą w innym kolorze (2 outy). Popraw brzmienie w `content/pl` (sc-01, sc-19 i pozostałe wyjaśnienia z tym zdaniem, 35 baz wg recenzji) na prawdziwe we wszystkich wariantach (np. „najwyżej 3”), liczby tylko przez `{{n:…}}`. Test `it.fails` z f029231 zamień na zwykły `it` i ma przejść; najpierw pokaż go czerwonym na kodzie sprzed poprawki (już jest). Gotowe: test zielony, `pnpm content:build` i `pnpm run ci` kod 0, wynik do pliku dowodu w `docs/tresci/dowody/`.
   2. 06-tresci-003 (NISKIE): R-M2-005 w rejestrze reguł — wpisz nazwane uproszczenie NIS-003 zamiast `uproszczenie: null`. Gotowe: wpis + content:build 0.
   3. Przekłady 10 języków tego zdania (dziedziczą 001) NIE są twoim zadaniem: wypisz w raporcie listę kluczy/plików do przekładu dla roli 09.
   Nie ruszasz 06-tresci-002 (decyzja produktowa u właściciela).
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: merytoryczne wg hierarchii źródeł ADR-24 (CLAUDE.md); techniczne przez analogię z lkarwowski494/trening (`repo:plik:linia`), do weta. Numery tylko z puli D-917…D-924, wpisy w `docs/decyzje/DG.md`.
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w `docs/decyzje/DG.md`, push, PRZEKAZANIE. Pułap 10 USD, próg STOP 13 USD.
7. Push zbiorczo na `sesja-dg-poprawki`.
8. Raporty (≤ 10 linii, send_message): po zadaniu 1 czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: SHA, dowody, decyzje do weta, koszt, lista przekładów dla 09, otwarte.
