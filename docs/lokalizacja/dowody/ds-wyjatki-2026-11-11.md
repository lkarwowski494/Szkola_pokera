# Wyjątki i uwagi `pnpm i18n:kod` dla scenario.numbers.* i scenario.icm.* (sesja DS, 2026-11-11)

Komenda: `pnpm i18n:kod` (kod wyjścia 0, błędy: 0). Skrypt liczy litery razem z nazwami parametrów, stąd uwagi „taki sam jak źródło” dla tekstów bez słów.

## Uwagi „taki sam jak źródło” (wyjątki, D-1012)
| Klucz | Języki | Powód |
|---|---|---|
| `scenario.icm.stackValue` „{{bb}}␣bb” | wszystkie 10 | wzorzec zapisu liczby z jednostką (U+00A0 przed „bb”, D-904); skrót „bb” jest ten sam w całym kursie |
| `scenario.icm.rowLabel` „{{kto}}, {{wartosc}}” | de, es, fr, it, ko, pt, pt-BR, vi | etykieta bez słów (dwa parametry i przecinek); ja „、”, zh-Hant „，” mają separator języka |

## Uwagi „liczby inne niż w źródle” (nie błędy)
Źródło pl zapisuje „raz na N” i „trzecie/czwarte miejsce” słowami, przekład ma cyfry: ja „1回に1回”, vi „1 lần”, zh-Hant „1 次” (te same uwagi dawał już `scenario.numbers.line`); ja/ko/zh-Hant „3位/3위/第 3 名” i „4位…”. Wniosek: ta sama klasa uwag, bez wpływu na sens (przekład zwrotny).

## Kontrola przekładem zwrotnym (świeże konteksty, 2 subagenty, wejście bez polskiego)
Wejście `ds-zwrotny-wejscie-{a,b}.md`, wynik `ds-zwrotny-wynik-{a,b}.md`. Wszystkie 210 wierszy odtworzyło sens, liczby i kierunek rachunku (kto komu dopłaca, próg ICM wyższy niż żetonowy). Przyjęte poprawki: ko i zh-Hant `tableLabel` (pozycja rywala zamiast „przeciwnik należący do pozycji”); pt i pt-BR „num jogo a/por fichas” → „num jogo em que só contam as fichas”; pt/pt-BR „vai all-in” → „está all-in”; `bubble` w pt, pt-BR i vi mówi o graczach i miejscach z nagrodą, nie o „pozycjach”. Odrzucone: ko/zh „승률/勝率” w cbet, sizeOpen i size3bet (jak w istniejącym `numbers.line`; zmiana wymaga decyzji 06/04), zh „占” (tak samo w całym słowniku), fr „dans la bulle” (jak w `drill.icm.*`), zh „溜入” (nazwa akcji z `scenario.action.limp`).
Przegląd modelu to nie przegląd rodzimego użytkownika języka.
