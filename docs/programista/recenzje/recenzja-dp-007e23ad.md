# Audyt: Programista — Szkoła Pokera — recenzja niezależna DP (widok punktu ICM, D-889) — 2026-11-11
Commit: `007e23ad` (gałąź `sesja-dq-recenzja` = `origin/sesja-dp-icm`) · Zakres: `370a1548..007e23ad` (1835f053, e66df9dc, 256cc66d, 1b3e5e19, 007e23ad) · Tryb: audit (recenzja D-043, polecenie DQ) · Środowisko: Linux, Node 22, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; jest, vitest i Python działają; symulator iOS, Xcode i Maestro niedostępne, więc kryteria 5 (przepełnienie AX5) i 6 (zrzut) nie są sprawdzone. Mutanty i sondy uruchamiane w kopii (`git worktree` w scratchpadzie); pliki śledzone poza tym raportem i plikami dowodów `dq-*.txt` nietknięte. Ścieżki dowodów względem `docs/programista/recenzje`.

## Podsumowanie
Werdykt: **PRZYJĄĆ PO POPRAWKACH** (0 KRYT, 0 WYS, 4 ŚR, 2 NIS). Kod liczy dobrze: pula 11 bb, dopłata 9 bb, stosy 10 / 12,5 / 17,5 / 10 bb i 11,7 / 10 / 11,7 bb dla obu wariantów z makiety zgadzają się z moim rachunkiem liczonym inną ścieżką (Python, ułamki dokładne, ICM Malmuth-Harville). Rozstrzygnięcie KO-068 (pula = mniejszy stos pary + blind) jest poprawne i spójne z progiem D-890 na tym samym ekranie: 9 ÷ (11 + 9) = 45% = (S − b) ÷ (2S). Bramka SC-34 jest dobrze chroniona: 3 z 3 mutantów bramki padają. Słabsze są testy ekranu: z 12 mutantów widoku 4 przeżywają testy DP. Najważniejsze: test AX5 nie potrafi paść, bo szuka paska ukrytego dla czytnika bez `includeHiddenElements` (001), a kryterium 4 „karty nazwami” i kryterium 2 przy równych stosach pary nie mają testu (002, 003). Kod we wszystkich trzech miejscach działa (sondy DQ), więc poprawki to 3 asercje w teście. Nie ma zmian danych: generator, `GENERATOR_WERSJA`, schemat i treść są nietknięte, a `pnpm content:build` daje pusty diff.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P1 wg DEV-03) | D | Test AX5 nie potrafi paść: pasek ukryty dla czytnika jest niewidoczny dla zapytania bez `includeHiddenElements`, więc mutant progu (M10) przeżywa | otwarte |
| 08-programista-002 | ŚR (P2) | D | Kryterium 4 („karty nazwami” w etykiecie stołu) bez testu pozytywnego: etykieta bez kart przechodzi testy (M7) | otwarte |
| 08-programista-003 | ŚR (P2) | D | Kryterium 2 przy równych stosach pary bez testu: przypis „cały twój stos” znika przy `<` zamiast `<=` i testy tego nie widzą (M2); stosy są wielokrotnościami 500 żetonów, więc równość jest realna | otwarte |
| 08-programista-004 | ŚR (P2) | M | Ekran nazywa fazę turnieju „Bańka”, a termin kursu (`content/terms.yaml`, lekcja M11, zadania ICM) to „bubble”: dwie nazwy jednego pojęcia | otwarte (rola 04/06) |
| 08-programista-005 | NIS (P2) | D | Przy AX5 pasek znika, ale wartość nie schodzi pod nazwę, jak każe design-spec; odstępstwo bez decyzji (D-987 mówi tylko o progu) | otwarte |
| 08-programista-006 | NIS (P2) | D | Zapis stosu z jednym miejscem po przecinku (zaokrąglenie) i długość paska nie mają testu, który zabija mutanty (M6 floor, M5 udział we wszystkich żetonach) | otwarte |

