# Audyt: Programista — Szkoła Pokera — 2026-11-11 (recenzja DO kodu DN)
Commit: 370a1548 (zakres `709f6947..370a1548`, 6 commitów: e83ee04c, e9e68d31, ac071adc, 4005a7f4, b4297223, 370a1548) · Tryb: audit (recenzja niezależna D-043, sesja DO) · Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0; `pnpm install --frozen-lockfile`, `pnpm run ci`, `pnpm content:build`, jest i vitest działają; bez iOS/Xcode (ekranu na urządzeniu ani przepełnienia AX5 nie oglądano). Sondy i mutanty w osobnym worktree w scratchpadzie, pliki śledzone nietknięte.

## Podsumowanie
Werdykt: **PRZYJĄĆ** (0 × KRYT, 0 × WYS, 2 × ŚR, 4 × NIS; ŚR i NIS do backlogu według progu wydania z `CLAUDE.md`). Rachunek D-890 jest poprawny: wyprowadziłem go niezależnie i sprawdziłem tym samym kodem ICM co generator przy wypłacie „zwycięzca bierze wszystko” (próg ICM = (S − b) ÷ (2S) do 1e-9 dla czterech układów stosów), a 1200 wariantów icm-call nie ma ani jednego przypadku progu ICM poniżej progu w żetonach, równych progów po zaokrągleniu ani `na10` poza 2–9. Kryteria akceptacji D-888 i D-890 mają testy; 9 z 12 mutantów pada. Trzy mutanty przeżyły: wybór zdania nadkart przy poprawnym sprawdzeniu (001), gałąź „all-in na flopie, dwie karty” (002, dziś nieosiągalna w treści) i zaokrąglenie `na10` (003); dla 001 i 003 test odtwarzający jest gotowy i zabija mutanty. `pnpm run ci` kod 0, `pnpm content:build` bez zmian w plikach śledzonych. Odstępstwo D-966 (znaczniki T-01) uważam za wymagane przez regułę projektu, z potwierdzeniem roli 04 jako formalnością (005).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P2) | D | Wybór zdania nadkart (pas / sprawdzenie) bez testu: mutant „zawsze overcardsFold” przeżywa, a pokazałby fałszywe zdanie przy poprawnym sprawdzeniu | otwarte |
| 08-programista-002 | ŚR (P2) | D | Gałąź „all-in rywala na flopie: dwie karty” w `trafiszRazem` bez testu; dziś żaden szablon `content/pl` jej nie używa | otwarte |
| 08-programista-003 | NIS (P2) | D | Test `na10` sprawdza 3 ziarna, przy których część ułamkowa < 0,5: mutant `Math.floor` przeżywa | otwarte |
| 08-programista-004 | NIS (P2) | D | Zmiana `requiredChips` zmienia odcisk planu rozdania icm-call w toku (nie wznowi się); `GENERATOR_WERSJA` bez podniesienia, komentarz wersji mówi o każdej zmianie wyniku | otwarte |
| 08-programista-005 | NIS (P2) | P | D-966: tekst pl siedmiu zdań różni się od dokumentu projektu nawiasami terminów (T-01); potrzebne potwierdzenie roli 04 | otwarte |
| 08-programista-006 | NIS (P2) | D | Kwota limpu w zdaniu liczona osobno od `kwotaAkcji` (kryterium 5: „ta sama funkcja kwoty”) | otwarte |

## Linia bazowa i założenia
Linię bazową ustaliłem z wymagań (`docs/decyzje/DA.md` D-886…D-890, `docs/design/scenariusz-akcje-i-liczby.md` §3 z kryteriami akceptacji dla 08) i z kodu, przed przeczytaniem uzasadnień DN w `docs/decyzje/DN.md`; `docs/programista/stan-dn.md` i transkryptu DN nie czytałem (polecenie DO, pkt 3).

Wzorzec: każda liczba w zdaniu „Liczby” jest rachunkiem z wariantu i `numbers.yaml` (szczebel 1 ADR-24), wyrażonym tą samą funkcją co kwoty na przyciskach; każda gałąź wyboru zdania ma test, który pada, gdy wybór się odwróci; zmiana pola wariantu jest oceniona pod kątem zapisanych odcisków.

