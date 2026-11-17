# Audyt: Audytor Generalny — PokerGym (Szkoła Pokera) — reaudit pętla 1 — 2026-11-17
Commit: 196cb8c2b062e46e0f90aaee062fff24fc06f729 (gałąź napraw M2 `claude/sesja-is-naprawy-p1`; wyniki na `claude/sesja-ir-reaudit-m1`) · Baza: 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Tryb: reaudit, pętla 1 · Prompt M1 reaudit sha256 86ca3058…7d542e · Środowisko: jak w audycie (Linux, bez macOS/telefonu; E2E iOS nie uruchamiane na gałęzi napraw, D-1620)

## Podsumowanie
Partia 1 napraw: **4/4 zadania zweryfikowane** (002, 007, 047, 061) z dowodem z bieżącego commitu. Znalezisko M2 dodane przez koordynatora (M2-koordynator-napraw-001, siatka lekcji z klasami niepewnymi) jest poprawne merytorycznie i w kodzie, ale nowa kropka ma za słaby kontrast w motywie jasnym → **nowa pozycja M1-audytor-generalny-067, P1 (bariera dostępności, WCAG 1.4.11), potwierdzona weryfikacją przeciwną** (regresja od naprawy 002). M2-002…005, 04-002 reaudytu i kolizja ID 06-tresci-502 → P3 (backlog). Werdykt dla buildu 1012: **ZABLOKOWANE przez 067** (naprawa w jednej linii + para kontrastu w CI) **oraz bramkę JAK-19** (protokół F 1011, krok właściciela). Wg CLAUDE.md „Audyty i wydania” pkt 2 naprawę 067 sprawdza test odtwarzający, pełne `pnpm run ci` i E2E — bez drugiego reaudytu.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| M1-audytor-generalny-002 | P1 | M | Siatki obrony BB bez klas niepewnych wbrew solverowi | zweryfikowane |
| M1-audytor-generalny-007 | P2 | D | Wyciągi cudzych artykułów > 250 znaków w publicznym repo | zweryfikowane |
| M1-audytor-generalny-047 | P2 | D | Akcja pnpm/action-setup nieprzypięta do SHA | zweryfikowane |
| M1-audytor-generalny-061 | P2 | D | .gitignore bez plików kluczy i .env | zweryfikowane |
| M1-audytor-generalny-067 | P1 (blokuje 1012 i App Store) | D | Kropka klasy niepewnej w siatce lekcji: kontrast 1,59:1 / 2,01:1 w motywie jasnym (< 3:1) | otwarte (regresja od 002) |
| M1-audytor-generalny-068 | P3 | D | PaintGrid: kropka „mieszana” 1,19–2,46:1 (ta sama przyczyna co 067) | otwarte (istniało wcześniej) |
| M1-audytor-generalny-069 | P3 | D | Test klas niepewnych nie wykrywa nadmiarowej klasy (M2-002) | otwarte (istniało wcześniej) |
| M1-audytor-generalny-070 | P3 | P | Akcje na SHA bez mechanizmu aktualizacji (M2-003) | otwarte (DEC-14) |
| M1-audytor-generalny-071 | P3 | D | Test siatki porównuje liczbę kropek, nie położenie (M2-005) | otwarte (istniało wcześniej) |
| M1-audytor-generalny-072 | P3 | D | Czytnik ekranu bez informacji o klasach niepewnych (M2-004) | otwarte (istniało wcześniej) |
| M1-audytor-generalny-073 | P3 | D | Jedno ID 06-tresci-502 dla dwóch znalezisk | otwarte (regresja śledzenia) |

