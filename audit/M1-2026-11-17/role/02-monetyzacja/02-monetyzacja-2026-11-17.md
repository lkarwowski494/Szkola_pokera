# Audyt: Monetyzacja — Szkoła Pokera (PokerGym) — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed (gałąź claude/sesja-ir-audyt-m1 @ 7915f759 = f75acdff + tylko audit/M1-2026-11-17/ i docs/decyzje/IR.md; kod aplikacji zgodny, dowody/e0-git-start.txt) · Tryb: audit (moduły audyt-paywalla, storekit-expo, cena-i-rachunek; wariant głęboki „c”) · Środowisko: Linux, Node 22.23.4, sieć do itunes.apple.com, apps.apple.com i developer.apple.com działa (200); Playwright 1.63.0 jest; brak Xcode i symulatora iOS (StoreKit, sandbox i TestFlight tylko jako krok właściciela); `gh` bez ważnego tokenu (dowody/e0-srodowisko.txt). Pełnego CI, instalacji i buildu nie powtarzano (polecenie M1); uruchomione pojedyncze testy, sonda RNTL w kopii roboczej i wektory dostępu.

## Podsumowanie
Kierunek monetyzacji zgadza się z rynkiem: darmowe lekcje, 1 darmowa aktywność dziennie i zakup dożywotni obok subskrypcji to dokładnie to, czego w recenzjach konkurencji brakuje płacącym (dowody/e0b-rynek-us.txt). Kod płatności jest w większości wzorcowy: dostęp liczy czysta funkcja z transakcji sklepu, pamięć podręczna działa bez sieci tylko do końca opłaconego okresu, przywracanie czyta transakcje, nasłuch działa od startu, dane i eksport są poza bramką (12/12 wektorów, 97 + 54 testy zielone). Dwa problemy blokują publikację w App Store (nie TestFlight wewnętrzny): przycisk „Privacy Policy” na ekranie zakupu nic nie otwiera (02-monetyzacja-001, znane jako 08-F20), a po zakupie albo przywróceniu ze stanu zakupu w sesji i scenariuszu ekran dalej pokazuje wyczerpany limit i „Pełny dostęp” (02-monetyzacja-002, odtworzone sondą). Bramka opłacalności nie była liczona: wyjątek nazwany właściciela z 2026-11-17 (MON-18). Decyzje dla właściciela: fakty strony prywatności (W-04) i ścieżka „dożywotni dla subskrybenta” (005).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 02-monetyzacja-001 | P0 (KRYTYCZNE: ryzyko odrzucenia; blokuje App Store, nie TestFlight wewnętrzny) | D | „Privacy Policy” na ekranie zakupu nic nie otwiera (adres = null) | otwarte |
| 02-monetyzacja-002 | P1 (WYSOKIE: ryzyko odrzucenia 2.1(b)) | D | Po zakupie lub przywróceniu w sesji i scenariuszu płacący widzi wyczerpany limit i „Pełny dostęp” | otwarte |
| 02-monetyzacja-003 | P2 | D | Ekran zakupu, opis w sklepie i notatki dla recenzenta pomijają scenariusze (z limitu, odblokowane zakupem) | otwarte |
| 02-monetyzacja-004 | P2 | D | Pusta lista produktów ze sklepu daje ekran zakupu bez planów i bez komunikatu | otwarte |
| 02-monetyzacja-005 | P2 | P | Subskrybent nie ma w aplikacji drogi do zakupu dożywotniego | otwarte |
| 02-monetyzacja-006 | P2 | D | Scenariusze zakupu na urządzeniu (U-5) bez daty i wyniku | otwarte |

## Linia bazowa i założenia
**Zapis przed lekturą `docs/monetyzacja.md` i kodu płatności** (ok. 11:15 UTC, ta sama treść była pierwszą wersją tego pliku). Wejście: opis en-US ze `store/app-store-metadata.json` i cel właściciela. Dowody: dowody/e0b-rynek-us.txt (storefront US, rynek główny, odczyt 2026-11-17), dowody/e0b-wytyczne-apple.txt (wytyczne „Last Updated: October 16, 2026” i strona subskrypcji, odczyt 2026-11-17).

Rynek (6 trenerów pokera w US): wszystkie darmowe do pobrania z subskrypcją; tydzień 4,99–9,99, miesiąc 9,99–29,99, rok 59,99–269,99 USD; dożywotni 149,99–269,99 USD (Postflop+, Poker Trainer – Learn Poker, Flop Factor). Skargi płacących z cytatem: Flop Factor, 1★, 2026-04-11: „Most apps like this will give you a free option that limits the amount you can practice in one day … there is no free option”; 1★, 2026-09-10: „$20 just to see what the app is”; Postflop+, 3★, 2024-10-23: „Price is a big problem for me as I’m scared of anything that is a subscription”; GTO Preflop Wizard, 1★, 2025-03-30: „It doesn’t lay out a curriculum”. Pochwała: Poker Trainer – Learn Poker, 5★, 2024-07-16: „doesn't require you to pay before you can look at it”.

