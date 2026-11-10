# Sesja AX — pula pytań oceny poziomu (zad. 1), 2026-11-10

Mechanizm: `apps/mobile/src/features/ocena-poziomu/ocenaPoziomu.ts:19-28` (`PYTANIA_OCENY`) — stała lista 8 pytań egzaminów, po jednym na moduł (M0–M6, M8). `zacznijOcene` (`ocenaPoziomu.ts:73-76`) bierze wiersze tych ID i `buildLessonSession` z ziarnem losuje tylko kolejność odpowiedzi; innych wariantów treści nie ma (pytania egzaminu są statyczne, liczby `{{n:}}` stałe). Wybór puli: `docs/tresci/ocena-poziomu-pytania.md`. Pula = 8 pytań, każdy przebieg pokazuje te same 8.

Linia nad pytaniem z polem `table`: generuje ją interfejs (`apps/mobile/src/i18n/locales/pl.json:577` `table.yourPosition` = „Twoja {{t:position|pozycja}}: {{pos}}.” + opis kart) — poza zakresem treści (rola 04/08, klucze `locales`), sesja AX tego nie zmienia.

| Lp. | ID | Źródło pl | Pole `table` |
|---|---|---|---|
| 1 | m0.exam.q1 | `content/pl/exams/m0.yaml:4-13` | karty, rywal, stół |
| 2 | m1.exam.q2 | `content/pl/exams/m1.yaml:13-21` | — |
| 3 | m2.exam.q5 | `content/pl/exams/m2.yaml:57-65` | — |
| 4 | m3.exam.q2 | `content/pl/exams/m3.yaml:14-23` | karty, pozycja UTG |
| 5 | m4.exam.q1 | `content/pl/exams/m4.yaml:5-14` | karty, pozycja SB |
| 6 | m5.exam.q2 | `content/pl/exams/m5.yaml:15-24` | pozycja BTN |
| 7 | m6.exam.q5 | `content/pl/exams/m6.yaml:40-49` | pozycja BB |
| 8 | m8.exam.q1 | `content/pl/exams/m8.yaml:4-12` | — |

Tekst wyrenderowany z bazy `apps/mobile/assets/content/tresc-6e372be925-pl.db` (stan przed zmianą, 40e5cef). Terminy przy pierwszym użyciu na ekranie mają dopisek angielski w nawiasie, np. „przebicie (raise)”, „dużego blinda (big blind, BB)”; dotknięcie terminu otwiera glosariusz.

## m0.exam.q1
Stół: {"hand":"Th 9h","opp":"Ac Ad","board":"As 8c 7d Jh 2s"}
Pytanie: Rywal ma trójkę (three of a kind) asów, ty strita (straight) do waleta. Kto wygrywa?
- [POPRAWNA] Ty
    Wyjaśnienie: Twoja piątka to J-10-9-8-7, czyli strit (straight). Strit jest w rankingu nad trójką (three of a kind), więc wysokość kart rywala nie ma znaczenia.
- Rywal, bo ma asy
    Wyjaśnienie: Asy liczą się dopiero przy tym samym układzie. Tu układy są różne: strit (straight) bije trójkę (three of a kind).
- Podział puli (split pot)
    Wyjaśnienie: Różne układy nie remisują. Wygrywa ten wyżej w rankingu.

## m1.exam.q2
Pytanie: Rywal przed tobą postawił (bet). Którego ruchu nie możesz teraz wykonać?
- [POPRAWNA] Czekać (check)
    Wyjaśnienie: Czekać (check) można tylko wtedy, gdy w tej rundzie nikt przed tobą nie postawił (bet) ani nie przebił (raise). Teraz musisz spasować (fold), sprawdzić (call) albo przebić.
- Przebić (raise)
    Wyjaśnienie: Przebicie (raise) jest możliwe właśnie dlatego, że jest zakład (bet) do podniesienia.
- Spasować (fold)
    Wyjaśnienie: Pas (fold) jest zawsze dostępny, gdy trzeba dopłacić.

## m2.exam.q5
Pytanie: W puli (pot) jest 60. Rywal stawia (bet) 30. Ile equity potrzebujesz do sprawdzenia (call)?
- [POPRAWNA] 25%
    Wyjaśnienie: Dopłacasz 30, a pula (pot) po twoim sprawdzeniu (call) ma 60 + 30 + 30 = 120. 30 ÷ 120 = 25%. To zakład (bet) pół puli, więc wynik jest ten sam przy każdej wielkości puli.
- 33%
    Wyjaśnienie: To 30 ÷ 90, bez twojego sprawdzenia (call). Dopłatę dzielisz przez całą pulę (pot) po sprawdzeniu: 120.
- 50%
    Wyjaśnienie: To 30 ÷ 60: zakład (bet) podzielony przez pulę (pot) sprzed zakładu. W mianowniku musi być cała pula po twoim sprawdzeniu (call).

## m3.exam.q2
Stół: {"hand":"Ac Td","position":"UTG"}
Pytanie: Mówisz pierwszy preflop, nikt jeszcze nie wszedł do gry. Co robisz?
- [POPRAWNA] Przebijam (raise)
    Wyjaśnienie: AT w różnych kolorach mieści się w zakresie (range) otwarcia (open) z UTG (under the gun; ok. 15%–18% rąk). Solver aplikacji gra ją tu zawsze.
