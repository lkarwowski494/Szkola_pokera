# Linia bazowa całości (E0b M1) — PokerGym / Szkoła Pokera — 2026-11-17

Commit audytu: f75acdff16915aeb43ff788888216e28616c11ed. Powstała przed lekturą BRD, ADR, kontraktu zakresu, projektu i kodu aplikacji (GEN-02). O aplikacji przeczytano tylko: opis w sklepie `store/app-store-metadata.json` (en-US) i zdanie celu właściciela z `CLAUDE.md` („Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening.”, 2026-11-03) oraz sekcję „Stan projektu” (`CLAUDE.md`). Surowe pliki źródeł: scratchpad sesji IR (`web/`), odczyt 2026-11-17 ok. 10:53 UTC przez `curl` (tekst surowy, nie streszczenie modelu).

## Praca użytkownika i sytuacje użycia
1. **Główna praca:** „nauczyć się podejmować lepsze decyzje w No-Limit Hold'em, od zasad do strategii, bez ryzyka pieniędzy” — początkujący i średniozaawansowany gracz rekreacyjny (opis sklepu: „from the rules and hand rankings to strategy on every street”).
2. **Sytuacje:** krótkie sesje w kolejce/transporcie (offline), powrót następnego dnia do powtórek; przegląd przed grą; sprawdzenie „dlaczego to zagranie było złe”.
3. **Praca poboczna:** zrozumieć liczby (outs, pot odds) bez kalkulatora; mieć pewność, że uczona strategia jest poprawna.

## Alternatywy czytane dziś (App Store US, 2026-11-17)
Źródło listy: `https://itunes.apple.com/search?term=poker+gto+trainer&country=us&entity=software` i `term=poker+training`; recenzje: strony `https://apps.apple.com/us/app/id<ID>?see-all=reviews` (JSON w HTML, 10 najbardziej pomocnych na aplikację).

| Alternatywa | Ocena / liczba ocen | Model | Najczęstsze skargi (cytaty z recenzji, data recenzji) |
|---|---|---|---|
| Poker Trainer – Learn Poker (SweDevIT AB, id 6478522482) | 4,75 / 1181 | darmowa + subskrypcja (z recenzji: „charged 60 bucks for a year long subscription”, 2025-07-30) | nieczytelna konfiguracja: „I'm spending most of the time figuring out how to set up my parameters” (2026-06-23); wątpliwa poprawność: „i question when it tells me to call an all-in check raise…” (2026-01-27); uproszczone zakresy: „lacking the range detail which results in training to be TOO tight” (2026-02-23); obciążenie po próbnym okresie (2025-07-30) |
| Postflop+ GTO Poker Trainer (Crafty Wheel, id 1488850006) | 4,67 / 1984 | subskrypcja | brak wyjaśnień: „it doesn't provide reasoning behind blunders. Just says your move was a blunder” (2024-04-28); cena/subskrypcja: „Price is a big problem for me as I'm scared of anything that is a subscription” (2024-10-23); ocena błędu: „My ELO constantly gets hit by blunders even if … I choose the 2nd best” (2023-05-19) |
| GTO Preflop Wizard Poker AI (Heater LLC, id 6590603158) | 4,76 / 3491 | subskrypcja (6 mies./rok wg recenzji) | brak nauki: „it doesn't explain any of its logic. It doesn't lay out a curriculum and introduce ideas to you slowly” (2025-03-30); cena: „Overpriced and incredibly limited” (2025-03-30) |
| Bez aplikacji | — | książki (np. „Modern Poker Theory”, „Play Optimal Poker”) i darmowe wideo | wysoki próg wejścia, brak ćwiczeń z oceną; [OCENA, bez przeczytanego źródła — tylko kontekst] |

Wniosek z alternatyw: rynek jest pełen „drillerów” (GTO bez programu nauczania) z subskrypcją; powtarzające się skargi to (a) brak wyjaśnień i programu, (b) wątpliwa poprawność/uproszczenia bez nazwania, (c) cena i pułapki subskrypcji, (d) zawiła konfiguracja. Najlepsza w klasie aplikacja dla początkującego: kurs krok po kroku + ćwiczenie z wyjaśnieniem liczbowym + poprawność zgodna z wynikami solverów + uczciwy, prosty model zakupu.

## Ograniczenia platformy i dziedziny (przeczytane dziś)
- App Review Guidelines (`https://developer.apple.com/app-store/review/guidelines/`, 2026-11-17): 5.3.3 „Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.”; 5.3.4 o grach na prawdziwe pieniądze (licencje, geo-ograniczenie). 3.1.2(a): subskrypcja musi „provide ongoing value to the customer”.
- Age ratings (`https://developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions/`, 2026-11-17): „Simulated Gambling: Betting or wagering without using real money…”; w Brazylii (rynek z listy kolejnych) region-specific rating dla „App with any instances of simulated gambling”; Korea: „Frequent or Intense simulated gambling … only available … if you provide a Rating Classification Number” (KR nie jest na liście rynków). Czy ćwiczenia decyzji pokerowych to „simulated gambling” — [DO USTALENIA dla roli 10].
- Dziedzina: hierarchia źródeł ADR-24 z `CLAUDE.md` (rachunek → solvery → książki → serwisy); poprawność liczb jest pracą krytyczną (skargi alternatyw potwierdzają, że użytkownicy ją sprawdzają).
- Odpowiedzialna gra: aplikacja o pokerze powinna wskazywać pomoc przy problemie z hazardem (opis sklepu deklaruje ekran pomocy).

