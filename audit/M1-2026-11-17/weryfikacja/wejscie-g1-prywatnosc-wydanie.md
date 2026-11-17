### 10-wydanie-001 · Aplikacja nie ma działającego odnośnika do polityki prywatności, a strona wsparcia, polityka i notatki nie podają kontaktu
- Katalog dowodów: audit/M1-2026-11-17/role/10-wydanie/
- Poziom: P0 → KRYTYCZNE (ryzyko odrzucenia przez Apple, prywatność); blokuje wysyłkę do App Review, nie buildy TestFlight wewnętrzne (D-281)
- Realność: realny (przy wysyłce do recenzji; testerzy już dziś trafiają na martwy przycisk) · Pewność: wysoka
- Dowód: `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null;”; przycisk „Privacy Policy” na ekranie zakupu nic nie robi: `apps/mobile/src/app/purchase.tsx:29` „if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI);”; kontakt ukryty: `apps/mobile/src/platform/adresy.ts:18` „export const ADRES_KONTAKTOWY: string | null = null;”. Opublikowana strona wsparcia (Support URL ze `store/app-store-urls.json`) mówi „Kontakt Pytania, błędy i pomysły: [DO USTALENIA: adres poczty, W-04]” i obiecuje przycisk „Zgłoś błąd w tym zadaniu”, który w tym buildzie jest ukryty; opublikowana polityka ma 10 wstawek `[DO USTALENIA]` (administrator, adres poczty, odbiorcy, data wejścia w życie): `dowody/adresy-sklepu.txt` (HTTP 200, kod 0). Notatki dla recenzenta kończą się wstawką: `store/review-notes.en.txt:28` „- [SUPPORT EMAIL]”.
- Kroki w aplikacji: Ustawienia → Pełny dostęp → „Privacy Policy” → nic się nie dzieje; App Store → strona produktu → Support → strona bez adresu.

### 02-monetyzacja-001 · Przycisk „Privacy Policy” na ekranie zakupu nic nie otwiera
- Katalog dowodów: audit/M1-2026-11-17/role/02-monetyzacja/
- Poziom: P0 (KRYTYCZNE: ryzyko odrzucenia przez Apple; blokuje publikację w App Store, nie blokuje TestFlight wewnętrznego)
- Realność: realny   · Pewność: wysoka
- Dowód: `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null;”; dowody/e1-prywatnosc-link.txt (strona `site/privacy.html` działa pod adresem z `store/app-store-urls.json`, HTTP 200, ale ma 16 znaczników [DO USTALENIA]; w aplikacji brak innego odnośnika do polityki prywatności).
- Kroki w aplikacji: „Dziś” → wyczerpany limit → „Pełny dostęp” → „Privacy Policy”: brak reakcji.

