---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (na podstawie NFR-PRYW-001 i OP-12, decyzji właściciela W-06), weto właściciela; usługa raportowania awarii w przyszłości: rola 12
zastępuje: ADR-17 z rejestru 03 na Dysku (Sentry) — wpis zastąpienia czeka na właściciela
---
# 0009. Usunięcie `@sentry/react-native` i `expo-observe`; błędy nieoczekiwane trafiają do granicy błędu i lokalnego dziennika bez wysyłki

## Kontekst i problem
Kod ma `@sentry/react-native ~7.11.0` i `expo-observe ~57.0.24` (`apps/mobile/package.json`), użyte w `apps/mobile/src/observability/` (`crashReports.ts`, `observe.ts`), `jest.setup.js`, `metro.config.js`; `app.json` deklaruje zbierane typy danych CrashData, PerformanceData, OtherDiagnosticData (`apps/mobile/app.json:18-20`). BRD wymaga 0 SDK raportów awarii i analityki i etykiety „Data Not Collected” (NFR-PRYW-001; OP-12; W-06). Dotyczy wszystkich przepływów.

## Czynniki decyzji
- NFR-PRYW-001: „liczba SDK analityki i raportów awarii w zależnościach” — próg 0 (miara wprost liczy obecność w zależnościach, nie tylko wysyłkę).
- Standard marki wysoki: bez SDK śledzących (`CLAUDE.md`).
- Polityka błędów (wzorce roli): nieoczekiwany wyjątek → granica błędu ekranu i dziennik bez danych osobowych; raportowanie ustala rola 12.
- F-17 „Zgłoś błąd”: użytkownik sam wysyła pocztą wersję, język i identyfikator zadania (BR-OPIN, D-110) — kanał za zgodą, widoczny dla użytkownika.

## Rozważane opcje
- A: usunąć oba SDK; dziennik lokalny bez wysyłki · B: usunąć Sentry, zostawić `expo-observe` bez danych o błędach · C: zostawić Sentry za zgodą użytkownika (opt-in)

## Decyzja
Wybrano „A”, ponieważ tylko A spełnia próg NFR-PRYW-001 (0 SDK w zależnościach, 0 domen poza sklepem); B nadal wysyła dane wydajności i wymaga deklaracji PerformanceData, a C zostawia SDK w zależnościach i deklarację w etykiecie.

Ustalenia wiążące:
1. Usunąć zależności, katalog `observability/`, wpisy w `jest.setup.js`, `metro.config.js` i trzy wpisy `NSPrivacyCollectedDataTypes` (manifest przebudowuje rola 10 według inwentarza z E3).
2. Dziennik lokalny: pierścień ostatnich N wpisów (`DZIENNIK_MAKS_WPISOW` w konfiguracji, `[DO USTALENIA]` w E2) w pamięci albo w bazie użytkownika; wpis: czas, kod błędu, ekran, wersja; bez treści odpowiedzi, bez identyfikatorów osób. Poza eksportem.
3. „Zgłoś błąd” (F-17) może dołączyć ostatnie wpisy dziennika do treści wiadomości, którą użytkownik widzi przed wysłaniem (tekst i zgoda: rola 04/06).
4. Raporty awarii od Apple dla użytkowników, którzy zgodzili się dzielić analityką z twórcami: zakres i warunki `[DO USTALENIA]` (rola 12, odczyt dokumentacji Xcode Organizer w dniu pracy).

### Konsekwencje
- Dobre: „Data Not Collected” możliwe; mniej zależności natywnych i kodu startowego; zgodność z W-06.
- Złe: brak automatycznego obrazu awarii u użytkowników; diagnoza z dziennika przesłanego przez użytkownika i z danych Apple (jeśli dostępne).
- Od czego zależy: decyzja roli 12 o raportowaniu awarii w przyszłości (nowy ADR, jeśli kiedykolwiek SDK wróci — wymaga zmiany NFR-PRYW-001 przez właściciela).

### Potwierdzenie
- Kontrola statyczna (rola 07, w CI): `package.json` bez `@sentry/*`, `expo-observe`, pakietów analityki z listy; `grep -rn "sentry\|expo-observe" apps/mobile` = 0.
- Manifest: `NSPrivacyCollectedDataTypes` pusty (rola 10).
- NFR-PRYW-001: zapis ruchu przez proxy w przejściu PR-01–PR-08 — 0 domen poza sklepem (krok właściciela albo roli 07 z buildem deweloperskim).

## Opcje: zalety i wady
### A: usunąć oba
- Zalety: spełnia NFR; najprostsze.
- Wady: brak telemetrii awarii.
### B: tylko `expo-observe`
- Zalety: dane o wydajności startu od użytkowników (OP-21).
- Wady: łamie próg 0 SDK i 0 domen; deklaracja w etykiecie.
### C: Sentry za zgodą
- Zalety: raporty od chętnych.
- Wady: SDK w zależnościach mimo braku zgody (łamie miarę NFR); deklaracja w etykiecie; prośba o zgodę to dodatkowy ekran.
