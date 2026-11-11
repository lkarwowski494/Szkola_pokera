# Wejście do kontroli przekładem zwrotnym (bez tekstu polskiego)

Kontekst: ekran „Liczby” i punkt turniejowy ICM w ćwiczeniu scenariusza (Texas Hold’em, aplikacja do nauki pokera). Zapis `{{nazwa}}` to parametr podstawiany liczbą albo nazwą, `{{t:termin|forma}}` to znacznik terminu pokerowego (forma = tekst widoczny, bubble = bańka/bubble turniejowa). Znak U+00A0 zapisany jako `␣`.

## ko

| klucz | tekst |
|---|---|
| numbers.cbet | 작은 {{t:c-bet}}은 {{t:pot|팟}}의 약 {{maly}}, 큰 것은 약 {{duzy}}입니다. 상대가 {{t:call|콜}}하려면 작은 쪽에는 승률 {{cenaMaly}}, 즉 약 {{razMaly}}번에 한 번 이겨야 하고, 큰 쪽에는 {{cenaDuzy}}, 즉 약 {{razDuzy}}번에 한 번 이겨야 합니다. |
| numbers.sizeOpen | {{bb}}bb로 {{t:raise|레이즈}}하면 {{t:big-blind|빅 블라인드}}는 {{pula}}bb의 {{t:pot|팟}}에 {{doplata}}bb를 더 내야 합니다(나머지가 모두 {{t:fold|폴드}}한 경우). 따라서 필요한 승률은 {{cena}}, 즉 약 {{raz}}번에 한 번 이겨야 합니다. |
| numbers.size3bet | {{bb}}bb로 3벳을 하면 {{t:open|오픈}}한 플레이어는 {{pula}}bb의 {{t:pot|팟}}에 {{doplata}}bb를 더 내야 합니다. 따라서 필요한 승률은 {{cena}}, 즉 약 {{raz}}번에 한 번 이겨야 합니다. |
| numbers.limp | 림프는 {{kwota}}bb가 들고, {{t:big-blind|빅 블라인드}}는 추가로 내지 않고 플랍을 볼 수 있습니다. |
| numbers.icm | 내 핸드는 {{t:all-in|올인}}한 상대의 {{t:range|레인지}}에 대해 {{t:equity|에퀴티}} {{equity}}로, 10번 중 약 {{na10}}번 이깁니다. {{t:icm|ICM}} 기준으로는 {{prog}}부터 {{t:call|콜}}이 이득이고, {{t:chips|칩}}을 겨루는 게임이라면 {{progZetony}}로 충분합니다. {{t:bubble|버블}}에서는 지면 잃는 {{t:prize-pool|상금 풀}}의 몫이 이길 때 늘어나는 몫보다 크기 때문입니다. |
| numbers.overcardsFold | {{t:board|보드}}의 어떤 카드보다 높은 {{t:pair|페어}}를 만들어 주는 카드까지 세면(보이지 않는 {{nieznane}}장 중 {{nadkarty}}장), 맞힐 확률은 {{trafiszRazem}}로, 가격이 요구하는 확률({{potrzeba}})에는 여전히 못 미칩니다. 그런 {{t:pair|페어}}는 상대의 더 강한 핸드에 질 수도 있습니다. |
| numbers.overcardsCall | {{t:board|보드}}의 어떤 카드보다 높은 {{t:pair|페어}}를 만들어 주는 카드(보이지 않는 {{nieznane}}장 중 {{nadkarty}}장)는 계산에서 뺍니다. 그런 {{t:pair|페어}}는 더 강한 핸드에 질 수 있고, 드로의 아웃츠만으로도 충분하기 때문입니다. |
| icm.tableLabel | {{t:board|테이블}}: 나는 {{ty}}, 카드는 {{reka}}입니다. {{rywal}}의 상대가 올인했습니다. |
| icm.foldedOne | {{t:fold|폴드}}한 플레이어: {{kto}}. |
| icm.foldedMany | {{t:fold|폴드}}한 플레이어: {{kto}}. |
| icm.bubble | {{t:bubble|버블}}: {{gracze}}명 중 {{platne}}위까지 상금 |
| icm.prizes | 상금: {{lista}} ({{t:prize-pool|상금 풀}}에 대한 비율). {{brak}} |
| icm.place | {{n}}위 {{procent}} |
| icm.noPrizeThird | 3위는 상금이 없습니다. |
| icm.noPrizeFourth | 4위는 상금이 없습니다. |
| icm.stacksLabel | 핸드 시작 시 스택 |
| icm.you | 나, {{pozycja}} |
| icm.rival | 상대, {{pozycja}} |
| icm.rowLabel | {{kto}}, {{wartosc}} |
| icm.wholeStack | {{kwota}}는 내 스택 전부입니다. 지면 상금 없이 {{t:tournament|토너먼트}}에서 탈락합니다. |
| icm.rewards | 스택과 상금 |

