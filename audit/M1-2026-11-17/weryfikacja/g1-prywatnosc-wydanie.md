# Weryfikacja przeciwna: g1-prywatnosc-wydanie (M1, 2026-11-17)

Wejście: `audit/M1-2026-11-17/weryfikacja/wejscie-g1-prywatnosc-wydanie.md` (11 ID). Kod aplikacji = f75acdff16915aeb43ff788888216e28616c11ed. HEAD gałęzi audytu (c28ee78b) nie różni się od f75acdff w `apps`, `packages`, `site`, `store`, `docs/wydanie`, `tests`, `.gitignore` ani `README.md` (`git diff --stat` puste, kod 0: dowody/g1-prywatnosc-wydanie-adresy.txt). Sonda testu w osobnym drzewie roboczym w scratchpadzie (`git worktree add --detach`, node_modules jako dowiązanie), pliki śledzone bez zmian.

Próg (CLAUDE.md, „Audyty i wydania” pkt 1): blokują tylko P0/P1 z kategorii z listy. Build 1012 = TestFlight wewnętrzny, bez App Review; wysyłka do App Store = App Review.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 10-wydanie-001 | potwierdzone (drobna nieścisłość liczby wstawek) | dowody/g1-prywatnosc-wydanie-adresy.txt | P1 (WYSOKIE; P0 zawyżone, bez skutku dla progu) | nie | tak |
| 02-monetyzacja-001 | potwierdzone, ta sama przyczyna co 10-wydanie-001 | dowody/g1-prywatnosc-wydanie-adresy.txt | P1 (WYSOKIE) | nie | tak |
| 01-odkrywanie-002 | potwierdzone (jeden krok nieścisły, jeden podpunkt P2) | dowody/g1-prywatnosc-wydanie-adresy.txt | P1 (WYSOKIE) | nie | tak |
| 11-wzrost-001 | potwierdzone (nieścisłość: aplikacja ma 12 języków, nie 35) | dowody/g1-prywatnosc-wydanie-adresy.txt | P2 | nie | nie (sam; brak kontaktu blokuje przez 10-wydanie-001) |
| 10-wydanie-002 | potwierdzone częściowo: brak scenariuszy w notatkach tak; „droga do zakupu nieaktualna” nie | dowody/g1-prywatnosc-wydanie-scenariusze.txt | P1 (WYSOKIE, na granicy) | nie | tak (tekst w obecnej postaci) |
| 01-odkrywanie-006 | potwierdzone | dowody/g1-prywatnosc-wydanie-scenariusze.txt | P2 | nie | nie |
| 02-monetyzacja-003 | potwierdzone, ta sama przyczyna co 01-odkrywanie-006 | dowody/g1-prywatnosc-wydanie-scenariusze.txt | P2 | nie | nie |
| 10-wydanie-003 | potwierdzone (sonda: kontrola CI blokuje poprawny opis) | dowody/g1-prywatnosc-wydanie-k11-sonda.txt | P2 | nie | nie |
| 10-wydanie-004 | potwierdzone | dowody/g1-prywatnosc-wydanie-scenariusze.txt | P2 | nie | nie (zalecany zapis ponownej oceny przed wpisem w ASC) |
| 06-tresci-001 | potwierdzone (także per cytat: 29 cytatów ponad 250 znaków) | dowody/g1-prywatnosc-wydanie-odczyty.txt | P2 dla wydania (naruszenie zasady D-141 w repo, poza artefaktem wydania) | nie | nie |
| 10-wydanie-007 | potwierdzone | dowody/g1-prywatnosc-wydanie-gitignore.txt | P2 (NISKIE) | nie | nie |

