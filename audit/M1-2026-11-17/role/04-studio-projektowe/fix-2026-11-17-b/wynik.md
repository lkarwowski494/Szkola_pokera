# Rola 04 Studio Projektowe, tryb fix, 2026-11-17 (b): M2-koordynator-napraw-009 (04-studio-projektowe-011)
Gałąź `claude/sesja-is-naprawy-p1` (bez push, scalenia i PR). Zadanie zatwierdzone: właściciel 2026-11-17 ok. 18:40 UTC „Naprawić teraz (zalecane)” (KO-134) = rekomendacja roli 04: jaśniejsza zieleń wykresu siatki tylko w motywach dark i darkHigh, light i lightHigh bez zmian. Decyzja: D-2021 (`docs/decyzje/IS.md`). Kod komponentów bez zmian (wdraża rola 08).

## 0. Środowisko (ETAP 0)
| Sprawdzenie | Wynik |
|---|---|
| System, Node, git | Linux x86_64, Node v22.23.4, gałąź `claude/sesja-is-naprawy-p1`, drzewo czyste na starcie (HEAD 5f875549); w trakcie na gałęzi pojawił się e8d2c290 koordynatora (tylko raport M2, bez związku ze zmianą) |
| Przeglądarka | Playwright 1.63.0 (globalny, przeglądarki chromium-1243), krój Inter jako przybliżenie SF Pro; skrypty uruchamiane ze scratchpadu |
| Symulator iOS | brak (Linux); sprawdzenie na telefonie: lista T-SIATKA-CIEMNY w sekcji 6 |
| Trening (D-191) | publiczne repo sklonowane tylko do odczytu do scratchpadu, @ 2d97581, odczyt 2026-11-17 |
| Biblioteka promptów | zakaz KO-133 przestrzegany: do repo trafiły tylko własne skrypty (`narzedzia/`) i wyniki (`dowody/`) |

## 1. Klasyfikacja i plan
- 04-studio-projektowe-011 (SP-04, P1, realny): rodzaj P, rozstrzygnięty przez właściciela (KO-134, opcja (a)); wartość barwy i tokeny to praca roli 04 w ramach systemu (zasada 15).
- Plan: (1) okno progów i wybór barwy rachunkiem; (2) token w `docs/design/tokeny.ts` + kopia 1:1 w `apps/mobile/src/theme/tokeny.ts` (test `motyw-08`); (3) pary w `pary`/`paryZlozone` (test `kontrast-pary-08` liczy je w CI); (4) design-spec; (5) makieta przed/po; (6) `pnpm run ci`; (7) jeden commit. Ryzyko: test `kontrast-pary-08` wiąże dziś pary siatki z `felt1` (asercja `tlo: 'felt1'`), więc istniejących par nie zmieniam (zmiana testu należy do roli 08), tylko dodaję nowe.

## 2. Specyfikacja dla roli 08
**Token:** nowy klucz palety `rangeFill` („wykres siatki zakresu”): barwa paska pierwszej grupy w `RangeGrid` (krycie 0,85 na `surface`, jak dziś) i jego próbki w legendzie.

| Motyw | `rangeFill` | `felt1` (bez zmian) | Uwagi |
|---|---|---|---|
| light | `#23694D` | `#23694D` | = `felt1`, wygląd bez zmian |
| lightHigh | `#1B5940` | `#1B5940` | = `felt1` lightHigh (zapisane jawnie, bo `lightHigh` dziedziczy z `light`) |
| dark | `#2B8F67` | `#1C5A41` | odcień `felt1` (H 156°, S 0,54), jaśniejszy (L 0,37 zamiast 0,23) |
| darkHigh | `#2B8F67` | `#174D37` | jak dark: ten sam `surface` i `onFelt`, więc to samo okno progów |

Definicja: `docs/design/tokeny.ts:23` (light), `docs/design/tokeny.ts:67` (dark), `docs/design/tokeny.ts:89` (lightHigh), `docs/design/tokeny.ts:107` (darkHigh); pary: `docs/design/tokeny.ts:160-161` i `docs/design/tokeny.ts:175-180`.

**Gdzie użyty:** tylko `RangeGrid` — tablica `colors` (`apps/mobile/src/components/RangeGrid.tsx:26`, „const colors = [tk.felt1, tk.przejsciowe.warn, tk.cardBlue];”) na pozycji 0, czyli pasek pierwszej grupy (linia 46) i próbka w legendzie (linia 66). `felt1` zostaje suknem stołu (`Stol`, `BlokLekcji`, `PanelDecyzji`, scenariusz) i nie zmienia się. Grupy 2 i 3 (`przejsciowe.warn`, `cardBlue`) bez zmian (F27b otwarte).