Niezależne wyprowadzenie D-890 (rachunek, szczebel 1):
- Gracz w BB wpłacił blind b, stos efektywny S (blind wliczony), rywal SB wchodzi all-in, martwych blindów brak (generator odrzuca inne pary, `packages/poker-core/src/scenario-gen.ts:462-463`).
- Względem stanu sprzed rozdania: pas daje −b; sprawdzenie daje +S z prawdopodobieństwem e i −S z prawdopodobieństwem 1 − e, czyli (2e − 1)S.
- Sprawdzenie opłaca się, gdy (2e − 1)S ≥ −b, czyli e ≥ (S − b) ÷ (2S). Z martwymi pieniędzmi D byłoby (S − b) ÷ (2S + D); generator dopuszcza tylko D = 0, więc wzór w `packages/poker-core/src/scenario-gen.ts:485` jest pełny.
- Przykład: S = 10 bb, b = 1 bb → 9 ÷ 20 = 45%; S = 15 bb → 14 ÷ 30 ≈ 46,7%; dawne 0,5 odpowiada b = 0.
- Kontrola krzyżowa: przy wypłacie „zwycięzca bierze wszystko” ICM równa się udziałowi w żetonach, więc próg ICM z tego samego kodu (`equityAfter`, wzór `required`) musi dać (S − b) ÷ (2S). Wynik: 4/4 układy stosów równe do 1e-9 (`dowody/do-sonda-d890.txt`, źródło w `dowody/do-sonda-zrodla.txt`).
- `chipsDiffer` z progiem 0,5 (`packages/poker-core/src/scenario-gen.ts:482`): wariant trudny ma equity ≥ 50%, więc także ≥ 45%; odpowiedź w żetonach się nie zmienia. Próg 0,5 odrzuca warianty z equity 45–50%, które przy nowym progu też różniłyby się od ICM; to zawężenie puli, nie błąd treści (D-969).

Wymiary pokrycia:
- Ścieżki zapisu: zmiana nie dotyka zapisu; wpływ pola `requiredChips` na odcisk planu: 004.
- Obsługa błędów: brak rozmiarów c-betu w bazie daje brak zdania, bez zgadywanych wartości (`apps/mobile/src/data/content/repo.ts:306-308`); sprawdzone, brak znalezisk.
- Typy na granicach: rozmiary c-betu czytane istniejącym parserem `liczba(...)` z repo; testy używają `as unknown as` tylko w fiksturach. Sprawdzone, brak.
- System projektowy: nowe zdania w istniejącym `Rozwijany` i stylu `styl.tresc`; sprawdzone, brak.
- i18n: siedem kluczy w 12 słownikach, 10 jako kopie en (D-967, dług do roli 09); liczby mnogie ominięte szykiem zdań (sprawdzone na wydruku pl/en, `dowody/do-sonda-icm-teksty.txt`).
- Wydajność: `zdaniaLiczb` liczone raz na render oceny; sprawdzone, brak.
- Testy na właściwym poziomie: rachunek w Node (vitest), zdania i ekran w jest z prawdziwą bazą treści pl; luki 001–003.
- Dostępność: wiersz „Liczby” bez zmian w komponencie; przepełnienie przy AX5 nie sprawdzone (brak symulatora).
- Liczby konfiguracyjne: rozmiary c-betu z `numbers.yaml`; blindy z `blindBb` (stan sprzed DN); 006.

