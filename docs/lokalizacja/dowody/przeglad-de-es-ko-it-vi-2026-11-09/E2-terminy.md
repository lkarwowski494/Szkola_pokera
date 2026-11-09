# E2-terminy: terminologia es (es-ES) i nazwy K-05 (przegląd E2, 2026-11-09)

Zakres: (1) ok. 40 kluczowych terminów sprawdzonych na przeczytanych źródłach hiszpańskich; (2) nazwa K-05 dla każdego ze 162 wierszy `k05-kand-es.tsv` (plik `docs/lokalizacja/przygotowane/terms-nazwy-es.yaml`); (3) konflikty rodzaju i liczby przy 705 znacznikach `{{t:klucz}}` bez formy w `tl/content/es` i `tl/…/es.json` (skrypty `pr/E2/ctx.py`, `pr/E2/gen.py`); (4) różnice es-ES / Ameryka Łacińska (pod przyszłą nakładkę es-419).

Wszystkie cytaty niżej sprawdzone dosłownie na surowym tekście (curl → HTML → tekst → `grep -F`; lista 77 cytatów: `pr/E2/cytaty.tsv`, 77/77 trafień), data odczytu 2026-11-09. Kopie stron: `pr/E2/web/` (scratchpad sesji).

## Źródła

- [A] https://es.wikipedia.org/wiki/Texas_hold_%27em (es.wikipedia, „Texas hold 'em”, tabela układów, reguły)
- [B] https://es.wikipedia.org/wiki/P%C3%B3quer (es.wikipedia, „Póquer”, sekcja „Farol”)
- [C] glosariusz PokerStrategy po hiszpańsku: https://es.pokerstrategy.com/glossary/ (301 → https://www.pokerstrategy.com/es/glossary/), hasła `https://www.pokerstrategy.com/es/glossary/<hasło>/`: Pasar, Ver, Apostar, Subir_163, Abandonar_248, Pot, Farol, Semifarol, Rango, Color, Escalera, Escalera-de-color, Full, Pareja, Pareja-Doble, Pareja-mayor, Overpair, Four-of-a-kind, Three-of-a-kind, Carta-alta, Kicker, Ciega-grande, Ciega-pequena, Fuera-de-posicion, Posicion, Street, Equity, Varianza, Downswing, Nit, Tight_102, Loose, TAG, LAG, Maniaco, Calling-station, Blocker, Value, Value-Bet, Mesa, Seca_2031, Drawy_1951, Textura_1952, Emparejadas, Conectividad, Outs, Proyecto-de-color, Proyecto-de-escalera-de-doble-punta, Proyecto-interno-de-escalera, Backdoor-Draw, Odds-implicitas, Probabilidades-en-relacion-al-bote, Burbuja, Factor-burbuja_2045, Estructura-de-premios, Payout, Push, Shove, Shortstack, Cubierto, Dinero-muerto, Rake, Buy-in, Pocket-Pair-Pareja-de-mano, Split-Pot-Bote-dividido, Side-Pot, 3-Bet, Iniciativa, Agresor, Aislar, Limp, Overcall, Nuts, Polarizar_2023, Explotar_2026, Second-Barrel, Bluff-Catcher, Cutoff, Hijack_2049, Under-the-Gun, Primeras-posiciones, Late-Position, Mesa-final, Valor-esperado, Risk-of-Ruin-Riesgo-de-Ruina, Wheel, Tilt_101 (i inne w pliku YAML)
- [D] https://es.pokernews.com/reglas-de-poker/texas-holdem.htm (PokerNews España, reguły Texas Hold'em, ranking układów)
- [E] PokerNews España, artykuły: https://es.pokernews.com/estrategia-del-poquer/call-o-fold-con-top-pair-contra-un-check-raise-en-el-turn-29125.htm, …/como-detectar-al-principiante-en-una-mesa-de-poker-18648.htm, …/el-limp-24256.htm, …/el-tamano-de-las-apuestas-postflop-20734.htm, …/las-matematicas-en-el-poker-volumen-i-24373.htm, …/las-matematicas-en-el-poker-volumen-ii-24564.htm, …/poner-rangos-una-de-las-claves-del-poker-12314.htm, …/talking-poker-defensa-de-ciegas-15952.htm, lista https://es.pokernews.com/estrategia-del-poquer/beginner/
- [F] https://es.pokernews.com/clasificacion-manos-de-poker.htm (PokerNews España, ranking układów)

