# Stan sesji BI (rola 08, build): menu W2, zębatka, Wskaźnik w Postępie
Aktualizacja: 2026-11-10 · gałąź `sesja-bi-menu` (start 0c24cb6) · polecenie `docs/koordynacja/polecenia/BI.md` @ d29fef1

## Zrobione (kroki 1–7 polecenia)
| Krok | Stan | Dowód |
|---|---|---|
| 1 pasek Dziś · Lekcje · Postęp, ekran Lekcje | gotowe | `(tabs)/_layout.tsx`, `(tabs)/lessons.tsx`; `menu-bi.test.tsx` („Lekcje”) |
| 2 „Dziś”: Kontynuuj, Powtórki (N), Sesja, Scenariusze | gotowe; Scenariusze → ekran „wkrótce” (`app/scenarios.tsx`, bez przycisków, D-581) | `menu-bi.test.tsx` („Dziś”, „Scenariusze”) |
| 3 Wskaźnik tylko na Postępie | gotowe | test „Postęp”; `index.tsx` bez `AdvancementCard` |
| 4 zębatka SVG D-540/D-546 | gotowe (24 pt, kreska 2, 44×44, etykieta) | test „zębatka”; `components/Ikona.tsx` |
| 5 teksty 12 języków | gotowe, do przeglądu roli 09 | `i18n:kod` błędy 0 |
| 6 E2E | flowy 01, 02, 08, 09 zmienione (ścieżka dotarcia, asercje zostały); NIE uruchomione (brak Maestro/Xcode); zrzuty Expo web 390/320 NIEWYKONANE: aplikacja nie ma wsparcia web (brak `react-native-web`, `expo-sqlite`/NativeTabs web) — nowe zależności poza zakresem; lista zrzutów dla właściciela niżej | `e2e/*.yaml` |
| 7 przegląd w świeżym kontekście | wykonany: 1×P1 (K-11), naprawione | `dowody/bi-przeglad-2026-11-10.md` |

CI: `pnpm run ci` kod 0 po poprawce: `dowody/bi-ci-po-k11.log` (apps/mobile 713 testów; baseline 0c24cb6: 703, kod 0, `bi-ci-baseline-0c24cb6.log`). Czerwony przebieg przed poprawką K-11: `bi-ci-czerwony-k11-ffe748a.log`.

## Testy czerwony → zielony
- `menu-bi.test.tsx` (nowy, 8 testów): przed kodem 7 z 8 czerwone na asercjach (brak `dzis-scenariusz`, lista lekcji na Dziś, stub Lekcje/Scenariusze), „Postęp” już zielony (zachowanie istniejące); po kodzie 8/8.
- `features/dzis/__tests__/kafle-bi.test.ts` (nowy, 2): przed 2 z 2 czerwone (stub zwracał 2 i ''), po 2/2.
- Zmienione istniejące: `widok-08`, `skalowanie-08`, `k11-sklep` (powody: D-583).

## Klucze do przeglądu roli 09 (przekład własny, 12 języków)
`tabs.lessons`; `today.reviewsTile`, `today.reviewsTileDue_*`, `today.reviewsTileNone`, `today.scenarios`, `today.scenariosSoon`; `lessons.title|moduleDone|moduleProgress|expand|collapse`; `scenarios.title|soon`. Martwe po zmianie (zostawione, bo pinuje je test 08-F24): `tabs.review`, `today.reviews`, `today.reviewsDue_*`, `today.allLessons`, `today.exercises`.

## Otwarte
- ŚREDNIE: stan „limit” na kafelkach i „Po pierwszej lekcji” (D-582); sprzątanie martwych kluczy po decyzji 09.
- Do sprawdzenia na urządzeniu: czy ekran startu powtórek ma „Zacznij” przy pustej kolejce (flow 02); NativeTabs ikona `capsule` (SF) dla Dziś; kafelki AX5 (1 kolumna od skali 1,3, łamanie wyrazów D-122); kontrast zębatki.
- Lista zrzutów do zrobienia: `dzis` 390 jasny/ciemny, 320 AX5, `lekcje` 390, `postep` 390 ciemny, `scenariusze` 390 — porównać z `docs/design/wzorce-zrzuty/menu/koncowy-*.png`.
- Rozbieżność z makietą (do 04): ikona Dziś w pasku to SF `capsule` (makieta: owal), `md="today"` na Androidzie.
