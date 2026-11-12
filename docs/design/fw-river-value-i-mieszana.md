# Scenariusz: flop-size (D-1451), widok river-value, ręka mieszana (sesja FW)
Rola 04, build, 2026-11-12. Zadania z polecenia FW (`koordynacja:docs/koordynacja/polecenia/FW.md` @ 6c26a852): akceptacja D-1451 (FR), przegląd widoku river-value (FR, KO-091, `fba3f8dc`), projekt ręki mieszanej (FU 08-programista-201, ADR-04). Decyzje: D-1500–D-1502, `docs/decyzje/FW.md`. Stan kodu czytany na `a79ad506`. Wdraża rola 08; przekład nowych kluczy na 10 pozostałych słowników: rola 09 (poniżej pl i en). Uzupełnia `scenariusz-i-ocena.md` (D-543–D-545), `scenariusz-akcje-i-liczby.md` (D-886, D-888), `fm-turn-bet.md` (D-1430–D-1434).

| Co | Plik |
|---|---|
| Makieta: river-value dziś (FR), po poprawkach, ocena; ręka mieszana zgodna i błąd | `ekrany/fw-scenariusz.html` (style `e3.css`, `scenariusz.css`) |
| Zrzuty (390 jasny; 390 ciemny; 320 AX5) | `wzorce-zrzuty/fw/*.png` |
| Drzewo komponentu `PrzebiegScenariusza` dla river-value (pl, en; decyzja, ocena zgodna, ocena błąd) — podstawa makiety „dziś” | `dowody/fw-river-value-drzewo.txt` |
| Przepełnienie 320/390/430 × domyślny/AX5 | `przepelnienie-fw.txt`, kod 0 |

Wzorzec (D-191): Trening `2d97581` i Oczko `52308cd` nie mają oceny z dwiema poprawnymi odpowiedziami ani zakresu jako danej (`grep -rniE "też (dobr|poprawn)|both correct|alternatyw|dopuszczal"` → tylko alternatywy gestów, `components/DragList.tsx:16`); analogia wewnątrz projektu: D-1379/D-1432 (opis sytuacji pod stołem w list-hand), D-1434 (pasek ocen), makieta BE `ekrany/scenariusz.html:106-121` (ręka mieszana w range-spot).

## 1. D-1451: FM także dla flop-size — przyjęta (D-1500)
flop-size to dwa rozmiary tego samego zakładu bez czekania (`wariant.ts:56-58`, `scenario-gen.ts:788-792`), czyli ten sam kształt decyzji co turn-bet, dla którego D-1430 ustaliło: ta sama nazwa, różna kwota w drugiej linii. „Zakład (bet)” jest poprawnym terminem ogólnym także dla zakładu agresora na flopie (`content/terms.yaml:153-162`: „Pierwsze postawienie żetonów w rundzie licytacji”), więc nazwa nie uczy fałszu; „c-bet” zostaje tylko w cbet-case, gdzie odróżnia mały i duży c-bet od czekania bez kwoty (D-1430).

**Kryteria akceptacji (już spełnione przez FR, do utrzymania):** 1) `fl-flop-size-ekran.test.tsx` sprawdza te same punkty co kryteria 2–6 `fm-turn-bet.md` §1 (przycisk `scenario.action.bet` + `amountPay`, fraza małą literą, `scenario.potOnly`, `play.log.bet`, kwota na pasku ocen); 2) `grep -n "t('play\.\(bet\|potLabel\)" apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` → 0; 3) przy AX5 na 320 pt dwie linie przycisku bez ucięcia (krok telefonu). Uwaga FU 08-programista-202 (`scenario.potOnly` po angielsku w 10 językach) dotyczy obu rodzajów i zostaje u 08/09 — wygląd bez zmian.