## Linia bazowa i założenia
Ryzyka spisałem z diffu, design-spec „Scenariusz: punkt ICM” (`docs/design/design-spec.md:56-77`), D-889/D-890 (`docs/decyzje/DA.md`), makiety `docs/design/ekrany/scenariusz-icm.html` i generatora (`packages/poker-core/src/scenario-gen.ts:453-488`), zanim przeczytałem `docs/decyzje/DP.md`. Raportu autora (`docs/programista/stan-dp.md`) ani transkryptu DP nie czytałem (polecenie DQ). Dowód z commitu autora `docs/programista/dowody/dp-ci-1b3e5e19.txt` pominąłem i uruchomiłem CI sam.

Wymiary pokrycia:
- **Ścieżki zapisu:** brak w zakresie. Diff nie dotyka `packages/postep`, `apps/mobile/src/data`, schematu, generatora ani `content/` (dowody/dq-zakres.txt). `ukladIcm` jest czystą funkcją widoku i niczego nie zapisuje. Wybory użytkownika (`call`/`fold`) mają ten sam format co wcześniej.
- **Dane i warianty (zadanie 3):** generator jest bez zmian, więc odcisk wariantu (`icmSuffix`, `packages/poker-core/src/scenario-gen.ts:487`) i `GENERATOR_WERSJA = 3` (`packages/poker-core/src/scenario-gen.ts:279`) zostają. Zapisane warianty nie zmieniają znaczenia i podbicie wersji nie jest potrzebne. Bramka wpuszcza `icm-call` do bazy treści, ale w `content/` nie ma szablonu `icm-call`: SC-34 jest w szkicach i ma poziom trudny, który bramka odrzuca. `pnpm content:build` daje kod 0 i 0 zmienionych plików (dowody/dq-content-build.txt). Ryzyko nazwane: gdy SC-34 wejdzie do `content/` w wersji łatwy/średni, pojawią się pierwsze zapisane warianty `icm-call` w historii (`wariantyHistoria`). Ich odcisk zależy od stosów, więc późniejsza zmiana `randomStacks` albo struktur wypłat wymaga podbicia `GENERATOR_WERSJA`. To nie jest nowe ryzyko DP, a aplikacja nie jest wydana.
- **Obsługa błędów:** `ukladIcm` zwraca `null` bez `stackBb` albo bez indeksu gracza i ekran wtedy nie pokazuje kwot, zamiast zgadywać (sonda „brzeg”, dowody/dq-sondy.txt). Generator i tak nie zbuduje takiego wariantu (`packages/poker-core/src/scenario-gen.ts:459`).
- **Typy na granicach:** wariant pochodzi z generatora (typ `IcmCallVariantDecision`). `?? 0` w `apps/mobile/src/features/scenariusz/wariant.ts:268` działa na indeksach z tej samej tablicy, więc nie zgaduje wartości (DEV-07: ok).
- **System projektowy:** tokeny `tk.*`, `odstep`, `styl` i `promien` z modułu motywu, bez kolorów na sztywno. `SKALA_BEZ_PASKA = 2.5` jest stałą lokalną (`apps/mobile/src/features/scenariusz/komponenty.tsx:127`). Projekt trzyma takie progi przy komponencie (np. `CEL_DOTYKU`), więc nie zgłaszam tego jako znaleziska (DEV-13).
- **i18n:** 15 kluczy `scenario.icm.*` w 12 słownikach; `pnpm i18n:kod` jest w CI. Teksty pl zgadzają się z dokumentem co do słowa, z glosami terminów (D-990). Odstępstwa D-988 (karty w mianowniku w etykiecie VoiceOver) i D-989 (en napisane przez agenta, 10 słowników jako kopie en) są nazwane i skierowane do roli 04/09. **Ocena:** wymagają akceptacji roli 04, bo dotyczą brzmienia tekstów (zasada 15), ale nie blokują: etykieta niesie te same informacje, a kopie en to jawny dług z precedensem D-967. D-990 (glosa w etykiecie VoiceOver, „Stół (board)”) też należy do roli 04: czytnik przeczyta angielskie słowo w nawiasie. Precedens D-966 to akceptuje. Uwagi do en dla roli 04 są w „Do sprawdzenia”.
- **Liczby w treści (`{{n:…}}`):** diff nie dotyka `content/`. Nowe teksty interfejsu nie mają liczb dziedzinowych: procenty, bb i miejsca są parametrami z wariantu. Ostrzeżenia `content:build` o „1 bb” dotyczą lekcji M10 i istniały wcześniej (dowody/dq-content-build.txt).
- **Granica pakietów:** diff nie dotyka `poker-core`, `srs` ani `content-schema` (dowody/dq-zakres.txt), więc reguła „bez React Native” jest nienaruszona.
- **Wydajność:** `ukladIcm` wywołuje się 2–3 razy na render (ekran, `ruchRywala`, `kwotaAkcji`). To 3–4 stosy, bez znaczenia.
- **Dostępność:** wiersze stosów mają `minHeight: CEL_DOTYKU` (44), etykietę „kto, wartość” i rolę listy; pasek jest ukryty dla czytnika (M9 i M11 padają). `Rozwijany` „Stosy i nagrody” ma rolę przycisku, stan `expanded` i 44 pt. Nagłówek bańki ma rolę nagłówka. Etykieta stołu ma karty nazwami (sonda), ale bez testu w repo → 002.
- **Testy na właściwym poziomie:** liczby ekranu test liczy niezależnie od kodu (`apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:58-61`), co jest dobrym wzorcem. Luki dotyczą przypadków brzegowych i asercji dostępności → 001, 002, 003, 006.
- **Soczewki:** (1) użytkownik VoiceOver: etykieta stołu z kartami i stanami, lista stosów jako lista; ryzyko „(board)” w etykiecie (D-990) dla roli 04. (2) Recenzent szukający ścieżki bez testu: mutanty M2, M5, M6, M7 i M10 → 001–003, 006. (3) Programista czytający moduł pierwszy raz: `ukladIcm` ma jedną definicję puli i dopłaty z komentarzem D-985, czytelną. (4) Użytkownik z dużym tekstem: pasek znika, wartość zostaje w wierszu → 005.
- **Wzorzec najlepszych:** Trening nie ma odpowiednika (`gh api search/code` w `lkarwowski494/trening` dla `fontScale`, `ICM`, `accessibilityElementsHidden`: 0 trafień, odczyt 2026-11-11), co zgadza się z D-985–D-990. Wzorzec testu dostępności: RNTL domyślnie pomija elementy ukryte dla czytnika, a do ich liczenia służy `includeHiddenElements: true`. Ten sam plik robi to poprawnie w kryterium 4 (`apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:143`), a w teście AX5 już nie.
- Rejestr założeń: bez propozycji zmian.

