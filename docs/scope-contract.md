# Kontrakt zakresu: Szkoła Pokera
Stan: E3 (rola 03 build, sztafeta 01–05) · Aktualizacja: 2026-11-04 · Wejście: BRD roli 01 (`docs/brd/`, 43 BR, 9 PR, 7 J; po fix ER-12, ER-13), `docs/monetyzacja.md` roli 02 (sesja 2, E3), `docs/zalozenia.md` (ZAL-001–ZAL-012, ZAL-MON-01) · Decyzje: `docs/decyzje.md` D-101–D-111 (właściciel: D-101, D-102, D-107)

Jedyny kontrakt zakresu; czytają go role 01, 02, 04–08. Historia pracy (E0 rama i kandydaci, E1 wzorzec, wymiary i soczewki, E2 warianty, metoda i opcje limitu) jest w `docs/archiwum/scope-contract-2026-11-03-robocze.md`. Zmiana zakresu po zatwierdzeniu tylko przez bramkę „Zmiany zakresu” niżej. *Dlaczego:* role 04–08 pracują z jednego źródła zakresu, a bez bramki zakres rośnie albo kurczy się po cichu.

## Główna praca i pętla
- Główna praca: J-01 „Kiedy gram rekreacyjnie […] chcę w krótkich sesjach ćwiczyć decyzje z wyjaśnieniem »dlaczego«, żeby grać pewniej i rzadziej popełniać drogie błędy” razem z J-02 (nauczyć się od zera) i J-03 (utrwalić odruchowo); J-04 (całe rozdanie) i J-05 (swój poziom) to krok i wejście tej samej pętli; J-06 (zachować postęp) i J-07 (zgłosić błąd, ocenić) to podłogi.
- Pętla główna: pierwszy ekran F-02 → ocena poziomu F-01 → lekcja z ćwiczeniem F-03 → ocena zagrania z „dlaczego” F-05 → krótka sesja F-07 → powtórki błędów F-10 → następna lekcja albo test modułu F-04; krok „sprawdź się”: scenariusz całego rozdania F-12. Wejście zaawansowanego: F-01 → F-04 → F-07.
- Funkcja MVP spoza tej linii ma podłogę (F-06, F-13, F-14, F-15, F-17, F-18) albo decyzję D-102 (F-08, F-09, F-11, F-16); sprawdza `zakres.mjs`.
- Apetyt wersji 1: ok. 16,5 h czasu właściciela [OCENA] = koszt wybranego wariantu 1 „Pełna nauka” (D-102; właściciel nie podał liczby w E0, linia cięcia to wariant). Metoda kosztu: 0,25 h prosty ekran, 0,5–1 h przepływ z kilkoma stanami, 1,5–2,5 h przepływ wieloetapowy albo z kontem sklepu; godziny to przejścia listy kontrolnej na telefonie (3 buildy TestFlight) i decyzje, bez czasu agenta.
- Podział: jedna aplikacja, turnieje (M11, ICM) w tym samym Pro (D-103; wytyczna 4.3(a)).
- Wzorzec najlepszych (odczyt 2026-11-03 ok. 20:49 UTC, `itunes.apple.com/lookup` i RSS recenzji US; kryterium: ta sama praca, co najmniej dwie części pętli w opisie, kolejność `userRatingCount`; dane `docs/zakres/wzorzec-2026-11-03.json`): GTO Preflop Wizard (3483 oceny; codzienny quiz, bez lekcji od zera; skargi: ściana płatności po ankiecie, brak „dlaczego”), Postflop+ (1982; ocena w czterech stopniach, dzienna darmowa pula; skargi: brak wyjaśnień słowami, niejasny limit), Poker Trainer – Learn Poker (1165; cała nasza pętla; skargi: konfiguracja przed nauką, błędne zalecenia). Wniosek: pętla to standard niszy; wyróżnik to sposób — lekcje i pierwszy egzamin za darmo, „dlaczego” z liczbami, poprawność treści, jawny dzienny limit, start sesji bez ustawień, bez konta i sieci, 35 języków.
- Darmowe i płatne (decyzja właściciela 2026-11-03 i D-107): zawsze darmowe: pierwszy ekran, ocena poziomu, lekcje, pierwsze podejście do testu modułu, szanse i ranking układów, postęp, dane (F-14), pomoc (F-15), zakup (F-13), opinie (F-17), języki, przypomnienie. Z dziennego limitu (1 aktywność dziennie: sesja ćwiczeń, kolejka powtórek, scenariusz albo powtórne podejście do testu): F-07, F-08, F-09 (w sesji), F-10, F-12, F-04 (powtórne). Pro (kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD): bez limitu.
- Plan aktualizacji dla 3.1.2(a) (OG-05, H-09): co kwartał aktualizacja z treścią i poprawkami ze zgłoszeń (D-108).
- Rozstrzygnięcia agenta (delegacja, `docs/decyzje.md`): D-104 kod bez BR poza interfejsem, D-105 ocena poziomu ≤ 8 pytań ok. 2 min, D-106 test modułu 15 zadań 85%, D-109 akcja spoza scenariusza niedostępna, D-110 prośba o ocenę od 3. pracy co 14 dni, D-111 „dzienny limit” zamiast „pula”.