### 01-odkrywanie-002 · Polityka prywatności opublikowana, ale niepodpięta w aplikacji, z niedokończonymi danymi administratora; kontakt i zgłoszenie błędu ukryte
- Katalog dowodów: audit/M1-2026-11-17/role/01-odkrywanie/
- Poziom: P1 (WYSOKIE: ryzyko odrzucenia przez Apple i prywatność; blokuje publikację w App Store, nie TestFlight wewnętrzny)
- Realność: realny (przy wysyłce do App Review) · Pewność: wysoka
- Dowód:
  - `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null”
  - adres istnieje od 2026-11-09 (D-308): `store/app-store-urls.json:3` „https://lkarwowski494.github.io/Szkola_pokera/privacy.html”
  - `apps/mobile/src/app/purchase.tsx:29` „if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI)” — przycisk polityki na ekranie zakupu nic nie otwiera; w ustawieniach brak odnośnika (dowody/mechanizmy-grep.txt)
  - `apps/mobile/src/platform/adresy.ts:18` „export const ADRES_KONTAKTOWY: string | null = null”
  - skutek (D-270): sekcja opinii i zgłoszenie błędu ukryte, więc BR-OPIN-002 i BR-OPIN-003 (F-17, MVP) nie działają
  - opublikowana polityka: `site/privacy.html:24` „Obowiązuje od [DO USTALENIA: data publikacji]” (administrator i adres poczty też do ustalenia)
  - `site/privacy.html:39` „pokazać numery pomocy właściwe dla kraju” — sprzeczne z D-158 (bez numerów krajowych)
- Kroki w aplikacji: Ustawienia albo ekran zakupu → „Privacy Policy” → brak reakcji; sekcja opinii nieobecna.

### 11-wzrost-001 · Publiczna strona wsparcia i README opisują funkcje i język, których build 1011 nie ma
- Katalog dowodów: audit/M1-2026-11-17/role/11-wzrost/
- Poziom: P2 (lista daje P1 za funkcję, której nie ma; obniżam z nazwanym powodem: funkcja jest w kodzie i odblokuje ją ten sam fakt W-04, którego brak strona sama pokazuje wstawką `[DO USTALENIA]`, a aplikacja nie ma wydania ani użytkowników)
- Realność: brzegowy · Pewność: wysoka
- Dowód (`dowody/e1-strona-poza-sklepem.txt`):
  - strona na żywo `https://lkarwowski494.github.io/Szkola_pokera/support.html` (HTTP 200, tekst identyczny z `site/` @ f75acdff; wstawki `[DO USTALENIA]`: support 3, privacy 16);
  - `site/support.html:26` „Zgłoś błąd w tym zadaniu”;
  - `site/privacy.html:57` „Napisz do nas” i „Zgłoś błąd w tym zadaniu” otwierają pocztę;
  - w buildzie oba ukryte: stała `ADRES_KONTAKTOWY` = null w `apps/mobile/src/platform/adresy.ts:18`; warunki w `apps/mobile/src/app/session.tsx:417` i `apps/mobile/src/app/settings.tsx:132`;
  - `README.md:3` „Aplikacja iOS do nauki No-Limit Texas Hold'em od zera, po polsku” (aplikacja ma 35 języków);
  - `README.md:51` „Pomiar wydajności po instalacji: Postęp → Pomiar wydajności → Zmierz” (diagnostyka tylko pod `__DEV__`, ADR 0011).
- Kroki w aplikacji: tester czyta stronę wsparcia, szuka „Zgłoś błąd w tym zadaniu” pod oceną w buildzie 1011 i go nie znajduje.

### 10-wydanie-002 · Notatki dla App Review nie opisują scenariuszy całego rozdania i twierdzą rzeczy, którym scenariusz przeczy
- Katalog dowodów: audit/M1-2026-11-17/role/10-wydanie/
- Poziom: P1 → WYSOKIE (ryzyko odrzucenia przez Apple: 2.1 funkcje nieoczywiste, 2.3.1, pytanie o 5.3.4)
- Realność: realny (tekst do wklejenia przed wysyłką; w ASC notatki dziś puste) · Pewność: wysoka
- Dowód: `store/review-notes.en.txt:5` „There are no stakes, no chips or credits, no prizes, no leaderboards and no play against other people or bots. An exercise shows a situation and asks for a decision; the result is a grade and an explanation, never a win or a loss.” Tymczasem scenariusz (główna funkcja 1011, 33 szablony, kafelek na „Dziś”) to rozdanie przeciw rywalowi z pulą w bb i pokazaniem kart: `apps/mobile/src/i18n/locales/en.json:1094` „Your opponent shows {{karty}}: their hand ranks higher.”; słowo „scenario” nie występuje w notatkach (`grep -ci scenario store/review-notes.en.txt` → 0). Ścieżka do zakupu jest nieaktualna: notatki każą zużyć darmową aktywność (`store/review-notes.en.txt:15`), a od D-325 Ustawienia mają wiersz Pełny dostęp (flow `apps/mobile/e2e/10-zakup-z-ustawien.yaml`), o którym `store/review-notes.en.txt:17` nie mówi.
- Kroki w aplikacji: recenzent czyta „no play against … bots … never a win or a loss”, otwiera Dziś → Scenariusze → rozdanie, widzi rywala, pulę i pokazanie kart.