## 2. Widok river-value minimalny — przyjęty z dwiema poprawkami (D-1501)
Zrzut stanu FR: `wzorce-zrzuty/fw/rv-dzis-390.png`; po poprawkach: `rv-po-390.png`, `rv-po-390-dark.png`, `rv-po-320-ax5.png`; ocena (bez zmian): `rv-ocena-390.png`.

**Zgodne ze spec (bez zmian):** kroki ulic z River jako bieżącą, stół z pięcioma kartami i etykietą czytnika z nazwami kart (A04-11); przyciski „Czekanie (check)” · „Zakład (bet)” najtańsza pierwsza (D-886); ocena: werdykt, blok „dobrze”, rozwijane „Dlaczego nie”, pasek ocen (D-544); dziennik twojego ruchu „BTN: zakład (bet)” bez kwoty. **Brak puli i kwoty zakładu: akceptuję** — wariant ich nie niesie (`scenario-gen.ts:866`), a decyzja „bet czy czekanie” nie zależy od rozmiaru; macierz stanów pkt 5 zabrania zgadywać liczbę. Brak „Liczb”: zgodnie z D-1433 zdania dla W, L, w pisze 06, przekłada 09.

| ID | Poziom | Znalezisko | Dowód | Poprawka |
|---|---|---|---|---|
| FW-01 | WYS przy wejściu SC-28 (dziś brzegowe: river-value nie ma szablonu w `content/`) | Ekran decyzji nie pokazuje zakresu sprawdzenia rywala, a punkt jest z definicji rachunkiem na tym zakresie („Zakres rywala to dana zadania: klasy rąk, które sprawdzą (`calls`)”, `packages/poker-core/src/scenario-gen.ts:119`; SC-28 „zakres sprawdzenia jako dana”, `docs/zakres/scenariusze-plan.md:51`). Wyjaśnienie oceny odwołuje się do „sprawdzających rąk”, których użytkownik nie widział. Bez danej decyzja jest zgadywaniem (funkcja nie do użycia zgodnie z celem). | `dowody/fw-river-value-drzewo.txt` (decyzja: stół, pusty dziennik, przyciski) | Pod stołem, przed dziennikiem, zdanie z danych wariantu/szablonu: `scenario.riverValue.calls` z listą klas `calls` w kolejności szablonu, łączoną `scenario.riverValue.sep`. Styl jak opis list-hand (D-1379): `styl.tresc`, `tk.ink`. Klasy `folds` nie są pokazywane (rachunek W/L ich nie używa; mniej tekstu). |
| FW-02 | ŚR | Dziennik przed decyzją jest pusty, więc „Czekanie” nie mówi, że rywal już czekał i że twoje czekanie kończy licytację (graf: obie akcje kończą rozdanie, `fr-river-value-ekran.test.tsx`). Punkt jest „z pozycji” (`scenario-gen.ts:119`), rywal działa pierwszy. | jw. | Wpis rywala na riverze jak w cbet-case (`EkranScenariusza.tsx:153`): `play.log.check` z pozycją rywala, wiersz „River” ze świeżą kartą, jak wpis bieżący w makiecie BE. Bez nowego klucza. |

Pokrewne, poza zakresem: pick-hand (KO-072) też ma `calls` jako daną (`scenario-gen.ts:106`) i ich nie pokazuje (`grep -n "calls" EkranScenariusza.tsx` → 0) — to samo rozwiązanie co FW-01, przy wejściu SC-23a/b (do weta 03/06).

### Nowe klucze (river-value)
| Klucz | pl | en | Opis dla tłumacza (`pl.kontekst.json`) |
|---|---|---|---|
| `scenario.riverValue.calls` | `Na {{t:bet\|zakład}} rywal {{t:call\|sprawdza}} z: {{lista}}.` | `Against a {{t:bet}}, your opponent {{t:call\|calls}} with: {{lista}}.` | Zdanie pod stołem: z jakimi klasami rąk rywal zapłaci za twój zakład; `lista` to zapis klas (AJs, 88), nie tłumaczyć |
| `scenario.riverValue.sep` | `, ` | `, ` | Separator listy klas rąk (ja, zh-Hant: „、”) |

