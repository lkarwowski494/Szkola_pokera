# de-R1: niemiecki (de), content/de/rules.yaml linie 1–441 (nagłówek, R-M0-* … R-M5-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/de/rules.yaml (linie 1–441) | tak (cały zakres zlecenia, linia po linii obok pl) | 441 z 1207 |
| content/pl/rules.yaml (linie 1–441) | tak (źródło, ten sam zakres) | 441 z 1207 |
| content/de/terms-nazwy.yaml | częściowo (pierwsze ok. 78 wpisów w całości, dalej grep po terminach z zakresu) | 164 |

Dodatkowo porównanie maszynowe linii 1–441 (pl ↔ de): zestaw i kolejność kluczy `{{t:…}}` / `{{n:…}}`, adresy URL, liczby wpisane cyfrą poza znacznikami, pola `id`, `module`, `level`, `check`, `sources` — bez żadnej różnicy; brak znaczników `{{t:klucz}}` bez formy, brak polskich znaków poza komentarzami.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/de/rules.yaml:23, 334, 335, 343, 360, 392, 393 (i dalej w pliku, razem 13×) | `{{t:straight\|Straight}}` | `{{t:straight\|Straße}}` (albo zmiana nazwy przyjętej) | terms-nazwy.yaml podaje dla `straight` nazwę „Straße”; rules.yaml konsekwentnie używa „Straight”. W obrębie pliku spójne, ale niezgodne z przyjętą nazwą; wybór dotyczy całego korpusu (wpis ma adnotację „WIELE FORM”). | wysoka | nie |
| 2 | NISKIE | content/de/rules.yaml:334 | `{{t:straight-draw\|Straight Draw}}` | `{{t:straight-draw\|Straight-Draw}}` | R-M5-001 if: pisownia bez łącznika, terms-nazwy.yaml: „Straight-Draw”. | wysoka | tak |
| 3 | NISKIE | content/de/rules.yaml:384 | `auch einen {{t:overbet\|Overbet}}` | `auch eine {{t:overbet\|Overbet}}` | R-M5-007 then: rodzaj; terms-nazwy.yaml: overbet r. żeński (jak „die Bet”). | średnia | tak |
| 4 | NISKIE | content/de/rules.yaml:300 | `(in seinem Beispiel 2,4x)` | `(in ihrem Beispiel 2,4x)` | R-M4-011 source: zaimek odnosi się do „Trainingsseite” (r. żeński). Pole source nie jest pokazywane w aplikacji. | wysoka | tak |
| 5 | NISKIE | content/de/rules.yaml:112 | `die Trefferchance auf den Karten` | `die Trefferchance mit den Karten` | R-M2-005 if: kalka „na kartach”. | średnia | tak |
| 6 | NISKIE | content/de/rules.yaml:281 | `{{t:call\|callst}} breiter` | `{{t:call\|callst}} weiter` | R-M4-009 then: „szerzej/szeroko” w tym zakresie jest wszędzie „weit/weiter” (R-M3-001, 006, 009, R-M4-004, 014), tu „breiter”. „breiter” występuje też w lekcjach (ok. 29×), więc to wybór dla korpusu. | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- R-M4-006 then (linia 257): „Bluffs vom unteren Ende deiner {{t:range\|Range}} zum {{t:call\|Callen}}” za „blefy z dołu zakresu sprawdzenia”. Zrozumiałe, ale nienaturalne; rodzimy gracz powiedziałby raczej „Calling-Range”. Poprawka wymagałaby przestawienia dwóch znaczników, więc bez JSON.
- R-M3-008 then, R-M4-010 then, R-M4-013 then (linie 184, 289, 314): „auf Value” za „dla wartości”. W korpusie przeważa „auf Value” (22×) nad „für Value” (8×); w żargonie niemieckim częstsze jest „for Value” / „für Value”. Wybór dla całego korpusu.
- R-M4-001/002/014 (linie 212, 221, 322): „auf etwa {{n:pf.3bet.size-ip}} der Eröffnung” renderuje się jako „auf etwa 3x der Eröffnung”; poprawniej „das 3-Fache der Eröffnung”, ale forma jest spójna z lekcjami i zależy od formatu liczby (`3x`).
- R-M5-013 because (linia 435): „verfehlen gleichzeitig” bez dopełnienia („den Flop”); taka sama konstrukcja jest w lekcjach, zrozumiała.
- R-M4-013 if (linia 313): „mehrere Spieler” za „więcej graczy” (stopień wyższy: „im więcej limperów”); sens reguły zachowany (cytowane źródło: „multiple limpers”).

## Uwagi do źródła pl

- R-M4-010 if: „dostajesz 3-bet z AA, KK albo AK” jest dwuznaczne (kto ma AA: ty czy 3-betujący); przekład wiernie przenosi tę dwuznaczność („du bekommst eine 3-Bet mit AA, KK oder AK”). Jaśniej: „masz AA, KK albo AK i dostajesz 3-bet”.
- Komentarze YAML (linie 1–17, 208, 329–331, 440–441) są w pliku de po polsku, identyczne ze źródłem; to komentarze techniczne, nie treść.

## Ocena ogólna

Przekład reguł R-M0–R-M5 jest wierny: wszystkie liczby, ręce, zakresy, pozycje, kierunki zaleceń, przeczenia i znaczniki zgadzają się ze źródłem pl, nie znaleziono błędu KRYT ani WYS. Niemiecki jest naturalny i spójny w formie „du”, cytaty i adresy źródeł bez zmian. Zostają drobiazgi językowe i typograficzne oraz jedna niezgodność terminologiczna do decyzji dla całego korpusu („Straight” wobec przyjętego „Straße”).
