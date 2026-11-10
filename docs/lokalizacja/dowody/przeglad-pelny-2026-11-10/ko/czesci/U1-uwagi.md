# ko · U1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `apps/mobile/src/i18n/locales/ko.json` (źródło `pl.json`) | Tak: wszystkie 699 kluczy ko zestawione z pl klucz po kluczu | Zbiór kluczy ko = pl bez form `_one/_few/_many` (48 kluczy tylko w pl; koreański ma jedną formę `_other`, poprawnie). Brak kluczy nadmiarowych. Parametry `{{…}}` i klucze `{{t:klucz}}` identyczne z pl we wszystkich kluczach (porównanie skryptem, różnią się tylko formy po `|`). |
| `apps/mobile/src/i18n/locales/pl.kontekst.json` | Nie w całości: odczytane wpisy dla ok. 25 kluczy niejednoznacznych | Plik pomocniczy (kontekst), nie przekład. |
| `apps/mobile/src/i18n/locales/en.json` | Nie: tylko `help.link`, `help.intro` pomocniczo | Zgodnie z instrukcją. |
| `docs/sklep/aso/metadane-fala2.json` → `lokalizacje.ko` (źródło: `store/app-store-metadata.json` → `pl`, `en-US`) | Tak: name, subtitle, keywords, promotionalText, description | Limity: name 19 znaków (≤ 30), subtitle 18 (≤ 30), keywords 39 znaków / 91 bajtów (≤ 100). |
| `store/iap-localizations.json` | Tak | Brak języka ko (są tylko pl i en) — brak metadanych zakupów dla ko; teksty odpowiadające (`purchase.title`, `purchase.plan.*`, `purchase.renews*`, `purchase.oneTime`) w ko.json są poprawne. |
| `content/ko/terms-nazwy.yaml` | Tak | Użyty do kontroli form w `{{t:…|forma}}`. |
| `docs/lokalizacja/glosariusz.md` | Nie | Zgodność terminów sprawdzana przez `terms-nazwy.yaml` (nazwy ko); glosariusz pl→en nie był potrzebny. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | `apps/mobile/src/i18n/locales/ko.json:316`, `:317` | Treść krytyczna. pl „Pomoc: gdy **granie** wymyka się spod kontroli”, „Jeśli **granie** przestaje być pod kontrolą” → ko „**도박**을 통제하기 어려울 때 / 어려워지고 있다면” („hazard” zamiast „granie”). Sens ostrzeżenia zachowany (pierwsze zdanie nazywa pokera na pieniądze hazardem), en ma w `help.link` też „gambling”, ale w `help.intro` „your playing”. Zawężenie względem pl, nie odwrócenie. | Jeśli ma być dosłownie jak pl: „도움말: 게임을 통제하기 어려울 때” i „게임을 통제하기 어려워지고 있다면”; do decyzji z rodzimym użytkownikiem (patrz „Do sprawdzenia”). |
| NISKIE | `docs/sklep/aso/metadane-fala2.json:26` | Niespójność słownictwa sklep ↔ aplikacja: kurs „강좌” (UI: „강의”), trafność „정답률” (UI `progress.accuracy`: „정확도”), pełny dostęp „전체 이용권” (UI: „전체 이용”), seria „연속 일수” (UI: „연속 학습”). Wszystkie warianty zrozumiałe. | Ujednolicić przy najbliższej edycji opisu sklepu; bez pilności. |
| NISKIE | `docs/sklep/aso/metadane-fala2.json:26` | Nagłówek „DOSTĘP” → „이용 방법” („sposób korzystania”); treść sekcji mówi o zakresie darmowym i płatnym. | „이용 범위” albo „이용권”. |
| NISKIE | `docs/sklep/aso/metadane-fala2.json:26` | Ostatnia linia: znacznik „[PRIVACY URL]” jak w en-US (pl: „[ADRES PRYWATNOSCI]”); etykiety dwujęzyczne „이용 약관 / Terms of Use”. Nie błąd przekładu, tylko uwaga dla sesji zapisującej do ASC (znacznik do podmiany). | — |
| NISKIE | `docs/sklep/aso/metadane-fala2.json:24` | Słowa kluczowe mają pisownię „프리플랍, 포스트플랍”, a aplikacja i `terms-nazwy` „프리플롭/플롭”. W słowach kluczowych może to być celowe (obie pisownie są w użyciu, wyszukiwanie) — nie zmieniałem; w opisie poprawka jest w `U1.json`. | Potwierdzić w roli sklepu. |

## Do ujednolicenia skryptem
Brak. Uwaga terminologiczna bez poprawki: w interfejsie forma terminu `bet` to zawsze „벳” (`{{t:bet|벳}}`, 14 wystąpień w 11 liniach), a nazwa w `terms-nazwy.yaml` to „베팅”. „벳” jest drugą utrwaloną postacią tego samego słowa, używaną także w lekcjach ko (m.in. `벳합니다` ×18, `벳` ×15) i w nazwach „C벳”, „밸류 벳”, „3벳”; na przyciskach jest krótsza. Nie traktuję tego jako błędu. Gdyby właściciel terminologii chciał jednej postaci, zamiana `{{t:bet|벳}}` → `{{t:bet|베팅}}` jest bezpieczna gramatycznie (obie kończą się spółgłoską, partykuły 을/은/이 bez zmian).

