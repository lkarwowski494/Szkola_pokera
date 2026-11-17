# Recenzja WCAG 2.2: rangeFill w RangeGrid (e8d2c290..HEAD, gałąź claude/sesja-is-naprawy-p1), 2026-11-17

## 1. Kontrasty (własny skrypt k.py, WCAG 2.x; pasek = rangeFill × 0,85 na surface, zaokrąglenie jak Math.round w JS)
| motyw | pasek/surface (≥3) | onFelt/pasek (≥4,5) | ink-kropka/pasek (≥3) | ink/surface podkładka (≥4,5) | próbka/bg (≥3) | próbka/surface | felt1-pasek/surface (przed) |
|---|---|---|---|---|---|---|---|
| light | 4,63 | 4,55 | 3,92 | 18,17 | 5,59 | 6,56 | 4,63 |
| lightHigh | 5,58 | 5,49 | 3,26 | 18,17 | 7,02 | 8,24 | 5,58 |
| dark | 3,20 | 4,80 | 4,21 | 13,48 | 4,52 | 3,89 | 1,71 |
| darkHigh | 3,20 | 4,80 | 4,21 | 13,48 | 4,52 | 3,89 | 1,47 |
Minimum: pasek 3,20 (dark/darkHigh), onFelt 4,55 (light, bez zmian), kropka 3,26 (lightHigh, bez zmian). Odporność ±1/kanał w dark: 3,16 / 4,73 / 4,15 — nadal ≥ progów.
Bez zaokrąglenia: 3,18 / 4,83 / 4,24. Próbka legendy leży na tle ekranu `bg` (RangeBlock w Blocks.tsx renderowany bezpośrednio w Screen lekcji, nie w bloku „note”); para z `surface` nadmiarowa, nieszkodliwa.
Jasne motywy: rangeFill = felt1 (#23694D, #1B5940) — wygląd identyczny.

## 2. felt1 i konsumenci
felt1 bez zmian wartości w 4 motywach (diff tokeny.ts nie dotyka linii felt1). rangeFill używa tylko RangeGrid.tsx (pasek gr. 1 + próbka legendy). Inni konsumenci felt1 (Stol, BlokLekcji, scenariusz/komponenty, PanelDecyzji) nie są w diffie. docs/design/tokeny.ts i kopia app różnią się tylko nagłówkiem.

## 3. Testy i mutacje (worktree, jest, env -u NODE_PATH)
Bazowo: 6 plików (RangeGrid-*, kontrast-pary-08, motyw-08), 92/92 PASS.
- (a) colors[0] = tk.felt1: FAIL RangeGrid-pasek-08 (4 testy: dark/darkHigh × kolor i kontrast). kontrast-pary-08 nie łapie (liczy z tokenów), ale wystarczy.
- (b) rangeFill dark = felt1: tylko kopia app → FAIL pasek-08, kontrast-pary-08, motyw-08 (synchronizacja); obie kopie → 9 FAIL w tych samych 3 plikach.
- (c) usunięcie pary pasek/surface z paryZlozone (obie kopie): FAIL kontrast-pary-08 (2: test obecności klucza + test „krycie = opacity w RangeGrid”, który czyta krycie z tej pary).
- (d) dodatkowo usunięcie wszystkich 3 par rangeFill: nadal FAIL (te same 2 testy). Kropka i etykieta na pasku są też liczone bezpośrednio z rangeFill w kontrast-pary-08 (describe „RangeGrid: etykieta ręki i kropka”) i RangeGrid-pasek-08 — usunięcie par z felt1 (a7ca54bd) nie zostawiło luki.
Uwaga drobna: test (c) „krycie = opacity” zależy od nazwy pary paska — usunięcie pary daje TypeError zamiast czytelnego komunikatu; nie problem funkcjonalny.

## 4. WCAG 1.4.4 Resize Text — etykieta ręki
Fakty: allowFontScaling={false}; fontSize = min(8 × min(max(skala,1), 1,3), ograniczenia pola) → 8 pt domyślnie, maks. 10,4 pt (130%) od 375 pt, 8,25 pt na 320 pt. Tytuł i legenda skalują się bez limitu. Etykieta czytnika ekranu całej siatki: „{tytuł}. Gra {pct} procent rąk.” — bez listy rąk.
Ocena: NIEJEDNOZNACZNE, skłaniam się do „akceptowalny kompromis z zaleceniem”.
- Za barierą: 1.4.4 nie ma wyjątku dla wykresów; wyjątki to napisy (captions) i obrazy tekstu, a etykieta to prawdziwy Text. Etykiety rąk są jedyną identyfikacją komórek (brak osi A..2), a nie ma skalowalnej alternatywy z listą rąk (ani w legendzie, ani w VoiceOver). Wzrost tylko do 130% (< 200%).
- Za kompromisem: komórka ma stałą szerokość (≈ 28 pt na 390 pt); 16 pt „AQo” fizycznie się nie mieści — rozwiązanie zgodne wymagałoby innej prezentacji, nie większej czcionki. Układ 13×13 jest konwencjonalny (pozycja = ręka), iOS ma wbudowany Zoom (lupa); WCAG2ICT dopuszcza dla oprogramowania spełnienie przez funkcję platformy tylko ostrożnie (Zoom jest technologią wspomagającą, a 1.4.4 mówi „bez technologii wspomagających”) — dlatego nie uznaję tego za pełną zgodność.
- Czy blokuje wydanie TestFlight wg progu właściciela: nie (stan sprzed zmiany, ta zmiana go nie pogarsza; treść lekcji o zakresie jest w tekście lekcji, a siatka ilustruje).
Rekomendacja (P2, backlog): skalowalna alternatywa tekstowa — pod siatką rozwijana lista „Ręce w zakresie” (tekst treści, skaluje się bez limitu) albo dotknięcie pola → podpis „AKo: przebicie 100%”; ta sama lista w accessibilityLabel/accessibilityHint siatki (dziś VoiceOver nie dostaje rąk — dotyczy też 1.1.1/1.3.1). Ewentualnie pinch-zoom siatki (ScrollView maximumZoomScale).

## Znaleziska
- P0/P1: brak.
- P2-1: 1.4.4 etykiety rąk do 130% bez skalowalnej alternatywy treści (stan sprzed zmiany) — scenariusz: użytkownik z AX5 i słabym wzrokiem nie odczyta „K9s” 10,4 pt bez lupy systemowej; VoiceOver nie poda listy rąk.
- P2-2 (informacyjnie, przedistniejące, nazwane w spec): kropka ink na pasku `warn` w ciemnych 2,23 < 3 — tylko gdy pojawi się spot z ≥ 2 grupami (strażnik w teście treści).
