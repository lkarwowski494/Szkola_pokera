# Audyt: Programista — Szkoła Pokera — recenzja niezależna CX (range-spot na ekranie scenariusza, D-886) — 2026-11-11
Commit: `564c3813` (zakres `46197812..564c3813`. Etap 1: `46197812..92b06ca9` (d423a6a8 kod i testy, f75be7ab, 92b06ca9 dokumenty). Etap 2 (rozszerzenie koordynatora): `92b06ca9..564c3813` (e85cc854 D-886, 7b674ce9 kopie en w 10 słownikach, 564c3813 poprawki recenzji DC)) · gałąź `sesja-dc-recenzja` (start = `origin/sesja-cx-range-spot` @ 92b06ca9, zgodny z poleceniem) · Tryb: audit (recenzja D-043, polecenie DC) · Środowisko: Linux 6.18, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (ekran sprawdzany renderem testowym, nie na urządzeniu).

## Podsumowanie
**Werdykt końcowy dla `564c3813`: PRZYJĄĆ** (otwarte: 0 KRYT, 0 WYS, 2 ŚR, 2 NIS). Warunek z etapu 1 spełniony: WYS-001 naprawione i potwierdzone testem odtwarzającym (`it.failing` → `it`) oraz mutacjami M10 i M11. 002 (D-886), 004 i 006 naprawione. Zostają ŚR 003 (graf) i 005 (ruch rywala) do backlogu przed pierwszym szablonem dwupunktowym albo vs-open, oraz dwa nowe NIS z etapu 2 (007 luki testów: zapowiedź VoiceOver i format liczby; 008 przycisk dwuliniowy jako tekst z `\n`). `pnpm run ci` na `564c3813` uruchomione w tej sesji: kod 0.

Etap 1 (`92b06ca9`), werdykt pierwotny: **PRZYJĄĆ Z WARUNKIEM** (0 KRYT, 1 WYS, 4 ŚR, 1 NIS). Kod CX robi to, co obiecuje dla pojedynczego punktu range-spot: akcje z etykiet węzła solvera, ocena z `rangeVerdict` wariantu, kwoty zgodne z tabelą D-886 (BB "call 2.5" → 1,5 bb, `push.sb-10` all-in → 10 bb, `call.bb-10` → 9 bb; ante w `call.bb-10-ante` też się zgadza, bo stos solvera jest bez ante, `tools/preflop-solver/src/pushfold.ts:6`). Testy CX łapią 7 z 9 mutacji. Ale w ręce mieszanej ekran mówi "✓ Zgodna" i jednocześnie "Lepiej: przebicie" oraz "Dlaczego pas to słabsze zagranie" (WYS-001, odtworzone testem). Dziś w `content/` nie ma żadnego szablonu range-spot (tylko fixture), więc tester tego nie zobaczy. **Warunek przyjęcia:** WYS-001 naprawione, zanim pierwszy szablon range-spot trafi do `content/` (bramka jest już otwarta, więc następna sesja treści może to wypuścić). ŚR do backlogu, w tym rozbieżność z D-886 (wdrożenie w osobnej sesji).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS | M | Ręka mieszana: pas oceniony „Zgodna”, a ekran pokazuje „Lepiej: …” i „dlaczego to słabsze zagranie” | zweryfikowane (564c3813) |
| 08-programista-002 | ŚR | P | Nazwy i kwoty akcji spotu niezgodne z projektem D-886 (`play.*` zamiast `scenario.action`, brak „3-bet”, „2.5bb”, kwota zdradza odpowiedź przed size-spot) | zweryfikowane (564c3813; reszta w 008) |
| 08-programista-003 | ŚR | D | Graf: każda akcja range-spot poza pasem i all-in prowadzi do następnego punktu, także gdy ten punkt nie wynika z tej akcji | otwarte |
| 08-programista-004 | ŚR | D | Test CK „budowanie go przyjmuje” przechodzi, choć budowanie odrzuca fixture innym błędem | zweryfikowane (564c3813) |
| 08-programista-005 | ŚR | D | Ekran decyzji range-spot nie mówi o ruchu rywala (otwarcie, all-in) ani o puli | otwarte |
| 08-programista-006 | NIS | D | Dwie mutacje przeżywają testy CX: kwota przebicia z blindu i all-in w linii dwupunktowej | zweryfikowane (564c3813) |
| 08-programista-007 | NIS | D | Testy D-886 nie łapią zapowiedzi VoiceOver z „Lepiej” ani zapisu liczby bez formatu języka | otwarte |
| 08-programista-008 | NIS | P | Przycisk akcji: nazwa i kwota jako jeden tekst z `\n`, w tym samym stylu (projekt: kwota mniejszym tekstem) | otwarte |