Soczewki: recenzent szukający ścieżki bez testu (001, 002, 003 przez mutanty), użytkownik z rozdaniem przerwanym w połowie (004), programista czytający moduł pierwszy raz (komentarz wersji generatora, 004). Zmian w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/features/scenariusz/liczby.ts` (nowy, cały) | tak | czytanie, 10 mutantów (`dowody/do-mutanty.txt`), sonda tekstów (`dowody/do-sonda-icm-teksty.txt`) |
| `packages/poker-core/src/scenario-gen.ts` (diff: `overcardOuts`, `requiredChips`, `cbetSizes`) | tak | czytanie, mutanty M1, M2, M6, sonda 1200 wariantów icm-call, sonda D-890 |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx`, `aktywnoscScenariusza.ts`, `src/data/content/repo.ts` (diff) | tak | czytanie; wznowienie i odcisk: 004 |
| Testy DN: `dn-liczby-d888.test.tsx`, `nadkarty-dn.test.ts`, `dn-prog-zetony-d890.test.ts`, zmiana `ekran-cn.test.tsx` | tak | czytanie, `git show` zmian testów (brak osłabień), mutanty |
| Słowniki pl i en (`scenario.numbers.*`), `pl.kontekst.json` | tak | porównanie z §3 dokumentu projektu, wydruk po podstawieniu |
| Słowniki de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant | częściowo | tylko obecność kluczy (D-967); treści nie oceniano (rola 09) |
| `docs/decyzje/DN.md` D-965…D-969 | tak | ocena po linii bazowej |
| Pełny zestaw | tak | `pnpm run ci` kod 0 (`dowody/do-ci-370a1548.txt`), `pnpm content:build` bez zmian (`dowody/do-content-build.txt`) |
| Ekran na urządzeniu, AX5 na 320 pt (kryterium 6 nazw akcji) | nie | brak macOS/Xcode; poza zakresem D-888 i D-890 |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-dn-370a1548.md . --rola 08-programista` (kopia skryptu w scratchpadzie):

```
OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista
```

Pliki dowodów przejrzane wzorcami sekretów (AKIA, ghp_, github_pat_, sk-, AIza, klucz prywatny): 0 trafień.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (rachunek „Liczb”, `overcardOuts`, `requiredChips`) | kryteria 1–5 mają testy; luki: 001, 002, 003 |
| DEV-02 | dotyczy | 3/3 commity zmieniające zachowanie z testem w tym samym albo wcześniejszym commicie: e9e68d31 (test czerwony) → ac071adc; 4005a7f4 (test + kod); b4297223 (teksty + test) |
| DEV-03 | dotyczy | ok: `ekran-cn.test.tsx` zmienia asercję z braku na obecność „Liczb” zgodnie ze specyfikacją (D-968); b4297223 dopisuje „(pot)” do oczekiwań, bez luzowania |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0; mobile 1019/1019, poker-core 184/184, content-build 480 + 1 oczekiwany błąd |
| DEV-05 | nie dotyczy | zakres bez zapisu do bazy |
| DEV-06 | nie dotyczy | bez migracji i kopii; wpływ na odcisk planu w 004 |
| DEV-07 | dotyczy | ok: brak rozmiarów c-betu = brak zdania (`apps/mobile/src/data/content/repo.ts:308`), brak pozycji = brak zdania size-spot |
| DEV-08 | nie dotyczy | bez dat i odliczania |
| DEV-09 | dotyczy | ok: dane z bazy przez istniejący parser `liczba`; rzutowania tylko w testach |
| DEV-10 | dotyczy | ok: brak pustych `catch` w diffie poza testem (pętla ziaren, celowo) |
| DEV-11 | dotyczy | ok: `styl.tresc`, `tk.ink`, komponent `Rozwijany` |
| DEV-12 | dotyczy | ok dla pl/en; 10 słowników jako kopie en: rozstrzygnięte decyzją D-967 (dług do roli 09); teksty pl vs dokument: 005 |
| DEV-13 | dotyczy | 006 (kwota limpu poza `kwotaAkcji`); `ICM_CHIPS_REQUIRED` 0,5 obok wzoru z blindem nazwany w D-969 |
| DEV-14 | dotyczy | ok: brak sekretów w diffie i plikach dowodów |
| DEV-15 | nie dotyczy | bez nasłuchów i timerów |
| DEV-16 | dotyczy | ok: procenty jako ułamki formatowane `formatujProcent`, kwoty w bb przez `formatujLiczbe` |

## Znaleziska (szczegóły)

### 08-programista-001 · Wybór zdania nadkart (pas / sprawdzenie) bez testu: odwrócenie wyboru pokazałoby fałszywe zdanie
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR (P2)
- Realność: teoretyczny (kod dziś poprawny; luka w teście)   · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/liczby.ts:43` wybiera `overcardsCall` przy `correct = call`; test `apps/mobile/src/features/scenariusz/__tests__/dn-liczby-d888.test.tsx:123` sprawdza treść drugiego zdania tylko przy `correct = fold`. Mutant M7 (usunięta linia 43, czyli zawsze `overcardsFold`) przeżywa cały plik testu (`dowody/do-mutanty.txt`). Z mutantem przy poprawnym sprawdzeniu ekran mówi «trafisz … wciąż rzadziej, niż wymaga cena», co przeczy ocenie.
- Mechanizm: wybór zdania zależny od `correct` sprawdzony tylko w jednej gałęzi; `grep -n "correct ===" apps/mobile/src/features/scenariusz/liczby.ts` → 1 trafienie (linia 43).
- Powraca: nie
- Wzorzec lub źródło: `docs/design/scenariusz-akcje-i-liczby.md` §3, parametry nadkart: wybór zdania `correct = fold` → `overcardsFold`, `correct = call` → `overcardsCall`.
- Kroki w aplikacji: draw-call z kartą wyższą od stołu i poprawnym sprawdzeniem → ocena → „Liczby”.
- Opcje: (a) dopisać do pętli testu asercję treści przy `correct = call` (test z `dowody/do-testy-odtwarzajace.txt`, przypadek 001) — tani, sprawdza wszystkie ziarna; (b) test jednostkowy na skonstruowanym wariancie — szybszy, ale ręczna fikstura. Rekomendacja: (a).
- Test akceptacyjny: test 001 z `dowody/do-testy-odtwarzajace.txt` zielony na kodzie DN i czerwony z mutantem M7 (sprawdzone: oryginał zielony, M7 czerwony).
- Status: otwarte

