# Wynik fix 2026-11-17-b: M1-audytor-generalny-067 (D, P1) i -068 (D, P3)

Klasyfikacja: oba D. Opcja (a) z polecenia: znak w kolorze etykiety ręki. Żadna para nie spadła poniżej 3:1.

## Commity (gałąź claude/sesja-is-naprawy-p1, bez push)
- a82bc91e: zmiana strukturalna + trwała kontrola (067 i 068): `paryZlozone` w docs/design/tokeny.ts i kopii apps/mobile/src/theme/tokeny.ts (format `{fg, tlo, krycie, podTlem, prog}`), eksport `przejscioweJasne/Ciemne` w apps/mobile/src/theme/tokens.ts, test apps/mobile/src/theme/__tests__/kontrast-pary-08.test.ts (21 testów: wszystkie `pary` x 4 warianty, `paryZlozone`, pary 2-4, zgodność krycia 0,85 z RangeGrid.tsx).
- d56506fe: 067, apps/mobile/src/components/RangeGrid.tsx (`tk.muted` -> `tk.ink`).
- 4faf3b0a: 068, apps/mobile/src/components/PaintGrid.tsx (`tk.muted` -> `labelColor(i)`).

## Testy
- apps/mobile/src/components/__tests__/znak-kolor-etykiety-08.test.tsx: przed 3 czerwone (Expected #0A1430, Received #46557A; PaintGrid #FFFDF7 vs #46557A), po 3 zielone. Log przed: dowody/test-przed.txt .
- Test par (kontrast-pary-08) zielony od początku: sprawdza tokeny (ink), nie komponent; czerwień "przed" niesie test komponentu, liczby przed w dowody/kontrasty.txt (muted: 1,60 / 2,01 / 2,46 / 1,64 / 1,62 / 1,19). Test pilnuje też, by nowa para nie spadła poniżej progu.
- Wszystkie istniejące `pary` (140 pomiarów) spełniają progi w 4 wariantach: wyjątków nie ma.
- `pnpm --filter @szkola/mobile test`: 176 zestawów, 1811 testów, rc=0 (dowody/mobile-test-po.txt). `pnpm typecheck`: rc=0 (dowody/typecheck-po.txt). Pełnego `pnpm run ci` nie uruchamiałem (tylko dwa polecenia z listy).

## Kontrast przed (muted) -> po (kolor etykiety), próg 3:1
Pełna tabela: dowody/kontrasty.txt .
| Para | light | dark | lightHigh | darkHigh |
|---|---|---|---|---|
| 1 RangeGrid, pole w zakresie | 1,60 -> 3,92 | 4,79 -> 7,87 | 2,01 -> 3,26 | 7,75 -> 9,19 |
| 2 RangeGrid, puste pole | 7,39 -> 18,17 | 8,21 -> 13,48 | 11,21 -> 18,17 | 11,37 -> 13,48 |
| 3 PaintGrid, pomalowane (primaryInk/primaryBg) | 2,46 -> 17,86 | 1,64 -> 15,67 | 1,62 -> 17,86 | 1,19 -> 15,67 |
| 4 PaintGrid, mieszane niepomalowane (feltSoft) | 6,26 -> 15,38 | 7,52 -> 12,35 | 9,49 -> 15,38 | 10,42 -> 12,35 |

## Wyszukanie mechanizmu
`grep '•'` w src: apps/mobile/src/components/RangeGrid.tsx:42 i apps/mobile/src/components/PaintGrid.tsx:110 (naprawione); apps/mobile/src/components/Blocks.tsx:95 to punktor listy (tekst treści, `muted` na tle strony, poza zakresem).

## Znaleziska nowe (nie naprawiane)
- Etykieta ręki (ink) na polu w zakresie ma 3,92 (light) i 3,26 (lightHigh) < 4,5 (SP A04-18, dane roli 04 w kontrast-kropka.txt); poza zadaniami 067/068, nie dodano do testu. Wymaga decyzji roli 04.
- `pnpm run ci` pełny nie uruchomiony; narzędzie docs/design/narzedzia/tokeny.mjs nie liczy `paryZlozone` (liczy je test).
- Rozmiar znaku bez zmian (8 pt), zgodnie z poleceniem; rekomendacja roli 04 sugerowała 10 pt lub View 4x4.
- Stopka commitów: Co-Authored-By Claude Sonnet 5.5 (zgodnie z modelem sesji), a nie Opus 5.5 z polecenia.

## Przegląd ścieżek wrażliwych
Zmiany nie dotykają ścieżek wrażliwych z CLAUDE.md (komponenty, motyw, docs/design): przegląd nie dotyczy.

## Lista kontrolna telefonu (właściciel, TestFlight)
1. Motyw jasny: Lekcje, M4 "Obrona dużego blinda", siatka pod akapitem o rękach w kolorze: kropka przy K7o, Q8o, K8o, T2s, 75o ciemna i widoczna na zielonym.
2. To samo w ciemnym i z "Zwiększ kontrast" (jasny i ciemny).
3. Ćwiczenie malowania, po ocenie: ręka mieszana pomalowana (kropka jasna na granacie) i niepomalowana (ciemna na jasnozielonym) w czterech wariantach.
4. Czy kropka nie przeszkadza w czytaniu etykiety ręki (znak 8 pt, kolor ten sam co etykiety).