Podobnie `{{t:pair|원페어}}` w `drill.category.pair` i `drill.categoryAcc.pair` (nazwa układu w rankingu) wobec nazwy „페어”: świadome rozróżnienie odnotowane w komentarzu `terms-nazwy.yaml`, zostaje.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `help.link`, `help.intro` (ko.json:316–317): czy „도박을 통제하기 어려울 때” zostaje (naturalne, zgodne z językiem poradni), czy ma być dosłowne „게임/플레이” jak pl „granie”.
- `purchase.title` / `settings.fullAccess` / `start.fullAccess` „전체 이용” jako tytuł i przycisk: czy naturalniejsze byłoby „전체 이용권” (tak w opisie sklepu).
- `drill.texture.summary` (ko.json:869): zdanie składane z etykiet „이 플롭은 높음, 레인보우, 커넥티드이므로 드라이입니다” — etykieta „높음/중간/낮음” w środku zdania brzmi sztywno; zrozumiałe, ale warto obejrzeć na ekranie.
- `table.listAnd` „{{a}} 및 {{b}}” (np. „BTN, SB 및 BB”): poprawne, lecz urzędowe; ewentualnie „{{a}}, {{b}}”.
- `rule.because` „이유” (pl „bo”, etykieta ok. 2 znaków w karcie reguły obok „만약 / 그러면”): poprawne jako etykieta; do obejrzenia na ekranie.
- `drill.drawCall.promptFlop/Turn`, `drill.icm.callPrompt`: pytanie „어떻게 하시겠습니까?” (forma honoryfikatywna) obok „…인가요?” w pozostałych poleceniach — drobna niejednolitość rejestru.
- Podtytuł sklepu po poprawce („판돈 없음”): czy rodzimy użytkownik woli „실제 돈 없음”.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Interfejs:
- `welcome.noMoney`: „To nauka bez gry na pieniądze.” → „실제 돈을 걸지 않는 학습입니다.” — zgodne.
- `play.format`: „Żetony nie mają żadnej wartości.” → „칩에는 아무 가치가 없습니다.” — zgodne; „100bb” bez zmian.
- `help.title`, `settings.help`: „Pomoc” → „도움말” — zgodne (ta sama nazwa w opisie sklepu).
- `help.link`: „gdy granie wymyka się spod kontroli” → „도박을 통제하기 어려울 때” — „granie” oddane jako „hazard” (patrz znaleziska, ŚR bez poprawki).
- `help.intro`: zdanie 1 „Poker na pieniądze to gra hazardowa.” → „돈을 건 포커는 도박입니다.” — zgodne; zdanie 2 — jak wyżej („granie” → „도박”), „możesz skorzystać z pomocy poniżej” zgodne.
- `help.call`, `help.callA11y`, `help.openA11y`, `help.openFailed`: parametry `{{phone}}`, `{{name}}`, `{{label}}`, `{{host}}`, `{{target}}` nienaruszone; sens zgodny. Numery i nazwy organizacji nie są w słowniku interfejsu (pochodzą z `helplines.yaml`, poza tą częścią).
- `advancement.gameExplain`: „wynik rozdań w żetonach nie wchodzi do wskaźnika” → zgodne; „6-osobowy”, „100bb”, `{{min}}`, `{{window}}` ×2 zachowane.
- Zakupy (`purchase.*`, `start.counter`, `start.alwaysFree`): okresy „3 miesiące”, „raz na rok”, odnowienie do anulowania, zakup jednorazowy, darmowe lekcje i pierwsze podejście do egzaminu — zgodne z pl.

Sklep (`metadane-fala2.json` → ko):
- promotionalText: „Bez gry na pieniądze, bez konta, bez reklam.” → „실제 돈 게임과 광고가 없고, 계정 없이 사용합니다.” — zgodne, nic nie pominięte.
- description, zdanie o hazardzie: „To nauka, nie hazard: w aplikacji nie ma stawek, żetonów do wygrania ani gry na pieniądze.” → „이것은 도박이 아니라 훈련입니다. 베팅도, 딸 수 있는 칩도, 실제 돈을 거는 게임도 없습니다.” — „stawek” oddane jako „베팅” (= bet, zagranie uczone w aplikacji): poprawka ŚR w `U1.json` („판돈”). Pozostałe dwa człony zgodne.
- subtitle: „Nauka pokera bez gry o stawki” → „결정마다 평가와 해설, 베팅 없음” — adaptacja ASO; człon „베팅 없음” z tą samą usterką, poprawka ŚR w `U1.json`.
- „ODPOWIEDZIALNIE • Ekran „Pomoc” z informacją, gdzie szukać pomocy przy problemie z hazardem” → „책임감 있는 플레이 • ‘도움말’ 화면에서 도박 문제 상담처 안내” — zgodne.
- „DOSTĘP”: lekcje, ocena poziomu, pierwsze podejście zawsze darmowe; jedna darmowa aktywność dziennie (sesja, powtórki albo powtórny egzamin); subskrypcja kwartalna/roczna odnawiana do anulowania w ustawieniach konta Apple; dostęp dożywotni jednorazowo — wszystkie warunki i liczby („1개”, „8문제”, „15문제”) zgodne z pl. Adres EULA Apple identyczny.
