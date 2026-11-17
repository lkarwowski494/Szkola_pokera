# Weryfikacja g3-dane-a (audyt M1, 2026-11-17)

Zakres: 7 znalezisk z `weryfikacja/wejscie-g3-dane-a.md`. Kod: repo `/home/user/Szkola_pokera`, commit f75acdff (kopia robocza gałęzi audytu ma identyczny kod: `git diff --stat f75acdff HEAD` bez `audit/` i `docs/decyzje/IR.md` daje 0 linii, dowody/g3-dane-a-appstate.txt). Sondy uruchomione w worktree f75acdff w scratchpadzie (`env -u NODE_PATH`). Próg: CLAUDE.md "Audyty i wydania" pkt 1. Etap: TestFlight wewnętrzny, poza właścicielem brak użytkowników i danych.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 05-architekt-001 | potwierdzone | dowody/g3-dane-a-appstate.txt, dowody/g3-dane-a-sonda-limit.txt | P2 (ŚREDNIE; zgłoszone P1) | nie | nie |
| 08-programista-001 | potwierdzone | dowody/g3-dane-a-appstate.txt | P2 | nie | nie |
| 12-niezawodnosc-001 | potwierdzone | dowody/g3-dane-a-start.txt, dowody/g3-dane-a-sonda-start.txt | P2 (ŚREDNIE; zgłoszone P1) | nie | nie |
| 12-niezawodnosc-002 | potwierdzone | dowody/g3-dane-a-start.txt, dowody/g3-dane-a-sonda-start.txt | P2 (ŚREDNIE; zgłoszone P1) | nie | nie |
| 12-niezawodnosc-003 | potwierdzone (brak mechanizmu) | dowody/g3-dane-a-start.txt | P2 (ŚREDNIE; zgłoszone P1) | nie | nie |
| 05-architekt-007 | potwierdzone z korektą (kopia przed importem nie trafia do kopii iCloud; `wariant_historia` usuwana przez "Usuń postęp", luka tylko w dokumencie) | dowody/g3-dane-a-pliki.txt | P2 | nie | nie |
| 12-niezawodnosc-005 | potwierdzone | dowody/g3-dane-a-pliki.txt, dowody/g3-dane-a-sonda-start.txt | P2 | nie | nie |

Wspólne przyczyny:
- A: brak obsługi `AppState` w warstwie aplikacji (wymagana przez `tlo-i-bledy.md` §2 pkt 3–4 i ADR 0013 pkt 4) — 05-architekt-001 i 08-programista-001 (pierwszy skutek identyczny; 08-001 dodaje przerwanie operacji długiej i odtworzenie przypomnienia).
- B: niewdrożone stany błędów startu z tabeli `tlo-i-bledy.md` §4 (kolumna "Stan w projekcie" = brak) — 12-niezawodnosc-001 (baza_nowsza, migracja_nieudana) i 12-niezawodnosc-002 (baza_uszkodzona); 12-niezawodnosc-003 to pokrewny, osobny brak (strażnik pętli awarii nie jest w architekturze projektu).
- C: "Usuń postęp" usuwa tylko tabele i `STARE_BAZY` — 05-architekt-007 i 12-niezawodnosc-005 (te same dwa pliki).

## 05-architekt-001

Wynik: potwierdzone.

