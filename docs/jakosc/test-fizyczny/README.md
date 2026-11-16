# Protokoły testu fizycznego (klasa F, D-060)

Jeden plik na build: `<numer buildu>.md`. Tworzy go przed buildem `node scripts/sprawdz-scenariusze.mjs --szkielet <n>` (nie nadpisuje istniejącego) w commicie kandydata, razem z linią `Przegląd: build <n> @ <sha>` w `docs/jakosc/przypadki-uzycia.md`. Bez niego bramka w `testflight.yml` jest czerwona.

Wynik każdej pozycji wpisuje właściciel albo agent dosłownie z jego wiadomości (cytat i data w commicie), nigdy z oceny agenta:
- `OK`
- `BŁĄD → <ID zgłoszenia>`
- `POMINIĘTE: <uzasadnienie zdaniem>`

Pusty wynik („—”) blokuje następny build i wysyłkę tego buildu do recenzji (`--protokol <n>`).

## Szablon (tak wygląda wynik `--szkielet`)

```markdown
# Test fizyczny — build <n>

Wykonuje właściciel na buildzie <n> zainstalowanym z TestFlight. Wynik: OK | BŁĄD → <ID zgłoszenia> | POMINIĘTE: <uzasadnienie>

| PU | Cel użytkownika | Kroki i oczekiwany wynik | Wynik |
|---|---|---|---|
| PU-0NN | <cel z katalogu> | <kroki z katalogu> | — |
```

## Lista dla właściciela (build z TestFlight, ok. 6 min, po kolei)

Zainstaluj build z TestFlight na swoim iPhonie. Każdy punkt to jedno zadanie. Odpisz numerem punktu i jednym słowem: „OK”, „błąd: <co widzisz>” albo „pominięte: <dlaczego>”.

1. **PU-019 Dziś, duży tekst, ciemny tryb, VoiceOver (ok. 1,5 min).** Ustawienia iOS → Wyświetlacz i jasność: tryb ciemny; Dostępność → Wyświetlanie i rozmiar tekstu → Większy tekst: suwak na maksimum. Otwórz aplikację: na „Dziś” cały tekst kafelków widoczny (nic nieucięte), ikona ustawień łatwa do trafienia; dotknij jej i wróć. Włącz VoiceOver, przesuń palcem po kafelkach: każdy czytany jedną frazą. Wyłącz VoiceOver i przywróć rozmiar tekstu.
2. **PU-018 Sesja przerwana przez system (ok. 1 min).** Dziś → Sesja ćwiczeń → odpowiedz na 2 zadania. Przesuń w górę do przełącznika aplikacji, zamknij aplikację przesunięciem. Otwórz ją: sesja jest na 3. zadaniu, odpowiedzi zostały.
3. **PU-017 Zgłoś błąd (ok. 30 s).** W tym zadaniu po odpowiedzi dotknij „Zgłoś błąd w tym zadaniu”: otwiera się Poczta, temat ma identyfikator zadania, w treści wersja aplikacji. Nie wysyłaj; wróć do aplikacji — zadanie na miejscu.
4. **PU-016 Przypomnienie (ok. 30 s).** Ustawienia (ikona na „Dziś”) → „Codzienne przypomnienie”: pod przełącznikiem zdanie z porą przypomnienia; włącz → systemowa prośba o zgodę; „Pozwól” → przełącznik włączony.
5. **PU-015 Ekran zakupu (ok. 1 min).** Ustawienia → Pełny dostęp: kwartał, rok i dożywotni z cenami w walucie konta (nie „Pobieranie cen…”), roczny bez przeliczenia na miesiąc. „Przywróć zakupy” → komunikat. „Zamknij” → ustawienia. Niczego nie kupuj.
6. **PU-014 Eksport i import (ok. 1 min).** Ustawienia → Dane → Eksport → zapisz w Plikach. Import → wybierz ten plik → przy ostrzeżeniu „Anuluj” (nic się nie zmienia); jeszcze raz Import i potwierdź. Na „Postępie” te same liczby co przed eksportem.
7. **PU-020 Brak diagnostyki (ok. 5 s).** Postęp → sekcja na dole: tylko słowniczek i pomoc, bez „Diagnostyka”.
