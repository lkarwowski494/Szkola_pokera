# Zgłoszenia roli 08 (Programista): 08-F15–08-F29

Zebrane 2026-11-08 z `docs/programista/plan-08.md` (części 5b i 6: „Zgłoszenia nowe”, „Zgłoszenia części 5b (zbiorczo)”, „Zgłoszenia części 6”, „Luki z opcjami”, „Teksty do akceptacji”, „Ryzyka”) i `docs/decyzje.md`. Każde miejsce w kodzie i dokumentach sprawdzone w repo na `ad47a07` (grep / odczyt linii; numery linii `plan-08.md` — „l. …” — według `ad47a07`, przed dopisaniem odnośników do tego pliku, które przesuwają je o 2–8); czego nie dało się potwierdzić, oznaczone „do sprawdzenia”. Treść zgłoszeń w `plan-08.md` zostaje bez zmian; ten plik jest zestawieniem dla ról 04, 05, 06, 07 (i 01/03/10, gdzie dotyczy). Zgłoszenia 08-F01–F14 (części 1–5a) poza zakresem tego pliku.

Waga według progu wydania z `CLAUDE.md` („Audyty i wydania” pkt 1): blokują tylko KRYTYCZNE i WYSOKIE; ŚREDNIE i NISKIE do backlogu. Wagę nadał agent przy zestawieniu (do weta).

## Tabela

