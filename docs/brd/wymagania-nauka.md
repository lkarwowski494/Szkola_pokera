# Wymagania: nauka (ocena poziomu, kurs, ćwiczenia, powtórki, scenariusze)
Stan: E3 (2026-11-03) · Rola 01 build · Przepływy i NFR: `wymagania.md` · Reguły i wektory: `reguly.md`

Kryteria w Gherkinie po polsku. Liczby pochodzą z wektorów RD albo z decyzji; czego nie ma w źródle ani w decyzji, ma znacznik i wpis OP. Zakres pierwszej wersji wybiera rola 03.

## Ocena poziomu (ONB)

### BR-ONB-001: Krótka ocena poziomu do pominięcia
- Przepływ: PR-01
- Dowód potrzeby: J-05; W-02, W-03 pkt 3; brak pomijania to skarga u konkurenta (recenzja S-49); River ma test poziomujący [FAKT S-44]
- Zależy od: ZAL-002
- Liczba pytań i najdłuższy czas oceny: najwyżej 8 pytań, ok. 2 minuty [OCENA], „Pomiń” na każdym ekranie, bez ekranu zakupu na końcu (D-105; OP-20 rozstrzygnięte)
- Kryteria akceptacji:
  - Scenariusz: Użytkownik przechodzi ocenę
    - Zakładając, że aplikacja jest uruchomiona pierwszy raz
    - Gdy użytkownik odpowie na wszystkie pytania o poziom i cel
    - Wtedy widzi swój punkt startu na ścieżce i przycisk rozpoczęcia nauki
  - Scenariusz: Użytkownik pomija ocenę
    - Zakładając, że aplikacja jest uruchomiona pierwszy raz
    - Gdy użytkownik wybierze „Pomiń”
    - Wtedy punktem startu jest pierwsza lekcja modułu M0
  - Scenariusz: Przerwana ocena
    - Zakładając, że użytkownik odpowiedział na część pytań
    - Gdy zamknie aplikację i otworzy ją ponownie
    - Wtedy widzi ocenę od początku albo opcję „Pomiń”, a postęp nauki jest pusty

### BR-ONB-002: Wynik oceny wyznacza punkt startu
- Przepływ: PR-01
- Dowód potrzeby: J-05; „it actually figures out your style” (recenzja S-01)
- Zależy od: ZAL-002
- Kryteria akceptacji:
  - Scenariusz: Osoba bez znajomości zasad
    - Zakładając, że użytkownik zaznaczył, że nie zna zasad pokera
    - Gdy zakończy ocenę
    - Wtedy punktem startu jest moduł M0, a moduły wcześniejsze nie są oznaczone jako zaliczone
  - Scenariusz: Gracz znający podstawy
    - Zakładając, że użytkownik poprawnie odpowiedział na pytania z modułów M0–M2
    - Gdy zakończy ocenę
    - Wtedy moduły M0–M2 są oznaczone jako zaliczone oceną, a punktem startu jest moduł M3
    - Oraz każdy zaliczony moduł można otworzyć i przerobić

### BR-ONB-003: Ponowna ocena i korekta ścieżki
- Przepływ: PR-01
- Dowód potrzeby: W-03 pkt 3 („korygowana po ćwiczeniach”)
- Kryteria akceptacji:
  - Scenariusz: Ponowna ocena z ustawień
    - Zakładając, że użytkownik ma postęp w modułach
    - Gdy uruchomi ocenę ponownie i ją zakończy
    - Wtedy punkt startu się zmienia, a zapisany postęp lekcji i powtórek zostaje
  - Scenariusz: Niezaliczony test modułu zaliczonego oceną
    - Zakładając, że moduł M2 zaliczono oceną poziomu
    - Gdy użytkownik nie zaliczy testu modułu M2
    - Wtedy widzi lekcje modułu M2 do powtórki z listą pytań, w których się pomylił

### BR-ONB-004: Pierwszy ekran mówi, czym aplikacja jest
- Przepływ: PR-01
- Dowód potrzeby: OP-11 (cel: jakość decyzji, bez obietnicy wygranej); OG-01, OG-12; ZP-01
- Kryteria akceptacji:
  - Scenariusz: Pierwsze uruchomienie
    - Zakładając, że aplikacja jest uruchomiona pierwszy raz
    - Gdy pojawi się ekran powitalny
    - Wtedy tekst mówi, że aplikacja uczy podejmowania decyzji w pokerze bez gry na pieniądze
    - Oraz tekst nie obiecuje wygranej i nie wskazuje gry online (NFR-ZGOD-002)

