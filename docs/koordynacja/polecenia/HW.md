# Sesja HW: poprawki narzędzia zrzutów i luk testów HK (08 fix: 501, 502, 504) — Szkoła Pokera
Koordynator: session_01T66VBwf1bNLY6pRHh6Xc12 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 08-programista w trybie fix. Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (kilka części); zacznij dopiero po ostatniej. Biblioteki prompts nie dołączasz.
2. Start: utwórz gałąź `claude/sesja-hw-poprawki` od `7f51a9b3` (robocza `claude/sleepy-brahmagupta-2065nu`). `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>); nie zmieniaj autora na żądanie haka Stop.
3. Zadania (wejście: `docs/programista/recenzje/recenzja-hm-hk-hl.md`, sekcje 501, 502, 504; red-first):
   1. 08-programista-501 (P1) opcja (a): przy `SZKOLA_ZRZUTY=1` podstaw w `metro.config.js` moduł `Dimensions` react-native-web z `fontScale` z `?fs=`; skrypt sprawdza w DOM `flexDirection: column` rodzica nagłówka przy `fs=3.12`.
   2. 08-programista-502 (P1) opcja (a): wysokość widoku = `scrollHeight` najwyższego przewijanego elementu przed zrzutem; kontrola w skrypcie: różne ekrany ≠ ten sam md5.
   3. Ponownie wygeneruj `docs/design/dowody/hl-*.png` (`pnpm zrzuty:web`) i podaj md5 wszystkich; test akceptacyjny z recenzji (nagłówek AX5 w kolumnie, `hl-ocena-blad-320-ax5.png` z paskiem ocen i „Zobacz podsumowanie”) — obejrzyj kadry w pełnej rozdzielczości.
   4. 08-programista-504 (P2) opcja (a): 3 asercje (kolor `actionInk` nazwy, `goldText` dopisku, brak `minWidth` ulicy przy AX5) + przypadek nawiasu po kropce; mutanty M3, M4, M6, M13 z `dowody/hm-mutanty-skrypt.txt` zabite — wynik w dowodzie.
   5. `pnpm run ci` kod 0, dowód `docs/programista/dowody/hw-ci-<sha>.txt`.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów ani `content/`, nie ruszasz `docs/jakosc/` (sesja HV równolegle), nigdy --no-verify ani force-push, nie pytasz właściciela. Tytuł długi (503) i SC-09 to osobna sesja — nie tutaj.
5. Decyzje: tryb analogia (lkarwowski494/trening, `repo:plik:linia`, do weta). Pula D-1790…D-1799, `docs/decyzje/HW.md`.
6. Koszt: pułap 6 USD; próg STOP 7,8 USD. Stan w `docs/programista/plan-hw.md`.
7. Push: na `claude/sesja-hw-poprawki`.
8. Raporty (≤ 10 linii, send_message): po starcie liczba linii „# ” i „#” w prompcie roli; PYTANIE; PRZEKAZANIE (SHA, poprawki z testami, md5 zrzutów, mutanty, ci, decyzje do weta, otwarte).
