# fr-R3: francuski (fr), content/fr/rules.yaml linie 827–1207 (R-M10-*, R-M12-*, R-M11-*, R-M13-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/fr/rules.yaml, l. 827–1207 | tak (cały zlecony zakres, każde pole każdej reguły, obok pl) | 381 (plik: 1207) |
| content/pl/rules.yaml, l. 827–1207 (źródło) | tak | 381 (plik: 1207) |
| content/fr/terms-nazwy.yaml | tak, l. 1–150 z 153 (terminologia) | 153 |
| content/en/rules.yaml | nie: tylko l. 906 i 1164 pomocniczo (znaczenie „stoły” i „powtórka z gry”) | — |
| content/numbers.yaml | nie: tylko wartości kluczy użytych w wątpliwych zdaniach (var.hands.k, skill.*, m11.push.10.*) | — |

Reguły przejrzane: R-M10-001…015 (15), R-M12-001…009, 011, 012 (11; treść krytyczna, każde zdanie), R-M11-001…012 (12), R-M13-001…008 (8). Znaczniki `{{t:…}}` i `{{n:…}}` porównane reguła po regule: zestaw kluczy zgodny ze źródłem we wszystkich polach; żadnej liczby wpisanej cyfrą w miejscu `{{n:…}}`. Wzory (błąd standardowy, RoR, przedział winrate, BF, equity (S − 1) ÷ 2S), adresy URL, cytaty angielskie, daty i liczby w polach `population` / `source` bez zmian względem pl.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/fr/rules.yaml:847 | il a beaucoup moins d'occasions | il a plusieurs fois moins d'occasions | R-M10-003 because: pl „wielokrotnie mniej okazji”; osłabiony szczegół, zalecenie bez zmian | wysoka | tak |
| 2 | ŚR | content/fr/rules.yaml:1103 | × {{t:payout\|gains}} | × {{t:payout\|paiements}} | R-M11-008 then: termin payout w terms-nazwy.yaml i w lekcji m11-l3 to „paiement(s)”; „gains” niespójne i dwuznaczne (wygrane gracza) | średnia | tak |
| 3 | ŚR | content/fr/rules.yaml:1112 | avec des {{t:payout\|gains}} | avec des {{t:payout\|paiements}} | R-M11-009 because: to samo zdanie w m11-l3:71 i exams/m11.yaml:67 ma „paiements” | średnia | tak |
| 4 | ŚR | content/fr/rules.yaml:1155 | chacun de ces jeux est correct | chacun de ces coups est correct | R-M13-002 then: „zagranie” w lekcji m13-l1 (to samo twierdzenie) to „coup”; „jeu” jako pojedyncze zagranie nienaturalne | średnia | tak |
| 5 | ŚR | content/fr/rules.yaml:1156 | ne mélange que des jeux de même | ne mélange que des coups de même | R-M13-002 because: spójność z m13-l1:36 | średnia | tak |
| 6 | ŚR | content/fr/rules.yaml:1164 | la reprise d'un coup joué montre | une révision issue du jeu montre | R-M13-003 because: „powtórka z gry” to nazwa funkcji aplikacji; lekcja m13-l2 nazywa ją „révisions issues du jeu” | średnia | tak |
| 7 | NISKIE | content/fr/rules.yaml:975 | environ 615 mille mains | environ 615 000 mains | R-M12-003 source (treść krytyczna, liczba bez zmiany): kalka „615 tys. rąk”; zapis francuski to „615 000” | wysoka | tak |
| 8 | NISKIE | content/fr/rules.yaml:989 | les {{n:skill.pct}} meilleurs joueurs ne devancent les {{n:skill.pct}} plus faibles | les {{n:skill.pct}} de joueurs les plus forts ne devancent les {{n:skill.pct}} les plus faibles | R-M12-005 because (treść krytyczna): konstrukcja „les 1% meilleurs joueurs … les 1% plus faibles” niegramatyczna; sens zgodny z pl | średnia | tak |
| 9 | NISKIE | content/fr/rules.yaml:1063 | {{t:bb-ante\|ante de grosse blinde}} | {{t:bb-ante\|big blind ante}} | R-M11-003 then: terms-nazwy.yaml i lekcje M11 mają „big blind ante”; jedyne użycie innej formy w korpusie | wysoka | tak |
| 10 | NISKIE | content/fr/rules.yaml:1171 | vous gagnez en certitude vers environ | vous gagnez en certitude à environ | R-M13-004 then: podwójne przybliżenie („vers environ”), pl „przy ok.” | wysoka | tak |
| 11 | NISKIE | content/fr/rules.yaml:957, 965, 972, 1029 | {{n:var.hands.k}} mille mains (wyświetla się „100 mille mains”) | np. {{n:var.hands.k}} milliers de mains | R-M12-001, 002, 003, 011 (treść krytyczna, liczba bez zmiany): „100 mille mains” to kalka „100 tys. rąk”; ten sam zapis ok. 20× w lekcjach m12, a w m12-l2:68 i m13-l1:105 „milliers de mains” — decyzja dla całego korpusu | średnia | nie |
| 12 | NISKIE | content/fr/rules.yaml:871, 873, 1071, 1096 | à l'abattage / abattages gagnés | au showdown / showdowns gagnés | R-M10-006, R-M11-004, R-M11-007: terms-nazwy.yaml podaje „showdown”; w korpusie fr oba (showdown ok. 52×, abattage ok. 22×); „abattage” jest poprawnym francuskim terminem, więc wybór dla całego korpusu | średnia | nie |

