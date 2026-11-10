# Wymagania: scenariusze z generatorem, poziom, ocena „dlaczego”, ekran główny
Stan: 2026-11-10 · Rola 03 build (sesja BD, na polecenie koordynatora, decyzje właściciela KO-035…KO-041) · Uzupełnia `wymagania-nauka.md` (SCN) · Przepływy: PR-05 (scenariusz), PR-03 (sesja ćwiczeń), PR-02 (kurs) w `wymagania.md`

Wymagania dopisane przez rolę 03 na polecenie koordynatora (zadanie BD-2), bo decyzje właściciela z 10.11 zmieniają kształt F-12 i ekranu głównego, a BRD roli 01 ich nie ma. Rola 01 przegląda je w trybie `fix` (ER-14, ER-15 w `errata.md`). Kryteria w Gherkinie po polsku jak w `wymagania-nauka.md`. Liczby bez źródła mają znacznik [OCENA] z metodą; decyzje agenta D-530…D-536 w `docs/decyzje.md` (do weta). *Dlaczego osobny plik:* kontrakt zakresu (`zakres.mjs --brd`) czyta wszystkie pliki `docs/brd/*.md`, a zmiana jednego bloku nie miesza się z wymaganiami E3.

Słownik tego pliku (jedna nazwa na pojęcie):
- **szablon** — opis jednej sytuacji scenariusza całego rozdania (pola w BR-SZB-001); pisze go rola 06, ze źródłem każdej oceny;
- **wariant** — jedno rozegranie szablonu: szablon + poziom + ziarno losowania; wszystkie karty wariantu są ustalone przy jego starcie;
- **odcisk wariantu** — to, po czym użytkownik rozpoznaje „to samo rozdanie”: szablon, poziom, ręka gracza jako klasa (np. AKs, 77), rangi kart stołu i ich wzór kolorów (bez konkretnych kolorów); dwa warianty różniące się tylko permutacją kolorów mają ten sam odcisk (`permuteSituation`, `packages/poker-core/src/situation.ts:66-79`);
- **granice losowania** — warunki szablonu, w których poprawna decyzja w każdym punkcie decyzji się nie zmienia.

## Szablon scenariusza (SZB)

### BR-SZB-001: Szablon opisuje sytuację, a nie jedno rozdanie
- Przepływ: PR-05
- Dowód potrzeby: KO-038 (właściciel: „Musimy mieć wiele wariantów tych scenariuszy. Żeby się nie powtarzało.”); J-04
- Zależy od: ZAL-012, ZAL-013
- Pola szablonu (wszystkie wymagane, poza oznaczonymi): `id`; `modul` (M2–M11); `sytuacja` (jedno zdanie dla użytkownika, np. „Otwierasz z Buttona, duży blind broni”); `stol` (6-max albo 9-max) i `pozycje` (gracz i rywal); `stosy` jako głębokość w bb bez wartości do wygrania (BR-SCN-002); `typRywala` (opcjonalnie; tylko z regułą `exploit` z populacją, ADR-24 szczebel 5); `liniaRywala` (akcja rywala w każdym punkcie, zależna od akcji gracza, D-109); `punktyDecyzji` (ulica, akcje z oceną, reguła albo rachunek, który ocenę rozstrzyga); `granice` (dla każdego poziomu: z czego losuje ręka gracza, ręka rywala i stół, warunki odrzucenia); `poziomy` (które z łatwy / średni / trudny szablon ma); `wyjasnienia` według BR-OCE-001 i BR-OCE-002.
- Kryteria akceptacji:
  - Scenariusz: Kompletny szablon przechodzi budowanie treści
    - Zakładając, że szablon ma wszystkie pola wymagane i każdy punkt decyzji wskazuje regułę z `rules.yaml` albo rachunek z `numbers.yaml`
    - Gdy uruchomię `pnpm content:build`
    - Wtedy szablon trafia do bazy treści bez błędu
  - Scenariusz: Szablon bez źródła oceny
    - Zakładając, że punkt decyzji szablonu nie wskazuje ani reguły, ani rachunku
    - Gdy uruchomię `pnpm content:build`
    - Wtedy budowanie kończy się błędem z `id` szablonu i numerem punktu decyzji (RD-11, ADR-24: „Czego nie da się przeczytać, to nie trafia do aplikacji”)
  - Scenariusz: Stos bez wartości
    - Zakładając, że szablon podaje głębokość stosu
    - Gdy użytkownik rozgrywa wariant
    - Wtedy widzi głębokość w bb przy pozycjach, a nie widzi salda, wygranej ani stosu przenoszonego do kolejnego wariantu (BR-SCN-002)

