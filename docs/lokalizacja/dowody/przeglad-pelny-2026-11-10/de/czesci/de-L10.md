# de-L10: niemiecki (de), treść krytyczna M12 (lekcje m12-l1–l4, egzamin m12, helplines)

Źródło: `content/pl/lessons/m12-*.md`, `content/pl/exams/m12.yaml`, `content/helplines.yaml`. Przegląd niezależny, zdanie po zdaniu; dodatkowo mechaniczne porównanie zestawu znaczników `{{t:…}}` / `{{n:…}}` i liczb wpisanych cyframi linia po linii (pl ↔ de): bez różnic we wszystkich pięciu plikach treści.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m12-l1-wariancja.md | tak | 140 |
| content/de/lessons/m12-l2-decyzja-wynik.md | tak | 116 |
| content/de/lessons/m12-l3-tilt.md | tak | 134 |
| content/de/lessons/m12-l4-bankroll.md | tak | 149 |
| content/de/exams/m12.yaml | tak | 93 |
| content/de/helplines.yaml (względem content/helplines.yaml) | tak | 39 |
| content/de/terms-nazwy.yaml (terminologia, pomocniczo) | tak | 164 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/de/lessons/m12-l4-bankroll.md:102 | nutze die Kontakte im Hinweis „Verantwortungsvolles Spielen“ am Ende dieser Lektion. | nutze die Kontakte im Hinweis „Verantwortungsvolles Spielen“. | Treść krytyczna: źródło ma tylko „skorzystaj z kontaktów z karty o odpowiedzialnej grze”; dodane „am Ende dieser Lektion” (brak w pl i en), mylące, gdy pytanie pojawia się poza lekcją. Zalecenie bez zmian. | wysoka | tak |
| 2 | ŚR | content/de/exams/m12.yaml:55 | text: "Ungerechtigkeits-Tilt" | text: "Tilt aus Ungerechtigkeit" | Nazwa typu tiltu niespójna z lekcją m12-l3 i z poprawną odpowiedzią („Tilt aus Hass aufs Verlieren”); odmienna forma trzech błędnych odpowiedzi wyróżnia poprawną. | wysoka | tak |
| 3 | ŚR | content/de/exams/m12.yaml:56 | text: "Fehler-Tilt" | text: "Tilt aus Fehlern" | Jak nr 2 (lekcja: „Tilt aus Fehlern”). | wysoka | tak |
| 4 | ŚR | content/de/exams/m12.yaml:56 | why: "Fehler-Tilt ist Ärger | why: "Tilt aus Fehlern ist Ärger | Jak nr 2, to samo w uzasadnieniu. | wysoka | tak |
| 5 | ŚR | content/de/exams/m12.yaml:57 | text: "Rache-Tilt" | text: "Tilt aus Rache" | Jak nr 2 (lekcja: „Tilt aus Rache”). | wysoka | tak |
| 6 | ŚR | content/de/exams/m12.yaml:36 | bewertest du im Hand-Review | bewertest du in der Handanalyse | „Przegląd rozdań” w m12-l2:67 i :69 to „Handanalyse”; w egzaminie to samo pojęcie pod inną nazwą. | wysoka | tak |
| 7 | NISKIE | content/de/exams/m12.yaml:54 | weder dem Glück noch dir selbst | weder dem Schicksal noch dir selbst | „Nie winisz losu”: „dem Glück die Schuld geben” niezręczne; lekcja m12-l3:16, :43 ma „Schicksal”. | średnia | tak |
| 8 | NISKIE | content/de/lessons/m12-l2-decyzja-wynik.md:68 | {{n:var.hands.k}} Tausend Hände | {{n:var.hands.k}} Tsd. Hände | Jedyne miejsce z „Tausend” zamiast skrótu „Tsd.” używanego wszędzie indziej. | wysoka | tak |
| 9 | NISKIE | content/de/lessons/m12-l3-tilt.md:88 | an der Spitze am Ende leicht wieder verloren | an der Spitze hinten leicht wieder verloren | „Postęp z przodu łatwo traci się z tyłu”: „am Ende” czyta się jako „w końcu”, obraz gąsienicy (przód/tył) się gubi. | średnia | tak |
| 10 | NISKIE | content/de/exams/m12.yaml (całość) względem lekcji m12 | „Intervall”, „etwa”, „Blöcke à 100”, „ein Limit runtergehen” | (w lekcjach:) „Bereich”, „ca.”, „Blöcke zu je 100”, „im Limit absteigen” | Egzamin i lekcje oddają te same zwroty źródła inaczej (przedział, ok., bloków po 100, zejść stawkę). Sens bez zmian; ujednolicenie wymaga wyboru wariantu dla całego korpusu. | wysoka | nie |
| 11 | NISKIE | content/de/lessons/m12-l4-bankroll.md:24, :77; content/de/exams/m12.yaml:11 | Gewinnspieler / Verlustspieler | (w m12-l1:) gewinnender Spieler / verlierende Spieler | Dwa warianty dla „wygrywający / przegrywający gracz” w przejrzanych plikach; „Gewinnspieler” może się kojarzyć z „Gewinnspiel” (loteria). Wybór wariantu dla korpusu. | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- m12-l4:113 „dein gesamter Vorrat, der ausschließlich fürs Pokerspielen bestimmt ist” (pl „cały zapas przeznaczony wyłącznie na grę”): wierne, ale „Vorrat” bez dopowiedzenia brzmi nietypowo; ewentualnie „dein gesamtes Guthaben/Budget”. Źródło celowo nie mówi „pieniądze”, więc bez poprawki.
- m12-l2:97 „ein {{t:call}} mit einem Flush-Draw um den ganzen Pot am Turn” (pl „za całą pulę”): eliptyczne tak jak źródło; rodzimy czytelnik może wolałby „gegen eine Bet in Pot-Größe”.
- helplines.yaml:16 „sprich mit einem Arzt oder einer Fachkraft für psychische Gesundheit”: wierne; forma męska generyczna („Arzt”) – kwestia przyjętej w aplikacji konwencji, nie błąd.

## Uwagi do źródła pl

Brak.

## Ocena ogólna

Przekład treści krytycznej jest wierny: wszystkie liczby, progi (połowa bankrollu, „spätestens/frühestens”), kierunki zaleceń, poprawne odpowiedzi i sygnały ostrzegawcze zgadzają się ze źródłem, a znaczniki `{{t}}`/`{{n}}` są identyczne linia po linii. `helplines.yaml`: nazwa organizacji, adres URL, identyfikatory, daty i cytaty źródeł bez zmian; przetłumaczone pola (`pointer`, `fallback.text`, `regions_label`, `info`) oddają sens w całości, w tym zdanie o numerze alarmowym i myślach samobójczych. Znalezisk KRYT i WYS nie ma; uwagi dotyczą jednego dodanego szczegółu w pytaniu o sygnały ostrzegawcze oraz niespójności nazewnictwa między egzaminem a lekcjami (inny tłumacz/styl egzaminu).
