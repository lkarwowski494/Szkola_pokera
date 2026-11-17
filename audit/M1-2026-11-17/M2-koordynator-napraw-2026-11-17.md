# Naprawy M2 — Szkoła Pokera — 2026-11-17
Pętla 1 · Audyt f75acdff16915aeb43ff788888216e28616c11ed · Baza 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Gałąź: `claude/sesja-is-naprawy-p1` (partia 1: 0e7e5e00 → 7b591503; nazwa narzucona przez środowisko zamiast `naprawy/M2-koordynator-napraw-2026-11-17-p1`)
Sesja IS; prompt roli: assemble.mjs M2-koordynator-napraw --tryb fix (prompts @ af4c0a83), sha256 d16a6289c4539fc2c3f20ce30b0ae77c49f48680ef93b34ba3cc560ae5d2486c.

## Podsumowanie
- Naprawione do weryfikacji: 4 z 4 zadań partii 1 (002, 007, 047, 061) oraz znalezisko M2-koordynator-napraw-001 (dodane przez koordynatora, KO-129, P1). Zablokowane: 0. Przekazane roli: 2 (002 → 06-tresci, M2-001 → 08-programista; subagenci w świeżym kontekście).
- Partie 2–4: nietknięte (status `otwarte`, zamrożenie zakresu).
- Dla właściciela: weto D-2010…D-2014 (`docs/decyzje/IS.md`); decyzja o nowych znaleziskach (niżej); scalenie po reaudycie.
- Dla koordynatora: wpis D-2011…D-2014 do rejestru Drive (dokumenty 12/13); opcja (b) 06-tresci-501 (siatki BB z opublikowanego rozwiązania, licencja do sprawdzenia) do backlogu.

