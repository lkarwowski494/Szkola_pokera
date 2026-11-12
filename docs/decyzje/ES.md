# Decyzje sesji ES (recenzja niezależna DT, E2E cache), pula D-1270…D-1274

Tryb nocny (polecenie ES pkt 5): decyzje agenta do weta koordynatora/właściciela. Wzór: Trening `.github/workflows/e2e-ios.yml` (main, odczyt 2026-11-12) — cache tylko `cache: npm` (linia 86), bez cache buildu iOS.

## D-1270 (2026-11-12): waga 08-programista-001 = ŚREDNIE, werdykt PRZYJĘTE Z ZASTRZEŻENIAMI
- Decyzja: bezużyteczny cache DerivedData (1144 vs 1147 kompilacji, +ok. 2:34 na przebieg, 2,2 GB na push) nie blokuje: nie dotyczy danych, prywatności, bezpieczeństwa ani poprawności E2E (bundle JS budowany zawsze, `alwaysOutOfDate = 1`). Rekomendacja naprawy: usunąć krok DD, zostawić CocoaPods (warunek wycofania zapisany w samej D-1022).
- Odrzucone: (a) WYSOKIE/PO POPRAWKACH — próg CLAUDE.md nie obejmuje czasu CI; (b) brak znaleziska, bo „w granicach szumu” — liczba kompilacji rozstrzyga brak reużycia niezależnie od czasu.
- Dowód: `docs/programista/dowody/es-przebiegi-cache.txt`. Zależy od: konfiguracji `prebuild --clean` (zmiana jej mogłaby przywrócić reużycie — wtedy pomiar od nowa).

## D-1271 (2026-11-12): wersja Xcode w kluczu cache nie jest wymagana
- Decyzja: nie zgłaszam braku wersji Xcode w kluczu jako znaleziska: przy pełnej rekompilacji stary DerivedData nie jest używany, a cache CocoaPods to pobrania niezależne od Xcode; po naprawie 001 sprawa znika. Odrzucone: dopisać `xcodebuild -version` do klucza — koszt kroku bez skutku. Warunkowa: wraca, jeśli cache DD zostanie (opcja b/c w 001).