## pt

| klucz | tekst |
|---|---|
| numbers.cbet | Um {{t:c-bet}} pequeno é de cerca de {{maly}} do {{t:pot|pote}}, e um grande de cerca de {{duzy}}. Para {{t:call|pagar}}, o adversário precisa de {{cenaMaly}} de equity contra o pequeno, ou seja, ganhar cerca de uma vez em {{razMaly}}, e de {{cenaDuzy}} contra o grande, cerca de uma vez em {{razDuzy}}. |
| numbers.sizeOpen | Com um {{t:raise|aumento}} para {{bb}} bb, o {{t:big-blind|big blind}} acrescenta {{doplata}} bb a um {{t:pot|pote}} de {{pula}} bb (se todos os outros {{t:fold|desistirem}}), por isso precisa de {{cena}} de equity, ou seja, ganhar cerca de uma vez em {{raz}}. |
| numbers.size3bet | Com um 3-bet para {{bb}} bb, quem fez a {{t:open|abertura}} acrescenta {{doplata}} bb a um {{t:pot|pote}} de {{pula}} bb, por isso precisa de {{cena}} de equity, ou seja, ganhar cerca de uma vez em {{raz}}. |
| numbers.limp | Um limp custa {{kwota}} bb, e o {{t:big-blind|big blind}} pode ver o flop sem pagar mais. |
| numbers.icm | A sua mão tem {{equity}} de {{t:equity|equity}} contra o {{t:range|range}} com que o adversário vai {{t:all-in|all-in}}, ou seja, ganha cerca de {{na10}} mãos em 10. Segundo o {{t:icm|ICM}}, {{t:call|pagar}} compensa a partir de {{prog}}, enquanto num jogo a {{t:chips|fichas}} bastariam {{progZetony}}: na {{t:bubble|bolha}}, perder tira-lhe mais da {{t:prize-pool|bolsa de prémios}} do que ganhar lhe acrescenta. |
| numbers.overcardsFold | Se contar também as cartas que lhe dão um {{t:pair|par}} mais alto do que qualquer carta da {{t:board|mesa}} ({{nadkarty}} de {{nieznane}} não vistas), acerta em {{trafiszRazem}} dos casos, ainda menos vezes do que o preço exige ({{potrzeba}}). Um {{t:pair|par}} assim também pode perder para uma mão melhor do adversário. |
| numbers.overcardsCall | As cartas que lhe dão um {{t:pair|par}} mais alto do que qualquer carta da {{t:board|mesa}} ({{nadkarty}} de {{nieznane}} não vistas) ficam fora da conta: um {{t:pair|par}} assim pode perder para uma mão melhor, e os outs do seu draw bastam por si só. |
| icm.tableLabel | {{t:board|Mesa}}: o seu lugar é {{ty}}, cartas {{reka}}. O adversário em {{rywal}} vai all-in. |
| icm.foldedOne | {{kto}} {{t:fold|desistiu}}. |
| icm.foldedMany | {{kto}} {{t:fold|desistiram}}. |
| icm.bubble | {{t:bubble|Bolha}}: {{platne}} de {{gracze}} lugares são pagos |
| icm.prizes | Prémios: {{lista}} da {{t:prize-pool|bolsa de prémios}}. {{brak}} |
| icm.place | lugar {{n}}: {{procent}} |
| icm.noPrizeThird | O terceiro lugar não recebe nada. |
| icm.noPrizeFourth | O quarto lugar não recebe nada. |
| icm.stacksLabel | Stacks no início da mão |
| icm.you | Eu, {{pozycja}} |
| icm.rival | Adversário, {{pozycja}} |
| icm.rowLabel | {{kto}}, {{wartosc}} |
| icm.wholeStack | {{kwota}} é todo o seu stack: se perder, fica fora do {{t:tournament|torneio}} sem prémio. |
| icm.rewards | Stacks e prémios |

