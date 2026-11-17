# Recenzja dostępności 006 (kontrast etykiety 8 pt), diff 06e471ec..c946948d

Skrypty: licz.mts (kontrasty + statystyki treści pl, baza tresc-d0b124291f-pl.db), c.mjs (przedziały brzegowe). Wzory WCAG 2.x, sukno = felt1·0,85 na surface (zaokrąglenie 8 bit).

## 1. RangeGrid: reguła `freqs[0][i] >= 0.85 ? onFelt : ink` (RangeGrid.tsx:35)
| motyw | ink/surface | onFelt/sukno | ink/sukno | onFelt/surface | sukno |
|---|---|---|---|---|---|
| light | 18.17 | 4.55 | **3.92** | **1.02** | #448068 |
| dark | 13.48 | 8.97 | 7.87 | 15.36 | #1b5142 |
| lightHigh | 18.17 | 5.49 | **3.26** | **1.02** | #3d725d |
| darkHigh | 13.48 | 10.47 | 9.19 | 15.36 | #16463a |

- Pole puste (ink/surface): min 13.48. Pole pełne ≥0,85 (onFelt/sukno): min 4.55 (light) — OK.
- Pole częściowe (ink, tekst na obu tłach): min do sukna 3.26 (lightHigh), 3.92 (light) < 4,5. Ciemne motywy: oba tła ≥ 7.87 — OK.
- Treść pl: 34 spoty, 5746 pól, wszystkie spoty 1 grupa. f=0: 3039; 0<f≤0,15: 203; 0,15<f<0,85: **146** (27 spotów, 51 klas) — w light/lightHigh < 4,5 (3.92/3.26); f≥0,85: 2358 (z tego 296 z 0,85≤f<1).
- Werdykt 1: wymaganie spełnione w dark/darkHigh; w light/lightHigh NIE dla 146 pól pośrednich (kod sam to nazywa „otwarte dla roli 04”). Poprawa względem stanu sprzed zmiany (wtedy też 2358 pól pełnych miało 3.92/3.26).

## 2. PaintGrid (labelColor × cellStyle)
| stan | light | dark | lightHigh | darkHigh |
|---|---|---|---|---|
| niepomalowane/none ink/surface | 18.17 | 13.48 | 18.17 | 13.48 |
| pomalowane, mixed+pomalowane primaryInk/primaryBg | 17.86 | 15.67 | 17.86 | 15.67 |
| hit primaryInk/good | **5.23** | 9.58 | 5.23 | 9.58 |
| miss ink/badSoft | 15.27 | 13.12 | 15.27 | 13.12 |
| extra ink/warnSoft | 16.07 | 12.37 | 16.07 | 12.37 |
| mixed niepomalowane ink/feltSoft | 15.38 | 12.35 | 15.38 | 12.35 |
Min 5.23 — OK. (Dodatkowo znaki − bad/badSoft 5.04, + warn/warnSoft 5.24 — OK.)

## 3. Znak „•” (ink) w RangeGrid
Do pola pustego min 13.48; do sukna min 3.26 (lightHigh), 3.92 (light) — ≥ 3 OK.

## 4. Mutacje (worktree w scratchpadzie, jest na 2 nowych plikach testów, baza 51/51 zielone)
| mutacja | wynik |
|---|---|
| M1 etykieta zawsze ink | 8 czerwonych |
| M2 próg 0,85→0,3 | 6 czerwonych |
| M3 próg 0,85→0,95 | 8 czerwonych |
| M4 PaintGrid hit → ink | 4 czerwone |
| M5 znak „•” → muted | 2 czerwone (light, lightHigh) |
| M6 etykieta zawsze onFelt | 10 czerwonych |
Werdykt 4: testy padają na każdej mutacji. Worktree usunięty.

## 5. Refactor i tokeny
8b05f9a6: lin/rgb/lum/kontrast/zloz przeniesione dosłownie do src/test-utils/kontrast.ts; nikt nie importował ich z pliku testu — bez zmiany zachowania. docs/design/tokeny.ts vs apps/mobile/src/theme/tokeny.ts @c946948d: różnica tylko w linii 3 nagłówka. W diffie wyłącznie komentarz + nowa para w `paryZlozone`; żadna istniejąca wartość ani próg nie zmienione. Werdykt 5: OK.

## Znaleziska
- **P1** (light, lightHigh): 146 pól pośrednich treści pl (0,15<f<0,85; 27/34 spotów) ma etykietę ink częściowo na suknie 3.92/3.26:1 < 4,5. Wymaganie „≥ 4,5 do każdego tła” niespełnione; świadomie odłożone do roli 04 (komentarz RangeGrid.tsx:12, test liczy tylko ≥3). Scenariusz: lekcja z zakresem mieszanym w jasnym motywie, np. pole z f=0,5 — prawa część „AKo” w ink na zieleni 3.9:1. Nie regresja.
- **P1 (szacunek, do potwierdzenia zrzutem)**: próg 0,85 zakłada etykietę ≤ 70% szerokości pola, ale etykieta skaluje się z Dynamic Type (brak allowFontScaling/maxFontSizeMultiplier). „AKo” 8 pt semibold ≈ 15 pt; pole ≈ 22 pt (320 pt) – 27 pt (390 pt) → już przy fontScale ≈ 1,05–1,25 tekst wychodzi poza 0,15–0,85. Wtedy w light/lightHigh pola 0,85≤f<1 mają końcówkę etykiety (litera s/o) w onFelt na surface **1.02:1** (niewidoczna) — regresja wprowadzona tą zmianą (wcześniej ink 18:1). Dotyczy 16 pól (0,85–0,92), 29 (0,85–0,95), do 296 przy dużych rozmiarach. Test nie modeluje skali czcionki.
- **P2**: test „treść pl” traktuje 0<f≤0,15 (203 pola) jako puste i sprawdza tylko ink/surface; przy większej czcionce zieleń z nich także wchodzi pod tekst (ink/sukno 3.26–3.92 w jasnych).
