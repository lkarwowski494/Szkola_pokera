### 04-studio-projektowe-002 · Haptyka wyboru akcji działa mimo wyłączonych „Wibracji przy odpowiedzi”
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Dowód: `apps/mobile/src/components/PasekStrategii.tsx:93` wywołuje haptykę bez sprawdzenia ustawienia; `apps/mobile/src/app/session.tsx:250` dla oceny sprawdza `if (haptics)`; etykieta przełącznika `apps/mobile/src/i18n/locales/pl.json:316` (Wibracje przy odpowiedzi). `dowody/f-haptyka.txt`.
- Kroki w aplikacji: Ustawienia → wyłącz „Wibracje przy odpowiedzi” → sesja ćwiczeń albo scenariusz → dotknij akcję: telefon wibruje.

### 04-studio-projektowe-007 · Skala stopni łamie „Dopuszczalna” w środku wyrazu przy tekście domyślnym
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: słowo czytelne, stopień niesie też znak i etykieta)
- Realność: realny · Pewność: wysoka (pomiar web z Inter + rachunek dla SF Pro)
- Dowód: zrzut `zrzuty/po-ocenie-390-jasny.png` i `zrzuty/sp13-po-ocenie-wzorzec-vs-web.png`: „Dopuszcz/alna” w dwóch wierszach przy 390 pt bez dużego tekstu, gdy twoim stopniem jest „Zgodna”; podstawa przedziału nie-twojego 76 pt (`apps/mobile/src/theme/skalowanie.ts:13`), wzorzec e3 pokazuje słowo Dopuszczalna tylko jako przedział „twój” (112 pt). Rachunek: `dowody/f-skala-dopuszczalna.txt`.
- Kroki w aplikacji: sesja ćwiczeń, zadanie strategii, wybór ocenionej jako Zgodna albo Błąd → skala stopni pod paskiem.

### 09-lokalizacja-001 · Polski przecinek dziesiętny na sztywno w wyniku zadania liczbowego i w średnim czasie sesji
- Katalog dowodów: audit/M1-2026-11-17/role/09-lokalizacja/
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1 — wartość liczby poprawna, błędny tylko zapis)
- Realność: realny   · Pewność: wysoka
- Dowód: `apps/mobile/src/app/session.tsx:601` „const s = String(Math.round(v * 100) / 100).replace('.', ',');” (odpowiedź użytkownika w `NumericFeedback`, linia 631) i `apps/mobile/src/app/session.tsx:333` „avg.toFixed(1).replace('.', ',')” (wynik sesji). Sonda `dowody/e1-sonda-formaty.txt`: w en/ja/ko/zh-Hant „33,33%” i „4,3”, a `Intl` daje „33.33” i „4.3”; obok w tym samym widoku wartość dokładna `item.display` jest już w formacie języka (`formatujLiczbe`), więc ekran pokazuje dwa zapisy.
- Kroki w aplikacji: język en → lekcja z zadaniem liczbowym (np. pot odds) → wpisz „33.3” → „Your answer: 33,3%” nad „Exact: 33.3%”; koniec sesji ćwiczeń → „Average decision time: 4,3 s”.

### 09-lokalizacja-002 · Przypomnienie dzienne zostaje w poprzednim języku po zmianie języka w aplikacji
- Katalog dowodów: audit/M1-2026-11-17/role/09-lokalizacja/
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1)
- Realność: brzegowy (dotyczy osób, które zmieniają język w ustawieniach aplikacji i mają włączone przypomnienie; trwa do następnego zimnego startu)   · Pewność: wysoka
- Dowód: tekst powstaje przy planowaniu: `apps/mobile/src/platform/powiadomienia.ts:20` „content: { title: tytul, body: tresc },”; planowanie tylko przy starcie (`apps/mobile/src/app/_layout.tsx:146` „odtworzZBazy(portPostepu, powiadomieniaExpo, { tytul: i18n.t('reminder.title')”), przy przełączniku przypomnienia i imporcie danych (`apps/mobile/src/app/settings.tsx:47`, funkcja tekstPrzypomnienia).
  Ekran języka po zapisie woła tylko `apps/mobile/src/app/language.tsx:44` „await ustawJezyk(j);” bez ponownego planowania. Brak testu w `src/i18n/__tests__` i `src/features/ustawienia/__tests__` łączącego zmianę języka z przypomnieniem (grep reminder.title w testach języka: 0).
- Kroki w aplikacji: włącz przypomnienie (pl) → Ustawienia → Język → English → nie zamykaj aplikacji → o porze przypomnienia przychodzi tekst po polsku.

### 01-odkrywanie-003 · BRD nieaktualne wobec decyzji: reguła krytyczna RD-12, blokery wydania, języki, storefronty, statusy erraty
- Katalog dowodów: audit/M1-2026-11-17/role/01-odkrywanie/
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1)
- Realność: realny (rola 07 bierze blokery z `docs/brd/README.md`) · Pewność: wysoka
- Dowód:
  - `docs/brd/README.md:27` „reguła krytyczna: brak numeru pomocy w kraju sprzedaży”
  - `docs/brd/wymagania-sklep.md:212` „BR-POM-001: Numer pomocy według kraju urządzenia”
  - `docs/brd/reguly.md:206` „Telefon pomocy przy problemie z hazardem według kraju użytkownika”
  - `docs/brd/odkrywanie.md:146` „OG-14: Telefon pomocy dla kraju użytkownika”
  - `docs/brd/errata.md:9` „Telefony pomocy tylko dla Polski, a storefrontu PL nie będzie” (status: otwarte)
  - wobec `docs/decyzje.md:67` „numery pomocy: bez numerów krajowych”
  - i `docs/decyzje.md:76` „Według D-158, BRD potem (Recommended)” — poprawki BRD brak od 2026-11-04
  - RD-11: `docs/brd/reguly.md:192` „dziś 0 < f < M daje” — wobec D-213 (rdzeń poprawiony)
  - `docs/brd/errata.md:16` „Funkcje `callEv` i `ruleOf2And4` nie odrzucają błędnych danych” — otwarte mimo walidacji z D-213
  - `docs/brd/wymagania.md:78` „Próg: 100% w 35 językach”
  - wobec `docs/decyzje.md:211` „1.0 = pl + en + kilka największych języków”
  - w aplikacji 12 języków: `apps/mobile/app.json:39` „supportedLocales”
  - `docs/brd/README.md:53` „storefront kraju dopiero po zapisanym sprawdzeniu legalności”
  - `docs/brd/odkrywanie.md:113` „Australia: R 18+ już przy” (OG-03 liczy KR jako storefront)
  - wobec `docs/decyzje.md:210` „D-300 przyjęta (wszystkie poza spornymi KR, CN, AF, GA, MA, VN, TR i poza PL” (166 storefrontów, D-362)
  - ER-15 i ER-16 czekają na fix roli 01: `docs/brd/errata.md:20` „Przegląd roli 01 w trybie `fix`”
  - wskaźniki kodu w RD przesunięte: RD-06 wskazuje linię 70 pliku „math.ts”, a funkcja jest w `packages/poker-core/src/math.ts:72` „export function spr(effectiveStack: number, pot: number)”
- Kroki w aplikacji: brak (dokument); skutek: rola 07 albo 10 traktuje brak numerów krajowych jako bloker wydania wbrew D-158, a rola 09 mierzy NFR-JEZ-001 na 35 językach wbrew D-302.

