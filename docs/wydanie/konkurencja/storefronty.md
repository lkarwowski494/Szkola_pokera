# Gdzie wydają konkurenci: dostępność w storefrontach App Store

> **To nie jest opinia prawna** (OP-13). Obecność aplikacji konkurenta w storefroncie to **sygnał sklepowy** (Apple i twórcy dopuszczają tę kategorię w kraju), nie dowód legalności. Wynik to rekomendacja do akceptacji albo weta właściciela (D-298; zapis rekomendacji: D-300).

- Data przebiegu: **2026-11-09** (sesja J, rola 10 tryb build; zadanie D-298, przekierowanie z JP/CA/GB).
- Metoda: publiczne iTunes Lookup API, jedno wywołanie na storefront z 35 identyfikatorami (`https://itunes.apple.com/lookup?id=<id,…>&country=<kod>&entity=software`); aplikacja jest „dostępna”, gdy wraca w wyniku. Skrypt: `sprawdz-storefronty.mjs` (node, bez zależności, 1,5 s przerwy, ponowienia przy 403/429/5xx); 174 wywołania, 0 błędów, 0 USD.
- Storefronty: 174 z tabeli Apple „App Store pricing and availability start times by country or region” (https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/app-store-pricing-and-availability-start-times-by-country-or-region, odczyt 2026-11-09); kody ISO-3 przeliczone na dwuliterowe z pakietu iso-codes; dwa wyjątki zapisane w `storefronty-apple.json` (Boliwia: na stronie „BO”; Kosowo: XK).
- Aplikacje (`wejscie.json`):
  - **top 25** wg `oceny_us` z `docs/brd/dane/konkurencja-2026-11-03.json`, bez pomijania (decyzja właściciela 06:28 UTC): 20 aplikacji nauki lub narzędzi, 5 gier z botami (pole `typ`: „gra z botami”, „gra z botami (play & learn)”, „kurs + gra z botami”, „gra towarzyska z botami”), 0 gier na żetony;
  - **10 gier na żetony** dobranych, bo top 25 nie ma żadnej (uzupełnienie koordynatora): 10 największych gier Texas Hold'em wg `userRatingCount` z iTunes Search API (`term=poker`, `country=us`, odczyt 2026-11-09): WSOP (368 076 ocen), Zynga Poker (134 822), Poker Heat (114 702), Texas Hold'em Apple (74 312), Poker Face (62 779), Pokerist (57 485), Mega Hit Poker (54 918), Octro Poker (41 513), Holdem or Foldem (30 694), Pokerrrr 2 (29 369). Pominięte: blackjack i video poker (inna gra niż poker z rozdaniami).
- Surowe dane: `wynik-2026-11-09.json` (kraj → lista dostępnych id).

## Wynik w skrócie

- **162 ze 174** storefrontów ma wszystkie 25 aplikacji nauki i gier z botami; **165** ma co najmniej 9 z 10 gier na żetony.
- Wszystkie kraje z kolejności D-295 poza VN mają pełny zestaw: US, JP, CA, GB, FR, TW, DE — 25/25 i 10/10; BR — 24/25 (brak PokerCruncher) i 10/10.
- **Kraje sporne** (reguła: najwyżej 3 z 10 gier na żetony albo najwyżej 21 z 25 aplikacji): KR, CN, AF, GA, MA, VN, TR — szczegóły niżej.
- PL (tylko informacyjnie; bez storefrontu PL z decyzji właściciela 2026-11-03, art. 29 u.g.h.): 25/25 i 10/10. Obecność konkurentów w PL nie zmienia tej decyzji — pokazuje granicę metody: sklep dopuszcza, a ocena prawna właściciela jest inna.

## Rozumowanie (podstawa rekomendacji)

Właściciel (06:28 UTC, D-298): „Jeżeli jest tam gra na żetony, to jeszcze lepiej — jeżeli można taką opublikować w jakimś kraju, to na pewno można taką bez żetonów.” Gra na żetony bez wypłat to dla Apple „simulated gambling”; nasza aplikacja nie ma żetonów, stawek ani gry z ludźmi (OG-01, NFR-ZGOD-001), więc w kraju, gdzie te gry są dostępne, ma mniejsze ryzyko sklepowe niż one.

