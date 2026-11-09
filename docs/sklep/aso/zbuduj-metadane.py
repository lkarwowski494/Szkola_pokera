# Rola 10/11, sesja AF (2026-11-09): teksty sklepu dla nowych języków (D-377, D-369; nazwa PokerGym D-378). Jedno źródło dla store/ (fala 1) i docs/sklep/aso/metadane-fala2.json (fala 2).
# Uruchomienie z katalogu repo: python3 -I docs/sklep/aso/zbuduj-metadane.py  (dopisuje fala 1 do store/app-store-metadata.json, nadpisuje plik fali 2)
# Z flagą --tylko-fala2: tylko plik fali 2, store/ bez zmian. Przegląd językowy: docs/sklep/aso/przeglad-jezykowy-2026-11-09.md
import json, collections
EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
def stopka(terms, priv): return f"\n\n{terms} / Terms of Use: {EULA}\n{priv} / Privacy Policy: [PRIVACY URL]"

L = collections.OrderedDict()

L['ja'] = dict(
 name='PokerGym: ポーカー戦略を学ぶ',
 subtitle='判断ごとに評価と解説、賭けなし',
 keywords='初心者,ホールデム,レンジ,プリフロップ,トレーナー,gto,icm,オッズ,クイズ',
 promotionalText='ポーカーを基礎のルールから戦略まで学べます。すべての判断に評価と「なぜ」の解説つき。リアルマネーのプレイなし、アカウント不要、広告なし。',
 description=(
 "PokerGymは、ノーリミット・テキサスホールデムでの判断の仕方を教えるアプリです。ルールと役の強さから、各ストリートの戦略まで学べます。すべてのプレイに評価がつき、なぜ良いのか、なぜ悪いのかを解説します。これは学習用のコースであり、ゲームではありません。賭け金も、獲得できるチップも、リアルマネーのプレイもありません。\n\n"
 "コース\n"
 "• 順番に進むモジュール：ルールと役、ハンドの流れ、数学（アウツ、オッズ、ポットオッズ）、ポジションとオープン、プリフロップ、フロップ、ターン、リバー、ハンドの計画（SPR）、弱いプレイヤーのよくあるミスへの対応、トーナメント（プッシュ/フォールドとICM）、分散とティルト、自分のプレイの振り返り\n"
 "• 練習問題つきのレッスン。用語はその場と用語集で説明\n"
 "• 最初に短いレベルチェック（最大8問、スキップ可）で、最初のレッスンを提案\n"
 "• モジュール試験（15問）で、すでに分かっている内容は飛ばせます\n\n"
 "練習\n"
 "• 判断を4段階で評価\n"
 "• すべての回答に数字つきの解説\n"
 "• アクションの選択、数値の入力、グリッド上でのハンドレンジの塗り分け\n"
 "• 短い練習セッション：いつでも中断して、同じ問題から再開できます\n\n"
 "復習と進捗\n"
 "• 間違えた問題は、間隔をあけた復習で再び出題\n"
 "• 正答率、苦手な問題タイプ、連続日数、上達度スコア\n"
 "• 毎日のリマインダー（任意）\n\n"
 "あなたのデータ\n"
 "• オフラインで動作。アカウント、広告、トラッキングなし\n"
 "• 進捗はスマートフォンの中だけ：ファイルへの書き出し、別のスマートフォンへの読み込み、進捗の削除\n\n"
 "責任あるプレイ\n"
 "• 「ヘルプ」画面で、ギャンブルの問題で相談できる窓口を案内\n\n"
 "利用できる内容\n"
 "レッスン、レベルチェック、各モジュール試験の1回目は常に無料です。購入しない場合、1日に1つの無料アクティビティ（練習セッション、復習、試験の再受験のいずれか）を利用できます。フルアクセスでこの制限がなくなります：四半期または年間のサブスクリプション（Appleアカウントの設定で解約するまで自動更新）、または1回限りの買い切り（無期限）。"
 + stopka('利用規約', 'プライバシーポリシー'))
)

