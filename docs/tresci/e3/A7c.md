# E3, A7c: przegląd zastępczy D-027 (14 twierdzeń KRYTYCZNYCH)

Odczyt 2026-11-04, bieżąca wersja repo (commit 5dd8e3d). Przeglądałem od zera. Wszystkie 19 źródeł pobrałem bezpośrednio (HTTP 200), więc kopia archive.org nie była potrzebna. Każdy cytat z rejestru znalazłem w surowym tekście źródła przez `grep -F` po normalizacji. Wyjątek to opis Gambling Therapy (H-INT-1): jest w metadanych strony (JSON-LD `description`), a w widocznej treści stoi wariant „a global service offered by Gordon Moody, providing free practical advice and emotional support to anyone affected by gambling”. Rachunki policzyłem sam (`python3 -I`, bez kodu projektu): wzór RoR, Monte Carlo ruiny i Monte Carlo downswingów.

## Liczby werdyktów

| | POPARTE | CZĘŚCIOWO | NIEPOPARTE | SPRZECZNE | DO SPRAWDZENIA |
|---|---|---|---|---|---|
| Źródło | 14 | 0 | 0 | 0 | 0 |
| Tekst | 11 | 3 | 0 | 0 | 0 |

Przegląd zastępczy zaliczony: 11. Niezaliczony: 3 (R-M12-009, R-M12-010, R-M12-011, wszystkie z powodu tekstu ze skutkiem S3). Nie znalazłem żadnego S1 ani S2.

## Werdykty inne niż POPARTE (tekst)

### R-M12-009, CZĘŚCIOWO, S3
- `content/pl/exams/m12.yaml:74`: ryzyko utraty całego bankrollu 8,2% (40 wpisowych, 2bb/100) tekst nazywa „niewielkie, ale nie zerowe”. To uspokajanie. PrimeDope liczy wymagania bankrollu przy 5% ryzyka, a o 12,5% pisze, że to więcej, niż zaleca ostrożne zarządzanie bankrollem. Poprawka: „ok. 8,2%: wyraźnie większe od zera”, bez słowa „niewielkie”.

### R-M12-010, CZĘŚCIOWO, S3
- `m12-l4-bankroll.md:135`, zdanie „Rachunek pokazuje, skąd ta różnica: wszystko zależy od winrate”. Wymagana liczba wpisowych zależy też od SD i od przyjętego ryzyka: PrimeDope podaje liczby „at a 5% risk of ruin”, a PokerListings rozróżnia live i online przez wariancję. Poprawka: „najwięcej zależy od winrate (także od odchylenia i ryzyka, jakie akceptujesz)”.
- `m12-l4-bankroll.md:135`, „do ponad {{n:br.bi.src-high}}”. Źródło mówi „100+ buy-ins”, czyli 100 lub więcej. Poprawka: „do {{n:br.bi.src-high}} i więcej”.
- `m12-l4-bankroll.md:41`, „więc taki bankroll szybko by się skończył”. Downswing liczy się od szczytu, a ruina od startu, więc ten wniosek nie wynika wprost. Mój rachunek ruiny z 10 wpisowych w ciągu 100 tys. rąk (SD 80): ok. 21% przy 5bb/100, 36% przy 3bb/100 i 58% przy 1bb/100. Ryzyko jest duże, ale nie pewne. Przesada idzie w stronę ostrożności. Poprawka: „taki bankroll łatwo stracić”.
- `content/pl/exams/m12.yaml:93`, „downswingi o wiele wpisowych zdarzają się każdemu”. Lekcje mówią „prawie każdemu wygrywającemu”. Poprawka: „prawie każdemu”.

### R-M12-011, CZĘŚCIOWO, S3
- `m12-l4-bankroll.md:49` (q-move-down), „Przy tylu wpisowych ryzyko utraty reszty jest kilka razy większe niż przy 30”. W zadaniu nie podano winrate. Stosunek RoR przy 14 i przy 30 wpisowych (SD 80) wynosi 4,5× przy 3bb/100, 2,7× przy 2bb/100 i tylko 1,65× przy 1bb/100, czyli przy typowym winrate. Poprawka: podać warunek, np. „przy {{n:var.wr.typical.high}}: ok. {{n:ror.half}} zamiast {{n:ror.base}}”.
- `m12-l4-bankroll.md:49`, `m12-l4-bankroll.md:142`, `content/pl/exams/m12.yaml:82`, „na niższej stawce te same pieniądze to znów (są) pełny(m) bankroll(em)”. Przy stawce dwa razy niższej (taki stosunek przyjmuje sama lekcja w `q-move-up`, l4:65–67) zostaje 14 → 28 < 30 albo 24 → 48 < 50. To prawie pełny bankroll, a nie pełny. Zdanie lekko uspokaja i jest sprzeczne z rachunkiem z l4:67 („30 to tam 15, czyli dokładnie próg”). Poprawka: „znów prawie pełny bankroll”.

Sam przekaz reguł R-M12-009/010/011 się zgadza ze źródłami: wzór, 50 i 30 wpisowych, zejście najpóźniej przy połowie, zejście wcześniej po stracie 10 wpisowych. Rozbieżności dotyczą pojedynczych zdań w plikach użycia.