## pt-BR

| klucz | tekst |
|---|---|
| numbers.cbet | Um {{t:c-bet}} pequeno é de cerca de {{maly}} do {{t:pot|pote}}, e um grande de cerca de {{duzy}}. Para {{t:call|pagar}}, o adversário precisa de {{cenaMaly}} de equity contra o pequeno, ou seja, ganhar cerca de uma vez em {{razMaly}}, e de {{cenaDuzy}} contra o grande, cerca de uma vez em {{razDuzy}}. |
| numbers.sizeOpen | Com um {{t:raise|aumento}} para {{bb}} bb, o {{t:big-blind|big blind}} paga mais {{doplata}} bb num {{t:pot|pote}} de {{pula}} bb (se todos os outros {{t:fold|desistirem}}), então precisa de {{cena}} de equity, ou seja, ganhar cerca de uma vez em {{raz}}. |
| numbers.size3bet | Com um 3-bet para {{bb}} bb, quem fez a {{t:open|abertura}} paga mais {{doplata}} bb num {{t:pot|pote}} de {{pula}} bb, então precisa de {{cena}} de equity, ou seja, ganhar cerca de uma vez em {{raz}}. |
| numbers.limp | Um limp custa {{kwota}} bb, e o {{t:big-blind|big blind}} pode ver o flop sem pagar mais. |
| numbers.icm | Sua mão tem {{equity}} de {{t:equity|equity}} contra o {{t:range|range}} com que o adversário vai {{t:all-in|all-in}}, ou seja, ganha cerca de {{na10}} mãos em 10. Pelo {{t:icm|ICM}}, {{t:call|pagar}} compensa a partir de {{prog}}, enquanto num jogo por {{t:chips|fichas}} bastariam {{progZetony}}: na {{t:bubble|bolha}}, perder tira de você mais da {{t:prize-pool|premiação}} do que ganhar acrescenta. |
| numbers.overcardsFold | Se você contar também as cartas que dão um {{t:pair|par}} mais alto do que qualquer carta da {{t:board|mesa}} ({{nadkarty}} de {{nieznane}} não vistas), você acerta em {{trafiszRazem}} dos casos, ainda menos vezes do que o preço exige ({{potrzeba}}). Um {{t:pair|par}} assim também pode perder para uma mão melhor do adversário. |
| numbers.overcardsCall | As cartas que dão um {{t:pair|par}} mais alto do que qualquer carta da {{t:board|mesa}} ({{nadkarty}} de {{nieznane}} não vistas) ficam fora da conta: um {{t:pair|par}} assim pode perder para uma mão melhor, e os outs do seu draw bastam por si só. |
| icm.tableLabel | {{t:board|Mesa}}: você no {{ty}}, cartas {{reka}}. O adversário no {{rywal}} vai all-in. |
| icm.foldedOne | {{kto}} {{t:fold|desistiu}}. |
| icm.foldedMany | {{kto}} {{t:fold|desistiram}}. |
| icm.bubble | {{t:bubble|Bolha}}: {{platne}} de {{gracze}} posições são pagas |
| icm.prizes | Prêmios: {{lista}} da {{t:prize-pool|premiação}}. {{brak}} |
| icm.place | {{n}}º lugar: {{procent}} |
| icm.noPrizeThird | O terceiro lugar não recebe nada. |
| icm.noPrizeFourth | O quarto lugar não recebe nada. |
| icm.stacksLabel | Stacks no início da mão |
| icm.you | Você, {{pozycja}} |
| icm.rival | Adversário, {{pozycja}} |
| icm.rowLabel | {{kto}}, {{wartosc}} |
| icm.wholeStack | {{kwota}} é todo o seu stack: se perder, você sai do {{t:tournament|torneio}} sem prêmio. |
| icm.rewards | Stacks e prêmios |

