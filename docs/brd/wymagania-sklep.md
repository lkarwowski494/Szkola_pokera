# Wymagania: zakup, dane, pomoc i języki
Stan: E3 (2026-11-03) · Rola 01 build · Przepływy i NFR: `wymagania.md` · Ograniczenia OG: `odkrywanie.md`

Podział na część darmową i płatną to hipoteza H-01 (role 02 i 03); wymagania niżej obowiązują przy każdym podziale. Ceny: decyzja cenowa właściciela 2026-11-03 (kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD, bez planu miesięcznego; `docs/sztafeta.md`).

## Zakup (ZAK)

### BR-ZAK-001: Pełna informacja przed zakupem
- Przepływ: PR-06
- Dowód potrzeby: OG-06 [FAKT S-12, S-31, S-32]; obawa przed subskrypcją naliczoną przy próbowaniu (recenzja S-03)
- Kryteria akceptacji:
  - Scenariusz: Ekran zakupu w storefroncie US
    - Zakładając, że użytkownik w storefroncie US otworzy ekran zakupu
    - Gdy ekran się wyświetli
    - Wtedy widzi listę tego, co odblokowuje zakup, oraz plany: kwartał 9,99 USD, rok 14,99 USD i dożywotni 19,99 USD (decyzja cenowa właściciela 2026-11-03)
    - Oraz przy planach kwartalnym i rocznym widzi okres i informację o automatycznym odnawianiu do czasu anulowania
    - Oraz przy planie dożywotnim widzi, że to zakup jednorazowy bez odnawiania
  - Scenariusz: Ceny w walucie i języku użytkownika
    - Zakładając, że użytkownik ma storefront inny niż US i język z listy NFR-JEZ-001
    - Gdy otworzy ekran zakupu
    - Wtedy ceny pochodzą ze sklepu w walucie storefrontu, a wszystkie warunki są w języku aplikacji [FAKT S-32]
  - Scenariusz: Plan roczny bez przeliczenia na miesiąc
    - Zakładając, że ekran pokazuje plan roczny
    - Gdy użytkownik porówna plany
    - Wtedy najmocniej wyróżniona cena planu rocznego to cena za rok, a nie przeliczenie na miesiąc [FAKT S-32]

### BR-ZAK-002: Odblokowanie po zakupie i zakup przerwany
- Przepływ: PR-06
- Dowód potrzeby: J-01; OG-06
- Kryteria akceptacji:
  - Scenariusz: Udany zakup
    - Zakładając, że użytkownik kupił plan roczny
    - Gdy sklep potwierdzi płatność
    - Wtedy treść płatna jest dostępna bez ponownego uruchomienia aplikacji
  - Scenariusz: Zakup przerwany
    - Zakładając, że użytkownik anulował okno płatności sklepu
    - Gdy wróci do aplikacji
    - Wtedy treść płatna pozostaje zablokowana, a postęp nauki jest bez zmian
  - Scenariusz: Brak sieci przy zakupie
    - Zakładając, że telefon nie ma sieci
    - Gdy użytkownik otworzy ekran zakupu
    - Wtedy widzi komunikat o braku połączenia, a część darmowa działa (NFR-OFF-001)

### BR-ZAK-003: Przywracanie zakupu
- Przepływ: PR-06
- Dowód potrzeby: J-06; „My subscription doesn't show on my new iPad” (`docs/monetyzacja.md`, recenzje); OG-06 [FAKT S-10]; dostęp na wszystkich urządzeniach [FAKT S-11]
- Kryteria akceptacji:
  - Scenariusz: Nowy telefon
    - Zakładając, że użytkownik kupił plan dożywotni na innym telefonie z tym samym kontem sklepu
    - Gdy wybierze „Przywróć zakupy”
    - Wtedy treść płatna jest dostępna na nowym telefonie
  - Scenariusz: Brak zakupu do przywrócenia
    - Zakładając, że konto sklepu nie ma zakupu tej aplikacji
    - Gdy użytkownik wybierze „Przywróć zakupy”
    - Wtedy widzi komunikat, że nie znaleziono zakupów, a treść płatna pozostaje zablokowana