L['zh-Hant'] = dict(
 name='PokerGym: 德州撲克教學',
 subtitle='每個決策都有評分與解說，不涉真錢',
 keywords='撲克策略,撲克訓練,新手入門,底池賠率,錦標賽,翻牌前,翻牌後,起手牌,gto,icm',
 promotionalText='從規則到策略，一步步學會撲克。每個決策都有評分和「為什麼」的解說。沒有真錢遊戲、不需帳號、沒有廣告。',
 description=(
 "PokerGym 教你在無限注德州撲克（No-Limit Texas Hold'em）中如何做決策：從規則與牌型大小，到每一條街的策略。每一個打法都會得到評分，並解說它為什麼好或不好。這是一門課程，不是遊戲：沒有賭注、沒有可贏取的籌碼，也沒有真錢遊戲。\n\n"
 "課程\n"
 "• 依序學習的單元：規則與牌型、一手牌的流程、數學（補牌、賠率、底池賠率）、位置與開池、翻牌前、翻牌、轉牌、河牌、手牌規劃（SPR）、應對較弱玩家的常見錯誤、錦標賽（push/fold 與 ICM）、變異數與情緒失控（tilt）、檢討自己的打法\n"
 "• 附練習的課堂；術語在出現處和詞彙表中說明\n"
 "• 開始時的簡短程度測驗（最多 8 題，可略過）會推薦你的第一課\n"
 "• 單元考試（15 題）讓你跳過已經會的內容\n\n"
 "練習\n"
 "• 決策分四個等級評分\n"
 "• 每個回答後都有附數字的解說\n"
 "• 選擇行動、輸入數字，或在格子上塗出手牌範圍\n"
 "• 簡短的練習：隨時可以中斷，之後回到同一題\n\n"
 "複習與進度\n"
 "• 答錯的題目會以間隔複習再次出現\n"
 "• 正確率、最弱的題型、連續天數與進階指數\n"
 "• 可選的每日提醒\n\n"
 "你的資料\n"
 "• 離線可用，不需帳號、沒有廣告、不追蹤\n"
 "• 進度只存在你的手機：可匯出成檔案、在另一支手機匯入，或刪除進度\n\n"
 "理性遊戲\n"
 "• 「協助」畫面提供賭博問題的求助管道\n\n"
 "使用方式\n"
 "課堂、程度測驗和每個單元考試的第一次作答永遠免費。未購買時，每天可進行一項免費活動：一次練習、一次複習或一次重考。完整存取可取消此限制：季訂閱或年訂閱（自動續訂，直到在 Apple 帳號設定中取消），或一次性買斷（終身）。"
 + stopka('使用條款', '隱私權政策'))
)

