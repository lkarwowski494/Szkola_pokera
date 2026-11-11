# Sesja EG: scalenie partii do roboczej (konflikt plików generowanych) — Szkoła Pokera
Koordynator: session_01T66VBwtbeXie1cCrPGeeBK (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie build. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-eg-scalenie` @ b3963e9a (= robocza `claude/sleepy-brahmagupta-2065nu`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania:
   1. Scal kolejno (`git merge --no-edit`): `3a7d3f19` (DZ, przekład), `29130d39` (DV, docs), `b4eaf50a` (DU+EB, szablony SC-06/32/33/34), `539919af` (DX+ED, silnik, KO-073). Wszystkie przyjęte (CI zielone na tych SHA, recenzje: DW/EA/EC/EE). Sprawdzone przez koordynatora: pierwsze trzy bez konfliktu; `539919af` konfliktuje tylko w plikach generowanych (`apps/mobile/assets/content/tresc-*.db`, `apps/mobile/src/data/content/tresc.generated.ts`).
   2. Konflikt rozwiąż wyłącznie przez regenerację: weź dowolną stronę plików generowanych, usuń bazy o nieaktualnym skrócie, uruchom `pnpm content:build`, dodaj wynik. Pliki źródłowe (`content/`, kod, testy) nie mogą mieć konfliktu — jeśli mają: STOP i raport z listą plików.
   3. Kontrola: `git diff --stat` źródeł względem każdej z czterech gałęzi — scalenie nie gubi zmian (np. `git diff b4eaf50a HEAD -- content/pl/scenarios/sc-34.yaml` pokazuje tylko zmiany z ED, nie cofa EB; to samo dla sc-01/02/03/19 względem 539919af). Wynik w pliku dowodu.
   4. `pnpm run ci` kod 0 (plik `docs/programista/dowody/eg-ci-<sha>.txt`), push na `sesja-eg-scalenie`.
   Gotowe: commit scalenia na `sesja-eg-scalenie`, ci kod 0, dowody. Robocza przesuwa koordynator (fast-forward).
4. Zakazy: nie pushujesz na roboczą ani `main`, nie zmieniasz kodu ani treści poza plikami generowanymi, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli zamieniasz na raport do koordynatora.
5. Decyzje: tryb nocny (analogia, do weta); pula D-1160…D-1164 (`docs/decyzje/EG.md`), prawdopodobnie niepotrzebna.
6. Kontekst: od 30% okna kończysz krok, push, PRZEKAZANIE. Okno 1 000 000 tokenów (próg ok. 300 tys.).
7. Raport (≤ 8 linii, send_message): PRZEKAZANIE: SHA scalenia, ci kod i plik dowodu, wynik kontroli zgubionych zmian, koszt.
