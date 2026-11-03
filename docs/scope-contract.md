# Kontrakt zakresu: Szkoła Pokera
Stan: E1 (2026-11-03): pętla główna, wymiary, wzorzec najlepszych, pominięcia; STOP na bramce E1 · Rola 03 build · Wejście: BRD `docs/brd/` (rola 01, E4), `docs/monetyzacja.md` (rola 02, sesja 2, E3), `docs/zalozenia.md` (ZAL-001–ZAL-012, ZAL-MON-01)

## E0: rama (2026-11-03)
Prompt: `node /home/user/prompts/tools/assemble.mjs 03-zakres --tryb build` (prompts c025063; moduły ciecie, inwentarz-funkcji, zmiany-zakresu), przeczytany od kontraktu roli; `zakres.mjs` wycięty z modułu `ciecie` bez zmian (scratchpad sesji).

**Środowisko:** jak w rolach 01 i 02 tej sesji (chmura Linux, Node, pnpm, push na gałąź roboczą; `itunes.apple.com` i `apps.apple.com` odpowiadają 2026-11-03; bez Maca, więc testy na telefonie robi właściciel). BRD jest w repo.

**Werdykt bramki opłacalności:** „budować” (słaby dowód), `docs/monetyzacja.md`. Model: drabina kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (decyzja właściciela, potwierdzona na bramce E2 roli 02, 2026-11-03).

**Wejście jako hipotezy:**
| ID | Treść (skrót) | Status | Skutek dla zakresu |
|---|---|---|---|
| H-01 / ZAL-005 | darmowa część z prawdziwą nauką zwiększa sprzedaż | hipoteza; zmiana podziału właściciela 2026-11-03: „Jedna dzienna pula” (`docs/monetyzacja.md`) | lekcje, pierwsze podejście do egzaminu, postęp i eksport darmowe; sesje ćwiczeń, powtórki, scenariusze i powtórne egzaminy z darmową pulą N dziennie (OP-11 w `docs/monetyzacja.md`), Pro bez limitu |
| H-02 / ZAL-001, ZAL-002 | jedna ścieżka dla wszystkich poziomów z oceną na starcie | hipoteza | F-01 w pętli |
| H-03 / ZAL-003, ZAL-004 | 35 języków, kolejność przeglądu według popytu | ZAL-003 częściowo potwierdzone | F-16; polityka języków to decyzja właściciela (CLAUDE.md) |
| H-04 / ZAL-002 | jedna aplikacja z modułami | hipoteza | podział w E2 |
| H-05 / ZAL-006 | postęp bez konta, eksport i import | hipoteza | F-14 |
| H-06, H-07 | trener AI, gra z botami: poza zakresem z warunkiem powrotu | decyzje właściciela W-04, W-07 | „NIE robimy”; kod trybu gry (`apps/mobile/src/features/play`) do decyzji ról 05 i 08 |
| H-08 | raport postępu za zgodą | hipoteza | bez BR; poza zakresem |
| H-09 / ZAL-011 | subskrypcja broni się aktualizacjami | hipoteza | plan aktualizacji treści to koszt utrzymania właściciela (E2) |
| ZAL-MON-01 | drabina kieruje do dożywotniego | hipoteza | bez wpływu na listę funkcji |