Rodzaj wartości: kurs (lekcje) jest wartością jednorazową, ćwiczenia z oceną, powtórki rozłożone w czasie i scenariusze są wartością ciągłą. Reguła: 3.1.2(a) wymaga „ongoing value”; okres próbny zakupu jednorazowego tylko jako „XX-day Trial” (3.1.1).

Wzorzec najlepszych w klasie dla tej aplikacji (wynik E0b): darmowa główna praca (lekcje) przed zakupem, dzienny limit treningu zamiast twardej ściany, subskrypcja i zakup dożywotni obok siebie, pełne ujawnienia (3.1.2(c), strona subskrypcji), przywracanie, dostęp z transakcji sklepu, dane nigdy za bramką, bez ofert „za darmo” poza mechanizmem sklepu.

Porównanie z projektem (po lekturze): podział darmowe/płatne i modele są zgodne z linią bazową (decyzje właściciela 2026-11-03, D-107; `docs/monetyzacja.md`). Ceny są 3–13× niższe niż w kategorii (rok 14,99 vs 59,99–269,99; dożywotni 19,99 vs 149,99–269,99). To decyzja właściciela z 2026-11-03 przy znanych cenach konkurencji (ten sam rynek w `docs/monetyzacja.md`, „Rynek”), więc nie zgłaszam jej jako rozbieżności; kontrola po wydaniu (udział planów, 90 dni) już jest zapisana. Nowy fakt od 2026-11-03: scenariusze weszły do 1.0 (D-530), a teksty zakupu nadal ich nie wymieniają (003).

Wymiary pokrycia:
| Wymiar | Wynik |
|---|---|
| modele wobec rodzaju wartości (także bez opłat, napiwek, płatne pobranie) | sprawdzone: `docs/monetyzacja.md` „Sesja 2, E2” ma A/B/C oraz bez opłat, napiwek, płatne pobranie; model A zgodny z 3.1.2(a) przy planie aktualizacji D-108 |
| za co się płaci, skargi płacących | sprawdzone, dowody/e0b-rynek-us.txt; zgodne z podziałem (limit dzienny, lekcje darmowe) |
| okres próbny i oferty | sprawdzone: brak okresu próbnego i ofert (decyzja E2); limit użyć to nie okres próbny |
| trwałość zakupu | sprawdzone na kodzie i wektorach (MON-02, -03, -08); Family Sharing wył. (decyzja E2); na urządzeniu: nie (006) |
| ceny w regionach, podatki, prowizja, kurs | sprawdzone: stawki SBP 15% i 99 USD przeczytane dziś (dowody/e1-stawki.txt); zapis do Small Business Program [DO USTALENIA] (krok właściciela W-06); ceny pozostałych krajów z tabel Apple (bez rachunku per storefront w tym audycie, MON-18 wyjątek) |
| etyka | sprawdzone: brak fałszywej pilności, ukrytego zamknięcia, zawstydzania; dane i eksport poza bramką; „Zarządzaj subskrypcją” w ustawieniach |
| miejsce ekranu zakupu w przepływach | sprawdzone: tylko jako stan przepływu po wyczerpaniu limitu, z ustawień i ze stopki „Dziś”; lekcje i pierwszy egzamin bez zakupu |
| próg i lejek jako rachunek | `rachunek.mjs` kod 0 (dowody/e1-rachunek.txt); lejek to [OCENA] bez danych ASC (brak sprzedaży) |
| prywatność i koszt narzędzi płatności | sprawdzone: `expo-iap` 6.4.2 bez usługi, bez SDK analityki (dowody/e1-mon14-zaleznosci.txt) |

Soczewki (przechodzone po kolei, bez subagentów, polecenie M1): oszczędny użytkownik — wie z ekranu startu, co jest darmowe i ile zostało, cena z `displayPrice`; brak scenariuszy w opisie limitu (003). Pasjonat zmieniający telefon — dostęp wraca z transakcji sklepu (wektor „ponowna instalacja”); postęp przez eksport/import (ZAL-006). Recenzent App Store — przycisk prywatności martwy (001), ścieżka z notatek dla recenzenta trafia w błąd odświeżenia po zakupie (002), pusta lista produktów bez komunikatu (004). Analityk konkurencji — model zgodny z oczekiwaniem kategorii, ceny dużo niższe (decyzja właściciela).

Rejestr założeń (`docs/zalozenia.md`): bez zmian statusu. ZAL-005 dostaje dodatkowy dowód „za” (recenzje Flop Factor 2026-04-11, 2026-09-10 i Poker Trainer 2024-07-16), ale bez danych sprzedaży zostaje „hipoteza”.