**Rachunek KO-068 (zadanie 1 i 3 polecenia, szczebel 1 ADR-24).** Stosy w generatorze są sprzed blindów, a 1 bb = mniejszy stos pary ÷ `stackBb` (`packages/poker-core/src/scenario-gen.ts:476-477`). Rywal na SB wchodzi all-in. Do wygrania jest tylko tyle jego żetonów, ile masz ty (stos efektywny S = `stackBb`), a nadwyżka wraca do niego. Przed twoją decyzją w puli jest S od rywala + twój blind b, a dopłata to S − b. Po sprawdzeniu pula ma 2S. Próg w grze o żetony: (S − b) ÷ (2S) = 9 ÷ 20 = 45%, czyli dokładnie `requiredChips` z generatora (`packages/poker-core/src/scenario-gen.ts:485`) i zdanie „Liczb” (D-890). Pula według dokumentu (stos rywala + blind) daje dla wariantu 4 graczy 13,5 bb i cenę 9 ÷ 22,5 = 40%, sprzeczną z 45% na tym samym ekranie. Mój niezależny ICM odtwarza progi z makiety: 59,2% i 55,1% (dowody/dq-rachunek-niezalezny.txt). **KO-068 potwierdzone.** Dokument roli 04 (`docs/design/design-spec.md:63`, "Pula = stos rywala + twój blind") i makieta (13,5 bb) zostają do poprawienia przez rolę 04, co jest już zapisane w KO-068.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/features/scenariusz/wariant.ts` (`ukladIcm`, `kwotaAkcji`, `widokDecyzji`) | tak | odczyt; mutanty M1–M6 (dowody/dq-mutanty.txt); sonda z liczbami makiety (dowody/dq-sondy.txt); rachunek niezależny (dowody/dq-rachunek-niezalezny.txt) |
| `apps/mobile/src/features/scenariusz/komponenty.tsx` (`StolIcm`, `TurniejIcm`) | tak | odczyt; mutanty M9–M12; sonda AX5 |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` (`ruchRywala`, `StolIcmEkranu`, układ) | tak | odczyt; mutanty M7, M8; sonda etykiety |
| `tools/content-build/src/scenariusze.ts` (bramka, SC-34) | tak | odczyt; mutanty M13–M15; `content:build` (dowody/dq-content-build.txt) |
| Zmienione testy content-build (4 pliki) | tak | diff: zmiana oczekiwań wynika z decyzji D-986, bez usuniętych przypadków; „odrzucenie” zastąpione przez „przyjęcie bez trudnego” i „odrzucenie z trudnym” |
| `apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx` | tak | odczyt; mutanty; sondy |
| Słowniki pl, en (i kopie en w 10 językach) | tak (pl, en, de jako próbka kopii) | porównanie z design-spec; `pnpm i18n:kod` w CI |
| `docs/decyzje/DP.md` (D-985–D-990) | tak | oceny w „Linia bazowa” i znaleziskach |
| Kryterium 5 (przepełnienie AX5 na 320/390/430) | **nie sprawdzono** | brak symulatora i ekranu w przeglądarce dla RN; krok właściciela albo roli 04 (audit) |
| Kryterium 6 (zrzut vs `wzorce-zrzuty/scenariusz-icm/`) | **nie sprawdzono** | jw. |
| `pnpm run ci` na 007e23ad | tak, kod 0 | dowody/dq-ci-007e23ad.txt (przebieg samodzielny); dowody/dq-ci-007e23ad-rownolegle.txt (pierwszy przebieg, równolegle z vitest w worktree: przekroczony limit czasu testu spoza zakresu) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-dp-007e23ad.md . --rola 08-programista` (kopia skryptu z promptu roli w scratchpadzie): "OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista", kod 0. Sekrety w diffie DP: 0 trafień (dowody/dq-zakres.txt).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy (`ukladIcm`, bramka) | ok: czyste funkcje z testami; luki w przypadkach brzegowych → 003, 006 |
| DEV-02 | dotyczy | 2/2 commity zmieniające zachowanie (1835f053 bramka, e66df9dc widok) zmieniają testy w tym samym commicie; 256cc66d i 1b3e5e19 to teksty i18n; 007e23ad to dokumenty |
| DEV-03 | dotyczy | znalezisko 08-programista-001 (asercja, która nie może paść); zmiany testów content-build zgodne z D-986, bez osłabienia |
| DEV-04 | dotyczy | `pnpm run ci` kod 0 (dowody/dq-ci-007e23ad.txt): mobile 1033/1033, content-build 481 + 1 expected fail, domena 347 + 1 expected fail, poker-core 184, postep 160, jezyki 144, srs 21, preflop-solver 44; typecheck, skrypty, kontrole, i18n:kod, content:check, tresci:rejestr zielone. Pierwszy przebieg (równoległy z vitest w worktree) kod 1 przez limit czasu testu spoza zakresu (dowody/dq-ci-007e23ad-rownolegle.txt, „Do sprawdzenia”) |
| DEV-05 | nie dotyczy: diff bez ścieżek zapisu (dowody/dq-zakres.txt) | — |
| DEV-06 | nie dotyczy: bez migracji i kopii | — |
| DEV-07 | dotyczy | ok: `?? 0` na indeksach tej samej tablicy; brak `stackBb` daje `null`, nie zgadniętą liczbę |
| DEV-08 | nie dotyczy: bez dat | — |
| DEV-09 | dotyczy | ok: dane z generatora typowane; nowe `as` tylko w testach |
| DEV-10 | nie dotyczy: bez nowych operacji mogących zawieść | — |
| DEV-11 | dotyczy | ok: tokeny z motywu; zgodność wizualna (kryterium 6) nie sprawdzona |
| DEV-12 | dotyczy | ok w kodzie (wszystko przez `t()`, liczba pojedyncza i mnoga „spasował/spasowali” osobnymi kluczami dla 1 i 2 graczy); terminologia → 004 |
| DEV-13 | dotyczy | ok (stała progu przy komponencie, jak `CEL_DOTYKU`) |
| DEV-14 | dotyczy | ok: 0 trafień w diffie (dowody/dq-zakres.txt) |
| DEV-15 | nie dotyczy: bez nasłuchów i timerów (`useWindowDimensions` sprząta sam) | — |
| DEV-16 | dotyczy (bb vs żetony) | ok: przeliczenie żetony → bb w jednym miejscu (`bbNaZeton`, `wariant.ts`), pola z jednostką w nazwie (`stosBb`, `pulaBb`, `doSprawdzeniaBb`) |

## Znaleziska (szczegóły)

### 08-programista-001 · Test AX5 nie potrafi paść: pasek przy dużym tekście może wrócić niezauważony
- Pozycja listy kontrolnej: DEV-03
- Poziom: ŚR (P1 wg DEV-03; nie blokuje wydania, bo kod działa: sonda)
- Realność: realny (test w repo jest pusty) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:189` „expect(screen.queryAllByTestId('pasek-stosu')).toHaveLength(0);” — pasek ma `accessibilityElementsHidden` (`apps/mobile/src/features/scenariusz/komponenty.tsx:185`), a RNTL domyślnie pomija elementy ukryte. Sonda: przy `fontScale` 1 "z ukrytymi=4, bez ukrytych=0", przy 3,1 "z ukrytymi=0, bez ukrytych=0" (dowody/dq-sondy.txt). Mutant M10 (`SKALA_BEZ_PASKA = 4`, pasek zostaje przy AX5) przeżywa wszystkie 235 testów scenariusza (dowody/dq-mutanty.txt), a pod sondą DQ pada (dowody/dq-mutanty-pod-sondami.txt).
- Mechanizm: zapytanie o element ukryty dla czytnika bez `includeHiddenElements`; `grep -n "TestId('pasek-stosu'" dp-icm-d889.test.tsx` → 2 trafienia: linia 143 z opcją (dobrze), linia 189 bez opcji (pusty test).
- Powraca: nie
- Wzorzec lub źródło: zasada 11 i DEV-03 (test musi potrafić paść); ten sam plik, linia 143.
- Kroki w aplikacji: Ustawienia iOS → Dostępność → Większy tekst AX5 → scenariusz ICM. Dziś pasek znika (kod dobry), ale regresja progu nie zaczerwieni CI.
- Opcje: (a) dodać `{ includeHiddenElements: true }` w linii 189 i asercję kontrolną przy skali 1 (4 paski) — 2 linie, test potrafi paść; (b) testować `TurniejIcm` bezpośrednio z `fontScale` — więcej kodu bez zysku. Rekomendacja: (a).
- Test akceptacyjny: mutant M10 pada w `dp-icm-d889.test.tsx`; test przy skali 1 widzi 4 paski (z ukrytymi), przy 3,1 widzi 0.
- Status: otwarte