**Kandydaci** (każde z 35 BR w jednej funkcji; WTP i dowód z `docs/monetyzacja.md`, „Sesja 2, E1”; podłoga według wzorców roli):
| ID | Funkcja | Wymagania | WTP (dowód) | Podłoga | Darmowa / płatna |
|---|---|---|---|---|---|
| F-01 | Ocena poziomu i punkt startu | BR-ONB-001, BR-ONB-002, BR-ONB-003 | WTP-2 (R) | — | darmowa |
| F-02 | Pierwszy ekran: czym aplikacja jest | BR-ONB-004 | WTP-0 (B) | prawo: OG-07, NFR-ZGOD-002 | darmowa |
| F-03 | Kurs: lekcje w kolejności z ćwiczeniami (treść) | BR-KURS-001, BR-KURS-003, BR-KURS-004, BR-KURS-005 | WTP-1 (R) | — | darmowa (decyzja E2 roli 02) |
| F-04 | Test modułu do pominięcia znanych treści | BR-KURS-002 | WTP-2 (R) | — | pierwsze podejście darmowe, powtórne z puli |
| F-05 | Ocena zagrania i wyjaśnienie „dlaczego” | BR-CWI-001, BR-CWI-002 | WTP-1 (R) | bezpieczeństwo merytoryczne: RD-01–RD-08, RD-11 (bloker wydania) | w lekcji darmowa, w sesji z puli |
| F-06 | Szanse trafienia i ranking układów | BR-CWI-003, BR-CWI-007 | WTP-0 (B) | RD-04, RD-05 | darmowa |
| F-07 | Krótka sesja ćwiczeń, przerwanie bez straty | BR-CWI-004 | WTP-0 (R) | dane: postęp sesji | pula dzienna, Pro bez limitu |
| F-08 | Ćwiczenia ICM w turniejach | BR-CWI-005 | WTP-2 (B) | RD-09 | pula dzienna |
| F-09 | Plan rozdania: SPR i rozmiar geometryczny | BR-CWI-006 | WTP-2 (B) | RD-06, RD-07 | pula dzienna |
| F-10 | Powtórki rozłożone w czasie | BR-POW-001, BR-POW-002 | WTP-1 (R) | dane: historia powtórek | pula dzienna |
| F-11 | Lokalne przypomnienie za zgodą | BR-POW-003 | WTP-2 (R) | — | darmowa |
| F-12 | Scenariusz całego rozdania bez stosu | BR-SCN-001, BR-SCN-002, BR-SCN-003, BR-SCN-004 | WTP-1 (R) | prawo: OG-01, OG-02 | pula dzienna |
| F-13 | Zakup, przywracanie, anulowanie | BR-ZAK-001, BR-ZAK-002, BR-ZAK-003, BR-ZAK-004 | WTP-0 (B) | prawo: OG-06 | zawsze dostępne |
| F-14 | Eksport, import, usunięcie i zachowanie postępu | BR-DANE-001, BR-DANE-002, BR-DANE-003, BR-DANE-004 | — (dane nigdy płatne) | dane: odczyt / eksport / usunięcie | zawsze darmowe |
| F-15 | Pomoc przy problemie z hazardem | BR-POM-001, BR-POM-002 | WTP-0 (B) | bezpieczeństwo: RD-12 (reguła krytyczna) | zawsze darmowe |
| F-16 | Języki i zapis liczb | BR-JEZ-001, BR-JEZ-002 | WTP-2 (R) | — | darmowa |

Kontrola przypisania: 16 funkcji, 35 BR, każde raz (sprawdzi `zakres.mjs --brd` w E3).

**Kod istniejącej aplikacji** (ponowne użycie ocenia rola 05): `apps/mobile/src/features/` ma `advancement`, `drills`, `glossary`, `help`, `play`, `session`; trasa `diagnostics`. `play` (gra z botami) jest poza zakresem (W-07, H-07); `glossary` (słownik) nie ma własnego BR, a obsługuje BR-KURS-003 (termin przed użyciem) — przypisanie w E1.

**Plan i czas** (agent / oczekiwanie / właściciel):
- E1: pętla główna, wymiary pokrycia, wzorzec 2–3 najpopularniejszych aplikacji niszy (odczyt opisów, „Co nowego” i recenzji z dziś), pominięcia jako ER do roli 01. Agent ok. 1,5 h; właściciel: bramka (1 pytanie).
- E2: test zasady 18, ranking RICE w godzinach właściciela, co najmniej dwa warianty zakresu, podział na aplikacje (H-04), funkcje TEST. Agent ok. 1,5 h; właściciel: 2–3 pytania.
- E3: kontrakt, `zakres.mjs` z kodem 0, przekazanie do 04–08. Agent ok. 1 h; właściciel: bramka.

