# Rola 06 E2: poprawki treści, numery pomocy, strażnik (2026-11-04, osiemnasta sesja)

Commity na `claude/sleepy-brahmagupta-2065nu`: 381cd02 (partie M0–M13), 133f9de (pomoc i strażnik), 78750d7 (terminy), 94cff64 (naprawy z przeglądu). Partie robili subagenci w osobnych kopiach roboczych; scalanie, kontrole i decyzje — koordynator.

## 1. Kontrole (dowód)
- `pnpm run ci` → **kod 0** (typecheck, testy, skrypty, i18n, content:check, nowy `tresci:rejestr`).
- `node docs/tresci/narzedzia/scal-rejestr.mjs --przed-przegladem` → **kod 0**, 0 błędów, 50 uwag (wszystkie: twierdzenia krytyczne bez przeglądu — przegląd zastępczy w E3, D-027).
- `pnpm content:build` → kod 0, bez ostrzeżeń strażnika; 44 lekcje, 142 reguły, 824 liczby, 162 terminy.
- Rejestr: 1042 wpisy — 1034 potwierdzone, 7 otwartych, 1 wycofany; werdykty tekstu 1034 POPARTE, 2 CZĘŚCIOWO, 6 NIEPOPARTE. Wszystkie 8 nie-POPARTE to wpisy **nieużyte w tekście aplikacji** (strażnik by je zablokował): H-CA-10, H-CA-14, H-TW-1, H-VN-1, H-VN-2 (pominięte w pliku pomocy), P-FSRS_CZAS, P-OCENA_PROG_MIESZANA, P-OCENA_STOPNIE (parametry dla ról 04 i 08).

## 2. Co zrobiono
- **Treść M0–M13:** wszystkie werdykty CZĘŚCIOWO, NIEPOPARTE i SPRZECZNE z raportów E1 poprawione według minimalnych poprawek i D-143–D-153 (lista plik:linia w uwagach wpisów `docs/tresci/rejestr/*.json`, dopisek „E2 2026-11-04”). Liczby solvera niezwalidowane (D-153) usunięte z tekstu; klucze `solver9.*`, `solver.def.*` usunięte z `numbers.yaml`.
- **R-M5-008** na klasach szczebla 2 (D-154). **R-M9-008** przyjęte jako nazwane uproszczenie (D-149, D-154).
- **Terminy:** 16 definicji poprawionych, 26 z 32 przypadków „termin przed definicją” poprawionych, 6 to fałszywe trafienia skryptu E1 (uzasadnienie w raporcie subagenta, wpisy w `terminy.json`).
- **Numery pomocy:** `content/helplines.yaml` — 9 rynków (US, JP, CA, GB, BR, FR, TW, VN, DE) i pomoc międzynarodowa online, każdy numer z cytatem z rejestru E1; D-150, D-151, D-152. Wpisy PL usunięte (brak storefrontu PL). Ramka `{{helplines}}` w M12-L4 bez numerów jednego kraju (lekcje w 35 językach).
- **Ekran „Pomoc”** (D-155): wybór numerów według regionu urządzenia, lista regionów GB/CA, kraj bez wpisu — tekst bez numeru, pomoc online zawsze.
- **Strażnik** (`tools/content-build/src/registry.ts`): `{{n:}}` i odwołania do reguł w tekście tylko do wpisów „potwierdzone”; brak rejestru przerywa budowanie; lista przejściowa usunięta. `scal-rejestr`: pokrycie wpisów pomocy, dozwolone statusy, `--sprawdz` w CI.

## 3. Przegląd ścieżki wrażliwej (świeży kontekst, D-043)
Naprawione: WYSOKIE #1 (ekran pokazywał numery wszystkich krajów bez podpisu), ŚREDNIE #3 (region spoza kraju gubił linię ogólnokrajową), #4 (status „wycofane”/nieznany przechodził scalenie), #5 (nieaktualny `rejestr.json` przechodził CI). Każde z testem: czerwony przed poprawką, zielony po niej.

Do backlogu (ŚREDNIE/NISKIE, nie blokują według progu z `CLAUDE.md`):
- #2 ekran nie pokazuje `phone_alt`, `sms`, `vanity` (FR 112, VN 115, DE 0800 111 0 222 i 116 123, Quebec lokalny, SMS US/CA) — rola 08 przy przebudowie ekranu; do tego czasu te numery są tylko w danych.
- #6 strażnik nie sprawdza parametrów `n:` generatorów pokazywanych w tekście zadań (`drills/text.pl.ts`), `refs` formuł, reguł bez odwołań ani `{{t:}}` — dziś bez naruszeń.
- #7 `review_by` (VN 2027-02-04) nie jest egzekwowane przy budowaniu.
- #8 klucz wyjątku listy przejściowej bez miejsca (lista dziś usunięta, test wymaga jej braku).
- #9 wykrywanie ręcznie wpisanych numerów: tylko treść lekcji, bez separatorów „/”, „.”, nawiasów, „+44”; numery krótsze niż 5 cyfr pomijane z założenia.

## 4. Nie zrobione w E2 (otwarte)
- `range.acceptable` / `range.explanation`, fakty dla 9 stanów błędów (brzmienie: 04), pytania oceny poziomu F-01 z puli egzaminów (plan E0 §8) — nie były w zakresie tej sesji; do E2b albo E3.
- Lista B terminów (heurystyczna: pot odds w m2.l2, expected-value, rake, mixed-hand, standard-deviation, winrate przed definicją), pary terminów do tabeli w dokumencie 13, `en_alt` tylko z Wikipedii.
- R-M4-007 / `pf.vs3bet.*`: dolna granica 0,55 opiera się na HUD bez adresu albo szczeblu 4.
- Ponowne sprawdzenie stron przed wydaniem: gamblingtherapy.org (500), joueurs-info-service.fr, rząd PEI (szczebel 3), 911.gov.
- Kod oceny (rola 08): `thresholds.ts`, `grading.ts` — 0 < f < 3,5% jako niedokładność (D-143); lekcje już to opisują.

## 5. Zgłoszenia do innych ról
- 08: ekran „Pomoc” — pełny projekt (pola dodatkowe, dostępność wyboru regionu: dziś zaznaczenie tylko znakiem ✓ w etykiecie), flow E2E `04-pomoc.yaml` i `helplines-env.mjs` (pierwszy numer zależy teraz od regionu); `thresholds.ts` (D-143).
- 04: cztery stopnie oceny w `design-spec.md:17, :40`; nagłówek listy regionów („Numery w regionach: wybierz swój region”) do zatwierdzenia brzmienia.
- 07: wektory RD-12 są w `tools/content-build/test/helplines.test.ts` i `HelpScreen.test.tsx`.
- 01 `fix`: RD-12-W3/W4/W6 według D-152 (bez zmian od E1).
