# ja · L4 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m7-l1-druga-beczka.md | tak (138/138 linii, pl i ja) | bez błędów sensu; 6 poprawek NISKIE (ujednolicenie „średnia ręka”) |
| content/ja/lessons/m7-l2-polaryzacja.md | tak (139/139) | bez znalezisk |
| content/ja/lessons/m7-l3-implied-odds.md | tak (147/147) | 2 poprawki ŚR (nazwa modułu M9, forma OESD) |
| content/ja/lessons/m7-l4-probe-obrona.md | tak (146/146) | 1 poprawka NISKIE (zgubiony znacznik bluff) |
| content/ja/lessons/m8-l1-value.md | tak (139/139) | 1 ŚR + 2 NISKIE |

Pomocniczo przeczytane w całości: `content/ja/terms-nazwy.yaml`, `docs/lokalizacja/glosariusz.md`; z `content/numbers.yaml` i `content/{pl,ja}/modules.yaml` tylko potrzebne wiersze. Wersji en nie otwierałem. Dodatkowo skryptem porównałem linia po linii (pl ↔ ja) wszystkie znaczniki `{{t:klucz}}`, `{{n:…}}`, `[[…]]`, pola nieprzekładalne YAML (id, family, rules, table, answer, generator, params, count) oraz flagi `correct`/`sizeError`: liczba linii identyczna, `{{n:}}`, karty, pola YAML i flagi poprawnych odpowiedzi zgodne w 100%; różnice w `{{t:}}` tylko te opisane niżej.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m7-l1-druga-beczka.md:137 | pl „gdy blokują wartość rywala” (bez znacznika) → ja „相手の{{t:value|バリュー}}をブロック” (znacznik dodany). Klucz pasuje do znaczenia, wyświetlanie poprawne. | Zostawić albo zdjąć znacznik; bez wpływu na sens. |
| NISKIE | m7-l4-probe-obrona.md:145 | pl „gracze mikrostawek” (bez znacznika) → ja „マイクロ{{t:stakes|ステークス}}” (znacznik dodany, drugi w zdaniu jak w pl). | Jak wyżej. |
| NISKIE | m7-l3-implied-odds.md:143 | pl jeden `{{t:draw}}` rządzący dwoma członami → ja dwa `{{t:draw|ドロー}}` (wymóg składni japońskiej). | Bez zmiany; odnotowane, bo różni się liczba znaczników. |
| NISKIE | m7-l3 (całość częściowo), m7-l4 (całość) | pl „ręka” → w m7-l4 konsekwentnie „手” (強い手, 弱い手, 中程度の手), w m7-l1, m7-l2, m8-l1 „ハンド”; w m7-l3 mieszanie (最強の手 / ハンド). Oba poprawne i zrozumiałe. | Decyzja o ujednoliceniu na poziomie całego przekładu (patrz niżej). |

## Do ujednolicenia skryptem
- „中程度の手” → „中程度のハンド” (4 trafienia w całym `content/ja`, `grep -rF` ; wobec 23 × „中程度のハンド”). W L4 dotyczy m7-l4 (linia 26). Nie wpisałem do JSON, bo wiąże się z szerszą decyzją 手/ハンド w m7-l4 (26 linii ze znakiem 手 w tym pliku, część to inne słowa).
- `{{t:oesd|オープンエンド・ストレートドロー}}` → `{{t:oesd|OESD}}`: 5 trafień w `content/ja` (m2-l1-outy ×2, m7-l3 ×1, exams/m8 ×1 i in.) wobec 11 × `{{t:oesd|OESD}}` i 6 × `{{t:oesd}}`. W L4 poprawione jedno miejsce (JSON); m2-l1 to pierwsze wprowadzenie terminu i rozwinięcie może tam zostać celowo — decyzja sesji nadrzędnej.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m7-l1:13, 33 „Cベットを{{t:bet|ベット}}し”; m7-l4:145 „プローブベットを{{t:bet|ベット}}している” — powtórzenie „ベットをベット”; naturalniej „Cベットを打ち”, ale forma znacznika musi być postacią „ベット”. Zrozumiałe, sens zgodny.
- m7-l1:48 pl „gutshot do najwyższego strita” → „ナッツ{{t:straight|ストレート}}へのガットショット”. Sens zgodny (najwyższy strit = nutsowy na tym stole), ale to interpretacja, nie dosłowne „最も高いストレート”.
- m8-l1:99 „最も高いカードはクイーンだけです” (pl „Masz tylko damę jako najwyższą kartę”) — naturalniej „クイーンハイしかありません” (w linii 100 jest już „クイーンハイ”).
- m8-l1:129 „ミドルキッカー” wobec m7-l4:98 „キッカーが中程度の” (pl w obu „ze średnim kickerem”) — oba zrozumiałe.
- m7-l4:17 „フロップ前に” wobec „プリフロップ” w pozostałych miejscach (pl „przed flopem”) — oba poprawne.
- m7-l1:136 „出典”, m7-l2:137 „出どころ”, m7-l3:145 i m8-l1:137 „根拠” — cztery warianty stałego nagłówka ramki pl „Skąd te zasady”; m7-l1 „ヒューリスティック” wobec m7-l4 „経験則”. Do ewentualnego ujednolicenia w całym przekładzie.

## Pytania do źródła pl
- m7-l1:76 „Taki bet zarabia na lepszych rękach” — dwuznaczne (zarabia „na” lepszych rękach czy „dla” nich); z kontekstu: zyskują ręce lepsze od twojej. Przekład ja poszedł za kontekstem („得をするのは強いハンドのほう”).
- m7-l2:65 „Z tą ręką zarabiasz głównie od rąk, które cię biją” — nie da się „zarabiać” od rąk, które cię biją; chodzi o „płacą ci głównie ręce, które cię biją”. Przekład ja oddaje zamierzony sens („払ってくれるのは主にあなたに勝っているハンド”).
- m8-l1:33 „bez dopłaty od lepszych” — z kontekstu „bez dopłacania lepszym rękom”; tak też w ja.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Część L4 nie zawiera treści krytycznej (moduł 12, helplines, odpowiedzialna gra).
