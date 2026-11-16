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

## Długi tytuł sytuacji (sesja HQ, D-1730…D-1733)
Problem: tytuł startu = pierwsze zdanie sytuacji (D-1660); SC-29 pl zajmuje 5 wierszy przy 390 pt (kryterium ≤ 3; recenzja HM 503). Decyzja właściciela 2026-11-16: „A” (mniejszy styl tytułu).

**Token** (dopisać jednocześnie do `docs/design/tokeny.ts` i `apps/mobile/src/theme/tokeny.ts`, test `motyw-08.test.ts` pilnuje równości):
`typografia.skala.tytulDlugi = { size: 20, line: 25, kroj: 'tytul', textStyle: 'title3', maxW: 0.10 }` — Literata 600 jak `tytul`, rozmiar iOS title3, ten sam sufit szerokości co `tytul` (`sufitTytulu`, `theme/skalowanie.ts:22`), więc od AX2 oba style zbiegają się (39 pt przy 390) i długi nigdy nie jest większy od zwykłego. Od AX1 krój systemowy (D-122), ja/zh/ko zawsze systemowy (D-368) — bez zmian.

**Reguła** (czysta funkcja w `features/scenariusz/`, bez React Native):
```
PROG_TYTULU_DLUGIEGO = 0.19
dlugoscWazona(s): suma po znakach: 2 dla CJK (U+2E80–U+9FFF, U+F900–U+FAFF), Hangul (U+AC00–U+D7AF, U+1100–U+11FF) i pełnej szerokości (U+FF00–U+FFEF, U+3000–U+303F); 1 dla pozostałych
stylTytuluSytuacji(tytul, szerokoscEkranu) = dlugoscWazona(tytul) > floor(PROG × (szerokoscEkranu − 32)) ? 'tytulDlugi' : 'tytul'
```
Szerokość z `useWindowDimensions` (32 = 2 × `odstep.l`, `components/ui.tsx:23`). Próg: 320 → 54, 390 → 68, 430 → 75. Wybór stylu **nie zależy od fontScale** (przy dużym tekście oba style mają ten sam sufit). Dotyczy tylko tytułu ekranu startu scenariusza; reszta sytuacji bez zmian (`styl.tresc`).

**Pomiar** (630 tytułów: 18 szablonów × 35 języków z baz treści, Literata 600 / IPAGothic dla CJK, szerokość treści W − 32; skrypt i wynik w scratchpadzie sesji, liczby w D-1730): w `tytul` każdy tytuł o długości ważonej ≤ progu mieści się w ≤ 3 wierszach przy 320/390/430 (pierwsze przekroczenia: 64/75/90, margines ok. 9%). Przy 390 po regule: 610 z 630 tytułów ≤ 3 wiersze; 19 ma 4 wiersze, 1 ma 5 (pl SC-04, 158 znaków, jedno zdanie — do skrócenia przez rolę 06). Przy 320: 137 ma 4 wiersze, 8 ma 5 (akceptowane: wąski ekran, tytuł dalej czytelny, przewijanie).

| Pliki | |
|---|---|
| Makieta przed/po: SC-29 pl przed i po, SC-05 krótki, SC-04 pl najdłuższy, SC-04 de, SC-19 ja | `ekrany/tytul-dlugi.html` |
| Zrzuty 390 jasny/ciemny, 320 AX5, 430 + pomiar wierszy | `wzorce-zrzuty/tytul-dlugi/*.png`, `tytul-dlugi-pomiar.json` |
| Narzędzie (AX5 = fontScale 3,12 dla tytułów i treści jak D-1680, liczy wiersze h1, kod 1 przy przepełnieniu) | `narzedzia/hq-zrzuty.mjs` |

Wynik makiety (Chromium, Literata): 390 — SC-29 5 → 3 wiersze, SC-05 3 (bez zmiany), SC-04 pl 5, de 4, ja 4; 320 AX5 — 4–10 wierszy po 32 px, nic poza ekranem (kod 0).

**Kryteria dla 08**
1. Test czystej funkcji: wektory `stylTytuluSytuacji` dla 320/390/430 na granicy progu (54/55, 68/69, 75/76 znaków), tytuł ja 34 znaków CJK (= 68) → `tytul` przy 390, 35 znaków → `tytulDlugi`; mieszany „3ベット” liczony 1 + 2 × 3.
2. Token `tytulDlugi` w obu `tokeny.ts` w jednym commicie, `motyw-08.test.ts` zielony; rozmiar przez `sufitTytulu` jak `tytul`.
3. Pomiar w aplikacji (Expo web z łatką fontScale jak HM i z Literatą, potem telefon): SC-29 pl przy 390 ≤ 3 wiersze; przy AX5 320 brak przepełnienia poziomego.
4. Nic poza tytułem startu nie zmienia stylu (test: tytuł ekranu „Rozdanie zakończone” i nagłówki ocen bez zmian).

