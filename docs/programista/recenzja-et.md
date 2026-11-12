# Audyt: Programista — Szkoła Pokera — 2026-11-12 (sesja ET, recenzja niezależna ER)
Commit: f0434ab2 (zakres 24f32fb5..f0434ab2) · Tryb: audit (recenzja) · Środowisko: Linux, Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (VoiceOver i telefon nie sprawdzone na żywo).

## Podsumowanie

Werdykt: **PRZYJĘTE Z ZASTRZEŻENIAMI.** Poprawki EP-001, EP-004, EP-005/006, EP-007, 08-EH-3, 08-EL-1, 08-EL-3 i 08-EL-4 robią to, co obiecują. Warunki kluczowe pilnują testy: 10 z 14 mutantów zabitych, 1 równoważny, 1 zabity przez inny test w CI. `pnpm run ci` na f0434ab2 we własnym kontenerze: kod 0 (`dowody/et-ci-f0434ab2.txt`). Scalenia EQ i EN są czyste: od obu rodziców różnią się tylko pliki generowane, a te `content:check` uznał za aktualne. Rachunek wektorów 08-EH-3 i EP-005 przeliczyłem ręcznie, zgadza się z kodem. Według progu wydania z CLAUDE.md nie ma znalezisk KRYTYCZNYCH ani WYSOKICH. Zostają dwie luki w testach (ŚREDNIE/NISKIE): przeżyły je mutanty M12 i M8.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P2 (ŚREDNIE) | D | Etykieta czytnika w pasku ocen pick-hand (EP-004) bez testu; mutant M12 przeżył | otwarte |
| 08-programista-002 | P2 (NISKIE) | D | Granica kickera ≥ Q w turn-bet (08-EL-1) nieprzypięta testem; mutant M8 (próg K) przeżył | otwarte |

## Linia bazowa i założenia

Raportu autora (`docs/decyzje/ER.md`, stan ER) nie czytałem przed własną oceną kodu. Do tabeli decyzji ER zajrzałem dopiero po mutantach, żeby sprawdzić D-1264/D-1265. Linia bazowa z kodu: ścieżki zmienione w zakresie to czyste funkcje domeny (`defendVsCbet`, gałąź turn-bet w `tryVariant`), mapowanie wyjaśnień w `bloki()` (mobile), etykiety czytnika (PasekStrategii, PasekOcenAkcji), schemat i bramka szablonów pick-hand, kontrola treści w CI oraz pliki generowane po scaleniu.

Wymiary pokrycia:
- Ścieżki zapisu: zakres nie zmienia zapisu danych użytkownika. Zmiana enumu akcji w szablonie (`best-hand`/`other-hand`) dotyczy treści, nie historii. Odpowiedzi nadal mają postać `hand-a`/`hand-b` (`packages/poker-core/src/scenario-gen.ts:742`). Sprawdzone, brak.
- Obsługa błędów: brak wyjaśnienia dla klucza roli rzuca błąd z identyfikatorem szablonu (`apps/mobile/src/features/scenariusz/wariant.ts:356-358`), zamiast pokazać pusty tekst. W porządku.
- Typy na granicach: `(x.action as string) === klucz` w `apps/mobile/src/features/scenariusz/wariant.ts:357` porównuje enum szablonu z napisem. To dane z bazy treści sparsowane schematem zod, a asercja tylko poszerza typ. Bez skutku, styl.
- System projektowy: zmiany UI dotyczą tylko etykiet czytnika i tekstu ze znakami kolorów (`zapisKart`). Nowych kolorów i komponentów nie ma.
- i18n: nazwy kart z `card.*` (`nazwaKarty`). `i18n:kod`: 0 błędów.
- Wydajność: overkarta liczy `Math.max` po 3 kartach. Bez znaczenia.
- Testy na właściwym poziomie: logika w Node (vitest), ekran w RNTL. W porządku.
- Dostępność: patrz 08-programista-001 i „Do sprawdzenia”.
- Liczby konfiguracyjne: `TURN_BET_KICKER_MIN` jako stała z ID decyzji (`packages/poker-core/src/scenario-gen.ts:1002`). Próg botów `HOLDING_LIMITS.strongKickerMin` zostaje osobno, celowo (D-1265).