| ID | Do roli | Problem (skrót) | Miejsce w kodzie / dokumencie | Źródło | Stan | Waga |
|---|---|---|---|---|---|---|
| 08-F15 | 04 | Kolory talii czterokolorowej (niebieski karo, zielony trefl) poza systemem 04; zostają w `tk.przejsciowe` (wyjątek D-259 przedłużony) | `apps/mobile/src/components/PlayingCard.tsx:24`; `apps/mobile/src/theme/tokens.ts:19, 29–30, 40–41` | plan-08 „E1 część 5b”, „Zgłoszenia nowe” (l. 477); „Luki z opcjami” L-2 (l. 579); D-259, D-274 | rozstrzygnięte D-284 (tokeny `cardBlue`, `cardGreen`; wykonuje 08 w `docs/design/tokeny.ts` + kopii) | NISKIE (wygląd, wyjątek nazwany) |
| 08-F16 | 04 | (a) Promienie `BlokLekcji` z makiety (28/22 px) bez tokenu — użyte `promien.sukno` i wcięcie `odstep.s`; (b) lista lekcji na „Dziś” pod „Wszystkie lekcje”, a makieta e3 nie ma miejsca na mapę kursu | (a) `apps/mobile/src/features/dzis/BlokLekcji.tsx:9, 16–17`; makieta `docs/design/ekrany/e3.css:128–129`; (b) `apps/mobile/src/app/(tabs)/index.tsx:114, 138`; w `docs/design/ekrany/e3.html` brak „Wszystkie lekcje” (grep, 0 trafień) | plan-08 l. 477, 542; D-259 | rozstrzygnięte: (a) akceptacja D-284; (b) pytanie produktowe do właściciela (audyt 04, PRZEKAZANIE) | NISKIE (wygląd) |
| 08-F17 | 06 | `content/terms.yaml`: `skip` dla form „sesja ćwiczeń” przy terminie „sesja” (nazwa przepływu PR-03, nie posiedzenie przy pokerze) — informacyjne, do potwierdzenia przez 06 | `content/terms.yaml:868–870` | plan-08 l. 477, 542; D-261 | zamknięte: zaakceptowane przez 06 (D-314, 2026-11-09) | NISKIE |
| 08-F18 | 05/07 | `EkranUstawien` dostał opcjonalny prop `sekcje` (dane, opinie, przypomnienie, język składa trasa); kontrakt 07 i jego test bez zmian — informacyjne, do wpisania w kontrakt/architekturę | `apps/mobile/src/features/ustawienia/EkranUstawien.tsx:17–18, 21, 39`; trasa `apps/mobile/src/app/settings.tsx` | plan-08 l. 477, 542; D-262 | otwarte (wdrożone, czeka na wpis 05/07) | NISKIE |
| 08-F19 | 01/03/06 | BR-ONB-001 mówi o „pytaniach o poziom i cel”, BR-ONB-002 o użytkowniku, który „zaznaczył, że nie zna zasad” — pula 06 ma tylko pytania z egzaminów; brak pytania o cel i samooceny. Wdrożone: brak poprawnych → M0, „Pomiń” → M0 | `docs/brd/wymagania-nauka.md:16` („pytania o poziom i cel”), `:33` („zaznaczył, że nie zna zasad pokera”); `docs/tresci/ocena-poziomu-pytania.md`; `apps/mobile/src/features/ocena-poziomu/` | plan-08 l. 477, 542; D-264 | otwarte | ŚREDNIE (kryterium BRD spełnione częściowo; przepływ działa) |
| 08-F20 | 10/właściciel | Adres polityki prywatności `[DO USTALENIA]`; `ADRES_PRYWATNOSCI = null`, przycisk na ekranie zakupu bez działania | `apps/mobile/src/platform/adresy.ts:5, 9` | plan-08 l. 477, 542 (pogrubione „bloker App Store”); D-266; `docs/programista/koordynator.md:51` | otwarte (fakt właściciela) | **WYSOKIE** dla publikacji w App Store (ryzyko odrzucenia przez Apple); nie blokuje TestFlight wewnętrznego (D-266) |
| 08-F21 | 07 | Ekran sesji (`session.tsx`) bez testu renderu: start, zakup, „Zakończ”, wybór `PanelDecyzji`/lista, nagłówek oceny, `Feedback` w przeglądzie — tylko strażnik statyczny i E2E; potwierdzone mutacjami M29–M32 (przeżywają) | `apps/mobile/src/app/session.tsx:364, 399` (gałęzie `maStrategie`); `apps/mobile/src/__tests__/sesja-ekran-08.test.ts:10–15` (strażnik na tekście źródła) | plan-08 l. 477, 542, 609, 626; D-279 | otwarte | ŚREDNIE (luka w testach, zachowanie sprawdza E2E 01 i 06) |
| 08-F22 | 04 | Ikona ustawień na „Dziś” jako znak ⚙︎ — system nie ma komponentu ikony; makieta e3 ma SVG | `apps/mobile/src/app/(tabs)/index.tsx:91–95`; makieta `docs/design/ekrany/e3.html:30` (`svg` w `.ikona-ust`) | plan-08 „E1 część 5b: kroki 5–8”, „Zgłoszenia nowe” (l. 494), l. 542 | rozstrzygnięte D-284 (⚙︎ z limitem 1,4; wykonuje 08) | NISKIE (wygląd) |
| 08-F23 | 10/właściciel | App Store ID i adres poczty do opinii i zgłoszeń `[DO USTALENIA]`; bez nich „Oceń w sklepie”, „Napisz do nas” i „Zgłoś błąd w tym zadaniu” są ukryte | `apps/mobile/src/platform/adresy.ts:13, 17–18` | plan-08 l. 494, 542; D-270; `docs/programista/koordynator.md:51` | otwarte (fakt właściciela) | ŚREDNIE (funkcje ukryte, nie zepsute). Czy App Store wymaga adresu wsparcia w metadanych sklepu — do sprawdzenia w wytycznych Apple przed publikacją (rola 10) |
| 08-F24 | 04 | Ten sam tekst „Powtórki” dla wiersza na „Dziś” (`today.reviews`) i zakładki (`tabs.review`) — dwa cele pod jedną nazwą, także dla VoiceOver; E2E rozróżnia je `testID` (D-271) | `apps/mobile/src/i18n/locales/pl.json:3` (`tabs.review`), `:17` (`today.reviews`); `apps/mobile/src/app/(tabs)/_layout.tsx:17`; `apps/mobile/src/app/(tabs)/index.tsx:107`; `apps/mobile/e2e/02-powtorki.yaml:13` | plan-08 „E2E części 5b” (l. 508), „Zgłoszenia nowe” (l. 521), l. 542; D-271 | rozstrzygnięte D-284 („Powtórki na dziś”; wykonuje 08) | ŚREDNIE (dostępność: niejednoznaczna nazwa, nie bariera — zakładkę iOS zapowiada jako „karta”) |
| 08-F25 | 04 | Ekran sesji po „Dalej” nie wraca na górę — przy dłuższym zadaniu (stół) treść następnego zaczyna się nad krawędzią; opcje: (A) przewinięcie na górę przy zmianie zadania, (B) bez zmian | `apps/mobile/src/app/session.tsx:211–214` (`next` zmienia tylko indeks), `:349` (`Screen` przewijany); obejście w `apps/mobile/e2e/06-przerwanie-sesji.yaml:14` | plan-08 l. 521, 542; D-271 | rozstrzygnięte D-283 (A: przewinięcie na górę + fokus; wykonuje 08 razem z A04-03) | ŚREDNIE (użyteczność; użytkownik może przewinąć) |
| 08-F26 | 04/06 | Stan miejsca „przebija (raise)” po akcji innej niż pas (L-1) — tekst i wygląd (zwykły stan miejsca, bez nowego koloru) do akceptacji; znak Dopuszczalnej „≈” (D-213) wobec „∼” w makiecie e3 (L-3) | `apps/mobile/src/i18n/locales/pl.json:550` (`table.seatRaise`); `apps/mobile/src/features/ocena/StopienOceny.tsx:17`; makieta `docs/design/ekrany/e3.html:91` („∼”) | plan-08 „Luki z opcjami” L-1, L-3 (l. 578, 580); „Zgłoszenia części 6” (l. 622); D-274, D-213 | rozstrzygnięte D-284 dla 04 (zostaje „przebija” i „≈”); tekst „przebija” zaakceptowany przez 06 (D-314, 2026-11-09; ryzyko `uklad.ts:27` dla 05/08) | NISKIE (tekst i znak do akceptacji) |
| 08-F27 | 04 | (a) „pas” w pasku strategii jako obwódka kreskowana (`borderStyle: 'dashed'`) zamiast kreskowanego wypełnienia z makiety (RN bez wzoru wypełnienia); (b) kolory `PaintGrid`/`RangeGrid` nadal w `tk.przejsciowe` (L-2) | (a) `apps/mobile/src/components/PasekStrategii.tsx:12, 107`; makieta `docs/design/ekrany/e3.css:114` (`repeating-linear-gradient`); (b) `apps/mobile/src/components/PaintGrid.tsx:96–102, 144, 153–156`; `apps/mobile/src/components/RangeGrid.tsx:12` | plan-08 L-2 (l. 579), l. 623; D-274, D-259 | rozstrzygnięte D-284: (a) akceptacja; (b) wyjątek do upublicznienia, tokeny siatek — sesja fix 04 | NISKIE (wygląd, wyjątek nazwany) |
| 08-F28 | 04/06 | Terminologia stołu (D-275): w aplikacji „Przy stole: …” i „po tobie BTN, SB i BB” zamiast „Stół: …” i „czeka/czekają” z makiety i design-spec (kolizja ze słownikiem: `board` = „stół”, `check` = „czekanie”) — do przeniesienia do design-spec i tabeli terminologii (dok. 13 na Dysku) | `apps/mobile/src/i18n/locales/pl.json:547` (`table.label`), `:552` (`table.after`); `docs/design/design-spec.md:44, 46` („czeka”, „Stół: …”) | plan-08 l. 624; D-275 | zamknięte dla 04 (design-spec wyrównany, D-284); dok. 13 — koordynator/06 | NISKIE (aplikacja zgodna ze słownikiem; rozjazd tylko w dokumentach) |
| 08-F29 | 04, 08 część 7 | Ocena poziomu (`PierwszeUruchomienie`) rysuje stół starym `TableFelt` (bez `tk.przejsciowe`, ale niezgodnie z `Stol`) | `apps/mobile/src/features/ocena-poziomu/PierwszeUruchomienie.tsx:8, 131` | plan-08 l. 625, „Koordynacja” l. 642; D-277, D-279, D-280 | zamknięte 8362e14 (D-280: wykonane teraz zamiast w części 7) | ŚREDNIE (niespójność wyglądu jednego ekranu) |

