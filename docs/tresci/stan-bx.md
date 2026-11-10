# Stan sesji BX (rola 06 fix, moduły kontrole-mechaniczne + tresci-krytyczne)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bx-m12` · Start 70fdf40 (zgodnie z poleceniem BX @ a07904d)

## E0 (plan) — STOP, raport do koordynatora
- Środowisko: Linux, Node 22.23, `pnpm install --frozen-lockfile` kod 0; `scal-rejestr.mjs --przeglad zastępczy --sprawdz` na 70fdf40: 0 błędów, 0 uwag (krytyczne: 56).
- Zakres (`content/pl/exams/m12.yaml`): l.9 = q1 (R-M12-001), l.18 = q2 (R-M12-001), l.27 = q3 (R-M12-003), l.73 = **q8** (R-M12-009, krytyczne; nie q9). Pole `why` poprawnej opcji.
- Klasyfikacja: BN-M12-1…4 = **M** (brzmienie wyznacza wzorzec D-565 i rejestr; bez nowych twierdzeń). Żadne nie jest P.
- Skutek dla przeglądu: skrót liczony z całego pliku egzaminu, więc zmiana pl `m12.yaml` unieważnia `przeglad.sha` twierdzeń krytycznych używanych w tym pliku (spodziewane: R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:ror.two, n:dd.bi.small — potwierdzę diffem `--skroty`). Języki: każdy z 11 ma własny `content/<j>/exams/m12.yaml`, więc `przeglad_jezyki` się nie zmienia; przekład → rola 09 (jak BN m6/m9/m11).

## Proponowane brzmienie (sens → „Rachunek:” + dotychczasowy rachunek bez zmian)
Źródło każdego zdania sensu: zdanie już obecne w tym samym pytaniu (inne opcje) albo pole `then`/`because` reguły.
1. q1 (l.9): „Średnia to tylko środek: rzeczywisty wynik może być daleko od niej, a wygrywający gracz może skończyć nawet na minusie.” (opcje 2 i 3 tego pytania; R-M12-001; dolna granica = −20 wpisowych, rachunek)
2. q2 (l.18): „{{n:exam.m12.hands.k}} tys. rąk to dla winrate mała próba: po niej nie wiesz nawet, czy wygrywasz.” (obecne ostatnie zdanie + opcja 2; R-M12-001)
3. q3 (l.27): „Wyższe odchylenie wymaga dużo większej próby: stoi we wzorze w kwadracie, a błąd maleje dopiero z pierwiastkiem z liczby rąk.” (obecne ostatnie zdanie + opcje 2 i 3; R-M12-003 `because`)
4. q8 (l.73): „Dodatni winrate nie chroni przed wariancją: ryzyko utraty bankrollu maleje wykładniczo z bankrollem, ale przy niskim winrate zostaje wyraźnie większe od zera.” + „Rachunek (przybliżenie przy stałym winrate i SD): …” (opcje 2 i 3; R-M12-009 `then`)

## Kroki po akceptacji E0
1. Test czerwony: skrypt porównania (klucze `{{n:}}` w każdej opcji, `correct`, pola poza `why`) + kontrola „why poprawnej opcji zaczyna się od sensu, nie od wzoru” — przed zmianą czerwony dla 4 linii.
2. Edycja 4 linii; porównanie skryptem (`docs/tresci/dowody/bx-egzaminy-porownanie.txt`); jeden commit na ID (BN-M12-1…4).
3. Przegląd zastępczy D-027 (subagent, świeży kontekst, tylko diff + rejestr + źródła): `docs/tresci/dowody/bx-przeglad-zastepczy.md`; odświeżenie `przeglad.sha` w `docs/tresci/rejestr/m12-m13.json` + `scal-rejestr.mjs`.
4. `pnpm content:build`, `pnpm run ci` → `docs/tresci/dowody/bx-ci-<sha>.txt`. Decyzje: `docs/decyzje/BX.md` (pula D-675…D-684).