### BR-SZB-002: Zestaw szablonów w 1.0
- Przepływ: PR-05
- Dowód potrzeby: KO-037 (właściciel: „1.0 z pełnym zestawem”, ok. 30–40, 2–3 na moduł, od prostych do trudnych)
- Liczba: najmniej 30 szablonów, najwyżej 40; każdy moduł M2–M11 ma najmniej 2 szablony; każdy szablon ma poziom łatwy i co najmniej jeden z dwóch pozostałych; najmniej 10 szablonów ma wszystkie trzy poziomy [OCENA: 1/3 zestawu, żeby przełącznik poziomu działał w każdym module, w którym ma sens]. Rozkład: `docs/zakres/scenariusze-plan.md` §2.
- Kryteria akceptacji:
  - Scenariusz: Kontrola zestawu
    - Zakładając, że baza treści pl jest zbudowana
    - Gdy test zestawu policzy szablony
    - Wtedy jest ich od 30 do 40, każdy moduł M2–M11 ma co najmniej 2, a co najmniej 10 ma trzy poziomy
  - Scenariusz: Moduł bez szablonów
    - Zakładając, że użytkownik ukończył moduł, który nie ma szablonu (M0, M1, M12, M13)
    - Gdy otworzy scenariusze
    - Wtedy widzi szablony modułów, które ukończył albo do których ma dostęp, bez pustej pozycji dla tych modułów

## Generator wariantów (GEN)

### BR-GEN-001: Wariant ustalony przy starcie; powtórka i wznowienie bez zmian
- Przepływ: PR-05
- Dowód potrzeby: KO-038; BR-SCN-001 i BR-SCN-004 (intencja: rozstrzygnięcie nie zależy od losu po decyzji, OG-02); ER-14
- Zależy od: ZAL-012
- Kryteria akceptacji:
  - Scenariusz: Wszystkie karty ustalone przed pierwszą decyzją
    - Zakładając, że użytkownik startuje nowy wariant
    - Gdy generator utworzy wariant
    - Wtedy ręka gracza, ręka rywala i pięć kart stołu są ustalone i zapisane razem z ziarnem, zanim użytkownik podejmie pierwszą decyzję
  - Scenariusz: Wznowienie przerwanego wariantu
    - Zakładając, że użytkownik jest przy decyzji na turnie
    - Gdy zamknie aplikację i otworzy ją ponownie
    - Wtedy wraca do tej samej decyzji tego samego wariantu, z tymi samymi kartami
  - Scenariusz: „Zagraj jeszcze raz to samo rozdanie”
    - Zakładając, że użytkownik ukończył wariant
    - Gdy wybierze powtórkę tego wariantu i podejmie te same decyzje
    - Wtedy karty i akcje rywala są te same (BR-SCN-001 dla wariantu)
  - Scenariusz: Nowy wariant tego samego szablonu
    - Zakładając, że użytkownik ukończył wariant szablonu
    - Gdy wybierze „Nowe rozdanie” w tym szablonie
    - Wtedy dostaje wariant o innym odcisku (BR-GEN-002)

