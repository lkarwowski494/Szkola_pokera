# Recenzja niezależna FQ (06-tresci, audit): szkice SC-13/22/25/28/29, FN-N1 (SC-24), zdania „Liczby” i decyzje D-1460…D-1467 — Szkoła Pokera — 2026-11-12
Commit recenzowany: 42673fb4 (gałąź `sesja-fq-szkice`, HEAD zgodny z poleceniem FS @ 793643a6) · Sesja: FS · Tryb: audit (moduł kontrole-mechaniczne; tresci-krytyczne i historia-i-miejsca nie dotyczą: poker bez progów zdrowia, życia i prawa, bez miejsc i trudnej pamięci) · Środowisko: Linux 6.18, Node 22, `pnpm install --frozen-lockfile` kod 0; sieć działa (8 stron źródeł pobranych `curl`, HTTP 200); macOS/Xcode niedostępne (nie dotyczy: recenzja treści, bez uruchamiania aplikacji).

## Podsumowanie
Werdykt ogólny: **PO POPRAWKACH** (0 KRYT, 4 WYS, 1 ŚR, 1 NIS). Szkice: **SC-28 — gotowy merytorycznie**; **SC-29 — gotowy merytorycznie** (NIS 006); **SC-22 — po poprawkach** (001, 002); **SC-25 — po poprawkach** (002); **SC-13 — zablokowany** (08-FQ-1 potwierdzone, 08-programista-001, a do tego 003 i 004). Wejście do `content/` wszystkich czterech `river-value` dalej zależy od widoku (D-1420, 04/08); SC-28 także od 08-programista-002. **FN-N1 (SC-24): zweryfikowane.** Rachunek „Liczby” river-catch i defend: formuły poprawne (sprawdzone ręcznie na 9 wariantach SC-24 i 2 przykładach defend), ale zdanie defend podaje MDF na flopie jako normę obrony (005, ten sam mechanizm co FK 06-tresci-001).

Najważniejsze ryzyko: wyjaśnienia `river-value` mówią o „rękach, które sprawdzą/spasują” tak, jakby remisów nie było, a generator remisy dopuszcza (D-1417). Mój niezależny rachunek na 1000 wariantach na szkic: w SC-22 zdanie „ponad 50% rąk, które sprawdzą, to ręce gorsze” jest fałszywe w 113 wariantach (001), a „ręce, które spasują, i tak przegrałyby z tobą” w SC-25 w 261 (002). Drugie ryzyko: SC-13 uczy „silną ręką na takim flopie stawiasz większym rozmiarem” także na flopach sparowanych (166/1000) i z możliwym stritem (101/1000), gdzie GTO Wizard (szczebel 2) mówi wprost: mały rozmiar (003).

Decyzji właściciela brak: znaleziska są merytoryczne (ADR-24, rozstrzyga rola 06: D-1470…D-1474 w `docs/decyzje/FS.md`), do weta przez koordynatora.

Skala: KRYT = P0, WYS = P1, ŚR = P2, NIS = P2 bez zmiany działania.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 (WYS) | M | SC-22: „ponad 50% rąk, które sprawdzą, to ręce gorsze” fałszywe w 11,3% wariantów (remisy wśród sprawdzających) | otwarte |
| 06-tresci-002 | P1 (WYS) | M | SC-25 „i tak przegrałyby z tobą” i SC-22 „po czekaniu też wygrałbyś od nich pulę” fałszywe, gdy pasująca ręka remisuje (26,1% i 27,4% wariantów) | otwarte |
| 06-tresci-003 | P1 (WYS) | M | SC-13: duży rozmiar uczony też na flopach sparowanych i z możliwym stritem, gdzie źródło reguły mówi „size down” / „small sizing” | otwarte |
| 06-tresci-005 | P1 (WYS) | M | Zdanie „Liczby” defend: „tyle całego zakresu bronisz w teorii” — MDF na flopie jako norma, sprzeczne z R-M6-003, lekcją m6-l1 i GTO Wizard | otwarte |
| 06-tresci-004 | P2 (ŚR) | M | SC-13: „potrzebuje więcej equity, niż ma” — equity do rivera draw ma większe niż cena ⅔ (977/1000 wariantów); chodzi o szansę na jedną kartę | otwarte |
| 06-tresci-006 | P2 (NIS) | M | SC-29: zadanie exploit ma tę samą odpowiedź co baza SC-22, więc „betujesz więcej rąk, także cieńszych” nie jest w nim ćwiczone | otwarte |

