# E1 roli 06, partia `pomoc`: weryfikacja źródeł (2026-11-04)

Wejście: D-142 (9 rynków + reszta bez numeru), RD-12 i RD-11 (`docs/brd/reguly.md`), S-06 i S-39–S-42 (`docs/brd/zrodla.md`), `docs/architektura/moduly.md` (Konfiguracja). Rejestr: `docs/tresci/rejestr/pomoc.json` (49 wpisów). Dowody: `docs/tresci/odczyty/pomoc.tsv` (68 odczytów, w tym 14 nieudanych). Kopie stron tylko w scratchpadzie (`e1-pomoc/raw`). Każdy cytat sprawdził skrypt (`build.py`) na oczyszczonym tekście: 87 cytatów, wszystkie znalezione.

## 1. Liczby
| | potwierdzone | otwarte | sprzeczne | razem |
|---|---|---|---|---|
| A: pomoc (krytyczne) | 37 | 6 | 1 | 44 |
| B: parametry (niekrytyczne) | 3 | 2 | 0 | 5 |

Szczeble cytowanych źródeł: 1 → 87, 3 → 3 (tylko PEI), 4 → 5 (S-06). Ponownie przeczytane dziś źródła BRD: S-39, S-40, S-41, S-42, S-06. Cytaty zgadzają się dosłownie. S-06 używa łącznika „-” zamiast „–” (bez znaczenia).

Wpisy z jednym źródłem nierachunkowym: H-US-3 (911, cytat od NCPG, bo 911.gov dał 403), H-CA-2, H-CA-3 (ConnexOntario tylko przez regulatora AGCO), H-CA-6, H-CA-7, H-CA-10, H-CA-11, H-CA-13, H-JP-3, H-BR-2, H-FR-2, H-DE-3, H-DE-4. Każde z nich to szczebel 1 (operator, urząd albo regulator), więc wystarcza. Przy następnym przeglądzie warto dodać drugie źródło dla H-US-3 i H-CA-3.

## 2. Najważniejsze znaleziska
1. **Region urządzenia daje tylko kraj.** RD-12 opiera wybór na regionie urządzenia, a iOS podaje tam kod kraju (`GB`, `CA`), bez prowincji ani części Zjednoczonego Królestwa. Walia (H-GB-2), Irlandia Płn. (H-GB-3, H-GB-6) i 10 prowincji Kanady mają własne numery. Propozycja dla 01/04: dla GB i CA ekran „Pomoc” pokazuje numer ogólnokrajowy (GB: H-GB-1, H-GB-4, H-GB-5; CA: H-CA-1, H-CA-2), a pod nim listę regionów do wyboru. Bez lokalizacji, bo nowe uprawnienie jest niepotrzebne. RD-12-W3 i W4 trzeba przepisać na „region wybrany przez użytkownika”.
2. **Domena Dunlewey (Irlandia Płn.) przekierowuje na obcą stronę.** `dunlewey.net` przekierował dziś na `superdewa.llc`. Numer 08000 886 725 jest potwierdzony przez rząd NI (nidirect, DfC), ale do tej domeny nie wolno linkować. Linki pomocy w aplikacji powinny wskazywać wyłącznie strony rządowe lub operatorów sprawdzone w tym rejestrze. Propozycja do testów roli 07: lista dozwolonych domen dla `links` w `helplines.yaml`.
3. **Japonia, Tajwan i Wietnam nie mają krajowej linii hazardowej w źródłach szczebla 1–3.** JP: ministerstwo (MHLW) kieruje do 保健所 i 精神保健福祉センター (H-JP-1, wpis bez numeru). TW i VN: `otwarte`. Wietnam przebudowuje numery alarmowe: od 1.11.2026 wezwania medyczne przyjmuje też 113 (Thông tư 42/2026/TT-BYT według Chinhphu.vn), a integrację 113/114/115 zaplanowano na 2027. Dlatego wpis H-VN-3 brzmi „113 albo 115” i ma przegląd co 3 mies.
4. **Francja: sprzeczne godziny Joueurs Info Service.** Strona operatora (dziś w trybie serwisowym) podaje 8–23, annuaire service-public podaje 8–2. Rozstrzygnięcie według zasady części wspólnej: „codziennie 8.00–23.00”, koszt „bez dopłat” (operator pisze „gratuit”, urząd „non surtaxé”). Do rejestru jako D-1xx; odrzucone: 8–2 (niezgodne z dzisiejszym tekstem operatora) i pominięcie godzin (użytkownik może dzwonić po nocy bez odpowiedzi).
5. **Stopnie oceny zagrania: 4, jak w BRD.** S-06 ma 5 kategorii (Best, Correct, Inaccuracy, Wrong, Blunder). Rozstrzygnięcie w §5. Projekt (`docs/design/design-spec.md:17`, `:40`, SkalaStopni z 3 przedziałami) i kod (`thresholds.ts`, `grading.ts:132`) do poprawki (ER-01).

