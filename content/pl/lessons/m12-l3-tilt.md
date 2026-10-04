---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Rozpoznaj go, zanim przejmie decyzje"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Trzeci raz w godzinę rywal trafia na riverze kartę, która go ratuje. Czujesz, że gra jest niesprawiedliwa i ktoś się na ciebie uwziął. Jaki to typ tiltu według Tendlera?"
    options:
      - { text: "Tilt z niesprawiedliwości", correct: true, why: "Bad beaty, coolery i trafienia rywala na riverze dają poczucie, że poker jest niesprawiedliwy. To typowy wyzwalacz tiltu z niesprawiedliwości." }
      - { text: "Tilt z błędu", why: "Tilt z błędu dotyczy twoich własnych pomyłek. Tu złości cię los, a nie twoja decyzja." }
      - { text: "Tilt z desperacji", why: "Desperacja to silna potrzeba odegrania się (długie sesje, wyższe stawki). Tu na razie chodzi o poczucie krzywdy." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Ten sam rywal podbija twoje blindy czwarty raz z rzędu. Postanawiasz, że następnym razem {{t:raise|przebijesz}} go dowolną ręką, żeby mu pokazać. Jaki to typ tiltu?"
    options:
      - { text: "Tilt z zemsty", correct: true, why: "Brak szacunku, ciągła agresja rywala i chęć „pokazania mu” to wyzwalacze tiltu z zemsty. Decyzję zaczyna podejmować chęć odwetu, a nie rachunek." }
      - { text: "Tilt z poczucia, że ci się należy", why: "Ten typ wynika z przekonania, że zasługujesz na wygraną, bo jesteś lepszy. Tu chodzi o odwet na konkretnym rywalu." }
      - { text: "To nie tilt, tylko dostosowanie do agresywnego rywala", why: "Dostosowanie oznacza szerszą obronę przemyślanymi rękami. „Dowolną ręką, żeby mu pokazać” to emocja, a nie strategia." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Jesteś pod kreską i myślisz: „Jeszcze godzina, a jak nie pójdzie, przejdę na wyższą stawkę i odrobię wszystko naraz”. Jaki to typ tiltu?"
    options:
      - { text: "Tilt z desperacji", correct: true, why: "Potrzeba odegrania się prowadzi do bardzo długich sesji, wymuszania akcji i skoków w górę stawek. To sygnał, żeby skończyć grę." }
      - { text: "Tilt z nienawiści do przegrywania", why: "Blisko, ale tu dochodzi plan odrobienia strat wyższą stawką i dłuższą grą. To cechy desperacji." }
      - { text: "Rozsądny plan, bo wyższa stawka szybciej odrobi straty", why: "Wyższa stawka zwiększa też wahania, a decyzje podejmujesz w złym stanie. Przejście w górę po stracie to dokładnie odwrotność zasad bankrollu." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "{{t:fold|Spasowałeś}} najlepszą rękę i od tej chwili nie możesz przestać o tym myśleć. Złościsz się na siebie i grasz coraz gorzej. Jaki to typ tiltu?"
    options:
      - { text: "Tilt z błędu", correct: true, why: "Złość na własne pomyłki to tilt z błędu. Tendler wiąże go z nierealistycznym oczekiwaniem, że ucząc się, nie popełnisz błędów." }
      - { text: "Tilt z niesprawiedliwości", why: "Tu nie winisz losu, tylko siebie. To tilt z błędu." }
      - { text: "Tilt z zemsty", why: "Zemsta jest skierowana na rywala. Tu złość dotyczy twojej decyzji." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Przegrywasz z graczem, który według ciebie gra fatalnie, i myślisz: „Ja się uczę, on nie, powinienem z nim wygrywać”. Jaki to typ tiltu?"
    options:
      - { text: "Tilt z poczucia, że ci się należy", correct: true, why: "Wiara, że zasługujesz na wygraną z jakiegoś powodu, sprawia, że wygrana wydaje się twoją własnością. Gdy „niezasłużony” rywal ją zabiera, pojawia się tilt." }
      - { text: "Tilt z nienawiści do przegrywania", why: "Ten typ dotyczy przegrywania w ogóle. Tu kluczowe jest przekonanie, że wygrana ci się należy." }
      - { text: "Tilt z błędu", why: "Nie chodzi o twoją pomyłkę, tylko o poczucie, że zasługujesz na wygraną." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Po bad beacie czujesz, że rośnie w tobie złość, ale wciąż grasz poprawnie. Co robisz?"
    options:
      - { text: "Reagujesz teraz: oddech i przygotowane zdanie, np. „To {{t:variance}}, graj dalej dobrze”", correct: true, why: "Tilt koryguje się, póki jest mały i możesz jeszcze myśleć. Gdy urośnie, wyłącza zdolność myślenia i kontrola staje się niemożliwa." }
      - { text: "Grasz dalej, aż zauważysz pierwszy błąd", why: "Wtedy tilt jest już większy i trudniej go zatrzymać. Najłatwiej reagować na pierwsze sygnały." }
      - { text: "Tłumisz złość i udajesz, że jej nie ma", why: "Tendler zaleca rozpoznać emocję i odpowiedzieć na jej przyczynę konkretną myślą. Samo tłumienie nie usuwa przyczyny." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Od pół godziny grasz ręce, które zwykle {{t:fold|pasujesz}}, i myślisz tylko o odegraniu się. Co robisz?"
    options:
      - { text: "Kończysz sesję", correct: true, why: "To sygnały, że nie potrafisz już odzyskać jasnego myślenia. Wtedy celem jest skończyć jak najszybciej, a nie wygrać z powrotem pieniądze." }
      - { text: "Grasz dalej, ale tylko najlepsze ręce", why: "W tym stanie trudno trzymać się postanowień, bo emocja podejmuje decyzje za ciebie. Bezpieczniej skończyć." }
      - { text: "Podnosisz stawkę, żeby szybciej odrobić", why: "To tilt z desperacji w czystej postaci. Większa stawka przy gorszych decyzjach przyspiesza straty." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Chcesz szybciej łapać tilt. Od czego zaczynasz według Tendlera?"
    options:
      - { text: "Od spisania profilu: co cię wyzwala, co myślisz i czujesz, jak zmienia się twoja gra", correct: true, why: "Każdy gracz tiltuje trochę inaczej i z innych powodów. Profil pozwala rozpoznać sygnały, zanim tilt urośnie: nie da się kontrolować czegoś, czego się nie rozumie." }
      - { text: "Od gry na wyższych stawkach, żeby się zahartować", why: "Większa presja nie uczy rozpoznawania tiltu. Najpierw musisz wiedzieć, jak on u ciebie wygląda." }
      - { text: "Od unikania wszystkich rywali, którzy cię denerwują", why: "Wyzwalaczy nie da się uniknąć, bo bad beaty i agresywni rywale zdarzą się zawsze. Celem jest rozpoznać reakcję i na nią odpowiedzieć." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Twoja gra ma dobre i złe dni. Gdzie według Tendlera jest najszybszy stały postęp?"
    options:
      - { text: "W poprawie najgorszej gry (C-game)", correct: true, why: "Postęp przypomina ruch gąsienicy: krok naprzód z przodu (lepsza A-game) i krok z tyłu (mniej fatalna C-game). Usunięcie najgorszych błędów zwalnia też uwagę na naukę nowych rzeczy." }
      - { text: "Tylko w szlifowaniu najlepszej gry (A-game)", why: "A-game jest ważna, ale to C-game kosztuje najwięcej. Bez poprawy najgorszych dni postęp z przodu łatwo traci się z tyłu." }
      - { text: "Nigdzie, forma to kwestia szczęścia", why: "Rozrzut formy da się zawężać: gracze dobrze kontrolujący tilt mają węższy rozkład poziomu gry (Palomäki i in., 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Jak sprawdzasz, czy twoja praca nad mental game daje efekt?"
    options:
      - { text: "Porównujesz najgorsze sesje z wcześniejszymi najgorszymi", correct: true, why: "Tendler radzi porównywać podobne z podobnym: najgorszą grę z wcześniejszą najgorszą. Postęp widać też po tym, że szybciej rozpoznajesz tilt i wcześniej kończysz sesję." }
      - { text: "Patrzysz na wynik w złotówkach z ostatniego tygodnia", why: "Tydzień wyników to głównie {{t:variance}} (lekcja o {{t:variance|wariancji}}). Jakość gry w najgorsze dni mówi więcej." }
      - { text: "Porównujesz najlepszą sesję z najgorszą", why: "Takie porównanie pokazuje tylko rozrzut, a nie postęp. Porównuj najgorszą grę z wcześniejszą najgorszą." }
---
Tilt to utrata kontroli pod wpływem negatywnych emocji, zwykle po bad beatach albo długiej serii strat. Kończy się słabymi decyzjami i stratą dużo większą niż zwykle. To nie rzadkość: w badaniu ankietowym {{n:tilt.severe}} graczy przyznało się do silnego tiltu co najmniej raz w ostatnich sześciu miesiącach.

## Siedem typów tiltu

Jared Tendler, autor *The Mental Game of Poker*, opisuje tilt jako problem ze złością i wyróżnia {{n:tilt.types}} typów:

| Typ | Co go wyzwala |
|---|---|
| Z serii złych kart | Inne typy tiltu wracają tak często, że umysł nie zdąży się zresetować przed kolejną sesją |
| Z niesprawiedliwości | Bad beaty, coolery, trafienia rywala na riverze |
| Z nienawiści do przegrywania | Sama przegrana, nawet gdy wiesz, że to {{t:variance}} |
| Z błędu | Twoje własne pomyłki |
| Z poczucia, że ci się należy | Przekonanie, że zasługujesz na wygraną |
| Z zemsty | Brak szacunku, ciągła agresja rywala |
| Z desperacji | Potrzeba odegrania się: maratony, wyższe stawki |

## Rozpoznaj sygnały

Każdy tiltuje trochę inaczej. Spisz swój **profil tiltu**: co go wyzwala, co wtedy myślisz i czujesz, co robisz przy stole (np. {{t:call|sprawdzasz}} za szeroko, {{t:raise|przebijasz}} z zemsty). Im lepiej znasz swoje sygnały, tym wcześniej je złapiesz.

## Reaguj, póki możesz myśleć

Gdy tilt urośnie, wyłącza zdolność myślenia. Dlatego reagujesz na pierwsze sygnały:

1. Oddech, który daje chwilę dystansu do emocji.
2. Przygotowane zdanie, które odpowiada na przyczynę, np. „Słabsi gracze muszą czasem wygrywać, to {{t:variance}}. Graj dalej dobrze”.
3. Jeśli nie potrafisz już jasno myśleć, kończysz sesję. Postępem jest też to, że kończysz wcześniej, z dobrego powodu.

## A-game i C-game

Twoja gra ma rozrzut: od najlepszej (A-game) do najgorszej (C-game). Tendler porównuje postęp do gąsienicy: krok naprzód z przodu, gdy najlepsza gra staje się lepsza, i krok z tyłu, gdy najgorsza staje się mniej fatalna. Najwięcej kosztuje C-game, więc od niej zaczynasz.

:::note Gdy to coś więcej niż tilt
Tendler odróżnia problem z grą od problemu z hazardem. Jeśli stale grasz dłużej niż planujesz, odgrywasz się albo grasz za pieniądze, których nie możesz stracić, przeczytaj kartę o odpowiedzialnej grze w lekcji o bankrollu.
:::
