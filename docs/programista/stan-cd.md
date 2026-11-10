# Stan sesji CD (08-programista, build): scalenie BT + BS + BU + BY
Data: 2026-11-10 · start 70fdf40 · gałąź `claude/sleepy-brahmagupta-2065nu`

## Scalenia (`--no-ff`, kolejność BT, BS, BU, BY; SHA zgodne z poleceniem)
| Gałąź | SHA | Konflikty |
|---|---|---|
| sesja-bt-ekran | 713314b | brak |
| sesja-bs-szablony | 866744e | brak |
| sesja-bu-format | 6a5ca17 | 3 testy + pliki generowane (niżej) |
| sesja-by-powtorki | b5325bb | brak |

## Rozwiązanie konfliktów (sesja-bu-format)
- `tools/content-build/test/build.test.ts`, `liczby-jezyk-08.test.ts`: oba wpisy to ten sam limit 120_000 ms, różny komentarz; zostawiona wersja BS (D-555).
- `szablon-scenariusza-bf.test.ts` (2 hunki): BS kasuje `content/*/scenarios` we wszystkich językach i tworzy katalog tylko, gdy test ma pliki; BU kasował tylko pl i en. Zostawiona wersja BS (nadzbiór). Test „bez katalogu scenarios…” z BS używa tej samej fikstury. Fikstury BU (`test/fixtures/scenariusze`, `range-spot`) nietknięte.
- `apps/mobile/assets/content/tresc-*.db` (105 wpisów AU/UA/DD) i `tresc.generated.ts`: nie scalane ręcznie; stare bazy usunięte, `pnpm content:build` wygenerował 35 baz (hash d8a27dfd52).
- `docs/decyzje.md`: bez konfliktu.

## Konflikty semantyczne (bez konfliktu tekstowego), wykryte przez CI
1. `apps/mobile/src/features/scenariusz/wariant.ts` `naGenerator` (BT) zakładał tylko draw-call; BU rozszerzył `ScenarioDecision` o unię z range-spot i `villain: 'all-in'`. Mapowanie po `kind` (D-721). `bv-gotowa-reka` (WYS-201) zielony.
2. `apps/mobile/src/__tests__/menu-bi.test.tsx`: test „wkrótce” zakładał treść bez szablonów; po BS+BU+BT lista jest z bazy treści. Przepisany bez osłabiania (D-722).
3. `build.test.ts` „jest deterministyczna”: 31,4 s przy limicie 30 s (dwie kompilacje po ok. 16 s); limit 120 s (D-720).

## Do zgłoszenia
- Ekran BT wywołuje `generateVariant` bez kontekstu spotów (`aktywnoscScenariusza.ts:57`), więc szablon z punktem range-spot nie zadziała w aplikacji; w `content/pl/scenarios` takich szablonów jeszcze nie ma. [DO USTALENIA: kolejna sesja 08].
- Brak testu pustej listy scenariuszy (rola 07).

## Dowód
`docs/programista/dowody/cd-ci-<sha>.txt` (`pnpm run ci`, kod 0).
