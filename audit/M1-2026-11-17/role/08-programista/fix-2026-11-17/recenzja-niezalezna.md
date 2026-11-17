# Recenzja 1d756b0b (RangeGrid: klasy uncertain), 2026-11-17

Gałąź claude/sesja-is-naprawy-p1. Nie czytano wynik.md ani docs/decyzje/IS.md. Główne drzewo bez zmian w apps/ (`git status --short apps/` puste), worktree usunięty (`git worktree list`: tylko główne).

## 1. Zgodność z wymaganiem i z PaintGrid: TAK
- RangeGrid.tsx:14 `new Set(spot.uncertain ?? [])`; :42 `•` w `styles.mark` z kolorem `tk.muted`; :68 `mark: { position: 'absolute', top: 0, right: 1, fontSize: 8, fontWeight: '800' }`, identycznie jak PaintGrid.tsx:190; kolor jak w PaintGrid.tsx:147 dla `mixed` (tk.muted).
- Legenda RangeGrid.tsx:56 `t('paint.legendMixed')` tylko gdy `niepewne.size > 0`. Brak nowych kolorów, komponentów i kluczy (diff: 5 linii w RangeGrid + test).
- Drobna różnica: w PaintGrid (159) legenda „mieszana” ma próbkę koloru `feltSoft` (tło pola mieszanego), w RangeGrid jest sam tekst „• mieszana”. To zgodne z zakazem nowych kolorów, bo RangeGrid nie zmienia tła pól. Nie uznaję tego za błąd.
- Klucz `paint.legendMixed` jest we wszystkich 12 plikach locale UI (de, en, es, fr, it, ja, ko, pl, pt, pt-BR, vi, zh-Hant), ma też opis w pl.kontekst.json:463. W `src/i18n/locales` jest tylko 12 języków UI (bazy treści: 35). To stan zastany, nie tej zmiany.

## 2. Jedyne miejsce rysowania siatki w lekcjach: TAK
- grep `RangeGrid|PaintGrid|HAND_CLASSES` w src: lekcje rysują siatkę tylko przez Blocks.tsx:114 (`case 'range'`) → RangeBlock :125–128 → `<RangeGrid>`. PaintGrid jest tylko w session.tsx:400 i 646 (ćwiczenie). Innych siatek 13×13 nie ma (grep `length: 13|169|13×13`).

## 3. Test: przechodzi i łapie wszystkie 4 mutacje
- `cd apps/mobile && env -u NODE_PATH npx jest src/components/__tests__/RangeGrid-uncertain.test.tsx`: 5/5 passed, exit 0 (log: „spotów: 34, z uncertain: 25, BB: 4”, „sprawdzonych siatek: 34”).
- Mutacje w worktree (node_modules przez symlink):
  - (a) kropka dla wszystkich klas: 4 testy padły. ZŁAPANA.
  - (b) brak legendy: 2 testy padły (test 1 i test danych). ZŁAPANA.
  - (c) legenda zawsze: 2 testy padły (test 2 i test danych). ZŁAPANA.
  - (d) kropka w polu sąsiedniej klasy, ta sama liczba kropek: padł tylko test 3 (syntetyczny, T2s). ZŁAPANA.
  - (d2) dodatkowa kropka na AA: 3 testy padły. ZŁAPANA.
- Słabość: test na danych porównuje tylko liczbę kropek, nie ich położenie. Mutację (d) łapie jedynie test 3 na jednej klasie T2s. Kolor i styl kropki nie są testowane.

## 4. Dane treści: TAK
- Test czyta bazę `tresc-*-pl.db` przez `sciezkaTresciPl()` (src/test-utils/trescPl.ts, wymaga dokładnie jednego pliku) i `SELECT ... FROM ranges`, a potem renderuje wszystkie 34 spoty.
- Niezależnie (python, content/ranges/spots.yaml): 34 spoty, 25 z uncertain, 4 BB: vs-open.bb-vs-btn, vs-open.bb-vs-sb, nine.vs-open.bb-vs-btn, nine.vs-open.bb-vs-sb. Baza tresc-d0b124291f-pl.db: 34 wiersze, listy uncertain identyczne z yaml (0 rozbieżności, 0 duplikatów, więc liczba w Set = długość listy).
- Asercje progów (>=8, >=4 BB) są luźniejsze od faktycznych liczb. Pełną zgodność zapewnia drugi test (każdy spot).

## 5. Dostępność: informacja NIEdostępna dla czytnika
- RangeGrid.tsx:20: zewnętrzny View ma `accessible` i `accessibilityLabel={t('range.label', ...)}` („{{title}}. Gra {{pct}} procent rąk.”). To scala całe poddrzewo w jeden element, więc VoiceOver i TalkBack nie czytają ani kropek, ani legendy „• mieszana”. W PaintGrid stan „mixed” jest w etykiecie pola (paint.state.mixed, PaintGrid.tsx:139). W RangeGrid etykiety pól nie ma (stan sprzed zmiany: pola też nie były czytane).

## Znaleziska
- P1: brak. P0: brak.
- P2 (dostępność): użytkownik czytnika ekranu w lekcji vs-open.bb-vs-btn słyszy tylko „tytuł. Gra X procent rąk.” i nie wie, że są klasy niepewne ani które. Informacja widoczna wyłącznie wzrokowo. Możliwa naprawa: dopisać do etykiety zbiorczej liczbę lub listę klas niepewnych. Nie jest to bariera blokująca funkcję, bo siatka była już wcześniej nieczytelna pole po polu, więc trafia do backlogu.
- P2 (test): test na danych sprawdza liczbę kropek, nie klasę. Wystarczyłoby w pętli danych porównać zbiór klas z kropką (jak w teście 3) z `s.uncertain`.
