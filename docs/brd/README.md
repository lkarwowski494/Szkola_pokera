# BRD: Szkoła Pokera
Stan: E4 (2026-11-03): BRD zakończone i przekazane (definicja ukończenia z dowodami i przekazanie: `docs/sztafeta.md`, „Rola 01, E4”) · Rola 01 build · Stan sztafety: `docs/sztafeta.md` · Założenia: `docs/zalozenia.md`

| Plik | Zawartość | Stan |
|---|---|---|
| `wywiad.md` | wywiad z właścicielem W-01–W-07 | W-07 z E2 (scenariusze zamiast gry z botami) |
| `odkrywanie.md` | prace J, persony P, kontekst, zasady ZP, granice, rynek, ograniczenia OG-01–OG-16, hipotezy H-01–H-09, ryzyka RYZ-01–RYZ-08 | E2 |
| `reguly.md` | reguły RD-01–RD-12, 80 wektorów (RD-12 krytyczna, część krajów bez źródeł: OP-10); eksport `tests/wektory/brd.json` | E3 |
| `errata.md` | ER-01–ER-13: sprzeczności PRD, karty 48 i kodu z celem i źródłami; prośby roli 03 (ER-12, ER-13) | fix 2026-11-03 |
| `zrodla.md` | źródła S-01–S-68 | fix 2026-11-03 |
| `dane/konkurencja-2026-11-03.json` | 102 aplikacje nauki: oceny, ceny, wiek, języki, typ (bez cudzych opisów i recenzji) | E2 |
| `wymagania.md` | przepływy PR-01–PR-09, NFR (13), pokrycie wymiarów | fix 2026-11-03 |
| `wymagania-nauka.md` | BR: ocena poziomu (ONB), kurs (KURS), ćwiczenia (CWI), powtórki (POW), scenariusze (SCN) | E3 |
| `wymagania-sklep.md` | BR: zakup (ZAK), dane (DANE), pomoc (POM), języki (JEZ), dzienny limit (LIM), opinie (OPIN) | fix 2026-11-03 |

## Streszczenie E2
- Rynek: 102 aplikacje nauki (72 nowe wobec skanu roli 02). Płatne są zadania z oceną i analizą; gra z botami jest u konkurencji przeważnie darmowa. Najczęstsza potrzeba w recenzjach: wyjaśnienie „dlaczego”.
- Polityki: nic nie blokuje funkcji (bez gry na pieniądze, nagród i żetonów z wartością). Kategoria wiekowa zależy od tego, czy jest zakład (OG-02); kierunek W-07 (scenariusze bez stosu) prawdopodobnie ją obniża, ale progu nie podaje żadne źródło (OP-18).
- Dziedzina: 11 reguł obliczeniowych z wektorami niezależnymi od kodu; ocena zagrań ma iść za źródłem (ER-01). Reguła krytyczna: telefon pomocy według kraju (RD-12, ER-04).

## Blokery wydania
Wejście dla roli 07 (werdykt gotowości). Niespełnienie któregokolwiek blokuje wydanie publiczne.

| Wymaganie | Skutek niespełnienia |
|---|---|
| BR-POM-001, BR-POM-002 (RD-12) | reguła krytyczna: brak numeru pomocy w kraju sprzedaży (zdrowie użytkownika); dziś tylko PL, OP-10 otwarte |
| NFR-ZGOD-001, NFR-ZGOD-003, BR-SCN-002 | polityka sklepu: hazard, wartość żetonów, pomoc w czasie gry (OG-01, OG-02) |
| NFR-ZGOD-002, BR-ONB-004 | obietnica wygranej (OP-11, OG-07) |
| BR-ZAK-001, BR-ZAK-003, BR-ZAK-004 | polityka sklepu: ujawnienia, przywracanie, anulowanie (OG-06) |
| NFR-DANE-001, BR-DANE-002, BR-DANE-004 | utrata danych użytkownika (zasada wspólna 10) |
| NFR-PRYW-001 | obietnica prywatności „Data Not Collected” (OP-12) |
| BR-CWI-001, BR-SCN-003 (RD-11) | błędna ocena zagrań, sprzeczna ze źródłem (ER-01) |
| BR-CWI-002, BR-CWI-003 | błędne liczby w wyjaśnieniach (RD-01–RD-08) |
| BR-ONB-001, BR-KURS-001, BR-CWI-004 | główny przepływ nauki (PR-01–PR-03) |
| BR-LIM-002, BR-LIM-003, BR-LIM-004 | nauka przerwana ekranem zakupu albo dane i powtórki jako zakładnik (5.6, `docs/monetyzacja.md`) |
| NFR-DOST-001 | bariera dostępności: informacja tylko kolorem [FAKT S-54] |
| BR-OPIN-001 (OG-15, OG-16) | polityka sklepu: własne okno prośby o ocenę albo dostęp zależny od oceny (5.6.1, 3.2.2(x)) |
| OG-05 (RYZ-01) | subskrypcja bez stałej wartości: ryzyko odrzucenia; kontrola po stronie ról 02 i 03 (H-09) |

## Otwarte pytania
Numery od 2 do 8 nie są używane w BRD (te numery pytań ma `docs/monetyzacja.md`).

