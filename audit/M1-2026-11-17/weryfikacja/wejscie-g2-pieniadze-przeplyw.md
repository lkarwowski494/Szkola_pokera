### 02-monetyzacja-002 · Po zakupie lub przywróceniu w sesji i scenariuszu płacący widzi wyczerpany limit i „Pełny dostęp”
- Katalog dowodów: audit/M1-2026-11-17/role/02-monetyzacja/
- Poziom: P1 (WYSOKIE: ryzyko odrzucenia 2.1(b), płatna funkcja wygląda na niedziałającą zaraz po zapłacie)
- Realność: realny   · Pewność: wysoka
- Dowód: sonda RNTL na prawdziwym `SessionScreen` (dowody/e1-sonda-mon05.txt, kod 1, plik dowody/sonda-mon05.test.tsx.txt): po „zakonczony” z zakupu (sesja ćwiczeń i powtórki), po przywróceniu oraz gdy nasłuch ustawi Pro przed zwrotem `kup` — `pro: true`, a ekran pokazuje licznik 0 i „Pełny dostęp” (stan startu z wyczerpanym limitem). Tylko gdy wynik przychodzi wyłącznie z nasłuchu (`kup` = „oczekuje”), wejście jest poprawne (4 z 5 przypadków czerwone).
- Kroki w aplikacji: „Dziś” → „Sesja ćwiczeń” po zużyciu limitu → „Pełny dostęp” → kup albo „Przywróć zakupy” → ekran startu dalej pokazuje „0 darmowych aktywności” i „Pełny dostęp”; dopiero wyjście z ekranu i ponowne wejście pokazuje sesję bez licznika.

### 02-monetyzacja-004 · Pusta lista produktów daje ekran zakupu bez planów i bez komunikatu
- Katalog dowodów: audit/M1-2026-11-17/role/02-monetyzacja/
- Poziom: P2
- Realność: brzegowy   · Pewność: wysoka
- Dowód: `apps/mobile/src/features/zakup/EkranZakupu.tsx:103` renderuje listę z `odczyt.produkty` bez gałęzi dla pustej listy; komunikat `purchase.pricesUnavailable` tylko przy `ok: false` (`apps/mobile/src/features/zakup/EkranZakupu.tsx:95`).
- Kroki w aplikacji: produkty niezatwierdzone albo niedostępne w danym storefroncie → ekran zakupu bez cen i bez wyjaśnienia.

### 02-monetyzacja-006 · Scenariusze zakupu na urządzeniu (U-5) bez daty i wyniku
- Katalog dowodów: audit/M1-2026-11-17/role/02-monetyzacja/
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Dowód: `docs/jakosc/strategia.md:246` (U-5: zakupy w piaskownicy, przywracanie, anulowanie, zwrot) bez wyniku; `docs/programista/koordynator.md:63` wymienia U-5 w backlogu.
- Kroki w aplikacji: TestFlight (sandbox): zakup każdego planu, ponowna instalacja, tryb samolotowy, przywracanie na drugim urządzeniu, zwrot.

### 03-zakres-001 · Kafelek „Scenariusze” mówi „Wkrótce”, choć scenariusze działają, więc krok „sprawdź się” pętli głównej wygląda na niedostępny
- Katalog dowodów: audit/M1-2026-11-17/role/03-zakres/
- Poziom: P1 (WYSOKIE: ryzyko odrzucenia przez Apple z 2.1(a) przy wysyłce do App Store; dla TestFlight wewnętrznego nie blokuje)
- Realność: realny · Pewność: wysoka
- Dowód:
  - `apps/mobile/src/features/dzis/widok.ts:99` „scenariusze: !odblokowane ? 'po_m2' : wyczerpany ? 'limit' : 'wkrotce',” — stan odblokowany przy dostępnym limicie daje `wkrotce`.
  - `apps/mobile/src/i18n/locales/en.json:32` „"scenariosSoon": "Coming soon",”
  - `apps/mobile/src/i18n/locales/pl.json:36` „"scenariosSoon": "Wkrótce",”
  - Ekran „Dziś” mapuje ten stan na klucz `today.scenariosSoon`: `apps/mobile/src/app/(tabs)/index.tsx:59`.
  - Baza treści ma 33 szablony w pl i en, a ekran `/scenarios` pokazuje listę i start (`dowody/zak06-kafel-scenariusze.txt`).
  - Plan był inny: `docs/decyzje.md:368` „Krok F zastępuje ekran wyborem poziomu i startem (BR-SCN-003)” i zmienia stan kafelka na „Poziom: … (auto)”.
  - `docs/programista/stan-bt.md:19` „do zmiany na stan gotowości, gdy treść ma szablony” — zadanie zapisane i niewykonane.
  - Projekt, stan „W trakcie” (Scenariusze „Poziom: średni (auto)”): `docs/design/menu-i-zebatka.md:37`.
  - Test utrwala błąd: `apps/mobile/src/features/dzis/__tests__/kafle-bi.test.ts:34` „expect(st(JEST, 0, ['m2.l1']).scenariusze).toBe('wkrotce');”
  - Katalog przypadków opisuje „wkrótce” jako stan zablokowany: `docs/jakosc/przypadki-uzycia.md:19`.
- Kroki w aplikacji: ukończ dowolną lekcję modułu 2 → wróć na „Dziś” → kafelek „Scenariusze” ma podpis „Wkrótce” (en „Coming soon”), choć po dotknięciu otwiera listę 33 rozdań.

### 01-odkrywanie-001 · Ćwiczenia z zakresem nazywają „Błędem” akcję graną przez solver rzadko; RD-11 i opis w sklepie mówią „Niedokładność”
- Katalog dowodów: audit/M1-2026-11-17/role/01-odkrywanie/
- Poziom: P1 (WYSOKIE: ocena sprzeczna z regułą i źródłem projektu; BRD wpisuje BR-CWI-001 na listę blokerów, `docs/brd/README.md:33`)
- Realność: realny · Pewność: wysoka
- Dowód:
  - `apps/mobile/src/features/drills/engine.ts:425` „(v === 'inaccuracy' ? 'wrong' : v)”
  - rdzeń liczy poprawnie: `packages/poker-core/src/grading.ts:146` „f >= t.mixedMin ? 'acceptable' : f > 0 ? 'inaccuracy' : 'wrong'”
  - warunek tymczasowy D-213 jest już spełniony: `docs/decyzje.md:122` „pokazuje `inaccuracy` jak `wrong` do czasu tekstu i stanu od 04/06”
  - stopień ma znak: `apps/mobile/src/features/ocena/StopienOceny.tsx:18` „niedokladnosc: '~'”
  - i słowo: `apps/mobile/src/i18n/locales/pl.json:170` „Niedokładność”
  - sonda na danych solvera (dowody/sonda-rd11.txt): 269 z 4394 par spot × klasa ręki ma akcję z 0 < f < 0,035, np. rfi.utg A9s 0,992/0,008
- Kroki w aplikacji: lekcja M3/M4/M11 → sesja z zadaniem „co robisz z tą ręką” → wybór akcji, którą solver gra w 0,8% → werdykt „✗ Błąd”, a zdanie pod nim mówi, że solver gra tak „prawie nigdy” (klucz `range.wrongRare`).

