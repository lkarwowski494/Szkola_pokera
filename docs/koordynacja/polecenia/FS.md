# Sesja FS: recenzja niezależna szkiców FQ — Szkoła Pokera
Koordynator: session_01T66VBwVqBvUz9W9xFX1d8L (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-fq-szkice` @ 42673fb4 (= robocza 5ec4f912 + szkice FQ; inny HEAD: zgłoś); raport na własnej gałęzi `sesja-fs-recenzja`. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zakres (recenzja niezależna, bez czytania uzasadnień autora przed własną oceną; wzór: recenzja FK `docs/tresci/recenzje/recenzja-fd-fc16e128.md`):
   1. Szkice `docs/tresci/szablony-robocze/fq/{pl,en}/` (SC-13, 22, 25, 28, 29): poprawność merytoryczna według ADR-24 (każde twierdzenie — przeczytane źródło, cytat sprawdzony na surowym tekście), liczby tylko `{{n:…}}`, terminologia (jedna nazwa na pojęcie), zgodność pl/en.
   2. FN-N1 (SC-24) i `docs/tresci/liczby-river-catch-defend.md` (rachunek: sprawdź niezależnie formułę i 2–3 warianty ręcznie).
   3. Decyzje FQ `docs/decyzje/FQ.md` (D-1460…1467): werdykt każdej (utrzymać / zmienić z powodem).
   4. Werdykt dla każdego szkicu: gotowy do `content/` / po poprawkach (lista) / zablokowany (np. 08-FQ-1 dla SC-13, 08-FQ-2).
   Gotowe: raport `docs/tresci/recenzje/recenzja-fq-42673fb4.md` w formacie znalezisk z ważnością (KRYT/WYS/ŚR/NIS) i pewnością, plus test odtwarzający dla każdego WYS+ (skrypt albo komenda w `docs/tresci/dowody/fs-*.txt`).
4. Zakazy: tylko `docs/tresci/recenzje/**`, `docs/tresci/dowody/fs-*`, `docs/decyzje/FS.md`; nie poprawiasz szkiców (to 06 fix), nie zmieniasz `content/`, kodu ani plików językowych; nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: merytoryczne według hierarchii ADR-24 (nie właściciel); techniczne: analogia z lkarwowski494/trening (oczko, piekarz), `repo:plik:linia`, do weta. Numery tylko D-1470…D-1474.
6. Kontekst: od 30% okna kończysz krok, zapisujesz stan w raporcie, push, PRZEKAZANIE. Pułap kosztu: brak (mandat).
7. Push: zbiorczo na `sesja-fs-recenzja`; przed pushem `pnpm run ci` kod 0, dowód `docs/tresci/dowody/fs-ci-<sha>.txt`.
8. Raporty (≤ 10 linii, przez send_message): PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: werdykty, liczba znalezisk wg ważności, SHA, dowód ci, koszt, następny krok.
