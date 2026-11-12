# W2: cel walidacji solvera postflop (etapy B0 i B1, sesja FB2, 2026-11-12)

Plan: `docs/solver/plan-b-etapy.md`. Ten plik zawiera opis danych celu (B0) i kryteria W2 (B1). Kryteria zapisano **przed pierwszym wynikiem solvera** (wzór D-153). Do commitu z tym plikiem solver postflop nie istniał.

## B0: dane

- Skrypt: `tools/preflop-solver/scripts/fetch-beyondgto-spots.ts`. Pobiera `https://beyondgto.com/sitemap-spots.xml` (105 adresów stołów plus strona zbiorcza), 105 stron stołów i 10 siatek preflop tego samego drzewa:
  - otwarcia: `ranges/{lj,hj,co,btn,sb}-open-6max-100bb`;
  - obrona: `defense/bb-vs-{lj,hj,co,btn}`, `defense/sb-vs-btn`.
- Wynik leży poza gitem, w `tools/preflop-solver/targets/beyondgto-spots/`, tak jak w `fetch-targets.ts`:
  - `spots/<stół>.json`: 105 plików;
  - `spots.json`, `preflop.json`;
  - `raw/*.html`: surowe strony.
- W repo są tylko skrypt i sumy kontrolne: `docs/solver/w2-cel-sumy.txt` (sha256 częstości klas, 115 pozycji).
- Odczyt: 2026-11-12T12:39:10Z (pole `fetched`). Wszystkie strony mają w stopce „updated Jul 28, 2026”, a `lastmod` w mapie strony to 2026-07-28 07:43–07:48 UTC.
- Odczyt częstości: każda komórka siatki ma pasek `linear-gradient` z dokładnością do 0,1 pp oraz podpis `data-tip` zaokrąglony do 1 pp. Skrypt bierze wartości z paska i odrzuca stronę, gdy różnica wobec podpisu przekracza 1 pp. Kolory pochodzą z legendy stron:
  - stoły: `#2dd4a8` mały zakład, `#f59e0b` większy, `#16233b` czekanie;
  - obrona: teal all-in, amber 3-bet, niebieski sprawdzenie (legenda bb-vs-hj: „teal is a jam, amber a 3-bet, blue a flat call, and the dark fill is fold”).
- Kryterium „gotowe” B0:
  - 105 plików, w każdym 169 klas, w każdej klasie suma akcji 100 ± 1%. Wynik kontroli: 105 plików, 0 klas poza tolerancją;
  - stołów jest 105, czyli 7 par pozycji × 15 flopów. Lista jest kompletna: skrypt przerywa pracę, jeśli mapa strony ma inną liczbę adresów.

### Metoda źródła (https://beyondgto.com/methodology, odczyt 2026-11-12, `curl`)

- „All c-bet pages come from one 6-max cash tree at 100bb. In single-raised pots the opener raises to 2.5bb, the big blind calls and checks the flop, and the page shows the opener's decision. In 3-bet pots the 3-bettor is out of position and acts first.”
- „Per-hand figures are the solver's mix for that hand class, normalised so each hand's row sums to 100%.”
- „Range-level percentages are weighted by combinations and by how often each hand reaches the decision”.

### Trzy strony sprawdzone ręcznie na surowym HTML (`grep` w `raw/`)

| Stół | Cytat z surowego HTML |
|---|---|
| `btn-vs-bb-srp-k72-rainbow` | `data-tip="AKs · bet 1.4bb 100% · c-bet 100%"` i pasek `#2dd4a8 0% 99.6%, #f59e0b 99.6% 100%`; „98% C-bet 2% Check 1.4bb Main size”; „the button c-bets 98% of its range against the big blind: 93% at the small 1.4bb size and 5% at 4.4bb” |
| `bb-vs-btn-3bet-543-rainbow` | `data-tip="AKs · bet 5.4bb 40% · c-bet 40%"`; `data-tip="QQ · bet 5.4bb 15% · larger bet 8% · c-bet 23%"`; „28% C-bet 72% Check 5.4bb Main size” |
| `sb-vs-btn-3bet-k72-rainbow` | `data-tip="AKs · bet 5.6bb 96% · larger bet 4% · c-bet 100%"`; „99% C-bet 1% Check 5.6bb Main size”; „the small blind, as the 3-bettor, c-bets 99% of its range against the button: 81% at the small 5.6bb …” |