**Apetyt (odpowiedź właściciela 2026-11-03):** bez liczby godzin; zaangażowanie właściciela = kilka decyzji produktowych i testy na telefonie z listą kontrolną; resztę testuje i decyduje agent (`CLAUDE.md`, „Delegacja decyzji”). Linia cięcia w E2 wynika z zasady 18 i kosztu utrzymania, nie z czasu przeglądu właściciela.

**Pytanie o apetyt, zadane w E0 ( [OCENA] godzin właściciela: decyzje, testy na telefonie, przegląd wydań; metoda: 1–2 h na prostą funkcję, 4–8 h na funkcję z treścią albo zakupem; liczby doprecyzuje ranking w E2):**
- (a) ok. 25 h: pętla nauki i podłogi (F-01–F-07, F-13–F-16); płatna część to tylko sesje ćwiczeń, więc słaby argument „stałej wartości” dla subskrypcji (OG-05, RYZ-01).
- (b) ok. 40 h: jak (a) oraz powtórki (F-10) i scenariusze (F-12), czyli cała płatna część z decyzji E2 roli 02.
- (c) ok. 50 h: wszystko, także ICM (F-08), SPR (F-09) i przypomnienie (F-11).

## E1: główna praca i pętla (2026-11-03, szósta sesja)
Prompt: `assemble.mjs 03-zakres --tryb build` (prompts c025063), przeczytany w całości; `zakres.mjs` wycięty z modułu `ciecie` bez zmian (scratchpad). Proces decyzji przeczytany we wzorach (polecenie właściciela): Trening (`docs/monetyzacja.md:17-18` limit 5 dni w miesiącu, blokada tylko przy starcie nowej jednostki, dane zawsze dostępne; `docs/26-prosba-o-ocene.md` prośba o ocenę przed pierwszą blokadą limitu; `docs/34-wsparcie-i-opinie.md:13` kontakt przez `mailto`), Piekarz (`docs/scope-contract.md` i `docs/archiwum/scope-contract-2026-10-20-robocze.md`: E1 z tabelą wzorca, wymiarami, soczewkami, ER przed cięciem, D-041), Oczko (`docs/decyzje_biezace.md`: rejestr bieżący z datą, decyzje blokami).

### Główna praca i pętla główna
- **Główna praca:** J-01 „Kiedy gram rekreacyjnie […] chcę w krótkich sesjach ćwiczyć decyzje z wyjaśnieniem »dlaczego«, żeby grać pewniej i rzadziej popełniać drogie błędy” razem z J-02 (nauczyć się od zera) i J-03 (utrwalić odruchowo). J-04 (całe rozdanie) i J-05 (swój poziom) to kolejny krok i wejście tej samej pętli; J-06 (zachować postęp) to podłoga.
- **Pętla główna** (najkrótsza droga od uruchomienia do lepszej decyzji, powtarzana kilka razy w tygodniu): pierwszy ekran F-02 → ocena poziomu F-01 → lekcja z ćwiczeniem F-03 → ocena zagrania z „dlaczego” F-05 → krótka sesja F-07 → powtórki błędów F-10 → następna lekcja albo test modułu F-04. Wejście zaawansowanego: F-01 → F-04 (pominięcie) → F-07. Krok „sprawdź się”: scenariusz całego rozdania F-12.
- Poza linią pętli, z podłogą: F-13 (zakup), F-14 (dane), F-15 (pomoc, RD-12), F-06 (rachunek szans: RD-04, RD-05, używany w F-05). Do oceny w E2 (bez podłogi, poza linią): F-08 (ICM), F-09 (SPR), F-11 (przypomnienie), F-16 (języki: decyzja właściciela ZP-02, polityka z `CLAUDE.md`).

