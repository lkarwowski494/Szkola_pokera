# Solver: rozpoznanie stanu (sesja FB, 2026-11-12)

Rola 08-programista, tryb build, zadanie 1 z `docs/koordynacja/polecenia/FB.md` (gałąź `koordynacja` @ fd9e0c57). Punkt wyjścia: `claude/sleepy-brahmagupta-2065nu` @ da1e02db. Odwołania `plik:linia` dotyczą tego commitu. Dokument 10 („Solver preflop: raport walidacji”, Dysk, zmieniony 2026-10-07, odczyt 2026-11-12) to nasz własny zapis pomiarów. Nie jest źródłem merytorycznym, tylko historią obliczeń.

## 1. Co solver liczy dziś

| Wynik | Plik | Drzewo i model | Algorytm, zbieżność |
|---|---|---|---|
| Preflop 6-max 100bb (kanon „v3c / C2”) | `content/ranges/preflop-6max-100bb.json` (meta) | `src/tree.ts:47-56`: otwarcie 2,5bb, SB 3bb, 3-bet ×3 w pozycji i ×4 bez pozycji, 4-bet ×2,3/×2,5, 5-bet = all-in, bez limpów (`src/tree.ts:2-8`), pule trzyosobowe tylko z dołączeniem BB | DCFR α 1,5, β 0, γ 2 (`src/solver.ts:19`), 1800 iteracji, eksploracja ε=0,1/√t do 1000. iteracji, NashConv 0,00926 bb (meta `nashConvBb`) |
| Preflop 9-max 100bb | `content/ranges/preflop-9max-100bb.json` | to samo drzewo dla 9 graczy, poddrzewo po pasach UTG–UTG+2 wzięte z 6-max (`src/tree.ts:39-44`, `src/merge9.ts`) | 3940 iteracji, NashConv 0,00939 bb (meta) |
| Push/fold heads-up 5/10/15bb i 10bb z big blind ante 1bb | `content/ranges/pushfold.json` | `src/pushfold.ts:1-8`: bez EQR i bez rake'u, po all-inie tylko equity | ten sam DCFR (`scripts/pushfold-ranges.ts:5`, `:26-30`) |
| Push/fold trzyosobowy 7,5bb | `content/ranges/pushfold.json` | `src/pushfold3.ts:8-13`: BTN, SB, BB, równe stacki, equity 3-way z `tools/equity/equity3.bin.gz` | jw. |

### Gra po flopie: co modeluje `src/postflop.ts`, a co `src/streets.ts`

- `src/postflop.ts:5-20`: wersja v3, **bez nowych kart**. Flop z próbki, ręce w koszykach (OCHS, k-średnie), kilka rund licytacji bez turnu i rivera, jeden rozmiar zakładu, showdown z dokładnym equity. Kanon tego wariantu nie używa.
- `src/streets.ts:6-18`: wersja v3b/v3c, **prawdziwa gra trzech ulic na abstrakcji**. 60 flopów, na każdym 2 turny i na każdym 2 rivery (`tools/equity/boards.c:182-187`), 24 koszyki na planszy, abstrakcja z niepełną pamięcią (na turnie gracz zna tylko koszyk z turnu). W kanonie przy SPR ≥ 8: flop 33% i 75% puli, turn 66%, river zakład geometryczny, przebicie ×3 (meta `postflop.highSprTree`). Przy SPR < 8: jeden zakład geometryczny na ulicę i przebicie all-in (`src/streets.ts:129`, `V3B_TREE`).
- W kanonie gra po flopie obejmuje **wszystkie pule heads-up z 1–3 podbiciami** (meta `minRaises 1`, `maxRaises 3`; wybór w `src/solver.ts:127-135`). Model EQR (`src/model.ts:147-168`: udział w puli z wagami grywalności, pozycją i rolą) zostaje tylko w pulach trzyosobowych (`src/solver.ts:154-160`) i tam, gdzie gra po flopie nie jest włączona.
- Odpowiedź na pytanie z polecenia: `src/postflop.ts` to uproszczona gra po flopie, nie model realizacji. Kanon liczy jednak przez `src/streets.ts`. To prawdziwy postflop rozwiązywany razem z preflopem, ale na grubej abstrakcji: 240 runoutów na 22 100 możliwych flopów, 24 koszyki, 1–2 rozmiary zakładu.
- Rake: 5% puli z limitem 3bb, pobierany tylko wtedy, gdy jest flop (`src/model.ts:47-49`, `:109`, `:182-184`). Model nie zakłada rake'u konkretnego pokoju ani stawki.