## Linia bazowa i założenia
Ocena z kodu, diffów, projektu i własnych testów przed przeczytaniem raportu autora; `docs/decyzje/CX.md` (D-866–D-869) przeczytane po własnej ocenie, tylko by odróżnić decyzje od defektów.
- **Ścieżki zapisu:** wybór zapisany w bazie przechodzi przez `jestAkcja` (`apps/mobile/src/features/scenariusz/wariant.ts:27`), wspólny strażnik zamiast lokalnej listy w `aktywnoscScenariusza.ts`; schemat, migracje i eksport bez zmian. Wzorzec `^(raise|call) \d+(\.\d+)?$` przepuszcza każdy rozmiar, ale wybór spoza węzła i tak odrzuca `przebiegScenariusza` (`akcja_niedostepna`); sprawdzone, brak znaleziska.
- **Obsługa błędów:** etykieta spotu spoza wzorca rzuca wyjątek (`apps/mobile/src/features/scenariusz/wariant.ts:28-31`), ale bramka budowania sprawdza wyjaśnienie każdej akcji węzła (`tools/content-build/src/scenariusze.ts:106-108`), a etykiety solvera to dziś tylko `fold`, `call`, `call N`, `raise N`, `all-in` (wypis wszystkich 34 spotów z `compileRanges`, sonda w scratchpadzie, wynik niżej w „Pokrycie”).
- **Typy na granicach:** `akcjaSpotu` parsuje etykietę strażnikiem, bez `as`; sprawdzone, brak.
- **System projektowy, teksty:** bez nowych kluczy, `play.*` (002).
- **Wydajność:** bez zmian ścieżek gorących; brak.
- **Testy na właściwym poziomie:** czyste funkcje i render na prawdziwej bazie treści (`dbCn`); mutacje niżej.
- **Dostępność:** przyciski z nazwą i kwotą (`PasekStrategii`), zapowiedź oceny z nazwą akcji; zapowiedź przed decyzją range-spot to sama ulica, bez ruchu rywala (005).
- **Liczby konfiguracyjne:** progi `rangeVerdict` z kontekstu (`mixedMin`, `mixedLow`), bez nowych literałów; brak.
- **Soczewki:** (1) recenzent szukający ścieżki bez testu → mutacje M5 i M7 (006), test CK (004); (2) programista czytający moduł pierwszy raz → `bloki` i zdanie werdyktu porównują wybór z `poprawnaAkcja`, a ocena pochodzi z `rangeVerdict`, który daje kilka „correct” (001); (3) użytkownik VoiceOver → przed decyzją słyszy „Preflop”, bez otwarcia rywala (005); (4) użytkownik przerwany w połowie → wznowienie bez zmian, odcisk wariantu obejmuje `points` z `options`.
- **Wzorzec najlepszych:** ocena, zdanie werdyktu i bloki „dlaczego” pochodzą z jednej tabeli ocen (projekt `docs/design/scenariusz-i-ocena.md:19`: przy „zgodne” blok „dobrze”, przy ręce mieszanej „Kiedy które zagranie”).
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/features/scenariusz/wariant.ts` (cały plik) | tak | lektura, mutacje M1–M7, test DC |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` (przebieg, koniec, nazwy akcji, dziennik) | tak | lektura, render w teście DC |
| `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts` (zmiana strażnika) | tak | lektura diffu |
| `tools/content-build/src/scenariusze.ts` (bramka, kontrola wyjaśnień) | tak | lektura, mutacje M8–M9 |
| `cm-recenzja-cl.test.ts`, `szablon-na-ekranie-ck.test.ts` (KO-063) | tak | diff względem 46197812, sonda budowania |
| Testy CX (`cx-range-spot.test.tsx`, `cx-range-spot.test.ts`) | tak | lektura, mutacje |
| `packages/poker-core` (`rangeVerdict`, `validateTemplate`, punkt range-spot) | tak, tylko czytane miejsca | `packages/poker-core/src/grading.ts:135-139`, `packages/poker-core/src/scenario-gen.ts:324-333` |
| Projekt D-886 (`origin/sesja-da-teksty` @ 7366faa9, `docs/design/scenariusz-akcje-i-liczby.md` §1) | tak | `git show 7366faa9:…` |
| Ekran na urządzeniu iOS, AX5, VoiceOver | nie | brak macOS; tylko render testowy |

