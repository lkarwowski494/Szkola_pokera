# de-L9: niemiecki (de), lekcje m11-* (3) oraz egzaminy m11.yaml i m13.yaml

Przegląd niezależny względem `content/pl/` (2026-11-10). Terminologia: `content/de/terms-nazwy.yaml`. Format liczb sprawdzony w `content/numbers.yaml` i `packages/jezyki/src/formaty.ts` (jednostka `percent` daje w de zapis „45 %”).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m11-l1-push-fold.md | tak | 178 |
| content/de/lessons/m11-l2-sprawdzanie.md | tak | 176 |
| content/de/lessons/m11-l3-icm.md | tak | 169 |
| content/de/exams/m11.yaml | tak | 86 |
| content/de/exams/m13.yaml | tak | 91 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/de/lessons/m11-l1-push-fold.md:63 | auf etwa {{n:m11.push.15}} Hände enger | auf etwa {{n:m11.push.15}} der Hände enger | Liczba jest procentem („45 %”); „45 % Hände” to błąd gramatyczny, pl „ok. … rąk” = „der Hände” (tak jest w m11-l2 i w egzaminie m11). | wysoka | tak |
| 2 | ŚR | content/de/lessons/m11-l1-push-fold.md:91 | {{n:m11.push.10-ante}} Händen. | {{n:m11.push.10-ante}} der Hände. | Jak nr 1 („bei etwa 71–72 % Händen”). | wysoka | tak |
| 3 | ŚR | content/de/lessons/m11-l1-push-fold.md:152 | mit etwa {{n:m11.push.15}} Händen All-in | mit etwa {{n:m11.push.15}} der Hände All-in | Jak nr 1. | wysoka | tak |
| 4 | ŚR | content/de/lessons/m11-l1-push-fold.md:156 | mit etwa {{n:m11.3max.push.btn}} Händen All-in | mit etwa {{n:m11.3max.push.btn}} der Hände All-in | Jak nr 1. | wysoka | tak |
| 5 | ŚR | content/de/lessons/m11-l1-push-fold.md:174 | {{n:m11.push.10-ante}} Hände (der Solver | {{n:m11.push.10-ante}} der Hände (der Solver | Jak nr 1 („auf etwa 71–72 % Hände”). | wysoka | tak |
| 6 | ŚR | content/de/exams/m13.yaml:25, 36 | „Zulässig” (25: text; „eine zulässige Entscheidung”; 36: „Zulässig, weil …”, „Zulässig ist eine Aktion”) | „Vertretbar” / „eine vertretbare Entscheidung” | Pytania q3–q4 pytają o werdykt raportu; interfejs (`apps/mobile/src/i18n/locales/de.json`: `dopuszczalne`, `acceptable`) nazywa „Dopuszczalna” = „Vertretbar”, egzamin „Zulässig”. Użytkownik nie zobaczy w raporcie nazwy z egzaminu. Pozostałe werdykty (Übereinstimmend, Ungenauigkeit, Fehler, Ohne Bewertung) zgadzają się z interfejsem. Ta sama nazwa „Zulässig” jest w lekcji m13-l1 (poza zakresem), więc to wybór w całym korpusie: albo treść → „Vertretbar”, albo interfejs → „Zulässig”. | wysoka | nie |
| 7 | NISKIE | content/de/exams/m13.yaml:44 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | terms-nazwy.yaml: flush-draw = „Flush-Draw”; pisownia bez łącznika niezgodna z przyjętą nazwą. | wysoka | tak |
| 8 | NISKIE | content/de/exams/m13.yaml:45 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | Jak nr 7. | wysoka | tak |
| 9 | NISKIE | content/de/exams/m13.yaml:46 | {{t:flush-draw\|Flush Draw}} | {{t:flush-draw\|Flush-Draw}} | Jak nr 7. | wysoka | tak |
| 10 | NISKIE | m11-l1 (np. 42, 55, 60, 79, 108, 138, 152, 156), m11-l3:143, 161 wobec m11-l2 i egzaminów | „All-in gehen”, „All-in sind” | „all-in gehen”, „all-in sind” (albo odwrotnie, jednolicie) | Niespójna pisownia przysłówkowego „all-in”: lekcje l1 i l3 wielką literą, l2 i oba egzaminy małą. Rzeczownik „das All-in” wszędzie poprawnie. Wybór jednej pisowni dotyczy całego korpusu. | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- m11-l1:128 „die Kosten einer Runde aller Spieler am Tisch” (pl „koszt jednego okrążenia graczy przy stole”): zrozumiałe, ale niezręczne; naturalniej „die Kosten einer Runde um den Tisch” albo „einer vollen Runde am Tisch”.
- m13.yaml:45–46 „Deine Kreuz passen nicht mehr zum Board”, „Herz passt nicht zu den Kreuz”: żargon stołowy; w tekście pisanym raczej „Deine Kreuzkarten”, „zu den Kreuzkarten”.
- m11-l1:174 „vor dem Geben” (pl „przed rozdaniem”): poprawne, ale rzadkie; ewentualnie „vor dem Austeilen der Karten”.
- m11-l2:134 „Gap Concept” w cudzysłowie (nazwa z literatury, w pl też po angielsku), a terms-nazwy.yaml ma `gap-concept: "Gap-Konzept"`. Źródło nie używa tu znacznika, więc zostawiono; do decyzji, czy podać nazwę niemiecką.
- Lekcja l2 pisze „ca.”, lekcje l1, l3 i egzamin m11 „etwa”, egzamin m13 „ca.” (pl wszędzie „ok.”): obie formy poprawne, różnica tylko stylistyczna.

## Uwagi do źródła pl

- exams/m11.yaml:57 (q7): „rywal all-in {{n:exam.m11.bf.s3}} i {{n:exam.m11.bf.s4}}” można przeczytać tak, jakby rywal wchodził all-in za obie liczby; przekład de wiernie zachowuje tę dwuznaczność („der Gegner all-in mit … und …”). Jaśniej: wymienić czwarty stack przed rywalem all-in.

## Ocena ogólna

Przekład jest wierny: liczby, ręce, pozycje, kierunki zaleceń, poprawne odpowiedzi i uzasadnienia zgadzają się ze źródłem, a wszystkie znaczniki `{{t:…}}` i `{{n:…}}` mają te same klucze w tych samych miejscach; nie znaleziono błędów wagi WYS ani KRYT. Język jest naturalny i spójny w formie „du”. Jedyny powtarzalny błąd językowy to „X % Händen/Hände” w lekcji l1 (5 miejsc); merytorycznie najważniejsza jest rozbieżność nazwy werdyktu „Zulässig” (treść) i „Vertretbar” (interfejs), która wymaga jednej decyzji dla całego korpusu.
