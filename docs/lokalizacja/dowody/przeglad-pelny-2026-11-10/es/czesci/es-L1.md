# es-L1 — es (hiszpański) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/lessons/m0-l1-uklady.md | tak, 1–104 |
| content/es/lessons/m1-l1-przebieg.md | tak, 1–97 |
| content/es/lessons/m2-l1-outy.md | tak, 1–135 |
| content/es/lessons/m2-l2-pot-odds.md | tak, 1–98 |
| content/es/lessons/m3-l1-pozycja.md | tak, 1–70 |
| content/es/lessons/m3-l2-rece-startowe.md | tak, 1–62 |
| content/es/lessons/m3-l3-zakresy-otwarc.md | tak, 1–87 |
| content/es/lessons/m4-l1-3bet.md | tak, 1–105 |
| content/es/lessons/m4-l2-obrona-bb.md | tak, 1–93 |

Źródła pl przeczytane w całości w tych samych zakresach; en użyty punktowo (m1-l1:96, m3-l2:62, m3-l3:77, m4-l2:92).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-L1-01 | ŚR | content/es/lessons/m2-l2-pot-odds.md:97 | `{{t:implied-odds\|probabilidades implícitas}}` | `{{t:implied-odds\|odds implícitas}}` | Nazwa terminu wg `content/es/terms-nazwy.yaml` (implied-odds: „odds implícitas”); pl m2-l2-pot-odds.md:97 `{{t:implied-odds}}`. |
| es-L1-02 | ŚR | content/es/lessons/m3-l1-pozycja.md:69 | `desde {{t:early-position\|posiciones tempranas}}` | `desde las {{t:early-position\|primeras posiciones}}` | Nazwa terminu wg terms-nazwy.yaml (early-position: „primeras posiciones”); pl m3-l1-pozycja.md:69 `{{t:early-position\|wczesnych pozycji}}`. |
| es-L1-03 | ŚR | content/es/lessons/m3-l3-zakresy-otwarc.md:77 | „casi tan amplio como el Botón” | „más o menos tan amplio como el Botón” | pl m3-l3-zakresy-otwarc.md:77 „podobnie szeroko jak Button” (en „about as wide as”); „casi tan amplio” = „prawie tak szeroko”, sugeruje węższy zakres, a przedział jest ten sam. |
| es-L1-04 | NISKIE | content/es/lessons/m3-l3-zakresy-otwarc.md:80 | „Para las `{{t:position\|posiciones}}` tempranas en” | „Para las primeras `{{t:position\|posiciones}}` en” | Spójność z nazwą terminu early-position („primeras posiciones”); pl m3-l3-zakresy-otwarc.md:80 „Dla wczesnych pozycji”. |
| es-L1-05 | NISKIE | content/es/lessons/m4-l1-3bet.md:48 | `{{t:pair\|Pareja}}: 22` | `{{t:pair\|Pareja}} de 22` | pl m4-l1-3bet.md:48 „Para 22”; dwukropek w tekście opcji nienaturalny. |
| es-L1-06 | NISKIE | content/es/lessons/m4-l1-3bet.md:99 | „99, KQo y AJo se juegan de formas distintas” | „99, KQo y AJo a veces se juegan de formas distintas” | pl m4-l1-3bet.md:99 „bywają grane różnie” — zgubione „bywają”. |
| es-L1-07 | NISKIE | content/es/lessons/m4-l2-obrona-bb.md:92 | „de la parte baja de tu `{{t:range\|rango}}` de `{{t:call\|igualar}}`” | „de la parte baja del `{{t:range\|rango}}` con el que `{{t:call\|igualas}}`” | Niegramatyczne „rango de igualar”; to samo zdanie pl (m4-l2-obrona-bb.md:92 „z dołu zakresu sprawdzenia”) oddane poprawnie w es m4-l1-3bet.md:99. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- **Button / botón / Botón**: pl ma wszędzie „Button” (bez znacznika). es: m3-l1 i m4-l1 „botón”, m3-l3 „Botón”, m3-l2:46 i cały m4-l2 „Button” (10×). terms-nazwy.yaml: button → „botón”. W całym `content/es/lessons` przeważa „Button” (ok. 144 wobec 93), więc ujednolicenie wymaga decyzji dla całego języka — bez poprawek w tej części.
- **Siatka zakresów**: m3-l3 i m4-l1 „cuadrícula”, m3-l2:62 i m4-l2 (73, 79, 89, 92) „tabla”; ta sama rzecz nazwana dwojako w sąsiednich lekcjach modułu M4. Decyzja globalna (w korpusie „tabla” w 11 plikach, „cuadrícula” w 4).
- **call**: czasownik „igualar”, rzeczownik „pago” (m2-l2: 17, 25, 44, 65, 82–86, 97) i „pagar” w podtytule m2-l2:6; terms-nazwy.yaml dopuszcza oba rdzenie (uwaga przy `call`), ale w m2-l2 „igualar” i „pago” stoją w jednym zdaniu (97).
- **m0-l1-uklady.md:88**: pl `{{t:straight-flush|Poker}}: {{t:straight-flush|strit w kolorze}}` → es `{{t:straight-flush|Escalera de color}}: una {{t:straight|escalera}} del mismo palo` — drugi znacznik ma inny klucz (straight zamiast straight-flush). Sens poprawny i plik się zbuduje; ewentualny skutek tylko dla podpowiedzi terminu.
- **„de distinto palo” / „de palos distintos”**: m3-l2:16, m4-l1:47 i 99 „palos distintos”, reszta „de distinto palo” (nazwa terminu offsuit); tekst bez znacznika.
- **Czas przeszły w m4-l2**: „abrió / se retiró” (indefinido), w pozostałych plikach „ha abierto / se ha retirado” (perfecto, es-ES); m4-l2 jest wewnętrznie spójny i używa „llegáis” (es-ES).

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład wierny i naturalny: wszystkie liczby idą przez `{{n:…}}` z tymi samymi kluczami co w pl, zakresy rąk, pozycje, kierunki zaleceń i przeczenia zgadzają się ze źródłem, znaczniki i struktura YAML są nienaruszone; nie znaleziono żadnego błędu wagi KRYT ani WYS. Znaleziska dotyczą dwóch form terminów niezgodnych z terms-nazwy.yaml, jednej nieścisłości („casi tan amplio”) i drobnej naturalności. Powtarzający się wzorzec to niespójność między plikami (Button/botón, tabla/cuadrícula, igualar/pago, indefinido/perfecto) — wygląda na pracę w kilku partiach; m4-l2 odstaje stylem od m4-l1. Te niespójności wymagają decyzji na poziomie całego języka, dlatego są w „Do sprawdzenia”, bez poprawek.