## Kurs (KURS)

### BR-KURS-001: Lekcje w kolejności, każda z ćwiczeniem
- Przepływ: PR-02
- Dowód potrzeby: J-02; „needs more explanation for a new player” (recenzja S-03); OG-10 (aplikacja więcej niż książka)
- Kryteria akceptacji:
  - Scenariusz: Ukończenie lekcji
    - Zakładając, że użytkownik jest w ostatniej części lekcji
    - Gdy przejdzie dalej
    - Wtedy dostaje ćwiczenia sprawdzające z tej lekcji, a po nich lekcja jest oznaczona jako ukończona
  - Scenariusz: Następna lekcja
    - Zakładając, że lekcja jest ukończona
    - Gdy użytkownik wróci na ścieżkę
    - Wtedy następna lekcja w kolejności modułów M0–M13 jest wskazana jako kolejna

### BR-KURS-002: Test modułu pozwala pominąć znane treści
- Przepływ: PR-02
- Dowód potrzeby: „I can’t skip to where my level is” (recenzja S-49); J-05
- Kryteria akceptacji:
  - Scenariusz: Zaliczony test
    - Zakładając, że użytkownik nie przerobił lekcji modułu M3
    - Gdy zaliczy test modułu M3
    - Wtedy moduł M3 jest oznaczony jako zaliczony testem, a ścieżka wskazuje moduł M4
  - Scenariusz: Niezaliczony test
    - Zakładając, że użytkownik rozwiązuje test modułu M3
    - Gdy go nie zaliczy
    - Wtedy widzi, które lekcje odpowiadają pytaniom z błędem, a moduł nie jest zaliczony
- Próg zaliczenia testu: [DO WYJAŚNIENIA] (OP-22)

### BR-KURS-003: Termin zdefiniowany przed pierwszym użyciem
- Przepływ: PR-02
- Dowód potrzeby: J-02; spójność pojęć (`CLAUDE.md`: jedno pojęcie, jedna nazwa, definicja przed pierwszym użyciem); ER-05
- Kryteria akceptacji:
  - Scenariusz: Termin w lekcji
    - Zakładając, że lekcja używa terminu „pot odds”
    - Gdy użytkownik dotknie terminu
    - Wtedy widzi definicję z tej samej tabeli terminologii, co słownik
  - Scenariusz: Kontrola kolejności definicji
    - Zakładając, że treść wszystkich lekcji jest zbudowana
    - Gdy kontrola treści sprawdzi pierwsze użycie każdego terminu
    - Wtedy żaden termin nie pojawia się przed lekcją, która go definiuje
- Forma zapisu terminu w językach innych niż en („termin lokalny (en)”): zależy od ER-05 (rola 03)

### BR-KURS-004: Powrót do miejsca w lekcji
- Przepływ: PR-02
- Dowód potrzeby: kontekst PR-02 i PR-03 (przerwania); utrata postępu to motyw recenzji (recenzja S-51)
- Kryteria akceptacji:
  - Scenariusz: Przerwana lekcja
    - Zakładając, że użytkownik jest w trzeciej części lekcji
    - Gdy zamknie aplikację i otworzy ją ponownie
    - Wtedy wraca do trzeciej części tej lekcji

### BR-KURS-005: Uproszczenia nazwane w treści
- Przepływ: PR-02
- Dowód potrzeby: `CLAUDE.md` (uproszczenie dydaktyczne nazwane uproszczeniem); RD-02, RD-05, RD-09 (pola „Uproszczenie”)
- Kryteria akceptacji:
  - Scenariusz: Reguła 2 i 4
    - Zakładając, że lekcja uczy reguły 2 i 4 dla 9 outów i dwóch kart do odkrycia
    - Gdy użytkownik zobaczy wynik przybliżony 36% (RD-05-W1)
    - Wtedy obok widzi wynik dokładny 34,97% (RD-04-W1) i słowo „przybliżenie”
  - Scenariusz: Duża liczba outów
    - Zakładając, że przykład ma 15 outów i dwie karty do odkrycia
    - Gdy lekcja pokaże przybliżenie 60% (RD-05-W3)
    - Wtedy tekst mówi, że przybliżenie zawyża wynik wobec dokładnego 54,12% (RD-05)

