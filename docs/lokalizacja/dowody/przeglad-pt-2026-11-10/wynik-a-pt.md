# Kontrola (a) treści krytycznej pt-PT: porównanie sensu przekładu zwrotnego z oryginałem (2026-11-10)

Wejście: `a-zwrotny-pt-pl.md` (przekład pt → pl wykonany bez wglądu w oryginał). Oryginały: `content/pl/lessons/m12-l1-wariancja.md`, `content/pl/lessons/m12-l4-bankroll.md`, `content/pl/exams/m12.yaml`, `content/helplines.yaml` (brak `content/pl/helplines.yaml`), `content/pl/rules.yaml` (R-M12-001…009, 011, 012). Przy wątpliwościach sprawdzono tekst pt w `content/pt/`.

Porównano: zalecenie, kierunek, granice („najwyżej/najpóźniej/co najmniej/najwcześniej/dopiero”), liczby i znaczniki `{{n:}}`, adresy, podmiot. Różnice stylu („limit/poziom” zamiast „stawka”, „rozdanie” zamiast „ręka”, forma grzecznościowa, etykiety `{{t:}}` po portugalsku) pominięte.

## Zakres i liczby jednostek

| Plik | Jednostki | Zgodne | Rozbieżne |
|---|---|---|---|
| m12-l1-wariancja.md | 10 ćwiczeń (prompt, opcje, why) + treść lekcji (7 akapitów/bloków, tabela, ramka, stopka) = 18 | 18 | 0 |
| m12-l4-bankroll.md | 13 ćwiczeń + generator słownictwa + treść lekcji (6 akapitów/bloków, tabela, ramka) = 22 | 21 | 1 |
| exams/m12.yaml | 10 pytań | 10 | 0 |
| helplines.yaml | pointer, fallback.text, regions_label, wpis int-gambling-therapy (name, info, link, 3 cytaty źródeł) = 4 | 4 | 0 |
| rules.yaml R-M12-* | 11 reguł (if/then/because/source) | 10 | 1 |
| **Razem** | **65** | **63** | **2** |

Znaczniki `{{n:…}}`: komplet i te same klucze we wszystkich jednostkach (sprawdzone pozycja po pozycji, także w tabelach RoR i downswingów). Adres `https://www.gamblingtherapy.org/` i cytaty źródeł bez zmian. Liczby jawne (2 ×, e^, 1,96 × 80 ÷ 2, 615 tys., 3bb/100, 30 wpisowych, „2 z 3”, „sto razy”, „dwa/trzy/cztery razy”) zgodne.

## Rozbieżności

| plik:linia | waga | oryginał | zwrot | tekst pt | propozycja pt |
|---|---|---|---|---|---|
| content/pt/lessons/m12-l4-bankroll.md:59 (pl:59, q-stay, opcja 2, why) | ŚR | „Zejście wcześniej niż przy połowie bankrollu nie jest błędem, a później już tak.” | „…ale zejście później już jest. [DWUZNACZNE: orzecznik domyślny]” | „Descer antes de chegar a metade do bankroll não é um erro, mas descer depois já é.” | „Descer antes de o bankroll chegar à metade não é um erro, mas descer só depois disso já é um erro.” |
| content/pt/rules.yaml:989 (pl:989, R-M12-005 because) | ŚR | „najlepszy 1% wyprzedza najsłabszy 1% w ok. 75% przypadków **dopiero po** ok. 1500 rękach” | „najlepsze 1% wyprzedza najgorsze 1% **tylko** w około 75% przypadków po około 1500 rozdaniach” | „só ficam à frente dos piores … em cerca de {{n:skill.ahead}} dos casos após cerca de {{n:skill.hands}} mãos” | „só ao fim de cerca de {{n:skill.hands}} mãos ficam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} dos casos” |

Uzasadnienie wag:
- q-stay: odczyt główny pt („descer depois já é [um erro]”) jest zgodny z oryginałem; elipsa jest naturalna po portugalsku, a odczyt „zejście później jest w porządku” wymaga dopowiedzenia orzecznika, którego zdanie nie podsuwa. Ponieważ to granica „najpóźniej przy połowie” w treści o bankrollu, doprecyzowanie jest wskazane, ale nie blokuje (ŚR). Przy okazji „chegar a metade” → „chegar à metade”.
- R-M12-005: twierdzenie pt („po ok. 1500 rękach najlepszy 1% prowadzi w ok. 75%”) jest prawdziwe względem źródła (van Loon i in. 2015), a wniosek reguły (nie zmieniaj strategii po kilku sesjach) zachowany. Osłabiona jest granica „dopiero po” (minimalna próba), a „só” przesuwa akcent na odsetek. ŚR.

## Rozstrzygnięcia miejsc DWUZNACZNE

