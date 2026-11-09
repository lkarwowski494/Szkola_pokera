# Glosariusz przekładu

Wygenerowany z `content/terms.yaml` (`node docs/lokalizacja/narzedzia/glosariusz.mjs`; nie edytuj ręcznie). Rola 09, K4 (`plan-09.md` §5 pkt 1).

Zasady:
- Nazwa angielska pochodzi z przeczytanego źródła (kolumna „Źródło”, pełny cytat w `terms.yaml`, pole `source`). Tłumacz nie wymyśla nazwy; brak terminu w źródle to pytanie `[DO USTALENIA]` do roli 06.
- W tekście en znacznik `{{t:klucz}}` daje samą nazwę angielską, bez nawiasu (D-287); polska nazwa będąca skrótem (UTG, SPR, ICM) zostaje skrótem. Forma `{{t:klucz|forma}}` w przekładzie to postać w języku docelowym (np. liczba mnoga „flushes”); klucz bez zmian.
- Pozostałe języki (fala 1, K-05): do decyzji 09 z 06; robocze założenie jak w Treningu — nazwa angielska.
- Nie tłumaczyć: nazwy własne (solver, tytuły książek, autorzy), notacja kart `[[As Kd]]`, skróty pozycji i akcji przy stole.
- Definicje (kolumna „Znaczenie”) są po polsku; ich przekład to osobna jednostka K5 (ćwiczenie „definicja → termin” w en czeka na nią, D-293).

Terminów: 162.

