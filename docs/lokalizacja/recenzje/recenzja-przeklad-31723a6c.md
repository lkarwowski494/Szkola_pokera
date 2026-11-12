# Recenzja: przekład agenta SC-04/05/06/08/32/33/34 i zdań EB — Szkoła Pokera — 2026-11-11
Commit: 31723a6c · Rola: 09-lokalizacja, tryb audit (sesja EM, polecenie koordynatora `docs/koordynacja/polecenia/EM.md` @ fd256ff0) · Środowisko: Linux, Node 22, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez Xcode i symulatora, więc zrzutów nie robiłem.

## Podsumowanie
**Werdykt: wszystkie 10 języków PRZYJĄĆ Z POPRAWKAMI.** Nie ma znalezisk KRYT ani WYS. Przegląd objął 37 kluczy na język: `situation` i wszystkie `explanation` siedmiu szablonów oraz `if`/`then`/`because` reguły R-M11-009, które zawierają zdania EB z SC-06, SC-32 i SC-34. W żadnym języku przekład nie zmienia liczby, kierunku („więcej/mniej”) ani warunku. Znaczniki `{{n:}}`, `{{w:}}` i zbiory `{{t:}}` są takie same jak w pl, poza znacznikami nie ma cyfr innych niż w pl. Problemem jest spójność terminów z resztą korpusu danego języka (Button, rodzaj „Bet” w de, czasownik call w M11, nazwy blind/stack/equity) i kilka zdań dwuznacznych w pt, ko i vi. Wszystko to są poprawki ŚR i NIS, które według progu z `CLAUDE.md` nie blokują wydania.

| Język | Werdykt | KRYT | WYS | ŚR | NIS |
|---|---|---|---|---|---|
| de | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 6 | 1 |
| es | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 1 | 2 |
| fr | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 5 | 4 |
| it | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 4 | 3 |
| ja | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 0 | 2 |
| ko | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 4 | 1 |
| pt | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 9 | 1 |
| pt-BR | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 2 | 2 |
| vi | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 2 | 1 |
| zh-Hant | PRZYJĄĆ Z POPRAWKAMI | 0 | 0 | 5 | 1 |

W tabeli liczę klucze (wiersze przeglądu). Niżej te same klucze są zgrupowane w znaleziska według mechanizmu.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 09-lokalizacja-001 | ŚR | D | Button przetłumaczony albo pisany małą literą w sc-06 (es, fr, it, pt, pt-BR, vi, zh-Hant); fr „Button” zamiast „Bouton” w sc-05, sc-08 | otwarte |
| 09-lokalizacja-002 | ŚR | D | Czasownik call w M11 różny w sc-33 i sc-34 (fr, it, pt-BR) | otwarte |
| 09-lokalizacja-003 | ŚR | D | de: „Bet” w rodzaju męskim w sc-04, sc-05 (5 kluczy), wbrew glosariuszowi i lekcjom | otwarte |
| 09-lokalizacja-004 | ŚR | D | pt: sc-34 `situation` dwuznaczne, sc-32/33 „as blinds” i „push” niezgodne z korpusem | otwarte |
| 09-lokalizacja-005 | ŚR | D | ko: „모두 당신까지 폴드했습니다” w 4 kluczach można czytać „wszyscy łącznie z tobą spasowali” | otwarte |
| 09-lokalizacja-006 | ŚR | D | vi: „{{t:open\|mở}} rộng” w sc-06 czyta się „rozszerzać” | otwarte |
| 09-lokalizacja-007 | ŚR | D | it, fr, zh-Hant, de: pojedyncze terminy poza korpusem (bui, tapis, range de suivi, 勝率, 泡沫因子, 入局, 按鈕) i urwane zdanie de sc-06 | otwarte |
| 09-lokalizacja-008 | NIS | D | Trzecie „przebijasz” w sc-06 `raise` bez `{{t:raise}}` w 10 językach | otwarte |
| 09-lokalizacja-009 | NIS | D | fr: 33 zwykłe spacje przed „:” i „;” (rejestr: nierozdzielająca) | otwarte |
| 09-lokalizacja-010 | NIS | D | Styl i szyk: drobne niezręczności w de, es, fr, it, ja, ko, pt-BR, vi, zh-Hant | otwarte |

