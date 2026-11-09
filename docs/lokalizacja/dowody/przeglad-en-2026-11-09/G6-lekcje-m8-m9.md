# G6: przegląd przekładu pl → en, lekcje m8 i m9

Zakres: 8 par plików `content/pl/lessons/m8-*`, `m9-*` → `content/en/lessons/…`. Sprawdzone automatycznie: zbiory `{{n:…}}` i `[[karty]]` identyczne w każdej parze; pola nietekstowe (id, family, rules, answer, table, generator, params) identyczne; flagi `correct`/`sizeError` w tej samej kolejności. Każdy akapit i pole tekstowe przeczytane ręcznie względem źródła.

| plik | miejsce | problem | propozycja | waga | pewność |
|---|---|---|---|---|---|
| m9-l1-spr.md | ¶2 (pod „## What is the {{t:spr}}”) | W en `{{t:spr}}` renderuje się jako „SPR”, więc „The {{t:spr}} (SPR)” daje „The SPR (SPR)”. Gubi się rozwinięcie skrótu, które źródło podaje w nawiasie („ang. stack-to-pot ratio”), a to pierwsza definicja pojęcia w lekcji. | The {{t:spr}} (stack-to-pot ratio) is the ratio of the stack to the {{t:pot}} at the start of a {{t:street}}. You can calculate it on any {{t:street}} (in M7 you calculated it on the turn), but for your hand plan you take the flop {{t:spr}}, before anyone makes a {{t:bet}}. | WYSOKIE | wysoka |
| m8-l1-value.md | drills[8] (q-where-am-i).prompt | Znacznik terminu `call` z formą „see” („I bet to {{t:call\|see}} where I'm at”). W en to zwykłe „see”, a nie sprawdzenie, więc znacznik podpina do słowa definicję „call”. | A friend says: “On the river with a medium {{t:pair}}, I bet to see where I'm at.” What's wrong with this idea? | ŚREDNIE | wysoka |
| m8-l1-value.md | drills[8] (q-where-am-i).options[0].why | „with {{t:position}} the opponent will show…” brzmi niejasno, jakby to rywal miał pozycję. Źródło mówi „z pozycji”, czyli ty grasz z pozycją. | After a bet like that, the hands you beat {{t:fold}}, and the ones you lose to pay or {{t:raise}}. You get the information for free by {{t:check\|checking}}, because when you're {{t:position\|in position}}, the opponent will show their cards at showdown. | NISKIE | średnia |
| m8-l3-blokery.md | drills[5] (q-missed-flush).prompt | Ostrzeżenie „brakuje {{t:big-blind}}”: „The big blind checks” jest bez znaczników (w źródle: {{t:big-blind\|Duży blind}} czeka). Pojęcie się zgadza, ale zapis jest niespójny z resztą lekcji, gdzie BB i check mają znaczniki. | The spade {{t:flush-draw}} missed. The {{t:big-blind}} {{t:check\|checks}} on the river. Both hands have only queen-eight. Which one is better to bluff with? | NISKIE | wysoka |
| m9-l3-rozmiar-geometryczny.md | drills[5] (q-3bet-ip).options[1].why | Cudzysłów prosty 'whole stack in by the river'. Reszta przekładu używa “…”. | Right action, wrong size: three 1/3-{{t:pot}} {{t:bet\|bets}} put in only about {{n:g3b.third.total}} of {{n:spr.3bet-ip.stack}}. The plan “whole stack in by the river” needs about {{n:geo.3bet-ip.3}} {{t:pot}}. | NISKIE | wysoka |
| m9-l4-plan-trzech-ulic.md | ¶1 | „before you {{t:bet\|put in}} your first {{t:bet}}”: znacznik terminu `bet` stoi na „put in”, a samo zdanie brzmi ciężko. | A good plan starts on the flop, before you make your first {{t:bet}}. Ask yourself: how many streets of {{t:value}} can my hand take, and do I want to play for the whole stack? The answer combines hand strength with the {{t:spr}}. | NISKIE | wysoka |

## Ocena ostrzeżeń automatycznych (26 wierszy)

- **m8-l2 (10 wierszy) i m8-l4 (6 wierszy), value i bluff:** sprawdzone wszystkie miejsca. Value i bluff nie zostały nigdzie zamienione miejscami ani pomylone.
  - „Brakuje {{t:bluff}}” wynika z tego, że „łapiąca blefy” / „bluff-catcher” w en to zwykłe słowo bez znacznika (bluff-catching hand, bluff-catcher). Pojęcie jest poprawne.
  - „Nadmiarowe {{t:value}}”: polskie zwykłe słowo „wartość” (np. „przegrywa z twoją wartością”, „więcej wartości”) dostało w en znacznik {{t:value}} („loses to your {{t:value}}”, „relatively more {{t:value}}”). Kierunek jest wszędzie ten sam co w źródle. Poprawne.
- **m8-l3 drills[5]:** zwykłe „big blind” bez znacznika. Pojęcie poprawne, zapisane w tabeli jako NISKIE (spójność).
- **m9-l1 (4 wiersze):** brak {{t:call}} w „4-bet and called {{t:pot}}” i brak drugiego {{t:bet}} w „before anyone makes a {{t:bet}}” (pl: „{{t:bet|postawi}} {{t:bet}}”). Pojęcia zachowane. Poprawne.
- **m9-l2 drills[3].prompt:** nadmiarowe {{t:bet}} w „once the {{t:bet}} is called” (pl: „po jego sprawdzeniu”, gdzie „jego” odnosi się do zakładu). Poprawne.
- **m9-l3 (3 wiersze):** brak {{t:pot}} („stays behind” = za pulą) i brak drugiego {{t:bet}} w ¶1. Poprawne.
- **m9-l3 drills[2].options[2].why i m9-l4 notka:** brak {{t:fold}} i {{t:call}}. Tu przekład jest poprawny, a **błąd jest w źródle pl**:
  - „{{t:fold|Pasuje}} {{t:spr}} …” to „pasuje” w znaczeniu „odpowiada”, nie pas;
  - „plan {{t:call|sprawdzasz}} na nowo” to „sprawdzasz” w znaczeniu „weryfikujesz”, nie sprawdzenie.

  W en słusznie jest „is the one that fits” i „you reassess the plan” bez znaczników. Zalecenie dla pl: usunąć te dwa znaczniki.

Podsumowanie: 8 plików, 6 problemów (KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 1, NISKIE 4); wszystkie 26 ostrzeżeń okazało się fałszywymi alarmami (value i bluff nigdzie nie są zamienione), a dwa z nich ujawniły błędne znaczniki w źródle pl (m9-l3 „Pasuje”, m9-l4 „sprawdzasz”).