### 01-odkrywanie-006 · Opisy dostępu i README nie odpowiadają kodowi: scenariusze zużywają limit, a ekran zakupu i opis sklepu ich nie wymieniają
- Katalog dowodów: audit/M1-2026-11-17/role/01-odkrywanie/
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Dowód: nowy scenariusz zużywa dzienny limit, darmowe są tylko lekcje, ocena poziomu, pierwszy test i powtórka wariantu (`packages/domena/src/limit.ts:29` „rodzaj === 'lekcja' || rodzaj === 'ocena_poziomu'”). Ekran zakupu: `apps/mobile/src/i18n/locales/en.json:70` „practice sessions, reviews and exam retakes every day”; opis sklepu: `store/app-store-metadata.json:22` „a practice session, a review session or an exam retake” — bez scenariuszy, a opis nie wymienia scenariuszy w ogóle. README: `README.md:3` „Aplikacja iOS do nauki No-Limit Texas Hold'em od zera, po polsku” (12 języków, D-302), dalej Expo SDK 57, Drizzle i dokumentacja tylko na Dysku (BRD jest w `docs/brd/`).
- Kroki w aplikacji: użytkownik darmowy zaczyna nowy scenariusz po sesji ćwiczeń → ekran limitu, choć opis wymieniał tylko ćwiczenia, powtórki i egzamin.

