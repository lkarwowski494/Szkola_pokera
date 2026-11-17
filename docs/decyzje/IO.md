# Decyzje IO (IM-001, pula D-1955…D-1964)

## D-1955 (2026-11-17): znaczniki {{w:rozmiar}} i {{w:vpip}} niosą procent z znakiem % w języku aplikacji
- Problem (realny, widoczny dla użytkownika we wszystkich 12 językach SC-27): treść pisze „ok. {{w:rozmiar}} puli”, wartość to była goła liczba → „ok. 75 puli”.
- Decyzja koordynatora KO-121: poprawka w kodzie, bez zmian w `content/`. `wariant.ts`: `procentWJezyku` = `formatujProcent` z `@szkola/jezyki` (istniał; pl „75%”, de/fr „75 %”), język `jezykZadan()`. Ten sam mechanizm dla `vpip` (SC-30 nie używa znacznika w treści, ale fixtury IB/IC pisały „%” po znaczniku; fixtury poprawione: „%” zdjęte z tekstu).
- Odrzucone: (a) „%” w treści 12 języków (wiele plików, błąd składni w językach z odstępem, jak fr/de, bo treść nie zna konwencji); (b) `pct` z `drills/text.ts` (osobny klucz i18n `drill.format.percent`; scenariusze już używają `formatujProcent`, `liczby.ts`).
- Analogia z Treningiem: niesprawdzana (brak dostępu do repo w tej sesji; zmiana lokalna, używa istniejącego formatera).
- Dowód: `docs/programista/dowody/io-red-ef75f613.txt` (red), test `io-procent-znacznik.test.ts` (12 języków + vpip) green; grep innych `{{w:…}}` z liczbą: tylko `spr` (formatowany, bez %), `rozmiar`, `vpip`.