## Zakres (wariant 1, decyzja właściciela D-102)

| ID | Funkcja | Wymagania | Decyzja | Dowód wartości | WTP | Intuicyjność | Podłoga | Zależy od | Uzasadnienie |
|---|---|---|---|---|---|---|---|---|---|
| F-02 | Pierwszy ekran: czym aplikacja jest | BR-ONB-004 | MVP | B: OG-07, NFR-ZGOD-002, OP-11 BRD | WTP-0 (B) · zawsze | jedno zdanie „nauka decyzji, bez gry na pieniądze” i jeden przycisk dalej; wynik: czeka na 04 | prawo: OG-07, NFR-ZGOD-002 | — | podłoga; bloker wydania |
| F-01 | Ocena poziomu i punkt startu | BR-ONB-001, BR-ONB-002, BR-ONB-003 | MVP | B: J-05; R: S-49, S-44 | WTP-2 (R) · zawsze | ≤ 8 pytań z „Pomiń” na każdym ekranie, wynik to wskazana pierwsza lekcja (D-105); wynik: czeka na 04 | — | — | rdzeń pętli (wejście); bloker BR-ONB-001 |
| F-03 | Kurs: lekcje w kolejności z ćwiczeniami, słownik w miejscu użycia (treść) | BR-KURS-001, BR-KURS-003, BR-KURS-004, BR-KURS-005 | MVP | B: J-02; R: S-02, S-03 | WTP-1 (R) · zawsze | następna lekcja wskazana na ścieżce jednym przyciskiem; termin wyjaśniony dotknięciem; wynik: czeka na 04 | — | — | rdzeń pętli; treść roli 06; plan aktualizacji D-108 |
| F-04 | Test modułu do pominięcia znanych treści | BR-KURS-002 | MVP | R: S-49 | WTP-2 (R) · pierwsze podejście zawsze, powtórne z limitu | „Zalicz test” przy module, 15 zadań, wynik z lekcjami do powtórki (D-106); wynik: czeka na 04 | — | F-03 | rdzeń pętli (wejście zaawansowanego) |
| F-05 | Ocena zagrania w czterech stopniach i wyjaśnienie „dlaczego” | BR-CWI-001, BR-CWI-002 | MVP | B: J-01; R: ok. 85 z 828 recenzji o „dlaczego” (BRD, rynek) | WTP-1 (R) · w lekcji zawsze, w sesji z limitu | stopień oceny słowem i znakiem (nie tylko kolorem, NFR-DOST-001), liczby w wyjaśnieniu; wynik: czeka na 04 | bezpieczeństwo: RD-01, RD-02, RD-03, RD-04, RD-05, RD-06, RD-07, RD-08, RD-11 | F-06 | rdzeń pętli; bloker wydania |
| F-06 | Szanse trafienia i ranking układów | BR-CWI-003, BR-CWI-007 | MVP | B: J-01 | WTP-0 (B) · zawsze | liczba dokładna i przybliżenie obok siebie; wynik: czeka na 04 | bezpieczeństwo: RD-04, RD-05, RD-10 | — | podstawa wyjaśnień F-05; bloker BR-CWI-003 |
| F-07 | Krótka sesja ćwiczeń, przerwanie bez straty | BR-CWI-004 | MVP | R: S-01 | WTP-0 (R) · z limitu | start jednym ruchem bez ekranu ustawień treningu (wniosek E1 pkt 4); powrót w tym samym zadaniu; wynik: czeka na 04 | dane: odpowiedzi sesji | F-05 | rdzeń pętli; bloker BR-CWI-004 |
| F-08 | Ćwiczenia ICM w turniejach | BR-CWI-005 | MVP | B: J-01 (M11) | WTP-2 (B) · z limitu | ćwiczenia ICM dostępne w module turniejowym i w sesji, bez osobnego trybu; wynik: czeka na 04 | — | F-07 | D-102 (wariant 1); RD-09 bez uproszczeń; treść roli 06 |
| F-09 | Plan rozdania: SPR i rozmiar geometryczny | BR-CWI-006 | MVP | B: J-01 | WTP-2 (B) · z limitu | zadanie w sesji z wyjaśnieniem wzoru słowami; wynik: czeka na 04 | — | F-07 | D-102 (wariant 1); RD-06, RD-07 bez uproszczeń |
| F-10 | Powtórki rozłożone w czasie | BR-POW-001, BR-POW-002 | MVP | B: J-03; R: S-02 | WTP-1 (R) · z limitu | liczba powtórek na dziś widoczna na starcie; po przerwie bez kary; wynik: czeka na 04 | dane: historia powtórek | F-07 | rdzeń pętli |
| F-11 | Lokalne przypomnienie za zgodą | BR-POW-003 | MVP | R: recenzja 5★ 11591720912 (Wizard, „daily reminders”) | WTP-2 (R) · zawsze | jedno zdanie przed prośbą systemu o zgodę; odmowa bez skutków; wynik: czeka na 04 | — | F-10 | D-102 (wariant 1); koszt 0,75 h |
| F-12 | Scenariusz całego rozdania bez stosu | BR-SCN-001, BR-SCN-002, BR-SCN-003, BR-SCN-004 | MVP | B: J-04, W-07; R: opis Poker Trainer „Practice full hands” (E1) | WTP-1 (R) · z limitu | wybór scenariusza z opisu (pozycja, stack w bb, typ rywala); tylko akcje z oceną (D-109); podsumowanie decyzji, bez wygranej; wynik: czeka na 04 | prawo: OG-01, OG-02 | F-05 | krok „sprawdź się”; stała wartość Pro (OG-05); bloker BR-SCN-002, BR-SCN-003 |
| F-13 | Zakup, przywracanie, anulowanie | BR-ZAK-001, BR-ZAK-002, BR-ZAK-003, BR-ZAK-004 | MVP | B: OG-06; R: 14186853651 (zakup na nowym iPadzie) | WTP-0 (B) · zawsze | ceny ze sklepu; „Przywróć zakupy” na ekranie zakupu i w ustawieniach; wynik: czeka na 04 | prawo: OG-06 | — | podłoga; bloker wydania |
| F-18 | Dzienny limit: 1 darmowa aktywność dziennie | BR-LIM-001, BR-LIM-002, BR-LIM-003, BR-LIM-004, BR-LIM-005 | MVP | B: decyzja właściciela 2026-11-03; R: S-66, S-67, S-68 | warunek · kontrakt płatności | licznik „dziś 1 darmowa aktywność” przed startem, nie w trakcie; rozpoczęta aktywność kończy się; lekcje i pierwszy egzamin bez licznika (D-107); nazwa bez słowa „pula” (D-111); wynik: czeka na 04 | dane: nauka i powtórki nie są zakładnikiem → F-07 | F-13 | podłoga kontraktu płatności; jednostka i N: D-107 |
| F-14 | Eksport, import, usunięcie i zachowanie postępu | BR-DANE-001, BR-DANE-002, BR-DANE-003, BR-DANE-004 | MVP | B: J-06, W-05 | prawo do danych · zawsze | „Eksport” i „Import” w ustawieniach z podglądem; usunięcie z potwierdzeniem; wynik: czeka na 04 | dane: odczyt, eksport, import, usunięcie, migracja | — | podłoga; bloker wydania |
| F-15 | Pomoc przy problemie z hazardem | BR-POM-001, BR-POM-002 | MVP | B: RD-12, OG-14 | WTP-0 (B) · zawsze | „Pomoc” w ustawieniach i w lekcji M12, numer dla kraju jednym dotknięciem; wynik: czeka na 04 | bezpieczeństwo: RD-12 | — | podłoga (reguła krytyczna); bloker wydania |
| F-16 | Języki i zapis liczb | BR-JEZ-001, BR-JEZ-002 | MVP | R: ZAL-003 (JP), `docs/monetyzacja.md` przesiew | WTP-2 (R) · zawsze | język systemu bez wyboru; zmiana w ustawieniach; wynik: czeka na 04 | — | — | D-102; polityka języków właściciela (`CLAUDE.md`, 35 języków) |
| F-17 | Pętla opinii: prośba o ocenę, „Oceń w sklepie”, kontakt, zgłoszenie błędu | BR-OPIN-001, BR-OPIN-002, BR-OPIN-003 | MVP | B: J-07; R: S-63, S-64, S-65 | warunek · zawsze | „Zgłoś błąd” przy ocenie zadania; dwa wpisy w ustawieniach; prośba tylko systemowa (D-110); wynik: czeka na 04 | prawo: OG-15, OG-16 | F-05 | domyślnie w wersji 1 (polecenie roli); bloker BR-OPIN-001 |

