# Weryfikacja przeciwna: g2-pieniadze-przeplyw

Data: 2026-11-17. Kod aplikacji: f75acdff (gałąź `claude/sesja-ir-audyt-m1`; `git diff --stat f75acdff HEAD -- apps packages docs` bez zmian poza docs/decyzje/IR.md, którego nie czytałem). Sondy uruchomione w kopii roboczej `git worktree add --detach` w scratchpadzie (node_modules jako dowiązania do repo, `env -u NODE_PATH`). Pełnego `pnpm run ci` nie uruchamiałem. Nie zmieniałem plików śledzonych w repo.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 02-monetyzacja-002 | potwierdzone | `dowody/g2-mon002-sonda.txt`: bez zmian w kodzie 4 z 5 przypadków czerwone (kod 1); po jednej zmianie w kopii roboczej (świeży odczyt `pro`) 5 z 5 zielone (kod 0). Przyczyna: wartość `pro` z zamknięcia renderu w `wejdz` | P1 (ryzyko odrzucenia 2.1(b)) | nie | tak |
| 02-monetyzacja-004 | potwierdzone | `dowody/g2-mon004-sonda.txt` (kod 1): przy `{ ok: true, produkty: [] }` ekran nie ma planów ani komunikatu; adapter daje taki wynik przy pustej albo w całości odfiltrowanej liście (apps/mobile/src/platform/zakupy.ts:122) | P2 | nie | nie |
| 02-monetyzacja-006 | potwierdzone | `dowody/g2-mon006-u5.txt`: w docs/ nie ma wyniku U-5/T-05 z buildem i datą; D-1784 przenosi pełną piaskownicę T-05 na „przed App Store” | P2 | nie | nie jako znalezisko; strategia sama wymaga wykonania U-5 przed wysyłką |
| 03-zakres-001 | potwierdzone | `dowody/g2-zak001.txt`: stan `wkrotce` przy odblokowanych scenariuszach, ekran `/scenarios` z listą szablonów, 33 szablony pl/en, test utrwalający zielony (kod 0) | P1 (ryzyko odrzucenia 2.1(a), średnie prawdopodobieństwo) | nie | tak |
| 01-odkrywanie-001 | potwierdzone | `dowody/g2-odk001-rd11.txt` (kod 1): 377 akcji z 0 < f < 0,035 na danych pl; ekran daje każdej `wrong`, rdzeń (RD-11) `inaccuracy` | P1 (błędna ocena merytoryczna; BR-CWI-001 na liście blokerów wydania publicznego w BRD) | nie | tak |

Wspólne przyczyny: 02-monetyzacja-002 i 02-monetyzacja-006 łączy to, że pełne U-5 na urządzeniu wykryłoby 002 (scenariusz „po zakupie limit znika”, docs/scope-contract.md:131). 02-monetyzacja-004 i 02-monetyzacja-006 łączy stan produktów w App Store Connect (pusta lista w piaskownicy, dopóki produkty nie są gotowe). 03-zakres-001 i 01-odkrywanie-001 mają ten sam wzorzec: stan tymczasowy z decyzji (D-581, D-213) przeżył spełnienie warunku, a test utrwala stan tymczasowy. Przyczyny w kodzie są jednak różne.

## 02-monetyzacja-002 · Po zakupie w sesji płacący widzi wyczerpany limit

**Wynik: potwierdzone.** Mechanizm, którego audytor nie nazwał:
- `wejdz` czyta `pro` z renderu: apps/mobile/src/app/session.tsx:136 „pierwszePodejscieTestu: !testyW.wartosc.some((w) => w.modulId === moduleId), pro,”, a `zaladuj` trzyma `wejdz` z tego samego renderu (apps/mobile/src/app/session.tsx:197 „}, [wejdz]);”).
- `onDostep` ustawia Pro i od razu woła ten stary `zaladuj`: apps/mobile/src/app/session.tsx:284 „useDostep.setState({ pro: d });”. Stary `wejdz` dostaje `pro = false`, więc `przygotujStart` zwraca ekran startu z wyczerpanym limitem.
- Efekt ratunkowy apps/mobile/src/app/session.tsx:205 „if (pro && stan.stan === 'zakup') zaladuj();” nie zadziała, bo `zaladuj` ustawił już stan `ladowanie` (apps/mobile/src/app/session.tsx:189 „ustawStan({ stan: 'ladowanie' });”). Dlatego działa tylko przypadek „tylko nasłuch”: tam Pro przychodzi, gdy stan to jeszcze `zakup`.
- Sonda kontrolna (`dowody/g2-mon002-sonda.txt`, część B) zamienia tylko `pro,` na `pro: useDostep.getState().pro,` w kopii roboczej. Wynik: 5 z 5 zielonych. To potwierdza przyczynę.

Czego nie znalazłem: decyzji ani testu, które by to unieważniały. D-247 i D-267 opisują zamierzone zachowanie, czyli „ponowne wejście bez licznika” (komentarz przy `onDostep` w session.tsx). Ścieżki z ustawień i ze stopki „Dziś” (`/purchase`, apps/mobile/src/app/purchase.tsx:23 „router.back();”) nie mają tej wady.