### 02-monetyzacja-003 · Ekran zakupu, opis w sklepie i notatki dla recenzenta pomijają scenariusze
- Katalog dowodów: audit/M1-2026-11-17/role/02-monetyzacja/
- Poziom: P2
- Realność: realny   · Pewność: wysoka
- Dowód: `apps/mobile/src/i18n/locales/en.json:70` „No daily limit: practice sessions, reviews and exam retakes every day. Lessons stay free.”; opis en-US (`store/app-store-metadata.json:22`, sekcja ACCESS) i `store/review-notes.md:34` wymieniają jako darmową aktywność dnia tylko sesję, powtórki i egzamin powtórny. Scenariusze są w 1.0 (D-530 zawetowało D-305), mają 33 szablony w treści en i zużywają limit (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:103`).
- Kroki w aplikacji: użytkownik bez zakupu zaczyna scenariusz i zużywa limit dnia, choć opis limitu go nie wymienia; ekran zakupu nie mówi, że scenariusze będą bez limitu.

### 10-wydanie-003 · Opis sklepu, strona wsparcia i ekran zakupu pomijają scenariusze, a dwie kontrole CI wymuszają zawetowaną D-305
- Katalog dowodów: audit/M1-2026-11-17/role/10-wydanie/
- Poziom: P2 → ŚREDNIE (nieaktualny szczegół; tekst nie twierdzi niczego fałszywego o funkcji, ale niepełnie opisuje limit)
- Realność: realny · Pewność: wysoka
- Dowód:
  - opis en-US, sekcja ACCESS: `store/app-store-metadata.json:22` „Without a purchase you get one free activity per day: a practice session, a review session or an exam retake.”; opis nie wymienia scenariuszy wcale;
  - nowy wariant scenariusza też zużywa limit, poza limitem jest tylko powtórka tego samego wariantu: `packages/domena/src/limit.ts:29`;
  - strona wsparcia: `site/support.html:39` „Pełny dostęp zdejmuje dzienny limit: sesje ćwiczeń”;
  - ekran zakupu: `apps/mobile/src/i18n/locales/en.json:70` „No daily limit: practice sessions, reviews and exam retakes every day.”;
  - kontrola sklepu odrzuca słowo scenario z uzasadnieniem D-305: `tests/kontrole/k11-sklep.test.ts:147` „bez funkcji spoza 1.0 i bez liczby języków: scenariusze (F-12, D-305)”;
  - test ekranu zakupu opiera się na D-305 (dziś nie blokuje, bo treść scenariuszy istnieje, ale komentarz i warunek są nieaktualne): `apps/mobile/src/i18n/__tests__/zakup-tekst-10.test.ts:2`.
- Kroki w aplikacji: użytkownik bez zakupu czyta opis, rozgrywa nowy scenariusz i nie może już zacząć sesji ćwiczeń tego dnia, choć opis wymienił tylko trzy rodzaje aktywności.

### 10-wydanie-004 · Odpowiedzi ankiety wiekowej opierają się na „braku scenariuszy w 1.0” i nie zostały ponownie ocenione przez rolę 10
- Katalog dowodów: audit/M1-2026-11-17/role/10-wydanie/
- Poziom: P2 → ŚREDNIE (bez blokady wg CLAUDE.md pkt 1: wyświetlana kategoria to override 18+, więc wiek nie jest zaniżony; ryzyko dotyczy deskryptorów)
- Realność: brzegowy · Pewność: średnia co do odpowiedzi, wysoka co do braku ponownej oceny
- Dowód: podstawa D-310 w `docs/wydanie/sklep.md:125` „Brak gry z botami (F-19 NIE) i scenariuszy w 1.0 (D-305).”; D-305 zawetowane (D-530). Rola 03 oceniła, że „None” zostaje, i zostawiła decyzję roli 10 (`docs/zakres/scenariusze-plan.md:96` „decyzja należy do roli 10”); w `docs/decyzje.md` brak wpisu roli 10 po D-530 o ankiecie (`grep -n -i "simulated\|D-310" docs/decyzje.md` → tylko D-310, D-341, D-362). W ASC: override 18+ i Simulated Gambling niezadeklarowane (`dowody/asc-kontrola-8.txt`). Definicja z dziś: „Simulated Gambling: Betting or wagering without using real money …” (`dowody/wytyczne-2026-11-17.txt`); w scenariuszu użytkownik wybiera bet/call/raise w bb do puli, a rozdanie kończy pokazanie kart.
- Kroki w aplikacji: rodzic lub regulator widzi w sklepie deskryptory bez symulowanego hazardu, a aplikacja rozgrywa rozdania pokera z pulą i pokazaniem kart.

### 06-tresci-001 · Publiczne repo zawiera wyciągi z cudzych artykułów ponad limit 250 znaków
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci/
- Poziom: P1 (WYSOKIE: kategoria „prawa autorskie” z CLAUDE.md pkt 1; pliki leżą w `docs/`, nie wchodzą do buildu aplikacji, więc samego pliku binarnego nie dotyczą — o tym, czy to blokuje wydanie, rozstrzyga M1)
- Realność: brzegowy (krótkie fragmenty długich artykułów, cel weryfikacyjny; ryzyko roszczenia niskie, ale repo jest publiczne) · Pewność: wysoka
- Dowód: zasada projektu docs/tresci/00-rozpoznanie.md:62 „Kopie stron źródeł: nie w repo publicznym (prawa autorskie); w repo tylko cytat do 250 znaków”; D-141 (docs/decyzje.md:50). Pomiar: 19 źródeł z wyciągiem ponad 250 znaków, łącznie ok. 15,5 tys. znaków, najwięcej 2565 znaków z jednego artykułu (`dowody/odczyty-znaki.txt`, kod 0; zdania: `dowody/odczyty-zdania.txt`).
- Kroki w aplikacji: brak (repo publiczne na GitHubie, nie aplikacja).

### 10-wydanie-007 · `.gitignore` w katalogu głównym nie chroni plików kluczy i `.env`
- Katalog dowodów: audit/M1-2026-11-17/role/10-wydanie/
- Poziom: P2 → NISKIE
- Realność: brzegowy · Pewność: wysoka
- Dowód: `.gitignore:11` „.env*.local” to jedyny wzorzec środowiska; `git check-ignore --no-index` → nieignorowane: `x.p8`, `credentials.json`, `.env` w katalogu głównym oraz `apps/mobile/.env`, `apps/mobile/credentials.json` (`apps/mobile/.gitignore` obejmuje `*.p8`, `*.p12`, `*.jks`, `*.mobileprovision`); `dowody/sekrety-historia.txt` (6 UWAG, kod 0).
- Kroki w aplikacji: brak (dotyczy repo; publiczne).

