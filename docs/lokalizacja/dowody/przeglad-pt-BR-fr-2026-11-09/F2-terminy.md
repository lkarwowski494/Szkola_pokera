# F2-terminy: terminologia fr i nazwy K-05 (rola 09, sesja AD, 2026-11-09)

Metoda: strony pobrane `curl` (data odczytu 2026-11-09), tekst wyciągnięty z surowego HTML/wikitekstu przez usunięcie znaczników; każdy cytat poniżej sprawdzony `grep -F` na tym tekście (dosłownie; spacje przed przecinkami/kropkami w cytatach z [A] pochodzą z usuniętych linków i zostały w cytacie pominięte). Konteksty znaczników bez formy: wszystkie 1044 wystąpienia `{{t:klucz}}` w `tl/content/fr` i `tl/ui/fr.json`, słowo przed znacznikiem porównane z rodzajem i liczbą proponowanej nazwy (skrypt).

## Źródła

- [A] PokerStrategy.com, glosariusz FR, strona terminu: `https://www.pokerstrategy.com/fr/glossary/<Strona>/` (np. `…/Blind/`, `…/Call/`, `…/Hors-position_186/`); ok. 140 stron otwartych.
- [B] Wikipedia FR „Main au poker”: https://fr.wikipedia.org/wiki/Main_au_poker (wikitekst `action=raw`).
- [C] Wikipedia FR „Texas hold'em”: https://fr.wikipedia.org/wiki/Texas_hold%27em (wikitekst `action=raw`).
- [D] PokerNews FR, „Règles du Texas Hold'em”: https://fr.pokernews.com/regles-poker/texas-holdem.htm
- [E] PokerNews FR, „Vidéo : le check-raise à la rivière par Jonathan Little”: https://fr.pokernews.com/strategie/check-raise-river-video-jonathan-little-strategy-poker-tips-25534.htm
- [F] PokerNews FR, niveau de maths: https://fr.pokernews.com/strategie/niveau-de-maths-reellement-necessaire-pour-reussir-poker-63171.htm
- [G] PokerNews FR, Omaha Checker: https://fr.pokernews.com/strategie/logiciel-poker-omaha-checker-hud-equite-preflop-range-19098.htm
- [H] PokerNews FR, porady Chrisa Moormana: https://fr.pokernews.com/strategie/debutant-online-poker-tips-chris-moorman-55988.htm

Nie dało się otworzyć / brak strony: club-poker.net (lexique; proxy: host nieosiągalny, 502), lepoker.fr (nieosiągalny), winamax.fr/poker/lexique (403), fr.pokernews.com/lexique/ i /poker-lexique/ (404), poker-academie.com lexique (404), blog.gtowizard.com/fr/ (404 — brak wersji fr), fr.wikipedia „Lexique du poker” / „Glossaire du poker” (artykuły nie istnieją), pokerstars.fr/poker/terms i /learn (zwraca angielską stronę-powłokę, bez treści), wyszukiwanie „bloqueur” (PokerNews, PokerStrategy, Bing — bez wyników do odczytu).

## Najważniejsze rozstrzygnięcia (30 terminów kluczowych)

- **pot** = „pot” (m) [A][C]; **board** = „board” (m), źródło podaje też „tableau” [A][C] — tłumacz: board×67, tableau×13 → zostaje „board”.
- **big blind / small blind** = „grosse blinde / petite blinde” (f) [A „Big Blind (grosse blinde) … Small Blind (petite blinde)”][D]; tłumacz ma też „grosse blind”×48 i „petite blind”×24 — warto ujednolicić na „-blinde”. Kontekst bez formy: „la {{t:big-blind}}”×51, „la {{t:small-blind}}”×11 — rodzaj zgodny.
- **call / fold / check** = „call”, „fold”, „check” (rzeczowniki, m), a nie „suivre / se coucher”: źródła [A][D] podają oba warianty (czasownik fr i rzeczownik ang.), a wszystkie znaczniki bez formy stoją w pozycji rzeczownika („le/un {{t:call}}”, „un {{t:fold}}”, „All-in ou {{t:fold}}”, „un {{t:check}}”); nazwa-czasownik dałaby „le suivre”. Czasowniki zostają w formach (`{{t:call|suivre}}`).
- **bet** = „mise” (f), **raise** = „relance” (f) [A][D]; konteksty „une petite {{t:bet}}”, „une {{t:raise}}” zgodne.
- **bluff** = „bluff” (m), **range** = „range” (f) [E][F; A używa „éventail”], **equity** = „équité” (f) [G; A „Equity”], **value** = „value” (f) [A], **blocker** = „bloqueur” [DO USTALENIA: przeczytane źródło A ma „blocker”, forma tłumacza ×22 niepotwierdzona].
- **straight** = „quinte” (f), **flush** = „couleur” (f), **full house** = „full” (m), **two pair** = „double paire” (f), **top pair** = „top paire” (f) [A][B].
- **draw** = „tirage”, **flush draw** = „tirage couleur” [A]; **in/out of position** = „en position” / „hors de position” [A: „hors position”, synonim „hors de position”; tłumacz 37:28 — ujednolicić].
- **street** = „street” (f) [A „le turn est la 4ème street”; D używa „rues”]; **variance**, **downswing**, **rake**, **nit**, **buy-in** — nazwy angielskie/identyczne [A][H]; **stakes** = „limite” (f) [A Micro-limites][H].

