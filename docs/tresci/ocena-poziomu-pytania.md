# Ocena poziomu F-01: pytania z puli egzaminów (rola 06 → 03, 04, 08)

Stan 2026-11-04 (E3, 21. sesja). Ramy: najwyżej 8 pytań, „Pomiń” na każdym ekranie, wynik to wskazana pierwsza lekcja (D-105, `docs/scope-contract.md` F-01). Rola 06 wybiera pytania. Mechanika (próg, kolejność ekranów, zapis wyniku) należy do ról 03, 04 i 08.

Kryteria wyboru:
- pytanie z egzaminu modułu, więc ma już werdykt niezależnej weryfikacji E3;
- dokładnie jedna poprawna odpowiedź (bez rąk mieszanych i bez dwóch dobrych zagrań);
- sprawdza próg wejścia do modułu, czyli pojęcie, bez którego następne lekcje nie mają sensu;
- moduły 0–6 i 8 idą po kolei w ścieżce. M7 (turn) opiera się na M5–M6, a M9–M13 na wcześniejszych, więc wejście do nich wyznacza wynik M8.

| Lp. | Moduł | Pytanie (`id`) | Reguły | Co sprawdza |
|---|---|---|---|---|
| 1 | M0 Układy | `m0.exam.q1` | R-M0-001 | ranking układów (strit bije trójkę) |
| 2 | M1 Przebieg rozdania | `m1.exam.q2` | R-M1-001 | dozwolone ruchy po zakładzie rywala |
| 3 | M2 Szanse i cena | `m2.exam.q5` | R-M2-003 | cena sprawdzenia (pot odds) przy zakładzie pół puli |
| 4 | M3 Otwarcia | `m3.exam.q2` | R-M3-002 | otwarcie przebiciem zamiast wyrównania |
| 5 | M4 Gra wobec otwarcia | `m4.exam.q1` | R-M4-002, R-M4-003 | rozmiar 3-betu bez pozycji |
| 6 | M5 C-bet | `m5.exam.q2` | R-M5-004 | tekstura flopa a c-bet |
| 7 | M6 Obrona | `m6.exam.q5` | R-M6-005 | cena sprawdzenia dla dwóch rozmiarów zakładu |
| 8 | M8 River | `m8.exam.q1` | R-M8-001 | value bet tylko, gdy sprawdzi gorsza ręka |

Propozycja reguły wyniku (decyzja produktowa ról 03, 04 i 08, nie rola 06): start w pierwszym module, w którym odpowiedź jest błędna albo pominięta. Przy 8 poprawnych odpowiedziach start w M7. Żadne pytanie nie zmienia oceny zagrań ani postępu; wynik tylko wskazuje lekcję startową, a lekcje wcześniejsze zostają dostępne.

Uwaga dla 08: pytania 1, 4, 5, 6 i 7 mają w egzaminie pole `table` (karty albo stół). Ocena poziomu pokazuje je tak samo jak egzamin, bo wyjaśnienia odpowiedzi odwołują się do tych kart.