Nie dało się otworzyć / nie nadają się: es.wikipedia „Anexo:Jugadas del póquer” (404); es.pokernews.com/glosario-poker/ (tylko 2 hasła: Hold'em, Texas Hold'em — bez terminów strategii); es.pokernews.com/reglas-poker/texas-holdem.htm i /manos-poker.htm (404; właściwe adresy to [D], [F]); hasło [C] „Linea” (zerwane połączenie). Hasło [C] „4-bet_350” bez treści (tylko szablon).

## Tabela: terminy kluczowe

| klucz | en | forma w przekładzie (liczba) | inne formy | źródło (adres, cytat, data 2026-11-09) | ocena |
|---|---|---|---|---|---|
| pot | pot | bote (886) | — | [D] „el jugador que queda gana el bote sin tener que mostrar ninguna carta”; [B] „lo que hace que el farol gane el pozo” | potwierdzone: **bote** (m). **es-419:** [B] używa „pozo” — różnica regionalna |
| big-blind / small-blind | big/small blind | ciega grande (240) / ciega pequeña (117) | BB×6, SB×5 | [D] „El jugador directamente a la izquierda del botón pone la ciega pequeña, y el jugador a su izquierda directa pone la ciega grande.”; [C] Ciega-grande „La mayor de las dos apuestas obligatorias en un juego con ciegas.” | potwierdzone (ż). 50 miejsc bez formy ma „la {{t:big-blind}}” — nazwa „big blind” (m) dałaby dziś „la big blind” |
| check | check | pasar/paso/pasa… (~285) | — | [D] „Pasar simplemente significa pasar la acción al siguiente jugador en la mano.”; [C] Pasar „Pasar significa ceder el turno al siguiente jugador sin realizar una apuesta.” | potwierdzone: **pasar** |
| call | call | igualar/iguala… (~385), pagar/paga/pago… (~440, część to rzeczownik „pago”) | call×17 | [D] „Igualar (Call) : igualar el monto de la ciega grande”; [E] defensa-de-ciegas „suele ser preferible que simplemente pagar”; [C] Odds-implicitas „tiene sentido hacer call”; [C] Ver „Quiere decir que él se juega exactamente la cantidad de la apuesta enfrentada.” | potwierdzone trzy formy (igualar, pagar, ver) + rzeczownik „call”. Nazwa K-05 **call** (m): 13 miejsc bez formy to rzeczownik („un {{t:call}} jugado”, „Defiendo ({{t:call}} o 3-bet)”). Tłumacz miesza igualar/pagar (UI konsekwentnie „igualar”) [WIELE FORM]; w es-419 „pagar” jest częstsze (do sprawdzenia) |
| fold | fold | retirarse/se retira/me retiro… (~650) | tiras×5, fold×3 | [D] „Retirarse (Fold) : abandonar la mano”; [C] Abandonar „Un jugador que se tira, se retira o foldea, deja caer sus cartas retirándose de la mano.” | potwierdzone: **retirarse**; nazwa K-05 **fold** — 7 miejsc bez formy to rzeczownik obok „call/3-bet” („¿All-in o {{t:fold}}?”, „{{t:fold}} aprox. N”) [WIELE FORM] |
| bet | bet | apuesta/apuestas (~360) | apostar… | [C] Apostar „Apostar es hacer una apuesta.” | potwierdzone: **apuesta** (ż); 6 miejsc bez formy „una {{t:bet}}” — zgodne |
| raise | raise | subida/subir/sube (~330) | resubida×5 | [D] „Subir (Raise) : aumentar la apuesta dentro de los límites específicos de la partida”; [C] Subir „Subir significa apostar por encima de la cantidad apostada por tu rival.” | potwierdzone: **subida** (ż) |
| bluff / semi-bluff | bluff | farol/faroles (~470) / semifarol (24) | farolear… | [B] „Un aspecto especial del póquer es el farol o engaño.”; [C] Semifarol „es un farol con una mano que actualmente es débil pero tiene potencial para convertirse en una mano fuerte” | potwierdzone: **farol**, **semifarol** (m). **es-419:** „farol” to typowo es-ES; w Ameryce Łacińskiej często „bluff/blof” (bez przeczytanego źródła — do sprawdzenia przed es-419) |
| range | range | rango (240) | — | [C] Rango „El rango de un jugador son todas las manos posibles con las que jugaría en una situación dada.” | potwierdzone: **rango** (m) |
| straight | straight | escalera (142) | — | [D] „Escalera : cinco cartas consecutivas”; [A] „Cinco cartas consecutivas de palos diferentes. Gana la escalera más alta.” | potwierdzone: **escalera** (ż); 18 miejsc bez formy z „una/la” — zgodne |
| flush | flush | color (111) | — | [C] Color „Color es una mano de póquer formada por cinco cartas del mismo palo.” | potwierdzone: **color** (m); „el {{t:flush}}” — zgodne |
| four-of-a-kind | four of a kind | póker (7) | — | [A] „En caso de que varios jugadores tengan póquer, gana el que tenga el póquer con las cartas más altas.”; [D] „Póker : cuatro cartas del mismo valor” | potwierdzone (pisownia póker/póquer — obie poprawne; aplikacja: „póker”, słowniczek „póquer” → poprawki NISKIE) |
| full-house / two-pair / pair | — | full (16) / doble pareja (60) / pareja (302) | dobles parejas | [C] Full „Un full o full house es una mano de póquer consistente en un trío y una pareja”; [D] „Dobles Parejas : dos cartas del mismo valor y otras dos cartas del mismo valor”; [D] „Escalera Real, Escalera de Color, Póker, Full House, Color, Escalera, Trío, Doble Pareja, Pareja y Carta A”; [C] Pareja „Una pareja es una mano con dos cartas del mismo valor.” | potwierdzone. **es-419:** „par” zamiast „pareja” (bez źródła — do sprawdzenia) |
| top-pair | top pair | pareja máxima (84) | — | [C] Pareja-mayor „se denomina top pair ( pareja mayor )”; [E] call-o-fold „cuando tenemos top pair” | „pareja máxima” nie znaleziona w źródłach (źródła: top pair, pareja mayor). Nazwa K-05 **top pair** (0 miejsc bez formy); 84 formy tłumacza [DO USTALENIA] dla 06/09 |
| draw / flush-draw / straight-draw | draw | proyecto (198) / proyecto de color (56) / proyecto de escalera (14) | — | [C] Outs „Se define como proyecto ( draw ) a aquellas manos sin completar”; [C] Proyecto-de-color „Un proyecto de color es un proyecto consistente en 4 cartas del mismo palo”; [C] Proyecto-interno-de-escalera „Un proyecto de escalera interno, gutshot o barrigona es un proyecto de escalera al que le falta una carta de en medio.” | potwierdzone: **proyecto…** (m); „un/ningún {{t:draw}}” — zgodne |
| board | board | mesa (90) | board×8 | [C] Mesa „la mesa ( board ) son todas las cartas comunitarias”; [E] como-detectar „El board traía un as y ningún cinco” | oba potwierdzone; nazwa K-05 **mesa** (ż): 4 miejsca bez formy „en la/de la {{t:board}}” — „board” (m) dałby „en la board” [WIELE FORM] |
| out-of-position / in-position | — | fuera de posición (54) / en posición (48) | sin posición×8 | [C] Fuera-de-posicion „Un jugador se encuentra fuera de posición (out of position) sobre su adversario si tiene que hablar antes que él en una ronda de apuestas.”; [C] Posicion „Un jugador se dice que tiene posición o que está en posición sobre un jugador” | potwierdzone |
| street | street | calle/calles (80) | — | [C] Street „se denomina streets (calles)”; [A] „En cada calle hay una ronda de apuestas.” | potwierdzone: **calle** (ż) |
| equity | equity | equity (12) | — | [C] Equity „su equity es de $5” | potwierdzone; rodzaj: tłumacz ż („una/la equity”), [C] m — bez konfliktu (rodzajnik pisze tłumacz) |
| variance / downswing | — | varianza (26) / downswing (9) | — | [C] Varianza „En el poker se refiere a la desviación de la ganancia esperada de un jugador.”; [C] Downswing „Es una fase o periodo de tiempo en el que un jugador sufre grandes pérdidas debidas a la mala suerte.” | potwierdzone (downswing m: „un {{t:downswing}}” 19× zgodne) |
| rake | rake | rake (17) | — | [C] Rake „El rake o chop es la comisión de la casa sobre cada bote.” | potwierdzone (m) |
| nit / tight / loose | nit | nit (6); w UI style „cerrado/suelto”, w słowniczku „tight/loose” | cerrado×37, tight×22, loose×37, suelto×11 | [C] Nit „Un nit es un jugador tight-passive”; [C] Tight_102 „Tight se refiere al estilo de juego en el que se seleccionan para jugar sólo unas pocas manos.”; [C] Loose „Un jugador loose juega muchas manos” | nit potwierdzone; „tight/loose” potwierdzone, „cerrado/suelto” nie znalezione w źródłach — UI ich używa; poprawka: most „cerrado (tight)”, „suelto (loose)” w słowniczku [WIELE FORM] |
| stakes | stakes | límite (62) | microlímites×1 | [C] TAG „particularmente en límites bajos, el estilo TAG es muy rentable” | potwierdzone: **límite** (m) |
| buy-in | buy-in | buy-ins (81) | — | [C] Buy-in „El buy-in (entrada) es la cantidad que un jugador debe pagar para entrar en una partida.” | potwierdzone (m) |
| blocker | blocker | bloqueador(es) (22) | — | [C] Blocker „Cartas que un jugador precisa para completar su proyecto pero ya están en las manos de algún rival.”; [E] matemáticas II „Los blockers” | **blocker** potwierdzone; „bloqueador” nie znalezione [DO USTALENIA]; nazwa K-05 **blocker** (0 miejsc bez formy) |
| value / value-bet | — | por valor/valor (~105) / value bets (1) | — | [C] Value „Una acción ejecutada por valor es aquella que resultará rentable”; [C] Value-Bet „Una Value bet es una apuesta para aumentar la ganancia” | potwierdzone: **valor**, **value bet** (ż) |
| overpair | overpair | sobrepareja (9) | overpairs×1 | [C] Overpair „Un overpair es una pareja que procede de las cartas de mano del jugador”; [E] poner-rangos „No tenemos que preocuparnos por los overpairs” | **overpair** potwierdzone, „sobrepareja” nie [DO USTALENIA] |
| recreational | recreational player | jugador(es) recreativo(s) (18) | recreacional(es)×10 | [E] el-limp „Cualquiera de nosotros identificaría a un recreacional solo con ver el número de veces que limpea en un par de órbitas.”; [E] el-tamano „contra jugadores recreacionales” | „recreacional” potwierdzone, „recreativo” (forma większościowa, UI) nie znalezione; nazwa K-05 robocza **jugador recreativo** [DO USTALENIA]; słowniczek ujednolicony do UI (poprawka ŚR) |
| dry / wet / wetness | — | seco (42) / mojado (13), húmedo (8) / humedad (4) | — | [C] Seca „Una mesa seca describe una mesa que hace posibles muy pocos proyectos o ninguno.”; [C] Drawy „(también llamada mesa húmeda)”; [C] Textura „Una mesa puede ser coordinada (con muchos proyectos, húmeda) o seca” | seco, húmedo potwierdzone; „mojado” nie znalezione. Nazwa K-05 **húmedo** (zgodna z „humedad”); UI „Mojado” → „Húmedo” (5 poprawek ŚR); lekcje mają obie formy (do ujednolicenia przez przegląd lekcji) [WIELE FORM] |
| paired | paired | emparejado (5) | doblado×9 | [C] Emparejadas „Es un flop emparejado (paired) porque tiene dos cincos.” | **emparejado** potwierdzone, „doblado” nie [WIELE FORM] |
| prize-pool | prize pool | bolsa de premios (18) | bote de premios×1 (słowniczek) | [C] Estructura-de-premios „1. puesto, 50% del bote de premios” | źródło ma „bote de premios”; „bolsa de premios” nie znalezione. Nazwa robocza **bolsa de premios** (forma tłumacza) [DO USTALENIA]; słowniczek ujednolicony do 18 form (ŚR) |
| bubble / bubble-factor | — | burbuja (11) / — (UI: „Bubble factor”) | — | [C] Burbuja „El otro significado de burbuja es la fase de juego de un torneo justo antes de alcanzar la posición de la burbuja”; [C] Factor-burbuja „El factor burbuja es aquel en el que tus odds en fichas difieren de tus odds en dólares.” | potwierdzone: **burbuja**, **factor burbuja** |
| shove | shove | push (9), pushea… | — | [C] Push „Ir all-in” | potwierdzone: **push** |
| hole-cards | hole cards | cartas propias (3) | — | [D] „con las dos cartas propias”; [A] „(llamadas «cartas de mano»)” | potwierdzone oba |
| Q (dama) | queen | dama (34) | reina×5 (UI card.rank.Q, tekstury) | [F] „compuesta por un as, rey, dama, jota y diez del mismo palo”; [C] Kicker „el de B es la reina de tréboles” | obie formy w źródłach; jedna w aplikacji: **dama** (słowniczek, lekcje) → 2 poprawki UI (ŚR) |
| pocket-pair | pocket pair | pareja de mano (4) | — | [C] Pocket-Pair-Pareja-de-mano „una pocket pair es una pareja hecha con las dos cartas del jugador” | potwierdzone (hasło „Pocket Pair (Pareja de mano)”) |
| pot-odds / implied-odds | — | — / probabilidades implícitas×1, Implied odds×1 | — | [C] Probabilidades-en-relacion-al-bote „Las probabilidades en relación al bote ( pot odds en inglés)”; [C] Odds-implicitas „Odds implícitas o pot odds implícitas son pot odds modificadas”; [E] matemáticas I „(llamadas odds implícitas)” | potwierdzone: **pot odds**, **odds implícitas** |
| split-pot / side-pot | — | bote dividido (11) / bote secundario (2) | — | [C] Split-Pot „Un split pot es un bote que se divide entre múltiples jugadores”; [C] Pot „el bote secundario, de manera que sólo los jugadores que tengan el dinero necesario puedan competir por él” | potwierdzone |
| maniac / calling-station | — | maníaco (18) / calling station (1) | — | [C] Maniaco „Un maniaco es un jugador extremadamente agresivo que juega muchas manos”; [C] Calling-station „es un jugador extremadamente pasivo que juega demasiadas manos” | potwierdzone |
| 3-bet / c-bet | — | 3-bet / c-bet (2) | — | [C] 3-Bet „Una 3-bet es un reraise después de una apuesta y un raise.”; [E] lista beginner „Jonathan Little recomienda no hacer c-bet siempre que liguemos top pair en el flop.” | potwierdzone (rodzaj ż „una 3-bet/c-bet” zgodny z [C]) |
| cover | cover | cubre (5) | — | [C] Cubierto „Cubrir a alguien es tener más fichas que él.” | potwierdzone |

