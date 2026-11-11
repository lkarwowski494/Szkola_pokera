# Audyt: Programista — Szkoła Pokera — recenzja niezależna ED (KO-073, poprawki EC) — 2026-11-11
Commit: `539919af` (gałąź `sesja-ee-recenzja` = `origin/sesja-dx-silnik` o 20:55) · Zakres: `f86c72fc..539919af` (701b6d18, cc6d3be0, 6fde2216, 539919af) · Tryb: audit (recenzja D-043, polecenie EE) · Środowisko: Linux, Node 22.23, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; vitest i jest działają; brak macOS/Xcode (nie dotyczy zakresu). Sondy i mutanty uruchamiane w kopii roboczej (`git worktree` @539919af w scratchpadzie); pliki śledzone poza tym raportem, plikami dowodów `ee-*.txt` i `docs/decyzje/EE.md` są nietknięte. Ścieżki dowodów są względne wobec `docs/programista/recenzje`.

## Podsumowanie
Werdykt: **PRZYJĄĆ PO POPRAWKACH** (0 KRYT, 0 WYS, 1 ŚR, 2 NIS). Kod i treść są poprawne. Poprawki dotyczą tylko testów i nie blokują wydania (próg z `CLAUDE.md`). KO-073 działa tak, jak zdecydował właściciel. Brzmienie zdania jest bez zmian w 168 z 168 wystąpień (D-917). Rachunek niezależny objął 21 600 wariantów sc-01/02/03/19 (15 183 unikalne) i 952 320 renderów bloku w 35 bazach treści. Blok jest widoczny dokładnie wtedy, gdy gracz ma kartę wyższą od wszystkich kart stołu w danym punkcie (0 rozbieżności). Bramka odrzuca niedomknięty blok i nieznaną nazwę warunku. Wszystkie znaleziska EC (001, 002, 003, 005, 006, 007, 008) są zamknięte, a każdy mutant wskazany przez EC daje teraz czerwony wynik albo jest nazwany jako równoważny lub nieaktualny. `pnpm run ci` ma kod 0. Luki: test warunku w aplikacji przepisuje wzór z kodu, więc nie odróżnia stołu flopu od stołu turnu (009). Test treści nie sprawdza, gdzie blok się zaczyna (010). Brak wektora „karta gracza równa najwyższej karcie stołu” (011).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-009 | ŚR (P1 wg DEV-03) | D | Test warunku `nadkarty` w aplikacji używa kopii wzoru z kodu: mutant „stół turnu w punkcie flopu” przechodzi wszystkie testy, a gracz zobaczyłby zdanie o nadkartach przy złym stole | otwarte |
| 08-programista-010 | NIS (P2) | D | Test „blok to tylko to zdanie” nie sprawdza początku bloku: przekład, w którym blok połyka też zdanie „To uproszczenie…”, przechodzi test i bramkę | otwarte |
| 08-programista-011 | NIS (P2) | D | Brak wektora „karta gracza równa najwyższej karcie stołu” dla `overcardOuts`: mutant `>` → `>=` przechodzi (na dzisiejszej treści równoważny) | otwarte |

## Linia bazowa i założenia
Ryzyka spisałem z diffu, decyzji KO-073 (`origin/koordynacja:docs/koordynacja/decyzje.md`, wiersz 81: „zdanie o nadkartach pokazywane warunkowo (tylko gdy gracz ma nadkartę)”), recenzji EC (`origin/sesja-ec-recenzja`, `recenzja-dx-174dc00b.md` i `recenzja-dx-a6186653.md`) i decyzji ED (`docs/decyzje/ED.md`, D-1115…D-1118). Stanu autora (`docs/programista/stan-dx.md`) nie czytałem. Dowód CI autora (`ed-ci-6fde2216.txt`) pominąłem i uruchomiłem CI sam.

