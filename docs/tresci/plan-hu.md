# Stan sesji HU (06-tresci, build: poprawki treści po recenzji HS) — 2026-11-16
Gałąź `claude/sesja-hu-tresci` od `e270da14`. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HU.md` @ 6e4c04c6. Decyzje: `docs/decyzje/HU.md` (D-1770…D-1773). Dowody: `docs/tresci/dowody-hu/`.

| Zadanie | Stan | Dowód |
|---|---|---|
| 1. HS 302: SC-07 Ś `flop: { height: [high] }`, 12 języków | zrobione (D-1770) | `hu-sc07-flopy.txt`: Ś 60/60 `high`; struktura `bounds` identyczna w 12 plikach (md5) |
| 2. HS 305: „ćwierć puli” przez `{{n:}}` | zrobione (D-1771): `ex.frac.quarter`/`ex.frac.three-quarters` (percent) | `el-kontrola.mjs`: 50 braków na e270da14 (`hu-el-kontrola-przed.txt`), 0 po |
| 3. HS 303, 304 i `kickerMin` w szkicach SC-26, SC-30 (pl, en) | zrobione (D-1772) | diff `docs/tresci/szablony-robocze/fd/{pl,en}/sc-{26,30}.yaml` |
| 4. Tytuł SC-04 pl/en | zrobione (D-1773): podział w miejscu średnika, 46/48 znaków ważonych | `hu-tytul.txt` |
| 5. Kontrole | `content:check` (po lokalnym `content:build`), `tresci:rejestr`, `el-kontrola`, `hn-kontrola-przekladow`: wyniki w raporcie przekazania | — |

Otwarte: prośba do HT/08 (klucze `ex.frac.*` w kontroli 06-tresci-008 dla `turn-bet`); SC-04 w de, es, fr, it, pt, pt-BR, vi > 68 znaków ważonych (rola 09); D-1751 (SC-20, generator) i filtr strita D-1750 — rola 08, poza HU. Bazy generowane nie są commitowane (przebuduje koordynator po scaleniu HT+HU).