## Obszary krytyczne
- **Dane:** postęp nauki na urządzeniu (powtórki, seria, wyniki) — zapis, migracja, eksport/import, „usuń” (opis sklepu obiecuje te trzy).
- **Prywatność:** „no account, no ads and no tracking” — obietnica sprawdzalna w kodzie, manifeście i etykiecie.
- **Pieniądze:** limit dzienny bez zakupu + kwartał/rok/dożywotni; przywracanie zakupów, uczciwość limitu, auto-odnawianie opisane.
- **Bezpieczeństwo/treści krytyczne:** błędna strategia albo liczba = szkoda finansowa przy grze; pomoc hazardowa poprawna dla kraju.
- **Wydanie:** brak hazardu (5.3), kategoria wiekowa, 35 języków obiecanych w celu vs liczba języków sklepu.

## Co musi być prawdą (punkty do porównania z raportami ról, GEN-02)
| # | Punkt | Obszar | Dowód |
|---|---|---|---|
| LB-01 | Każda ocena zagrania ma wyjaśnienie z liczbami i jest zgodna ze szczeblami 1–2 ADR-24 (rachunek, solver); uproszczenia nazwane | treść | skargi Postflop+/Preflop Wizard/Poker Trainer wyżej |
| LB-02 | Program nauczania od zera, kolejność pojęć, pojęcie zdefiniowane przed użyciem | przepływ, treść | skarga „doesn't lay out a curriculum” |
| LB-03 | Pierwsza sesja bez konfiguracji: od otwarcia do pierwszego ćwiczenia w < 1 min, bez instrukcji | przepływ | skarga „figuring out how to set up my parameters” |
| LB-04 | Ocena nie karze drugiego najlepszego jak „blunder”; skala ocen spójna z EV/częstotliwościami | treść | skarga Postflop+ 2023-05-19 |
| LB-05 | Postęp nie ginie: zapis transakcyjny, migracja na kopii poprzedniej wersji, eksport/import działa między urządzeniami, „usuń” usuwa | dane | obietnica opisu sklepu |
| LB-06 | Zero śledzenia: brak SDK analityki/reklam, manifest i etykieta App Privacy zgodne z kodem | prywatność | obietnica opisu sklepu |
| LB-07 | Zakupy: limit dzienny działa uczciwie i przejrzyście, przywracanie zakupów, auto-odnawianie i warunki widoczne przed zakupem (3.1.2) | pieniądze | Guidelines 3.1.2(a); skarga „Steals money” |
| LB-08 | Brak elementów hazardu (żetony do wygrania, waluta, IAP powiązane z grą) — 5.3.3; kategoria wiekowa prawidłowa (simulated gambling?) | wydanie | Guidelines 5.3.3, age ratings |
| LB-09 | Pomoc przy problemie z hazardem z aktualnymi numerami dla rynków sprzedaży | treść krytyczna | opis sklepu „Help screen” |
| LB-10 | Lokalizacja: obietnica „35 języków jak Trening” spełniona albo opis/zakres poprawiony; terminologia pokerowa poprawna w każdym języku | lokalizacja | cel właściciela vs `content/` (12 katalogów językowych w inwentarzu) |
| LB-11 | Działa offline, bez konta | przepływ | opis sklepu |
| LB-12 | Dostępność: Dynamic Type do AX5, VoiceOver dla siatki zakresów i stołu | przepływ | ograniczenie platformy (HIG) [źródło do odczytu przez rolę 04/07] |
| LB-13 | Cena konkurencyjna wobec subskrypcji alternatyw i bez pułapek próbnych okresów | pieniądze | recenzje wyżej |
| LB-14 | Obietnice sklepu (np. „placement check up to 8 questions”, „module exam 15 questions”) zgodne z kodem | wydanie | opis sklepu |
| LB-15 | Właściciel z 0 zł i małą ilością czasu: CI, E2E, wydanie automatyczne; koszty usług w limitach | koszty | `CLAUDE.md` zasady techniczne |

## Soczewki (M1 sam, po kolei; subagenci-soczewki dopiszą w partii 1)
1. Nowy użytkownik w pierwszym tygodniu: LB-02, LB-03, LB-11, LB-12.
2. Praktyk dziedziny: LB-01, LB-04, LB-09.
3. Recenzent sklepu / użytkownik konkurencji: LB-07, LB-08, LB-13, LB-14.
4. Sceptyk ryzyka: LB-05, LB-06, LB-07, LB-08.
5. Właściciel z ograniczonym czasem i 0 zł: LB-15, LB-10 (koszt 35 języków).

## Soczewki-subagenci (partia 1)
(dopisane po partii 1: plik źródłowy, punkty)
