# Plan audytu M1 — PokerGym (Szkoła Pokera) — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed (gałąź robocza `claude/sleepy-brahmagupta-2065nu` po scaleniu IO+IQ+IP; gałąź audytu `claude/sesja-ir-audyt-m1`) · Etap: w budowie, TestFlight tylko testy wewnętrzne (ostatni build 1011), brak użytkowników poza właścicielem · Wariant: **głęboki (c), wybór właściciela 2026-11-17 ok. 11:02 UTC: „c: głęboki”** (rekomendacja M1 była: standardowy) · Subagenci: narzędzie Agent w tej sesji (opus, prompt roli ze składacza), do 4–6 naraz w partii; prompt M1 sha256 580c1e01…edf6f (prompts @ af4c0a83).

## Bramka opłacalności
**Wyjątek nazwany właściciela z 2026-11-17: „Pomiń, wyjątek nazwany”** (start koordynatora przez /apps4brew; przekazane w poleceniu IR pkt 3). Subagent 02-oplacalnosc nie jest uruchamiany; GEN-03 spełnione wyjątkiem (nie wada audytu). Kontekst z repo (nie werdykt tego audytu): `docs/monetyzacja.md` — bramka z 2026-11-03 „budować” (słaby dowód) dla wariantu 0,99/6,99/14,99, próg 500 USD netto/rok globalnie (decyzja właściciela 2026-11-03); model zmieniony tego samego dnia na **kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD** (subskrypcja auto-odnawialna + jednorazowy; Family Sharing wyłączone; `store/produkty.json`), w E2 sesji 2 warianty przeliczone („budować”). Bez storefrontu PL. Model optymalny, języki i platformy dla 02, 03, 09, 10: z `docs/monetyzacja.md` i `CLAUDE.md` (iOS; 35 języków w aplikacji; rynki US → JP, CA, GB, BR, FR, TW, VN, DE).

## Linia bazowa (5 zdań)
Główna praca: nauczyć się lepszych decyzji w NLHE od zasad do strategii bez ryzyka pieniędzy, w krótkich sesjach offline. Alternatywy czytane dziś (Poker Trainer, Postflop+, Preflop Wizard; App Store US) to głównie „drillery” GTO z subskrypcją; skargi w recenzjach: brak wyjaśnień i programu, wątpliwa poprawność, cena i pułapki subskrypcji, zawiła konfiguracja. Najlepsza w klasie: program od zera + ocena z wyjaśnieniem liczbowym zgodnym z solverami + uczciwy model zakupu + zero utraty postępu i śledzenia. Obszary krytyczne: postęp na urządzeniu (zapis, migracja, eksport/import/usuń), prywatność „no tracking”, zakupy i limit dzienny, poprawność strategii i pomoc hazardowa, wymogi 5.3 i kategoria wiekowa (simulated gambling; Brazylia z listy rynków ma rating regionalny). 15 punktów LB-01…LB-15 w `linia-bazowa.md`.