| ID | Pytanie | Rozstrzyga | Dotyczy |
|---|---|---|---|
| OP-01 | Rozstrzygnięte 2026-11-03: bez rozmów z graczami — „Nie, wystarczą recenzje” (ryzyko RYZ-06) | właściciel | P-1, J-01 |
| OP-09 | [DO USTALENIA] Zgodność modelu ICM Malmutha–Harville'a z literaturą szczebla 3 (cytat) | 06 | RD-09 |
| OP-10 | [DO USTALENIA] Numery pomocy przy problemie z hazardem z oficjalnych źródeł dla każdego kraju sprzedaży — po OP-15 wszystkie storefronty poza PL (US i GB przeczytane: S-39–S-41; JP, CA, BR, FR, TW, VN, DE najpierw; dla pozostałych numer alarmowy kraju ze źródła i brzmienie RD-12-W6) | 06, 01 | RD-12, ER-04 |
| OP-11 | Rozstrzygnięte 2026-11-03: „Jakość decyzji, bez obietnicy (Recommended)” — bez obietnicy wygranej i bez wskazania gry online; odrzucone: cel z PRD | właściciel | ER-03 |
| OP-12 | Rozstrzygnięte 2026-11-03: „Usunąć SDK (Recommended)” — raporty awarii z App Store Connect i Play Console, etykieta „Data Not Collected”; odrzucone: zostawić wyłączone, włączyć bez danych osobowych; zmienia ADR-17 (wpis w rejestrze 03: krok właściciela) | właściciel | ER-06 |
| OP-13 | Rozstrzygnięte 2026-11-03: „Bez opinii teraz (Recommended)” — kontrole zostają (zero operatorów i zachęt, NFR-ZGOD-001–002); wraca przy storefroncie PL; odrzucone: opinia przed wydaniem, usunięcie pl | właściciel | ER-09, OG-07 |
| OP-14 | [DO USTALENIA] Co Apple uznaje za „gambling aid” (brak definicji w wytycznych) | 01, 07 | OG-01 |
| OP-15 | Rozstrzygnięte 2026-11-03: „Wszystkie poza PL” (odrzucona rekomendacja: lista 9 rynków). Skutek: RD-12 dla każdego kraju sprzedaży, dla krajów bez wpisu gałąź RD-12-W6 (OP-10); OG-03 (AU, BR, KR) działa tylko przy H-07 albo odpowiedzi innej niż „brak” | właściciel | OG-03, RD-12 |
| OP-16 | [DO USTALENIA] Wymogi informacji o subskrypcji ze Schedule 2 umowy Apple | 02 | OG-06 |
| OP-17 | Rozstrzygnięte 2026-11-03: status przedsiębiorcy DSA już jest na koncie (właściciel; repo `trening`, `docs/45-formalnosci-asc.md:21`) | właściciel | OG-13 |
| OP-18 | [DO USTALENIA] Czy scenariusz bez stosu do wygrania to „brak” symulowanego hazardu w ankiecie Apple i IARC | recenzja Apple, ankieta IARC; rola 01 przygotowuje odpowiedzi i notatkę dla recenzenta | OG-02, ZAL-012 |
| OP-19 | Zamknięte 2026-11-04 (D-121): progi w `docs/design/design-spec.md`, „Podłogi dostępności”. Było: podłogi dostępności: czytnik ekranu i największy rozmiar tekstu (odsetek, kryteria) | 04 (źródła: WCAG, wytyczne Apple i Google) | NFR-DOST-002 |
| OP-20 | Rozstrzygnięte 2026-11-03 (D-105, rola 03 z delegacji): najwyżej 8 pytań, ok. 2 minuty [OCENA], „Pomiń” na każdym ekranie, bez ekranu zakupu na końcu; odrzucone: 10–15 pytań, bez oceny | 03 | BR-ONB-001 |
| OP-21 | [DO USTALENIA] Budżet czasu od uruchomienia do pierwszej decyzji i najstarszy wspierany telefon | 05 (pomiar) | NFR-WYD-001 |
| OP-22 | Rozstrzygnięte 2026-11-03 (D-106): test modułu 15 zadań, próg 85% (potwierdzenie decyzji właściciela z 3.10.2026); odrzucone: nowy próg | 03 | BR-KURS-002 |
| OP-23 | Rozstrzygnięte 2026-11-03 (D-107, właściciel: „1 aktywność dziennie (Recommended)”): jednostka to rozpoczęta aktywność (sesja ćwiczeń, kolejka powtórek, scenariusz albo powtórne podejście do egzaminu), N = 1; lekcje i pierwszy egzamin zawsze darmowe; odrzucone: 2 aktywności dziennie, 10 zadań dziennie | 03 z właścicielem | BR-LIM-001, BR-LIM-005 |
| OP-24 | [DO USTALENIA] Licznik dziennego limitu po ponownej instalacji: lokalny czy odporny (Keychain); realność obejścia brzegowa (jeden dodatkowy limit dnia); to samo pytanie co OP-10 w `docs/monetyzacja.md` | 05 | BR-LIM-005 |