L['pt-BR'] = dict(
 name='PokerGym: aprenda pôquer',
 subtitle='Treine decisões, sem apostas',
 keywords='poker,texas,holdem,gto,estratégia,curso,aulas,treinador,preflop,range,outs,icm,torneio,quiz',
 promotionalText='Estude pôquer das regras à estratégia. Cada decisão recebe uma nota e uma explicação. Sem jogo a dinheiro, sem conta, sem anúncios.',
 description=(
 "O PokerGym ensina a tomar decisões no No-Limit Texas Hold'em, das regras e da força das mãos até a estratégia em cada street. Cada jogada recebe uma nota e uma explicação de por que é boa ou ruim. É um curso, não um jogo: não há apostas, fichas para ganhar nem jogo a dinheiro.\n\n"
 "CURSO\n"
 "• Módulos em ordem: regras e ranking de mãos, como uma mão se desenrola, matemática (outs, odds, pot odds), posição e abertura, jogo preflop, flop, turn, river, planejamento da mão (SPR), jogar contra os erros comuns de jogadores mais fracos, torneios (push/fold e ICM), variância e tilt, análise do seu próprio jogo\n"
 "• Aulas com exercícios; termos explicados onde aparecem e em um glossário\n"
 "• Uma avaliação de nível curta no início (até 8 perguntas, pode ser pulada) indica sua primeira aula\n"
 "• Uma prova de módulo (15 questões) permite pular o que você já sabe\n\n"
 "PRÁTICA\n"
 "• Decisões avaliadas em quatro níveis\n"
 "• Uma explicação com os números após cada resposta\n"
 "• Escolha uma ação, digite um número ou pinte um range de mãos na grade\n"
 "• Sessões curtas de prática: pare quando quiser e volte para a mesma questão\n\n"
 "REVISÕES E PROGRESSO\n"
 "• As questões que você errou voltam em revisões espaçadas\n"
 "• Taxa de acerto, tipos de questão mais fracos, sequência de dias e um índice de evolução\n"
 "• Lembrete diário opcional\n\n"
 "SEUS DADOS\n"
 "• Funciona offline, sem conta, sem anúncios e sem rastreamento\n"
 "• O progresso fica no seu celular: exporte para um arquivo, importe em outro celular ou apague\n\n"
 "JOGUE COM RESPONSABILIDADE\n"
 "• Uma tela de Ajuda mostra onde buscar apoio para problemas com jogos de azar\n\n"
 "ACESSO\n"
 "As aulas, a avaliação de nível e a primeira tentativa de cada prova de módulo são sempre gratuitas. Sem compra, você tem uma atividade gratuita por dia: uma sessão de prática, uma sessão de revisão ou uma nova tentativa de prova. O acesso completo remove esse limite: assinatura trimestral ou anual (renovada automaticamente até ser cancelada nos ajustes da sua Conta Apple) ou um desbloqueio vitalício com pagamento único."
 + stopka('Termos de Uso', 'Política de Privacidade'))
)

L['fr-FR'] = dict(
 name='PokerGym: cours de poker',
 subtitle='Apprendre à décider, sans mise',
 keywords='stratégie,texas,holdem,gto,preflop,postflop,range,outs,icm,tournoi,leçons,quiz,entraînement',
 promotionalText='Étudiez le poker, des règles à la stratégie. Chaque décision est notée et expliquée. Pas de jeu d’argent, pas de compte, pas de publicité.',
 description=(
 "PokerGym enseigne la prise de décision au No-Limit Texas Hold'em, des règles et de la hiérarchie des mains jusqu’à la stratégie sur chaque street. Chaque coup reçoit une note et une explication : pourquoi il est bon ou mauvais. C’est un cours, pas un jeu : pas de mises, pas de jetons à gagner, pas de jeu d’argent.\n\n"
 "COURS\n"
 "• Modules dans l’ordre : règles et combinaisons, déroulement d’une main, mathématiques (outs, cotes, cote du pot), position et ouverture, jeu preflop, flop, turn, river, plan de la main (SPR), jouer contre les erreurs courantes des joueurs plus faibles, tournois (push/fold et ICM), variance et tilt, analyse de votre propre jeu\n"
 "• Leçons avec exercices ; termes expliqués là où ils apparaissent et dans un glossaire\n"
 "• Un court test de niveau au départ (8 questions au plus, facultatif) indique votre première leçon\n"
 "• Un examen de module (15 questions) permet de passer ce que vous savez déjà\n\n"
 "ENTRAÎNEMENT\n"
 "• Décisions notées sur quatre niveaux\n"
 "• Une explication chiffrée après chaque réponse\n"
 "• Choisir une action, saisir un nombre ou colorier une range de mains sur la grille\n"
 "• Séances courtes : arrêtez quand vous voulez et reprenez à la même question\n\n"
 "RÉVISIONS ET PROGRÈS\n"
 "• Les questions manquées reviennent en révisions espacées\n"
 "• Taux de réussite, types de questions les plus faibles, série de jours et indice de progression\n"
 "• Rappel quotidien facultatif\n\n"
 "VOS DONNÉES\n"
 "• Fonctionne hors ligne, sans compte, sans publicité et sans suivi\n"
 "• La progression reste sur votre téléphone : export vers un fichier, import sur un autre téléphone ou suppression\n\n"
 "JEU RESPONSABLE\n"
 "• Un écran Aide indique où trouver du soutien en cas de problème de jeu\n\n"
 "ACCÈS\n"
 "Les leçons, le test de niveau et la première tentative de chaque examen de module sont toujours gratuits. Sans achat, vous avez une activité gratuite par jour : une séance d’entraînement, une séance de révision ou un nouvel essai d’examen. L’accès complet supprime cette limite : abonnement trimestriel ou annuel (renouvelé automatiquement jusqu’à résiliation dans les réglages de votre compte Apple) ou un accès à vie en achat unique."
 + stopka("Conditions d’utilisation", 'Politique de confidentialité'))
)