Soczewki: recenzent szukający ścieżki bez testu (mutanty M1–M14), użytkownik VoiceOver (EP-004), programista czytający moduł pierwszy raz (komentarze progów, EP-007), uczący się (rachunek wektorów). Wzorzec: rachunek szczebla 1 ADR-24 i źródło D-1258 (Upswing Tip 4, przeczytane i zapisane przez EQ; cytatu nie odczytywałem ponownie, bo kontrola `el-kontrola.mjs` pilnuje go w treści). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)

| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (defendVsCbet, turn-bet, pick-hand, GENERATOR_WERSJA) | tak | lektura diffu, mutanty M1–M9 (`dowody/et/mutanty-wynik.txt`) |
| `packages/content-schema/src/index.ts`, `tools/content-build/src/scenariusze.ts` (pick-hand) | tak | lektura, testy bramki w CI |
| `apps/mobile/src/features/scenariusz/wariant.ts`, `EkranScenariusza.tsx`, `komponenty.tsx`, `components/PasekStrategii.tsx`, `features/stol/uklad.ts` | tak | lektura, mutanty M10–M12 |
| Testy zmienione w zakresie (poker-core, content-build, mobile) | tak | lektura diffu |
| `docs/tresci/narzedzia/el-kontrola.mjs`, krok `tresci:el-kontrola` | tak | lektura, mutanty M13–M14 |
| Treść SC-06/32/33 w 12 językach (`equityMarginMin`) | tak | odczyt yaml: 36/36 plików = 0.02 |
| Scalenia cb4f541d (EQ) i bd9a5159 (EN) | tak | porównanie plików z obu rodzicami (`dowody/et/scalenia.txt`) |
| `pnpm run ci` | tak, kod 0 | `dowody/et-ci-f0434ab2.txt` |
| VoiceOver na urządzeniu, wygląd ekranu pick-hand | nie (brak macOS/telefonu) | — |
| 08-programista-002/003 recenzji EP (remis w SDV, brudne outy) | nie: poza zakresem polecenia ET | — |

## Kontrola dowodów i sekretów

`node sprawdz-raport.mjs docs/programista/recenzja-et.md . docs/programista --rola 08-programista` → wynik na końcu tej sekcji (kopia skryptu w scratchpadzie, poza repo).

Wynik: OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista (kod 0).

## Stosowalność listy kontrolnej

| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy | ok: nowe warunki mają testy z wektorami (`packages/poker-core/test/scenario-dx.test.ts:84-91`, `packages/poker-core/test/ei-turn-bet-zywe-outy.test.ts:39-58`); granica Q: 08-programista-002 |
| DEV-02 | dotyczy | 7/7 commitów zmieniających zachowanie ma test w tym samym commicie (80014348, 76224158, e5ba4e3e, b389c5ea, a9e8fade, 02e02553, ce5006a8); edd80ec5 to konfiguracja CI (pominięta wg DEV-02), z czerwienią przed; czerwień przed kodem: `docs/programista/dowody/er-el3-czerwone.txt`, `docs/tresci/dowody/eq-ek-wektory.txt` |
| DEV-03 | dotyczy | ok: w diffie testów brak `.skip`/`.only`; wektory pick-hand zmienione z wyliczanych z wyroczni na wpisane (zaostrzenie, EP-006) |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 |
| DEV-05, DEV-06 | nie dotyczy: zakres nie zmienia zapisu danych ani migracji | — |
| DEV-07 | dotyczy | ok: `h.kicker ?? -1` w turn-bet: `null` tylko przy parze kieszonkowej, wtedy decyduje `overpair`; wartość -1 nie przepuszcza wariantu |
| DEV-08 | nie dotyczy: bez dat | — |
| DEV-09 | dotyczy | ok (asercja poszerzająca w `apps/mobile/src/features/scenariusz/wariant.ts:357`, styl) |
| DEV-10 | dotyczy | ok: brak wyjaśnienia → błąd z ID szablonu |
| DEV-11 | dotyczy | ok: bez nowych wartości wyglądu |
| DEV-12 | dotyczy | ok dla przycisków i paska ocen; zdanie werdyktu: „Do sprawdzenia” |
| DEV-13 | dotyczy | ok: `TURN_BET_KICKER_MIN` z ID decyzji; `BACKDOOR_HIGH_MIN` usunięta bez sierot (grep: 0 trafień) |
| DEV-14 | dotyczy | ok: diff bez plików kluczy i sekretów |
| DEV-15 | nie dotyczy: bez nasłuchów i timerów w zakresie | — |
| DEV-16 | nie dotyczy: indeksy rang, bez jednostek | — |

