# BX: przegląd zastępczy zmian w m12.exam (q1, q2, q3, q8)

- Data: 2026-11-10
- Weryfikator: niezależny subagent w świeżym kontekście (nie autor), sesja BX, rola 06, D-027
- Zakres: `git diff 70fdf40..HEAD -- content/` (commity c6fc442, e806ac2, 4ee532d, 2203fa6; tylko `content/pl/exams/m12.yaml`, 4 linie: pole `why` poprawnej opcji w m12.exam.q1 (l. 9), q2 (l. 18), q3 (l. 27), q8 (l. 73)). Twierdzenia krytyczne z unieważnionym `przeglad.sha` (jednostka: cały plik m12.yaml): R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:ror.two.
- Wykonane kontrole:
  - `python3 -I docs/tresci/narzedzia/rachunki/rachunek_m12.py`: 46 sprawdzeń, 0 rozbieżności.
  - `node docs/tresci/narzedzia/bx-porownaj-egzamin.mjs 70fdf40 content/pl/exams/m12.yaml m12.exam.q1:0 m12.exam.q2:0 m12.exam.q3:0 m12.exam.q8:0`: dla każdego z 4 pytań „klucze ZGODNE, poprawna ZGODNA, pierwsze zdanie SENS, why ZMIENIONE”, niezgodności: 0.
  - Wartości liczb odczytane z formuł `content/numbers.yaml` i z wyrenderowanych pytań w `apps/mobile/assets/content/tresc-5e1ac6f6d6-pl.db` (exam_drills), policzone niezależnie: q1 przedział od −20 do 50 wpisowych (P(wynik < 0) ≈ 20,1%); q2 przedział od −4 do 10bb/100 (dokładnie −4,01 do 9,96); q3 9604 bloki ≈ 960 tys. rąk; q8 wykładnik 2,50, RoR ≈ 8,2%.
  - Źródło wzoru RoR otwarte przez `curl -sL` i sprawdzone `grep`em (sekcja niżej).

## Tabela

Oparcie „zdanie z pytania” oznacza zdanie obecne w tym samym pytaniu już w 70fdf40 (`git show 70fdf40:content/pl/exams/m12.yaml`).