### BR-ZAK-004: Anulowanie i wygaśnięcie subskrypcji
- Przepływ: PR-06
- Dowód potrzeby: OG-06 [FAKT S-33]; skargi na model płatności (H-01)
- Kryteria akceptacji:
  - Scenariusz: Zarządzanie subskrypcją
    - Zakładając, że użytkownik ma aktywny plan kwartalny
    - Gdy otworzy w ustawieniach „Zarządzaj subskrypcją”
    - Wtedy aplikacja otwiera zarządzanie subskrypcjami sklepu
  - Scenariusz: Subskrypcja wygasła
    - Zakładając, że plan kwartalny wygasł albo sklep zwrócił płatność
    - Gdy użytkownik otworzy treść płatną
    - Wtedy treść jest zablokowana, a postęp z okresu subskrypcji zostaje zapisany (NFR-DANE-001)

## Dane użytkownika (DANE)

### BR-DANE-001: Eksport postępu do pliku
- Przepływ: PR-07
- Dowód potrzeby: W-05 („5a”: eksport i import pliku dla wszystkich); utrata postępu w recenzjach (recenzja S-51; 10 z 828)
- Zależy od: ZAL-006
- Kryteria akceptacji:
  - Scenariusz: Eksport bez zakupu
    - Zakładając, że użytkownik nie kupił żadnego planu i ma postęp w lekcjach
    - Gdy wybierze „Eksportuj postęp”
    - Wtedy powstaje jeden plik, który można zapisać albo wysłać przez udostępnianie systemu
  - Scenariusz: Data ostatniego eksportu
    - Zakładając, że użytkownik wyeksportował postęp
    - Gdy otworzy ustawienia danych
    - Wtedy widzi datę ostatniego eksportu

### BR-DANE-002: Import postępu z pliku
- Przepływ: PR-07
- Dowód potrzeby: W-05; J-06
- Zależy od: ZAL-006
- Kryteria akceptacji:
  - Scenariusz: Import na czystej instalacji
    - Zakładając, że plik pochodzi z eksportu tej aplikacji w tej samej albo starszej wersji
    - Gdy użytkownik zaimportuje go na nowym telefonie
    - Wtedy widzi ten sam postęp lekcji, ćwiczeń i powtórek co przed eksportem (NFR-DANE-002)
  - Scenariusz: Import przy istniejącym postępie
    - Zakładając, że telefon ma już postęp
    - Gdy użytkownik wybierze import
    - Wtedy widzi ostrzeżenie, że obecny postęp zostanie zastąpiony, i musi to potwierdzić
  - Scenariusz: Plik uszkodzony albo obcy
    - Zakładając, że plik jest uszkodzony albo nie pochodzi z tej aplikacji
    - Gdy użytkownik go zaimportuje
    - Wtedy widzi komunikat o błędnym pliku, a dotychczasowy postęp jest bez zmian
  - Scenariusz: Plik z nowszej wersji
    - Zakładając, że plik pochodzi z nowszej wersji aplikacji niż zainstalowana
    - Gdy użytkownik go zaimportuje
    - Wtedy widzi prośbę o aktualizację aplikacji, a dotychczasowy postęp jest bez zmian

### BR-DANE-003: Usunięcie postępu
- Przepływ: PR-07
- Dowód potrzeby: wymiar „usunięcie danych” (dane tylko na telefonie, W-05); OG-11
- Kryteria akceptacji:
  - Scenariusz: Usunięcie z potwierdzeniem
    - Zakładając, że użytkownik ma postęp
    - Gdy wybierze „Usuń postęp” i potwierdzi
    - Wtedy postęp lekcji, ćwiczeń i powtórek jest pusty, a zakup można nadal przywrócić ze sklepu (BR-ZAK-003)
  - Scenariusz: Rezygnacja
    - Zakładając, że użytkownik wybrał „Usuń postęp”
    - Gdy nie potwierdzi
    - Wtedy postęp jest bez zmian

### BR-DANE-004: Aktualizacja zachowuje postęp
- Przepływ: PR-07
- Dowód potrzeby: J-06; zasada wspólna 10 biblioteki; utrata postępu w recenzjach (recenzja S-51)
- Kryteria akceptacji:
  - Scenariusz: Nowa wersja ze zmianą schematu bazy
    - Zakładając, że użytkownik ma postęp w poprzedniej wersji aplikacji
    - Gdy zainstaluje aktualizację ze zmianą schematu bazy
    - Wtedy widzi ten sam postęp co przed aktualizacją (NFR-DANE-001)
  - Scenariusz: Zmiana treści lekcji
    - Zakładając, że aktualizacja zmienia albo usuwa ćwiczenie, które użytkownik miał w powtórkach
    - Gdy otworzy kolejkę powtórek
    - Wtedy pozostałe powtórki są bez zmian, a usunięte ćwiczenie nie powoduje błędu