Wyniki sond (komendy i kody wyjścia):
- Etykiety węzłów: `compileRanges(content).spots` → 34 spoty; etykiety tylko `fold`, `raise 2.5`, `raise 3`, `call 2.5`, `call 3`, `raise 7.5`, `raise 9`, `raise 10`, `all-in`, `call` (zwykłe `call` tylko w spotach `call.*`, czyli wobec all-inu). Kod 0.
- Szablony range-spot w treści: `grep -rln "range-spot" content/` → 0 trafień (tylko `tools/content-build/test/fixtures/range-spot/`).
- Mutacje (każda nałożona na plik, test, plik przywrócony; `git status --porcelain` po serii: tylko nowy test DC):

| Mutacja | Testy | Wynik |
|---|---|---|
| M1 ocena spotu: `acceptable` → `blad` | `cx-range-spot.test.tsx` kod 1 (1 failed / 12) | zabita |
| M2 ocena: zgodna tylko akcja `correct`, reszta błąd | kod 1 (1 / 12) | zabita |
| M3 kwota `call N` bez odjęcia blinda | kod 1 (1 / 12) | zabita |
| M4 kwota `call` wobec all-inu = cały stos | kod 1 (1 / 12) | zabita |
| M5 kwota `raise N` minus blind gracza | kod 0 (12 / 12) | **przeżyła** (006) |
| M6 graf: range-spot zawsze kończy | kod 1 (2 / 12) | zabita |
| M7 graf: all-in prowadzi do następnego punktu | kod 0 (12 / 12) | **przeżyła** (006) |
| M8 bramka bez kontroli wyjaśnień akcji spotu | content-build kod 1 (1 / 26) | zabita |
| M9 bramka bez `range-spot` na liście | content-build kod 1 (7 / 26) | zabita |

### Etap 2: `92b06ca9..564c3813` (rozszerzenie koordynatora)
Zakres: `tekstAkcji` i `opisAkcji` (nazwy z grupy `scenario.action`, kwoty `pay`/`to`/`all`, liczba przez `formatujLiczbe`, „3-bet” z rodziny spotu `przebiciaWSpocie`, brak kwoty przebicia przed size-spot), klucze `scenario.action.*` w 12 słownikach (pl, en z przekładem; 10 kopii en wg D-871/KO-066 jako dług jawny), poprawki 001, 004, 006, dostosowanie asercji istniejących testów do nowych nazw.
- Zmienione asercje (`ekran.test.tsx`, `ekran-cn.test.tsx`, `cx-range-spot.test.tsx`, `cp-recenzja-cn.test.tsx`, `cs-tresc-realna.test.tsx`): tylko nowe brzmienie („Czekam” → „Czekanie”, „Sprawdzam 9bb” → „Sprawdzenie … 9 bb”, „Przebicie” → „3-bet” w three-bet-size); oczekiwania co do akcji, ocen i kolejności bez poluzowania. `git diff 92b06ca9..564c3813` przejrzany.
- 001: bloki z oceny (`wariant.ts` linia 282 @ 564c3813: `return ocenaAkcji(d, wybor) === 'zgodne'`), zdanie werdyktu i zapowiedź z `ocenaWyboru === 'zgodne'` (`EkranScenariusza.tsx` linie 204 i 246 @ 564c3813). `dc-recenzja-cx.test.tsx`: `it.failing` → `it`, zielone.
- 004: asercja pozytywna na błąd pojemności plus `checkScenarioNaEkran(...) === []`; drugi warunek łapie mutację M9.
- Klucze: spacja nierozdzielająca w `amountPay`/`amountTo`/`amountAll` (sprawdzone `od -c`), język testów `pl`, `formatujLiczbe(2.5, 'pl')` = „2,5” (sonda, kod 0).
- `pnpm run ci` @ 564c3813 (checkout odłączony w tej sesji): kod 0; mobile 969/969, content-build 417 + 1 oczekiwany fail, domena 347 + 1 oczekiwany fail, pozostałe pakiety zielone; dowód `docs/programista/dowody/dc-ci-564c3813.txt`.

Mutacje etapu 2 (`npx jest --ci src/features/scenariusz` na 564c3813, każda mutacja przywrócona; `git status --porcelain` pusty po serii):

