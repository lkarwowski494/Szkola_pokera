# pt-BR-L1 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m0-l1-uklady.md | tak, 1–104 |
| content/pt-BR/lessons/m1-l1-przebieg.md | tak, 1–97 |
| content/pt-BR/lessons/m2-l1-outy.md | tak, 1–135 |
| content/pt-BR/lessons/m2-l2-pot-odds.md | tak, 1–98 |
| content/pt-BR/lessons/m3-l1-pozycja.md | tak, 1–70 |
| content/pt-BR/lessons/m3-l2-rece-startowe.md | tak, 1–62 |
| content/pt-BR/lessons/m3-l3-zakresy-otwarc.md | tak, 1–87 |
| content/pt-BR/lessons/m4-l1-3bet.md | tak, 1–105 |
| content/pt-BR/lessons/m4-l2-obrona-bb.md | tak, 1–93 |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L1-01 | ŚR | content/pt-BR/lessons/m2-l1-outy.md:51 | `um {{t:flush-draw}}` (wyświetli „flush draw”) | `um {{t:flush-draw\|projeto de flush}}` | Ten sam termin dwojako w jednym pliku: l. 110 wprowadza go jako „Projeto de flush”; pl m2-l1-outy.md:51 i :110 to jeden termin. |
| pt-BR-L1-02 | ŚR | content/pt-BR/lessons/m3-l2-rece-startowe.md:49 | „jogando mãos fracas demais” | „jogando um número excessivo de mãos fracas” | pl m3-l2-rece-startowe.md:49 „grając za dużo słabych rąk” (en „too many weak hands”); przekład czyta się „ręce zbyt słabe”. |
| pt-BR-L1-03 | ŚR | content/pt-BR/lessons/m3-l2-rece-startowe.md:55 | `{{t:late-position\|posição tardia}}` | `{{t:late-position\|posição final}}` | terms-nazwy.yaml: late-position = „posição final” (tak też m4-l1-3bet.md:36 „posições finais”); pl :55. |
| pt-BR-L1-04 | ŚR | content/pt-BR/lessons/m4-l1-3bet.md:48 | `{{t:pocket-pair\|par na mão}}` | `{{t:pocket-pair\|par de mão}}` | terms-nazwy.yaml: pocket-pair = „par de mão”; pl m4-l1-3bet.md:48. |
| pt-BR-L1-05 | ŚR | content/pt-BR/lessons/m4-l2-obrona-bb.md:26 | „Aqui ele também tem os blinds” | „Aqui o pote também tem os blinds” | pl m4-l2-obrona-bb.md:26 „Tu są w niej [puli] jeszcze blindy”; „ele” tuż po „do adversário” czyta się jako rywal. |
| pt-BR-L1-06 | NISKIE | content/pt-BR/lessons/m4-l2-obrona-bb.md:69 | „o {{t:big-blind}} é a que defende” | „é quem defende” | Niezgoda rodzaju (o … a que); pl :69 „broni się najszerzej ze wszystkich pozycji”. |
| pt-BR-L1-07 | ŚR | content/pt-BR/lessons/m4-l2-obrona-bb.md:73 | „realizam menos do que a sua equity” | „realizam menos do que a equity delas” | pl :73 „realizują mniej niż ich equity” (rąk); przy zwrocie „você” „a sua equity” = „twoje equity”. |
| pt-BR-L1-08 | NISKIE | content/pt-BR/lessons/m4-l2-obrona-bb.md:73 | „você defende com elas” | „você defende com eles” | Zgoda rodzaju: „Mãos…, conectores e pares médios” → rodzaj męski; pl :73 „bronisz nimi”. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- content/pt-BR/lessons/m1-l1-przebieg.md:6 — „ruas” za pl „ulice”; terms-nazwy: street = „street” (słowo zwykłym tekstem, bez znacznika; „rua” występuje w korpusie jako forma). Ewentualnie „streets”.
- content/pt-BR/lessons/m1-l1-przebieg.md:81 — „a melhor combinação ganha” za pl „najlepszy układ”; w pozostałych plikach układ = „mão”.
- content/pt-BR/lessons/m3-l3-zakresy-otwarc.md:43 i :87 — „pré-flop” / „pós-flop” obok „preflop” (terms-nazwy, m3-l1, m3-l2, m4); pisownia z łącznikiem występuje też w innych lekcjach (m9, m10), więc decyzja globalna.
- content/pt-BR/lessons/m4-l1-3bet.md:16, :26, :75 „{{n}} a abertura” wobec m4-l2-obrona-bb.md:44, :45, :92 „{{n}} o valor da abertura” — zależy od postaci wartości (np. „3×”); dwa sformułowania tej samej wielkości.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny i naturalny, konsekwentnie brazylijski („você”), bez znalezisk KRYT ani WYS. Wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i klucze YAML są zgodne ze źródłem linia w linię; żadnej liczby wpisanej cyfrą w miejscu `{{n:…}}`. Znaleziska to głównie formy terminów niezgodne z terms-nazwy (late-position, pocket-pair, flush-draw) oraz dwuznaczne zaimki („ele”, „sua”) w m4-l2. Liczby, kierunki zaleceń i nazwy pozycji zgodne z pl.