Poziom: P1 pasuje. Limit to jedna aktywność dziennie (packages/domena/src/konfiguracja.ts:5 „LIMIT_AKTYWNOSCI_DZIENNIE: 1,”). Recenzent trafia więc na ekran zakupu z sesji już przy drugiej aktywności dnia. Zaraz po zapłacie widzi „0 darmowych aktywności” i „Pełny dostęp”, czyli zakup, który wygląda na niedziałający (2.1(b): „complete … and functional”, cytat w e0b-wytyczne-apple.txt roli 02). Danych to nie psuje: dostęp jest zapisany, a wyjście i ponowne wejście daje sesję bez licznika.
- 1012: nie blokuje. Nie ma App Review, jedynym użytkownikiem jest właściciel, funkcję da się obejść ponownym wejściem, a kategoria „ryzyko odrzucenia” nie dotyczy testów wewnętrznych.
- App Store: blokuje (WYSOKIE: ryzyko odrzucenia przez Apple).

## 02-monetyzacja-004 · Pusta lista produktów bez komunikatu

**Wynik: potwierdzone.** apps/mobile/src/features/zakup/EkranZakupu.tsx:95 „{odczyt !== null && !odczyt.ok ? (” pokazuje komunikat tylko przy błędzie. Gałąź apps/mobile/src/features/zakup/EkranZakupu.tsx:103 „{odczyt?.ok ? (” mapuje listę bez przypadku pustego. Adapter zwraca `ok: true` także przy pustej liście i odfiltrowuje wiersze bez ceny albo z obcym id: apps/mobile/src/platform/zakupy.ts:122 „return { ok: true, produkty: wiersze.map(produkt).filter((p): p is ProduktSklepu => p !== null) };”. Sonda (`dowody/g2-mon004-sonda.txt`) pokazuje cały tekst ekranu. Są w nim tytuł, „Bez dziennego limitu…”, „Przywróć zakupy”, „Wróć do lekcji” i linki prawne. Nie ma ceny, przycisku planu ani komunikatu. Istniejący test ustawień (apps/mobile/src/features/ustawienia/__tests__/pelnyDostep-08.test.tsx:69) używa pustej listy tylko jako atrapy. Nie sprawdza, co widzi użytkownik.

Realność: wpis apps/mobile/src/../../../docs/wydanie/plan-1.0.md nie jest potrzebny. docs/wydanie/plan-1.0.md:86 „w App Store Connect brak produktów” jest nieaktualne, bo później zapisano produkty (docs/programista/plan-08.md:1236 „Zapis produktów ASC 42700037429 zielony”). Produkty w stanie niegotowym (np. bez metadanych do recenzji) nie wracają z piaskownicy, więc pusta lista na TestFlight jest możliwa, dopóki stan produktów się nie domknie. Pewność co do stanu ASC dziś: niska.

Poziom: P2 pasuje. Funkcja nie jest „nie do użycia” z winy kodu: bez produktów zakup jest niemożliwy także z komunikatem. Komunikat zmienia tylko to, czy użytkownik rozumie, co się dzieje.
- 1012: nie blokuje.
- App Store: nie blokuje. Gdyby produktów brakowało przy recenzji, odrzucenie 2.1(b) przyjdzie niezależnie od komunikatu. To sprawa konfiguracji ASC, nie tego znaleziska.

## 02-monetyzacja-006 · U-5 bez daty i wyniku

**Wynik: potwierdzone.** docs/jakosc/strategia.md:246 „pełne przed App Store” w wierszu U-5/T-05. Zasada z docs/jakosc/strategia.md:237 „bez nich = „nie sprawdzono”” oznacza, że brak wyniku to „nie sprawdzono”. Przeszukanie docs/ (`dowody/g2-mon006-u5.txt`, kod 0) nie znajduje wyniku z buildem i datą. Są tylko zapowiedzi i backlog: docs/programista/koordynator.md:63 „U-2/U-5 i zrzuty na telefonie” oraz plan W-08, docs/wydanie/plan-1.0.md:241 „telefon: lista D-04 (T-01–T-10, języki, piaskownica, U-2, U-5)”.

Co osłabia skutek: D-1784 świadomie przenosi pełną piaskownicę na „przed App Store” (docs/decyzje/HV.md:10 „ciężkie sprawdzenia „przed App Store” (piaskownica pełna T-05”). Brak wyniku przed 1012 jest więc zgodny z decyzją, a nie przeoczeniem. Kod zakupu ma testy jednostkowe i RNTL, ale nie przechodzą one przez prawdziwy StoreKit.

Poziom: P2 pasuje. To brak kontroli, nie wada produktu. Związek: U-5 złapałoby 02-monetyzacja-002.
- 1012: nie blokuje (D-1784).
- App Store: nie blokuje jako znalezisko. Własna strategia projektu (strategia.md wiersz U-5, plan W-08) i tak wymaga wykonania U-5 przed wysyłką, więc to warunek wstępny wysyłki, a nie bloker z progu audytu.

## 03-zakres-001 · Kafelek „Scenariusze” mówi „Wkrótce”

**Wynik: potwierdzone.** apps/mobile/src/features/dzis/widok.ts:99 „scenariusze: !odblokowane ? 'po_m2' : wyczerpany ? 'limit' : 'wkrotce',” oznacza, że po odblokowaniu, bez wyczerpanego limitu i także z Pro (`limit.bezLimitu`), stan to zawsze `wkrotce`. Ekran mapuje go na „Wkrótce” (apps/mobile/src/app/(tabs)/index.tsx:59 „t('today.scenariosSoon')”), a kafelek otwiera działającą listę: apps/mobile/src/app/scenarios.tsx:30 „const szablony = getScenarioTemplates(db);”.

Decyzja, która by to unieważniała, nie istnieje. D-581 wprowadza „Wkrótce” wyraźnie jako stan przejściowy: docs/decyzje.md:368 „Krok F zastępuje ekran wyborem poziomu i startem (BR-SCN-003) i zmienia stan kafelka na „Poziom: … (auto)””. Zadanie zostało w docs/programista/stan-bt.md:19 „do zmiany na stan gotowości, gdy treść ma szablony”. Test utrwala stan przejściowy, a jego nazwa sama to mówi: apps/mobile/src/features/dzis/__tests__/kafle-bi.test.ts:33 „odblokowuje scenariusze (stan „wkrótce” do kroku F)” (zielony, `dowody/g2-zak001.txt`). Lekcje nie są blokowane kolejnością (apps/mobile/src/app/(tabs)/lessons.tsx:97), więc recenzent dojdzie do modułu 2 jedną lekcją.

Poziom: P1 z zastrzeżeniem. To ryzyko odrzucenia z 2.1(a), czyli treść tymczasowa albo zapowiedź funkcji. Prawdopodobieństwo średnie: kafelek po dotknięciu działa, ale napis „Coming soon” na funkcji z opisu sklepu to typowy powód odrzucenia. Merytorycznie nic nie jest błędne.
- 1012: nie blokuje (bez App Review).
- App Store: blokuje (WYSOKIE: ryzyko odrzucenia).

## 01-odkrywanie-001 · „Błąd” zamiast „Niedokładność” w zadaniach z zakresu

**Wynik: potwierdzone.** apps/mobile/src/features/drills/engine.ts:425 „(v === 'inaccuracy' ? 'wrong' : v)”. Rdzeń liczy zgodnie z RD-11: packages/poker-core/src/grading.ts:146 „f >= t.mixedMin ? 'acceptable' : f > 0 ? 'inaccuracy' : 'wrong'”. Opcja `wrong` dostaje `correct: false` bez `acceptable` (apps/mobile/src/features/drills/engine.ts:461), a ocena idzie w stopień `blad` (apps/mobile/src/features/drills/grade.ts:117 „close: 'niedokladnosc', size: 'blad', wrong: 'blad',”). Na ekranie widać więc „✗ Błąd”.

Niezależna sonda na bazie pl (`dowody/g2-odk001-rd11.txt`) pomija klasy `uncertain`, tak jak losowanie. Wynik: 377 akcji z 0 < f < 0,035, każda ma na ekranie werdykt `wrong`, a w rdzeniu `inaccuracy`. Przykład: rfi.utg A9s 0,992/0,008. Liczby różnią się od sondy audytora (269 z 4394), bo czytam wszystkie spoty z bazy. Wniosek jest ten sam.

Czy D-213 to unieważnia? Nie. Odstępstwo było warunkowe: docs/decyzje.md:122 „pokazuje `inaccuracy` jak `wrong` do czasu tekstu i stanu od 04/06”. Warunek jest spełniony:
- stan i znak istnieją: apps/mobile/src/features/ocena/StopienOceny.tsx:18 „niedokladnosc: '~'”;
- tekst istnieje: apps/mobile/src/i18n/locales/pl.json:170 „Niedokładność”;
- rola 04 przyjęła znaki w D-284;
- scenariusze już używają stopnia `niedokladnosc` (apps/mobile/src/features/scenariusz/wariant.ts:214).

Tytułowe „opis w sklepie” się zgadza: store/app-store-metadata.json:22 obiecuje „inaccuracy”. W zadaniach z zakresu ten stopień jednak nigdy się nie pojawia.

Poziom: P1 pasuje.
- BRD wpisuje RD-11 na listę blokerów wydania publicznego: docs/brd/README.md:33 „błędna ocena zagrań, sprzeczna ze źródłem (ER-01)”, a docs/brd/README.md:23 „Niespełnienie któregokolwiek blokuje wydanie publiczne.”
- Kategoria progu to „błędne twierdzenia merytoryczne”.
- Skutek łagodzą dwie rzeczy: zdanie pod oceną podaje prawdziwą częstość („Solver gra tak tylko w {{pct}} przypadków, czyli prawie nigdy.”), a punkty są te same (0 za oba stopnie, D-213).

Blokowanie:
- 1012: nie blokuje. Blokery BRD dotyczą wydania publicznego, nie ma użytkowników, punktacja się nie zmienia.
- App Store: blokuje.