## Ćwiczenia i ocena (CWI)

### BR-CWI-001: Ocena zagrania w czterech stopniach
- Przepływ: PR-03
- Dowód potrzeby: skarga na „blunder” za drugie najlepsze zagranie (recenzja S-04); P-3; ER-01; RYZ-08
- Reguła: RD-11
- Kryteria akceptacji:
  - Szablon scenariusza: Ocena według częstości zagrania w rozwiązaniu
    - Zakładając, że najczęstsze zagranie w rozwiązaniu ma częstość <f_max>
    - Gdy użytkownik wybierze zagranie o częstości <f>
    - Wtedy widzi ocenę „<ocena>”
    - Przykłady:
      - | f | f_max | ocena | wektor |
      - | 0,6 | 0,6 | zgodne | RD-11-W1 |
      - | 0,1 | 0,6 | dopuszczalne | RD-11-W4 |
      - | 0,035 | 0,715 | dopuszczalne | RD-11-W5 |
      - | 0,0349 | 0,7151 | niedokładność | RD-11-W6 |
      - | 0 | 0,7 | błąd | RD-11-W7 |
  - Scenariusz: Punkt za dopuszczalne zagranie
    - Zakładając, że zagranie ma ocenę „dopuszczalne” (RD-11-W4)
    - Gdy sesja się skończy
    - Wtedy zagranie liczy się w wyniku sesji jako poprawne

### BR-CWI-002: Wyjaśnienie „dlaczego” z liczbami
- Przepływ: PR-03
- Dowód potrzeby: najczęstszy motyw recenzji, ok. 85 z 828 (`odkrywanie.md`, „Rynek”); „doesn't tell you the why” (`docs/monetyzacja.md`); recenzja S-48
- Reguła: RD-01, RD-02, RD-08
- Kryteria akceptacji:
  - Scenariusz: Wyjaśnienie sprawdzenia
    - Zakładając, że pula przed zakładem rywala wynosi 100, a zakład 50
    - Gdy użytkownik odpowie w zadaniu o sprawdzeniu
    - Wtedy wyjaśnienie podaje wymagane equity 25% (RD-01-W1) i minimalną częstość obrony 66,67% (RD-02-W1)
  - Scenariusz: Wartość sprawdzenia
    - Zakładając, że equity ręki wynosi 30%, pula 100, a zakład 50
    - Gdy wyjaśnienie pokaże wartość oczekiwaną sprawdzenia
    - Wtedy wynosi ona +10 żetonów (RD-08-W2)
  - Scenariusz: Błędne dane zadania
    - Zakładając, że zadanie w treści ma zakład 0 (RD-01-W4)
    - Gdy kontrola treści zbuduje zadania
    - Wtedy kontrola zgłasza błąd danych, a zadanie nie trafia do aplikacji (ER-11)

### BR-CWI-003: Szanse trafienia: dokładnie i w przybliżeniu
- Przepływ: PR-03
- Dowód potrzeby: J-01; moduł M2 (outy, szanse, pot odds)
- Reguła: RD-04, RD-05
- Kryteria akceptacji:
  - Scenariusz: Kolor od flopu do rivera
    - Zakładając, że użytkownik ma 9 outów, 47 niewidzianych kart i dwie karty do odkrycia
    - Gdy poda szansę trafienia
    - Wtedy odpowiedź jest oceniana względem 34,97% (RD-04-W1), a przybliżenie 36% (RD-05-W1) jest pokazane jako przybliżenie
  - Scenariusz: Brak outów
    - Zakładając, że użytkownik ma 0 outów
    - Gdy poda szansę trafienia
    - Wtedy poprawna odpowiedź to 0% (RD-04-W4)

