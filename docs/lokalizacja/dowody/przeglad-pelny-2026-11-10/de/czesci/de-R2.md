# de-R2: niemiecki (de), content/de/rules.yaml linie 442–826 (R-M6-001 … R-M9-010)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/de/rules.yaml (442–826) | tak (cały zakres zlecenia, linia po linii obok pl; plik ma 1207 linii) | 385 |
| content/pl/rules.yaml (442–826) | tak (źródło) | 385 |
| content/de/terms-nazwy.yaml | nie: tylko wpisy terminów użytych w zakresie (grep) | — |

Kontrola automatyczna: zestaw kluczy `{{t:…}}` / `{{n:…}}` porównany linia po linii z pl (2 różnice, nr 1–2); pola `id`, `module`, `level`, `check`, `sources` identyczne z pl.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | WYS | content/de/rules.yaml:446 | foldest du öfter als {{n:alpha.bet-third}} | {{t:fold\|foldest}} du öfter als {{n:alpha.bet-third}} | R-M6-001 because: zgubiony znacznik `t:fold` (pl: {{t:fold\|pasujesz}}) | wysoka | tak |
| 2 | WYS | content/de/rules.yaml:647 | foldet dein Gegner eine schlechtere Hand | {{t:fold\|foldet}} dein Gegner eine schlechtere Hand | R-M8-001 because: zgubiony znacznik `t:fold` (pl: {{t:fold\|pasuje}}) | wysoka | tak |
| 3 | ŚR | content/de/rules.yaml:603 | (hoher {{t:spr\|SPR}}) | (hohe {{t:spr\|SPR}}) | R-M7-009 then: rodzaj SPR; terms-nazwy: r. f, w zakresie mieszane „der/den SPR” i „einer SPR”, także w jednej regule | wysoka | tak |
| 4 | ŚR | content/de/rules.yaml:604 | bei niedrigem {{t:spr\|SPR}} | bei niedriger {{t:spr\|SPR}} | R-M7-009 because: rodzaj SPR | wysoka | tak |
| 5 | ŚR | content/de/rules.yaml:744 | du berechnest den {{t:spr\|SPR}} | du berechnest die {{t:spr\|SPR}} | R-M9-001 if: rodzaj SPR | wysoka | tak |
| 6 | ŚR | content/de/rules.yaml:754 | je niedriger der {{t:spr\|SPR}} | je niedriger die {{t:spr\|SPR}} | R-M9-002 because: rodzaj SPR; then tej reguły: „bei einer SPR” | wysoka | tak |
| 7 | ŚR | content/de/rules.yaml:760 | der {{t:spr\|SPR}} auf dem Flop ist niedriger | die {{t:spr\|SPR}} auf dem Flop ist niedriger | R-M9-003 if: rodzaj SPR; because tej reguły: „bei einer SPR” | wysoka | tak |
| 8 | ŚR | content/de/rules.yaml:818 | je höher der {{t:spr\|SPR}} | je höher die {{t:spr\|SPR}} | R-M9-010 because: rodzaj SPR; dalej w tym zdaniu „bei einer SPR” | wysoka | tak |
| 9 | NISKIE | content/de/rules.yaml:545 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | R-M7-002 then: pisownia wg terms-nazwy („Flush-Draw”) | wysoka | tak |
| 10 | NISKIE | content/de/rules.yaml:576 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | R-M7-006 if: jw. | wysoka | tak |
| 11 | NISKIE | content/de/rules.yaml:595 | bei einem Flush Draw | bei einem Flush-Draw | R-M7-008 because: jw. (tekst bez znacznika, jak w pl) | wysoka | tak |
| 12 | NISKIE | content/de/rules.yaml:701 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | R-M8-008 if: jw. | wysoka | tak |
| 13 | NISKIE | content/de/rules.yaml:569 | eine große Größe | eine große Einsatzgröße | R-M7-005 then: niezręczne powtórzenie; „Einsatzgröße” jak w R-M8-005 | wysoka | tak |
| 14 | NISKIE | content/de/rules.yaml:585 | ein {{t:flush\|Flush}} sind etwa | für einen {{t:flush\|Flush}} sind das etwa | R-M7-007 then: niegramatyczne; mowa o szansie na kolor | średnia | tak |
| 15 | NISKIE | content/de/rules.yaml:649 | ein Value Bet … wenn er gecallt wird | eine Value Bet … wenn sie gecallt wird | R-M8-001 source: rodzaj „Bet” żeński (terms-nazwy; w pliku „eine C-Bet”, „eine Probe Bet”) | wysoka | tak |
| 16 | NISKIE | content/de/rules.yaml:472 | beschreiben so passive Freizeitspieler | beschreiben auf diese Weise passive Freizeitspieler | R-M6-004 population: „so passive” czyta się jako „tak (bardzo) pasywnych”; pl znaczy „opisują w ten sposób” | średnia | tak |
| 17 | NISKIE | content/de/rules.yaml:511 | mehr der stärksten Hände | mehr von den stärksten Händen | R-M6-009 because: niezręczny dopełniacz | średnia | tak |
| 18 | NISKIE | content/de/rules.yaml:538 | deine {{t:range\|Range}} zum {{t:open\|Eröffnen}} | (np. „Eröffnungsrange”, forma używana w korpusie) | R-M7-001 because: niezręczne, ale zrozumiałe; poprawka wymagałaby połączenia dwóch znaczników | średnia | nie |
| 19 | NISKIE | content/de/rules.yaml:673, 717, 725, 734 | Bluff-Catcher | terms-nazwy: „Bluff Catcher” | korpus używa prawie wyłącznie „Bluff-Catcher” (29 : 1); rozjazd leży raczej w terms-nazwy niż w regułach; decyzja dla całego korpusu | wysoka | nie |
| 20 | NISKIE | content/de/rules.yaml:460, 462, 495 | out of Position | terms-nazwy: „out of Position” [WIELE FORM]; w korpusie częściej „ohne Position” | w przejrzanym zakresie spójnie „out of Position”; wybór formy w całym korpusie | wysoka | nie |

