# W-07: oznaczenie sprzedawcy dla Japonii (特定商取引法, Act on Specified Commercial Transactions)

> **To nie jest opinia prawna** (OP-13). Agent przeczytał tekst ustawy, rozporządzenia i wytyczne urzędu (CAA, 消費者庁) i zestawił je z App Store. Wynik to warianty z rekomendacją do pytania porannego (D-361, A „przyjęta wg D-359”, do weta).

- Stan: 2026-11-09, sesja Z (tylko dokumenty, rola 10 prawo/sklep; wyjątek prompt roli jak w `docs/sklep/asc-reczne-wartosci.md`). Zamyka przygotowanie 10-JP-02 i warunku **J2** z D-301 (`docs/wydanie/legalnosc/JP.md` 4a, 4e). Dane sprzedawcy: **[DO USTALENIA — W-07, właściciel]**.
- Analogia D-191: brak. Trening nie sprzedaje w JP z oznaczeniem (JP.md:9, wyszukiwanie „特定商取引” w Treningu: 0 trafień); Trening ma tylko status tradera DSA w UE (`docs/48-zgloszenie-1-0.md` Z-23, odczyt 2026-11-09). Odstępstwo nazwane.
- Tłumaczenia cytatów: robocze, agenta.

## 1. Źródła (przeczytane 2026-11-09)

| ID | Adres | Miejsce | Cytat | Tłumaczenie robocze |
|---|---|---|---|---|
| U-11 | https://laws.e-gov.go.jp/api/1/lawdata/351AC0000000057 (特定商取引に関する法律, XML) | art. 11 | „販売業者又は役務提供事業者は、通信販売をする場合の…役務の提供条件について広告をするときは…次の事項を表示しなければならない。ただし、当該広告に、請求により、これらの事項を記載した書面を遅滞なく交付し、又はこれらの事項を記録した電磁的記録を遅滞なく提供する旨の表示をする場合には…これらの事項の一部を表示しないことができる。” pkt 6: „前各号に掲げるもののほか、主務省令で定める事項” | „Sprzedawca lub usługodawca, reklamując warunki sprzedaży na odległość, musi podać w reklamie następujące sprawy. Jednak jeśli reklama zawiera oświadczenie, że na żądanie bez zwłoki wyda dokument albo zapis elektroniczny z tymi sprawami, może części z nich nie podawać.” pkt 6: „sprawy określone rozporządzeniem” |
| R-23 | https://laws.e-gov.go.jp/api/1/lawdata/351M50000400089 (施行規則, XML) | art. 23 pkt 1, 3, 6, 7 | „一 販売業者又は役務提供事業者の氏名又は名称、住所及び電話番号” · „三 …外国に住所を有する個人であつて、国内に…事務所等を有する場合には、当該事務所等の所在場所及び電話番号” · „六 …プログラムを…記録させる役務を提供する場合には、当該商品又は役務を利用するために必要な電子計算機の仕様及び性能その他の必要な条件” · „七 …契約を二回以上継続して締結する必要があるときは、その旨及び金額、契約期間その他の販売条件又は提供条件” | „1) imię i nazwisko lub nazwa, adres i telefon”; „3) osoba z adresem za granicą, która ma biuro w Japonii — adres i telefon tego biura”; „6) przy usłudze zapisu programu — wymagania sprzętowe”; „7) gdy umowę zawiera się dwa lub więcej razy z rzędu — ten fakt, kwota, okres i warunki” |
| R-25 | jw. | art. 25 ust. 2 | „購入者又は役務の提供を受ける者の負担すべき金銭の全部を表示する場合は、法第十一条第二号、第三号、第五号及び第六号に定める事項（第二十三条第四号及び第六号から第十号までに掲げる事項及び…申込みの撤回等の可否…を除く。）の一部を表示しないことができる。” | „Gdy pokazano całą kwotę do zapłaty, można nie pokazywać części spraw z art. 11 pkt 2, 3, 5 i 6 — **z wyjątkiem** spraw z art. 23 pkt 4 i 6–10 oraz możliwości odstąpienia.” Art. 23 pkt 1 (imię, adres, telefon) **nie jest wyłączony**, więc można go pominąć przy oświadczeniu z U-11; pkt 6 i 7 trzeba pokazać zawsze |
| CAA-Q | https://www.no-trouble.caa.go.jp/qa/advertising.html (特定商取引法ガイド, Q&A o reklamie) | Q15, Q17 | Q17 „私は個人事業者ですが、住所及び電話番号を必ず表示しなくてはいけないのでしょうか。” A17: „「住所」については現に活動している住所、「電話番号」については確実に連絡が取れる番号を表示する必要がありますが、消費者からの請求によって、広告表示事項を記載した書面又は電子メール等を「遅滞なく」提供することを広告に表示し、かつ、実際に請求があった場合に「遅滞なく」提供できるような措置を講じている場合には、事業者の住所及び電話番号の表示を省略することも可能です。” A15: to samo dla imienia i nazwiska („事業者の氏名（名称）の表示を省略することも可能です”) | Q17: „Jestem przedsiębiorcą indywidualnym; czy muszę podać adres i telefon?” A17: „Trzeba podać adres, pod którym faktycznie się działa, i numer, pod którym jest pewny kontakt, ale jeśli reklama mówi, że na żądanie konsumenta dokument albo e-mail z danymi zostanie wydany »bez zwłoki«, i są środki, by to faktycznie zrobić, można adres i telefon pominąć.” |
| CAA-Q2 | jw. | „遅滞なく” | „ここでいう「遅滞なく」提供されることとは、販売方法等の取引実態に即して、申込みの意思決定に先立って十分な時間的余裕をもって提供されることをいいます。” | „»Bez zwłoki« znaczy: zgodnie z realiami sprzedaży, z wystarczającym zapasem czasu przed decyzją o zamówieniu.” |
| CAA-M | https://www.no-trouble.caa.go.jp/what/mailorder/ | „広告の表示事項を省略できる場合” i tabela | „消費者からの請求によって、これらの事項を記載した書面（インターネット通信販売においては電子メールでもよい）を「遅滞なく」提供することを広告に表示し…” Tabela: „ソフトウェアを使用するための動作環境 省略できない”; „契約を２回以上継続して締結する場合の販売条件又は提供条件 省略できない”; „（電子メールで広告するときは）電子メールアドレス 省略できない” | „…dokument (w sprzedaży internetowej wystarczy e-mail)…”; „wymagania sprzętowe — nie można pominąć”; „warunki umów zawieranych dwa lub więcej razy — nie można pominąć” |
| DPLA | https://developer.apple.com/support/terms/apple-developer-program-license-agreement/ | Schedule 2, Exhibit A, sekcja 1 | „You appoint iTunes KK as Your agent pursuant to Article 643 of the Japanese Civil Code for the marketing and End-User download of the Licensed and Custom Applications by End-Users located in the following region: Japan” | Apple w JP to pełnomocnik, nie sprzedawca we własnym imieniu (JP.md 4a) |
| DPLA-2 | jw. | Schedule 2, sekcja 5 | „You expressly accept and agree to take full responsibility for Your Licensed Applications’ compliance with applicable laws … including without limitation consumer protection, marketing, and gaming laws.” | odpowiedzialność za prawo konsumenckie po stronie dewelopera |
| AS-JP | https://apps.apple.com/jp/app/id1166542235 (dowolna aplikacja osoby fizycznej w App Store JP: „HIIT & Tabata Timer”, deweloper Takahiro Torii) | sekcja „情報” | „販売元 Takahiro Torii” | strona produktu JP pokazuje jako sprzedawcę samo imię i nazwisko dewelopera, bez adresu i telefonu |