| Plik:linia (pytanie) | Zdanie | Oparcie (reguła/rejestr/rachunek/zdanie z pytania + cytat) | Werdykt | Uwagi / minimalna poprawka |
|---|---|---|---|---|
| content/pl/exams/m12.yaml:9 (q1) | „Wynik oczekiwany to tylko średnia: rzeczywisty wynik może być daleko od niej, a wygrywający gracz może skończyć nawet na minusie.” | Zdanie z pytania, opcja 2: „… to wynik oczekiwany, czyli średnia. … więc rzeczywisty wynik może być daleko od średniej.”; opcja 3: „Wygrywający gracz może skończyć na minusie: przy tych parametrach dolna granica przedziału to ok. {{n:exam.m12.ci.low.bi}}”. Rachunek: ci.low.bi = 15 − 35 = −20 wpisowych; P(wynik < 0) = Φ(−15/17,9) ≈ 20%. Reguła R-M12-001: „liczysz przedział: winrate ± 1,96 × SD ÷ √(liczba rąk ÷ 100)”. | POPARTE | „Nawet na minusie” zgodne z dolną granicą −20. „Tylko” to nacisk, nie nowa treść. Brak poprawki. |
| content/pl/exams/m12.yaml:9 (q1) | „Rachunek: oczekujesz … ≈ ± {{n:exam.m12.ci.half.bi}}.” | Tekst rachunku z 70fdf40 bez zmian poza słowem „Rachunek:” i małą literą; klucze {{n:}} zgodne (skrypt BX). | POPARTE | Brak. |
| content/pl/exams/m12.yaml:18 (q2) | „{{n:exam.m12.hands.k}} tys. rąk to dla winrate mała próba: po niej nie wiesz nawet, czy wygrywasz.” | Zdanie z pytania, opcja 2: „50 tys. rąk to dla winrate mała próba: przedział 95% sięga od ok. −4 do ok. 10bb/100, więc obejmuje też grę na minusie.”; poprawna opcja w 70fdf40, ostatnie zdanie: „Po {{n:exam.m12.hands.k}} tys. rąk nie wiesz nawet, czy wygrywasz.” Rachunek: dolna granica 3 − 1,96 × 80/√500 = −4,01 < 0. R-M12-001 („nawet po 100 tys. rąk przedział 95% ma ok. ± …”). | POPARTE | Zdanie przeniesione na początek, sens bez zmian. Brak poprawki. |
| content/pl/exams/m12.yaml:18 (q2) | „Rachunek: błąd winrate to SD ÷ √(bloki) = … ≈ ± {{n:exam.m12.ci.wr}}.” | Rachunek z 70fdf40 bez zmian (klucze zgodne). | POPARTE | Brak. |
| content/pl/exams/m12.yaml:27 (q3) | „Wyższe {{t:standard-deviation\|odchylenie}} wymaga dużo większej próby: stoi we wzorze w kwadracie, a błąd maleje dopiero z pierwiastkiem z liczby rąk.” | Poprawna opcja w 70fdf40: „Wyższe odchylenie wymaga dużo większej próby.”; opcja 2: „Odchylenie stoi we wzorze w kwadracie…”; opcja 3: „Błąd maleje dopiero z pierwiastkiem z liczby rąk.”; R-M12-003 because: „błąd oszacowania maleje z pierwiastkiem z liczby rąk: potrzebne bloki po 100 rąk = (1,96 × SD ÷ dokładność)²”. Rachunek: 9604 vs 6146,56 bloków (×1,56). | POPARTE | Oba uzasadnienia po dwukropku wynikają ze wzoru reguły; „dużo większej” było już w 70fdf40. Brak poprawki. |
| content/pl/exams/m12.yaml:27 (q3) | „Rachunek: bloki = (…)² = … ≈ {{n:exam.m12.need.blocks}}, czyli ok. {{n:exam.m12.need.hands.k}} tys. rąk.” | Rachunek z 70fdf40 bez zmian (klucze zgodne). | POPARTE | Brak. |
| content/pl/exams/m12.yaml:73 (q8) | „Dodatni winrate nie chroni przed {{t:variance\|wariancją}}: ryzyko utraty bankrollu maleje wykładniczo z bankrollem, …” | Opcja 2 (70fdf40): „Dodatni winrate nie chroni przed wariancją.”; opcja 3: „Ryzyko maleje wykładniczo z bankrollem.”; R-M12-009: „RoR = e^(−2 × winrate × bankroll ÷ SD²)” (wykładnicza zależność od BR, szczebel 1). Termin `variance` istnieje w `content/terms.yaml:942`. | POPARTE | Brak. |
| content/pl/exams/m12.yaml:73 (q8) | „… ale przy niskim winrate zostaje wyraźnie większe od zera.” | Opcja 2 (70fdf40): „**Przy tym bankrollu i winrate** ryzyko to ok. {{n:exam.m12.ror}}: wyraźnie większe od zera.”; q10 opcja 2: „Przy niższym winrate ten sam bankroll daje większe ryzyko.” Rachunek przy liczbach zadania: 40 wpisowych → 8,2% (zgodne z „wyraźnie większe od zera”). | CZĘŚCIOWO | Zdanie gubi zastrzeżenie „przy tym bankrollu” ze źródła i po „ale” (kontrast z „maleje wykładniczo z bankrollem”) czyta się jako ogólna zasada: przy niskim winrate ryzyko zostaje wyraźnie > 0 bez względu na bankroll. Ten sam wzór przy winrate zadania (2bb/100, SD 80) daje dla 100 wpisowych e^(−6,25) ≈ 0,19%, dla 60 wpisowych ≈ 2,4%. Kierunek bezpieczny (zawyża, nie uspokaja), ale zdanie mówi więcej niż oparcie. Minimalna poprawka: „…, ale przy niskim winrate i takim bankrollu jak tutaj zostaje wyraźnie większe od zera.” (albo „przy tym winrate i bankrollu”, jak w opcji 2). |
| content/pl/exams/m12.yaml:73 (q8) | „Rachunek (przybliżenie przy stałym winrate i SD): wykładnik 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × … = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.” | R-M12-009 then: „to przybliżenie przy stałym winrate i SD”; rejestr R-M12-009, uwagi: „Wzór to przybliżenie przy stałym, znanym winrate i SD”; źródło (curl, niżej): „For cash games with a constant win rate and standard deviation, the closed-form approximation”. Rachunek: 2 × 2 × 4000 / 6400 = 2,50; e^(−2,50) = 8,21% (rachunek_m12.py: „RoR wr2/40 [%]: wyliczone 8.2085, cytat 8.21”). | POPARTE | Dopisek zastrzeżenia zgodny z regułą i źródłem; przesuwa brzmienie na stronę bezpieczną (nie przedstawia 8,2% jako dokładnej wartości). Brak poprawki. |

