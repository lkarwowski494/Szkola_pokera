# Scenariusz całego rozdania i ocena decyzji (sesja BE, część B)
Rola 04, build, 2026-11-10. Wymagania: `docs/brd/wymagania-scenariusze.md` @ `sesja-bd-zakres` 8cba034 (BR-SZB, BR-GEN, BR-POZ, BR-OCE), `docs/brd/wymagania-nauka.md` BR-SCN-001…004; decyzje właściciela KO-035, KO-038–KO-040. Decyzje projektu: D-543–D-545. Kod: rola 08, tylko z tokenów i komponentów `design-spec.md`.

## Pliki
| Co | Plik |
|---|---|
| Makieta: start, przebieg (decyzja na turnie), ocena „błąd”, liczby rozwinięte, ocena „dopuszczalna” (ręka mieszana), koniec | `ekrany/scenariusz.html` + `ekrany/scenariusz.css` |
| Zrzuty pojedyncze 390 pt | `wzorce-zrzuty/scenariusz/{przebieg,ocena-zle,ocena-liczby,ocena-mieszana}-390.png` |
| Arkusze: 390 jasny i ciemny, 320, AX5 (320 jasny, 390 ciemny), szarość, ciemny + zwiększony kontrast | `wzorce-zrzuty/scenariusz/scenariusz-*.png` |
| Przepełnienie (320/390/430 × domyślny/AX5) | `przepelnienie-be.txt`, kod 0; łamanie w środku wyrazu tylko przy 320 AX5 (wyjątek D-122) |

Treść makiety: szablon SC-01 (`docs/zakres/scenariusze-plan.md:24`). Fakty z `content/pl/rules.yaml` R-M2-001, R-M2-003 i `content/numbers.yaml` (9 outów, 25% przy zakładzie pół puli, 9 z 46 kart ≈ 19,6%). Karty, kwoty, oceny akcji i brzmienie wyjaśnień są `[PRZYKŁAD]`; ostateczną treść pisze rola 06 według ADR-24.

## Przepływ PR-05 (ekrany)
1. **Start** (D-545): tytuł szablonu = jego `sytuacja`, moduł i numer szablonu, jedno zdanie opisu (pozycje, ulice, głębokość w bb). Pod spodem kontrolka segmentowa iOS „Automatycznie · Łatwy · Średni · Trudny” (KO-039, BR-POZ-002) i jedno zdanie, co wybrał automat i dlaczego („Teraz: średni. Zaliczony test modułu 2…”). Gdy szablon nie ma wybranego poziomu, zdanie mówi, którego poziomu nie ma i co wybrano zamiast niego. Zdanie „Każde rozdanie ma nowe karty. Wynik to oceny decyzji, nie wygrana.” (BR-GEN-002, BR-SCN-002). Przycisk „Zacznij rozdanie”. Licznik dziennego limitu jak na ekranie startu sesji (BR-LIM-001).
2. **Przebieg** (D-543): pasek nawigacji „Zakończ · Scenariusz · {ulica}”; kroki ulic (Preflop ✓, Flop ✓, **Turn**, River: obwódka + znak + pogrubienie, nie sam kolor); `Stol` heads-up: dwa miejsca z pozycją, rolą i głębokością w bb („ty · 100 bb”), karty stołu (przyszła karta jako pusty kontur), twoje karty pod stołem; pod stołem „W puli 16,5 bb · do sprawdzenia 5,5 bb” (tekst, bez żetonów); **dziennik akcji**: jeden wiersz na ulicę, akcje rywala krok po kroku, przy ocenionej decyzji znacznik stopnia; nowy wpis rywala pojawia się 400 ms po poprzednim, a przy „Ogranicz ruch” od razu; dotknięcie pomija animację. Na dole `PasekStrategii` w stanie „przed decyzją” (segmenty-przyciski ≥ 64 pt, z kwotą w bb). Wznowienie (BR-GEN-001) otwiera ten ekran w tym samym punkcie decyzji.
3. **Ocena** po każdej decyzji (D-544), kolejność od góry:
   1. werdykt na suknie: znak + słowo stopnia (✓ Zgodna, ≈ Dopuszczalna, ~ Niedokładność, ✗ Błąd; D-213, D-284, bez kółka) i zdanie „Twój wybór: **…**. Lepiej: …” (złoto = „ty”);
   2. tekst „dlaczego” na pierwszym planie, zbudowany jak w BR-OCE-001: zdanie sytuacji (ręka, pozycja, stół, akcja rywala — kolorem `muted`, żeby czytało się jako tło), potem „grasz …, bo …”. Przy błędzie i niedokładności dwa bloki: „Dlaczego {twoja akcja} jest słabsza” i „Dlaczego {najlepsza} jest lepsza” (BR-OCE-002). Przy „zgodne” jeden blok „Dlaczego dobrze” + rozwijany wiersz „Dlaczego nie {inne}”. Przy ręce mieszanej blok „Kiedy które zagranie” (BR-POZ-001);
   3. **pasek ocen akcji**: te same segmenty co przed decyzją, w każdym słowo stopnia, twój wybór w złotej obwódce z dopiskiem „twój wybór”; bez procentów;
   4. rozwijany wiersz **„Liczby”** (domyślnie zwinięty): każda liczba w zdaniu z przełożeniem na sens („25% szans, czyli wygrać mniej więcej raz na cztery”; BR-OCE-001 pole `sens`); tu, a nie wyżej, trafiają też częstości solvera, jeśli punkt decyzji je ma;
   5. „Zgłoś błąd w tym zadaniu” (PR-09) i przycisk „Dalej: {następna ulica}” albo „Zobacz podsumowanie”.