### 08-programista-002 · Kryterium 4 „karty nazwami” w etykiecie stołu nie ma testu pozytywnego
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR (P2)
- Realność: realny (luka testu; kod dziś dobry) · Pewność: wysoka
- Rodzaj: D
- Dowód: test kryterium 4 sprawdza tylko brak symboli (`apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:141` „expect(eti).not.toMatch(/[♠♥♦♣]/)”). Etykieta bez kart też go spełnia: mutant M7 (`reka: ''` w `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:280`) przeżywa wszystkie testy (dowody/dq-mutanty.txt). Sonda z `nazwaKarty` dla obu kart wariantu zabija M7 (dowody/dq-mutanty-pod-sondami.txt).
- Mechanizm: asercja negatywna bez pozytywnej; inne kryteria w pliku mają pozytywne.
- Powraca: nie
- Wzorzec lub źródło: design-spec kryterium 4 (`docs/design/design-spec.md:75`), A04-11.
- Kroki w aplikacji: VoiceOver na stole ICM: po regresji użytkownik nie usłyszy swoich kart, a CI pozostanie zielone.
- Opcje: (a) asercja `expect(eti).toContain(nazwaKarty(c, t))` dla obu kart wariantu (sonda gotowa w dowody/dq-sondy.txt); (b) porównanie z pełnym oczekiwanym zdaniem — kruche przy zmianie tekstu przez rolę 04. Rekomendacja: (a).
- Test akceptacyjny: mutant M7 pada.
- Status: otwarte