### BR-GEN-002: Bez powtórzeń w sesji i między sesjami
- Przepływ: PR-05
- Dowód potrzeby: KO-038 („Żeby się nie powtarzało”)
- Miara [OCENA, metoda niżej]: (a) w jednej sesji scenariuszy żaden odcisk się nie powtarza; (b) między sesjami nowy wariant szablonu ma odcisk spoza 20 ostatnich odcisków tego szablonu na tym poziomie; (c) szablon ma na każdym swoim poziomie co najmniej 40 różnych odcisków w granicach losowania (pojemność), więc warunek (b) zawsze da się spełnić; gdy mimo to nie ma wolnego odcisku, generator bierze odcisk widziany najdawniej. Metoda: 1 darmowa aktywność dziennie (D-107) i kilka scenariuszy tygodniowo (PR-05, [OCENA]) dają kilkanaście wariantów jednego szablonu w kwartale; okno 20 przekracza ten zasięg, a pojemność 2 × okno zostawia losowaniu wybór. Historia odcisków to dane postępu (F-14: eksport, import, usunięcie).
- Kryteria akceptacji:
  - Scenariusz: Brak powtórzeń w sesji (test)
    - Zakładając, że test losuje sesje po 10 wariantów z ziarnami 1…1000
    - Gdy policzy odciski w każdej sesji
    - Wtedy w żadnej sesji nie ma dwóch wariantów o tym samym odcisku
  - Scenariusz: Okno między sesjami (test)
    - Zakładając, że historia szablonu ma 20 ostatnich odcisków na poziomie
    - Gdy generator utworzy 10 000 kolejnych wariantów, dopisując każdy do historii
    - Wtedy żaden nowy odcisk nie należy do 20 poprzednich
  - Scenariusz: Pojemność szablonu (test)
    - Zakładając, że szablon ma poziom łatwy, średni albo trudny
    - Gdy test przejdzie wszystkie warianty w granicach losowania tego poziomu (albo 100 000 losowań)
    - Wtedy liczy co najmniej 40 różnych odcisków; szablon z mniejszą pojemnością nie przechodzi `pnpm run ci`
  - Scenariusz: Przeniesienie historii
    - Zakładając, że użytkownik eksportuje postęp i importuje go na drugim telefonie
    - Gdy rozpocznie nowy wariant szablonu
    - Wtedy okno 20 ostatnich odcisków działa jak na pierwszym telefonie (BR-DANE-001)

### BR-GEN-003: Poprawna decyzja niezmienna w granicach losowania
- Przepływ: PR-05
- Dowód potrzeby: KO-038 („w granicach, w których poprawna decyzja się nie zmienia … test na tysiącach losowań”); RD-11; ADR-24
- Reguła: RD-11 (ocena), RD-05, RD-08 (pot odds, outy), RD-10 (pokazanie kart)
- Kryteria akceptacji:
  - Scenariusz: Walidacja na 10 000 losowań (test)
    - Zakładając, że szablon ma poziom i granice losowania
    - Gdy test wygeneruje 10 000 wariantów z ziaren 1…10 000 i dla każdego punktu decyzji policzy ocenę niezależną funkcją (rachunek z `poker-core` albo warunek reguły, nie kod generatora)
    - Wtedy w 100% wariantów ocena każdej akcji jest taka, jak w szablonie (dla ręki mieszanej: ten sam zbiór akcji „zgodne” i „dopuszczalne”, ADR-04)
  - Scenariusz: Losowanie odrzucone
    - Zakładając, że wylosowane karty łamią warunek szablonu (np. dają rywalowi kolor, przy którym linia przestaje mieć sens)
    - Gdy generator sprawdzi wariant
    - Wtedy odrzuca go i losuje ponownie; po 1000 odrzuceniach z rzędu zgłasza błąd szablonu w teście, a nie pokazuje użytkownikowi wariantu spoza granic
  - Scenariusz: Margines od granicy na poziomie łatwym i średnim (test)
    - Zakładając, że decyzja szablonu zależy od liczby (equity wobec ceny, SPR, procent rąk)
    - Gdy test policzy odległość wartości wariantu od progu decyzji
    - Wtedy na poziomie łatwym odległość wynosi co najmniej 10 punktów procentowych, a na średnim co najmniej 2 (`DRAW_CALL_MIN_GAP`, `packages/poker-core/src/drills.ts:183`); [OCENA: 10 pp to odległość widoczna „na oko” bez liczenia, 2 pp to obecny próg generatora drawów]

## Poziom trudności (POZ)

