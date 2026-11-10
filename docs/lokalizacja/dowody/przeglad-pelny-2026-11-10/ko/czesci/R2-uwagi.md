# ko · R2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/ko/rules.yaml`, linie 332–642 (R-M5-001 … R-M7-013) wobec `content/pl/rules.yaml`, te same linie | tak, wszystkie 37 reguł: pola `if`, `then`, `because`, `population`, `source` | Dodatkowo porównanie mechaniczne linia po linii: klucze `{{t:…}}`, `{{n:…}}`, adresy URL, identyfikatory `R-M…`, liczby poza znacznikami, pola nieprzekładalne (`id`, `module`, `level`, `check`, `sources`) — bez różnic. |
| `content/ko/terms-nazwy.yaml` | tak | Odniesienie dla form znaczników. |
| `docs/lokalizacja/glosariusz.md` | częściowo (nagłówek, pierwsze 25 wierszy i wiersze kluczy: two-pair, oesd, connected, wetness, c-bet, nuts-advantage, probe-bet) | Reszta nieczytana; klucze w przekładzie są identyczne jak w pl, więc zgodność klucza ze znaczeniem wynika ze źródła. |
| `content/numbers.yaml`, `tools/content-build/src/numbers.ts` | wybrane klucze użyte w części | Tylko do sprawdzenia zapisu liczb i partykuł po `{{n:…}}`. |

Wersji `en` nie otwierałem (nie było potrzeby). Treści krytycznej (M12) w części nie ma.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ko/rules.yaml:440–441, 532–533, 641–642 | Komentarze YAML (`# M6: obrona na flopie…`) zostały po polsku. | Bez zmiany: komentarze nie trafiają na ekran. |
| NISKIE | content/ko/rules.yaml:464 | W polu `source` „디펜드했습니다”, „디펜스” (pl „bronił”, „obrona”), a w polach if/then tej samej reguły „방어합니다”. | Ujednolicić do „방어했습니다”, „방어” przy okazji; sens bez zmiany. |

Błędów sensu (liczby, zakresy, zagrania, pozycje, kierunek zalecenia) w części nie znalazłem.

## Do ujednolicenia skryptem
- `{{t:nuts-advantage|너츠 우위}}` → `{{t:nuts-advantage|넛 우위}}`: 4 linie w `content/ko/rules.yaml` (`grep -c "너츠 우위"` = 4), wszystkie w tej części i wszystkie w R2.json. Ten sam wzorzec najpewniej występuje w lekcjach i egzaminach (terms-nazwy podaje „너츠 우위” ×19 w całym przekładzie) — poza tą częścią.
- `{{t:two-pair|투페어}}` → `{{t:two-pair|투 페어}}`: 5 linii w pliku (`grep -c "투페어"` = 5); w tej części 2 (linie 360, 502, w R2.json), pozostałe 3 poza zakresem R2 (m.in. linia 29).
- „플랍” → „플롭” (także „프리플랍” → „프리플롭”) w polach `source`: 18 linii w pliku (`grep -c "플랍"` = 18); w tej części 4 linie / 6 wystąpień (338, 346, 413, 513, w R2.json), reszta poza zakresem R2.
- „c벳” → „C벳” w polach `source`: 3 linie w pliku (`grep -c "c벳"` = 3), wszystkie w tej części i w R2.json.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- Linie 503, 554: pl „lepsze płacą”, „zapłaci lepszymi” → „더 강한 핸드는 돈을 냅니다/내므로”. Dosłowne „płaci pieniądze”; czy czytelnik zrozumie to jako „sprawdza (콜합니다)”, a nie „przegrywa/oddaje pieniądze”? Ewentualnie „콜합니다”.
- Linia 560: pl „ręką, która sama prawie nie wygra” → „혼자서는 거의 이길 수 없는 핸드”. „혼자서는” o ręce brzmi nietypowo; może „그 자체로는 거의 이길 수 없는 핸드”.
- Linia 536: pl „c-betowałeś flop z pozycji” → „{{t:position|포지션}}에서 플롭에 C벳했고”. Czy „포지션에서” jest jasne jako „mając pozycję” (inne reguły: „포지션을 가지고 있고”)?
- Linie 494, 497: pl „wiele rąk z asem”, „część asów” → „에이스 핸드”, „일부 에이스로”. Sens: ręce z asem jako najwyższą kartą (bez pary); może „에이스 하이 핸드” jak w linii 486.
- Linia 511: pl „najsilniejszych układów” → „가장 강한 족보”. „족보” w pliku konsekwentnie = układ, ale tu naturalniejsze mogłoby być „가장 강한 핸드”.
- Linia 502 (po poprawce z R2.json): nawias „({{t:flush|플러시}}, {{t:oesd|양방향 스트레이트 드로우}})” jest dłuższy niż ze skrótem; jeśli właściciel terminologii woli skrót w wyliczeniach, trzeba dopuścić „OESD” jako formę w terms-nazwy zamiast zmieniać tekst.
- Linia 626 (po poprawce): „프로브 벳을 베팅할 때” powtarza „벳/베팅”; alternatywa bez powtórzenia wymagałaby usunięcia znacznika `{{t:bet|…}}`, czego nie proponuję.

## Pytania do źródła pl
- R-M6-008 (linia 502): „{{t:draw|drawami}} ({{t:flush}}, {{t:oesd}})” — w nawiasie stoi nazwa układu „kolor”, a chodzi o draw do koloru (flush draw); klucz `flush-draw` byłby ściślejszy. Przekład wiernie powtarza pl.
- R-M7-008 (linia 595): partykuła po `{{n:io.flush.extra}}` zależy od wartości liczby (dziś 50); przy zmianie liczb w `numbers.yaml` koreańska partykuła (이/가) może znów się rozjechać. To samo dotyczy innych miejsc `{{n:…}}`+partykuła w ko (w tej części pozostałe są poprawne dla obecnych wartości).
