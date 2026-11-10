# ko · L6 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m9-l3-rozmiar-geometryczny.md | tak (pl 130 linii, ko 130 linii) | sens i liczby zgodne; tylko niespójności nazw względem m9-l4 |
| content/ko/lessons/m9-l4-plan-trzech-ulic.md | tak | sens zgodny; „지오메트릭 사이즈” zamiast „기하학적 사이즈” |
| content/ko/lessons/m10-l1-statystyki.md | tak | sens zgodny; „닛” zamiast „니트” |
| content/ko/lessons/m10-l2-typy-graczy.md | tak | sens zgodny; „레크리에이셔널”, „승률”, „3벳에 폴드”, partykuły po PFR |
| content/ko/lessons/m10-l3-odejscie-od-bazy.md | tak | „stoły” oddane jako „테이블”; nazwy zagrań łacinką (c-bet, 3-bet) |
| content/ko/lessons/m10-l4-rake.md | tak | sens zgodny; „레이크 상한” zamiast „레이크 캡” |

Dodatkowo: `content/ko/terms-nazwy.yaml` przeczytany w całości. `docs/lokalizacja/glosariusz.md` **nie był czytany** (zgodność terminów sprawdzana tylko z `terms-nazwy` i kluczami znaczników pl). Wersja en otwierana punktowo (m10-l3 linia 49 i 109, m10-l2 linia 124). Kontrola mechaniczna wszystkich 6 par plików, linia po linii: zestaw `{{n:…}}` identyczny z pl w każdej linii, zestaw kluczy `{{t:…}}` identyczny z pl w każdej linii, pola `id`/`family`/`rules`/`answer`/`table`/`params`/`count`, `correct: true` i `sizeError` jak w pl, brak resztek polskiego tekstu (poza komentarzem YAML w m9-l4 linia 87, który jest komentarzem także w pl). Poprawna odpowiedź w każdym ćwiczeniu zgodna z uzasadnieniem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m10-l1:87, 130; m10-l2:29, 33, 114, 142; m10-l3:75, 111, 115, 129; m10-l4:22, 26, 104, 126 | „populacja / dane z populacji” ma trzy nazwy: „플레이어 풀” (m10-l1, 2×), „모집단” (m10-l2, m10-l3; w całym przekładzie 23×), „플레이어 집단 / 집단” (m10-l4, 6×) | wybrać jedną (większość: „모집단”) i ujednolicić; w m10-l4 zamiany wymagają przeredagowania zdań, więc bez poprawki mechanicznej |
| NISKIE | m10-l4:42, 93, 102 | po zmianie znaczników na „레이크 캡” zostaje zwykły tekst „상한” (pl „limit”, bez znacznika), np. „그 상한이”, „상한에 도달”, „같은 달러 상한” | zostawić jako opis albo zamienić na „캡” — decyzja sesji nadrzędnej |
| NISKIE | m9-l3 (계획) / m9-l4 (플랜); m9-l3 (스택 전부) / m9-l4 (스택 전체); „próg” = 기준점 (m9-l3, m10-l3) / 기준 (m10-l1, m10-l2) / 기준선 (m10-l4) | różne słowa na to samo w sąsiednich lekcjach; sens zachowany | ujednolicić przy okazji, nie blokuje |
| NISKIE | m9-l4, m10-l1, m10-l2 (wiele linii) | dwukropek w środku zdania kalkowany z pl („맞습니다: …”, „너무 적습니다: …”); m9-l3, m10-l3 używają kropki | interpunkcja, bez wpływu na sens |

## Do ujednolicenia skryptem
- `content/ko/lessons/m10-l3-odejscie-od-bazy.md`: nazwy zagrań i statystyk zostawione łacinką, podczas gdy m10-l1, m10-l2, m10-l4 i `terms-nazwy` (c-bet: „C벳”, 3-bet: „3벳”) mają zapis koreański. Wzorce i liczba trafień w tym pliku (`grep -o … | wc -l`): `fold to c-bet` → `폴드 투 C벳` (6), `fold to 3-bet` / `Fold to 3-bet` → `폴드 투 3벳` (4 + 1 w nagłówku tabeli), następnie pozostałe `c-bet` → `C벳` (16 z 22) i `3-bet` → `3벳` (26 z 31). Kolejność: najpierw złożenia „fold to …”, potem same nazwy. Po zamianie sprawdzić partykuły (np. „c-bet이” → „C벳이”, „3-bet하고” → „3벳하고” — zgodne, bo oba kończą się spółgłoską). Uwaga: w całym `content/ko` łacińskie „c-bet” ma 140, a „3-bet” 130 wystąpień, więc to wzorzec szerszy niż ta część.
- Poprawki „레크리에이셔널 플레이어” → „레크리에이션 플레이어” (m10-l2, 10 wystąpień, `grep -c` = 10 linii) są wpisane w JSON pojedynczo; skrypt nie jest potrzebny.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m10-l3:75 i 115 — „{{n:pf.3bet.ip-total}}까지의 포지션 3-bet”: pl „3-bet z pozycji do X” znaczy przebicie **do** kwoty X; „X까지의 … 3-bet” może się czytać jako „3-bet do najwyżej X”. Propozycja: „X로 올리는 인 포지션 3벳”.
- m10-l1:86 — „자금을 동결할 수 있습니다” (pl „zatrzymać środki” = zabrać/zatrzymać, nie tylko zamrozić). Ewentualnie „자금을 몰수할 수 있습니다”.
- m10-l4:6 — podtytuł „결정에 무엇이 달라지는가”: czy naturalniej „결정에서 무엇이 달라지는가”.
- m10-l3:87 — „끝까지:” za pl „Na całego:”; może „전면적으로:”.
- m9-l3:101 — „próg najwyższej strefy SPR” oddane „기준점” (punkt odniesienia); może „경계”.
- m10-l2:116, 124 — poprawka „승률” → „윈레이트” jest w JSON (ŚR); gdyby rodzimy użytkownik uznał „승률” za przyjęte dla bb/100, można ją pominąć, ale wartości ujemne przy „승률” wyglądają nienaturalnie.
- m10-l4:31, 104 — „{{n:rake.pop.reg.hands}} 핸드 이상” ze spacją, w pozostałych lekcjach „{{n:…}}핸드” bez spacji; zależy od postaci wyrenderowanej liczby.

## Pytania do źródła pl
- m10-l3:49 — „Fold to c-bet łączy wszystkie rozmiary i stoły”: „stoły” bez znacznika `{{t:board|…}}` jest dwuznaczne (board czy stół do gry); wersja en też ma „tables”, a tekst lekcji (linia 109) mówi „rozmiary i flopy”. Warto dać znacznik albo napisać „flopy”. Poprawka ko → „보드” jest w JSON; jeśli źródło miało na myśli stoły do gry, poprawkę pominąć.
- m9-l4:17 — „jeden bet zostawia na {{t:board|stole}} większość wartości”: idiom „zostawić na stole” oznaczony znacznikiem board; w przekładach wychodzi dosłownie „na boardzie” (ko „보드 위에 남겨 두게 됩니다”). Czy znacznik jest tu zamierzony?

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L6 nie ma treści krytycznej (brak lekcji m12, reguł R-M12, helplines i tekstów o prawdziwych pieniądzach). Jedyny fragment o regulaminie sal i zamknięciu konta (m10-l1:83–87, 129–130) porównany zdanie po zdaniu: sens zgodny, uwaga o „동결” wyżej.
