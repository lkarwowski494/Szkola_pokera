# Audyt: Programista — Szkoła Pokera — 2026-11-10
Recenzja niezależna poprawek sesji BM (znaleziska BJ 001–004). Sesja BO, rola 08-programista, tryb audit, zakres zawężony poleceniem koordynatora (`docs/koordynacja/polecenia/BO.md` @ 9e2498f na gałęzi `koordynacja`).
Commit: 49654a6 (gałąź `sesja-bo-recenzja` = `sesja-bf-generator`, HEAD zgodny z poleceniem) · Przedmiot: `git diff 8b5db83..49654a6` · Tryb: audit · Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0; `pnpm install --frozen-lockfile` kod 0 (`dowody/bo-install.txt`); bez macOS/Xcode (nie dotyczy: zmiana bez kodu ekranów).

## Podsumowanie
**Werdykt: przyjąć.** Poprawki BM nie mają znalezisk KRYTYCZNYCH ani WYSOKICH. `pnpm run ci` kończy się kodem 0 (`dowody/bo-ci-49654a6.txt`). Zapis historii odcisków działa w jednej transakcji przez kolejkę portu, bez `INSERT OR REPLACE`. Sonda potwierdza, że wytrzymuje 25 zapisów równoległych przy cofającym się zegarze, a błąd wycofuje całość. Test odtwarzający BJ-001 przeszedł z niezmienioną asercją; dopisano tylko nowe. Wyrocznia oceny w `scenario-gen.test.ts` jest niezależna od generatora. Mutanty usuwające poprawki 001–004 giną.

Do backlogu trafiają dwa znaleziska ŚREDNIE:
- **101:** KO-043 („powtórka nie zużywa limitu”) nie jest podłączone do ścieżki startu domeny (`startAktywnosci`, `wejscieDoAktywnosci`). Działa poprawnie tylko wtedy, gdy krok F odczyta historię przed zapisem odcisku nowego wariantu. W przeciwnym razie nowy wariant przechodzi jako powtórka i omija limit.
- **103:** łatwy „call” jest osiągalny tylko przy zakładzie do ok. 0,11 puli, więc przy standardowych rozmiarach poziom łatwy zawsze kończy się „fold”.

Cztery znaleziska NISKIE: rozbieżność sygnatury w `moduly.md` (dla roli 05), dwie luki walidacji znaczników `{{w:…}}` i luki testów wykryte mutantami.

Numeracja od 101, żeby nie mylić z ID 001–004 recenzji BJ, do których odwołują się commity BM.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-101 | ŚR (P2) | D | KO-043 nie dochodzi do ścieżki startu domeny; powtórka zależy od kolejności zapisu odcisku w kroku F | otwarte |
| 08-programista-103 | ŚR (P2) | M | Łatwy „call” osiągalny tylko przy zakładzie ≤ ok. 0,11 puli; przy standardowych rozmiarach łatwy = zawsze „fold” | otwarte |
| 08-programista-102 | NIS (P2) | D | `docs/architektura/moduly.md` ma starą sygnaturę `mozeStartowac` (3 parametry) — dla roli 05 | otwarte |
| 08-programista-104 | NIS (P2) | D | Znacznik `{{w:nazwa|…}}` przechodzi budowanie i zostaje surowy w tekście dla użytkownika | otwarte |
| 08-programista-105 | NIS (P2) | D | „Pierwsze zdanie” dzielone po `.!?`: fałszywy błąd przy `{{n:a.b}}`, brak kontroli w językach z „。” | otwarte |
| 08-programista-106 | NIS (P2) | D | Luki testów wykryte mutantami: remis czasu przy UPSERT, szablon C bez niezależnej wyroczni | otwarte |

Liczby: KRYT 0, WYS 0, ŚR 2, NIS 4.

## Linia bazowa i założenia
Linię bazową ustaliłem z wymagań i kodu, zanim przeczytałem raport BJ. Raportów autora BM (`docs/programista/stan-bf.md`, `docs/programista/dowody/bm-*`) nie czytałem (polecenie, pkt 3). Raport BJ przeczytałem po własnej ocenie, tylko po to, żeby porównać zakres znaleziska 002 (`origin/sesja-bj-recenzja`).

