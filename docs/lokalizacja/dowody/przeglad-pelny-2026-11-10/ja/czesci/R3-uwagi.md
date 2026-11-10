# ja · R3 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/rules.yaml, linie 643–952 (R-M8-001…R-M10-015) | Tak: pl i ja, wszystkie pola (if, then, because, population, source, sources) | Dodatkowo porównanie skryptem linia w linię: klucze YAML, id, module, level, sources, adresy URL, zestaw znaczników `{{n:…}}` i kluczy `{{t:…}}`, liczby w polach population i source — bez różnic poza opisanymi niżej. Pomocniczo otwarte 4 linie `content/en/rules.yaml` (662, 839, 906, 947) oraz `content/numbers.yaml` (jednostki kilku kluczy). Przeczytane też `content/ja/terms-nazwy.yaml` i `docs/lokalizacja/glosariusz.md`. Reszty rules.yaml (poza liniami 643–952) nie czytałem. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/rules.yaml:663 | pl ma 3 znaczniki `{{t:call|…}}` („gorszych {{t:call|sprawdzeń}} przestaje być więcej niż lepszych”), ja ma 4 („弱いハンドの{{t:call|コール}}が強いハンドの{{t:call|コール}}を上回らなくなる”). Ten sam klucz i forma, sens zachowany; różni się tylko liczba znaczników terminu. | Zostawić, chyba że strażnik wymaga równej liczby znaczników `t`; wtedy drugi „{{t:call|コール}}” zamienić na zwykły tekst „コール”. |
| NISKIE | content/ja/rules.yaml:870 | Zdanie kończy się równoważnikiem „特にリバーで” (pl: „zwłaszcza na riverze”) — poza stylem です/ます. | Np. „…{{t:bluff|ブラフ}}を、特にリバーで、モジュール8のベースより減らします” albo zostawić. |
| NISKIE | content/ja/rules.yaml:941 | W polu source „struktury rake'u sal” → „ルームのレーキ構造”, a w tej samej linii i w całym fragmencie „pokój online” → „オンラインサイト”. Dwie nazwy na pokój pokerowy w jednym polu. | „サイトのレーキ構造”. |
| NISKIE | content/ja/rules.yaml:849 | W polu source „sprzeczność na tym samym szczeblu” (szczebel hierarchii źródeł) → „同じ段階での矛盾”; „段階” czyta się jak „etap”. | „同じ階層での矛盾” (do potwierdzenia z resztą przekładu, jak nazwano szczeble źródeł). |
| NISKIE | content/ja/rules.yaml:740–741, 823–826, 952 | Komentarze YAML zostały po polsku (nie są wyświetlane). | Bez zmian. |

## Do ujednolicenia skryptem
- `レーキキャップ` → `レーキ上限` (nazwa z terms-nazwy). Poza tą częścią: `grep -c レーキキャップ content/ja/exams/m10.yaml` = 1 (nie należy do R3, nie czytałem tego pliku); w rules.yaml 1 trafienie (poprawka w R3.json).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- rules.yaml:662 — „{{t:position|ポジション}}がある状態でチェックレイズのリスクがあるなら” za pl „przy ryzyku check-raise'u z {{t:position|pozycji}}”. Zgodne z en („with position, when there's a risk of a check-raise”); czy „ポジションがある状態で” brzmi naturalnie, czy lepiej „インポジションで”.
- rules.yaml:686 — „外れた{{t:straight|ストレート}}への{{t:draw|ドロー}}” (pl „nietrafionymi drawami do strita”): zrozumiałe, ale zwykle mówi się „外れたストレートドロー”; układ znaczników wymusza obecną postać.
- rules.yaml:838 — „約{{n:var.conf95}}の確からしさで” (pl „z ok. … pewnością”): czy czytelnik woli „信頼度” / „確率”.
- rules.yaml:694 — „そのスートのエース” (pl „asa w kolorze, gdy na stole są trzy karty w kolorze”): poprawne; pl nie mówi wprost „tego koloru”, ja doprecyzowuje zgodnie z sensem.

## Pytania do źródła pl
- R-M8-003 (linia 662): „przy ryzyku check-raise'u z pozycji” jest dwuznaczne (czy „z pozycji” dotyczy gracza betującego, czy check-raise'u); en i ja czytają to jako „gdy masz pozycję”.
- R-M9-004 (linia 772, source): „pula przed nadwyżką” — niejasny skrót; ja oddaje dosłownie („超過分の前のポット”).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Brak treści krytycznej w tej części (R-M8…R-M10; moduł 12 zaczyna się po linii 952).
