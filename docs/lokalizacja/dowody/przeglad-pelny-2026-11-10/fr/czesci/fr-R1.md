# fr-R1: francuski (fr), content/fr/rules.yaml linie 1–441 (nagłówek, R-M0-* … R-M5-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/fr/rules.yaml (linie 1–441) | tak (cały zakres zlecenia; reszta pliku poza zleceniem) | 441 z 1207 |
| content/pl/rules.yaml (linie 1–441, źródło) | tak (cały zakres zlecenia) | 441 |
| content/fr/terms-nazwy.yaml | tak | 153 |

Kontrola mechaniczna zakresu (linia po linii, pl obok fr): zestaw kluczy `{{t:…}}` i `{{n:…}}` identyczny w każdej linii (w 3 liniach — 175, 229, 305 — inna kolejność wynikająca ze składni zdania), adresy URL identyczne, liczby poza znacznikami identyczne, pola `id`, `module`, `level`, `check`, `sources` identyczne, brak tekstu po polsku w polach reguł.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | content/fr/rules.yaml:346 | notion de flop humide | notion de flop wet | R-M5-002 source: termin niespójny z `terms-nazwy.yaml` (wet: „wet”, D-392) i z polem then tej samej reguły (`{{t:wet\|wet}}`); pole source nie jest pokazywane w aplikacji, stąd waga niska | wysoka | tak |
| 2 | NISKIE | content/fr/rules.yaml:346 | exemples de flops humides | exemples de flops wet | R-M5-002 source: jak wyżej | wysoka | tak |
| 3 | NISKIE | content/fr/rules.yaml:346 | la limite intermédiaire/humide | la limite intermédiaire/wet | R-M5-002 source: jak wyżej | wysoka | tak |
| 4 | NISKIE | content/fr/rules.yaml:413 | un flop humide ne signifie pas | un flop wet ne signifie pas | R-M5-010 source: jak wyżej | wysoka | tak |
| 5 | NISKIE | content/fr/rules.yaml:72 | dévoilent leurs cartes (abattage) | dévoilent leurs cartes (showdown) | R-M1-004 then: `terms-nazwy.yaml` podaje showdown: „showdown”, a rules.yaml konsekwentnie używa „abattage” (12 wystąpień w całym pliku, 0 „showdown”); w całym korpusie fr oba warianty (ok. 24 „abattage” / 78 „showdown”). Wybór terminu dla całego korpusu, nie pojedyncza poprawka | średnia | nie |
| 6 | NISKIE | content/fr/rules.yaml:113 | p. ex. les implied odds | p. ex. la cote implicite | R-M2-005 then: `terms-nazwy.yaml` podaje implied-odds: „cote implicite”; przekład zostawia angielskie „implied odds” (tak jak źródło pl, bez znacznika; w rules.yaml 9× „implied odds”, 0× „cote implicite”). Wybór korpusowy | średnia | nie |
| 7 | NISKIE | content/fr/rules.yaml:315, 383, 392, 400, 409 i pola source | préflop | preflop | `terms-nazwy.yaml` podaje preflop: „preflop” (bez akcentu), tekst reguł pisze „préflop” (spójnie w zakresie; w korpusie fr przeważa „préflop”). Raczej do poprawienia wpis w terms-nazwy albo decyzja korpusowa niż tekst reguł | średnia | nie |

Brak znalezisk KRYT, WYS i ŚR: w zakresie nie znalazłem zmienionej liczby, ręki, zakresu, pozycji, kierunku zalecenia, przeczenia ani zgubionego znacznika.

## Do sprawdzenia przez człowieka znającego język

- R-M5-001 if (linia 334): „avec au moins deux jeux de deux rangs” za „z co najmniej dwoma zestawami dwóch rang” — wierne, ale „jeux de deux rangs” może być dla czytelnika niejasne (być może lepiej „deux combinaisons de deux rangs”); źródło pl jest równie skrótowe. Pewność niska.
- R-M4-013 then (linia 314) i source (linia 317): „peuvent compléter” / „sur le fait de compléter” za „możesz dopłacić” (limp za limperami). We francuskim żargonie „compléter” kojarzy się głównie z dopłatą z małego blinda; „limper derrière” / „suivre le limp” byłoby jednoznaczniejsze. Spójne z R-M3-004 („compléter la blinde (limp)”), sens zalecenia zachowany. Pewność niska.
- R-M1-004 then (linia 72): „le turn et la river une chacun” — poprawne (uzgodnienie w rodzaju męskim przy podmiocie mieszanym), ale brzmi szorstko; ewentualnie „une carte chacun”. Preferencja stylu.
- R-M1-003 source (linia 67): „augmente la perte du montant suivi” — zrozumiałe, naturalniej „du montant du call”; pole niewyświetlane.
- „limpeur(s)” (linie 305, 306, 315) wobec „limper(s)” w innych plikach korpusu fr (ok. 29 „limpeur(s)” / 11 „limper(s)” jako rzeczownik): w zakresie spójnie „limpeur”, do ujednolicenia korpusowego.
- Typografia w polach source: procenty bez spacji („42%”, „40–45%”) wbrew francuskiej normie („42 %”); pola nie są pokazywane w aplikacji, więc nie zgłaszam jako znaleziska.

## Uwagi do źródła pl

- Komentarze YAML (linie 1–17, 208, 329–331, 440–441) pozostają w pliku fr po polsku; to komentarze techniczne, nie treść — bez poprawki.
- R-M3-002 if: „wszyscy spasowali do ciebie na UTG” — UTG mówi pierwszy, więc nikt przed nim nie pasuje; przekład oddaje to wiernie („tout le monde s'est couché jusqu'à vous, en UTG”). Drobna nieścisłość źródła, bez wpływu na zalecenie.

## Ocena ogólna

Przekład zakresu R-M0–R-M5 jest wierny i naturalny: liczby, ręce, zakresy, pozycje, kierunki zaleceń i znaczniki zgadzają się ze źródłem pl w każdej regule, a forma „vous” i terminologia (suivre/call, se coucher/fold, relance, ouverture, range, tirage) są spójne. Jedyne poprawki JSON dotyczą terminu „humide” zamiast przyjętego „wet” w niewyświetlanych polach source (4 miejsca). Pozostałe uwagi to wybory terminologiczne na poziomie całego korpusu (abattage/showdown, implied odds/cote implicite, préflop/preflop) do rozstrzygnięcia poza tym zleceniem.