## vi

| klucz | tekst |
|---|---|
| numbers.cbet | {{t:c-bet}} nhỏ khoảng {{maly}} {{t:pot|pot}}, còn loại lớn khoảng {{duzy}}. Để {{t:call|theo}}, đối thủ cần {{cenaMaly}} equity trước loại nhỏ, tức là thắng khoảng 1 lần trong {{razMaly}}, và {{cenaDuzy}} trước loại lớn, khoảng 1 lần trong {{razDuzy}}. |
| numbers.sizeOpen | Khi {{t:raise|tố}} lên {{bb}} bb, {{t:big-blind|big blind}} phải bù thêm {{doplata}} bb vào {{t:pot|pot}} {{pula}} bb (nếu mọi người còn lại {{t:fold|bỏ bài}}), nên cần {{cena}} equity, tức là thắng khoảng 1 lần trong {{raz}}. |
| numbers.size3bet | Khi 3-bet lên {{bb}} bb, người {{t:open|mở cược}} phải bù thêm {{doplata}} bb vào {{t:pot|pot}} {{pula}} bb, nên cần {{cena}} equity, tức là thắng khoảng 1 lần trong {{raz}}. |
| numbers.limp | Limp tốn {{kwota}} bb, và {{t:big-blind|big blind}} có thể xem flop mà không phải trả thêm. |
| numbers.icm | Tay bài của bạn có {{equity}} {{t:equity|equity}} so với {{t:range|range}} mà đối thủ dùng để {{t:all-in|all-in}}, tức là thắng khoảng {{na10}} trên 10 ván. Theo {{t:icm}}, {{t:call|theo}} có lời từ {{prog}}, còn ở trò chơi tính bằng {{t:chips|chip}} thì {{progZetony}} là đủ: ở {{t:bubble|bubble}}, thua lấy đi của bạn nhiều {{t:prize-pool|tổng giải thưởng}} hơn so với phần thắng mang lại. |
| numbers.overcardsFold | Nếu tính cả những lá cho bạn một {{t:pair|đôi}} cao hơn mọi lá trên {{t:board|board}} ({{nadkarty}} trên {{nieznane}} lá chưa thấy), bạn trúng ở {{trafiszRazem}} số trường hợp, vẫn ít hơn mức giá yêu cầu ({{potrzeba}}). {{t:pair|Đôi}} như vậy cũng có thể thua tay bài mạnh hơn của đối thủ. |
| numbers.overcardsCall | Những lá cho bạn một {{t:pair|đôi}} cao hơn mọi lá trên {{t:board|board}} ({{nadkarty}} trên {{nieznane}} lá chưa thấy) không được tính vào phép tính: {{t:pair|đôi}} như vậy có thể thua tay bài mạnh hơn, và outs của draw đã đủ. |
| icm.tableLabel | {{t:board|Bàn}}: bạn ở {{ty}}, bài {{reka}}. Đối thủ ở {{rywal}} đang all-in. |
| icm.foldedOne | {{kto}} đã {{t:fold|bỏ bài}}. |
| icm.foldedMany | {{kto}} đã {{t:fold|bỏ bài}}. |
| icm.bubble | {{t:bubble|Bubble}}: trả thưởng cho {{platne}} trên {{gracze}} vị trí |
| icm.prizes | Giải thưởng: {{lista}} của {{t:prize-pool|tổng giải thưởng}}. {{brak}} |
| icm.place | hạng {{n}}: {{procent}} |
| icm.noPrizeThird | Hạng ba không nhận được gì. |
| icm.noPrizeFourth | Hạng tư không nhận được gì. |
| icm.stacksLabel | Stack đầu ván |
| icm.you | Bạn, {{pozycja}} |
| icm.rival | Đối thủ, {{pozycja}} |
| icm.rowLabel | {{kto}}, {{wartosc}} |
| icm.wholeStack | {{kwota}} là toàn bộ stack của bạn: nếu thua, bạn bị loại khỏi {{t:tournament|giải đấu}} mà không có giải thưởng. |
| icm.rewards | Stack và giải thưởng |

