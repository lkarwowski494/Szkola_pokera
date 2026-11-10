# ja · L5 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m8-l2-ile-blefow.md | tak (143/143 linii, pl i ja) | 5 poprawek (ŚR) |
| content/ja/lessons/m8-l3-blokery.md | tak (118/118) | 1 poprawka (ŚR, zgubiony znacznik) |
| content/ja/lessons/m8-l4-bluff-catching.md | tak (136/136) | 1 poprawka (ŚR); wersję en otwarto tylko dla linii 80 |
| content/ja/lessons/m9-l1-spr.md | tak (149/149) | 1 poprawka (ŚR) |
| content/ja/lessons/m9-l2-zaangazowanie.md | tak (114/114) | 3 poprawki (2 ŚR, 1 NISKIE) |

Pomocniczo przeczytane: `content/ja/terms-nazwy.yaml` w całości; `docs/lokalizacja/glosariusz.md` tylko wyrywkowo (grep po terminach z tej części), nie w całości.

Kontrola mechaniczna (skrypt, linia po linii pl ↔ ja, wszystkie 5 plików): zgodna liczba linii; `{{n:…}}` identyczne w każdej linii; klucze `{{t:…}}` identyczne poza trzema liniami opisanymi niżej; `[[…]]`, `R-M…`, `id`, `family`, `answer`, `table`, `kind`, `rules`, `correct: true` jak w pl; brak polskich znaków w ja; składnia znaczników poprawna.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m9-l1-spr.md:73, 107 | pl „zanim ktoś {{t:bet\|postawi}} {{t:bet}}” (dwa znaczniki `bet`) → ja „誰かが{{t:bet\|ベット}}する前” (jeden). Sens pełny, w ja jedno słowo wystarcza; różnica tylko w liczbie znaczników terminu. | Zostawić; zgłaszam, bo strażnik liczący znaczniki może to wykazać. |
| NISKIE | m8-l4-bluff-catching.md:70 vs m8-l3-blokery.md:48, 106 | pl „kolor z asem” → raz „エースハイの{{t:flush\|フラッシュ}}”, raz „エースを含む{{t:flush\|フラッシュ}}”. Oba poprawne, dwa warianty tej samej frazy. | Ewentualnie ujednolicić do „エースを含む”. |

## Do ujednolicenia skryptem
- „gra o cały stack”: w tej części dwa zapisy — m9-l1 „スタック全体を懸けて” (15× w całej treści ja), m9-l2 „スタック全部をかけて” (15×); poza częścią jeszcze „スタック全体を賭けて” (9×). To nie termin z `terms-nazwy`, sens ten sam; propozycja jednego zapisu „スタック全体を懸けて” (wzorzec `スタック全部をかけ` → `スタック全体を懸け`, `スタック全体を賭け` → `スタック全体を懸け`; liczby z `grep -rho` po `content/ja`).
- `polarized`: po nałożeniu 3 poprawek z L5.json forma „ポラライズド” znika z lekcji (było 3×, wszystkie w m8-l2).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m8-l2:56 — pl „Alpha: jak często musi {{t:fold\|spasować}} rywal” → „相手が{{t:fold\|フォールド}}すべき頻度”. „すべき” brzmi jak zalecenie dla rywala; bliżej pl byłoby „フォールドする必要がある頻度”. Wniosek ćwiczenia się nie zmienia.
- m8-l3:114 — „選択を傾けるものです” (pl „przechylają wybór”): zrozumiałe, ale kalka; naturalniej np. „選択を左右するものです”.
- m9-l2:46 — „ベストキッカー” (pl „z najlepszym kickerem”): czy rodzimy gracz nie powie raczej „トップキッカー”.
- m9-l2:50 — „{{t:fold}}を{{t:top-pair\|トップペア}}で選ぶと” — szyk wymuszony znacznikami, lekko sztuczny; np. „{{t:top-pair\|トップペア}}を{{t:fold\|フォールド}}すると” (zmienia formę znacznika, więc nie wpisuję jako poprawki).
- m8-l2:117 i m8-l3:117 — „外れたフラッシュ” (pl „nietrafione kolory”): czy nie lepiej „外れたフラッシュドロー”.
- „3ベット / 4ベット” (pl „3-bet”, „4-bet” zwykłym tekstem; `terms-nazwy` ma dla kluczy `3-bet`, `4-bet` wartość `null`): w tej części konsekwentnie „3ベット/4ベット”, zgodnie z resztą treści ja (161×); zostawiam.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części L5 nie było treści krytycznej (brak modułu 12, helplines, tekstów o prawdziwych pieniądzach).
