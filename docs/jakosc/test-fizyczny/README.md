# Protokoły testu fizycznego (klasa F, D-060)

Jeden plik na build: `<numer buildu>.md`. Tworzy go przed buildem `node scripts/sprawdz-scenariusze.mjs --szkielet <n>` (nie nadpisuje istniejącego) w commicie kandydata, razem z linią `Przegląd: build <n> @ <sha>` w `docs/jakosc/przypadki-uzycia.md`. Bez niego bramka w `testflight.yml` jest czerwona.

Wynik każdej pozycji wpisuje właściciel albo agent dosłownie z jego wiadomości (cytat i data w commicie), nigdy z oceny agenta:
- `OK`
- `BŁĄD → <ID zgłoszenia>`
- `POMINIĘTE: <uzasadnienie zdaniem>`

Pusty wynik („—”) blokuje następny build i wysyłkę tego buildu do recenzji (`--protokol <n>`).

## Kolejność przed buildem TestFlight (recenzja HV, P2-1 i P2-2)

1. Numer buildu = 1000 + numer przebiegu `testflight.yml` (`GITHUB_RUN_NUMBER`). Sprawdź numer ostatniego przebiegu „TestFlight (testy wewnętrzne)” w Actions; następny dispatch dostanie numer o 1 wyższy.
2. W jednym commicie: `node scripts/sprawdz-scenariusze.mjs --szkielet <n>`, linia `Przegląd: build <n> @ <sha>` w katalogu PU, `docs/wydanie/ostatni-build.txt` = numer ostatniego **wysłanego** buildu. Najlepiej razem z ostatnią zmianą kodu, bo:
3. Commit z samymi `docs/**` nie uruchamia `e2e-ios.yml` (push: `paths-ignore: ['docs/**', '**/*.md', …]`), a bramka E2E w `testflight.yml` wymaga zielonego E2E na **tym** SHA. Gdy protokół jest osobnym commitem: Actions → „E2E iOS (symulator)” → Run workflow na tym ref, z pustym `aplikacja_z_przebiegu` (aplikacja z innego przebiegu nie otwiera bramki), poczekaj na zielony, dopiero potem „TestFlight”.
4. Czerwona bramka albo nieudany build: **Re-run failed jobs** w tym samym przebiegu (ten sam `run_number`, więc ten sam numer buildu i protokół). Nowy dispatch to nowy numer buildu, czyli nowy protokół (`--szkielet`), nowa linia „Przegląd” i ponowne E2E na nowym SHA.
5. Po udanej wysyłce: `docs/wydanie/ostatni-build.txt` = ten numer (test `sprawdz-scenariusze.test.mjs` pilnuje, D-1783).

## Szablon (tak wygląda wynik `--szkielet`)

```markdown
# Test fizyczny — build <n>

Wykonuje właściciel na buildzie <n> zainstalowanym z TestFlight. Wynik: OK | BŁĄD → <ID zgłoszenia> | POMINIĘTE: <uzasadnienie>

| PU | Cel użytkownika | Kroki i oczekiwany wynik | Wynik |
|---|---|---|---|
| PU-0NN | <cel z katalogu> | <kroki z katalogu> | — |
```

## Lista dla właściciela (build z TestFlight, ok. 10 min, po kolei; od buildu 1011 punkty 9–10)

Zainstaluj build z TestFlight na swoim iPhonie. Każdy punkt to jedno zadanie. Odpisz numerem punktu i jednym słowem: „OK”, „błąd: <co widzisz>” albo „pominięte: <dlaczego>”.

1. **PU-019 Dziś, duży tekst, ciemny tryb, VoiceOver (ok. 1,5 min).** Ustawienia iOS → Wyświetlacz i jasność: tryb ciemny; Dostępność → Wyświetlanie i rozmiar tekstu → Większy tekst: suwak na maksimum. Otwórz aplikację: na „Dziś” cały tekst kafelków widoczny (nic nieucięte), ikona ustawień łatwa do trafienia; dotknij jej i wróć. Włącz VoiceOver, przesuń palcem po kafelkach: każdy czytany jedną frazą. Wyłącz VoiceOver i przywróć rozmiar tekstu.
2. **PU-018 Sesja przerwana przez system (ok. 1 min).** Dziś → Sesja ćwiczeń → odpowiedz na 2 zadania. Przesuń w górę do przełącznika aplikacji, zamknij aplikację przesunięciem. Otwórz ją: sesja jest na 3. zadaniu, odpowiedzi zostały.
3. **PU-017 Zgłoś błąd (ok. 30 s).** W tym zadaniu po odpowiedzi dotknij „Zgłoś błąd w tym zadaniu”: otwiera się Poczta, temat ma identyfikator zadania, w treści wersja aplikacji. Nie wysyłaj; wróć do aplikacji — zadanie na miejscu.
4. **PU-016 Przypomnienie (ok. 30 s).** Ustawienia (ikona na „Dziś”) → „Codzienne przypomnienie”: pod przełącznikiem zdanie z porą przypomnienia; włącz → systemowa prośba o zgodę; „Pozwól” → przełącznik włączony.
5. **PU-015 Ekran zakupu (ok. 1 min).** Ustawienia → Pełny dostęp: kwartał, rok i dożywotni z cenami w walucie konta (nie „Pobieranie cen…”), roczny bez przeliczenia na miesiąc. „Przywróć zakupy” → komunikat. „Warunki korzystania” i „Polityka prywatności” otwierają strony; wróć. „Zamknij” → ustawienia. Niczego nie kupuj.
6. **PU-014 Eksport i import (ok. 1 min).** Ustawienia → Dane → Eksport → zapisz w Plikach. Import → wybierz ten plik → przy ostrzeżeniu „Anuluj” (nic się nie zmienia); jeszcze raz Import i potwierdź. Na „Postępie” te same liczby co przed eksportem.
7. **PU-020 Brak diagnostyki (ok. 5 s).** Postęp → sekcja na dole: tylko słowniczek i pomoc, bez „Diagnostyka”.
8. **PU-022 Talia czterokolorowa i wibracje (ok. 1 min).** Ustawienia → „Talia czterokolorowa” włącz, „Wibracje przy odpowiedzi” wyłącz. Dziś → Sesja ćwiczeń (albo lekcja → Ćwiczenia): kier, karo, trefl i pik w czterech różnych kolorach, odpowiedź bez wibracji. Przywróć oba ustawienia: odpowiedź wibruje.
9. **PU-027 Scenariusz przy największym tekście (ok. 2 min).** Ustawienia iOS → Dostępność → Wyświetlanie i rozmiar tekstu → Większy tekst: włącz „Większe rozmiary dostępności”, suwak na maksimum. Dziś → Scenariusze → pierwsze odblokowane rozdanie → „Zacznij rozdanie”, graj do podsumowania. Na każdym ekranie (start, decyzja, ocena, podsumowanie): tekst cały, nic poza krawędzią ekranu, przyciski akcji i „Dalej” widoczne w całości i trafiane jednym dotknięciem. Długi wyraz w akapicie wyjaśnienia może się złamać — to dopuszczalne. W odpowiedzi podaj model telefonu.
10. **PU-028 Zmiana rozmiaru tekstu w trakcie rozdania (ok. 1 min).** W rozdaniu podejmij jedną decyzję (ekran oceny). Przejdź do Ustawień iOS → Większy tekst, przesuń suwak o kilka stopni, wróć do aplikacji: ten sam ekran oceny z tą samą decyzją, tekst w nowym rozmiarze, nic poza ekranem. „Dalej” i kolejna decyzja: układ poprawny. Na koniec przywróć rozmiar tekstu.
