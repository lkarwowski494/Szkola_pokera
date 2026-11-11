# Drugi przegląd AI przekładu: de, es (sc-04, 05, 06, 08, 32, 33, 34, R-M11-009)

Zakres: 37 kluczy na język. Repo tylko czytane. Kontroli mechanicznej znaczników i cyfr nie powtarzałem. Nie znalazłem zmian sensu (liczby, kierunek, warunki). Forma zwracania się jest spójna w obu językach (de „du”, es „tú”). Długość: brak przekładu powyżej 1,3 × pl (dlugosci.tsv).

## de: PRZYJĄĆ Z POPRAWKAMI

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-04:decisions.1:cbet-case.actions.bet-small.explanation | „Bet” użyty w rodzaju męskim („Ein kleiner {{t:bet}}”), a glosariusz podaje r. f („Eine Bet”). W lekcjach przeważa rodzaj żeński. | „Eine kleine {{t:bet}} reicht, damit er sie {{t:fold\|foldet}}.” | ŚR | wysoka | terms-nazwy.yaml:17 (r. f); lekcje: „eine kleine {{t:bet\|Bet}}” ×12, „eine große {{t:bet\|Bet}}” ×7. Ten sam błąd jest już w sc-11.yaml:24,26,28 i sc-12.yaml:26,28, które też trzeba poprawić. |
| sc-04:decisions.1:cbet-case.actions.check.explanation | j.w., rodzaj męski | „…die schwachen Hände deines Gegners schon eine kleine {{t:bet}} {{t:fold\|folden}} würden.” | ŚR | wysoka | j.w.; sc-11.yaml:26 |
| sc-04:decisions.1:cbet-case.actions.bet-big.explanation | j.w. (dwa miejsca) | „Eine große {{t:bet}} ist hier eine Ungenauigkeit: … weil die schwachen Hände deines Gegners schon eine solche {{t:bet}} {{t:fold\|folden}}.” | ŚR | wysoka | j.w.; sc-11.yaml:28 |
| sc-05:decisions.1:cbet-case.actions.bet-small.explanation | j.w. | „Eine kleine {{t:bet}} ist zulässig, aber seltener: …” | ŚR | wysoka | j.w.; sc-12.yaml:26 |
| sc-05:decisions.1:cbet-case.actions.bet-big.explanation | j.w. | „Eine große {{t:bet}} ist hier eine Ungenauigkeit: …” | ŚR | wysoka | j.w.; sc-12.yaml:28 |
| sc-06:decisions.1:size-spot.actions.raise.explanation | Zdanie bez czasownika po „also”: „…weil du aus dem {{t:small-blind}} ohne Position spielst, also etwas mehr als {{n:pf.open-size}} von anderen Positionen” czyta się jak urwane. | „Du {{t:raise\|raist}} auf {{n:pf.open-size-sb}}, weil du aus dem {{t:small-blind}} {{t:out-of-position\|ohne Position}} spielst; deshalb {{t:raise\|raist}} du etwas mehr als {{n:pf.open-size}} von anderen {{t:position\|Positionen}}. Eine Größe für alle Hände verrät nicht die Stärke deiner Hand.” | ŚR | wysoka | Ten sam sens w raise-small z czasownikiem: „also {{t:raise\|raist}} du etwas mehr”. |
| sc-32:decisions.0:range-spot.actions.all-in.explanation | Szyk „weil du mit kürzerem Stack weniger riskierst im Vergleich zu den Blinds, …”: wyrażenie stoi za czasownikiem zdania podrzędnego. Brzmi potocznie. | „…weil du mit kürzerem Stack im Vergleich zu den Blinds, die du gewinnst, wenn dein Gegner {{t:fold\|foldet}}, weniger riskierst; …” | NIS | średnia | W fold.explanation tego samego pliku szyk jest poprawny („Mit kürzerem Stack riskierst du weniger im Vergleich …”). |

Sprawdzone bez uwag:
- Button: wszędzie „Button” (sc-05, 06, 08). Tak samo jest w sc-11 i sc-12 („vom Button”).
- Odmiana „3-bettest” i rzeczownik „eine 3-Bet” są takie same jak w lessons/m4-l2-obrona-bb.md:92 i w glosariuszu (3-Bet, r. f).
- out-of-position jako „ohne Position” jest zgodne z lekcjami m4-l3 i m6-l1.
- „am {{w:pozycja}}” jest zgodne z 41 starszymi wystąpieniami.
- „auf etwa {{n:pf.3bet.size-oop}} der Eröffnung” jest zgodne z lessons/m4-l1-3bet.md:26.
- „pushst” i „pushen” są zgodne z lekcjami M11.
- „Du sitzt UTG” to idiomatyczne sformułowanie.