## 2. Jak solver jest walidowany

- Kryterium D-153 (`docs/tresci/e1b-solver.md:10-14`): szczebel 2 najwyżej 2 pp od przedziału opublikowanych rozwiązań; szczebel 1 to niezależny rachunek w tym samym modelu, z różnicą najwyżej 1,5 pp.
- Wynik (`docs/tresci/e1b-solver.md:5-6`, `:16-33`; `docs/tresci/walidacja-solvera.json`): **19 z 24 liczb zgodnych**. Wszystkie liczby push/fold oraz RFI 6-max i 3-bet SB vs BTN są zgodne, przy czym RFI HJ jest na granicy (1,9 pp).
- Niezgodne:
  - `solver.def.bb-vs-btn`: 49,61% wobec ok. 45% (BeyondGTO), 4,6 pp (`docs/tresci/walidacja-solvera.json`, wpis `solver.def.bb-vs-btn`);
  - `solver.def.bb-vs-sb`: 53,04% wobec ok. 56%, 3,0 pp (`docs/tresci/e1b-solver.md:25-26`).
- Bez celu: `solver9.rfi.*` (3 liczby). Brak opublikowanego rozwiązania 9-max cash 100bb szczebla 2 (`docs/tresci/e1b-solver.md:24`, `:51`).
- Skład zakresu nie jest walidowany, tylko łączna częstość (`docs/tresci/e1b-solver.md:13`). Klasy niezgodne ze źródłami są na listach `uncertain` w `content/ranges/spots.yaml`.
- Testy w repo (73 przypadki w `tools/preflop-solver/test/`) sprawdzają konstrukcję drzew, dane equity, zbieżność na małych grach i spójność plików. Zgodności z celami opublikowanymi nie sprawdzają: cele leżą poza gitem (`scripts/fetch-targets.ts`, `targets/`).
- Przed kanonem v3c przyjęto własne kryteria K1–K5 (dokument 10, „Przebudowa … v3c”). Cel obrony BB vs BTN wynosił w nich **50–60%**. D-153 porównuje z 45% (BeyondGTO). Kanon przeszedł więc w październiku przy celu, z którym dziś jest niezgodny. Odstępstwo od K1 dotyczyło wtedy tylko 3-betu BB vs SB (25,7% wobec 15–19%).

## 3. Podział sprawdzenie / 3-bet w spotach niezgodnych (kanon wobec BeyondGTO, odczyt 2026-11-12)

| Spot | Kanon: sprawdzenie / 3-bet / razem | BeyondGTO: sprawdzenie / 3-bet / razem |
|---|---|---|
| BB vs BTN 2,5bb | 35,3 / 14,3 / 49,6% | 32 / 13 / 45% („roughly 32% as a flat call and 13% as a 3-bet”) |
| BB vs SB 3bb | 27,3 / 25,7 / 53,0% | 39 / 17 / 56% (tytuł strony: „BB vs SB: 3-Bet 17%, Call 39%”) |

Źródła: https://beyondgto.com/defense/bb-vs-btn i https://beyondgto.com/defense/bb-vs-sb, pobrane `curl` (HTTP 200), cytaty znalezione na surowym tekście. Metoda BeyondGTO (https://beyondgto.com/methodology): „6-max cash at 100bb with an NL500 rake structure … against a single 2.5bb open (3bb when the small blind opens)”. Rozmiar 3-betu nie jest na stronach podany `[DO USTALENIA]`. Liczby kanonu pochodzą z `meta.summary.spots`.

