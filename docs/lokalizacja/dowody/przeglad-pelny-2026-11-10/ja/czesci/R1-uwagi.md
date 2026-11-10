# ja · R1 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/rules.yaml, linie 1–331 (nagłówek, R-M0…R-M4) | tak, pl i ja linia po linii (pola if/then/because/source każdej reguły) | Pomocniczo przeczytane: `content/ja/terms-nazwy.yaml` (całość), formatowanie liczb w `tools/content-build/src/numbers.ts` (mnożnik = „3x”, bb = „2.5bb”, count bez jednostki). Kontrola skryptem: zbiór znaczników `{{t:…}}`/`{{n:…}}` identyczny w każdej linii pl i ja; linie inne niż if/then/because/source (id, module, level, check, sources) identyczne z pl; adresy URL w polach source identyczne. Liczby w polach source porównane ręcznie (różni je tylko znak dziesiętny: 17,6 → 17.6). Wersji en nie otwierałem. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/rules.yaml:1–17, 208, 329–331 | Komentarze YAML zostały po polsku (nie są treścią wyświetlaną, wspólne dla wszystkich języków). | Bez zmian; tylko informacja. |

Błędów sensu, liczb, zakresów, pozycji, kierunku zaleceń ani zepsutych znaczników w zakresie R-M0…R-M4 nie znalazłem. Formy w `{{t:klucz|forma}}` zgodne z `terms-nazwy` (ベット, コール, レイズ, フォールド, チェック, ポット, オープン, レンジ, ペア, コネクター, バリュー, ブラフ, ポジション, スモールブラインド, ビッグブラインド, HJ, CO, エクイティ実現, スプリットポット, ドロー, イニシアチブ). Rejestr です/ます zachowany w if/then/because.

## Do ujednolicenia skryptem
Brak.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- :80 (R-M2-001 if) „フロップで{{t:flush|フラッシュ}}に向かうカードが…枚ある場合” (pl „masz 4 karty do koloru”): zrozumiałe, ale być może naturalniej „同じスートのカードが…枚ある場合” albo z użyciem フラッシュドロー.
- :258 (R-M4-006 because) „アクションも締めくくれる” (pl „zamykasz akcję”): w żargonie częściej „アクションをクローズできる”.
- :273 (R-M4-008 then) „スーテッドのハイカード” (pl „wysokimi kartami w kolorze”): ハイカード jest też nazwą układu (`high-card`); ewentualnie „スーテッドの高いカード” / „スーテッドのブロードウェイ”. W :281 użyto „ハイカードを含むスーテッドのハンド” — spójne między sobą.
- :203 (R-M3-010 because) „前のプレイヤーが{{t:fold|フォールド}}すると” (pl „gdy wcześni gracze spasują”): sens zachowany (gracze przed LJ), ale „wcześni” (UTG–UTG+2) nie jest nazwane wprost.
- :25, :33 i dalej (pola source): mieszanka pełnej szerokości 「」；： z nawiasami połówkowymi „ (…)” ze spacją — pole source nie jest pokazywane w aplikacji, więc bez poprawki.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Nie dotyczy (R-M0…R-M4, bez modułu 12).
