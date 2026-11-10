# de-R3: niemiecki (de), content/de/rules.yaml linie 827–1207 (R-M10-*, R-M12-*, R-M11-*, R-M13-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/de/rules.yaml (827–1207) | tak (cały zakres zlecenia; plik ma 1207 linii) | 381 |
| content/pl/rules.yaml (827–1207) | tak (źródło, te same numery linii) | 381 |
| content/de/terms-nazwy.yaml | tak | 164 |
| content/en/rules.yaml | nie — tylko pomocniczo linie 906, 914, 997, 1048, 1164, 1204 | 6 |

Przejrzane reguły: R-M10-001…015 (15), R-M12-001…009, 011, 012 (11; treść krytyczna, każde zdanie), R-M11-001…012 (12), R-M13-001…008 (8); pola if/then/because/population/source/sources/level/module/id.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | WYS | content/de/rules.yaml:914 | foldet dein Gegner selten, spielen | {{t:fold\|foldet}} dein Gegner selten, spielen | R-M10-011 because: zgubiony znacznik; pl ma „gdy rywal {{t:fold\|pasuje}} rzadko” (dwa znaczniki fold w polu), de tylko jeden; sens tekstu bez zmian | wysoka | tak |
| 2 | ŚR | content/de/rules.yaml:1048 | ein {{t:fold\|Fold}} nach einem {{t:raise\|Raise}} zu viele | ein {{t:fold\|Fold}} nach einem {{t:raise\|Raise}} deines Gegners zu viele | R-M11-001 because: pl rozróżnia „podbicie” (własne) i „fold po przebiciu” (rywala); „ein Raise und ein Fold nach einem Raise” jest dwuznaczne | średnia | tak |
| 3 | ŚR | content/de/rules.yaml:1204 | robust gegen einen Lesefehler | robust gegen einen falschen Read | R-M13-008 because: „błąd odczytu” (rywala) oddany jako „Lesefehler” = błąd czytania; lekcje M10 de używają „Read” | średnia | tak |
| 4 | NISKIE | content/de/rules.yaml:1110 | das dich ausscheiden lassen kann | das dich aus dem Turnier werfen kann | R-M11-009 if: niezręczna konstrukcja dla „może cię wyeliminować” | średnia | tak |
| 5 | NISKIE | content/de/rules.yaml:1170 | nach einer {{t:session\|Session}} willst du | nach einer einzigen {{t:session\|Session}} willst du | R-M13-004 if: „po jednej sesji”; „einer” czyta się jak rodzajnik nieokreślony | średnia | tak |
| 6 | NISKIE | content/de/rules.yaml:996 | ein tiefer Atemzug | ein Atemzug | R-M12-006 then (treść krytyczna): pl „oddech”, de dodaje „tiefer”; zalecenie bez zmian, naturalne po niemiecku | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- R-M12-006 because (linia 997): „wenn der Tilt wächst, denkst du nicht mehr klar” — pl „gdy tilt urośnie” (dokonane: gdy już urósł; źródło: „When tilt becomes too intense”). „wächst” można czytać jako „gdy tylko rośnie”. To samo sformułowanie jest w lekcji content/de/lessons/m12-l3-tilt.md:122, więc ewentualna zmiana (np. „wenn der Tilt zu groß wird”) powinna objąć oba miejsca. Sens zalecenia (reaguj wcześnie) zachowany.
- R-M10-010 because (linia 906): pl „łączy wszystkie rozmiary i stoły”, de „alle Größen und Boards” (en też „boards”). Jeśli pl „stoły” znaczy stoły do gry, a nie boardy, de/en odbiegają; nie rozstrzygam.
- R-M13-003 because (linia 1164): „eine Wiederholung aus dem Spiel” dla nazwy funkcji „powtórka z gry” — sprawdzić zgodność z nazwą w interfejsie de (w de.json jest tylko „Wiederholungen”).
- R-M10-005 then (linia 862): „mit einer Differenz bis etwa {{n}} Punkte” (obok „von mehr als {{n}} Punkten”) — ewentualnie „von bis zu etwa … Punkten”; preferencja stylu.
- R-M11-011 source (linia 1130): skrót „1,2 Pp” (zwykle „Prozentpunkte” / „PP”); pole source, drobiazg.
- Terminologia korpusu (bez poprawki): {{t:bet}} oddawane jako „Einsatz” (R-M13-008; także „Einsätze” bez znacznika w R-M10-008), a terms-nazwy.yaml podaje „Bet”; {{t:open}} jako „Eröffnung” wobec „Open”. Formy występują licznie w całym korpusie (wg komentarzy terms-nazwy), więc to decyzja dla całego języka.

## Uwagi do źródła pl

- Komentarze YAML (linie 952, 1042–1043, 1141–1143) pozostają po polsku w pliku de — to komentarze, nie treść; bez znaczenia dla użytkownika.
- R-M10-010 because: „stoły” jest dwuznaczne (stoły / boardy); en i de przyjęły „boards”.

## Ocena ogólna

Przekład zakresu jest wierny i naturalny: liczby, klucze `{{n:…}}`, kierunki zaleceń, przeczenia, cytaty, adresy i dane populacji zgadzają się ze źródłem we wszystkich 46 regułach. W treści krytycznej R-M12-* nie znaleziono błędu sensu ani zmienionej liczby czy granicy (jedynie drobny dodatek „tiefer” i niuans „wächst”). Jedyne znalezisko WYS to zgubiony znacznik `{{t:fold}}` w R-M10-011; pozostałe to dwuznaczność i drobne niezręczności.
