# Nałożenie i wydanie pt (pt-PT) — sesja AT, 2026-11-10 (rola 09 build, D-408, D-409)

Start: `sesja-ao-pt-pt` @ a28b48e. Artefakty przekładu pobrane przez MCP GitHub; sha256 zip zgodne z `przeklad-pt-2026-11-10.txt` (d19bb69b…, 44ef9cc0…).

## 3f. Nałożenie
- `poprawki.mjs art1/propozycje.json poprawki-L1…L6.json poprawki-A.json` → **245 nałożonych (244 L + 1 A), 0 pominiętych**, 1 z innego pliku; kod 0.
- `poprawki.mjs art2/propozycje.json poprawki-E1,E2,R1,R2,R3,U,A.json` → **128 nałożonych (127 + 1 A), 0 pominiętych**, 1 z innego pliku; kod 0.
- `przeklad-api.mjs --zastosuj`: lekcje 44 pliki, reszta 21 plików, **odrzucono 0** (kod 0). Ostrzeżenia terminów (5, m0-l1, m5-l1, m9-l1 ×2, m9-l4) — rozbieżność liczby znaczników z pl przy zgodnym sensie (np. m0-l1:88 „{{t:straight|sequência}} do mesmo naipe” zamiast dwóch znaczników straight-flush), bez zmian.
- Ujednolicenie D-406/D-408: `ujednolic-formy.mjs --jezyki pt --zapisz` → 565 + 3 + 3 zamian (`przeglad-pt-2026-11-10/ujednolicenie-D-406*.md`); przebieg kontrolny bez `--zapisz`: **0 zamian** (idempotentne). Formy odrzucone w D-406 w znacznikach i tekście wolnym (cor, projeto, par de topo, fazer check, leque, push w znaczniku shove, nível w stakes, street): **0** (poza polami `source:`).
- K-05 `content/pt/terms-nazwy.yaml`: 151 kluczy wg pt-BR, 27 odstępstw pt-PT (komentarz „pt-PT:”); strażnik `nazwy.ts` w `content:build` kod 0.
- Kontrola (a) zmian w m12 (27 zmienionych wierszy wobec surowego przekładu: exams/m12 11, m12-l2 8, m12-l3 1, m12-l4 3, R-M12-* 4): przekład zwrotny bez źródła (subagent 1), porównanie z pl w świeżym kontekście (subagent 2) — **ZALICZONA**: 26 ZGODNE, 0 KRYT, 0 WYS, 1 ŚR (Z11 m12-l4:59 „descer só depois disso” → „adiar a descida para além desse momento”, nałożona). `przeglad-pt-2026-11-10/a-AT/`.
- Rejestr: `przeglad_jezyki.pt` dopisane w 11 wpisach krytycznych (skróty po nałożeniu); `tresci:rejestr` 0 błędów.

## 3g. Wydanie w kodzie
- `git apply` `ao-pt/kod-jezyki.patch`, `wydanie-app.patch`, `usun-d373.patch` (check ok); dopiski: `konfiguracja.test.ts` (dane polyfillu = bazowe ∪ `znacznikIntl` ≠ kod), `jezyk-4-09.test.ts` (pt-PT → pt), `slowniki.ts` (pt), `polyfille.ts` (`locale-data/pt-PT.js`); `language.name` w `locales/pt.json` = „Português (Portugal)” (już z przekładu).
- Testy przed kodem: na kodzie sprzed łatek (testy z łatek + dopiski) **czerwone**: jezyki 3/61 (pt-pt-09: znacznik, liczby, „0 lição” zamiast „0 lições”), aplikacja 7/18 (jezyk-pt-09 ×5, konfiguracja „pliki locales = słowniki”, jezyk-4-09 pt-PT → pt). Po kodzie: jezyki 144/144, aplikacja i18n 51/51.
- Jedna przebudowa baz po kodzie: `pnpm content:build` kod 0 (35 baz, 44 lekcje, 141 reguł, 829 liczb, 162 terminy).
- `pnpm run ci` **kod 0**: aplikacja 87 zestawów / 578 testów, jezyki 144, content-build 180, domena 314, postep 105, poker-core 155, srs 21, preflop-solver 44; `i18n:kod`: błędy: 0, uwagi: 335; języki: de, en, es, fr, it, ja, ko, pl, pt, pt-BR, vi, zh-Hant; kluczy w źródle: 699; `tresci:rejestr` 0 błędów, 0 uwag.