### Wzorzec najlepszych (odczyt 2026-11-03 ok. 20:49 UTC)
Źródła: `itunes.apple.com/lookup?id=…&country=us` i `itunes.apple.com/us/rss/customerreviews/page=1..3/id=…/sortby=mostrecent/json`; liczby i ID recenzji (bez treści): `docs/zakres/wzorzec-2026-11-03.json`. Kryterium wyboru (zapisane przed odczytem): ta sama praca (nauka decyzji z oceną), opis obejmuje co najmniej dwie części naszej pętli (lekcje, ćwiczenia z oceną i wyjaśnieniem, powtórka błędów, całe rozdanie), kolejność `userRatingCount`, średnia drugim kluczem; kandydaci z `docs/brd/dane/konkurencja-2026-11-03.json` (102 aplikacje). GTO Preflop – Texas Hold'em (2486 ocen) odpada: opis to tylko quiz z szybką oceną. Poker Skill (417) jako tło: najbliższy model (lekcje od zera, codzienna zagadka, 8 języków).

| Aplikacja (oceny, średnia, wersja) | W pętli głównej (opis) | Czego nie ma / celowo poza | Skargi i prośby (recenzje US, ID, data) |
|---|---|---|---|
| GTO Preflop Wizard Poker AI (3483; 4,76; 4.0 z 2026-10-27) | codzienny spersonalizowany quiz („Every day we generate a personalize quiz specifically targeting your strengths and weaknesses”), informacja zwrotna po sesji, analiza rąk, praca bez sieci, postęp, poziomy | lekcji od zera; postflopu; tablice wyników i gra z AI to dodatki | ściana płatności po ankiecie: „Long ah survey just to hit a pay wall” (14345129943, 2026-07-24), „Makes you take a 10 minute survey and then hits you with a ridiculous pay window” (13685624387, 2026-01-28); brak „dlaczego”: „doesn't tell you the why behind anything” (14179464867, 2026-06-13); sprzeczne odpowiedzi: „Some answers even contradict the provided charts” (13647171992, 2026-01-18); powtarzalność: „the same exercise over and over” (13214571273, 2025-10-02). Kategorie (76 recenzji, ≤ 3★ / wszystkie): płatność 21/23, błędna treść 11/12, ankieta 7/7 |
| Postflop+ GTO Poker Trainer (1982; 4,67; 4.11.1 z 2026-08-05) | ćwiczenia postflop z oceną „Perfect, OK, Mistake, or Blunder”, koszt błędu w EV, powtórzenie linii („replay any line to see why GTO chose it”), pełna praca bez sieci; darmowa pula: „includes free drills across all game types every day” | lekcji i wyjaśnień słowami (skarga 4★: „The only thing it’s missing … is an explanation for WHY”, 8836081104, 2022-07-03) | zbyt surowa ocena drugiego wyboru (9943067184, 2023-05-19); „Unreliable solver logic” (14250610266, 2026-07-01); dzienny limit nieczytelny: „They say they allow 20 FREE per day but that’s not true” (9097375600, 2022-09-18); zakup na nowym urządzeniu: „My subscription doesn’t show on my new iPad” (14186853651, 2026-06-15) |
| Poker Trainer – Learn Poker (1165; 4,74; 4.7.4 z 2026-10-19) | najpełniejsza zgodność z naszą pętlą: „Practice full hands”, „Clear explanations help you understand your mistakes”, plan według najsłabszych obszarów, „Daily Drills … revisit common mistakes over time with spaced repetition”, rachunek szans, samouczki; „No real-money gambling” | — (opis obejmuje wszystkie cztery części) | konfiguracja przed nauką: „I’m trying to learn but I’m spending most of the time figuring out how to set up my parameters” (14216952501, 2026-06-23); błędne zalecenia (14001432063, 2026-04-26); „You get a few hands, but if you want to sit for a bit and learn, expect to pay” (13501504393, 2025-12-11) |
| tło: Poker Skill – Learn Holdem (417; 4,74; 2.1.59 z 2026-11-03) | krótkie lekcje wokół decyzji, codzienna zagadka, „Every answer gets coaching”, serie, „No wagering. No real money.” | konto wymagane (logowanie) | limit energii: „you gain energy so slow and lose it so quickly. I can barely do a single lesson each day” (13757401533, 2026-02-16); płatność przed końcem pierwszej lekcji (13932381366, 2026-04-07); „I can’t skip to where my level is” (13735467525, 2026-02-10); logowanie nie działa (13749382199, 13641940226); pochwała treści i prośba o więcej lekcji (13955120339, 2026-04-13) |