Potwierdzone na przeczytanym źródle: 126 ze 162 nazw (w YAML z „źr.”); 36 [DO USTALENIA] (nazwa robocza = forma tłumacza albo nazwa en; m.in. bicolor, monocolor, semiconectado, desconectado, ventaja de rango/nuts, segunda pareja, segundo barril, probe bet, stack efectivo, MDF, alpha, prima de riesgo, equilibrio de Nash, bolsa de premios, jugador recreativo, posición tardía, mano mixta).

## Najważniejsze rozstrzygnięcia nazw

1. Akcje: **pasar** (check), **apuesta** (bet), **subida** (raise) — lokalne, zgodne z [C][D]; **call** i **fold** jako rzeczowniki angielskie (m) — miejsca bez formy to składnia rzeczownikowa obok „3-bet” („un call jugado”, „¿All-in o fold?”); [C] i [E] używają „hacer call”, „foldea”.
2. **mesa** (nie „board”) — rodzaj w 4 miejscach bez formy („en la {{t:board}}”); „board” w źródłach [E] też jest, ale dałby „en la board”.
3. **húmedo** (nie „mojado”) — źródło [C] i spójność z nazwą osi „humedad”; UI do poprawy.
4. **top pair**, **overpair**, **blocker** (nie „pareja máxima”, „sobrepareja”, „bloqueador”) — tylko formy angielskie (i „pareja mayor”) są w przeczytanych źródłach; 115 form tłumacza w lekcjach to rozbieżność do decyzji 06/09 (ujednolicić albo znaleźć źródło).
5. **dama** dla Q (UI „reina” → „dama”), **póker** jako pisownia gry (słowniczek „póquer” → „póker”).