F2 = collections.OrderedDict()
F2['de-DE'] = dict(
 name='PokerGym: Poker lernen',
 subtitle='Entscheiden üben, ohne Einsatz',
 keywords='strategie,texas,holdem,gto,preflop,postflop,range,outs,odds,icm,turnier,kurs,quiz,trainer,anfänger',
 promotionalText='Poker von den Regeln bis zur Strategie lernen. Jede Entscheidung wird bewertet und erklärt. Kein Echtgeldspiel, kein Konto, keine Werbung.',
 description=(
 "PokerGym bringt dir Entscheidungen im No-Limit Texas Hold'em bei – von den Regeln und der Rangfolge der Hände bis zur Strategie auf jeder Street. Jeder Spielzug bekommt eine Bewertung und eine Erklärung, warum er gut oder schlecht ist. Es ist ein Kurs, kein Spiel: keine Einsätze, keine Chips zu gewinnen und kein Echtgeldspiel.\n\n"
 "KURS\n"
 "• Module der Reihe nach: Regeln und Handrangfolge, Ablauf einer Hand, Mathematik (Outs, Odds, Pot Odds), Position und Eröffnung, Preflop-Spiel, Flop, Turn, River, Handplanung (SPR), Spiel gegen typische Fehler schwächerer Spieler, Turniere (Push/Fold und ICM), Varianz und Tilt, Analyse des eigenen Spiels\n"
 "• Lektionen mit Übungen; Begriffe werden an Ort und Stelle und in einem Glossar erklärt\n"
 "• Ein kurzer Einstufungstest am Anfang (bis zu 8 Fragen, überspringbar) schlägt dir deine erste Lektion vor\n"
 "• Eine Modulprüfung (15 Fragen) lässt dich überspringen, was du schon kannst\n\n"
 "ÜBEN\n"
 "• Entscheidungen in vier Stufen bewertet\n"
 "• Nach jeder Antwort eine Erklärung mit den Zahlen\n"
 "• Aktion wählen, Zahl eingeben oder eine Hand-Range im Raster markieren\n"
 "• Kurze Übungseinheiten: jederzeit unterbrechen und bei derselben Frage weitermachen\n\n"
 "WIEDERHOLUNG UND FORTSCHRITT\n"
 "• Falsch beantwortete Fragen kommen in verteilten Wiederholungen zurück\n"
 "• Trefferquote, schwächste Fragetypen, Tagesserie und ein Fortschrittswert\n"
 "• Optionale tägliche Erinnerung\n\n"
 "DEINE DATEN\n"
 "• Funktioniert offline, ohne Konto, ohne Werbung und ohne Tracking\n"
 "• Der Fortschritt bleibt auf deinem Handy: Export in eine Datei, Import auf einem anderen Handy oder Löschen\n\n"
 "VERANTWORTUNGSVOLL SPIELEN\n"
 "• Ein Hilfe-Bildschirm zeigt, wo es Unterstützung bei Glücksspielproblemen gibt\n\n"
 "ZUGANG\n"
 "Lektionen, Einstufungstest und der erste Versuch jeder Modulprüfung sind immer kostenlos. Ohne Kauf hast du eine kostenlose Aktivität pro Tag: eine Übungseinheit, eine Wiederholung oder einen neuen Prüfungsversuch. Der Vollzugriff hebt dieses Limit auf: Quartals- oder Jahresabo (verlängert sich automatisch, bis es in den Einstellungen deines Apple Accounts gekündigt wird) oder ein dauerhafter Zugang per Einmalkauf."
 + stopka('Nutzungsbedingungen', 'Datenschutzerklärung'))
)
F2['es-ES'] = dict(
 name='PokerGym: aprende póker',
 subtitle='Entrena decisiones sin apostar',
 keywords='poker,texas,holdem,gto,preflop,postflop,rangos,outs,icm,torneo,curso,lecciones,entrenador,estrategia',
 promotionalText='Estudia póker desde las reglas hasta la estrategia. Cada decisión se califica y se explica. Sin juego con dinero real, sin cuenta, sin anuncios.',
 description=(
 "PokerGym enseña a tomar decisiones en No-Limit Texas Hold'em, desde las reglas y el ranking de manos hasta la estrategia en cada calle. Cada jugada recibe una calificación y una explicación de por qué es buena o mala. Es un curso, no un juego: no hay apuestas, ni fichas que ganar, ni juego con dinero real.\n\n"
 "CURSO\n"
 "• Módulos en orden: reglas y ranking de manos, cómo se desarrolla una mano, matemáticas (outs, odds, pot odds), posición y apertura, juego preflop, flop, turn, river, plan de la mano (SPR), jugar contra los errores comunes de jugadores más débiles, torneos (push/fold e ICM), varianza y tilt, análisis de tu propio juego\n"
 "• Lecciones con ejercicios; términos explicados donde aparecen y en un glosario\n"
 "• Una breve prueba de nivel al inicio (hasta 8 preguntas, se puede omitir) te indica la primera lección\n"
 "• Un examen de módulo (15 preguntas) te permite saltar lo que ya sabes\n\n"
 "PRÁCTICA\n"
 "• Decisiones calificadas en cuatro niveles\n"
 "• Una explicación con los números después de cada respuesta\n"
 "• Elige una acción, escribe un número o pinta un rango de manos en la cuadrícula\n"
 "• Sesiones cortas: detente cuando quieras y vuelve a la misma pregunta\n\n"
 "REPASOS Y PROGRESO\n"
 "• Las preguntas que fallaste vuelven en repasos espaciados\n"
 "• Porcentaje de aciertos, tipos de pregunta más débiles, racha de días y un índice de progreso\n"
 "• Recordatorio diario opcional\n\n"
 "TUS DATOS\n"
 "• Funciona sin conexión, sin cuenta, sin anuncios y sin rastreo\n"
 "• El progreso se queda en tu teléfono: expórtalo a un archivo, impórtalo en otro teléfono o bórralo\n\n"
 "JUEGO RESPONSABLE\n"
 "• Una pantalla de Ayuda indica dónde buscar apoyo ante problemas con el juego\n\n"
 "ACCESO\n"
 "Las lecciones, la prueba de nivel y el primer intento de cada examen de módulo son siempre gratis. Sin compra tienes una actividad gratis al día: una sesión de práctica, una sesión de repaso o un nuevo intento de examen. El acceso completo elimina ese límite: suscripción trimestral o anual (se renueva automáticamente hasta que la canceles en los ajustes de tu Cuenta de Apple) o un acceso de por vida con pago único."
 + stopka('Condiciones de uso', 'Política de privacidad'))
)
F2['ko'] = dict(
 name='PokerGym: 홀덤 포커 배우기',
 subtitle='결정마다 평가와 해설, 베팅 없음',
 keywords='텍사스홀덤,프리플랍,포스트플랍,토너먼트,gto,icm,트레이너,홀덤공부',
 promotionalText='규칙부터 전략까지 포커를 배우세요. 모든 결정에 평가와 ‘왜’에 대한 해설이 있습니다. 실제 돈 게임과 광고가 없고, 계정 없이 사용합니다.',
 description=(
 "PokerGym은 노리밋 텍사스 홀덤(No-Limit Texas Hold'em)에서 결정을 내리는 법을 가르칩니다. 규칙과 족보부터 각 스트리트의 전략까지 배웁니다. 모든 플레이에 평가가 붙고, 왜 좋은지 또는 나쁜지 해설합니다. 이것은 게임이 아니라 강좌입니다. 베팅도, 딸 수 있는 칩도, 실제 돈 게임도 없습니다.\n\n"
 "강좌\n"
 "• 순서대로 진행하는 모듈: 규칙과 족보, 한 핸드의 진행, 수학(아웃츠, 오즈, 팟 오즈), 포지션과 오픈, 프리플랍, 플랍, 턴, 리버, 핸드 계획(SPR), 약한 플레이어의 흔한 실수에 대응하기, 토너먼트(푸시/폴드와 ICM), 분산과 틸트, 자신의 플레이 분석\n"
 "• 연습 문제가 있는 레슨, 용어는 나오는 곳과 용어집에서 설명\n"
 "• 시작할 때 짧은 레벨 테스트(최대 8문제, 건너뛰기 가능)로 첫 레슨 추천\n"
 "• 모듈 시험(15문제)으로 이미 아는 내용은 건너뛰기\n\n"
 "연습\n"
 "• 결정을 네 단계로 평가\n"
 "• 모든 답에 숫자를 곁들인 해설\n"
 "• 액션 선택, 숫자 입력, 그리드에서 핸드 레인지 칠하기\n"
 "• 짧은 연습 세션: 언제든 멈추고 같은 문제로 돌아오기\n\n"
 "복습과 진도\n"
 "• 틀린 문제는 간격 반복 복습으로 다시 출제\n"
 "• 정답률, 가장 약한 문제 유형, 연속 일수, 실력 지수\n"
 "• 매일 알림(선택 사항)\n\n"
 "내 데이터\n"
 "• 오프라인으로 작동, 계정·광고·추적 없음\n"
 "• 진도는 내 휴대폰에만 저장: 파일로 내보내기, 다른 휴대폰에서 가져오기, 진도 삭제\n\n"
 "책임감 있는 플레이\n"
 "• ‘도움말’ 화면에서 도박 문제 상담처 안내\n\n"
 "이용 방법\n"
 "레슨, 레벨 테스트, 각 모듈 시험의 첫 응시는 항상 무료입니다. 구매하지 않으면 하루에 무료 활동 1개(연습 세션, 복습 또는 시험 재응시)를 이용할 수 있습니다. 전체 이용권은 이 제한을 없앱니다: 분기 또는 연간 구독(Apple 계정 설정에서 해지할 때까지 자동 갱신) 또는 1회 결제 평생 이용."
 + stopka('이용 약관', '개인정보 처리방침'))
)
F2['it'] = dict(
 name='PokerGym: impara il poker',
 subtitle='Decidi meglio, senza puntate',
 keywords='strategia,texas,holdem,gto,preflop,postflop,range,outs,odds,icm,torneo,corso,lezioni,allenamento',
 promotionalText='Studia il poker dalle regole alla strategia. Ogni decisione riceve un voto e una spiegazione. Niente gioco con soldi veri, niente account, niente pubblicità.',
 description=(
 "PokerGym insegna a prendere decisioni nel No-Limit Texas Hold'em, dalle regole e dalla scala dei punti fino alla strategia su ogni street. Ogni giocata riceve un voto e una spiegazione del perché è buona o cattiva. È un corso, non un gioco: niente puntate, niente fiches da vincere e niente gioco con soldi veri.\n\n"
 "CORSO\n"
 "• Moduli in ordine: regole e punti, come si svolge una mano, matematica (outs, odds, pot odds), posizione e apertura, gioco preflop, flop, turn, river, piano della mano (SPR), giocare contro gli errori comuni dei giocatori più deboli, tornei (push/fold e ICM), varianza e tilt, analisi del proprio gioco\n"
 "• Lezioni con esercizi; termini spiegati dove compaiono e in un glossario\n"
 "• Un breve test di livello all’inizio (fino a 8 domande, si può saltare) indica la prima lezione\n"
 "• Un esame di modulo (15 domande) ti fa saltare ciò che sai già\n\n"
 "ESERCIZI\n"
 "• Decisioni valutate su quattro livelli\n"
 "• Una spiegazione con i numeri dopo ogni risposta\n"
 "• Scegli un’azione, inserisci un numero o colora un range di mani sulla griglia\n"
 "• Sessioni brevi: fermati quando vuoi e riprendi dalla stessa domanda\n\n"
 "RIPASSI E PROGRESSI\n"
 "• Le domande sbagliate tornano in ripassi distanziati nel tempo\n"
 "• Precisione, tipi di domanda più deboli, serie di giorni e un indice di avanzamento\n"
 "• Promemoria giornaliero facoltativo\n\n"
 "I TUOI DATI\n"
 "• Funziona offline, senza account, senza pubblicità e senza tracciamento\n"
 "• I progressi restano sul telefono: esportali in un file, importali su un altro telefono o cancellali\n\n"
 "GIOCO RESPONSABILE\n"
 "• Una schermata Aiuto indica dove trovare supporto per i problemi di gioco d’azzardo\n\n"
 "ACCESSO\n"
 "Le lezioni, il test di livello e il primo tentativo di ogni esame di modulo sono sempre gratuiti. Senza acquisto hai un’attività gratuita al giorno: una sessione di esercizi, un ripasso o un nuovo tentativo d’esame. L’accesso completo toglie questo limite: abbonamento trimestrale o annuale (si rinnova automaticamente finché non lo annulli nelle impostazioni del tuo Account Apple) o uno sblocco a vita con pagamento unico."
 + stopka("Condizioni d’uso", 'Informativa sulla privacy'))
)
F2['vi'] = dict(
 name='PokerGym: học poker',
 subtitle='Tập quyết định, không cá cược',
 keywords='texas,holdem,gto,preflop,postflop,range,outs,odds,icm,quiz,trainer,tilt,strategy,chiến,thuật',
 promotionalText='Học poker từ luật chơi đến chiến thuật. Mỗi quyết định đều được chấm điểm và giải thích. Không chơi bằng tiền thật, không cần tài khoản, không quảng cáo.',
 description=(
 "PokerGym dạy cách ra quyết định trong No-Limit Texas Hold'em, từ luật chơi và thứ hạng các tay bài đến chiến thuật ở từng vòng. Mỗi nước đi đều được chấm điểm và giải thích vì sao tốt hay chưa tốt. Đây là một khóa học, không phải trò chơi: không có tiền cược, không có chip để thắng và không chơi bằng tiền thật.\n\n"
 "KHÓA HỌC\n"
 "• Các học phần theo thứ tự: luật và thứ hạng tay bài, diễn biến một ván, toán (outs, odds, pot odds), vị trí và mở cược, giai đoạn preflop, flop, turn, river, lập kế hoạch ván bài (SPR), đối phó với lỗi thường gặp của người chơi yếu hơn, giải đấu (push/fold và ICM), phương sai và tilt, phân tích lối chơi của chính bạn\n"
 "• Bài học kèm bài tập; thuật ngữ được giải thích ngay tại chỗ và trong bảng thuật ngữ\n"
 "• Bài kiểm tra trình độ ngắn lúc đầu (tối đa 8 câu, có thể bỏ qua) gợi ý bài học đầu tiên\n"
 "• Bài thi học phần (15 câu) giúp bạn bỏ qua phần đã biết\n\n"
 "LUYỆN TẬP\n"
 "• Quyết định được chấm theo bốn mức\n"
 "• Sau mỗi câu trả lời có lời giải thích kèm con số\n"
 "• Chọn hành động, nhập số hoặc tô range tay bài trên lưới\n"
 "• Buổi luyện tập ngắn: dừng bất cứ lúc nào và quay lại đúng câu đó\n\n"
 "ÔN TẬP VÀ TIẾN ĐỘ\n"
 "• Câu hỏi bạn trả lời sai sẽ quay lại trong các lượt ôn tập giãn cách\n"
 "• Tỷ lệ đúng, dạng câu hỏi yếu nhất, chuỗi ngày và chỉ số tiến bộ\n"
 "• Nhắc nhở hằng ngày (tùy chọn)\n\n"
 "DỮ LIỆU CỦA BẠN\n"
 "• Hoạt động ngoại tuyến, không cần tài khoản, không quảng cáo, không theo dõi\n"
 "• Tiến độ chỉ nằm trên điện thoại của bạn: xuất ra tệp, nhập vào điện thoại khác hoặc xóa tiến độ\n\n"
 "CHƠI CÓ TRÁCH NHIỆM\n"
 "• Màn hình Trợ giúp cho biết nơi tìm hỗ trợ khi gặp vấn đề với cờ bạc\n\n"
 "QUYỀN TRUY CẬP\n"
 "Bài học, bài kiểm tra trình độ và lần thi đầu tiên của mỗi học phần luôn miễn phí. Nếu không mua, bạn có một hoạt động miễn phí mỗi ngày: một buổi luyện tập, một lượt ôn tập hoặc một lần thi lại. Truy cập đầy đủ bỏ giới hạn này: gói đăng ký theo quý hoặc theo năm (tự động gia hạn cho đến khi bạn hủy trong cài đặt Tài khoản Apple) hoặc mở khóa trọn đời với một lần thanh toán."
 + stopka('Điều khoản sử dụng', 'Chính sách quyền riêng tư'))
)

