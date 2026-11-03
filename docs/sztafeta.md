# Stan sztafety
Ścieżka: greenfield (przebudowa istniejącej aplikacji „prawie od nowa”) · Aktualizacja: 2026-11-03

Decyzja właściciela (2026-11-03, jego słowa): „Przejść dla aplikacji Szkoła Pokera przez role 1–5 w trybie build z prompts i zrobić ją prawie od nowa, ale wykorzystując elementy aktualnej aplikacji, które są dobre. Cel: monetyzacja. […] Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening. Całkiem od nowa UX, przepływy, ocena monetyzacji, BRD.” Kolejność (wybór właściciela): bramka opłacalności (02, krok 0) → 01 → 02 → 03 → 04 → 05.

| Rola | Tryb | Stan | Commit | Artefakty | Otwarte decyzje |
|---|---|---|---|---|---|
| 02 Monetyzacja (bramka, krok 0) | build `--moduly oplacalnosc` | E0 zakończone (2026-11-03), następny E1 | 95663cc | ten plik | — |

## E0 bramki: ustalenia (2026-11-03)
- Środowisko: chmura Linux, Node v22.23.4, pnpm 10.28.0, Playwright 1.63.0, push na gałąź roboczą przez git. Bez Maca/Xcode.
- Sieć: `developer.apple.com` działa; **zablokowane przez politykę sieci sesji: `itunes.apple.com`, `apps.apple.com`, `api.nbp.pl`** (403 na CONNECT, 2026-11-03 16:24 UTC). Bez nich nie ma dowodów rynku (E1) ani kursu NBP.
- CI na `main` (23950a4): workflow CI zielony (9.10.2026). E2E (Maestro) padał w każdym przebiegu nocnym 13–20.10.2026 (przebiegi 11–18), wyłączony ręcznie 20.10.2026. Znalezisko dla roli 07 przy przebudowie; nie blokuje bramki.
- Rejestr decyzji (Drive, „03 Rejestr decyzji (ADR) — Szkoła Pokera”): ADR-11 model zarabiania „Do decyzji” (A freemium + subskrypcja, B jednorazowy, C darmowa; ceny konkurentów z 2.10.2026 do ponownego odczytu); ADR-12 kategoria wiekowa „Do decyzji” (rekomendacja 18+); ADR-13 zero poker roomów i afiliacji (art. 29 u.g.h.) „Do decyzji”; ADR-14 „Polski na start” zatwierdzona 2.10.2026 — **sprzeczna z nowym celem „35 języków”** (do zapisania jako zmiana decyzji właściciela); ADR-18 RevenueCat vs expo-iap „Do decyzji”.
- Reguły sklepu, App Review Guidelines „Last Updated: October 16, 2026” (odczyt 2026-11-03): 3.1.1 (IAP, „XX-day Trial”, restore), 3.1.2(a) („ongoing value”, ≥ 7 dni, okres próbny przez App Store Connect), 3.2.2(x), 4.2, 4.3(b), 5.6; **5.3.4**: „Apps that offer real money gaming (such as … poker …) … must be free on the App Store. Illegal gambling aids, including card counters, are not permitted” — aplikacja nauki bez gry na pieniądze i bez pomocy w czasie gry. Kategorie wiekowe (developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions, odczyt 2026-11-03): „Simulated Gambling: Betting or wagering without using real money…”; „Frequent simulated gambling” → 18+, „Infrequent simulated gambling” → niższa kategoria. Skutek dla zasięgu idzie do bramki jako założenie.
- Brak sekcji „Stan projektu” w CLAUDE.md, brak `docs/monetyzacja.md` i BRD.

## Decyzje właściciela z E0 (2026-11-03, odpowiedzi w sesji /apps4brew)
- Sieć: „Pełny dostęp do sieci” (zmiana ustawień środowiska; działa w nowej sesji). Odrzucone: lista domen, ręczne wklejanie danych.
- Próg opłacalności: „500 USD/rok” netto, globalnie (domyślny D-024). Odrzucone: 1000, 2500 USD.
- Platformy w bramce: „iOS i Android” (Google Play 25 USD jednorazowo, zamknięty test 12 osób × 14 dni — koszt portfela). Odrzucone: tylko iOS.
- Dokumenty: „Repo + skrót na Dysku” — `docs/monetyzacja.md` i `docs/monetyzacja/*.mjs|json` (tylko dane publiczne), wpis z odnośnikiem w rejestrze 03 na Dysku. Odrzucone: wszystko na Dysku.
- Standard marki: „Wysoki” — bez reklam i SDK śledzących; wariant reklamowy liczony tylko do porównania.
- Umowa Paid Apps w App Store Connect: „Tak, podpisana”.
- Polityka języków: szeroka, 35 języków jak Trening (słowa właściciela z 2026-11-03) — zastępuje ADR-14 „Polski na start” (do wpisania w rejestrze 03 jako zmiana decyzji właściciela).
- Do zrobienia w E1/E1b: wpis tych decyzji w rejestrze 03 na Dysku (zasada wspólna 6).

## Następny krok
02-monetyzacja build `--moduly oplacalnosc`, E1 (dowody rynku) po decyzjach właściciela z E0; prompt: `node <prompts>/tools/assemble.mjs 02-monetyzacja --tryb build --moduly oplacalnosc`.
