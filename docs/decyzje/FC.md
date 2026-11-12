# Decyzje sesji FC (08-programista, fix). Pula D-1340…D-1349 (użyte D-1340, D-1341). Wszystkie do weta właściciela.

| ID | Data | Decyzja | Odrzucone | Podstawa |
|---|---|---|---|---|
| D-1340 | 2026-11-12 | FA-002: `heroPositions` sprawdzane w `compileEvalRules`: pozycje muszą należeć do nazw stołów reguły (`check.players`, bez niego stoły 2–9), wielkość liter ma znaczenie. | Zawężenie typu w schemacie (zmiana formatu `params` we wszystkich językach) | recenzja FA, opcja (a); test fc-fa002 |
| D-1341 | 2026-11-12 | Regresja CI-43192365903 naprawiona w generatorze (tanie warunki konieczne przed classifyHolding, rozkład bez zmian, odciski identyczne), limit czasu testu NIE podniesiony. | Podniesienie limitu testu (generator zwolnił ×3,5, więc niedopuszczalne wg polecenia); zmiana rozkładu losowań | `docs/programista/dowody/fc-pomiar.txt` |