### BR-POZ-001: Trzy poziomy o różnym rodzaju trudności
- Przepływ: PR-05
- Dowód potrzeby: KO-038 („3 poziomy trudności (łatwy / średni z liczbą / trudny blisko granicy, ręka mieszana ADR-04)”)
- Definicje: **łatwy** — poprawną decyzję widać z sytuacji bez liczenia (margines BR-GEN-003); **średni** — decyzja wymaga jednej liczby z kursu (outy, cena sprawdzenia, SPR, procent otwarć); **trudny** — wartość blisko progu (margines od 0 do 2 pp poniżej progu albo powyżej, z jednoznaczną oceną) albo ręka mieszana, w której dwie akcje są poprawne (ADR-04, RD-11 „dopuszczalne”).
- Kryteria akceptacji:
  - Scenariusz: Ręka mieszana na poziomie trudnym
    - Zakładając, że wariant trudny ma punkt decyzji z dwiema akcjami poprawnymi
    - Gdy użytkownik wybierze rzadszą z nich
    - Wtedy widzi ocenę „dopuszczalne”, a wyjaśnienie mówi, że obie akcje są poprawne i kiedy wybrać którą
  - Scenariusz: Poziom łatwy bez liczb w pytaniu
    - Zakładając, że wariant ma poziom łatwy
    - Gdy użytkownik widzi punkt decyzji
    - Wtedy pytanie i sytuacja nie wymagają podania ani policzenia liczby

### BR-POZ-002: Poziom automatyczny z postępu i przełącznik
- Przepływ: PR-05
- Dowód potrzeby: KO-039 (właściciel: „Automatycznie + wybór (Recommended)”)
- Reguła automatu [OCENA, D-534]: start na poziomie łatwym; średni dla szablonów modułu, którego test zaliczono albo który ocena poziomu (F-01) przeskoczyła; trudny po 5 kolejnych wariantach średnich tego modułu z co najmniej 80% decyzji „zgodne” albo „dopuszczalne”; o poziom niżej po 3 kolejnych wariantach z mniej niż 50% takich decyzji. Szablon bez wybranego poziomu dostaje najbliższy niższy, który ma.
- Kryteria akceptacji:
  - Scenariusz: Poziom proponowany automatycznie
    - Zakładając, że użytkownik zaliczył test modułu M7 i nie wybierał poziomu ręcznie
    - Gdy otworzy szablon modułu M7
    - Wtedy na ekranie startu widzi poziom „średni” oznaczony jako „automatycznie”
  - Scenariusz: Wybór ręczny
    - Zakładając, że użytkownik jest na ekranie startu scenariusza
    - Gdy wybierze w przełączniku „trudny”
    - Wtedy wariant startuje na poziomie trudnym, a wybór zostaje zapamiętany, dopóki użytkownik nie wybierze „automatycznie”
  - Scenariusz: Szablon bez wybranego poziomu
    - Zakładając, że użytkownik wybrał „trudny”, a szablon ma tylko łatwy i średni
    - Gdy otworzy ten szablon
    - Wtedy przełącznik pokazuje „średni” z informacją, że trudnego w tym rozdaniu nie ma
  - Scenariusz: Zmiana automatu w dół
    - Zakładając, że poziom jest automatyczny, a użytkownik ma 3 kolejne warianty średnie z mniej niż 50% poprawnych decyzji
    - Gdy otworzy następny szablon tego modułu
    - Wtedy poziom proponowany to „łatwy”

## Ocena decyzji z wyjaśnieniem na intuicję (OCE)

### BR-OCE-001: Wyjaśnienie zaczyna się od sytuacji, a liczba jest dodatkiem przełożonym na sens
- Przepływ: PR-05, PR-03, PR-02 (scenariusze, sesje ćwiczeń, lekcje i egzaminy)
- Dowód potrzeby: KO-040 (właściciel: „Z pełnym wytłumaczeniem a nie pokazana tabelka prawdopodobieństwa i napisane dlatego że tak jest w liczbach. Ludzie muszą się uczyć na intuicję - jak mam to i to i taką pozycję i taką sytuacją na stole to gram to bo…”); recenzja S-48 (brak „dlaczego”)
- Reguła: RD-11; liczby tylko przez `{{n:…}}` (`CLAUDE.md`, zasady techniczne)
- Budowa wyjaśnienia (kolejność części): (1) **sytuacja**: „Masz <ręka>, jesteś na <pozycja>, na stole <karty / opis>, rywal <akcja>”; (2) **zagranie**: „→ grasz <akcja>”; (3) **bo**: powód słowami gry (kogo bijesz, kto zapłaci, czego się boisz, co zyskujesz); (4) opcjonalnie **liczba** z przełożeniem na sens w tym samym zdaniu („potrzebujesz 25% szans, czyli wygrać raz na cztery; twój draw trafia mniej więcej raz na pięć — za mało”).
- Kryteria akceptacji:
  - Scenariusz: Kolejność części w scenariuszu i w ćwiczeniu generowanym
    - Zakładając, że użytkownik odpowiedział w punkcie decyzji
    - Gdy zobaczy wyjaśnienie
    - Wtedy pierwsze zdanie wymienia jego rękę, pozycję (gdy zadanie ma pozycję), stół (gdy jest) i akcję rywala (gdy była), a drugie mówi, co grać i dlaczego, bez liczby przed słowem „bo”
  - Scenariusz: Liczba z przełożeniem
    - Zakładając, że wyjaśnienie zawiera liczbę (procent, outy, ułamek puli)
    - Gdy budowanie treści sprawdzi wyjaśnienie
    - Wtedy każda liczba ma w tym samym zdaniu przełożenie na sens (pole `sens` obok `{{n:…}}` w treści albo w szablonie tekstu generatora); brak przełożenia to błąd budowania
  - Scenariusz: Bez samej tabelki
    - Zakładając, że ćwiczenie pokazuje tabelę albo siatkę zakresu
    - Gdy użytkownik odpowie
    - Wtedy pod tabelą jest zdanie „bo” słowami; sama tabela, procent albo „tak wychodzi z rachunku” nie są wyjaśnieniem