## DO SPRAWDZENIA

Brak.

## Sprawdzenia (a)–(d)

- (a) Numery cyfra po cyfrze ze strony operatora albo urzędu: 999 (NHS England, gov.scot, CAV UHB, nidirect), 111 i „press OPTION 2” (nhs.uk, mygov.scot, gov.wales), 1-866-355-5550 (gnb.ca). Każdy element wpisów `gb-999`, `gb-111`, `ca-nb` i `int-gambling-therapy` (name, phone, hours, info, links, regions) ma pokrycie w przeczytanym źródle. Jak pokryłem trzy elementy, które same nie są cytatem:
  - „Wielka Brytania” przy Gordon Moody: stopka strony, „Registered charity in England and Wales”.
  - „poufnie”: „Confidential, safe and delivered online”, choć na stronie ten zwrot dotyczy sesji online.
  - „(także hazard)” w CA-NB: linia jest na stronie usług „for substance use and gambling”.
  - Numer 1-800-461-1234 z twierdzenia H-CA-9 (cytat NBLGC znaleziony) nie występuje we wpisie, więc aplikacja mówi mniej niż twierdzenie. To nie jest rozbieżność.
- (b) Wpisy pomocy nie mówią więcej niż źródła. Ramka M12-L4 wymienia 5 sygnałów, każdy ma pokrycie (Vic, MedlinePlus/APA, NHS; „chasing losses” też w NHS).
- (c) Uwaga albo odesłanie jest widoczne we wszystkich czterech plikach:
  - M12-L1:140: „To ogólne wskazówki… ekranu „Pomoc””.
  - M12-L3:132–134: odesłanie do karty odpowiedzialnej gry.
  - M12-L4:148–153: ramka z `{{helplines}}` i odesłaniem do „Pomoc”.
  - Egzamin M12, q9 i q10: „To ogólna wskazówka… „Pomoc””. Uwaga stoi tylko w wyjaśnieniu poprawnej odpowiedzi, więc kto wybierze błędną, jej nie zobaczy. Zostawiam to rolom 08/04 jako sprawę UX, nie jako rozbieżność.
- (d) W `content/pl`, `pl.json` i `help.tsx` nie ma numerów pomocy wpisanych ręcznie (grep 999/111/112/911/988/1-8xx/08xx/116). Ekran „Pomoc” pokazuje wpisy z `helplines.generated.ts` (zgodne z yaml dla 4 sprawdzanych wpisów). Teksty `help.intro` („Poker na pieniądze to gra hazardowa…”; art. 1 ust. 2 u.g.h.: gry w karty to gry hazardowe), `fallback.text` i `checkedText` niczego nie obiecują.

## Rachunki niezależne

| Wielkość | Mój wynik | W aplikacji |
|---|---|---|
| RoR 30 wpisowych, 3bb/100 | 6,01% | 6% |
| RoR 15 wpisowych, 3bb/100 | 24,51% | 25% |
| RoR 30 wpisowych, 1bb/100 | 39,16% | 39% |
| RoR 50 wpisowych, 1bb/100 | 20,96% | 21% |
| RoR 30 wpisowych, 5bb/100 | 0,92% | 0,9% |
| RoR 40 wpisowych, 2bb/100 | 8,21% | 8,2% |
| MC ruiny 30 wpisowych, 3bb/100 (bloki po 100 rąk) | 6,2% | wzór 6,0% |
| Downswing ≥ 10 wpisowych w 100 tys. rąk, 5bb/100 | 95,1% | 95% |
| Downswing ≥ 10 wpisowych w 20 tys. rąk, 5bb/100 | 39,8% | 40% |
| Downswing ≥ 10 wpisowych w 100 tys. rąk, 2bb/100 | 99,2% | 99% |

Pozostałe rachunki z plików: egzamin q9 (25 i 24) i q10 (2000 / 1200 zł) się zgadzają.

## Problemy spoza listy (do wiadomości autora)

- „Downswing o 10 wpisowych zdarza się prawie każdemu wygrywającemu” (l4:41, l1:83, R-M12-011 `because`) i „trafia ok. 95% wygrywających” (l4:58, l1:84). Liczba 95% jest liczona przy 5bb/100. Przy typowym winrate 1–3bb/100 mój wynik to 98–99,5%, przy 8bb/100 82%, a przy 10bb/100 70%. Dla typowych wygrywających zdanie jest prawdziwe, dla bardzo silnych przesadza. Nie uznałem tego za rozbieżność.
- H-GB-7: nazwa „NHS 111” w Szkocji to formalnie „NHS 24 on 111” (mygov.scot). Numer i opcja są poprawne. Nie uznałem tego za rozbieżność.
- `t:bankroll` nie jest nigdzie oznaczony znacznikiem `{{t:bankroll}}`. Definicja w l4:113 jest wpisana tekstem, a pojęcie pojawia się wcześniej w M12-L3 („lekcja o bankrollu”), z opisem w tym samym zdaniu.
- W pobranych stronach nie znalazłem instrukcji skierowanych do agenta.