## Limperzy na stole i w dzienniku (iso-size, SC-09; sesja HQ, D-1734…D-1737)
Punkt `size-spot` z `check: iso-size` (izolacja limperów, R-M4-012) jest dziś odrzucany przez bramkę (`tools/content-build/src/scenariusze.ts:376`), bo ekran nie pokazuje graczy, którzy weszli za wpisowe. Widok:

1. **Stół wieloosobowy przed flopem** — ten sam owal i miejsca co E3/ICM (`Stol` z D-275/D-284; 6 miejsc przy 6-max, 9 przy pełnym stole), ty na dole, dalej zgodnie z ruchem wskazówek zegara; twoje karty na środku sukna; bez stosów na miejscach (głębokość jest w opisie startu). Stany miejsc:
   - przed tobą, spasował: obwódka kreskowana + „pas” (`table.stateFold`, jak dziś);
   - **limper: obwódka ciągła 2,5 pt `seatInk` + słowo „limp”** (nowy klucz `table.stateLimp`); to ten sam wzór co „all-in” w ICM (aktywny rywal w puli) — rozróżnia słowo i kształt obwódki, nie kolor;
   - ty: złota obwódka + „ty”; po tobie: zwykła obwódka + „po tobie”.
   - Które miejsca są limperami: ostatnie `limpers` miejsc przed tobą w kolejności akcji przed flopem (UTG, HJ, CO, BTN, SB; BB nigdy przed tobą); wcześniejsze spasowały. Rywal szablonu jest jednym z nich (bramka treści: `limpers` ≤ liczba miejsc przed tobą, `scenariusze.ts:283`).
2. **Pod stołem** „W puli {{bb}} bb” (`scenario.potOnly`): 0,5 + 1 + 1 bb za każdego limpera spoza blindów; bez „do sprawdzenia” (punkt nie ma opcji sprawdzenia).
3. **Dziennik**, jeden wiersz „Preflop”: „Blindy 0,5/1 bb. UTG: pas. HJ: limp 1 bb.” — nowy klucz `play.log.limp` = `{{pos}}: {{t:limp|limp}} {{bb}} bb` (kwota = 1 bb minus blind limpera, czyli 0,5 bb, gdy limpuje SB); pasy przed tobą tylko do ostatniego limpera, jak przy ICM.
4. **Pasek** bez zmian względem `size-spot`: trzy segmenty „Przebicie / do {{bb}} bb” (raise-small, raise, raise-big) z kwotami z generatora (`isoSizeStandardBb`: 3 + 1 × limperzy, +1 z SB/BB; × 0,8 i × 1,6). Ocena: struktura z p. 3 przepływu (werdykt, „dlaczego”, pasek ocen, „Liczby”), dziennik po decyzji dopisuje „CO: przebicie do 3,2 bb” ze znacznikiem stopnia.
5. **Kroki ulic**: bez zmian (punkt preflop jak inne `size-spot`).

**VoiceOver** (`table.label`): „Przy stole: UTG pas (fold), HJ limp, ty na CO z asem pik i waletem karo, po tobie BTN, SB i BB.” Nowe klucze `table.seatLimp` = `{{pos}} {{t:limp|limp}}` i liczba mnoga `table.limped_{one,few,many,other}` = `{{list}} {{t:limp|limp}}` („HJ i CO limp”). Wpis dziennika ogłaszany jak inne.

**Duży tekst**: miejsca mają stały rozmiar jak w E3/ICM (napis w miejscu nie rośnie ponad sufit miejsca); dziennik „ulica nad wpisem” (D-1662); pasek w kolumnę. Kwoty z jednostką łączone spacją nierozdzielającą („1 bb” nie łamie się).

| Pliki | |
|---|---|
| Makieta: 1 limper (CO, A♠J♦, 3,2/4/6,4 bb), 2 limperów z SB (99, pula 3,5, 4,8/6/9,6 bb), ocena „~ Niedokładność” | `ekrany/scenariusz-limperzy.html` |
| Zrzuty 390 jasny/ciemny, 320 AX5, 430 (kod 0, nic poza ekranem) | `wzorce-zrzuty/scenariusz-limperzy/*.png` |