Wymiary pokrycia:
- **Ścieżki zapisu:** brak w zakresie. Diff nie dotyka `packages/postep`, `apps/mobile/src/data` ani schematu. Bazy treści `apps/mobile/assets/content/*.db` i `tresc.generated.ts` są generowane, a `content:check` w CI potwierdza ich zgodność z `content/`.
- **Dane i warianty:** `tryVariant` zmienił tylko źródło listy rozmiarów size-spot (`sizeOptionBbs`, te same wartości). `pnpm run ci` z testami odcisków ma kod 0.
- **Obsługa błędów:** `fillVariantMarkers` rzuca `TemplateError` przy nieznanym, niedomkniętym albo zagnieżdżonym bloku i przy braku wartości warunku. Jedyna ścieżka renderu wyjaśnień to `bloki` (`apps/mobile/src/features/scenariusz/wariant.ts:345`) i zawsze przekazuje warunki (grep w dowody/ee-wektory-grepy.txt). Nowe strażniki wejścia N2/N3/N4/N7a rzucają błąd programisty.
- **Typy na granicach:** szablony z bazy idą przez `ScenarioTemplate` (zod) w `repo.ts`. W diffie nie ma nowych `as` na danych z zewnątrz.
- **Teksty i i18n:** treść 12 języków (35 baz, w tym 23 z treścią zastępczą). Bloki są domknięte w każdej bazie (sonda na 35 bazach). Po ukryciu bloku nie zostaje znacznik ani wisząca spacja, także w ja, ko i zh-Hant (sonda).
- **Wydajność:** `overcardOutsAt` wywoływane raz na punkt i raz na render, bez pętli zapytań.
- **Testy na właściwym poziomie:** czysta logika w Node (vitest), bramka w content-build, render w jest. Luki → 009, 010, 011.
- **Liczby konfiguracyjne:** wzór iso jest w jednym miejscu (`packages/poker-core/src/grading.ts:43`), a lista rozmiarów w jednym (`packages/poker-core/src/scenario-gen.ts:323`).
- **Dostępność, system projektowy:** nie dotyczy (bez zmian widoku).

