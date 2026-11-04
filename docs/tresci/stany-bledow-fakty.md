# Fakty dla stanów błędów (rola 06 → 04, 08)

Stan 2026-11-04 (E3, 21. sesja). Wejście: `docs/architektura/tlo-i-bledy.md` §4 (stany „brak” w projekcie roli 04), ADR 0003, 0004, 0005, 0006, 0008, 0009, 0013. Źródłem jest tu decyzja projektu (ADR), nie wiedza dziedzinowa, więc to fakty warunkowe: obowiązują, dopóki kod roli 08 robi to, co mówi ADR, a test roli 07 to potwierdza.

Rola 04 nadaje brzmienie. Rola 06 odpowiada za to, żeby zdanie nie obiecywało więcej, niż robi kod. W kolumnie „Nie wolno” są zdania, które byłyby nieprawdą albo obietnicą bez pokrycia.

| Kod `powod` | Co jest prawdą dla użytkownika | Nie wolno | Podstawa | Warunek (test 07) |
|---|---|---|---|---|
| `bledny_plik` | Plik nie jest eksportem tej aplikacji albo jest uszkodzony; import się nie zaczął; postęp bez zmian | „plik zawiera błędy w linii …”, sugestia, że część danych wczytano | ADR 0008 p. 2 (1) | import pliku obcego i uciętego: 0 zmian w bazie |
| `nowsza_wersja` | Plik pochodzi z nowszej wersji aplikacji; po aktualizacji aplikacji można go zaimportować; postęp bez zmian | „plik jest uszkodzony” | ADR 0008 p. 2 (1) | `wersja_formatu` + 1 → odrzucenie, 0 zmian |
| `powiadomienia_odmowa` | Przypomnienie jest wyłączone, bo system nie ma zgody; zgodę zmienia się w ustawieniach systemu; reszta aplikacji działa | „aplikacja nie będzie działać bez powiadomień” | ADR 0012; `tlo-i-bledy.md` §4 (T-08) | odmowa → przełącznik wyłączony |
| `zakup_oczekuje` | Zakup czeka na zatwierdzenie (np. przez rodzica albo bank); dostęp pojawi się po zatwierdzeniu; nie trzeba płacić drugi raz | termin („za kilka minut”), gwarancja zatwierdzenia | ADR 0006; maszyna `zakup` (moduly.md) | stan `oczekuje` → informacja, bez drugiego zakupu |
| `zakup_blad` | Zakup się nie udał; można spróbować ponownie albo użyć „Przywróć zakupy” | „nie pobrano opłaty” (aplikacja tego nie wie; decyduje sklep), „pieniądze zostaną zwrócone” (zwroty obsługuje sklep) | ADR 0006 | `zakup_blad` → powrót do `bezczynny` |
| `przerwano_w_tle` | Import nie został dokończony (aplikacja przeszła w tło); postęp jest taki jak przed importem; można zacząć od nowa | „część danych została zaimportowana” | ADR 0013; ADR 0008 p. 2 (4) transakcja | przerwanie w trakcie → `ROLLBACK`, 0 zmian |
| `zapis_nieudany` | Ostatniej odpowiedzi nie udało się zapisać; odpowiedź zostaje na ekranie i można zapisać ją ponownie; wcześniejszy postęp jest zachowany | „postęp został utracony”, „sprawdź połączenie z internetem” (dane są lokalne) | ADR 0003 (transakcja); `tlo-i-bledy.md` §4 | błąd zapisu → stan sprzed kroku |
| `brak_miejsca` | Na urządzeniu brakuje miejsca; po zwolnieniu miejsca zapis można ponowić; wcześniejszy postęp jest zachowany | ile miejsca potrzeba (nie liczymy) | ADR 0003; `SQLITE_FULL` | jw. |
| `baza_nowsza` | Dane pochodzą z nowszej wersji aplikacji; trzeba zaktualizować aplikację; dane są nietknięte | „dane są uszkodzone” | ADR 0003 p. 5 (E4f) | baza `user_version` + 1 → nic nie zapisane |
| `migracja_nieudana` | Aktualizacja danych do nowej wersji się nie udała; dane są w wersji sprzed aktualizacji, a aplikacja zrobiła kopię przed zmianą; można zgłosić błąd | „dane zostały naprawione”, „spróbuj ponownie” bez zmiany wersji (ten sam błąd wróci) | ADR 0003 p. 5 (kopia `VACUUM INTO`, ROLLBACK) | migracja z błędem → wersja i dane sprzed, plik kopii istnieje |
| `baza_uszkodzona` | Plik postępu jest uszkodzony; aplikacja go nie usunęła, tylko odłożyła i zaczęła nowy postęp; ostatni eksport (jeśli jest) można zaimportować; można zgłosić błąd | „postęp został usunięty”, „odzyskaliśmy dane” | `tlo-i-bledy.md` §4 (przemianowanie pliku); ADR 0008 | `SQLITE_CORRUPT` → plik `postep-uszkodzona-<ms>.db` istnieje, nowa baza pusta |
| `tresc_niedostepna` | Lekcje nie dały się wczytać; postęp jest nietknięty; pomaga ponowne uruchomienie albo reinstalacja aplikacji (postęp zostaje w kopii systemu albo eksporcie) | „postęp został usunięty”; reinstalacja bez ostrzeżenia, że bez eksportu albo kopii iCloud postęp zniknie | ADR 0005; ADR 0008 (kopia iCloud) | brak pliku treści → ekran błędu, baza postępu bez zmian |
| `wyjatek_ekranu` | Ten ekran napotkał błąd; można spróbować ponownie albo zgłosić błąd; zgłoszenie nie wysyła danych bez zgody | „dane zostały wysłane” (ADR 0009: dziennik lokalny, bez wysyłki) | ADR 0009 | wyjątek → ekran zastępczy, wpis w dzienniku lokalnym |

Uwagi:
- Zdanie o reinstalacji przy `tresc_niedostepna` jest ryzykowne: reinstalacja kasuje dane aplikacji z urządzenia. Jeśli rola 04 go użyje, musi stać obok ostrzeżenie o eksporcie (zasada wspólna 10). Rekomendacja 06: nie proponować reinstalacji w tekście, tylko ponowne uruchomienie i „Zgłoś błąd”.
- Dziennik błędów jest lokalny (ADR 0009). Żaden tekst nie może sugerować, że twórca widzi błąd bez zgłoszenia przez użytkownika.
- Kody `zakup_anulowany` i `akcja_niedostepna` nie mają komunikatu (ADR 0006, D-109), a `limit_wyczerpany` i `sklep_niedostepny` mają już stan w macierzy roli 04.