## Znaleziska (szczegóły)

### 08-programista-001 · Etykieta czytnika w pasku ocen pick-hand bez testu (mutant M12 przeżył)
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚREDNIE wg progu CLAUDE.md: luka w teście, zachowanie dziś poprawne)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:96` składa listę dla czytnika z `etykiety?.[a] ?? nazwy[a]`. Mutant M12 (powrót do `nazwy[a]`, czyli „A♥ 4♥” zamiast nazw kart) przeżył `ek-pick-hand-ekran` (`dowody/et/mutanty-wynik.txt`). Test EP-004 sprawdza etykiety przycisków (M11 zabity), ale nie etykietę paska ocen.
- Mechanizm: etykieta czytnika przekazywana w dwóch miejscach (PasekStrategii, PasekOcenAkcji), test pilnuje tylko pierwszego. Grep `etykiety` w testach mobile: 0 trafień dla paska ocen.
- Powraca: nie (pochodna EP 08-programista-004) → trwała kontrola: test RNTL niżej
- Wzorzec lub źródło: zasada programisty 2 (test, który potrafi paść); A04-10 (D-284)
- Kroki w aplikacji: punkt pick-hand → ocena → VoiceOver na pasku ocen. Dziś czyta nazwy kart; regresja przeszłaby niezauważona.
- Opcje: (a) asercja w `ek-pick-hand-ekran`: `accessibilityLabel` paska ocen zawiera `nazwaKarty(...)` obu rąk i nie zawiera „♥” — tani test; (b) bez zmian — ryzyko cichej regresji. Rekomendacja: (a).
- Test akceptacyjny: mutant M12 zabity.
- Status: otwarte

### 08-programista-002 · Granica kickera ≥ Q w turn-bet nieprzypięta testem (mutant M8 przeżył)
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NISKIE: zachowanie dziś zgodne z D-1256)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:1002` „const TURN_BET_KICKER_MIN = 10”. Test `packages/poker-core/test/ei-turn-bet-zywe-outy.test.ts:56` wymaga tylko, żeby istniał jakiś wariant top z kickerem ≥ Q. Mutant M8 (próg K) przeżył, bo warianty z kickerem K/A dalej istnieją. M6 (J), M7 (T) i M9 (bez warunku) zabite.
- Mechanizm: test ograniczenia sprawdza dolną stronę progu, a górnej (Q dopuszczona) już nie. Wektor brzegowy z kickerem Q nie istnieje.
- Powraca: nie → trwała kontrola: test niżej
- Wzorzec lub źródło: D-1256 („kicker ma rangę ≥ Q (dama, król, as)”), zasada „przypadki: granice (równo na progu)”
- Kroki w aplikacji: SC turn-bet. Podniesienie progu do K przypadkiem tylko zawęża pulę, nie daje błędnej odpowiedzi.
- Opcje: (a) asercja, że w ziarnach 1–3000 występuje wariant top z kickerem dokładnie Q; (b) test jednostkowy predykatu wydzielonego z `tryVariant` — większa zmiana. Rekomendacja: (a).
- Test akceptacyjny: mutant M8 zabity.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)