Soczewki: recenzent szukający ścieżki bez testu (63 mutanty), użytkownik czytający wyjaśnienie (rachunek niezależny na prawdziwej ścieżce `bloki`), tłumacz (brzmienie i bloki we wszystkich przekładach). Wzorzec: każda decyzja wyświetlenia ma test z wyrocznią niezależną od kodu (rola 08, „Dobry test”). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/*/scenarios/*.yaml` (72 pliki, 240 wyjaśnień, 168 bloków) | tak | brzmienie przed i po, reszta YAML bez zmian (dowody/ee-d917-brzmienie.txt) |
| `packages/poker-core/src/scenario-gen.ts` (bloki, `overcardOutsAt`, N2/N3/N4/N7a) | tak | czytanie, mutanty (dowody/ee-mutanty.txt), wektory (dowody/ee-wektory-grepy.txt) |
| `packages/poker-core/src/grading.ts` (`isoSizeStandardBb`) | tak | czytanie, mutanty iso-1, iso-2, g-7 |
| `tools/content-build/src/scenariusze.ts` (bramka bloków, pojemność D-1040) | tak | czytanie, mutanty k-6…k-9, p-1…p-5, c-1…c-4 (dowody/ee-bramka-c1-c4.txt) |
| `apps/mobile/src/features/scenariusz/wariant.ts`, `liczby.ts` | tak | sonda niezależna przez `bloki` i `zdaniaLiczb` (dowody/ee-ko073-sonda.txt), mutanty k-10…k-15 |
| testy w diffie (6 plików) | tak | czytanie, mutanty; brak `.skip`/`.only`/`expect(true)` (dowody/ee-wektory-grepy.txt) |
| `pnpm run ci` na 539919af | tak | kod 0 (dowody/ee-ci-539919af.txt) |
| Ekran na urządzeniu (VoiceOver, duży tekst) | nie | brak zmian widoku; render sprawdzony na poziomie tekstu |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-ed-539919af.md . --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0 (przebieg przed commitem; skrypt w scratchpadzie). Pliki dowodów przejrzane grepem pod kątem sekretów i adresów e-mail: brak trafień.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | warunek KO-073 i N2/N3/N4/N7a mają testy z wektorami; luki wyroczni → 08-programista-009, 08-programista-011 |
| DEV-02 | dotyczy | 2/2 commity zmieniające zachowanie (701b6d18, cc6d3be0) mają testy w tym samym commicie; 539919af to same testy |
| DEV-03 | dotyczy | usunięte asercje N2 zastąpione zgodnie z D-1116 (zmiana oczekiwań z decyzji, wyrocznia silniejsza: trzy wartości, 20 000 losowań); przeżywające mutanty → 009, 010, 011 |
| DEV-04 | dotyczy | `pnpm run ci` kod 0: poker-core 207/207, content-build 505 + 1 expected fail, mobile 1043/1043, domena 347 + 1 expected fail (dowody/ee-ci-539919af.txt) |
| DEV-05 | nie dotyczy: diff bez zapisu danych użytkownika | — |
| DEV-06 | nie dotyczy: brak migracji i kopii | — |
| DEV-07 | dotyczy | `?? []` przy outach drawa w `overcardOutsAt` = brak drawa to brak outów, nie zgadywanie; brak wartości warunku daje błąd, nie domyślne `false`; ok |
| DEV-08 | nie dotyczy: brak dat | — |
| DEV-09 | dotyczy | szablony z bazy parsowane zodem (`repo.ts`); nowy kod bez `as` na danych z zewnątrz; ok |
| DEV-10 | dotyczy | uszkodzony blok to `TemplateError` przy budowaniu (bramka) i przy renderze, nie cichy tekst; ok |
| DEV-11 | nie dotyczy: brak zmian widoku | — |
| DEV-12 | dotyczy | zdanie w treści 12 języków, blok bez sklejania napisów; CJK bez spacji przed blokiem zgodnie z pisownią; ok |
| DEV-13 | dotyczy | wzór iso i lista rozmiarów w jednym miejscu (EC 005 zamknięte); ok |
| DEV-14 | dotyczy | w diffie brak plików kluczy i wzorców sekretów (skrypt kontroli raportu, grep dowodów) |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów | — |
| DEV-16 | dotyczy | stół punktu wybierany po ulicy (3 albo 4 karty), sprawdzony rachunkiem niezależnym; ok |

### Zadanie 1: KO-073
- **Brzmienie (D-917):** w 168 z 168 wyjaśnień z blokiem tekst po usunięciu `{{jesli:nadkarty}}` i `{{/jesli}}` jest identyczny z tekstem @f86c72fc. Pozostałe 72 wyjaśnienia i pola YAML są bez zmian (dowody/ee-d917-brzmienie.txt, kod 1 tylko z powodu artefaktu wzorca sondy w CJK, opisanego w pliku).
- **Widoczność:** sonda (dowody/ee-ko073-sonda.txt) liczy nadkartę z liter rang („Ah”), z pominięciem pary w ręce, wobec 3 kart stołu na flopie i 4 na turnie, według ulicy z szablonu. Porównuje to z tekstem z `bloki` dla każdej akcji w pl (wszystkie warianty) i w 35 bazach (co 10. wariant) oraz z linią „Liczby”. Wynik: 21 600 wariantów, 38 400 punktów draw-call (4 685 z nadkartą, 33 715 bez), 952 320 renderów, 0 błędów, 0 śladów znaczników i podwójnych spacji.
- **Przekłady:** w każdej z 35 baz każde wyjaśnienie draw-call ma domknięty blok (sonda rzuca błąd przy braku bloku). Liczby 14 otwarć i 14 zamknięć sprawdziłem bezpośrednio w 5 bazach (pl, en, ja, bg, zh-Hant). W YAML każdy blok jest jeden, domknięty i stoi na końcu wyjaśnienia.
- **Bramka (mutanty):** c-1 (brak `{{/jesli}}` w de) → `content:check` kod 1: „niedomknięty blok warunku”. c-2 (literówka nazwy w en) i c-3 (zdanie bez bloku w ja) → test treści kod 1. c-4 (blok obejmuje też poprzednie zdanie) → bramka go nie zgłasza (→ 010).

### Zadanie 2: poprawki EC
| EC | Stan | Dowód |
|---|---|---|
| 001 (gutshot, backdoor strita wobec małego c-betu) | zamknięte | wektory EC → `null` (dowody/ee-wektory-grepy.txt); mutanty n2-001a, n2-001c, bd-1…bd-5 zabite; n2-001b równoważny (3 704 400 układów, 0 różnic, dowody/ee-mutanty-przezyle.txt) |
| 002 (para wobec dużego c-betu) | zamknięte | `2d 2c | Ah Kc Qs | 0,75 → null`; n2-002a…f zabite |
| 003 (mutanty EC) | zamknięte | def-6, def-10, river-1, river-2, river-5 zabite. def-4 równoważny (jak w EC). def-7 i def-8 nieaktualne: gałąź usunięta (D-1117), a wektory asa z królem przy dużym c-becie dają `null` |
| 005 (wzór iso, lista rozmiarów) | zamknięte | grep: 1 wzór, 1 lista; iso-1…3 zabite |
| 006 (strażniki wejścia) | zamknięte w wariancie (a) | g-1…g-7 zabite. Bramki szablonu z opcji (b) EC nie ma, bo N2/N4/N7a nie są podpięte do schematu; wraca przy integracji |
| 007, 008 (D-1040) | zamknięte | p-4 i p-2 zabite przez nowe testy |

Razem 63 mutanty: 59 zabitych, 4 przeżyły (2 równoważne: def-4, n2-001b; 2 luki: k-10 → 009, k-13 → 011).

## Znaleziska (szczegóły)

### 08-programista-009 · Test warunku `nadkarty` w aplikacji nie odróżnia stołu flopu od stołu turnu, bo używa kopii wzoru z kodu
- Pozycja listy kontrolnej: DEV-03
- Poziom: P1 wg DEV-03 (ŚR wg progu wydania: kod jest dziś poprawny, sonda 0 błędów)
- Realność: realny (regresja przejdzie niezauważona i pokaże zdanie merytoryczne przy złym stole) · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant k-10 zamienia w `apps/mobile/src/features/scenariusz/wariant.ts:320` stół punktu na 4 karty także na flopie. Przechodzi wszystkie testy `src/features/scenariusz` (jest) oraz testy ko073 w poker-core i content-build (dowody/ee-mutanty.txt). Ta sama sonda niezależna na kodzie z mutantem daje 2 903 błędy na 2 700 wariantach, np. `pl sc-01 p0 call Js9s|7s2d5sQh9c nad=true widoczny=false` (dowody/ee-mutanty-przezyle.txt). Przyczyna: test liczy oczekiwanie funkcją przepisaną z kodu, `apps/mobile/src/features/scenariusz/__tests__/ko073-nadkarty.test.ts:16-19` „v.board.slice(0, d.street === 'flop' ? 3 : 4)”, więc wyrocznia ma ten sam błąd co kod.
- Mechanizm: jedna wyrocznia tautologiczna; `grep -n "board.slice(0, d.street" apps/mobile/src/features/scenariusz/__tests__/*.ts` → 1 trafienie (`apps/mobile/src/features/scenariusz/__tests__/ko073-nadkarty.test.ts:18`).
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test”: wynik oczekiwany z danych wejściowych testu, nie z kodu.
- Kroki w aplikacji: po takiej regresji gracz z J♠9♠ na 7♠2♦5♠ (flop) nie widzi zdania o nadkartach, choć ma dwie nadkarty, bo turn Q♥ jest wyższy.
- Opcje: jedna sensowna — zamienić kopię wzoru na wektory z wartością wpisaną ręcznie (wariant z nadkartą na flopie i bez niej na turnie, np. Js9s / 7s2d5s / Qh: punkt 0 `true`, punkt 1 `false`) albo na wyrocznię z rang jak w sondzie EE — bo test warunku bez niezależnej wyroczni nie ma tańszego zastępstwa.
- Test akceptacyjny: mutant k-10 ze skryptu w dowody/ee-mutanty.txt daje czerwony wynik w `jest src/features/scenariusz`.
- Status: otwarte

### 08-programista-010 · Test treści nie sprawdza początku bloku, więc blok połykający poprzednie zdanie przechodzi test i bramkę
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NIS)
- Realność: brzegowy (błąd tłumacza przy przyszłej zmianie przekładu; dziś wszystkie 168 bloków są poprawne) · Pewność: wysoka
- Rodzaj: D
- Dowód: tytuł testu (`tools/content-build/test/ko073-warunek-nadkarty.test.ts:28`) obiecuje, że „blok to tylko to zdanie”. Asercje w liniach 30–36 tego pliku sprawdzają jednak tylko liczbę bloków, klucz `pair.outs.per-rank` w bloku i koniec wyjaśnienia na `{{/jesli}}`. Mutant c-4 przenosi `{{jesli:nadkarty}}` przed „To uproszczenie: liczysz tylko outy drawa.” w pl sc-03. Test przechodzi, a `content:check` pada tylko na nieaktualnych plikach generowanych, nie na bloku (dowody/ee-bramka-c1-c4.txt). Bez nadkarty gracz straciłby wtedy zdanie o uproszczeniu, które ma być zawsze.
- Mechanizm: 1 test; bramka (`tools/content-build/src/scenariusze.ts:186-192`) z założenia nie zna treści zdań.
- Powraca: nie
- Wzorzec lub źródło: jak 009.
- Kroki w aplikacji: po błędnym przekładzie wariant bez nadkarty nie pokazuje zdania „To uproszczenie…”.
- Opcje: (a) w teście treść bloku po usunięciu `{{n:…}}` i `{{t:…}}` ma dokładnie jeden znak końca zdania (`.。!?！？`), na końcu — prosto, działa w CJK; (b) porównać tekst przed blokiem z tekstem @f86c72fc bez zdania o nadkartach — dokładniej, ale wiąże test z historią. Rekomendacja: (a).
- Test akceptacyjny: mutant c-4 daje czerwony wynik w `ko073-warunek-nadkarty.test.ts`.
- Status: otwarte

### 08-programista-011 · Brak wektora „karta gracza równa najwyższej karcie stołu” w testach `overcardOutsAt`
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NIS)
- Realność: teoretyczny dla dzisiejszej treści (sonda z mutantem: 0 błędów, bo wariant draw-call z taką ręką nie występuje), realny dla funkcji · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant k-13 (`packages/poker-core/src/scenario-gen.ts:149`, `x > najwyzszaNaStole` → `>=`) przechodzi testy ko073 w trzech pakietach i całą grupę `src/features/scenariusz` (dowody/ee-mutanty.txt). Wektory przypadku bez nadkart (`packages/poker-core/test/ko073-warunki.test.ts:39-42`) mają tylko stół wyższy od obu kart i parę w ręce.
- Mechanizm: 1 granica bez wektora.
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test”: granice, „równo na progu”.
- Kroki w aplikacji: brak dziś; gdy generator dopuści parę z najwyższą kartą stołu, regresja `>=` pokaże zdanie o nadkartach przy top parze.
- Opcje: jedna sensowna — dopisać wektor `overcardOutsAt(Kh 5c, Ks 9d 2h) = 0` — bo brak wektora granicy nie ma tańszego zastępstwa.
- Test akceptacyjny: mutant k-13 czerwony w `ko073-warunki.test.ts`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Treść zdania „…ale tu nie zmienia to odpowiedzi” (D-888) przy wariancie fold z dwiema nadkartami opiera się na górnej granicy outów w generatorze (komentarz przy `overcardOuts`). Nie sprawdzałem tego sondą, bo to poza zakresem KO-073 (warunek wyświetlania, nie prawdziwość zdania). Warto to sprawdzić przy następnej recenzji treści draw-call (06).
- Bazy 23 języków bez własnych scenariuszy mają te same 14 bloków (treść zastępcza). Nie sprawdzałem, z którego języka pochodzi treść zastępcza; to nie zmienia wyniku sondy, bo sonda przeszła na wszystkich 35 bazach.

## Co działa dobrze i należy zachować
- Jedna definicja nadkart (`overcardOutsAt`) dla warunku bloku i dla linii „Liczby”. Sonda potwierdza zgodność obu na 38 400 punktach.
- Bloki są rozstrzygane przed znacznikami `{{w:}}`, a brak wartości warunku daje błąd, nie domyślne `false`.
- Blok obejmuje zdanie razem z poprzedzającą spacją (w CJK bez spacji), więc ukrycie nie zostawia śladu w żadnym języku.
- Wyrocznia N2 ma trzy wartości i 20 000 losowań. Zabiła 23 z 25 mutantów `defendVsCbet` (z wyrocznią i strażnikami), a dwa przeżywające są równoważne.

## Decyzje dla właściciela
Brak. Znaleziska są techniczne (rola 08). D-1135 (`docs/decyzje/EE.md`) zapisuje tylko klasyfikację luk testów, do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-009,08-programista-010,08-programista-011` (tylko testy; kod i treść bez zmian).

`git status --porcelain` przed commitem (tylko nowe pliki raportu, dowodów i decyzji):
```
?? docs/decyzje/EE.md
?? docs/programista/recenzje/dowody/ee-bramka-c1-c4.txt
?? docs/programista/recenzje/dowody/ee-ci-539919af.txt
?? docs/programista/recenzje/dowody/ee-d917-brzmienie.txt
?? docs/programista/recenzje/dowody/ee-ko073-sonda.txt
?? docs/programista/recenzje/dowody/ee-mutanty-przezyle.txt
?? docs/programista/recenzje/dowody/ee-mutanty.txt
?? docs/programista/recenzje/dowody/ee-wektory-grepy.txt
?? docs/programista/recenzje/recenzja-ed-539919af.md
```
