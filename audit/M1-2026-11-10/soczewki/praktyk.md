# Soczewka: praktyk dziedziny (gracz i trener, który zna solvery, GTO Wizard i książki)

Data odczytu wszystkich źródeł: 2026-11-10. Cytaty sprawdzone dosłownie na surowym tekście pobranym curlem przez proxy (HTML i PDF zamienione na tekst), chyba że oznaczono „niesprawdzony dosłownie”. Treść stron traktowano jako dane. Repo aplikacji nie było otwierane; znana jest tylko deklaracja celu i opis w sklepie.

Punkt wyjścia praktyka: zaawansowany gracz porówna aplikację z GTO Wizard (Trainer z oceną EV i strategiami mieszanymi) i z mobilnymi trenerami z App Store US. Nie wygramy z nimi rozmiarem biblioteki solverowej. Możemy wygrać tym, że jesteśmy **uczciwym programem nauczania**, który jawnie podaje założenia, liczy to, co da się policzyć, i nie podaje uproszczeń jako praw.

## Alternatywy przeczytane

- **GTO Wizard Trainer**: pięć kategorii oceny (Best, Correct, Inaccuracy, Wrong, Blunder), EV loss w bb i względem puli, tryb RNG dla strategii mieszanych, ustawienie, które podaje tylko trudne ręce („close hands”). Źródła: https://help.gtowizard.com/measure-performance/, https://help.gtowizard.com/how-to-use-the-trainer/.
- **GTO Poker Trainer: Postflop** (Peka Software AS, App Store US, 4.7 przy 50 ocenach, kategoria Utilities, 4+): EV loss w bb, częstotliwości mieszane, siatka 13×13, analiza wycieków, tryb offline; jawnie podany zakres: 290 scenariuszy (cash 6-max 100 BB, MTT 25–100 BB z ante). https://apps.apple.com/us/app/-/id6448717874
- **GTO Gecko: Poker Study** (GTO Solutions AS, 4.6 przy 64 ocenach, Education, 18+): „Neutral feedback … without promising outcomes”, ICM oceniane w equity. https://apps.apple.com/us/app/-/id6738748434
- **Poker Academy: Learn GTO poker** (iSolve Sp. z o.o., 18+): pełne rozdania od preflopu do rivera, powtórki rozłożone w czasie, XP. https://apps.apple.com/app/id1626050814

Te trzy aplikacje mobilne mają już EV loss, siatkę 13×13 i powtórki. Te funkcje nie wyróżnią więc naszej aplikacji, a ich brak dyskwalifikuje.

---

## Co musi być prawdą (14 punktów)

### 1. Ręka mieszana nie może zostać oceniona jako „błąd” tylko dlatego, że gracz wybrał akcję o mniejszej częstotliwości
**Obszar:** treść, przepływ.
Ocena opiera się przede wszystkim na różnicy EV, a częstotliwość jest tylko pomocnicza. Akcje o równym EV, które solver miesza, dostają ocenę „poprawna”. Ocenę „niedokładność” można dać akcji rzadkiej, która nie traci znacząco EV. Ocenę „błąd” dostaje akcja, której równowaga nie gra, albo akcja tracąca znaczące EV. Przy ręce mieszanej UI musi pokazać obie akcje i ich częstotliwości.
**Dowód:**
- https://blog.gtowizard.com/the-three-laws-of-indifference/: „If a hand mixes multiple actions, those actions will have the same value.” Oraz: „Changing mixtures between indifferent actions cannot lose value against a fixed strategy.” Zastrzeżenie z tego samego tekstu: „Your new strategy is exploitable. If the opponent adjusts, they can punish your mixing mistake.”
- https://help.gtowizard.com/measure-performance/: „Inaccuracy – Moves that are taken less than 3.5% of the time in GTO, but don’t lose significant EV. Wrong Move – Moves that are not taken in GTO. Blunder – Blunders that are never taken and lose significant EV.”