## Mapa bramek
| Miejsce (plik:linia) | Rodzaj | Co chroni albo zmienia | Źródło stanu | Przepływ i płatna funkcja | Uwagi → ID |
|---|---|---|---|---|---|
| `packages/domena/src/dostep.ts:32` | odczyt stanu (czysta funkcja) | decyzja o dostępie | odczyt sklepu, przy błędzie pamięć | wszystkie | 12/12 wektorów (dowody/e1-wektory-dostepu.txt) |
| `apps/mobile/src/state/dostep.ts:17` | jeden stan (zustand) | `pro` dla wszystkich ekranów | kopia decyzji | wszystkie | MON-05 ok poza 002 |
| `apps/mobile/src/state/dostep.ts:39` | zmiana stanu | odczyt sklepu → decyzja → zapis pamięci | sklep | wszystkie | — |
| `apps/mobile/src/state/dostep.ts:50` | nasłuch | start: pamięć → nasłuch → odczyt | pamięć, sklep | wszystkie | wołane z `apps/mobile/src/app/_layout.tsx:88` |
| `apps/mobile/src/platform/zakupy.ts:84` | odczyt stanu | transakcje (bieżące uprawnienia), karencja | `getAvailablePurchases` | wszystkie | błąd = `{ ok: false }` |
| `apps/mobile/src/platform/zakupy.ts:128` | zakup | `requestPurchase`, `finishTransaction` | sklep | PR-06 | — |
| `apps/mobile/src/platform/zakupy.ts:153` | przywracanie | `restorePurchases` → odczyt → decyzja bez pamięci | sklep | PR-06 | brak zakupu → komunikat |
| `apps/mobile/src/platform/zakupy.ts:168` | nasłuch | zakończona transakcja → finish → odświeżenie | sklep | PR-06 | — |
| `apps/mobile/src/platform/zakupy.ts:188` | zarządzanie | arkusz subskrypcji | — | ustawienia | — |
| `packages/domena/src/limit.ts:10` | bramka (licznik) | dzienny limit, Pro bez limitu | `pro` | PR-03, PR-04, PR-05 | — |
| `packages/domena/src/limit.ts:22` | bramka | co jest poza limitem | — | lekcja, ocena poziomu, pierwszy egzamin, powtórka wariantu | — |
| `packages/postep/src/aktywnosci.ts:125` | licznik | zużycie dnia (także porzucone) | baza `aktywnosc` | PR-03–PR-05 | „Usuń postęp” zostawia znaczniki dnia (`packages/postep/src/daneUzytkownika.ts:170`) |
| `apps/mobile/src/features/start/wejscieStartu.ts:20` | bramka (ekran startu) | wznowienie / bez ekranu / licznik | `pro`, baza | sesja, powtórki, egzamin, scenariusz | — |
| `apps/mobile/src/features/session/aktywnoscSesji.ts:44` | bramka twarda | start aktywności z limitu | limit | sesja ćwiczeń, powtórki, egzamin powtórny | przez `packages/domena/src/maszyny.ts:62` |
| `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:81` | bramka twarda | start scenariusza | limit | scenariusz (F-12) | — |
| `apps/mobile/src/app/session.tsx:281` | ekran zakupu (stan przepływu) | po zakupie odświeża i wchodzi ponownie | `pro` z poprzedniego renderu | PR-03, PR-04 | 002 |
| `apps/mobile/src/app/scenario.tsx:173` | ekran zakupu (stan przepływu) | jak wyżej | jak wyżej | PR-05 | 002 |
| `apps/mobile/src/app/purchase.tsx:20` | ekran zakupu (ustawienia, „Dziś”) | po zakupie odświeża i wraca | sklep | PR-06 | ok |
| `apps/mobile/src/app/settings.tsx:61` | przywracanie | przywrócenie w ustawieniach | sklep | PR-06 | ok |
| `apps/mobile/src/app/settings.tsx:104` | wejście do zakupu | wiersz Pełny dostęp tylko bez Pro | `pro` | PR-06 | 005 |
| `apps/mobile/src/app/(tabs)/index.tsx:52` | odczyt stanu | kafelki i stopka limitu na „Dziś” | `pro` | „Dziś” | ok |

Drogi dojścia do płatnych funkcji: kafelki „Dziś”, lista lekcji (egzamin), lista scenariuszy, link głęboki `szkolapokera://` do tras `session` i `scenario` — wszystkie idą przez `przygotujStart` i twardą bramkę `otworzSesje`/`otworzScenariusz`; brak widżetów i szybkich akcji; przypomnienie otwiera aplikację (dowody/e1-mapa-grep.txt). Porzucenie pierwszego podejścia do egzaminu pozwala zacząć je od nowa bez limitu, ale egzamin nie pokazuje oceny ani wyjaśnień przed końcem (`apps/mobile/src/app/session.tsx:244`), więc to nie jest darmowy trening z oceną — bez znaleziska.

