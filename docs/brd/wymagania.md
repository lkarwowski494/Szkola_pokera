# Przepływy i wymagania niefunkcjonalne: Szkoła Pokera
Stan: E3 (2026-11-03) · Rola 01 build · Wymagania funkcjonalne: `wymagania-nauka.md` (ONB, KURS, CWI, POW, SCN), `wymagania-sklep.md` (ZAK, DANE, POM, JEZ) · Reguły: `reguly.md`

Przepływy powstały z prac J-01–J-06 (`odkrywanie.md`) przed wymaganiami; każde BR wskazuje swój przepływ. Gra z botami (H-07), trener AI (H-06) i raport postępu (H-08) nie mają przepływów: to hipotezy z warunkiem powrotu (W-04, W-06, W-07). Zakres pierwszej wersji wybiera rola 03; lista niżej obejmuje wszystko, na co wskazują dowody.

## Przepływy

### PR-01: Pierwsze uruchomienie i ocena poziomu
- Kto: P-1, P-2, P-3 · Praca: J-05 · Częstotliwość: raz, z możliwością powtórzenia · Kontekst: pierwsze uruchomienie, pełna uwaga, sieć dowolna
- Kroki: otwiera aplikację w języku systemu; widzi, czym aplikacja jest (nauka decyzji, bez gry na pieniądze); odpowiada na kilka pytań o poziom i cel albo pomija ocenę; dostaje punkt startu na ścieżce od zera do GTO; zaczyna pierwszą lekcję albo ćwiczenie.
- Sytuacje brzegowe: pominięcie oceny (start od M0); przerwanie w połowie (ocena wraca przy następnym uruchomieniu albo start od M0); zmiana zdania później (ocena dostępna ponownie).

### PR-02: Lekcja od zera
- Kto: P-2, P-1 · Praca: J-02 · Częstotliwość: kilka razy w tygodniu [OCENA] · Kontekst: dom, 10–20 min [OCENA]
- Kroki: wybiera następną lekcję na ścieżce; czyta krótkie części z przykładami; po lekcji rozwiązuje ćwiczenia sprawdzające; widzi postęp modułu; przechodzi dalej albo zalicza moduł testem, żeby pominąć znane treści.
- Sytuacje brzegowe: przerwanie lekcji (powrót w tym samym miejscu); nieznany termin (definicja w miejscu użycia i w słowniku); test modułu niezaliczony (wskazanie lekcji do powtórki).

### PR-03: Krótka sesja ćwiczeń z wyjaśnieniem
- Kto: P-1, P-3 · Praca: J-01 · Częstotliwość: kilka razy w tygodniu (recenzja S-01) · Kontekst: dojazd, przerwa; jedna ręka, uwaga częściowa, często bez sieci; 5–10 min (zależy od: ZAL-010)
- Kroki: otwiera aplikację; startuje sesję dopasowaną do poziomu; podejmuje decyzję w sytuacji; dostaje ocenę (zgodne, dopuszczalne, niedokładność, błąd) i wyjaśnienie „dlaczego” z liczbami; kończy sesję w dowolnym momencie.
- Sytuacje brzegowe: przerwanie w trakcie (odpowiedzi zapisane); brak sieci (pełne działanie); pomyłka w dotyku (bez cofania oceny, ale z wyjaśnieniem).

### PR-04: Powtórki rozłożone w czasie
- Kto: P-1, P-3 · Praca: J-03 · Częstotliwość: codziennie albo prawie codziennie (recenzja S-02) · Kontekst: jak PR-03
- Kroki: widzi liczbę powtórek na dziś; przechodzi kolejkę; zadania z błędem wracają wcześniej; po przerwie dostaje zaległe powtórki bez kary za nieobecność.
- Sytuacje brzegowe: powrót po długiej przerwie; zgoda na przypomnienie odrzucona; zmiana strefy czasowej.

### PR-05: Scenariusz całego rozdania
- Kto: P-1, P-3 · Praca: J-04 · Częstotliwość: kilka razy w tygodniu [OCENA] · Kontekst: dom, pełna uwaga, 10–30 min [OCENA]
- Kroki: wybiera scenariusz (pozycja, stawka w bb, typ rywala); rozgrywa rozdanie od preflopu do rivera, a rywal gra zaplanowaną linię; przy każdej decyzji dostaje ocenę i wyjaśnienie; na końcu widzi podsumowanie decyzji, nie wygraną ani stos.
- Sytuacje brzegowe: przerwanie scenariusza (powrót w tej samej decyzji); powtórzenie scenariusza (ta sama linia rywala); decyzja, której scenariusz nie przewiduje (niedostępna do wyboru albo oceniona jako błąd z wyjaśnieniem, wybór: rola 03).