Zamkniętych z commitem: 08-F29 (8362e14, D-280). Pozostałe bez commitu zamykającego (`git log --all` na `274ce6d`; w kodzie odwołania tylko w komentarzach przy obejściach).

Uwaga z zestawienia (rozstrzygnięta przez audyt 04 2026-11-09: luka, nie znane odstępstwo — A04-10 w `docs/design/audyt-5b-6.md`, D-284; naprawa 08 przed rolą 09): legenda `PaintGrid` ma teksty wpisane w kod („grasz”, „− brakuje”, „+ za dużo”, „• mieszana”) zamiast `t()` — `apps/mobile/src/components/PaintGrid.tsx:153–156`. Do sprawdzenia, czy to znane odstępstwo (przy 35 językach te teksty się nie przetłumaczą).

## Audyt roli 04 (2026-11-09)

Raport: `docs/design/audyt-5b-6.md`; decyzje D-282–D-284. Nowe znaleziska dla roli 08 (A04-01–A04-18). WYSOKIE (blokery wydania): A04-01 karty rywala bez opisu (VoiceOver nie zna kart rywala w „Kto wygrywa”), A04-02 surowe tokeny kart `[[…]]` w ocenie poziomu, A04-03 VoiceOver nie ogłasza oceny (`accessibilityLiveRegion` tylko na Androidzie). Kolejność napraw: raport, „Lista napraw dla roli 08”. Zrzuty: dopisane stany z raportu („Do sprawdzenia na zrzucie”).

