# ja · L2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m4-l1-3bet.md | tak (pl 105 linii, ja 105 linii) | bez znalezisk; w linii 75 ja ma o jeden znacznik `{{t:call}}` więcej niż pl (zdanie rozbite na dwa, sens ten sam) |
| content/ja/lessons/m4-l2-obrona-bb.md | tak | 3 poprawki NISKIE (pisownia プレー) |
| content/ja/lessons/m4-l3-wobec-3betu.md | tak | 1 poprawka ŚR |
| content/ja/lessons/m4-l4-limperzy.md | tak | 2 poprawki ŚR (termin) |
| content/ja/lessons/m5-l1-tekstury.md | tak | 3 poprawki ŚR |
| content/ja/lessons/m5-l2-przewagi.md | tak | 1 poprawka ŚR |

Pomocniczo: `content/ja/terms-nazwy.yaml` w całości; `docs/lokalizacja/glosariusz.md` tylko wyszukiwaniem (connected, semi-connected, disconnected), nie w całości; `content/numbers.yaml` tylko klucze użyte w M4 (jednostki); wersja en otwarta dla jednego zdania (m4-l2, linia 92). Porównanie znaczników `{{n:…}}`, kluczy `{{t:…}}` i `[[…]]` linia po linii skryptem: zgodne we wszystkich sześciu plikach (jedyna różnica to dodatkowe `{{t:call}}` opisane wyżej). Front matter (id, family, rules, answer, generator, params, table, correct, sizeError) identyczny z pl.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m4-l3-wobec-3betu.md (13 wystąpień, m.in. 37, 56, 66, 67, 93, 100, 108, 112) | pl „źródło/źródła” → ソース; w m4-l1 i m4-l4 to samo słowo to 情報源, a w m5-l1 出典 / m5-l2 資料 | ujednolicić na 情報源 (patrz „Do ujednolicenia skryptem”) |
| NISKIE | m4-l4-limperzy.md:75 | pl „w ćwiczeniach” → ドリル; w m4-l1 (85, 93, 104) to samo to 練習問題 | zamienić na 練習問題 po sprawdzeniu, jak ćwiczenia nazywa interfejs ja |
| NISKIE | m4-l4-limperzy.md:49, 73 | zakres liczb zapisany „～”, w pozostałych lekcjach części „–” jak w pl | ujednolicić na „–”, jeśli taka jest konwencja przekładu |

## Do ujednolicenia skryptem
- `ソース` → `情報源` w `content/ja/lessons/m4-l3-wobec-3betu.md`: 13 trafień (`grep -o ソース | wc -l`), wszystkie w znaczeniu „źródło”; w całym `content/ja` ソース występuje tylko w tym pliku (13), 情報源 26 razy. Uwaga na złożenia: „複数のソースの” → „複数の情報源の”, „あるソース” → „ある情報源”, „別のソース” → „別の情報源”, „ソースによって” → „情報源によって”.
- `プレー` → `プレイ`: w części L2 tylko 3 trafienia (wszystkie w m4-l2, objęte poprawkami w L2.json); w całym przekładzie zostają jeszcze 4 poza tą częścią.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5-l1-tekstury.md:74, 84 — `semi-connected`: `terms-nazwy` podaje „セミコネクト”, lekcja definiująca używa „セミコネクテッド” obok „コネクテッド” i „ディスコネクテッド”. Poprawki w L2.json dostosowują tekst do `terms-nazwy`; alternatywą (być może naturalniejszą, bo trzy nazwy byłyby równoległe) jest zmiana nazwy w `terms-nazwy` na „セミコネクテッド” i ujednolicenie pozostałych 7 wystąpień. Decyzja do sesji nadrzędnej.
- m5-l1-tekstury.md:101, 108 — „3スートのA-K-T”, „3スートのK-7-2、A-9-4、A-A-6” (pl „w trzech kolorach”): zrozumiałe, ale naturalniej byłoby „レインボーの…”; w linii 108 „3スートの” stoi przed pierwszym przykładem i może być czytane jako dotyczące tylko K-7-2 (w pl dotyczy wszystkich trzech).
- m4-l1-3bet.md:16, 26, 75 oraz m4-l2:44, 92 — „{{t:open|オープン}}の約{{n:pf.3bet.size-ip}}まで{{t:raise|レイズ}}” (jednostka multiplier): poprawność zależy od tego, jak mnożnik wyświetla się po japońsku (np. „3倍” czy „3x”); nie sprawdzałem renderu.
- m4-l3-wobec-3betu.md:26, 36, 78, 104 — „ドミネートされている/している” jako zapożyczenie: zgodne z resztą przekładu, przyjęte bez zmian.
- m5-l2-przewagi.md:72 — „ハンドにすでに{{t:pair|ペア}}を持っている” (pl „ma parę z ręki”): zrozumiałe; rodzimy użytkownik mógłby woleć „ポケットペアを持っている”.

## Pytania do źródła pl
- m5-l1-tekstury.md:108 (pl) — wśród przykładów mokrych flopów podano „T-9-5-4”, czyli cztery karty (flop ma trzy); przekład wiernie powtarza. Czy to celowy przykład stołu z turnu z materiału źródłowego, czy pomyłka?
- m4-l2-obrona-bb.md:92 (pl) — „3-bet i call są ze sobą powiązane”: z kontekstu i z wersji en („are combined”) wynika znaczenie „pokazane łącznie”; „powiązane” jest niejasne. Przekład ja („合算されています”) oddaje sens „łącznie”.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L2 nie było treści krytycznej (brak modułu 12, helplines, ramki „Odpowiedzialna gra”).