Wagi KRYT/WYS/ŚR/NIS to próg wydania z `CLAUDE.md`: KRYT i WYS blokują, ŚR i NIS idą do backlogu. W skali szablonu roli KRYT/WYS ≈ P0/P1, ŚR/NIS ≈ P2.

## Linia bazowa i założenia
Zakres jest wąski (przekład 37 kluczy), więc pełnej linii bazowej E0b nie robiłem. W najlepszej w klasie wersji tych tekstów każdy język ma jedną nazwę na pojęcie, taką samą jak w lekcjach, regułach i starszych scenariuszach (`content/<język>/terms-nazwy.yaml`). Forma zwracania się jest zgodna z rejestrem (`scripts/i18n/wspolne.mjs`, stała `REJESTR`), typografia jest właściwa dla języka, a liczby pochodzą wyłącznie z parametrów.

Wymiary:
- **Gramatyka:** wstawki `{{w:…}}` z rodzajnikami i partykułami sprawdzone przez porównanie ze starszymi szablonami (sc-01…sc-19). Konstrukcja „na {{w:pozycja}}” i wstawka `{{w:stol}}` przed flopem (samo „preflop”) brzmią niezręcznie także w pl i en, więc to wzorzec szablonu (D-784), nie błąd przekładu (patrz „Do sprawdzenia”).
- **Forma zwracania się:** wszystkie języki są zgodne z rejestrem i ze starszymi scenariuszami: de du, es tú, fr vous, it tu, pt formalnie, pt-BR você, vi bạn, ja です/ます, ko -니다, zh 你.
- **Terminologia:** znaleziska 001–003 i 007.
- **Liczby i sens:** zgodne we wszystkich 370 parach. Zdania EB (SC-34 pas z progiem ICM, SC-06 duży rozmiar, SC-32 „ryzykujesz mniej względem blindów”, R-M11-009 bez warunku eliminacji) oddają pl w każdym języku.
- **Długość:** stosunek do en wynosi średnio 0,65 (zh-Hant) do 1,13 (fr), maksimum 1,45 (fr R-M11-009 `because`). Wszystkie te teksty to akapity w przewijanym widoku, a design-spec nie ustala dla nich limitu znaków, więc ryzyka ucięcia nie ma (`dowody/em-mechaniczne.txt`).

Soczewki: tłumacz bez ekranu (pl i en obok przekładu), użytkownik drugiego rynku (czy zdanie da się zrozumieć bez pl), spójność z korpusem języka (grep w `content/<język>/`). Zmian statusu w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Znaczniki `{{n:}}`, `{{w:}}`, `{{t:}}` i cyfry, 37 kluczy × 12 języków | tak, skrypt | `dowody/em-mechaniczne.txt` |
| Długość wobec en | tak, skrypt | `dowody/em-mechaniczne.txt` |
| Sens, terminy, rejestr, gramatyka: de, es | tak, drugi przegląd AI (świeży kontekst, 37 kluczy, grep w korpusie) | `dowody/em-przeglad-de-es.md` |
| j.w. fr, it (także spacje nierozdzielające) | tak | `dowody/em-przeglad-fr-it.md` |
| j.w. pt, pt-BR | tak | `dowody/em-przeglad-pt.md` |
| j.w. ja, zh-Hant (także typografia CJK) | tak | `dowody/em-przeglad-ja-zh.md` |
| j.w. ko, vi | tak | `dowody/em-przeglad-ko-vi.md` |
| Weryfikacja kluczowych tez przeglądów u źródła (vi „mở rộng”, de rodzaj Bet, pt „as blinds”, zh 權益/入池, fr Bouton, it bui) | tak, grep na plikach treści | liczby w treści znalezisk |
| `pnpm run ci` na 31723a6c | tak | `../dowody/em-ci-31723a6c.txt` |
| Zrzuty ekranu w każdym języku | nie: brak symulatora, Expo web poza zakresem polecenia | — |
| Przegląd człowieka znającego język | nie, to krok właściciela (polityka „szeroka”) | — |

