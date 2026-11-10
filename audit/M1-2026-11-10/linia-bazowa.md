# Linia bazowa całości (E0b) — PokerGym / Szkoła Pokera — 2026-11-10

Zapisana przed lekturą BRD, projektu, kontraktu zakresu, ADR, wyniku bramki i kodu aplikacji. O aplikacji przeczytano tylko: opis w sklepie (`store/app-store-metadata.json`, en-US, pl) i zdanie celu właściciela z `CLAUDE.md` („Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening.”). Research zewnętrzny (alternatywy, recenzje, wytyczne Apple) zlecony jednemu subagentowi bez dostępu do repo: `soczewki/e0b-research.md` (cytaty sprawdzone na surowym tekście, odczyt 2026-11-10; wyjątki oznaczone tam).

## Linia bazowa (5 zdań)
1. Główna praca użytkownika: nauczyć się podejmować lepsze decyzje w NLHE (od zasad do strategii) przez krótkie, codzienne ćwiczenia z oceną i wyjaśnieniem „dlaczego”, bez gry o pieniądze.
2. Najlepsze alternatywy (GTO Preflop Wizard, Postflop+, Poker Trainer; poza aplikacją GTO Wizard web i książki) są 3–13× droższe, tylko po angielsku, dwie śledzą użytkownika; ich najczęstsze skargi to nieuczciwe płatności (29/40 recenzji 1–2★ PFW) i treść przecząca sama sobie, bez „dlaczego”, z oceną zero-jedynkową.
3. Najlepsza w klasie wygrywa więc: poprawnością i spójnością treści (jedno źródło klucza odpowiedzi, jawne założenia spotu, ocena stopniowana, strategie mieszane), uczciwym zakupem (darmowa wartość, jasna cena, przywracanie, bez fałszywych promocji) i lokalizacją z brakiem śledzenia.
4. Ograniczenia platformy: wytyczne Apple 3.1.2 (subskrypcje: wartość ciągła, jasne warunki), 5.1.1 (prywatność), 2.3.6 (uczciwa ocena wiekowa — „Simulated Gambling”), 4.3/5.3 (hazard); dziedzina: GTO w NLHE to przybliżenie solvera, nie rozwiązanie gry.
5. Obszary krytyczne: dane postępu offline (zapis, migracja, eksport/import, „Usuń postęp”), zakupy i dostęp (limit dzienny, przywracanie, odnawianie), poprawność treści i liczb w 12 językach 1.0, prywatność (manifest, etykieta, brak SDK), zgodność opisu w sklepie z kodem.

## Wymiary pokrycia (kurs całości)
| Wymiar | Wynik linii bazowej (co trzeba sprawdzić) |
|---|---|
| Praca użytkownika | codzienna sesja decyzji + kurs; wartość = poprawne „dlaczego” (B1–B6 researchu) |
| Alternatywy dziś | tabela A researchu; przewaga ceny, języków, prywatności |
| Ograniczenia | C researchu; ocena wiekowa, 3.1.2, 5.1.1 |
| Dane od zapisu do ratunku | zapis po każdej odpowiedzi, migracja między buildami, eksport/import, usunięcie, awaria w trakcie sesji |
| Pieniądze | ekran zakupu → StoreKit → dostęp → przywracanie → wygaśnięcie; brak „dark patterns” (B7–B9) |
| Prywatność | manifest (`app.json`), etykieta „Data Not Collected”, polityka prywatności pod adresem (w opisie wstawka [PRIVACY URL]) |
| Fakty od źródła do ekranu | liczby z jednego źródła; tłumaczenia nie zmieniają liczb ani znaczenia reguł |
| Obietnice vs kod | każda pozycja opisu w sklepie (ocena poziomu ≤ 8 pytań, egzamin 15 zadań, 4 stopnie oceny, malowanie zakresu, przypomnienie, eksport/import, ekran Pomoc, jedna darmowa aktywność dziennie) ma działający kod |
| Wydanie | ocena wiekowa, notatki dla recenzenta, zrzuty w 12 językach, polityka prywatności opublikowana |
| Koszty i limity | CI na macOS (E2E iOS) w darmowym limicie; czas właściciela tylko telefon |

## Soczewki (M1 sam, po kolei)
- **Nowy użytkownik w 1. tygodniu:** czy pierwsze minuty są bez błędów (B6), czy ocena poziomu nie kończy się paywallem (B7), czy dzienny limit jest zrozumiały przed zakupem.
- **Praktyk dziedziny:** czy odpowiedzi nie są zero-jedynkowe (B3), czy założenia spotu jawne (B4), czy „GTO” nazwane przybliżeniem (B5), czy egzaminy nie przeczą lekcjom (B1).
- **Recenzent sklepu / użytkownik konkurencji:** zgodność opisu z kodem, przywracanie zakupów, ocena wiekowa, link do warunków subskrypcji, brak wymuszonej prośby o ocenę (B12).
- **Sceptyk ryzyka:** utrata postępu przy aktualizacji/imporcie, dostęp po wygaśnięciu, prywatność (brak sieci poza StoreKit?), sekrety w publicznym repo i workflowach.
- **Właściciel z budżetem 0 zł:** koszt minut macOS w CI, czas właściciela na testy telefonem, liczba ręcznych kroków przed wysyłką do App Store.

## Punkty do porównania z raportami ról (E2.4)
LB-01 spójność klucza odpowiedzi z lekcjami/regułami (06, 07) · LB-02 wyjaśnienie z liczbami przy każdej odpowiedzi (06) · LB-03 ocena stopniowana i ręce mieszane (06) · LB-04 jawne założenia spotu (06, 04) · LB-05 GTO jako przybliżenie (06) · LB-06 brak błędów w pierwszych lekcjach we wszystkich 12 językach (06, 09) · LB-07 darmowa wartość przed paywallem (02, 03) · LB-08 uczciwa cena i brak fałszywych promocji (02, 10) · LB-09 warunki subskrypcji i anulowanie widoczne przed zakupem (02, 10) · LB-10 przywracanie zakupów i postęp przenośny (08, 12) · LB-11 „Data Not Collected” zgodne z kodem (05, 10) · LB-12 brak wymuszonej prośby o ocenę (11) · LB-13 ocena wiekowa uczciwa (10) · LB-14 lokalizacja pełna, nie tylko metadane (09) · LB-15 bez waluty i mikrotransakcji, ekran pomocy hazardowej (02, 06).
