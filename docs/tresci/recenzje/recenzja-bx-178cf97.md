# Recenzja niezależna pracy BX (M12, egzamin q1, q2, q3, q8; treść krytyczna): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-10
Commit: 178cf97 (= `sesja-bx-m12`), przedmiot `git diff 70fdf40..178cf97` (46 plików, w tym 35 baz treści) · Tryb: audit (rola 06, moduły kontrole-mechaniczne i tresci-krytyczne; sesja CC, polecenie koordynatora `docs/koordynacja/polecenia/CC.md` @ 6116023) · Środowisko: Linux 6.18, pnpm; `pnpm install --frozen-lockfile` kod 0, `pnpm run ci` kod 0 na 178cf97 (`docs/tresci/dowody/cc-ci-178cf97.txt`); sieć do źródła działa (curl, HTTP 200); bez macOS i Xcode (niepotrzebne do tej recenzji).

Kolejność pracy: najpierw własna ocena 4 zdań na rachunku i regułach (zapis w scratchpadzie przed odczytem materiałów autora), potem `docs/tresci/dowody/bx-przeglad-zastepczy.md`, `docs/tresci/stan-bx.md` i `docs/decyzje/BX.md`. Jedno odstępstwo: wpis D-675 zobaczyłem w wyniku `grep D-565` przy szukaniu definicji wzorca D-565, zanim skończyłem własną ocenę. Nie zmienił on werdyktów, bo każdy z nich opiera się na rachunku z `content/numbers.yaml` (dowód niżej).

## Podsumowanie
**Werdykt: PRZYJĄĆ.** Cztery nowe zdania sensu w poprawnych opcjach q1, q2, q3 i q8 są prawdziwe przy liczbach zadania. Sprawdziłem to niezależnym rachunkiem (`dowody/cc-178cf97-rachunek.txt`). Poprawne odpowiedzi, klucze `{{n:}}` i rachunki się nie zmieniły. W q8 (treść krytyczna: bankroll, czyli mienie) brzmienie jest po stronie bezpiecznej: tekst nie uspokaja, nazywa wzór przybliżeniem i zawęża wniosek do bankrollu z zadania. Źródło wzoru otworzyłem sam w dniu recenzji. `przeglad.sha` 5 twierdzeń krytycznych zgadza się z bieżącym tekstem: `pnpm tresci:rejestr` w CI dał 0 błędów. Bazy treści zawierają nowe brzmienie.

Znalezisk blokujących brak. Dwa nieblokujące: przekłady 11 języków mają starą kolejność wyjaśnień, i to drugi raz po BN, a kontrola przeglądu języków tego nie wykrywa (ŚREDNIE). Druga sprawa to niejednoznaczny podmiot w zdaniu q3 (NISKIE).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P2 · ŚREDNIE | D | Przekłady 4 zmienionych wyjaśnień M12 (11 języków) zostały w starej wersji, a kontrola `przeglad_jezyki` nie widzi zmiany źródła pl; drugi raz po BN 06-tresci-006 | otwarte |
| 06-tresci-002 | P2 · NISKIE | M | q3: w „Wyższe odchylenie wymaga dużo większej próby: stoi we wzorze w kwadracie” podmiot „stoi” można odczytać jako „próba” | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 1, NISKIE 1. Testy odtwarzające: niewymagane (brak KRYT i WYS).