## Zadania
| ID | Rodzaj | Wykonawca | Test (nazwa) | Przed → po | Commit | Dowód | Status |
|---|---|---|---|---|---|---|---|
| M1-audytor-generalny-007 (06-tresci-001) | D | M2 | `tests/narzedzia/wyciagi-zrodel.test.mjs` | kod 1 (22 pary plik–adres > 250 znaków) → kod 0 (3/3); test:skrypty 232/232 | 3f1fe76d | dowody/M2/M1-audytor-generalny-007-przed.txt, dowody/M2/M1-audytor-generalny-007-po.txt, dowody/M2/M1-audytor-generalny-007-test-skrypty.txt | naprawione-do-weryfikacji |
| M1-audytor-generalny-047 (07-jakosc-004) | D | M2 | `tests/narzedzia/workflowy.test.mjs` „akcje actions/* … pozostałe do pełnego SHA” | kod 1 (pnpm/action-setup@v5) → 31/31 | 5abf3534 | dowody/M2/M1-audytor-generalny-047-przed.txt, dowody/M2/M1-audytor-generalny-047-po.txt, dowody/M2/przeglad-d043-047-061.md | naprawione-do-weryfikacji |
| M1-audytor-generalny-061 (10-wydanie-007) | D | M2 | `tests/narzedzia/gitignore-sekrety.test.mjs` | kod 1 (27 ścieżek nieignorowanych) → 2/2; test:skrypty 234/234 | c9a7c332 | dowody/M2/M1-audytor-generalny-061-przed.txt, dowody/M2/M1-audytor-generalny-061-po.txt, dowody/M2/M1-audytor-generalny-061-test-skrypty.txt | naprawione-do-weryfikacji |
| M1-audytor-generalny-002 (06-tresci-501) | M | rola 06 | `tools/content-build/test/is-siatki-niepewne.test.ts` | kod 1 (4 z 9) → kod 0 (9/9); siatki-niepewne.py 58 rąk → 0 | a2da1175 | role/06-tresci/fix-2026-11-17/ (wynik.md, recenzja-niezalezna.md, przeglad-d043-wynik.md) | naprawione-do-weryfikacji |
| M2-koordynator-napraw-001 (06-tresci-502) | D (po KO-129) | rola 08 | `apps/mobile/src/components/__tests__/RangeGrid-uncertain.test.tsx` | kod 1 (0 kropek zamiast n) → 5/5; mobile 1787 kod 0; typecheck 0 | 1d756b0b | role/08-programista/fix-2026-11-17/ (wynik.md, recenzja-niezalezna.md) | naprawione-do-weryfikacji |

Szczegóły:
- 007: skrócone 5 plików (`docs/tresci/odczyty/dv-krok-e-2026-11-11.txt`, `docs/tresci/odczyty/co-gtow-flop-heuristics-ip-2026-11-11.txt`, `docs/tresci/dowody/cw-zrodlo-gtow-flop-heuristics-ip.txt`, `docs/tresci/recenzje/dowody/cq-ad62a2d-zrodlo-gtow-flop-heuristics-ip.txt`, `docs/tresci/recenzje/dowody/cw-0ef7785-zrodlo-gtow-flop-heuristics-ip.txt`) do cytatów, na które powołują się dokumenty; brzmienie i numery wierszy źródła bez zmian; SHA-256 pliku przed skróceniem w nagłówku. Miara: D-2010. Kontrole `tresci:rejestr` i `tresci:el-kontrola`: kod 0. Historia git nadal zawiera pełne wyciągi (bez przepisywania, zgoda właściciela przez koordynatora).
- 047: 15 użyć przypiętych do fc06bc1257f339d1d5d8b3a19a8cae5388b55320 (`# v5.0.0`; `git ls-remote` 2026-11-17: refs/tags/v5^{} = refs/tags/v5.0.0^{}); analogia: Trening, plik .github/workflows/asc-kontrola.yml wiersz 21 (D-191).
- 061: `.gitignore` + `.env*`, `*.p8`, `*.p12`, `*.jks`, `*.keystore`, `*.mobileprovision`, `*.cer`, `*.pem`, `*.key`, `credentials.json` (jak Trening); test na katalogu głównym, `apps/mobile/`, `packages/postep/`; drugi test: żaden śledzony plik nie ma takiej nazwy.
- M2-001: `apps/mobile/src/components/RangeGrid.tsx` rysuje „•” w polach klas `uncertain` i legendę `paint.legendMixed` przy niepustym `uncertain` — to samo oznaczenie co `apps/mobile/src/components/PaintGrid.tsx`; bez nowych kolorów, komponentów, tekstów; D-2015. Test na bazie treści pl: 34 siatki, 25 z `uncertain`, 4 BB.
- 002: `uncertain` w `vs-open.bb-vs-btn` (16 klas) i `vs-open.bb-vs-sb` (13 klas), 9-max przez aliasy YAML; pole w 11 nakładkach językowych; zdanie `content/pl/lessons/m4-l2-obrona-bb.md:73` bez „w siatce” (+ 11 przekładów); `docs/tresci/porownanie-siatek.json` (listy klas, skrót kanonu, adres, cytat, data; bez tabel źródła); decyzje D-2011…D-2014.

## Zablokowane
Brak.

## Sesje ról
| Rola | Polecenie | Wynik | Kontrola dowodów |
|---|---|---|---|
| 06-tresci (fix, subagent opus/high, świeży kontekst) | naprawy/polecenia/06-tresci-p1.md; prompt 06 fix sha256 3baf0c31924e5f673e56126e2f2abf716ac42f53ae05457b3eb9d6842492e436 | role/06-tresci/fix-2026-11-17/wynik.md; commit a2da1175 | sprawdz-raport.mjs wynik.md: kod 0 (dowody/M2/kontrola-wynik-06.txt) |
| recenzent niezależny (subagent, bez uzasadnień autora) | rachunek i źródła 002 | role/06-tresci/fix-2026-11-17/recenzja-niezalezna.md: źródła odczytane 2026-11-17 14:27 UTC; listy 16/13 klas dokładnie zgodne (bez braków i nadmiaru); btn-vs-co 20 i sb-vs-btn 11 zgodne; mutacje testu: 3 z 4 czerwone | — |
| przegląd D-043 (subagent) | diff 0e7e5e00..c9a7c332 (CI, .gitignore) | dowody/M2/przeglad-d043-047-061.md: brak uwag P0/P1 | — |
| przegląd D-043 (subagent) | diff 5a12a2ad..a2da1175 (content-build, baza treści) | role/06-tresci/fix-2026-11-17/przeglad-d043-wynik.md: brak uwag P0/P1; schemat i klucze baz bez zmian, bez migracji | — |

| 08-programista (fix, subagent sonnet/medium, świeży kontekst) | naprawy/polecenia/08-programista-p1.md; prompt 08 fix sha256 0c9d2a7bce40495058ce910e133bcd0dc647ecb17cecf275e83df559b1b83b1f | role/08-programista/fix-2026-11-17/wynik.md; commit 1d756b0b | sprawdz-raport wynik.md kod 0 po doprecyzowaniu ścieżki (dowody/M2/kontrola-wynik-08.txt) |
| recenzent niezależny M2-001 (subagent) | kod, test, mutacje | role/08-programista/fix-2026-11-17/recenzja-niezalezna.md: zgodne z PaintGrid; jedyny renderer siatki w lekcjach; mutacje a–d2 wszystkie złapane; 34/25/4 zgodne z yaml; brak P0/P1 | — |

Przekazania z wyniku roli 06: do 08 — brak (tryb gry M13 i generator już pomijają `uncertain`); do 07 — propozycja E2E malowania BB (T2s zaliczona w obie strony), poza partią 1, w nowych znaleziskach; do 09 — przegląd 11 przekładów zdania m4-l2:73 (D-2014), poza partią 1.

## Nowe znaleziska
### M2-koordynator-napraw-001 · Siatka w lekcji M4.l2 pokazuje bez oznaczenia ręce sporne wobec solvera, które zadania już przestały oceniać
- Pozycja listy kontrolnej: TRE-08 (06-tresci); wygląd siatki: rola 04
- Poziom: P1 (recenzent niezależny) / P2 (rola 06 jako 06-tresci-502) — poziom rozstrzyga M1 w reaudycie
- Realność: realny · Pewność: wysoka
- Rodzaj: P (sposób oznaczenia w siatce: wygląd, rola 04) albo D dla 08 po decyzji
- Dowód: recenzja-niezalezna.md pkt 5: siatka pod zdaniem `content/pl/lessons/m4-l2-obrona-bb.md:73` pokazuje 74s 18%, 63s 15%, 32s 0%, a 75o 98%, K7o i Q8o 100% (komponent siatki lekcji nie czyta `uncertain`, w odróżnieniu od siatki malowania).
- Mechanizm: siatka lekcji rysuje kanon bez klas niepewnych; problem istniał przed a2da1175.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md „Nie wolno uczyć zasady sprzecznej ze szczeblami 1–2”; https://beyondgto.com/defense/bb-vs-btn (odczyt 2026-11-17).
- Kroki w aplikacji: Lekcje → M4 „Obrona dużego blinda” → siatka pod akapitem o rękach w kolorze.
- Lista kontrolna telefonu (po naprawie): M4.l2, siatka BB vs BTN — „•” m.in. przy T2s, K7o, Q8o, 75o, J3s, 74s, 63s i „• mieszana” pod siatką; siatka spotu bez `uncertain` — bez kropek i legendy; czytelność kropki na 320 pt i przy dużej czcionce.
- Opcje: (a) oznaczenie klas `uncertain` w siatce lekcji tak jak w malowaniu (rola 04 projekt, 08 kod) — spójne z ćwiczeniem; (b) dopisek pod siatką „ręce oznaczone … solvery grają różnie” bez zmiany komponentu — tańsze, słabsze wizualnie; Rekomendacja: (a).
- Test akceptacyjny: siatka lekcji dla spotu z `uncertain` oznacza te klasy (test komponentu + zrzut 390 pt).
- Rozstrzygnięcie: koordynator KO-129 (2026-11-17): P1, wariant (a); (b) odrzucony.
- Status: naprawione-do-weryfikacji (1d756b0b, rola 08; zrzut nie wykonany: `pnpm zrzuty:web` nie ma ekranu lekcji — krok telefonu niżej)

### M2-koordynator-napraw-002 · Test klas niepewnych nie wykrywa nadmiarowej klasy w `uncertain`
- Pozycja listy kontrolnej: JAK-03 (07-jakosc)
- Poziom: P2 · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: recenzja-niezalezna.md pkt 6: mutacja „AA w uncertain” — test zielony (sprawdzenie podzbioru, `tools/content-build/test/is-siatki-niepewne.test.ts:45`).
- Mechanizm: asercja „każda klasa ≥ 50 pp jest w uncertain” bez warunku odwrotnego.
- Opcje: (a) równość zbiorów dla spotów z tabelą odniesienia; (b) zostawić (nadmiar tylko wyłącza ocenę ręki). Rekomendacja: (a).
- Test akceptacyjny: mutacja „AA w uncertain” daje test czerwony.
- Status: otwarte — backlog, po 1012 (koordynator 2026-11-17)

### M2-koordynator-napraw-003 · Akcje przypięte do SHA nie mają mechanizmu aktualizacji
- Pozycja listy kontrolnej: JAK-10 (07-jakosc)
- Poziom: P2 · Realność: brzegowy · Pewność: wysoka · Rodzaj: P
- Dowód: `ls .github` → tylko `workflows` (brak `dependabot.yml`); 15 użyć `pnpm/action-setup@fc06bc12…`.
- Mechanizm: SHA nie przesuwa się sam, więc poprawki bezpieczeństwa akcji wymagają ręcznej zmiany.
- Opcje: (a) `dependabot.yml` dla `github-actions` (darmowe, PR-y do przeglądu); (b) ręczny przegląd przy każdym audycie. Rekomendacja: (a) po sprawdzeniu, jak robi to Trening (D-191).
- Test akceptacyjny: plik konfiguracji aktualizacji akcji albo zapis decyzji (b).
- Status: otwarte — backlog, po 1012 (koordynator 2026-11-17)

### M2-koordynator-napraw-004 · Czytnik ekranu nie dostaje informacji o klasach niepewnych w siatce lekcji
- Pozycja listy kontrolnej: DOS (rola 04, dostępność)
- Poziom: P2 · Realność: realny · Pewność: wysoka · Rodzaj: P (nowy tekst: rola 04/09)
- Dowód: `apps/mobile/src/components/RangeGrid.tsx:20` jedna etykieta zbiorcza `range.label` (tytuł, procent rąk) scala poddrzewo; kropki i legenda niedostępne dla czytnika (stan sprzed 1d756b0b: siatka nigdy nie była czytana pole po polu); recenzja-niezalezna.md roli 08, pkt 5.
- Opcje: (a) dopisać do etykiety listę klas niepewnych nowym kluczem (propozycja roli 08: `range.uncertain` „Klasy mieszane (bez pewnej akcji): {{hands}}.”, 12 języków UI); (b) zostawić (siatka i tak nie jest dostępna pole po polu). Rekomendacja: (a).
- Test akceptacyjny: etykieta dostępności siatki spotu z `uncertain` wymienia te klasy.
- Status: otwarte — backlog

### M2-koordynator-napraw-005 · Test siatki lekcji na danych porównuje liczbę kropek, nie ich położenie
- Pozycja listy kontrolnej: JAK-03 (07-jakosc)
- Poziom: P2 · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: recenzja-niezalezna.md roli 08, pkt 3 i 4 (położenie sprawdza tylko syntetyczny przypadek T2s; mutacja przesuwająca kropkę złapana tylko tam).
- Opcje: (a) w teście na danych sprawdzać zbiór klas z kropką = `uncertain`; (b) zostawić. Rekomendacja: (a).
- Status: otwarte — backlog

Ryzyko szczątkowe 002 (bez znaleziska): T8o w BB vs BTN różni się o 49 pp, tuż pod progiem (recenzja-niezalezna.md); nowy odczyt źródła może ją przenieść; test wymusi wtedy ponowne porównanie tylko przy zmianie kanonu, nie źródła.

## Komendy końcowe
`env -u NODE_PATH pnpm run ci` na 7b591503 (typecheck, test, test:skrypty, test:kontrole, k08, i18n:kod, content:check, tresci:rejestr, tresci:el-kontrola; po kolei w jednym łańcuchu): **kod 0** (dowody/M2/ci-koniec-7b591503.log). Projekt nie ma osobnej komendy lint (package.json); typecheck w łańcuchu ci.

| Część | Stan wyjściowy (IR, f75acdff, wspolne/ci-pelne.log) | Koniec (7b591503) |
|---|---|---|
| packages/srs, jezyki, poker-core, domena, postep; tools/preflop-solver | 21, 144, 350, 347 (+1 expected fail), 160, 44 | bez zmian |
| tools/content-build | 927 (+1 expected fail) | 936 (+1 expected fail): +9 testów is-siatki-niepewne |
| apps/mobile | 1782 | 1782 (7b591503); 1787 (5f34458a: +5 RangeGrid-uncertain) |
| test:skrypty | 229 | 234: +3 wyciagi-zrodel, +2 gitignore-sekrety |
| test:kontrole | 35 | 35 |
| content:check | 35 baz, 44 lekcji, 146 reguł, 162 terminów | bez zmian |

Po M2-001: `env -u NODE_PATH pnpm run ci` na 5f34458a (zmiany kodu do 1d756b0b): **kod 0** (dowody/M2/ci-koniec-5f34458a.log); pozostałe części jak w tabeli.

Wynik nie gorszy od stanu wyjściowego; 0 testów usuniętych, wyłączonych albo osłabionych (jeden zaostrzony: workflowy.test.mjs).

## Lista kontrolna KOO
| ID | Wynik | Dowód |
|---|---|---|
| KOO-01 | spełnione: sprawdz-plan kod 0 na starcie i na końcu; zakres-napraw partia:1 kod 0, 4 zadania, bez P bez wyboru | dowody/M2/sprawdz-plan-start.txt, dowody/M2/zakres.txt, dowody/M2/sprawdz-plan-koniec.txt |
| KOO-02 | spełnione z wyjątkiem nazwanym: drzewo czyste, commit audytu istnieje, od audytu tylko docs/decyzje/IR.md i K; K śledzony w git decyzją IR (docs/decyzje/IR.md, D-1990…), narzędzia M2 w .git/info/exclude | postep-napraw.md „E0” |
| KOO-03 | spełnione: zgoda „zgoda na prompts”, „Zgodnie z rekomendacja” (IS) i „a: plan jak wyżej (zalecane)” (przez koordynatora); bez działań zewnętrznych | postep-napraw.md „Zgody” |
| KOO-04 | spełnione: każde D czerwone przed (właściwy powód: asercja o treści/workflowach/ignore) i zielone po; testy nie osłabione (workflowy.test zaostrzony) | pliki -przed/-po w dowody/M2 |
| KOO-05 | spełnione: 4 commity fix, każdy z jednym ID planu i ID źródłowym; commity stanu K osobno; `git diff --cached` przejrzany | `git log --format='%h %s' 0e7e5e00..HEAD` |
| KOO-06 | spełnione: zmienione pliki = pliki zadań (docs/tresci, tests/narzedzia, package.json, .github/workflows, .gitignore, content/ ranges+lekcja m4-l2, tools/content-build/test, wygenerowane bazy treści, docs/decyzje/IS.md; M2-001: apps/mobile/src/components/RangeGrid.tsx i jego test, zadanie dodane przez koordynatora KO-129); pozostałe problemy po drodze tylko jako znaleziska | `git diff --stat 0e7e5e00..HEAD` |
| KOO-07 | nie dotyczy: brak zmian danych użytkownika; przegląd D-043 potwierdził brak zmiany schematu baz | role/06-tresci/fix-2026-11-17/przeglad-d043-wynik.md |
| KOO-08 | spełnione: 002 (M) wykonała rola 06, M2-001 rola 08 (odstępstwo nazwane od wskazania koordynatora: kod aplikacji należy do 08, D-2015), obie w świeżym kontekście z poleceniem samowystarczalnym; commit z ID; sprawdz-raport wynik.md kod 0; przekazań do 08 brak | naprawy/polecenia/06-tresci-p1.md, dowody/M2/kontrola-wynik-06.txt |
| KOO-09 | spełnione: przeczytane 08 rdzen „Zasady programisty”, 06/07/10 rdzen „Tryb: fix”; wartości dziedzinowe tylko z wyniku roli 06 | postep-napraw.md tabela zadań |
| KOO-10 | brak konfliktów | postep-napraw.md „Dziennik” |
| KOO-11 | spełnione: postęp aktualizowany po każdym zadaniu, zgodny z `git log --grep` | postep-napraw.md |
| KOO-12 | spełnione: tylko `naprawione-do-weryfikacji` z commitem (skryptem --ustaw); zmiana planu ograniczona do status/commit (porównanie semantyczne) | dowody/M2/sprawdz-plan-koniec.txt |
| KOO-13 | spełnione: pełne pnpm run ci kod 0 na gałęzi partii, porównanie ze stanem wyjściowym w „Komendy końcowe”; brak komendy lint w projekcie; sprawdz-raport tego raportu kod 0 | dowody/M2/ci-koniec-7b591503.log |
| KOO-14 | spełnione: przekazanie niżej; pętla 1 | sekcja „Przekazanie” |

## Kontrola dowodów i sekretów
`node K/narzedzia/sprawdz-raport.mjs K/M2-koordynator-napraw-2026-11-17.md /home/user/Szkola_pokera K` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone”, kod 0 (dowody/M2/kontrola-raport-m2.txt). Wynik roli 06: kod 0 (dowody/M2/kontrola-wynik-06.txt).

## Plan (sprawdz-plan.mjs)
`OK: 66 zadań, 13 decyzji (0 bez wyboru)`, kod 0 (dowody/M2/sprawdz-plan-koniec.txt). Partia 1: 002, 007, 047, 061 → naprawione-do-weryfikacji.

## Przekazanie
### Przekazanie do M1 (reaudit)
- Zakończono: M2 fix, pętla 1; gałąź `claude/sesja-is-naprawy-p1` (ostatnia zmiana kodu 1d756b0b, pełne ci na 5f34458a kod 0; commit tego raportu jest następny na gałęzi), baza 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee; raport K/M2-koordynator-napraw-2026-11-17.md
- Nowa sesja (D-015: sprawdzający nie zna moich uzasadnień), w repo na gałęzi `claude/sesja-is-naprawy-p1`:
  `node <prompts>/tools/assemble.mjs M1-audytor-generalny --tryb reaudit --wyjscie /home/user/Szkola_pokera/audit/M1-2026-11-17 --baza 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee`
- Paczka wejściowa: K/plan-napraw.json (statusy), ten raport, K/naprawy/, K/role/06-tresci/fix-2026-11-17/, K/role/08-programista/fix-2026-11-17/
- Otwarte: brak zablokowanych; M2-koordynator-napraw-001 naprawione-do-weryfikacji; M2-002…005 backlog (002, 003: po 1012); decyzje dla właściciela: weto D-2010…D-2014; scalenie z main: po reaudycie (rekomendacja)