### 2. Progi czterech poziomów oceny (poprawna, dopuszczalna, niedokładność, błąd) muszą być jawne, liczbowe i liczone względem puli
**Obszar:** treść, dane.
Każdy próg EV loss trzeba zapisać jako liczbę w jednym źródle prawdy, wyrażoną w bb i w % puli. Mapowanie na cztery poziomy musi być opisane w aplikacji. Bez tego „acceptable” i „inaccuracy” są arbitralne, a ekspert od razu to zauważy.
**Dowód:** https://help.gtowizard.com/measure-performance/: „You can also see the total EV loss (in big blinds) compared to if you had played GTO, as well as the average EV loss per hand.” Ta sama strona definiuje próg częstotliwości 3,5%. Zdanie o skalowaniu względem puli („since you'll naturally lose more EV in bigger pots”) znam tylko z wyników wyszukiwarki: **niesprawdzony dosłownie**.

### 3. Strategia mieszana wymaga mechanizmu losowania (RNG) albo jawnej reguły, a ocena „najlepsza akcja” musi z nim współgrać
**Obszar:** przepływ.
Jeśli uczymy mieszania, ćwiczenie musi pozwalać mieszać, np. przez rzut kością 1–100. Inaczej uczeń nauczy się zawsze grać akcję o największej częstotliwości, a to jest uproszczenie, które da się wyeksploatować.
**Dowód:** https://help.gtowizard.com/how-to-use-the-trainer/: „Solvers have proven that mixed decisions are crucial for a GTO strategy.” Oraz: „Best actions are defined as the highest frequency action when RNG mode is turned off, or the rolled decision when RNG mode is turned on.”

### 4. Każdy spot musi jawnie podawać pełny zestaw założeń: format, liczbę graczy, efektywny stack, rake (procent i limit), ante, rozmiary w drzewie, zakresy wejściowe i funkcję wypłaty (chip EV albo ICM)
**Obszar:** treść, dane.
Bez założeń wynik solvera nie ma sensu. Założenia trzeba przechowywać jako metadane spotu, a nie w prozie.
**Dowód:**
- https://blog.gtowizard.com/how-solvers-work/: „to run a solver, you need to define the following parameters: The betting tree Required accuracy Starting pot and stack sizes Starting ranges (postflop solvers) Board cards (postflop solvers) … Modifications to the utility function such as rake or ICM”.
- https://blog.gtowizard.com/all-you-need-to-know-about-our-solutions/: „Our solutions are solved for PokerStars 500 Zoom rake structure both preflop and postflop. This is 5% rake with a cap of 0.6BB per hand.” Nawet lider rynku podaje rake jako założenie.
- Peka Software (App Store) podaje zakres wprost: „290 scenarios: 10 cash (6-max, 100 BB) and 280 MTT (8-max, 25-100 BB, with antes)”.

### 5. Rake jest parametrem strategii, a nie przypisem. Zakresy preflop dla cash muszą mieć przypisaną strukturę rake, a lekcja musi uczyć kierunku zmiany
**Obszar:** treść.
Zakresy policzone bez rake przeniesione na mikrostawki uczą zbyt częstego sprawdzania (flat). Jeśli aplikacja ma jeden zestaw zakresów, musi podać, przy jakim rake powstał, i nazwać to uproszczeniem.
**Dowód:**
- https://blog.gtowizard.com/preflop-raise-sizing-examining-2-key-factors/ (Brokos): „rake makes an enormous difference . Facing a LJ raise, the HJ, CO, and BTN all VPIP 25%-35% fewer hands in the raked game. It is specifically calling that becomes less appealing”.
- https://blog.gtowizard.com/how-stack-sizes-change-your-range/: „As rake increases, ranges typically tighten but are played more aggressively.”
- https://blog.gtowizard.com/customizable-raked-solutions-with-gto-wizard-ai/: „As we increase the rake, BTN’s betting strategy becomes more polarized.” Rake zmienia więc także grę po flopie.

### 6. Głębokość stacku jest osią treści. Żadna reguła nie może brzmieć „głębiej znaczy szerzej” ani „tak samo przy każdym stacku”
**Obszar:** treść.
Zakresy i lekcje muszą być oznaczone głębokością stacku. Tam, gdzie kierunek zmiany jest nieintuicyjny, trzeba to pokazać na przykładzie.
**Dowód:** https://blog.gtowizard.com/how-stack-sizes-change-your-range/: „the overall percentage of hands has increased from 16.5% to 17.7%. This may surprise some people who think that deeper stacks mean wider ranges, which is a misconception.” Oraz: „Some hands realize equity much better at shallower stack depths than they do at deeper stack depths, and vice versa.”