## Weryfikacja twierdzeń
Zakres: całość, czyli 4 zmienione pola `why` (`content/pl/exams/m12.yaml:9`, `:18`, `:27`, `:73`), w każdym zdanie sensu i rachunek, plus 5 twierdzeń krytycznych z odświeżonym `przeglad.sha`. · Hierarchia: z CLAUDE.md (ADR-24; rachunek to szczebel 1) · Skrypty: `pnpm run ci` kod 0, w tym `tresci:rejestr` z wynikiem "0 błędów, 0 uwag" (`docs/tresci/dowody/cc-ci-178cf97.txt`); rachunek niezależny `dowody/cc-178cf97-rachunek.txt` (kod 0); źródło `dowody/cc-178cf97-zrodlo-ror.txt` (HTTP 200, grep kod 0).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| q1 sens | `content/pl/exams/m12.yaml:9` „Wynik oczekiwany to tylko średnia” | wynik może być daleko od średniej; wygrywający może skończyć na minusie | rachunek: `content/numbers.yaml:794-800` | przedział 15 ± 35,08 = −20,1 do 50,1 wpisowych; dolna granica < 0 | POPARTE | z rachunkiem spójne (rachunek pokazuje tę samą dolną granicę w pytaniu) | — | — |
| q2 sens | `content/pl/exams/m12.yaml:18` „to dla winrate mała próba: po niej nie wiesz nawet, czy wygrywasz” | przedział 95% winrate po 50 tys. rąk obejmuje wartości ujemne | rachunek: `content/numbers.yaml:801-804`; R-M12-001 | 3 ± 7,06 = −4,06 do 10,06 bb/100 | POPARTE | ok | — | — |
| q3 sens | `content/pl/exams/m12.yaml:27` „stoi we wzorze w kwadracie, a błąd maleje dopiero z pierwiastkiem z liczby rąk” | potrzebna próba rośnie z kwadratem SD | rachunek: `content/numbers.yaml:805-808`; R-M12-003 because | 9604 bloki (960 tys. rąk) wobec 6147 (615 tys.) przy SD 80; stosunek 1,5625 = (100/80)² | POPARTE | ok; "dużo większej" było już w 70fdf40 | — | 06-tresci-002 (brzmienie) |
| q8 sens (krytyczne) | `content/pl/exams/m12.yaml:73` „Dodatni winrate nie chroni przed” | RoR maleje wykładniczo z bankrollem; przy 2bb/100 i 40 wpisowych wyraźnie > 0 | primedope.com, artykuł „Risk of Ruin Formula for Poker Players”, HTML l. 468–469 i 570–571 (odczyt 2026-11-10); rachunek `content/numbers.yaml:815-820` | "For cash games with a constant win rate and standard deviation, the closed-form approximation: RoR = e^(-2 x WR x BR / SD^2)"; x = 2,50, RoR = 8,2% | POPARTE | "maleje wykładniczo" stoi przed zastrzeżeniem "przybliżenie", które pada w następnym zdaniu tej samej opcji; razem nie dają wniosku spoza źródła; strona bezpieczna (nie uspokaja) | — | — |
| q8 rachunek | `content/pl/exams/m12.yaml:73` „Rachunek (przybliżenie przy stałym winrate i SD)” | zastrzeżenie wzoru | jak wyżej + R-M12-009 then | „to przybliżenie przy stałym winrate i SD” | POPARTE | prompt q8 „jeśli nigdy nie zejdziesz” odpowiada założeniu źródła „No moving down in stakes” (HTML l. 571) | — | — |
| `przeglad.sha` ×5 | `docs/tresci/rejestr/m12-m13.json` (R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:ror.two) | przegląd dotyczy bieżącej wersji pliku m12.yaml (jednostka skrótu: cały plik, `docs/tresci/narzedzia/scal-rejestr.mjs:57-60`) | `pnpm tresci:rejestr` w CI | "0 błędów, 0 uwag" | POPARTE | — | — | — |

## Linia bazowa i założenia
Wymiary pokrycia:
- Kategorie twierdzeń: 4 zdania sensu (fakty statystyczne) i 4 rachunki (bez zmian względem 70fdf40). Sprawdzone, opis w tabeli.
- Progi krytyczne (mienie): q8 RoR. Brzmienie nie zaniża ryzyka, a wniosek zawężono do bankrollu z zadania. Sprawdzone.
- Brakujące ostrzeżenia: źródło wymienia też „slightly fatter tails” (HTML l. 570), czyli rzeczywiste ryzyko może być wyższe niż ze wzoru. Tekst tego nie wyklucza i niczego nie obiecuje. Lekcja M12-L4 jest poza zakresem tej recenzji. Wynik: sprawdzone, brak znaleziska.
- Jednostki i warianty regionalne: bb/100, wpisowe po 100bb. Brak zależności od kraju. Sprawdzone, brak.
- Aktualność źródeł: wzór matematyczny, strona otwarta dziś. Sprawdzone, brak.
- Trudna pamięć: nie dotyczy.
- Pary zdań: przeczytane w każdej z 4 opcji (sens z rachunkiem) i z dystraktorami tego samego pytania. Sprzeczności brak.
- Jedno źródło albo niskie szczeble: q1–q3 stoją na rachunku (szczebel 1), q8 na wzorze (rachunek) i źródle szczebla 4 (serwis z kalkulatorami). Wystarcza.