Wspólna kontrola par sąsiednich zdań: w q1, q2, q3 zdanie sensu i rachunek razem nie dają nowego wniosku (rachunek jest tym samym co w 70fdf40, zdanie sensu powtarza zdania z dystraktorów). W q8 para „maleje wykładniczo z bankrollem, ale przy niskim winrate zostaje wyraźnie większe od zera” jest jedynym miejscem, gdzie połączenie daje uogólnienie bez oparcia (wiersz CZĘŚCIOWO).

Poprawna odpowiedź, klucze {{n:}}, rachunek: bez zmian we wszystkich 4 pytaniach (skrypt BX: „klucze ZGODNE, poprawna ZGODNA”; ręczne porównanie diffu: zmienione tylko pola `why` opcji `correct: true`; zestaw kluczy {{n:}} w każdym `why` identyczny; doszedł jedynie termin {{t:variance|wariancją}} w q8, już używany w opcji 2 tego pytania).

## Źródło wzoru q8 (R-M12-009)

- Adres: https://www.primedope.com/risk-of-ruin-formula-for-poker-players/
- Odczyt: 2026-11-10, `curl -sL` → HTTP 200, 48 459 B; sprawdzone `grep`em na surowym HTML.
- Dosłowne fragmenty:
  - Wzór i zastrzeżenie (HTML l. 467–469):
    ```
    <h2 id="the-formula">The Formula</h2>
    <p>For cash games with a constant win rate and <a href="/poker-glossary/#standard-deviation" class="pd-gloss">standard deviation</a>, the closed-form approximation:</p>
    <p><strong>RoR = e^(-2 x WR x BR / SD^2)</strong></p>
    ```
  - Lista założeń (HTML l. 567–571, po usunięciu znaczników):
    ```
    The closed-form formula assumes:
    Constant win rate. Your actual win rate varies as your skill improves, the player pool changes, and you tilt.
    Normally distributed results. Poker results approach a normal distribution over large samples but have slightly fatter tails.
    No moving down in stakes. The formula assumes you play the same stake until ruin or success. Moving down when your bankroll drops reduces actual risk of ruin significantly.
    ```
- Wniosek: cytat z rejestru („the closed-form approximation: RoR = e^(-2 x WR x BR / SD^2)”) i zastrzeżenie o stałym winrate i SD są na stronie. Założenie „No moving down in stakes” odpowiada warunkowi z promptu q8 („jeśli nigdy nie zejdziesz stawkę”).
- Strona bezpieczna: nowe brzmienie nie uspokaja ani nie zaniża ryzyka: mówi, że dodatni winrate nie chroni, nazywa wynik przybliżeniem i podaje 8,2% jako „wyraźnie większe od zera”. Jedyna nieścisłość (wiersz CZĘŚCIOWO) zawyża ogólność ryzyka, nie zaniża go. Uwaga bez wpływu na werdykt: strona wymienia też „slightly fatter tails”, które mogą podnosić rzeczywiste ryzyko ponad wzór; tekst tego nie wyklucza, bo nie twierdzi, w którą stronę przybliżenie się myli.

## Twierdzenia krytyczne z unieważnionym przeglądem