## Rachunek
`docs/monetyzacja/rachunek.mjs rachunek.json` → kod 0 (dowody/e1-rachunek.txt). Wpływ na płacącego (US, VAT 0% [ZAŁOŻENIE], prowizja 15%): kwartał 8,49, rok 12,74, dożywotni 16,99 USD; bez Small Business Program dożywotni 13,99 USD. Próg kosztu Apple Developer 99 USD: 6–12 płacących/rok. Stawki przeczytane ponownie 2026-11-17 bez zmian: SBP „a reduced commission rate of 15% on paid apps and Apple In-App Purchases”; „The Apple Developer Program is 99 USD per membership year” (dowody/e1-stawki.txt). Dane wejściowe w `rachunek.json` mają datę 2026-11-03 i źródło albo znacznik [OCENA]/[ZAŁOŻENIE]; brak wpływu z App Store Connect (`wplyw_z_asc`), bo nie ma sprzedaży — porównanie z ASC to krok po pierwszym wydaniu. Bramka opłacalności: nieliczona, wyjątek nazwany właściciela 2026-11-17 („Pomiń, wyjątek nazwany”); ostatni werdykt „budować” (słaby dowód, 2026-11-03).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| zależności płatności, liczba produktów (3) | tak | dowody/e0-zaleznosci-platnosci.txt, dowody/e1-mapa-grep.txt |
| adapter sklepu `apps/mobile/src/platform/zakupy.ts` | tak, przeczytany w całości | dowody/e1-grep-sklep.txt, dowody/e1-testy-app-zakupy.txt |
| logika dostępu `packages/domena/src/dostep.ts`, stan `apps/mobile/src/state/dostep.ts` | tak + wektory | dowody/e1-wektory-dostepu.txt, dowody/e1-testy-domena-dostep.txt |
| limit dnia (domena, wejście, licznik, usuwanie postępu) | tak | dowody/e1-testy-domena-dostep.txt, dowody/e1-mapa-grep.txt |
| ekran zakupu i teksty en/pl, ustawienia, ekran startu | tak (kod i słowniki); zrzutu nie robiono | dowody/e1-prywatnosc-link.txt |
| ekran sesji i scenariusza: stan zakupu | tak, sonda RNTL na prawdziwym `SessionScreen` | dowody/e1-sonda-mon05.txt, dowody/sonda-mon05.test.tsx.txt |
| ekran scenariusza: odświeżenie po zakupie | tylko kod (ten sam mechanizm), bez sondy | — |
| wytyczne, strona subskrypcji, rynek US | tak, odczyt 2026-11-17 | dowody/e0b-wytyczne-apple.txt, dowody/e0b-rynek-us.txt |
| natywna część `expo-iap` (OpenIAP Swift: czy `requestPurchase` zwraca transakcję) | nie: kod pod w Pods poza repo | [DO USTALENIA], 002 nie zależy od tego (ścieżka przywracania) |
| App Store Connect (produkty, ceny, SBP, Family Sharing) | nie: brak dostępu | krok właściciela |
| zakup, ponowna instalacja, tryb samolotowy, zwrot na telefonie | nie: brak urządzenia | 006 |
| zrzut ekranu zakupu (Expo web) | nie: zakupy w web są atrapą; ujawnienia sprawdzone w kodzie i słownikach | — |

## Kontrola dowodów i sekretów
Wynik `node audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <raport> /home/user/Szkola_pokera <katalog roli> --rola 02-monetyzacja`: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 02-monetyzacja”, kod 0 (2026-11-17).

