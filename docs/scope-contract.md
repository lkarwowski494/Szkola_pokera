# Kontrakt zakresu: Szkoła Pokera
Stan: E0 (2026-11-03): kandydaci, podłogi, założenia, pytanie o apetyt · Rola 03 build · Wejście: BRD `docs/brd/` (rola 01, E4), `docs/monetyzacja.md` (rola 02, sesja 2, E3), `docs/zalozenia.md` (ZAL-001–ZAL-012, ZAL-MON-01)

## E0: rama (2026-11-03)
Prompt: `node /home/user/prompts/tools/assemble.mjs 03-zakres --tryb build` (prompts c025063; moduły ciecie, inwentarz-funkcji, zmiany-zakresu), przeczytany od kontraktu roli; `zakres.mjs` wycięty z modułu `ciecie` bez zmian (scratchpad sesji).

**Środowisko:** jak w rolach 01 i 02 tej sesji (chmura Linux, Node, pnpm, push na gałąź roboczą; `itunes.apple.com` i `apps.apple.com` odpowiadają 2026-11-03; bez Maca, więc testy na telefonie robi właściciel). BRD jest w repo.

**Werdykt bramki opłacalności:** „budować” (słaby dowód), `docs/monetyzacja.md`. Model: drabina kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (decyzja właściciela, potwierdzona na bramce E2 roli 02, 2026-11-03).

**Wejście jako hipotezy:**
| ID | Treść (skrót) | Status | Skutek dla zakresu |
|---|---|---|---|
| H-01 / ZAL-005 | darmowa część z prawdziwą nauką zwiększa sprzedaż | hipoteza; zmiana podziału właściciela 2026-11-03: „Jedna dzienna pula” (`docs/monetyzacja.md`) | lekcje, pierwsze podejście do egzaminu, postęp i eksport darmowe; sesje ćwiczeń, powtórki, scenariusze i powtórne egzaminy z darmową pulą N dziennie (OP-11 w `docs/monetyzacja.md`), Pro bez limitu |
| H-02 / ZAL-001, ZAL-002 | jedna ścieżka dla wszystkich poziomów z oceną na starcie | hipoteza | F-01 w pętli |
| H-03 / ZAL-003, ZAL-004 | 35 języków, kolejność przeglądu według popytu | ZAL-003 częściowo potwierdzone | F-16; polityka języków to decyzja właściciela (CLAUDE.md) |
| H-04 / ZAL-002 | jedna aplikacja z modułami | hipoteza | podział w E2 |
| H-05 / ZAL-006 | postęp bez konta, eksport i import | hipoteza | F-14 |
| H-06, H-07 | trener AI, gra z botami: poza zakresem z warunkiem powrotu | decyzje właściciela W-04, W-07 | „NIE robimy”; kod trybu gry (`apps/mobile/src/features/play`) do decyzji ról 05 i 08 |
| H-08 | raport postępu za zgodą | hipoteza | bez BR; poza zakresem |
| H-09 / ZAL-011 | subskrypcja broni się aktualizacjami | hipoteza | plan aktualizacji treści to koszt utrzymania właściciela (E2) |
| ZAL-MON-01 | drabina kieruje do dożywotniego | hipoteza | bez wpływu na listę funkcji |

