# Plan IB — rola 08 (fix): bramka ekranu dla rodzajów HO i iso-size (KO-115)

Gałąź `claude/sesja-ib-bramka` od `199fa046`. Decyzje: `docs/decyzje/IB.md` (D-1840…D-1846).

## Klasyfikacja (E0)
| Zadanie | Typ | Uwagi |
|---|---|---|
| 3.1 widoki 5 rodzajów HO (akcje, etykiety, ocena, wyjaśnienia) | D | ekran nie pokazywał ruchu rywala, puli ani kwot (spr-call, check-raise, geo-size, nit-3bet); turn-action z „duży c-bet” na turnie |
| 3.1 kontekst generatora w aplikacji | D (poza listą plików → PYTANIE 3) | `apps/mobile/src/data/content/repo.ts:280` bez kontekstu dla spr-call, check-raise, turn-action, nit-3bet → TemplateError w aplikacji |
| 3.1 etykieta turn-action z bet-small (SC-18 T) | P (rola 04) → PYTANIE 1 | do czasu nazwy: bramka odrzuca (D-1844) |
| 3.1 `{{w:…}}` w situation (SC-30) | P → PYTANIE 2 | bramka odrzuca (D-1845) |
| 3.2 bramka (RODZAJE_NA_EKRANIE, iso-size, przypięcie list) | D | warunek HX: iso-size bez bohatera na BB (D-1846) |
| 3.3 zrzuty web `ib-*` | dowód | `apps/mobile/zrzuty-web/wejscie.tsx`: warianty złożone ręcznie |
| 3.4 `env -u NODE_PATH pnpm run ci` | dowód | `docs/programista/dowody/ib-ci-<sha>.txt` |

## Kolejność i pliki
1. Test ekranu `apps/mobile/src/features/scenariusz/__tests__/ib-rodzaje-ho-ekran.test.tsx` (czerwony na kodzie bazowym) → `wariant.ts` (kwoty, pula, nazwy, `stosNaStoleBb`, `RODZAJE_PUNKTOW_EKRANU`), `rodzajeHo.ts` (ruch rywala), `EkranScenariusza.tsx` (wywołanie, stos, sytuacja nit-3bet; poza liniami IA 158-169), `data/content/repo.ts` (kontekst).
2. Testy bramki `tools/content-build/test/{ho-bramki,ef-iso-size}.test.ts` (odwrócone, czerwone) → `tools/content-build/src/scenariusze.ts`.
3. Zrzuty, ci, przekazanie. Ścieżki wrażliwe (D-043): `tools/content-build/`, `apps/mobile/src/data/` — przegląd w świeżym kontekście zleca koordynator.

## Ryzyko
- Konflikt z IA w `EkranScenariusza.tsx`: zmiany w `ruchRywala` tylko na jego początku (2 linie), reszta w `rodzajeHo.ts`.
- Liczby: pula nit-3bet zakłada martwe blindy spoza pary jak generator (0,5 przy BTN vs BB); inne pozycje → generator liczy cenę z 0,5 zawsze (znalezisko dla HO, nie naprawiane tu).

## Znaleziska z zrzutów (3.3, 2026-11-16)
- Check-raise (4 akcje, pierwszy taki punkt w treści): przy 390 pt i domyślnym tekście przyciski decyzji (`PasekStrategii`) i pasek ocen (`PasekOcenAkcji`) mieszczą 4 segmenty w jednym wierszu; „Sprawdzenie” i „Niedokładność” nachodzą na sąsiedni segment (`ib-ib-check-raise-390.png`, `ib-ocena-ib-check-raise-{390,320}.png`). Układ dla >3 akcji poza inwentarzem 04 → PYTANIE 4; koordynator zatwierdził (a): zawijanie 2×2 (D-1848), zrzuty „przed” jako `*-przed.png`.
- Znane, nie z IB: duży nagłówek „~ Niedokładność” na ocenie przy 320 pt wychodzi poza ekran (każdy rodzaj; kontrola zrzutów HL sprawdzała tylko ocenę zgodną i błąd).
- Zrzuty 390 pt (polecenie pkt 3.3); dla check-raise także 320 i AX5 „po” (D-1848). Zadania dodatkowe koordynatora: test kontekstu geo-size/iso-size (D-1843), pojemność nit-3bet (D-1847).