## Konflikty rodzaju i liczby (znaczniki bez formy, proponowane nazwy)

Kontrola automatyczna (`pr/E2/gen.py`: rodzajnik/zaimek/przymiotnik bezpośrednio przed znacznikiem vs rodzaj i liczba nazwy z YAML; 705 wystąpień, 65 kluczy; skróty SPR/VPIP/MDF/PFR/UTG/ICM/WTSD/HUD/TAG/LAG pominięte, 365 wystąpień): **0 konfliktów** przy nazwach z YAML. Przymiotniki tekstury po rzeczowniku („flop {{t:dry}}”, „el flop es {{t:monotone}}”) — wszystkie po rzeczowniku m lp, zgodne.

Konflikty, które powstałyby przy innych nazwach (powód wyboru):
- big-blind = „big blind” (m): „la {{t:big-blind}}” 37× → dziś (render en przed K-05) wyświetla się „la big blind”; po K-05 „la ciega grande”.
- straight = „straight”: „una/la {{t:straight}}” 8×; board = „board”: „en la/de la {{t:board}}” 4×.
- call = „igualar”: „un/el {{t:call}}” 3× → „un igualar”; stąd „call”.
- overbet = „sobreapuesta” (ż): „un {{t:overbet}}” 1×; stąd „overbet”.