### 08-programista-003 · Przypis „cały twój stos” przy równych stosach pary nie ma testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR (P2)
- Realność: realny (równe stosy pary to typowy przypadek: `ICM_STACK_STEP = 500`, `packages/poker-core/src/icm.ts:49`; makieta ma dwa stosy po 2000) · Pewność: wysoka
- Rodzaj: D
- Dowód: kryterium 2 mówi "wariant z mniejszym albo równym daje przypis"; test bierze pierwszy wariant z `heroNieWiekszy` (`apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:102`), czyli zwykle mniejszy. Mutant M2 (`caleStosTy: mojStos < stosRywala` w miejscu `apps/mobile/src/features/scenariusz/wariant.ts:275`)  przeżywa (dowody/dq-mutanty.txt), a pod sondą DQ "równe stosy pary" pada (dowody/dq-mutanty-pod-sondami.txt). Skutek regresji: przy równych stosach sprawdzenie stawia cały stos i przegrana kończy turniej, a ekran by o tym nie mówił.
- Mechanizm: wybór wariantu „pierwszy pasujący” nie pokrywa granicy `<=`; `grep -n "znajdz((p) =>" dp-icm-d889.test.tsx` → 11 trafień, żaden z warunkiem równości.
- Powraca: nie
- Wzorzec lub źródło: wzorce roli („Dobry test: granice, np. równo na progu”).
- Kroki w aplikacji: scenariusz ICM z twoim stosem równym stosowi SB.
- Opcje: (a) test z `znajdz((p) => p.stacks[p.heroIndex] === p.stacks[p.villainIndex])` na ekranie; (b) test jednostkowy `ukladIcm` z ręcznym wariantem (sonda w dowody/dq-sondy.txt) — szybszy, niezależny od ziaren. Rekomendacja: (b) albo oba, jeśli ziarna 1–400 dają równy przypadek.
- Test akceptacyjny: mutant M2 pada.
- Status: otwarte