### PR-06: Zakup i przywrócenie zakupu
- Kto: P-1, P-3 · Praca: J-01, J-06 · Częstotliwość: raz, przywrócenie przy zmianie telefonu · Kontekst: sieć do sklepu
- Kroki: trafia na treść płatną (podział: H-01); widzi, co dostaje, plany i ceny w walucie sklepu, okres i odnawianie; kupuje w sklepie; treść odblokowuje się od razu; na nowym telefonie przywraca zakup; z ustawień przechodzi do anulowania subskrypcji w sklepie.
- Sytuacje brzegowe: zakup przerwany albo odrzucony (bez odblokowania i bez utraty postępu); brak sieci (komunikat, nauka darmowa działa); zwrot w sklepie (dostęp wygasa).

### PR-07: Przeniesienie, kopia i usunięcie postępu
- Kto: P-1, P-2, P-3 · Praca: J-06 · Częstotliwość: przy zmianie telefonu, rzadko · Kontekst: dom, sieć dowolna
- Kroki: eksportuje postęp do pliku; przenosi plik (udostępnianie systemu); na nowym telefonie importuje plik i widzi ten sam postęp; osobno może usunąć cały postęp z potwierdzeniem.
- Sytuacje brzegowe: plik uszkodzony albo z innej aplikacji; plik z nowszej wersji aplikacji; import na telefonie z istniejącym postępem; aktualizacja aplikacji (postęp zostaje bez eksportu).

### PR-08: Pomoc przy problemie z hazardem
- Kto: każdy użytkownik, który gra także na pieniądze poza aplikacją (P-1) · Praca: J-01 (kontekst gry na pieniądze), reguła krytyczna RD-12 · Częstotliwość: rzadko · Kontekst: dowolny, możliwy stres
- Kroki: otwiera „Pomoc” z ustawień albo z ramki w lekcji o bankrollu i tilcie (M12); widzi numer pomocy dla swojego kraju i numer alarmowy w kryzysie; dzwoni jednym dotknięciem.
- Sytuacje brzegowe: kraj bez wpisu (RD-12-W6); język aplikacji inny niż kraj (RD-12-W5); urządzenie bez funkcji telefonu (numer do przepisania).

### PR-09: Zgłoszenie błędu i ocena aplikacji
- Kto: P-1, P-2, P-3 · Praca: J-07 · Częstotliwość: rzadko [OCENA] · Kontekst: zaraz po ocenie zadania albo po skończonej lekcji lub sesji; sieć dowolna (wysyłka przez program pocztowy użytkownika)
- Kroki: przy ocenie zadania wybiera „Zgłoś błąd”; widzi wiadomość e-mail z identyfikatorem zadania, wersją aplikacji i językiem do uzupełnienia własnymi słowami; wysyła ją swoim programem pocztowym. Osobno: po skończonej lekcji albo sesji system może pokazać prośbę o ocenę; w ustawieniach są „Oceń w sklepie” i „Napisz do nas”.
- Sytuacje brzegowe: brak programu pocztowego (adres do skopiowania); brak sieci (wiadomość czeka w programie pocztowym); prośba systemu się nie pokazuje (limit OG-15, OG-16, bez reakcji aplikacji).
- Pętla opinii jest domyślnie w pierwszej wersji (polecenie roli 03, E2 pkt 6); zakres potwierdza rola 03 (ER-12).

## Wymagania niefunkcjonalne

### NFR-OFF-001: Nauka bez sieci
- Miara: liczba żądań sieciowych w przepływach PR-01–PR-05, PR-07 i PR-08.
- Próg: 0 (bez serwera i bez analityki: W-05, W-06; zależy od: ZAL-010).
- Metoda: przejście przepływów w trybie samolotowym na iOS i Androidzie oraz zapis ruchu przez proxy w trybie z siecią.

### NFR-PRYW-001: Brak zbierania danych
- Miara: liczba domen, z którymi aplikacja się łączy poza zakupem w sklepie, oraz liczba SDK analityki i raportów awarii w zależnościach.
- Próg: 0 i 0; etykieta prywatności „Data Not Collected” (OP-12: usunąć SDK, ER-06; W-06).
- Metoda: zapis ruchu przez proxy w pełnym przejściu PR-01–PR-08; przegląd `package.json` i natywnych zależności.

### NFR-DANE-001: Zero utraty postępu przy aktualizacji
- Miara: odsetek rekordów postępu (lekcje, odpowiedzi, powtórki, zakupy lokalne) zachowanych po migracji z poprzedniej wersji.
- Próg: 100% (zasada wspólna 10 biblioteki).
- Metoda: test migracji na kopii bazy poprzedniej wersji, w transakcji; porównanie rekordów przed i po.

### NFR-DANE-002: Eksport i import bez strat
- Miara: różnice między rekordami postępu przed eksportem i po imporcie na czystej instalacji.
- Próg: 0 różnic (W-05).
- Metoda: test automatyczny eksport → import na danych testowych ze wszystkich rodzajów rekordów.