## Weryfikacja twierdzeń
Zakres: całość (5 szkiców pl + en, SC-24 pl + en, `liczby-river-catch-defend.md`, 8 decyzji D-1460…D-1467, 8 reguł użytych w szkicach) · Hierarchia: z `CLAUDE.md` (ADR-24) · Skrypty: własny rachunek bez narzędzi autora `dowody/fs-niezalezny-pl.txt` i `dowody/fs-niezalezny-en.txt` (kod 0, 1000 ziaren na szkic, pl i en identyczne; W/L/T własnymi kombinacjami równe generatorowi we wszystkich 4000 wariantach `river-value`); `dowody/fs-sc24-sc28.txt` (kod 0); 13/13 cytatów dosłownie (`dowody/fs-zrodla.txt`); kontrola szkiców autora uruchomiona przeze mnie (`dowody/fs-fq-kontrola.txt`).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M5-008 (SC-13) | `docs/tresci/szablony-robocze/fq/pl/sc-13.yaml:27` | silna ręka na flopie two-tone wobec drawów → większy rozmiar | blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ (OESD possible, Connected, Flop Pairing) | “Connected boards are a unique case … we size down”; “they tend to only be bet for small sizing” | CZĘŚCIOWO (POPARTE dla flopów bez możliwego strita i bez pary; SPRZECZNE dla 26,7% wariantów) | „na takim flopie” obejmuje flop sparowany i połączony | filtr `ranks: [semi-connected, disconnected]` | 003 |
| rachunek ceny (SC-13) | `docs/tresci/szablony-robocze/fq/pl/sc-13.yaml:25` | ⅔ puli: cena 28,57%, draw ma 9/47 = 19,15% na turnie | rachunek własny (`dowody/fs-niezalezny-pl.txt`) | — | CZĘŚCIOWO (słowo equity zamiast szansy na następną kartę; equity do rivera 0,282–0,398) | pierwsze zdanie: drawy rywala mają dużo equity | patrz 004 | 004 |
| R-M8-001 (SC-22, SC-28, SC-29) | `docs/tresci/szablony-robocze/fq/pl/sc-22.yaml:23` | bet ⇔ ponad 50% rąk sprawdzających gorsze | rachunek (EV bet − EV czek = B·(W − L)), upswingpoker.com/thin-value-bet-poker-strategy/ | “you expect to win the pot a little over 50% of the time” | SC-22 CZĘŚCIOWO (remisy: 113/1000 wariantów z W ≤ 50% wszystkich sprawdzających); SC-28, SC-29 POPARTE (0/1000) | zdanie o remisach brak | patrz 001 | 001 |
| R-M8-001 (SC-22 check) | `docs/tresci/szablony-robocze/fq/pl/sc-22.yaml:25` | pasujące nie zmieniają rachunku: po czekaniu wygrałbyś od nich pulę | rachunek własny | — | CZĘŚCIOWO (274/1000 wariantów z remisem wśród pasujących: po czekaniu pół puli) | — | patrz 002 | 002 |
| R-M8-002 (SC-25) | `docs/tresci/szablony-robocze/fq/pl/sc-25.yaml:26` | bet średnią ręką: płacą lepsze, pasujące „i tak przegrałyby” | thepokerbank.com/strategy/hand-guide/river; GTO Wizard thin value | “You are only going to get called by better hands the majority of the time.” | reguła POPARTE (lepsze ÷ wszystkie sprawdzające > 50% w 1000/1000); „i tak przegrałyby” SPRZECZNE w 261/1000 | — | patrz 002 | 002 |
| R-M10-006 (SC-29) | `docs/tresci/szablony-robocze/fq/pl/sc-29.yaml:24` | pasywny gracz rekreacyjny → value bet więcej, cieńszy | pokercoaching.com/blog/poker-stats/; deepfold.co/en/blog/hud-stats-guide | “value bet them more across all betting streets, especially on the river.”; “Value bet thinly, never bluff river.” | POPARTE (szczebel 4 z populacją w rejestrze, poziom exploit) | odpowiedź taka sama jak w SC-22 | patrz 006 | 006 |
| R-M10-004/005 (SC-29) | `docs/tresci/szablony-robocze/fq/pl/sc-29.yaml:8` | VPIP od ok. 35%, PFR niższy o ponad 10 punktów → pasywny | pokercoaching.com/blog/poker-stats/ | “When a player’s PFR is more than 10 points below their VPIP, I immediately flag them as a passive player” | POPARTE (granica ostra „ponad” = „more than”) | — | — | — |
| R-M9-008 (SC-28) | `docs/tresci/szablony-robocze/fq/pl/sc-28.yaml:28` | trzecia ulica, gdy rywal płaci słabszymi | rachunek R-M8-001 (w ≥ 0,742 w 1000/1000) | — | POPARTE (wynika z R-M8-001; `dryBoard` działa: 0/1000 stołów z trzema kartami koloru albo stritem) | — | — | — |
| R-M8-010 (SC-24, FN-N1) | `docs/tresci/szablony-robocze/fd/pl/sc-24.yaml:25` | call zarabia tylko, gdy udział blefów > cena | rachunek; `eq.bet-pot` = 1/3 | — | POPARTE (warunkowe w pl i en, zdanie o zakładzie puli: 14/42 = 33,3%) | — | — | — |
| river-catch „Liczby” | `docs/tresci/liczby-river-catch-defend.md:20` | potrzeba = kwota ÷ (pula po zakładzie + kwota) | rachunek własny, 9 wariantów (`dowody/fs-sc24-sc28.txt`) | — | POPARTE (11/36 = 30,6%; 23/76 = 30,3%; 14/42 = 33,3%; kierunek = `correct` w 9/9) | — | — | — |
| defend „Liczby” | `docs/tresci/liczby-river-catch-defend.md:42` | MDF = tyle zakresu bronisz w teorii | blog.gtowizard.com/mdf-alpha/ | “On average, BB is consistently over-folding to all bet sizes on the flop.” | SPRZECZNE (punkty defend są na flopie) | lekcja m6-l1 oznacza to jako błąd | patrz 005 | 005 |

