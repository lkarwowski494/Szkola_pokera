# Kontrola (a) de: wynik

Krok 1 wykonany przed otwarciem polskiego źródła. Przekłady zwrotne dosłowne (skrócone tam, gdzie wiersz ma wiele elementów).

| nr | plik:linia | przekład zwrotny (krok 1) | polskie źródło (krótko) | werdykt | uwaga |
|---|---|---|---|---|---|
| 1 | exams/m12.yaml:36 | Nein: Das {{n:var.conf95}}-Intervall beträgt ± etwa {{n:exam.m12.style.ci}}; neue Spielzüge bewertest du in der Handanalyse. Fehler der Winrate nach {{n:exam.m12.style.blocks}} Blöcken = {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, Intervall ± {{n:var.z95}} × se ≈ ± {{n:exam.m12.style.ci}}. Taki wynik pasuje zarówno do lepszego, jak i gorszego stylu. O strategii decyduje analiza decyzji. | - { text: "Nie: przedział {{n:var.conf95}} to ± ok. {{n:exam.m12.style.ci}}; nowe zagrania oceniasz w przeglądzie rozdań", correct: true, why: "Błąd w | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 2 | exams/m12.yaml:54 | Tilt z nienawiści do przegrywania: wyzwalaczem jest sama strata, nawet gdy wiesz, że to wariancja. Nie obwiniasz ani losu, ani siebie, ani przeciwnika. | - { text: "Tilt z nienawiści do przegrywania", correct: true, why: "Wyzwalaczem jest sama przegrana, nawet gdy wiesz, że to . Nie winisz losu, siebie  | ZGODNE | "Schicksal" = "los" (STARE "Glück" było mniej dokładne). |
| 3 | exams/m12.yaml:55 | Tilt z niesprawiedliwości: wyzwala go poczucie, że poker jest niesprawiedliwy: bad beaty, coolery, trafienia przeciwnika na riverze. Tu wiesz, że wszystko szło normalnie, i złości cię sama strata. | - { text: "Tilt z niesprawiedliwości", why: "Ten typ wyzwala poczucie, że poker jest niesprawiedliwy: bad beaty, coolery, trafienia rywala na riverze. | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 4 | exams/m12.yaml:56 | Tilt z błędów: to złość na własne błędy. Tu wiesz, że zagrałeś dobrze. | - { text: "Tilt z błędu", why: "Tilt z błędu to złość na własne pomyłki. Tu wiesz, że zagrałeś dobrze." } | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 5 | exams/m12.yaml:57 | Tilt z zemsty: zemsta kieruje się przeciw przeciwnikowi, np. po lekceważącym zachowaniu. Tu przeciwnik zagrał poprawnie i nie jest powodem twojej złości. | - { text: "Tilt z zemsty", why: "Zemsta jest skierowana na rywala, np. po braku szacunku. Tu rywal zagrał poprawnie i nie on jest powodem złości." } | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 6 | lessons/m12-l2-decyzja-wynik.md:68 | Tak, wynik pokazuje, co działa: wynik z kilku sesji to głównie szum. Przy odchyleniu std. ok. {{n:var.sd}} nawet {{n:var.hands.k}} tys. rąk zostawia błąd ok. ± {{n:var.ci.wr}}. | - { text: "Tak, wynik pokazuje, co działa", why: "Wynik z kilku sesji to głównie szum. Przy odchyleniu ok. {{n:var.sd}} nawet {{n:var.hands.k}} tys. r | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 7 | lessons/m12-l3-tilt.md:88 | Tylko w szlifowaniu najlepszej gry (A-Game): A-Game jest ważne, ale C-Game kosztuje najwięcej. Bez poprawy najgorszych dni postęp na szczycie łatwo znów się traci z tyłu. | - { text: "Tylko w szlifowaniu najlepszej gry (A-game)", why: "A-game jest ważna, ale to C-game kosztuje najwięcej. Bez poprawy najgorszych dni postęp | ZGODNE | Liczby, granice, kierunek i warunki zgodne. |
| 8 | lessons/m12-l4-bankroll.md:102 | Po stracie wracasz do gry, by odzyskać straty: gonienie za stratami jest jednym ze znaków problemu hazardowego, wymienianych w kryteriach diagnostycznych. Jeśli rozpoznajesz u siebie takie znaki, skorzystaj z kontaktów w wskazówce "Odpowiedzialna gra". | - { text: "Po przegranej wracasz do gry, żeby odegrać straty", correct: true, why: "Odgrywanie strat to jeden z sygnałów problemu z hazardem wymienian | ZGODNE | Odesłanie do kontaktów zachowane; brak "am Ende dieser Lektion" (PL też nie ma). |

## Podsumowanie

Liczba miejsc: 8. ZGODNE 8, NISKIE 0, ŚR 0, WYS 0, KRYT 0.

Porównanie liczb: wszystkie klucze {{n:}} w NOWE = w źródle? tak (sprawdzone skryptem na wielozbiorach kluczy dla każdego miejsca; 0 rozbieżności). Literały liczbowe w R-M12-003 ((1,96 × 80 ÷ 2)², 615 tys.) zgodne.
Znaczniki {{t:..}}: bez zmian struktury poza celową normalizacją form. Poprawki względem STARE nie pogorszyły sensu.