- EP-004, reszta tekstów: zdanie werdyktu (`scenario.verdict.yours` z `fraza`, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:264`) i nagłówki bloków „dlaczego” (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:267`) pokazują karty jako „A♥ 4♥”. Czytnik dostaje tam symbole, a nie nazwy z `card.*`. Test akceptacyjny EP-004 (przyciski, brak surowego „Ah”) jest spełniony. Jak VoiceOver czyta „♥” w 12 językach: [DO USTALENIA], do listy kontrolnej testu na telefonie.
- Mutant M4 (`>` → `>=` w overkarcie) przeżył, ale jest równoważny: karta gracza równa najwyższej karcie flopu to para, a para zwraca `call` wcześniej (`made`, `packages/poker-core/src/scenario-gen.ts:1061`). Nie jest to znalezisko.

## Co działa dobrze i należy zachować

- 08-EH-3: jeden warunek `overkarta` dla backdoora koloru i strita (`packages/poker-core/src/scenario-gen.ts:1065`). Przy braku overkarty wynik to `null`, a nie `fold`, zgodnie z D-1258. Wyrocznia testu przeliczona tak samo. Mutanty M1, M2, M3 i M5 zabite. Rachunek wektorów sprawdzony ręcznie: J♠T♠ na K♠8♦4♣ to backdoor koloru (J♠ T♠ K♠) i strita (8-T-J) bez overkarty → null; Q♥4♥ na T♣9♥2♠ daje backdoor koloru i overkartę Q → call; J♦T♣ na Q♥8♣2♠ to gutshot 8-T-J-Q (9 kończy) → call; 7♣2♦ na K♥9♠4♣ nie ma trzech kart koloru ani trzech rang w oknie pięciu → fold.
- EP-005: wektor SC-23b na A♦8♠6♥3♦2♣ przeliczony: sprawdzające 3 (AA) + 6×4 (KK, QQ, JJ, TT) + 3 (AKs) + 9 (AKo) + 3 (AQs) = 42; T♠ blokuje 3 kombinacje TT → 39; pasujące równe (każda ręka blokuje po jednej: 76s albo T9s) → granica „nie mniej pasujących” przypięta wpisanymi liczbami.
- EP-001: klucz roli liczony z `d.correct` w jednym miejscu (`apps/mobile/src/features/scenariusz/wariant.ts:356`). Test obejmuje obie losowe strony (M10 zabity). Bramka odrzuca stare `hand-a`/`hand-b` w szablonie.
- 08-EL-3: `tresci:el-kontrola` realnie łapie braki w pl i en (M14 zabity, czerwień przed: `docs/programista/dowody/er-el3-czerwone.txt`). Brak `equityMarginMin` w pozostałych 10 językach łapie test struktury przekładów `tools/content-build/test/szablony-bs.test.ts:112` (M13: test dla de pada, wynik w dowodach). Razem kontrola jest pełna.
- 08-EL-4: wyrocznia marginesu equity w `szablony-du.test.ts` liczona niezależnie od generatora. GENERATOR_WERSJA 5 i wzorzec ŚR-001 zmienione razem, odciski w `generator-odciski.json` przeliczone (CI zielone).
- Scalenia: w obu scaleniach od obu rodziców różnią się tylko `assets/content/tresc-*.db` i `tresc.generated.ts`. Zmiany strony 2 spoza plików generowanych są w wyniku w całości (`dowody/et/scalenia.txt`).

## Decyzje dla właściciela

Brak: oba znaleziska to luki w testach do naprawy przez rolę 08 bez decyzji produktowej. Decyzje sesji: `docs/decyzje/ET.md` (D-1275, D-1276), do weta.

## Proponowane polecenie naprawy

`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002`
