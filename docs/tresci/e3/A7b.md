# E3, weryfikator A7b: przegląd zastępczy D-027 (2026-11-04, commit 35b24e6)

Zakres: 50 twierdzeń krytycznych z `A7.ids`. Mam za zadanie wpisy pomocy H-* z `content/helplines.yaml`, R-M12-009..011, `n:br.bi.base`, `n:br.bi.beginner`, `n:dd.bi.small`, `n:ror.two`, M12-L4-RAMKA, `t:bankroll` i `t:risk-of-ruin`. Każde źródło pobrałem sam (curl, pdftotext, wycięcie HTML skryptem `python3 -I`). Cytaty szukałem dosłownie, po normalizacji spacji, cudzysłowów i myślników. Liczby ryzyka bankructwa i downswingu policzyłem własnym skryptem, w tym Monte Carlo na bibliotece standardowej. Kod projektu przy tym nie był używany. Numery telefonów porównałem cyfra po cyfrze z tekstem strony operatora albo urzędu. Kopie źródeł leżą w scratchpadzie (`zrodla/A7b/`).

## Liczby werdyktów

| | POPARTE | CZĘŚCIOWO | NIEPOPARTE | SPRZECZNE | DO SPRAWDZENIA |
|---|---|---|---|---|---|
| źródło | 48 | 2 | 0 | 0 | 0 |
| tekst | 46 | 4 | 0 | 0 | 0 |

- Przegląd zastępczy: 44 zaliczone, 6 niezaliczonych (H-GB-5, H-GB-7, H-CA-9, M12-L4-RAMKA, t:bankroll, t:risk-of-ruin).
- Cytat znaleziony: 49 „tak”, 1 „rachunek” (`n:dd.bi.small`).
- Skutki: S2 ×1 (M12-L4-RAMKA), S3 ×5.
- Wszystkie numery telefonów w danych zgadzają się cyfra po cyfrze ze źródłami.

## Nie-POPARTE i rozbieżności (6)

1. **M12-L4-RAMKA (tekst CZĘŚCIOWO, S2).** Cytaty znalazłem we wszystkich czterech źródłach: u.g.h. art. 1 i 27, vic.gov.au, MedlinePlus, NHS. Pięć sygnałów utraty kontroli ma pokrycie.
   - (a) Wskaźnik ramki `helplines.yaml:22` mówi: „Telefony pomocy dla Twojego kraju znajdziesz w aplikacji, w ekranie „Pomoc”.” Aplikacja jest na wszystkich storefrontach poza PL (OP-15), a wpisy ma tylko 9 krajów. W pozostałych krajach ekran pokazuje tylko tekst bez numeru i pomoc online. Ramka obiecuje więc coś bez pokrycia w danych.
   - (b) W zadaniu `m12-l4:102` jest zdanie „jeden z najczęściej wymienianych sygnałów” bez przeczytanego źródła. MedlinePlus wymienia odgrywanie strat wśród objawów, ale bez rankingu.
   - Poprawka: „Telefony pomocy dla części krajów znajdziesz…” oraz „…jeden z sygnałów… wymienianych w kryteriach diagnostycznych”.
2. **H-GB-5 (źródło CZĘŚCIOWO, S3).** Numer 999 ma przeczytane źródła dla Anglii (nhs.uk), Walii (cavuhb) i Irlandii Płn. (nidirect). Wpis obowiązuje w całym GB, ale Szkocję pokrywa tylko nhsinform.scot. Ta strona zwraca 403 („The website is busy”), a archive.org zrywa połączenie (reset, 429). Innego źródła dla Szkocji nie mam. Kierunek wpisu jest bezpieczny, ale pole nie ma pokrycia.
3. **H-GB-7 (źródło CZĘŚCIOWO, S3).** Region GB-SCT dla 111 z opcją zdrowia psychicznego opiera się wyłącznie na niedostępnym nhsinform.scot. Anglię pokrywa nhs.uk, Walię gov.wales („press OPTION 2”). Do zrobienia: odczytać nhsinform.scot ponownie albo znaleźć inne źródło szkockie (NHS 24).
4. **H-CA-9 (tekst CZĘŚCIOWO, S3).** Nazwa „Linia uzależnień i zdrowia psychicznego (także hazard)”. Źródło gnb.ca mówi tylko „Call our 24/7 helpline: 1-866-355-5550” na stronie usług uzależnień („substance use and gambling”). Człon „i zdrowia psychicznego” nie ma pokrycia. Numer i godziny są zgodne. Poprawka: „Całodobowa linia usług uzależnień (także hazard)”.
5. **t:bankroll (tekst CZĘŚCIOWO, S3).** Definicja jest zgodna z GTO Wizard i primedope.
   - Rejestr przypisuje hasłu glosariusza GTO Wizard szczebel 2. To nie jest wynik solvera, tylko materiał serwisu (szczebel 4).
   - `m12-l3-tilt.md:35` mówi o „zasadach bankrollu” przed definicją w M12-L4.