Wymagania: `docs/brd/wymagania-scenariusze.md` (BR-SZB-001, BR-GEN-001…003), KO-043 (D-554), D-556…D-559 w `docs/decyzje.md` (wiersze 349–352).

Wymiary pokrycia:
- **Ścieżki zapisu:** `zapiszOdcisk` to MAX, UPSERT i przycięcie w jednej transakcji przez kolejkę. Sondy S1 (zapisy równoległe) i S3 (wycofanie) przechodzą (`dowody/bo-sonda-postep-limit.txt`). Wynik: ok.
- **Obsługa błędów:** `fillVariantMarkers` rzuca błąd przy nieznanej nazwie. Luka w składni z kreską → 104.
- **Typy na granicach:** wynik `MAX` parsowany z `unknown` (`packages/postep/src/wariantyHistoria.ts:21-23`). Wynik: ok.
- **System projektowy:** nie dotyczy, zmiana nie dotyka interfejsu.
- **i18n:** kontrola zdania sytuacji nie działa w językach bez kropki ASCII → 105.
- **Wydajność:** zapytanie `MAX` na jednej parze szablon–poziom, najwyżej 21 wierszy. Generator przy 1000 odrzuceniach z rzędu kończy się błędem, nie pętlą. Sprawdzone, brak problemów.
- **Testy na właściwym poziomie:** logika w Node, zapis na `node:sqlite`. Luki → 106.
- **Dostępność:** nie dotyczy, brak komponentów.
- **Liczby konfiguracyjne:** okno 20 z `KONFIGURACJA.WARIANTY_HISTORIA_OKNO`, `POJEMNOSC_MIN` 40 w jednym miejscu. Wynik: ok.

Soczewki:
- Zapis przerwany w połowie: S3 pokazuje wycofanie całości.
- Ścieżka bez testu: mutanty (106).
- Moduł czytany pierwszy raz: kontrakt kolejności dla `czyPowtorkaWariantu` nie jest zapisany (101).
- VoiceOver: nie dotyczy.