## Werdykt
Kurs: **trafny** (bez zmian, linii bazowej nie ustala się od nowa) · Stan: **ZABLOKOWANE** · Uzasadnienie: reguła werdyktu — otwarte, potwierdzone weryfikacją przeciwną P1 M1-audytor-generalny-067 (bariera dostępności, kategoria z CLAUDE.md pkt 1; weryfikacja `reaudit-2026-11-17/weryfikacja/r1-04-001.md`). Build TestFlight 1012: może iść po (1) naprawie 067 z testem pary kontrastu i zielonym `pnpm run ci` + E2E (pkt 2: bez kolejnego audytu) i (2) uzupełnieniu protokołu F 1011 przez właściciela (bramka JAK-19, `--protokol 1011` kod 1). Blokery App Store 001, 003–006 (partia 2) bez zmian — po 1012 zgodnie z decyzją właściciela. Kryterium zakończenia pętli: brak otwartych P0/P1 i regresji P0/P1 — niespełnione wyłącznie przez 067; to pętla 1, więc kolejny fix jest dozwolony.

## Linia bazowa i założenia
Bez zmian względem audytu (`linia-bazowa.md`); reaudit nie ustala kursu od nowa. Zakres z polecenia koordynatora (D-2030): zadania partii 1 + M2-001, ocena M2-002…005 i D-2015; pliki zmienione od bazy przypisane do ról (treść, siatki → 06; workflowy, testy → 07; RangeGrid, bazy treści → 08; .gitignore → 10; dostępność siatki → 04).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Zadania 002, 007 (treść, rejestr, siatki) | tak | reaudit-2026-11-17/06-tresci/ (źródło beyondgto odczytane dziś; 35 baz; testy 27/27, 3/3) |
| Zadanie 047 i 9 workflowów | tak | reaudit-2026-11-17/07-jakosc/ (15/15 na SHA tagu v5.0.0; mutacje kod 1; CI #534 sukces) |
| Zadanie 061 | tak | reaudit-2026-11-17/10-wydanie/ (check-ignore 4848 plików, test 2/2) |
| M2-001 kod, merytoryka, wygląd | tak | 08 (jedno źródło `ranges.uncertain`), 06 (zgodność z lekcją w 12 językach), 04 (kontrast: 067) |
| Próbka regresji: TRE (M5.l2), JAK-19, DEV-02, manifest prywatności, PasekStrategii | tak, brak regresji | wyniki.md w katalogu reaudytu |
| E2E iOS na 196cb8c2, telefon, „Zwiększ kontrast” na urządzeniu | nie sprawdzono (brak macOS; D-1620) — krok przed 1012 | — |
| CI #535 na 196cb8c2 | nie sprawdzono (w toku przy odczycie; #534 na a59d0e1b z tym samym kodem — sukces) | reaudit-2026-11-17/07-jakosc/ |

## Kontrola dowodów i sekretów
`sprawdz-raport.mjs` uruchomiony przez M1 na 5 raportach ról reaudytu i 1 weryfikacji: wszystkie kod 0 (pliki kontrola-*.txt w katalogu dowodów reaudytu). Plan: `sprawdz-plan.mjs` kod 0 (73 zadania, 14 decyzji, 1 bez wyboru: DEC-14). Raport końcowy: kontrola przed oddaniem (dowody w katalogu reaudytu: kontrola-raport-reaudit.txt). Przegląd `git diff --cached` przed każdym commitem: 0 trafień wzorców sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| GEN-04 | dotyczy | ok: polecenia w prompty reaudytu (poza repo), raporty na 196cb8c2 |
| GEN-05 | dotyczy | ok: 6 kontroli M1 kod 0 |
| GEN-10 | dotyczy (P1 regresji) | ok: 067 potwierdzone przez świeżego weryfikatora |
| GEN-14 | dotyczy | ok: 4/4 ID naprawione mają wynik z 196cb8c2; role ze zmienionymi plikami z próbką regresji; kryterium zakończenia wpisane |
| GEN-01–03, 06–09, 11–13, 15 | jak w audycie | GEN-15: JAK-19 bramka statyczna kod 0, protokół F 1011 otwarty (krok właściciela) |

## Znaleziska (szczegóły)
### M1-audytor-generalny-067 · Kropka klasy niepewnej w siatce lekcji prawie niewidoczna na zielonym polu w motywie jasnym
- Pozycja listy kontrolnej: GEN-14 (regresja od M1-audytor-generalny-002 przez M2-koordynator-napraw-001); źródło 04-studio-projektowe-001 raportu reaudytu roli 04
- Poziom: P1 — bariera dostępności (CLAUDE.md pkt 1); blokuje build 1012 i App Store
- Realność: realny · Pewność: wysoka (pomiar roli 04 i niezależny pomiar weryfikatora: 1,59:1 jasny, 2,01:1 jasny + Zwiększ kontrast; ciemne 4,76:1 i 7,71:1)
- Rodzaj: D
- Dowód: reaudit-2026-11-17/04-studio-projektowe/04-studio-projektowe-reaudit-2026-11-17.md; weryfikacja reaudit-2026-11-17/weryfikacja/r1-04-001.md (WCAG 2.2 1.4.11 odczytane z w3.org 2026-11-17: „at least 3:1 against adjacent color(s)”; kropka jest w lekcji jedynym nośnikiem informacji, które ręce są niepewne)
- Mechanizm: kolor `tk.muted` przeniesiony z PaintGrid bez pary kontrastu w tokenach; ta sama przyczyna co 068
- Kroki w aplikacji: Lekcje → M4 lekcja 2 (obrona BB) → siatka zakresu BB vs BTN w motywie jasnym → kropki na T2s, K8o, Q8o, K7o, 75o ledwo widoczne
- Opcje: (a) kropka w kolorze `ink` (≥ 3,25:1 we wszystkich motywach) + para kontrastu w CI — jedna linia i test; (b) większy znak 10 pt albo obwódka — więcej pracy projektu; Rekomendacja: (a), opcjonalnie z (b) później
- Test akceptacyjny: para kontrastu kropka/pole w tokeny.ts sprawdzana w CI (≥ 3:1 w 4 motywach); test RangeGrid-uncertain zielony; `pnpm run ci` kod 0
- Status: otwarte

### M1-audytor-generalny-068 · PaintGrid: kropka „mieszana” na pomalowanym polu ma kontrast 1,19–2,46:1
- Pozycja listy kontrolnej: GEN-14 (istniało wcześniej w 0e7e5e00)
- Poziom: P3 (backlog D-053); naprawa wspólna z 067 zalecana
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport reaudytu roli 04 (04-studio-projektowe-002)
- Test akceptacyjny: para kontrastu obejmuje PaintGrid
- Status: otwarte

### M1-audytor-generalny-069 · Test klas niepewnych nie wykrywa nadmiarowej klasy
- Pozycja listy kontrolnej: GEN-14 (M2-koordynator-napraw-002, istniało wcześniej)
- Poziom: P3 (teoretyczne; dziś uncertain = różnica ≥ 50 pp w 8 spotach)
- Rodzaj: D
- Dowód: raport reaudytu roli 08 (sonda mutacyjna K9o niewykryta)
- Test akceptacyjny: mutacja nadmiarowej klasy → test czerwony
- Status: otwarte

### M1-audytor-generalny-070 · Akcje przypięte do SHA bez mechanizmu aktualizacji
- Pozycja listy kontrolnej: GEN-14 (M2-koordynator-napraw-003)
- Poziom: P3; Rodzaj: P (DEC-14; analogia Trening: ręczny przegląd — rekomendacja b)
- Dowód: raport reaudytu roli 07
- Test akceptacyjny: wg DEC-14
- Status: otwarte

### M1-audytor-generalny-071 · Test siatki lekcji porównuje liczbę kropek, nie położenie
- Pozycja listy kontrolnej: GEN-14 (M2-koordynator-napraw-005)
- Poziom: P3 (teoretyczne); Rodzaj: D
- Dowód: raport reaudytu roli 08 (przesunięta kropka: test na danych zielony)
- Test akceptacyjny: mutacja położenia → test czerwony
- Status: otwarte

### M1-audytor-generalny-072 · Czytnik ekranu nie dostaje informacji o klasach niepewnych w siatce lekcji
- Pozycja listy kontrolnej: GEN-14 (M2-koordynator-napraw-004)
- Poziom: P3 — rola 04: informacja dodatkowa, nie bariera (siatka od zawsze jednym elementem z etykietą; lekcja mówi tekstem); P2 wg roli, do backlogu
- Rodzaj: D
- Dowód: raport reaudytu roli 04
- Test akceptacyjny: etykieta dostępności siatki wymienia klasy niepewne
- Status: otwarte

### M1-audytor-generalny-073 · Jedno ID 06-tresci-502 nadane dwóm różnym znaleziskom
- Pozycja listy kontrolnej: GEN-14 (regresja śledzenia)
- Poziom: P3; Rodzaj: D
- Dowód: raport reaudytu roli 06 (06-tresci-001 reaudytu)
- Test akceptacyjny: unikalne ID znalezisk
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Scenariusze obrony BB losują rękę także z klas niepewnych (14,8% losowań), bez oceny decyzji preflop — bez znaleziska (rola 06).
- E2E iOS i „Zwiększ kontrast” na urządzeniu po naprawie 067 (krok przed buildem 1012).

## Co działa dobrze i należy zachować
- Naprawa 002 trafiona dokładnie: klasy niepewne = zbiór rąk z różnicą ≥ 50 pp we wszystkich 35 bazach, jedno źródło danych dla lekcji i zadań; 12 000 losowań bez oceny klasy niepewnej.
- Naprawy 007, 047, 061 z testami, które są czerwone na stanie sprzed naprawy (mutacje i baza kod 1).
- Brak regresji w warstwie danych, manifeście prywatności, workflowach i lekcji M5.

## Decyzje dla właściciela
- **Następny krok (rekomendacja: a):** (a) M2 naprawia 067 (kropka `ink` + para kontrastu w CI), opcjonalnie razem z 068; sprawdzenie testem, `pnpm run ci` i E2E bez kolejnego audytu (CLAUDE.md pkt 2), potem build 1012 po protokole F 1011 — koszt mały; (b) build 1012 bez naprawy 067 jako wyjątek nazwany (TestFlight wewnętrzny, tylko właściciel) — szybciej, ale łamie próg pkt 1 (bariera dostępności).
- **D-2015** (rola 08 zamiast 06 dla M2-001): rola 06 rekomenduje przyjąć — merytorykę sprawdził ten reaudit; do backlogu procesu: rola 06 sprawdza treść po każdej zmianie kodu zmieniającej to, co pokazuje lekcja.
- **DEC-14** (aktualizacja akcji na SHA): (a) Dependabot — automatyczne PR, odstępstwo od Treningu; (b) ręczny przegląd przy audycie wydania — jak Trening. Rekomendacja: (b).

## Proponowane polecenie naprawy
`node /home/user/prompts/tools/assemble.mjs M2-koordynator-napraw --tryb fix --wyjscie /home/user/Szkola_pokera/audit/M1-2026-11-17 --zadania M1-audytor-generalny-067` (po zatwierdzeniu właściciela; opcjonalnie `,M1-audytor-generalny-068`). Kontrola naprawy: test odtwarzający + `pnpm run ci` + E2E (pkt 2), bez reaudytu M1.

## Koszt
Reaudit: subagenci 1,12 mln tokenów (06: 265 898, 08: 202 490, 04: 197 543, 07: 173 216, 10: 139 420, weryfikacja: 137 137) wobec szacunku 1–2 mln; koszt sesji IR łącznie 172,66 USD (get_session `cost_usd`), z czego reaudit ≈ 31,7 USD (od STOP 2 audytu: 140,92 USD) wobec szacunku 20–40 USD.