## es: PRZYJĄĆ Z POPRAWKAMI

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-06:decisions.0:range-spot.actions.raise 3.explanation | „desde el botón” (małą literą, po hiszpańsku), a wszystkie pozostałe szablony scenariuszy piszą „Button”. To potwierdza uwagę poprzedniej sesji. | „…así que {{t:open\|abres}} más o menos tan amplio como desde el Button, aproximadamente {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} de las manos, y esta mano está entre ellas.” | ŚR | wysoka | sc-05 (situation, raise 2.5, fold): „el Button”; sc-08: „el Button” ×6; sc-11.yaml:4 i sc-12.yaml:4: „desde el Button”; rules.yaml:1159: „el Button” |
| sc-34:decisions.0:icm-call.actions.fold.explanation | „perder cuesta más dinero del que ganar suma, así que {{t:call\|pagar}} debe ganar más a menudo”. Szyk jest nienaturalny, a „pagar” jako podmiot „ganar” brzmi niezręcznie. Egzamin M11 ma gotowe, naturalne brzmienie tej samej myśli. | „…porque en un {{t:tournament\|torneo}} con {{t:payout\|premios}} perder cuesta más dinero de lo que suma ganar, así que el {{t:call\|pago}} tiene que ganar más a menudo.” | NIS | wysoka | exams/m11.yaml:67 (to samo zdanie) |
| sc-34:decisions.0:icm-call.actions.call.explanation | j.w., pierwsza część | „…perder cuesta más dinero de lo que suma ganar.” | NIS | wysoka | exams/m11.yaml:67 |

Sprawdzone bez uwag:
- Odmiana „haces 3-bet” i rzeczownik „el 3-bet” są zgodne z lekcjami: „haces 3-bet” ×30, „el 3-bet” ×34.
- „en el {{w:pozycja}}” jest zgodne z 41 starszymi wystąpieniami.
- check jako „pasar” i fold jako „retirarse” zgodne z glosariuszem; „tire” w sc-04 bet-small to dopuszczalna forma przechodnia, używana także w lekcjach („tirarán”).
- „en la {{t:board}}” jest zgodne z uwagą w glosariuszu.
- „la {{t:small-blind}} ha ido {{t:all-in}}” jest zgodne z lekcjami M11.
- Tryb rozkazujący „cuando apuestes, apuesta poco” w sc-05 bet-big jest identyczny jak w zatwierdzonym sc-12.yaml:28.

## Do sprawdzenia przez człowieka

1. **es, call w M11: „pagar” czy „igualar”.**
   - sc-33 i sc-34 (oba moduł M11) używają czasownika „pagar/pagas”.
   - Reguły M11 (rules.yaml:1118–1167, w tym R-M11-009.if „igualas”) oraz lekcje i egzamin M11 używają czasownika „igualar”. Rzeczownik „pago” jest tam wspólny, np. „rango de pago”.
   - Glosariusz dopuszcza obie formy (terms-nazwy.yaml:18, WIELE FORM), a szablony innych modułów też je mieszają: sc-01, 02, 19 mają „igualar”, sc-03, 08, 11, 12 mają „pagar”.
   - Proponuję w sc-33 i sc-34 zmienić czasownik na „igualas/igualar” (rzeczownik „pago” bez zmian), żeby w obrębie M11 „Pagas” w scenariuszu i „igualas” w regule R-M11-009 nie stały obok siebie. To decyzja o konwencji całego języka, nie błąd sensu.
2. **de, rodzaj „Bet”.** Jeśli zespół woli rodzaj męski („der Bet”, potocznie spotykany: „Bei einem Bet” ×5, „Probe Bet” w lekcjach), trzeba zmienić glosariusz (r. f) i ujednolicić lekcje. Wtedy zgłoszenia ŚR dla sc-04 i sc-05 odpadają. W obecnym stanie glosariusz i większość lekcji mają rodzaj żeński.
3. **de, R-M11-009.then.** „wobei der Bubble Factor BF = …” nie ma czasownika („ist”). Wzorzec en ma tę samą konstrukcję wzoru, więc to raczej zamierzone. Ewentualnie: „wobei der Bubble Factor BF = Equity-Verlust bei einer Niederlage ÷ Gewinn bei einem Sieg ist”.

## Liczby znalezisk

- de: KRYT 0, WYS 0, ŚR 6, NIS 1. Pięć zgłoszeń ŚR dotyczy rodzaju „Bet”; ta sama poprawka jest potrzebna w sc-11 i sc-12.
- es: KRYT 0, WYS 0, ŚR 1, NIS 2.