- Pasuję (fold)
    Wyjaśnienie: Za ciasno. Z UTG (under the gun) grasz wąsko, ale AT jest jeszcze w zakresie (range).
- Dopłacam do dużego blinda (big blind, BB)
    Wyjaśnienie: Jako pierwszy przebijasz (raise) albo pasujesz (fold). Limp oddaje inicjatywę (initiative) i szansę na zgarnięcie blindów od razu.

## m4.exam.q1
Stół: {"hand":"Ad Kd","position":"SB"}
Pytanie: CO (cutoff) otworzył (open) na 2,5bb, Button spasował (fold). Jesteś na małym blindzie (small blind, SB) i chcesz 3-betować. Do ilu?
- [POPRAWNA] Do 10bb
    Wyjaśnienie: Po flopie będziesz mówić pierwszy, więc przebijasz (raise) ok. 4x otwarcia (open). Większy rozmiar odbiera CO (cutoff) tanie sprawdzenie (call) z pozycją (in position, IP).
- [dobra akcja, zły rozmiar] Do 7,5bb
    Wyjaśnienie: Dobra akcja, ale to rozmiar dla gracza z pozycją (in position, IP; 3x otwarcia [open]). Z małego blinda (small blind, SB) przebijasz (raise) do 10bb.
- Tylko sprawdzam (call)
    Wyjaśnienie: Z małego blinda (small blind, SB) wobec CO (cutoff) prawie nie sprawdzasz (call): grałbyś bez pozycji (out of position, OOP), a duży blind (big blind, BB) za tobą może jeszcze przebić (raise).

## m5.exam.q2
Stół: {"position":"BTN"}
Pytanie: Otworzyłeś (open) z Buttona, duży blind (big blind, BB) sprawdził (call). Na którym z tych flopów to duży blind częściej niż ty ma dwie pary (two pair) albo strita (straight)?
- [POPRAWNA] [[8h 6d 5c]]
    Wyjaśnienie: Tak: niski, połączony (connected) flop trafia konektory (connectors) i ręce z małymi kartami, których duży blind (big blind, BB) broni dużo. Ty z Buttona masz więcej wysokich kart, które tu chybiły. To przewaga nutsów (nuts advantage) dużego blinda.
- [[Kd Td 3s]]
    Wyjaśnienie: Nie: wysoki flop sprzyja otwierającemu (open). Masz więcej króli z dobrym kickerem, KT i wysokich par (pair).
- [[Ah Ad 7c]]
    Wyjaśnienie: Nie: na flopie z parą (pair) asów więcej asów masz ty, bo duży blind (big blind, BB) najsilniejsze asy przebija (raise) przed flopem. Strita (straight) nikt tu nie ma.

## m6.exam.q5
Stół: {"position":"BB"}
Pytanie: Flop. W puli (pot) jest 80. Button stawia (bet) raz 20, a w innym rozdaniu 60. Ile equity potrzebujesz do sprawdzenia (call) w każdym z tych przypadków?
- [POPRAWNA] Ok. 17% i 30%
    Wyjaśnienie: Tak: bet ÷ (pula [pot] + 2·bet). 20 ÷ (80 + 20 + 20) = 17%, a 60 ÷ (80 + 60 + 60) = 30%. Przy większym becie bronisz węższym zakresem (range).
- Ok. 20% i 30%
    Wyjaśnienie: Pierwsza liczba to alpha (bet ÷ (pula [pot] + bet)), czyli próg dla blefu (bluff) Buttona. Do ceny sprawdzenia (call) dolicz swoje sprawdzenie: 17%.
- Tyle samo w obu, bo to ta sama pula (pot)
    Wyjaśnienie: Nie: cena zależy od rozmiaru betu. Większy bet to gorsza cena: 30% zamiast 17%.

## m8.exam.q1
Pytanie: River, rywal czeka (check) i nie może cię przebić (raise). W jego zakresie (range) jest 10 rąk gorszych od twojej, ale twój bet sprawdzi (call) tylko 3 z nich. Zapłaci też 4 razy lepszą ręką. Betujesz?
- [POPRAWNA] Nie, czekam (check)
    Wyjaśnienie: Tak: liczysz tylko ręce, które zapłacą. Bet wygrywa 3 razy i przegrywa 4 razy, czyli na czysto traci 1 bet. Gorsze ręce, które spasują (fold), i tak przegrałyby z tobą po czekaniu (check).
- Tak, bo gorszych rąk jest więcej niż lepszych
    Wyjaśnienie: Rywal ma 10 gorszych rąk, ale większość z nich na bet spasuje (fold). Wśród rąk, które zapłacą, lepszych jest więcej (4 wobec 3).
- Tak, żeby się dowiedzieć, gdzie jestem
    Wyjaśnienie: Bet „dla informacji” płaci lepszym rękom, a gorsze pasują (fold). Tę samą informację dostajesz za darmo po czekaniu (check), przy showdownie.
