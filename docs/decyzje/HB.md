# Decyzje sesji HB (pula D-1575…D-1584) — poprawki 08-programista-401…403
Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HB.md` @ 0dbe5ad7. Wszystkie do weta właściciela.

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa |
|---|---|---|---|---|---|
| D-1575 | 2026-11-13 | A | 402: bramka w schemacie `ScenarioTemplate` (`superRefine`), stała `RIVER_CATCH_MARGIN_MIN = 0,01` (1 pp); dotyczy `marginMin` i `margins[i].min` punktów river-catch. | (b) procent z jednym miejscem po przecinku (zmienia brzmienie, rola 04/06); próg 0,02 jak w szkicu 06 (zaostrza treść bez dowodu; 0,01 to matematyczne minimum: odstęp ≥ 1 pp ⇒ różne zaokrąglone procenty); bramka w `tools/content-build` (zakaz HB, sesja HA). | `docs/programista/recenzje/recenzja-gb-0ac2679.md` (402); dowód `docs/programista/dowody/hb-402.txt` |
| D-1576 | 2026-11-13 | A | 401: test ogłoszenia przez szpieg `announceForAccessibility` w `gb-reka-mieszana-ekran.test.tsx` (zgodny: yoursGoodAlso; niezgodny: yours + scenario.or). | Test eksportowanej `zdanieWerdyktu` (nie dowodzi, że ogłoszenie jej używa; D-1552). | lkarwowski494/trening:`tests/m3-p2-matrix.test.tsx:45` (odczyt 2026-11-13) |
| D-1577 | 2026-11-13 | A | 403: `kwota` i `pula` w `scenario.numbers.line` przez `formatujLiczbe(…, jezykZadan())`; test z ułamkiem (2,5 i 12,5 bb, pl). | Zostawić do pierwszego szablonu z ułamkiem (powrót typu KO-102). | `apps/mobile/src/features/scenariusz/liczby.ts:65`; dowód `hb-403.txt` |
