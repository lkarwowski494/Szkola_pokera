# pt-BR-X1 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/exams/m0.yaml | tak, 1–93 |
| content/pt-BR/exams/m1.yaml | tak, 1–76 |
| content/pt-BR/exams/m2.yaml | tak, 1–100 |
| content/pt-BR/exams/m3.yaml | tak, 1–96 |
| content/pt-BR/exams/m4.yaml | tak, 1–112 |
| content/pt-BR/exams/m5.yaml | tak, 1–101 |
| content/pt-BR/exams/m6.yaml | tak, 1–97 |

Źródła pl przeczytane w całości w tych samych zakresach linii (pliki wyrównane liniami 1:1).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-X1-01 | ŚR | content/pt-BR/exams/m3.yaml:13 | `Quem agiu por último no pré-flop` | `Quem agiu por último no preflop` | termin preflop: terms-nazwy „preflop”, m1 używa „preflop” (pl m3.yaml:13) |
| pt-BR-X1-02 | ŚR | content/pt-BR/exams/m3.yaml:13 | `No pré-flop, os blinds agem` | `No preflop, os blinds agem` | termin preflop jak w terms-nazwy (pl m3.yaml:13) |
| pt-BR-X1-03 | ŚR | content/pt-BR/exams/m3.yaml:18 | `primeiro a agir no pré-flop` | `primeiro a agir no preflop` | termin preflop jak w terms-nazwy (pl m3.yaml:18) |
| pt-BR-X1-04 | ŚR | content/pt-BR/exams/m6.yaml:10 | `({{t:pot}} + bet) = {{n:exam.m6.pot}}` | `({{t:pot}} + aposta) = {{n:exam.m6.pot}}` | „bet” obok „aposta” w tym samym pliku; terms-nazwy bet = „aposta”, m5 ma „aposta ÷ (pote + aposta)” (pl m6.yaml:10) |
| pt-BR-X1-05 | ŚR | content/pt-BR/exams/m6.yaml:17 | `alpha = bet ÷ ({{t:pot}} + bet)` | `alpha = aposta ÷ ({{t:pot}} + aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:17) |
| pt-BR-X1-06 | ŚR | content/pt-BR/exams/m6.yaml:19 | `{{t:bluff|blefe}} é bet ÷ ({{t:pot}} + bet)` | `{{t:bluff|blefe}} é aposta ÷ ({{t:pot}} + aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:19) |
| pt-BR-X1-07 | ŚR | content/pt-BR/exams/m6.yaml:47 | `Sim: bet ÷ ({{t:pot}} + 2·bet)` | `Sim: aposta ÷ ({{t:pot}} + 2·aposta)` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:47) |
| pt-BR-X1-08 | ŚR | content/pt-BR/exams/m6.yaml:47 | `Contra um bet maior` | `Contra uma aposta maior` | „bet” zamiast „aposta” w zdaniu (pl m6.yaml:47) |
| pt-BR-X1-09 | ŚR | content/pt-BR/exams/m6.yaml:48 | `alpha (bet ÷ ({{t:pot}} + bet))` | `alpha (aposta ÷ ({{t:pot}} + aposta))` | „bet” zamiast „aposta” we wzorze (pl m6.yaml:48) |
| pt-BR-X1-10 | ŚR | content/pt-BR/exams/m6.yaml:49 | `tamanho do bet. Um bet maior` | `tamanho da aposta. Uma aposta maior` | „bet” zamiast „aposta” w zdaniu, 2× (pl m6.yaml:49) |

Brak znalezisk KRYT i WYS. W m0, m1, m2, m4, m5 brak znalezisk: pytania, odpowiedzi (w tym oznaczenie `correct` / `sizeError`), wyjaśnienia, liczby, rozdania `table`, znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i `answer` zgodne ze źródłem.

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- „rywal”: m0–m5 konsekwentnie „adversário”, m6 konsekwentnie „rival” (m6.yaml:8, 15, 18, 19, 38). W obrębie pliku spójne; różnica tylko między plikami. Do decyzji, czy ujednolicić na „adversário”.
- `check`: m1 i m6 używają „passar / passa / Passo”, m5 „dá check / Dou check / check”. Obie formy są w `terms-nazwy.yaml` [WIELE FORM]; w obrębie pliku spójne, między plikami nie.
- „mówisz pierwszy”: m3 i m5 „age primeiro”, m4 „fala primeiro” (m4.yaml:12, 101). Oba naturalne, różnica między plikami.
- „Ok.”: m2 „Aprox.”, m4–m6 „Cerca de” (różnica między plikami, bez skutku dla sensu).
- m4.yaml:92 ma znacznik `{{t:value|valor}}` tam, gdzie pl (m4.yaml:92) ma zwykłe „wartość”; en ma w tym miejscu `{{t:value}}`, więc zapewne zamierzone.
- m2.yaml:80 „Isso é claramente pouco” za pl „To wyraźnie za mało”: sens zachowany, „claramente insuficiente” byłoby dokładniejsze (styl).

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład egzaminów m0–m6 jest wierny i naturalny (brazylijski wariant, konsekwentne „você”); żadna poprawna odpowiedź nie przestała pasować do pytania, wszystkie liczby idą przez `{{n:…}}`, a zestaw znaczników w każdej linii odpowiada źródłu. Jedyne pewne znaleziska to niespójność terminów: „pré-flop” w m3 wobec „preflop” z tabeli terminów i z m1 oraz surowe „bet” w m6 obok „aposta” (m5 w tych samych wzorach ma „aposta”). Pozostałe różnice to warianty między plikami (adversário/rival, passar/dar check, agir/falar), spójne w obrębie każdego pliku.