- `apps/mobile/src/data/postep.ts:63` „useFocusEffect(odswiez);” — jedyny wyzwalacz odczytu na ekranie.
- `node_modules/expo-router/build/useFocusEffect.js:97` „navigation.addListener('focus'” — nasłuch tylko `focus` (i `blur`, w. 109); `AppState` w tym pliku: brak (dowody/g3-dane-a-appstate.txt).
- W `apps/mobile/src`, `apps/mobile/modules`, `packages/*/src` wywołań `AppState.`, `addEventListener('change'` ani `useAppState` jest 0 (grep kod 1); `AppState` tylko w dwóch komentarzach.
- `apps/mobile/src/app/(tabs)/index.tsx:32` „k.wartosc.filter((x) => x.termin_ms <= teraz).length” — liczba powtórek zamrożona na chwilę odczytu.
- `apps/mobile/src/app/(tabs)/index.tsx:56` „limitZeZuzycia(odczyt.wartosc.zuzyte, { pro, zegar: zegarTelefonu })” — przy ponownym renderze limit liczony jest od nowa, ale ze starego zużycia.
- `packages/domena/src/limit.ts:14` „pozostalo: Math.max(0, k.LIMIT_AKTYWNOSCI_DZIENNIE - wej.zuzyteDzis),” — dzień nie wpływa na `pozostalo`, więc nawet render wymuszony czymś innym (np. zmiana `pro`) nie odnowi limitu. Sonda: dzień 2 z tym samym stanem ekranu daje `pozostalo: 0`, po nowym odczycie `pozostalo: 1` (dowody/g3-dane-a-sonda-limit.txt, kod 0).
- Decyzja wymagająca reakcji: `docs/architektura/tlo-i-bledy.md:42` „odczyt dnia lokalnego i strefy (limit mógł się odnowić, BR-LIM-005)”. Decyzji odraczającej obsługę `AppState` w `docs/decyzje.md` i `docs/decyzje/` (bez IR.md) brak (grep kod 1).

Poziom: skutek to nieaktualny stan ekranu "Dziś" (stopka limitu z linkiem do zakupu, kafelki w stanie limitu, stara liczba powtórek) do pierwszej zmiany fokusu. Dostęp nie jest blokowany: start liczy limit od nowa (`apps/mobile/src/app/session.tsx:135` „const p = await przygotujStart(port, {”). Dane nie giną, funkcja działa po jednym dotknięciu; to nie jest żadna z kategorii blokujących (nie "błędne liczby merytoryczne" — to stan interfejsu, który sam się poprawia). Poziom P1 "WYSOKIE bez blokady" jest wewnętrznie sprzeczny z progiem pkt 1; właściwy P2 (ŚREDNIE).
- Blokuje 1012: nie — tylko właściciel, skutek kosmetyczny i przejściowy.
- Blokuje App Store: nie — brak naruszenia wytycznych (zakup nie jest wymuszany, dostęp po dotknięciu działa); zalecane przed upublicznieniem, bo stopka z linkiem do zakupu przy odnowionym limicie może wyglądać jak nacisk na zakup.
- Ta sama przyczyna co 08-programista-001 (przyczyna A).

## 08-programista-001

Wynik: potwierdzone.

- `docs/adr/0013-ochrona-dlugich-operacji-przed-zawieszeniem.md:31` „flagę ustawia `wygasa` albo `AppState` → `background`, gdy `rozpocznij` zwróci” — ustalenie wiążące.
- `packages/postep/src/port.ts:58` „operacja bez ochrony, przerwanie przy przejściu do tła należy do warstwy aplikacji” — port przy id −1 nie przerywa sam (w. 62–65: flaga ustawiana tylko przez `naWygasniecie`), a warstwa aplikacji nie ma nasłuchu `AppState` (dowody/g3-dane-a-appstate.txt, grep kod 1).
- `apps/mobile/src/platform/ochronaTla.ts:11` „if (!mod) return { rozpocznij: () => -1” — bez modułu natywnego zawsze −1; na iOS −1 tylko gdy system odmówi czasu.
- `apps/mobile/src/features/ustawienia/przypomnienie.ts:44` „Odtworzenie z zapisu (start, powrót na pierwszy plan, import” — a `odtworzZBazy` wołają tylko `_layout.tsx` w. 146 (start), `data.tsx` w. 42 (import) i `settings.tsx` w. 81 ("Usuń postęp") (dowody/g3-dane-a-appstate.txt).
- Pierwszy skutek (ekran "Dziś") — jak 05-architekt-001.

Poziom P2 pasuje: nieaktualny ekran sam się poprawia; przerwanie operacji długiej dotyczy tylko przypadku `rozpocznij` = −1 (brzegowy), a tryb `DELETE` wycofuje przerwaną transakcję, więc bez utraty danych; ryzyko `0xdead10cc` dotyczy głównie blokad w kontenerze współdzielonym, którego aplikacja nie ma (`docs/architektura/tlo-i-bledy.md:43` „Baza i pliki nie leżą we wspólnym kontenerze (App Group)”).
- Blokuje 1012: nie — brak danych innych niż właściciela, brak awarii.
- Blokuje App Store: nie — skutki przejściowe albo brzegowe, bez utraty danych.
- Ta sama przyczyna co 05-architekt-001 (przyczyna A).

## 12-niezawodnosc-001

Wynik: potwierdzone.

- `apps/mobile/src/app/_layout.tsx:76` „if (aktualny) ustaw({ stan: 'blad' });” — powód (`baza_nowsza`, `migracja_nieudana`, ...) z `startPostepuExpo` jest gubiony.
- `apps/mobile/src/app/_layout.tsx:152` „if (postep.stan === 'blad') return <RenderErrorScreen onRetry={postep.ponow} />;”
- `apps/mobile/src/components/RenderErrorScreen.tsx:19` „<Button label={t('errors.render.retry')} onPress={onRetry} />” — jedyna akcja.
- `apps/mobile/src/i18n/locales/pl.json:570` „Tego ekranu nie udało się wyświetlić. Spróbuj jeszcze raz.”
- Architektura wymaga innego ekranu: `docs/architektura/tlo-i-bledy.md:66` „aplikacja nie zapisuje nic; ekran „Zaktualizuj aplikację”; dane bez zmian” (kolumna stanu: brak).
- Sonda powtórzona w worktree: B (user_version 4) i C (migracja z błędem) — 3 kolejne starty dają `BladStartuPostepu(baza_nowsza)` / `BladStartuPostepu(migracja_nieudana)`, sha i liczności bez zmian (dowody/g3-dane-a-sonda-start.txt, kod 0).

Poziom: dane są nietknięte (sonda), a przyczyną niedostępności jest instalacja starszego buildu albo nieudana migracja, nie ekran. Ekran tylko nie mówi, co zrobić. `baza_nowsza` jest realna wyłącznie przy obniżeniu wersji — w TestFlight (u właściciela), w App Store zwykły użytkownik nie zainstaluje starszej wersji. Brak kategorii blokującej → P2 (ŚREDNIE); "P1 bez blokady" sprzeczne z progiem.
- Blokuje 1012: nie — właściciel wie, że wystarczy zainstalować nowszy build; dane bezpieczne.
- Blokuje App Store: nie — `migracja_nieudana` brzegowa, dane zostają; zalecane przed upublicznieniem (wspólnie z 12-002).
- Wspólna przyczyna z 12-niezawodnosc-002 (przyczyna B: stany §4 niewdrożone).

## 12-niezawodnosc-002

Wynik: potwierdzone.

- `packages/postep/src/start.ts:67` „return { port: await otworzZProba(o, sciezka), uszkodzona };”
- `apps/mobile/src/app/_layout.tsx:79` „otwarty = w.wartosc.port;” — pole `uszkodzona` nie jest nigdzie czytane w interfejsie (grep `uszkodzona` w `apps/mobile/src` poza testami: tylko dziennik i `postepExpo.ts`, dowody/g3-dane-a-start.txt).
- `apps/mobile/src/data/postepExpo.ts:125` „if (w.uszkodzona !== null) zapiszBlad('baza_uszkodzona');” — komentarz w. 118 sam odsyła ekran do "części 5, stan roli 04", czyli niewykonany.
- `apps/mobile/app.json`: brak `UIFileSharingEnabled` (grep kod 1).
- Sonda D powtórzona: nowa `postep.db` 0 wierszy, odłożony plik ma sha pliku uszkodzonego, po przywróceniu nagłówka pełne liczności i `integrity_check` ok; drugi start `uszkodzona: null` (dowody/g3-dane-a-sonda-start.txt, kod 0).
- Wymaganie: `docs/architektura/tlo-i-bledy.md:68` „nowa pusta baza, komunikat z „Zgłoś błąd” i informacją o imporcie z ostatniego” (stan: brak).

Poziom: realność teoretyczna (`docs/architektura/tlo-i-bledy.md:73` „SQLite w trybie `DELETE` wycofuje przerwane transakcje; uszkodzenie wymaga awarii nośnika albo błędu systemu”). Dane nie są niszczone (plik zachowany, także w kopii iCloud, bo leży w `Documents/SQLite`); brakuje informacji i drogi samodzielnego odzyskania. Teoretyczna realność przy zachowanym pliku → P2 (ŚREDNIE), nie P1.
- Blokuje 1012: nie — teoretyczne, właściciel ma dostęp deweloperski.
- Blokuje App Store: nie — teoretyczne, plik nie ginie; zalecane razem z 12-001 przed upublicznieniem (komunikat z odesłaniem do importu ostatniego eksportu).
- Wspólna przyczyna z 12-niezawodnosc-001 (przyczyna B); odłożony plik to też jeden z dwóch plików z 05-architekt-007 / 12-niezawodnosc-005.

## 12-niezawodnosc-003

Wynik: potwierdzone (brak mechanizmu).

- grep strażnika (`PROG_NIEUDANYCH`, `trybAwaryjny`, `kamienMilowy`, `setGlobalHandler`, `ErrorUtils` i in.) w `apps/mobile/src` i `packages`: 0 trafień, kod 1 (dowody/g3-dane-a-start.txt).
- `apps/mobile/src/app/_layout.tsx:161` „<GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />} onBlad={pierwszeOtwarcie}>” — granica obejmuje tylko drzewo pod nią, nie `RootLayout`.
- `apps/mobile/src/components/GranicaBledu.tsx:13` „Nie łapie błędów w obsłudze zdarzeń i w kodzie asynchronicznym”.
- Trening (analogia D-191): `lib/state/crashguard.ts` w. 9 `CRASH_LOOP_THRESHOLD = 2` (HEAD 2d97581, odczyt 2026-11-17, `git ls-remote` i `curl` kod 0, dowody/g3-dane-a-start.txt).
- W architekturze projektu strażnika nie ma (ADR 0009 przekazuje raportowanie awarii roli 12), więc to brak zabezpieczenia, nie odstępstwo od decyzji.

Poziom: brak istniejącej awarii; skutek tylko przy przyszłym deterministycznym błędzie poza granicą, dane w bazie zostają, kopia iCloud i nowy build przywracają dostęp. Żadna kategoria blokująca nie jest spełniona dziś → P2 (ŚREDNIE).
- Blokuje 1012: nie — brak znanej awarii; build 1012 nie ma użytkowników poza właścicielem.
- Blokuje App Store: nie — zabezpieczenie na przyszłość; do backlogu z wersją przed upublicznieniem (Trening ma wzór).

## 05-architekt-007

Wynik: potwierdzone z korektą.

- `docs/architektura/prywatnosc.md:16` „Stare bazy z buildów 1005–1008 (`user.db*`)” — ostatni wiersz plików w `Documents/SQLite`; w całym pliku 0 trafień `wariant_historia`, `uszkodzona`, `przed-importem` (grep -c = 0, dowody/g3-dane-a-pliki.txt).
- `packages/postep/src/start.ts:28` „const nazwaUszkodzonej = (ms: number, n: number)”
- `apps/mobile/src/platform/pliki.ts:15` „const KOPIA = 'postep-przed-importem.db';”
- `apps/mobile/src/data/przeniesienie.ts:95` „kopia zostaje w katalogu tymczasowym” — zgodnie z ADR 0008 pkt 2 (5): usunięcie tylko po udanym imporcie; następny import usuwa ją przed `VACUUM INTO` (w. 82).
- `packages/postep/src/start.ts:27` „const STARE_BAZY = ['user.db-wal', 'user.db-shm', 'user.db'] as const;” — "Usuń postęp" (`apps/mobile/src/data/postepExpo.ts:156` „return usunStareBazy(pliki, k);”) nie dotyka obu plików.

Korekty:
1. Kopia przed importem leży w `Paths.cache`, czyli `Library/Caches` (`node_modules/expo-modules-core/ios/Core/AppContextConfig.swift:11` „FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first”), a ten katalog nie wchodzi do kopii iCloud i system może go czyścić. Zdanie "zostaje na telefonie i w kopii iCloud" jest prawdziwe tylko dla bazy uszkodzonej (`Documents/SQLite`).
2. Tabela `wariant_historia` jest usuwana przez "Usuń postęp": `packages/postep/src/daneUzytkownika.ts:39` „const DZIECI_PRZED_RODZICAMI: readonly TabelaEksportu[] = ['wariant_historia',” i w. 173 (`DELETE FROM` każdej tabeli poza `aktywnosc`). Brak w inwentarzu to luka dokumentu, nie danych.

Poziom P2 pasuje: dane zostają tylko na urządzeniu użytkownika (i w jego kopii iCloud dla pliku uszkodzonego), postęp nie jest daną wrażliwą, kryterium BR-DANE-003 (widoczny postęp pusty) spełnione.
- Blokuje 1012: nie — brak danych innych osób; kopia w `Caches` i plik uszkodzony to przypadki brzegowe/teoretyczne.
- Blokuje App Store: nie — nic nie opuszcza urządzenia poza kopią systemową użytkownika, etykieta prywatności (dane niezbierane) bez zmian; poprawka inwentarza i sprzątanie po "Usuń postęp" do backlogu.
- Ta sama przyczyna co 12-niezawodnosc-005 (przyczyna C), plus luka dokumentu.

## 12-niezawodnosc-005

Wynik: potwierdzone.

- `packages/postep/src/start.ts:27` „const STARE_BAZY = ['user.db-wal', 'user.db-shm', 'user.db'] as const;”
- `apps/mobile/src/data/postepExpo.ts:156` „return usunStareBazy(pliki, k);”
- `apps/mobile/src/data/przeniesienie.ts:95` „kopia zostaje w katalogu tymczasowym”
- `apps/mobile/src/platform/pliki.ts:15` „const KOPIA = 'postep-przed-importem.db';”
- Sonda D: po drugim starcie odłożony `postep-uszkodzona-1800000000000.db` dalej leży obok nowej `postep.db` (dowody/g3-dane-a-sonda-start.txt, kod 0).

Poziom P2 pasuje (jak 05-architekt-007): kopia w `Caches` żyje do następnego importu albo czyszczenia przez system i nie trafia do kopii iCloud; plik uszkodzony — teoretyczny.
- Blokuje 1012: nie — j.w.
- Blokuje App Store: nie — bez wpływu na prywatność wobec osób trzecich i na etykietę; do backlogu.
- Ta sama przyczyna co 05-architekt-007 (przyczyna C).
