# Recenzja kontrastu: znak „•” RangeGrid / „mieszana” PaintGrid (commity a82bc91e, d56506fe, 4faf3b0a)

Skrypt: k.mjs (WCAG 2.x, sRGB, składanie z kryciem 0,85 zaokrąglone do 8 bit), wynik surowy: tabela.tsv.

## 1. Tła i kontrast znaku (kolor po zmianie)
RangeGrid.tsx:15 colors=[felt1, przejsciowe.warn, cardBlue]; :34 paski od lewej, opacity 0.85 na surface (:30); znak :42 top/right (:68).
Pod prawym górnym rogiem jest: ostatni pasek, jeśli suma freqs ≈ 1 (grupa 1, 2 lub 3); inaczej surface (reszta = pas).
PaintGrid.tsx: znak „•” tylko dla result 'mixed' (:110); tło :104 primaryBg (pomalowane) albo przejsciowe.feltSoft; kolor = labelColor (:112) = primaryInk / ink.

| pole | light | dark | lightHigh | darkHigh |
|---|---|---|---|---|
| RG grupa 1 felt1@0,85/surface, ink | 3.92 | 7.87 | 3.26 | 9.19 |
| RG grupa 2 warn@0,85/surface, ink | 4.23 | **2.23** | 4.23 | **2.23** |
| RG grupa 3 cardBlue@0,85/surface, ink | 3.62 | 6.95 | 3.62 | 6.95 |
| RG puste surface, ink | 18.17 | 13.48 | 18.17 | 13.48 |
| PG mixed pomalowane primaryInk/primaryBg | 17.86 | 15.67 | 17.86 | 15.67 |
| PG mixed niepomalowane ink/feltSoft | 15.38 | 12.35 | 15.38 | 12.35 |
| minimum (osiągalne dziś: grupa 1, puste, PG) | 3.92 | 7.87 | 3.26 | 9.19 |
| minimum (wszystkie ścieżki kodu) | 3.62 | 2.23 | 3.26 | 2.23 |

Przed zmianą (muted): RG felt 1.60/4.79/2.01/7.75; PG primaryBg 2.46/1.64/1.62/1.19 — poprawa potwierdzona.
Dziś żaden spot (content/*/ranges/spots.yaml, wszystkie języki, parsowanie yaml z merge) nie ma >1 grupy, więc grupa 2/3 jest ścieżką utajoną; schemat (packages/content-schema/src/index.ts:389 z.record bez limitu) dopuszcza więcej grup.

## 2. Test kontrast-pary-08.test.ts
`cd apps/mobile && env -u NODE_PATH npx jest src/theme/__tests__/kontrast-pary-08.test.ts src/theme/__tests__/motyw-08.test.ts src/components/__tests__/znak-kolor-etykiety-08.test.tsx` → 3 suity, 33 testy PASS, exit 0.
Pokrycie: felt1@0,85/surface (ink), ink/surface, primaryInk/primaryBg, ink/feltSoft — zgodne z polami osiągalnymi dziś. NIE obejmuje grupy 2 (warn) ani 3 (cardBlue); tło pary jest wpisane w tokeny.ts, a nie powiązane z tablicą `colors` w RangeGrid (sprawdzane jest tylko `opacity: 0.85`, test :52-55).
Mutacje (worktree w scratchpadzie, usunięty):
- M1 para paryZlozone fg 'ink'→'muted' (oba pliki tokeny.ts): 2 testy FAIL (light 1.60, lightHigh 2.01), exit 1 — test potrafi paść.
- M2 RangeGrid i PaintGrid znak z powrotem tk.muted: 3 testy FAIL w znak-kolor-etykiety-08, exit 1.
- M3 RangeGrid colors=[warn, felt1, cardBlue] (dark: znak 2.23:1 na każdym polu w zakresie): 24/24 PASS, exit 0 — mutant przeżywa.

## 3. Kopia 1:1 tokenów
`diff apps/mobile/src/theme/tokeny.ts docs/design/tokeny.ts` — różni się tylko linia 3 (komentarz nagłówka, sprzed zmiany); motyw-08.test.ts:11 toEqual PASS. Diff 9892d419..4faf3b0a: usunięte linie tylko `const przejscioweJasne/Ciemne` → `export const` (tokens.ts:23,32), wartości bez zmian; dodano tylko `paryZlozone`. Żadna wartość koloru ani próg nie zmienione.

## 4. Etykieta ręki (8 pt, 600) na polu w zakresie, próg 4,5:1 (1.4.3) — poza zakresem zmiany
light 3.92, lightHigh 3.26 na felt1 → NIE spełnia (osiągalne dziś w każdej lekcji z siatką). dark 7.87, darkHigh 9.19 OK. Ścieżki utajone: warn 4.23/2.23, cardBlue 3.62/6.95 — też poniżej 4,5. lightHigh gorszy niż light (ciemniejszy felt1 przy ciemnym ink).

## Znaleziska
- P1 (poza zakresem zmiany, istniejące): etykieta ręki ink na polu w zakresie w light 3.92:1 i lightHigh 3.26:1 < 4,5:1 (tekst 8 pt). Scenariusz: lekcja z siatką zakresu, iOS jasny, z „Zwiększ kontrast” lub bez → etykiety rąk w zakresie poniżej progu. Do decyzji/backlogu jako bariera dostępności (próg wydania).
- P2: grupa 2 RangeGrid (przejsciowe.warn) w dark/darkHigh: znak i etykieta ink 2.23:1. Scenariusz: spot z 2 grupami (schemat pozwala), klasa niepewna z freqs sumującymi się do 1 → kropka na żółtym pasku 2.23:1. Dziś nieosiągalne (wszystkie spoty mają 1 grupę).
- P2: test nie wiąże tła pary z `colors` w RangeGrid (mutant M3 przeżywa) i nie mierzy grup 2/3; zmiana koloru grupy w komponencie przejdzie CI bez wykrycia.
