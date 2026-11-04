---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika), weto właściciela
---
# 0010. Procesy wieloetapowe jako maszyny stanów w czystym TypeScript z tabelą przejść; stan w toku zapisywany w bazie po każdym przejściu

## Kontekst i problem
Kilka przepływów zmienia stan w czasie i musi przeżyć przerwanie: ocena poziomu (PR-01, przerwana w połowie), sesja ćwiczeń i test modułu (PR-02, PR-03: powrót w tym samym zadaniu, BR-CWI-004), aktywność dnia i limit (F-18, BR-LIM-002), scenariusz (PR-05: powrót w tej samej decyzji), zakup (PR-06: w toku, oczekuje, zakończony, błąd), import (PR-07). Zasada architekta 6: logika domeny w czystym TypeScript.

## Czynniki decyzji
- Testy przed kodem wymagają logiki uruchamialnej w Node bez telefonu.
- Lista stanów musi być jedna dla kodu i bazy (CHECK) — moduł `dane-lokalne-sqlite`, „Statusy”.
- Przerwanie i zabicie procesu w dowolnym momencie (iOS) — stan musi być trwały przed pokazaniem następnego kroku.
- `poker-core` i `srs` już są czystymi pakietami bez React Native (`CLAUDE.md`).

## Rozważane opcje
- A: maszyny w domenie: typ stanu, typ zdarzenia, funkcja `przejscie(stan, zdarzenie) → stan | blad` i tabela przejść w dokumencie · B: flagi i stan w komponentach ekranów (zustand) · C: biblioteka maszyn stanów (np. XState)

## Decyzja
Wybrano „A”, ponieważ daje testy w Node na tabeli przejść, jedną listę stanów dla TypeScript i CHECK, a nie dodaje zależności; przy kilku maszynach po kilka stanów biblioteka C nie odpowiada na nazwany problem (zasada architekta 2).

Ustalenia wiążące (tabele przejść w E2, `docs/architektura/README.md`):
1. Maszyny: `ocenaPoziomu`, `aktywnosc` (sesja, powtórki, scenariusz, test powtórny; start sprawdza limit raz — ADR 0007), `scenariusz` (decyzje tylko z akcji z oceną, D-109), `zakup`, `import`.
2. Stan w toku (np. indeks zadania, odpowiedzi, kolejność zadań) zapisywany przez port bazy w tej samej transakcji co odpowiedź; ekran pokazuje następny krok dopiero po udanym zapisie. Błąd zapisu → komunikat i stan bez zmian (polityka błędów, „Nieudany zapis”).
3. Stałe listy stanów eksportowane z domeny; migracja schematu generuje CHECK z tej samej listy albo test porównuje obie.
4. zustand zostaje tylko jako kopia do wyświetlania (ADR-09 rejestru 03); źródłem prawdy jest baza.
5. Czas w stanie liczony ze znaczników zapisanych w bazie (`start_ms`), nigdy z odliczania `setInterval` (moduł `tlo-i-sensory-ios`, zasada 4).

### Konsekwencje
- Dobre: przerwanie w dowolnym miejscu wraca do zapisanego stanu; logika testowana wektorami.
- Złe: zapis po każdym kroku (mały; koszt zmierzony w E3); tabele przejść do utrzymania w dokumencie.
- Od czego zależy: ADR 0003 (port i kolejka).

### Potwierdzenie
- Test „stany maszyny ⊆ CHECK” (rola 07): dla każdej maszyny lista stanów = wartości w CHECK odpowiedniej kolumny w `schemat.sql`.
- Testy tabel przejść: każde przejście z tabeli dozwolone, każde spoza tabeli zwraca błąd.
- Test przerwania: zapis odpowiedzi → „zabicie” (zamknięcie połączenia) → ponowne otwarcie → ten sam indeks zadania i odpowiedzi (BR-CWI-004).
- `granice.mjs`: katalog domeny bez importów `react`, `react-native`, `expo-*`.

## Opcje: zalety i wady
### A: maszyny w domenie
- Zalety: testowalne w Node; jedna lista stanów; bez zależności.
- Wady: własny kod przejść (mały).
### B: flagi w ekranach
- Zalety: najmniej kodu na start.
- Wady: logika w komponentach nie do testu bez React Native; stany niemożliwe (dwie flagi naraz); trudniej zapewnić trwałość przed pokazaniem kroku.
### C: XState
- Zalety: wizualizacja, dojrzałe narzędzie.
- Wady: zależność i krzywa nauki dla kilku małych maszyn; stan i tak trzeba utrwalać w bazie po swojej stronie.
