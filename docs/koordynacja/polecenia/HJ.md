# Sesja HJ: recenzja niezależna HG (07 audit) — Szkoła Pokera
Koordynator: session_01T66VByLRhPb6XTrNCYoUC8 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 07-jakosc w trybie audit. Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (4 części; część 1 w wiadomości startowej, 2–4 przez send_message). Zacznij pracę dopiero po części 4/4. Przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-hj-recenzja` utworzona od `claude/sesja-hg-ci` @ ba9a0fa5 (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania (zakres: diff b7bc12e6..ba9a0fa5, bez raportu autora jako wejścia — dowody HG czytasz jako deklaracje do sprawdzenia):
   1. `.github/workflows/e2e-ios.yml` (D-1620): push tylko na `main` i `claude/sleepy-brahmagupta-2065nu`; czy nic innego nie wypadło (workflow_dispatch, ścieżki, concurrency); test w `tests/narzedzia/workflowy.test.mjs` łapie regresję (mutant). Gotowe: werdykt z dowodem.
   2. `tools/content-build/src/build.ts` (+3 linie, ścieżka wrażliwa D-043) i `tools/content-build/test/build.test.ts` (KO-106, D-1622): hook `naStartKontroliSzablonu` nie zmienia wyniku budowania (35 baz identycznych bajtowo przed/po albo równoważny dowód); bramka liczby losowań rng: deterministyczna (2 przebiegi, ta sama liczba), próg 731 806 162 = 2× sc-13 — oceń zapas ~1% przy mutancie ×2 (czy mutant ma sens, czy próg łapie realny wzrost); liczba testów nie maleje (42→43); czas ścienny nie jest asercją. Gotowe: werdykt + ewentualne znaleziska z poziomem.
   3. 07-jakosc-001 (D-1621): test kształtu części CI — mutanty M15–M24 sami powtórz co najmniej dla 3; ci.yml bez zmian. Gotowe: tabela mutant → wynik.
   4. `pnpm run ci` na ba9a0fa5 we własnym kontenerze: kod wyjścia do pliku dowodu.
   Wyjście: raport `docs/jakosc/recenzja-hj-hg.md` z werdyktem PRZYJĄĆ / PRZYJĄĆ Z UWAGAMI / ODRZUCIĆ, dowody w `docs/jakosc/dowody/hj-*.txt`. Kodu HG nie poprawiasz (znaleziska → koordynator).
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora i czekasz na odpowiedź.
5. Decyzje: tryb analogia (najpierw lkarwowski494/trening, `repo:plik:linia`, wpis do weta). Numery decyzji tylko z puli D-1650…D-1659, zapis w `docs/decyzje/HJ.md`.
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w `docs/jakosc/plan-hj.md`, push, PRZEKAZANIE. Pułap 6 USD; próg STOP 7,8 USD.
7. Push: zbiorczo; tylko docs na tej gałęzi.
8. Raporty (≤ 10 linii, przez send_message): po starcie — liczba linii zaczynających się od „# ” i od „#” w całym prompcie roli (kontrola kompletności); PYTANIE; PRZEKAZANIE (SHA, run CI, dowody, werdykt, decyzje do weta, koszt, otwarte).