## Kontrola dowodów i sekretów
Skrypt `sprawdz-raport.mjs --rola 09-lokalizacja` (kopia w scratchpadzie, poza repo): wynik w podsekcji „Wynik kontroli” na końcu raportu. Przed commitem przejrzałem `git diff --cached`: zawiera tylko raport i pliki dowodów, bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| LOK-01 | nie dotyczy (zestaw języków poza zakresem polecenia) | — |
| LOK-02 | nie dotyczy (bez zmian w `app.json`) | — |
| LOK-03 | nie dotyczy (teksty treści, nie kod) | — |
| LOK-04 | dotyczy | ok: wszystkie klucze obecne w 12 językach (`dowody/em-mechaniczne.txt`, brak wierszy BRAK); CI kod 0 |
| LOK-05 | nie dotyczy (w tych kluczach nie ma form liczby mnogiej z parametrem) | — |
| LOK-06 | dotyczy | ok: `{{n:}}`, `{{w:}}` i zbiory `{{t:}}` zgodne z pl; cyfry zgodne; znalezisko 008 dotyczy tylko liczby powtórzeń terminu |
| LOK-07 | dotyczy (bb i procenty z parametrów) | ok: brak liczb wpisanych ręcznie |
| LOK-08 | dotyczy | nie sprawdzono: brak zrzutów; długość tekstów w normie (Linia bazowa) |
| LOK-09 | nie dotyczy (mechanizm bez zmian) | — |
| LOK-10 | dotyczy | ok: liczby, kierunek i warunki zachowane w 10 językach; przegląd człowieka to krok właściciela |
| LOK-11 | dotyczy | znaleziska 001–010 |
| LOK-12 | nie dotyczy (bez etykiet dostępności) | — |
| LOK-13 | nie dotyczy | — |
| LOK-14 | nie dotyczy (bez nowych krojów) | — |
| LOK-15 | nie dotyczy (bez zmian bramek) | — |

## Znaleziska (szczegóły)
Pełne brzmienie każdej propozycji poprawki, z kluczem i dowodem porównania z korpusem, jest w plikach pliki em-przeglad-*.md w katalogu dowody. Poniżej podaję mechanizm, miejsca i kierunek poprawki.

### 09-lokalizacja-001 · Nazwa pozycji Button niespójna z resztą języka
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód i miejsca (`plik:klucz`):
  - `sc-06.yaml:decisions.1:size-spot.actions.raise.explanation` ma es „desde el botón”, it „dal bottone”, pt i pt-BR „do botão”, fr „bouton” małą literą, zh-Hant „按鈕” zamiast „按鈕位”, vi „button” małą literą (`content/vi/scenarios/sc-06.yaml:20`). W korpusie tych języków jest Button (es, it, pt, pt-BR, vi) albo Bouton (fr, 358 wystąpień wobec 19 „Button”).
  - fr: „Button” w `sc-05.yaml` i `sc-08.yaml`, a także w starszych sc-11 i sc-12.
- Mechanizm: agent tłumaczył nazwę pozycji zamiast wziąć formę z `terms-nazwy.yaml`.
- Propozycja: es, it, pt, pt-BR, vi „Button”, fr „Bouton”, zh-Hant „按鈕位”. Najlepiej dać `{{t:button}}` bez formy, tak żeby nazwa szła ze słownika.
- Test akceptacyjny: grep „botón|bottone|botão|\bbutton\b” w `content/{es,it,pt,pt-BR,vi}/scenarios/` daje 0 wyników; w `content/fr/scenarios/` „Button” daje 0.
- Status: otwarte