Inne:
- NCPG (US) nigdzie nie pisze „free”. Pisze „No payment or insurance information is required”, a SMS kosztuje według taryfy operatora. W aplikacji: „bez opłat za usługę”.
- Gambling Therapy (H-INT-1) nie podaje strefy czasowej godzin czatu ani nie pisze „free”. Nie wpisywać godzin ani „bezpłatnie”. Strona `gamblingtherapy.org` zwróciła dziś błąd 500, a opis usługi pochodzi ze strony operatora (Gordon Moody). Przed wydaniem trzeba sprawdzić link.
- Nowa Szkocja (H-CA-10): numer jest na stronie rządu, ale prasa (nieprzeczytana) donosi o przesunięciu finansowania w 2024 r. Status `otwarte`.
- PEI (H-CA-12): strony rządu dały 403, zostały tylko źródła szczebla 3 (211 PEI, CMHA). Status `potwierdzone`, odczyt strony rządowej do powtórzenia.
- Żadna przeczytana strona nie zawierała instrukcji dla modelu.

## 3. Strony niedostępne (2026-11-04)
911.gov (403), gamcare.org.uk (403), lifelinehelpline.info (403), nidirect /contacts/lifeline (403), princeedwardisland.ca i peigamblingsupport (403), aidejeu.ca (503), gamblingtherapy.org (500), canada.ca i connexontario.ca (błąd połączenia), moh.gov.vn (błąd połączenia), novascotia.ca/dhw/addictions/gambling.asp (404), nhsinform.scot (stary adres, 404). Dla każdej z nich użyłem innego źródła tego samego szczebla albo oznaczyłem wpis jako `otwarte`.

## 4. Otwarte pytania
- [DO USTALENIA] H-CA-10: czy Gambling Support Network (NS) 1-888-347-8888 działa. Potrzebny test połączenia przez właściciela albo zapytanie do NS Health.
- [DO USTALENIA] H-CA-14: linia hazardowa w Jukonie, Terytoriach Płn.-Zach. i Nunavut. Na razie: 9-8-8 i 9-1-1.
- [DO USTALENIA] H-TW-1, H-VN-1: linia hazardowa. H-VN-2: krajowa linia kryzysowa dla dorosłych.
- [DO USTALENIA] H-VN-3: czy 115 nadal działa jako numer pogotowia po 1.11.2026 (tekst Thông tư 42/2026 nieprzeczytany).
- [DO USTALENIA] Brzmienie dla krajów bez wpisu (RD-12-W6, rola 01 `fix`). Propozycja: „W zagrożeniu życia dzwoń na lokalny numer alarmowy.” + H-INT-1 bez numeru i bez godzin. To brzmienie nie zawiera faktu wymagającego źródła.
- Strefa czasowa godzin Gambling Therapy: brak źródła, więc godzin nie podajemy.