Soczewki: laik czytający dosłownie (q3 „stoi”, znalezisko 002), ekspert od wariancji (wzór RoR przy stałym winrate; przybliżenie nazwane), sceptyczny weryfikator (źródło otwarte, rachunek od nowa), osoba z innego kraju (przekłady, znalezisko 001). Wzorzec najlepszych w klasie: każde zdanie uczące stoi na rachunku albo przeczytanym źródle. Tak jest w 4 zmienionych opcjach. Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/exams/m12.yaml` (diff 4 linii) | tak, całość | rachunek `dowody/cc-178cf97-rachunek.txt`; reguły R-M12-001/003/009 w `content/pl/rules.yaml` |
| `content/numbers.yaml` (klucze użyte w q1–q3, q8) | tak | rachunek jak wyżej |
| `docs/tresci/rejestr/m12-m13.json`, `rejestr.json` (`przeglad.sha`) | tak | `docs/tresci/dowody/cc-ci-178cf97.txt` (`tresci:rejestr`) |
| bazy treści `apps/mobile/assets/content/tresc-2ea70f95f1-*.db` | tak dla pl (4 nowe zdania obecne w `exam_drills`); pozostałe tylko przez `content:check` w CI | `docs/tresci/dowody/cc-ci-178cf97.txt` |
| `docs/tresci/dowody/bx-przeglad-zastepczy.md` | tak, przeczytany po własnej ocenie | — |
| `docs/tresci/narzedzia/bx-porownaj-egzamin.mjs` | przeczytany; logika „pierwsze zdanie bez znaku wzoru” i zgodność kluczy | — |
| przekłady `content/<j>/exams/m12.yaml` (11 języków) | stan sprawdzony (bez zmian); treści przekładów nie oceniano | `dowody/cc-178cf97-przeklady.txt` |
| ekrany aplikacji | nie sprawdzono (zmiana tylko w treści; render przez istniejący egzamin) | — |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-bx-178cf97.md . --rola 06-tresci` (kopia skryptu w scratchpadzie): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy | ok: każde nowe zdanie ma oparcie w regule (`rules:` pytania) albo w rachunku |
| TRE-02 | dotyczy | ok: 6 × POPARTE (tabela weryfikacji) |
| TRE-03 | dotyczy | ok: q8 zawężone do bankrollu z zadania; założenia źródła („No moving down”) zgodne z promptem |
| TRE-04 | dotyczy | ok: rachunek (szczebel 1); wzór RoR także w źródle szczebla 4 |
| TRE-05 | nie dotyczy: brak sprzecznych źródeł w zakresie | — |
| TRE-06 | dotyczy | ok: liczby tylko przez `{{n:}}`, klucze bez zmian (skrypt BX i CI `content:check`) |
| TRE-07 | dotyczy | ok: przybliżenie RoR nazwane w q8 |
| TRE-08 | dotyczy | 06-tresci-002 (brzmienie); przekład: 06-tresci-001 |
| TRE-09 | nie dotyczy: brak faktów zmiennych w czasie | — |
| TRE-10 | dotyczy (D-027, przegląd zastępczy) | ok: przegląd zapisany, `przeglad.sha` aktualne; ta recenzja jest niezależnym sprawdzeniem poprawki q8, którą zaproponował i sam ponownie sprawdził ten sam subagent |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy | ok: baza pl ma nowe brzmienie; `content:check` w CI kod 0 |
| TRE-14 | dotyczy | ok: cytat ze źródła w dowodzie ma 1–2 zdania; w produkcie brak cudzego tekstu |

## Znaleziska (szczegóły)

### 06-tresci-001 · Przekłady 4 zmienionych wyjaśnień M12 zostały w starej wersji, a kontrola przeglądu języków nie widzi zmiany źródła pl
- Pozycja listy kontrolnej: TRE-08 (przekład)
- Poziom: P2 (ŚREDNIE: przekłady są prawdziwe, ale w 11 językach wyjaśnienie zaczyna się od rachunku, nie od sensu; mechanizm powraca w treści krytycznej)
- Realność: realny (11 języków, m.in. rynek główny US po angielsku) · Pewność: wysoka
- Rodzaj: D
- Dowód: `content/en/exams/m12.yaml:9` „You expect {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}}” (stara kolejność) wobec `content/pl/exams/m12.yaml:9` „Wynik oczekiwany to tylko średnia”; `dowody/cc-178cf97-przeklady.txt` (diff 70fdf40..178cf97 zmienia tylko plik pl z 12; kod 0). Skrót `przeglad_jezyki.<j>` liczony jest ze źródeł danego języka (`docs/tresci/narzedzia/scal-rejestr.mjs:116`), więc zmiana pl go nie unieważnia, a CI przechodzi.
- Mechanizm: zmiana `why` w `content/pl/` bez zapisu, której wersji pl dotyczy przekład; dziś 4 opcje m12 (q1, q2, q3, q8) × 11 języków, wcześniej 6 opcji m6/m9/m11 (BN).
- Powraca: tak, BN 06-tresci-006 (`docs/tresci/recenzje/recenzja-bn-5cd9d8c.md:169`) → potrzebna trwała kontrola (test niżej). Autor przekazał przekład roli 09 w D-676, ale wpisu w backlogu z wersją nie znalazłem [DO USTALENIA].
- Wzorzec lub źródło: KO-040 (sens przed rachunkiem), polityka 35 języków (CLAUDE.md), zasada D-043 „mechanizm, nie linia”.
- Kroki w aplikacji: egzamin M12 w języku innym niż polski, q8 (ryzyko bankructwa), poprawna odpowiedź: wyjaśnienie bez zdania „dodatni winrate nie chroni…”.
- Opcje: (a) przekład 4 opcji teraz w roli 09, bez kontroli: tanio, ale problem wróci przy kolejnej zmianie pl; (b) przekład w roli 09 plus trwała kontrola: `tresci:rejestr` zapisuje w `przeglad_jezyki.<j>` także skrót pliku pl, z którego robiono przekład, i zgłasza uwagę (dla treści krytycznej błąd), gdy skrót pl się zmienił. Rekomendacja: (b), bo to drugi raz i dotyczy treści krytycznej.
- Test akceptacyjny: zmiana jednego `why` w `content/pl/exams/m12.yaml` bez zmiany przekładu daje w `pnpm tresci:rejestr` błąd dla R-M12-009 w każdym z 11 języków; po przekładzie i kontroli (a) wraca 0 błędów.
- Status: otwarte

