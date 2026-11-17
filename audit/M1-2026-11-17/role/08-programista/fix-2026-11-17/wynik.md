# 08-programista, fix, M2-koordynator-napraw-001 (06-tresci-502), 2026-11-17

Klasa: D (rozstrzygnięcie P: KO-129, wariant a). Commit: 1d756b0b.

## Zmiana
`apps/mobile/src/components/RangeGrid.tsx`: pole klasy z `spot.uncertain` dostaje znak „•” (styl `mark`, `tk.muted`, jak PaintGrid); legenda `paint.legendMixed` tylko gdy `uncertain` niepuste. Bez nowych kolorów, komponentów i kluczy i18n. Jedyny renderer: `apps/mobile/src/components/Blocks.tsx:128` (RangeBlock) -> RangeGrid; innych wystąpień siatki bez oznaczenia brak.

## Testy
Nowy: `apps/mobile/src/components/__tests__/RangeGrid-uncertain.test.tsx` (5 testów, 34 spoty z bazy pl, 25 z uncertain, 4 BB: vs-open.bb-vs-btn/-vs-sb i nine.*).
- Przed (czerwony, kod 1, asercja o liczbie „•” 0 zamiast n): `dowody/test-czerwony.txt`
- Po (zielony, 5/5): `dowody/test-zielony.txt`
- Pełny zestaw aplikacji: 174 pakiety, 1787 testów, kod 0: `dowody/test-mobile-pelny.txt`
- Typecheck (`pnpm typecheck`): kod 0: `dowody/typecheck.txt`
- Lint: aplikacja nie ma lokalnej konfiguracji eslint; `pnpm run ci` nie uruchamiałem.

## Zrzuty
Brak: `pnpm zrzuty:web` ma stałą listę ekranów (`apps/mobile/zrzuty-web/wejscie.tsx`) bez lekcji M4.l2; dodanie ekranu to poza zakresem. Do listy kontrolnej telefonu: Lekcje > M4.l2 > siatka obrony BB vs BTN: kropki „•” w rogu m.in. T2s, K7o, Q8o, 75o, J3s, 74s, 63s (kolory tła bez zmian), pod siatką „• mieszana”; siatka bez klas niepewnych (np. spot bez uncertain) bez kropek i legendy.

## Nowe znaleziska (bez naprawy)
1. Dostępność: RangeGrid jest jednym elementem `accessible` z jedną etykietą (`range.label`); czytnik ekranu nie dostaje ani składu zakresu, ani klas niepewnych (przed zmianą też nie). Poprawka wymaga nowego tekstu: propozycja dla 04/09: `range.uncertain` = „Klasy mieszane (bez pewnej akcji): {{hands}}.” dołączone do etykiety siatki.
2. Ścieżki wrażliwe: żadnej nie dotknięto; przegląd subagentem niepotrzebny.
3. Kropka 8 pt w polu 13x13 na 320 pt AX5 niesprawdzona wizualnie (brak zrzutu); do listy telefonu.
