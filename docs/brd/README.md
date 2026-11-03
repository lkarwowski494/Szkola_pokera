# BRD: Szkoła Pokera
Stan: E2 zakończone, decyzja właściciela „Kontynuować do E3” (2026-11-03) · Rola 01 build · Stan sztafety: `docs/sztafeta.md` · Założenia: `docs/zalozenia.md`

| Plik | Zawartość | Stan |
|---|---|---|
| `wywiad.md` | wywiad z właścicielem W-01–W-07 | W-07 z E2 (scenariusze zamiast gry z botami) |
| `odkrywanie.md` | prace J, persony P, kontekst, zasady ZP, granice, rynek, ograniczenia OG-01–OG-14, hipotezy H-01–H-09, ryzyka RYZ-01–RYZ-08 | E2 |
| `reguly.md` | reguły RD-01–RD-12 z wektorami (RD-12 krytyczna, bez źródeł: OP-10) | E2 |
| `errata.md` | ER-01–ER-11: sprzeczności PRD, karty 48 i kodu z celem i źródłami | E2 |
| `zrodla.md` | źródła S-01–S-53 | E2 |
| `dane/konkurencja-2026-11-03.json` | 102 aplikacje nauki: oceny, ceny, wiek, języki, typ (bez cudzych opisów i recenzji) | E2 |
| `wymagania-*.md` | przepływy PR, wymagania BR, NFR | E3 |

## Streszczenie E2
- Rynek: 102 aplikacje nauki (72 nowe wobec skanu roli 02). Płatne są zadania z oceną i analizą; gra z botami jest u konkurencji przeważnie darmowa. Najczęstsza potrzeba w recenzjach: wyjaśnienie „dlaczego”.
- Polityki: nic nie blokuje funkcji (bez gry na pieniądze, nagród i żetonów z wartością). Kategoria wiekowa zależy od tego, czy jest zakład (OG-02); kierunek W-07 (scenariusze bez stosu) prawdopodobnie ją obniża, ale progu nie podaje żadne źródło (OP-18).
- Dziedzina: 11 reguł obliczeniowych z wektorami niezależnymi od kodu; ocena zagrań ma iść za źródłem (ER-01). Reguła krytyczna: telefon pomocy według kraju (RD-12, ER-04).

## Blokery wydania (wstępne, pełna lista w E3)
- RD-12 / ER-04: brak telefonu pomocy dla krajów sprzedaży (zdrowie użytkownika, aplikacja o pokerze).
- OG-05 / RYZ-01: subskrypcja bez stałej wartości grozi odrzuceniem.
- OG-06: ujawnienia przed zakupem, przywracanie, anulowanie, pełna lokalizacja cen.
- OG-01: żetony bez wartości, bez nagród, bez pomocy w czasie gry.

## Otwarte pytania
Numery od 2 do 8 nie są używane w BRD (te numery pytań ma `docs/monetyzacja.md`).

| ID | Pytanie | Rozstrzyga | Dotyczy |
|---|---|---|---|
| OP-01 | Rozstrzygnięte 2026-11-03: bez rozmów z graczami — „Nie, wystarczą recenzje” (ryzyko RYZ-06) | właściciel | P-1, J-01 |
| OP-09 | [DO USTALENIA] Zgodność modelu ICM Malmutha–Harville'a z literaturą szczebla 3 (cytat) | 06 | RD-09 |
| OP-10 | [DO USTALENIA] Numery pomocy przy problemie z hazardem z oficjalnych źródeł dla każdego kraju sprzedaży (US i GB przeczytane: S-39–S-41; JP, CA, BR, FR, TW, VN, DE i pozostałe — brak) | 06, 01 | RD-12, ER-04 |
| OP-11 | Rozstrzygnięte 2026-11-03: „Jakość decyzji, bez obietnicy (Recommended)” — bez obietnicy wygranej i bez wskazania gry online; odrzucone: cel z PRD | właściciel | ER-03 |
| OP-12 | Rozstrzygnięte 2026-11-03: „Usunąć SDK (Recommended)” — raporty awarii z App Store Connect i Play Console, etykieta „Data Not Collected”; odrzucone: zostawić wyłączone, włączyć bez danych osobowych; zmienia ADR-17 (wpis w rejestrze 03: krok właściciela) | właściciel | ER-06 |
| OP-13 | [DO WYJAŚNIENIA] Czy opinia prawna o art. 29 u.g.h. jest potrzebna przy braku storefrontu PL i języku pl | właściciel | ER-09, OG-07 |
| OP-14 | [DO USTALENIA] Co Apple uznaje za „gambling aid” (brak definicji w wytycznych) | 01, 07 | OG-01 |
| OP-15 | [DO WYJAŚNIENIA] Dostępność: wszystkie storefronty poza PL czy lista rynków (KR i AU mają osobne skutki kategorii) | właściciel | OG-03 |
| OP-16 | [DO USTALENIA] Wymogi informacji o subskrypcji ze Schedule 2 umowy Apple | 02 | OG-06 |
| OP-17 | Rozstrzygnięte 2026-11-03: status przedsiębiorcy DSA już jest na koncie (właściciel; repo `trening`, `docs/45-formalnosci-asc.md:21`) | właściciel | OG-13 |
| OP-18 | [DO USTALENIA] Czy scenariusz bez stosu do wygrania to „brak” symulowanego hazardu w ankiecie Apple i IARC | recenzja Apple, ankieta IARC; rola 01 przygotowuje odpowiedzi i notatkę dla recenzenta | OG-02, ZAL-012 |