## Tabela

| klucz | en | forma w przekładzie (liczba) | inne formy | źródło (adres, cytat, data) | ocena |
|---|---|---|---|---|---|
| royal-flush | royal flush | Quinte flush royale×1 (bez formy: 1) | quinte flush royale×1 | [A] https://www.pokerstrategy.com/fr/glossary/Flush-royale; [B] Main_au_poker (2026-11-09) | **quinte flush royale** — potwierdzony |
| straight-flush | straight flush | Quinte flush×1 (bez formy: 1) | quinte flush×1 | [A] https://www.pokerstrategy.com/fr/glossary/Quinte-flush_124; [B] Main_au_poker (2026-11-09) | **quinte flush** — potwierdzony |
| four-of-a-kind | four of a kind | carré×6 (bez formy: 1) | Carré×1 | [A] https://www.pokerstrategy.com/fr/glossary/Carre_408; [B] Main_au_poker (2026-11-09) | **carré** — potwierdzony |
| full-house | full house | full×15 (bez formy: 1) | Full×1 | [A] https://www.pokerstrategy.com/fr/glossary/Full_241/ + [B]: [A] „Un full est une main de poker composée d'une paire et d'un brelan.”; [B] „Le full, également appelé main pleine” (2026-11-09) | **full** — potwierdzony |
| flush | flush | couleur×106 (bez formy: 4) | Couleur×5, couleurs×2 | [A] https://www.pokerstrategy.com/fr/glossary/Couleur_250/ + [B]: [A] „Une flush (ou couleur) est une main de poker composée de cinq cartes assorties”; [B] „La couleur (flush en anglais) est formée de cinq cartes de couleur identique” (2026-11-09) | **couleur** — potwierdzony |
| straight | straight | quinte×138 (bez formy: 4) | quintes×14, Quinte×4 | [A] https://www.pokerstrategy.com/fr/glossary/Quinte/ + [B]: [A] „Une quinte, ou straight, est une main de poker composée de 5 cartes directement consécutives.”; [B] „La suite, parfois appelée quinte en français” (2026-11-09) | **quinte** — potwierdzony |
| three-of-a-kind | three of a kind | brelan×20 (bez formy: 1) | Brelan×2, trois×2 | [A] https://www.pokerstrategy.com/fr/glossary/Brelan; [B] Main_au_poker (2026-11-09) | **brelan** — potwierdzony |
| set | set | set×1 (bez formy: 1) | — | [A] https://www.pokerstrategy.com/fr/glossary/Set (2026-11-09) | **set** — potwierdzony |
| two-pair | two pair | double paire×35 (bez formy: 2) | doubles paires×14, deux paires×10, Deux paires×2, Double paire×1 | [A] https://www.pokerstrategy.com/fr/glossary/Double-paire/ + [B]: [A] „Une double paire est une main, qui contient deux paires différentes.”; [B] „La double paire (ou two pair en anglais)” (2026-11-09) | **double paire** — potwierdzony |
| pair | pair | paire×206 (bez formy: 5) | paires×93, Paire×3 | [A] https://www.pokerstrategy.com/fr/glossary/Paire; [B] Main_au_poker (2026-11-09) | **paire** — potwierdzony |
| high-card | high card | Carte haute×1 (bez formy: 1) | carte haute×1 | [A] https://www.pokerstrategy.com/fr/glossary/Carte-haute_232; [B] Main_au_poker (hauteur, parfois carte haute) (2026-11-09) | **carte haute** — potwierdzony |
| kicker | kicker | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Kicker; [C] Texas_hold_em (carte de départage, kicker en anglais) (2026-11-09) | **kicker** — potwierdzony |
| wheel | wheel | quinte blanche×1 (bez formy: 0) | wheel×1 | [A] https://www.pokerstrategy.com/fr/glossary/Wheel (2026-11-09) | **wheel** — potwierdzony |
| check | check | checke×86 (bez formy: 16) | checkez×40, check×28, checker×24, checké×24, checkent×23 | [A] https://www.pokerstrategy.com/fr/glossary/Check/: „Un check (en français : parole), signifie que l'on attend les actions adverses” (2026-11-09) | **check** — potwierdzony [WIELE FORM] |
| bet | bet | mise×256 (bez formy: 17) | mises×77, misé×25, miser×20, misez×14, Mise×6 | [A] https://www.pokerstrategy.com/fr/glossary/Bet/: „Bet est le terme anglais pour une mise, et pour le verbe miser.” (2026-11-09) | **mise** — potwierdzony |
| call | call | suivre×186 (bez formy: 33) | suivi×125, suit×97, call×95, suivez×87, Suivre×50 | [A] https://www.pokerstrategy.com/fr/glossary/Call/ + [D]: [A] „Le call est une des actions possibles dont dispose un joueur … Synonymes : calls, coller, suivre, appeller, payer”; [D] „Suivre : égaler le montant de la grosse blinde.” (2026-11-09) | **call** — potwierdzony [WIELE FORM] |
| raise | raise | relance×117 (bez formy: 3) | relancez×54, relancer×45, relancé×38, Je relance×18, Relance×14 | [A] https://www.pokerstrategy.com/fr/glossary/Relance/ + [D]: [A] „La relance (raise) est l'une des actions possibles”; [D] „Relancer : augmenter la mise dans les limites spécifiques du jeu.” (2026-11-09) | **relance** — potwierdzony |
| fold | fold | se couche×94 (bez formy: 16) | couchez×80, couche×68, se coucher×66, coucher×46, Se coucher×44 | [A] https://www.pokerstrategy.com/fr/glossary/Se-coucher_248/ + [D]: [A] „Un joueur se couche (fold) lorsqu'il abandonne ses cartes”; [D] „Fold : se débarrasser de la main.” (2026-11-09) | **fold** — potwierdzony [WIELE FORM] |
| check-raise | check-raise | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Check-Raise (2026-11-09) | **check-raise** — potwierdzony |
| all-in | all-in | à tapis×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/All-in (se mettre all-in ou à tapis) (2026-11-09) | **all-in** — potwierdzony |
| pot | pot | pot×392 (bez formy: 450) | pots×27, Pot×25 | [A] https://www.pokerstrategy.com/fr/glossary/Pot/: Le pot est la 'cagnotte' à gagner, dans laquelle les joueurs mettent leurs mises. (2026-11-09) | **pot** — potwierdzony |
| side-pot | side pot | pot secondaire×2 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Pot-exterieur-pot-secondaire (2026-11-09) | **pot secondaire** — potwierdzony |
| split-pot | split pot | Partage du pot×11 (bez formy: 0) | le pot est partagé×5, vous vous partagez le pot×1 | [A] https://www.pokerstrategy.com/fr/glossary/Pot-partage (split pot ... partagé); [C] Texas_hold_em (le pot est alors séparé) (2026-11-09) | **partage du pot** — potwierdzony częściowo (źródło: „split pot”, „pot partagé”) |
| playing-the-board | playing the board | joue le board×1 (bez formy: 0) | jouez le board×1, jouer le board×1, jouent le board×1 | [C] Texas_hold_em (on dit qu'il « joue le tableau ») (2026-11-09) | **jouer le board** — potwierdzony częściowo (źródło: „joue le tableau”) |
| board | board | board×67 (bez formy: 24) | tableau×13 | [A] https://www.pokerstrategy.com/fr/glossary/Tableau/: „le tableau, ou board, désigne l'ensemble des cartes communes” (2026-11-09) | **board** — potwierdzony [WIELE FORM] |
| community-cards | community cards | cartes communes×11 (bez formy: 0) | carte commune×1 | [A] https://www.pokerstrategy.com/fr/glossary/Cartes-communes; [C] Texas_hold_em (2026-11-09) | **cartes communes** — potwierdzony |
| hole-cards | hole cards | cartes privatives×3 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Hole-cards (hole cards); [C] Texas_hold_em (cartes privées) (2026-11-09) | **cartes privatives** — potwierdzony częściowo (źródła: „hole cards”, „cartes privées”) |
| small-blind | small blind | petite blinde×77 (bez formy: 12) | petite blind×24, Petite blinde×13, SB×5, small blind×4 | [A] https://www.pokerstrategy.com/fr/glossary/Blind/ + [D]: [A] „… et de Small Blind (petite blinde)”; [A] Small-Blind: „Le small blind est la plus petite des mises obligatoires” (2026-11-09) | **petite blinde** — potwierdzony |
| big-blind | big blind | grosse blinde×152 (bez formy: 52) | grosse blind×48, Grosse blinde×12, big blind×7, BB×6, grosses blindes×4 | [A] https://www.pokerstrategy.com/fr/glossary/Blind/ + [D]: [A] „on parle alors de Big Blind (grosse blinde) et de Small Blind (petite blinde)”; [D] „Le premier joueur à agir est celui qui se trouve à gauche de la grosse blinde.” (2026-11-09) | **grosse blinde** — potwierdzony [WIELE FORM] |
| chips | chips | jetons×97 (bez formy: 2) | jeton×3 | [A] https://www.pokerstrategy.com/fr/glossary/Jetons-de-poker (2026-11-09) | **jetons** — potwierdzony |
| stack | stack | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Tapis (Par stack, ou tapis) (2026-11-09) | **stack** — potwierdzony |
| street | street | streets×38 (bez formy: 22) | street×17, tour d'enchères×2, Street×1 | [A] https://www.pokerstrategy.com/fr/glossary/Street/; [D]: [A] „le turn est la 4ème street”; [D] „Chacun de ces moments (ou " rues " dans le jargon du jeu)” (2026-11-09) | **street** — potwierdzony |
| betting-round | betting round | tour d’enchères×2 (bez formy: 0) | tours d’enchères×2, tour d'enchères×2, tours d'enchères×2 | [A] https://www.pokerstrategy.com/fr/glossary/Relance (tour d'enchères); [D] PokerNews (2026-11-09) | **tour d'enchères** — potwierdzony |
| preflop | preflop | Preflop×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Preflop (le préflop) (2026-11-09) | **preflop** — potwierdzony |
| flop | flop | Flop×1 (bez formy: 0) | — | [C] Texas_hold_em; [D] PokerNews (2026-11-09) | **flop** — potwierdzony |
| turn | turn | Turn×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Street (le turn); [D] PokerNews (Turn) (2026-11-09) | **turn** — potwierdzony |
| river | river | River×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/River (2026-11-09) | **river** — potwierdzony |
| showdown | showdown | Abattage×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Abattage_138 (Le Showdown, ou abattage) (2026-11-09) | **showdown** — potwierdzony |
| position | position | position×47 (bez formy: 32) | positions×15, Position×1 | [A] https://www.pokerstrategy.com/fr/glossary/In-Position; [C] Position_(poker) (2026-11-09) | **position** — potwierdzony |
| in-position | in position | en position×40 (bez formy: 10) | En position×8 | [A] https://www.pokerstrategy.com/fr/glossary/In-Position/ + Hors-position_186/: „On dit qu'un joueur est in Position par rapport à un autre joueur”; „Thèmes associés : En position, In position” (2026-11-09) | **en position** — potwierdzony |
| out-of-position | out of position | hors de position×26 (bez formy: 17) | hors position×17, Hors de position×11, Hors position×11 | [A] https://www.pokerstrategy.com/fr/glossary/Hors-position_186/: „Un joueur est hors position vis à vis d'un autre joueur lorsqu'il doit parler avant lui sur un tour d'enchères.” „Synonyme : Out of position, oop, hors de position” (2026-11-09) | **hors de position** — potwierdzony [WIELE FORM] |
| early-position | early position | premières positions×1 (bez formy: 0) | positions précoces×1 | [A] https://www.pokerstrategy.com/fr/glossary/Debut-de-parole (2026-11-09) | **début de parole** — potwierdzony (różni się od formy tłumacza) [WIELE FORM] |
| late-position | late position | position tardive×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Fin-de-parole (2026-11-09) | **fin de parole** — potwierdzony (różni się od formy tłumacza) [WIELE FORM] |
| hijack | hijack | HJ×17 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Hijack_2049 (2026-11-09) | **hijack** — potwierdzony |
| cutoff | cutoff | CO×54 (bez formy: 0) | cutoff×1 | [A] https://www.pokerstrategy.com/fr/glossary/Fin-de-parole (le cutoff et le button) (2026-11-09) | **cutoff** — potwierdzony |
| button | button | BTN×3 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Bouton_315 (2026-11-09) | **bouton** — potwierdzony |
| outs | out | Outs×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Outs (2026-11-09) | **out** — potwierdzony |
| draw | draw | tirage×101 (bez formy: 0) | tirages×97, Tirage×2, Tirages×1 | [A] https://www.pokerstrategy.com/fr/glossary/Tirage_267/: „Un tirage est une main incomplète, à laquelle il manque une ou plusieurs cartes pour former une main faite.” (2026-11-09) | **tirage** — potwierdzony |
| flush-draw | flush draw | tirage couleur×49 (bez formy: 1) | tirages couleur×9, Tirage couleur×2 | [A] https://www.pokerstrategy.com/fr/glossary/Tirage-couleur_249/: „On parle de tirage couleur lorsqu'un joueur a quatre cartes de même couleur” (2026-11-09) | **tirage couleur** — potwierdzony |
| straight-draw | straight draw | tirage quinte×19 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Tirage-quinte-bilateral (Un tirage quinte est ...) (2026-11-09) | **tirage quinte** — potwierdzony |
| gutshot | gutshot | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Gutshot; [A] https://www.pokerstrategy.com/fr/glossary/Blocker (Les deux joueurs ont un gutshot) (2026-11-09) | **gutshot** — potwierdzony |
| backdoor | backdoor | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Tirage-backdoor (2026-11-09) | **backdoor** — potwierdzony |
| pot-odds | pot odds | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Cote-du-pot (2026-11-09) | **cote du pot** — potwierdzony |
| implied-odds | implied odds | cotes implicites×1 (bez formy: 0) | Cote implicite×1 | [A] https://www.pokerstrategy.com/fr/glossary/Cote-implicite; [C] Texas_hold_em (cotes implicites) (2026-11-09) | **cote implicite** — potwierdzony [WIELE FORM] |
| equity | equity | équité×14 (bez formy: 4) | Équité×1 | [G] + [A] https://www.pokerstrategy.com/fr/glossary/Equity/: [G] „le premier calculateur d'équité en cours de partie”; [A] „L'Equity … exprime la part du pot qu'un joueur peut espérer gagner” (2026-11-09) | **équité** — potwierdzony |
| equity-realization | equity realization | réalise son équité×2 (bez formy: 0) | réalise mal l'equity×1, réalise moins bien son equity×1, réaliser son équité×1, réalise bien son équité×1, réalisent mal leur équité×1 | — | **réalisation de l'équité** — [DO USTALENIA] |
| expected-value | expected value | espérance de gain×8 (bez formy: 1) | EV×2, valeur espérée×1 | [A] https://www.pokerstrategy.com/fr/glossary/Esperance-de-gain (2026-11-09) | **espérance de gain** — potwierdzony [WIELE FORM] |
| combo | combo | combinaisons×26 (bez formy: 0) | combos×4 | — | **combo** — [DO USTALENIA] [WIELE FORM] |
| range | range | range×131 (bez formy: 92) | ranges×17, Range×4, Ranges×1 | [E] + [F]; [A] https://www.pokerstrategy.com/fr/glossary/Merging_2024/: [E] „une analyse précise de la range de son adversaire”; [F] „le pourcentage minimum de votre range que vous devez suivre”; [A] używa „éventail”: „ajuster son éventail de manière à ce qu’il n’ait pas l’air polarisé” (2026-11-09) | **range** — potwierdzony |
| mixed-hand | mixing hand | main mixte×7 (bez formy: 0) | mains mixtes×4, Main mixte×1 | — | **main mixte** — [DO USTALENIA] |
| open | open | ouverture×96 (bez formy: 2) | ouvert×92, ouvre×26, ouvrez×25, ouvertures×8, a ouvert×7 | [A] https://www.pokerstrategy.com/fr/glossary/Open-Raise (2026-11-09) | **ouverture** — [DO USTALENIA] [WIELE FORM] |
| suited | suited | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Assorties_117 (2026-11-09) | **assorti** — potwierdzony |
| offsuit | offsuit | — (bez formy: 0) | — | — | **dépareillé** — [DO USTALENIA] |
| pocket-pair | pocket pair | paire servie×2 (bez formy: 0) | paires servies×1 | [A] https://www.pokerstrategy.com/fr/glossary/Pocket-pair (pocket paire) (2026-11-09) | **paire servie** — [DO USTALENIA] (źródło: „pocket paire”) |
| connectors | connectors | connecteurs×23 (bez formy: 0) | connecteur×1 | [A] https://www.pokerstrategy.com/fr/glossary/Connecteur (2026-11-09) | **connecteurs** — potwierdzony |
| 3-bet | 3-bet | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/3bet (2026-11-09) | **3-bet** — potwierdzony |
| 4-bet | 4-bet | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/4bet (2026-11-09) | **4-bet** — potwierdzony |
| limp | limp | limp×1 (bez formy: 1) | — | [A] https://www.pokerstrategy.com/fr/glossary/Limp (2026-11-09) | **limp** — potwierdzony |
| isolation | isolation raise | isolation×4 (bez formy: 0) | isoler×1, isole×1, isolez×1 | [A] https://www.pokerstrategy.com/fr/glossary/Isoler (L'isolation est ...) (2026-11-09) | **isolation** — potwierdzony |
| texture | texture | texture×5 (bez formy: 2) | Texture×1 | [A] https://www.pokerstrategy.com/fr/glossary/Texture_1952 (2026-11-09) | **texture** — potwierdzony |
| dry | dry | sec×44 (bez formy: 0) | secs×5, Sec×4 | [A] https://www.pokerstrategy.com/fr/glossary/Sec-tableau (Un tableau sec (ou dry board)) (2026-11-09) | **sec** — potwierdzony |
| wet | wet | humide×17 (bez formy: 7) | humides×4, Humide×2 | [A] https://www.pokerstrategy.com/fr/glossary/Sec-tableau („tableau wet”), Drawy_1951 (2026-11-09) | **humide** — [DO USTALENIA] (źródło: „wet”, „draw heavy”) |
| rainbow | rainbow | rainbow×3 (bez formy: 0) | Rainbow×1 | [A] https://www.pokerstrategy.com/fr/glossary/Sec-tableau (il est rainbow) (2026-11-09) | **rainbow** — potwierdzony |
| two-tone | two-tone | bicolore×6 (bez formy: 0) | Bicolore×1 | [A] https://www.pokerstrategy.com/fr/glossary/Twosuited („twosuited”) (2026-11-09) | **bicolore** — [DO USTALENIA] (źródło: „twosuited”) |
| monotone | monotone | monocolore×7 (bez formy: 4) | monochrome×6, monotones×1, Monocolore×1 | — | **monocolore** — [DO USTALENIA] [WIELE FORM] |
| paired | paired | pairé×15 (bez formy: 0) | Pairé×2 | [A] https://www.pokerstrategy.com/fr/glossary/Paired („paired”) (2026-11-09) | **pairé** — [DO USTALENIA] (źródło: „paired”) |
| connected | connected | connecté×15 (bez formy: 1) | connectés×2, Connecté×1 | [A] https://www.pokerstrategy.com/fr/glossary/Connectivity (connexion) (2026-11-09) | **connecté** — [DO USTALENIA] (źródło: „degré de connexion”) |
| disconnected | disconnected | déconnecté×3 (bez formy: 0) | Déconnecté×1 | — | **déconnecté** — [DO USTALENIA] |
| semi-connected | semi-connected | semi-connecté×5 (bez formy: 0) | semi-connectés×1, Semi-connecté×1 | — | **semi-connecté** — [DO USTALENIA] |
| wetness | wetness | humidité×5 (bez formy: 0) | — | — | **humidité** — [DO USTALENIA] |
| top-pair | top pair | top paire×74 (bez formy: 3) | Top paire×3, top paires×3, paires les plus hautes×1, Top paires×1 | [A] https://www.pokerstrategy.com/fr/glossary/Top-paire/: „on entend par top paire une paire composée d'une carte de la main de départ” (2026-11-09) | **top paire** — potwierdzony [WIELE FORM] |
| second-pair | second pair | deuxième paire×9 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Middle-pair („middle paire”) (2026-11-09) | **deuxième paire** — [DO USTALENIA] (źródło: „middle paire”) |
| overpair | overpair | overpaire×9 (bez formy: 0) | overpairs×1 | [A] https://www.pokerstrategy.com/fr/glossary/Overpair („overpair”) (2026-11-09) | **overpaire** — potwierdzony częściowo (źródło: „overpair”) |
| c-bet | c-bet | c-bet×2 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Continuation-bet („continuation bet”) (2026-11-09) | **c-bet** — potwierdzony częściowo |
| aggressor | aggressor | agresseur×10 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Agresseur (2026-11-09) | **agresseur** — potwierdzony |
| initiative | initiative | initiative×13 (bez formy: 4) | — | [A] https://www.pokerstrategy.com/fr/glossary/Initiative (2026-11-09) | **initiative** — potwierdzony |
| range-advantage | range advantage | avantage de range×29 (bez formy: 1) | Avantage de range×2 | — | **avantage de range** — [DO USTALENIA] |
| nuts-advantage | nuts advantage | avantage de nuts×19 (bez formy: 2) | Avantage de nuts×2 | — | **avantage de nuts** — [DO USTALENIA] |
| nuts | nuts | nuts×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Nuts (la nuts); [C] Texas_hold_em (the nuts) (2026-11-09) | **nuts** — potwierdzony |
| polarized | polarized | polarisée×21 (bez formy: 0) | Polarisée×2 | [A] https://www.pokerstrategy.com/fr/glossary/Polarising_2023 (Un éventail est dit polarisé) (2026-11-09) | **polarisé** — potwierdzony |
| polarization | polarization | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Polarising_2023 (la polarisation d’un éventail) (2026-11-09) | **polarisation** — potwierdzony |
| linear | linear | linéaire×8 (bez formy: 0) | Linéaire×2 | — | **linéaire** — [DO USTALENIA] |
| condensed | condensed | condensée×2 (bez formy: 0) | — | — | **condensé** — [DO USTALENIA] |
| value | value | pour la valeur×32 (bez formy: 0) | streets de valeur×21, de value×16, pour la value×15, valeur×7, streets de value×4 | [A] https://www.pokerstrategy.com/fr/glossary/Value/: „La "value" (mot anglais pour valeur) est un terme utilisé dans le jargon du poker” (2026-11-09) | **value** — potwierdzony [WIELE FORM] |
| value-bet | value bet | value bets×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Value-Bet (2026-11-09) | **value bet** — potwierdzony |
| bluff | bluff | bluffs×238 (bez formy: 81) | bluff×70, bluffe×47, bluffez×25, bluffer×10, bluffant×7 | [A] https://www.pokerstrategy.com/fr/glossary/Bluff/: „Un bluff est un enchaînement grâce auquel on essaie de tromper son adversaire” (2026-11-09) | **bluff** — potwierdzony |
| semi-bluff | semi-bluff | semi-bluffs×13 (bez formy: 6) | semi-bluff×5 | [A] https://www.pokerstrategy.com/fr/glossary/Semi-bluff (2026-11-09) | **semi-bluff** — potwierdzony |
| blocker | blocker | bloqueurs×13 (bez formy: 0) | bloqueur×8, Bloqueur×1 | [A] https://www.pokerstrategy.com/fr/glossary/Blocker/: „Un blocker est une carte qui permettrait à un joueur de compléter son tirage” (nie „bloqueur”) (2026-11-09) | **bloqueur** — [DO USTALENIA] (forma tłumacza „bloqueur” niepotwierdzona; źródło A: „blocker”) |
| bluff-catcher | bluff catcher | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Bluff-Catcher_325 („bluff catcher”) (2026-11-09) | **bluff-catcher** — potwierdzony |
| barrel | barrel | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Second-barrel (barrel : canon) (2026-11-09) | **barrel** — potwierdzony |
| second-barrel | second barrel | second barrel×22 (bez formy: 4) | — | [A] https://www.pokerstrategy.com/fr/glossary/Second-barrel (2026-11-09) | **second barrel** — potwierdzony |
| probe-bet | probe bet | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Probe-Bet (2026-11-09) | **probe bet** — potwierdzony |
| donk-bet | donk bet | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Donkbet („donkbet”) (2026-11-09) | **donk bet** — potwierdzony |
| overbet | overbet | overbet×2 (bez formy: 1) | — | [A] https://www.pokerstrategy.com/fr/glossary/Overbet (2026-11-09) | **overbet** — potwierdzony |
| effective-stack | effective stack | stack effectif×5 (bez formy: 0) | tapis effectif×1 | — | **stack effectif** — [DO USTALENIA] |
| alpha | alpha | alpha×2 (bez formy: 4) | — | — | **alpha** — [DO USTALENIA] |
| variance | variance | variance×15 (bez formy: 11) | — | [A] https://www.pokerstrategy.com/fr/glossary/Variance/ + [H]: [H] „Réduisez la variance en restant à une limite que vous maitrisez” (2026-11-09) | **variance** — potwierdzony |
| buy-in | buy-in | buy-ins×80 (bez formy: 2) | buy-in×1 | [A] https://www.pokerstrategy.com/fr/glossary/Buy-In/: „Par buy-in on désigne le montant avec lequel un joueur entre dans une partie de poker.” (2026-11-09) | **buy-in** — potwierdzony |
| bankroll | bankroll | bankroll×1 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Bankroll (2026-11-09) | **bankroll** — potwierdzony |
| tilt | tilt | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Tilt (2026-11-09) | **tilt** — potwierdzony |
| winrate | win rate | — (bez formy: 1) | — | [A] https://www.pokerstrategy.com/fr/glossary/Hourly-Winrate (Le winrate dépend ...) (2026-11-09) | **winrate** — potwierdzony |
| downswing | downswing | downswing×8 (bez formy: 14) | downswings×5, Downswing×1 | [A] https://www.pokerstrategy.com/fr/glossary/Downswing/: „Par downswing, on entend une phase ou une période durant laquelle un joueur doit essuyer des pertes malgré un jeu correct” (2026-11-09) | **downswing** — potwierdzony |
| session | session | session×33 (bez formy: 11) | sessions×12 | — | **session** — [DO USTALENIA] |
| stakes | stakes | limite×49 (bez formy: 0) | limites×12, Limite×1, micro-limites×1 | [A] https://www.pokerstrategy.com/fr/glossary/Micro-limites/ + Stakes/; [H]: [A] „… sont els plus petites limites, auxquelles on joue pour des cents”; [H] „en restant à une limite que vous maitrisez” (2026-11-09) | **limite** — potwierdzony |
| standard-deviation | standard deviation | écart-type×24 (bez formy: 0) | écart type×18, écarts-types×2 | — | **écart-type** — [DO USTALENIA] [WIELE FORM] |
| risk-of-ruin | risk of ruin | risque de ruine×3 (bez formy: 0) | Risque de ruine×1 | [A] https://www.pokerstrategy.com/fr/glossary/Risque-de-ruine (2026-11-09) | **risque de ruine** — potwierdzony |
| mental-game | mental game | jeu mental×1 (bez formy: 0) | — | — | **mental game** — [DO USTALENIA] |
| tournament | tournament | tournoi×15 (bez formy: 0) | Tournoi×2, tournois×1 | [A] https://www.pokerstrategy.com/fr/glossary/Tournoi (2026-11-09) | **tournoi** — potwierdzony |
| push-fold | push/fold | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Push (un joueur push) (2026-11-09) | **push/fold** — potwierdzony częściowo |
| shove | shove | fait tapis×6 (bez formy: 0) | faites tapis×3, faire tapis×3, pushez×3, push×2, pushe×2 | [A] https://www.pokerstrategy.com/fr/glossary/Shove (effectue un push ou shove); [A] https://www.pokerstrategy.com/fr/glossary/Push (2026-11-09) | **push** — potwierdzony [WIELE FORM] |
| bubble | bubble | Bulle×6 (bez formy: 0) | bulle×5 | [A] https://www.pokerstrategy.com/fr/glossary/Bulle (2026-11-09) | **bulle** — potwierdzony |
| bubble-factor | bubble factor | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Bubble-factor_2045 (2026-11-09) | **bubble factor** — potwierdzony |
| cover | cover | couvre×3 (bez formy: 0) | couvrez×2 | [A] https://www.pokerstrategy.com/fr/glossary/Couvrir (2026-11-09) | **couvrir** — potwierdzony |
| risk-premium | risk premium | prime de risque×7 (bez formy: 0) | Prime de risque×1 | — | **prime de risque** — [DO USTALENIA] |
| m-ratio | M-ratio | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/M (Le M de Magriel) (2026-11-09) | **M** — potwierdzony |
| red-zone | red zone | Zone rouge×1 (bez formy: 1) | — | — | **zone rouge** — [DO USTALENIA] |
| green-zone | green zone | Zone verte×1 (bez formy: 0) | zone verte×1 | — | **zone verte** — [DO USTALENIA] |
| ante | ante | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Ante (Un Ante est ...) (2026-11-09) | **ante** — potwierdzony |
| bb-ante | big blind ante | big blind ante×2 (bez formy: 3) | ante de grosse blinde×1 | — | **big blind ante** — [DO USTALENIA] |
| fold-equity | fold equity | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Fold-equity (2026-11-09) | **fold equity** — potwierdzony |
| gap-concept | gap concept | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Gap-concept (2026-11-09) | **gap concept** — potwierdzony |
| chip-ev | chip EV | — (bez formy: 0) | — | — | **chip EV** — [DO USTALENIA] |
| tournament-equity | tournament equity | équité de tournoi×1 (bez formy: 0) | — | — | **équité de tournoi** — [DO USTALENIA] |
| prize-pool | prize pool | prize pool×18 (bez formy: 0) | — | — | **prize pool** — [DO USTALENIA] |
| payout | payout | paiements×5 (bez formy: 0) | gains×3, paiement×3, Paiements×1 | [A] https://www.pokerstrategy.com/fr/glossary/Payout („payout”) (2026-11-09) | **paiement** — [DO USTALENIA] (źródło: „payout”) [WIELE FORM] |
| pay-jump | pay jump | — (bez formy: 0) | — | — | **pay jump** — [DO USTALENIA] |
| final-table | final table | table finale×4 (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Table-finale (2026-11-09) | **table finale** — potwierdzony |
| short-stack | short stack | short stack×11 (bez formy: 1) | short stacks×1 | [A] https://www.pokerstrategy.com/fr/glossary/Petit-tapis (petit tapis (shortstack)) (2026-11-09) | **short stack** — potwierdzony częściowo |
| nash-equilibrium | Nash equilibrium | — (bez formy: 0) | — | — | **équilibre de Nash** — [DO USTALENIA] |
| overcall | overcall | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Overcall (2026-11-09) | **overcall** — potwierdzony |
| heads-up | heads up | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Heads-up (2026-11-09) | **heads-up** — potwierdzony |
| dead-money | dead money | — (bez formy: 0) | — | [A] https://www.pokerstrategy.com/fr/glossary/Dead-Money (2026-11-09) | **dead money** — potwierdzony |
| stack-off | stack off | — (bez formy: 0) | — | — | **stack off** — [DO USTALENIA] |
| exploit | exploit | exploitation×8 (bez formy: 0) | Exploitation×1 | [A] https://www.pokerstrategy.com/fr/glossary/Exploiter_2026 („Exploiter”) (2026-11-09) | **exploitation** — potwierdzony częściowo |
| nit | nit | nit×6 (bez formy: 12) | nits×1, Nit×1 | [A] https://www.pokerstrategy.com/fr/glossary/Nit/: „Un nit est un joueur tight-passif, rock ou weak-tight” (2026-11-09) | **nit** — potwierdzony |
| regular | regular | regs×4 (bez formy: 0) | régulier×2, Reg×2, Regs×2, réguliers×1, reg×1 | — | **reg** — [DO USTALENIA] [WIELE FORM] |
| recreational | recreational player | joueur récréatif×10 (bez formy: 0) | joueurs récréatifs×8, Joueurs récréatifs×2, Joueur récréatif×1 | — | **joueur récréatif** — [DO USTALENIA] |
| calling-station | calling station | calling station×1 (bez formy: 1) | — | [A] https://www.pokerstrategy.com/fr/glossary/Calling-Station (2026-11-09) | **calling station** — potwierdzony |
| maniac | maniac | maniaque×17 (bez formy: 0) | Maniaque×1 | [A] https://www.pokerstrategy.com/fr/glossary/Maniaque (2026-11-09) | **maniaque** — potwierdzony |
| rake | rake | rake×18 (bez formy: 38) | — | [A] https://www.pokerstrategy.com/fr/glossary/Rake/: „Le rake, ou le chop, est la partie du pot ou du buy-in que l'organisateur …” (2026-11-09) | **rake** — potwierdzony |
| rake-cap | rake cap | plafond de rake×5 (bez formy: 0) | plafond×2 | — | **plafond de rake** — [DO USTALENIA] |

## Konflikty rodzaju i liczby (znaczniki bez formy wobec proponowanej nazwy)

Sprawdzone automatycznie wszystkie 1044 znaczniki bez formy (słowo przed znacznikiem: le/un/du/au/ce/gros/petit… vs la/une/cette/petite/grosse…, oraz les/des/ses… dla liczby mnogiej) i ręcznie konteksty przymiotników.

1. `content/fr/exams/m5.yaml` — „La taille plus grosse concerne les flops {{t:wet}} qui ne sont pas …”: liczba mnoga przy nazwie „humide” → `{{t:wet|humides}}` (w F2.json, ŚREDNIE).
2. `ui/fr.json` drill.category.* (10 kluczy) i drill.paint.explanation `{{t:pair}}` — nie konflikt rodzaju z nazwą K-05, ale dziś (D-287) angielska nazwa w zdaniu francuskim; formy dodane w F2.json.
3. Brak innych konfliktów przy proponowanych nazwach. Zależności, które nazwa musi spełnić (inaczej powstanie konflikt): „l'{{t:open}} est plus petite” wymaga nazwy żeńskiej od samogłoski („ouverture”; „open” dałoby „l'open … petite”); „l'{{t:range-advantage}}”, „l'{{t:alpha}}”, „l'{{t:expected-value}}”, „l'{{t:initiative}}” wymagają nazwy od samogłoski (spełnione); „la {{t:big-blind}}”/„la {{t:small-blind}}” — nazwy żeńskie; „une {{t:calling-station}}” — żeńska (A: „parfois appellée CG”); „ses {{t:chips}}”, „des {{t:chips}}” — nazwa w lm „jetons”; „le/un {{t:call}}”, „un {{t:fold}}”, „un {{t:check}}” — rzeczowniki męskie (nie czasowniki).
4. Niespójność form tłumacza do ujednolicenia przy K-05 (nie błąd rodzaju): „grosse blind”×48 → „grosse blinde”, „petite blind”×24 → „petite blinde”, „hors position”×28 → „hors de position”, „monochrome”×6 → „monocolore”, „deux paires”×12 → „double paire”, „valeur”/„value” (value), „combinaisons”/„combos” (combo; „combinaison” koliduje z „combinaison” = układ, por. [B]), early/late position: źródło [A] „début de parole / fin de parole”, w UI „positions précoces”, w treści „position tardive” (po 1×).
