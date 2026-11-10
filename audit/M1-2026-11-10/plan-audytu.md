# Plan audytu M1 — PokerGym (Szkoła Pokera) — 2026-11-10
Commit: 57a83bf (build 1010; zastępuje bca751e, sygnał koordynatora 2026-11-10 13:34 UTC) · Etap: w budowie, TestFlight testy wewnętrzne, przed pierwszym wysłaniem do App Store (bramka D-304) · Wariant: **głęboki** (rekomendacja; powód niżej) · Subagenci: narzędzie Agent w tej sesji, do 6 naraz

Pierwszy audyt M1 tego repo (brak wcześniejszego `audit/M1-*` i `koszty.md`) → punkt kontrolny kosztu po partii 1 obowiązkowy (D-020).

## Bramka opłacalności
Ponowne użycie (MON-18): `docs/monetyzacja.md` (2026-11-03, < 1 rok). Werdykt **„budować”, siła dowodu słaba**. Próg 500 USD netto/rok globalnie (karta, decyzja właściciela 2026-11-03). Drabina właściciela kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD, bez PL: **50,93 / 5 199,87 / 363 501,94 USD netto/rok (pes./norm./opt.)**, sam iOS norm. 3 249,92 (`docs/monetyzacja.md:318-324`). Normalny 10,4× nad progiem, pesymistyczny ~10× pod nim. Wrażliwość: werdykt spada do „odłożyć”, gdy dwa z trzech głównych założeń (konwersja, instalacje na ocenę, udział planów) są naraz pesymistyczne; najtańsze sprawdzenie OP-07 (benchmark konwersji). Model optymalny (najwyższy normalny): rynek 14,99/mies., 89,99/rok, 149,99 dożywotni; właściciel wybrał drabinę 9,99/14,99/19,99 (decyzja 2026-11-03, poza zakresem audytu).
Zmiany od bramki: języki 1.0 = 12 zamiast 35 na start (ADR/decyzje 09), rynki bez PL, KR i VN wyłączone w 1.0 (D-400) — bez zmiany modelu i ceny; KR i VN to < 5% wyniku normalnego [OCENA na podstawie tabeli rynków w bramce, do potwierdzenia przez 02]. Wniosek: odświeżenie bramki **niepotrzebne do decyzji o audycie**; rola 02 w audycie sprawdzi tylko, czy zmiana rynków nie obniża werdyktu (MON-18), bez liczenia od zera.

## Linia bazowa (5 zdań) — `linia-bazowa.md`
1. Główna praca: lepsze decyzje w NLHE przez krótkie ćwiczenia z oceną i „dlaczego”, bez gry o pieniądze. 2. Alternatywy (GTO Preflop Wizard, Postflop+, Poker Trainer, GTO Wizard web) są 3–13× droższe, tylko po angielsku, dwie śledzą; najczęstsze skargi: nieuczciwe płatności i treść przecząca sama sobie. 3. Najlepsza w klasie wygrywa poprawnością i spójnością treści, uczciwym zakupem, lokalizacją i brakiem śledzenia. 4. Ograniczenia: wytyczne Apple 3.1.2, 5.1.1, 2.3.6 (Simulated Gambling w ocenie wiekowej), GTO w NLHE to przybliżenie solvera. 5. Obszary krytyczne: postęp offline, zakupy i dostęp, poprawność treści w 12 językach, prywatność, zgodność opisu w sklepie z kodem.

## Role (stosowalność GEN-01; dowód z E0: drzewo repo, `app.json`, 12 locale, zakupy w `apps/mobile/src/platform/zakupy.ts`, SQLite, TestFlight)
| Rola | Status | Moduły | Partia | Prompt (znaki) | Tokeny (od–do) | Czas agenta |
|---|---|---|---|---|---|---|
| soczewki E0b ×3 (nowy użytkownik; praktyk; recenzent sklepu) | uruchomić | — | 1 | ~1,5 tys. | 0,3–0,45 mln razem | 0,5 h |
| 01-odkrywanie | uruchomić (funkcje i obietnice) | dotyczące wg `rola.json` | 1 | [DO USTALENIA: --statystyki] | 0,3–0,6 mln | 1 h |
| 02-monetyzacja | uruchomić (zakupy w kodzie i sklepie; bramka bez liczenia od zera) | audyt-paywalla, storekit-expo | 1 | j.w. | 0,3–0,6 mln | 1 h |
| 03-zakres | uruchomić | dotyczące | 1 | j.w. | 0,2–0,5 mln | 0,7 h |
| 04-studio-projektowe | uruchomić (ekrany; zrzuty przez Expo web/Playwright, jeśli działa) | dotyczące | 1 | j.w. | 0,4–0,8 mln | 1,2 h |
| 10-wydanie | uruchomić (przed wysyłką; metadane 12 języków, ocena wiekowa, prywatność) | dotyczące | 1 | j.w. | 0,4–0,8 mln | 1,2 h |
| 11-wzrost | uruchomić (plan startu, ASO) | dotyczące | 1 | j.w. | 0,2–0,5 mln | 0,7 h |
| 05-architekt | uruchomić (dane, ADR, ścieżki wrażliwe) | dotyczące | 2 | j.w. | 0,5–1,0 mln | 1,5 h |
| 06-tresci | uruchomić (treść krytyczna, przegląd zastępczy D-027) | dotyczące | 2 | j.w. | 0,6–1,2 mln | 2 h |
| 06-tresci-b (drugi niezależny przebieg, ID od 06-tresci-501) | uruchomić tylko w wariancie głębokim | dotyczące | 2 | j.w. | 0,5–1,0 mln | 2 h |
| 08-programista | uruchomić | dotyczące | 2 | j.w. | 0,5–1,0 mln | 1,5 h |
| 09-lokalizacja | uruchomić (12 języków 1.0, polityka 35) | dotyczące | 2 | j.w. | 0,5–1,0 mln | 1,5 h |
| 12-niezawodnosc | uruchomić (dane na urządzeniu: migracje, eksport/import, „Usuń postęp”) | dotyczące | 2 | j.w. | 0,4–0,8 mln | 1,2 h |
| 07-jakosc | uruchomić sama (czyta wyniki E2E iOS z Actions, testy z `wspolne/`; nie uruchamia workflowów) | dotyczące | 3 | j.w. | 0,4–0,8 mln | 1,2 h |
| weryfikacja przeciwna (P0, P1, w obszarach krytycznych także P2) | 4–8 grup po ≤ 5 | — | 4 | — | 0,6–1,5 mln | 1–1,5 h |
| M1 (E0, E0b, scalanie, raport, plan napraw) | — | — | — | — | 1,0–2,0 mln | 2–3 h |

