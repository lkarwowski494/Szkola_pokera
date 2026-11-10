# fr-R2: francuski (fr), content/fr/rules.yaml linie 442–826 (R-M6-001 … R-M9-010)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/fr/rules.yaml (linie 442–826) | tak (cały zlecony zakres; reszta pliku poza zleceniem) | 385 z 1207 |
| content/pl/rules.yaml (linie 442–826, źródło) | tak (cały zlecony zakres) | 385 z 1207 |
| content/fr/terms-nazwy.yaml | tak | 153 |

Zakres obejmuje 46 reguł: R-M6-001…011, R-M7-001…013, R-M8-001…012, R-M9-001…010. Oprócz lektury zdanie po zdaniu porównano skryptem dla każdej linii: zestaw kluczy `{{t:…}}`/`{{n:…}}`, adresy URL, liczby wpisane cyfrą oraz pola strukturalne (`id`, `module`, `level`, `check`, `sources`). Różnice: tylko trzy brakujące `t:bet` (niżej); adresy, liczby i pola strukturalne identyczne.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | WYS | content/fr/rules.yaml:537 (R-M7-001 then) | vous tirez plus souvent un {{t:second-barrel\|second barrel}} | vous {{t:bet\|misez}} plus souvent un {{t:second-barrel\|second barrel}} | zgubiony znacznik `t:bet` (pl: „częściej {{t:bet\|stawiasz}} {{t:second-barrel\|second barrel}}”); sens zdania bez zmian, brakuje tylko odsyłacza do terminu | wysoka | tak |
| 2 | WYS | content/fr/rules.yaml:626 (R-M7-012 if) | vous faites un probe bet au turn | vous {{t:bet\|misez}} en probe bet au turn | zgubiony znacznik `t:bet` (pl: „{{t:bet\|stawiasz}} probe bet na turnie”); sens bez zmian | wysoka | tak |
| 3 | WYS | content/fr/rules.yaml:636 (R-M7-013 because) | l'adversaire tire le {{t:second-barrel\|second barrel}} avec | l'adversaire {{t:bet\|mise}} le {{t:second-barrel\|second barrel}} avec | zgubiony znacznik `t:bet` (pl: „{{t:second-barrel\|second barrel}} rywal {{t:bet\|stawia}} węższym zakresem”); sens bez zmian | wysoka | tak |
| 4 | ŚR | content/fr/rules.yaml:594, 595, 602, 612, 635 (R-M7-008, 009, 010, 013) | implied odds / implied odds inversées | cotes implicites (wg terms-nazwy: `implied-odds: "cote implicite"`) albo utrzymać „implied odds” w całym korpusie | termin niespójny w korpusie fr (ok. 39× „implied odds” wobec 12× „cote(s) implicite(s)”), a przyjęta nazwa w terms-nazwy to „cote implicite”; w przejrzanym zakresie użycie jest spójne („implied odds”), więc to decyzja dla całego korpusu | średnia | nie |
| 5 | NISKIE | content/fr/rules.yaml:518 (R-M6-010 then) | d'autant plus que le c-bet est petit | d'autant plus gros que le c-bet est petit | bez przymiotnika zwrot czyta się też jako „tym bardziej, że c-bet jest mały”; pl: „tym więcej, im mniejszy c-bet” | średnia | tak |
| 6 | NISKIE | content/fr/rules.yaml:649 (R-M8-001 source) | une value bet gagne … où elle est suivie | un value bet gagne … où il est suivi | rodzaj gramatyczny: „value bet” jest rodzaju męskiego (jak „un c-bet”, „un probe bet” w tym samym pliku) | średnia | tak |

## Do sprawdzenia przez człowieka znającego język

- Poprawki 1 i 3 („miser un second barrel”): w plikach fr idiomem jest „tirer un second barrel”; forma „misez/mise” przy znaczniku `t:bet` jest zgodna z resztą korpusu (formy `t:bet`: mise, misez, misent), ale brzmi mniej potocznie. Alternatywa do oceny: zostawić czasownik „tirer” jako formę znacznika (`{{t:bet|tirez}}`), jeśli strażnik form na to pozwala.
- R-M6-009 because (linia 511): „davantage de mains très fortes” wobec pl „więcej najsilniejszych układów” (stopień najwyższy osłabiony do „bardzo silne”); sens zalecenia bez zmian, nie zgłaszam jako błąd.
- Typografia procentów w polach `source` (np. linia 513: „12,65% face à 33% et 8,66% face à 66% du pot”; linia 497: „66% :”): francuska norma wymaga spacji nierozdzielającej przed „%”. W całym pliku fr nie ma ani jednego „%” ze spacją (39 wystąpień bez spacji), więc to konwencja pliku do decyzji globalnej, nie poprawka punktowa.
- R-M9-004 source (linia 772): „pot avant l'excédent” to dosłowny przekład „pula przed nadwyżką”; zrozumiałe tylko w kontekście lekcji m9, tak samo jak w źródle.

## Uwagi do źródła pl

- Komentarze YAML w pliku fr (linie 532–533, 641–642, 740–741, 823–826) są po polsku, identyczne jak w pl; to komentarze techniczne, niewidoczne w aplikacji, bez poprawki.
- R-M8-003 then (pl, linia 662): „przy ryzyku check-raise'u z pozycji” jest dwuznaczne (kto jest na pozycji); przekład fr rozstrzyga to jako „en position, face au risque d'un check-raise”, co jest spójne z R-M8-001/002.

## Ocena ogólna

Przekład zakresu R-M6–R-M9 jest wierny i naturalny: wszystkie liczby, ułamki, ręce, flopy, kierunki zaleceń, przeczenia, adresy i cytaty zgadzają się ze źródłem, a klucze `{{n:…}}` są na miejscu we wszystkich 46 regułach. Jedyny powtarzalny defekt to trzykrotnie pominięty znacznik `t:bet` przy „stawiać second barrel / probe bet” (waga WYS z reguły o zgubionym znaczniku, sens tekstu nienaruszony). Pozostałe uwagi to drobiazgi językowe i jedna kwestia terminologii korpusu („implied odds” wobec „cote implicite”).