## Pomoc przy problemie z hazardem (POM)

### BR-POM-001: Numer pomocy według kraju urządzenia
- Przepływ: PR-08
- Dowód potrzeby: OG-14; ER-04; RYZ-05
- Reguła: RD-12 (krytyczna)
- Kryteria akceptacji:
  - Szablon scenariusza: Numer według regionu, nie języka
    - Zakładając, że region urządzenia to <region>, a język aplikacji to <język>
    - Gdy użytkownik otworzy „Pomoc”
    - Wtedy widzi numer <numer>
    - Przykłady:
      - | region | język | numer | wektor |
      - | US | en | 1-800-MY-RESET (1-800-697-3738) | RD-12-W1 |
      - | US | pl | 1-800-MY-RESET (1-800-697-3738) | RD-12-W5 |
  - Scenariusz: Kryzys w US
    - Zakładając, że region urządzenia to US
    - Gdy użytkownik otworzy „Pomoc”
    - Wtedy widzi także, że w zagrożeniu życia dzwoni się pod 911 albo 988 (RD-12-W2)
  - Scenariusz: Wielka Brytania z dwoma numerami
    - Zakładając, że region urządzenia to GB
    - Gdy użytkownik otworzy „Pomoc”
    - Wtedy widzi numer 0808 8020 133 z opisem „Anglia i Szkocja” (RD-12-W3) oraz 0808 2819 265 z opisem „Walia” (RD-12-W4)
  - Scenariusz: Kraj bez wpisu
    - Zakładając, że region urządzenia nie ma wpisu w pliku numerów
    - Gdy użytkownik otworzy „Pomoc”
    - Wtedy widzi numer alarmowy kraju i informację o lokalnej pomocy (RD-12-W6; brzmienie i numery: OP-10)

### BR-POM-002: Pomoc zawsze pod ręką
- Przepływ: PR-08
- Dowód potrzeby: RD-12; ramka „Odpowiedzialna gra” w lekcji M12 (`content/helplines.yaml`)
- Kryteria akceptacji:
  - Scenariusz: Wejście z ustawień i z lekcji
    - Zakładając, że użytkownik jest w ustawieniach albo w lekcji modułu M12 z ramką „Odpowiedzialna gra”
    - Gdy wybierze „Pomoc”
    - Wtedy otwiera się ekran z numerem dla jego kraju, także bez sieci (NFR-OFF-001)
  - Scenariusz: Połączenie jednym dotknięciem
    - Zakładając, że telefon może dzwonić
    - Gdy użytkownik dotknie numeru
    - Wtedy system proponuje połączenie z tym numerem
  - Scenariusz: Urządzenie bez telefonu
    - Zakładając, że urządzenie nie może dzwonić
    - Gdy użytkownik otworzy „Pomoc”
    - Wtedy numer jest widoczny jako tekst do przepisania

## Języki (JEZ)

### BR-JEZ-001: Język systemu i zmiana w aplikacji
- Przepływ: PR-01
- Dowód potrzeby: ZP-02; luka lokalizacji w kategorii (H-03, ZAL-003)
- Zależy od: ZAL-003
- Kryteria akceptacji:
  - Scenariusz: Język systemu z listy
    - Zakładając, że język systemu to ja
    - Gdy użytkownik uruchomi aplikację pierwszy raz
    - Wtedy interfejs i treść lekcji są po japońsku
  - Scenariusz: Język systemu spoza listy
    - Zakładając, że języka systemu nie ma na liście NFR-JEZ-001
    - Gdy użytkownik uruchomi aplikację pierwszy raz
    - Wtedy aplikacja jest po angielsku (rynek główny US, `CLAUDE.md`)
  - Scenariusz: Zmiana języka w aplikacji
    - Zakładając, że użytkownik ma postęp
    - Gdy zmieni język w ustawieniach
    - Wtedy interfejs i treść są w nowym języku, a postęp jest bez zmian

### BR-JEZ-002: Liczby te same, zapis lokalny
- Przepływ: PR-02
- Dowód potrzeby: ZP-02; jedno źródło liczb (`content/numbers.yaml`, `CLAUDE.md`)
- Zależy od: ZAL-004
- Kryteria akceptacji:
  - Scenariusz: Ten sam wynik w dwóch językach
    - Zakładając, że lekcja pokazuje szansę trafienia koloru od flopu do rivera
    - Gdy użytkownik przełączy język z pl na en
    - Wtedy wartość jest ta sama: „34,97%” po polsku i „34.97%” po angielsku (RD-04-W1)