## 5. Zakres B: parametry dziedzinowe
- `FSRS_RETENCJA` = 0,9: **potwierdzone**. Anki manual: „The default value of 90% …”. README ts-fsrs używa 0.9 w przykładzie konfiguracji. Uwaga dla 07/08: README na `main` opisuje już API v6 (`DefaultScheduler`, `desiredRetention`, FSRS-7), a repo ma ts-fsrs 5.4.2 (`request_retention`).
- `FSRS_SZYBKO_MS`/`FSRS_WOLNO_MS` = 3000/8000: **otwarte, bez źródła**. Dokumentacja FSRS i Anki nie wiąże oceny z czasem odpowiedzi. Zapisać jako parametr produktowy (decyzja produktowa) i nie przedstawiać w aplikacji jako faktu.
- `OCENA_PROG_DOPUSZCZALNE` = 0,035: **potwierdzone** (S-06, cytat dosłowny). Granica: f = 0,035 to już „dopuszczalne” („less than 3.5%”). Warunek źródła „don't lose significant EV” jest kierunkowo zgodny z zasadą obojętności w równowadze, więc ocenę bez danych EV wolno stosować jako nazwane uproszczenie.
- `OCENA_PROG_MIESZANA_*` = 0,25/0,75: **otwarte**, parametr produktowy (ADR-22/26, B-044). S-06 nie zna progu L.
- **Stopnie oceny: propozycja decyzji D-1xx (merytoryczna, rola 06):** cztery stopnie.
  - zgodne: f = f_max albo f ≥ L (Best + część Correct);
  - dopuszczalne: M ≤ f < L (reszta Correct);
  - niedokładność: 0 < f < M (Inaccuracy);
  - błąd: f = 0 (Wrong i Blunder).

  Podstawa: S-06 (szczebel 4, jedyne przeczytane źródło kategorii) oraz zasada obojętności. To potwierdza ER-01 roli 01. Odrzucone:
  - (a) 3 stopnie z „błędem” dla 0 < f < M (projekt, kod): sprzeczne ze źródłem;
  - (b) 5 stopni z „Blunder”: wymaga strat EV, których aplikacja nie ma;
  - (c) 2 stopnie: gubi strategie mieszane.

  Punkty (`verdictPoints`): niedokładność = 0, karta powtórki tak, jak dziś w `grading.ts:44`. Poprawka: `docs/design/design-spec.md:17` (cztery słowa: Błąd, Niedokładność, Dopuszczalna, Zgodna) i `:40` (cztery przedziały); słowo i znak dobiera rola 04.

## 6. Propozycja wpisów do `content/helplines.yaml` (NIE wprowadzona; schemat do rozszerzenia przez content-build o `country`, `regions`, `kind`, `claim`)
`kind`: `gambling` (stricte hazard), `crisis` (kryzys psychiczny), `emergency` (zagrożenie życia). Nie łączyć rodzajów w jednym wpisie. Brzmienie `name`/`hours`/`cost` po polsku; przekład roli 09.

