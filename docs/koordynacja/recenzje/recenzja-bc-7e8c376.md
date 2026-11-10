# Recenzja sesji BC: nazwy pozycji przy stole (KO-028/KO-032, D-520)

Data: 2026-11-10. Recenzent: niezależny, świeży kontekst (nie autor). Zakres: `git diff fbb2d15 7e8c376` (fef9d57, 2b2274f, 789b2ce, 7e8c376; 114 plików). Worktree recenzji: 7e8c376 (detached), próbne scalenie z 57a83bf w osobnym worktree, nic nie zacommitowane.

## Werdykt

**Przyjąć.** Znalezisk KRYT: 0, WYS: 0, ŚR: 2, NIS: 6. Warunek scalenia z gałęzią roboczą: w tym samym scaleniu dostosować test `pozycja-nazwa-az` (punkt 6), inaczej `pnpm run ci` będzie czerwone (3 testy). ŚR-1 do backlogu z wersją.

## Co potwierdziłem samodzielnie

- **Zamiany (pkt 2).** `git grep -o '{{t:utg}}' fbb2d15 -- content` = 328; na 7e8c376 = 0. Każdy z 56 plików commitu fef9d57 jest równy plikowi z bazy po `replace('{{t:utg}}','{{t:utg|UTG}}')` (skrypt Pythona, 0 odstępstw), więc żadna zamiana nie trafiła „obok”. Próbka 36 linii (po 3 na język + spots) przejrzana: sens bez zmian. Liczba 328 autora zgodna (325 + 3 w `content/ranges/spots.yaml`).
- **Render (pkt 2).** Skrypt autora `docs/tresci/dowody-bc/narzedzia/porownaj-render.ts` uruchomiony na `git archive` obu rewizji: 168 962 jednostek, 0 różnic, kod 0. Nie jest tautologiczny (kompiluje dwa różne katalogi treści), ale porównuje tylko liście tekstowe i 12 języków. Mój własny skrypt (pełny `JSON.stringify` każdego pola `compileContent`, 15 języków, w tym sv, ru, tr): różnią się wyłącznie pola `terms` (tylko wpis `utg`) i `hash`; kod 0.
- **Dlaczego pl się nie zmienia.** `packages/content-schema/src/terms.ts:47-55` (`termGloss`): przed zmianą forma = `pl` „UTG” → „UTG (under the gun)”; po zmianie forma „UTG” = `abbr` → także „UTG (under the gun)”.
- **Gołe znaczniki po zmianie.** W `content/`: 0. Poza treścią: `table.tableSizeHint9` w 10 plikach `apps/mobile/src/i18n/locales/*.json` (np. `en.json:371`, `pl.json:391`); klucz nie ma użycia w kodzie (`grep -rn tableSizeHint9 apps packages tools` w `*.ts/*.tsx`: 0 trafień), więc użytkownik tego nie widzi. Gołych `{{t:hijack}}`/`{{t:cutoff}}` w ja i zh-Hant (treść i locales): 0.
- **Test KO-032 (pkt 1).** Zmieniony jeden test: `tools/content-build/test/jezyk-tresci-09.test.ts:64-66` („nakładka spots.yaml…”). Było: jedna asercja `toContain('UTG, nobody has entered the pot yet')` na gołym `{{t:utg}}`. Jest: dwie wartości w `arrayContaining` — jawna forma → „UTG, nobody…”, goły znacznik → „under the gun at a 9-player table, nobody…”. Pozostałe asercje testu (pl bez „nobody”, zmiana `path` przerywa) bez zmian. To dostosowanie do zapisanego wymagania (D-520, `docs/decyzje.md:333`), nie osłabienie: test sprawdza teraz więcej (dwa tytuły zamiast jednego). Mutacje (cofnięte, drzewo czyste):
  - M1: `content/terms.yaml` utg z powrotem `pl: UTG` bez `abbr` → test czerwony (kod 1; „UTG at a 9-player table…” zamiast „under the gun at…”).
  - M3: `renderTermsBare` zwraca skrót, gdy termin ma `abbr` → test czerwony (kod 1).
  - M2: `return nazwa ?? form ?? …` (nazwa przed formą) → ten test zielony (en nie ma pliku nazw), ale pakiet łapie: `terms-nazwy-09.test.ts` czerwony (kod 1, 1 failed / 179 passed).