## Grupy per rola: co rola musi zdecydować

### 04 Studio Projektowe (F15, F16, F22, F24, F25, F26, F27, F28, F29)
- **Tokeny, których brakuje:** barwy talii czterokolorowej (F15) i siatek malowania/zakresów (F27b) — nowe tokeny w `docs/design/tokeny.ts` albo zgoda na wyjątek `tk.przejsciowe` na stałe; promienie bloku lekcji 28/22 (F16a) — token albo akceptacja `promien.sukno` z wcięciem.
- **Komponent ikony** (F22): dodać do systemu (SVG z makiety) albo zaakceptować znak ⚙︎.
- **Wzór „pas”** (F27a): obwódka kreskowana zamiast kreskowanego wypełnienia — akceptacja albo wskazanie innego rozwiązania (np. biblioteka grafiki, z kosztem zależności).
- **Mapa kursu na „Dziś”** (F16b): gdzie lista modułów i lekcji, skoro makieta e3 jej nie ma.
- **Teksty i nazwy:** „Powtórki” dla dwóch celów (F24) — zmiana jednego z tekstów albo akceptacja; stan „przebija” i znak „≈” vs „∼” (F26); przeniesienie terminologii stołu z D-275 do design-spec (F28).
- **Zachowanie:** powrót ekranu sesji na górę po „Dalej” (F25: A albo B).
- **Ocena poziomu na `Stol`** (F29): potwierdzić, że ekran oceny ma wyglądać jak ekran decyzji; wykonuje 08 w części 7.

### 05 Architekt (F18)
- Wpisać opcjonalny prop `sekcje` `EkranUstawien` do opisu modułów albo wskazać inny podział (osobne trasy).

### 06 Treść i merytoryka (F17, F19, F26, F28)
- Potwierdzić `skip` „sesja ćwiczeń” w `terms.yaml` (F17).
- Ocena poziomu (F19): czy dodać pytanie o cel i samoocenę („nie znam zasad”) — tekst i źródło po stronie 06; bez nich zostaje D-264.
- Teksty stołu: „przebija” (F26), „Przy stole”, „po tobie” w tabeli terminologii dok. 13 (F28).

### 07 Jakość i testy (F18, F21)
- Test renderu ekranu sesji (F21): start, zakup, „Zakończ”, gałęzie `maStrategie`, nagłówek oceny, przegląd — zabija mutanty M29–M32; zdecydować poziom (RNTL na `session.tsx` z atrapą bazy albo wydzielenie widoku).
- Kontrakt `EkranUstawien` z `sekcje` (F18): dopisać do kontraktu i testu albo zostawić jako rozszerzenie 08.

### 01 / 03 (F19)
- Czy kryteria BR-ONB-001/002 („pytania o poziom i cel”, „zaznaczył, że nie zna zasad”) zostają, czy BRD przyjmuje wariant D-264 (ocena tylko z pytań egzaminu, brak poprawnych → M0).

### 10 / właściciel (F20, F23)
- Adres polityki prywatności (F20) — warunek publikacji w App Store.
- App Store ID i adres poczty do opinii i zgłoszeń (F23).
- Rola 10 (2026-11-09): projekt polityki `docs/wydanie/polityka-prywatnosci/` (rekomendacja hostingu D-308), App Privacy `docs/wydanie/app-privacy.md`. Support URL jest wymagany w ASC (PV-1) — strona wsparcia blokuje wysyłkę. Nowe dla 08: **10-PRYW-01** (ŚREDNIE) dodać `3B52.1` do FileTimestamp w `app.json:23` + K-08; dla 05: **10-PRYW-02** (NISKIE) inwentarz `prywatnosc.md` §1/§4 (dziennik w zgłoszeniu, brak `expo-store-review`).

