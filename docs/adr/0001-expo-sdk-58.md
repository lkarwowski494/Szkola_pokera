---
status: proponowana
data: 2026-11-04
decyduje: agent (technika; delegacja w `CLAUDE.md`), weto właściciela
---
# 0001. Budowa startuje na Expo SDK 58, nie na obecnym SDK 57

## Kontekst i problem
Przebudowa „prawie od nowa” (sztafeta 01–05) zaczyna kod od schematu v1 (D-124), więc każda zależność natywna i tak zostanie dotknięta. Kod jest na `expo ~57.0.26`, a dokumentacja Expo w dniu pracy opisuje SDK 58 jako „latest”. Dotyczy wszystkich przepływów PR-01–PR-09.

## Czynniki decyzji
- Rejestr ograniczeń (E0, 2026-11-04): `expo` 58.0.23 w registry.npmjs.org; docs.expo.dev/versions/latest/sdk/sqlite: „Recommended version: ~58.0.15”; to samo „Recommended version ~58…” dla `expo-notifications`, `expo-sharing`, `expo-document-picker`, `expo-localization`, `expo-file-system`.
- Moduły biblioteki (`dane-lokalne-sqlite`, `tlo-i-sensory-ios`) i cytaty tej architektury pochodzą z dokumentacji SDK 58; kod na 57 wymagałby ponownego sprawdzenia każdego cytatu na stronach `v57.0.0`.
- Wzorce kodu z Treningu (D-125) są na SDK 57 (`trening/package.json`, odczyt E0) — przepisanie, nie kopia, więc różnica wersji to koszt tłumaczenia API, nie blokada.
- Koszt CI i buildów: aktualizacja SDK teraz, przed kodem, kosztuje mniej niż po napisaniu nowych modułów.

## Rozważane opcje
- A: SDK 58 na start budowy · B: zostać na SDK 57, aktualizacja po wydaniu wersji 1

## Decyzja
Wybrano „A: SDK 58”, ponieważ kontrakty tej architektury cytują dokumentację SDK 58, a aktualizacja przed przebudową nie dubluje pracy roli 08.

### Konsekwencje
- Dobre: jedna wersja dokumentacji dla 05, 07 i 08; brak drugiej aktualizacji tuż po wydaniu.
- Złe: aktualizacja React Native i wtyczek konfiguracji przed pierwszym kodem (rola 08); wzorce Treningu wymagają dopasowania API.
- Od czego zależy: zgodność bibliotek spoza Expo z SDK 58 — `expo-iap` 6.4.2 ma `peerDependencies` `expo: "*"` (package.json z paczki, odczyt 2026-11-04); pełna zgodność `[DO USTALENIA]` po instalacji (rola 08, `npx expo install --check`).

### Potwierdzenie
- `apps/mobile/package.json`: `expo ~58.x` i moduły `expo-*` w wersjach „Recommended” SDK 58; `npx expo install --check` bez ostrzeżeń (rola 08, wynik w PR).
- `pnpm run ci` zielone po aktualizacji; build deweloperski iOS uruchomiony (krok właściciela albo EAS po zgodzie na limit).

## Opcje: zalety i wady
### A: SDK 58
- Zalety: zgodność z aktualną dokumentacją i modułami biblioteki; aktualizacja na kodzie, który i tak powstaje od nowa.
- Wady: praca aktualizacji na starcie; ryzyko niezgodności biblioteki zewnętrznej wykrytej dopiero po instalacji.
### B: SDK 57
- Zalety: zero pracy teraz; ta sama wersja co Trening.
- Wady: cytaty architektury trzeba sprawdzać na starszych stronach; aktualizacja i tak potrzebna, wtedy na gotowym kodzie i po wydaniu (dwa razy testy na telefonie).