Nie dotyczy: brak (wszystkie 12 ról dotyczy). Repo treści prywatnych: brak (CLAUDE.md) — rola 06 pracuje w repo aplikacji.

## Partie
1: 3 soczewki + 01, 02, 03, 04, 10, 11 (dokumenty, sklep, ekrany) → **punkt kontrolny kosztu** (raport do koordynatora, dalej po „dalej”). 2: 05, 06, 06-b, 08, 09, 12 (kod i treść). 3: 07 sama (testy, CI). 4: scalanie, weryfikacja przeciwna, raport, plan napraw.

## Koszt razem
- Tokeny: **6,6–13,4 mln** (wariant głęboki); standardowy bez 06-b i P2 w weryfikacji: 5,8–11,9 mln; lekki: 3–6 mln. Kalibracja: jeden przebieg Piekarza ≈ 7,0 mln przy planie 1,8–7,2 mln (biblioteka) — górna granica tu podniesiona, bo repo jest większe (treść 23,8 mln znaków w 13 katalogach języków, `docs/` 15,5 mln znaków; role czytają wybiórczo).
- USD: [DO USTALENIA] — sesja działa na planie właściciela (limit użycia, nie rachunek); przelicznik na USD wymaga cennika z dnia, nie pamięci. Właściciel porównuje z `/usage` po partii 1.
- Czas agenta: ok. 6–8 h zegarowo (partie równolegle: 1 ≈ 1,2 h, 2 ≈ 2 h, 3 ≈ 1,2 h, 4 ≈ 2–3 h).
- Oczekiwanie: nowy build TestFlight (start po nim), odpowiedzi koordynatora na 3 STOP-y.
- Czas właściciela: 3 odpowiedzi (STOP 1, punkt kontrolny, STOP 2) ≈ 15–20 min; lista kontrolna na telefonie z raportu ≈ 30–45 min.
- Próg przekroczenia: 1,5 × górnej granicy = 20 mln tokenów (polecenie AY: „bez pułapu, tylko raport” — przekroczenie raportuję, nie zatrzymuję).
- Bramka 02 (E0a): ponowne użycie, zużycie 0 (bez subagenta).
- Już zużyte w E0b: research soczewki zewnętrznej ≈ 0,13 mln (subagent).

## Poza zakresem i niesprawdzalne tu; kroki właściciela
- Linux bez Xcode: testy na urządzeniu, VoiceOver, zakup sandbox StoreKit, ochrona tła — lista kontrolna dla właściciela w raporcie; E2E iOS tylko jako odczyt wyników GitHub Actions (bez uruchamiania).
- Rejestry na Dysku (dokumenty 12, 13): czyta rola 06, jeśli konektor Drive działa; inaczej „nie sprawdzono”.
- Przegląd eksperta treści: odłożony decyzją właściciela (D-027) — ograniczenie, nie znalezisko.
- Znane wejścia równoległe (do porównania, nie prawda): m5.q2 / R-M5-004 (sesja BA), linia „Twoja pozycja” KO-028 (sesja AZ); recenzje z `koordynacja` czytane dopiero po partiach jako lista porównawcza.
- **Wymaganie:** prompty ról z biblioteki `prompts` (`assemble.mjs`); bez dołączonej biblioteki fan-out nie rusza (krok właściciela / koordynatora).
- Wyjątek nazwany od wyjścia roli: `K/prompty/` w `.git/info/exclude` (biblioteka prywatna, repo publiczne); reszta K commitowana na `sesja-ay-audyt` (polecenie AY pkt 3) zamiast samego exclude.

## Decyzja
**Zatwierdzone 2026-11-10 ok. 11:50 UTC** (słowa właściciela przekazane przez koordynatora, dosłownie): „Wariant głęboki, zgoda na dołączenie repo”; wcześniej: „Ok po nowym buildzie” — fan-out po sygnale koordynatora o uruchomionym buildzie i jego SHA. `add_repo prompts` ponowione raz 11:48 UTC: odrzucone przez klasyfikator uprawnień sesji → prompty ról składa koordynator (opcja b).

(a) **wariant głęboki** jak wyżej (rekomendacja: CLAUDE.md „Audyty i wydania” pkt 4 — przed upublicznieniem „pełny, głęboki audyt całości”; treść jest główną wartością, a jej przegląd jest zastępczy, więc drugi niezależny przebieg 06 tani wobec ryzyka błędnych twierdzeń) · (b) standardowy: wszystkie 12 ról, 3 soczewki, weryfikacja P0/P1; 5,8–11,9 mln; słabszy w treści · (c) lekki: 02, 05, 06, 07, 09, 10, 12; 3–6 mln; werdykt nie może być GOTOWE, nie spełnia D-304 · (d) zmiany właściciela.