**Kroki roli 08 (test przed kodem):**
1. Test czerwony: render `RangeGrid` w motywie dark i darkHigh (spot z polem pełnym i częściowym): `backgroundColor` paska grupy 0 i próbki legendy = `kolory.<motyw>.rangeFill`, a kontrast złożonego paska (`zloz(pasek, 0.85, surface)`) do `surface` ≥ 3. Na obecnym kodzie czerwony z właściwego powodu (pasek `felt1`, 1,71 / 1,47). W light i lightHigh ta sama asercja przechodzi przed i po (wartość = `felt1`).
2. Zmiana: `colors[0]` = `tk.rangeFill`; komentarz przy `pelne` („grupa 0 = felt1”) na `rangeFill`; komentarz komponentu o kontraście paska.
3. Testy istniejące przełączone z `felt1` na `rangeFill`: `apps/mobile/src/theme/__tests__/kontrast-pary-08.test.ts` (opis „RangeGrid”, asercja kluczy par i test krycia — klucz „pasek siatki obok pustej części pola (rangeFill na surface)”), `apps/mobile/src/components/__tests__/RangeGrid-etykieta-kontrast-08.test.tsx` (`sukno` i `kolorGrupy[0]`). Bez osłabiania progów.
4. Po zmianie testów: usunąć z `paryZlozone` dwie pary z `tlo: 'felt1'` (`docs/design/tokeny.ts:173-174`) i zdanie „Trzy pary niżej zastępują…” w komentarzu (`docs/design/tokeny.ts:175-177`), w obu plikach 1:1 (zgoda roli 04 na tę edycję tokenów).
5. `pnpm run ci` zielone; zrzut ciemnego motywu z Expo web (`pnpm zrzuty:web`), jeśli lekcja z siatką jest w scenariuszu zrzutów.

## 3. Kontrast przed i po (własny rachunek WCAG 2.x, krycie 0,85 składane w sRGB jak `zloz`)
Wynik skryptu: `dowody/kontrast-paska.txt` (kod wyjścia 0).

| Motyw | pasek / `surface` (≥ 3) | `onFelt` / pasek pełny (≥ 4,5) | kropka `ink` / pasek (≥ 3) | próbka / `bg` (≥ 3) | próbka / `surface` (≥ 3) |
|---|---|---|---|---|---|
| light (przed = po) | 4,63 | 4,55 | 3,92 | 5,59 | 6,56 |
| lightHigh (przed = po) | 5,58 | 5,49 | 3,26 | 7,02 | 8,24 |
| dark przed → po | **1,71** → 3,20 | 8,97 → 4,80 | 7,87 → 4,21 | **2,24** → 4,52 | **1,93** → 3,89 |
| darkHigh przed → po | **1,47** → 3,20 | 10,47 → 4,80 | 9,19 → 4,21 | **1,86** → 4,52 | **1,60** → 3,89 |

- Okno progów w ciemnych motywach: luminancja złożonego paska 0,1516 (pasek/`surface` = 3) do 0,1794 (`onFelt` = 4,5); `#2B8F67` daje 0,1651, zapas względny po równo (6,7%) do obu progów. Szukanie: `dowody/szukaj-zieleni.txt` (637 kandydatów w odcieniu `felt1`, ranking po mniejszym zapasie).
- Odporność: złożony kolor ±1 na kanał (zaokrąglenie przy kryciu na GPU): najmniej 3,16 / 4,73 / 4,15.
- Wszystkie trzy warunki z polecenia spełnia jeden kolor, więc zmiana barwy etykiety lub kropki na polu pełnym nie jest potrzebna.
- Nowe znalezisko naprawione przy okazji tym samym tokenem: próbka legendy (bez krycia) miała w ciemnych motywach 1,60–2,24 < 3; po zmianie 3,89–4,52.

## 4. Dowody (makieta: siatka spotu „Button, CO (cutoff) otworzył (open) na 2,5bb”, stan po M2-006, 390 i 320 pt)
- Arkusz 4 motywów, przed (góra) i po (dół): `dowody/arkusz-390.png`; ciemne przy 320 pt: `dowody/arkusz-320.png`
- Skala szarości (SP-05), dark i darkHigh: `dowody/arkusz-390-szary.png` — przed: pola „gram” prawie nieodróżnialne od „pas”; po: wyraźnie jaśniejsze
- Zbliżenie 7 × 5 pól (pełne i częściowe, kropki): `dowody/zblizenie-przed-dark-390.png`, `dowody/zblizenie-po-dark-390.png`, `dowody/zblizenie-przed-darkHigh-390.png`, `dowody/zblizenie-po-darkHigh-390.png`
- Pełne zrzuty: `dowody/pasek-przed-dark-390.png`, `dowody/pasek-po-dark-390.png`, `dowody/pasek-przed-darkHigh-390.png`, `dowody/pasek-po-darkHigh-390.png`
- Skrypty (własne, rola 04): `narzedzia/pomiar-paska.mjs`, `narzedzia/makieta-paska.mjs`, `narzedzia/arkusz-paska.py`, `narzedzia/szukaj-zieleni.mjs`; dane spotu z bazy treści pl: `narzedzia/spot-btn-vs-co.json`

