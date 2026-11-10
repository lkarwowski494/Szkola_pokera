# de-L11: niemiecki (de), lekcje m0-l1-uklady, m13-l1-raport, m13-l2-powtorki, m13-l3-przeglad

Źródło: `content/pl/lessons/` (te same pliki). Słownik interfejsu: `apps/mobile/src/i18n/locales/de.json` (grep: nazwy ocen, raport, powtórki, obszary). Terminologia: `content/de/terms-nazwy.yaml`.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m0-l1-uklady.md | tak | 104 |
| content/de/lessons/m13-l1-raport.md | tak | 109 |
| content/de/lessons/m13-l2-powtorki.md | tak | 97 |
| content/de/lessons/m13-l3-przeglad.md | tak | 88 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m13-l1-raport.md:36 | text: "Konform" | text: "Übereinstimmend" | Nazwa oceny „Zgodna”: interfejs (de.json `grade.zgodne`, `game.report.verdicts.compliant`) ma „Übereinstimmend”; lekcja uczy etykiety, której użytkownik nie zobaczy w raporcie | wysoka | tak |
| 2 | ŚR | m13-l1-raport.md:36 | ist konform. | ist übereinstimmend. | jw. (why) | wysoka | tak |
| 3 | ŚR | m13-l1-raport.md:45 | text: "Konform" | text: "Übereinstimmend" | jw. | wysoka | tak |
| 4 | ŚR | m13-l1-raport.md:45 | die Schwelle für konform ({{n:range.mixed.low}}) | die Schwelle für übereinstimmend (…) | jw. (why) | wysoka | tak |
| 5 | ŚR | m13-l1-raport.md:46 | text: "Zulässig", why: "Zulässig ist | text: "Vertretbar", why: "Vertretbar ist | Nazwa oceny „Dopuszczalna”: interfejs (`grade.dopuszczalne`, `verdicts.acceptable`) ma „Vertretbar” | wysoka | tak |
| 6 | ŚR | m13-l1-raport.md:46 | die Schwelle für konform." | die Schwelle für übereinstimmend." | jak nr 1 (koniec why) | wysoka | tak |
| 7 | ŚR | m13-l1-raport.md:55 | text: "Konform" | text: "Übereinstimmend" | jak nr 1 | wysoka | tak |
| 8 | ŚR | m13-l1-raport.md:64 | zählt der Bericht als konform. | zählt der Bericht als übereinstimmend. | jak nr 1 | wysoka | tak |
| 9 | ŚR | m13-l1-raport.md:90 | - **Konform**: | - **Übereinstimmend**: | jak nr 1 (lista stopni oceny) | wysoka | tak |
| 10 | ŚR | m13-l1-raport.md:91 | - **Zulässig**: | - **Vertretbar**: | jak nr 5 (lista stopni oceny) | wysoka | tak |
| 11 | ŚR | m13-l1-raport.md:95 | - **Zeit abgelaufen**: | - **Zeit überschritten**: | „Przekroczony czas” jako stopień oceny: w raporcie etykieta to „Zeit überschritten” (`game.report.verdicts.timeout`); „Zeit abgelaufen” to inny napis (sesja ćwiczeń, szczegół raportu) | wysoka | tak |
| 12 | ŚR | m13-l1-raport.md:101 | Spielzug als zulässig, | Spielzug als vertretbar, | jak nr 5 | wysoka | tak |
| 13 | ŚR | m13-l2-powtorki.md:33 | Eine zulässige Entscheidung | Eine vertretbare Entscheidung | jak nr 5 | wysoka | tak |
| 14 | ŚR | m13-l2-powtorki.md:34 | Korrekte und zulässige Entscheidungen | Übereinstimmende und vertretbare Entscheidungen | „Zgodne i dopuszczalne”: tu „zgodne” = „Korrekte” (trzecia nazwa tej samej oceny w module); interfejs: `game.report.good` = „Übereinstimmende und vertretbare Entscheidungen” | wysoka | tak |
| 15 | ŚR | m13-l3-przeglad.md:60 | bestätigt sie auch die realistische Annahme | wird sie auch von der realistischen Annahme bestätigt | „założenie realistyczne też ją potwierdzi”: szyk zdania pozwala odczytać odwrotnie (decyzja potwierdza założenie) | średnia | tak |
| 16 | ŚR | m0-l1-uklady.md:81 | {{t:hole-cards\|Handkarten}} | {{t:hole-cards\|Hole Cards}} | Termin wg `terms-nazwy.yaml`: „Hole Cards” (tak w reszcie korpusu i w ćwiczeniu słownictwa tej lekcji); „Handkarten” to druga nazwa tego samego pojęcia | średnia | tak |
| 17 | ŚR | m0-l1-uklady.md:104 | deine {{t:hole-cards\|Handkarten}} nichts | deine {{t:hole-cards\|Hole Cards}} nichts | jw. | średnia | tak |
| 18 | NISKIE | m13-l2-powtorki.md:24 | Deine Herzen passen | Deine Herzkarten passen | „twoje kiery”: kolor to „Herz”, karty to „Herzkarten”; „Herzen” = serca | wysoka | tak |
| 19 | NISKIE | m13-l2-powtorki.md:95 | Woher diese Regeln kommen | Woher diese Regeln stammen | Nagłówek notki „Skąd te zasady”: w m13-l1:107 i m13-l3:86 „stammen”; niespójność w module | wysoka | tak |
| 20 | NISKIE | m13-l2-powtorki.md:51, 53, 93 | Frequenzen | Häufigkeiten | „częstotliwości”: m13-l1:91, 97 i interfejs (`verdictHints.acceptable`) mają „Häufigkeit(en)”; oba słowa poprawne, wybór dla całego korpusu | średnia | nie |
| 21 | NISKIE | m13-l2-powtorki.md:52 | Schau auf die Bewertung jeder Entscheidung, mitzuspielen. | np. Schau auf die Bewertung jeder einzelnen Entscheidung, in eine Hand einzusteigen. | „ocenę każdej decyzji wejścia do gry”: zdanie poprawne, ale niezręczne | średnia | nie |

