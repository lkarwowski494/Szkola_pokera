# Stan sesji EL (06-tresci, build): poprawki treści po EJ/EI i kolejka 06 po silniku EF — 2026-11-11
Gałąź `sesja-el-tresci` od 31723a6c. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EL.md` @ fd256ff0. Decyzje: `docs/decyzje/EL.md` (D-1210…D-1220; wolne D-1221…D-1229). Odczyty: `docs/tresci/odczyty/el-2026-11-11.tsv` (14/14 cytatów dosłownie). Kontrola sesji: `node docs/tresci/narzedzia/el-kontrola.mjs` (czerwony przed zmianą: `dowody/el-red.txt`, 18 braków).

| Zadanie | Stan | Dowód |
|---|---|---|
| 1. EJ ŚR 06-tresci-001 (D-1167/D-1168) | zrobione: D-1210 zastępuje uzasadnienie (MDF + R-M6-006 + Upswing Tip 4; uproszczenie nazwane w obu); odnośniki w `docs/decyzje/EH.md`; wynik `call` bez zmian | `odczyty/el-2026-11-11.tsv` |
| 2. EJ NIS-002 („2/3” z AI summary) | zrobione: R-M6-007 `source` pl/en bez „2/3” (D-1211); próg 0,75 zostaje (klucz `cbet.size.big` + J42 66 % + MDF) | `el-kontrola.mjs` |
| 3. EJ NIS-003 (cytat Upswing w R-M6-006) | zrobione: Tip 4 (D-1212), `sources` z adresami, rejestr m5-m8 | jw. |
| 4. EI do 06 (R-M7-006, KO-076) | zrobione: warunek reguły pl/en (silna = najwyższa para i lepsze; draw, który po trafieniu wygrywa), zadanie 08-EL-1 (żywe outy, D-1213); KO-076 miara przyjęta dla Ł jako zachowawcza, nie do poziomu trudnego (D-1214) | `dowody/el-ko076.txt`, `narzedzia/rachunki/el_ko076_*.py` |
| 5. Kolejka EF | `equityMarginMin: 0.02` w Ł SC-06/32/33, 12 języków (D-1215); progi N2 [0,25; 0,35] i ≥ 0,75 (D-1216, 08-EL-2); bluff-catcher (D-1217); R-M5-012 `check`: **otwarte** (D-1218); semi-blef N6: **otwarte** (niżej) | `pnpm content:build` kod 0 |
| 6. `pnpm run ci` | patrz `dowody/el-ci-<sha>.txt` | |

## Otwarte pytania
- [DO USTALENIA] R-M5-012 `check` (N5): potrzebne przeczytane źródło z wynikiem solvera per tekstura flopu dla otwierającego bez pozycji (np. CO/UTG wobec BTN); GTO Wizard „C-Betting As the OOP Preflop Raiser” ma odpowiedzi tylko w elementach interaktywnych. Bez tego szablon N5 nie ma przypadków (D-1218).
- [DO USTALENIA] Semi-blef N6 (gracz z drawem na turnie, rozmiar zakładu): brak przeczytanego źródła o częstości blefów/semi-blefów w zakresie betu na turnie; nie do treści (polecenie EL 3.5, ADR-24).
- [DO USTALENIA] Backdoor z kartą niższą niż T wobec c-betu ok. 1/3 (z EH, bez zmian): `null`.

## Zadania dla innych ról
- 08: 08-EL-1 (turn-bet, żywe outy), 08-EL-2 (progi N2 po zaokrągleniu), 08-EL-3 (kontrola EL do testu CI) — `docs/decyzje/EL.md`.
- 09: przekład na 10 języków (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant): R-M7-006 `if` (zawężenie: najwyższa para albo lepsza, draw, który po trafieniu wygrywa); `source` R-M6-006 (cytat Upswing Tip 4 + adresy), R-M6-007 (usunąć „2/3”, „rozmiar w tekście niepodany”), R-M7-006 (definicja silnej ręki, cytaty). Wzorzec: pl i en w `content/{pl,en}/rules.yaml`.

Następny krok: koordynator; 08 według zadań wyżej; 06 po źródle per tekstura (R-M5-012).