- **Źródła (pkt 3).** Pobrane `curl` (wszystkie HTTP 200) i sprawdzone `find` po zdjęciu znaczników — wszystkie cytaty z komentarzy `terms-nazwy.yaml` znalezione dosłownie: PokerStrategy de („Under the Gun (UTG) ist der erste Spieler, der preflop…”, „…mit neun oder zehn Spielern ist UTG der erste Spieler links vom Big Blind”), es, fr, it, pt; pokerqz ja (UTG, HJ, CO), ko (nagłówek „언더 더 건 (UTG)”), zh-TW (nagłówki „槍口位（UTG）”, „Hijack（HJ）”, „截止位”); pokerfans zh_TW („UTG(under the gun)（槍口位）”, „Cut off（關煞位）… 關煞位在按鈕位的右邊”); GGPoker vi; GTO Wizard i Wikipedia (pole `source` terminu). Sprawdzonych cytatów: 16 (wymagane 3).
- **pl „pierwsza pozycja po blindach” (pkt 3).** Prawdziwe dla 6 i 9 graczy: UTG to miejsce bezpośrednio na lewo od BB w obu (definicja terminu `content/terms.yaml:398`; GTO Wizard „The position to the immediate left of the Big Blind”; PokerStrategy de dla 9–10 graczy jw.; w aplikacji 9-max: UTG, UTG+1, UTG+2 przed LJ). Zgodne z M3 pl (`content/pl/lessons/m3-l1-pozycja.md:61` „Pierwszy preflop”).
- **`apps/mobile` i `tools/content-build` (pkt 4).** 37 plików `apps/mobile`: 35 baz `assets/content/tresc-<hash>-<język>.db` (zmiana nazwy 6ceb6ae2c7 → 1b0700471e) i 2 pliki generowane (`terms.generated.ts`, `tresc.generated.ts`). `pnpm content:build` na 7e8c376 odtwarza je bez różnic (`git status --short`: 0 linii), więc nic nie jest ręczne. `tools/content-build`: tylko test z pkt 1 (kod budowania bez zmian). Identyfikatory: lista wszystkich pól `id` w `compileContent` identyczna przed i po (784 w każdym z 15 języków), liczba terminów 162 = 162, klucz `utg` bez zmian; klucze zadań słownictwa to `${d.id}#${n}` (`apps/mobile/src/features/drills/vocab.ts`), bez nazwy terminu. Nie dotknięto `packages/postep`, `packages/domena`, `apps/mobile/src/data/` poza generowanymi, `src/platform`, `.github/workflows`, `app.json`, `eas.json`.
- **Tożsamość commitów.** 4/4: `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>`.

## Znaleziska

**ŚR-1. Polska nazwa „pierwsza pozycja po blindach” jest odpytywana, choć lekcja jej nie wprowadza i nie ma źródła.** `content/terms.yaml:396` (nazwa ułożona przez autora, D-520 pisze wprost: „polskiej nazwy w przeczytanym źródle brak”). Lekcja M3 mówi tylko „UTG (under the gun)” (`content/pl/lessons/m3-l1-pozycja.md:17,61,66`). Tymczasem `vocabModes` dla `utg` w pl daje teraz `['pl-en','en-pl','abbr','def']` (uruchomione na wyniku scalenia), czyli ćwiczenie słownictwa pyta „under the gun → pierwsza pozycja po blindach” i odwrotnie; słowniczek pl pokazuje hasło pod „P”. Do tego w trybie `def` definicja („Pierwszy gracz do działania przed flopem… na lewo od dużego blinda”) prawie podaje odpowiedź „pierwsza pozycja po blindach (under the gun, UTG)”, a `termDefRevealsName` tego nie łapie (dopasowanie dosłowne, wynik `false`). Narusza zasadę „pojęcie zdefiniowane przed pierwszym użyciem / jedna nazwa na pojęcie” (CLAUDE.md). Autor ma to jako NIS-3 w backlogu; oceniam ŚR. Propozycja: dopisać opis w tabeli pozycji M3 (12 języków nie trzeba, nazwa jest tylko pl) albo wyłączyć `utg` z kierunków pl-en/en-pl. Nie blokuje (nie jest fałszywym twierdzeniem).

