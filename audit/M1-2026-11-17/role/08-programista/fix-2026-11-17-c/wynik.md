# Wynik: 08-programista, fix 2026-11-17 (c), M2-koordynator-napraw-006 (KO-131)

Gałąź claude/sesja-is-naprawy-p1, bez push. Klasyfikacja: D (defekt), wariant (a) zatwierdzony przez właściciela.

## Commity
- 8b05f9a6, struktura: `kontrast`/`zloz` do apps/mobile/src/test-utils/kontrast.ts (bez zmiany zachowania) [M2-koordynator-napraw-006]
- 759aeeb9, testy: apps/mobile/src/components/__tests__/RangeGrid-etykieta-kontrast-08.test.tsx, apps/mobile/src/theme/__tests__/kontrast-pary-08.test.ts, para w `paryZlozone` (docs/design/tokeny.ts i kopia 1:1 apps/mobile/src/theme/tokeny.ts) [M2-koordynator-napraw-006]
- c946948d, zmiana: apps/mobile/src/components/RangeGrid.tsx [M2-koordynator-napraw-006]

## Testy
- Przed: pełny zestaw mobile 176 zestawów, 1811 testów, kod 0 (dowody/testy-przed.txt).
- Czerwony test przed zmianą: 8 niezaliczonych (dowody/test-czerwony-przed.txt): kontrast pola pełnego w light i lightHigh (etykieta ink 3,92 i 3,26 < 4,5), próg zmiany koloru (4 motywy), treść pl w light i lightHigh. Powód właściwy (asercja kontrastu i koloru, nie import).
- Po: 177 zestawów, 1841 testów, kod 0 (dowody/testy-po.txt); typecheck kod 0 (dowody/typecheck-po.txt); `pnpm run ci`: dowody/ci-po.txt .

## Kontrast etykiety (tabela pełna: dowody/kontrasty.txt)
| tło pod etykietą | light przed→po | dark | lightHigh przed→po | darkHigh |
|---|---|---|---|---|
| pole puste (surface), ink | 18,17 | 13,48 | 18,17 | 13,48 |
| pole pełne, felt1@0,85 na surface | ink 3,92 → onFelt 4,55 | ink 7,87 → onFelt 8,97 | ink 3,26 → onFelt 5,49 | ink 9,19 → onFelt 10,47 |
| pole pośrednie, część na zieleni (ink, bez zmiany) | 3,92 | 7,87 | 3,26 | 9,19 |
| pole pośrednie, część na surface (ink) | 18,17 | 13,48 | 18,17 | 13,48 |
Znak „•” (ink, stoi w rogu, bez zmiany): na zieleni 3,92 / 7,87 / 3,26 / 9,19, na surface 18,17 / 13,48 / 18,17 / 13,48; wszystko >= 3 (test w RangeGrid-etykieta-kontrast-08 i para w `paryZlozone`).
PaintGrid: żadnej zmiany kodu; wszystkie 6 par etykieta/tło (niepomalowane, pomalowane, trafione, brakujące, nadmiarowe, mieszane) >= 4,5 w 4 motywach (min 5,23: primaryInk na good, light). Pilnują je nowe testy (kontrast-pary-08 i komponentowy z renderem PaintGrid).

## Reguła dla pól częściowych (RangeGrid)
Pasek od lewej, szerokość = częstość pierwszej grupy; etykieta na środku, tekst zajmuje ok. 50–70% szerokości pola (założenie: 8 pt, 2–3 znaki, pole 22–27 pt; nie mierzone na telefonie). `POKRYCIE_ETYKIETY_NA_SUKNIE` = 0,85: pokrycie >= 0,85 → `onFelt` (cały tekst na zieleni), niżej → `ink`. Pole puste i pełne spełniają 4,5:1 w 4 motywach. Pole pośrednie (0,15 < pokrycie < 0,85): tekst leży na zieleni i surface naraz; `onFelt` zniknąłby na surface (1,02:1), więc `ink`: >= 3:1 do obu teł, 4,5:1 spełnione tylko w dark i darkHigh (7,87 i 9,19 na zieleni), w light i lightHigh nie (3,92, 3,26).
Liczba pól pośrednich w treści pl (spot × klasa, 34 spoty, 5746 pól): 146 pól w 27 spotach, 51 różnych klas z 169 (przedział węższy 0,25–0,75, geometria 390 pt: 95 pól, 38 klas); pełnych 2358, pustych 3242. Dotyczą tylko motywów light i lightHigh.

## Otwarte dla roli 04 (nie wdrażałem, bez nowych elementów)
Pola pośrednie w light i lightHigh nie mają 4,5:1. Opcje: (1) podkładka `surface` pod etykietą pola częściowego (nowy element; pewne 4,5:1, zasłania kawałek paska); (2) niższe krycie paska (np. 0,70: ink na zieleni rośnie; do policzenia, zmienia wygląd zakresu i parę w `paryZlozone`); (3) reguła „pole częściowe = tylko pasek, etykieta pod spodem w dymku/legendzie” albo wyższy próg zaokrąglenia (częstość >= 0,5 rysowana jako pełne pole, < 0,5 jako puste, informacja o częstości tekstem). Rekomendacja: (1), najmniejsza zmiana wizualna.

## Nowe znaleziska
- Latentne: kolory grup akcji 2 i 3 w RangeGrid (`przejsciowe.warn`, `cardBlue` z kryciem 0,85) nie dają 4,5:1 z `ink` ani `onFelt` (np. ink na warn@0,85 w dark 2,23; light 4,23; ink na cardBlue@0,85 light 3,62). Treść pl ma jedną grupę w każdym z 34 spotów (test pilnuje założenia), więc dziś nie występuje; przy dodaniu drugiej grupy rola 04 musi dobrać kolory. Poziom P2, brzegowy.
- Etykieta ma stałe `fontSize: 8` z domyślnym skalowaniem tekstu; przy dużym Dynamic Type etykieta może wyjść poza pole (nie badane, poza zakresem). Do zgłoszenia roli 04 (SP-03), P2.

## Lista kontrolna na telefon (właściciel, build TestFlight)
1. Lekcja z siatką zakresu, motyw jasny: pola w zakresie (zielone) mają jasną etykietę, pola poza zakresem ciemną; czytelne bez wysiłku.
2. To samo w motywie ciemnym i z włączonym „Zwiększ kontrast” (jasny i ciemny).
3. Pola częściowo wypełnione (np. 40–70%): oceń czytelność etykiety (znane ograniczenie w jasnych motywach).
4. Klasy ze znakiem „•”: znak widoczny na zielonym i na białym polu.
5. Ćwiczenie malowania: etykiety na polu pomalowanym, trafionym, brakującym, nadmiarowym, mieszanym; wszystkie czytelne (bez zmiany względem dotychczasowego wyglądu).

## Przegląd ścieżek wrażliwych
Zmiany poza listą ścieżek wrażliwych z CLAUDE.md (komponenty, motyw, test-utils, docs/design/tokeny.ts); przegląd w świeżym kontekście nie wymagany. Katalog docs/jakosc/przypadki-uzycia.md nie wymienia siatki zakresu: bez zmian.