Ograniczenia (zapisane, nie pomijane):
1. To sygnał sklepowy, nie prawny. Dowód: sprawdzenie JP z przepisów (`../legalnosc/JP.md`, D-299) znalazło obowiązki sprzedawcy na odległość (oznaczenie sprzedawcy, skutek anulowania), których obecność konkurentów nie pokazuje. Wymogi ekranu zakupu (W1, W2 z D-297) i takie obowiązki są niezależne od tej listy.
2. Brak aplikacji w kraju może być wyborem twórcy, nie zakazem (np. Poker Face nie jest dostępna w 29 storefrontach, m.in. w krajach Afryki i Azji Środkowej, przy pełnym zestawie innych gier). Za sygnał uznano tylko brak **większości** gier jednego rodzaju.
3. Kategoria w App Store może mieć znaczenie (gry podlegają w części krajów osobnym wymogom); że tak jest w KR i CN — hipoteza, nie przeczytano: `[DO USTALENIA]`.
4. Stan z jednego dnia; konkurenci mogą zmienić dostępność.

## Kraje sporne

| Kod | Nauka i boty (z 25) | Żetony (z 10) | Dostępne (przykłady) | Odczyt sygnału | Rekomendacja |
|---|---|---|---|---|---|
| KR | 5 | 0 | GTO Preflop Wizard, Enterra Poker Calculator, Poker Skill, NTPoker, Poker Coaching | Prawie nic, także z nauki | nie włączać bez sprawdzenia prawnego i sklepowego |
| CN | 14 | 0 | 11 narzędzi i 3 gry z botami (m.in. Postflop+, Solver+, PokerArena) | Żetony zero, część nauki jest | nie włączać bez sprawdzenia (wymogi sklepu w CN `[DO USTALENIA]`) |
| AF | 16 | 0 | narzędzia GTO, 2 gry z botami | Żetony zero | nie włączać bez sprawdzenia |
| GA | 18 | 1 | narzędzia GTO, 3 gry z botami, Poker Face | Słaby | nie włączać bez sprawdzenia |
| MA | 21 | 2 | 17 narzędzi, 4 gry z botami, Poker Heat, Texas Hold'em (Apple) | Żetony prawie zero | nie włączać bez sprawdzenia |
| VN | 25 | 1 | cała nauka i boty; z żetonów tylko Octro Poker | Nauka przechodzi, żetony nie | **warunkowo**: nauka 25/25 wskazuje, że nasza kategoria przechodzi; przed włączeniem sprawdzenie prawne jak `US.md` (VN jest na liście D-295) |
| TR | 25 | 3 | cała nauka i boty; Poker Face, Octro, Pokerrrr 2 | Nauka przechodzi, żetony częściowo | jak VN: warunkowo, po sprawdzeniu prawnym |

Kraje z niewielkimi brakami (LB 7/10, RU 8/10, ID, SA, AE — po jednej–dwóch aplikacjach) nie są sporne według reguły: nauka 24–25/25 i większość gier na żetony dostępna.

## Rekomendacja (A do weta — czeka na akceptację właściciela, D-295 pkt 2, D-298)

**Wariant A (rekomendowany):** włączyć **166 storefrontów** z pełnym sygnałem (wszystkie poza 7 spornymi i PL), z warunkami wspólnymi dla wszystkich krajów: W1–W4 z D-297 (zdanie o anulowaniu, adres polityki prywatności, bez pomocy w czasie gry i nagród, test marek po przekładzie) oraz J1–J2 z D-299 dla JP. Kraje sporne: VN i TR po sprawdzeniu prawnym (kolejność: VN, potem TR), KR, CN, AF, GA, MA — nie teraz.

- Koszt i zysk: sprzedaż w 166 krajach od pierwszego wydania; ryzyko prawne w krajach bez sprawdzenia przepisów przyjęte na podstawie sygnału sklepowego (rozumowanie właściciela).

**Wariant B:** włączyć tylko kraje z D-295 o pełnym sygnale (US, JP, CA, GB, BR, FR, TW, DE — 8 krajów), resztę stopniowo.
- Mniejsze ryzyko nieznanych przepisów; mniejszy zasięg (rynki o mniejszym udziale wypadają, a według D-292 języki i tak są w aplikacji).

**Wariant C:** wszystkie 173 storefronty poza PL od razu (jak dawne OP-15).
- Największy zasięg; włącza KR i CN, gdzie nawet nauka jest prawie nieobecna — ryzyko odrzucenia albo naruszenia nieznanych wymogów.

Rekomendacja: **A** — reguła prosta do sprawdzenia, oparta na danych z dnia pracy, a ryzyko jest mniejsze niż u gier na żetony obecnych w tych krajach. Sprawdzenie prawne CA i GB (pierwotne zadanie J) przestaje warunkować włączenie; wraca tylko, gdy właściciel wybierze B albo zawetuje A.