Wzorzec: moduł `sqlite-expo` roli (UPSERT, jedna kolejka, transakcja) oraz zasada roli 11, czyli logika czysta w domenie. Rejestr założeń: bez propozycji zmian.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/postep/src/wariantyHistoria.ts` + test 532 | tak, w całości | kod, sondy S1–S4 `dowody/bo-sonda-postep-limit.txt`, mutanty `dowody/bo-mutanty-postep.txt` |
| `packages/domena/src/limit.ts`, `wariant.ts`, `maszyny.ts` (wywołania `mozeStartowac`), test `limit.test.ts` | tak | kod, sonda S5, Stryker `dowody/bo-mutacje-domena-2.txt` |
| `packages/poker-core/src/scenario-gen.ts`, testy scenario-gen, decyzja-niezmienna, znaczniki | tak | kod, mutanty `dowody/bo-mutanty-generator.txt`, sonda G4 |
| `packages/content-schema` (pole `expected`), `tools/content-build/src/scenariusze.ts` + test bf | tak | kod, sondy G1–G3 `dowody/bo-sonda-tresc-generator.txt` |
| Test odtwarzający BJ-001: wersja z d4fd511 a obecna | tak | `git show d4fd511:…/bj-001-decyzja-niezmienna.test.ts` porównane z `packages/poker-core/test/scenario-gen-decyzja-niezmienna.test.ts`: asercja niezmienności bez zmian, dopisane `expected`, szablon C i jedna asercja |
| `apps/mobile` (wywołania domeny) | tylko grep: `mozeStartowac` w `apps/mobile/src/features/start/wejscieStartu.ts:26` bez wariantu; ekranu scenariusza brak | grep |
| Zakres 8cba034..886b2be (BF) | tylko pod kątem regresji po poprawkach (CI zielone, testy BF bez osłabionych asercji) | `dowody/bo-ci-49654a6.txt` |
| Pełne mutacje `scenario-gen.ts` (Stryker) | nie: 132 s na mutanta przy testach scenario-gen; zamiast tego 5 ręcznych mutantów na zmienionych liniach | `dowody/bo-mutanty-generator.txt` |

## Kontrola dowodów i sekretów
- Sekrety w diffie: brak trafień (`dowody/bo-sekrety.txt`, grep kod 1 = brak).
- `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-bm-49654a6.md . --rola 08-programista` (kopia skryptu w scratchpadzie): wynik „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | znaleziska 101, 102, 103, 106; reguły BR-GEN-003 i D-556…D-559 mają testy |
| DEV-02 | dotyczy | ok: 4/4 commity zmieniające zachowanie (0634592, 7a66c69, 91ec96e, 9500640) mają test w tym samym commicie; czerwień testu 003 na kodzie sprzed poprawki potwierdza mutant M3 (`dowody/bo-mutanty-postep.txt`) |
| DEV-03 | dotyczy | ok: grep `.skip(`, `.only(`, `it.todo`, `xit(`, `expect(true)` w zmienionych testach bez trafień; zmienione asercje `limit.test.ts` (flaga → `TEN_SAM`/`INNY`) zachowują sens i dodają przypadki; asercja BJ-001 bez zmian |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/bo-ci-49654a6.txt`) |
| DEV-05 | dotyczy | ok: UPSERT `ON CONFLICT … DO UPDATE`, tabela bez kluczy obcych, wszystko w `port.transakcja` (kolejka) |
| DEV-06 | nie dotyczy: brak migracji i zmian schematu w zakresie (D-559: „bez zmiany schematu”) | — |
| DEV-07 | dotyczy | ok: brak `MAX` daje `null`, a wtedy `terazMs`; brak zgadywanych liczb |
| DEV-08 | dotyczy | ok: czas monotoniczny zgodnie z D-559; przybliżenie czasu nazwane w decyzji |
| DEV-09 | dotyczy | ok w ścieżce danych (`unknown` + `in`); `name as VariantMarker` po sprawdzeniu `includes` — dane z treści zbudowanej, nie z zewnątrz |
| DEV-10 | dotyczy | znalezisko 104 |
| DEV-11 | nie dotyczy: brak zmian interfejsu | — |
| DEV-12 | dotyczy (35 języków treści) | znalezisko 105 |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | ok (`dowody/bo-sekrety.txt`) |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów | — |
| DEV-16 | dotyczy | ok: `terazMs`, `zagranoMs`; ułamek zakładu i pula w tym samym rachunku ilorazu |

## Znaleziska (szczegóły)

### 08-programista-101 · KO-043 nie dochodzi do ścieżki startu domeny; powtórka zależy od kolejności zapisu odcisku w kroku F
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: ŚREDNIE (do backlogu z wersją kroku F, przed podłączeniem ekranu scenariusza)
- Realność: teoretyczny dziś (ekranu scenariusza nie ma; `apps/mobile` wywołuje `mozeStartowac` bez wariantu); brzegowy od kroku F · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - Strażnik limitu w domenie, `startAktywnosci`, woła `mozeStartowac` bez wariantu: `packages/domena/src/maszyny.ts:61` „const m = mozeStartowac(wej.rodzaj, wej.pierwszePodejscieTestu, wej.limit);”. Tak samo `wejscieDoAktywnosci`: `packages/domena/src/maszyny.ts:134`.
  - Sonda S5: `startAktywnosci` dla scenariusza przy wyczerpanym limicie zwraca `{"ok":false,"powod":"limit_wyczerpany"}`. Ścieżka startu domeny nie ma jak przekazać powtórki.
  - Sonda S4: jeśli odcisk nowego wariantu trafi do historii przed sprawdzeniem limitu, `mozeStartowac('scenariusz', …, wyczerpany, {historia, odcisk: 'NOWY'})` zwraca `{"start":true,"zLimitu":false}`, czyli nowy wariant poza limitem (`dowody/bo-sonda-postep-limit.txt`).
  - Kontrakt `StartWariantu` nie mówi, że historia ma pochodzić sprzed zapisu odcisku startowanego wariantu (`packages/domena/src/wariant.ts:43`). Odcisk nadal podaje wywołujący jako napis.
- Mechanizm: rozpoznanie powtórki jest w domenie, ale strażnik `startAktywnosci` go nie używa. Wynik zależy od kolejności „odczyt historii → sprawdzenie → zapis odcisku”, której pilnuje dopiero kod ekranu. `grep -rn "mozeStartowac(" packages apps --include=*.ts` → 3 wywołania produkcyjne bez wariantu: `packages/domena/src/maszyny.ts:61`, `packages/domena/src/maszyny.ts:134`, `apps/mobile/src/features/start/wejscieStartu.ts:26`.
- Powraca: tak, częściowo: BJ-002 (flaga od wywołującego). Poprawka BM przeniosła porównanie do domeny, ale nie do strażnika startu → trwała kontrola: test `startAktywnosci`, który rozróżnia powtórkę i nowy wariant.
- Wzorzec lub źródło: zasada roli 11 (logika czysta, platforma cienka); ADR 0007 pkt 3 („limit sprawdzany raz, przy starcie”, komentarz `packages/domena/src/maszyny.ts:50`); KO-043.
- Kroki w aplikacji: po kroku F użytkownik darmowy z wyczerpanym limitem wybiera „Nowe rozdanie”. Jeśli ekran zapisze odcisk przy losowaniu, zanim sprawdzi limit, rozdanie startuje poza limitem. Jeśli ekran użyje `startAktywnosci`, przycisk „Zagraj jeszcze raz to samo rozdanie” pokaże ekran zakupu, wbrew KO-043.
- Opcje:
  - (a) `startAktywnosci` i `wejscieDoAktywnosci` przyjmują wariant jako `{szablon, poziom, ziarno}` plus historię i same liczą odcisk (`generateVariant`). Kontrakt i test mówią, że historia pochodzi sprzed zapisu. Kompromis: więcej kodu w domenie, za to kontrola w Node, a ekran nie ma jak tego zepsuć.
  - (b) Zostawić `mozeStartowac` z `StartWariantu`, a w `moduly.md` i w teście ekranu kroku F zapisać kolejność wywołań. Kompromis: mniej kodu teraz, kontrola dopiero w teście ekranu.
  - Rekomendacja: (a), w kroku F, przed ekranem scenariusza.
- Test akceptacyjny: `startAktywnosci('scenariusz', wyczerpany, wariant = ostatni zagrany)` daje start poza limitem. Nowy wariant daje `limit_wyczerpany`. Zapis odcisku nowego wariantu przed startem nie zmienia wyniku.
- Status: otwarte

### 08-programista-103 · Łatwy „call” osiągalny tylko przy zakładzie ≤ ok. 0,11 puli; przy standardowych rozmiarach łatwy = zawsze „fold”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: ŚREDNIE (przed pisaniem szablonów przez rolę 06, krok E)
- Realność: realny dla przyszłej treści (dziś `content/*/scenarios` nie istnieje) · Pewność: wysoka (rachunek + sonda)
- Rodzaj: M (dla roli 06, z rolą 03)
- Dowód:
  - Sonda G4: szablon łatwy z `expected: ['call']` i `BET_FRACTIONS` (0,25…2) kończy się błędem „1000 odrzuceń z rzędu na poziomie latwy” (`dowody/bo-sonda-tresc-generator.txt`); rozmiary zakładów: `packages/poker-core/src/drills.ts:172`.
  - Rachunek (metoda z `decide`, `packages/poker-core/src/scenario-gen.ts:106`): cena r = f/(1+2f) przy zakładzie f × pula. Łatwy wymaga przewagi ≥ 10 pp.
    - Kolor: szansa 9/47 = 19,15%; „call” wymaga r ≤ 9,15%, czyli f ≤ 0,0915/(1−0,183) ≈ 0,11.
    - OESD: 8/47 = 17,02%; r ≤ 7,02%, czyli f ≤ ≈ 0,08.
    - Gutshot: 4/47 = 8,51%, poniżej 10 pp, więc łatwy „call” niemożliwy.
  - D-556 nazywa ten skutek („łatwy „call” wymaga małych ułamków zakładu”), ale żadna reguła treści ani budowania nie pilnuje, żeby łatwe szablony modułu nie miały zawsze tej samej odpowiedzi.
- Mechanizm: granica łatwego (≥ 10 pp) razem z oceną na jedną kartę (D-551) daje „fold” przy każdym rozmiarze zakładu z `BET_FRACTIONS`.
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-003 i definicja poziomu łatwego w `docs/brd/wymagania-scenariusze.md:116`; polecenie BO pkt 4 (poziom łatwy nie zawsze ta sama decyzja).
- Kroki w aplikacji: po kroku E użytkownik na poziomie łatwym dostaje same „fold” i uczy się wzorca „łatwy = pasuj” zamiast porównania szansy z ceną.
- Opcje:
  - (a) Rola 06 pisze łatwe szablony „call” z małymi zakładami (ułamek 0,1, np. zakład blokujący). Kompromis: rozmiar rzadki w praktyce, ale zgodny z rachunkiem.
  - (b) Budowanie treści ostrzega, gdy wszystkie łatwe szablony modułu mają ten sam `expected`. Kompromis: kontrola mechaniczna, ale nie rozwiązuje braku sytuacji.
  - (c) Rola 06 rewiduje margines łatwego dla `draw-call`. Kompromis: decyzja merytoryczna, zmienia D-551.
  - Rekomendacja: (b), a do tego (a) albo (c) według decyzji roli 06 przed krokiem E.
- Test akceptacyjny: test budowania, w którym moduł z samymi łatwymi „fold” daje ostrzeżenie; szablon łatwy „call” z treści przechodzi `checkScenarioGenerator`.
- Status: otwarte

### 08-programista-102 · `docs/architektura/moduly.md` ma starą sygnaturę `mozeStartowac` (3 parametry) — dla roli 05
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: NISKIE
- Realność: teoretyczny (dokument, nie zachowanie) · Pewność: wysoka
- Rodzaj: D (dokumentacja architektury, właściciel: rola 05)
- Dowód: `docs/architektura/moduly.md:58` ma 3 parametry („mozeStartowac(rodzaj: RodzajAktywnosci, pierwszePodejscieTestu: boolean, limit: ReturnType<typeof limitDnia>)”). Kod ma czwarty, `wariant?: StartWariantu` (`packages/domena/src/limit.ts:22-27`). D-558 zapisuje, że aktualizacja należy do roli 05.
- Mechanizm: sygnatura zmieniona w kodzie (D-554, D-558) bez zmiany w dokumencie ról 05; `grep -n "mozeStartowac" docs/architektura/moduly.md` → 1 trafienie, 3 parametry.
- Powraca: nie
- Wzorzec lub źródło: polecenie BO pkt 4 („rozbieżność = znalezisko dla roli 05”).
- Kroki w aplikacji: brak. Ryzyko: krok F według `moduly.md` pominie wariant (wiąże się z 101).
- Opcje: (a) rola 05 aktualizuje `moduly.md` razem z decyzją w 101 — jedna zmiana; (b) aktualizacja teraz, w obecnym kształcie — szybciej, ale możliwa druga zmiana po 101. Rekomendacja: (a).
- Test akceptacyjny: sygnatura w `moduly.md` równa sygnaturze w `packages/domena/src/limit.ts`.
- Status: otwarte

### 08-programista-104 · Znacznik `{{w:nazwa|…}}` przechodzi budowanie i zostaje surowy w tekście dla użytkownika
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 · próg: NISKIE
- Realność: brzegowy (składnia `{{t:klucz|forma}}` w tej samej treści skłania autora do `{{w:reka|…}}`) · Pewność: wysoka
- Rodzaj: D
- Dowód: wyrażenie regularne `packages/poker-core/src/scenario-gen.ts:181` („const VARIANT_MARKER_RE = /\{\{w:([^}|]*)\}\}/g;”) nie dopasowuje znacznika z kreską. Sonda G1: `checkScenarioTemplate` zwraca `[]`, a `fillVariantMarkers` zostawia w tekście „{{w:reka|kolor}}” (`dowody/bo-sonda-tresc-generator.txt`).
- Mechanizm: `findVariantMarkers` (budowanie) i `fillVariantMarkers` (wyświetlanie) używają tego samego wzorca, więc oba pomijają ten sam przypadek. Nakładka tłumaczeń porównuje tylko znaczniki `n:` i `t:` (`tools/content-build/src/nakladka.ts:30`).
- Powraca: nie
- Wzorzec lub źródło: D-557 („odrzuca nieznany znacznik”); komentarz `fillVariantMarkers` („nieznany znacznik to błąd (nie cichy napis w treści dla użytkownika)”).
- Kroki w aplikacji: autor treści wpisuje `{{w:reka|ręka}}`, budowanie przechodzi, a użytkownik widzi w wyjaśnieniu surowy znacznik.
- Opcje: (a) budowanie odrzuca każdy pozostały `{{w:` po dopasowaniu — kilka linii, jedna kontrola; (b) wzorzec przyjmuje `|…` i zgłasza ją jako błąd — dokładniejszy komunikat. Rekomendacja: (a).
- Test akceptacyjny: wyjaśnienie z `{{w:reka|x}}` daje błąd budowania z id szablonu i numerem punktu.
- Status: otwarte

### 08-programista-105 · „Pierwsze zdanie” dzielone po `.!?`: fałszywy błąd przy `{{n:a.b}}`, brak kontroli w językach z „。”
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 · próg: NISKIE
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/src/scenariusze.ts:66` („const zdanie = a.explanation.split(/[.!?\n]/)[0] ?? '';”). Wynik `dowody/bo-sonda-tresc-generator.txt`:
  - Sonda G2: liczba `{{n:outs.flush}}` przed znacznikami wariantu ucina zdanie na kropce w kluczu, więc pojawia się fałszywy błąd „zdanie sytuacji (pierwsze) musi mieć znaczniki”.
  - Sonda G3: tekst japoński z „。” nie ma kropki ASCII, więc całe wyjaśnienie liczy się jako pierwsze zdanie. Znaczniki w drugim zdaniu przechodzą.
- Mechanizm: podział zdań bez uwzględnienia znaczników i interpunkcji CJK. Kontrola biegnie dla każdego języka treści (`tools/content-build/src/build.ts:391`).
- Powraca: nie
- Wzorzec lub źródło: D-557; polityka 35 języków (CLAUDE.md, „Stan projektu”).
- Kroki w aplikacji: w ja albo zh-Hant wyjaśnienie bez kart w zdaniu sytuacji przechodzi budowanie; w pl autor dostaje błąd, którego nie ma.
- Opcje: (a) przed podziałem zamienić znaczniki `{{…}}` na symbol zastępczy i dzielić także po „。！？” — mała zmiana; (b) wymagać znaczników w polu `situation`, nie w zdaniu — zmiana formatu (rola 06, 05). Rekomendacja: (a).
- Test akceptacyjny: G2 bez błędu; G3 z błędem „zdanie sytuacji”.
- Status: otwarte

### 08-programista-106 · Luki testów wykryte mutantami: remis czasu przy UPSERT, szablon C bez niezależnej wyroczni
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: NISKIE
- Realność: teoretyczny (kod poprawny, test nie potrafi paść) · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - `dowody/bo-mutanty-postep.txt`: mutant M1 (`>=` → `>` w `packages/postep/src/wariantyHistoria.ts:23`) przeżywa testy autora i sondę S2. M2 (`+1` → `+0`) przeżywa testy autora, ginie dopiero na sondzie S2 (UPSERT starszego wpisu przy cofniętym zegarze). Testy autora sprawdzają tylko nowy wpis, czyli wyższe id, nie odświeżenie starszego wpisu przy czasie równym albo cofniętym.
  - Szablon C (łatwy „call”) jest tylko w `packages/poker-core/test/scenario-gen-decyzja-niezmienna.test.ts:31`, a tam ocena pochodzi z generatora. Pętli z niezależną wyrocznią `sprawdz` (`packages/poker-core/test/scenario-gen.test.ts:85`) obejmuje tylko A i B.
  - Stryker na zmienionych liniach domeny: 52/53 zabite, 1 przeżył (`dowody/bo-mutacje-domena-2.txt`): `rodzaj === 'test_modulu'` → `true` w `packages/domena/src/limit.ts:29`. Warunek sprzed BM, brak testu: pierwsze podejście = true przy innym rodzaju.
- Mechanizm: test sprawdza jedną z dwóch gałęzi (nowy wiersz albo UPSERT) i jedną z dwóch wyroczni.
- Powraca: nie
- Wzorzec lub źródło: „każda ścieżka zapisu i błędu ma test, który potrafi paść” (wzorzec roli).
- Kroki w aplikacji: brak (kod działa); ryzyko regresji niezauważonej przy zmianie.
- Opcje: (a) dopisać trzy testy: UPSERT starszego odcisku przy `terazMs` = max i < max; C w pętli `sprawdz`; `mozeStartowac('sesja', true, wyczerpany)` daje blokadę — minimalny koszt; (b) zostawić do nocnych mutacji — grupa `poker-core-reszta` obejmuje generator, ale `postep` nie jest w `stryker.config.json`. Rekomendacja: (a).
- Test akceptacyjny: M1, M2 i mutant `test_modulu` giną.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- **Dwa punkty decyzji z `expected[0] = 'fold'`** (np. szablon B łatwy `['fold','fold']`): punkt na turnie zależy od sprawdzenia na flopie, więc jest osiągalny tylko po błędzie. Brakuje rozstrzygnięcia roli 06/05, czy to zamierzone (D-109, linia rywala zależna od akcji).
- **Tłumaczenia szablonów:** `nakladka.ts` nie porównuje znaczników `{{w:…}}` ze źródłem. Brakuje potwierdzenia, czy tłumaczenia scenariuszy idą przez nakładkę czy jako pełne pliki (dziś brak treści scenariuszy).
- **Import pliku z `zagrano_ms` ≥ 2^53:** wtedy `max+1 == max` (precyzja liczby zmiennoprzecinkowej) i kolejność rozstrzyga `id`, a UPSERT starszego wpisu nie trafia na koniec. Teoretyczne, bo plik musiałby być spreparowany. Brakuje sprawdzenia, czy walidacja importu ogranicza zakres czasu.
- **Ocena „na jedną kartę” (R-M2-001, D-551):** to uproszczenie poza zakresem BM. Związek z 103 dla roli 06.

## Co działa dobrze i należy zachować
- Zapis historii to MAX, UPSERT i przycięcie w jednej transakcji przez kolejkę portu. Sonda S1: 25 zapisów `Promise.all` z malejącym zegarem daje kolejność wywołań i okno 20. Sonda S3: błąd CHECK wycofuje całość.
- `expected` jest pilnowane w trzech miejscach: schemat (1–2 akcje), budowanie (liczba = liczba punktów) i generator (filtr + błąd przy nieosiągalnym). Każdą z tych kontroli zabija inny mutant (K1–K4).
- Wyrocznia oceny w `scenario-gen.test.ts` jest niezależna: outy liczy wzorcowy ewaluator, cenę wzór w teście.
- Test BJ-001 przeniesiony z niezmienioną asercją. Dodano asercję zgodności z `expected` i szablon C.
- `czyPowtorkaWariantu` porównuje odcisk, nie ziarno (D-558), czyli to, co użytkownik rozpoznaje jako „to samo rozdanie”.

## Decyzje dla właściciela
Brak. Recenzja nie ma puli decyzji (polecenie BO pkt 7). Do rozstrzygnięcia przez role:
- 101: wybór (a) albo (b) przy kroku F (rola 08 z 05);
- 102: rola 05;
- 103: rola 06 z 03.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-101,08-programista-104,08-programista-105,08-programista-106` (101 w kroku F; 102 → rola 05; 103 → rola 06 z 03)

`git status --porcelain` przed commitem raportu: tylko nowe pliki recenzji (`?? docs/programista/recenzje/`); pliki śledzone nietknięte.