## zh-Hant

| klucz | tekst |
|---|---|
| numbers.cbet | 小額{{t:c-bet}}約為{{t:pot|底池}}的 {{maly}}，大額約為 {{duzy}}。要{{t:call|跟注}}，對手面對小額需要 {{cenaMaly}} 的勝率，也就是大約每 {{razMaly}} 次贏 1 次；面對大額需要 {{cenaDuzy}}，大約每 {{razDuzy}} 次贏 1 次。 |
| numbers.sizeOpen | {{t:raise|加注}}到 {{bb}} bb 時，{{t:big-blind|大盲}}要再補 {{doplata}} bb 進 {{pula}} bb 的{{t:pot|底池}}（如果其他人都{{t:fold|棄牌}}），所以需要 {{cena}} 的勝率，也就是大約每 {{raz}} 次贏 1 次。 |
| numbers.size3bet | 3-bet 到 {{bb}} bb 時，{{t:open|開池}}者要再補 {{doplata}} bb 進 {{pula}} bb 的{{t:pot|底池}}，所以需要 {{cena}} 的勝率，也就是大約每 {{raz}} 次贏 1 次。 |
| numbers.limp | 溜入要 {{kwota}} bb，而{{t:big-blind|大盲}}不用再補錢就能看翻牌。 |
| numbers.icm | 你的手牌對上對手{{t:all-in|全下}}的{{t:range|範圍}}有 {{equity}} 的{{t:equity|權益}}，也就是 10 手牌大約贏 {{na10}} 手。依{{t:icm}}，{{t:call|跟注}}要從 {{prog}} 起才划算；若是以{{t:chips|籌碼}}計的遊戲，{{progZetony}} 就夠了：在{{t:bubble|泡沫}}上，輸掉損失的{{t:prize-pool|獎金池}}份額比贏了增加的更多。 |
| numbers.overcardsFold | 如果再把能讓你湊成比{{t:board|牌面}}上任何一張都大的{{t:pair|對子}}的牌也算進去（未見的 {{nieznane}} 張中有 {{nadkarty}} 張），你會在 {{trafiszRazem}} 的情況中成牌，仍然低於價格所要求的 {{potrzeba}}。這樣的{{t:pair|對子}}也可能輸給對手更強的牌。 |
| numbers.overcardsCall | 能讓你湊成比{{t:board|牌面}}上任何一張都大的{{t:pair|對子}}的牌（未見的 {{nieznane}} 張中有 {{nadkarty}} 張）不計入算式：這樣的{{t:pair|對子}}可能輸給更強的牌，而聽牌的補牌數本身就已足夠。 |
| icm.tableLabel | {{t:board|牌桌}}：你在 {{ty}}，手牌 {{reka}}。{{rywal}} 的對手全下了。 |
| icm.foldedOne | {{kto}}已{{t:fold|棄牌}}。 |
| icm.foldedMany | {{kto}}已{{t:fold|棄牌}}。 |
| icm.bubble | {{t:bubble|泡沫}}：{{gracze}} 人中前 {{platne}} 名有獎金 |
| icm.prizes | 獎金：{{lista}}（占{{t:prize-pool|獎金池}}的比例）。{{brak}} |
| icm.place | 第 {{n}} 名 {{procent}} |
| icm.noPrizeThird | 第 3 名沒有獎金。 |
| icm.noPrizeFourth | 第 4 名沒有獎金。 |
| icm.stacksLabel | 手牌開始時的籌碼量 |
| icm.you | 你，{{pozycja}} |
| icm.rival | 對手，{{pozycja}} |
| icm.rowLabel | {{kto}}，{{wartosc}} |
| icm.wholeStack | {{kwota}} 是你的全部籌碼：輸了就會失去{{t:tournament|錦標賽}}資格，且沒有獎金。 |
| icm.rewards | 籌碼量與獎金 |
