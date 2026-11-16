# Sesja HV — stan (rola 07 fix, JAK-19, bramka scenariuszy D-060)
Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HV.md` @ e177e0f4 · gałąź `claude/sesja-hv-scenariusze` od 7f51a9b3 · decyzje `docs/decyzje/HV.md` (D-1780…D-1785).

## E0 (2026-11-16)
- Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0 (`pnpm install --frozen-lockfile` kod 0); push na gałąź roboczą; bez macOS, więc Maestro i TestFlight nie uruchamiane (zakaz polecenia).
- Klasyfikacja: JAK-19 = **D** (brak katalogu PU i bramki na ścieżce buildu); klasy pozycji wg D-1780, D-1784 (decyzje agenta do weta, bez pytania właściciela — polecenie pkt 5). E0 STOP zastąpiony tym plikiem (D-1785).
- Plan: (1) skrypt z modułu + test na fiksturach, (2) katalog PU, `ostatni-build.txt`, protokół 1010 bez pozycji, szablon i lista F, (3) krok w `testflight.yml` + test w `workflowy.test.mjs`, (4) dowody mutacji, `pnpm run ci`, przekazanie. Ryzyko: ścieżka wrażliwa `.github/workflows/` (D-043) — recenzję niezależną zleca koordynator.

## Stan
- [x] 1 skrypt i test · [x] 2 katalog (21 PU: A 0, B 14, F 7) · [x] 3 workflow · [ ] 4 dowody i przekazanie

## Otwarte
- Rola 08: testID `ekran:<trasa>` na korzeniu 15 ekranów (D-1780); potem 07: kroki `assertVisible`/`# powrót:` w flowach i klasa A (termin 1013).
- Przed buildem 1011: `--szkielet 1011`, linia `Przegląd: build 1011 @ <sha>`; po wysyłce: `docs/wydanie/ostatni-build.txt` = numer wysłanego buildu (D-1783, test pilnuje).
- Numer następnego buildu = 1000 + numer przebiegu `testflight.yml` `[DO USTALENIA]` (nieudane przebiegi też zwiększają numer).
