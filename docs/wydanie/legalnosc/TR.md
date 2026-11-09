# Sprawdzenie legalności sprzedaży: storefront TR (Turcja)

> **To nie jest opinia prawna** (OP-13: „bez opinii teraz”, decyzja właściciela 2026-11-03). Agent przeczytał teksty przepisów ze źródeł oficjalnych i zestawił je z aplikacją. Wynik to rekomendacja do akceptacji albo weta właściciela (D-292, D-295 pkt 2, D-301), nie gwarancja zgodności z prawem.

- Data odczytu wszystkich źródeł: **2026-11-09** (sesja O, rola 10 tryb build; wzór: `US.md`, `JP.md`, `VN.md`).
- Rola: `tools/assemble.mjs 10-wydanie --tryb build` z repo `prompts` @ `c025063`.
- Stan aplikacji: gałąź `claude/sleepy-brahmagupta-2065nu` po `7814d21`. Fakty o aplikacji: tabela „Fakty o aplikacji” w `US.md`.

## Metoda

- **Źródło:** teksty ustaw z Dziennika Urzędowego (Resmî Gazete, `resmigazete.gov.tr/eskiler/…`), HTML w windows-1254 przekodowany na UTF-8.
- **Ważne ograniczenie: to wersje pierwotne z dnia ogłoszenia.** Teksty ujednolicone są w oficjalnej bazie `mevzuat.gov.tr`, która z tego środowiska nie odpowiada. TLS się łączy, ale odpowiedź ma 0 bajtów; tak było przy limicie czasu do 200 s, dla www i bez www, dla stron i PDF. Późniejsze zmiany przepisów **nie są sprawdzone**.
- **Ustawa KVKK 6698:** PDF z Resmî Gazete bez warstwy tekstowej, odczytany przez OCR (tesseract, tur). Zgodność sprawdzona z tekstem na stronie urzędu `kvkk.gov.tr`.
- **Ustawa 7258 art. 5:** tylko kopia nieoficjalna, na stronie kancelarii.
- **Weryfikacja:** odczyt źródeł zlecony subagentowi. Agent główny sprawdził ponownie `grep` na tych samych plikach cytaty z wierszy 1a, 1b, 2, 4b, 4c, 4d, 4e i 5.
- **Tłumaczenia:** cytat po turecku, po nim **tłumaczenie robocze agenta** (nie urzędowe).
- **Analogia z Treningiem (D-191):** brak. Wyszukiwarka kodu GitHub w `lkarwowski494/trening` dla „Turkey”, „Türkiye” i „Turcja” dała 0 trafień (2026-11-09).
- **Sygnał sklepowy** (`../konkurencja/storefronty.md`, D-300): w TR dostępne jest 25/25 aplikacji nauki i gier z botami oraz 3/10 gier na żetony (Poker Face, Octro, Pokerrrr 2).
- **Popyt:** 33 oceny rocznie w kategorii (`docs/monetyzacja.md:250`), wobec 3548 w US.
- **Statusy:** jak w `US.md`.

## Tabela

