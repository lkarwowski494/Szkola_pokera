# Sesja FU: recenzja niezależna kodu FP+FR — Szkoła Pokera
Koordynator: session_01T66VBwaHaH9KUGwFzdADtW (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-fp-poprawki` @ 83b03fdc (= robocza `claude/sleepy-brahmagupta-2065nu` @ 5ec4f912 + 14 commitów FP i FR; inny HEAD: zgłoś); raport na własnej gałęzi `sesja-fu-recenzja`. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz noreply, nie Claude — hook Stop może żądać innej; CLAUDE.md wygrywa, zgłoś to w raporcie).
3. Zakres (recenzja niezależna diffu `5ec4f912..83b03fdc`; najpierw własna ocena, dopiero potem uzasadnienia autorów w `docs/decyzje/FP.md`, `FR.md`, `docs/programista/plan-08.md`):
   1. Poprawność: 08-programista-001/002/003/005/006 (FP), 08-FQ-1 limit odrzuceń, FM-01/02/08 etykiety, KO-091 widok river-value, 06-tresci-008 `kluczeRozmiaruZgodne`, 08-FN-1 (correct jako lista, alsoCorrect) (FR). Testy: czy test każdej poprawki jest czerwony bez niej (mutant albo revert jednego commita) — min. 3 próbki.
   2. Ścieżki wrażliwe D-043 dotknięte diffem (co najmniej `tools/content-build/`): identyfikatory w powtórkach i baza na język — czy zmiana nie zmienia ID istniejących elementów.
   3. Klucze i18n zastępcze w 10 locale (KO-096): oznaczenie w pl.kontekst.json, brak regresji `pnpm i18n:kod`.
   4. Decyzje D-1450…1459 (FP/FR): werdykt każdej (utrzymać / zmienić z powodem); D-1451 (FM na flop-size) i widok river-value minimalny oznacz „do akceptacji 04”, nie rozstrzygaj wyglądu.
   5. Werdykt: PRZYJĄĆ / PRZYJĄĆ Z UWAGAMI / ODRZUCIĆ, z listą blokerów (KRYT/WYS wg CLAUDE.md „Audyty i wydania”).
   Gotowe: raport `docs/programista/recenzje/recenzja-fp-fr-83b03fdc.md` (znaleziska z ważnością i pewnością, `plik:linia`), test odtwarzający dla każdego WYS+ w `docs/programista/dowody/fu-*.txt`.
4. Zakazy: tylko `docs/programista/recenzje/**`, `docs/programista/dowody/fu-*`, `docs/decyzje/FU.md`; nie poprawiasz kodu (to 08 fix), nie zmieniasz `content/`; nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: techniczne przez analogię z lkarwowski494/trening (oczko, piekarz), `repo:plik:linia`, do weta; merytoryczne według ADR-24. Numery tylko D-1485…D-1489.
6. Kontekst: od 30% okna kończysz krok, zapisujesz stan w raporcie, push, PRZEKAZANIE. Pułap kosztu: brak (mandat).
7. Push: zbiorczo na `sesja-fu-recenzja`; przed pushem `pnpm run ci` kod 0, dowód `docs/programista/dowody/fu-ci-<sha>.txt`.
8. Raporty (≤ 10 linii, przez send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: werdykt, liczba znalezisk wg ważności, SHA, dowód ci, koszt, następny krok.