Czego nie znaleziono (szukane, nie przeczytane jako twierdzenie): strona pomocy App Store Connect o 特定商取引法 albo pole na te dane w ASC. Wyszukiwanie (2026-11-09) dało tylko strony innych reżimów (DSA w UE, raportowanie gospodarki współdzielenia w JP, podatek JCT), a w DPLA (pełny tekst, odczyt dziś) fraza „Specified Commercial” ma 0 trafień. Wniosek roboczy: **Apple nie ma w ASC pola na oznaczenie sprzedawcy dla JP** [OCENA z braku źródła]. Nie przeczytano też, czy Apple dopuszcza albo wymaga „ujawnienia na żądanie” — Apple się o tym nie wypowiada w przeczytanych dokumentach; dopuszcza je prawo japońskie (U-11, CAA-Q).

Obserwacja z wyszukiwania (nie źródło, nie cytowana jako fakt): część deweloperów aplikacji publikuje stronę „特定商取引法に基づく表記” z adresem i telefonem „na żądanie e-mailem”.

## 2. Wymogi dla nas (z tekstu)

1. Strona produktu w App Store JP to reklama sprzedaży na odległość (art. 11), jeśli deweloper jest sprzedawcą (JP.md 4a: ocena, nie fakt).
2. Pokazać trzeba zawsze (R-25, CAA-M): wymagania sprzętowe (App Store pokazuje „互換性”, AS-JP) oraz warunki subskrypcji odnawianej (zawieranej „dwa lub więcej razy z rzędu”, R-23 pkt 7): fakt odnawiania, kwota, okres. Cena jest w sklepie; zdanie o odnawianiu jest w opisie (`store/app-store-metadata.json`, akapit ACCESS, przekład ja w K-04).
3. Imię i nazwisko, adres, telefon: albo w reklamie, albo oświadczenie „wydamy na żądanie bez zwłoki” + faktyczna możliwość wydania (U-11, CAA-Q A15/A17). Imię i nazwisko i tak pokazuje Apple jako „販売元” (AS-JP), jeśli konto dewelopera jest na osobę fizyczną [DO SPRAWDZENIA: nazwa sprzedawcy konta właściciela w App Store].
4. „Bez zwłoki” = przed decyzją o zakupie, z zapasem (CAA-Q2). W sklepie zakup trwa sekundy, więc odpowiedź ręczna po kilku dniach to ryzyko; automatyczna odpowiedź e-mail z danymi spełnia to najpewniej [OCENA].
5. Art. 23 pkt 3 (biuro w Japonii) nie dotyczy: właściciel nie ma biura w JP [DO POTWIERDZENIA przez właściciela].

