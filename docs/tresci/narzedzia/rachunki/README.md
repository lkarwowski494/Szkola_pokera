# Rachunki rejestru (szczebel 1)

Skrypty odtwarzają wielkości z pola `cytat` źródeł „rachunek” w `docs/tresci/rejestr/` (pole `miejsce` wskazuje skrypt i funkcję). Każdy wynik jest wypisywany z identyfikatorem wpisu; kod wyjścia 1 oznacza rozbieżność z cytatem ponad tolerancję (lista na końcu wyjścia). Dane wejściowe: `content/numbers.yaml` (formuły liczone od nowa, bez poker-core) i definicje pokera. Python: biblioteka standardowa, `yaml`; `rachunek_m12.py` dodatkowo `numpy`.

| Skrypt | Rejestr | Co liczy |
|---|---|---|
| `rachunek_m0_m4.py` | `m0-m4.json` | EV czekania i sprawdzenia, outy i szanse koloru, błąd reguły 2 i 4, potrzebne equity, obrona BB, udziały Pailiku 38/82/354 i alpha 3-betu, SPR po 4-becie, equity suited/offsuit (Monte Carlo) |
| `rachunek_m5_m8.py` | `m5-m8.json` | sety na 7-6-5 (zakresy z `content/ranges/preflop-6max-100bb.json`), flop bez pary, alpha i MDF, udział blefów, check-raise, draw na turnie i implied odds, próg value betu, blokery |
| `rachunek_m12.py` | `m12-m13.json` | przedział 95% winrate, wymagana próbka, RoR ze wzoru, downswing i ruina (Monte Carlo), AA vs KK (Monte Carlo), equity a przegrana, niezmienniczość kolorów |
| `karty.py`, `wspolne.py` | — | ewaluator 7 kart i Monte Carlo equity; wczytywanie liczb, raport, tolerancje (ładowane przez importlib) |

Polecenia (z korzenia repo; opcjonalny argument: ścieżka korzenia):

```
python3 -I docs/tresci/narzedzia/rachunki/rachunek_m0_m4.py   # ok. 15 s
python3 -I docs/tresci/narzedzia/rachunki/rachunek_m5_m8.py   # < 1 s
python3 -I docs/tresci/narzedzia/rachunki/rachunek_m12.py     # ok. 30 s
```

## Tolerancje

- Rachunek dokładny: połowa ostatniej cyfry cytatu (np. 19,15% → ±0,005 pp); liczby całkowite i równości ułamków dokładnie.
- Symulacje: 3·√(p(1−p)/n_cytatu + p(1−p)/n_nasze)·100 pp + zaokrąglenie cytatu.
  - equity suited/offsuit: n_cytatu 20 000, nasze 100 000 rozdań na rękę (ziarno 20261104, to samo dla każdej ręki), ok. ±1,1–1,2 pp;
  - AA vs KK: n_cytatu 60 000, nasze 200 000 (ziarno 20261104), ok. ±0,54 pp (remisy ±0,10 pp);
  - downswing: 20 000 przebiegów po obu stronach, ziarno 424242, bloki 100 rąk (i 10 rąk) z rozkładu normalnego, ±0,35–1,5 pp;
  - ruina: 10 000 przebiegów po 3 mln rąk w blokach 100 rąk (ziarno 20261104); liczba przebiegów cytatu nie jest podana, przyjęto równą naszej, ±1,1–2,1 pp. Sprawdzane też, że wynik nie przekracza wzoru e^(−2·wr·BR/SD²) ponad tę tolerancję.