### 08-programista-004 · Ekran mówi „Bańka”, a kurs uczy terminu „bubble”
- Pozycja listy kontrolnej: DEV-12
- Poziom: ŚR (P2)
- Realność: realny · Pewność: wysoka
- Rodzaj: M (terminologia: jedna nazwa na jedno pojęcie, CLAUDE.md)
- Dowód: `apps/mobile/src/i18n/locales/pl.json:1134` „"bubble": "{{t:bubble|Bańka}}: płatne {{platne}} miejsca z {{gracze}}",”; lekcja `content/pl/lessons/m11-l3-icm.md:45` „{{t:bubble|Bubble}}”; zadanie ICM `apps/mobile/src/i18n/locales/pl.json:836` „{{t:bubble|Bubble}}: {{table}}”; termin `content/terms.yaml:1067-1068` ma pl: bubble. Ponieważ pl i en terminu są równe, glosa się nie pojawia i użytkownik widzi "Bańka" bez powiązania z terminem z lekcji (test DP oczekuje "Bańka: płatne", bez nawiasu).
- Mechanizm: forma w znaczniku `{{t:…|forma}}` spoza terminu; `grep -rn "t:bubble|" apps/mobile/src/i18n/locales/pl.json content/pl` → „Bańka” tylko w nowym kluczu, gdzie indziej „Bubble”.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md „jedna nazwa na jedno pojęcie (tabela terminologii w dokumencie 13)”.
- Kroki w aplikacji: lekcja M11 („Bubble”) → scenariusz ICM („Bańka”).
- Opcje: (a) rola 04 zmienia tekst na „Bubble: płatne …” (spójne z lekcją i zadaniami; zmiana 1 klucza pl); (b) rola 06 zmienia termin pl na „bańka” w `terms.yaml` i lekcjach (szersza zmiana treści, decyzja merytoryczno-językowa). DP wiernie wdrożyło tekst design-spec, więc to nie jest defekt DP. Rekomendacja: (a), decyzja roli 04.
- Test akceptacyjny: wszystkie wystąpienia `{{t:bubble|…}}` w pl mają tę samą formę rzeczownika (sprawdzenie grepem albo test terminów).
- Status: otwarte (rola 04/06)

