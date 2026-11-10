# Soczewka: nowy użytkownik w pierwszym tygodniu, bez instrukcji

Data odczytu wszystkich źródeł: 2026-11-10. Cytaty sprawdzone dosłownie na surowym tekście pobranym przez curl (JSON z RSS recenzji iTunes, JSON z iTunes Lookup, HTML stron App Store). Repozytorium nie było czytane; podstawą jest tylko opis w sklepie i cel właściciela.

## Przeczytane alternatywy (2026-11-10)

| Aplikacja | Sklep | Ocena (liczba) | Ceny (strona App Store, curl) |
|---|---|---|---|
| Postflop+ GTO Poker Trainer (id1488850006) | US | 4,67 (1982) | tydz. 4,99 / mies. 14,99 / rok 99,99 / dożywotni 199,99 (promocja 149,99) USD |
| Poker Trainer - Learn Poker (id6478522482) | US | 4,75 (1177) | tydz. 6,99 / mies. 14,99 / rok 59,99–89,99 / dożywotni 269,99 USD |
| POKER Q'z — ポーカー学習＆GTOトレーナー (id6737678499) | JP | 4,61 (1592) | mies. ¥3 300 / rok ¥19 800 + punkty AI |
| Handly: Learn Poker Offline (id6761502652) | US | 4,84 (55) | Handly Pro 4,99 USD |
| Wzorce: Duolingo (id570060128), Chess.com (id329218549) | US | 4,72 / 4,81 | — |

Adresy: strony `https://apps.apple.com/us/app/id<ID>` (JP: `https://apps.apple.com/jp/app/id6737678499`), recenzje `https://itunes.apple.com/us/rss/customerreviews/id=<ID>/sortBy=mostRecent/json` (JP: `/jp/`), opisy `https://itunes.apple.com/lookup?id=<ID>&country=us`.
Zastrzeżenie: recenzje Handly mają powtarzalne tytuły i szablonowe zdania (np. „Good for short sessions” kilka razy w sierpniu–wrześniu 2026), więc traktuję je jako słaby dowód.
Wniosek ogólny: grupa „GTO trainer” (Postflop+, Poker Trainer) sprzedaje narzędzie graczom, którzy już grają; nowicjusz odbija się od żargonu, braku wyjaśnień i ściany płatności. Wygrywa się tu nauczaniem od zera po ludzku i uczciwym, tanim modelem płatności.

## Co musi być prawdą (15)

1. **[przepływ] Pierwsza decyzja z wyjaśnieniem w ciągu ok. minuty, przed paywallem i bez zakładania czegokolwiek.** Test kwalifikacyjny (≤8 pytań) ma przycisk „Pomiń” od pierwszego ekranu, a pierwszy ekran po nim to lekcja, nie oferta.
   Dowód: POKER Q'z (JP), 2026-08-21: „初回で必死に無料トライアルに誘導しようとしてきてその閉じ方も分かり辛い”; 2026-04-11: „チュートリアルを終えて、本利用するには1ヶ月or1年の課金プラン（無料期間1週間有）に加入するしかない。最低。” (RSS JP id6737678499).

2. **[pieniądze] Darmowy zakres jest dokładnie taki, jak w opisie, i widać go w aplikacji** (licznik „1 darmowa aktywność dziś, odnawia się o …”; lekcje zawsze darmowe). Rozjazd opisu i działania to najczęstszy powód jedynek.
   Dowód: Postflop+, 2022-09-18: „They say they allow 20 FREE per day but that’s not true.”; Poker Trainer, 2025-12-11: „Expect nothing for free. You get a few hands, but if you want to sit for a bit and learn, expect to pay for a subscription.”

3. **[pieniądze] Pierwszy paywall jest uczciwy:** widoczny krzyżyk, pełne ceny bez sztucznych „-50%”, jasno opisane odnowienie, żadnej próby, która cicho zamienia się w płatny rok.
   Dowód: Postflop+, 2023-05-08: „They will offer you a “50%!!” Discount which is NOT 50% off. The regular lifetime price is 199.99 at the time of writing yet the claim to offer a half off price or 149.99.”; Poker Trainer, 2025-07-29: „I had downloaded the app and used the free trial, I disliked it and deleted the app. Two months later … I was charged 60 bucks for a year long subscription.”

