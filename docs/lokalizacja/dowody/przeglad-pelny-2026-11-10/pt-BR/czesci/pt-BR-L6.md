# pt-BR-L6 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m10-l2-typy-graczy.md | tak, 1–143 |
| content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md | tak, 1–130 |
| content/pt-BR/lessons/m10-l4-rake.md | tak, 1–127 |
| content/pt-BR/lessons/m11-l1-push-fold.md | tak, 1–178 |
| content/pt-BR/lessons/m11-l2-sprawdzanie.md | tak, 1–176 |
| content/pt-BR/lessons/m11-l3-icm.md | tak, 1–169 |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L6-01 | ŚR | content/pt-BR/lessons/m10-l2-typy-graczy.md:139 | „deixa ele apostar quando tem mãos muito fortes” | „deixa ele apostar quando você tem mãos muito fortes” | Dwuznaczny podmiot: czytelnik może zrozumieć „gdy on ma silne ręce”, czyli odwrotnie. pl m10-l2-typy-graczy.md:139 „z bardzo silnymi rękami pozwalasz mu betować” (en: „when you have very strong hands”). |
| pt-BR-L6-02 | NISKIE | content/pt-BR/lessons/m10-l2-typy-graczy.md:29 | „população dos micro limites online” | „população dos microlimites online” | Pisownia łączna (prefiks micro-) i spójność z m10-l4 („microlimites”). pl m10-l2:29 „mikrostawek”. |
| pt-BR-L6-03 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:75 | „população de micro stakes online” | „população de microlimites online” | Termin stakes ma w terms-nazwy nazwę „limite”; sąsiednie lekcje modułu mają „microlimites”. pl m10-l3:75 „mikrostawek”. |
| pt-BR-L6-04 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:111 | „Os jogadores da população de micro stakes online” | „Os jogadores da população de microlimites online” | Jak wyżej. pl m10-l3:111. |
| pt-BR-L6-05 | ŚR | content/pt-BR/lessons/m10-l3-odejscie-od-bazy.md:115 | „Dados da população de micro stakes online (NL25):” | „Dados da população de microlimites online (NL25):” | Jak wyżej. pl m10-l3:115. |
| pt-BR-L6-06 | ŚR | content/pt-BR/lessons/m11-l2-sprawdzanie.md:175 | „as {{t:payout\|premiações}} importam” | „os {{t:payout\|prêmios}} importam” | Forma terminu payout (nazwa: „prêmio”) jest nazwą innego terminu, prize-pool („premiação”); w m11-l3 payout to „pagamentos”, a „premiação” to pula nagród. pl m11-l2:175 „wypłaty”. |
| pt-BR-L6-07 | NISKIE | content/pt-BR/lessons/m11-l2-sprawdzanie.md:140 | „Mãos como [[7s 6s]] você {{t:shove\|dá shove}}” | „Com mãos como [[7s 6s]] você {{t:shove\|dá shove}}” | Kalka składni polskiej („Ręce takie jak … pushujesz”): „dar shove” i „desistir” nie przyjmują dopełnienia bez przyimka. pl m11-l2:140. |

## Źródło (błędy w pl, bez poprawki)
- content/pl/lessons/m10-l3-odejscie-od-bazy.md:49 „Fold to c-bet łączy wszystkie rozmiary i stoły” wobec :109 „łączy wszystkie rozmiary i flopy” — to samo twierdzenie dwojako; „stoły” czytane jako stoły do gry (en „tables”, pt-BR „mesas”) zamiast flopów/boardów. Przekład wierny źródłu.

## Do sprawdzenia (pewność ≤ 80%)
- m11-l1-push-fold.md:15–16, 120: pl rozróżnia „podbicie” (własne otwarcie) i „przebicie” ({{t:raise}}, odpowiedź rywala); w pt-BR oba to „aumento” („Aumento para … e decido depois de um {{t:raise|aumento}}”). Sens da się odczytać z kontekstu, ale rozróżnienie znika; ewentualnie „reaumento” dla drugiego.
- m11-l3-icm.md:13, 45, 127, 143: „posições pagas” (miejsca płatne) obok „colocações” (102, 117, 123) i {{t:position|posição}} = pozycja przy stole (102, 104, 169). „Posições pagas” jest w użyciu, ale w tym pliku koliduje z terminem position; spójniej „colocações pagas”.
- m11-l1-push-fold.md:22, 40: „como primeiro” (kalka „jako pierwszy”); naturalniej „sendo o primeiro a abrir/entrar”. Zrozumiałe, tylko styl.
- m11-l2-sprawdzanie.md:150: „até cerca de {{n:m11.call.5}}” za „aż ok.” — „até” można odczytać jako „do około” (górna granica) zamiast emfazy; sens kierunkowy zachowany.
- m11-l3-icm.md:72: „o limite é” za „próg to” (w m10 konsekwentnie „limiar”; „limite” to też nazwa terminu stakes).

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład bardzo dobry: liczby, kierunki zaleceń, znaczniki `{{n:…}}`/`{{t:…}}`/`[[…]]`, identyfikatory i struktura YAML bez zarzutu we wszystkich sześciu plikach; brak KRYT i WYS. Wariant konsekwentnie brazylijski, forma „você” spójna. Powtarzający się wzorzec to niespójność słownictwa między lekcjami, nie wewnątrz nich: „adversário” (m10-l2, m10-l4, m11) wobec „rival” (m10-l3); „micro limites” / „micro stakes” / „microlimites”; „amplo/estreito” (m11-l1) wobec „aberto/apertado” (m11-l2, l3); shove jako „push” (m11-l1) wobec „shove” (m11-l2, l3); payout jako „pagamentos” (m11-l3) wobec „premiações” (m11-l2). Zgłoszono tylko przypadki sprzeczne z terms-nazwy lub mylące.