### BR-OCE-002: „Dlaczego dobrze” i „dlaczego źle” przy każdej odpowiedzi
- Przepływ: PR-05, PR-03, PR-02
- Dowód potrzeby: KO-040 („I ocena - dlaczego dobrze, dlaczego źle”); RD-11; BR-SCN-003
- Kryteria akceptacji:
  - Scenariusz: Odpowiedź błędna
    - Zakładając, że użytkownik wybrał akcję ocenioną jako „błąd” albo „niedokładność”
    - Gdy zobaczy ocenę
    - Wtedy widzi dwa wyjaśnienia: dlaczego jego akcja jest słabsza (co traci w tej sytuacji) i dlaczego najlepsza akcja jest lepsza, oba zbudowane jak w BR-OCE-001
  - Scenariusz: Odpowiedź poprawna
    - Zakładając, że użytkownik wybrał akcję „zgodne”
    - Gdy zobaczy ocenę
    - Wtedy widzi, dlaczego to dobre zagranie, a jednym dotknięciem może zobaczyć, dlaczego pozostałe akcje są słabsze
  - Scenariusz: Każda akcja ma swoje wyjaśnienie (test treści)
    - Zakładając, że baza treści pl jest zbudowana
    - Gdy test przejdzie wszystkie punkty decyzji szablonów i wszystkie opcje zadań wyboru w lekcjach i egzaminach
    - Wtedy 100% akcji i opcji ma niepuste wyjaśnienie własnej odpowiedzi
  - Scenariusz: Wyjaśnienie w ćwiczeniu generowanym zależy od wylosowanych kart
    - Zakładając, że ćwiczenie albo wariant scenariusza ma wylosowaną rękę i stół
    - Gdy użytkownik zobaczy wyjaśnienie
    - Wtedy w zdaniu sytuacji są karty i pozycja z tego wariantu, a nie z przykładu w treści

### BR-OCE-003: Istniejące ćwiczenia, lekcje i egzaminy według tej samej zasady
- Przepływ: PR-02, PR-03
- Dowód potrzeby: KO-040 („do sprawdzenia przez 03/06 — istniejące ćwiczenia”); próbka roli 03 (`docs/zakres/ocena-wyjasnien-ko040.md`)
- Kryteria akceptacji:
  - Scenariusz: Próbka po przeróbce roli 06
    - Zakładając, że rola 06 przerobiła wyjaśnienia pl według BR-OCE-001 i BR-OCE-002
    - Gdy rola 03 albo 07 powtórzy próbkę co najmniej 30 wyjaśnień metodą z `docs/zakres/ocena-wyjasnien-ko040.md`
    - Wtedy co najmniej 90% ma klasę A („intuicja od sytuacji”), 0% klasę C („tabelka”), a 100% odpowiedzi błędnych ma „dlaczego źle” [OCENA: 90% zostawia miejsce na zadania czysto rachunkowe M2, w których liczba jest treścią pytania, ale też one mają zdanie sensu]

## Ekran główny (MENU)