4. **Koniec** (BR-SCN-002, BR-SCN-004): duży tytuł „Rozdanie zakończone”, lista decyzji (ulica, akcja, stopień słowem, przy błędzie „Lepiej: …” jednym zdaniem), pokazanie kart jako zdanie z wyjaśnieniem, kto wygrywa i dlaczego (bez kwot), zdanie „N z M decyzji dobrze” i co trafia do powtórek. Przyciski: „Nowe rozdanie” (nowy wariant, BR-GEN-002), „Zagraj to samo jeszcze raz” (ten sam wariant, BR-GEN-001), „Zamknij”. Nie ma salda, wygranej, rankingu ani stosu przenoszonego dalej.

## VoiceOver
- Stół: „Stół: ty na BTN z waletem kier i dziesiątką kier, rywal na BB. Na stole: król kier, szóstka kier, dwójka trefl, trójka pik.” (karty nazwami, A04-11).
- Dziennik: lista; nowy wpis rywala ogłaszany (`accessibilityLiveRegion`/`announceForAccessibility`): „Turn: trójka pik. BB zakłada 5,5 bb, pół puli.”
- Werdykt ogłaszany po decyzji: „Błąd. Twój wybór: sprawdzenie 5,5 bb. Lepiej: pas.”, potem bloki „dlaczego” w kolejności wizualnej.
- Pasek ocen: „Oceny akcji: pas zgodna, sprawdzenie błąd, twój wybór, przebicie błąd.”
- „Liczby”, „Dlaczego nie …”: przyciski z `accessibilityState.expanded`.

## Dostępność i pomiary
- Kontrast: używane pary są w tabeli `kontrast-e3.md` (sukno, tekst na suknie, „ty” na suknie, akcje na tle) i `kontrast-menu.txt`; nowych kolorów brak.
- Nic tylko kolorem: stopień = znak + słowo; twój wybór = złota obwódka + słowa „twój wybór”; bieżąca ulica = obwódka 2 pt + pogrubienie; zrzut w skali szarości `scenariusz-390-szarosc.png`.
- Duży tekst: dziennik przechodzi na układ „ulica nad wpisem”; segmenty paska i oceny zawijają się w kolumnę; przepełnienie kod 0.

## Otwarte
- Brzmienie wszystkich wyjaśnień, oceny akcji SC-01 i tekst „kiedy które” — rola 06 (ADR-24); R-M2-001 pomija implied odds (uproszczenie).
- Czy po decyzji ocenionej „błąd” rozdanie idzie dalej linią tego zagrania, czy kończy się z wyjaśnieniem (BR-SCN-003: wybór roli 03). Makieta: idzie dalej („Dalej: river”).
- Ekran listy scenariuszy (wejście z kafelka): lista grupowana modułów M2–M11 z szablonami; zablokowany szablon mówi, co go odblokuje (BR-MENU-001). Nie ma makiety, bo ma te same komponenty co ekran „Lekcje” (`menu-i-zebatka.md`).
