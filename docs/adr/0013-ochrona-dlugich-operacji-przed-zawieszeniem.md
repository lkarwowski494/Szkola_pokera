---
status: przyjęta (D-129, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (fakt o platformie: dokumentacja Apple; technika), weto właściciela
---
# 0013. Długie operacje na bazie (import, eksport, kopia, „Usuń postęp”, migracja z przebudową) pod ochroną `beginBackgroundTask` z lokalnego modułu Expo i z wycofaniem przy wygaśnięciu; krótkie zapisy bez ochrony

## Kontekst i problem
Apple kończy aplikację kodem `0xdead10cc`, gdy w chwili zawieszenia trzyma ona blokadę pliku albo bazy SQLite. Każdy zapis i każdy odczyt w transakcji trzyma blokadę (pomiar `e3-blokady-czasy.mjs`, 2b–2e). Przepływ PR-07 (F-14: eksport, import, „Usuń postęp”) i migracja z przebudową (ADR 0003) trzymają ją setki milisekund do kilku sekund, a użytkownik może w tym czasie wyjść z aplikacji. Zabicie procesu w środku transakcji nie psuje danych (SQLite wycofuje transakcję przy następnym otwarciu), ale import przepada bez komunikatu, a powtarzające się zabicia to awarie w raportach Apple.

## Czynniki decyzji
- Apple, „SIGKILL” (developer.apple.com/documentation/xcode/sigkill, odczyt 2026-11-04): „The operating system terminated the app because it held on to a file lock or SQLite database lock during suspension. Request additional background execution time on the main thread with [beginBackgroundTask]. Make this request well before starting to write to the file in order to complete those operations and relinquish the lock before the app suspends.” (kod `0xdead10cc`).
- Apple, „Extending your app’s background execution time” (odczyt 2026-11-04): po przejściu do tła metoda delegata „has five seconds to perform any tasks and return. Shortly after that method returns, the system puts your app into the suspended state”; „Don’t wait until your app moves to the background to call the [beginBackgroundTask] method. Call the method before performing any long-running task.”
- Apple, `beginBackgroundTask(withName:expirationHandler:)` (odczyt 2026-11-04): „If you call this method shortly before your app is due to be suspended, there’s a chance that the system might suspend your app before that task assertion is granted”; „Each call to this method must be balanced by a matching call to the [endBackgroundTask] method”; „This method can be safely called on a non-main thread”; handler wygaśnięcia: „The system calls the handler synchronously on the main thread”.
- Expo SDK 58: strony `sqlite`, `background-task`, `task-manager`, `filesystem` nie zawierają `beginBackgroundTask` (`curl` + `grep -c`, 0 trafień, 2026-11-04); żaden z 25 pakietów natywnych aplikacji w wersjach SDK 58 nie woła tej metody (`grep -rl beginBackgroundTask` w pobranych paczkach: 0 plików). Moduł trzeba napisać.
- Pomiar (laptop w chmurze, punkt odniesienia, nie budżet; `e3-blokady-czasy.mjs`, dane 3-letnie): krok aktywności p95 3,4 ms; `VACUUM INTO` mediana 87 ms; eksport 460 ms (maks 1 067 ms); import 2 664 ms (maks 3 132 ms); „Usuń postęp” 260 ms. Telefon jest wolniejszy od laptopa w nieznanym stopniu `[DO USTALENIA]` (pomiar na iPhonie, `wydajnosc.md`), więc import może przekroczyć 5 s okna po przejściu do tła: ryzyko **realne** dla PR-07.
- Zasada 5 roli: dane użytkownika przede wszystkim; transakcja nie czeka na zdarzenia (ADR 0003).

## Rozważane opcje
- A: lokalny moduł Expo (Swift, Expo Modules API) z `rozpocznij(nazwa) → id` i `zakoncz(id)` + zdarzenie `wygasa`; port bazy owija długie operacje; przy wygaśnięciu port przerywa operację na granicy instrukcji i robi `ROLLBACK`
- B: bez kodu natywnego: długie operacje tylko na pierwszym planie z blokadą interfejsu; na `AppState` → `background` port przerywa na granicy instrukcji i wycofuje
- C: import w wielu małych transakcjach (krótka blokada, bez ochrony)

## Decyzja
Wybrano „A” razem z mechanizmem przerwania z „B”, ponieważ tylko A stosuje środek wskazany przez Apple (czas wykonania w tle prośbą złożoną przed zapisem), a przerwanie z B obsługuje przypadek, gdy system czasu nie da (handler wygaśnięcia) albo poda go za mało. Sama opcja B zależy od tego, czy JS dostanie zdarzenie `AppState` i wykona `ROLLBACK` w oknie ok. 5 s; jedna długa instrukcja (np. `VACUUM INTO`, `DELETE` dużej tabeli) nie da się przerwać w połowie. C łamie atomowość importu (ADR 0008: jedna transakcja albo nic).

Ustalenia wiążące:
1. Moduł `apps/mobile/modules/ochrona-tla/` (Expo Modules API, iOS; na Androidzie funkcje bez działania): `rozpocznij(nazwa: string): number` (`UIApplication.shared.beginBackgroundTask(withName:expirationHandler:)`; zwraca `UIBackgroundTaskIdentifier.invalid` jako −1), `zakoncz(id: number): void`, zdarzenie `wygasa { id }` wysyłane z handlera, który sam też woła `endBackgroundTask` (Apple: brak zakończenia = zabicie aplikacji).
2. Port bazy (`packages/postep`) dostaje w konstruktorze opcjonalną zależność `OchronaTla { rozpocznij(n): number; zakoncz(id): void; naWygasniecie(fn): () => void }` (interfejs w domenie, adapter w `apps/mobile/src/platform/`). Testy w Node podają atrapę. Wykonanie (L8-03, fix 05 2026-11-07, D-205): drugi argument `otworzPostep(adapter, ochrona?)`; port pamięta ochronę w `WeakMap` (port → `OchronaTla`), a operacje z pkt 3 idą przez `dlugaOperacja(port, nazwa, praca)`: `rozpocznij` przed pierwszą instrukcją, `zakoncz` dokładnie raz w `finally`, flaga z `naWygasniecie` sprawdzana przed każdą instrukcją i przed `COMMIT`. `PortBazy` (moduly.md) nie ma metody ochrony — kontrakt nie zmienia się dla repozytoriów. Gdy `rozpocznij` zwróci −1, ustawienie flagi przy `AppState` → `background` należy do warstwy aplikacji. Adapter: po wygaśnięciu handler sam woła `endBackgroundTask`, więc późniejsze `zakoncz(id)` dla tego id nic nie robi (bez drugiego `endBackgroundTask`).
3. Owinięte operacje (lista zamknięta, rozszerzenie = zmiana tego ADR): import, eksport (odczyt w jednej transakcji), kopia `VACUUM INTO` przed importem i migracją, „Usuń postęp”, migracja z `przebudowa: true`. Kolejność: `rozpocznij` → praca w kolejce zapisów → `COMMIT` albo `ROLLBACK` → `zakoncz` w `finally`. `rozpocznij` przed pierwszą instrukcją, nie w reakcji na przejście do tła.
4. Przerwanie: długa operacja w porcie sprawdza flagę `przerwij` przed każdą instrukcją; flagę ustawia `wygasa` albo `AppState` → `background`, gdy `rozpocznij` zwróciło −1. Wynik operacji: wartość `{ ok: false, powod: 'przerwano_w_tle' }` (polityka błędów, `tlo-i-bledy.md`); dane bez zmian (`ROLLBACK`), kopia sprzed importu usunięta.
5. Krótkie zapisy (krok aktywności, ustawienie, pamięć uprawnień, dziennik) bez ochrony: kończą się w milisekundach (p95 3,4 ms na laptopie), a system daje ok. 5 s po przejściu do tła. Port bazy przy `AppState` → `background` nie przyjmuje nowych zadań długich i kończy kolejkę.
6. Zakaz kursorów otwartych między klatkami: `getEachAsync` / iteratory tylko do końca w tej samej operacji portu (pomiar 2e: niedokończony kursor trzyma blokadę poza transakcją).
7. Migracja z przebudową uruchamia się przy starcie na pierwszym planie (ekran startowy); ochrona jak w pkt 3.

### Konsekwencje
- Dobre: środek wskazany przez Apple; import z 3 lat danych nie przepada po wyjściu z aplikacji na kilka sekund; dane spójne także przy odmowie czasu.
- Złe: kod natywny (ok. 40 linii Swift) bez testu w Node; wymaga development build (już używany: `expo-dev-client`); test tylko na urządzeniu (krok właściciela).
- Od czego zależy (decyzja warunkowa): pomiar importu na iPhonie (`wydajnosc.md`, P-3). Jeśli import danych 3-letnich na telefonie właściciela trwa dłużej niż `backgroundTimeRemaining` odczytane na tym telefonie po przejściu do tła (dokumentacja nie podaje wartości `[DO USTALENIA]`; odczyt w buildzie deweloperskim), następny ADR rozważy import przez tabelę pośrednią w kilku transakcjach z jednym przełączeniem.

### Potwierdzenie
- Test portu w Node (rola 07): atrapa `OchronaTla` — każda operacja z listy pkt 3 woła `rozpocznij` przed pierwszą instrukcją i `zakoncz` dokładnie raz (także przy wyjątku); wstrzyknięte `wygasa` w środku importu → wynik `przerwano_w_tle`, liczności tabel bez zmian, `PRAGMA integrity_check` = `ok`.
- Kontrola statyczna: brak `withExclusiveTransactionAsync`, `getEachAsync` poza portem; każde wywołanie `rozpocznij` w pliku ma `zakoncz` w `finally` (przegląd roli 07).
- Krok właściciela na iPhonie (scenariusz U-2 w `kontrole-07.md`): import pliku 3-letniego, po 1 s przycisk Home, powrót po 30 s → import zakończony albo komunikat „przerwano”, dane spójne; w Xcode Organizer brak awarii `0xdead10cc`.

## Opcje: zalety i wady
### A: moduł z `beginBackgroundTask`
- Zalety: zgodne z zaleceniem Apple; operacja zwykle kończy się w tle.
- Wady: kod natywny i test tylko na urządzeniu.
### B: tylko pierwszy plan i przerwanie na `AppState`
- Zalety: bez kodu natywnego.
- Wady: zależy od tego, czy JS zdąży; długa pojedyncza instrukcja nieprzerywalna; import przepada przy każdym wyjściu z aplikacji.
### C: wiele małych transakcji
- Zalety: krótka blokada.
- Wady: import częściowy po zabiciu procesu (łamie ADR 0008 i NFR-DANE-002), chyba że przez tabelę pośrednią, co dodaje schemat i kod bez nazwanego problemu na dziś.