## 4. Czas obliczeń (dokument 10; kontener z 4 rdzeniami)

| Wynik | Czas |
|---|---|
| Kanon 6-max v3c, 1800 iteracji, 4 wątki | ok. 7,5 h w trzech odcinkach z punktem kontrolnym (dokument 10, „Pomiary v3c”, C2) |
| 9-max, 3940 iteracji | ok. 19 h w kilku odcinkach po 2 h, 14–29 s na iterację (dokument 10, N9a i dalej) |
| Przesiew wariantu 250 iteracji (v3c) | ok. 64 min (dokument 10, C1) |
| Model EQR bez gry po flopie (v2), 1000 iteracji | ok. 13 min na 2 rdzeniach (`tools/preflop-solver/README.md`, krok 3) |
| Push/fold (wszystkie warianty) | ok. 1 min (README, sekcja M11) |
| Tablice equity: 169×169 / 169³ / plansze | 60–90 min / kilka godzin / pomiar w `docs/solver/dowody/` (README) |

Testy solvera w `pnpm run ci` mają limit 180 s na ciężki przypadek (`tools/preflop-solver/test/limity.ts:1-6`). Pełne rozwiązanie nie mieści się w CI: liczy się offline, a wynik commituje się jako plik.

## 5. Ograniczenia modelu (znane i mierzone)

1. Drzewo preflop: brak limpów, także w pojedynku blindów. Jeden rozmiar na każdy poziom podbicia. Sprawdzenie 3-betu tylko heads-up. Pule trzyosobowe tylko z dołączeniem BB (`src/tree.ts:2-8`).
2. Abstrakcja gry po flopie: 60 flopów × 2 × 2 runouty, 24 koszyki, niepełna pamięć, 1–2 rozmiary zakładu na ulicę (`src/streets.ts:6-18`, meta). W dokumencie 10 („Pomiary v3c”) zapisana jest hipoteza, że abstrakcja zaniża realizację gracza z pozycją w SRP SB–BB („Prawdopodobnie granica abstrakcji”). Nie była zmierzona; sprawdza ją zadanie 2.
3. Pule trzyosobowe liczone modelem EQR, z parametrami dopasowanymi do opublikowanych raportów realizacji: k 1,25, m 0,1, rola 0,07, sprFull 1 (meta `eqr`; `scripts/fit-eqr.ts:12-24`).
4. Rake 5% z limitem 3bb nie odpowiada strukturze NL500, z której pochodzą cele BeyondGTO. Wpływu nie zmierzono.
5. Znane niezgodności składu (dokument 10, decyzja A2): BTN vs CO prawie nie sprawdza (0,0% wobec 9%), BB vs SB 3-betuje 25,7% wobec 17%, BB vs BTN 3-betuje część środka zakresu. W aplikacji te spoty są oceniane tylko jako „gram / pas”.
6. 9-max: zbieżność osiągnięta, ale skład UTG–UTG+2 bez walidacji szczebla 2. W aplikacji 9-max jest ukryty.
7. Węzły rzadko odwiedzane zamarzają bez eksploracji (dokument 10, C1). Kanon liczono z eksploracją do iteracji 1000. NashConv tego błędu nie wykrywa.

## 6. Stan narzędzi

- Środowisko (2026-11-12): Linux 6.18, Node 22.23.4, 4 rdzenie, gcc z OpenMP. `pnpm install --frozen-lockfile`: kod 0.
- Skrypty diagnostyczne: `tools/preflop-solver/README.md`, sekcja „Skrypty diagnostyczne”. Sesja FB dodaje `scripts/fb-srp-realization.ts`: realizację w SRP przy stałych zakresach kanonu i dowolnej tablicy plansz.