## 3. Warianty (pytanie poranne W-07)

| Wariant | Co | Kompromis |
|---|---|---|
| **A (rekomendacja; przyjęta wg D-359 jako A do weta)** | Strona `特定商取引法に基づく表記` (ja + en) w `site/` (GitHub Pages, D-308), link w opisie ja i na stronie wsparcia. Treść: 販売元 = imię i nazwisko [DO USTALENIA]; cena „App Store に表示”; płatność i termin „App Store 決済、購入時”; świadczenie „購入後すぐ”; odnawianie, okres, kwota, anulowanie w ustawieniach Apple; wymagania (iOS); zwroty wg zasad Apple; **„住所・電話番号は、ご請求があれば遅滞なく電子メールにて開示します”** + adres e-mail (W-04). Na skrzynce automatyczna odpowiedź z adresem i telefonem na hasło w temacie (np. „特定商取引法”) | adres i telefon nie są publiczne w sieci (prywatność osoby fizycznej), a wymóg z U-11 spełniony tekstem ustawy i A17; „bez zwłoki” spełnia autoresponder. Koszt: e-mail W-04 musi działać, autoresponder do ustawienia (ok. 10 min właściciela), strona do utrzymania; ryzyko, że oświadczenie musi być w samej reklamie (opis w sklepie), a nie tylko na stronie — dlatego jedno zdanie także w opisie ja |
| B | Jak A, ale imię i nazwisko, adres i telefon wprost na stronie | największa zgodność, zero zależności od „bez zwłoki”. Koszt: adres domowy i telefon publicznie w sieci, indeksowane; trudno cofnąć (D-361 odrzuca dla prywatności, CLAUDE.md „prywatność — zawsze”) |
| C | Adres usługowy (wirtualne biuro) i numer usługowy na stronie | prywatność + jawność. Koszt: abonament (płatne, wymaga zgody — właściciel płaci tylko za Apple Developer); A17 wymaga adresu „現に活動している” (gdzie się faktycznie działa), więc sam adres do korespondencji może nie wystarczyć [OCENA] |
| D | Nic nie publikować, polegać na Apple jako pośredniku | zero pracy. Koszt: sprzeczne z DPLA-2 (odpowiedzialność dewelopera) i z warunkiem J2 przyjętym w D-301; ryzyko nakazu CAA (JP.md 10-JP-02, art. 14); wtedy uczciwiej nie włączać JP |
| E | Nie włączać storefrontu JP w 1.0 | zero ryzyka JP. Koszt: wypada drugi rynek (D-295), sprzeczne z D-301 |

**Rekomendacja: A.** Zgodna z tekstem ustawy i wytyczną CAA dla osób fizycznych, chroni dane prywatne, koszt 0 USD. Warunki publikacji JP po A: (1) W-04 (e-mail) i W-07 (imię i nazwisko jak w rejestrze; „通称や屋号…のみを表示することは認められません”, CAA-Q A16) od właściciela; (2) autoresponder sprawdzony wiadomością testową; (3) strona w `site/` i zdanie w opisie ja — praca sesji kodu i roli 09 (pliki poza pasem tej sesji); (4) J1 (ekran przed zakupem, art. 12-6) osobno, JP.md 4b.

Proponowany tekst (do przeglądu ja w roli 09; przekład roboczy):
- opis ja, ostatni wiersz: „特定商取引法に基づく表記：[ADRES STRONY]（住所・電話番号はご請求により遅滞なく開示します）”
- strona, wiersz kontaktu: „住所・電話番号：ご請求があれば遅滞なく電子メールにて開示します。[SUPPORT EMAIL] 宛に件名「特定商取引法」でご連絡ください。”

## 4. Otwarte

- Czy deweloper jest „販売業者” przy modelu pełnomocnika iTunes KK — ocena z JP.md 4a, nie fakt; opinia prawna: nie teraz (OP-13).
- Nazwa sprzedawcy konta właściciela w App Store (osoba czy firma) [DO SPRAWDZENIA w ASC, 1 min].
- Czy Apple kiedykolwiek pokazuje adres i telefon dewelopera w JP (jak dane tradera w UE) — w przeczytanej stronie AS-JP nie; jedna próbka, druga strona (id1146409173) zwróciła 429.
