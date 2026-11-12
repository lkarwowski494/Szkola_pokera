# Plan B: solver postflop z pełnym flopem (decyzja właściciela 2026-11-12, KO-088)

- Zakres: P3 (flop + turn + river na jednym stole, bez grupowania rąk) z walidacją W2 na 105 stołach BeyondGTO; podstawa w `docs/solver/plan-postflop.md`.
- KO-084 nadal obowiązuje: do treści aplikacji trafiają tylko wyniki po walidacji.
- Pliki wolno zmieniać tylko w `tools/preflop-solver/**` i `docs/solver/**` (polecenie FB). Nowy kod idzie do `tools/preflop-solver/src/flop/`, kod C do `tools/preflop-solver/native/`.
- Szacunki są oznaczone [OCENA]: to czas agenta i CPU kontenera z 4 rdzeniami, a koszt wynosi 0 zł (bez płatnych zasobów i bez GitHub Actions poza zwykłym CI).

## Etapy

| # | Etap | Gotowe, gdy (dowód) | Czas agenta [OCENA] | CPU [OCENA] |
|---|---|---|---|---|
| B0 | **Cel W2 jako dane.** Skrypt `scripts/fetch-beyondgto-spots.ts`: pobiera `sitemap-spots.xml` i 105 stron, z atrybutów `title` odczytuje częstość każdej klasy (np. „AKs · bet 5.4bb 40% · c-bet 40%”), a z treści strony rozmiar i łączną częstość. Wynik trafia do `targets/` poza gitem, jak `fetch-targets.ts`. W repo zostaje tylko skrypt i suma kontrolna. Do tego odczyt siatek preflop BeyondGTO (zakresy wejściowe) | 105 plików, w każdym 169 klas z sumą akcji 100 ± 1%; zapis daty odczytu; 3 strony sprawdzone ręcznie na surowym HTML (cytaty w `docs/solver/w2-cel.md`) | 0,5 sesji | minuty |
| B1 | **Kryteria W2 zapisane przed pomiarem** (wzór D-153): łączna częstość c-betu najwyżej 5 pp od strony; zgodność „bet / czekanie” w klasach, ważona kombinacjami, co najmniej 85%; zakresy wejściowe z BeyondGTO. Decyzja D-133x | wpis w `docs/decyzje/FB.md` i w `docs/solver/w2-cel.md` przed jakimkolwiek wynikiem | razem z B0 | — |
| B2 | **Rdzeń: river** (P1) w TS. Ewaluator 7 kart (pomiar `evaluateHand` z poker-core, w razie potrzeby tablica rang), showdown z usuwaniem kart, DCFR wektorowo po 1326 kombinacjach | testy W1 najpierw czerwone, potem zielone: (a) zakres spolaryzowany kontra łapacz blefów, gdzie udział blefów = B ÷ (P + 2B), a MDF = P ÷ (P + B), z tolerancją 0,5 pp; (b) NashConv poniżej 0,1% puli; (c) zgodność z niezależnym skryptem na grze zabawkowej; `pnpm run ci` kod 0 | 1 sesja | sekundy |
| B3 | **Turn + river** (P2) w TS: 44–46 riverów, 1–2 rozmiary na ulicę | testy: wynik turnu z jednym riverem równy wynikowi B2; NashConv poniżej progu; czas jednego stołu zmierzony i zapisany | 0,5–1 sesja | minuty na stół |
| B4 | **Flop w C z OpenMP** (P3), drzewo jak na stronach BeyondGTO: rozmiar flopu ze strony, na turnie i riverze 1–2 rozmiary `[DO USTALENIA: drzewo BeyondGTO niepodane]`. Wejście i wyjście w JSON, ten sam format co B2/B3 | testy różnicowe: stół z jednym turnem i jednym riverem równy wynikowi TS z B3; pomiar czasu 1 stołu; NashConv poniżej 0,5% puli | 1–1,5 sesji | 10–60 min na stół |
| B5 | **Przesiew W2 na 7 stołach** (po 1 z każdej pary pozycji): `btn-vs-bb-srp`, `co-vs-bb-srp`, `hj-vs-bb-srp`, `utg-vs-bb-srp`, `bb-vs-btn-3bet`, `bb-vs-co-3bet`, `sb-vs-btn-3bet`. Najpierw SRP BTN vs BB, bo jest najbliżej spotów SC-07, SC-13 i SC-14 | raport `docs/solver/w2-przesiew.md` z wynikiem wobec kryteriów B1. **STOP do koordynatora**, jeśli mniej niż 5 z 7 stołów przechodzi: przyczyna, opcje, bez dopasowywania drzewa pod wynik | 0,5 sesji | 2–7 h |
| B6 | **Pełne W2 na 105 stołach** (po przejściu przesiewu); obliczenia w odcinkach po 2 h z punktem kontrolnym, jak przy 9-max | `docs/solver/w2-wynik.md`: liczba stołów zgodnych, lista niezgodnych; wynik dla każdego stołu poza repo, w repo podsumowanie | 0,5 sesji | 20–60 h [OCENA]; przy limicie 6 h na odcinek kilka dni zegarowych. **Do decyzji przy B5:** pełne 105 albo próbka stratyfikowana 35 stołów (5 tekstur × 7 par) |
| B7 | **Stoły dla szablonów** SC-13, SC-14 i SC-20: tylko w klasie stołów, które przeszły W2. Uproszczenie nazwane i zapisane. Dane dla treści przekazuje koordynator innej sesji (`content/` jest poza FB) | lista stołów z wynikiem i odwołaniem do walidacji; PRZEKAZANIE | 0,5 sesji | 1–3 h |

Razem [OCENA]: 4,5–5,5 sesji agenta i 25–70 h CPU, z czego najwięcej zajmuje B6. Każde przejście między etapami wymaga `pnpm run ci` z kodem 0 i dowodu w `docs/solver/dowody/`.

## Kolejność walidacji W2

1. W1: rachunek w CI (B2).
2. Testy różnicowe TS i C (B3, B4).
3. Przesiew na 7 stołach (B5), od SRP BTN vs BB.
4. Pełne W2 albo próbka (B6, decyzja przy B5).
5. Dopiero potem stoły dla treści (B7).

## Ryzyka

- Drzewo turnu i rivera BeyondGTO nie jest znane, więc zgodność ma swoją granicę. Tolerancje ustala B1, przed pomiarem.
- Treść strony może się zmienić. Dlatego B0 zapisuje datę odczytu i sumy kontrolne.
- Szybkość ewaluatora w TS wychodzi z pomiaru w B2.
- Lista zmian w BeyondGTO („updated Jul 28, 2026”) obejmuje 105 stołów; ich kompletność sprawdza B0.
