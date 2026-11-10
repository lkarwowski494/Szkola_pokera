# ja · R2 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/ja/rules.yaml` linie 332–642 (R-M5-001…R-M7-013) wobec `content/pl/rules.yaml` 332–642 | tak, każda linia zakresu w pl i w ja | 37 reguł (13 × M5, 11 × M6, 13 × M7); pola `if`/`then`/`because`/`population`/`source` porównane zdanie po zdaniu. Dodatkowo kontrola skryptem: klucze YAML, `id`, `module`, `level`, `check`, `sources`, adresy URL i liczby w polach `source` identyczne z pl; zbiór kluczy `{{n:…}}` w każdej linii identyczny z pl; komentarze `#` (po polsku, niewyświetlane) bez zmian. Poza zakresem linii niczego nie oceniałem. `terms-nazwy.yaml` (ja) przeczytany w całości, glosariusz tylko dla wybranych kluczy (connected, condensed, paired, probe-bet, c-bet). Wersji en nie otwierałem. |

Wynik: nie znalazłem błędu sensu, liczby, zakresu, kierunku zalecenia ani zepsutego znacznika. `R2.json` jest pusty (`[]`).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/rules.yaml:537 | pl: „częściej `{{t:bet\|stawiasz}}` `{{t:second-barrel\|second barrel}}`” → ja: „`{{t:second-barrel\|セカンドバレル}}`を打つ頻度を上げます”: znacznik `{{t:bet}}` pominięty (czasownik 打つ bez znacznika). Sens zachowany, zdanie naturalne; ginie tylko odsyłacz do terminu „bet”. | Zostawić albo, jeśli strażnik wymaga zgodności zbioru kluczy `t:` z pl: „`{{t:second-barrel\|セカンドバレル}}`を`{{t:bet\|ベット}}`する頻度を上げます” (tak jak w linii 636). |
| NISKIE | content/ja/rules.yaml:495, 610 | W ja o jeden znacznik `{{t:draw}}` więcej niż w pl (495: „追加の`{{t:draw}}`、…`{{t:flush\|フラッシュ}}`への`{{t:draw}}`”; 610: draw powtórzony dla koloru i dla strita). Powtórzenie wymuszone składnią japońską, sens identyczny, klucz poprawny. | Bez zmiany; odnotowane tylko dlatego, że liczba znaczników `t:` różni się od pl. |

## Do ujednolicenia skryptem
- `{{t:connected|コネクト}}` (linie 358, 509: „コネクト…している”) wobec nazwy w `terms-nazwy.yaml`: `connected: "コネクテッド"` (komentarz AB: „jedna forma przymiotnikowa”). W tym fragmencie 2 trafienia formy コネクト, 0 formy コネクテッド (`grep -c` w całym `rules.yaml`: コネクト 2 linie, コネクテッド 0). Forma czasownikowa jest zrozumiała i w linii 358 stoi równolegle do `{{t:semi-connected|セミコネクト}}` (nazwa z `terms-nazwy`), więc nie zgłaszam jej jako błędu; jeśli sesja nadrzędna ujednolica do przymiotnika, wzorzec: `{{t:connected|コネクト}}している` → `{{t:connected|コネクテッド}}な` (linia 509) oraz w linii 358 przebudowa całej frazy razem z セミコネクト (ręcznie).
- `{{t:condensed|コンデンス}}されている` (linia 427) wobec `condensed: "コンデンスド"`: 1 trafienie w `rules.yaml`. Forma czasownikowa od tej samej nazwy; ewentualna zamiana: `{{t:condensed|コンデンス}}されている` → `{{t:condensed|コンデンスド}}だ`.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- 603: „相手の後ろに十分な`{{t:chips|チップ}}`が残っていて” (pl: „za rywalem zostało dość żetonów”): kalka żargonowego „behind”; czy dla początkującego nie lepiej „相手に十分な…が残っていて”?
- 461: „大量に`{{t:fold|フォールド}}`はしません” (pl: „nie pasujesz masowo”): zrozumiałe, ale być może naturalniej „フォールドしすぎないようにします”.
- 545: „ハイカード付きのガットショット” (pl: „gutshot z wysoką kartą”): czy czytelnik odczyta to jako gutshot z overkartą?
- 560: „単独ではほとんど勝てないハンド” (pl: „ręką, która sama prawie nie wygra”): sens „bez pasu rywala / na showdownie”; do oceny naturalność 単独では.
- 518–519: liczby `{{n:xr.mult.*}}` wyświetlają się jako „3x”, „4.5x”, „1.5x” (formatowanie wspólne dla języków), więc tekst brzmi „Cベット額の約3x–4.5xにレイズし”; zrozumiałe, ale po japońsku zwyklejsze byłoby „3〜4.5倍” — to kwestia formatowania liczb, nie przekładu.
- Pola `source` (np. 338, 363): mieszanka nawiasów półszerokich `( )` ze średnikiem pełnej szerokości „；”; spójne w całym fragmencie, więc tylko uwaga typograficzna. W 363 pl „ponad połowę zakresu” oddano „半分以上” (ściśle: 半分超); bez wpływu na regułę.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części R2 (R-M5…R-M7) nie ma treści krytycznej (brak reguł R-M12, linii pomocy, tekstów o prawdziwych pieniądzach).