### NFR-JEZ-001: Pełna nauka w 35 językach
- Miara: odsetek kluczy interfejsu i treści (lekcje, ćwiczenia, scenariusze, wyjaśnienia, pomoc) przetłumaczonych w każdym języku z listy.
- Próg: 100% w 35 językach z listy aplikacji Trening (ZP-02; lista: `locales/` w repo `trening`, commit 2e4b0f8, odczyt 2026-11-03: bg, cs, da, de, el, en, es, es-419, et, fi, fr, hr, hu, id, it, ja, ko, lt, lv, ms, nb, nl, pl, pt, pt-BR, ro, ru, sk, sl, sr, sv, tr, uk, vi, zh-Hant).
- Metoda: skrypt porównujący klucze każdego języka z kluczami źródłowymi.

### NFR-JEZ-002: Te same liczby w każdym języku
- Miara: liczba różnic wartości liczbowych i odwołań `{{n:klucz}}` między treścią źródłową a tłumaczeniem.
- Próg: 0 (jedno źródło liczb `content/numbers.yaml`, `CLAUDE.md`; zależy od: ZAL-004).
- Metoda: kontrola automatyczna po każdym tłumaczeniu (rola 09).

### NFR-DOST-001: Informacja nie tylko kolorem
- Miara: liczba elementów, które rozróżnia wyłącznie kolor (kolory kart, ocena zagrania, zakresy rąk).
- Próg: 0 [FAKT S-54].
- Metoda: przegląd wszystkich ekranów w skali szarości.

### NFR-DOST-002: Czytnik ekranu i duża czcionka
- Miara: odsetek elementów przepływów PR-01–PR-08 z etykietą czytnika ekranu i poprawnym układem przy największym rozmiarze tekstu systemu.
- Próg: [DO USTALENIA] (OP-19).
- Metoda: przejście przepływów z VoiceOver i TalkBack oraz z największym rozmiarem tekstu.

### NFR-WYD-001: Szybki start sesji
- Miara: czas od dotknięcia ikony do pierwszej decyzji w PR-03 na najstarszym wspieranym telefonie.
- Próg: [DO USTALENIA] (OP-21).
- Metoda: pomiar na urządzeniu (rola 05).

### NFR-ZGOD-001: Brak elementów hazardu
- Miara: liczba elementów z wartością pieniężną lub wymienną (żetony do kupienia, nagrody, rankingi z nagrodą), nazw, znaków i linków operatorów gier oraz zachęt do gry na pieniądze w aplikacji i w sklepie.
- Próg: 0 (OG-01, OG-07, OG-08, ZP-01, ZP-05).
- Metoda: przegląd kodu i treści; skrypt z listą marek i operatorów na tekstach wszystkich języków.

### NFR-ZGOD-002: Bez obietnicy wygranej
- Miara: liczba tekstów w aplikacji i w sklepie, które obiecują wygraną albo wskazują grę online jako cel.
- Próg: 0 (OP-11, ER-03).
- Metoda: przegląd tekstów źródłowych i przetłumaczonych (role 06 i 11).

### NFR-ZGOD-003: Bez pomocy w czasie gry
- Miara: liczba funkcji, które przyjmują karty albo akcję z rozdania rozgrywanego poza aplikacją i zwracają zalecenie.
- Próg: 0 (OG-01; definicja „gambling aid” u Apple: [DO USTALENIA] (OP-14)).
- Metoda: przegląd funkcji przed każdym wydaniem.

### NFR-KOSZT-001: Bez kosztów usług
- Miara: miesięczny koszt usług zewnętrznych poza opłatą Apple Developer.
- Próg: 0 USD (`CLAUDE.md`, zasada wspólna 13).
- Metoda: przegląd zależności i usług przed wydaniem.

## Pokrycie wymiarów (E3)
| Wymiar | Wynik |
|---|---|
| Cała droga użytkownika | PR-01–PR-08 z sytuacjami brzegowymi: przerwanie, pomyłka, brak sieci, powrót po przerwie, nowy telefon, zwrot zakupu |
| Początkujący i zaawansowany | ocena poziomu i pomijanie modułów (BR-ONB-001–003, BR-KURS-002); ocena z odcieniami dla P-3 (BR-CWI-001) |
| Wiedza dziedziny | 14 modułów M0–M13; reguły obliczeń RD-01–RD-11 w ćwiczeniach; 142 twierdzenia treści idą do rejestru roli 06 |
| Bezpieczeństwo, zdrowie i prawo | RD-12, BR-POM-001–002, NFR-ZGOD-001–003 |
| Dane użytkownika | BR-DANE-001–005, NFR-DANE-001–002; synchronizacja odrzucona (W-05) |
| Dostępność i konteksty | NFR-DOST-001–002; jedna ręka i przerwania w PR-03 (BR-CWI-004) |
| Konkurencja | `odkrywanie.md`, „Rynek”; luki: „dlaczego” (BR-CWI-002), test poziomujący (BR-ONB-001), uczciwa część darmowa (H-01) |
| Monetyzacja | tylko hipotezy H-01, H-09; BR-ZAK-001–004 wynikają z polityk (OG-05, OG-06) |
| Możliwości platformy | lokalne przypomnienie (BR-POW-003); widżety, Siri i Skróty, zegarek, Live Activities: sprawdzone, brak dowodu potrzeby w recenzjach |