4. **[pieniądze] Cena jest atutem i paywall to mówi:** dożywotni 19,99 USD to ok. 1/10 dożywotniego u konkurencji (199,99 i 269,99 USD), rok 14,99 to mniej niż jeden miesiąc u nich (14,99 USD). Plan dożywotni pokazany obok subskrypcji, bez ukrywania.
   Dowód: ceny ze stron App Store id1488850006 i id6478522482 (tabela wyżej, 2026-11-10); Chess.com, 2026-11-08: „I might consider paying but only if it was lifetime and Not a Subscription and reasonable”; Postflop+, 2024-10-23: „I’m scared of anything that is a subscription”.

5. **[dane, pieniądze] „Przywróć zakupy” działa bez konta na nowym urządzeniu i jest widoczne na paywallu i w ustawieniach.**
   Dowód: Postflop+, 2026-06-15: „My subscription doesn’t show on my new iPad … Signed on with same Apple ID!”; POKER Q'z, 2026-09-18: „有料プランを購入したのに一生反映されない”.

6. **[pieniądze] Anulowanie subskrypcji jest o jedno stuknięcie z ustawień** (link do zarządzania subskrypcjami Apple), a przypomnienie przed odnowieniem nie jest obietnicą bez pokrycia.
   Dowód: Postflop+, 2026-01-16: „There’s a 3 day trial but no way to cancel before they start charging you”; POKER Q'z, 2026-04-30: „アプリからの通知があるとあったが通知来ず1年契約となってしまった。”

7. **[treść] Cztery poziomy oceny mają jedną widoczną legendę (co znaczy każdy poziom, w EV lub w słowach), a zagrania o równej wartości dostają ten sam najwyższy poziom** (ręka mieszana: „oba poprawne”).
   Dowód: Postflop+ ma tę samą skalę („Instant feedback — Perfect, OK, Mistake, or Blunder”, opis Lookup) i recenzja z 2020-10-20: „The only aspect that is sometimes confusing to me is the rating system. If two actions have the same EV, why is one “ok” and one “perfect”?”; 2023-05-19: „My ELO constantly gets hit by blunders even if there’s 4 options and I choose the 2nd best.”

8. **[treść, pieniądze] Każda ocena ma wyjaśnienie „dlaczego” prostym językiem, także w wersji darmowej.** Ocena bez powodu niczego nie uczy, a zamknięte wyjaśnienia czytelnicy odbierają jako szantaż.
   Dowód: Postflop+, 2024-04-28: „it doesn’t provide reasoning behind blunders. Just says your move was a blunder, but doesn’t explain why.”; POKER Q'z, 2026-06-17: „プレミアム解放しないと解説が見れないのが残念”; POKER Q'z, 2025-10-24 (pozytywnie): „他の有名アプリだと、何故そうするのか理由がなかったが、解説がつくことで…よくわかる”.

9. **[treść] Żaden termin nie pada przed definicją; każdy termin w wyjaśnieniu da się stuknąć i zobaczyć hasło słownika w języku użytkownika.** Deklaracja „jestem początkujący” musi realnie zmieniać język wyjaśnień.
   Dowód: POKER Q'z, 2026-08-25: „初心者ってアンケートに回答してんのに、AIは全然聞いてない。初っ端かな専門用語しか使わずに解説してきて、理解不能。”; Postflop+, 2020-10-27: „What are range splits? What do all the different things mean and how do I use them?”; POKER Q'z, 2026-01-13: „エクイティが〇〇%です、と一言で書かれててもそれが何でか分かりにくい”.

10. **[treść] Pierwsze przykłady są bezbłędne, a ćwiczenie pokazuje założenia (pozycje, stosy, akcja) i odróżnia jakość decyzji od wyniku rozdania.** Nowicjusz ocenia aplikację po kartach przeciwnika i po pierwszej pomyłce.
   Dowód: Poker Trainer, 2025-02-25: „there seems to be an error in the FIRST example in the intro to poker section…the text description of the cards on the board does not match the picture. Deleted app…”; Postflop+, 2026-10-05: „I fold and it tells me I should have pushed all in. Fails me on the hand. Opponent had Q-Q.”