### 06-tresci-002 · q3: podmiot „stoi” w zdaniu sensu można odczytać jako „próba”
- Pozycja listy kontrolnej: TRE-08 (brzmienie; patrz SP-11, rola 04)
- Poziom: P2 (NISKIE: fakt prawdziwy, ryzyko błędnego odczytu przez laika)
- Realność: brzegowy · Pewność: średnia
- Rodzaj: M
- Dowód: `content/pl/exams/m12.yaml:27` „Wyższe {{t:standard-deviation|odchylenie}} wymaga dużo większej próby: stoi we wzorze w kwadracie”. Najbliższy rzeczownik przed „stoi” to „próby”, a chodzi o odchylenie (R-M12-003 because: „({{n:var.z95}} × SD ÷ dokładność)²”).
- Mechanizm: zdanie sensu sklejone z dwóch zdań dystraktorów (q3 opcje 2 i 3) bez powtórzenia podmiotu; `grep -n "): stoi\|: stoi" content/pl/exams/*.yaml` → 1 trafienie (to).
- Powraca: nie
- Wzorzec lub źródło: R-M12-003 (`content/pl/rules.yaml`, because)
- Kroki w aplikacji: egzamin M12, q3, poprawna odpowiedź.
- Opcje: (a) „…większej próby, bo odchylenie stoi we wzorze w kwadracie…”: jedno słowo więcej, jednoznaczne; (b) bez zmiany: sens wynika z rachunku obok. Rekomendacja: (a), przy najbliższej zmianie pliku (np. przekładzie z 06-tresci-001), bez osobnego cyklu.
- Test akceptacyjny: zdanie sensu q3 nazywa odchylenie jako podmiot części o kwadracie; `bx-porownaj-egzamin.mjs` nadal 0 niezgodności.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Czy przekład 4 opcji M12 jest w backlogu z wersją (D-676 kieruje go do roli 09). [DO USTALENIA] dla koordynatora.

## Co działa dobrze i należy zachować
- Skrypt `bx-porownaj-egzamin.mjs` porównuje pytania i opcje z wersją bazową i pilnuje, żeby poza wskazanymi `why` nic się nie zmieniło (poprawne odpowiedzi, klucze `{{n:}}`). Był czerwony na 70fdf40, przed zmianą.
- Zdania sensu złożono tylko ze zdań, które już były w tym samym pytaniu, albo z reguły. Nie doszło żadne nowe twierdzenie bez źródła.
- Jednostką `przeglad.sha` jest cały plik (`docs/tresci/narzedzia/scal-rejestr.mjs:57-60`), więc przegląd unieważnia się nawet przy zmianie sąsiedniego pytania. To strona bezpieczna.
- Przegląd zastępczy sam znalazł brak zawężenia w q8 i zaproponował poprawkę po stronie bezpiecznej.

## Decyzje dla właściciela
Brak. Werdykt i ocena poziomów to decyzja merytoryczna roli 06: D-715 w `docs/decyzje/CC.md`. Kolejność przekładu i kontroli z 06-tresci-001 ustala koordynator.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-002`; przekład z 06-tresci-001 to rola 09, a kontrola w `scal-rejestr.mjs` to rola 08 (narzędzia treści).
