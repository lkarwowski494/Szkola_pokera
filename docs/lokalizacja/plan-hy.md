# Plan HY (stan 2026-11-16, zakończone)
Rola 09-lokalizacja (prompt roli: tryb audit, sha256 777a7107…; polecenie HY @ 7e2246af wymaga zmian w `content/<język ≠ pl, en>/`, wyjątek zapisany w `docs/decyzje/HY.md`, D-1810), gałąź `claude/sesja-hy-przeklady` od 2b113aed.
Zakres: SC-07, 10, 15, 17, 20, 23, 24, 31 × de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant (25 pozycji na język) + tytuł SC-04 w de, es, fr, it, pt, pt-BR, vi.

| Krok | Stan | Dowód |
|---|---|---|
| Kontrola mechaniczna HN (znaczniki, struktura) | 88/88 OK przed i po poprawkach | `hn-kontrola-przekladow.mjs` |
| (a) przekład zwrotny, 2 agenty w świeżym kontekście | gotowe: 250 pozycji, 127 uwag ⚠ | `dowody/hy-2026-11-16/zwrotny-*` |
| (b) spójność form z resztą `content/<j>/` | gotowe: 265 form, 18 nowych | `b-spojnosc.txt`, `b-zostaje.txt` |
| (c) źródła w języku docelowym | gotowe: 320/380 form z trafieniem, 60 bez trafienia | `c-zrodla-auto.txt`, `c-brak-zrodlo-wczesniejsze.tsv` |
| Tytuły SC-04 | gotowe: 7 języków ≤ 68 | `sc04-tytul.txt` |
| Poprawki | 21 pozycji, 17 plików | `kontrola-zastepcza-hy.md` |
| Build, D-043, ci | build kod 0; 62 580 identyfikatorów w 35 bazach przed i po, pusty diff; ci: patrz `ci.md` | `d043.md`, `ci.md` |
| Otwarte | [DO USTALENIA]: vi top-pair, vi combo, it combo/open, zh-Hant out-of-position (przegląd eksperta); cechy tekstu pl/en → rola 06 (D-1817) | `docs/decyzje/HY.md` |