### BR-MENU-001: Ekran główny z kafelkami prowadzącymi do funkcji
- Przepływ: PR-02, PR-03, PR-04, PR-05
- Dowód potrzeby: KO-041 (właściciel: „przerobić menu główne i jakoś to popakować w kafelki żeby z menu wchodziło się do funkcji a nie długa lista”); analogia Trening `app/(tabs)/index.tsx:41-54` i `docs/22-przeplywy-i-nawigacja.md:292-299` (ekran główny bez list, listy w osobnej zakładce; odczyt 2026-11-10 @ 2e4b0f8)
- Kryteria akceptacji:
  - Scenariusz: Ekran główny bez długiej listy
    - Zakładając, że użytkownik ma postęp w kilku modułach
    - Gdy otworzy ekran główny
    - Wtedy widzi kontynuację nauki (następna lekcja) i kafelki funkcji: lekcje, ćwiczenia, powtórki z liczbą na dziś, scenariusze; nie widzi listy lekcji ani listy modułów
  - Scenariusz: Kafelek prowadzi do funkcji jednym dotknięciem
    - Zakładając, że użytkownik jest na ekranie głównym
    - Gdy dotknie dowolnego kafelka
    - Wtedy jednym dotknięciem trafia do ekranu tej funkcji (start sesji, kolejka powtórek, wybór scenariusza, lista lekcji)
  - Scenariusz: Mieści się bez przewijania
    - Zakładając, że telefon ma ekran 375 × 667 pt (najmniejszy obsługiwany iPhone [DO USTALENIA z rolą 05: lista urządzeń]) i domyślny rozmiar tekstu
    - Gdy użytkownik otworzy ekran główny
    - Wtedy wszystkie kafelki są widoczne bez przewijania; przy większym tekście systemowym przewijanie jest dozwolone, a żaden tekst nie jest ucięty
  - Scenariusz: Kafelek bez treści
    - Zakładając, że kafelek nie ma jeszcze treści (np. scenariusze modułów, których użytkownik nie zaczął)
    - Gdy użytkownik go zobaczy
    - Wtedy kafelek mówi, co go odblokuje (np. „Po pierwszej lekcji modułu 2”), zamiast znikać albo prowadzić do pustego ekranu (D-255 zastąpione)

### BR-MENU-002: Lista lekcji i egzaminów w osobnym ekranie
- Przepływ: PR-02
- Dowód potrzeby: KO-041; BR-KURS-001 (każdą lekcję można otworzyć)
- Kryteria akceptacji:
  - Scenariusz: Wejście do listy lekcji
    - Zakładając, że użytkownik jest na ekranie głównym
    - Gdy dotknie kafelka lekcji
    - Wtedy widzi moduły z lekcjami i testem modułu, stan każdej lekcji (nowa, zaczęta, ukończona) i może otworzyć dowolną lekcję (BR-KURS-001)
  - Scenariusz: Powrót
    - Zakładając, że użytkownik otworzył lekcję z listy
    - Gdy ją zakończy albo wróci
    - Wtedy trafia na listę lekcji w tym samym miejscu przewinięcia

### BR-MENU-003: Ustawienia widoczne i łatwe do trafienia
- Przepływ: PR-06, PR-07, PR-08
- Dowód potrzeby: KO-036 (zrzut właściciela, build 1010: zębatka „ledwo widoczna”); `apps/mobile/src/app/(tabs)/index.tsx:94-99` (znak tekstowy ⚙︎, zgłoszenie 08-F22)
- Źródła progów: WCAG 2.2, 1.4.11 Non-text Contrast: „The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s): User Interface Components” (w3.org/TR/WCAG22, odczyt 2026-11-10); cel dotykowy ≥ 44 pt (`docs/design/design-spec.md:77`; Trening `lib/tokens.ts:153-155`, odczyt 2026-11-10 @ 2e4b0f8)
- Kryteria akceptacji:
  - Scenariusz: Kontrast ikony
    - Zakładając, że ekran główny jest w trybie jasnym albo ciemnym
    - Gdy test policzy kontrast ikony ustawień wobec tła
    - Wtedy wynosi co najmniej 3:1 w obu trybach
  - Scenariusz: Obszar dotyku
    - Zakładając, że użytkownik jest na ekranie głównym
    - Gdy dotknie w obrębie 44 × 44 pt wokół ikony ustawień
    - Wtedy otwierają się ustawienia; czytnik ekranu czyta „Ustawienia, przycisk”
