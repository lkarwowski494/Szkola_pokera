# ja · L1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m0-l1-uklady.md | tak (pl 104 linie, ja 104 linie) | znaczniki `{{n:}}` i `[[…]]` zgodne z pl; jedna różnica klucza `{{t:}}` (l. 88, niżej) |
| content/ja/lessons/m1-l1-przebieg.md | tak (97 / 97) | znaczniki zgodne; bez poprawek |
| content/ja/lessons/m2-l1-outy.md | tak (135 / 135) | znaczniki zgodne; 1 poprawka |
| content/ja/lessons/m2-l2-pot-odds.md | tak (98 / 98) | znaczniki zgodne; 2 poprawki |
| content/ja/lessons/m3-l1-pozycja.md | tak (70 / 70) | znaczniki zgodne; bez poprawek |
| content/ja/lessons/m3-l2-rece-startowe.md | tak (62 / 62) | znaczniki zgodne; 1 poprawka |
| content/ja/lessons/m3-l3-zakresy-otwarc.md | tak (87 / 87) | znaczniki zgodne; 4 poprawki |

Pomocniczo: `content/ja/terms-nazwy.yaml` w całości; `docs/lokalizacja/glosariusz.md` tylko wiersze wyszukane dla terminów z tej części (nie cały plik). Wersji `en` nie otwierałem. Zgodność znaczników sprawdzona dodatkowo mechanicznie: posortowane listy `{{n:…}}`, `[[…]]` i kluczy `{{t:…}}` w pl i ja są identyczne we wszystkich 7 plikach poza jednym kluczem w m0-l1 (l. 88). Pola YAML nieprzekładalne (id, family, rules, generator, params, table, answer, spot, bloki `range`) są jak w pl.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/lessons/m0-l1-uklady.md:88 | pl: `{{t:straight-flush|Poker}}: {{t:straight-flush|strit w kolorze}}` → ja: `{{t:straight-flush|ストレートフラッシュ}}：同じスートの{{t:straight|ストレート}}`. Drugi znacznik ma inny klucz niż w pl (`straight` zamiast `straight-flush`). Sens zdania jest poprawny („strit w jednym kolorze”), a forma „ストレート” pasuje do klucza `straight`, więc nie jest to błąd wyświetlania; różni się tylko to, którą definicję otworzy dotknięcie słowa. | Zostawić albo, jeśli klucze mają być 1:1 z pl, zmienić na `{{t:straight-flush|同じスートのストレート}}` — wymaga decyzji, bo taka forma nie jest odmianą nazwy z terms-nazwy (strażnik `nazwy.ts`). |
| NISKIE | content/ja/lessons/m2-l1-outy.md (całość) ↔ m2-l2-pot-odds.md:75–76 | pl używa jednej nazwy „szansa trafienia”; m2-l2 odsyła do lekcji o outach pogrubionym „**ヒットする確率**”, ale w m2-l1 to samo nazywa się „引ける確率 / 引く確率” (l. 33, 42, 54, 88, 131, 134). Odsyłacz wskazuje na nazwę, której w tamtej lekcji nie ma. | Ujednolicić w jedną stronę (np. w m2-l1 „引ける確率” → „ヒットする確率”); to kilka miejsc w jednej lekcji, decyzja o kierunku należy do sesji nadrzędnej. |
| NISKIE | content/ja/lessons/m3-l2-rece-startowe.md:53–56 | Lista grup rąk ma po pogrubieniu dwukropek półszerokości „: ”, a pozostałe lekcje części (np. m1-l1 l. 76–79, 85–89) pełnoszerokie „：”. | Zamienić „**: ” na „**：” w 4 liniach. |
| NISKIE | content/ja/lessons/m3-l1-pozycja.md:25 | pl „K9 w różnych kolorach” → „スーテッドでないK9”; poprawne, ale sąsiednie lekcje piszą „オフスートの…”. | Opcjonalnie „オフスートのK9”. |

## Do ujednolicenia skryptem
- `オフスーツ` → `オフスート` (termin offsuit; `terms-nazwy` ma `null`, w przekładzie przeważa „オフスート”: 18 wystąpień wobec 9). `grep -c 'オフスーツ'`: `content/ja/lessons/m3-l3-zakresy-otwarc.md` 3 (poprawione w L1.json), `content/ja/exams/m3.yaml` 3, `content/ja/rules.yaml` 3 — dwa ostatnie pliki są poza tą częścią i ich nie czytałem.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m2-l2-pot-odds.md:27 — opcja „オールインに{{t:raise|レイズ}}” (pl „Przebijam all-in”). Zrozumiałe, ale naturalniejsze wydaje się „オールインの{{t:raise|レイズ}}” (tak w m11-l1) albo „{{t:raise|レイズ}}でオールイン”.
- m2-l1-outy.md:112 — „{{t:straight|ストレート}}の穴（ガットショット）” jako odpowiednik „Dziura w stricie (gutshot)”; możliwe, że lepsze „中抜けのストレートドロー（ガットショット）”.
- m1-l1-przebieg.md:54 — „7-2では組み立てるものがありません” (pl „Z 7-2 nie masz czego budować”); dosłowne, sens czytelny, ale brzmi sztywno.
- m3-l2-rece-startowe.md:55 — „投機的” dla „Spekulacyjne” (grupa rąk); w japońskich materiałach bywa „スペキュレイティブ（ハンド）”.
- m2-l2-pot-odds.md:35 — „小さな{{t:bet}}は良い価格を与えてくれます” (pl „Mały bet daje dobrą cenę”); zrozumiałe, lekko kalkowe.
- Terminy z `null` w terms-nazwy ([DO USTALENIA]) pisane w tej części katakaną zwykłym tekstem, bez znacznika (w pl też bez znacznika): ポットオッズ, ガットショット, キッカー, 3ベット, スタック, スーテッド. W obrębie części konsekwentne; decyzja o postaci docelowej poza zakresem recenzji.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L1 nie było treści krytycznej (moduł 12, helplines, „Odpowiedzialna gra”).