### 09-lokalizacja-002 · Czasownik call w M11 różny w sąsiednich scenariuszach
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód (`plik:klucz`):
  - fr: `sc-34.yaml:…call.explanation` ma „payez”, a sc-33 i R-M11-009 „suivez”.
  - it: sc-34 „Fai call”, sc-33 „Chiami”.
  - pt-BR: sc-33 „Você dá call”, sc-34 „Você faz call”, starsze scenariusze „Você paga”.
- Propozycja: forma z R-M11-009 i lekcji M11 danego języka (fr „suivez”, it „chiami”, pt-BR „paga”).
- Test akceptacyjny: w sc-33 i sc-34 każdego z tych języków ta sama forma co w R-M11-009.
- Status: otwarte

### 09-lokalizacja-003 · de: „Bet” w rodzaju męskim
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: glosariusz de podaje „Bet” w rodzaju żeńskim („Eine Bet”). Lekcje i egzaminy mają „eine kleine/große {{t:bet}}” ponad 30 razy, a „Ein kleiner/großer {{t:bet}}” jest w sc-04 (3), sc-05 (2), sc-11 (3), sc-12 (2), rules.yaml (5) i m2-l2 (1).
- Miejsca w zakresie: `sc-04.yaml` bet-small, check, bet-big; `sc-05.yaml` bet-small, bet-big.
- Mechanizm: ten sam błąd jest poza zakresem (sc-11, sc-12, rules.yaml, m2-l2), więc poprawka powinna objąć cały `content/de/`.
- Propozycja: „eine kleine/große {{t:bet}}”.
- Test akceptacyjny: `grep -rE "[Ee]in(en)? (kleine[rn]|große[rn]) \{\{t:bet" content/de` daje 0 wyników.
- Status: otwarte

### 09-lokalizacja-004 · pt: dwuznaczna sytuacja w sc-34 i terminy niezgodne z korpusem
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód (`plik:klucz`):
  - `sc-34.yaml:situation`: „…o small blind vai all-in, e está no big blind” czyta się tak, jakby to small blind był na big blindzie.
  - `sc-32.yaml` (2 klucze) i `sc-33.yaml` (2): „as blinds”, „a sua blind”, a korpus pt ma „os blinds” (ponad 40 razy z „o seu blind”, także sc-05 z tej partii).
  - sc-32 (2) i sc-33 (1): „faz {{t:shove|push}}”, a lekcje i egzamin M11 mają „shove”.
- Propozycja: „Está no {{t:big-blind}} e, na {{t:bubble|bolha}}, o {{t:small-blind}} vai {{t:all-in}}.”; „os blinds”, „o seu blind”; „faz {{t:shove}}”.
- Test akceptacyjny: grep „as blinds|a sua blind|push” w `content/pt/scenarios/` daje 0 wyników.
- Status: otwarte

### 09-lokalizacja-005 · ko: „wszyscy spasowali do ciebie” dwuznaczne
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: „모두 당신까지 폴드했습니다” można odczytać „wszyscy, łącznie z tobą, spasowali”. Występuje w `sc-06.yaml` (situation i 2 explanation) i `sc-32.yaml:situation`. Lekcje i egzaminy ko mają „당신 차례까지 모두”.
- Propozycja: „당신 차례까지 모두 폴드했습니다”.
- Test akceptacyjny: grep „당신까지” w `content/ko/` daje 0 wyników.
- Status: otwarte

### 09-lokalizacja-006 · vi: „mở rộng” zamiast terminu open
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: w `content/vi/scenarios/sc-06.yaml:20` i w linii 22 jest „{{t:open|mở}} rộng”. Na ekranie daje to „mở rộng”, czyli „rozszerzać”. Glosariusz vi podaje „mở cược”.
- Propozycja: „{{t:open|mở cược}} rộng tay” albo przebudowa na „mở cược với phạm vi rộng”, jak w sc-05.
- Test akceptacyjny: grep „mở}} rộng” w `content/vi/` daje 0 wyników.
- Status: otwarte

