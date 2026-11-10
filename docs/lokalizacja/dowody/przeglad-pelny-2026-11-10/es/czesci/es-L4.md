# es-L4 — es (hiszpański) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/lessons/m7-l3-implied-odds.md | tak, 1–148 |
| content/es/lessons/m7-l4-probe-obrona.md | tak, 1–147 |
| content/es/lessons/m8-l1-value.md | tak, 1–140 |
| content/es/lessons/m8-l2-ile-blefow.md | tak, 1–144 |
| content/es/lessons/m8-l3-blokery.md | tak, 1–119 |
| content/es/lessons/m8-l4-bluff-catching.md | tak, 1–137 |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-L4-01 | ŚR | content/es/lessons/m8-l2-ile-blefow.md:31 | „Eso es el {{t:mdf}}” | „Eso es la {{t:mdf}}” | Rodzaj MDF: wszędzie indziej żeński („la {{t:mdf}}”, m7-l4:106,113,142; m8-l4:33,87,90,118); tu jedyny raz męski — błąd zgody widoczny dla użytkownika (pl m8-l2:31 „To {{t:mdf}}”). |
| es-L4-02 | ŚR | content/es/lessons/m8-l2-ile-blefow.md:38 | „Una {{t:overbet\|sobreapuesta}}, es decir, … incluir en ella más … que en ninguna otra” | „Un {{t:overbet\|overbet}}, es decir, … incluir en él más … que en ningún otro” | Zdanie wprowadza termin (pl m8-l2:38 „{{t:overbet\|Overbet}}, czyli {{t:bet\|zakład}} większy niż cała pula”); nazwa terminu w terms-nazwy.yaml to „overbet” (r.m.), „sobreapuesta” nie jest formą tego terminu. |
| es-L4-03 | NISKIE | content/es/lessons/m7-l3-implied-odds.md:122 | „(probabilidades implícitas)” | „(odds implícitas)” | Objaśnienie terminu (pl m7-l3:122 „szanse ukryte”) niezgodne z nazwą implied-odds w terms-nazwy.yaml („odds implícitas”). |
| es-L4-04 | NISKIE | content/es/lessons/m8-l2-ile-blefow.md:126 | „\| 1/2 {{t:pot\|bote}} \|” | „\| 1/2 del {{t:pot\|bote}} \|” | Brak „del”; sąsiednie wiersze tabeli „1/3 del”, „3/4 del” (pl m8-l2:126 „1/2 {{t:pot\|puli}}”). |
| es-L4-05 | NISKIE | content/es/lessons/m8-l4-bluff-catching.md:111 | „\| 1/2 {{t:pot\|bote}} \|” | „\| 1/2 del {{t:pot\|bote}} \|” | Jak es-L4-04; wiersz wyżej „1/3 del” (pl m8-l4:111). |
| es-L4-06 | NISKIE | content/es/lessons/m8-l4-bluff-catching.md:5 | „title: "Pagar faroles"” | „title: "Cazar faroles"” | pl m8-l4:5 „Łapanie blefów”; ta sama lekcja jest w es przywoływana jako „la lección sobre cazar faroles” (es m7-l4:116), a „łapać blefy” to w tych plikach konsekwentnie „cazar faroles” (es m8-l2:65,109). „Pagar faroles” = „płacić blefom”. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- Formy terminów odbiegające od nazw w terms-nazwy.yaml, ale użyte konsekwentnie w całym pliku (decyzja systemowa, nie poprawiałem): `top-pair` → „pareja mayor” (nazwa: „top pair”; m7-l4, m8-l1, m8-l4), `blocker` → „bloqueador(es)” łącznie z tytułem lekcji (nazwa: „blocker”; m8-l3, m8-l2:139, m8-l4), `oesd` → „proyecto de escalera abierta” (nazwa: „OESD”; m7-l3:54, m7-l4:46,86), `combo` → „combos” w m8-l2 i „combinaciones” w m8-l3 (nazwa: „combo”; różnica między plikami tego samego modułu).
- content/es/lessons/m7-l4-probe-obrona.md:96 „con una carta blanca” (pl „na pustej karcie”): w hiszpańskim ogólnym „carta blanca” znaczy „wolna ręka”; w żargonie pokerowym bywa używane jako „blank”. Ewentualnie „con una carta que no cambia nada”.
- content/es/lessons/m8-l1-value.md:71,121 i m8-l3:45,50 „as alto” dla „as-high”: zrozumiałe, ale może być czytane jako „wysoki as”; alternatywa „carta alta de as”.
- Nazwy kart między plikami: Q = „reina” w m7-l3:32,85, „dama” w m8-l1, m8-l3, m8-l4 (w obrębie pliku spójnie).
- „fallados” (m7-l3–m8-l2, m8-l4) vs „fallidos” (m8-l3) dla „nietrafione drawy” — spójne w pliku, różne między plikami.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład bardzo dobry: wszystkie znaczniki `{{n:…}}`, `{{t:klucz…}}`, `[[…]]`, identyfikatory i struktura YAML zgodne ze źródłem linia w linię (sprawdzone także skryptem), bez błędów liczb, kierunków zaleceń ani pominięć. Wariant europejski (vosotros: „pasasteis”, „vuestros”) użyty konsekwentnie, forma „tú” wszędzie. Brak znalezisk KRYT i WYS; jedyne ŚR to rodzaj MDF w jednym miejscu i nazwa terminu „overbet”. Powtarzający się wzorzec: formy tłumacza („pareja mayor”, „bloqueador”, „combinaciones”) zamiast nazw z terms-nazwy.yaml — spójne w plikach, do decyzji koordynatora.