```yaml
checked: '2026-11-04'
review_by: '2027-11-04'
fallback:   # kraje bez wpisu (D-142)
  text: 'W zagrożeniu życia dzwoń na lokalny numer alarmowy.'
  online: [int-gambling-therapy]
entries:
  # --- US ---
  - id: us-ncpg
    claim: H-US-1
    country: US
    kind: gambling
    name: National Problem Gambling Helpline
    phone: 1-800-MY-RESET (1-800-697-3738)
    sms: 1-800-MY-RESET
    hours: całą dobę, 7 dni
    cost: bez opłat za usługę; SMS według taryfy operatora
    language: angielski; tłumacz ponad 240 języków
    operator: National Council on Problem Gambling
    links: [{ label: Czat, url: https://www.ncpgambling.org/help-treatment/about-the-national-problem-gambling-helpline/ }]
  - { id: us-988, claim: H-US-2, country: US, kind: crisis, name: 988 Suicide & Crisis Lifeline, phone: '988', sms: '988', hours: całą dobę, cost: bezpłatnie }
  - { id: us-911, claim: H-US-3, country: US, kind: emergency, phone: '911' }
  # --- GB ---
  - { id: gb-ngh, claim: H-GB-1, country: GB, regions: [GB-ENG, GB-SCT, GB-NIR], kind: gambling, name: National Gambling Helpline, phone: 0808 8020 133, hours: całą dobę, 7 dni, cost: bezpłatnie, operator: GamCare }
  - { id: gb-wales, claim: H-GB-2, country: GB, regions: [GB-WLS], kind: gambling, name: NHS Wales Gambling Helpline, phone: 0808 281 9265, hours: całą dobę, cost: bezpłatnie (także bez środków na koncie), operator: Betsi Cadwaladr University Health Board }
  - { id: gb-ni-dunlewey, claim: H-GB-3, country: GB, regions: [GB-NIR], kind: gambling, name: Dunlewey Helpline, phone: 08000 886 725, cost: bezpłatnie }   # bez godzin; bez linku do dunlewey.net
  - { id: gb-samaritans, claim: H-GB-4, country: GB, kind: crisis, name: Samaritans, phone: 116 123, hours: całą dobę, cost: bezpłatnie }
  - { id: gb-ni-lifeline, claim: H-GB-6, country: GB, regions: [GB-NIR], kind: crisis, name: Lifeline, phone: 0808 808 8000, hours: całą dobę, cost: bezpłatnie }
  - { id: gb-111, claim: H-GB-7, country: GB, regions: [GB-ENG, GB-SCT, GB-WLS], kind: crisis, name: NHS 111 (opcja zdrowia psychicznego; Walia: „press 2”), phone: '111' }
  - { id: gb-999, claim: H-GB-5, country: GB, kind: emergency, phone: '999' }
  # --- CA ---
  - { id: ca-988, claim: H-CA-1, country: CA, kind: crisis, name: '9-8-8: Suicide Crisis Helpline', phone: 9-8-8, sms: 9-8-8, hours: całą dobę, cost: bezpłatnie }
  - { id: ca-911, claim: H-CA-2, country: CA, kind: emergency, phone: 9-1-1 }
  - { id: ca-on, claim: H-CA-3, country: CA, regions: [CA-ON], kind: gambling, name: ConnexOntario, phone: 1-866-531-2600, sms: '247247', hours: całą dobę, cost: bezpłatnie }
  - { id: ca-bc, claim: H-CA-4, country: CA, regions: [CA-BC], kind: gambling, name: Gambling Support BC, phone: 1-888-795-6111, hours: całą dobę, cost: bezpłatnie }
  - { id: ca-qc, claim: H-CA-5, country: CA, regions: [CA-QC], kind: gambling, name: 'Jeu : aide et référence', phone: 1 800 461-0140, phone_local: 514 527-0140 (Montreal), hours: całą dobę, cost: bezpłatnie (numer 1 800), language: francuski, angielski }
  - { id: ca-ab, claim: H-CA-6, country: CA, regions: [CA-AB], kind: gambling, name: 24-Hour Addiction Helpline (uzależnienia, także hazard), phone: 1-866-332-2322, hours: całą dobę }
  - { id: ca-sk, claim: H-CA-7, country: CA, regions: [CA-SK], kind: gambling, name: Problem Gambling Help Line, phone: 1-800-306-6789, hours: całą dobę, cost: bezpłatnie }
  - { id: ca-mb, claim: H-CA-8, country: CA, regions: [CA-MB], kind: gambling, name: Problem Gambling Helpline (AFM), phone: 1-800-463-1554, hours: całą dobę }
  - { id: ca-nb, claim: H-CA-9, country: CA, regions: [CA-NB], kind: gambling, name: Linia uzależnień i zdrowia psychicznego (także hazard), phone: 1-866-355-5550, hours: całą dobę }
  - { id: ca-ns-crisis, claim: H-CA-11, country: CA, regions: [CA-NS], kind: crisis, name: Mental Health and Addictions Crisis Line, phone: 1-888-429-8167, hours: całą dobę, cost: bezpłatnie }
  # ca-ns gambling (H-CA-10): wstrzymane do potwierdzenia
  - { id: ca-pe, claim: H-CA-12, country: CA, regions: [CA-PE], kind: gambling, name: PEI Gambling Support Line, phone: 1-855-255-4255, hours: całą dobę, cost: bezpłatnie, language: angielski, francuski }
  - { id: ca-nl, claim: H-CA-13, country: CA, regions: [CA-NL], kind: gambling, name: Gambling Help Line, phone: '811', hours: całą dobę, cost: bezpłatnie }
  # --- JP ---
  - id: jp-center
    claim: H-JP-1
    country: JP
    kind: gambling
    name: 精神保健福祉センター / 保健所 (ośrodek w prefekturze)
    links: [{ label: Wyszukiwarka placówek (MHLW), url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000070789.html }]
  - { id: jp-inochi-sos, claim: H-JP-2, country: JP, kind: crisis, name: '#いのちSOS', phone: 0120-061-338, hours: całą dobę, cost: bezpłatnie }
  - { id: jp-yorisoi, claim: H-JP-2, country: JP, kind: crisis, name: よりそいホットライン, phone: 0120-279-338, hours: całą dobę, cost: bezpłatnie, language: japoński; wybór porady w językach obcych }
  - { id: jp-119, claim: H-JP-3, country: JP, kind: emergency, phone: '119' }
  # --- BR ---
  - id: br-sus
    claim: H-BR-1
    country: BR
    kind: gambling
    name: SUS — teleatendimento w Meu SUS Digital („Problemas com jogos de apostas?”), UBS, CAPS
    cost: bezpłatnie
    links: [{ label: Informacja Ministerstwa Zdrowia, url: https://agenciagov.ebc.com.br/noticias/202610/campanha-do-ministerio-da-saude-orienta-sobre-riscos-das-apostas-online-e-atendimento-disponivel-no-sus }]
  - { id: br-cvv, claim: H-BR-2, country: BR, kind: crisis, name: CVV, phone: '188', hours: całą dobę, cost: bezpłatnie }
  - { id: br-samu, claim: H-BR-3, country: BR, kind: emergency, name: SAMU, phone: '192' }
  # --- FR ---
  - { id: fr-jis, claim: H-FR-1, country: FR, kind: gambling, name: Joueurs Info Service, phone: 09 74 75 13 13, hours: codziennie 8.00–23.00, cost: bez dopłat, anonimowo }
  - { id: fr-3114, claim: H-FR-2, country: FR, kind: crisis, name: 3114 — numer zapobiegania samobójstwom, phone: '3114', hours: całą dobę, cost: bezpłatnie }
  - { id: fr-15, claim: H-FR-3, country: FR, kind: emergency, phone: 15 albo 112 }
  # --- TW ---
  - { id: tw-1925, claim: H-TW-2, country: TW, kind: crisis, name: 1925 安心專線, phone: '1925', hours: całą dobę, cost: bezpłatnie }
  - { id: tw-119, claim: H-TW-3, country: TW, kind: emergency, phone: '119' }
  # tw gambling (H-TW-1): brak
  # --- VN ---
  - { id: vn-113, claim: H-VN-3, country: VN, kind: emergency, phone: 113 albo 115, cost: bezpłatnie }
  # vn gambling i crisis (H-VN-1, H-VN-2): brak
  # --- DE ---
  - { id: de-bioeg, claim: H-DE-1, country: DE, kind: gambling, name: BIÖG-Beratungstelefon zur Glücksspielsucht, phone: 0800 1 37 27 00, hours: 'pon.–czw. 10–22, pt.–niedz. 10–18 (bez 24.12 i 31.12)', cost: bezpłatnie, anonimowo }
  - { id: de-pl, claim: H-DE-4, country: DE, kind: gambling, name: Porada w języku polskim (Caritas), phone: 0173 29 37 359, cost: bezpłatnie, anonimowo, language: polski }
  - { id: de-ts, claim: H-DE-2, country: DE, kind: crisis, name: TelefonSeelsorge, phone: 0800 111 0 111, phone_alt: [0800 111 0 222, 116 123], hours: całą dobę, cost: bezpłatnie }
  - { id: de-112, claim: H-DE-3, country: DE, kind: emergency, phone: '112' }
  # --- międzynarodowe ---
  - id: int-gambling-therapy
    claim: H-INT-1
    country: '*'
    kind: gambling
    name: Gambling Therapy (Gordon Moody, Wielka Brytania) — wsparcie tekstowe online w ponad 200 językach
    links: [{ label: Gambling Therapy, url: https://gordonmoody.org.uk/gambling-therapy/ }]
```
Każdy wpis musi mieć przy wdrożeniu pole `sources` (adres i cytat z `rejestr/pomoc.json`, pole `zrodla`), tak jak dziś w pliku. Wpis polski (PL) zostaje bez zmian, ale nie ma storefrontu PL (ER-04).

