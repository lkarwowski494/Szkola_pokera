---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent z rolą 08 (D-104: „o kodzie (ukrycie albo usunięcie) decydują role 05 i 08”), weto właściciela
---
# 0011. Kod funkcji bez BR (D-104) usunięty z aplikacji, z odnośnikiem do commitu w kontrakcie zakresu; diagnostyka tylko w buildzie deweloperskim

## Kontekst i problem
D-104 wyjmuje z interfejsu wersji 1: tryb „Trening na czas” (`session.tsx`, `mode: 'speed'`), księgę reguł (`(tabs)/rules.tsx`), diagnostykę (`diagnostics.tsx`), część „gra” wskaźnika zaawansowania (`advancement.tsx`) i grę z botami (`play/*`, tabele gry). Trzeba zdecydować: ukryć w buildzie wydania czy usunąć.

## Czynniki decyzji
- App Review Guidelines 2.5.19: „Don’t include any hidden, dormant, or undocumented features in your app; your app’s functionality should be clear to end users and App Review” (developer.apple.com/app-store/review/guidelines, odczyt 2026-11-04). Uwaga: numer to 2.5.19, nie 2.3.1.
- Schemat v1 bez tabel gry (ADR 0004, kontrakt zakresu); kod `play/*` pisze do tabel drizzle, które znikają (ADR 0003) — ukryty kod przestałby się kompilować albo wymagałby utrzymania.
- Powroty z kontraktu zakresu (warunek H-07, ≥ 3 prośby itd.) potrzebują odtwarzalności, nie działającego kodu.
- Zasada wspólna 18: bez kombajnów.

## Rozważane opcje
- A: usunąć z aplikacji; odnośnik do ostatniego commitu z kodem w kontrakcie zakresu · B: ukryć flagą konfiguracji w buildzie wydania · C: przenieść do osobnej gałęzi archiwalnej

## Decyzja
Wybrano „A”, ponieważ wytyczna 2.5.19 wprost zakazuje uśpionych funkcji w aplikacji, a kod gry i tak traci swoje tabele. Historia git zachowuje kod; kontrakt zakresu dostaje w kolumnie „Powrót” hash ostatniego commitu z kodem (rola 08 przy usunięciu). Diagnostyka (narzędzie dewelopera) zostaje tylko pod `__DEV__` / w buildzie deweloperskim, poza binarką wydania.

### Konsekwencje
- Dobre: binarka bez ukrytych funkcji (2.5.19); mniej kodu do migracji na SDK 58 i port bazy; mniej testów.
- Złe: powrót funkcji to odtworzenie z historii i dopasowanie do nowej architektury (koszt przy powrocie, nie teraz).
- Od czego zależy: ADR 0003, ADR 0004.

### Potwierdzenie
- Kontrola statyczna (rola 07): brak plików `features/play/`, `rules.tsx`, trybu `speed` w `apps/mobile/src`; `diagnostics` importowane tylko w gałęzi `__DEV__`.
- Kontrakt zakresu, tabela „Funkcje w kodzie bez BR”: kolumna „Powrót” z hashem commitu (rola 08).

## Opcje: zalety i wady
### A: usunąć
- Zalety: zgodność z 2.5.19; mniej kodu.
- Wady: odtworzenie kosztuje przy powrocie.
### B: ukryć flagą
- Zalety: szybki powrót.
- Wady: uśpiona funkcja w binarce (2.5.19); kod gry bez tabel; podwójne testy.
### C: gałąź archiwalna
- Zalety: kod gotowy obok.
- Wady: gałąź starzeje się z każdym ADR; historia git daje to samo bez utrzymania.