## Linia bazowa i założenia
Linię bazową zbudowałem przed czytaniem uzasadnień autora: szkice, reguły i generator najpierw; własny rachunek wariantów (kombinacje klas i podział W/L/T napisane od nowa, z poker-core tylko `generateVariant`, `strength` i `classifyFlop`); źródła reguł otwarte dziś. Nagłówki szkiców (komentarze autora) czytałem razem z treścią, `docs/decyzje/FQ.md` dopiero po rachunku.

Wymiary pokrycia:
- Kategorie twierdzeń (reguły w wyjaśnieniach, liczby `{{n:}}`, dane zadania, progi generatora): sprawdzone; 001–006.
- Progi krytyczne dla zdrowia, życia, mienia i prawa: sprawdzone, brak (treść pokerowa bez progów bezpieczeństwa).
- Brakujące ostrzeżenia i granice stosowania: sprawdzone; 005 (MDF na flopie bez „punkt odniesienia”), 003 (brak granicy „flop bez pary i bez możliwego strita”).
- Jednostki i warianty regionalne: sprawdzone, brak problemu (bb, % puli, punkty procentowe VPIP−PFR); pl i en mają ten sam sens w 5 szkicach i SC-24 (różnice tylko w znacznikach, np. en SC-13 „A small bet” bez `{{t:bet}}` — bez skutku).
- Aktualność źródeł: sprawdzone; 8 stron dostępnych dziś, 13/13 cytatów bez zmian.
- Trudna pamięć: sprawdzone, brak (nie dotyczy dziedziny).
- Pary zdań: sprawdzone; 004 (SC-13: „trafia na turnie w 19,1%” + „potrzebuje więcej equity, niż ma” daje equity = 19,1%), 002.
- Twierdzenia z jednym źródłem albo z niskich szczebli: R-M10-006 tylko szczebel 4 z populacją (poziom exploit, zgodnie z ADR-24 pkt 5); R-M8-002 szczebel 4 + 2; reszta rachunek.

Soczewki: laik czytający dosłownie (001, 002: „ponad połowa rąk, które sprawdzą” liczona przez niego razem z remisami), ekspert szukający szkodliwych uproszczeń (003, 004, 005), sceptyczny weryfikator otwierający źródła (003: cytat GW w nagłówku SC-13 pochodzi z sekcji „OESD possible”, nie z „two-tone”), osoba z innego języka (pl = en). Wzorzec najlepszych: ćwiczenie, w którym każde zdanie wyjaśnienia jest prawdziwe dla każdego wylosowanego rozdania, a nie tylko dla typowego; tu łamią to 001 i 002. Zmian w `docs/zalozenia.md` nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `docs/tresci/szablony-robocze/fq/pl/*.yaml` (5) | tak, każde zdanie | odczyt + rachunek (`dowody/fs-niezalezny-pl.txt`) |
| `docs/tresci/szablony-robocze/fq/en/*.yaml` (5) | tak, każde zdanie + rachunek | `dowody/fs-niezalezny-en.txt` |
| `docs/tresci/szablony-robocze/fd/{pl,en}/sc-24.yaml` (FN-N1) | tak | odczyt; liczby `dowody/fs-sc24-sc28.txt` |
| `docs/tresci/liczby-river-catch-defend.md` | tak, formuły i oba zdania | `dowody/fs-sc24-sc28.txt`, `dowody/fs-005-test.txt` |
| `docs/decyzje/FQ.md` D-1460…D-1467 | tak | odczyt; werdykty w „Decyzje FQ” niżej |
| generator `flop-size`, `river-value` | tak (gałęzie użyte przez szkice) | `packages/poker-core/src/scenario-gen.ts:786-806`, `:843-865`, `:1144-1177` |
| kontrola szkiców autora (`fq-kontrola-szkicow.sh fq`) | tak, uruchomiona przeze mnie | `dowody/fs-fq-kontrola.txt` |
| rejestr reguł użytych w szkicach (8) | tak | `docs/tresci/rejestr.json` |
| ekran aplikacji | nie (widok `river-value` nie istnieje, D-1420) | — |
| przekłady 33 języków | nie (szkice tylko pl/en) | — |