## NIE robimy
| ID | Funkcja | Wymagania | Decyzja | Dowód wartości | WTP | Intuicyjność | Podłoga | Zależy od | Uzasadnienie |
|---|---|---|---|---|---|---|---|---|---|
| F-19 | Gra z botami na żetony | H-07 | NIE | — | — | — | — | — | decyzja właściciela W-07 (scenariusze zamiast gry); kod `play/*` poza interfejsem (D-104). Powrót: warunek H-07 w `docs/brd/odkrywanie.md` |
| F-20 | Trener AI z rozmową | H-06 | NIE | — | — | — | — | — | decyzja właściciela W-04; serwer i dane wbrew NFR-OFF-001, NFR-PRYW-001. Powrót: warunek H-06 (recenzje o własne pytania, ZAL-008) |
| F-21 | Raport postępu za zgodą | H-08 | NIE | — | — | — | — | — | W-06 (bez analityki). Powrót: warunek H-08 (porzucenia, których dane sklepu nie wyjaśniają) |


## Funkcje w kodzie bez BR (D-104)
| Kod | Decyzja | Powrót |
|---|---|---|
| „Trening na czas” (`session.tsx`, `mode: 'speed'`) | poza interfejsem wersji 1 | J-03 wspomina presję czasu: ER do roli 01 z dowodem (≥ 3 prośby testerów albo recenzji o ćwiczenia na czas); kod usunięty (ADR 0011), ostatni commit z kodem: `3764d30` |
| Księga reguł (`(tabs)/rules.tsx`, FR-06 starego PRD) | poza interfejsem; reguły widoczne w lekcjach i wyjaśnieniach | ≥ 3 prośby o „ściągę” reguł; kod usunięty (ADR 0011), ostatni commit z kodem: `3764d30` |
| Diagnostyka (`diagnostics.tsx`) | poza interfejsem użytkownika (narzędzie dewelopera) | — (rola 05 decyduje o buildzie testowym); tylko pod `__DEV__` (ADR 0011, `features/diagnostyka/`) |
| Wskaźnik zaawansowania (`advancement.tsx`) | część „gra” wypada z H-07; postęp wiedzy w formie roli 04 w F-03 | razem z H-07; część „gra” usunięta (ADR 0011), ostatni commit z kodem: `3764d30` |
| Gra z botami (`play/*`) | NIE (W-07, H-07) | warunek H-07; kod usunięty (ADR 0011), ostatni commit z kodem: `3764d30` |
| Słownik (`glossary.tsx`) | część F-03 (BR-KURS-003) | — |


