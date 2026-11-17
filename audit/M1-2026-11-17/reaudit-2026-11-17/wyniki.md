# Reaudit M1 pętla 1 — wyniki ról (zbierane przez M1)
| Rola | ID | Wynik | Poziom | Blokuje 1012 | Blokuje App Store | Tokeny |
|---|---|---|---|---|---|---|
| 10 | M1-audytor-generalny-061 (10-wydanie-007) | zweryfikowane (test 2/2 HEAD, kod 1 na bazie; check-ignore 4848 plików bez nowych trafień) | P2 niskie | nie | nie | 139 420 |
| 10 | regresja: app.json, eas.json, manifest, bazy treści (suma rozmiarów bez zmian), workflowy | brak regresji | — | — | — | |
| 07 | M1-audytor-generalny-047 (07-jakosc-004) | zweryfikowane (15/15 przypięte do fc06bc12… = tag v5.0.0; test 31/31, mutacje kod 1; CI #534 ok) | P2 | nie | nie | 173 216 |
| 07 | M2-koordynator-napraw-003 | istniało wcześniej, P2 rodzaj P (Trening też bez dependabota → opcja b M2 = analogia) | P2→P3 | nie | nie | |
| 07 | regresja: 9 workflowów (tylko 15 zamian @v5→@SHA), JAK-19 bramka statyczna kod 0 (PU 28, F 10); CI #534 (a59d0e1b) sukces; CI #535 na 196cb8c2 w toku | brak regresji | — | — | — | |
| 07 | protokół F 1011 (`--protokol 1011` kod 1, 10 pozycji „—”) | krok właściciela (nie znalezisko) — blokuje 1012 przez bramkę JAK-19 | — | **tak (bramka)** | tak | |
| 07 | E2E iOS na kandydacie | nie sprawdzono (gałąź napraw nie uruchamia E2E, D-1620; workflow_dispatch na macOS) | — | — | — | |
