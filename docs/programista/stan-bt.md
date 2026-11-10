# Stan sesji BT (08-programista, build, krok F: ekran scenariusza)
Aktualizacja: 2026-11-10 · Gałąź: `sesja-bt-ekran` · Start: 60465c0 · Koordynator: session_01T66VBxUvdwEFgDrhyD7ZbX · Polecenie: `docs/koordynacja/polecenia/BT.md` @ 4862fb8 (gałąź `koordynacja`)

## Zrobione (commity)
| Commit | Zakres |
|---|---|
| 47eacea | KO-043 (ŚR-101): `startAktywnosci`, `wejscieDoAktywnosci` przekazują `wariant` do `mozeStartowac`; test `packages/domena/test/ko043-start-wariantu-bt.test.ts` |
| ad80a49 | `PlanAktywnosci.wariant`, `parsujPlan`, `wynikiScenariuszy`; test `packages/postep/test/scenariusz-wynik-bt.test.ts` (ścieżki wrażliwe) |
| fefb7c4 | `features/scenariusz/{poziom,wariant}.ts` (poziom automatyczny, graf, ocena, widok bb, wyjaśnienia) |
| 2a2d4fc | `aktywnoscScenariusza.ts` (start, wznowienie, odpowiedzi, powtórka, nowe rozdanie) |
| 8eb85cf | `getScenarioTemplates` (tabela `scenarios`), `dostep.ts`, ustawienie `scenariusz_poziom` |
| d151863 | ekran `app/scenario.tsx`, lista `app/scenarios.tsx`, komponenty, klucze `scenario.*` w 12 słownikach |
| e51e700 | terminy `play.*`, ogłoszenia przez `useAnnounce`, decyzje D-645…D-651, flow 07 |

## Decyzje (do weta): D-645…D-651 w `docs/decyzje.md`.

## Otwarte / do innych ról
- **Zapis szablonów do bazy treści (tabela `scenarios`)**: robi sesja BU (KO-050); adapter w `data/content/repo.ts` po otrzymaniu schematu. Do tego czasu ekran działa na porcie i fixture, w aplikacji lista scenariuszy jest pusta („wkrótce”).
- Kafelek „Dziś”: stan „Wkrótce” (`today.scenariosSoon`) do zmiany na stan gotowości, gdy treść ma szablony (krok G, BR-MENU-001).
- `purchase.unlocks` (tekst bez „scenariuszy”) — krok K (rola 10), niezmienione.
- Powtórki ze scenariuszy (SRS): brak w kroku F; projekt 04 wspomina „Do powtórek trafia sytuacja z turnu” — wymaga decyzji produktowej (rodziny powtórek dla szablonów).
- Pokazanie kart: zdanie „układ wyższy / równy” bez nazw układów i liczb (RD-10); rozszerzenie wymaga tekstów 06/04.
- Przeglądarkowe zrzuty ekranów: brak symulatora iOS i wsparcia web (expo-sqlite); lista zrzutów dla właściciela w PRZEKAZANIU (flow 07 robi `07-przed-decyzja`, `07-ocena`).
- Tłumaczenia kluczy `scenario.*` w 11 językach: pierwszy przekład 08, do przeglądu roli 09 (krok I).