## Role
| Rola | Status (uruchomić / nie dotyczy + powód) | Moduły | Partia | Prompt (znaki) | Tokeny (od–do) | Czas |
|---|---|---|---|---|---|---|
| soczewki E0b ×5 (1 nowy użytkownik, 2 praktyk, 3 recenzent/konkurencja, 4 sceptyk ryzyka, 5 właściciel) | uruchomić (wariant głęboki) | — | 1 | ~1,5 tys. | 0,5–0,75 mln | 20–40 min |
| 01-odkrywanie | uruchomić (funkcje i obietnice) | rynek-i-polityki, kontrola-brd | 1 | 66 768 | 0,25–0,5 mln | 45–90 min |
| 02-monetyzacja | uruchomić (zakupy: expo-iap, EkranZakupu, limit dzienny); bez `oplacalnosc` (wyjątek bramki) | audyt-paywalla, storekit-expo, cena-i-rachunek | 1 | 65 603 | 0,35–0,8 mln | 60–120 min |
| 03-zakres | uruchomić | ciecie, inwentarz-funkcji | 1 | 62 913 | 0,25–0,5 mln | 45–90 min |
| 10-wydanie | uruchomić (przygotowanie do sklepu, TestFlight) | metadane-i-zrzuty, prywatnosc-i-formularze, opis-wydania, recenzja-i-odrzucenia | 1 | 63 371 | 0,25–0,55 mln | 45–90 min |
| 04-studio-projektowe | uruchomić (interfejs) | render-i-krytyka, pamiec-portfolio | 2 | 68 760 | 0,35–0,8 mln | 60–120 min |
| 05-architekt | uruchomić (dane SQLite, treść w bazach na język) | dane-lokalne-sqlite, pakiety-tresci | 2 | 69 673 | 0,35–0,8 mln | 60–120 min |
| 08-programista | uruchomić (kod) | sqlite-expo | 2 | 59 501 | 0,5–1,2 mln | 60–150 min |
| 12-niezawodnosc | uruchomić (dane na urządzeniu) | ratowanie-danych, widocznosc-awarii, pakiety-tresci | 2 | 59 064 | 0,3–0,7 mln | 45–120 min |
| 06-tresci-b (drugi niezależny przebieg, `K/role/06-tresci-b/`, ID od 06-tresci-501) | uruchomić (wariant głęboki: najważniejszy obszar krytyczny = poprawność strategii, liczb i pomoc hazardowa) | kontrole-mechaniczne, tresci-krytyczne | 2 | 65 243 | 0,5–1,2 mln | 90–180 min |
| 06-tresci | uruchomić (uczy, liczy, twierdzi; treść krytyczna: strategia i pomoc hazardowa); repo treści prywatnych: brak → wyjście w K | kontrole-mechaniczne, tresci-krytyczne | 3 | 65 225 | 0,5–1,2 mln | 90–180 min |
| 07-jakosc | uruchomić zawsze (GEN-15, JAK-19 na SHA audytu) | scenariusze-uzytkownika, e2e-mobilne, wlasnosci-i-domena, wydanie | 3 | 73 916 | 0,5–1,2 mln | 90–180 min |
| 09-lokalizacja | uruchomić (35 języków w polityce; 12 katalogów `content/`, 13 plików UI) | i18n-expo, tlumaczenie | 3 | 62 435 | 0,35–0,8 mln | 60–150 min |
| 11-wzrost | uruchomić (plan startu: rynki US i kolejne) | kanaly-i-start, retencja-i-etyka, pomiar-prywatny | 3 | 61 658 | 0,25–0,5 mln | 45–90 min |
| weryfikacja przeciwna (E2.6) | P0, P1 oraz P2 w obszarach krytycznych (dane, prywatność, pieniądze, treść krytyczna), grupy ≤ 5 | — | 4 | ~1 tys. | 0,8–2,3 mln (6–12 grup × 115–190 tys.) | 45–90 min |
| M1 (E0, E0b, scalanie, raport) | — | plan-napraw | — | 67 635 | 0,6–1,2 mln | 2–3 h łącznie |

Moduły pominięte z powodem: 01 `wywiad`, `repozytorium` (build / repo istnieje); 02 `oplacalnosc` (wyjątek), `rachunek` (bez bramki), `oplacalnosc-media` (nie media); 03 `zmiany-zakresu` (build, fix); 04 `kontekst-oczy-zajete` (przepływ z patrzeniem na ekran), `przeplywy-i-gesty`, `strona-www` (na żądanie M3/M6); 05 `tlo-i-sensory-ios` (brak pracy w tle poza powiadomieniem); 06 `historia-i-miejsca` (nie dotyczy); 07 `geo-slady` (brak lokalizacji), `scenariusze-skrypt` (bramka już wdrożona: `scripts/sprawdz-scenariusze.mjs`); 10 `potok-i-podpis` (build/fix), `widocznosc-w-sklepie` (na żądanie); 12 `incydent-i-poprawka` (fix, runbook).

Ustalenia planu dla każdego subagenta (Stan projektu, nie pytają): etap w budowie / TestFlight wewnętrzny (build 1011, brak użytkowników i ich danych); sklep: ASC częściowo (TestFlight, umowa Paid Apps), Google Play nic; rynek główny US, kolejne JP, CA, GB, BR, FR, TW, VN, DE, bez PL (D-292); repo treści prywatnych: brak; standard marki wysoki (bez reklam i SDK śledzących); próg 500 USD netto/rok (karta); polityka języków szeroka, 35 jak Trening (w tym pl); przegląd treści krytycznych zastępczy (D-027, decyzja 2026-11-03); cel: „Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening.”; merytoryka pokerowa: hierarchia ADR-24 z `CLAUDE.md`; próg wydania: `CLAUDE.md` „Audyty i wydania” pkt 1. Znane i świadomie odłożone (oceniać progiem, nie jako nowe): KO-125 (es „Button”/„botón”), IL-008 (`{{t:straight}}` przy outs.oesd w m7-l2/l3), P3 z recenzji IO/IQ/IP (backlog), IL-003 ICM (do decyzji właściciela).

**Mapowanie progu wydania (CLAUDE.md pkt 1) na poziomy:** P0 → KRYTYCZNE, P1 → WYSOKIE — oba blokują build 1012; P2 → ŚREDNIE/NISKIE → backlog z wersją, nie blokują. Znalezisko P1 „wyraźnie gorsza jakość” bez kategorii z listy pkt 1 (dane, awaria, funkcja nie do użycia, błędne liczby/twierdzenia, prywatność, bezpieczeństwo, sekrety, prawa autorskie, bariera dostępności, ryzyko odrzucenia Apple) M1 oznacza jako „P1 bez blokady wg CLAUDE.md pkt 1” — próg projektu ma pierwszeństwo (reguła werdyktu).