### 09-lokalizacja-007 · Pojedyncze terminy poza korpusem języka i urwane zdanie de
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka (fr „d'equity”: średnia) · Rodzaj: D
- Miejsca (`plik:klucz` w plikach dowodów):
  - it sc-32, sc-33: „bui/buio”, a korpus ma „blind” ponad 850 razy. it sc-06, sc-08, sc-32, sc-33: „sei sul/sullo small blind”, a korpus i sc-34 mają „sei in”.
  - fr sc-32: „un tapis plus court” zamiast „stack”, a „tapis” w tym samym akapicie znaczy też shove. fr sc-33: „range de suivi” zamiast „range de call” oraz „d'equity”.
  - zh-Hant sc-33 (2 klucze): „勝率” zamiast „權益” z glosariusza; koliduje też z winrate. R-M11-009.then: „泡沫因子” zamiast „泡沫係數” z lekcji. sc-04: „入局” (3 wystąpienia w korpusie) zamiast „入池” (28).
  - de sc-06 raise: brak czasownika po „also” (propozycja: „…ohne Position spielst; deshalb {{t:raise|raist}} du etwas mehr als {{n:pf.open-size}} …”).
- Test akceptacyjny: każdy wymieniony termin zastąpiony formą z korpusu (pełne brzmienia w `dowody/em-przeglad-fr-it.md`, `dowody/em-przeglad-ja-zh.md`, `dowody/em-przeglad-de-es.md`).
- Status: otwarte

### 09-lokalizacja-008 · Trzecie „przebijasz” w sc-06 bez znacznika terminu
- Pozycja listy kontrolnej: LOK-06
- Poziom: P2 (NIS) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: w pl `sc-06.yaml:decisions.1:size-spot.actions.raise.explanation` ma 3 × `{{t:raise}}`, a wszystkie 10 przekładów i en mają 2 (`dowody/em-mechaniczne.txt`). Zbiór terminów jest ten sam, więc słowniczek i podświetlenie działają; brakuje tylko powtórzenia.
- Inne różnice liczby powtórzeń: sc-05 bet-big (pl 2 × bet, en 3, de/es/fr… 1), sc-04 it (3 × bet). Te są nieszkodliwe, bo wynikają ze zmiany szyku.
- Propozycja: dodać znacznik przy trzecim czasowniku. Można też uznać to za dopuszczalne i nie poprawiać.
- Status: otwarte

### 09-lokalizacja-009 · fr: zwykła spacja przed „:” i „;”
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (NIS) · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: w 37 kluczach fr są 33 zwykłe spacje przed „:” i „;”, a nierozdzielająca tylko w R-M11-009. Starsze scenariusze sc-01…sc-19 mają te same zwykłe spacje, natomiast lekcje i reguły nierozdzielające (w całym `content/fr/` 2518 wobec 114).
- Mechanizm: dotyczy całego katalogu `content/fr/scenarios/` (uwaga EH: 52 miejsca).
- Propozycja: jednym przebiegiem zamienić „ :” i „ ;” na U+202F w `content/fr/scenarios/` i dodać kontrolę do testu treści.
- Test akceptacyjny: grep „ [:;!?]” (spacja ASCII) w `content/fr/scenarios/` daje 0 wyników.
- Status: otwarte

### 09-lokalizacja-010 · Drobne niezręczności stylu i szyku
- Pozycja listy kontrolnej: LOK-11
- Poziom: P2 (NIS) · Realność: realny · Pewność: średnia · Rodzaj: D
- Miejsca:
  - de sc-32 all-in: szyk „weniger riskierst im Vergleich zu…”.
  - es sc-34 (2): „del que ganar suma”, „pagar debe ganar”; propozycja brzmienia z egzaminu M11.
  - fr sc-04: „paiera”; fr sc-32 i sc-33: znacznik shove obejmuje samo „tapis”.
  - it sc-04: „farà call”; it sc-08: „non fai quasi mai call”.
  - ja sc-06 raise: przyczyna i skutek zamienione; ja sc-34: „gra o żetony” inaczej niż w R-M11-009.
  - ko: potoczne „빅 블라인드하고만”.
  - pt-BR sc-06: „fala primeiro” zamiast „age primeiro”.
  - vi sc-34 i R-M11-009: „chơi bằng chip” / „chơi vì chip”, „thường hơn”.
  - zh-Hant sc-34: „只算籌碼時”.
- Szczegóły i propozycje: pliki em-przeglad-*.md w katalogu dowody.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- es: sc-33 i sc-34 używają „pagar”, a reguły, lekcje i egzamin M11 „igualar”. Glosariusz dopuszcza oba, więc to wybór konwencji modułu dla 09 z 06.
- pt-BR: forma shove jest mieszana w całym korpusie (glosariusz [DO USTALENIA]). pt: „Está em UTG” zamiast „no”. pt-BR: „draw” obok „projeto”.
- vi sc-08: „trước Button” może znaczyć „wobec” albo „przed” Buttonem.
- ko sc-33: pominięte „핸드의” przy porównaniu procentów.
- ja sc-34: czy „バブルの{{w:pozycja}}で” brzmi naturalnie.
- Wstawka `{{w:stol}}` przed flopem daje samo „preflop” w środku zdania, a w fr wstawka pozycji pisze się małą literą („en bouton (BTN)”). To wzorzec szablonu od sc-01 (pl i en tak samo), więc sprawa dla 06 i 08, nie dla przekładu.
- Słownik (dla 09 z 06): zh-Hant connected i connectors mają tę samą nazwę „連張”; zh-Hant bubble-factor [DO USTALENIA] (egzamin M11 też „泡沫因子”); ja 3-bet [DO USTALENIA] można zamknąć formą „3ベット” (276 wystąpień, 0 „スリーベット”).
- pt rules.yaml R-M11-010.if: „bubble” zamiast „bolha” (poza zakresem; do backlogu).
- Przegląd człowieka znającego język: drugi przegląd AI nie zastępuje rodzimego użytkownika języka (krok właściciela, polityka „szeroka”).

## Co działa dobrze i należy zachować
- Zdania EB (D-1105, D-1106, D-1107) mają w każdym języku ten sam sens co pl: brak zdania „w żetonach byłoby sprawdzenie”, porównanie „mniej względem blindów” zachowane, warunek R-M11-009 bez eliminacji.
- Teksty c-betu w sc-04 i sc-05 są w każdym języku zgodne z przyjętymi wcześniej sc-11 i sc-12.
- „3-bet” jako czasownik ma we wszystkich językach formę z korpusu (de „3-bettest”, es „haces 3-bet”, fr „3-bettez”, it „fai 3-bet”, pt „faz 3-bet”, pt-BR „dá 3-bet”). Uwaga EH się nie potwierdziła.
- Forma zwracania się zgadza się z rejestrem i ze starszymi scenariuszami we wszystkich 10 językach. pt nie ma brazylianizmów, pt-BR nie ma form europejskich.

## Decyzje dla właściciela
Brak. Wszystkie znaleziska to poprawki przekładu w ramach glosariusza; konwencje (es pagar/igualar, słownik zh/ja) rozstrzyga 09 z 06. Puli D-1230…D-1234 nie użyłem.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 09-lokalizacja --tryb fix --zadania 09-lokalizacja-001,09-lokalizacja-002,09-lokalizacja-003,09-lokalizacja-004,09-lokalizacja-005,09-lokalizacja-006,09-lokalizacja-007`
NIS (008–010) proponuję zrobić przy okazji tej samej partii, bo dotyczą tych samych plików. Po poprawce: `pnpm content:build` i `pnpm run ci`.

### Wynik kontroli
`node sprawdz-raport.mjs docs/lokalizacja/recenzje/recenzja-przeklad-31723a6c.md . --rola 09-lokalizacja` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 09-lokalizacja”, kod 0 (2026-11-11).