## Zrzuty od właściciela (scalona lista z części 5b i 6)

Symulator albo telefon, każdy stan w motywie jasnym i ciemnym (2 pliki). Nazwy: `5b-<ekran>-<stan>-<light|dark>.png` i `6-<ekran>-<stan>-<light|dark>.png`. Cel: audyt zgodności roli 04. Źródło: plan-08 „Zrzuty do zrobienia” części 5b (l. 539) i 6 (l. 619).

Część 5b (18 stanów):
`dzis:typowy`, `dzis:limit-zuzyty`, `dzis:pelny-dostep`, `powitanie:start`, `ocena-poziomu:pytanie`, `ocena-poziomu:wynik`, `start:przed-sesja`, `zakup:ceny`, `zakup:ceny-niedostepne`, `zakup:przywracanie-bez-zakupu`, `ustawienia:typowy`, `ustawienia:subskrypcja` („Zarządzaj subskrypcją”), `dane:eksport`, `dane:import-potwierdzenie`, `dane:import-blad`, `jezyk:lista`, `postep:typowy`, `usun-postep:potwierdzenie`.

Część 6 (14 stanów):
`sesja-decyzja:przed`, `sesja-decyzja:przebija` (08-F26), `sesja-decyzja:po-ocenie-zgodne`, `sesja-decyzja:po-ocenie-dopuszczalne`, `sesja-decyzja:po-ocenie-blad`, `sesja-decyzja:niedokladnosc`, `sesja-decyzja:czas-minal`, `sesja-bez-pozycji:przed`, `sesja-bez-pozycji:po-ocenie`, `sesja-tekstura:po-ocenie`, `egzamin:przeglad`, `egzamin:wynik`, `tytuly:domyslny`, `tytuly:AX1`.

Razem 32 stany, 64 pliki. Usunięty duplikat: `sesja:po-ocenie` z listy 5b — ekran oceny w sesji przebudowano w części 6 (krok 7, D-277), więc jego stan po ocenie pokrywają stany `sesja-decyzja:po-ocenie-*`, `sesja-bez-pozycji:po-ocenie` i `sesja-tekstura:po-ocenie`. Przy okazji `ocena-poziomu:pytanie` pokaże stół `Stol` (08-F29 zamknięte 8362e14, D-280).

Do sprawdzenia na urządzeniu przy zrzutach (plan-08 „Ryzyka”, l. 548 i 632): ochrona tła (U-2), zakupy w piaskownicy (U-5), eksport/import pliku, przypomnienie, prośba o ocenę; ruch paska i znacznika oraz „Ogranicz ruch”; start z krojem Literata (bez pustego ekranu > 3 s); przełączenie kroju przy AX1; VoiceOver na stole, pasku i skali; cele dotyku segmentów ≥ 64 pt.

## Sesja AW (2026-11-10): do roli 04
- **AW-1 (stół z trzema rzędami, D-476):** design-spec „`Stol`” nie opisuje układu rywal + board + gracz. Zastosowano najprostszy wariant z istniejących elementów: wysokość owalu z liczby rzędów, karty md → sm, gdy rząd się nie mieści (320 pt: board 5 kart w rozmiarze „sm”, 22 × 30 pt). Prośba: makieta/decyzja dla trzech rzędów (np. mniejszy podpis, board w dwóch rzędach, owal niżej).
- **AW-2 (wybór na starcie, D-475):** ekran wyboru = istniejący ekran powitania z dwoma przyciskami (`Button` primary + ghost), bez nowych stylów; tekst `welcome.next` o długości testu i nowe teksty „Przejdź test poziomujący”, „Zacznij od początku”, „Nie wiem” do akceptacji 04/06. „Nie wiem” = wariant ghost jak dawne „Pomiń”.
- **AW-3 (rola 10/09, sklep):** `store/` i metadane z K-11 mówią „możesz ją pominąć” (ocena poziomu): nadal prawdziwe („Zacznij od początku”), ale do przeglądu przy kolejnej zmianie opisu; notatki dla recenzenta zmienione w tej sesji.