### 08-programista-002 · Gałąź „all-in rywala na flopie: dwie karty” w zdaniu nadkart bez testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR (P2)
- Realność: brzegowy (żaden szablon `content/pl/scenarios` nie ma `villain: all-in`; gałąź ożyje z szablonami F5)   · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/liczby.ts:46-47` liczy `trafiszRazem` na dwie karty przy all-inie na flopie, jak generator (`packages/poker-core/src/scenario-gen.ts:553`). Mutant M8 (zawsze jedna karta) przeżywa (`dowody/do-mutanty.txt`); przy szablonie all-in zdanie pokazałoby inną liczbę niż rachunek generatora (błędna liczba w treści po dodaniu szablonu). `grep -rn "villain" content/pl/scenarios` → tylko `villain: bet`.
- Mechanizm: rachunek dwóch kart powtórzony w ekranie zamiast wzięty z wariantu; jedno miejsce (`apps/mobile/src/features/scenariusz/liczby.ts:46`).
- Powraca: nie
- Wzorzec lub źródło: R-M2-002 (komentarz generatora `packages/poker-core/src/scenario-gen.ts:544`); kryterium 3 §3.
- Kroki w aplikacji: dziś brak (brak szablonu); po dodaniu szablonu draw-call z all-inem na flopie i nadkartą → „Liczby”.
- Opcje: (a) test na fiksturze szablonu all-in (fikstury `tools/content-build/test/fixtures` mają linię all-in) porównujący `trafiszRazem` z `hitProbability(outy + nadkarty, nieznane, 2)` — mała praca, chroni przyszłe szablony; (b) przenieść `hitZNadkartami` z dokładnymi nadkartami do wariantu — jedno źródło liczby, ale zmienia odcisk (D-965 to odrzuciło). Rekomendacja: (a).
- Test akceptacyjny: test (a) czerwony z mutantem M8, zielony na kodzie DN.
- Status: otwarte

### 08-programista-003 · Test `na10` nie odróżnia zaokrąglenia od obcięcia
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS (P2)
- Realność: teoretyczny   · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/__tests__/dn-liczby-d888.test.tsx:88` używa ziaren 1–3, a mutant M9 (`Math.floor` w `apps/mobile/src/features/scenariusz/liczby.ts:23`) przeżywa (`dowody/do-mutanty.txt`). Przy equity 0,57 zdanie mówiłoby «5 na 10» zamiast 6.
- Mechanizm: asercja na trzech ziarnach bez przypadku z częścią ułamkową ≥ 0,5.
- Powraca: nie
- Wzorzec lub źródło: §3, parametry icm: `na10 = Math.round(10 × handEquity)`.
- Kroki w aplikacji: icm-call (dziś tylko fikstury, SC-34 w szkicach).
- Opcje: (a) test 003 z `dowody/do-testy-odtwarzajace.txt` (40 ziaren na poziom, wymaga przypadku ≥ 0,5); (b) dodać jedno ziarno wybrane ręcznie — kruche przy zmianie generatora. Rekomendacja: (a).
- Test akceptacyjny: test 003 czerwony z M9, zielony na kodzie DN (sprawdzone).
- Status: otwarte

