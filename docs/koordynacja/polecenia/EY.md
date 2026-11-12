# Sesja EY: kod według specyfikacji EV (EV-1…EV-5) — Szkoła Pokera
Koordynator: session_01T66VBz8VshtVqwg6bHotLi (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie fix (zadania EV-1…EV-5). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ey-fix` od `sesja-ev-tresci` @ 7e667066 (inny HEAD: zgłoś). Specyfikacja: `docs/tresci/stan-ev.md` (EV-1…EV-5), decyzje `docs/decyzje/EV.md` (D-1285…D-1289), łatka `docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch` i `ev-r-m5-012-check.txt`. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadania (test najpierw czerwony z właściwego powodu, potem kod):
   1. EV-1 SDV = (W+½T)/N (D-1285) w ocenie/generatorze; wektory testowe ze specyfikacji.
   2. EV-2 turn-bet tylko z czystymi outami (D-1286); wektory.
   3. EV-3 i EV-4: test `szablony-f2-ca.test.ts:104` (lista na sztywno → z danych), `heroPositions`; `scenario-gen` (:192, :811) wybiera przypadek właściwej reguły (R-M5-004 nie zasłania R-M5-012); następnie nałóż łatkę R-M5-012 `check` i zadanie m5.l4.c-oop do `content/` (pl+en; pozostałe języki tylko tam, gdzie test struktury tego wymaga — wtedy wartości jak w łatce i lista kluczy dla 09), `pnpm content:build`.
   4. EV-5 („czysty check”) tylko jeśli mieści się bez nowego ekranu; inaczej raport.
   5. `pnpm run ci` kod 0 na końcowym SHA → `docs/programista/dowody/ey-ci-<sha>.txt`.
   „Gotowe”: każdy punkt z testem czerwonym przed / zielonym po (dowód w pliku), ci kod 0.
4. Zakazy: nie zmieniasz workflowów ani `packages/postep/` (ścieżka wrażliwa); nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora. Równolegle sesja EZ recenzuje treść EV (tylko docs) — nie zmieniaj merytoryki reguł; rozbieżność ze specyfikacją → PYTANIE.
5. Decyzje: najpierw analogia (`lkarwowski494/trening`), do weta. Pula **D-1310…D-1319** (`docs/decyzje/EY.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, decyzje do weta, klucze dla 09, koszt.