**ŚR-2. Po scaleniu z gałęzią roboczą test `pozycja-nazwa-az` jest czerwony (3 testy).** Szczegóły i nowe wartości w punkcie 6. Autor to zapowiedział (D-520, `stan.md`), ale to warunek scalenia, nie backlog.

**NIS-1. Zmiana zachowania ćwiczeń nieopisana w dowodach.** Dodanie `abbr: UTG` włącza dla `utg` nowy kierunek „skrót → nazwa” we wszystkich językach (en: było `['def']`, jest `['abbr','def']`; `vocab.ts:63,69`). `bylo-jest.md` opisuje tylko linię stołu i lekcje. Zmiana sensowna, ale powinna być w D-520 i na liście telefonu dla języka innego niż pl.

**NIS-2. `table.tableSizeHint9` niespójny.** 10 języków ma goły `{{t:utg}}` (render „under the gun, UTG+1 and UTG+2”), de i ko formę. Dziś martwy klucz; przy pierwszym użyciu da zły tekst. Zamienić na `{{t:utg|UTG}}` (sesja kodu).

**NIS-3. Skrypt porównania renderu.** `docs/tresci/dowody-bc/narzedzia/porownaj-render.ts:22`: kolumna „wpis utg (po)” wypisuje `pl` terminu dla każdego języka, więc w `porownanie-renderu.md:4-15` stoi „pierwsza pozycja po blindach” także przy en…zh-Hant (mylące, nazwy języków nie są tu sprawdzane). Porównuje tylko liście tekstowe i 12 z 35 języków (mój pełny test potwierdza wynik).

**NIS-4. zh-Hant: mieszanka.** `content/zh-Hant/terms-nazwy.yaml:46-48`: 槍口位, „Hijack”, 關煞位 — HJ po angielsku między dwiema nazwami chińskimi. Źródło (pokerqz zh-TW) rzeczywiście podaje tylko „Hijack（HJ）”; czy uzus tajwański ma nazwę chińską (np. 劫位) — niesprawdzone, oznaczyć `[DO USTALENIA]`.

**NIS-5. Komunikat commitu fef9d57 podaje 345 znaczników** (faktycznie 328); odnotowane w `stan.md:3`, historii nie da się poprawić bez przepisywania.

**NIS-6. Rejestr na Dysku.** D-520 zmienia tabelę terminologii (dokument 13) i wyjątek D-319; przeniesienie jest tylko w „Otwarte” (`stan.md:8`). CLAUDE.md wymaga zapisu decyzji merytorycznej w dokumentach 12/13.

## Punkt 6: próbne scalenie z `claude/sleepy-brahmagupta-2065nu` (57a83bf)

`git merge --no-commit --no-ff 7e8c376` na 57a83bf: **0 konfliktów** (kod 0; automatycznie scalone tylko `docs/decyzje.md`). Baza wspólna: fbb2d15. Po `pnpm content:build` na wyniku scalenia drzewo bez różnic względem scalenia (bazy z BC są aktualne). Pełny `jest` aplikacji na wyniku: 1 zestaw czerwony, 3 testy failed / 691 passed — tylko `apps/mobile/src/features/stol/__tests__/pozycja-nazwa-az.test.ts`.

Asercje do dostosowania (plik jw.; jest zatrzymuje się na pierwszej w teście, wypisuję wszystkie, które padną — wartości „jest” z uruchomienia `nazwaPozycji`/`opisKart` na wyniku scalenia):