## Do sprawdzenia przez człowieka znającego język

- Rodzaj „SPR” w całym korpusie de: poza zakresem także mieszany (ok. 17 użyć męskich wobec ok. 18 żeńskich); poprawki 3–8 ujednolicają tylko ten zakres do rodzaju z terms-nazwy (f). Jeśli właściciel terminologii woli „der SPR”, trzeba odwrócić kierunek w całym korpusie.
- R-M8-010 because (719): „ist ein Call genau ausgeglichen” za „call wychodzi na zero”; zrozumiałe, naturalniej byłoby „geht ein Call genau auf null auf” / „ist ein Call break-even”. Bez poprawki.
- R-M7-002 then (545): „Draw zur {{t:straight|Straight}}”, podczas gdy terms-nazwy podaje „Straße” jako nazwę główną (formy mieszane w korpusie); w zakresie spójnie „Straight”.

## Uwagi do źródła pl

- R-M8-003 then (pl:662): „przy ryzyku check-raise'u z pozycji rzadko schodzisz” jest dwuznaczne (kto jest „z pozycji”); przekład de oddaje to jako „gehst du mit Position selten unter 1/2”, co jest jednym z możliwych odczytań.
- R-M6-004 population (pl:472): „opisują tak pasywnych graczy” ma tę samą dwuznaczność, co przekład (nr 16).
- Komentarze YAML (`# M6: …`, `# M7: …`) w pliku de są po polsku; to komentarze techniczne, nie treść.

## Ocena ogólna

Przekład zakresu jest wierny: liczby, ułamki puli, ręce, flopy, kierunki zaleceń, przeczenia i odwołania między regułami zgadzają się ze źródłem we wszystkich 46 regułach, a cytaty i adresy źródeł są nietknięte. Jedyne błędy blokujące to dwa zgubione znaczniki `t:fold` (R-M6-001, R-M8-001). Poza tym główna słabość to niespójny rodzaj gramatyczny „SPR” (także wewnątrz jednej reguły) oraz drobiazgi pisowni i stylu. Treści krytycznej (moduł 12) w zakresie nie ma.