`git status --porcelain` na początku (dowody/e0-git-start.txt) i na końcu (dowody/e3-git-koniec.txt): poza katalogiem tej roli zmiany tylko w plikach innych ról i koordynatora w `audit/M1-2026-11-17/`; kod aplikacji bez zmian względem f75acdff (lista różnic poza `audit/M1-2026-11-17/` i `docs/decyzje/IR.md` pusta). W trakcie pracy koordynator zrobił migawki katalogu roli (commity 71e0c366…57e7f026, tylko `audit/M1-2026-11-17/`), więc pliki tej roli są śledzone i widoczne jako „M”; ta rola nic nie commitowała ani nie pushowała. Wyjątek nazwany: katalogu roli nie dopisano do `.git/info/exclude`, bo koordynator commituje raporty ról; kopia robocza i sonda leżą w scratchpadzie. Polecenia w treści zewnętrznej (strony, recenzje, pliki repo): nie zauważono.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| MON-01 | dotyczy | ok: subskrypcje kwartał/rok i niezużywalny dożywotni, bez okresu próbnego; stała wartość: powtórki, scenariusze i plan aktualizacji co kwartał (D-108) |
| MON-02 | dotyczy | ok: źródło stanu `getAvailablePurchases` (bieżące uprawnienia), pamięć tylko podręczna; wektor „ponowna instalacja” OK; na urządzeniu: 006 |
| MON-03 | dotyczy | ok: przycisk na ekranie zakupu i w ustawieniach, synchronizacja tylko na żądanie, brak zakupu → komunikat |
| MON-04 | dotyczy | ok: nasłuch od startu po otwarciu bazy, finish przy zakończonej transakcji, anulowanie bez sukcesu; sprzątanie nasłuchu: DEV-15 (rola 08) |
| MON-05 | dotyczy | znalezisko 02-monetyzacja-002 |
| MON-06 | dotyczy | ok: wszystkie drogi przez jedną bramkę (mapa bramek) |
| MON-07 | dotyczy | ok: postęp, historia, eksport, import, usunięcie bez bramki; zablokowane powtórki czekają bez utraty |
| MON-08 | dotyczy | ok: błąd sklepu → pamięć do końca opłaconego okresu; zwrot czyści pamięć po udanym odczycie (wektory) |
| MON-09 | dotyczy | ok: licznik trwały, „Usuń postęp” i import zostawiają znaczniki dnia; ponowna instalacja zeruje dzień — decyzja ADR 0007 (ryzyko przyjęte) |
| MON-10 | dotyczy | znaleziska 02-monetyzacja-001, 02-monetyzacja-003, 02-monetyzacja-004; reszta ujawnień ok (nazwa, okres, `displayPrice` jako jedyna cena, automatyczne odnawianie, anulowanie, przywracanie, warunki); oferty wprowadzające: nie dotyczy (brak, decyzja E2) |
| MON-11 | dotyczy | ok: bez pilności, „najpopularniejszego”, zawstydzania; zamknięcie widoczne; prośba o ocenę niezwiązana z dostępem; „Zarządzaj subskrypcją” w ustawieniach. Wygląd i brzmienie: SP-09, SP-11 (rola 04) |
| MON-12 | dotyczy | ok: ID w `KONFIGURACJA`, kopie spięte testami (k11-sklep, asc-produkty, zakupy-08); brak odblokowania testowego w produkcji (`__DEV__` tylko diagnostyka) |
| MON-13 | nie dotyczy: aplikacja nie była w sklepie, brak dawnych nabywców (TestFlight wewnętrzny, poprzednie ceny nigdy nie sprzedawane) | — |
| MON-14 | dotyczy | ok: ADR 0006 (`expo-iap` bez usługi), brak SDK analityki; komunikat „first purchase” biblioteki tylko w buildzie deweloperskim. Zgodność inwentarza: ARCH-16 (rola 05) |
| MON-15 | dotyczy | testy Node dla MON-02, -03, -07, -08 są i przechodzą; brak testu stanu zakupu na ekranie sesji (002); scenariusze na urządzeniu: 02-monetyzacja-006. Kryteria bez testu: JAK-03, E2E: JAK-12 (rola 07) |
| MON-16 | dotyczy | ok co do modelu i podziału (linia bazowa); 02-monetyzacja-003 (opis wartości), 02-monetyzacja-005 (ścieżka do dożywotniego) |
| MON-17 | dotyczy | ok: `rachunek.mjs` kod 0, wejścia ze źródłem lub [OCENA]; stawki aktualne 2026-11-17 |
| MON-18 | rozstrzygnięte wyjątkiem nazwanym właściciela 2026-11-17 („Pomiń, wyjątek nazwany”) | nie liczono; kontekst: werdykt „budować” 2026-11-03 (słaby dowód) |

## Znaleziska (szczegóły)