**Kryteria dla 08**
1. `StolIcm` (albo wspólny stół wieloosobowy) dostaje stan „limp”: obwódka 2,5 `seatInk` ciągła + `table.stateLimp`; test: dla hero CO i `limpers` 1 → HJ „limp”, UTG „pas”, BTN/SB/BB „po tobie”; dla hero SB i `limpers` 2 → HJ, CO „limp”, UTG i BTN „pas”, BB „po tobie”; limpers 4 przy hero BB → UTG „pas”, HJ, CO, BTN i SB „limp” (wpis SB „limp 0,5 bb”, pula 5 bb).
2. Pula pod stołem = 1,5 + suma wpisowych limperów (test: CO/1 → 2,5; SB/2 → 3,5).
3. Dziennik: `play.log.limp` w pl; brakujące języki przez fallback do en dopiero po dopisaniu klucza en (role 06/09 tłumaczą); test wpisu „HJ: limp 1 bb”.
4. Etykieta stołu VoiceOver jak wyżej (test `accessibilityLabel`).
5. Bramka: usunięcie odrzucenia iso-size w `scenariusze.ts:376` dopiero w tym samym PR co widok, z testem, że SC-09 przechodzi `checkScenarioNaEkran`.
6. Zrzuty 390 i 320 AX5 jak makieta, bez przepełnienia.

## Inwentarz nowych rodzajów HO (SC-16, 18, 21, 26, 27, 30; sesja HQ, bez projektowania)
Stan na 2026-11-16: HO jeszcze pracuje, rodzaje punktów nie są w `content-schema`. Ocena, czy istniejące widoki wystarczą, przy założeniu akcji wynikających z planu (`docs/zakres/scenariusze-plan.md`):

| SC | Punkt decyzji (plan) | Najbliższy widok | Wystarcza? | Czego brak / warunek |
|---|---|---|---|---|
| SC-16 | flop, OOP wobec c-betu, check-raise z mocnym drawem (R-M6-008/010) | `defend` / `draw-call` (Stol HU, dziennik, pasek) | tak, jeśli akcje to pas / sprawdzenie / przebicie z kwotą | segment „Przebicie do X bb” jest już w `size-spot`; wpis dziennika `play.log.raise` istnieje; nowy projekt tylko, gdyby rodzaj dawał wybór rozmiaru check-raise |
| SC-18 | turn, second barrel na karcie dobrej dla otwierającego | `turn-bet` (kroki ulic, karta turnu) | tak dla zakład / czekanie (jak `river-value` na turnie) | klasyfikacja karty turnu tylko w tekście „dlaczego” i „Liczby”; bez znacznika na karcie |
| SC-21 | turn, średnia ręka: czekanie (R-M7-003) | `turn-bet` / `river-value` | tak | jw. |
| SC-26 | niski SPR, top para gra o cały stack | `flop-size` / `defend` + stosy na stole (KO-102) | tak | czy SPR ma być widoczny przed decyzją (dziś: stos i pula, SPR w „Liczbach”) — decyzja dydaktyczna 03/06, nie wygląd |
| SC-27 | 3-bet pot, rozmiar geometryczny przez 3 ulice | `flop-size` + kolejne punkty na turnie i riverze | tak | dziennik preflop „przebicie do … / przebicie do …” (3-bet) z istniejących kluczy; trzy decyzje = istniejące kroki ulic |
| SC-30 | preflop, nit 3-betuje: pas z dołu zakresu | `list-hand` (słownik ma fold/call/4bet) | tak | profil rywala tylko w zdaniu sytuacji; stół HU po pasach |

Wniosek: żaden z sześciu nie wymaga dziś nowego projektu; rola 04 wraca, gdy HO zapisze rodzaj z akcją spoza słownika ekranu albo z nowym elementem stołu.

## Otwarte
- Brzmienie wszystkich wyjaśnień, oceny akcji SC-01 i tekst „kiedy które” — rola 06 (ADR-24); R-M2-001 pomija implied odds (uproszczenie).
- Czy po decyzji ocenionej „błąd” rozdanie idzie dalej linią tego zagrania, czy kończy się z wyjaśnieniem (BR-SCN-003: wybór roli 03). Makieta: idzie dalej („Dalej: river”).
- Ekran listy scenariuszy (wejście z kafelka): lista grupowana modułów M2–M11 z szablonami; zablokowany szablon mówi, co go odblokuje (BR-MENU-001). Nie ma makiety, bo ma te same komponenty co ekran „Lekcje” (`menu-i-zebatka.md`).
- (HQ) Zrzuty web nie ładują Literaty w `pnpm zrzuty:web` (krój zastępczy daje 5 wierszy SC-29 zamiast 4); `e3.css` `--t-tytul` ma dolną granicę `max(…, --t-tresc)`, a `sufitTytulu` w aplikacji jej nie ma (39 vs 53 pt przy 390 AX5) — makiety HQ liczą jak aplikacja.
- (HQ) 30 z 35 baz językowych ma angielskie zdania sytuacji (np. bg, cs, da) — dla ról 06/09; reguła długości liczy je jak tekst łaciński.