Wnioski [OCENA; próba 186 najnowszych recenzji z 4 aplikacji, wzorce słów, bez ręcznej klasyfikacji każdej]:
1. Pętla „ćwiczenie z oceną → wyjaśnienie → powtórka błędów → całe rozdanie” jest standardem niszy (Poker Trainer ma wszystkie części). Wyróżnikiem nie jest liczba funkcji, tylko sposób: lekcje od zera i pierwszy egzamin za darmo, „dlaczego” z liczbami (F-05), poprawność treści (RD, rola 06), brak konta i sieci, 35 języków.
2. Najczęstsze skargi niskich ocen: sposób płatności (ściana po ankiecie, płatność przed pierwszą lekcją, niejasna pula) i błędna albo sprzeczna treść. Podłogi F-05 (RD-01–RD-11) i jawny licznik puli są przewagą, nie kosztem.
3. Dzienna darmowa pula to wzór rynkowy (Postflop+, Poker Skill), a skargi dotyczą puli za małej albo nieczytelnej: N ma pozwolić na pełną sesję dziennie (wartość w E2, OP-11).
4. Konfiguracja przed sesją to sygnał kombajnu: sesja F-07 startuje jednym ruchem z rozsądnym doborem zadań, bez ekranu ustawień treningu.
5. Lider z twardą ścianą płatności ma najwięcej ocen (3483): oceny to nie sprzedaż, ale ZAL-005 nie dostaje stąd potwierdzenia; status bez zmian (dopisany dowód przeciw).