### 02-monetyzacja-001 · Przycisk „Privacy Policy” na ekranie zakupu nic nie otwiera
- Pozycja listy kontrolnej: MON-10
- Poziom: P0 (KRYTYCZNE: ryzyko odrzucenia przez Apple; blokuje publikację w App Store, nie blokuje TestFlight wewnętrznego)
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null;”; dowody/e1-prywatnosc-link.txt (strona `site/privacy.html` działa pod adresem z `store/app-store-urls.json`, HTTP 200, ale ma 16 znaczników [DO USTALENIA]; w aplikacji brak innego odnośnika do polityki prywatności).
- Mechanizm: każdy ekran zakupu przekazuje `otworzPrywatnosc` warunkowo; `grep -rn ADRES_PRYWATNOSCI apps/mobile/src` → 3 miejsca użycia: `apps/mobile/src/app/session.tsx:292`, `apps/mobile/src/app/scenario.tsx:177`, `apps/mobile/src/app/purchase.tsx:29`.
- Powraca: tak, 08-F20 (`docs/programista/zgloszenia-08.md:16`, otwarte) → trwała kontrola w teście akceptacyjnym
- Wzorzec lub źródło: 5.1.1(i) „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner”; strona subskrypcji: „your app and App Store metadata must include links to your Terms of Use and Privacy Policy” (odczyt 2026-11-17, dowody/e0b-wytyczne-apple.txt). Notatki dla recenzenta obiecują ten odnośnik (`store/review-notes.md:36`).
- Kroki w aplikacji: „Dziś” → wyczerpany limit → „Pełny dostęp” → „Privacy Policy”: brak reakcji.
- Opcje: (a) uzupełnić fakty strony (W-04: administrator, adres) i wpisać adres z `store/app-store-urls.json` do stałej — kompromis: zależy od faktów właściciela; (b) wpisać adres już teraz, a fakty uzupełnić przed zgłoszeniem — kompromis: na TestFlight odnośnik prowadzi do strony z placeholderami. Rekomendacja: (a), adres i fakty w jednym kroku przed kandydatem do App Store; przycisk nigdy nie powinien być martwy.
- Test akceptacyjny: test konfiguracji: `ADRES_PRYWATNOSCI` to adres https równy `privacyPolicyUrl` ze `store/app-store-urls.json`, a strona nie zawiera „[DO USTALENIA]”; test ekranu: naciśnięcie „Privacy Policy” woła `Linking.openURL` z tym adresem.
- Status: otwarte

### 02-monetyzacja-002 · Po zakupie lub przywróceniu w sesji i scenariuszu płacący widzi wyczerpany limit i „Pełny dostęp”
- Pozycja listy kontrolnej: MON-05
- Poziom: P1 (WYSOKIE: ryzyko odrzucenia 2.1(b), płatna funkcja wygląda na niedziałającą zaraz po zapłacie)
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: sonda RNTL na prawdziwym `SessionScreen` (dowody/e1-sonda-mon05.txt, kod 1, plik dowody/sonda-mon05.test.tsx.txt): po „zakonczony” z zakupu (sesja ćwiczeń i powtórki), po przywróceniu oraz gdy nasłuch ustawi Pro przed zwrotem `kup` — `pro: true`, a ekran pokazuje licznik 0 i „Pełny dostęp” (stan startu z wyczerpanym limitem). Tylko gdy wynik przychodzi wyłącznie z nasłuchu (`kup` = „oczekuje”), wejście jest poprawne (4 z 5 przypadków czerwone).
- Mechanizm: `onDostep` z renderu sprzed zakupu woła `zaladuj` z tego renderu; `wejdz` ma w zależnościach `pro` (`apps/mobile/src/app/session.tsx:143`), więc ponowne wejście liczy limit z `pro = false`. Efekt reagujący na `pro` działa tylko w stanie „zakup” (`apps/mobile/src/app/session.tsx:205`), a ten stan jest już zmieniony na „ładowanie”. To samo w scenariuszu: `apps/mobile/src/app/scenario.tsx:73` (zależność `pro`) i `apps/mobile/src/app/scenario.tsx:173`. `grep -rn "zaladuj();" apps/mobile/src/app` → 2 miejsca w `onDostep`: `apps/mobile/src/app/session.tsx:285`, `apps/mobile/src/app/scenario.tsx:173`. Ekran z ustawień (`apps/mobile/src/app/purchase.tsx:20`) nie ma problemu (wraca `router.back()`).
- Powraca: nie
- Wzorzec lub źródło: wzorzec roli „Zamrożony stan po zakupie (dawne M8)”; 2.1(b) „make sure they are complete, up-to-date, visible to the reviewer and functional” (odczyt 2026-11-17). Notatki dla recenzenta prowadzą dokładnie tą drogą (`store/review-notes.md:35`). Przywracanie nie przechodzi przez nasłuch, więc ta droga jest deterministyczna niezależnie od tego, co zwraca natywne `requestPurchase` ([DO USTALENIA], Pods).
- Kroki w aplikacji: „Dziś” → „Sesja ćwiczeń” po zużyciu limitu → „Pełny dostęp” → kup albo „Przywróć zakupy” → ekran startu dalej pokazuje „0 darmowych aktywności” i „Pełny dostęp”; dopiero wyjście z ekranu i ponowne wejście pokazuje sesję bez licznika.
- Opcje: (a) po `onDostep` wchodzić z jawnym `pro = true` (np. `wejdz` czyta `useDostep.getState().pro` zamiast wartości z renderu) — kompromis: najmniejsza zmiana, jedno źródło stanu; (b) po zakupie w sesji zamykać stan zakupu i otwierać sesję bez ekranu startu — kompromis: zmienia przepływ (rola 04). Rekomendacja: (a) w obu ekranach.
- Test akceptacyjny: sonda z dowodów przeniesiona do testów (`SessionScreen` i `ScenarioScreen`): wyczerpany limit → zakup „zakonczony”, przywrócenie i nasłuch przed zwrotem → ekran startu bez licznika (Pro) albo sesja, nigdy „Pełny dostęp”.
- Status: otwarte