Wartości w `spots/*.json` dla tych trzech stołów zgadzają się z cytatami (AKs na K72 BTN: małe 0,996 i większe 0,004).

### Rozmiary zakładów na flopie (ze stron)

| Para | Mały | Większy | Uwagi |
|---|---|---|---|
| SRP (BTN, CO, HJ, UTG vs BB) | 1,4bb | 4,4bb | pula 5,5bb, czyli ok. 25% i 80% puli |
| BB vs BTN / CO, 3BP | 5,4bb | 14bb | większy rozmiar podany tylko w części stron |
| SB vs BTN, 3BP | 5,6bb | 14,4bb | jw. |

Rozmiar 3-betu, drzewo turnu i rivera oraz parametry rake'u NL500 nie są podane `[DO USTALENIA]`.

### Znalezisko B0: zakresy wejściowe nie odtwarzają łącznej częstości ze stron

Kontrola zakresów polegała na odtworzeniu łącznej częstości c-betu na stronie. Liczyłem ją z siatek klas, z wagą: częstość akcji preflop z siatki BeyondGTO × liczba kombinacji po usunięciu kart stołu.

- Zgodność w ±2 pp: tylko 39 ze 105 stołów. Średnie |Δ| wynosi 3,65 pp, maksimum 15,5 pp (`sb-vs-btn-3bet-543-rainbow`: 11,5% wobec 27%).
- Inne wagi też nie dają zgodności:
  - tylko klasy z częstością > 50%: średnio 3,73 pp;
  - wszystkie klasy z częstością > 0: średnio 4,22 pp.
- Liczba „hands it brings to this flop” na stronach odpowiada dokładnie liczbie klas z częstością preflop > 50% (np. BTN 89, HJ 50, UTG 40 z siatki LJ, BB 3-bet vs BTN 30). Wniosek: UTG na stronach stołów to LJ z siatek otwarć 6-max.
- Wniosek: zakresy w drzewie flopu BeyondGTO nie są opublikowane i różnią się od siatek preflop. Dlatego kryterium K1 nie porównuje z liczbą wydrukowaną na stronie (D-1332).

Średnie |Δ| w parach: BTN 4,1; CO 2,4; HJ 2,6; UTG 3,1; BB vs BTN 3BP 4,8; BB vs CO 3BP 4,4; SB vs BTN 3BP 4,2 pp.

## B1: kryteria W2 (D-1332, zapisane przed pomiarem)

Wagi `w(klasa)` to częstość akcji preflop gracza na flopie z siatki BeyondGTO × liczba kombinacji klasy po usunięciu kart stołu:

- SRP: otwarcie z `ranges/*-open`;
- 3BP: 3-bet z `defense/*`.

Ta sama waga obowiązuje po obu stronach porównania. `b(klasa)` to częstość zakładu (mały + większy) w klasie.

- **K1, łączna częstość c-betu:** |Σ w·b_nasz − Σ w·b_strona| ÷ Σ w ≤ 5 pp. Obie sumy liczę z siatek klas z tą samą wagą, a nie z liczby wydrukowanej na stronie. Liczba ze strony pochodzi z nieopublikowanych zakresów drzewa (znalezisko B0), a jej różnica wobec siatki sięga 15,5 pp.
- **K2, zgodność bet / czekanie w klasach:** 1 − Σ w·|b_nasz − b_strona| ÷ Σ w ≥ 85%. To pokrycie częstości zakładu ważone kombinacjami. Klasa mieszana nie jest rozstrzygana progiem 50%.
- **Stół przechodzi W2**, gdy spełnia K1 i K2. Podział na mały i większy rozmiar nie jest kryterium, bo drzewo dalszych ulic jest inne. Raportuję go informacyjnie.
- **Przesiew B5:** co najmniej 5 z 7 stołów musi przejść. Inaczej STOP do koordynatora (plan B5), bez zmian drzewa pod wynik.
- **Pełne W2 (B6):** wynik to liczba stołów zgodnych. Klasa stołów (para × tekstura) „przeszła”, gdy przeszły wszystkie jej stoły objęte pomiarem. Próg dla treści (B7) ustala ta reguła.
- **Zbieżność:** NashConv rozwiązania stołu poniżej 0,5% puli (plan B4). Stół z wyższym NashConv nie wchodzi do porównania i liczy się jako niezgodny.

Model gry: D-1333 (drzewo, pule, rake) i D-1334 (zakresy sprawdzających 3-bet). Oba wpisy są w `docs/decyzje/FB.md`.