if __name__ == '__main__':
  import sys
  if '--tylko-fala2' not in sys.argv:  # przegląd językowy 2026-11-09: fala 2 bez dotykania store/ (fala 1 = sesja kodu)
    p = 'store/app-store-metadata.json'
    m = json.load(open(p), object_pairs_hook=collections.OrderedDict)
    for k, v in L.items(): m['lokalizacje'][k] = v
    m['_aliasy']['fr-CA'] = 'fr-FR'
    json.dump(m, open(p, 'w'), ensure_ascii=False, indent=2); open(p, 'a').write('\n')
  f2 = collections.OrderedDict(_opis='Fala 2 (D-374): de-DE, es-ES, es-MX (= es-ES), ko, it, vi. Poza store/, bo scripts/asc/metadane.mjs LOCALE_MAP nie zna tych kodów (walidacja zablokowałaby cały zapis). Przeniesienie do store/ po dopisaniu kodów do LOCALE_MAP (sesja kodu). Źródło: docs/sklep/aso/zbuduj-metadane.py; uzasadnienie: docs/sklep/aso/README.md.', _aliasy={'es-MX': 'es-ES'}, lokalizacje=F2)
  json.dump(f2, open('docs/sklep/aso/metadane-fala2.json', 'w'), ensure_ascii=False, indent=2); open('docs/sklep/aso/metadane-fala2.json', 'a').write('\n')
  for d in (L, F2):
    for k, v in d.items(): print(k, {f: (len(v[f]) if f != 'keywords' else f'{len(v[f].encode())}B') for f in v})