11. **[przepływ] Zero konfiguracji przed nauką: na ekranie głównym jeden przycisk „Dalej”, który sam wybiera następny krok** (lekcja, powtórka albo ćwiczenie); powrót do ekranu głównego zawsze w tym samym miejscu.
   Dowód: Poker Trainer, 2026-06-23: „I’m spending most of the time figuring out how to set up my parameters.”; POKER Q'z, 2026-08-09: „ホーム画面に戻れないし、そもそもどの画面がどのカテゴリに属している何なのかが分かるように全くなっていません。”

12. **[wzrost] Powrót następnego dnia napędza jedno przypomnienie o godzinie wybranej przez użytkownika, bez straszenia utratą serii; seria wybacza (np. dzień przerwy) i liczy się offline.** Prośba o zgodę na powiadomienia dopiero po pierwszej ukończonej lekcji, nie na starcie.
   Dowód: Duolingo, 2026-11-08: „I'm sick and tired of getting 15 messages in a day threatening my “streak” or passive-aggressive “I guess you don't care anymore”.”; Duolingo, 2026-11-08: „I was on a cruise for a week and did my Duolingo daily yet it glitched out and I lost my friend streaks.”; Postflop+, 2023-07-18: „got a notification from this app asking for a review even though i have notifications off”.

13. **[wzrost, treść] Dzień 2 zaczyna się od krótkiej powtórki własnych wczorajszych błędów** (powtórki rozłożone w czasie), z widoczną liczbą „do powtórki dziś”; to jest powód powrotu, nie sama seria. Konkurencja już to obiecuje, więc to parytet, nie wyróżnik.
   Dowód: Poker Trainer (opis Lookup): „Complete Daily Drills, build your streak and revisit common mistakes over time with spaced repetition.”; POKER Q'z, 2026-07-06: „間違えた問題や忘れやすい問題だけ重点的に復習したいので。”

14. **[prywatność, wydanie] Komunikat „bez prawdziwych pieniędzy, bez konta, bez reklam i śledzenia” jest na pierwszym ekranie i w sklepie, a wygląd nie przypomina kasyna.** Konkurenci mówią to wprost w opisie; brak konta usuwa całą klasę skarg (wylogowania, logowanie po aktualizacji).
   Dowód: POKER Q'z (opis Lookup JP): „※本アプリに実際のお金を賭ける要素はありません。チップはすべて仮想で、換金・譲渡・景品への交換はできません。”; Poker Trainer (opis): „Poker Trainer is an educational app. No real-money gambling or multiplayer poker games.”; POKER Q'z, 2026-07-16: „一日の間に何度も勝手にログアウトされていて…”; 2026-07-05: „有料課金してるのにアプデでログインできなくなった”.

15. **[dane, wydanie] Postęp nigdy nie ginie (offline, po aktualizacji, po zabiciu aplikacji), a ćwiczenie nie zawiesza się na małych i starszych iPhone'ach; karty na stole są widoczne podczas wyboru odpowiedzi.** W tygodniu pierwszym jedna utrata postępu lub zawieszony przycisk kończy relację z aplikacją.
   Dowód: POKER Q'z, 2026-08-05: „戦績が反映されず水の泡になった”; 2026-07-09: „クイズをしてると固まってボタンが押せない。途中退出ばかりでコンプリートできない。”; 2025-11-03: „iPhoneSE2で動かない”; 2026-03-01: „選択肢が表示される時、ボードのカードが消えないようにしてほしいです。”

## Uwagi do dowodów
- Recenzje z lat 2020–2023 (punkty 2, 3, 7, 12) są starsze; użyte, bo dotyczą tej samej skali ocen lub wzorca płatności i nie znalazłem nowszego zaprzeczenia.
- Ceny z HTML stron App Store mogą różnić się wariantami (dwie ceny rocznego planu Poker Trainer: 59,99 i 89,99 USD); podaję obie.