## Kontrola dowodów i sekretów
Wynik `sprawdz-raport.mjs --rola 06-tresci`: w sekcji „Wynik kontroli” na końcu (uruchomiony przed oddaniem).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każde zdanie wyjaśnień ma regułę szablonu albo rachunek; zdania sytuacji to dane zadania (D-1300) |
| TRE-02 | dotyczy | 003, 005; reszta POPARTE (tabela weryfikacji) |
| TRE-03 | dotyczy | 003 (zakres źródła: flop bez możliwego strita i bez pary) |
| TRE-04 | dotyczy | ok: R-M10-006 szczebel 4 z populacją (poziom exploit), oznaczone w rejestrze |
| TRE-05 | dotyczy | ok: brak sprzecznych źródeł jednego szczebla w użytych regułach |
| TRE-06 | dotyczy | ok: wszystkie liczby przez `{{n:}}`, klucze istnieją w `content/numbers.yaml`; cena ⅔ bez liczby (D-1461, utrzymać) |
| TRE-07 | dotyczy | 004 (konwencja jednej karty bez nazwy w zdaniu) |
| TRE-08 | dotyczy | 001, 002, 006 |
| TRE-09 | nie dotyczy | brak faktów zmiennych w szkicach (progi HUD są w `numbers.yaml` z datą odczytu w rejestrze) |
| TRE-10 | nie dotyczy | brak treści krytycznych (poker, D-027 nie ma zastosowania) |
| TRE-11 | nie dotyczy | brak treści o trudnej pamięci |
| TRE-12 | nie dotyczy | brak treści zależnej od lokalizacji |
| TRE-13 | nie dotyczy | szkice nie są jeszcze w produkcie (`content/` bez zmian) |
| TRE-14 | dotyczy | ok: cytaty źródeł tylko w nagłówkach i rejestrze (1 zdanie), treść własnymi słowami |

## Decyzje FQ: werdykty
| Decyzja | Werdykt | Powód |
|---|---|---|
| D-1460 (SC-13) | **zmienić** | dodać `ranks: [semi-connected, disconnected]` do `flop` (003, D-1473) i brzmienie ceny (004, D-1474); reszta (¼ vs ⅔, δ 0,02, pule /12, tylko Ł) utrzymać |
| D-1461 (cena ⅔ bez liczby) | utrzymać | zgodne z zasadą `{{n:}}`; propozycja kluczy dla 08 poprawna (2/3 ÷ (1 + 4/3) = 2/7 = 28,57%) |
| D-1462 (SC-22/25/28) | **utrzymać z poprawką tekstu** | rozkłady w potwierdzone (SC-22 0,600–1,000, mediana 0,739; SC-25 0–0,400; SC-28 ≥ 0,742); „remisy pominięte (uproszczenie)” nie przenosi się na zdania wyjaśnień (001, 002; D-1471, D-1472) |
| D-1463 (SC-29) | utrzymać | warunek R-M10-006 spełniony daną zadania; dolna granica w w mojej próbce 0,611 (D-1463: „ok. 0,63”), werdykt bez zmian; 006 to NIS |
| D-1464 (FN-N1) | utrzymać | zweryfikowane: oba teksty SC-24 warunkowe w pl i en; zdanie o zakładzie puli 33,3% = 14/42 |
| D-1465 („Liczby”) | **zmienić (defend)** | river-catch utrzymać (formuła i kierunek sprawdzone); defend: zdanie MDF do poprawy (005, D-1474) |
| D-1466 (bramka FQ) | utrzymać | skrypt działa u mnie (`dowody/fs-fq-kontrola.txt`) |
| D-1467 (08-FQ-1, 08-FQ-2) | utrzymać | 08-FQ-1 odtworzone w kontroli (`dowody/fs-fq-kontrola.txt`); 003 dodatkowo zmniejsza przyjęcia SC-13 o ok. 27% (filtr flopu), więc naprawa 08-FQ-1 musi to uwzględnić |

