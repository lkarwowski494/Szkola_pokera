# zh-Hant · L8 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m12-l1-wariancja.md | tak (140/140 linii, pl i zh-Hant) | bez poprawek mechanicznych; patrz „Do sprawdzenia” (liczebniki „千手牌”) |
| content/zh-Hant/lessons/m12-l2-decyzja-wynik.md | tak (116/116) | 3 poprawki NISKIE |
| content/zh-Hant/lessons/m12-l3-tilt.md | tak (134/134) | 2 poprawki ŚR |
| content/zh-Hant/lessons/m12-l4-bankroll.md | tak (149/149) | 1 poprawka ŚR, 1 NISKIE; ramka „Odpowiedzialna gra” zgodna z pl |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` przeczytany w całości; z `content/en/…` otwarte tylko dwie linie (m12-l2:86, m12-l3:133) dla rozstrzygnięcia dwuznaczności pl. `docs/lokalizacja/glosariusz.md` nie był czytany (terminy sprawdzone wyłącznie względem `terms-nazwy.yaml`). Poza częścią zajrzałem tylko grepem (liczba wystąpień „上頭”/„tilt”/„情緒失控” w `rules.yaml`, `exams/m12.yaml`, `terms-def.yaml`, `modules.yaml`; nazwa ekranu „Pomoc” w `locales/zh-Hant.json`; wartości kilku kluczy w `content/numbers.yaml`) — tych plików nie recenzowałem.

Kontrola skryptem (linia w linię pl ↔ zh-Hant, wszystkie 4 pliki): znaczniki `{{n:…}}` identyczne co do kluczy i liczby wystąpień w każdej linii; klucze `{{t:…}}` zgodne z pl z jednym wyjątkiem (m12-l2:86, dodatkowy `{{t:session|場次}}` — poprawka w JSON); `{{helplines}}`, `:::note`, bloki `formula`, `id`, `family`, `rules`, `answer`, `kind`, `correct: true` jak w pl; liczba linii równa. Heurystyczne wyszukiwanie znaków uproszczonych: brak trafień (bez OpenCC, lista ok. 600 znaków — nie jest to dowód pełny).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/zh-Hant/lessons/m12-l3-tilt.md (cały plik, 60+ wystąpień), m12-l4-bankroll.md:51 | pl „tilt” → „上頭”. `terms-nazwy.yaml` ma `tilt: null` (nazwa angielska), `rules.yaml` (R-M12, linie 995–999) pisze „情緒失控（tilt）” i nie zawiera „上頭” ani razu; `exams/m12.yaml`, `modules.yaml`, `terms-def.yaml` używają „上頭”. Trzy postaci jednego pojęcia między lekcją, regułami i słownikiem. | Decyzja terminologiczna poza tą częścią: albo `tilt: "上頭"` w terms-nazwy i ujednolicenie rules.yaml, albo zostaje jak jest z dopiskiem „（tilt）” przy definicji (poprawka w JSON dla m12-l3:100 robi tylko to drugie). |
| NISKIE | m12-l1-wariancja.md (26 linii), m12-l2:68, m12-l4:58 | pl „{{n:var.hands.k}} tys. rąk” → „{{n:var.hands.k}} 千手牌”; po podstawieniu wychodzi „100 千手牌”, „20 千手牌” itd. Sens i liczba zgodne z pl, ale po chińsku liczy się w 萬 („10 萬手牌”); zapis „100 千” jest zrozumiały, lecz nienaturalny. Podobnie m12-l2:112 „{{n:skill.sample.m}} 百萬手” → „76.9 百萬手” (naturalnie „7,690 萬手”). | Nie da się poprawić w samym tekście bez zmiany kluczy liczb (klucz niesie „100”, nie „100 000”). Do decyzji: osobne klucze/format liczby dla języków z 萬 albo zostawić. |

## Do ujednolicenia skryptem
Brak wzorców nadających się do ślepej zamiany w tej części. (Ewentualna zmiana „千手” → zapis w 萬 wymaga zmiany kluczy liczb, nie tekstu: `grep -c "千手"` = 26 w m12-l1, 1 w m12-l2, 1 w m12-l4.)

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- „上頭” jako odpowiednik „tilt” na Tajwanie: słowo jest zrozumiałe i używane w środowisku pokerowym, ale ma rodowód slangu z Chin kontynentalnych („上头”); tajwańscy gracze często mówią po prostu „tilt”. Czy „上頭” brzmi naturalnie dla czytelnika z Tajwanu jako tytuł lekcji?
- m12-l4:22 i :117 — pl „szansa, że kiedykolwiek stracisz cały bankroll” → „終究輸光全部資金的機率”. „終究” = „ostatecznie/w końcu”; czy nie niesie odcienia nieuchronności? Alternatywa: „遲早會輸光” / „有朝一日輸光”.
- m12-l1:140 — pl „Jeśli granie przestaje być pod kontrolą” → „如果打牌開始失控”; interfejs (`help.intro`) ma „如果你的遊戲行為開始失控”. Sens ten sam, sformułowania różne — czy ujednolicać?
- „負責任遊戲” (tytuł ramki „Odpowiedzialna gra”, m12-l4:143; odesłania m12-l3:133, m12-l4:102): na Tajwanie spotyka się też „負責任博彩/理性遊戲”. W interfejsie nie znalazłem tej nazwy do porównania (grep „負責任|理性” w locales/zh-Hant.json: 0 trafień).
- m12-l2:65 „更積極” vs m12-l1:92 „越激進” dla pl „agresywniej / agresywny styl” — oba poprawne; czy ujednolicić na „激進”?
- m12-l3:97 pl „wynik z ostatniego tygodnia” → „上週的輸贏結果” („z zeszłego tygodnia”); pl może znaczyć ostatnie 7 dni („最近一週”). Bez wpływu na wniosek.

## Pytania do źródła pl
- m12-l2:86 — „Analiza samych przegranych pomija połowę błędów”: przegranych sesji czy rozdań? (en: „Reviewing only losses”). Przekład przyjął „sesji”.
- Brak zastrzeżeń merytorycznych do liczb i twierdzeń pl w tej części.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Cała część to moduł 12; każde zdanie 4 lekcji porównane z pl.

- **Liczby, progi, warunki**: wszystkie liczby idą przez `{{n:…}}` i są identyczne z pl (klucz i liczba wystąpień w każdej linii). Liczby wpisane wprost zgodne: „2 ×” we wzorze RoR, „3 個結果中的 2 個” (2 z 3), „五到六次” (raz na pięć–sześć), „每五次” (raz na pięć), „一小時內第三次”, „連續第四次”, „半小時”, „過去六個月”, lata 1988/2015/2020, „一百倍”, „三分之一” (trzy razy mniejszy), „大一倍” (dwa razy większy).
- **Warunki graniczne m12-l4** (próg zejścia stawki): „najpóźniej … do połowy” → „最晚在…跌到…一半時”; „połowa to najpóźniejszy z nich” → „一半是其中最晚的”; „Wracasz wyżej najwcześniej wtedy, gdy masz pełny bankroll…” → „最早要等你擁有…完整資金，才升回去”; „nigdy mniej niż {{n:study.min}}” → „絕不少於”; „nigdy nie spada do zera” → „永遠不會降到零”; „jeśli nigdy nie zejdziesz stawkę” → „從不降級別”; „zejście przed progiem połowy nie jest błędem”, „…a później już tak” — zachowane. Dwie poprawne odpowiedzi w m12.l4.q-stay (linie 58–59) oznaczone jak w pl.
- **Poprawne odpowiedzi**: `correct: true` w tych samych opcjach co pl we wszystkich ćwiczeniach; uzasadnienia zgodne z oznaczoną odpowiedzią.
- **Ramka „Odpowiedzialna gra” (m12-l4:143–149)**: wszystkie pięć grup sygnałów obecne i w tej samej kolejności (dłużej niż planowałeś; powrót po przegranej, żeby odegrać straty; pieniądze, których nie możesz stracić, albo pożyczanie na grę; ucieczka od zmartwień; ukrywanie przed bliskimi); „Niektóre sygnały” → „一些跡象”; „Gdzie szukać pomocy” → „去哪裡尋求協助”; `{{helplines}}` nienaruszony. Nic nie pominięte, nie złagodzone, nie wzmocnione.
- **Ćwiczenie m12.l4.q-warning-sign (linie 100–104)**: zgodne zdanie po zdaniu, w tym „jeden z sygnałów problemu z hazardem wymienianych w kryteriach diagnostycznych” → „診斷準則中列出的賭博問題跡象之一” oraz odesłanie do kontaktów z ramki.
- **Odesłania**: m12-l1:140 „ogólne wskazówki, nie gwarancja wyniku … ekran »Pomoc«” → „一般性的建議，不保證任何結果 … 「協助」畫面” (nazwa ekranu zgodna z `locales/zh-Hant.json`: „協助”). m12-l3:133 — jedyna nieścisłość w treści krytycznej: „odgrywasz się” oddane jako „想把輸的追回來” (chęć zamiast zachowania) → poprawka ŚR w JSON.
- **Numery telefonów, adresy, nazwy organizacji**: nie występują w tych czterech plikach (są w `helplines.yaml`, poza częścią L8); znacznik `{{helplines}}` jest na miejscu.
- Wynik: brak znalezisk KRYT i WYS.