### 7. Uproszczenie (jeden rozmiar, „zawsze X”) musi być nazwane uproszczeniem, mieć podany koszt, gdy jest znany, i ostrzeżenie o eksploatowalności. Zgodność średniego EV nie usprawiedliwia reguły dla pojedynczych rąk
**Obszar:** treść.
**Dowód:** https://blog.gtowizard.com/do-multiple-sizes-matter/: „This exploit would cost you much more than the .01bb difference between the equilibrium EV of the simple strategy versus the complex one.” Oraz: „the simple strategy may actually lose significant EV with the hands that would have preferred a much different size .” Zgodność średniej nie dowodzi więc, że reguła jest poprawna ręka po ręce.

### 8. Zagrania nieintuicyjne z solvera wprowadzamy dopiero wtedy, gdy uczeń umie grać kolejne ulice. Kolejność modułów ma wynikać z tej zależności
**Obszar:** przepływ, treść.
**Dowód:** https://blog.gtowizard.com/counterintuitive-calls/: „your future mistakes may well cost you more EV than the recommended early-street action is predicted to earn you in theory.”

### 9. Wynik solvera jest przybliżeniem w ramach drzewa. Aplikacja nie może przedstawiać go jako „prawdy pokera” i musi podawać dokładność, jeśli korzysta z własnego solvera
**Obszar:** treść, wydanie.
Dla własnych rozwiązań potrzebna jest zapisana miara dokładności (Nash distance w % puli). Bez niej różnice EV mniejsze od błędu rozwiązania nie mogą rozstrzygać o ocenie „błąd”.
**Dowód:**
- https://blog.gtowizard.com/how-solvers-work/: „Poker is far too complex to solve directly; we need to reduce the game space using subsets and abstractions”. Oraz: „We can only make a tree so small before the solver starts exploiting the limitations of that tree.” Oraz: „The accuracy of a solution is measured by its Nash Distance”.
- https://blog.gtowizard.com/all-you-need-to-know-about-our-solutions/: „All the solutions are solved to at least 0.8% of the pot and most of them are solved to 0.4% of the size of the pot.”

### 10. Liczby wynikające z rachunku są liczone w kodzie i niezależnie sprawdzane, a nie wpisywane ręcznie
**Obszar:** dane, treść.
Dotyczy to outów, equity, pot odds, MDF, alpha, kombinatoryki, SPR, EV loss pokazywanego uczniowi, equity ICM i progów push/fold. Wymagany jest test porównujący wynik z niezależną implementacją albo z opublikowaną tabelą.
**Dowód:** równoważność EV w punkcie 1 oznacza, że ocena zależy od różnic EV rzędu ułamków bb. Pojedyncza literówka w ręcznie wpisanej liczbie zmienia ocenę. Rozwiązania mają błąd 0,4–0,8% puli (punkt 9). W ICM sam model zależy od rachunku na stackach i strukturze wypłat (punkt 11). Wniosek praktyka; cytaty jak w punktach 1, 9 i 11.

### 11. ICM trzeba uczyć jako model z nazwanymi ograniczeniami, nie jako prawdę o turnieju. Wynik push/fold Nash ma jawne założenia: tylko all-in albo pas, ICM albo chip EV, brak przyszłych rozdań
**Obszar:** treść.
**Dowód:**
- https://en.wikipedia.org/wiki/Independent_Chip_Model: „also known as the Malmuth–Harville method … David Harville first developed the model in a 1973 paper on horse racing”. Oraz: „Because the ICM ignores player skill”. Źródło pierwotne: Harville 1973, JASA 68(342), 312–316, doi:10.2307/2284068. Samego artykułu nie czytałem, tylko odwołanie.
- https://www.icmizer.com/en/blog/how-fgs-future-game-simulation-calculator-works/: „ICM ignores the sizes of the big blind, small blind and ante. ICM ignores the position of players in relation to the blinds.” Oraz: „The most obvious limitation is our assumption that all players will play according to Nash in the upcoming hands”.
- Ganzfried i Sandholm, AAMAS 2008, https://aamas.csc.liv.ac.uk/Proceedings/aamas08/proceedings/pdf/paper/AAMAS08_0313.pdf: „the observation that jam/fold strategies are near-optimal in the two player case”, „a heuristic from the poker community known as the Independent Chip Model which we use as an initialization”. W tekście z PDF stoi „nearoptimal”, bo ekstrakcja zgubiła łącznik. Praca Miltersena i Sørensena (2007), na którą się powołują, ma parametry SB=300, BB=600 i 8000 żetonów (cytat z tej pracy). Plik https://www.itu.dk/~trbj/papers/poker.pdf zwrócił 404, więc samego artykułu Miltersena i Sørensena nie przeczytałem: **niesprawdzony dosłownie**.
- Chen i Ankenman, „The Mathematics of Poker”, rozdz. 27 (cytowany przez Wikipedię): nie przeczytany, **niesprawdzony dosłownie**. Literatura do zakupu.