### Wymiary pokrycia
| Wymiar | Wynik |
|---|---|
| Główna praca od początku do końca | pierwsze uruchomienie: F-02, F-01 (PR-01); pierwsza udana praca: lekcja z ćwiczeniem i oceną „dlaczego” (F-03, F-05); powrót: następna lekcja (BR-KURS-001), powtórki na dziś (PR-04), powrót w miejscu (BR-KURS-004, BR-CWI-004); po roku: scenariusze F-12, test modułu F-04, eksport przy zmianie telefonu F-14. Ekran powrotu „co dalej” (lekcja, powtórki, pula) nie ma osobnego BR: kroki pokrywają BR-KURS-001 i PR-04, kształt ekranu to rola 04 — licznik puli w ER-13 |
| Pominięcia (wzorzec, recenzje) | pętla opinii i zgłoszenie błędu w zadaniu: brak BR (ER-12); zasady dziennej puli: brak BR (ER-13); personalizacja „najsłabsze obszary”: pokrywa BR-POW-001 (błąd wraca wcześniej) i dobór sesji do poziomu (PR-03) — sprawdzone, bez ER; postęp i poziom w liczbach (Wizard, Postflop+ ELO): PR-02 „widzi postęp modułu” pokrywa krok pętli, ranking i ELO to grywalizacja spoza pracy — bez ER |
| Nadmiar (kod dziś: `apps/mobile/src/app/`) | 4 zakładki: Kurs (`(tabs)/index`), Powtórki (`review`: powtórki, „Trening na czas” `mode: 'speed'`, wejście do gry `play/review`), Reguły (`rules`: księga 142 reguł z wyszukiwarką, FR-06 starego PRD), Postęp (`progress`: wejścia do `diagnostics`, `glossary`, `help`); trasy `play/*` (gra z botami, poza zakresem W-07, H-07), `advancement` (wskaźnik zaawansowania z częścią „gra po trybie gry”, ADR-25), `diagnostics` (pomiar wydajności, narzędzie dewelopera). Sygnały: tryb „na czas” i księga reguł bez BR; pomoc przy hazardzie i słownik schowane w zakładce Postęp (ukryta droga wobec BR-POM-002 „zawsze pod ręką”); diagnostyka widoczna dla użytkownika. Propozycje w E2 (NIE albo przypisanie do BR przez ER), decyzja o kodzie: role 05 i 08 |
| Podłogi | bezpieczeństwo merytoryczne RD-01–RD-11 (F-05, F-06, F-08, F-09), reguła krytyczna RD-12 (F-15); dane F-14 (odczyt, eksport, import, usunięcie, migracja NFR-DANE-001); prawo OG-01, OG-02, OG-06, OG-07, NFR-ZGOD-001–003 (F-02, F-12, F-13). Sprawdzone, brak luk poza ER-13 (licznik puli dotyka danych: harmonogram powtórek przesunięty, nie skasowany) |
| Intuicyjność pierwszego użycia | do przesiewu w E2 przy każdej funkcji; ryzyka dziś: ocena poziomu jako długa ankieta (skargi u lidera: 7 z 7 recenzji o ankiecie ≤ 3★) — BR-ONB-001 „do pominięcia” i bez ekranu zakupu na końcu; „Trening na czas” i „Reguły” bez nazwy pracy użytkownika; pula: licznik przed startem, nie w trakcie |
| Wartość | WTP i poziom dowodu z roli 02 (tabela E0); wzorzec potwierdza R dla F-05, F-07, F-10, F-12 (wszystkie trzy aplikacje) i F-01 (skarga „can’t skip”); sygnały użycia bez telemetrii: tylko recenzje i App Store Connect |
| Koszt właściciela przez lata | każdy tekst × 35 języków (NFR-JEZ-001) to koszt tłumaczenia i przeglądu (rola 09); treść merytoryczna (lekcje, scenariusze, ICM, SPR) czeka na rejestr twierdzeń roli 06; plan aktualizacji treści dla OG-05 (H-09; prośba o więcej lekcji u Poker Skill, 13955120339) do E2; testy na telefonie: zakup i przywracanie (6 scenariuszy z kontraktu płatności), przypomnienie (zgoda), pomoc (telefon), eksport i import |
| Zależności i blokery | blokery wydania z `docs/brd/README.md` należą do F-05, F-13, F-14, F-15 i F-02; F-07, F-10, F-12, F-04 zależą od reguł puli (ER-13); F-15 od numerów pomocy dla wszystkich storefrontów poza PL (BRD OP-10, rola 06); E2E na `main` wyłączony 20.10 (rola 07) |
| Podział na aplikacje | H-04: sygnał dwóch person (P-2 od zera, P-3 teoria) i turniejów (M11, F-08); wzorzec: wszystkie trzy aplikacje obsługują początkujących i zaawansowanych w jednej aplikacji (opisy: „Whether you're a beginner or a seasoned player” — Wizard; „whether you're a beginner or an experienced player” — Poker Trainer); OG-09 i 4.3(a) za jedną aplikacją. Opcje w E2 |