### Kryteria akceptacji dla 08 (river-value)
1. Test ekranu decyzji: tekst `t('scenario.riverValue.calls', { lista })` z każdą klasą z `calls` szablonu dokładnie raz, w kolejności szablonu; żadna klasa z `folds` nie występuje na ekranie.
2. Test: dziennik przed decyzją ma jeden wpis `t('play.log.check', { pos: villain })` w wierszu River; po decyzji dochodzi twój ruch (jak dziś).
3. Test: brak wiersza puli i kwoty (`W puli|Pula` → 0) — utrwala akceptację stanu FR.
4. Etykieta czytnika zdania = tekst zdania (klasy czytane jak w range-spot, „J9o”).
5. AX5 na 320 pt: zdanie zakresu i dziennik bez ucięcia (krok telefonu; makieta: `rv-po-320-ax5.png`, `przepelnienie-fw.txt` kod 0).

## 3. Ręka mieszana w list-hand (D-1502)
Problem (FU 08-programista-201): przy `correct: [4bet, call]` wybór „call” daje ocenę Zgodna, ale druga zgodna akcja ląduje pod „Dlaczego nie „4-bet”” (`apps/mobile/src/features/scenariusz/wariant.ts:387`), a przy błędzie „Lepiej:” podaje tylko pierwszą zgodną (`EkranScenariusza.tsx:273`, `:357`). ADR-04: obie akcje ręki mieszanej są poprawne. Zasada: **o bloku decyduje ocena akcji (`ocenaAkcji` = „zgodne”), nie równość z `correct`** — rozszerzenie zasady z komentarza `wariant.ts:384` (DC WYS-001) na bloki i werdykt.

### Projekt (makieta `mix-zgodna`, `mix-blad`)
| Miejsce | Wybór zgodny (call; drugi zgodny 4-bet) | Wybór niezgodny (pas albo dopuszczalny) |
|---|---|---|
| Werdykt i ogłoszenie VoiceOver | `scenario.verdict.yoursGoodAlso`: „Twój wybór: sprawdzenie (call). Też dobrze: 4-bet.” | `scenario.verdict.yours` z `lepiej` = wszystkie zgodne połączone `scenario.or`: „Lepiej: 4-bet albo sprawdzenie (call).” |
| Bloki „dlaczego” | „dobrze” dla wyboru; potem **widoczny** blok `scenario.why.alsoGood` dla każdej innej zgodnej akcji (nagłówek + tekst, jak „dobrze”); „Dlaczego nie …” tylko dla akcji niezgodnych (rozwijane, jak dziś) | „słabsza” dla wyboru; potem blok „lepsza” dla **każdej** zgodnej akcji, w kolejności `akcjePunktu` |
| Pasek ocen | bez zmian: obie zgodne mają „✓ Zgodna” (`wariant.ts:200`) | bez zmian |
| Lista na końcu | bez „Lepiej” (zgodna) | „Lepiej: 4-bet albo sprawdzenie (call).” (`scenario.end.better` z tym samym połączeniem) |

Kolejność zgodnych w „Też dobrze” i „Lepiej”: kolejność akcji na ekranie (`akcjePunktu`), bez wyróżniania `correct[0]` — przy ręce mieszanej żadna nie jest „lepsza”. Więcej niż dwie zgodne (schemat dopuszcza, `content-schema/src/index.ts:661`): łączenie lewostronne `scenario.or` („a albo b albo c”). Bez nowego koloru i komponentu: `BlokDlaczego` z nowym rodzajem `tez_dobrze` (tytuł jak „dobrze”, `accessibilityRole="header"`).

