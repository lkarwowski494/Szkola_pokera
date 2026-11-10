# ja · E1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/exams/m0.yaml | tak (pl 92 linie, ja 92 linie) | bez znalezisk |
| content/ja/exams/m1.yaml | tak (75 / 75) | bez znalezisk |
| content/ja/exams/m2.yaml | tak (99 / 99) | bez znalezisk |
| content/ja/exams/m3.yaml | tak (95 / 95) | 4 poprawki (3 × ŚR, 1 × NISKIE) |
| content/ja/exams/m4.yaml | tak (111 / 111) | 1 poprawka (NISKIE) |
| content/ja/exams/m5.yaml | tak (100 / 100) | 4 poprawki (3 × ŚR przykładowe, 1 × NISKIE) + ujednolicenie skryptem |
| content/ja/exams/m6.yaml | tak (96 / 96) | 1 poprawka (ŚR) |

Pomocniczo: `content/ja/terms-nazwy.yaml` przeczytany w całości. `docs/lokalizacja/glosariusz.md` **nie był czytany** (zgodność terminów sprawdzana tylko z `terms-nazwy` i z kluczami znaczników w pl). Wersji `en` nie otwierałem (żadne zdanie pl nie było niejasne).

Kontrola mechaniczna (skrypt, linia po linii pl ↔ ja, wszystkie 7 plików): zbiór `{{n:…}}`, klucze `{{t:…}}`, `[[…]]`, pola `table`, `id`, `family`, `rules`, `answer`, `spot`, `correct`, `sizeError` oraz struktura YAML — identyczne z pl, z jednym wyjątkiem: m4.yaml:92 (dodany znacznik `{{t:value|…}}`, poprawka w JSON). Wszystkie formy w `{{t:klucz|forma}}` są postaciami nazw z `terms-nazwy` (m.in. ワンペア, オープンした側, アイソレート, コネクト, エクイティを実現 — każda wymieniona tam jako forma). Poprawne odpowiedzi (`correct: true`) i uzasadnienia zgodne z pl we wszystkich pytaniach.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/ja/exams/m5.yaml (37 miejsc, 22 linie) | pl „ręka” → w m5 wszędzie „手”, w pozostałych egzaminach, lekcjach i regułach „ハンド” (w m5 ani razu) | patrz „Do ujednolicenia skryptem”; 3 przykłady są w JSON |
| NISKIE | content/ja/exams/m6.yaml:24, 54, 64, 73, 83 | pl „stawia c-bet” → „Cベットを{{t:bet\|ベット}}します” (podwojone „ベット”: „Cベットをベットします”) | np. „Cベットを打ちます”; wymaga decyzji, co zrobić ze znacznikiem `{{t:bet\|…}}` z pl, dlatego bez poprawki mechanicznej |
| NISKIE | content/ja/exams/m6.yaml:38, 39, 76, 77 | pl „płaci / zapłacą” (potocznie: sprawdza) → dosłowne „支払う / 支払われても”; zrozumiałe, ale po japońsku naturalniej „コールする / コールされても” (tak jest w m4.yaml:93 „コールしてくる”) | ujednolicić do „コール” bez znacznika (w pl też bez znacznika) |
| NISKIE | content/ja/exams/m5.yaml i m6.yaml | pl „Tak:” na początku uzasadnienia poprawnej odpowiedzi → m5 „そのとおりです。” (10 ×), m6 „正解です。” (8 ×) | jedna postać w całym przekładzie |
| NISKIE | content/ja/exams/m5.yaml:50–52 | pl „próg” → „損益分岐点” (4 ×, tylko w m5); w m4.yaml:61 i lekcjach „しきい値”, w m6.yaml:19, 48 „基準” | sens poprawny we wszystkich trzech; do ewentualnego ujednolicenia |
| NISKIE | content/ja/exams/m6.yaml:86 | przedział „{{n:xr.mult.low}}～{{n:xr.mult.example}}” ze znakiem „～”; w pozostałych egzaminach i w pl „–” | „–” jak wszędzie |

## Do ujednolicenia skryptem
- `content/ja/exams/m5.yaml`: „手” w znaczeniu „ręka” → „ハンド”. Wzorzec: `手` niepoprzedzone przez `相` (相手 = rywal zostaje) — 37 trafień w 22 liniach (13, 22, 31, 32, 33, 38, 47, 52, 59, 60, 61, 66, 68, 69, 70, 75, 78, 79, 80, 88, 89, 90); w tym pliku nie ma „手札” ani innych złożeń z „手”. Po zamianie przeczytać linie 13 („ここでの手は” → „ここでのハンドは”) i 88 („この手に対して” → „このハンドに対して”). Trzy z tych miejsc (linie 47, 68, 75) są już w E1.json — skrypt powinien je pominąć albo zastąpić te trzy wpisy.
- „オフスーツ” → „オフスート” poza tą częścią: `grep -c` daje jeszcze trafienia w `content/ja/lessons/m3-l3-zakresy-otwarc.md` i `content/ja/rules.yaml` (łącznie 6 w lekcjach i regułach wobec 15 „オフスート” w lekcjach); 3 miejsca z m3.yaml są w E1.json.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5.yaml:38, 52 — „フロップに外れる” / „フロップに当たらない” dla „chybia flop”: czy naturalniej „フロップを外す” / „フロップでヒットしない”?
- m0.yaml — „ワンペア” jako forma `pair` w rankingu układów („エースのワンペア”); w m3–m6 „ペア”. Obie formy są w `terms-nazwy`; czy w m0 „エースのペア” nie byłoby zwyklejsze?
- m3.yaml:23, 51, 61 — „Dopłacam do dużego blinda” → „ビッグブラインドの額だけ払う”, a w m4.yaml:111 „Dopłacam” → „後ろからリンプ”. Sens zgodny; czy opcja nie powinna brzmieć po prostu „リンプ”/„コール”?
- m3.yaml:88 — „Bywa grane dla zmyłki” → „相手を惑わすためにプレイされることもあります”: zrozumiałe, ale strona bierna brzmi książkowo.
- 3-bet / 4-bet / check-raise / gutshot / backdoor: w `terms-nazwy` `null` („DO USTALENIA”), w przekładzie konsekwentnie katakana („3ベット”, „4ベット”, „チェックレイズ”, „ガットショット”, „バックドア”) — zgodnie z lekcjami; nie zgłaszam jako błędu.

## Pytania do źródła pl
- brak

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części E1 (egzaminy m0–m6) nie ma treści krytycznej.
