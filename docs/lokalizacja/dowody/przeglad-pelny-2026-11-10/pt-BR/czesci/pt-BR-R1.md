# pt-BR-R1 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/rules.yaml, reguły R-M0-001 – R-M7-013 (↔ content/pl/rules.yaml) | tak, linie 1–642 (granica: `- id: R-M8-001` w linii 643 w pl, pt-BR i en); wszystkie pola if/then/because/population/source porównane ze źródłem; linie 643–1207 poza zakresem tej części |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-R1-01 | ŚR | content/pt-BR/rules.yaml:392 | `K-J-7 {{t:two-tone|de dois naipes}}` | `K-J-7 {{t:two-tone|bicolor}}` | forma nie jest formą terminu two-tone = „bicolor” (terms-nazwy.yaml:76); pl rules.yaml:392 „K-J-7 {{t:two-tone}}” |
| pt-BR-R1-02 | ŚR | content/pt-BR/rules.yaml:266 | `logo abaixo desse limite` | `logo abaixo desse limiar` | „próg” (pl rules.yaml:266) oddany jako „limite”, które w pt-BR jest nazwą terminu stakes (terms-nazwy.yaml:116; w tym pliku linia 472 „limites baixos”); reszta treści pt-BR ma „limiar” (np. exams/m5.yaml:52 „limiar é aposta”) |
| pt-BR-R1-03 | ŚR | content/pt-BR/rules.yaml:419 | `o limite é aposta ÷ ({{t:pot|pote}} + aposta)"` | `o limiar é aposta ÷ ({{t:pot|pote}} + aposta)"` | jak -02: „próg” (pl rules.yaml:419) → „limiar”, nie „limite” (= stawki) |
| pt-BR-R1-04 | ŚR | content/pt-BR/rules.yaml:562 | `o limite é aposta ÷ ({{t:pot|pote}} + aposta); os outs que você tem baixam esse limite` | `o limiar é aposta ÷ ({{t:pot|pote}} + aposta); os outs que você tem baixam esse limiar` | jak -02: „próg” ×2 (pl rules.yaml:562) → „limiar” |
| pt-BR-R1-05 | NISKIE | content/pt-BR/rules.yaml:257 | `; {{t:pair|pares}} médios e pequenos, KQo` | `; com {{t:pair|pares}} médios e pequenos, KQo` | brak przyimka: „pares … você paga” czyta się jak „płacisz parom”; w pliku wszędzie „paga com” (pl rules.yaml:257 „pary … sprawdzasz”) |
| pt-BR-R1-06 | NISKIE | content/pt-BR/rules.yaml:502 | `; {{t:pair|pares}} médios você normalmente {{t:call|paga}}` | `; com {{t:pair|pares}} médios você normalmente {{t:call|paga}}` | jak -05 (pl rules.yaml:502 „średnie pary zwykle sprawdzasz”) |
| pt-BR-R1-07 | NISKIE | content/pt-BR/rules.yaml:402 | `{{t:call|pagar}} nem uma {{t:bet|aposta}} pequena` | `{{t:call|pagar}} até mesmo uma {{t:bet|aposta}} pequena` | „raramente consegue pagar nem uma” — niegramatyczne podwójne przeczenie; pl rules.yaml:402 „rzadko może sprawdzić nawet mały bet” |
| pt-BR-R1-08 | NISKIE | content/pt-BR/rules.yaml:468 | `um jogador que, pelo que você observou, raramente {{t:bluff|blefa}} {{t:bet|aposta}} alto no river` | `quem {{t:bet|aposta}} alto no river é um jogador que, pelo que você observou, raramente {{t:bluff|blefa}}` | dwa czasowniki obok siebie („blefa aposta”) — zdanie mylące przy czytaniu; pl rules.yaml:468 „duży bet na riverze stawia gracz, o którym wiesz…, że rzadko blefuje” |
| pt-BR-R1-09 | NISKIE | content/pt-BR/rules.yaml:527 | `então perde menos quando faltam` | `então é o que menos perde quando faltam` | stopień najwyższy: pl rules.yaml:527 „traci najmniej” (en „loses the least”) |
| pt-BR-R1-10 | NISKIE | content/pt-BR/rules.yaml:636 | `mais estreito que o do c-bet` | `mais fechado que o do c-bet` | „węższy zakres” w tym pliku wszędzie „mais fechado” (np. linie 314, 478, 635); pl rules.yaml:636 „węższym zakresem” |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- content/pt-BR/rules.yaml:185 (R-M3-008) „o 3-bet aumenta o {{t:pot|pote}}” — pl „3-bet buduje pulę”; „aumenta” to w tym pliku czasownik terminu raise, możliwe „constrói o pote” (tak jest w linii 570: „construir o pote”).
- content/pt-BR/rules.yaml:538 (R-M7-001) „cada par do adversário cai uma posição” — pl „spada o jedno miejsce niżej”; „posição” to w pliku termin position, ewentualnie „cai um degrau”.
- content/pt-BR/rules.yaml:268 (pole source, niewidoczne w aplikacji) „limite superior de folds logo abaixo do limite calculado” — drugie „limite” = „próg”; po przyjęciu -02…-04 można ujednolicić na „limiar calculado” (i dalej „limiar a partir do cálculo”).
- content/pt-BR/rules.yaml:510 (R-M6-009) „bons para quem aumentou pré-flop” — pl „dobrych dla przebijającego” bez „preflop”; zgodne z en („preflop raiser”), więc nie zgłaszam.
- Klucze {{t:utg}}, {{t:mdf}}, {{t:oesd}}, {{t:spr}} użyte bez formy nie występują w content/pt-BR/terms-nazwy.yaml (tak samo użyte w pl); nazwę wyświetlaną rozstrzyga build, nie tekst — do potwierdzenia przez strażnika nazw.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład części R-M0–R-M7 jest wierny: nie znalazłem żadnej zmienionej liczby, kierunku, pozycji ani zagrania, a zestaw znaczników {{n:…}}/{{t:…}} zgadza się ze źródłem w każdym polu. Wariant brazylijski konsekwentny („você”, „pré-flop” w prozie, „site de treinamento”). Jedyny powtarzający się wzorzec to „próg” oddany jako „limite” (kolizja z terminem stakes = „limite”, reszta treści ma „limiar”) oraz pojedyncza forma terminu two-tone spoza glosariusza. Pozostałe uwagi to drobna naturalność.