## Opinie (OPIN)

### BR-OPIN-001: Systemowa prośba o ocenę po skończonej pracy
- Przepływ: PR-09
- Dowód potrzeby: J-07; OG-15 [FAKT S-55, S-57, S-59, S-60]; OG-16 [FAKT S-61, S-62]; wzór Treningu (`docs/26-prosba-o-ocene.md` w repo `trening`: prośba od 3. ukończonego treningu) i Piekarza (D-067: od 3. wypieku, odstęp 14 dni)
- Kryteria akceptacji:
  - Scenariusz: Prośba po trzeciej skończonej pracy
    - Zakładając, że użytkownik skończył trzecią lekcję albo sesję ćwiczeń od instalacji (decyzja agenta przez analogię do Treningu i Piekarza, 2026-11-03, ER-12)
    - Gdy zobaczy podsumowanie tej lekcji albo sesji
    - Wtedy aplikacja wywołuje systemową prośbę o ocenę, bez własnego okna i bez pytania wstępnego
  - Scenariusz: Bez prośby w trakcie zadania i przy pierwszym uruchomieniu
    - Zakładając, że użytkownik jest w trakcie zadania, oceny poziomu albo na ekranie zakupu
    - Gdy spełnia warunek liczby skończonych prac
    - Wtedy prośba nie jest wywoływana, a czeka do najbliższego podsumowania lekcji albo sesji
  - Scenariusz: Odstęp między prośbami
    - Zakładając, że aplikacja wywołała prośbę mniej niż 14 dni temu (decyzja agenta przez analogię do Piekarza D-067, 2026-11-03)
    - Gdy użytkownik skończy kolejną lekcję
    - Wtedy prośba nie jest wywoływana
  - Scenariusz: Dostęp niezależny od oceny
    - Zakładając, że użytkownik zamknął prośbę bez oceny
    - Gdy wróci do nauki
    - Wtedy wszystkie funkcje działają jak przed prośbą [FAKT S-56]

### BR-OPIN-002: „Oceń w sklepie” i „Napisz do nas” w ustawieniach
- Przepływ: PR-09
- Dowód potrzeby: J-07; OG-15 [FAKT S-58]; NFR-PRYW-001 (bez SDK i bez serwera); wzór Treningu (`docs/34-wsparcie-i-opinie.md:13`: „Napisz do nas” jako `mailto`)
- Kryteria akceptacji:
  - Scenariusz: Ocena w sklepie
    - Zakładając, że użytkownik jest w ustawieniach na iOS
    - Gdy wybierze „Oceń w sklepie”
    - Wtedy otwiera się strona aplikacji w App Store z polem recenzji (adres z parametrem `action=write-review`) [FAKT S-58]
  - Scenariusz: Kontakt
    - Zakładając, że użytkownik jest w ustawieniach
    - Gdy wybierze „Napisz do nas”
    - Wtedy otwiera się nowa wiadomość w jego programie pocztowym z adresem kontaktowym, a aplikacja niczego nie wysyła sama
  - Scenariusz: Brak programu pocztowego
    - Zakładając, że telefon nie ma skonfigurowanej poczty
    - Gdy użytkownik wybierze „Napisz do nas”
    - Wtedy widzi adres kontaktowy z możliwością skopiowania

### BR-OPIN-003: Zgłoszenie błędu w zadaniu
- Przepływ: PR-09
- Dowód potrzeby: J-07 (recenzje S-63, S-64, S-65); reguły oceny RD-11 i RD-01–RD-08 (błąd w treści to bloker, BR-CWI-001, BR-CWI-002)
- Kryteria akceptacji:
  - Scenariusz: Zgłoszenie z oceny zadania
    - Zakładając, że użytkownik widzi ocenę i wyjaśnienie zadania
    - Gdy wybierze „Zgłoś błąd”
    - Wtedy otwiera się nowa wiadomość z identyfikatorem zadania, wersją aplikacji i językiem w treści, bez innych danych z telefonu
  - Scenariusz: Zgłoszenie nie zmienia oceny ani postępu
    - Zakładając, że użytkownik wysłał zgłoszenie albo z niego zrezygnował
    - Gdy wróci do aplikacji
    - Wtedy jest w tym samym miejscu zadania, a ocena i postęp są bez zmian

