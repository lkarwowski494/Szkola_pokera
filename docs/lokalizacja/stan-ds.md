# Stan sesji DS (rola 09, build): przekład scenario.numbers.* i scenario.icm.*
Aktualizacja: 2026-11-11 · gałąź `sesja-ds-przeklad` (start b3963e9a) · polecenie `docs/koordynacja/polecenia/DS.md` @ 29162f74 · decyzje `docs/decyzje/DS.md` (D-1010…D-1013)

## Zrobione
- 22 klucze (7 numbers + 15 icm) × 10 słowników; test `apps/mobile/src/i18n/__tests__/scenariusz-liczby-icm-ds-09.test.ts` (czerwony 208/231 → zielony 231/231, `dowody/ds-test-czerwony.txt`).
- `i18n:kod`: 0 błędów; wyjątki: `dowody/ds-wyjatki-2026-11-11.md`.
- Przekład zwrotny: `dowody/ds-zwrotny-*`; poprawki z niego wprowadzone (ko/zh tableLabel, pt/pt-BR/vi bubble i „jogo”).

## Znaleziska do innych ról
- 04/06: `{{t:board|…}}` w `scenario.icm.tableLabel` (D-990) oznacza „stół” jako miejsce, a termin board to karty (glosariusz, D-275); glosa „(board)” w VoiceOver. Test T-01 wymusza znacznik; propozycja: inny sposób spełnienia T-01.
- 06: pt `drill.icm.callPrompt` ma „Bubble”, reszta pt „bolha” (nazwa terminu: bolha).
- fr/pt: istniejące `scenario.numbers.line` jest w „tu”, reszta słownika w „vous”/3. os.; ko/zh `numbers.line` używają „승률/勝率”, a `numbers.icm` „에퀴티/權益” (dwa słowa na equity).
- 08: `komponenty.tsx:170` łączy listę nagród przez `.join(', ')` (ASCII), dla ja/zh-Hant byłby „、/，”; ko wholeStack ma partykułę zależną od wartości („{{kwota}}는”, „bb” kończy się samogłoską, więc poprawnie dla „N bb”).
- Przegląd człowieka: brak (przegląd modelu ≠ rodzimy użytkownik); zrzuty w najdłuższym języku: nie wykonane.
- CI: `dowody/ds-ci-b3963e9a.txt` (kod 0, na bazie b3963e9a + zmiany sesji).