### BR-CWI-004: Krótka sesja, przerwanie bez straty
- Przepływ: PR-03
- Dowód potrzeby: „The drills are quick and chill usually 5-10 mins” (recenzja S-01); kontekst PR-03
- Zależy od: ZAL-010
- Kryteria akceptacji:
  - Scenariusz: Przerwanie sesji
    - Zakładając, że użytkownik odpowiedział na część zadań sesji
    - Gdy zamknie aplikację w trakcie zadania
    - Wtedy odpowiedzi udzielone przed zamknięciem są zapisane, a niedokończone zadanie wraca w następnej sesji
  - Scenariusz: Obsługa jedną ręką
    - Zakładając, że telefon jest trzymany pionowo w jednej ręce
    - Gdy użytkownik wybiera odpowiedź
    - Wtedy każdą odpowiedź da się wybrać kciukiem tej ręki bez zmiany chwytu (rozmieszczenie projektuje rola 04)

### BR-CWI-005: Ćwiczenia ICM w turniejach
- Przepływ: PR-03
- Dowód potrzeby: moduł M11 (push/fold i ICM); P-3
- Reguła: RD-09
- Kryteria akceptacji:
  - Scenariusz: Equity trzech graczy
    - Zakładając, że stacki wynoszą 5000, 3000 i 2000, a wypłaty 65% i 35%
    - Gdy ćwiczenie pokaże equity graczy
    - Wtedy wynoszą one 44,375%, 32,625% i 23% puli nagród (RD-09-W1)
    - Oraz tekst nazywa ograniczenie modelu: nie uwzględnia umiejętności ani pozycji (RD-09)

### BR-CWI-006: Plan rozdania: SPR i rozmiar geometryczny
- Przepływ: PR-03
- Dowód potrzeby: moduł M9 (SPR i rozmiary na trzy ulice); P-3
- Reguła: RD-06, RD-07
- Kryteria akceptacji:
  - Scenariusz: SPR
    - Zakładając, że efektywny stack wynosi 100, a pula 10
    - Gdy ćwiczenie pyta o SPR
    - Wtedy poprawna odpowiedź to 10 (RD-06-W1)
  - Scenariusz: Dwa zakłady do all-in
    - Zakładając, że SPR wynosi 4
    - Gdy ćwiczenie pyta o rozmiar zakładu, który na dwóch ulicach wkłada cały stack
    - Wtedy poprawna odpowiedź to 100% puli (RD-07-W1)

### BR-CWI-007: Ranking układów
- Przepływ: PR-03
- Dowód potrzeby: J-02; moduł M0 (zasady i układy)
- Reguła: RD-10
- Kryteria akceptacji:
  - Scenariusz: Kolor wobec strita
    - Zakładając, że jeden gracz ma kolor, a drugi strit
    - Gdy użytkownik wskaże zwycięzcę
    - Wtedy poprawna odpowiedź to kolor, a wyjaśnienie podaje 5108 układów koloru wobec 10200 strita (RD-10-W4, RD-10-W5)

## Powtórki (POW)

### BR-POW-001: Błąd wraca wcześniej
- Przepływ: PR-04
- Dowód potrzeby: „I love the drills to help range study so I can more easily commit them to memory” (recenzja S-02); J-03
- Kryteria akceptacji:
  - Scenariusz: Zadanie z błędem i zadanie zgodne
    - Zakładając, że w jednej sesji jedno zadanie ma ocenę „błąd”, a drugie „zgodne”
    - Gdy użytkownik otworzy kolejkę powtórek w kolejnych dniach
    - Wtedy zadanie z oceną „błąd” pojawia się wcześniej niż zadanie z oceną „zgodne”

### BR-POW-002: Powrót po przerwie bez kary
- Przepływ: PR-04
- Dowód potrzeby: kontekst PR-04 (powrót po przerwie); skargi na limit energii u konkurenta (H-01)
- Kryteria akceptacji:
  - Scenariusz: Zaległe powtórki
    - Zakładając, że użytkownik nie otwierał aplikacji przez kilka tygodni
    - Gdy otworzy kolejkę powtórek
    - Wtedy widzi zaległe powtórki od najdawniej zaległej, a zapisany postęp lekcji jest bez zmian
  - Scenariusz: Zmiana strefy czasowej
    - Zakładając, że użytkownik zmienił strefę czasową
    - Gdy otworzy kolejkę powtórek
    - Wtedy żadna powtórka nie znika z kolejki