| Miejsce (zwrot) | Tekst pt | Rozstrzygnięcie |
|---|---|---|
| l1 q-dd-meaning, opcja 1: „revê” | „…revê as decisões nas mãos perdidas” | Oba odczyty (polecenie „przejrzyj” / opis „przeglądasz”) dają to samo zalecenie co oryginał („przeglądasz decyzje”). Brak sprzeczności, bez poprawki. |
| l4 q-move-down, opcja 1: „Desce” | „Desce um limite” | Polecenie i opis to ta sama decyzja co oryginał („schodzisz o jedną stawkę niżej”). Bez poprawki. |
| l4 q-stay, opcja 1: „Fica… e revê” | jw. | Jak wyżej, zgodne z „zostajesz… i przeglądasz”. Bez poprawki. |
| l4 q-stay, opcja 2: „descer depois já é” | „…não é um erro, mas descer depois já é.” | Odczyt sprzeczny (zejście po połowie „w porządku”) gramatycznie mało prawdopodobny, ale dotyczy granicy „najpóźniej”. Poprawka ŚR (tabela wyżej). |
| l4 q-losing: „lhe” w prompcie | „O que é que isso lhe dá?” | Podmiotem pytania jest „Um jogador” z poprzedniego zdania; odczyt „tobie” nie zmienia odpowiedzi (przegrywający gracz, kimkolwiek jest, traci bankroll). Brak sprzeczności, bez poprawki. |
| l4 q-losing, opcja 2: „Protege-o” | „Protege-o da bancarrota” | Jw.; to opcja błędna, wyjaśnienie mówi o „um jogador perdedor”. Bez poprawki. |
| l4 q-losing, opcja 3: „Permite-lhe” | „Permite-lhe jogar limites mais altos” | Jw. Bez poprawki. |
| egzamin q2, opcja 3: „Calcula” | „Calcula … ≈ ± …” | Polecenie lub opis rachunku; ten sam rachunek co oryginał („Liczysz”). Bez poprawki. |
| egzamin q4, opcja 1: „avalia” | „avalia as novas jogadas na revisão de mãos” | Zgodne z „nowe zagrania oceniasz w przeglądzie rozdań” w obu odczytach. Bez poprawki. |
| egzamin q7, opcja 3: „Termina” | „Termina a sessão.” | Zgodne z „Kończysz sesję” w obu odczytach. Bez poprawki. |
| egzamin q9, opcja 2: „Calcula-o” | „Calcula-o a partir do bankroll que o próprio definiu.” | Zgodne z „Liczysz go od bankrollu, który sam założyłeś”; granica „najpóźniej przy {{n:exam.m12.md.half}}” zachowana („o mais tardar”). Bez poprawki. |
| helplines pointer: „Encontra” | „Encontra o mesmo contacto na aplicação, no ecrã «Ajuda».” | Opis/polecenie, ta sama informacja. Bez poprawki. |
| helplines: „o jogo” (fallback.text, info) | „um problema com o jogo”, „afetada pelo jogo” | W pt-PT „jogo” w tym zestawieniu to utrwalone określenie hazardu (por. „jogo patológico”, „Regime Jurídico dos Jogos e Apostas Online”); kontekst (lekarz, specjalista zdrowia psychicznego, Gambling Therapy) wyklucza odczyt „gry” w sensie rozrywki. Zgodne z oryginałem („problem z hazardem”), bez poprawki. |
| R-M12-011 source: „com o bankroll completo” | „(com 3bb/100, descer aos 30 buy-ins, ou seja, com o bankroll completo)” | Ta sama konstrukcja co oryginał („czyli przy pełnym bankrollu”): próg zejścia równy pełnemu bankrollowi. Pole `source` to opis źródła, zalecenie reguły (then: „o mais tardar” przy połowie, „o mais cedo” powrót) zgodne. Bez poprawki. |

## Uwagi bez wagi (zgodne sensem, odnotowane)

- l1 q-dd-wr-low: „częściej niż w co drugiej próbce” → „w ponad połowie prób”: równoważne.
- l4 treść i q-stay: „już po stracie {{n:dd.bi.small}}” → „logo após perder” („zaraz po stracie”): ta sama granica.
- l4 treść: „Wracasz wyżej najwcześniej wtedy” → „Só volta a subir quando” („dopiero wtedy”): ta sama granica; R-M12-011 then ma „o mais cedo”.
- R-M12-006 because: „gdy tilt urośnie” → „quando o tilt cresce”: kierunek ten sam.
- helplines fallback: kolejność „ty albo ktoś, kogo znasz” rozbita na dwa człony; zakres i polecenie („od razu dzwoń na lokalny numer alarmowy”) zgodne.

## Werdykt

Wagi: KRYT 0, WYS 0, ŚR 2, NISKIE 0. **ZALICZONA** (0 KRYT i 0 WYS). Poprawki ŚR (2) w `poprawki-A.json`; unikalność `stary` sprawdzona skryptem node (każdy fragment występuje w pliku docelowym dokładnie raz).
