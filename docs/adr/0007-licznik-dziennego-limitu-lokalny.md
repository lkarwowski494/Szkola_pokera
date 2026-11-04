---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (delegacja w `CLAUDE.md`, analogia Trening), weto właściciela
zamyka: OP-24 w BRD = OP-10 w `docs/monetyzacja.md` (po akceptacji)
---
# 0007. Dzienny limit liczony z lokalnego zapisu startów aktywności w bazie użytkownika, według daty i strefy telefonu; ponowna instalacja zeruje licznik dnia (ryzyko przyjęte)

## Kontekst i problem
F-18: 1 darmowa aktywność dziennie (D-107); jednostka to rozpoczęta aktywność (sesja ćwiczeń, kolejka powtórek, scenariusz, powtórny test). Licznik przed startem, nie w trakcie; rozpoczęta aktywność kończy się bez ekranu zakupu, także po przerwaniu (BR-LIM-001, -002); odnowienie w dniu kalendarzowym telefonu (BR-LIM-005). OP-24: co po ponownej instalacji tego samego dnia.

## Czynniki decyzji
- Analogia Trening: lokalny licznik; zmiana daty w telefonie „**teoretyczny** — wymaga ręcznej zmiany ustawień systemu, brak drogi przez UI aplikacji … **zaakceptowane** (teoretyczny, bez naprawy; 22.10.2026)” (`trening/docs/40-lekcje.md:28`, R-M5-2, odczyt raw.githubusercontent.com 2026-11-04). Delegacja: analogiczna decyzja Treningu ma pierwszeństwo przed pytaniem właściciela.
- Keychain: „data stored with expo-secure-store will persist across app uninstallations when the app is reinstalled with the same bundle ID … this is not guaranteed and you should never rely on this implementation detail”; Android: „will not be preserved upon app uninstallation” (docs.expo.dev …/securestore, odczyt 2026-11-04).
- Realność obejścia przez ponowną instalację: brzegowy — zysk to 1 dodatkowa aktywność dziennie za cenę ponownej instalacji; postęp wraca tylko z kopii albo eksportu.
- Strefa telefonu: `getCalendars()` zwraca `timeZone` (docs.expo.dev …/localization, E0).
- Zasada wspólna 13 i 18: bez nowej zależności dla zabezpieczenia o niskiej wartości.

## Rozważane opcje
- A: lokalny zapis startów w bazie użytkownika · B: licznik w Keychain (`expo-secure-store`) · C: A + znacznik w Keychain jako drugie źródło

## Decyzja
Wybrano „A”, ponieważ Expo wprost odradza poleganie na trwałości Keychain po odinstalowaniu, na Androidzie ona nie działa, a obejście daje najwyżej jedną aktywność dziennie; Trening przyjął analogiczne ryzyko jako teoretyczne.

Ustalenia wiążące:
1. Tabela `aktywnosc` w bazie użytkownika: `id`, `rodzaj` (CHECK: `sesja`, `powtorki`, `scenariusz`, `test_powtorny`), `dzien_lokalny` (`RRRR-MM-DD` w strefie telefonu w chwili startu), `strefa`, `start_ms`, `koniec_ms` (NULL = w toku), `darmowa` (0/1).
2. Funkcja domeny `limitDnia(aktywnosciDnia, dostepPro, dzienLokalny, konfiguracja) → { pozostalo, odnowienie }`; `LIMIT_AKTYWNOSCI_DZIENNIE = 1` w module konfiguracji (źródło: D-107).
3. Decyzja o starcie zapada raz, przy starcie; wznowienie aktywności w toku (`koniec_ms IS NULL`) nie sprawdza limitu (BR-LIM-002), także po północy.
4. Dzień liczony z `dzien_lokalny` zapisanego przy starcie, nie z odejmowania czasu; zmiana strefy daje dzień według nowej strefy (brzegowy, przyjęty).
5. Eksport zawiera tabelę `aktywnosc` (kontrakt zakresu: F-18 w eksporcie); import łączy dzisiejsze wpisy z obecnymi (suma zużycia, nie zastąpienie), żeby import nie odnawiał limitu. „Usuń postęp” nie usuwa wpisów dnia bieżącego (to nie jest postęp nauki, BR-DANE-003).
6. Ryzyka przyjęte (zapis wzorem R-M5-2): ręczna zmiana daty w telefonie (teoretyczny); ponowna instalacja tego samego dnia zeruje licznik (brzegowy, 1 aktywność).

### Konsekwencje
- Dobre: bez nowej zależności; testowalne w Node; zgodne z BR-LIM-001–005.
- Złe: obejście przez ponowną instalację albo zmianę daty możliwe (przyjęte).
- Od czego zależy: D-107 (N = 1); ADR 0010 (maszyna stanów aktywności).

### Potwierdzenie
- Wektory domeny (rola 07): brak aktywności → 1; jedna rozpoczęta → 0 i godzina odnowienia; Pro → bez licznika; wznowienie po północy bez sprawdzania; nowy dzień → 1; import z dzisiejszym wpisem nie zwiększa limitu; „Usuń postęp” nie odnawia limitu.
- Krok właściciela T-04 (kontrakt zakresu): zmiana daty w telefonie, przerwana sesja.

## Opcje: zalety i wady
### A: lokalny zapis w bazie
- Zalety: jedno źródło, w eksporcie i kopii; zero zależności.
- Wady: ponowna instalacja zeruje dzień.
### B: Keychain
- Zalety: zwykle przeżywa ponowną instalację na iOS.
- Wady: „not guaranteed”; brak na Androidzie; nowa zależność; licznik poza eksportem i poza bazą (dwa źródła).
### C: A + znacznik w Keychain
- Zalety: utrudnia obejście na iOS.
- Wady: dwa źródła do uzgadniania; koszt kodu i testów dla zysku ≤ 1 aktywności dziennie.
