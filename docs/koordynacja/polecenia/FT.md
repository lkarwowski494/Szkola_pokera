# Sesja FT: poprawki szkiców FQ po recenzji FS — Szkoła Pokera
Koordynator: session_01T66VBwVqBvUz9W9xFX1d8L (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie fix. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-fs-recenzja` @ d8df4a9d (= szkice FQ 42673fb4 + recenzja FS; inny HEAD: zgłoś); pracujesz na własnej gałęzi `sesja-ft-poprawki`. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadania (wejście: `docs/tresci/recenzje/recenzja-fq-42673fb4.md`, decyzje `docs/decyzje/FS.md` D-1470…1474):
   1. Popraw szkice `docs/tresci/szablony-robocze/fq/{pl,en}/` i `docs/tresci/liczby-river-catch-defend.md` według 06-tresci-001, 002, 003, 005 (WYS) i 004 (ŚR). Każda zmiana merytoryczna z przeczytanym źródłem (ADR-24), liczby tylko `{{n:…}}`, jedna nazwa na pojęcie. Gotowe: test odtwarzający FS (`docs/tresci/dowody/fs-niezalezny-*.txt` + skrypt, `fs-005-test.txt`) czerwony przed, zielony po (dowód `docs/tresci/dowody/ft-*.txt`); status każdego znaleziska w raporcie FS „naprawione (commit)” albo uzasadnione „bez zmian”.
   2. Dla 003 (SC-13 na flopach sparowanych/połączonych): jeśli poprawka wymaga filtra tekstury w generatorze — opis dla 08 (pojemność puli po filtrze) w `docs/tresci/stan-fd.md`, nie kod.
   3. 006 (NIS) — tylko wpis do backlogu w `docs/tresci/stan-fd.md` (wersja docelowa), bez zmian w szkicu.
   4. Na koniec `pnpm run ci` kod 0, dowód `docs/tresci/dowody/ft-ci-<sha>.txt`.
4. Zakazy: tylko `docs/tresci/**` i `docs/decyzje/FT.md`; nie zmieniasz `content/`, kodu ani plików językowych aplikacji; nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora i czekasz na odpowiedź.
5. Decyzje: merytoryczne według hierarchii ADR-24 (nie właściciel); produktowe do właściciela przez koordynatora (PYTANIE z ≥ 2 opcjami i rekomendacją); techniczne: analogia z lkarwowski494/trening (oczko, piekarz), `repo:plik:linia`, do weta. Numery tylko D-1475…D-1484.
6. Kontekst: od 30% okna kończysz krok, zapisujesz stan w `docs/tresci/stan-fd.md`, push, PRZEKAZANIE. Pułap kosztu: brak (mandat).
7. Push: zbiorczo na `sesja-ft-poprawki`.
8. Raporty (≤ 10 linii, przez send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: zrobione (SHA, dowód ci), testy przed/po, decyzje do weta, koszt, otwarte (dla 08), następny krok.