### 08-programista-005 · Przy AX5 wartość stosu nie schodzi pod nazwę
- Pozycja listy kontrolnej: DEV-11
- Poziom: NIS (P2)
- Realność: brzegowy (tylko AX4–AX5; bez pomiaru przepełnienia nie wiadomo, czy wiersz się mieści) · Pewność: wysoka co do odstępstwa, średnia co do skutku
- Rodzaj: D
- Dowód: `docs/design/design-spec.md:61` „przy AX5 znika, wartość schodzi pod nazwę”; styl wiersza jest zawsze poziomy: `apps/mobile/src/features/scenariusz/komponenty.tsx:236` „wierszStosu: { flexDirection: 'row'”. D-987 (`docs/decyzje/DP.md:8`) ustala tylko próg zniknięcia paska.
- Mechanizm: jedna gałąź `pasek ?` (`apps/mobile/src/features/scenariusz/komponenty.tsx:169`) bez zmiany kierunku wiersza.
- Powraca: nie
- Wzorzec lub źródło: design-spec „Pasek stosu”; zasada 15.
- Kroki w aplikacji: AX5, 320 pt, wiersz „Rywal, SB · 12,5 bb”.
- Opcje: (a) przy `!pasek` wiersz `flexDirection: 'column'` (zgodnie z dokumentem, 1 linia); (b) zostawić i zapisać odstępstwo do akceptacji roli 04 po pomiarze kryterium 5. Rekomendacja: (a).
- Test akceptacyjny: przy `fontScale` 3,1 wiersz ma kierunek kolumnowy; kryterium 5 (przepełnienie) kod 0.
- Status: otwarte

### 08-programista-006 · Zaokrąglenie stosu i długość paska bez testu, który potrafi paść
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS (P2)
- Realność: realny dla luki testu; skutek regresji widoczny (np. 11,6 zamiast 11,7) · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant M6 (`Math.floor` w `apps/mobile/src/features/scenariusz/wariant.ts:254`) przeżywa, bo warianty z ziaren testu nie mają ułamka wymagającego zaokrąglenia w górę. Sonda z wariantem makiety 3 graczy (11,7 bb) go zabija. Mutant M5 (udział we wszystkich żetonach, odrzucona opcja (d) D-889, `apps/mobile/src/features/scenariusz/wariant.ts:268`) przeżywa, bo nic nie sprawdza szerokości paska (dowody/dq-mutanty.txt, dowody/dq-mutanty-pod-sondami.txt).
- Mechanizm: test liczb ekranu oparty o „pierwszy pasujący wariant”, bez przypadku z zaokrągleniem.
- Powraca: nie
- Wzorzec lub źródło: design-spec „Liczby wariantu” („11,7 bb”) i „Pasek stosu” (stos ÷ największy).
- Kroki w aplikacji: wariant 3 graczy 3500/3500/3000.
- Opcje: (a) test jednostkowy `ukladIcm` z wariantami makiety (wartości 11,7 i `udzial` = 1 dla największego; sonda gotowa); (b) zostawić do backlogu. Rekomendacja: (a), bo kosztuje kilka linii.
- Test akceptacyjny: M5 i M6 padają.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- **Kryteria 5 i 6** (AX5 na 320/390/430, zrzut porównany z makietą): nie do wykonania w tym środowisku. Dla roli 04 (audit) albo listy kontrolnej na telefon: AX5 na iPhone SE (320 pt), lista stosów i przypis; VoiceOver na stole (karty, „Gracz A i Gracz B spasowali”); rozwinięcie „Stosy i nagrody” w ocenie.
- **Teksty en dla roli 04 (D-989):** „Prizes: place 1 50%, place 2 30% … of the prize pool” stawia dwie liczby obok siebie (propozycja: „1st place 50%” albo „place 1: 50%”); „you are BB, cards …” (propozycja: „you are in the BB”). Pewność 70%, bo to sprawa głosu, nie poprawności.
- **Przypis „9 bb to cały twój stos”** obok wiersza listy „Ty, BB 10 bb”: 9 bb to rzeczywiście cały stos za blindem, a tekst i makieta pochodzą od roli 04. Użytkownik może jednak odczytać to jako sprzeczność. Do oceny roli 04 razem z przypisem „nadwyżka rywala wraca” (KO-068).
- **Przypis „cały twój stos” jest widoczny także w ocenie** (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:236` nie sprawdza `ocenaMode`). Design-spec wymienia go tylko w układzie decyzji. Nieszkodliwe, do decyzji roli 04.
- **Niestabilność CI pod obciążeniem (poza zakresem DP):** `tools/content-build/test/terms-nazwy-09.test.ts` przekroczył 5000 ms przy równoległym drugim przebiegu vitest (dowody/dq-ci-007e23ad-rownolegle.txt). Samodzielny przebieg przechodzi. Na wolnym runnerze CI może dawać fałszywą czerwień; do obserwacji, bez znaleziska.

## Co działa dobrze i należy zachować
- Jedna funkcja `ukladIcm` daje pulę, dopłatę, kwotę przycisku, stosy i dziennik (kryterium 3). Mutanty M1, M3 i M4 padają.
- Test liczy oczekiwane liczby niezależnie od kodu ekranu (`apps/mobile/src/features/scenariusz/__tests__/dp-icm-d889.test.tsx:58-61`). To dobry wzorzec dla kolejnych widoków.
- Bramka SC-34 jest wymuszona testem, a nie samym opisem (D-986, zasada 21). M13–M15 padają.
- D-985 rozpoznało błąd rachunkowy w dokumencie projektu i zatrzymało go przed ekranem; liczby się zgadzają (rachunek niezależny).
- Brak liczb zgadywanych: bez `stackBb` widok nie pokazuje kwot.
- Przeliczenie żetony → bb w jednym miejscu, nazwy z jednostką.

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. Do roli 04 (przez koordynatora): 004 (forma terminu „bubble”), akceptacja D-988, D-989 i D-990, tekst przypisu „nadwyżka wraca” (KO-068), 005 (opcja b, gdyby rola 04 wolała odstępstwo), uwagi do en.

Decyzje DQ: bez nowych decyzji technicznych (pula D-995…D-999 niewykorzystana).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-005,08-programista-006` (004 do roli 04). Szacunek: ok. 20–30 min agenta (asercje i sondy są gotowe w dowody/dq-sondy.txt, 1 linia stylu); czekanie: `pnpm run ci` ok. 10 min.

## Stan repozytorium
`git status --porcelain` przed commitem recenzji (pliki śledzone kodu DP nietknięte; dodane wyłącznie raport i dowody):

```
A  docs/programista/recenzje/dowody/dq-ci-007e23ad-rownolegle.txt
A  docs/programista/recenzje/dowody/dq-ci-007e23ad.txt
A  docs/programista/recenzje/dowody/dq-content-build.txt
A  docs/programista/recenzje/dowody/dq-mutanty-pod-sondami.txt
A  docs/programista/recenzje/dowody/dq-mutanty.txt
A  docs/programista/recenzje/dowody/dq-rachunek-niezalezny.txt
A  docs/programista/recenzje/dowody/dq-sondy.txt
A  docs/programista/recenzje/dowody/dq-zakres.txt
A  docs/programista/recenzje/recenzja-dp-007e23ad.md
```
