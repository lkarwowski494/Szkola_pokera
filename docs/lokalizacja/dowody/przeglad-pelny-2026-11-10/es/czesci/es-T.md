# es-T — es (hiszpański) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `content/es/terms-def.yaml` ↔ `content/terms.yaml` (pola `pl`, `en`, `abbr`, `def` wszystkich 162 terminów; pola `forms`, `source`, `area`, `lesson` nie mają przekładu i nie były porównywane) | tak, linie 1–162 (162/162 definicji porównane z `def`; pomoc: `content/en/terms-def.yaml` przy 14 pozycjach) |
| `content/es/terms-nazwy.yaml` ↔ `content/terms.yaml` | tak, linie 1–164 (162/162 nazw; kolizji nazw: 0; wartości `null`: 0; zestaw i kolejność kluczy zgodne ze źródłem) |
| Spójność z `content/es/lessons/*.md` (44 pliki) i `content/es/rules.yaml` (pola `if`/`then`/`because`) | zliczenie skryptem (formy w znacznikach `{{t:…}}` oraz tekst poza znacznikami); pliki nie były czytane w całości — to nie jest ich recenzja |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-T-01 | ŚR | content/es/terms-def.yaml:68 | „La primera subida a un open antes del flop; … y el open como la segunda.” | „La primera subida a una apertura antes del flop; … y la apertura como la segunda.” | Niespójny termin: pl `content/terms.yaml:597` „przebicie otwarcia … a otwarcie jako drugi”; `terms-nazwy.yaml:65` open = „apertura”, w lekcjach i regułach forma w znaczniku to apertura/abrir (192×), rzeczownik „open” poza znacznikami 0×. |
| es-T-02 | ŚR | content/es/terms-def.yaml:86 | „tras hacer open preflop” | „tras abrir preflop” | Jak wyżej; pl `content/terms.yaml:744` „po otwarciu preflop”. |
| es-T-03 | ŚR | content/es/terms-def.yaml:136 | „para igualar un open hace falta una mano más fuerte que para hacer el open tú” | „para igualar una apertura hace falta una mano más fuerte que para abrir tú” | Jak wyżej; pl `content/terms.yaml:1144` „do sprawdzenia otwarcia … niż do samego otwarcia”. |
| es-T-04 | ŚR | content/es/terms-def.yaml:123 | „para short stacks” | „para stacks cortos” | Niespójny termin: `terms-nazwy.yaml:145` short-stack = „stack corto” (tak też definicja w linii 143 i 10/10 form w lekcjach i regułach); pl `content/terms.yaml:1041`. |
| es-T-05 | ŚR | content/es/terms-def.yaml:141 | „aumentan el risk premium” | „aumentan la prima de riesgo” | Niespójny termin: `terms-nazwy.yaml:131` risk-premium = „prima de riesgo” (5/5 form w lekcjach i regułach); pl `content/terms.yaml:1183`. |
| es-T-06 | ŚR | content/es/terms-def.yaml:130 | „la suma de ciegas y antes de una mano” | „la suma de las ciegas y el ante de una mano” | Mylące: „y antes de una mano” czyta się jako „i przed rozdaniem”; pl `content/terms.yaml:1098` „sumę blindów i ante w jednym rozdaniu”. W lekcjach m11 termin stoi zawsze w liczbie pojedynczej („el ante”, „sin ante”). |
| es-T-07 | NISKIE | content/es/terms-def.yaml:103 | „tras una c-bet en el flop” | „tras un c-bet en el flop” | Rodzaj gramatyczny c-bet: w lekcjach męski 85×, żeński 22×; w regułach męski 15×, żeński 0×; 3-bet w definicjach i treści zawsze męski. pl `content/terms.yaml:881`. |
| es-T-08 | ŚR | content/es/terms-nazwy.yaml:85 | `top-pair: "top pair"` | — (decyzja terminologiczna, bez poprawki) | Nazwa nie zgadza się z użyciem: wszystkie 78 znaczników `{{t:top-pair\|…}}` w lekcjach i regułach mają formę „pareja mayor / parejas mayores”, „top pair” jako forma 0×. Znacznik bez formy dałby inną nazwę niż reszta kursu. Propozycja: „pareja mayor”. (Komentarz w pliku podaje nieaktualne „pareja máxima×84”.) |
| es-T-09 | ŚR | content/es/terms-nazwy.yaml:102 | `blocker: "blocker"` | — (decyzja terminologiczna, bez poprawki) | Nazwa nie zgadza się z użyciem: 22/22 znaczników `{{t:blocker\|…}}` ma formę „bloqueador(es)”. Propozycja: „bloqueador” albo zmiana form w treści. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- `terms-nazwy.yaml:104–105`: barrel = „barrel” (angielskie), a second-barrel = „segundo barril” (przetłumaczone) — para terminów nazwana w dwóch konwencjach. W treści „segundo barril” 22×, znacznik `barrel` nieużywany.
- `terms-nazwy.yaml:44–45`: early-position = „primeras posiciones” (l.mn.), late-position = „posición tardía” (l.poj., inny wzór); jedyna forma w lekcjach to „posiciones tempranas”. Do ujednolicenia (np. „posición temprana / posición tardía”).
- `terms-nazwy.yaml:87`: overpair = „overpair”, formy w treści: „sobrepareja” 2×, „overpairs” 1×.
- `terms-nazwy.yaml:62`: combo = „combo”, formy: „combinaciones” 13×, „combos” 9×.
- `terms-nazwy.yaml:142`: payout = „premio”, formy: „pago(s)” 5×, „premios” 3×; definicja pay-jump (terms-def:141) mówi „diferencia de pago”, a nazwa pay-jump to „salto de premios”.
- `terms-nazwy.yaml:112`: alpha = „alpha”; w treści „alfa” 3× (2 formy znacznika + 1 poza), „alpha” ok. 30× poza znacznikami.
- `terms-nazwy.yaml:16`: check = „pasar” (bezokolicznik), gdy bet/raise/open mają rzeczowniki („apuesta”, „subida”, „apertura”). Znacznik bez formy dziś nieużywany (0×), więc bez skutku dla czytelnika.
- `terms-nazwy.yaml:18, 20`: call = „call”, fold = „fold”, a definicje (terms-def:14, 16, 17, 33, 55, 145 i in.) i treść używają „igualar” / „retirarse”. Notatka tłumacza uzasadnia to potrzebą rzeczownika; znaczników bez formy jest 13 (call) i 7 (fold).
- `terms-nazwy.yaml:43`: out-of-position = „fuera de posición”; forma „sin posición” w 8 znacznikach (wobec 48 „fuera de posición”).
- `terms-nazwy.yaml:121`: standard-deviation = „desviación estándar”; forma „desviación típica” 2×.
- `terms-def.yaml:63` (open): pl `content/terms.yaml:556` „Pierwsze wejście do puli…”, es „Entrar en el bote…” bez „pierwsze”; sens zachowuje warunek „cuando todos … se han retirado” i tak samo robi en.
- `terms-def.yaml:17` (raise): pominięte zdanie pl „W polskich tekstach także «podbicie»” (`content/terms.yaml:173`) — uwaga o polskim synonimie, pominięta także w en; uznane za celowe.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Definicje są wierne: liczby, przykłady kart, kierunki i zdania „nie mylić z…” zgadzają się ze źródłem we wszystkich 162 pozycjach, a jedyny powtarzający się wzorzec to angielska nazwa w definicji tam, gdzie terms-nazwy ma hiszpańską (open, short stack, risk premium). Nazwy: bez kolizji i bez oczywistych błędów; problemem są rozjazdy nazwa ↔ forma w treści (top pair/pareja mayor 0:78, blocker/bloqueador 0:22). Spójność 15 terminów (formy w znacznikach, lekcje + reguły): fold → retirar- 544/551 (7 bez formy); call → igualar- ok. 590 i pago/pagos ok. 80 (13 bez formy), a poza znacznikami czasownik „pagar” ok. 190× w lekcjach i 19× w regułach wobec 13× „igualar”; raise → subir/subida 239/239; bet → apuesta/apostar 338/344; check → pasar 215/215; pot → bote 733/733 (+17 bez znacznika); flush → color 91/99 (8 bez formy); straight → escalera 88/105 (17 bez formy); draw → proyecto 165/168; bluff → farol- 416/420; value → „por valor / de valor / calles de valor” 84/84 („value bet” poza znacznikami 1×, „apuesta de/por valor” 3×); c-bet zawsze „c-bet” (195× poza znacznikami), ale rodzaj męski 100× i żeński 22×; equity → „equity” 207× poza znacznikami, zawsze rodzaj żeński (63:0); range → rango 189/194; position → posición 71/73. Dwie nazwy jednego terminu w formach znaczników: call (igualar/pagar), out-of-position (fuera de/sin posición 48:8), combo (combinaciones/combos 13:9), payout (pagos/premios 5:3), board (mesa 48, „board” 8).