## Ponowienie

`node docs/wydanie/konkurencja/sprawdz-storefronty.mjs` — zapisuje `wynik-<data>.json`; tabelę niżej odtwarza ten sam podział (żetony ≤ 3 albo nauka ≤ 21 = sporny). Przed włączeniem storefrontów w App Store Connect warto powtórzyć przebieg (5 min).

## Tabela: wszystkie storefronty (od najmniejszej dostępności)

| Kod | Kraj | z top 25 konkurencji | z top 10 | gry z botami (z 5) | gry na żetony (z 10) | brakujące aplikacje |
|---|---|---|---|---|---|---|
| KR | Republic of Korea | 5 | 3 | 0 | 0 | 30 z 35 (lista w `wynik-2026-11-09.json`) |
| CN | China mainland | 14 | 7 | 3 | 0 | 21 z 35 (lista w `wynik-2026-11-09.json`) |
| AF | Afghanistan | 16 | 7 | 2 | 0 | 19 z 35 (lista w `wynik-2026-11-09.json`) |
| GA | Gabon | 18 | 8 | 3 | 1 | 16 z 35 (lista w `wynik-2026-11-09.json`) |
| MA | Morocco | 21 | 8 | 4 | 2 | 12 z 35 (lista w `wynik-2026-11-09.json`) |
| VN | Vietnam | 25 | 10 | 5 | 1 | 9 z 35 (lista w `wynik-2026-11-09.json`) |
| TR | Türkiye | 25 | 10 | 5 | 3 | 7 z 35 (lista w `wynik-2026-11-09.json`) |
| LB | Lebanon | 25 | 10 | 5 | 7 | WSOP Texas Holdem Poker Game; Poker Heat: Texas Holdem Games; Texas Hold’em |
| AE | United Arab Emirates | 24 | 10 | 5 | 9 | PokerCruncher - Advanced Odds; Texas Hold’em |
| ID | Indonesia | 24 | 9 | 5 | 9 | Poker Trainer - Learn Poker; Poker Face: Texas Holdem Live |
| RU | Russia | 25 | 10 | 5 | 8 | WSOP Texas Holdem Poker Game; Poker Heat: Texas Holdem Games |
| SA | Saudi Arabia | 24 | 10 | 5 | 9 | PokerCruncher - Advanced Odds; Texas Hold’em |
| AO | Angola | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| AZ | Azerbaijan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| BF | Burkina Faso | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| BH | Bahrain | 25 | 10 | 5 | 9 | Texas Hold’em |
| BJ | Benin | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| BN | Brunei | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| BR | Brazil | 24 | 10 | 5 | 10 | PokerCruncher - Advanced Odds |
| BW | Botswana | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| DO | Dominican Republic | 25 | 10 | 5 | 9 | Holdem or Foldem: Texas Poker |
| DZ | Algeria | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| EG | Egypt | 25 | 10 | 5 | 9 | Texas Hold’em |
| IQ | Iraq | 24 | 10 | 5 | 10 | PokerCruncher - Advanced Odds |
| JO | Jordan | 25 | 10 | 5 | 9 | Texas Hold’em |
| KG | Kyrgyzstan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| KW | Kuwait | 25 | 10 | 5 | 9 | Texas Hold’em |
| KZ | Kazakhstan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| LY | Libya | 24 | 10 | 5 | 10 | PokerCruncher - Advanced Odds |
| MV | Maldives | 24 | 10 | 5 | 10 | PokerCruncher - Advanced Odds |
| NE | Nigeria | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| NO | Norway | 25 | 10 | 5 | 9 | Pokerrrr 2: Texas Holdem Poker |
| OM | Oman | 25 | 10 | 5 | 9 | Texas Hold’em |
| PG | Papua New Guinea | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| PK | Pakistan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| QA | Qatar | 25 | 10 | 5 | 9 | Texas Hold’em |
| RW | Rwanda | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| SC | Seychelles | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| SL | Sierra Leone | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| ST | Sao Tome and Principe | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| TD | Chad | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| TJ | Tajikistan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| TM | Turkmenistan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| UG | Uganda | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| UZ | Uzbekistan | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| VU | Vanuatu | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| YE | Yemen | 25 | 10 | 5 | 9 | Texas Hold’em |
| ZW | Zimbabwe | 25 | 10 | 5 | 9 | Poker Face: Texas Holdem Live |
| AG | Antigua and Barbuda | 25 | 10 | 5 | 10 | — |
| AI | Anguilla | 25 | 10 | 5 | 10 | — |
| AL | Albania | 25 | 10 | 5 | 10 | — |
| AM | Armenia | 25 | 10 | 5 | 10 | — |
| AR | Argentina | 25 | 10 | 5 | 10 | — |
| AT | Austria | 25 | 10 | 5 | 10 | — |
| AU | Australia | 25 | 10 | 5 | 10 | — |
| BA | Bosnia and Herzegovina | 25 | 10 | 5 | 10 | — |
| BB | Barbados | 25 | 10 | 5 | 10 | — |
| BE | Belgium | 25 | 10 | 5 | 10 | — |
| BG | Bulgaria | 25 | 10 | 5 | 10 | — |
| BM | Bermuda | 25 | 10 | 5 | 10 | — |
| BO | Bolivia | 25 | 10 | 5 | 10 | — |
| BS | Bahamas | 25 | 10 | 5 | 10 | — |
| BT | Bhutan | 25 | 10 | 5 | 10 | — |
| BY | Belarus | 25 | 10 | 5 | 10 | — |
| BZ | Belize | 25 | 10 | 5 | 10 | — |
| CA | Canada | 25 | 10 | 5 | 10 | — |
| CD | Congo, Democratic Republic of the | 25 | 10 | 5 | 10 | — |
| CG | Congo, Republic of the | 25 | 10 | 5 | 10 | — |
| CH | Switzerland | 25 | 10 | 5 | 10 | — |
| CI | Cote d’Ivoire | 25 | 10 | 5 | 10 | — |
| CL | Chile | 25 | 10 | 5 | 10 | — |
| CM | Cameroon | 25 | 10 | 5 | 10 | — |
| CO | Colombia | 25 | 10 | 5 | 10 | — |
| CR | Costa Rica | 25 | 10 | 5 | 10 | — |
| CV | Cape Verde | 25 | 10 | 5 | 10 | — |
| CY | Cyprus | 25 | 10 | 5 | 10 | — |
| CZ | Czechia | 25 | 10 | 5 | 10 | — |
| DE | Germany | 25 | 10 | 5 | 10 | — |
| DK | Denmark | 25 | 10 | 5 | 10 | — |
| DM | Dominica | 25 | 10 | 5 | 10 | — |
| EC | Ecuador | 25 | 10 | 5 | 10 | — |
| EE | Estonia | 25 | 10 | 5 | 10 | — |
| ES | Spain | 25 | 10 | 5 | 10 | — |
| FI | Finland | 25 | 10 | 5 | 10 | — |
| FJ | Fiji | 25 | 10 | 5 | 10 | — |
| FM | Micronesia | 25 | 10 | 5 | 10 | — |
| FR | France | 25 | 10 | 5 | 10 | — |
| GB | United Kingdom | 25 | 10 | 5 | 10 | — |
| GD | Grenada | 25 | 10 | 5 | 10 | — |
| GE | Georgia | 25 | 10 | 5 | 10 | — |
| GH | Ghana | 25 | 10 | 5 | 10 | — |
| GM | Gambia | 25 | 10 | 5 | 10 | — |
| GR | Greece | 25 | 10 | 5 | 10 | — |
| GT | Guatemala | 25 | 10 | 5 | 10 | — |
| GW | Guinea-Bissau | 25 | 10 | 5 | 10 | — |
| GY | Guyana | 25 | 10 | 5 | 10 | — |
| HK | Hong Kong | 25 | 10 | 5 | 10 | — |
| HN | Honduras | 25 | 10 | 5 | 10 | — |
| HR | Croatia | 25 | 10 | 5 | 10 | — |
| HU | Hungary | 25 | 10 | 5 | 10 | — |
| IE | Ireland | 25 | 10 | 5 | 10 | — |
| IL | Israel | 25 | 10 | 5 | 10 | — |
| IN | India | 25 | 10 | 5 | 10 | — |
| IS | Iceland | 25 | 10 | 5 | 10 | — |
| IT | Italy | 25 | 10 | 5 | 10 | — |
| JM | Jamaica | 25 | 10 | 5 | 10 | — |
| JP | Japan | 25 | 10 | 5 | 10 | — |
| KE | Kenya | 25 | 10 | 5 | 10 | — |
| KH | Cambodia | 25 | 10 | 5 | 10 | — |
| KN | St. Kitts and Nevis | 25 | 10 | 5 | 10 | — |
| KY | Cayman Islands | 25 | 10 | 5 | 10 | — |
| LA | Laos | 25 | 10 | 5 | 10 | — |
| LC | St. Lucia | 25 | 10 | 5 | 10 | — |
| LK | Sri Lanka | 25 | 10 | 5 | 10 | — |
| LR | Liberia | 25 | 10 | 5 | 10 | — |
| LT | Lithuania | 25 | 10 | 5 | 10 | — |
| LU | Luxembourg | 25 | 10 | 5 | 10 | — |
| LV | Latvia | 25 | 10 | 5 | 10 | — |
| MD | Moldova | 25 | 10 | 5 | 10 | — |
| ME | Montenegro | 25 | 10 | 5 | 10 | — |
| MG | Madagascar | 25 | 10 | 5 | 10 | — |
| MK | North Macedonia | 25 | 10 | 5 | 10 | — |
| ML | Mali | 25 | 10 | 5 | 10 | — |
| MM | Myanmar | 25 | 10 | 5 | 10 | — |
| MN | Mongolia | 25 | 10 | 5 | 10 | — |
| MO | Macau | 25 | 10 | 5 | 10 | — |
| MR | Mauritania | 25 | 10 | 5 | 10 | — |
| MS | Montserrat | 25 | 10 | 5 | 10 | — |
| MT | Malta | 25 | 10 | 5 | 10 | — |
| MU | Mauritius | 25 | 10 | 5 | 10 | — |
| MW | Malawi | 25 | 10 | 5 | 10 | — |
| MX | Mexico | 25 | 10 | 5 | 10 | — |
| MY | Malaysia | 25 | 10 | 5 | 10 | — |
| MZ | Mozambique | 25 | 10 | 5 | 10 | — |
| NA | Namibia | 25 | 10 | 5 | 10 | — |
| NI | Nicaragua | 25 | 10 | 5 | 10 | — |
| NL | Netherlands | 25 | 10 | 5 | 10 | — |
| NP | Nepal | 25 | 10 | 5 | 10 | — |
| NR | Nauru | 25 | 10 | 5 | 10 | — |
| NZ | New Zealand | 25 | 10 | 5 | 10 | — |
| PA | Panama | 25 | 10 | 5 | 10 | — |
| PE | Peru | 25 | 10 | 5 | 10 | — |
| PH | Philippines | 25 | 10 | 5 | 10 | — |
| PL | Poland | 25 | 10 | 5 | 10 | — |
| PT | Portugal | 25 | 10 | 5 | 10 | — |
| PW | Palau | 25 | 10 | 5 | 10 | — |
| PY | Paraguay | 25 | 10 | 5 | 10 | — |
| RO | Romania | 25 | 10 | 5 | 10 | — |
| RS | Serbia | 25 | 10 | 5 | 10 | — |
| SB | Solomon Islands | 25 | 10 | 5 | 10 | — |
| SE | Sweden | 25 | 10 | 5 | 10 | — |
| SG | Singapore | 25 | 10 | 5 | 10 | — |
| SI | Slovenia | 25 | 10 | 5 | 10 | — |
| SK | Slovakia | 25 | 10 | 5 | 10 | — |
| SN | Senegal | 25 | 10 | 5 | 10 | — |
| SR | Suriname | 25 | 10 | 5 | 10 | — |
| SV | El Salvador | 25 | 10 | 5 | 10 | — |
| SZ | Eswatini | 25 | 10 | 5 | 10 | — |
| TC | Turks and Caicos Islands | 25 | 10 | 5 | 10 | — |
| TH | Thailand | 25 | 10 | 5 | 10 | — |
| TN | Tunisia | 25 | 10 | 5 | 10 | — |
| TO | Tonga | 25 | 10 | 5 | 10 | — |
| TT | Trinidad and Tobago | 25 | 10 | 5 | 10 | — |
| TW | Taiwan | 25 | 10 | 5 | 10 | — |
| TZ | Tanzania | 25 | 10 | 5 | 10 | — |
| UA | Ukraine | 25 | 10 | 5 | 10 | — |
| US | United States | 25 | 10 | 5 | 10 | — |
| UY | Uruguay | 25 | 10 | 5 | 10 | — |
| VC | St. Vincent and the Grenadines | 25 | 10 | 5 | 10 | — |
| VE | Venezuela | 25 | 10 | 5 | 10 | — |
| VG | British Virgin Islands | 25 | 10 | 5 | 10 | — |
| XK | Kosovo | 25 | 10 | 5 | 10 | — |
| ZA | South Africa | 25 | 10 | 5 | 10 | — |
| ZM | Zambia | 25 | 10 | 5 | 10 | — |