## Partie
1: soczewki ×5 + role dokumentów/sklepu 01, 02, 03, 10 (9 subagentów) → **punkt kontrolny kosztu (obowiązkowy, pierwszy M1)**; 2: role kodu i danych 04, 05, 08, 12 + 06-tresci-b; 3: 06, 07, 09, 11 (07 korzysta z wyników `K/wspolne/`, nie powtarza pełnych testów; E2E iOS z CI); 4: weryfikacja przeciwna P0/P1 i P2 obszarów krytycznych. Wspólne wyniki komend (`K/wspolne/`): instalacja z blokady kod 0; `pnpm run ci` (typecheck, testy, kontrole) w toku przy STOP 1 — wynik przed partią 1; lint: brak skryptu w repo (zapis jako fakt).

## Koszt razem
**Wariant głęboki (c), przeliczony po wyborze właściciela:** bramka 02: 0 (wyjątek). Tokeny: **8–15 mln** (role 12 × 4,3–9,5 mln + 06-tresci-b 0,5–1,2; soczewki ×5 0,5–0,75; weryfikacja 0,8–2,3; M1 0,6–1,2), środek ok. 10,5 mln. **USD [OCENA]: 130–260**, środek ok. 170 (przelicznik 15–20 USD/mln z `koszty.md` na `koordynacja`: AX, BA). Założenia jak w wariancie (a): role czytają wybiórczo (`K/wspolne/material-rol.txt`), kalibracja Piekarza; limit na rolę w poleceniu 1,5 mln tokenów albo 3 h. **Czas agenta:** 7–12 h. **Czas właściciela:** STOP 1 (zrobione), punkt kontrolny, STOP 2 — ok. 15–30 min; bez kroków telefonu w trakcie. **Próg STOP wyjątkowego:** 1,5 × 15 mln = **22,5 mln tokenów albo ok. 390 USD**. Punkt kontrolny po partii 1: **tak** (pierwsze M1).
Wariant (a) w chwili STOP 1 (dla porównania): 6–12 mln, 100–200 USD, próg 18 mln.

## Poza zakresem i niesprawdzalne tu; kroki właściciela w trakcie
- Brak macOS/Xcode/symulatora: E2E iOS tylko jako wynik CI (`e2e-ios.yml`); test na urządzeniu = protokół F właściciela po buildzie 1012 (nie w audycie).
- App Store Connect (stan produktów, umowy, etykieta App Privacy w ASC): tylko pliki repo (`store/`) i workflowy w trybie podglądu, uruchamia właściciel; audyt niczego nie uruchamia w ASC.
- Rejestry merytoryczne na Dysku (dok. 12 i 13): odczyt przez łącznik Drive, jeśli dostępny w subagencie; inaczej „nie sprawdzono”.
- Opinia prawna art. 29 u.g.h. (OP-13 „nie teraz”), legalność storefrontów (D-292) — tylko zgodność repo z zapisami.
- Google Play: brak (nie dotyczy). Recenzje i ceny konkurencji tylko z App Store US (rynek główny = US).
- Bez zmian w plikach śledzonych aplikacji; K commitowany na `claude/sesja-ir-audyt-m1` (wyjątek nazwany KO-126), `K/prompty/` w `.git/info/exclude`.

## Decyzja
**Wybór właściciela 2026-11-17 ok. 11:02 UTC (przekazane przez koordynatora session_01T66VBz6DTkPGQMK56NWDDA): „c: głęboki”.** Opcje przedstawione na STOP 1:
(a) plan jak wyżej — wariant standardowy, 12 ról w 3 partiach + soczewki + weryfikacja P0/P1, 6–12 mln tokenów / 100–200 USD [OCENA], 6–10 h agenta (**rekomendacja**: pierwsze M1, służy też jako pełny audyt przed App Store; podłoga danych, płatności i treści krytycznych wymaga 02, 05, 06, 07, 12) · (b) wariant lekki: podłoga (05, 12, 06, 02, 10, 07 z JAK-19) + 0 soczewek, weryfikacja tylko P0, ok. 3,5–7 mln / 55–120 USD, 4–6 h; kompromis: werdykt nie może być GOTOWE i nie spełnia „pełnego M1” z 09:00 ani pkt 4 CLAUDE.md przed App Store · (c) głęboki: + drugi niezależny przebieg 06 (strategia i liczby) i 5 soczewek, weryfikacja P2 w obszarach krytycznych, 8–15 mln / 130–260 USD; kompromis: wyższy koszt, większa pewność treści · (d) zmiany właściciela.

**Punkt kontrolny kosztu po partii 1 (2026-11-17 ok. 11:35 UTC):** 39,71 USD, partia 1 1,94 mln tokenów (iloraz 0,82), prognoza całości ok. 160 USD. **Odpowiedź właściciela ok. 11:40 UTC: „Dalej (zalecane)”.**