Sprawdzone z interfejsem i zgodne: „Bericht”, „X von Y Entscheidungen bewertet” (m13-l1:61, 97 = `report.rated`), „Ungenauigkeit”, „Fehler”, „Ohne Bewertung”, „Wiederholungen”, „Wiederholungskarten” (`report.cards`), „Ergebnis in Chips” (`report.result`), „Freies Spiel” (`game.free`), „Bereich” / opis odblokowania (`game.areasHint`), „Zeitlimit” (`game.timer`), nazwa obszaru „Flop: C-Bet” (`content/de/modules.yaml`, m5). Znaczniki `{{t:…}}` i `{{n:…}}`: te same klucze w odpowiadających miejscach we wszystkich czterech plikach; liczby, karty i układy stołów bez zmian; poprawne odpowiedzi (`correct: true`) przy tych samych opcjach co w pl.

## Do sprawdzenia przez człowieka znającego język

- m0-l1-uklady.md:31, 33, 34, 99: „Zwei Paare” wielką literą w środku zdania („schlägt Zwei Paare”, „dieselben Zwei Paare”). `terms-nazwy.yaml` ma „zwei Paare”, korpus częściej małą literą (21 do 9). Jako nazwa układu wielka litera jest do obrony; decyzja dla całego korpusu.
- m13-l1-raport.md:36, 45, 46, 64 po poprawkach 2, 4, 6, 8: przymiotnik „übereinstimmend” w orzeczniku bez „mit …” brzmi sztywno („ist übereinstimmend”); interfejs sam używa tej formy (`progress.gameExplain`: „als übereinstimmend oder vertretbar bewerteten”). Alternatywa: forma etykiety w cudzysłowie („gilt als „Übereinstimmend“”). Jeśli właściciel terminologii wolałby „Konform”/„Zulässig”, zmiana należy do `de.json`, nie do lekcji; ważne, żeby było jedno.
- m13-l2-powtorki.md:33, 77: „Entscheidungen nach abgelaufener Zeit” (pl „decyzje po przekroczonym czasie”) zostawione jako opis; po poprawce nr 11 można rozważyć „nach überschrittener Zeit”.
- m13-l3-przeglad.md:80: „Einsatzhöhen” dla „rozmiary”; w m13-l1, m13-l2 i w interfejsie „Größe(n)”. Naturalne po niemiecku, ale to druga nazwa.
- m13-l1-raport.md:108: „sind Rechnung” („to rachunek”); w m13-l2:96 „ist exakte Rechnung”. Drobna niezręczność.

## Uwagi do źródła pl

- m0-l1-uklady.md:24 (pl): „Kolejność z góry: poker, kareta, full, kolor, strit” pomija pokera królewskiego, choć why mówi „full jest na 4. miejscu” (liczone z pokerem królewskim na 1.). Przekład oddaje to wiernie („Straight Flush, Vierling, …”).
- m13-l1-raport.md:45 (pl): zdanie opiera się na tym, że 100% minus `range.mixed.high` równa się `range.mixed.low`; przekład zachowuje te same klucze.

## Ocena ogólna

Przekład jest wierny i naturalny: nie znalazłem zmienionej liczby, ręki, kierunku zalecenia, poprawnej odpowiedzi ani zgubionego znacznika. Jedyny istotny problem jest systemowy: lekcje m13 nazywają oceny „Konform” i „Zulässig” (raz „Korrekte”) oraz „Zeit abgelaufen”, a interfejs pokazuje „Übereinstimmend”, „Vertretbar” i „Zeit überschritten”, więc użytkownik nie znajdzie w raporcie nazw, których uczy lekcja. Poza tym drobna niespójność „Handkarten” / „Hole Cards” w m0-l1 i kilka kosmetycznych uwag.
