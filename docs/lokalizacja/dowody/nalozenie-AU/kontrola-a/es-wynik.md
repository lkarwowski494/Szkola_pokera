# Kontrola (a), es. Uwaga proceduralna: przed krokiem 1 dla es miałem już otwarte niektóre pliki pl (m12-l2/l3/l4 przy sprawdzaniu it); przekłady zwrotne napisane jednak wyłącznie z pakietu es.

| nr | plik:linia | przekład zwrotny (krok 1) | polskie źródło (krótko) | werdykt | uwaga |
|---|---|---|---|---|---|
| 1 | m12-l2:68 | Tak, wynik pokazuje, co działa; wynik kilku sesji to głównie szum; przy odchyleniu standardowym ok. {var.sd} nawet {var.hands.k} tys. rąk zostawia błąd ok. ± {var.ci.wr} | to samo ({t:standard-deviation|odchyleniu}) | ZGODNE | tylko zmiana terminu desviación típica→estándar |
| 2 | m12-l2:77 | Po ok. {skill.hands} rękach każdy dobry gracz jest na plusie (błędne); badanie porównuje skrajne grupy; zależy od winrate i odchylenia (lekcja o wariancji) | jak w es | ZGODNE | |
| 3 | m12-l3:33 | Tilt z desperacji; potrzeba odzyskania strat prowadzi do bardzo długich sesji, wymuszania akcji i skoków do wyższych stawek; sygnał, by przestać grać | „skoków w górę stawek”, „sygnał, żeby skończyć grę” | ZGODNE | doprecyzowanie „wyższych”, kierunek zgodny z PL |
| 4 | m12-l3:100 | Tilt... w ankiecie {tilt.severe} graczy przyznało się do silnego tiltu co najmniej raz w ostatnich sześciu miesiącach | jak w es | ZGODNE | dodano „el” |
| 5 | m12-l4:58 | Zostajesz na stawce; {br.ex.after-dd} wpisowych to wciąż więcej niż najpóźniejszy próg zejścia {br.bi.move-down}; w symulacji trafia ok. {dd.p.small.100k} graczy wygrywających {var.wr.ex} w {var.hands.k} tys. rąk; przegląd sprawdza, czy to nie błędy | jak w es | ZGODNE | „más tardío” = najpóźniejszy: granica zachowana |
| 6 | m12-l4:77 | Chroni go przed ruiną; wzór działa tylko przy dodatnim winrate; przegrywający traci bankroll z pewnością, tylko wolniej przy większym | „przed bankructwem” | ZGODNE | ruina/bankructwo: ten sam sens, spójne z terminem risk-of-ruin |
| 7 | m12-l4:85 | Ok. {study.beginner} nauki; na początku masz najwięcej do nauczenia się, więc nauka przeważa | „najwięcej do nadrobienia” | NISKIE | „queda por aprender” zamiast „recuperar/nadrobić”; kierunek i liczba bez zmian |
| 8 | m12-l4:95 | Tylko gra, skoro wygrywasz; nawet gdy wygrywasz, nie poświęcasz na naukę mniej niż {study.min} czasu | „nie schodzisz poniżej {study.min}” | ZGODNE | „menos del” = nie poniżej: granica zachowana |
| 9 | m12-l4:113 | Bankroll to cała rezerwa przeznaczona wyłącznie na grę w pokera; liczysz w wpisowych; jedno to pełny stack {format.stack} na stawce | jak w es | ZGODNE | pisownia póquer→póker |
| 10 | m12-l4:141 | Na początku ok. {study.beginner} czasu na naukę, reszta na grę; gdy wygrywasz, ideał ok. {study.winner}, ale nigdy mniej niż {study.min} | jak w es | ZGODNE | dodano „el” |
| 11 | rules.yaml R-M12-007 | jeśli po serii strat nie potrafisz spokojnie oceniać decyzji (np. myślisz tylko o odzyskaniu strat albo grasz ręce, które zwykle pasujesz), to kończysz sesję; bo gra w tym stanie to najgorszy poziom (C-game), celem jest przerwać na czas, zanim stracisz zdolność jasnego myślenia | jak w es | ZGODNE | „recuperar lo perdido” wierniejsze niż „recuperarte”; warunek i zalecenie (kończysz sesję) bez zmian |

## Podsumowanie
- Miejsc: 11. ZGODNE 10, NISKIE 1 (nr 7), ŚR 0, WYS 0, KRYT 0.
- Porównanie liczb: wszystkie klucze {{n:}} w NOWE = w źródle (zbiór i krotność)? tak (skrypt, 11/11).
- Brak zmian granic, kierunku, warunków ani danych kontaktowych.
