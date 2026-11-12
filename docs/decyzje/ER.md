# Decyzje sesji ER (08-programista, fix po recenzji EP @ 24f32fb5)
Pula D-1260…D-1269. Kto: A = agent (delegacja z `CLAUDE.md`); do weta właściciela. Analogia Trening (D-191): Trening nie ma pick-hand ani losowanych stron; decyzje dotyczą wykonania zatwierdzonych znalezisk, wzór: opcja rekomendowana w raporcie recenzji.

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa |
|---|---|---|---|---|---|
| D-1260 | 2026-11-12 | A | 08-EP-001: wyjaśnienia pick-hand kluczowane rolą ręki: `best-hand` (poprawna) i `other-hand` (druga); `hand-a`/`hand-b` zostają tylko akcjami gracza. Zmiana schematu `ScenarioPickHandDecision`, bramki i `bloki()`. | (b) warunek `{{jesli:…}}` z wartością „poprawna”: autor treści pisałby oba warianty w każdym tekście | rekomendacja (a) w recenzji EP; brak treści pick-hand w `content/`, więc bez migracji treści |
| D-1261 | 2026-11-12 | A | 08-EP-004: widoczny zapis kart w przyciskach, skali i dzienniku to figura + symbol koloru („A♥ 4♥”, T jako 10); czytnik dostaje nazwy z `card.*` przez `etykieta` w `OpcjaPaskaUI` i `czytnik` w `TekstAkcji`. | (b) nowe klucze „Ręka A/Ręka B”: wymaga makiety 04/09 | rekomendacja (a) w recenzji; A04-10 (D-284) |
| D-1262 | 2026-11-12 | A | 08-EP-005/006: dotychczasowy wektor blockers (Kd 9s 5h 3d 2c, Ah 4h) miał SDV = 1 (wheel), więc nie testował SC-23b; zastąpiony wektorami na Ad 8s 6h 3d 2c z wpisanymi literałami. | zostawić stary wektor jako jedyny | wynik pickHandAnalysis; mutant M07 zabity |