### 08-programista-004 · Nowe `requiredChips` zmienia odcisk planu rozdania icm-call w toku; wersja generatora bez zmiany
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS (P2)
- Realność: teoretyczny (aplikacja niewydana; żaden szablon `content/pl` nie ma icm-call, więc nikt nie mógł mieć takiego rozdania w toku)   · Pewność: wysoka
- Rodzaj: D
- Dowód: plan aktywności zapisuje `odciskWariantu(wariant)` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:109`), który haszuje JSON całych `points` (`apps/mobile/src/features/scenariusz/wariant.ts:123`), więc także `requiredChips`. Po ac071adc rozdanie icm-call zaczęte na starszym kodzie nie przejdzie porównania (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:69`) i zacznie się od nowa. Historia wariantów zapisuje `wariant.fingerprint` bez `requiredChips` (`packages/poker-core/src/scenario-gen.ts:589`), więc «to samo rozdanie» działa i podniesienie `GENERATOR_WERSJA` nie jest potrzebne. Komentarz `packages/poker-core/src/scenario-gen.ts:275` mówi jednak, że każda zmiana wyniku generatora wymaga podniesienia.
- Mechanizm: odcisk planu obejmuje pola pochodne (progi), nie tylko rozdanie; to samo dotyczyło D-850 i D-856 (wersje 2 i 3).
- Powraca: nie
- Wzorzec lub źródło: zasada 10 (zero utraty danych): przerwane rozdanie to utrata postępu bieżącej aktywności, nie zapisanych wyników.
- Kroki w aplikacji: rozpocząć scenariusz icm-call, zaktualizować aplikację, wrócić — rozdanie zaczyna się od nowa.
- Opcje: (a) bez zmiany kodu; dopisać w komentarzu wersji, że zmiana pól pochodnych bez zmiany rozdania nie wymaga podniesienia, a unieważnia tylko rozdania w toku — zero ryzyka, jasność dla następnych sesji; (b) podnieść `GENERATOR_WERSJA` do 4 — zgodne z literą komentarza, ale niepotrzebnie unieważnia historię „to samo rozdanie” wszystkich szablonów. Rekomendacja: (a).
- Test akceptacyjny: komentarz `GENERATOR_WERSJA` rozróżnia odcisk historii i odcisk planu.
- Status: otwarte

### 08-programista-005 · D-966: tekst pl siedmiu zdań różni się od dokumentu projektu nawiasami terminów
- Pozycja listy kontrolnej: DEV-12
- Poziom: NIS (P2)
- Realność: realny (widać na ekranie), skutek kosmetyczny   · Pewność: wysoka
- Rodzaj: P
- Dowód: wydruk pl (`dowody/do-sonda-icm-teksty.txt`): „Przy przebiciu (raise) do 3 bb duży blind (big blind, BB) dopłaca 2 bb do puli (pot) 6 bb (gdy reszta spasuje [fold])”; dokument projektu §3 nie ma znaczników przy „przebiciu”, „puli”, „spasuje”, „otwierający”, „parę”, „stole”. Słowa i szyk bez zmian; en po podstawieniu zgodne z dokumentem (różnica `{{t:icm}}` zamiast `{{t:icm|ICM}}` daje ten sam tekst „ICM”).
- Mechanizm: dokument projektu stosuje znaczniki T-01 niekonsekwentnie (w `cbet` są, w `sizeOpen` nie), a test `terms.test.ts` je wymusza; «otwierający (open)» jest już w lekcjach (`content/pl/lessons/m4-l3-wobec-3betu.md:100`).
- Powraca: nie
- Wzorzec lub źródło: zasada 15 (teksty interfejsu należą do roli 04); reguła T-01 (`content/terms.yaml:22-27`); §1 dokumentu sam zapowiada nawiasy ze znaczników.
- Ocena: odstępstwo wynika z wiążącej reguły projektu i nie zmienia słów, więc nie blokuje; wymaga jednak potwierdzenia roli 04 przy jej najbliższej sesji (dopisanie znaczników w §3), żeby dokument i kod się nie rozjechały.
- Opcje: (a) rola 04 potwierdza i poprawia §3 dokumentu — dokument zgodny z kodem; (b) rola 04 przeformułowuje zdania, żeby ominąć część nawiasów (np. „gdy reszta spasuje [fold]” w nawiasie okrągłym) — czytelniej, koszt przekładu. Rekomendacja: (a), z oceną (b) dla „spasuje [fold]”.
- Test akceptacyjny: §3 dokumentu i `pl.json` mają te same znaczniki.
- Status: otwarte