6. **t:risk-of-ruin (tekst CZĘŚCIOWO, S3).** Hasło w `terms.yaml:890` mówi „…zanim osiągniesz cel albo przestaniesz grać, jeśli grasz dalej…” i odpowiada cytatowi z primedope. Lekcja `m12-l4:117` definiuje to samo pojęcie inaczej: „kiedykolwiek stracisz cały bankroll, jeśli grasz dalej”. To wersja, którą liczy wzór. Powstają dwie definicje jednego pojęcia. Poprawka: ujednolicić hasło do wersji z lekcji.

## DO SPRAWDZENIA

Brak werdyktów DO SPRAWDZENIA. Jedno źródło było niedostępne: `https://www.nhsinform.scot/campaigns/suicide`, bez działającej kopii w archive.org. Dla H-GB-4 wszystkie pola pokrywają inne źródła (samaritans.org: „any time… FREE… 116 123”, „day or night”, „across the UK and Ireland”), więc to zaliczyłem. Dla H-GB-5 i H-GB-7 brak pokrycia Szkocji wpisałem jako rozbieżność (punkty 2 i 3).

## Uwagi do zaliczonych (bez rozbieżności)

- **H-US-1.** Strona NCPG podaje numer do dzwonienia jako „1-800-MY-RESET”. Cyfry 1-800-697-3738 pojawiają się tylko w warunkach SMS. Przeliczenie z klawiatury (M6 Y9 R7 E3 S7 E3 T8) daje 697-3738, zgodne. Na pytanie „Is it free…?” FAQ odpowiada „No payment or insurance information is required”, więc „bez opłat za usługę” mieści się w źródle.
- **H-INT-1.** Zdanie z cytatu („Gambling Therapy is a global service offering…”) jest w surowym HTML, w opisie JSON-LD. W tekście widocznym jest jego odpowiednik: „a global service offered by Gordon Moody, providing free practical advice and emotional support to anyone affected by gambling”. Dopisek „Wielka Brytania” pokrywa „Registered charity in England and Wales”.
- **H-FR-1.** joueurs-info-service.fr jest w trybie konserwacji po „faille de sécurité”. Strona nadal podaje numer i godziny 8–23. Annuaire podaje 8h–2h, a wpis przyjmuje węższy zakres (D-150), więc działa ostrożnościowo. Wpis nie ma linku do tej strony.
- **H-VN-3.** baochinhphu.vn z 02/11/2026 opisuje Thông tư 42/2026/TT-BYT (w mocy od 1.11.2026): wezwania medyczne przez 113 trafiają do personelu medycznego w centrum Công an, a obsada ma być gotowa przed 1.07.2027. Numer 115 jako pierwszy („Tổng đài cấp cứu 115”, lsvn.vn) to wybór bezpieczny. `review_by` 2027-02-04 jest uzasadnione, bo system numerów alarmowych się zmienia.
- **H-CA-12.** Źródła są szczebla 3 (katalog 211 PEI, PDF CMHA: „Gambling Helpline Toll Free: 1-855-255-4255”). Strony rządu PEI nie czytałem.
- **H-CA-5.** quebec.ca zapisuje numer z łącznikami U+2011. Po normalizacji cytat jest zgodny.
- **Pliki gzip.** baochinhphu.vn wysyła treść skompresowaną nawet bez nagłówka Accept-Encoding. Po rozpakowaniu cytaty są dosłownie.
- **Rachunek.** Wyniki: RoR 30 wpisowych przy wr3: 6,01%; 15 wpisowych: 24,51%; wr1 przy 30 wpisowych: 39,16%; wr1 przy 50 wpisowych: 20,96%; wr5 przy 30 wpisowych: 0,92%. Monte Carlo ruiny dla wr3 i 30 wpisowych daje 5,1%, wzór jest ostrożniejszy. Downswing o 10 wpisowych w 100 tys. rąk: 94,8% przy wr5, 98,6% przy wr3, 99,2% przy wr2, 99,7% przy wr1.

