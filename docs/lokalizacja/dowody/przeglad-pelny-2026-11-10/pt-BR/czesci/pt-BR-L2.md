# pt-BR-L2 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/lessons/m4-l3-wobec-3betu.md | tak, 1–112 (pl 1–112) |
| content/pt-BR/lessons/m4-l4-limperzy.md | tak, 1–75 (pl 1–75) |
| content/pt-BR/lessons/m5-l1-tekstury.md | tak, 1–109 (pl 1–109) |
| content/pt-BR/lessons/m5-l2-przewagi.md | tak, 1–100 (pl 1–100) |
| content/pt-BR/lessons/m5-l3-czestotliwosc-rozmiar.md | tak, 1–134 (pl 1–134) |
| content/pt-BR/lessons/m5-l4-bez-pozycji.md | tak, 1–107 (pl 1–107) |

Dodatkowo sprawdzone mechanicznie: w każdej z 6 par zestaw i liczność znaczników `{{n:…}}`, kluczy `{{t:…}}` i `[[…]]` jest identyczny w pl i pt-BR (porównanie posortowanych list, brak różnic).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-L2-01 | ŚR | content/pt-BR/lessons/m4-l3-wobec-3betu.md:76 | „Um às forte do mesmo naipe” | „Um ás forte do mesmo naipe” | Literówka: „às” to ściągnięcie przyimka z rodzajnikiem, karta to „ás” (tak w pozostałych miejscach); pl m4-l3-wobec-3betu.md:76 „Mocny as w kolorze”. |
| pt-BR-L2-02 | NISKIE | content/pt-BR/lessons/m5-l4-bez-pozycji.md:99 | „não significa abrir mão da mão” | „não significa abandonar a mão” | Niezręczne powtórzenie („abrir mão da mão”); pl m5-l4-bez-pozycji.md:99 „nie oznacza rezygnacji z ręki”. Sens bez zmian. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- `{{t:oesd}}` bez formy w content/pt-BR/lessons/m5-l1-tekstury.md:101 i :103 (tak samo w pl): klucza `oesd` nie ma w `content/pt-BR/terms-nazwy.yaml`. Jeśli budowanie nie ma dla niego nazwy zastępczej (skrót „OESD”), znacznik może się nie rozwinąć; do sprawdzenia w `tools/content-build` (nie czytałem kodu).
- Termin `draw` (nazwa w terms-nazwy: „draw”): m5-l1 i m5-l4 używają form „draw/draws”, m5-l2 i m5-l3 form „projeto/projetos”. W obrębie każdego pliku spójnie, ale między lekcjami tego samego modułu dwie nazwy; identyczne w pl ćwiczenie `cbet` (m5.l3.c-btn ↔ m5.l4.c-review) ma w m5-l3 „projetos”, w m5-l4 „draws”. Decyzja terminologiczna na poziomie języka.
- To samo ćwiczenie i treść m5-l3 ↔ m5-l4: „rival” (cały m5-l3) vs „adversário” (pozostałe pliki), „Isso:” vs „Sim:” za „Tak:”, „faz c-bet” (m5-l3:38, :126) vs „dá c-bet” (m5-l4). Bez wpływu na sens.
- content/pt-BR/lessons/m4-l3-wobec-3betu.md:26 i :93 „materiais de treino” vs „materiais de treinamento” w pozostałych plikach (w całym content/pt-BR 3 vs 23 wystąpienia). Oba poprawne w pt-BR.
- content/pt-BR/lessons/m4-l4-limperzy.md:61 „micro stakes” (pl „na mikrostawkach”, poza znacznikiem): terms-nazwy ma `stakes: "limite"`, a w content/pt-BR przeważa „microlimites” (13) nad „micro stakes” (7).
- content/pt-BR/lessons/m5-l3-czestotliwosc-rozmiar.md:49 „duques” za „dwójek”: poprawny brazylijski żargon, ale jedyne wystąpienie w content/pt-BR; m5-l1:48 ma „um dois”.
- „app” (m4-l3, m4-l4, m5-l3, m5-l4) vs „aplicativo” (m5-l1, m5-l2) za „aplikacja”; oba poprawne.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład sześciu lekcji jest wierny: nie znalazłem żadnej zmienionej liczby, kierunku zalecenia, pozycji ani pominiętego zdania, a znaczniki i struktura YAML są nienaruszone. Język jest naturalnym brazylijskim portugalskim (forma „você”, bez europeizmów), formy w `{{t:klucz|forma}}` należą do właściwych terminów i zgadzają się w rodzaju i liczbie z otoczeniem. Jedyny powtarzający się wzorzec to drobne rozbieżności słownictwa między plikami (draw/projeto, rival/adversário, app/aplicativo, treino/treinamento), prawdopodobnie ślad różnych partii tłumaczenia; w obrębie pojedynczego pliku terminologia jest spójna. Znaleziska ograniczają się do jednej literówki i jednej poprawki stylu.