**Wspólne przyczyny.**
- A, brak faktów właściciela W-04 (adres poczty, administrator) i adresu polityki w kodzie (D-266, D-270, D-281): 10-wydanie-001, 02-monetyzacja-001, 01-odkrywanie-002 to jedno znalezisko (martwy przycisk polityki plus brak kontaktu); 11-wzrost-001 w części o kontakcie i przycisku zgłoszenia też z tej przyczyny.
- B, weto D-305 przez D-530 (scenariusze w 1.0) nie przeniesione do tekstów sklepu, ekranu zakupu, notatek dla recenzenta, ankiety wiekowej i kontroli CI: 10-wydanie-002, 01-odkrywanie-006, 02-monetyzacja-003, 10-wydanie-003, 10-wydanie-004. Jedna naprawa (rola 10 i 08: tekst plus `tests/kontrole/k11-sklep.test.ts`, plus zapis ponownej oceny ankiety).
- C, nieaktualne `README.md` (język, Drizzle, pomiar wydajności): część 11-wzrost-001 i 01-odkrywanie-006.
- Niezależne: 06-tresci-001, 10-wydanie-007.

## 10-wydanie-001

Wynik: potwierdzone. Nie znalazłem kodu, testu ani decyzji, które by je unieważniały; decyzje D-266 i D-281 potwierdzają stan i sam podział (bloker App Store, nie TestFlight wewnętrznego).
- `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null;”
- `apps/mobile/src/app/purchase.tsx:29` „if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI);” (to samo w `apps/mobile/src/app/session.tsx:292` i `apps/mobile/src/app/scenario.tsx:177`; przycisk rysuje `apps/mobile/src/features/zakup/EkranZakupu.tsx:147`).
- `apps/mobile/src/platform/adresy.ts:18` „export const ADRES_KONTAKTOWY: string | null = null;”
- `store/review-notes.en.txt:28` „- [SUPPORT EMAIL]”
- Strony na żywo: HTTP 200, a pobrane pliki są bajt w bajt równe `site/privacy.html` i `site/support.html` z f75acdff (`cmp`, kod 0); w obu brak `mailto` (grep kod 1); dane: dowody/g1-prywatnosc-wydanie-adresy.txt
- Wytyczne Apple (odczyt roli 10 z 2026-11-17, plik `audit/M1-2026-11-17/role/10-wydanie/dowody/wytyczne-2026-11-17.txt`): 5.1.1(i) „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner”; 1.5 „Make sure your app and its Support URL include an easy way to contact you”. Obie zasady są dziś niespełnione.
- Stan jest znany: `docs/wydanie/sklep.md:70` wpisuje wstawki jako „warunek wysyłki” (10-D01-03).
- Nieścisłość: „10 wstawek” w polityce. Faktycznie jest 11 w każdym języku, razem 22 wystąpienia w 16 wierszach (dowody/g1-prywatnosc-wydanie-adresy.txt) Na wniosek to nie wpływa.

Poziom: P1 (WYSOKIE). Kategoria to ryzyko odrzucenia przez Apple; odrzucenie jest prawie pewne (wymóg wprost w 5.1.1(i), 1.5 i 3.1.2 dla subskrypcji). Skutek jednak da się odwrócić: nowe zgłoszenie, nikt nie traci danych. P0 nic nie zmienia dla progu. Build 1012: nie blokuje, bo TestFlight wewnętrzny nie przechodzi App Review, a jedynym testerem jest właściciel (martwy przycisk to drobna niedogodność). App Store: blokuje. Do wysyłki potrzebny jest adres w `ADRES_PRYWATNOSCI` (adres już działa) oraz W-04 w polityce, na stronie wsparcia i w notatkach.

## 02-monetyzacja-001

Wynik: potwierdzone. To ten sam brak co w 10-wydanie-001 (przyczyna A).
- `apps/mobile/src/platform/adresy.ts:9` „export const ADRES_PRYWATNOSCI: string | null = null;”
- Odnośnika do polityki nie ma nigdzie poza ekranem zakupu: w `apps/mobile/src/app/settings.tsx` i `apps/mobile/src/features/ustawienia` grep „privacy” zwraca kod 1 (dowody/g1-prywatnosc-wydanie-adresy.txt)
- „16 znaczników” to liczba wierszy z wstawkami (`grep -c`), a nie liczba wstawek (22).

Poziom P1, 1012 nie, App Store tak (uzasadnienie jak w 10-wydanie-001). Do naprawy liczyć jako jedno znalezisko z 10-wydanie-001.

## 01-odkrywanie-002

Wynik: potwierdzone, przyczyna A. Dwie korekty:
- Krok „Ustawienia albo ekran zakupu → Privacy Policy” jest nieścisły. W ustawieniach nie ma pozycji polityki; jest wiersz „Pełny dostęp”, który otwiera ekran zakupu (D-325, `apps/mobile/src/app/settings.tsx:104`).
- Podpunkt o D-158 jest prawdziwy, ale wart P2, nie P1. Polityka: `site/privacy.html:39` „pokazać numery pomocy właściwe dla kraju”. Aplikacja rzeczywiście czyta region: `apps/mobile/src/app/help.tsx:23` „return getLocales()[0]?.regionCode ?? '';”. W `apps/mobile/src/data/content/helplines.generated.ts` jest jednak tylko 1 wpis (międzynarodowy), więc numerów krajowych nie ma. To opis na wyrost lokalnego przetwarzania, nie ukryte zbieranie danych. Zdanie trzeba poprawić w `docs/wydanie/polityka-prywatnosci/pl.md` i `en.md`, potem złożyć stronę na nowo.
- `site/privacy.html:24` „Obowiązuje od [DO USTALENIA: data publikacji]” — potwierdzone.
- Sekcja opinii i zgłoszenie błędu są ukryte warunkiem: `apps/mobile/src/app/settings.tsx:132` „{ID_APLIKACJI_SKLEPU && ADRES_KONTAKTOWY ? (” (D-270).

Poziom P1, 1012 nie, App Store tak (jak w 10-wydanie-001).

## 11-wzrost-001

Wynik: potwierdzone.
- `site/support.html:26` „Błąd w konkretnym zadaniu zgłosisz też przyciskiem”
- `apps/mobile/src/app/session.tsx:417` „{ADRES_KONTAKTOWY ? (”
- `README.md:3` „Aplikacja iOS do nauki No-Limit Texas Hold'em od zera, po polsku”
- `README.md:51` „Pomiar wydajności po instalacji: Postęp → Pomiar wydajności → Zmierz” jest nieaktualne: diagnostyka działa tylko pod `__DEV__` (`docs/adr/0011-kod-bez-br-usuniety.md:21` „Diagnostyka (narzędzie dewelopera) zostaje tylko pod”).
- Nieścisłość: aplikacja ma 12 języków (`app.json` locales: 12; słowniki: 12 plus `pl.kontekst.json`), a nie 35. README jest nieaktualne w obu wariantach.

Poziom P2 pasuje do skutku. README nie trafia do sklepu. Strona wsparcia opisuje przycisk, który włączy ten sam fakt W-04. Brak samego kontaktu (wytyczna 1.5) jest już w 10-wydanie-001 i tam blokuje App Store. 1012: nie. App Store: nie samodzielnie (przyczyna A blokuje przez 10-wydanie-001).

## 10-wydanie-002

Wynik: potwierdzone częściowo.
- Potwierdzone: notatki w ogóle nie wspominają scenariuszy (`grep -ci scenario` = 0, kod 1).
- `store/review-notes.en.txt:5` „no play against other people or bots”. Scenariusz pokazuje rywala i rozstrzygnięcie przy pokazaniu kart: `apps/mobile/src/i18n/locales/en.json:1094` „Your opponent shows {{karty}}: their hand ranks higher.” oraz `apps/mobile/src/i18n/locales/en.json:1018` „You: {{ty}}, opponent: {{rywal}}. Depth {{bb}} bb.”
- Notatki napisano 2026-11-09, przed D-530 (2026-11-10). Ich własna lista warunków jest otwarta: `store/review-notes.md:10` „[ ] ścieżki przejdzione na kandydacie”.
- Słabsze niż twierdzi znalezisko:
  - Zdanie o wyniku („the result is a grade and an explanation, never a win or a loss”) zgadza się z tym, co aplikacja mówi przy scenariuszu: `apps/mobile/src/i18n/locales/en.json:1022` „The result is a grade for each decision, not a win.”
  - Rywal działa według szablonu (`apps/mobile/src/features/scenariusz/rodzajeHo.ts:12`), nie jako bot. Zdanie „no … bots” jest więc sporne, a nie jawnie fałszywe.
  - Droga do zakupu w `store/review-notes.en.txt:15` dalej działa. Jest tylko dłuższa niż wiersz „Full access” w ustawieniach (`apps/mobile/e2e/10-zakup-z-ustawien.yaml`), więc nie jest „nieaktualna”.

Poziom: P1 na granicy, utrzymany. Notatki to jedyne wyjaśnienie dla recenzenta przy aplikacji pokerowej (5.3.4, Simulated Gambling). Recenzent zobaczy rozdanie przeciw rywalowi z pulą, którego notatki nie opisują, a jedno zdanie mu zaprzecza. To realne ryzyko odrzucenia z 2.1 albo 2.3.1. Naprawa to tekst przed wklejeniem. 1012: nie (bez App Review). App Store: tak, w obecnej postaci tekstu. Przyczyna B.

## 01-odkrywanie-006

Wynik: potwierdzone.
- `packages/domena/src/limit.ts:29` „rodzaj === 'lekcja' || rodzaj === 'ocena_poziomu'”: nowy wariant scenariusza idzie z limitu, a poza limitem jest tylko powtórka wariantu (KO-043).
- `apps/mobile/src/i18n/locales/en.json:70` „No daily limit: practice sessions, reviews and exam retakes every day.”
- Opis sklepu: w `store/app-store-metadata.json` 0 trafień „scenario” (dowody/g1-prywatnosc-wydanie-scenariusze.txt).
- Treść scenariuszy istnieje: 33 pliki w `content/pl/scenarios` i 33 w `content/en/scenarios`.
- README: jak w 11-wzrost-001 (przyczyna C).

Poziom P2 pasuje. Opis niczego fałszywie nie obiecuje (scenariuszy nie wymienia), a ekran zakupu zaniża to, co daje zakup, zamiast zawyżać. Niepełny opis limitu to szczegół, nie bariera. 1012: nie. App Store: nie. Przyczyna B.

## 02-monetyzacja-003

Wynik: potwierdzone, ta sama przyczyna B co 01-odkrywanie-006.
- `store/review-notes.md:34` „One more activity per day is free: a practice session, a review session or an exam retake.”
- `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:103` „if (wejscie.akcja === 'ekran_zakupu') return { ok: false, powod: 'limit_wyczerpany' };”

Poziom P2, 1012 nie, App Store nie. Naprawić razem z 01-odkrywanie-006 i 10-wydanie-003.

## 10-wydanie-003

Wynik: potwierdzone. Najważniejszy fakt sprawdziłem sondą: kontrola CI aktywnie wymusza zawetowaną D-305.
- `tests/kontrole/k11-sklep.test.ts:147` „bez funkcji spoza 1.0 i bez liczby języków: scenariusze (F-12, D-305)”
- Sonda: w kopii roboczej dopisałem do opisu en-US zdanie zgodne z kodem („…, an exam retake or a new hand scenario”). Wynik: `AK-K-11-l` czerwony, „expected { l: 'en-US', poza: 'scenario' }”, kod 1. Na czystym f75acdff ten sam test daje kod 0 (dowody/g1-prywatnosc-wydanie-k11-sonda.txt). Poprawka tekstu sklepu wymaga więc zmiany tej kontroli.
- `apps/mobile/src/i18n/__tests__/zakup-tekst-10.test.ts:2` „Scenariusze (F-12) są poza 1.0 (D-305)”. Ten test dziś nie blokuje, bo warunek `content/pl/scenarios` jest spełniony. Komentarz jest nieaktualny, co zgadza się ze znaleziskiem.
- `site/support.html:39` „Pełny dostęp zdejmuje dzienny limit: sesje ćwiczeń, powtórki i powtórne egzaminy każdego dnia.”

Poziom P2 pasuje: nieaktualny tekst i kontrola, bez błędnej liczby ani fałszywej obietnicy. 1012: nie. App Store: nie. Przyczyna B.

## 10-wydanie-004

Wynik: potwierdzone.
- `docs/wydanie/sklep.md:125` „Brak gry z botami (F-19 NIE) i scenariuszy w 1.0 (D-305).”
- `docs/zakres/scenariusze-plan.md:96` „decyzja należy do roli 10”
- W `docs/decyzje.md` „Simulated” pojawia się tylko w D-310, D-360 i D-400; w `docs/decyzje/*.md` (bez IR) nie ma go wcale. Wpisu roli 10 po D-530 brak.
- ASC: `ageRatingOverrideV2=EIGHTEEN_PLUS` (`audit/M1-2026-11-17/role/10-wydanie/dowody/asc-kontrola-8.txt`, wiersz 54).
- Dodatkowy kontekst: od D-395 kategoria dodatkowa to Games/Card, co podnosi wagę deskryptora przy recenzji.
- Przeciw wyższemu poziomowi: rola 03 oceniła „None” jako zgodne z definicją (brak zakładu), a override 18+ sprawia, że wiek nie jest zaniżony.

Poziom P2 pasuje. Brakuje zapisanej ponownej oceny; obecna odpowiedź ma obronę z przeczytanej definicji. Ryzyko odrzucenia z 2.3.6 jest brzegowe i da się je naprawić w formularzu. 1012: nie. App Store: nie blokuje według progu. Zalecam wpis roli 10 przed wysyłką (przyczyna B).

## 06-tresci-001

Wynik: potwierdzone.
- `docs/tresci/00-rozpoznanie.md:62` „w repo tylko cytat do 250 znaków”
- `tools/content-build/src/sources.ts:6` „export const QUOTE_MAX_CHARS = 250;”
- Pomiar roli (19 źródeł ponad 250 znaków na źródło, maksimum 2565) jest w `audit/M1-2026-11-17/role/06-tresci/dowody/odczyty-znaki.txt`. Mój niezależny pomiar per pojedynczy cytat daje 29 cytatów ponad 250 znaków, maksimum 600, więc limit jest przekroczony przy każdej wykładni.
- Plik jest na zdalnych gałęziach publicznego repo: commit 6883b82d jest w `origin/claude/sleepy-brahmagupta-2065nu` i w gałęzi audytu.
- Do buildu nie wchodzi (brak odwołań do `tresci/odczyty` w `tools/content-build/src` i `apps/mobile`, grep kod 1); dane: dowody/g1-prywatnosc-wydanie-odczyty.txt

Poziom: znalezisko dotyczy kategorii „prawa autorskie”, ale nie artefaktu wydania (binarki ani metadanych sklepu), więc dla progu wydania to P2. Cytaty mają adres źródła i cel weryfikacyjny, a ryzyko roszczenia jest niskie. To jednak naruszenie własnej zasady D-141 w publicznym repo, więc warto je naprawić niezależnie od wydania. Skrócenie nie usunie historii git; o przepisaniu historii decyduje właściciel. Dodatkowy skutek: Pages z tego repo hostują politykę prywatności, więc ewentualne zgłoszenie DMCA uderzyłoby też w adres polityki. 1012: nie. App Store: nie.

## 10-wydanie-007

Wynik: potwierdzone.
- `.gitignore:11` „.env*.local” to jedyny wzorzec środowiska w katalogu głównym.
- `git check-ignore --no-index`: `x.p8`, `credentials.json`, `.env`, `.env.production`, `apps/mobile/.env` i `apps/mobile/credentials.json` nie są ignorowane (kod 1). `apps/mobile/AuthKey.p8` jest ignorowany przez `apps/mobile/.gitignore:16`.
- W historii wszystkich gałęzi nie ma takich plików (grep kod 1).
- Workflowy trzymają klucz ASC w sekretach i `RUNNER_TEMP` (D-352).

Poziom P2 (NISKIE) pasuje: to luka zapobiegawcza, nie wyciek. 1012: nie. App Store: nie. Wszystkie dane: dowody/g1-prywatnosc-wydanie-gitignore.txt