## 7. Wektory testowe dla roli 07 (RD-12)
| Kraj | Region | Oczekiwane (kind: numer) | Twierdzenie |
|---|---|---|---|
| US | — | gambling: 1-800-MY-RESET (1-800-697-3738) | H-US-1 |
| US | — | crisis: 988; emergency: 911 | H-US-2, H-US-3 |
| US, język pl | — | jak US (decyduje kraj) | H-US-1 |
| GB | GB-ENG / GB-SCT | gambling: 0808 8020 133 | H-GB-1 |
| GB | GB-WLS | gambling: 0808 281 9265 | H-GB-2 |
| GB | GB-NIR | gambling: 0808 8020 133 i 08000 886 725; crisis: 0808 808 8000 | H-GB-1, H-GB-3, H-GB-6 |
| GB | bez regionu | gambling: 0808 8020 133 + lista regionów; crisis: 116 123; emergency: 999 | H-GB-1, H-GB-4, H-GB-5 |
| CA | bez regionu | crisis: 9-8-8; emergency: 9-1-1 + lista prowincji | H-CA-1, H-CA-2 |
| CA | CA-ON | gambling: 1-866-531-2600 | H-CA-3 |
| CA | CA-BC | gambling: 1-888-795-6111 | H-CA-4 |
| CA | CA-QC | gambling: 1 800 461-0140 | H-CA-5 |
| CA | CA-AB | gambling: 1-866-332-2322 | H-CA-6 |
| CA | CA-SK | gambling: 1-800-306-6789 | H-CA-7 |
| CA | CA-MB | gambling: 1-800-463-1554 | H-CA-8 |
| CA | CA-NB | gambling: 1-866-355-5550 | H-CA-9 |
| CA | CA-NS | brak gambling; crisis: 1-888-429-8167 | H-CA-10 (otwarte), H-CA-11 |
| CA | CA-PE | gambling: 1-855-255-4255 | H-CA-12 |
| CA | CA-NL | gambling: 811 | H-CA-13 |
| CA | CA-NU | brak gambling; 9-8-8, 9-1-1 | H-CA-14 (otwarte) |
| JP | — | gambling: brak numeru, link MHLW; crisis: 0120-061-338; emergency: 119 | H-JP-1–3 |
| BR | — | gambling: Meu SUS Digital (bez numeru); crisis: 188; emergency: 192 | H-BR-1–3 |
| FR | — | gambling: 09 74 75 13 13; crisis: 3114; emergency: 15 | H-FR-1–3 |
| TW | — | brak gambling; crisis: 1925; emergency: 119 | H-TW-1–3 |
| VN | — | brak gambling i crisis; emergency: 113 albo 115 | H-VN-1–3 |
| DE | — | gambling: 0800 1 37 27 00; crisis: 116 123; emergency: 112 | H-DE-1–3 |
| PL | — | wpisy PL bez zmian (behavioral 801 889 880) — storefront nieaktywny | obecny plik |
| AU (kraj bez wpisu) | — | tekst „lokalny numer alarmowy” + Gambling Therapy, **bez żadnego numeru** | D-142, H-INT-1 |
| dowolny | — | żaden wpis `kind: gambling` nie zawiera numeru z `kind: crisis` i odwrotnie | zasada rozdziału |
| dowolny | — | żaden link nie prowadzi do domeny spoza listy dozwolonych (np. dunlewey.net) | znalezisko 2 |