| Mutacja | Wynik |
|---|---|
| M5 kwota `raise N` minus blind | zabita (`cx-range-spot.test.tsx`) |
| M7 all-in prowadzi do następnego punktu | zabita (`cx-range-spot.test.tsx`) |
| M10 bloki: powrót do `wybor === poprawna` | zabita (`dc-recenzja-cx.test.tsx`) |
| M11 werdykt: powrót do `wybor === najlepsza` | zabita (`dc-recenzja-cx.test.tsx`) |
| M12 zapowiedź VoiceOver zawsze z „Lepiej” | **przeżyła** (007) |
| M13 kwota przebicia przed size-spot nie jest ukrywana | zabita (`cx-nazwy-akcji.test.tsx`) |
| M14 `vs-open` bez 3-betu (0 przebić) | zabita (`cx-nazwy-akcji.test.tsx`, 2 testy) |
| M15 liczba bez formatu języka (`String(bb)`) | **przeżyła** (007) |
| M16 `call N` jako rozmiar całkowity | zabita (`cx-nazwy-akcji.test.tsx`, 3 testy) |

## Kontrola dowodów i sekretów
Raport bez sekretów; odwołania `plik:linia` sprawdzone ręcznie na `92b06ca9` (plus test DC na `b718641b`). Pełna weryfikacja: `docs/programista/dowody/dc-ci-b718641b.txt` (wynik w „Decyzje dla właściciela” i stanie DC).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy (ocena i kwoty akcji spotu) | 001 (ocena vs bloki), 006 (luki testów) |
| DEV-02 | dotyczy (d423a6a8) | commit zmienia kod i testy razem; 1/1 |
| DEV-03 | dotyczy (KO-063: zmienione asercje) | 004; zmiana `cm-recenzja-cl.test.ts` uzasadniona zniesieniem D-755 (D-866), kontrola icm-call zachowana (`tools/content-build/test/cp-recenzja-cn.test.ts:64-65`), kontrola all-in zachowana (`tools/content-build/test/szablon-na-ekranie-ck.test.ts:34-38` bez zmian) |
| DEV-04 | dotyczy | `pnpm run ci` (dowód w pliku CI) |
| DEV-05, DEV-06 | nie dotyczy | CX nie zmienia zapisu, schematu ani kopii |
| DEV-07 | dotyczy (kwoty) | `bb ?? 0` w `nazwaAkcji` przy `raise N`/`call N` nie występuje (kwota z etykiety zawsze liczba); `call` i `all-in` bez `stackBb` → `0 bb` albo „All-in” bez kwoty; dziś każdy szablon ma `stackBb` (schemat). Ok |
| DEV-08 | nie dotyczy | bez dat |
| DEV-09 | dotyczy | ok (`jestAkcja`, bez `as`) |
| DEV-10 | dotyczy | wyjątki tylko przy etykiecie spoza wzorca, której bramka nie przepuści; ok |
| DEV-11 | dotyczy | bez nowych stylów; ok |
| DEV-12 | dotyczy | 002 (klucze i format liczby) |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | diff bez sekretów; ok |
| DEV-15 | nie dotyczy | bez nasłuchów i timerów |
| DEV-16 | dotyczy (bb całkowite vs dopłata) | ok: „raise N” = do N bb, „call N” = N − blind, zgodnie z D-886 |

## Znaleziska (szczegóły)

