# Weryfikacja przeciwna: g4-dane-b-bezpieczenstwo

Wejście: `weryfikacja/wejscie-g4-dane-b-bezpieczenstwo.md` (5 ID). Kod: f75acdff (odczyt w kopii roboczej repo i w worktree odłączonym w scratchpadzie), 2026-11-17. Pełnego `pnpm run ci` nie uruchamiano. Etap: TestFlight wewnętrzny, poza właścicielem brak użytkowników i ich danych; próg wydania wg CLAUDE.md „Audyty i wydania” pkt 1.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 07-jakosc-002 | potwierdzone (z korektą: „jedyny roundtrip” nieścisłe) | `dowody/g4-dane-b-bezpieczenstwo-jak002.txt`; brak `tests/dane/eksport` (kod 2), 0 plików z fast-check w `packages/postep` | P2 (ŚREDNIE) | nie | nie |
| 12-niezawodnosc-006 | potwierdzone | sonda własna `dowody/g4-dane-b-bezpieczenstwo-niez006.txt` (kod 0): 3 starty `tresc_niedostepna`, wywołania bez `kopiuj` | P2 (ŚREDNIE) | nie | nie |
| 05-architekt-002 | potwierdzone (mechanizm); skutek `0xdead10cc` niepotwierdzony na urządzeniu | `dowody/g4-dane-b-bezpieczenstwo-arch002.txt`; 0 wywołań `AppState` poza komentarzami | P2 (ŚREDNIE) | nie | nie |
| 01-odkrywanie-004 | potwierdzone jako luka BRD; poziom obalony | `dowody/g4-dane-b-bezpieczenstwo-odk004.txt`; scenariusze błędu są w architekturze i testach | P2 (NISKIE), nie P1 | nie | nie |
| 07-jakosc-004 | potwierdzone (z korektą: 15 użyć akcji, nie 16) | `dowody/g4-dane-b-bezpieczenstwo-jak004.txt`; 0 akcji przypiętych do SHA (kod 1 = brak trafień) | P2 (ŚREDNIE) | nie | nie |

Wspólne przyczyny:
- 05-architekt-002 i 01-odkrywanie-004 dotyczą tej samej luki: przerwanie długiej operacji na danych. BRD nie ma scenariusza błędu, a wymóg architektury (ADR 0013 pkt 4–5, nasłuch `AppState`) nie jest wdrożony. Komunikat `przerwano_w_tle` „Import nie został dokończony” ma w `tlo-i-bledy.md` stan „brak”.
- 07-jakosc-002 i 05-architekt-002 mają wspólną przyczynę: operacje na danych nie zostały sprawdzone na urządzeniu. Kroki telefonu T-06 (eksport → import) i U-2 (import z wyjściem do tła) są zaplanowane, ale nie ma po nich śladu: brak pliku z telefonu i brak raportu.

## 07-jakosc-002