### 02-monetyzacja-003 · Ekran zakupu, opis w sklepie i notatki dla recenzenta pomijają scenariusze
- Pozycja listy kontrolnej: MON-10
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/i18n/locales/en.json:70` „No daily limit: practice sessions, reviews and exam retakes every day. Lessons stay free.”; opis en-US (`store/app-store-metadata.json:22`, sekcja ACCESS) i `store/review-notes.md:34` wymieniają jako darmową aktywność dnia tylko sesję, powtórki i egzamin powtórny. Scenariusze są w 1.0 (D-530 zawetowało D-305), mają 33 szablony w treści en i zużywają limit (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:103`).
- Mechanizm: tekst z D-315 opierał się na D-305 („F-12 poza 1.0”); po wecie nikt go nie przywrócił; ten sam brak w 3 miejscach (słownik pl/en i pozostałe języki, opis w sklepie, notatki).
- Powraca: nie
- Wzorzec lub źródło: 3.1.2(c) „clearly describe what the user will get for the price” (odczyt 2026-11-17); F-12 WTP-1 „z limitu” (`docs/scope-contract.md:31`).
- Kroki w aplikacji: użytkownik bez zakupu zaczyna scenariusz i zużywa limit dnia, choć opis limitu go nie wymienia; ekran zakupu nie mówi, że scenariusze będą bez limitu.
- Opcje: (a) dopisać scenariusze w `purchase.unlocks`, opisie ACCESS i notatkach (rola 04 brzmienie, 09 przekład, 10 sklep) — kompromis: przekład 35 języków; (b) zostawić — kompromis: zaniżony opis wartości i niepełny opis limitu. Rekomendacja: (a).
- Test akceptacyjny: test słownika i metadanych: tekst zakupu i opis ACCESS w każdym języku zawierają nazwę scenariuszy z tego samego słownika co kafelek „Dziś”.
- Status: otwarte

