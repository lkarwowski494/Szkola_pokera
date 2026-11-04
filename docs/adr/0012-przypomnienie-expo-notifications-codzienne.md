---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika; F-11 w zakresie z D-102), pora domyślna i tekst: rola 04/06
---
# 0012. Przypomnienie (F-11) jako jedno lokalne powiadomienie `expo-notifications` z wyzwalaczem codziennym, bez pracy w tle i bez serwera

## Kontekst i problem
F-11 (BR-POW-003): lokalne przypomnienie za zgodą; jedno zdanie przed prośbą systemu; odmowa bez skutków (kontrakt zakresu, T-08). Kontrakt: „W tle: tylko lokalne powiadomienie F-11. Uprawnienia: tylko powiadomienia (za zgodą)”.

## Czynniki decyzji
- `DailyTriggerInput`: „delivered once per day when the hour and minute date components match the specified values” (docs.expo.dev …/notifications ~58.1.8, E0).
- `getPermissionsAsync`: „There is no user-facing effect”; `requestPermissionsAsync` pokazuje prośbę systemu (jw.).
- Zasada 4 modułu `tlo-i-sensory-ios`: powiadomienie planowane na porę bezwzględną, nie odliczaniem.
- NFR-PRYW-001: bez push z serwera (0 domen).
- Wzorzec: przypomnienie Treningu (D-125).
- Limit liczby zaplanowanych powiadomień lokalnych na iOS: nie podany na przeczytanych stronach `[DO USTALENIA]`; projekt planuje jedno.

## Rozważane opcje
- A: jedno powiadomienie z wyzwalaczem codziennym (system powtarza) · B: powiadomienia na konkretne daty z treścią (np. liczba powtórek), planowane z wyprzedzeniem przy każdym otwarciu · C: bez przypomnienia systemowego (tylko licznik powtórek w aplikacji) — odniesienie, F-11 jest w zakresie

## Decyzja
Wybrano „A”, ponieważ działa bez pracy w tle i bez ponownego planowania, a stała treść nie może być nieaktualna (B pokazywałby liczbę powtórek z chwili planowania).

Ustalenia wiążące:
1. Ustawienia w bazie: `przypomnienie_wlaczone`, `przypomnienie_godzina`, `przypomnienie_minuta` (w eksporcie, F-11 w kontrakcie); identyfikator zaplanowanego powiadomienia odtwarzany przy starcie (anuluj wszystkie własne → zaplanuj jedno), więc zmiana ustawień, import i ponowna instalacja nie dublują powiadomień.
2. Kolejność: `getPermissionsAsync` → zdanie wyjaśnienia (rola 04) → `requestPermissionsAsync` dopiero po akcji użytkownika; odmowa: przełącznik wyłączony, reszta aplikacji bez zmian.
3. Treść stała, bez danych osobowych i bez liczby powtórek; w języku aplikacji w chwili planowania (zmiana języka → ponowne zaplanowanie).
4. Bez `expo-background-task` i bez trybów tła (`UIBackgroundModes` pusty).

### Konsekwencje
- Dobre: zero pracy w tle; jedna ścieżka uprawnień; brak serwera.
- Złe: treść ogólna (bez liczby powtórek); po zmianie strefy pora według nowej strefy (zachowanie systemu, przyjęte).
- Od czego zależy: uprawnienia i wpisy konfiguracji wtyczki `expo-notifications` w buildzie — rozstrzygnięte w E3 (uzupełnienie niżej).

### Potwierdzenie
- Test domeny/adaptera z atrapą `expo-notifications`: włączenie → dokładnie jedno zaplanowane powiadomienie z wyzwalaczem `daily`; ponowne włączenie, import, zmiana języka → nadal jedno; odmowa → zero i brak błędu.
- Kontrola: `app.json` bez `UIBackgroundModes`; brak `expo-background-task` w zależnościach.
- Krok właściciela T-08: zgoda, odmowa, powiadomienie następnego dnia.

## Opcje: zalety i wady
### A: wyzwalacz codzienny
- Zalety: prosty, bez tła, zawsze aktualny.
- Wady: treść ogólna.
### B: daty z treścią
- Zalety: konkretna liczba powtórek.
- Wady: liczba nieaktualna, gdy użytkownik nie otworzy aplikacji; planowanie wielu powiadomień (limit `[DO USTALENIA]`).
### C: bez przypomnienia
- Zalety: zero uprawnień.
- Wady: łamie zakres F-11 (D-102).

## Uzupełnienie E3 (2026-11-04, bez zmiany decyzji)
Wtyczka `expo-notifications` 58.1.8 przy wartości domyślnej dodaje uprawnienie push `aps-environment` (`plugin/build/withNotificationsIOS.js:53-56`); docs.expo.dev: „If set to false, the plugin does not add the APNs entitlement, which is useful for apps that use only local notifications”. Ustalenie wiążące 5: wtyczka z `enableRemoteNotifications: false`, bez `enableBackgroundRemoteNotifications`, bez wywołań `get*PushTokenAsync` (kontrole K-07, K-09 w `docs/architektura/kontrole-07.md`; szczegóły `docs/architektura/tlo-i-bledy.md` sekcja 3).