| Klucz | Termin (pl) | Znaczenie | Źródło | Przekład en | Uwagi |
|---|---|---|---|---|---|
| `royal-flush` | poker królewski | Najwyższy układ w pokerze: as, król, dama, walet i dziesiątka w jednym kolorze, np. A♠ K♠ Q♠ J♠ T♠. | https://en.wikipedia.org/wiki/List_of_poker_hands | royal flush | — |
| `straight-flush` | poker | Pięć kolejnych kart w jednym kolorze, np. 5♥ 6♥ 7♥ 8♥ 9♥. Najwyższa odmiana (od asa do dziesiątki) ma osobną nazwę i jest najsilniejszym układem w grze. | https://en.wikipedia.org/wiki/List_of_poker_hands | straight flush | — |
| `four-of-a-kind` | kareta | Cztery karty tej samej wysokości, np. cztery siódemki. Przy dwóch karetach tej samej wysokości wygrywa wyższa piąta karta (kicker). | https://en.wikipedia.org/wiki/List_of_poker_hands | four of a kind | inne: quads |
| `full-house` | full | Trójka i para w jednym układzie, np. trzy damy i dwie piątki. Przy dwóch fullach wygrywa wyższa trójka. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | full house | inne: boat |
| `flush` | kolor | Pięć kart tego samego symbolu (♠, ♥, ♦ albo ♣), które nie idą po kolei. Przy dwóch takich układach wygrywa ten z wyższą najwyższą kartą, a przy równej – z wyższą kolejną. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | flush | — |
| `straight` | strit | Pięć kolejnych kart, nie wszystkie w jednym kolorze, np. 5-6-7-8-9. As może być najwyższą (A-K-Q-J-T) albo najniższą kartą (A-2-3-4-5). | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | straight | — |
| `three-of-a-kind` | trójka | Trzy karty tej samej wysokości i dwie inne. W hold'emie ma dwie odmiany o osobnych nazwach: set, gdy para jest w ręce, a trzecia karta na stole, oraz trips, gdy para leży na stole, a trzecia karta jest w ręce. | https://en.wikipedia.org/wiki/List_of_poker_hands | three of a kind | — |
| `set` | set | Trójka zbudowana z pary w ręce i jednej karty na stole, np. 7♣ 7♦ na flopie K-7-2. | https://gtowizard.com/en/glossary/ | set | — |
| `two-pair` | dwie pary | Dwie różne pary i piąta karta, np. K-K-8-8-3. Remis rozstrzyga najpierw wyższa para, potem niższa, na końcu piąta karta. | https://en.wikipedia.org/wiki/List_of_poker_hands | two pair | — |
| `pair` | para | Dwie karty tej samej wysokości i trzy inne, np. dwie dziewiątki. Słabszy jest tylko układ wysokiej karty. | https://en.wikipedia.org/wiki/List_of_poker_hands | pair | inne: one pair |
| `high-card` | wysoka karta | Układ bez pary ani lepszej kombinacji; o sile decyduje najwyższa karta, a przy remisie kolejne. | https://en.wikipedia.org/wiki/List_of_poker_hands | high card | inne: no pair |
| `kicker` | kicker | Najwyższa karta spoza układu, która rozstrzyga remis. Przykład: para asów z królem wygrywa z parą asów z damą. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | kicker | — |
| `wheel` | wheel | Najniższy strit: A-2-3-4-5, w którym as liczy się jako najniższa karta. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | wheel | — |
| `check` | czekanie | Granie dalej bez dokładania żetonów, możliwe tylko wtedy, gdy nie musisz nic dopłacać: w tej rundzie licytacji nikt jeszcze nie postawił (przed flopem tak może zagrać duży blind, gdy nikt nie przebił). Nie mylić ze „sprawdzam” – to call, czyli dołożenie do zakładu rywala. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | check | — |
| `bet` | zakład | Pierwsze postawienie żetonów w rundzie licytacji, w której nikt jeszcze nie stawiał (w szerszym sensie zakładem nazywa się każde wstawienie żetonów do puli). | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | bet | — |
| `call` | sprawdzenie | Dołożenie do puli tyle, ile wynosi zakład lub przebicie rywala, żeby grać dalej. Nie mylić z „czekam” – to check, czyli granie dalej bez stawiania, gdy nikt nie postawił. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | call | — |
| `raise` | przebicie | Podniesienie stawki ponad zakład rywala; pozostali muszą dołożyć różnicę, przebić dalej albo spasować. W polskich tekstach także „podbicie”. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | raise | — |
| `fold` | pas | Rezygnacja z rozdania: oddajesz karty i tracisz to, co już włożyłeś do puli. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | fold | — |
| `check-raise` | check-raise | Najpierw czekasz, a gdy rywal postawi, przebijasz go w tej samej rundzie licytacji. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | check-raise | — |
| `all-in` | all-in | Postawienie wszystkich swoich żetonów. Od każdego rywala możesz wtedy wygrać najwyżej tyle, ile sam włożyłeś; o resztę gra się w puli bocznej. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | all-in | — |
| `pot` | pula | Wszystkie żetony postawione w bieżącym rozdaniu. Zabiera je gracz z najlepszym układem na showdownie (przy pulach bocznych osobno o każdą pulę) albo gracz, przy którym wszyscy spasowali. | https://gtowizard.com/en/glossary/ | pot | — |
| `side-pot` | pula boczna | Osobna pula, która powstaje, gdy ktoś gra all-in: grają o nią tylko gracze, którzy włożyli więcej niż gracz all-in, więc on sam nie może jej wygrać. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | side pot | — |
| `split-pot` | podział puli | Sytuacja, w której pulę dzielą gracze z równymi układami, np. gdy obaj grają ten sam strit leżący na stole. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | split pot | — |
| `playing-the-board` | gra na stole | Sytuacja, w której Twój najlepszy pięciokartowy układ to same karty wspólne; karty własne nic nie dodają, więc w najlepszym razie dzielisz pulę. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | playing the board | inne: play the board |
| `board` | stół | Odkryte karty wspólne na środku (flop, turn, river), z których korzystają wszyscy gracze. W tym znaczeniu „stół” to karty, nie miejsce gry (przy stole, stół finałowy). | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | board | — |
| `community-cards` | karty wspólne | Karty wykładane odkryte na środek, których każdy gracz może użyć do swojego układu; w hold'emie jest ich pięć. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | community cards | — |
| `hole-cards` | karty własne | Dwie zakryte karty, które w hold'emie dostajesz na początku rozdania; widzisz je tylko Ty. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | hole cards | inne: pocket cards |
| `small-blind` | mały blind | Mniejsza obowiązkowa stawka wpłacana przed rozdaniem przez gracza na lewo od Buttona (przy dwóch graczach przez samego Buttona); tak nazywa się też to miejsce przy stole. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | small blind | skrót SB |
| `big-blind` | duży blind | Większa obowiązkowa stawka wpłacana przed rozdaniem przez drugiego gracza na lewo od Buttona (przy dwóch graczach przez gracza naprzeciw Buttona); tak nazywa się też to miejsce. Służy też za jednostkę wielkości stacków i wyników. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | big blind | skrót BB |
| `chips` | żetony | Krążki, którymi gra się przy stole; w grze gotówkowej oznaczają pieniądze, w turnieju punkty turniejowe. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | chips | — |
| `stack` | stack | Wszystkie żetony, które gracz ma przed sobą; zwykle podaje się je w dużych blindach (np. 100 dużych blindów). | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | stack | — |
| `street` | ulica | Żargonowa nazwa rundy licytacji: preflop, flop, turn i river to cztery ulice. Przykład: „value na trzech ulicach” to zakłady dla wartości na flopie, turnie i riverze. | https://gtowizard.com/en/glossary/ | street | — |
| `betting-round` | runda licytacji | Etap rozdania, w którym gracze po kolei czekają, stawiają, sprawdzają, przebijają albo pasują; w hold'emie są cztery: preflop, flop, turn i river. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | betting round | — |
| `preflop` | preflop | Pierwsza runda licytacji: po rozdaniu kart własnych, zanim na stół trafi flop. | https://gtowizard.com/en/glossary/ | preflop | — |
| `flop` | flop | Pierwsze trzy karty wspólne wykładane naraz po licytacji preflop; tak nazywa się też druga runda licytacji. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | flop | — |
| `turn` | turn | Czwarta karta wspólna i trzecia runda licytacji. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | turn | — |
| `river` | river | Piąta, ostatnia karta wspólna i ostatnia runda licytacji przed showdownem. | https://gtowizard.com/en/glossary/ | river | — |
| `showdown` | showdown | Odkrycie kart po ostatniej licytacji, gdy w grze zostało co najmniej dwóch graczy; pulę zabiera najlepszy układ. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | showdown | — |
| `position` | pozycja | Miejsce przy stole względem Buttona, które wyznacza kolejność działania. Kto działa później, ten przed decyzją widzi więcej zagrań rywali. | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | position | — |
| `in-position` | z pozycją | Sytuacja gracza, który po flopie działa jako ostatni, więc przed swoją decyzją widzi zagranie rywala. | https://gtowizard.com/en/glossary/ | in position | skrót IP |
| `out-of-position` | bez pozycji | Sytuacja gracza, który po flopie działa przed rywalem, więc decyduje, nie znając jego zagrania. | https://gtowizard.com/en/glossary/ | out of position | skrót OOP |
| `early-position` | wczesna pozycja | Pierwsze miejsca do działania przed flopem (np. UTG); za Tobą jest jeszcze wielu graczy. | https://gtowizard.com/en/glossary/ | early position | skrót EP |
| `late-position` | późna pozycja | Miejsca, które działają jako ostatnie: Button i miejsca tuż przed nim, zwłaszcza Cutoff. | https://gtowizard.com/en/glossary/ | late position | — |
| `utg` | UTG | Pierwszy gracz do działania przed flopem, siedzący bezpośrednio na lewo od dużego blinda. | https://gtowizard.com/en/glossary/ | under the gun | w tekście en domyślnie „UTG” |
| `hijack` | Hijack | Miejsce bezpośrednio przed Cutoffem, czyli drugie na prawo od Buttona. | https://gtowizard.com/en/glossary/ | hijack | skrót HJ |
| `cutoff` | Cutoff | Miejsce bezpośrednio na prawo od Buttona, działające tuż przed nim. | https://gtowizard.com/en/glossary/ | cutoff | skrót CO |
| `button` | Button | Miejsce rozdającego, oznaczone krążkiem „dealer”. Po flopie działa jako ostatnie w każdej rundzie licytacji. | https://gtowizard.com/en/glossary/ | button | skrót BTN |
| `outs` | out | Karta, która jeszcze jest w talii i poprawi Twoją rękę, zwykle uzupełniając draw. Przykład: przy drawie do koloru outami są pozostałe karty w Twoim kolorze. | https://gtowizard.com/en/glossary/ | out | inne: outs |
| `draw` | draw | Ręka, która jeszcze nie jest silnym układem, ale może nim zostać po kolejnych kartach wspólnych, np. gdy brakuje jednej karty do koloru albo strita. | https://gtowizard.com/en/glossary/ | draw | — |
| `flush-draw` | draw do koloru | Cztery karty w jednym kolorze (w ręce i na stole razem); brakuje jednej, żeby mieć kolor. | https://gtowizard.com/en/glossary/ | flush draw | — |
| `straight-draw` | draw do strita | Cztery karty, którym brakuje jednej do strita. Odmiany: OESD (brakuje karty z jednego z dwóch końców) i gutshot (brakuje karty w środku). | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | straight draw | — |
| `oesd` | OESD | Skrót od open-ended straight draw: draw do strita z czterech kolejnych kart, który uzupełnia karta z obu końców, np. 5-6-7-8 czeka na czwórkę albo dziewiątkę. | https://gtowizard.com/en/glossary/ | open-ended straight draw | inne: outside straight draw, double-ended straight draw; w tekście en domyślnie „OESD” |
| `gutshot` | gutshot | Draw do strita, któremu brakuje jednej konkretnej wysokości w środku, np. 5-6-8-9 czeka tylko na siódemkę. | https://gtowizard.com/en/glossary/ | gutshot | inne: inside straight draw |
| `backdoor` | backdoor | Draw na flopie, który potrzebuje dwóch pasujących kart z rzędu, na turnie i na riverze, np. trzy karty w kolorze po flopie. | https://gtowizard.com/en/glossary/ | backdoor | — |
| `pot-odds` | pot odds | Stosunek kwoty, którą musisz dołożyć, do puli, którą możesz wygrać (razem z zakładem rywala). Mówi, jak często musisz wygrywać, żeby sprawdzenie się opłacało. | https://gtowizard.com/en/glossary/ | pot odds | — |
| `implied-odds` | implied odds | Pot odds powiększone o żetony, które spodziewasz się wygrać na kolejnych ulicach, jeśli trafisz swój układ. | https://gtowizard.com/en/glossary/ | implied odds | — |
| `equity` | equity | Twoja szansa na wygranie puli, gdyby wszystkie pozostałe karty wyłożono bez dalszej licytacji; zwykle w procentach. | https://gtowizard.com/en/glossary/ | equity | — |
| `equity-realization` | realizacja equity | W jakim stopniu ręka zamienia swoje equity na wygraną, gdy licytacja trwa dalej (może zrealizować mniej albo więcej niż swoje equity); zależy m.in. od pozycji i od tego, jak łatwo rękę rozegrać. | https://gtowizard.com/en/glossary/ | equity realization | skrót EQR |
| `expected-value` | wartość oczekiwana | Średni wynik zagrania, gdyby powtarzać je wiele razy. Zagranie, które średnio daje plus, zarabia w długim okresie, nawet jeśli tym razem przegra. | https://gtowizard.com/en/glossary/ | expected value | skrót EV |
| `combo` | kombinacja | Jedno konkretne ułożenie dwóch kart z kolorami, np. A♠ K♥. Liczenie takich ułożeń pokazuje, ile danych rąk naprawdę jest w zakresie. | https://gtowizard.com/en/glossary/ | combo | inne: combination |
| `range` | zakres | Zbiór wszystkich rąk, które gracz może mieć w danej sytuacji, albo rąk, z którymi zagrałby dane zagranie. | https://gtowizard.com/en/glossary/ | range | — |
| `mixed-hand` | ręka mieszana | Ręka, z którą strategia równowagi wybiera raz jedno, raz drugie zagranie (np. czasem przebicie, czasem sprawdzenie); oba zagrania są poprawne. W polskich tekstach mówi się, że rękę gra się mieszaną strategią. | https://blog.gtowizard.com/heads-up-exploiting-sbs-preflop-mistakes/ | mixing hand | inne: mixed strategy |
| `open` | otwarcie | Pierwsze wejście do puli przed flopem przez przebicie, gdy wszyscy przed Tobą spasowali. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | open | inne: open-raise |
| `suited` | w kolorze | Dwie karty własne w tym samym kolorze, np. A♥ K♥ (zapis AKs). | https://gtowizard.com/en/glossary/ | suited | — |
| `offsuit` | w różnych kolorach | Dwie karty własne, każda innego koloru, np. A♥ K♣ (zapis AKo). | https://gtowizard.com/en/glossary/ | offsuit | — |
| `pocket-pair` | pocket para | Para z dwóch kart własnych, np. 8♣ 8♦ przed flopem. | https://gtowizard.com/en/glossary/ | pocket pair | — |
| `connectors` | konektory | Karty własne o sąsiednich wysokościach, np. 8-7 lub 9-8; łatwiej z nich ułożyć strita. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | connectors | inne: connector |
| `3-bet` | 3-bet | Pierwsze przebicie otwarcia przed flopem; nazwa liczy duży blind jako pierwszy zakład, a otwarcie jako drugi. | https://gtowizard.com/en/glossary/ | 3-bet | inne: three-bet |
| `4-bet` | 4-bet | Przebicie 3-betu, czyli czwarty zakład w rundzie licytacji. | https://gtowizard.com/en/glossary/ | 4-bet | inne: four-bet |
| `limp` | limp | Wejście do puli przed flopem przez samo sprawdzenie dużego blinda, gdy nikt jeszcze nie przebił. | https://gtowizard.com/en/glossary/ | limp | — |
| `isolation` | izolacja | Przebicie po jednym lub kilku limpach, żeby zagrać z limperem (często słabszym graczem) jeden na jeden. | https://gtowizard.com/en/glossary/ | isolation raise | inne: iso |
| `texture` | tekstura | Charakter kart wspólnych: ile jest kolorów, czy karty są blisko siebie, czy leży para. Od tego zależy, jakie układy i drawy są możliwe. | https://gtowizard.com/glossary/board-texture/ | texture | inne: board texture |
| `dry` | suchy | Stół, na którym możliwych jest mało drawów i silnych układów, np. K♠ 7♦ 2♣. | https://gtowizard.com/glossary/board-texture/ | dry | — |
| `wet` | mokry | Stół, na którym możliwych jest wiele drawów i silnych układów, np. J♥ T♥ 8♣. | https://gtowizard.com/en/glossary/ | wet | — |
| `rainbow` | rainbow | Flop z trzema kartami w trzech różnych kolorach, więc na flopie nikt nie ma drawa do koloru. | https://gtowizard.com/en/glossary/ | rainbow | — |
| `two-tone` | dwukolorowy | Flop, na którym dwie karty są w jednym kolorze, więc możliwe są drawy do koloru. | https://gtowizard.com/en/glossary/ | two-tone | — |
| `monotone` | jednokolorowy | Flop z trzema kartami w jednym kolorze, więc kolor może już być ułożony. | https://gtowizard.com/en/glossary/ | monotone | — |
| `paired` | sparowany | Stół, na którym leży para (dwie karty tej samej wysokości), np. 8-8-3. | https://gtowizard.com/glossary/board-texture/ | paired | — |
| `connected` | połączony | Stół, na którym ktoś mógł już ułożyć strita, np. 9-8-7. | https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ | connected | — |
| `disconnected` | niepołączony | Stół z kartami odległymi od siebie, z którym trudno zbudować strita lub draw do strita, np. K-7-2. | https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ | disconnected | — |
| `semi-connected` | półpołączony | Stół, na którym są drawy do strita, ale strit nie jest jeszcze możliwy, np. T-8-3 (podział przyjęty w kursie). | https://blog.gtowizard.com/the-four-point-checklist-for-calling-turn-barrels/ | semi-connected | — |
| `wetness` | mokrość | Stopień, w jakim stół sprzyja drawom i silnym układom: od suchego do mokrego. W polskich tekstach mówi się też, jak bardzo stół jest skoordynowany. | https://blog.gtowizard.com/the-mechanics-of-c-bet-sizing/ | wetness | — |
| `top-pair` | najwyższa para | Para z najwyższą kartą na stole, np. K♠ Q♦ na flopie K-7-2. | https://gtowizard.com/en/glossary/ | top pair | — |
| `second-pair` | druga para | Para z drugą co do wysokości kartą na stole, np. 7♠ 6♠ na flopie K-7-2. | https://gtowizard.com/en/glossary/ | second pair | — |
| `overpair` | overpara | Pocket para wyższa od każdej karty na stole, np. Q-Q na flopie J-7-2. | https://gtowizard.com/en/glossary/ | overpair | — |
| `c-bet` | c-bet | Zakład kontynuacyjny: zakład gracza, który był agresorem w poprzedniej rundzie, np. zakład na flopie po otwarciu preflop. | https://gtowizard.com/en/glossary/ | c-bet | inne: continuation bet |
| `aggressor` | agresor | Gracz, który jako ostatni stawiał lub przebijał w poprzedniej rundzie licytacji. | https://gtowizard.com/en/glossary/ | aggressor | — |
| `initiative` | inicjatywa | Rola ostatniego agresora: to on zwykle wykonuje następny zakład. | https://blog.gtowizard.com/when-checking-the-nuts-beats-betting-them/ | initiative | inne: betting initiative, betting lead |
| `range-advantage` | przewaga zakresu | Sytuacja, w której zakres jednego gracza ma na danym stole łącznie większe equity niż zakres rywala. | https://gtowizard.com/en/glossary/ | range advantage | — |
| `nuts-advantage` | przewaga nutsów | Sytuacja, w której jeden gracz ma w zakresie proporcjonalnie więcej najsilniejszych rąk niż rywal. | https://gtowizard.com/en/glossary/ | nuts advantage | — |
| `nuts` | nuts | Najsilniejsza możliwa ręka na danym stole w danej chwili. Przykład: na stole K♥ 9♥ 4♥ 2♣ jest nią kolor z asem kier. | https://gtowizard.com/en/glossary/ | nuts | — |
| `polarized` | spolaryzowany | O zakresie: złożony głównie z bardzo silnych rąk i z blefów, prawie bez rąk średnich. | https://gtowizard.com/en/glossary/ | polarized | — |
| `polarization` | polaryzacja | Budowanie zakresu ze skrajności: silnych rąk dla wartości i blefów, bez rąk średnich. | https://blog.gtowizard.com/range-morphology/ | polarization | — |
| `linear` | liniowy | O zakresie: zbudowany od góry, z najsilniejszych rąk w dół, bez osobnej grupy blefów. W polskich tekstach spotyka się pokrewne „merged range” (zakres niespolaryzowany); według opublikowanych analiz solvera merged to kształt pośredni między tym zakresem a spolaryzowanym. | https://gtowizard.com/en/glossary/ | linear | — |
| `condensed` | skondensowany | O zakresie: bez najsilniejszych rąk (ograniczony od góry) i złożony głównie ze średnich rąk; przeciwieństwo spolaryzowanego. | https://gtowizard.com/en/glossary/ | condensed | inne: depolarized |
| `value` | wartość | Zakładanie z silną ręką po to, żeby rywal sprawdził zakład słabszą ręką. | https://gtowizard.com/en/glossary/ | value | — |
| `value-bet` | value bet | Pojedynczy zakład dla wartości: stawiany silną ręką po to, żeby sprawdziły go słabsze ręce. | https://gtowizard.com/en/glossary/ | value bet | — |
| `bluff` | blef | Zakład ze słabą ręką, która raczej nie wygra na showdownie, żeby rywal spasował lepszą rękę. | https://gtowizard.com/en/glossary/ | bluff | — |
| `semi-bluff` | semi-blef | Zakład z ręką jeszcze słabą, ale z szansą na poprawę (np. z drawem): wygrywasz, gdy rywal spasuje albo gdy trafisz. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | semi-bluff | — |
| `blocker` | bloker | Karta w Twojej ręce, która zmniejsza szansę, że rywal ma określone ręce. Przykład: z asem kier rywal nie może mieć koloru z asem kier. | https://gtowizard.com/en/glossary/ | blocker | — |
| `bluff-catcher` | bluff-catcher | Ręka, która pokonuje tylko blefy rywala, a przegrywa z jego zakładami dla wartości. | https://gtowizard.com/en/glossary/ | bluff catcher | — |
| `barrel` | barrel | Kolejny zakład w następnej rundzie licytacji po własnym zakładzie z poprzedniej rundy. | https://gtowizard.com/en/glossary/ | barrel | — |
| `second-barrel` | second barrel | Drugi zakład z rzędu: po c-becie na flopie gracz stawia znowu na turnie. | https://en.wikipedia.org/wiki/Glossary_of_poker_terms | second barrel | inne: double barrel |
| `probe-bet` | probe | Zakład na turnie gracza bez pozycji po tym, jak agresor preflop zaczekał na flopie zamiast zrobić c-bet. | https://gtowizard.com/en/glossary/ | probe bet | — |
| `donk-bet` | donk bet | Zakład gracza, który stawia, zanim agresor z poprzedniej rundy zdążył zagrać. | https://gtowizard.com/en/glossary/ | donk bet | — |
| `overbet` | overbet | Zakład po flopie większy niż cała pula. | https://gtowizard.com/en/glossary/ | overbet | — |
| `effective-stack` | efektywny stack | W rozdaniu dwóch graczy: mniejszy z ich stacków, czyli najwięcej, ile można realnie wygrać lub przegrać. Przy kilku graczach liczy się go osobno dla każdej pary. | https://gtowizard.com/en/glossary/ | effective stack | — |
| `spr` | SPR | Efektywny stack podzielony przez pulę na początku ulicy (do planu rozdania liczy się go na flopie); mówi, jak głębokie są stacki w stosunku do puli (im niższy SPR, tym szybciej wszystko trafia do puli). | https://gtowizard.com/en/glossary/ | stack-to-pot ratio | w tekście en domyślnie „SPR” |
| `mdf` | MDF | Najmniejsza część zakresu, którą trzeba bronić przed zakładem, żeby blef rywala ręką bez szans nie był automatycznie opłacalny. | https://gtowizard.com/en/glossary/ | minimum defense frequency | w tekście en domyślnie „MDF” |
| `alpha` | alpha | Jak często rywal musi spasować, żeby blef ręką bez szans wyszedł na zero; zależy od wielkości zakładu względem puli. | https://gtowizard.com/en/glossary/ | alpha | — |
| `variance` | wariancja | Rozrzut wyników wokół wartości oczekiwanej: nawet przy dobrej grze krótkie serie bywają mocno na minusie albo na plusie. | https://gtowizard.com/en/glossary/ | variance | — |
| `buy-in` | wpisowe | Kwota wejścia do turnieju albo do gry gotówkowej przy stole. | https://gtowizard.com/en/glossary/ | buy-in | — |
| `bankroll` | bankroll | Cały zapas przeznaczony wyłącznie na grę w pokera; w tej aplikacji liczony we wpisowych (buy-in), nie w pieniądzach. | https://gtowizard.com/en/glossary/ | bankroll | — |
| `tilt` | tilt | Stan, w którym emocje (złość, frustracja, euforia) pogarszają Twoje decyzje przy stole. | https://gtowizard.com/en/glossary/ | tilt | — |
| `winrate` | winrate | Średni wynik gracza na dłuższej próbie; w grach gotówkowych zwykle w bb/100, czyli dużych blindach na sto rozdań. | https://gtowizard.com/en/glossary/ | win rate | — |
| `downswing` | downswing | Okres wyraźnie gorszych wyników, zwykle większych strat, niż wynikałoby z umiejętności; przeciwieństwo upswingu. | https://gtowizard.com/en/glossary/ | downswing | — |
| `session` | sesja | Jedno posiedzenie przy pokerze, od rozpoczęcia do zakończenia gry. | https://gtowizard.com/en/glossary/ | session | — |
| `stakes` | stawka | Wysokość blindów w grze gotówkowej albo wpisowego w turnieju; „mikrostawki” to najniższe poziomy. | https://gtowizard.com/en/glossary/ | stakes | — |
| `standard-deviation` | odchylenie standardowe | Miara rozrzutu wyników (pierwiastek z wariancji); w pokerze zwykle podawana w bb/100. | https://gtowizard.com/en/glossary/variance/ | standard deviation | — |
| `risk-of-ruin` | ryzyko bankructwa | Prawdopodobieństwo, że kiedykolwiek stracisz cały bankroll, jeśli grasz dalej na tej samej stawce. | https://www.primedope.com/risk-of-ruin-formula-for-poker-players/ | risk of ruin | skrót RoR |
| `mental-game` | mental game | Psychologiczna strona pokera: radzenie sobie z tiltem, emocjami i koncentracją przy stole. | https://gtowizard.com/en/glossary/ | mental game | — |
| `tournament` | turniej | Forma gry, w której blindy rosną co pewien czas, a gra trwa, aż jeden gracz zbierze wszystkie żetony; nagrody dostają najwyżej sklasyfikowani. | https://gtowizard.com/en/glossary/ | tournament | — |
| `push-fold` | push/fold | Uproszczona strategia dla short stacków: przed flopem gra się albo all-in, albo pas. | https://gtowizard.com/en/glossary/ | push/fold | — |
| `shove` | push | Zagranie all-in, zwykle jako przebicie przed flopem. | https://gtowizard.com/en/glossary/ | shove | inne: jam, push |
| `icm` | ICM | Model, który przelicza turniejowe żetony na wartość pieniężną z uwzględnieniem struktury wypłat i stacków wszystkich graczy. | https://gtowizard.com/en/glossary/ | Independent Chip Model | w tekście en domyślnie „ICM” |
| `bubble` | bubble | Faza turnieju tuż przed miejscami płatnymi, gdy do nagród brakuje odpadnięcia kilku graczy. | https://gtowizard.com/en/glossary/ | bubble | — |
| `bubble-factor` | bubble factor | Wskaźnik z ICM: ile bardziej w turnieju boli przegrana niż cieszy wygrana tej samej liczby żetonów. | https://gtowizard.com/en/glossary/ | bubble factor | — |
| `cover` | pokrywać | Mieć co najmniej tyle żetonów co rywal. Gdy rywal Cię pokrywa, przegrany z nim all-in kończy Twój turniej. | https://blog.gtowizard.com/icm-basics/ | cover | — |
| `risk-premium` | risk premium | Dodatkowe equity ponad to, czego wymagają pot odds, potrzebne w turnieju do ryzyka all-in, bo przegrana kosztuje więcej, niż daje wygrana. | https://gtowizard.com/en/glossary/ | risk premium | — |
| `m-ratio` | M | Stack podzielony przez sumę blindów i ante w jednym rozdaniu: na ile pełnych okrążeń (orbit) wystarczy żetonów bez gry. | https://gtowizard.com/en/glossary/ | M-ratio | — |
| `red-zone` | strefa czerwona | Strefa bardzo niskiego M: zostaje głównie gra all-in albo pas. | https://en.wikipedia.org/wiki/M-ratio | red zone | — |
| `green-zone` | strefa zielona | Strefa wysokiego M: stack pozwala grać swobodnie, zachowawczo albo agresywnie. | https://en.wikipedia.org/wiki/M-ratio | green zone | — |
| `ante` | ante | Mała obowiązkowa wpłata do puli przed rozdaniem od wszystkich graczy (głównie w turniejach). | https://www.briggsoft.com/docs/pmavens/Rules_Roberts.htm | ante | — |
| `bb-ante` | big blind ante | Format ante, w którym zamiast wszystkich graczy ante za cały stół wpłaca gracz na dużym blindzie. | https://gtowizard.com/en/glossary/ | big blind ante | inne: BB ante |
| `fold-equity` | fold equity | Część wartości zagrania, która pochodzi z tego, że rywal może spasować. | https://gtowizard.com/en/glossary/ | fold equity | — |
| `gap-concept` | gap concept | Zasada, że do sprawdzenia otwarcia potrzeba silniejszej ręki niż do samego otwarcia. | https://gtowizard.com/en/glossary/ | gap concept | — |
| `chip-ev` | chip EV | Wartość oczekiwana zagrania liczona w żetonach, bez przeliczania ich na pieniądze (bez ICM). | https://gtowizard.com/en/glossary/ | chip EV | inne: cEV |
| `tournament-equity` | equity turniejowe | Twoja oczekiwana część puli nagród przy danej strukturze wypłat i stackach. W polskich tekstach to samo nazywa się „$EV”. | https://blog.gtowizard.com/icm-basics/ | tournament equity | — |
| `prize-pool` | pula nagród | Suma pieniędzy do podziału między nagrodzonych graczy turnieju. | https://blog.gtowizard.com/icm-basics/ | prize pool | — |
| `payout` | wypłata | Nagroda za konkretne miejsce w turnieju; wszystkie razem tworzą rozkład nagród. | https://gtowizard.com/en/glossary/ | payout | — |
| `pay-jump` | pay jump | Różnica wypłaty między sąsiednimi miejscami w turnieju; duże skoki zwiększają risk premium. | https://blog.gtowizard.com/icm-basics/ | pay jump | — |
| `final-table` | stół finałowy | Ostatni stół turnieju, przy którym gra się o najwyższe nagrody. | https://gtowizard.com/en/glossary/ | final table | skrót FT |
| `short-stack` | short stack | Stack mały w stosunku do blindów; w turniejach zwykle taki, przy którym zostaje niewiele dużych blindów. | https://gtowizard.com/en/glossary/ | short stack | — |
| `nash-equilibrium` | równowaga Nasha | Zestaw strategii, w którym żaden gracz nie zyska, zmieniając sam tylko swoją strategię. | https://gtowizard.com/en/glossary/ | Nash equilibrium | — |
| `overcall` | overcall | Sprawdzenie zakładu, który ktoś przed Tobą już sprawdził. | https://gtowizard.com/en/glossary/ | overcall | — |
| `heads-up` | heads-up | Gra jeden na jeden: przy stole albo w rozdaniu zostało tylko dwóch graczy. | https://gtowizard.com/en/glossary/ | heads up | — |
| `dead-money` | dead money | Żetony w puli od graczy, którzy nie mogą już jej wygrać, np. od tych, którzy spasowali. | https://gtowizard.com/en/glossary/ | dead money | — |
| `stack-off` | stack off | Włożyć do puli cały stack w jednym rozdaniu, czyli zagrać albo sprawdzić all-in. | https://gtowizard.com/en/glossary/ | stack off | — |
| `exploit` | eksploatacja | Świadome odejście od strategii bazowej, żeby wykorzystać konkretny błąd rywala albo całej populacji graczy. | https://gtowizard.com/en/glossary/ | exploit | inne: exploitative play |
| `hud` | HUD | Nakładka na stół w grze online, która pokazuje statystyki rywali z wcześniej rozegranych rozdań. | https://deepfold.co/en/blog/hud-stats-guide | heads-up display | w tekście en domyślnie „HUD” |
| `vpip` | VPIP | Statystyka HUD: w jakim odsetku rozdań gracz dobrowolnie wkłada pieniądze do puli przed flopem (sprawdza albo przebija). | https://gtowizard.com/en/glossary/ | voluntarily put in pot | w tekście en domyślnie „VPIP” |
| `pfr` | PFR | Statystyka HUD: w jakim odsetku rozdań gracz przebija przed flopem. | https://www.blackrain79.com/2019/10/what-is-good-pfr-in-poker.html | preflop raise | w tekście en domyślnie „PFR” |
| `wtsd` | WTSD | Statystyka HUD: jak często gracz, który zobaczył flop, dochodzi do showdownu. | https://pokercoaching.com/blog/poker-stats/ | went to showdown | w tekście en domyślnie „WTSD” |
| `nit` | nit | Bardzo ciasny gracz, który wchodzi do puli niemal wyłącznie z mocnymi rękami. | https://gtowizard.com/en/glossary/ | nit | — |
| `regular` | reg | Stały bywalec danej stawki, który rozgrywa dużo rąk; w kursie przeciwstawiany graczowi rekreacyjnemu. | https://bluffaces.com/calculators/mda/ | regular | — |
| `tag` | TAG | Styl ciasno-agresywny: mało rąk, ale grane agresywnie (zakłady i przebicia). | https://gtowizard.com/en/glossary/ | tight aggressive | w tekście en domyślnie „TAG” |
| `lag` | LAG | Styl luźno-agresywny: dużo rąk, grane agresywnie. | https://gtowizard.com/en/glossary/ | loose aggressive | w tekście en domyślnie „LAG” |
| `recreational` | gracz rekreacyjny | Gracz, który gra dla rozrywki i zwykle słabiej od stałych bywalców; w żargonie pogardliwie „fish”. | https://www.blackrain79.com/2019/10/what-is-good-pfr-in-poker.html | recreational player | inne: fish |
| `calling-station` | calling station | Pogardliwie o graczu, który bardzo często sprawdza, nawet słabymi rękami albo drawami. | https://gtowizard.com/en/glossary/ | calling station | — |
| `maniac` | maniak | Pogardliwie o graczu bardzo luźnym i agresywnym, który stawia i przebija z byle czym. | https://gtowizard.com/en/glossary/ | maniac | — |
| `rake` | rake | Prowizja, którą kasyno albo pokój online pobiera z puli za prowadzenie gry. | https://gtowizard.com/en/glossary/ | rake | — |
| `rake-cap` | limit rake'u | Najwyższa kwota rake'u, jaką pokój może pobrać z jednego rozdania. | https://gtowizard.com/en/glossary/ | rake cap | — |