## Ranking ([OCENA]: R = odsetek użytkowników pętli w miesiącu, koszt = godziny właściciela w wersji 1, metoda w sekcji „Główna praca i pętla”, archiwum E2)
| ID | R | I | C | Koszt [h] | Metoda |
|---|---|---|---|---|---|
| F-02 | — | — | — | 0,25 | stała (podłoga); jeden ekran |
| F-01 | 70 | 1 | 80 | 0,5 | R: każdy nowy użytkownik widzi ocenę, część pomija; C: R (S-49) |
| F-03 | 80 | 3 | 80 | 2 | R: lekcje to główna droga P-2; koszt: przejście wybranych lekcji w 2 językach |
| F-04 | 30 | 1 | 80 | 0,5 | R: zaawansowani (P-3); C: R (S-49) |
| F-05 | — | — | — | 1 | stała (podłoga); przegląd wyjaśnień w kilku językach |
| F-06 | — | — | — | 0,25 | stała (WTP-0, podłoga) |
| F-07 | — | — | — | 0,5 | stała (WTP-0) |
| F-08 | 15 | 1 | 50 | 0,75 | R: gracze turniejowi wśród P-1 i P-3 [OCENA]; C: B bez R |
| F-09 | 25 | 1 | 50 | 0,75 | R: P-3 i część P-1 [OCENA]; C: B bez R |
| F-10 | — | — | — | 0,75 | stała (podłoga danych: historia powtórek); test na dwa dni |
| F-11 | 30 | 0,5 | 50 | 0,75 | C: jedna recenzja; koszt: zgoda i powiadomienie następnego dnia |
| F-12 | — | — | — | 1,5 | stała (podłoga OG-01, OG-02); przejście 3 scenariuszy |
| F-13 | — | — | — | 2,5 | stała (podłoga); 6 scenariuszy na telefonie z kontraktu płatności (sandbox, drugie urządzenie, zwrot) |
| F-18 | — | — | — | 1 | stała (podłoga); zmiana dnia w telefonie, przerwana sesja |
| F-14 | — | — | — | 1 | stała (podłoga); eksport i import między dwoma telefonami |
| F-15 | — | — | — | 0,5 | stała (podłoga); numer dla 2–3 krajów (zmiana regionu) |
| F-16 | 60 | 2 | 80 | 1,5 | R: użytkownicy poza US (ZAL-003); koszt: wyrywkowy przegląd 3–4 języków |
| F-17 | — | — | — | 0,5 | stała (podłoga); w TestFlight prośba się nie pokazuje (S-57 wzorem Treningu), test linków i poczty |