## Znaleziska (szczegóły)

### 06-tresci-001 · SC-22: „ponad 50% rąk, które sprawdzą, to ręce gorsze” jest fałszywe w 11,3% wariantów (remisy)
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1 (WYS) · Realność: realny (po wejściu SC-22 na ekran) · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fq/pl/sc-22.yaml:23` „bo ponad {{n:value.threshold}} rąk, które {{t:call|sprawdzą}}, to ręce gorsze od twojej”; generator liczy w = W ÷ (W + L) bez remisów (`packages/poker-core/src/scenario-gen.ts:1176`). `dowody/fs-niezalezny-pl.txt`: licznik «gorsze ÷ WSZYSTKIE sprawdzające ≤ 50%»: 113 z 1000; pierwszy: ziarno 6, gracz T♦A♣, stół 8♥2♦A♠2♣K♥. Ręcznie: AK, AQ, AJ mają AA22 z kickerem K ze stołu = remis z graczem (6 + 8 + 8 = 22 kombinacje), KQ ma KK22A = gorsza (12), lepszych 0. w = 12/12 = 1 (bet słuszny), ale gorsze to 12 z 34 sprawdzających = 35%, nie „ponad 50%”. To samo zdanie w en (`docs/tresci/szablony-robocze/fq/en/sc-22.yaml:20`) i w tekście check (`docs/tresci/szablony-robocze/fq/pl/sc-22.yaml:25`).
- Mechanizm: tekst mówi o udziale wśród wszystkich sprawdzających, generator o udziale bez remisów; `grep -n "ponad {{n:value.threshold}}" docs/tresci/szablony-robocze/fq/pl/*.yaml` → 7 trafień w SC-22, SC-28, SC-29; fałszywe tylko w SC-22 (SC-28 0 remisów, SC-29 0/1000 poniżej 50%), ale bez trwałej kontroli każdy nowy szablon może trafić tak samo.
- Powraca: nie
- Wzorzec lub źródło: rachunek R-M8-001: przy remisie bet i call dzielą większą pulę, więc zysk względem czekania = 0; remis jest obojętny, a zdanie musi go wyłączyć.
- Kroki w aplikacji: SC-22, rozdanie z kickerem na stole (np. ziarno 6); gracz czyta, że ponad połowa sprawdzających to gorsze ręce, a dwie trzecie z nich dzieli pulę.
- Opcje: (a) tekst: „wśród rąk, które {{t:call|sprawdzą}}, gorszych od twojej jest więcej niż lepszych (remis dzieli {{t:pot|pulę}} i nie zmienia rachunku)” — dokładne w każdym wariancie, bez kodu; (b) generator: werdykt bet także przy W ÷ (W + L + T) ≥ 0,5 + δ — zostawia obecne zdanie, ale wymaga kodu 08 i nowych odcisków. Rekomendacja: (a) (D-1471), dla SC-22, SC-28 i SC-29 jednakowo (spójność między modułami).
- Test akceptacyjny: `dowody/fs-niezalezny.ts.txt` (uruchomienie jak w nagłówku `dowody/fs-niezalezny-pl.txt`) po poprawce tekstu nie dotyczy już licznika „gorsze ÷ WSZYSTKIE”; trwała kontrola: test 08 w content-build, który dla każdego szablonu `river-value` z frazą „ponad … rąk, które sprawdzą” wymaga 0 wariantów z W ÷ (W + L + T) ≤ 0,5 na 2000 ziarnach.
- Status: otwarte

### 06-tresci-002 · SC-25 i SC-22: zdania o rękach, które spasują, fałszywe, gdy pasująca ręka remisuje
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1 (WYS) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fq/pl/sc-25.yaml:26` „a ręce, które {{t:fold|spasują}}, i tak przegrałyby z tobą przy {{t:showdown|showdownie}}”; `docs/tresci/szablony-robocze/fq/pl/sc-22.yaml:25` „Ręce, które {{t:fold|spasują}}, nie zmieniają rachunku: po {{t:check|czekaniu}} też wygrałbyś od nich tylko {{t:pot|pulę}}”. D-1417 świadomie dopuszcza remis z pasującą („remis z pasującą nie odrzuca”), a nagłówek SC-25 twierdzi „Pasujące ręce są gorsze od gracza w każdym wariancie” (`docs/tresci/szablony-robocze/fq/pl/sc-25.yaml:4`). `dowody/fs-niezalezny-pl.txt`: remis wśród pasujących SC-25 261/1000, SC-22 274/1000. Ręcznie SC-25 ziarno 4: gracz Q♥2♥, stół K♥Q♠4♣8♠8♦: gracz QQ88K, pasujące QJ też QQ88K = remis (8 kombinacji), więc „i tak przegrałyby” fałszywe; po czekaniu gracz dzieli z nimi pulę, a nie ją wygrywa (SC-22).
- Mechanizm: `grep -n "i tak przegrałyby\|wygrałbyś od nich tylko\|would have lost to you\|would also win only" docs/tresci/szablony-robocze/fq/*/*.yaml` → 4 trafienia (SC-25 i SC-22, pl i en).
- Powraca: nie
- Wzorzec lub źródło: rachunek; D-1302 war. 2 dotyczy rąk lepszych, nie remisów.
- Kroki w aplikacji: SC-25 z kartą stołu, która paruje kicker; gracz czyta, że QJ przegrałby, a w rzeczywistości podzieliłby pulę.
- Opcje: (a) tekst: SC-25 „…i tak nie wygrałyby z tobą przy showdownie” (prawdziwe w każdym wariancie, bo lepszych wśród pasujących jest 0); SC-22 „Ręce, które spasują, nie płacą {{t:bet|zakładu}}, więc nie liczysz ich w tym rachunku” — bez kodu; (b) generator: war. 2 rozszerzony o remis (odrzucić wariant, gdy `classComboSplit(folds).ties > 0`) — obecne zdania stają się prawdziwe, ale zmienia D-1417 i wymaga kodu 08 oraz odcisków. Rekomendacja: (a) (D-1472).
- Test akceptacyjny: grep z „Mechanizm” → 0 trafień zdań, które twierdzą przegraną pasujących albo wygraną całej puli po czekaniu; albo przy (b) licznik „pasujące: remis z graczem” w `dowody/fs-niezalezny-pl.txt` = 0 dla SC-22 i SC-25.
- Status: otwarte

### 06-tresci-003 · SC-13: duży rozmiar uczony na flopach sparowanych i z możliwym stritem
- Pozycja listy kontrolnej: TRE-03
- Poziom: P1 (WYS) · Realność: realny (26,7% wariantów) · Pewność: wysoka · Rodzaj: M
- Dowód: wyjaśnienie uogólnia (`docs/tresci/szablony-robocze/fq/pl/sc-13.yaml:27`): „Silną rękę wobec {{t:draw|drawów}} na takim flopie {{t:bet|stawiasz}} większym rozmiarem”, a poziom ma tylko filtr two-tone (`docs/tresci/szablony-robocze/fq/pl/sc-13.yaml:15`), bez `ranks`. `dowody/fs-niezalezny-pl.txt` (`classifyFlop`): paired 166, connected 101, semi-connected 725, disconnected 8 na 1000; przykład connected: ziarno 3, flop 9♦K♠J♦ (QT to strit); paired: ziarno 1, J♣3♣J♦. Źródło reguły (R-M5-008, `dowody/fs-zrodla.txt`): “We classify flops as connected if it allows for the possibility of a flopped straight.” … “Connected boards are a unique case due to flopped straights often being in the BB’s range. In order to be respectful of this, we size down”; “Paired flops are bet significantly more often than unpaired flops. However, they tend to only be bet for small sizing.” Sama reguła R-M5-008 w rejestrze ma warunek «strit nie jest jeszcze możliwy» i «gdy strit jest już możliwy … solvery betują mniejszym rozmiarem».
- Mechanizm: szablon nie przenosi warunku reguły do filtra flopu; `grep -n "flop: {" docs/tresci/szablony-robocze/fq/pl/sc-13.yaml` → 1 trafienie (bez `ranks`). Inne szablony mają ten filtr (`content/pl/scenarios/sc-04.yaml:19`).
- Powraca: nie
- Wzorzec lub źródło: blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ (szczebel 2, odczyt 2026-11-12), cytaty wyżej.
- Kroki w aplikacji: SC-13, flop K-J-9 dwukolorowy albo J-J-3 dwukolorowy; aplikacja uznaje mały zakład za błąd i uzasadnia to ogólną regułą.
- Opcje: (a) filtr `flop: { suits: [two-tone], ranks: [semi-connected, disconnected] }` w pl i en — zakres wariantów = zakres źródła; mniej przyjęć (ok. 27%), co pogarsza 08-FQ-1; (b) zostawić flopy i zawęzić tekst („na flopie bez pary i bez możliwego strita”) — wtedy na tych flopach oczekiwana odpowiedź `bet-big` nie ma źródła. Rekomendacja: (a) (D-1473).
- Test akceptacyjny: `dowody/fs-niezalezny.ts.txt` dla SC-13: liczniki „flop ranks=paired” i „flop ranks=connected” = 0 na 1000 ziarnach; kontrola szkiców (pojemność 2000 ziaren) kod 0 po naprawie 08-FQ-1.
- Status: otwarte

### 06-tresci-005 · Zdanie „Liczby” defend podaje MDF na flopie jako normę obrony
- Pozycja listy kontrolnej: TRE-02
- Poziom: P1 (WYS) · Realność: realny (po podpięciu przez 08) · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/liczby-river-catch-defend.md:42` „{{t:mdf}} to {{obrona}}: tyle całego {{t:range|zakresu}} bronisz w teorii” (en `:43` „that is how much of your whole {{t:range}} you defend in theory”). Punkty defend są na flopie (SC-07, SC-15, SC-17: `street: flop`, `dowody/fs-005-test.txt`). R-M6-003: na flopie „możesz bronić mniej, niż wskazuje mdf … punkt odniesienia, nie obowiązek”; lekcja oznacza „Tak, inaczej Button zarabia każdą ręką” jako błąd (`content/pl/lessons/m6-l1-mdf-alpha.md:83`); GTO Wizard (szczebel 2): “On average, BB is consistently over-folding to all bet sizes on the flop.” (`dowody/fs-zrodla.txt`).
- Mechanizm: MDF podawany bez ulicy; `grep -n "bronisz w teorii\|you defend in theory" docs/tresci/liczby-river-catch-defend.md` → 2 trafienia.
- Powraca: tak, recenzja FK 06-tresci-001 (SC-15: próg alpha na flopie jako norma) → trwała kontrola: test 08 na tekście klucza `scenario.numbers.defend`, że zawiera zastrzeżenie flopu, oraz grep w `dowody/fs-005-test.txt` = 0.
- Wzorzec lub źródło: R-M6-003 (szczebel 2, cytat wyżej, odczyt dziś).
- Kroki w aplikacji: SC-15 po podpięciu „Liczb”: gracz czyta, że w teorii broni 75% zakresu wobec c-betu ⅓, choć lekcja m6-l1 uczy, że na flopie może mniej.
- Opcje: (a) „{{t:mdf}} to {{obrona}}: to punkt odniesienia dla całego {{t:range|zakresu}}; na flopie możesz bronić trochę mniej, a o jednej ręce decyduje wyjaśnienie” — brzmienie lekcji, bez kodu; (b) usunąć MDF z „Liczb” defend i zostawić samą cenę — prostsze, ale traci powiązanie z M6. Rekomendacja: (a) (D-1474).
- Test akceptacyjny: grep z `dowody/fs-005-test.txt` → 0 trafień; nowe zdanie pl i en zawiera zastrzeżenie flopu.
- Status: otwarte