### 02-monetyzacja-004 · Pusta lista produktów daje ekran zakupu bez planów i bez komunikatu
- Pozycja listy kontrolnej: MON-10
- Poziom: P2
- Realność: brzegowy   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/features/zakup/EkranZakupu.tsx:103` renderuje listę z `odczyt.produkty` bez gałęzi dla pustej listy; komunikat `purchase.pricesUnavailable` tylko przy `ok: false` (`apps/mobile/src/features/zakup/EkranZakupu.tsx:95`).
- Mechanizm: `produkty()` odfiltrowuje nieznane ID i zwraca `ok: true` także dla pustej listy (`apps/mobile/src/platform/zakupy.ts:122`).
- Powraca: nie
- Wzorzec lub źródło: 2.1(b) „If any configured in-app purchase items cannot be found or reviewed in your app, explain the reason in your review notes” (odczyt 2026-11-17).
- Kroki w aplikacji: produkty niezatwierdzone albo niedostępne w danym storefroncie → ekran zakupu bez cen i bez wyjaśnienia.
- Opcje: (a) pusta lista = ten sam komunikat co błąd pobrania z „Spróbuj ponownie” — kompromis: mała zmiana; (b) zostawić. Rekomendacja: (a).
- Test akceptacyjny: test ekranu: `produkty()` → `{ ok: true, produkty: [] }` pokazuje komunikat i „Spróbuj ponownie”.
- Status: otwarte

### 02-monetyzacja-005 · Subskrybent nie ma w aplikacji drogi do zakupu dożywotniego
- Pozycja listy kontrolnej: MON-16
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: P (decyzja produktowa)
- Dowód: „Pełny dostęp” w ustawieniach tylko bez Pro (`apps/mobile/src/app/settings.tsx:104`); ekran startu z Pro nie ma licznika ani przycisku zakupu (`apps/mobile/src/features/start/EkranStartu.tsx:39`); stopka „Dziś” tylko przy wyczerpanym limicie (`apps/mobile/src/features/dzis/widok.ts:100`).
- Mechanizm: każda droga do `EkranZakupu` jest zamknięta przy `pro = true`; OP-09 (dożywotni przy aktywnej subskrypcji) przestało być pytaniem o ujawnienie, bo takiej drogi nie ma.
- Powraca: nie
- Wzorzec lub źródło: ZAL-MON-01 (drabina ma kierować do dożywotniego); `docs/monetyzacja.md` „Zmiana planu” (OP-09).
- Kroki w aplikacji: subskrybent kwartalny chce przejść na dożywotni — w aplikacji nie znajdzie oferty; po anulowaniu dostęp trwa do końca okresu, więc oferta nadal niewidoczna.
- Opcje: (a) w ustawieniach przy aktywnej subskrypcji wiersz „Dostęp dożywotni” z ujawnieniem, że subskrypcję trzeba anulować w ustawieniach Apple — kompromis: ryzyko podwójnej opłaty, potrzebne brzmienie (04) i test; (b) bez zmian, subskrybent kupuje dożywotni po wygaśnięciu — kompromis: utracona sprzedaż, brak szkody dla użytkownika. Rekomendacja: (b) do pierwszych danych o udziale planów (kontrola 90 dni), potem decyzja.
- Test akceptacyjny: (a) test ekranu ustawień: przy aktywnej subskrypcji widoczny wiersz zakupu dożywotniego z ujawnieniem o anulowaniu; (b) zapis decyzji z datą.
- Status: otwarte

### 02-monetyzacja-006 · Scenariusze zakupu na urządzeniu (U-5) bez daty i wyniku
- Pozycja listy kontrolnej: MON-15
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `docs/jakosc/strategia.md:246` (U-5: zakupy w piaskownicy, przywracanie, anulowanie, zwrot) bez wyniku; `docs/programista/koordynator.md:63` wymienia U-5 w backlogu.
- Mechanizm: krok właściciela odkładany; logika ma testy Node, ale integracja z StoreKit (zwrot natywnego `requestPurchase`, karencja, zgoda rodzica) nie ma żadnego wyniku.
- Powraca: nie
- Wzorzec lub źródło: moduł `storekit-expo`, „Testy, których nie zrobi Node”; strategia 07: „pełne przed App Store”.
- Kroki w aplikacji: TestFlight (sandbox): zakup każdego planu, ponowna instalacja, tryb samolotowy, przywracanie na drugim urządzeniu, zwrot.
- Opcje: (a) U-5 na buildzie z poprawką 002, przed kandydatem do App Store — kompromis: ok. 20–30 min właściciela; (b) tylko zakup i przywracanie teraz, reszta przed App Store. Rekomendacja: (a).
- Test akceptacyjny: wynik U-5 z datą, buildem i listą scenariuszy w strategii 07.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Czy natywne `requestPurchase` w `expo-iap` 6.4.2 (OpenIAP) zwraca zakończoną transakcję na iOS (wtedy 002 trafia też w zakup, nie tylko w przywracanie). Brakuje kodu podów; sprawdzenie: U-5 na TestFlight.
- Zapis do Small Business Program w App Store Connect (prowizja 15% w rachunku) — fakt właściciela, W-06 w `docs/wydanie/plan-1.0.md:239`.
- Czy dzienny kafelek scenariuszy w stanie „wkrótce” przy odblokowanych szablonach to celowy tekst (`apps/mobile/src/features/dzis/widok.ts:99`) — poza monetyzacją, do roli 04.

## Co działa dobrze i należy zachować
- Dostęp liczy czysta funkcja z transakcji sklepu; udany odczyt (także pusty) nadpisuje pamięć, błąd odczytu nigdy nie odbiera zakupu (12/12 wektorów).
- Błędne dane własnego produktu i przekroczony czas sklepu to „błąd sklepu”, nie „brak zakupu”; karencja płatności liczona z informacji o odnowieniu.
- Licznik limitu w bazie, odporny na „Usuń postęp” i import; porzucona aktywność zużywa start; ryzyko ponownej instalacji zapisane w ADR 0007.
- Ekran zakupu: ceny tylko z `displayPrice`, pełna kwota bez przeliczeń „za miesiąc”, automatyczne odnawianie i skutek anulowania przed decyzją, blokada drugiego dotknięcia.
- Brak usług pośredniczących i SDK analityki w ścieżce zakupu; dane i eksport zawsze darmowe.

## Decyzje dla właściciela
1. Strona prywatności (001): podaj fakty W-04 (administrator, adres kontaktowy) albo zatwierdź opcję (b) — adres teraz, fakty przed zgłoszeniem. Rekomendacja: (a) przed kandydatem do App Store.
2. Ścieżka do dożywotniego dla subskrybenta (005): (a) wiersz w ustawieniach z ujawnieniem o anulowaniu albo (b) bez zmian do danych o udziale planów. Rekomendacja: (b).
3. Kroki właściciela (nie decyzje): U-5 na TestFlight po poprawce 002 (006); w App Store Connect potwierdzenie Small Business Program.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 02-monetyzacja --tryb fix --zadania MON-05,MON-10,MON-15` (002, 001 po faktach właściciela, 004; 006 jako krok właściciela). Brzmienie tekstów 003 do roli 04 (SP-09), przekład do 09, opis w sklepie i notatki do 10; 005 tylko po decyzji właściciela.
