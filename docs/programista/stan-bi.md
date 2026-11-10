# Stan sesji BI (rola 08, build): menu W2, zębatka, Wskaźnik w Postępie
Aktualizacja: 2026-11-10 · gałąź `sesja-bi-menu` (start 0c24cb6) · polecenie `docs/koordynacja/polecenia/BI.md` @ d29fef1

## Zrobione (kroki 1–7 polecenia)
| Krok | Stan | Dowód |
|---|---|---|
| 1 pasek Dziś · Lekcje · Postęp, ekran Lekcje | gotowe | `(tabs)/_layout.tsx`, `(tabs)/lessons.tsx`; `menu-bi.test.tsx` („Lekcje”) |
| 2 „Dziś”: Kontynuuj, Powtórki (N), Sesja, Scenariusze + stany limit/nowy | gotowe; Scenariusze → ekran „wkrótce” (`app/scenarios.tsx`, bez przycisków, D-581) | `menu-bi.test.tsx` („Dziś”, „Scenariusze”) |
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
- Stany „limit” i „Po pierwszej lekcji” wdrożone po poleceniu koordynatora (D-582, testy `kafle-bi.test.ts` i `menu-bi.test.tsx`, czerwone przed kodem 5 z 9 i 3 z 3, zielone po). Sprzątanie martwych kluczy po decyzji 09.
- Klucze dodatkowe do przeglądu 09: `today.limitTile`, `today.limitReached`, `today.afterFirstLesson`, `today.afterFirstLessonM2`.
- Do sprawdzenia na urządzeniu: czy ekran startu powtórek ma „Zacznij” przy pustej kolejce (flow 02); NativeTabs ikona `capsule` (SF) dla Dziś; kafelki AX5 (1 kolumna od skali 1,3, łamanie wyrazów D-122); kontrast zębatki.
- Lista zrzutów do zrobienia: `dzis` 390 jasny/ciemny, 320 AX5, `lekcje` 390, `postep` 390 ciemny, `scenariusze` 390 — porównać z `docs/design/wzorce-zrzuty/menu/koncowy-*.png`.
- Rozbieżność z makietą (do 04): ikona Dziś w pasku to SF `capsule` (makieta: owal), `md="today"` na Androidzie.

## Poprawki po recenzji BL (4ad6dc2; polecenie koordynatora 2026-11-10 16:29)
- 001 WYS: flowy 02, 03, 04 → `id: dzis-lekcja`; test BL `tests/narzedzia/e2e-flowy.test.mjs` (cherry-pick c6697d7): czerwony 1 fail, zielony 10 pass.
- 003 ŚR: `BlokKursUkonczony` (test `menu-bi.test.tsx`, czerwony → zielony). Nowy klucz `today.courseDoneTitle` (12 języków, do przeglądu 09).
- 004 ŚR: `AdvancementCard` pionowo od skali 1,3 (test `menu-bi.test.tsx`, dwa przypadki: 1,0 i 3,1; czerwony 3,1 → zielony).
- 002 ŚR — ZNALEZISKO DLA ROLI 04 (bez zmian w kodzie): kafelek Powtórki przy pustej kolejce („Po pierwszej lekcji”/„Brak na dziś”) prowadzi przez ekran startu (licznik; przy wyczerpanym limicie „Pełny dostęp”) do pustej kolejki. Projekt nie opisuje tego stuknięcia. Opcje do decyzji 04: (a) sesja powtórek przy 0 kart pomija ekran startu i pokazuje od razu pusty stan z następnym terminem; (b) kafelek w tych stanach nieaktywny (`accessibilityState.disabled`). Rekomendacja recenzji: (a). Flow 02 zakłada dziś ścieżkę przez „Zacznij”.
- Do backlogu (NIS, bez zmian): 005 (tekst modułu z `max(2, moduł startu)`, przy kroku F), 006 (etykiety czytnika przez klucze z parametrami), 007 (kafelki bez linii stanu przed odczytem/po błędzie), 008 (asercja kolejności karty na Postępie), 009 (przegląd 09: 18 kluczy), 010 (martwe klucze i18n).
