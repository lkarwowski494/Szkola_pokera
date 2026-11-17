# 08-programista, tryb fix, M2-koordynator-napraw-009 (P1, 04-studio-projektowe-011, KO-134)

Gałąź claude/sesja-is-naprawy-p1. Specyfikacja: audit/M1-2026-11-17/role/04-studio-projektowe/fix-2026-11-17-b/wynik.md sekcja 2. Rodzaj D (wdrożenie zatwierdzonej decyzji P); typ P rozstrzygnięty przez właściciela (KO-134).

## Commity (każdy z „[M2-koordynator-napraw-009]”)
1. e59e25f8 test: nowy plik apps/mobile/src/components/__tests__/RangeGrid-pasek-08.test.tsx (czerwony w dark i darkHigh)
2. cc7fbb91 fix: apps/mobile/src/components/RangeGrid.tsx, `colors[0]` = `tk.rangeFill`, komentarze
3. 3f1f6a1b test: przełączenie `felt1` na `rangeFill` w kontrast-pary-08.test.ts i RangeGrid-etykieta-kontrast-08.test.tsx
4. a7ca54bd refactor: usunięte 2 pary z `tlo: 'felt1'` z `paryZlozone` w docs/design/tokeny.ts i apps/mobile/src/theme/tokeny.ts (1:1)

`rangeFill` był już w `useTokens()` (zwraca całą paletę z tokeny.ts), mapowanie nie było potrzebne.

## Test przed i po
- Przed (commit 1, kod sprzed poprawki): 4 czerwone z 8, tylko dark i darkHigh: kolor paska i próbki = `#1C5A41`/`#174D37` zamiast `rangeFill`; pasek/surface < 3 (1,71 / 1,47). Light i lightHigh zielone (rangeFill = felt1). Dowód: dowody/czerwony-pasek.txt
- Po (commit 2): 8/8 zielone.
- Pełne: `env -u NODE_PATH pnpm --filter @szkola/mobile test` kod 0, 180 zestawów, 1891 testów (dowody/test-mobile.txt); `env -u NODE_PATH pnpm typecheck` kod 0 (dowody/typecheck.txt). Pełnego `ci` nie uruchamiano (polecenie).

## Zmienione asercje (zmiana specyfikacji D-2021, nie osłabienie; progi 4,5 / 3 bez zmian)
- RangeGrid-etykieta-kontrast-08.test.tsx: pięć obliczeń `zloz(p.felt1!, 0.85, p.surface!)` na `p.rangeFill!`; `kolorGrupy[0]` z `p.felt1` na `p.rangeFill`; opisy testów i komentarz.
- kontrast-pary-08.test.ts: obliczenie paska na `rangeFill`; klucze par: etykieta na pasku pełnym (rangeFill), pasek obok pustej części, kropka na pasku (toMatchObject z `tlo: 'rangeFill'`); DODANA asercja pasek/surface ≥ 3 do testu 4 wariantów.
- Poza listą kroków specyfikacji, ale konieczne po kroku 4: test „krycie pola w zakresie = opacity w RangeGrid.tsx” w kontrast-pary-08.test.ts czytał usuniętą parę `znak klasy niepewnej na polu w zakresie`; przepięty na parę paska (to samo krycie 0,85). Do wiadomości roli 04.
- Warunki w nowym teście (4 motywy): pasek/surface ≥ 3, onFelt na pasku ≥ 4,5, kropka ink na pasku ≥ 3.

## Mutanty (wykonane w miejscu na czystym drzewie i cofnięte `git checkout`, nie w osobnym worktree: pnpm bez node_modules w worktree; odstępstwo nazwane)
- M1: `colors[0]` z powrotem `tk.felt1`: 4 testy czerwone (dark i darkHigh w obu zestawach asercji). dowody/mutant-1-pasek-felt1.txt
- M2: `rangeFill` dark = `#1C5A41` (felt1): 5 testów czerwonych (test koloru nie pada, bo pasek = token; pada kontrast paska, pary w testach motywu, kopia 1:1). dowody/mutant-2-rangefill-dark-felt1.txt
- Po cofnięciu drzewo czyste (poza dowodami), testy zielone.

## Kontrasty (rachunek `kontrast`/`zloz` z repo, dowody/kontrasty-4-motywy.txt)
| Motyw | pasek/surface (≥ 3) | onFelt/pasek (≥ 4,5) | ink/pasek (≥ 3) |
|---|---|---|---|
| light | 4,63 | 4,55 | 3,92 |
| dark | 3,20 | 4,80 | 4,21 |
| lightHigh | 5,58 | 5,49 | 3,26 |
| darkHigh | 3,20 | 4,80 | 4,21 |
Zgodne z tabelą roli 04 (sekcja 3).

## Ścieżki wrażliwe, zrzuty, otwarte
- Ścieżki wrażliwe z CLAUDE.md nie dotknięte; przegląd w świeżym kontekście nie wymagany.
- Zrzut `pnpm zrzuty:web` nie wykonany (nie wymagany: „jeśli lekcja z siatką jest w scenariuszu zrzutów”; sprawdzenie i zrzut zostają koordynatorowi); makiety przed/po są w wyniku roli 04.
- Statusu „zweryfikowane” nie nadaję (reaudit). Status: naprawione-do-weryfikacji.

## Lista kontrolna telefonu (T-SIATKA-CIEMNY, build TestFlight)
1. Motyw ciemny: pola „gram” wyraźnie zielone, odróżnialne od pustych pól i od tła bez wysiłku.
2. Ustawienia, Dostępność, „Zwiększ kontrast”, motyw ciemny: to samo.
3. Białe etykiety na polach pełnych (AA, AKs) czytelne; kropki klas niepewnych widoczne na zielonym i na granatowym polu.
4. Próbka w legendzie widoczna.
5. Motyw jasny: wygląd bez zmian względem poprzedniego buildu.
Wynik negatywny w 1–4: wraca rola 04 (okno progów).