### BR-POW-003: Lokalne przypomnienie za zgodą
- Przepływ: PR-04
- Dowód potrzeby: „I use this app nearly daily” (recenzja S-02); J-03; bez serwera (W-05)
- Kryteria akceptacji:
  - Scenariusz: Zgoda na przypomnienie
    - Zakładając, że użytkownik włączył przypomnienie w ustawieniach
    - Gdy system pyta o zgodę na powiadomienia i użytkownik ją daje
    - Wtedy przypomnienie przychodzi lokalnie z telefonu, bez połączenia z siecią (NFR-OFF-001)
  - Scenariusz: Odmowa zgody
    - Zakładając, że użytkownik odmówił zgody systemowej
    - Gdy otworzy ustawienia przypomnień
    - Wtedy widzi, że przypomnienie jest wyłączone, a nauka działa bez zmian

## Scenariusze całych rozdań (SCN)

### BR-SCN-001: Rywal gra zaplanowaną linię
- Przepływ: PR-05
- Dowód potrzeby: J-04; W-07 („zagranie drugiej strony jest z góry zaprogramowane”); recenzja S-47
- Zależy od: ZAL-012
- Kryteria akceptacji:
  - Scenariusz: Powtórzenie scenariusza
    - Zakładając, że użytkownik ukończył scenariusz
    - Gdy rozegra go ponownie i podejmie te same decyzje
    - Wtedy rywal wykonuje te same akcje, a karty na stole są te same
  - Scenariusz: Przerwany scenariusz
    - Zakładając, że użytkownik jest przy decyzji na turnie
    - Gdy zamknie aplikację i otworzy ją ponownie
    - Wtedy wraca do tej samej decyzji na turnie

### BR-SCN-002: Bez stosu do wygrania
- Przepływ: PR-05
- Dowód potrzeby: ZP-01; W-07; OG-02 (kategoria wiekowa zależy od zakładu)
- Zależy od: ZAL-012
- Kryteria akceptacji:
  - Scenariusz: Koniec scenariusza
    - Zakładając, że użytkownik podjął ostatnią decyzję w scenariuszu
    - Gdy scenariusz się skończy
    - Wtedy widzi podsumowanie ocen decyzji, a nie widzi wygranej, salda ani stosu przenoszonego do kolejnego scenariusza
  - Scenariusz: Brak zakładu między scenariuszami
    - Zakładając, że użytkownik ukończył dowolną liczbę scenariuszy
    - Gdy otworzy listę scenariuszy
    - Wtedy nie widzi salda żetonów ani rankingu

### BR-SCN-003: Ocena każdej decyzji w scenariuszu
- Przepływ: PR-05
- Dowód potrzeby: J-04; recenzja S-04 (ocena z odcieniami); recenzja S-48 (brak „dlaczego”)
- Reguła: RD-11
- Kryteria akceptacji:
  - Scenariusz: Decyzja z niską częstością
    - Zakładając, że w decyzji na riverze sprawdzenie ma częstość 0,0349, a najczęstsze zagranie 0,7151
    - Gdy użytkownik sprawdzi
    - Wtedy widzi ocenę „niedokładność” (RD-11-W6) i wyjaśnienie, dlaczego najczęstsze zagranie jest lepsze
  - Scenariusz: Decyzja spoza rozwiązania
    - Zakładając, że zagranie ma częstość 0 w rozwiązaniu
    - Gdy użytkownik je wybierze
    - Wtedy widzi ocenę „błąd” (RD-11-W7), a scenariusz prowadzi dalej linią przewidzianą dla tego zagrania albo kończy się z wyjaśnieniem (wybór: rola 03)

### BR-SCN-004: Rozstrzygnięcie bez losowania
- Przepływ: PR-05
- Dowód potrzeby: OG-02 (scenariusz bez rozstrzygnięcia losem to zadanie, nie zakład); OG-08
- Reguła: RD-10
- Kryteria akceptacji:
  - Scenariusz: Pokazanie kart
    - Zakładając, że scenariusz dochodzi do pokazania kart, a gracz ma full, rywal kolor
    - Gdy karty zostaną pokazane
    - Wtedy wskazany zwycięzca to full z wyjaśnieniem 3744 układów fulla wobec 5108 koloru (RD-10-W3, RD-10-W4)
    - Oraz karty są te same przy każdym rozegraniu scenariusza (BR-SCN-001)