### 08-programista-006 · Kwota limpu w zdaniu liczona osobno od funkcji kwoty przycisku
- Pozycja listy kontrolnej: DEV-13
- Poziom: NIS (P2)
- Realność: teoretyczny (wartości dziś równe)   · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/liczby.ts:85` liczy `1 - blindBb(pozycje.hero)`, a przycisk bierze kwotę z `kwotaAkcji` (`apps/mobile/src/features/scenariusz/wariant.ts:91`). Kryterium 5 §3 wymaga tej samej funkcji kwoty. Rozmiary przebić w obu miejscach pochodzą z `options[].bb`, więc zgodne.
- Mechanizm: ta sama wielkość w dwóch miejscach; `grep -rn "1 - blindBb" apps/mobile/src/features/scenariusz` → 2 trafienia (`apps/mobile/src/features/scenariusz/liczby.ts:85`, `apps/mobile/src/features/scenariusz/wariant.ts:91`).
- Powraca: nie
- Wzorzec lub źródło: §3 kryterium 5; `CLAUDE.md` „Ta sama wielkość ma jeden klucz”.
- Kroki w aplikacji: size-spot SB, wybór limp → „Liczby” (0,5 bb, zgodnie z przyciskiem).
- Opcje: (a) `kwotaAkcji(d, 'limp', s.szablon)` w `liczby.ts` — jedna definicja; (b) zostawić z komentarzem — zero pracy, ryzyko rozjazdu przy zmianie kwoty limpu. Rekomendacja: (a).
- Test akceptacyjny: zdanie limpu i przycisk biorą kwotę z jednej funkcji (test porównujący oba teksty).
- Status: otwarte

## Do sprawdzenia
- Przepełnienie sekcji „Liczby” przy AX5 na 320 pt (zdanie icm ok. 330 znaków według `pl.kontekst.json`): bez symulatora nie sprawdziłem; krok dla właściciela na telefonie albo dla roli 04 (pomiar jak `docs/design/przepelnienie-da.txt`).
- Przekład siedmiu kluczy w 10 słownikach (D-967): poza zakresem; czy dług trafił na listę koordynatora dla roli 09, nie sprawdziłem (`grep -rln D-967 docs` → tylko `docs/decyzje/DN.md`).

## Co działa dobrze i należy zachować
- Test D-890 napisany jako czerwony przed poprawką (e9e68d31 przed ac071adc), z wyrocznią przez bisekcję po wartości oczekiwanej, nie z tego samego wzoru.
- `overcardOuts` daje wartość nie większą niż górna granica generatora, więc zdanie «wciąż rzadziej niż cena» jest gwarantowane konstrukcją (`packages/poker-core/src/scenario-gen.ts:547-553` i test na ziarnach 1–60).
- Brak danych (rozmiary c-betu, pozycje) daje brak zdania zamiast zgadniętej liczby; range-spot jawnie bez zdań.
- `chipsDiffer` zostawiony na 0,5 z nazwanym powodem (D-969): odpowiedzi wariantów bez zmian.

## Decyzje dla właściciela
Brak decyzji produktowych do podjęcia. Do koordynatora: potwierdzenie D-966 przez rolę 04 (005) i wpis długu przekładu D-967 dla roli 09. Pula D-980…D-984 nieużyta (recenzja nie podjęła decyzji).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004,08-programista-006` (005 do roli 04). Testy odtwarzające 001 i 003: `dowody/do-testy-odtwarzajace.txt`.

`git status --porcelain` po recenzji (przed commitem raportu): tylko nowe pliki raportu i dowodów; pliki śledzone nietknięte (`dowody/do-content-build.txt`).