Brak znalezisk KRYT i WYS. W regułach R-M12-* (treść krytyczna) sens, liczby (znaczniki), granice („au plus tard”, „ne remontez qu'une fois que”, „jamais moins de”), przeczenia i wzory zgodne z pl w każdym zdaniu; znaleziska 7, 8, 11 są wyłącznie językowe.

## Do sprawdzenia przez człowieka znającego język

- Typografia procentów w polach `population` / `source` (np. „32%”, „VPIP jusqu'à 14%”, l. 873, 882, 891, 916): francuska norma to „32 %” ze spacją nierozdzielającą. Zapis bez spacji jest w całym pliku (także poza zakresem) i zależy też od formatu `{{n:…}}`; decyzja korpusowa, bez poprawki.
- R-M11-005 then (l. 1079) „vous ne jouez plus qu'en all-in ou vous vous couchez”: zrozumiałe, ale składniowo nierówne (pl „grasz już tylko all-in albo fold”); ewentualnie „vous ne faites plus que deux choses : all-in ou vous {{t:fold|coucher}}”. Pewność niska, preferencja stylu.
- R-M12-008 then (l. 1012) „vos pires jeux (C-game)” za „najgorszych zagrań”: lekcja m12-l3 ma „votre pire jeu (C-game)” w liczbie pojedynczej; czytelne, ale „jeux” w liczbie mnogiej może być odebrane jako „gry”. Pewność niska.
- R-M11-007 then (l. 1095): pominięte „all-in” po „pusheriez” (pl „pushowałbyś all-in”); w fr „pusher” już to znaczy, więc bez straty sensu.

## Uwagi do źródła pl

- R-M11-001 source (pl l. 1050): „uproszczenie: serwis szkoleniowy (ta sama strona)” następuje po cytacie z „serwisu komercyjnego solvera” (Short-Stacked Play in MTTs); określenie rodzaju serwisu jest niespójne w samym źródle (fr oddaje wiernie).
- R-M10-010 because (pl l. 906): „łączy wszystkie rozmiary i stoły” — „stoły” znaczy tu boardy (en: „boards”), fr „boards” poprawnie; w pl słowo jest dwuznaczne (stół do gry / karty wspólne).
- R-M13-004 then (pl l. 1171): dwa dwukropki w jednym zdaniu („nie wyciągasz wniosku: liczysz okazje, a nie rozdania: na statystykę…”); fr rozdzielił średnikiem, czytelniej.

## Ocena ogólna

Przekład zakresu jest wierny i staranny: nie znalazłem żadnej zmiany liczby, kierunku zalecenia, przeczenia ani zgubionego znacznika, także w regułach R-M12-* czytanych zdanie po zdaniu. Znaleziska dotyczą spójności terminów między księgą reguł a lekcjami (payout, big blind ante, „zagranie”, nazwa powtórki z gry) i kilku niezręczności językowych. Otwartą sprawą korpusową pozostaje zapis „N mille mains” i wybór „abattage” / „showdown”.