Wynik: **potwierdzone**, z jedną korektą.
- Brak pliku eksportu z telefonu: `ls tests/dane` daje tylko `k08`, a `tests/dane/eksport` nie istnieje (kod 2; `dowody/g4-dane-b-bezpieczenstwo-jak002.txt`). Plan jest w `docs/jakosc/strategia.md:169`: „właściciel eksportuje z telefonu przy każdym wydaniu (D-169)”.
- Brak testu własności: według `docs/jakosc/strategia.md:30` ryzyko R-14 ma być sprawdzane „własności (fast-check, generator stanu bazy) + telefon T-06”. Tymczasem 0 plików w `packages/postep` używa fast-check. Fast-check jest tylko w `poker-core`, `domena` i `srs`.
- Korekta: zdanie „jedyny roundtrip” jest nieścisłe. Są jeszcze `packages/postep/test/wariantyHistoria-532.test.ts:136` „round-trip: eksport → import na czystej bazie daje identyczną historię” oraz `packages/postep/test/wariantyHistoria-cf.test.ts:103`. Wszystkie jednak działają na syntetycznym wzorcu w Node, więc sedno znaleziska zostaje.
- Adapter expo jest testowany na atrapie node:sqlite: `apps/mobile/src/data/__tests__/postepExpo-08.test.ts:3` „Atrapa SQLiteDatabase na node:sqlite (prawdziwy SQLite,”.
- Plan pokrycia na telefonie istnieje: `docs/jakosc/strategia.md:247` „eksport → import na drugim telefonie”, z terminem „przed App Store; T-06 co wydanie zmieniające dane”. Rola 07 zapisała stan w `docs/jakosc/przekazanie-08.md:57` „eksport z telefonu czeka na pierwsze wydanie”.

Poziom: P2 pasuje. To luka w pokryciu testami, nie stwierdzony błąd. Ścieżka danych ma testy integracyjne K-11, K-10 i K-12.
- Blokuje 1012: nie. To test wewnętrzny, a jego wynik (plik z telefonu) właśnie da ten dowód.
- Blokuje App Store: nie (P2). Krok T-06 przed App Store i tak wynika ze strategii, więc warto go wykonać i zapisać.

## 12-niezawodnosc-006

Wynik: **potwierdzone**.
- Plan kopiuje plik tylko wtedy, gdy na urządzeniu go nie ma: `packages/domena/src/tresc.ts:39` „kopiuj: !wej.naUrzadzeniu.includes(plik),”.
- Błąd otwarcia nie usuwa kopii: `packages/domena/src/tresc.ts:114` łapie wyjątek i zwraca `NIEDOSTEPNA`, bez sprzątania pliku docelowego.
- Sonda własna na `przygotujTresc` z worktree f75acdff (`dowody/g4-dane-b-bezpieczenstwo-niez006.txt`, kod 0): uszkodzona kopia na urządzeniu i zdrowy plik w paczce. Wynik: 3 starty dają `tresc_niedostepna`, wywołania `lista,lista,otworz`, bez `kopiuj`.
- Ponowienie w `apps/mobile/src/data/tresc/useTresc.ts:56` uruchamia tę samą ścieżkę, więc niczego nie zmienia.
- Ekran błędu: `apps/mobile/src/app/_layout.tsx:151` „if (tresc.stan === 'blad') return <RenderErrorScreen onRetry={tresc.ponow} />;”.
- Polityka błędów przewiduje dla tego stanu tylko ekran: `docs/architektura/tlo-i-bledy.md:69` „ekran błędu bez pustych list; dane użytkownika nietknięte”. Nie ma decyzji, która wykluczałaby ponowną kopię z paczki, ale też żadna jej nie wymaga.
- Drogi wyjścia bez reinstalacji: aktualizacja aplikacji z inną wersją treści (nowa nazwa pliku, więc kopia) albo zmiana języka systemu.

Poziom: P2 pasuje.
- Realność teoretyczna: kopia powstaje pod nazwą tymczasową i jest przemianowywana (`packages/domena/src/tresc.ts:102`).
- `postep.db` jest nietknięty.
- Blokuje 1012 i App Store: nie. Skutek wymaga awarii nośnika albo systemu, a dane użytkownika zostają.

## 05-architekt-002

Wynik: **potwierdzone (mechanizm)**.
- Handler wysyła zdarzenie i od razu kończy zadanie: `apps/mobile/modules/ochrona-tla/ios/OchronaTlaModule.swift:40` „self.sendEvent("wygasa", ["id": biezace.rawValue])”, a w następnej linii `UIApplication.shared.endBackgroundTask(biezace)`.
- Flaga jest sprawdzana dopiero przy następnej instrukcji JS: `packages/postep/src/port.ts:65` „if (flaga.przerwij) throw new PrzerwanoWTle();”.
- Dla id −1 port nie ma żadnego źródła przerwania: `packages/postep/src/port.ts:58` „operacja bez ochrony, przerwanie przy przejściu do tła należy do warstwy aplikacji”.
- Tej warstwy w kodzie nie ma. `AppState` występuje tylko w 2 komentarzach, a wywołań jest 0 (`dowody/g4-dane-b-bezpieczenstwo-arch002.txt`). ADR wymaga tego wprost: `docs/adr/0013-ochrona-dlugich-operacji-przed-zawieszeniem.md:32` „Port bazy przy `AppState` → `background` nie przyjmuje nowych zadań długich i kończy kolejkę.”
- Komunikat po powrocie też nie jest wdrożony: `docs/architektura/tlo-i-bledy.md:64` „po powrocie komunikat „Import nie został dokończony” i ponowienie”, stan „brak”.
- Korekta drobna: cytat ze znaleziska `packages/postep/src/port.ts:61` „if (!ochrona) return praca(port);” dotyczy portu bez ochrony. Ścieżka −1 to `packages/postep/src/port.ts:79` „if (id !== -1) ochrona.zakoncz(id);”. W aplikacji ochrona jest zawsze przekazana, a brak modułu daje −1 (`apps/mobile/src/platform/ochronaTla.ts:11`). Wniosek się nie zmienia.
- Granica: dane są bezpieczne, bo przerwana transakcja zostaje wycofana przy następnym otwarciu. ADR sam przyznaje, że jednej długiej instrukcji nie da się przerwać (opcja B, „długa pojedyncza instrukcja nieprzerywalna”). Skutek `0xdead10cc` nie został potwierdzony na urządzeniu (krok U-2 właściciela).

Poziom: P2 pasuje. Rzadki wyzwalacz, dane bez utraty; tracony jest tylko import, bez komunikatu.
- Blokuje 1012: nie (testerzy wewnętrzni, brak danych użytkowników).
- Blokuje App Store: nie. App Review nie sprawdza importu z wyjściem do tła, a skutkiem jest możliwa awaria w tle bez zepsucia danych. Zalecany krok U-2 na telefonie przed App Store. Gdyby potwierdził zakończenie `0xdead10cc`, poziom trzeba ponownie ocenić jako P1 (awaria).

## 01-odkrywanie-004

Wynik: **potwierdzone jako luka dokumentu BRD; poziom P1 obalony**.
- Literalnie znalezisko jest prawdziwe. BR-DANE-001 ma 2 scenariusze (`docs/brd/wymagania-sklep.md:153`, `docs/brd/wymagania-sklep.md:157`). BR-DANE-003 ma 2 (`docs/brd/wymagania-sklep.md:188`, `docs/brd/wymagania-sklep.md:192`). BR-DANE-004 nie ma scenariusza nieudanej migracji (`docs/brd/wymagania-sklep.md:201`). Sytuacje brzegowe PR-07 (`docs/brd/wymagania.md:41`) też ich nie wymieniają.
- Scenariusze błędu są jednak określone w architekturze i sprawdzane testami:
  - `docs/architektura/tlo-i-bledy.md:67` `migracja_nieudana` „dane w wersji sprzed migracji + kopia `postep-przed-v<N>.db`”;
  - kryterium AK-NFR-DANE-001-b: `packages/postep/test/k02-migracje.test.ts:46` „migracja z danymi łamiącymi nowe CHECK → migracja_nieudana, wersja i dane bez zmian”;
  - przerwanie importu: `packages/postep/test/k10-ochrona.test.ts:61` „wygaśnięcie czasu w środku importu → przerwano_w_tle, liczności i zawartość bez zmian”;
  - błędy zapisu: `packages/postep/test/k12-bledy.test.ts:53`;
  - nieudany eksport w adapterze: `apps/mobile/src/data/przeniesienie.ts:51` łapie błąd udostępniania i zapisuje `zapis_nieudany` do dziennika.
- Brak scenariusza w BRD nie oznacza więc braku zachowania ani testu. Jedyna realna luka zachowania (przerwanie w tle bez komunikatu) to przyczyna wspólna z 05-architekt-002.
- Znalezisko jest wewnętrznie sprzeczne: „P1 (bez blokady wg CLAUDE.md pkt 1)”. Według CLAUDE.md pkt 1 WYSOKIE blokuje wydanie. Luka kryteriów akceptacji w dokumencie bez stwierdzonej utraty danych nie należy do żadnej kategorii blokującej.

Poziom po weryfikacji: P2 (NISKIE), do backlogu: dopisać scenariusze błędu do BR-DANE-001/003/004 z odwołaniem do `tlo-i-bledy.md`. Nie blokuje ani 1012, ani App Store.

## 07-jakosc-004

Wynik: **potwierdzone**, z korektą liczby.
- `pnpm/action-setup@v5` ma 15 użyć, wszystkie bez SHA. Szesnasta linia w dowodzie roli 07 to lokalny workflow `.github/workflows/nocny.yml:103` (`./.github/workflows/e2e-ios.yml`), a nie akcja zewnętrzna.
- Żadna akcja nie jest przypięta do SHA (`dowody/g4-dane-b-bezpieczenstwo-jak004.txt`).
- Kontrola projektu dopuszcza tag: `tests/narzedzia/workflowy.test.mjs:29` „akcje przypięte do wersji głównej albo SHA, workflowy lokalne przez ./”.
- Zadanie `build` w testflight.yml: `.github/workflows/testflight.yml:101` „- uses: pnpm/action-setup@v5”. Klucz ASC jest zapisywany na dysk dalej w tym samym zadaniu (`.github/workflows/testflight.yml:136`), a sekrety ASC są już w `env` kroku tuż przed akcją (`.github/workflows/testflight.yml:96`).
- `.github/workflows/przeklad-tlumaczen.yml:62` „- uses: pnpm/action-setup@v5”, a dalej sekret `ANTHROPIC_API_KEY` (`.github/workflows/przeklad-tlumaczen.yml:82`).
- Analogia z Treningiem (CLAUDE.md „Delegacja decyzji”). Publiczne `lkarwowski494/trening` 2d97581, odczyt 2026-11-17, ten sam dowód: Trening nie używa żadnej akcji spoza `actions/*` bez SHA, a jedyną zewnętrzną przypina do SHA (`apps4brew-narzedzia/...@43afe81…`). Szkoła odstępuje więc od wzorca bez nazwanego powodu; nie ma decyzji w `docs/decyzje.md`, która by to przyjmowała (D-190 opisuje tylko kontrolę „przypięte akcje”).
- Kontekst: to samo zadanie i tak uruchamia `pnpm install`, `npx expo prebuild` i `pod install`, czyli powierzchnia łańcucha dostaw jest szersza niż ta jedna akcja.

Poziom: P2 pasuje. Ryzyko teoretyczne, wymaga przejęcia repozytorium `pnpm/action-setup` albo tagu `v5`. Bezpieczeństwo i sekrety należą do kategorii blokujących, ale bez stwierdzonej podatności lub wycieku to ŚREDNIE.
- Blokuje 1012: nie.
- Blokuje App Store: nie. Naprawa (przypięcie do SHA i zawężenie testu `workflowy.test.mjs` do SHA dla akcji spoza `actions/*`, jak Trening) jest tania i warto ją zrobić przed upublicznieniem.