Krytyka zrzutu „po” (usterki najpierw): (1) w darkHigh linie siatki `separator` `#5A6C9C` są na jaśniejszym pasku mniej widoczne niż na `surface` — podział na pola niesie też układ etykiet, bez wpływu na odczyt; (2) zieleń paska w dark jest jaśniejsza niż sukno stołu na innych ekranach, więc obie zielenie różnią się jasnością — ten sam odcień, a siatka nie leży obok stołu; (3) przy 320 pt pasek pola częściowego jest wąski (np. A9s), ale granica do `surface` ma teraz 3,20 zamiast 1,71. Zalety: „gram”/„pas” czytelne w skali szarości, białe etykiety pól pełnych zostają, kropki widoczne na pasku i na `surface`.

## 5. Zmiany, testy, commit
- `docs/design/tokeny.ts` + `apps/mobile/src/theme/tokeny.ts` (1:1 poza nagłówkiem kopii): `rangeFill` w 4 paletach; `pary` +2; `paryZlozone` +3 (z komentarzem dla 08). Istniejące wartości i progi bez zmian.
- `docs/design/design-spec.md`: sekcja `RangeGrid` (barwa paska, tabela kontrastu), wpis w „Otwarte”.
- `docs/decyzje/IS.md`: D-2021 (analogia z Treningiem i nazwane odstępstwo).
- Testy motywu i siatki: `npx jest src/theme src/components/__tests__/RangeGrid` — 11 zestawów, 133 testy zielone (w tym `motyw-08`: kopia 1:1, `kontrast-pary-08`: nowe pary ≥ progu w 4 motywach).
- Pełne `env -u NODE_PATH pnpm run ci`: kod 0 (apps/mobile 179 zestawów, 1883 testy; content-build 936 + 1 expected fail; test:skrypty 234/234; pozostałe części zielone): `dowody/ci-koniec.txt`
- Ścieżki wrażliwe (lista w CLAUDE.md): nie dotknięte; przegląd w świeżym kontekście nie jest wymagany.
- `docs/design/kontrast-e3.md` i `docs/design/ekrany/tokeny.css` (generowane z E3) nie regenerowane — jak przy D-2020; tabela E3 jest linią bazową makiety, aktualne pary liczy test w CI.
- Commit: jeden, „[M2-koordynator-napraw-009]” (skrót w odpowiedzi końcowej).

## 6. Lista kontrolna telefonu (T-SIATKA-CIEMNY, właściciel na buildzie TestFlight po wdrożeniu roli 08)
Lekcja z siatką „Button, CO (cutoff) otworzył (open) na 2,5bb”: (1) motyw ciemny: pola „gram” wyraźnie zielone, odróżnialne od pustych pól i od tła bez wysiłku; (2) Ustawienia → Dostępność → „Zwiększ kontrast” w ciemnym motywie: to samo; (3) białe etykiety na polach pełnych (AA, AKs) czytelne, kropki klas niepewnych widoczne na zielonym i na granatowym polu; (4) próbka w legendzie widoczna; (5) motyw jasny: wygląd bez zmian względem poprzedniego buildu. Wynik negatywny w (1)–(4) → rola 04 wraca do okna progów (sekcja 3).

## 7. Otwarte
- Wdrożenie w komponencie i testach: rola 08 (sekcja 2), potem recenzent i `ci` (koordynator).
- Tokeny barw grup 2 i 3 siatek (`warn`, `cardBlue`; F27b, D-284): bez zmian; kropka `ink` na pasku `warn` w ciemnych motywach nadal 2,23 (treść pl nie używa dwóch grup; strażnik w teście treści).
- Odstępstwo od Treningu (darkHigh = dark) nazwane w D-2021.
- `narzedzia/spot-btn-vs-co.json` w poprzednim wyniku (`../fix-2026-11-17/narzedzia/`) ma 0 bajtów — makieta D-2020 nie odtworzy się z repo; tu plik z danymi jest pełny (P2, do backlogu).

## 8. Kontrola raportu
Wynik `sprawdz-raport.mjs` (kopia w scratchpadzie, poza repo) na tym pliku: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone”, kod 0.
