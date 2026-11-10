# vi-R3: wietnamski (vi), content/vi/rules.yaml linie 827–1207 (R-M10-*, R-M12-*, R-M11-*, R-M13-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/vi/rules.yaml (827–1207) | tak (cały zakres zlecenia, linia po linii obok pl) | 381 |
| content/pl/rules.yaml (827–1207) | tak (źródło) | 381 |
| content/vi/terms-nazwy.yaml | tak | 164 |
| content/en/rules.yaml | nie — tylko pomocniczo linie 906 i 1164 | 2 |

Przejrzane reguły: R-M10-001…015 (15), R-M12-001…009, 011, 012 (11; treść krytyczna, każde zdanie), R-M11-001…012 (12), R-M13-001…008 (8); pola if / then / because / population / source / level / sources.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | WYS | content/vi/rules.yaml:897 | khi họ bluff thừa, bạn luôn | khi họ {{t:bluff\|bluff}} thừa, bạn luôn | R-M10-009 then: zgubiony znacznik `{{t:bluff\|…}}` (pl: „przy nadmiarze {{t:bluff\|blefów}}”); sens zachowany | wysoka | tak |
| 2 | ŚR | content/vi/rules.yaml:871 | nhiều lần {{t:call\|theo}} của họ hơn là tay kém hơn tay bạn | trong các lần {{t:call\|theo}} của họ có nhiều tay kém hơn tay bạn hơn | R-M10-006 because: kalka trudna do zrozumienia („więcej jego sprawdzeń to ręce gorsze od twojej”); „hơn là” czyta się jak „raczej niż” | średnia | tak |
| 3 | ŚR | content/vi/rules.yaml:1126 | sau bạn còn nhiều người chơi có thể | sau bạn còn nhiều người chơi hơn có thể | R-M11-011 if: pl „więcej graczy” (porównanie), vi „wielu graczy” | wysoka | tak |
| 4 | ŚR | content/vi/rules.yaml:1164 | phần chơi lại từ ván đã chơi hiển thị | phần ôn tập từ ván chơi hiển thị | R-M13-003 because: „powtórka z gry” = powtórka SRS, w lekcji m13-l2 „Ôn tập từ ván chơi”; „chơi lại” = odtworzenie / ponowne zagranie | średnia | tak |
| 5 | NISKIE | content/vi/rules.yaml:1170 | bạn vào ván thường đến đâu | bạn vào ván thường xuyên đến mức nào | R-M13-004 if: niezręczne sformułowanie „jak często” | średnia | tak |
| 6 | NISKIE | content/vi/rules.yaml:975 | khớp với cấp độ lớn | khớp với bậc độ lớn | R-M12-003 source: „rząd wielkości” = „bậc độ lớn” | średnia | tak |
| 7 | NISKIE | content/vi/rules.yaml:1119 | {{t:cover\|phủ}} | {{t:cover\|cover}} (do decyzji w całym korpusie) | R-M11-010 then: terms-nazwy.yaml ma `cover: "cover"` (formy cover×4, phủ×1); jedyne użycie formy „phủ” | średnia | nie |
| 8 | NISKIE | content/vi/rules.yaml:941 | ‘no flop, no drop’ | “no flop, no drop” (jak w pl) | R-M10-014 source: w cytacie angielskim wewnętrzne cudzysłowy zmienione na pojedyncze; typografia zagnieżdżenia, bez wpływu na sens | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- R-M12-006 if (linia 995): „trong hồ sơ của mình” za „ze swojego profilu” (profil tiltu) — poprawne dosłownie, ale czytelnik może odczytać „hồ sơ” jako profil konta; ewentualnie „hồ sơ tilt của mình”. Treść krytyczna, sens zalecenia bez zmian.
- R-M12-007 if (linia 1003): „chơi những tay thường {{t:fold\|bỏ bài}}” — brak podmiotu („tay mà bạn thường bỏ”); zrozumiałe, do oceny naturalności.
- R-M12-009 then (linia 1020): „đây là ước lượng” za „to przybliżenie”; ściślej „xấp xỉ”. Bez zmiany sensu.
- R-M12-011 source (linia 1031): „tức khi có đủ bankroll” za „czyli przy pełnym bankrollu” — może być czytane jako „gdy masz wystarczający bankroll”; ewentualnie „tức khi bankroll còn đầy đủ”. Pole source, nie zalecenie.
- Terminy z formami innymi niż nazwa w terms-nazwy.yaml, ale konsekwentne w zakresie: `open` → „mở” (nazwa „mở cược”), `session` → „phiên” (nazwa „phiên chơi”), `small-blind`/`big-blind` → „mù nhỏ”/„mù lớn” (nazwa „small blind”/„big blind”), „tiền mù” za blindy bez znacznika. Do decyzji korpusowej, nie błąd w tym zakresie.

## Uwagi do źródła pl

- Komentarze YAML (linie 952, 1042–1043, 1141–1143) są w vi po polsku — to komentarze techniczne, niewidoczne dla użytkownika; bez poprawki.
- R-M10-010 because: pl „rozmiary i stoły” — en ma „boards”, vi „board”; pl „stoły” jest dwuznaczne (stół do gry / board), przekład vi poszedł za znaczeniem „board”.

## Ocena ogólna

Przekład zakresu jest wierny: wszystkie liczby, progi, kierunki zaleceń, przeczenia i znaczniki `{{n:…}}` zgadzają się ze źródłem, a terminologia (bluff, pot, range, theo, tố, bỏ bài) jest ujednolicona. Reguły R-M12-* (treść krytyczna) przeczytane zdanie po zdaniu — bez znalezisk KRYT ani zmian sensu; granice „najpóźniej / najwcześniej”, „nigdy mniej niż” i wzory oddane poprawnie. Jedyne znalezisko WYS to zgubiony znacznik `t:bluff` w R-M10-009; pozostałe to drobne nieścisłości i niezręczności językowe.