| Linia | Było (oczekiwane) | Jest (nowa wartość) |
|---|---|---|
| :33 | `opisKart(UTG, pl)` = „Twoja pozycja (position): UTG (under the gun).” | „Twoja pozycja (position): pierwsza pozycja po blindach (under the gun, UTG).” |
| :59 | `nazwaPozycji('UTG', de)` = „UTG” | „Under the Gun (UTG)” |
| :60 | `nazwaPozycji('UTG', en)` = „UTG” | „under the gun (UTG)” |
| :61 | `nazwaPozycji('HJ', ja)` = „HJ” | „ハイジャック (HJ)” |
| :62 | `nazwaPozycji('CO', zh-Hant)` = „CO” | „關煞位 (CO)” |
| :67 fr, pt, pt-BR | „UTG” | „under the gun (UTG)” |
| :67 ja | „UTG” | „アンダーザガン (UTG)” |
| :67 zh-Hant | „UTG” | „槍口位 (UTG)” |
| :68 (5 języków) | `…includes('(UTG)')` = false | true |

Uwagi do dostosowania: (a) testy :58-63 („nazwa = skrót nie dubluje”) i :65-70 („brak nazwy → sam skrót”) tracą prawdziwe przykłady w 12 językach — żeby nie stracić pokrycia reguły, przenieść je na sztuczny `t` (jak w :78-82: `t = k => 'UTG'` → „UTG”, nie „UTG (UTG)”), a nie tylko podmienić wartości; (b) lista `BRAKI` (:15) jest nieaktualna (wpływa tylko na nazwy testów) — opróżnić; (c) testy parametryczne :36-47 (72 przypadki) przechodzą bez zmian. Pozostałe linie stołu (HJ/CO w 10 językach, BTN/SB/BB) zgodne z tabelą `bylo-jest.md`; 16 zmienionych komórek potwierdzone uruchomieniem.

## Uruchomione komendy i kody wyjścia

| Komenda (worktree 7e8c376, o ile nie podano inaczej) | Kod |
|---|---|
| `pnpm install --frozen-lockfile` | 0 |
| `pnpm content:build`; potem `git status --short` (0 linii) | 0 |
| `pnpm content:check` („Treść aktualna (35 baz)”) | 0 |
| `pnpm test` w `tools/content-build` (17 plików, 180 testów) | 0 |
| `npx vitest run test/jezyk-tresci-09.test.ts -t nakładka.spots` z mutacją M1 / M2 / M3 | 1 / 0 / 1 |
| `pnpm test` w `tools/content-build` z mutacją M2 | 1 |
| `npx tsx docs/tresci/dowody-bc/narzedzia/porownaj-render.ts <fbb2d15> <7e8c376>` | 0 |
| własny skrypt porównania pełnego JSON + ID (15 języków) | 0 |
| `pnpm run ci` (pełne, 4 min 29 s) | 0 |
| `curl` 16 adresów źródeł | HTTP 200 ×16 |
| scalenie: `git merge --no-commit --no-ff 7e8c376` na 57a83bf | 0 (bez konfliktów) |
| scalenie: `pnpm content:build` (drzewo bez różnic) | 0 |
| scalenie: `npx jest src/features/stol/__tests__/pozycja-nazwa-az.test.ts` (3 failed / 76 passed) | 1 |
| scalenie: `npx jest` (cała aplikacja; 3 failed / 691 passed, 1 z 91 zestawów) | 1 |

## Czego nie sprawdziłem

- Wygląd na telefonie (linia pl ma 76 znaków, największy rozmiar tekstu, czytnik ekranu) — lista `docs/tresci/dowody-bc/lista-telefonu.md` dla właściciela.
- Poprawność językowa nazw w ko, ja, zh-Hant, vi poza zgodnością ze źródłem (nie jestem rodzimym użytkownikiem); czy istnieje chińska nazwa HJ (NIS-4).
- Odwołanie do Treningu (`docs/16-jezyki-i-marka.md:27`) z D-520 — nie otwierałem repo Treningu.
- Zawartość baz `.db` bajt po bajcie (sprawdziłem, że przebudowa odtwarza je bez różnic, oraz wynik `compileContent`).
- E2E i `pnpm run ci` na wyniku scalenia w całości (uruchomiony tylko `content:build` i `jest` aplikacji).
- Dokumenty 12/13 na Dysku.
