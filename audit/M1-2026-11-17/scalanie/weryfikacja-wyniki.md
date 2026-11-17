# Wyniki weryfikacji przeciwnej (zbierane przez M1 z odpowiedzi weryfikatorów; szczegóły w weryfikacja/<grupa>.md)
| Grupa | ID | Wynik | Poziom po | Blokuje 1012 | Blokuje App Store | Tokeny weryfikatora |
|---|---|---|---|---|---|---|
| g4 | 07-jakosc-002 | potwierdzone | P2 | nie | nie (T-06 przed App Store zalecany) | 168 185 (grupa) |
| g4 | 12-niezawodnosc-006 | potwierdzone (sonda kod 0) | P2 | nie | nie | |
| g4 | 05-architekt-002 | mechanizm potwierdzony, skutek niepotwierdzony | P2 (P1, jeśli U-2 potwierdzi zakończenie przez system) | nie | nie | |
| g4 | 01-odkrywanie-004 | P1 obalone → P2 NISKIE (scenariusze błędu w tlo-i-bledy.md i testach k02/k10/k12) | P2 | nie | nie | |
| g4 | 07-jakosc-004 | potwierdzone (15 użyć; Trening przypina do SHA) | P2 | nie | nie (tania naprawa przed upublicznieniem) | |
| g3 | 05-architekt-001 | potwierdzone; P1 → P2 (start aktywności liczy limit od nowa; sonda) | P2 | nie | nie | 176 072 (grupa) |
| g3 | 08-programista-001 | potwierdzone; ta sama przyczyna co 05-001 | P2 | nie | nie | |
| g3 | 12-niezawodnosc-001 | potwierdzone; P1 → P2 (dane bez zmian, sonda kod 0) | P2 | nie | nie | |
| g3 | 12-niezawodnosc-002 | potwierdzone; P1 → P2 (teoretyczny, plik odłożony zostaje) | P2 | nie | nie | |
| g3 | 12-niezawodnosc-003 | potwierdzone; P1 → P2 (brak awarii dziś) | P2 | nie | nie | |
| g3 | 05-architekt-007 | potwierdzone z korektą (kopia w Library/Caches, poza iCloud; wariant_historia usuwana — brak tylko w inwentarzu) | P2 | nie | nie | |
| g3 | 12-niezawodnosc-005 | potwierdzone; ta sama przyczyna co 05-007 | P2 | nie | nie | |
| g5 | 04-studio-projektowe-001 | kod potwierdzony, skutek obalony przy obecnej treści (12 × spots.yaml: jedna grupa; wada uśpiona) | P2 | nie | nie | 158 062 (grupa) |
| g5 | 04-studio-projektowe-003 | potwierdzone (łamanie w środku wyrazu raczej niż ucięcie; VoiceOver czyta pełne) | P2 | nie | nie | |
| g5 | 04-studio-projektowe-004 | potwierdzone rachunkiem; ta sama przyczyna i linie co 08-programista-006 | P2 | nie | nie | |
| g5 | 08-programista-006 | potwierdzone | P2 | nie | nie | |
| g5 | 04-studio-projektowe-005 | potwierdzone (statyczna Literata-SemiBold, czytelne) | P2 | nie | nie | |
| g5 | 04-studio-projektowe-006 | potwierdzone (24 pt wysokości, pełna szerokość; próg projektu D-121, nie wydania) | P2 | nie | nie | |
| g6 | 04-studio-projektowe-002 | potwierdzone (PasekStrategii.tsx:93 bez sprawdzenia ustawienia; PU-022 wypadnie źle — przypisać temu ID) | P2 | nie | nie | 166 266 (grupa) |
| g6 | 04-studio-projektowe-007 | potwierdzone (Inter SemiBold 85,7 pt przy ~67 pt; D-122) | P2 | nie | nie | |
| g6 | 09-lokalizacja-001 | potwierdzone (jedna przyczyna, session.tsx:601 i :333) | P2 | nie | nie | |
| g6 | 09-lokalizacja-002 | potwierdzone (wbrew ADR 0012 pkt 3) | P2 | nie | nie | |
| g6 | 01-odkrywanie-003 | potwierdzone z korektami (BRD edytowane po 11-04; brak tylko poprawki wg D-158/D-167) | P2 | nie | nie | |
| g7 | 06-tresci-501 | **potwierdzone** (odtworzone na danych BeyondGTO z dziś: 16 i 13 rąk ≥ 50 pp, brak klas niepewnych; engine.ts:436, grading.ts:327; D-153 nie rozważyło klas niepewnych) | **P1** | **tak** | **tak** | (tokeny po powiadomieniu) |
| g7 | 06-tresci-502 | potwierdzone, słabsze (źródło szczebla 2 jest; tylko atrybucja) | P2 niskie | nie | nie | |
| g7 | 06-tresci-503 | potwierdzone; zarzut sprzeczności częściowo obalony | P2 | nie | nie | |
| g7 | 06-tresci-002 | potwierdzone (zdanie prawdziwe, brak wpisu w rejestrze) | P2 niskie | nie | nie | |
| g7 | 06-tresci-003 | potwierdzone (2/1006 z wazne_do) | P2 niskie | nie | nie | |
| g7 | 06-tresci-504 | częściowo; podzbiór 003 (ta sama przyczyna) | P2 niskie | nie | nie | |
| g1 | 10-wydanie-001 | potwierdzone; P0 → P1 (blokuje App Store, nie 1012); 22 wstawki (11 na język), Ustawienia bez linku | P1 | nie | **tak** | 180 403 (grupa) |
| g1 | 02-monetyzacja-001 | potwierdzone; ta sama przyczyna A (ADRES_PRYWATNOSCI = null, W-04) | P1 | nie | **tak** | |
| g1 | 01-odkrywanie-002 | potwierdzone; przyczyna A; zdanie polityki o numerach pomocy wg kraju tylko P2 | P1 | nie | **tak** | |
| g1 | 10-wydanie-002 | częściowo potwierdzone (notatki nie wspominają scenariuszy; „no bots” sporne; ścieżka do zakupu działa) | P1 (brzegowy) | nie | **tak** | |
| g1 | 11-wzrost-001 | potwierdzone (część: przyczyna A i nieaktualny README) | P2 | nie | nie | |
| g1 | 01-odkrywanie-006 | potwierdzone; przyczyna B (D-530 nie przeniesione do tekstów; sonda: kontrola AK-K-11-l wymusza zawetowaną D-305, kod 1) | P2 | nie | nie | |
| g1 | 02-monetyzacja-003 | potwierdzone; przyczyna B | P2 | nie | nie | |
| g1 | 10-wydanie-003 | potwierdzone; przyczyna B | P2 | nie | nie | |
| g1 | 10-wydanie-004 | potwierdzone; przyczyna B (ankieta wiekowa do ponownej oceny przed ASC) | P2 | nie | nie | |
| g1 | 06-tresci-001 | potwierdzone (+ 29 cytatów > 250 zn.; pliki poza aplikacją i metadanymi) | P2 (osobna naprawa) | nie | nie | |
| g1 | 10-wydanie-007 | potwierdzone | P2 niskie | nie | nie | |
| g7 | (tokeny g7) | | | | | 171 663 (grupa) |

Uwaga M1: weryfikator g1 zapisał sondą `curl` pliki `/privacy.html` i `/support.html` w katalogu głównym kontenera (kopie publicznej strony, poza repo). Usunięcie odrzuciła kontrola bezpieczeństwa narzędzia; pliki zostają w ulotnym kontenerze (bez wpływu na repo).