Wynik `node zakres.mjs docs/scope-contract.md --brd docs/brd --apetyt 16.5` (E3, 2026-11-04; skrypt z modułu `ciecie`, prompts c025063):

```
Ranking (R × I × C ÷ koszt [h]; stałe: podłoga albo WTP-0; „razem” liczy MVP i ten wiersz):
  1. F-02 stała · 0,25 h, razem 0,25 h · MVP
  2. F-05 stała · 1 h, razem 1,25 h · MVP
  3. F-06 stała · 0,25 h, razem 1,5 h · MVP
  4. F-07 stała · 0,5 h, razem 2 h · MVP
  5. F-10 stała · 0,75 h, razem 2,75 h · MVP
  6. F-12 stała · 1,5 h, razem 4,25 h · MVP
  7. F-13 stała · 2,5 h, razem 6,75 h · MVP
  8. F-14 stała · 1 h, razem 7,75 h · MVP
  9. F-15 stała · 0,5 h, razem 8,25 h · MVP
  10. F-17 stała · 0,5 h, razem 8,75 h · MVP
  11. F-18 stała · 1 h, razem 9,75 h · MVP
  12. F-01 wynik 112 · 0,5 h, razem 10,25 h · MVP
  13. F-03 wynik 96 · 2 h, razem 12,25 h · MVP
  14. F-16 wynik 64 · 1,5 h, razem 13,75 h · MVP
  15. F-04 wynik 48 · 0,5 h, razem 14,25 h · MVP
  16. F-09 wynik 16,67 · 0,75 h, razem 15 h · MVP
  17. F-08 wynik 10 · 0,75 h, razem 15,75 h · MVP
  18. F-11 wynik 10 · 0,75 h, razem 16,5 h · MVP
Kolejność budowy MVP: F-01 → F-02 → F-03 → F-04 → F-06 → F-05 → F-07 → F-08 → F-09 → F-10 → F-11 → F-12 → F-13 → F-14 → F-15 → F-16 → F-17 → F-18
21 funkcji (MVP 18, PÓŹNIEJ 0, TEST 0, NIE 3), 43 BR · 0 błędów, 0 uwag
kod 0
```

