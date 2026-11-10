# pt-BR-L4 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m7-l3-implied-odds.md | tak, 1–148 |
| content/pt-BR/lessons/m7-l4-probe-obrona.md | tak, 1–147 |
| content/pt-BR/lessons/m8-l1-value.md | tak, 1–140 |
| content/pt-BR/lessons/m8-l2-ile-blefow.md | tak, 1–144 |
| content/pt-BR/lessons/m8-l3-blokery.md | tak, 1–119 |
| content/pt-BR/lessons/m8-l4-bluff-catching.md | tak, 1–137 |

Dodatkowo: porównanie maszynowe zestawu znaczników `{{n:…}}`, kluczy `{{t:…}}`, `[[…]]` i liczb poza znacznikami linia po linii pl ↔ pt-BR dla wszystkich 6 plików (jedyna różnica: pt-BR-L4-01).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L4-01 | ŚR | content/pt-BR/lessons/m7-l4-probe-obrona.md:106 | „Com pares fracos e mãos sem outs” | „Com {{t:pair\|pares}} fracos e mãos sem outs” | Zgubiony znacznik terminu: pl m7-l4-probe-obrona.md:106 „Słabe {{t:pair\|pary}} i ręce bez outów” (zestaw znaczników linii różni się od źródła). |
| pt-BR-L4-02 | ŚR | content/pt-BR/lessons/m8-l1-value.md:131 | „faz thin value com apostas de até cerca de 1/4” | „faz thin value com apostas de apenas cerca de 1/4” | pl m8-l1-value.md:131 „betuje thin value nawet ok. 1/4 puli” (en: „as small as about 1/4”) — chodzi o dolny kraniec rozmiaru; „de até” czyta się jako górna granica („do 1/4”), co zaciera kontrast z „raramente fica abaixo de 1/2”. |
| pt-BR-L4-03 | NISKIE | content/pt-BR/lessons/m8-l2-ile-blefow.md:139 | „{{t:blocker\|blockers}}” | „{{t:blocker\|bloqueadores}}” | pl m8-l2-ile-blefow.md:139 odsyła do „lekcji o blokerach”; ta lekcja (m8-l3) ma tytuł „Bloqueadores” i w m8-l3/m8-l4 termin brzmi wyłącznie „bloqueador(es)”. |
| pt-BR-L4-04 | NISKIE | content/pt-BR/lessons/m8-l2-ile-blefow.md:126 | „\| 1/2 {{t:pot\|pote}} \|” | „\| 1/2 do {{t:pot\|pote}} \|” | Brak „do”; sąsiednie wiersze tabeli: „1/3 do”, „3/4 do” (pl m8-l2-ile-blefow.md:126 „1/2 puli”). |
| pt-BR-L4-05 | NISKIE | content/pt-BR/lessons/m8-l4-bluff-catching.md:111 | „\| 1/2 {{t:pot\|pote}} \|” | „\| 1/2 do {{t:pot\|pote}} \|” | Jak wyżej; wiersz 110 ma „1/3 do” (pl m8-l4-bluff-catching.md:111). |
| pt-BR-L4-06 | NISKIE | content/pt-BR/lessons/m8-l4-bluff-catching.md:33 | „Quando há poucos {{t:bluff\|blefes}}” | „Quando há {{t:bluff\|blefes}} de menos” | pl m8-l4-bluff-catching.md:33 „Gdy blefów jest za mało” — za mało względem ceny, nie po prostu „mało”. |
| pt-BR-L4-07 | NISKIE | content/pt-BR/lessons/m7-l3-implied-odds.md:134 | „ainda tem à sua frente” | „ainda tem atrás” | pl m7-l3-implied-odds.md:134 „które rywal ma jeszcze przed sobą”; „à sua frente” przy zwracaniu się per „você” jest dwuznaczne (przed tobą / przed nim), a reszta pliku mówi o żetonach rywala „atrás”. |
| pt-BR-L4-08 | NISKIE | content/pt-BR/lessons/m8-l1-value.md:15 | „só custa caro” | „só custa dinheiro” | pl m8-l1-value.md:15 „tylko kosztuje”; „caro” (drogo) dodane. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- m8-l2-ile-blefow.md i m8-l4-bluff-catching.md (wszystkie wystąpienia, np. m8-l2:109, m8-l4:16): pisownia „bluff-catcher” z łącznikiem; `terms-nazwy.yaml` ma `bluff-catcher: "bluff catcher"` (bez łącznika). Tekst nie używa znacznika (pl też nie), w obu plikach pisownia spójna.
- m7-l4-probe-obrona.md:16, 122: „pré-flop”; `terms-nazwy.yaml` ma `preflop: "preflop"`. Zwykły tekst (pl „przed flopem”, bez znacznika).
- m8-l1-value.md:60, 61: „reis e dez melhores” („króle i lepsze dziesiątki”) — „dez melhores” może być odczytane jako „dziesięć lepszych”; ewentualnie „reis e mãos de dez melhores”.
- m8-l1-value.md:5 tytuł „Aposta de valor” vs w treści „aposta por valor” (pl „Value bet” / „bet dla wartości”; termin `value-bet: "value bet"`).
- m8-l1-value.md:71, 121 oraz m8-l3-blokery.md:45, 50: „ás alto” jako odpowiednik „as-high”/„sam as” — zrozumiałe, ale nie jestem pewien, czy to utarta forma w pt-BR (częściej „A-high”).
- m7-l3-implied-odds.md:66, 85, 86, 141: „terceira copas” / „uma copas” (potoczne); m8-l3/m8-l4 mają „terceira carta de copas”.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład wierny i naturalny, brazylijski; liczby, kierunki zaleceń i znaczniki zgodne ze źródłem (jeden zgubiony `{{t:pair}}`). W obrębie każdego pliku terminy są spójne, ale między plikami tej części różnią się formy tego samego terminu: check „passar” (m8-l1) vs „dar check” (pozostałe), board „mesa” (m7-l3, m8-l1) vs „board” (m7-l4, m8-l3), draw „projeto” vs „draw” (m7-l4), street „rodada” vs „street” (m7-l4), blocker „blockers” (m8-l2) vs „bloqueadores”. Poza glosariuszem: „adversário” (m7-l3, m8-l2–l4) vs „rival” (m7-l4, m8-l1), „udział blefów” = „proporção” (m8-l2) vs „fração” (m8-l4), „próg” = „limiar” (m8-l1) vs „limite” (m8-l2), „nietrafione” = „perdidos” vs „furados”. Warto ujednolicić w osobnym przebiegu; pojedynczo nie są to błędy sensu.