### 12. W spotach turniejowych zakresy chip EV nie mogą być podawane tam, gdzie ICM jest istotny. Ćwiczenie musi wiedzieć, której funkcji wypłaty używa
**Obszar:** treść.
**Dowód:** https://blog.gtowizard.com/what-happens-when-playing-chip-ev-and-icm-is-significant/: „doing this can cost you as much as 30% of your buy-in in EV . It’s likely much more though, as only flop strategy was included in the experiment.”

### 13. Eksploatacja bez danych populacji nie jest regułą. Moduł „błędy słabszych graczy” uczy metody (nodelock, warunek „jeśli przeciwnik robi X z częstotliwością Y, to…”), a nie twierdzeń o populacji
**Obszar:** treść.
Eksploatacja ma postać warunkową, z założeniem przeciwnika podanym jako parametr. Każde twierdzenie o populacji wymaga próby, stawek i pokoju. Bez nich nie trafia do aplikacji.
**Dowód:**
- https://blog.gtowizard.com/calling-down-the-over-bluffed-lines-in-lower-limits/: pokazuje ryzyko. Pada tam „the low-stakes population doesn’t use overbets nearly as much as the solver does” bez podanej próby, a jednocześnie tekst ostrzega: „“Fold your bluff catchers; they always have it!” While this is valid for certain spots, it’s also wrong in many other situations.”
- https://blog.gtowizard.com/the-limits-of-nodelocking/: „After the nodelock, the solver will play as close to GTO as possible.” Oraz: „Sometimes the adjustment to a leak happens on a different part of the game tree than the one you expected.” Eksploatacja jest więc wrażliwa na założenia i trzeba ją modelować, a nie podawać jako maksymę.
- https://blog.gtowizard.com/the-five-imbalances-of-exploitative-poker/: „more rewards usually come with more risk! In this case, the potential of counterexploitation.”

### 14. „Bez hazardu” musi być prawdą w produkcie i w metadanych sklepu: żadnych żetonów, stawek ani waluty, które da się kupić lub wymienić, oraz klasyfikacja wiekowa zgodna z definicją Apple
**Obszar:** pieniądze, wydanie, wzrost.
Ćwiczenia z wirtualnymi żetonami to w rozumieniu Apple potencjalnie „simulated gambling”. Przy częstym występowaniu oznacza to kategorię 18+. Konkurenci mają rozbieżne oceny wieku (Peka 4+, Gecko i Poker Academy 18+). Decyzję o kwestionariuszu trzeba zapisać, a w komunikacji stosować język nauki („neutral feedback without promising outcomes”), nie wygranych.
**Dowód:**
- https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.” W sekcji 18+: „Chance-Based Activities: Gambling Frequent simulated gambling”.
- https://apps.apple.com/us/app/-/id6738748434 (GTO Gecko): „Neutral feedback helps you recognize patterns and understand mixed strategies without promising outcomes.”

---

## Uwagi praktyka (nie są punktami)
- Prywatność: mocny wyróżnik to nauka offline bez konta, z danymi tylko na urządzeniu. Peka już to deklaruje: „Works offline: all training data is stored on your device” (https://apps.apple.com/us/app/-/id6448717874). U nas to musi być prawdą, a nie tylko hasłem.
- Ocena na czterech poziomach bez EV loss w bb i w % puli to dla praktyka krok wstecz względem trzech przeczytanych alternatyw.
- Dobór rąk do ćwiczeń: GTO Wizard ma tryb „close hands” („Close hands are defined by having similar EV between two or more actions”, https://help.gtowizard.com/how-to-use-the-trainer/). Ćwiczenie trywialnych pasów marnuje powtórki.