### Soczewki
- **Nowy użytkownik w pierwszych minutach:** po pierwszym ekranie (F-02) widzi krótką ocenę z „pomiń”; po niej pierwszą lekcję, nie ekran zakupu (u lidera to główna skarga). Pierwsza ocena zagrania z „dlaczego” musi paść w pierwszej lekcji (F-03 → F-05), bez zakładania konta i bez ustawień.
- **Pasjonat po roku:** chce od razu sesji z najsłabszych obszarów i scenariuszy (F-07, F-10, F-12), pominięcia znanych modułów (F-04) i ICM w turniejach (F-08); nie potrzebuje rankingów ani ELO. Dla niego limit puli jest głównym powodem zakupu.
- **Najlepsza aplikacja niszy (Poker Trainer):** pętla ćwiczenie → wyjaśnienie → powtórka → całe rozdanie; celowo bez gry na pieniądze. Skargi na konfigurację treningu i błędne zalecenia pokazują, gdzie można być lepszym bez dokładania funkcji.
- **Właściciel jako jedyny opiekun:** koszt to 35 języków, treść ze źródłami i testy płatności na telefonie; funkcje treściowe (F-08, F-09, scenariusze F-12) mnożą przegląd. Kod spoza zakresu (gra z botami, tryb „na czas”, księga reguł, diagnostyka) to koszt utrzymania bez BR.

### Pominięcia → ER dla roli 01 (rola 03 nie dopisuje BR)
| ER | Brak | Dowód | Dotyczy |
|---|---|---|---|
| ER-12 | pętla opinii: systemowa prośba o ocenę po zakończonej pracy (w limitach API, przed pierwszym wyczerpaniem puli), link „Oceń” (`action=write-review`), kontakt bez śledzenia (`mailto`) i „zgłoś błąd w zadaniu” z identyfikatorem zadania | polecenie roli 03 (E2 pkt 6: domyślnie w wersji 1); Trening `docs/26-prosba-o-ocene.md` (prośba przed pierwszą blokadą limitu) i `docs/34-wsparcie-i-opinie.md:13`; Piekarz ER-44; skargi na błędną treść: 19 z 21 dopasowań to recenzje ≤ 3★ (`docs/zakres/wzorzec-2026-11-03.json`) | nowa funkcja (F-17 w E2), rola 11; NFR-PRYW-001 |
| ER-13 | zasady dziennej puli jako BR z kryteriami: jednostka puli, licznik widoczny przed startem, co nie zużywa puli (lekcje, pierwsze podejście do egzaminu, eksport, import, przegląd historii), rozpoczęta sesja albo scenariusz kończy się bez przerwania, odnowienie (godzina, strefa), powtórka zablokowana przesuwa harmonogram bez utraty, Pro bez limitu | decyzja właściciela 2026-11-03 („Jedna dzienna pula”); kontrakt płatności roli 02 (`docs/monetyzacja.md`, tabela PR-03–PR-05); Trening `docs/monetyzacja.md:18` („Blokada dotyczy tylko startu”); skargi: 13757401533, 9097375600 | F-07, F-10, F-12, F-04, F-13; rola 05 (OP-10) |

### Sprzeczności z wejściem
- ZAL-005 (H-01): dopisany dowód przeciw w części (lider z twardą ścianą płatności ma najwięcej ocen); status „hipoteza” bez zmian, wpis w `docs/zalozenia.md`.
- Bez innych sprzeczności: ZAL-002 (jedna ścieżka dla wszystkich poziomów) i ZAL-010 (krótkie sesje) mają wsparcie we wzorcu (opisy Wizard i Poker Trainer; „quick” sesje), nadal bez rozmów z graczami (OP-01).

### Plan dalej
- Rekomendacja na bramce (analogia: Piekarz D-041 „najpierw BR dla ER przed cięciem”): rola 01 w trybie `fix` dopisuje BR dla ER-12 i ER-13 w tej samej gałęzi, potem E2. Czas agenta ok. 1 h (BR, wektory, `kontrola-brd.mjs` z kodem 0); właściciel: brak pytań.
- E2: test zasady 18, ranking, warianty, podział H-04, wartość N (OP-11), los kodu spoza zakresu. Agent ok. 2 h; właściciel: wybór wariantu (1 pytanie, reszta według delegacji).