| # | Pytanie | Źródło (adres · miejsce · cytat · odczyt) | Wniosek | Status |
|---|---|---|---|---|
| 1a | Czy aplikacja to „kumar” (hazard) w rozumieniu kodeksu karnego? | https://www.resmigazete.gov.tr/eskiler/2004/10/20041012.htm (Türk Ceza Kanunu 5237, RG 12.10.2004, nr 25611, tekst pierwotny) · art. 228 ust. 4 · „Ceza Kanununun uygulanmasında kumar, kazanç amacıyla icra edilen ve kar ve zararın talihe bağlı olduğu oyunlardır.” — tłum.: „Na potrzeby stosowania Kodeksu karnego hazard to gry prowadzone w celu zysku, w których zysk i strata zależą od losu.” · 2026-11-09 | Aplikacja nie ma zysku ani straty dla użytkownika (brak stawek i wygranych, OG-01). Opłata to zakup dostępu do nauki, jej wartość nie zależy od losu. | potwierdzone (wersja pierwotna) |
| 1b | Zapewnienie miejsca i możliwości gry | to samo źródło · art. 228 ust. 1 · „Kumar oynanması için yer ve imkan sağlayan kişi, bir yıla kadar hapis ve adlî para cezası ile cezalandırılır.” — tłum.: „Kto zapewnia miejsce i możliwość gry hazardowej, podlega karze pozbawienia wolności do roku i grzywnie.” · 2026-11-09 | Bez „kumar” (1a) przepis nie ma zastosowania. W aplikacji nie ma gry na pieniądze ani gry między ludźmi. | potwierdzone (wersja pierwotna) |
| 2 | Wykroczenie gry w hazard | https://www.resmigazete.gov.tr/eskiler/2005/03/20050331M1-2.htm (Kabahatler Kanunu 5326, RG 31.03.2005, nr 25772 Mükerrer) · art. 34 ust. 1 · „Kumar oynayan kişiye, yüz Türk Lirası idarî para cezası verilir.” — tłum.: „Osoba grająca w grę hazardową podlega administracyjnej karze pieniężnej 100 lir.” · 2026-11-09 | Dotyczy gracza w „kumar”. Użytkownik aplikacji w nią nie gra (1a). | potwierdzone |
| 3 | Zakłady i gry losowe przez internet, zachęcanie do nich (ustawa 7258 art. 5) | **kopia nieoficjalna:** https://or.av.tr/yasa-disi-bahis-kacak-bahis-suc-ve-cezalari-7258-sayili-kanun-uygulamasi/ · art. 5 ust. 1 lit. ç · „Kişileri reklam vermek ve sair surette spor müsabakalarına dayalı sabit ihtimalli veya müşterek bahis ya da şans oyunlarını oynamaya teşvik edenler, bir yıldan üç yıla kadar hapis […]” — tłum.: „Kto przez reklamę lub w inny sposób zachęca do udziału w zakładach o stałym kursie lub wzajemnych albo w grach losowych opartych na zawodach sportowych, podlega karze od roku do 3 lat […]”. Lit. b dotyczy umożliwiania z Turcji udziału w takich zakładach organizowanych za granicą · 2026-11-09 | Aplikacja nie przyjmuje zakładów ani do nich nie zachęca. Nie wymienia operatorów (kontrola z `US.md` wiersz 4: lista marek i testy). Brzmienie oficjalne, wersja aktualna oraz zakres „şans oyunları” (czy tylko gry oparte na sporcie) pozostają nieprzeczytane w źródle oficjalnym. | ryzyko (niskie) → `[DO USTALENIA]` tekst oficjalny (T1) |
| 4a | Kto jest sprzedawcą wobec klienta w TR | https://developer.apple.com/support/terms/apple-developer-program-license-agreement/ · Schedule 2, Exhibit A, sekcja 2 · „You appoint Apple Distribution International Ltd., as Your commissionaire […]” — lista obejmuje „Türkiye*” · 2026-11-09 | Apple (ADI) jest komisantem i zawiera umowę we własnym imieniu, jak w VN. Czy obowiązki „satıcı veya sağlayıcı” (sprzedawcy lub usługodawcy) z ustawy 6502 spoczywają na Apple czy na deweloperze, przepis nie rozstrzyga. To **ocena, nie fakt**. | ryzyko |
| 4b | Informacje przed zawarciem umowy na odległość | https://www.resmigazete.gov.tr/eskiler/2014/11/20141127-6.htm (Mesafeli Sözleşmeler Yönetmeliği, RG 27.11.2014, nr 29188) · art. 5 ust. 1 · „Tüketici, mesafeli sözleşmenin kurulmasından ya da buna karşılık gelen herhangi bir teklifi kabul etmeden önce, aşağıdaki hususların tamamını içerecek şekilde satıcı veya sağlayıcı tarafından bilgilendirilmek zorundadır.” — tłum.: „Przed zawarciem umowy na odległość albo przyjęciem oferty konsument musi zostać poinformowany przez sprzedawcę lub usługodawcę o wszystkich poniższych sprawach.” Lista obejmuje m.in. nazwę, adres i telefon, cenę z podatkami, warunki odstąpienia, informację o wyłączeniu odstąpienia. Ust. 4: cena za okres rozliczeniowy przy subskrypcji · 2026-11-09 | Arkusz Apple i ekran zakupu pokazują cenę, okres, odnawianie i sposób anulowania (W1, `purchase.cancelInfo`, D-306). Dane sprzedawcy: jeśli obowiązek ma deweloper (4a), wraca ten sam problem co J2 w JP i 4d w VN (adres i telefon publicznie). Wymogi formy z art. 6 („en az on iki punto”, czyli co najmniej 12 punktów, „anlaşılabilir bir dilde”, czyli w zrozumiałym języku) dotyczą dokumentu informacyjnego. Czy obejmują ekran zakupu w aplikacji, `[DO USTALENIA]`. | ryzyko |
| 4c | Prawo odstąpienia (14 dni) i wyjątek dla treści cyfrowych | ustawa 6502 (https://www.resmigazete.gov.tr/eskiler/2013/11/20131128-1.htm, RG 28.11.2013, nr 28835) art. 48 ust. 4 · „Tüketici, on dört gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.” — tłum.: „Konsument może w ciągu 14 dni odstąpić od umowy bez podania przyczyny i bez kary umownej.” · rozporządzenie jw. art. 15 ust. 1 lit. ğ · „Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.” — tłum.: „[Prawo odstąpienia nie przysługuje przy] umowach o usługi wykonywane natychmiast drogą elektroniczną lub o dobra niematerialne dostarczane konsumentowi natychmiast.” · 2026-11-09 | Dostęp odblokowuje się natychmiast, więc wyjątek prawdopodobnie ma zastosowanie. Zwroty i tak obsługuje Apple (warunki zwrotów Apple nieprzeczytane, jak w `JP.md` 4d). Informacja o wyłączeniu odstąpienia jest wymagana (art. 5 ust. 1, 4b). Czy daje ją arkusz Apple, `[DO USTALENIA]`. | ryzyko (niskie) |
| 4d | Subskrypcja: automatyczne przedłużanie | ustawa 6502 jw. art. 52 ust. 3 · „Belirli süreli abonelik sözleşmelerine sözleşmenin belirlenen süre kadar uzayacağına ilişkin hükümler konulamaz; ancak abonelik sözleşmesinin kurulmasından sonra, sözleşmenin sona ereceği tarihe kadar tüketicinin talepte bulunması veya onay vermesi hâlinde abonelik sözleşmesi uzatı[labilir]” — tłum.: „Do umów abonamentowych na czas określony nie można wprowadzać postanowień o ich przedłużaniu o ten sam okres; umowę można jednak przedłużyć, jeśli po jej zawarciu, a przed dniem jej zakończenia, konsument o to wnosi albo się na to zgadza.” · 2026-11-09 | **Najważniejsze ryzyko TR.** Subskrypcja Apple odnawia się automatycznie bez osobnej zgody przed końcem okresu. Jeśli przepis obejmuje subskrypcje w App Store i dewelopera (4a), mechanizm odnawiania Apple mu nie odpowiada, a deweloper nie może go zmienić. Za kontrolą zastępczą przemawiają trzy rzeczy: (1) przepis w wersji z 2013 r. mógł zostać zmieniony albo doprecyzowany rozporządzeniem o umowach abonamentowych (nieprzeczytane, T1); (2) wszystkie aplikacje z subskrypcją w TR działają na tym samym mechanizmie, więc ryzyko jest systemowe, a nie nasze — **ocena**; (3) w TR jest dostępny plan bez odnawiania (dostęp dożywotni). | ryzyko → `[DO USTALENIA]` (T1) |
| 4e | Wypowiedzenie subskrypcji w każdej chwili | ustawa 6502 jw. art. 52 ust. 4 · „Tüketici, belirsiz süreli veya süresi bir yıldan daha uzun olan belirli süreli abonelik sözleşmesini herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin istediği zaman feshetme hakkına sahiptir.” — tłum.: „Konsument może w każdej chwili, bez podania przyczyny i bez kary umownej, wypowiedzieć umowę abonamentową na czas nieokreślony albo na czas określony dłuższy niż rok.” · 2026-11-09 | Plany trwają kwartał i rok, czyli nie dłużej niż rok. Anulowanie w ustawieniach Apple zatrzymuje odnowienie (zdanie W1). Ust. 5 (zwrot za resztę okresu, według raportu odczytu) dotyczy wypowiedzenia z ust. 4, więc przy planach ≤ 1 roku prawdopodobnie nie ma zastosowania. To **ocena**. | potwierdzone (dla planów ≤ 1 rok, wersja pierwotna) |
| 4f | Język | ustawa 6502 jw.: jedyny wymóg tureckiego (art. 55) dotyczy instrukcji i etykiet **towarów** („mallar”); w rozporządzeniu brak słowa „Türkçe” (`grep -i türkçe`: 0) · 2026-11-09 | Wymogu umowy po turecku w przeczytanych tekstach nie znaleziono. tr wchodzi do aplikacji w aktualizacjach (35 języków, D-292), nie w 1.0. | potwierdzone (w zakresie przeczytanych tekstów) |
| 5 | Ochrona danych | https://www.resmigazete.gov.tr/eskiler/2016/04/20160407-8.pdf (KVKK 6698, OCR) i https://www.kvkk.gov.tr/Icerik/2032/Veri-Sorumlusu-Kimdir · art. 3 ust. 1 lit. ı · „Veri sorumlusu: Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiyi” — tłum.: „Administrator danych to osoba fizyczna lub prawna, która określa cele i środki przetwarzania danych osobowych i odpowiada za utworzenie systemu ewidencji danych oraz zarządzanie nim.” · 2026-11-09 | Deweloper nie otrzymuje danych użytkowników (NFR-PRYW-001). E-mail od użytkownika z TR (D-307) to przetwarzanie danych. Obowiązki KVKK z tego tytułu, w tym rejestr VERBİS, są `[DO USTALENIA]`; ryzyko niskie. | ryzyko (niskie) |
| 6 | App Store 5.3.4, 5.3, 5.1.1(ix) | jak `US.md` wiersze 3a–3c | Bez zmian. OP-14 otwarte. | ryzyko (W3; OP-14) |
| 7 | Licencje lub rejestracja aplikacji i gier w TR | nie szukano (subagent nie zdążył, mevzuat niedostępny) | Brak przeczytanego źródła. W odróżnieniu od VN Apple nie ma pola licencji dla TR (strona „App information”, odczyt 2026-11-09: pola regionalne dla Chin, Wietnamu i Korei; „Turkey” ani „Türkiye” nie występują, `grep`: 0). | `[DO USTALENIA]` (ryzyko niskie) |

## Rekomendacja

**Włączyć TR warunkowo** (do akceptacji albo weta właściciela, D-295 pkt 2, D-301; zapis: D-317).

**Uzasadnienie:** kodeks karny definiuje hazard jako grę w celu zysku, w której zysk i strata zależą od losu (1a). Aplikacja nie ma ani zysku, ani straty. Przepisy o zakładach (3) dotyczą przyjmowania zakładów i zachęcania do nich, a aplikacja nie robi ani jednego, ani drugiego. W odróżnieniu od VN nie znaleziono wymogu licencji, spółki ani przedstawiciela w kraju. Ryzyka leżą w prawie konsumenckim (4b, 4d) i w tym, że czytane były wersje pierwotne.

**Warunki** (oprócz W1–W4 z `US.md`):
- **T1:** przed włączeniem storefrontu odczyt tekstów ujednoliconych z `mevzuat.gov.tr`:
  - 7258 art. 1–2 i 5;
  - 6502 art. 48 i 52;
  - rozporządzenie o umowach abonamentowych („Abonelik Sözleşmeleri Yönetmeliği”, jeśli obowiązuje);
  - 5237 art. 228.

  Odczyt robi sesja z innym dostępem sieciowym albo właściciel w przeglądarce, z adresem i datą. Jeśli art. 52 ust. 3 w wersji aktualnej obejmuje subskrypcje w App Store bez wyjątku, wraca to do decyzji: TR tylko z dostępem dożywotnim (dostępność planów per storefront w App Store Connect, `[DO USTALENIA]`) albo „nie teraz”.
- **T2:** dane sprzedawcy (4b) rozstrzygnięte razem z J2 (JP) i jednym zapisem dla wszystkich krajów.

**Odrzucone warianty:**
- **Włączyć bez warunków.** Tekst art. 52 ust. 3 z 2013 r. stoi w sprzeczności z automatycznym odnawianiem, a wersji aktualnej nie przeczytano.
- **Nie teraz.** Żaden przeczytany przepis karny nie obejmuje aplikacji. Ryzyko konsumenckie jest systemowe dla wszystkich subskrypcji w App Store w TR i da się je zamknąć odczytem (T1), bez kosztów. Rynek jest mały (33 oceny rocznie), więc koszt czekania też jest mały, ale nie ma powodu blokować kraju po T1.

**Otwarte:**
- tekst oficjalny 7258 (3);
- forma informacji z art. 6 rozporządzenia na ekranie aplikacji (4b);
- informacja o wyłączeniu odstąpienia w arkuszu Apple (4c);
- KVKK i VERBİS dla e-maili (5);
- licencje w TR (7);
- warunki zwrotów Apple.

## Kroki właściciela (czas)

1. Akceptacja albo weto rekomendacji (2 min).
2. T1: otwarcie 4–5 adresów w `mevzuat.gov.tr` w przeglądarce i zapis PDF-ów do sesji albo zgoda na sesję z innym dostępem (10–15 min).