## Kolejność i przekazanie
- Kolejność budowy MVP (wynik skryptu, porządek zależności): F-01 → F-02 → F-03 → F-04 → F-06 → F-05 → F-07 → F-08 → F-09 → F-10 → F-11 → F-12 → F-13 → F-14 → F-15 → F-16 → F-17 → F-18. Dla roli 08 kolejność wdrożenia: najpierw pętla i jej podłogi merytoryczne (F-02, F-01, F-03, F-06, F-05, F-07, F-10, F-04), potem limit i zakup (F-13, F-18 — limit zależy od stanu zakupu), dane (F-14) i pomoc (F-15, bloker), na końcu F-12, F-08, F-09, F-11, F-16, F-17. Większość ćwiczeń ma kod (`apps/mobile/src/features/drills/`, `session`, `glossary`, `help`); ponowne użycie ocenia rola 05.
- **04 (Studio Projektowe):** przepływy PR-01–PR-09 z `docs/brd/wymagania.md` (wszystkie w zakresie; kto, cel, kroki, częstotliwość i kontekst są w BRD). Kryteria z kolumny „Intuicyjność” do przejścia poznawczego (cztery pytania Flaherty) i, gdzie się da, 3–5 osób bez instrukcji; wynik wraca tu jako `wynik: <pozytywny|negatywny>, <data, plik>` przez bramkę zmian. Najważniejsze do sprawdzenia: ocena poziomu bez wrażenia ankiety przed ścianą płatności (D-105), start sesji jednym ruchem bez ustawień, licznik dziennego limitu czytelny przed startem i nieobecny w trakcie (S-67), stopnie oceny nie tylko kolorem (NFR-DOST-001), pomoc F-15 widoczna z ustawień i z lekcji M12, nie schowana w zakładce Postęp (D-104). Teksty interfejsu bez słowa „pula” dla limitu (D-111). Nie projektować: F-19, F-20, F-21 i kodu z tabeli „Funkcje w kodzie bez BR” (tryb na czas, księga reguł, diagnostyka, część „gra” wskaźnika, gra z botami). Otwarte: OP-19 (podłogi dostępności).
- **05 (architektura):** przepływy jak wyżej. Dane zapisują: F-01 (wynik oceny, punkt startu), F-03 i F-04 (postęp lekcji i testów), F-07 (odpowiedzi sesji, powrót w tym samym zadaniu), F-10 (harmonogram powtórek; po blokadzie limitu przesunięty, nie skasowany — BR-LIM-004), F-12 (przebieg scenariusza), F-13 (stan zakupu ze sklepu), F-18 (licznik dnia), F-11 (zgoda i pora przypomnienia), F-16 (wybrany język); wszystko w eksporcie, imporcie i usunięciu F-14 z migracją w transakcji (NFR-DANE-001, zasada wspólna 10). Bez sieci cała nauka (NFR-OFF-001); sieć tylko sklep i linki. W tle: tylko lokalne powiadomienie F-11. Uprawnienia: tylko powiadomienia (za zgodą). Do rozstrzygnięcia: OP-24 (licznik po ponownej instalacji: lokalny czy Keychain; realność obejścia brzegowa), OP-21 (budżet czasu do pierwszej decyzji, najstarszy telefon); granica dnia limitu ustalona: dzień kalendarzowy daty i strefy telefonu (BR-LIM-005). Kod bez BR (D-104): ukrycie albo usunięcie decyduje 05 z 08; bez nowych tabel i zależności na zapas dla F-19–F-21.
- **06 (treści i źródła):** treść jest funkcją w F-03 (lekcje w kolejności modułów z BR-KURS-001, słownik), F-05 (wyjaśnienia „dlaczego” z liczbami), F-08 (ICM), F-09 (SPR, rozmiar geometryczny), F-12 (scenariusze), F-15 (numery pomocy), F-01 i F-04 (pytania oceny i testów). Reguły w zakresie: RD-01–RD-11 (bezpieczeństwo merytoryczne, blokery BR-CWI-001–003, BR-SCN-003) i reguła krytyczna RD-12 (F-15). Otwarte: BRD OP-10 — numery pomocy dla wszystkich storefrontów poza PL (najpierw JP, CA, BR, FR, TW, VN, DE; reszta gałąź RD-12-W6), bloker wydania. Plan aktualizacji D-108: nowe scenariusze i zadania co kwartał. Przegląd zastępczy treści krytycznych (`CLAUDE.md`, D-027 biblioteki).
- **07 (testy):** BR w zakresie: wszystkie z kolumny „Wymagania” wierszy MVP (43 BR); scenariusze w `docs/brd/wymagania.md`, `wymagania-nauka.md`, `wymagania-sklep.md` (nagłówki „### BR-…”), wektory RD w `tests/wektory/brd.json`. Blokery wydania: `docs/brd/README.md`, sekcja „Blokery wydania” (13 wierszy, w tym BR-LIM-002–004 i BR-OPIN-001). Kryteria intuicyjności, których nie zautomatyzuje: test pierwszego użycia roli 04. Znaleziska stanu: E2E na `main` (`.github/workflows/e2e.yml`, Maestro iOS) czerwony w przebiegach 14–18 (16–20.10.2026, odczyt 2026-11-04) i wyłączony 20.10; test `tools/content-build` „kompiluje się bez błędów…” niestabilny na limicie 5 s (`pnpm run ci`, 2026-11-03). Lista kontrolna na telefonie niżej to wejście do planu testów; kryterium bez sprawdzalnego wyniku 07 zgłasza jako ER do roli 01.
- **08 (kod):** kolejność wyżej; zadania kodu z D-104 (wejścia trybu na czas, księgi reguł, diagnostyki i gry poza interfejsem; pomoc i słownik poza zakładką Postęp), limit F-18 według BR-LIM-001–005 i D-107, nazwa „dzienny limit” w kodzie i tekstach.
- **02 (monetyzacja):** podział bez zmian względem decyzji właściciela 2026-11-03; do aktualizacji `docs/monetyzacja.md`: OP-11 zamknięte decyzją D-107 (N = 1 aktywność dziennie; jednostka: sesja ćwiczeń, kolejka powtórek, scenariusz albo powtórne podejście do testu), nazwa „dzienny limit” zamiast „pula” (D-111; 9 wierszy z „pula/puli”), OP-10 = BRD OP-24 (rola 05).
- **01 (odkrywanie):** zamknąć w BRD decyzjami: OP-23 (D-107; w BR-LIM-001, BR-LIM-005 i `wymagania-sklep.md` „N darmowych zadań” zastąpić jednostką „aktywność” i N = 1), OP-20 (D-105), OP-22 (D-106); tryb `fix` albo wpis ER. Brak nowych ER z E3.

## Lista kontrolna na telefonie (właściciel, TestFlight)
Agent testuje sam (`pnpm run ci`, E2E, kontrole zastępcze); właściciel tylko to, czego nie da się sprawdzić bez prawdziwego telefonu i konta sklepu. [OCENA] razem ok. 16,5 h na 3 buildy (tabela „Ranking”, kolumna „Koszt”). Szczegółowe kroki i oczekiwane wyniki dopisze rola 07 do planu testów.
| Nr | Sprawdź | Funkcja | Wynik oczekiwany |
|---|---|---|---|
| T-01 | Pierwsze uruchomienie, ocena poziomu, „Pomiń” | F-02, F-01 | jedno zdanie „nauka decyzji, bez gry na pieniądze”; ≤ 8 pytań; bez ekranu zakupu na końcu; wskazana pierwsza lekcja |
| T-02 | Pierwsza lekcja w dwóch językach (EN, PL) | F-03, F-05, F-06, F-16 | ocena zagrania słowem i znakiem, liczby w wyjaśnieniu, termin wyjaśniony dotknięciem |
| T-03 | Sesja przerwana (wyjście z aplikacji) i powrót | F-07 | powrót w tym samym zadaniu, bez utraty odpowiedzi |
| T-04 | Dzienny limit: druga aktywność tego samego dnia, zmiana daty w telefonie | F-18, F-10 | licznik przed startem; rozpoczęta aktywność kończy się; lekcja i pierwszy test bez licznika; powtórki następnego dnia na miejscu |
| T-05 | Zakup w sandboksie, przywrócenie na drugim urządzeniu, anulowanie, zwrot | F-13 | ceny ze sklepu; „Przywróć zakupy” działa; po zakupie limit znika (6 scenariuszy z kontraktu płatności) |
| T-06 | Eksport, import na drugim telefonie, usunięcie danych | F-14 | postęp, powtórki i ustawienia przeniesione; usunięcie z potwierdzeniem |
| T-07 | Pomoc przy hazardzie przy regionie US, GB i kraju bez wpisu | F-15 | właściwy numer jednym dotknięciem; gałąź RD-12-W6 dla kraju bez wpisu |
| T-08 | Przypomnienie: zgoda i odmowa | F-11 | zdanie przed prośbą systemu; odmowa bez skutków; powiadomienie następnego dnia |
| T-09 | Trzy scenariusze całego rozdania | F-12 | tylko akcje z oceną; podsumowanie decyzji, bez wygranej i bez stosu |
| T-10 | „Oceń w sklepie”, „Napisz do nas”, „Zgłoś błąd” przy zadaniu | F-17 | link sklepu i poczta otwierają się; zgłoszenie ma identyfikator zadania (prośba systemowa w TestFlight się nie pokazuje, S-57) |

## Definicja ukończenia (build), z dowodem
| Punkt | Dowód |
|---|---|
| Każde BR ma dokładnie jedną decyzję; `zakres.mjs --brd` kod 0 | wynik wyżej: 43 BR, 21 funkcji, 0 błędów, 0 uwag, kod 0 (2026-11-04) |
| Pętla główna opisana pracą J i listą funkcji; MVP służy pętli, podłodze albo ma decyzję właściciela | sekcja „Główna praca i pętla”; F-08, F-09, F-11, F-16 mają D-102 w Uzasadnieniu (skrypt sprawdza: 0 błędów) |
| Każda funkcja MVP: BR, dowód B/R/W, klasa WTP z roli 02, kryterium intuicyjności z `wynik:`; WTP-X nie w MVP; H → TEST | kolumny tabeli „Zakres”; żadna funkcja MVP nie stoi na samej H, brak WTP-X; F-17 i F-18 mają klasę „warunek” (podłoga sklepu i kontraktu płatności, nie WTP); `wynik:` wszędzie „czeka na 04” |
| Każde NIE i PÓŹNIEJ ma powód i „Powrót:” | tabela „NIE robimy” (F-19–F-21; skrypt sprawdza); PÓŹNIEJ: brak |
| Podłogi funkcji w zakresie nie wycięte ani uproszczone bez źródła | kolumna „Podłoga”: RD-01–RD-12, OG-01, OG-02, OG-06, OG-07, OG-15, OG-16, dane F-07, F-10, F-14, F-18; żadna funkcja z podłogą nie wypadła |
| R, I, C, koszt i apetyt to [OCENA] z metodą albo dane z datą | tabela „Ranking” z kolumną „Metoda”; metoda kosztu w „Główna praca i pętla”; apetyt = koszt wariantu (D-102); wzorzec z datą odczytu |
| Właściciel wybrał wariant z co najmniej dwóch, apetyt i podział; słowa i data w rejestrze | D-102 (wariant 1 z 1/2/3, słowa „1 »Pełna nauka« (Recommended)”), D-107 (limit z a/b/c); podział D-103 decyzją agenta z delegacji (weto możliwe) |
| Przekazanie dla 04–08 | sekcja „Kolejność i przekazanie” i `docs/sztafeta.md` |
| Nie sprawdzone | przejście poznawcze na prototypie (rola 04); rejestr 03 i dokument 13 na Dysku bez wpisów D-101–D-111 (konektor nie edytuje Google Docs: krok właściciela) |

## Zmiany zakresu
| ID | Data | Prośba (kto, skąd) | Bramka: praca i dowód · intuicyjność · koszt · co wypada | Decyzja (ID, słowa właściciela) |
|---|---|---|---|---|