Odrzucone: (b) „też dobre” jako rozwijany wiersz jak „Dlaczego nie” — krótszy ekran, ale główna lekcja ręki mieszanej (obie poprawne, ADR-04) schowana za dotknięciem; (c) jeden blok „Kiedy które zagranie” jak w range-spot (makieta BE `scenariusz.html:114`) — wymaga nowego pola treści w szablonie list-hand i tekstu 06 dla każdego wpisu; warunek powrotu: 06 zgłosi, że per-akcyjne wyjaśnienia nie wystarczają. Range-spot bez zmian (tam druga akcja jest „dopuszczalna”, nie „zgodna”).

### Nowe klucze (ręka mieszana)
| Klucz | pl | en | Opis dla tłumacza |
|---|---|---|---|
| `scenario.verdict.yoursGoodAlso` | `Twój wybór: {{akcja}}. Też dobrze: {{inne}}.` | `Your choice: {{akcja}}. Also good: {{inne}}.` | Werdykt przy ręce mieszanej: wybrałeś jedną z kilku poprawnych akcji; `inne` = pozostałe poprawne |
| `scenario.why.alsoGood` | `Dlaczego „{{akcja}}” to też dobre zagranie` | `Why “{{akcja}}” is also a good play` | Nagłówek bloku: druga poprawna akcja ręki mieszanej (wzór `scenario.why.good`) |
| `scenario.or` | `{{a}} albo {{b}}` | `{{a}} or {{b}}` | Alternatywa dwóch akcji (obie poprawne); łączone parami dla trzech |

Uwaga dla 06 (nie projekt): teksty akcji ręki mieszanej muszą stać samodzielnie jako „dobre zagranie”; obecny tekst `call` w SC-10 jest pisany jako dopuszczalny („AK bywa też sprawdzane”, `docs/tresci/szablony-robocze/fd/pl/sc-10.yaml:27`), a zdanie sytuacji powtarza się w obu widocznych blokach (zrzut `mix-zgodna-390.png`).

### Kryteria akceptacji dla 08 (ręka mieszana; po nich bramka content-build przepuszcza `correct: [..]`)
1. Test sondy FU (`docs/programista/dowody/fu-sonda-reka-mieszana.txt`) w `fn-list-hand-mieszana.test.tsx` zielony: dla AKs `correct: [4bet, call]`, wybór call → bloki `["dobrze:call","tez_dobrze:4bet","dlaczego_nie:fold"]`; żaden blok `dlaczego_nie` nie dotyczy akcji ocenionej „zgodne”.
2. Test: wybór fold → bloki `["slabsza:fold","lepsza:<zgodne w kolejności akcjePunktu>"...]`, po jednym „lepsza” na każdą zgodną.
3. Test werdyktu i ogłoszenia: zgodny → `t('scenario.verdict.yoursGoodAlso', { akcja, inne })`; niezgodny → `lepiej` zawiera wszystkie zgodne połączone `scenario.or`; przy jednej zgodnej (punkty bez ręki mieszanej) teksty bez zmian (`yoursGood`, `yours`) — testy istniejących rodzajów zielone bez zmian oczekiwań.
4. Test listy końcowej: „Lepiej” z tym samym połączeniem.
5. `pnpm i18n` kod 0 z kluczami w 12 słownikach (pl, en wg tabeli; pozostałe 09).
6. Dopiero po 1–5: test bramki — szablon z `correct: [..]` przechodzi `checkScenarioNaEkran` (dziś, wg FU opcja b, ma być odrzucany).

## Otwarte
- Wygląd na urządzeniu (VoiceOver, AX5) niesprawdzony: brak macOS; punkty listy telefonu: kryteria 5 (river-value), 3 (D-1451).
- Łamanie w środku wyrazu przy 430 AX5 w makiecie („podsumowanie”, „3-bet.”; `przepelnienie-fw.txt`, INFO) — ten sam stan co w zatwierdzonych makietach (`przepelnienie-be.txt`, „zaawansowania”), symulacja AX5 w makiecie to uproszczenie D-122; bez nowej decyzji.