### 06-tresci-004 · SC-13: „potrzebuje więcej equity, niż ma” — equity do rivera draw ma większe niż cena
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2 (ŚR) · Realność: realny · Pewność: średnia · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fq/pl/sc-13.yaml:25` „trafia na turnie w ok. {{n:odds.flush.flop-turn}} przypadków, a przy {{t:bet|zakładzie}} dwóch trzecich {{t:pot|puli}} potrzebuje więcej equity, niż ma”. Rachunek: equity rywala do rivera 0,282–0,398 (mediana 0,371), większe od ceny 0,2857 w 977/1000 wariantów (`dowody/fs-niezalezny-pl.txt`). Konwencja jednej karty jest w kursie (`content/pl/lessons/m2-l1-outy.md:55`: „Za zwykły {{t:bet}} na flopie kupujesz jedną kartę”) i w D-1306 (uproszczenie nazwane), więc kierunek zgodny; ale słowo „equity” w tym samym wyjaśnieniu oznacza też pełne szanse („drawy rywala mają dużo equity”), a M2 uczy ok. 35% do rivera (`odds.flush.flop-river`).
- Mechanizm: `grep -n "więcej equity, niż ma\|more equity than it has" docs/tresci/szablony-robocze/fq/*/sc-13.yaml` → 2 trafienia.
- Powraca: nie
- Wzorzec lub źródło: rachunek; D-1306.
- Kroki w aplikacji: SC-13, wybór dowolny; gracz po M2 wie, że kolor ma ok. 35% do rivera, i czyta, że ma mniej niż 28,6%.
- Opcje: (a) „…a przy zakładzie dwóch trzecich puli cena za następną kartę jest wyższa niż jego szansa na nią”; (b) zostawić i dopisać uproszczenie do R-M5-008 w rejestrze. Rekomendacja: (a) (D-1474).
- Test akceptacyjny: grep z „Mechanizm” → 0; nowe zdanie wiąże cenę z jedną kartą w pl i en.
- Status: otwarte

### 06-tresci-006 · SC-29: zadanie exploit ma tę samą odpowiedź co baza SC-22
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (NIS) · Realność: brzegowy · Pewność: średnia · Rodzaj: M
- Dowód: SC-22 (baza, najwyższa para, `expected: ["bet"]`, w mediana 0,739) i SC-29 (pasywny rywal, ta sama ręka, `expected: ["bet"]`, w mediana 0,747) (`dowody/fs-niezalezny-pl.txt`). Zdanie „betujesz {{t:value|dla wartości}} więcej rąk, także cieńszych” (`docs/tresci/szablony-robocze/fq/pl/sc-29.yaml:24`) jest prawdziwe (R-M10-006), ale zadanie nie pokazuje różnicy: ta sama ręka byłaby betem także wobec rywala z SC-22.
- Mechanizm: `grep -n "pairKind" docs/tresci/szablony-robocze/fq/pl/sc-29.yaml docs/tresci/szablony-robocze/fq/pl/sc-22.yaml` → 2 trafienia, oba `[top]`.
- Powraca: nie
- Wzorzec lub źródło: R-M10-006 (pokercoaching, deepfold; `dowody/fs-zrodla.txt`).
- Kroki w aplikacji: SC-29 po SC-22 — gracz nie widzi, co zmienia typ rywala.
- Opcje: (a) słabsza ręka gracza (np. `pairKind: [second]`), która wobec rywala z SC-22 byłaby czekaniem, a wobec szerokiego zakresu SC-29 betem — ćwiczy exploit, wymaga nowego rachunku pojemności; (b) zostawić — treść prawdziwa, ćwiczenie słabsze. Rekomendacja: (a) przy następnej fali (decyzja zakresu ćwiczenia należy do 03, zgłoszenie do backlogu).
- Test akceptacyjny: SC-29 ma rękę, dla której ten sam zakres sprawdzenia z SC-22 daje czekanie (rachunek na 1000 ziarnach).
- Status: otwarte

## Do sprawdzenia
- Pojemność SC-13 po filtrze z 003: semi-connected + disconnected to 73,3% dzisiejszych przyjęć; czy po naprawie 08-FQ-1 bramka 2000 ziaren przejdzie — do sprawdzenia przez 08 po obu zmianach.
- R-M10-006 wiąże „value bet thinly” z WTSD, a SC-29 identyfikuje rywala po VPIP − PFR; łańcuch idzie przez R-M10-005 („calling-station”) i cytat pokercoaching „calls too much” — przyjmuję jako POPARTE, ale bez źródła, które łączy wprost różnicę VPIP − PFR z cieńszym value betem.
- Czy ekran river-value (04/08) pokaże W i L — jeśli tak, opcja (b) w 001 staje się mniej potrzebna; nie sprawdzałem projektu widoku (nie istnieje).

## Co działa dobrze i należy zachować
- Liczby wyłącznie przez `{{n:}}`, a brak klucza ceny ⅔ rozwiązany bez liczby wpisanej ręcznie (D-1461).
- Generator `river-value` liczy dokładnie: mój niezależny podział W/L/T zgadza się z `classComboSplit` w 4000 z 4000 wariantów; filtr `dryBoard` działa (0/1000).
- Sytuacje „Załóż, że rywal nie przebija…” trzymają zakres rywala jako daną zadania (D-1300), a SC-29 nie uogólnia faktu o rywalu poza „tu”.
- FN-N1 naprawione czysto: oba wyjaśnienia SC-24 warunkowe w pl i en, kierunek nierówności zawsze z warunkiem.
- Formuły „Liczb” river-catch zgodne z ekranem (pula po zakładzie) i z `requiredEquity`; rezygnacja z „raz na N” dla udziału blefów dobrze uzasadniona (D-1465 a).

## Decyzje dla właściciela
Brak. Znaleziska 001–006 są merytoryczne (ADR-24, rozstrzyga rola 06: D-1470…D-1474 w `docs/decyzje/FS.md`); 006 dotyczy też zakresu ćwiczenia (rola 03, backlog). Wszystkie do weta przez koordynatora.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-003,06-tresci-004,06-tresci-005` (szkice i szkic „Liczb”, rola 06); trwałe kontrole z 001 i 005 do roli 08 (test content-build) razem z 08-FQ-1; 006 do backlogu (rola 03).

Kolejność: 001 i 002 przed wejściem SC-22/SC-25 (po widoku D-1420); 003 i 004 razem z naprawą 08-FQ-1 (ten sam szablon, wspólny pomiar pojemności); 005 przed podpięciem „Liczb” defend przez 08.

## Wynik kontroli
Wynik `sprawdz-raport.mjs`: wpisany po uruchomieniu (niżej).