## Sprawdzenia (c) i (d)

- **(c)** Wszystkie trzy pliki mają uwagę albo odesłanie do pomocy:
  - `m12-l1-wariancja.md:140`: „To ogólne wskazówki, nie gwarancja wyniku… ekranu „Pomoc””.
  - `exams/m12.yaml:82` i `:91`: „To ogólna wskazówka; … ekranu „Pomoc””.
  - `m12-l4-bankroll.md:148–154`: ramka „Odpowiedzialna gra” z `{{helplines}}`. Brak tam dosłownego „ogólna wskazówka”, ale jest odesłanie do pomocy, co wystarcza.
- **(d)** W `content/pl/lessons`, `content/pl/exams`, `content/terms.yaml` i `pl.json` nie ma numerów pomocy wpisanych ręcznie. Szukałem wzorców numerów i nazw linii, a jedynym trafieniem był znacznik `{{helplines}}`. `helplines.generated.ts` zgadza się z yaml.
- **Ekran „Pomoc”** (`help.tsx`, `pl.json` klucz `help`) nie zmienia znaczenia wpisów: pokazuje nazwę, godziny, koszt, info, numer jako przycisk `tel:` i linki. `telUri` usuwa tylko spacje i łączniki.
  - Intro mówi: „…możesz porozmawiać ze specjalistą”. Część linii prowadzą wolontariusze (Samaritans, CVV, TelefonSeelsorge), a w kraju bez wpisu nie ma telefonu do specjalisty. To łagodna obietnica bez pełnego pokrycia (S3, propozycja: „możesz poszukać pomocy”).
  - Brak wyświetlania `phone_alt` (znane zgłoszenie do roli 08) jest szczególnie mylący przy よりそいホットライン. Źródło mówi „福島県からは 0120-279-226”, a ekran pokazuje tylko 0120-279-338, także mieszkańcom Fukushimy. #いのちSOS jest wyżej, więc ryzyko jest małe, ale to warto naprawić.
  - Ekran nie pokazuje też SMS przy US-1 i CA-1. Przy US-1 pole `cost` wspomina SMS, ale numer SMS jest ten sam co telefon, więc to nie wprowadza w błąd.
  - `abroadText` (ten sam tekst co `fallback.text`) wyświetla się zawsze. W kraju bez wpisów ekran pokazuje go dwa razy. To drobiazg kosmetyczny.

## Problemy spoza listy

- `m12-l1-wariancja.md:83`: „Downswing o 10 wpisowych trafia prawie każdego wygrywającego gracza” w odpowiedzi na zadanie „od miesiąca”. Zdanie pomija horyzont 100 tys. rąk. Dla 20 tys. rąk przy wr5 symulacja daje ok. 40% (`dd.p.small.20k`). Na całą karierę zdanie jest prawdziwe. S3, warto dopisać „w ciągu {{n:var.hands.k}} tys. rąk”.
- `numbers.yaml` `dd.p.small.100k` (nie z mojej listy) ma notę o niezgodności z primedope (45%). Moja symulacja potwierdza wartość projektu (94,8%), a nie primedope.
- `exams/m12.yaml:89–92` podaje kwoty w złotówkach, choć aplikacja nie ma storefrontu PL. To kosmetyka produktowa, nie merytoryka.
- `m12-l3-tilt.md:35` używa „zasad bankrollu” przed lekcją o bankrollu (opis w punkcie 5).
- W pobranych stronach nie znalazłem instrukcji skierowanych do czytelnika-agenta.