**Kandydaci** (każde z 35 BR w jednej funkcji; WTP i dowód z `docs/monetyzacja.md`, „Sesja 2, E1”; podłoga według wzorców roli):
| ID | Funkcja | Wymagania | WTP (dowód) | Podłoga | Darmowa / płatna |
|---|---|---|---|---|---|
| F-01 | Ocena poziomu i punkt startu | BR-ONB-001, BR-ONB-002, BR-ONB-003 | WTP-2 (R) | — | darmowa |
| F-02 | Pierwszy ekran: czym aplikacja jest | BR-ONB-004 | WTP-0 (B) | prawo: OG-07, NFR-ZGOD-002 | darmowa |
| F-03 | Kurs: lekcje w kolejności z ćwiczeniami (treść) | BR-KURS-001, BR-KURS-003, BR-KURS-004, BR-KURS-005 | WTP-1 (R) | — | darmowa (decyzja E2 roli 02) |
| F-04 | Test modułu do pominięcia znanych treści | BR-KURS-002 | WTP-2 (R) | — | pierwsze podejście darmowe, powtórne z puli |
| F-05 | Ocena zagrania i wyjaśnienie „dlaczego” | BR-CWI-001, BR-CWI-002 | WTP-1 (R) | bezpieczeństwo merytoryczne: RD-01–RD-08, RD-11 (bloker wydania) | w lekcji darmowa, w sesji z puli |
| F-06 | Szanse trafienia i ranking układów | BR-CWI-003, BR-CWI-007 | WTP-0 (B) | RD-04, RD-05 | darmowa |
| F-07 | Krótka sesja ćwiczeń, przerwanie bez straty | BR-CWI-004 | WTP-0 (R) | dane: postęp sesji | pula dzienna, Pro bez limitu |
| F-08 | Ćwiczenia ICM w turniejach | BR-CWI-005 | WTP-2 (B) | RD-09 | pula dzienna |
| F-09 | Plan rozdania: SPR i rozmiar geometryczny | BR-CWI-006 | WTP-2 (B) | RD-06, RD-07 | pula dzienna |
| F-10 | Powtórki rozłożone w czasie | BR-POW-001, BR-POW-002 | WTP-1 (R) | dane: historia powtórek | pula dzienna |
| F-11 | Lokalne przypomnienie za zgodą | BR-POW-003 | WTP-2 (R) | — | darmowa |
| F-12 | Scenariusz całego rozdania bez stosu | BR-SCN-001, BR-SCN-002, BR-SCN-003, BR-SCN-004 | WTP-1 (R) | prawo: OG-01, OG-02 | pula dzienna |
| F-13 | Zakup, przywracanie, anulowanie | BR-ZAK-001, BR-ZAK-002, BR-ZAK-003, BR-ZAK-004 | WTP-0 (B) | prawo: OG-06 | zawsze dostępne |
| F-14 | Eksport, import, usunięcie i zachowanie postępu | BR-DANE-001, BR-DANE-002, BR-DANE-003, BR-DANE-004 | — (dane nigdy płatne) | dane: odczyt / eksport / usunięcie | zawsze darmowe |
| F-15 | Pomoc przy problemie z hazardem | BR-POM-001, BR-POM-002 | WTP-0 (B) | bezpieczeństwo: RD-12 (reguła krytyczna) | zawsze darmowe |
| F-16 | Języki i zapis liczb | BR-JEZ-001, BR-JEZ-002 | WTP-2 (R) | — | darmowa |

Kontrola przypisania: 16 funkcji, 35 BR, każde raz (sprawdzi `zakres.mjs --brd` w E3).

**Kod istniejącej aplikacji** (ponowne użycie ocenia rola 05): `apps/mobile/src/features/` ma `advancement`, `drills`, `glossary`, `help`, `play`, `session`; trasa `diagnostics`. `play` (gra z botami) jest poza zakresem (W-07, H-07); `glossary` (słownik) nie ma własnego BR, a obsługuje BR-KURS-003 (termin przed użyciem) — przypisanie w E1.

**Plan i czas** (agent / oczekiwanie / właściciel):
- E1: pętla główna, wymiary pokrycia, wzorzec 2–3 najpopularniejszych aplikacji niszy (odczyt opisów, „Co nowego” i recenzji z dziś), pominięcia jako ER do roli 01. Agent ok. 1,5 h; właściciel: bramka (1 pytanie).
- E2: test zasady 18, ranking RICE w godzinach właściciela, co najmniej dwa warianty zakresu, podział na aplikacje (H-04), funkcje TEST. Agent ok. 1,5 h; właściciel: 2–3 pytania.
- E3: kontrakt, `zakres.mjs` z kodem 0, przekazanie do 04–08. Agent ok. 1 h; właściciel: bramka.

**Pytanie o apetyt (E0, [OCENA] godzin właściciela: decyzje, testy na telefonie, przegląd wydań; metoda: 1–2 h na prostą funkcję, 4–8 h na funkcję z treścią albo zakupem; liczby doprecyzuje ranking w E2):**
- (a) ok. 25 h: pętla nauki i podłogi (F-01–F-07, F-13–F-16); płatna część to tylko sesje ćwiczeń, więc słaby argument „stałej wartości” dla subskrypcji (OG-05, RYZ-01).
- (b) ok. 40 h: jak (a) oraz powtórki (F-10) i scenariusze (F-12), czyli cała płatna część z decyzji E2 roli 02.
- (c) ok. 50 h: wszystko, także ICM (F-08), SPR (F-09) i przypomnienie (F-11).