## Różnice es-ES / Ameryka Łacińska (pod nakładkę es-419)

| pojęcie | es-ES (przekład) | Ameryka Łacińska | podstawa |
|---|---|---|---|
| pot | bote | pozo | [B] „el farol gane el pozo” (przeczytane) |
| 2. os. lm | vosotros/tenéis („Ambos tenéis”, „entre vosotros”) | ustedes/tienen | gramatyka (UI: drill.whoWins.reason.higherSameCategory, drill.icm.callPrompt; lekcje: „pasasteis”×8) |
| komputer | ordenador (play.entryHint) | computadora | leksyka ogólna |
| call | igualar (UI), pagar | pagar | do sprawdzenia na źródle es-419 |
| bluff | farol, farolear | bluff/blof, blofear | do sprawdzenia |
| pair | pareja | par | do sprawdzenia |
| trafić (hit) | ligar (UI, lekcje) | conectar/ligar | do sprawdzenia |
| ustawienia iOS | Ajustes | Configuración | nazewnictwo systemu (do sprawdzenia w es-419 iOS) |
| liczebnik porządkowy | 1.er puesto | 1.er / 1er | typografia |

Pozycje „do sprawdzenia” nie mają przeczytanego źródła es-419 — nie są rozstrzygnięciami, tylko listą do przeglądu nakładki.
