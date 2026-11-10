# vi-R2: wietnamski (vi), content/vi/rules.yaml linie 442–826 (R-M6-001 … R-M9-010)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/vi/rules.yaml, linie 442–826 | tak (cały zakres zlecenia; plik ma 1207 linii, reszta poza zleceniem) | 385 |
| content/pl/rules.yaml, linie 442–826 (źródło) | tak | 385 |
| content/vi/terms-nazwy.yaml | tak | 150 |
| content/en/rules.yaml | nie, tylko pomocniczo linie 509–511 i 661–663 | 6 |

Kontrola mechaniczna zakresu (skrypt, linia po linii pl ↔ vi): zestaw kluczy `{{t:…}}` i `{{n:…}}`, adresy URL, liczby wpisane cyfrą, pola strukturalne (id, module, level, check, sources). Jedyna różnica: linia 801 (znalezisko 1).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | WYS | content/vi/rules.yaml:801 | (số vòng cược là đơn giản hóa) | (số {{t:street\|vòng cược}} là đơn giản hóa) | R-M9-008 then: zgubiony znacznik `{{t:street\|…}}` (pl: „liczby {{t:street\|ulic}} to uproszczenie”) | wysoka | tak |
| 2 | ŚR | content/vi/rules.yaml:804 | số street cho từng tay | số vòng cược cho từng tay | R-M9-008 source: „street” po angielsku, wszędzie indziej w zakresie „vòng cược” | wysoka | tak |
| 3 | ŚR | content/vi/rules.yaml:446 | một {{t:bluff\|bluff}} không có cơ hội mạo hiểm | một {{t:bluff\|bluff}} không có cơ hội thắng mạo hiểm | R-M6-001 because: bez „thắng” czyta się „blef nie ma okazji ryzykować”; R-M6-002 ma „không có cơ hội thắng” | średnia | tak |
| 4 | ŚR | content/vi/rules.yaml:554 | trước cược, họ sẽ {{t:fold\|bỏ bài}} tay kém hơn | nếu bạn cược, họ sẽ {{t:fold\|bỏ bài}} tay kém hơn | R-M7-003 because: „na bet spasuje”; „trước cược” na początku członu brzmi czasowo („przed zakładem”) | średnia | tak |
| 5 | ŚR | content/vi/rules.yaml:647 | mà bạn đã thắng nếu {{t:check\|xem bài}} | mà bạn cũng sẽ thắng nếu {{t:check\|xem bài}} | R-M8-001 because: „którą wygrałbyś” (tryb przypuszczający), „đã thắng” = czas przeszły | średnia | tak |
| 6 | NISKIE | content/vi/rules.yaml:661 | chỉ thắng hơn một nửa một chút số tay | chỉ thắng nhỉnh hơn một nửa số tay | R-M8-003 if: niezręczny szyk, kalka „niewiele ponad połową” | średnia | tak |
| 7 | ŚR | content/vi/rules.yaml:442–826 (cały zakres) | formy: {{t:draw\|draw}}, {{t:flush-draw\|draw thùng}}, {{t:big-blind\|mù lớn}}, {{t:street\|vòng cược}}, {{t:combo\|tổ hợp}}, {{t:check\|xem bài}}, {{t:top-pair\|đôi cao nhất}}, {{t:open\|mở}} | nazwy z terms-nazwy.yaml: bài chờ, bài chờ thùng, big blind, street, combo, check, top pair, mở cược | formy różnią się od przyjętych nazw terminu (wpisy [WIELE FORM]); w zakresie są wewnętrznie spójne, więc to wybór dla całego korpusu, nie poprawka punktowa | wysoka | nie |

## Do sprawdzenia przez człowieka znającego język

- „trước” w znaczeniu „wobec” (linie 461 „trước c-bet nhỏ”, 510, 761 „không bỏ bài trước all-in”, 762 i 770 „trước all-in bạn cần…”): w 762 i 770 można przeczytać „przed all-inem potrzebujesz…” zamiast „na all-in (żeby go sprawdzić) potrzebujesz…”. Możliwe doprecyzowanie: „để theo all-in, bạn cần…”. Pewność niska.
- Linia 695 (R-M8-007 because): „nên họ thường cầm tay phải bỏ hơn” — sens zgodny („częściej zostaje mu ręka do spasowania”), ale szyk „thường … hơn” z „phải bỏ” w środku brzmi niezręcznie; propozycja „nên họ thường chỉ còn tay phải bỏ bài hơn”. Pewność niska.
- Linia 472 (R-M6-004 population): „phòng” jako „pokój pokerowy” — czy samo „phòng” jest zrozumiałe bez dopowiedzenia („phòng chơi” / „phòng poker”); linia 874 poza zakresem ma „phòng online”.
- Mieszanie zapisu figur: „át” (linie 486, 494, 497, 694, 710) obok „A hoặc K” (536, 619) i „K” (494). Źródło ma słownie „as/król”; zrozumiałe, do ewentualnego ujednolicenia.
- Linia 510: „người tố trước flop” za pl „przebijającego” — dodane „trước flop”; zgodne z en („preflop raiser”) i sensem źródła, nie zgłaszam jako błąd.

## Uwagi do źródła pl

- R-M8-003 then (linia 662): „przy ryzyku check-raise'u z pozycji rzadko schodzisz…” jest składniowo dwuznaczne (check-raise z pozycji czy ty z pozycji); en i vi czytają „ty z pozycji”.
- R-M6-009 then (linia 510): „dobrych dla przebijającego” nie mówi wprost, że chodzi o przebijającego przed flopem.

## Ocena ogólna

Przekład zakresu jest wierny: liczby, kierunki zaleceń, przeczenia, adresy i klucze znaczników zgadzają się ze źródłem we wszystkich 46 regułach poza jednym zgubionym znacznikiem `{{t:street}}` w R-M9-008. Język jest zrozumiały i spójny wewnętrznie; uwagi dotyczą kilku dwuznacznych albo niezręcznych sformułowań. Formy terminów odbiegają od nazw w `terms-nazwy.yaml` (draw, mù lớn, vòng cược, tổ hợp), co wymaga decyzji na poziomie korpusu.