### 08-programista-001 · Ręka mieszana: pas oceniony „Zgodna”, a ekran pokazuje „Lepiej: …” i „dlaczego to słabsze zagranie”
- Pozycja listy kontrolnej: DEV-01
- Poziom: WYS (błędne twierdzenie merytoryczne na ekranie oceny)
- Realność: brzegowy dziś (brak szablonu range-spot w `content/`), realny od pierwszego takiego szablonu · Pewność: wysoka
- Rodzaj: M
- Dowód: `rangeVerdict` daje "correct" każdej akcji z częstością ≥ `mixedLow` (`packages/poker-core/src/grading.ts:138`), więc na poziomie "trudny" (oczekiwane otwarcie 0,25–0,9) pas często też jest "correct". Ekran ocenia z werdyktu (`apps/mobile/src/features/scenariusz/wariant.ts:130-134`), ale bloki i zdanie werdyktu porównują wybór z `poprawnaAkcja`: `apps/mobile/src/features/scenariusz/wariant.ts:251-253` i `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:236`. Test `apps/mobile/src/features/scenariusz/__tests__/dc-recenzja-cx.test.tsx` jako `it` (kod 1, 2 failed / 3): `Expected: "dobrze" Received: "slabsza"`; tekst ekranu: "✓ Zgodna Twój wybór: Pas (fold). Lepiej: Przebicie (raise) do 2.5bb. Dlaczego "Pas (fold)" to słabsze zagranie …". Jako `it.failing` kod 0 (3/3).
- Mechanizm: wybór porównany z jedną "poprawną" akcją zamiast z oceną; `grep -n "poprawnaAkcja\|najlepsza" apps/mobile/src/features/scenariusz/*.tsx apps/mobile/src/features/scenariusz/wariant.ts` → bloki (`apps/mobile/src/features/scenariusz/wariant.ts:250-253`), werdykt (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:236`), zapowiedź VoiceOver (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:195`, zawsze z "Lepiej"); lista końcowa (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:292`) liczy "lepiej" z oceny i jest poprawna. Ten sam wzorzec dotyczy "dopuszczalne" w c-becie i rozmiarze (CN), ale tam "słabsza / lepsza" przy "Dopuszczalna" nie przeczy werdyktowi; sprzeczność powstaje dopiero przy kilku "zgodnych" akcjach, które wnosi range-spot.
- Powraca: nie (pokrewne CP WYS-002: skala ocen ekranu)
- Wzorzec lub źródło: ADR-04 (ręka mieszana: oba zagrania poprawne, `CLAUDE.md`); projekt `docs/design/scenariusz-i-ocena.md:19` („Przy „zgodne” jeden blok „Dlaczego dobrze” … Przy ręce mieszanej blok „Kiedy które zagranie””).
- Kroki w aplikacji: szablon range-spot (np. `rfi.btn`, poziom trudny) → ręka mieszana (np. 75o z otwarciem < 75%) → wybierz pas → ekran oceny.
- Opcje: (a) bloki i zdanie werdyktu wybierane według oceny: „zgodne” → `yoursGood` i blok „dobrze” plus „dlaczego nie” pozostałych; mały diff, ale bez bloku „Kiedy które zagranie” z projektu; (b) jak (a) plus blok „Kiedy które zagranie” dla ręki mieszanej (wymaga tekstu od roli 04/06); (c) generator nie losuje rąk z drugą akcją ≥ `mixedLow` — zmienia treść poziomu trudnego. Rekomendacja: (a) teraz jako naprawa blokera, (b) do backlogu roli 04.
- Test akceptacyjny: `dc-recenzja-cx.test.tsx` z `it.failing` → `it` zielony; zapowiedź VoiceOver bez „Lepiej” przy ocenie zgodnej.
- Status: zweryfikowane (564c3813: bloki, werdykt i zapowiedź z oceny; `dc-recenzja-cx.test.tsx` jako `it` zielone; mutacje M10, M11 zabite; zapowiedź bez testu → 007)

### 08-programista-002 · Nazwy i kwoty akcji spotu niezgodne z projektem D-886
- Pozycja listy kontrolnej: DEV-12
- Poziom: ŚR
- Realność: brzegowy (brak szablonu range-spot w treści; wdrożenie D-886 zaplanowane w osobnej sesji) · Pewność: wysoka
- Rodzaj: P
- Dowód: kod używa `play.raise`, `play.call`, `play.allin` (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:45-46`); projekt `docs/design/scenariusz-akcje-i-liczby.md` §1 @ 7366faa9: grupa `scenario.action` "zastępuje `play.*` na ekranie scenariusza". Rozbieżności: (1) `raise X` w spocie z jednym przebiciem w `path` (`vs-open.*`) ma być "3-bet", kod pisze "Przebicie do 10bb"; (2) kwota z formatem języka i spacją nierozdzielającą ("2,5 bb"), kod daje "do 2.5bb" (tekst ekranu w teście DC); (3) "range-spot, po którym szablon ma punkt size-spot": przycisk przebicia bez kwoty, bo kwota zdradza odpowiedź na następne pytanie; kod zawsze dopisuje kwotę, a generator dopuszcza taką linię (`packages/poker-core/src/scenario-gen.ts:329-332`); (4) testy CX akceptują oba separatory (`apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:122-123`, `2[.,]5`). Zgodne z projektem: kwoty (tabela "Kwota przy akcji") i kolejność na pasku.
- Mechanizm: jedna funkcja `nazwaAkcji`; po wdrożeniu D-886 wszystkie wywołania (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:195`, `:198`, `:297-298`) dostaną nowe nazwy.
- Powraca: nie
- Wzorzec lub źródło: D-886 (rola 04, `docs/decyzje/DA.md` na `origin/sesja-da-teksty`).
- Kroki w aplikacji: szablon `vs-open.bb-vs-btn` → pasek „Sprawdzam 1.5bb · Przebicie do 10bb”.
- Opcje: (a) wdrożyć D-886 w zaplanowanej sesji, przed pierwszym szablonem range-spot w treści — jeden diff, testy kryteriów 1–6 projektu; (b) wdrożyć teraz osobno format liczby i brak kwoty przed size-spot — szybciej, ale dwa przejścia po tych samych nazwach. Rekomendacja: (a).
- Test akceptacyjny: kryteria akceptacji 1–5 z §1 projektu D-886.
- Status: zweryfikowane (564c3813: `scenario.action`, „3-bet” w `vs-open.*` i three-bet-size, „2,5 bb” ze spacją nierozdzielającą, brak kwoty przebicia przed size-spot także w dzienniku; mutacje M13, M14, M16 zabite; luki: 007, wygląd przycisku: 008)

### 08-programista-003 · Graf: każda akcja range-spot poza pasem i all-in prowadzi do następnego punktu
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR
- Realność: brzegowy (brak treści; generator dopuszcza range-spot + draw-call, size-spot albo cbet-case) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:115` („dalej: i < ostatni && akcja !== 'fold' && akcja !== 'all-in' ? i + 1 : 'koniec'”). Przy `vs-open.bb-vs-btn` + size-spot `three-bet-size` (dozwolone w `validateTemplate`, `packages/poker-core/src/scenario-gen.ts:329-332`) wybór „call 2.5” prowadzi do pytania o rozmiar 3-betu, którego gracz nie zrobił; przy range-spot + draw-call sprawdzenie i 3-bet prowadzą do tego samego flopa z tą samą pulą szablonu.
- Mechanizm: graf nie zna akcji, która prowadzi do następnego punktu; jedno miejsce.
- Powraca: nie
- Wzorzec lub źródło: D-219 (graf: tylko akcja zgodna z linią prowadzi dalej, jak sprawdzenie w draw-call).
- Kroki w aplikacji: szablon F1+F3 → „Sprawdzenie” → pytanie o rozmiar 3-betu.
- Opcje: (a) dalej prowadzi tylko akcja oczekiwana z poziomu (`expected[0]`), inne kończą rozdanie; (b) bramka budowania odrzuca range-spot z kolejnym punktem, dopóki szablon nie poda akcji prowadzącej dalej. Rekomendacja: (b) teraz (tania kontrola), (a) razem z pierwszym szablonem dwupunktowym.
- Test akceptacyjny: graf F1+F3: `call 2.5` → `koniec`, `raise 10` → 1; albo test bramki odrzucającej taki szablon.
- Status: otwarte

### 08-programista-004 · Test CK „budowanie go przyjmuje” przechodzi, choć budowanie odrzuca fixture
- Pozycja listy kontrolnej: DEV-03
- Poziom: ŚR
- Realność: realny (fałszywy sygnał w teście; użytkownika nie dotyczy) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/szablon-na-ekranie-ck.test.ts:31-32` — `.not.toThrow(/nie jest jeszcze obsługiwany na ekranie scenariusza/)` przechodzi także, gdy budowanie rzuca inny błąd. Sonda (ta sama procedura `zTreścią`, kod 0): `compileContent` rzuca "szablon sc-fx-rfi-btn: poziom sredni: pojemność 3 odcisków w 2000 losowaniach, wymagane 40" (i to samo dla "trudny"). Nazwa testu twierdzi, że budowanie szablon przyjmuje.
- Mechanizm: `grep -rn "not.toThrow(/" tools/content-build/test apps/mobile/src` → 1 trafienie (to).
- Powraca: tak, ten sam typ co CP 004 (nazwa testu ponad to, co sprawdza) → trwała kontrola: asercja na liście błędów bramki (`checkScenarioNaEkran`) albo na komunikacie budowania bez dopasowania wzorcem negatywnym.
- Wzorzec lub źródło: DEV-03 (asercja poluzowana przy zmianie oczekiwania).
- Kroki w aplikacji: brak (test).
- Opcje: (a) asercja: budowanie rzuca, ale żaden komunikat nie dotyczy ekranu (`toThrow` + sprawdzenie treści), nazwa „bramka ekranu nie odrzuca”; (b) fixture z poziomami o wystarczającej pojemności i `.not.toThrow()`. Rekomendacja: (a), bo pojemność fixture to nie temat tego testu.
- Test akceptacyjny: mutacja „bramka odrzuca range-spot” daje czerwień tego testu, a nazwa opisuje to, co sprawdza.
- Status: otwarte (etap 2 bez zmian grafu)

### 08-programista-005 · Ekran decyzji range-spot nie mówi o ruchu rywala ani o puli
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR
- Realność: brzegowy (brak treści) · Pewność: wysoka
- Rodzaj: P
- Dowód: `ruchRywala` zwraca null dla range-spot (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:123-130`), a `widokDecyzji` daje pulę null (`apps/mobile/src/features/scenariusz/wariant.ts:210`). W spocie `vs-open.bb-vs-btn` przyciski "Sprawdzam 1.5bb · Przebicie do 10bb" pojawiają się bez zdania, że Button otworzył na 2,5 bb; w `call.*` bez zdania o all-inie rywala. Sytuacja jest tylko na ekranie startu (`situation`) i w wyjaśnieniach po decyzji. Dla size-spot `three-bet-size` kod pisze otwarcie rywala (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:129`).
- Mechanizm: jedno miejsce (`ruchRywala`).
- Powraca: nie (autor zapisał to jako pozycję otwartą, `docs/decyzje/CX.md` sekcja "Otwarte"; recenzja nadaje poziom)
- Wzorzec lub źródło: `docs/design/scenariusz-i-ocena.md:19` (zdanie sytuacji: „ręka, pozycja, stół, akcja rywala”).
- Kroki w aplikacji: szablon vs-open → ekran decyzji (także VoiceOver: zapowiedź „Preflop” bez ruchu rywala).
- Opcje: (a) ruch rywala z `path` spotu (ostatnia akcja: `raise2.5` → `play.log.raise`, `allin` → `play.log.allin`), bez nowych tekstów; (b) tytuł spotu ze `spots.yaml` nad paskiem — nowy element, decyzja roli 04. Rekomendacja: (a).
- Test akceptacyjny: render decyzji `vs-open.bb-vs-btn` zawiera „BTN” i „2.5” (albo „2,5” po D-886) w dzienniku; `call.bb-10` zawiera all-in rywala.
- Status: zweryfikowane (564c3813: asercja na błąd pojemności i pusta lista błędów bramki)

### 08-programista-006 · Dwie mutacje przeżywają testy CX
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS
- Realność: teoretyczny (kod dziś poprawny) · Pewność: wysoka
- Rodzaj: D
- Dowód: M5 (kwota `raise N` minus blind) i M7 (all-in prowadzi dalej) dają kod 0 w `cx-range-spot.test.tsx` (tabela w „Pokrycie”). Test kwot sprawdza podbicie tylko z BTN (blind 0, `apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:134`), a graf nie ma przypadku all-in w linii dwupunktowej.
- Mechanizm: luki testu, nie kodu.
- Powraca: nie
- Wzorzec lub źródło: wzorce roli („test, który potrafi paść”).
- Kroki w aplikacji: brak.
- Opcje: (a) dopisać `kwotaAkcji(d, 'raise 10', poz('SB', 100)) === 10` i graf push + draw-call (all-in → koniec); (b) zostawić do D-886, które i tak dopisze testy kwot. Rekomendacja: (a) przy naprawie 001.
- Test akceptacyjny: M5 i M7 zabite.
- Status: zweryfikowane (564c3813: M5 i M7 zabite)

### 08-programista-007 · Testy D-886 nie łapią zapowiedzi VoiceOver z „Lepiej” ani zapisu liczby bez formatu języka
- Pozycja listy kontrolnej: DEV-03
- Poziom: NIS
- Realność: teoretyczny (kod na 564c3813 poprawny) · Pewność: wysoka
- Rodzaj: D
- Dowód: mutacja M12 (zapowiedź po ocenie zawsze `scenario.verdict.yours` z „Lepiej”) i M15 (`{ bb: String(bb) }` zamiast `formatujLiczbe`) dają kod 0 dla `npx jest --ci src/features/scenariusz` (206/206). Asercje kwot w `cx-nazwy-akcji.test.tsx` dopuszczają oba separatory (`/^1[.,]5 bb$/`, `/^do 2[.,]5 bb$/`, linie 61, 69, 71 @ 564c3813), choć test działa w języku `pl`, a format daje „2,5”.
- Mechanizm: `grep -n "\[.,\]" apps/mobile/src/features/scenariusz/__tests__/*.tsx` → wzorce w `cx-nazwy-akcji.test.tsx` i `cx-range-spot.test.tsx` (etap 1, linie 122-123).
- Powraca: tak, ten sam typ co 006 (test, który nie potrafi paść) → trwała kontrola: asercja z przecinkiem dla `pl` i test zapowiedzi (`useAnnounce` przez mock `AccessibilityInfo.announceForAccessibility`).
- Wzorzec lub źródło: wzorce roli („test, który potrafi paść”); D-886 („liczba formatowana według języka (pl „2,5”, en „2.5”)”).
- Kroki w aplikacji: brak (test).
- Opcje: (a) zaostrzyć regex do `2,5` i dodać test zapowiedzi przy ocenie zgodnej; (b) zostawić do sesji przekładu roli 09, która dotknie tych tekstów. Rekomendacja: (a), kilka linii.
- Test akceptacyjny: M12 i M15 zabite.
- Status: otwarte

### 08-programista-008 · Przycisk akcji: nazwa i kwota jako jeden tekst z `\n`, w tym samym stylu
- Pozycja listy kontrolnej: DEV-11
- Poziom: NIS
- Realność: realny od pierwszego szablonu z kwotą na przycisku (dziś draw-call: „Sprawdzenie” / „N bb”) · Pewność: wysoka
- Rodzaj: P
- Dowód: `EkranScenariusza.tsx` linia 240 @ 564c3813 przekazuje `teksty[a]?.przycisk` (nazwa + `\n` + kwota) do `PasekStrategii`, który renderuje jeden `Text` stylem `styl.naglowek` i ten sam napis jako `accessibilityLabel` (`PasekStrategii.tsx` linie 55 i 65 @ 564c3813). Projekt D-886 §1: kwota pod nazwą „mniejszym tekstem”, VoiceOver „Sprawdzenie, 1,5 bb”. Autor zapisał to jako tymczasowe (D-870: `PasekStrategii` poza listą ścieżek CX).
- Mechanizm: jedno miejsce (`PasekStrategii`, opcja `{ text }`).
- Powraca: nie
- Wzorzec lub źródło: D-886 §1 (zasada i VoiceOver); kryterium 6 (AX5, 320 pt) niesprawdzone (brak macOS).
- Kroki w aplikacji: dowolny punkt z kwotą → pasek akcji: dwie linie tej samej wielkości.
- Opcje: (a) `PasekStrategii` przyjmuje `{ text, podpis? }` i renderuje podpis stylem `drobny`, etykieta „nazwa, kwota”; (b) zostawić do przeglądu wizualnego roli 04. Rekomendacja: (a) w osobnym zadaniu z listą ścieżek obejmującą `apps/mobile/src/components/PasekStrategii.tsx`, ze zrzutem przy AX5.
- Test akceptacyjny: etykieta przycisku „Sprawdzenie, 1,5 bb”; kwota w osobnym `Text` stylem drobnym; zrzut 320 pt AX5 bez ucinania.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Ekran na iOS przy AX5 z dłuższymi nazwami („Sprawdzam 1.5bb”, trzy przyciski vs-open): nie sprawdzone (brak macOS); kryterium 6 D-886 obejmie to po wdrożeniu nazw.
- Pojemność wariantów dla realnych szablonów range-spot `rfi.*` na poziomach średni/trudny: fixture ma 3 odciski przy wymaganych 40 (sonda 004); czy jakikolwiek trzypoziomowy szablon `rfi.*` przejdzie budowanie, rozstrzygnie sesja treści.
- `docs/decyzje/CX.md:2`: CX nie sprawdził analogii z Treningiem (D-191) i oznaczył to `[DO USTALENIA]`; poza zakresem tej recenzji.

## Co działa dobrze i należy zachować
- Kwoty akcji spotu: wszystkie przypadki tabeli D-886 i ante w `call.bb-10-ante` (stos solvera bez ante) zgadzają się; testy zabijają mutacje M3 i M4.
- Ocena z werdyktu wariantu (`rangeVerdict`) z niezależną wyrocznią w teście (`apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:80-96`, 300 ziaren, ręce mieszane obecne): zabija M1 i M2.
- Bramka budowania jako lista dozwolonych plus nowa kontrola „każda akcja węzła ma wyjaśnienie” (D-869): zabija M8 i M9; icm-call nadal odrzucany.
- Jeden strażnik `jestAkcja` dla wyboru z bazy i etykiet spotu.

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. Do koordynatora: warunek przyjęcia (001 przed pierwszym szablonem range-spot w `content/`) i kolejność 002 (sesja D-886) względem 003/005. Decyzje techniczne recenzji: D-894, D-895, D-896 (`docs/decyzje/DC.md`, do weta).

## Proponowane polecenie naprawy
Po etapie 2 (001, 002, 004, 006 zweryfikowane): `node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-003,08-programista-005,08-programista-007` przed pierwszym szablonem dwupunktowym albo vs-open w treści; 008 razem z przeglądem wizualnym roli 04 (`PasekStrategii`).