- **R-M12-009**: używane w m12.exam.q8 (l. 70–75) i q10 (l. 88–92). q10 bez zmian (l. 88–92 identyczne z 70fdf40). W q8 zmieniona tylko l. 73 (sprawdzona w tabeli: rachunek i klucze bez zmian, dopisane zastrzeżenie zgodne z regułą i źródłem; jedno zdanie CZĘŚCIOWO, strona bezpieczna). Treść reguły (`content/pl/rules.yaml:1050–1057`) i wpis rejestru bez zmian. Przegląd z 2026-11-04 aktualny poza zdaniem wskazanym w tabeli.
- **R-M12-011**: używane w m12.exam.q9 (l. 79–84). Linie 79, 80, 82, 83 identyczne z 70fdf40; diff nie dotyka q9. Zdania bez zmian; przegląd z 2026-11-04 merytorycznie aktualny.
- **n:br.bi.base**: w m12.yaml tylko l. 83 (q9, opcja 2). Linia bez zmian; przegląd aktualny.
- **n:br.bi.beginner**: w m12.yaml l. 80 i 82 (q9). Linie bez zmian; przegląd aktualny.
- **n:ror.two**: w m12.yaml tylko l. 73 (q8, poprawna opcja), czyli w zmienionej linii. Zdanie z kluczem zmieniło się tylko w otoczeniu: „Wykładnik:” → „Rachunek (przybliżenie przy stałym winrate i SD): wykładnik”; sam wzór „2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}” bez zmian. Wartość 2 potwierdzona w źródle („e^(-2 x WR x BR / SD^2)”, odczyt 2026-11-10) i rachunkiem MC (rachunek_m12.py: „MC wr3/30 nie powyżej wzoru”). Przegląd aktualny.

## Podsumowanie

Rozbieżności: **1**.

1. content/pl/exams/m12.yaml:73 (m12.exam.q8, poprawna opcja): zdanie „… ale przy niskim winrate zostaje wyraźnie większe od zera” gubi zastrzeżenie „przy tym bankrollu” z opcji 2 i czyta się jak ogólna zasada; wzór przy 2bb/100 i 100 wpisowych daje ok. 0,19%. CZĘŚCIOWO, kierunek bezpieczny (nie uspokaja). Minimalna poprawka: dopisać „i takim bankrollu jak tutaj” (albo „przy tym winrate i bankrollu”).

Problemów bezpieczeństwa (zaniżenie ryzyka, uspokajanie): 0. Zmian w poprawnych odpowiedziach, kluczach {{n:}} i rachunkach: 0.

Obserwacja poza zakresem (nie liczona): w drzewie roboczym `apps/mobile/assets/content/tresc-5e1ac6f6d6-pl.db` zawiera nowe `why` dla q1, ale stare dla q2, q3, q8 (zbudowane w trakcie zmian). Przed commitem wydania uruchomić `pnpm content:build` na HEAD.

## Ponowne sprawdzenie poprawki q8

- Data: 2026-11-10. Weryfikator ten sam co wyżej (niezależny subagent, nie autor).
- Zakres: tylko content/pl/exams/m12.yaml:73 (m12.exam.q8, poprawna opcja). `git diff -- content/pl/exams/m12.yaml` (drzewo robocze względem HEAD 2203fa6) pokazuje jedną zmienioną linię, l. 73.
- Zmiana: „… ale przy niskim winrate zostaje wyraźnie większe od zera.” → „… ale przy niskim winrate i takim bankrollu jak tutaj zostaje wyraźnie większe od zera.” Reszta linii (zdanie o wariancji, zastrzeżenie przybliżenia, rachunek, klucze {{n:}}) bez zmian.
- Oparcie: opcja 2 tego pytania: „Przy tym bankrollu i winrate ryzyko to ok. {{n:exam.m12.ror}}: wyraźnie większe od zera.” Rachunek przy liczbach zadania: e^(−2,50) ≈ 8,2%. Zdanie dotyczy już tylko bankrollu z zadania (40 wpisowych), więc nie jest ogólną zasadą. Kontrprzykład ze 100 wpisowymi (≈ 0,19%) go nie dotyczy. Brzmienie nadal po stronie bezpiecznej.
- Skrypt: `node docs/tresci/narzedzia/bx-porownaj-egzamin.mjs 70fdf40 content/pl/exams/m12.yaml m12.exam.q1:0 m12.exam.q2:0 m12.exam.q3:0 m12.exam.q8:0` → dla l. 73 „klucze ZGODNE, poprawna ZGODNA, pierwsze zdanie SENS”, niezgodności: 0.
- Werdykt zdania: POPARTE (było CZĘŚCIOWO).
- Końcowa liczba rozbieżności: **0**.
