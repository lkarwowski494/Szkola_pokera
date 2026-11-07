---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika, na podstawie OP-12 i szkicu roli 02), weto właściciela
zastępuje: ADR-18 z rejestru 03 na Dysku („Do decyzji”, RevenueCat) — wpis zastąpienia czeka na właściciela
---
# 0006. Zakupy przez `expo-iap` bez usługi pośredniczącej; dostęp liczy czysta funkcja domeny z transakcji sklepu, lokalnie tylko pamięć podręczna

## Kontekst i problem
F-13 i F-18: kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (decyzja właściciela 2026-11-03), przywracanie, zarządzanie subskrypcją, dostęp offline do końca opłaconego okresu (kontrakt płatności w `docs/monetyzacja.md`). Trzeba wybrać bibliotekę i miejsce logiki dostępu. Dotyczy PR-06 i limitu w PR-03–PR-05.

## Czynniki decyzji
- NFR-PRYW-001 / OP-12: etykieta „Data Not Collected”, 0 domen poza sklepem.
- RevenueCat: „If you are using RevenueCat, you must disclose that your app collects ‘Purchases’ information” (odczyt roli 02, 2026-11-03, `docs/monetyzacja.md`).
- `expo-iap` 6.4.2, licencja MIT, repozytorium `git+https://github.com/hyodotdev/openiap.git` (registry.npmjs.org/expo-iap/latest, odczyt 2026-11-04). Na iOS zależy od pakietu Swift OpenIAP w dokładnej wersji; moduł OnsideKit tylko gdy `EXPO_IAP_ONSIDE=1` (`ios/ExpoIap.podspec:22-43`, paczka 6.4.2, odczyt 2026-11-04).
- StoreKit: po ponownej instalacji „the app automatically has all transactions available to it upon initial launch” (`AppStore.sync()`); `sync` „only in response to an explicit user action”; zwroty nie występują w `currentEntitlements`; arkusz zarządzania pozwala „view, upgrade, downgrade, or cancel” (rejestr E0, developer.apple.com, 2026-11-04). Wytyczna 3.1.1: mechanizm przywracania wymagany (E0).
- Wzorzec kodu: Trening, `expo-iap` 5.8.1, testy zakupów na telefonie przeszły (D-125; `trening/docs/18-przekazanie.md`, wpis 29.10.2026, E0). Różnica 5.x → 6.x: zmiany API `[DO USTALENIA]` (rola 08 przed przepisaniem).

## Rozważane opcje
- A: `expo-iap` · B: RevenueCat (`react-native-purchases`) · C: własny moduł StoreKit 2 (Expo Modules API)

## Decyzja
Wybrano „A: `expo-iap`”, ponieważ jako jedyna z opcji obsługuje iOS i Androida bez usługi pośredniczącej, bez danych dla strony trzeciej i bez opłat, a projekt ma sprawdzony wzorzec w Treningu.

Ustalenia wiążące:
1. ID produktów (zatwierdzone w tym ADR): `pl.lkarwowski.szkolapokera.kwartal`, `pl.lkarwowski.szkolapokera.rok` (jedna grupa subskrypcji „pelny”), `pl.lkarwowski.szkolapokera.dozywotni` (Non-Consumable); prefiks = `bundleIdentifier` z `apps/mobile/app.json:12`.
2. Logika dostępu to czysta funkcja domeny `decyzja(odczytSklepu | blad, pamiec, teraz) → { dostep, zrodlo, nowaPamiec }` z wektorami z `docs/monetyzacja.md` („Logika dostępu: wektory”, 9 wierszy) jako testami. Adapter `expo-iap` tylko tłumaczy transakcje na wejście funkcji.
   Uzupełnienie (L8-04, fix 05 2026-11-07, D-217): `wygasaMs: null` (bez końca) liczy się tylko dla produktów z listy `bezKonca` (konfiguracja: `PRODUKTY_BEZ_KONCA` = dożywotni); transakcja innego produktu bez daty końca nie daje dostępu ani wpisu w pamięci (wzór Treningu `lib/access.ts:83`, odczyt 2026-11-07). Sygnatura: `decyzja(odczyt, pamiec, teraz, odblokowuja, bezKonca)`; wektor W10 (subskrypcja bez daty końca → brak dostępu) dopisuje rola 07.
3. Źródło prawdy: transakcje sklepu. Lokalnie tylko pamięć podręczna ostatniego udanego odczytu (produkt, koniec okresu, czas odczytu) w bazie użytkownika; poza eksportem (przywraca sklep), zostaje po „Usuń postęp” (BR-DANE-003: zakup da się przywrócić).
4. Błąd odczytu sklepu ≠ brak zakupu (wektor „brak sieci, roczna trwa”).
5. OP-09 (wniosek do zamknięcia przez rolę 02): aplikacja nie anuluje subskrypcji sama; anulowanie tylko w arkuszu systemowym (`showManageSubscriptionsIOS`) albo w ustawieniach konta. Przy zakupie dożywotniego z aktywną subskrypcją: ujawnienie i przycisk do arkusza (tekst: rola 04/06).
6. Żadne wywołanie sklepu nie odbywa się w otwartej transakcji bazy (ADR 0003, pkt 6).

### Konsekwencje
- Dobre: „Data Not Collected” możliwe; 0 USD; jedna biblioteka na obie platformy; logika dostępu testowana w Node.
- Złe: brak panelu przychodów i weryfikacji paragonów po stronie serwera (dane sprzedaży tylko w App Store Connect); utrzymanie zależności od projektu jednego zespołu (repo przeniesione do `hyodotdev/openiap`).
- Od czego zależy: manifest prywatności pakietu OpenIAP i brak połączeń poza StoreKit `[DO USTALENIA]` (E3, po instalacji: pakiety SPM nie są w `node_modules`, sprawdzenie w `Pods`/SPM po `prebuild`, rola 08/10).

### Potwierdzenie
- Test domeny: 9 wektorów logiki dostępu (rola 07), w tym zwrot i brak sieci.
- Kontrola statyczna: `react-native-purchases` i inne SDK zakupów nieobecne w `package.json`; jedyny import `expo-iap` w adapterze płatności (`granice.mjs`).
- Krok właściciela (TestFlight, sandbox): 6 scenariuszy z kontraktu płatności (T-05 w kontrakcie zakresu).

## Opcje: zalety i wady
### A: `expo-iap`
- Zalety: bez usług i opłat; iOS i Android; przywracanie i arkusz zarządzania w API; wzorzec w Treningu.
- Wady: logika dostępu i obsługa przypadków brzegowych po naszej stronie; zmiana głównej wersji względem Treningu.
### B: RevenueCat
- Zalety: gotowa logika uprawnień i panel.
- Wady: deklaracja „Purchases” (łamie OP-12), usługa zewnętrzna, opłata powyżej progu przychodu.
### C: własny StoreKit 2
- Zalety: pełna kontrola, brak zależności.
- Wady: kod natywny Swift tylko dla iOS, Android osobno; więcej testów na urządzeniu.
