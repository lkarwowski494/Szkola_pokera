// HL (D-1670): wejście zastępcze Expo web wyłącznie do zrzutów ekranów scenariusza; produkcyjny build go nie ładuje.
// Podstawia je metro.config.js zamiast `expo-router/entry`, gdy SZKOLA_ZRZUTY=1 (eksport web). Pełna aplikacja nie startuje na web
// (expo-file-system i kopiowanie bazy treści nie działają w przeglądarce), więc renderujemy prawdziwe komponenty ekranu z danych testowych.
// Wybór ekranu: `?ekran=start|decyzja|ocena-zgodna|ocena-blad`, motyw: `?tryb=jasny|ciemny` (domyślnie z przeglądarki).
// HX (D-1730, D-1734…D-1736): dodatkowe ekrany `start-sc29` i `start-sc04` (tytuły z bazy pl, tekst już ze znacznikami rozwiniętymi) oraz `iso-co` i `iso-sb`
// (widok limperów: szablony-fikcje punktu iso-size jak SC-09, której treść jeszcze nie istnieje; zakres otwarcia i reguła rozmiaru złożone tu, bez bazy).
// IB (KO-115, D-1841): ekrany `ib-spr-call`, `ib-check-raise`, `ib-turn-action`, `ib-geo-size`, `ib-nit-3bet` (decyzja) i `ocena-ib-check-raise` — warianty złożone ręcznie
// (fikstura: karty i liczby jak z generatora, bez bazy treści i macierzy equity), szablony jak fixtures HO w tools/content-build/test/fixtures.
// IJ (D-1908): ekrany `po-ocenie` (PanelDecyzji z lekcji/sesji po ocenie: pasek strategii z podpisami `PoOcenie`, wybór „Sprawdzenie”) i `po-ocenie-pas` (wybór „Pas”,
// 3 akcje, jedna rzadka) — nazwy akcji z `scenario.action.*` w języku przeglądarki, jak w aplikacji.
import '@/i18n';
import { registerRootComponent } from 'expo';
import i18n from 'i18next';
import { View } from 'react-native';
import { ScenarioTemplate } from '@szkola/content-schema';
import { geometricFraction, HAND_CLASSES, parseCards, type Card, type GeneratorContext, type ScenarioVariant, type VariantDecision } from '@szkola/poker-core';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PrzebiegScenariusza, StartScenariusza } from '@/features/scenariusz/EkranScenariusza';
import type { Akcja } from '@/features/scenariusz/wariant';
import { sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PanelDecyzji } from '@/features/stol/PanelDecyzji';
import type { ChoiceInstance } from '@/features/drills/types';

const brak = () => undefined;
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-zrzut-river-value', module: 'm8', situation: 'River z pozycji: masz overparę na suchym stole, rywal czeka.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: [], marginMin: 0.05, expected: ['bet'] } },
  decisions: [{
    street: 'river', kind: 'river-value', rule: 'R-M4-004',
    calls: ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'],
    folds: ['76s', '65s', '54s', 'T9s', '98s'], pairKind: ['overpair'], dryBoard: true,
    actions: [
      { action: 'bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, więcej sprawdzających rąk jest gorszych od twojej niż lepszych.' },
      { action: 'check', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, sprawdzą głównie lepsze ręce.' },
    ],
  }],
});
const SC29 = 'Na riverze masz najwyższą parę (top pair), jesteś na Buttonie, a duży blind (big blind, BB) czeka (check). Rywal to pasywny gracz rekreacyjny (recreational player): VPIP (voluntarily put in pot) od ok. 35%, a PFR (preflop raise) niższy o ponad 10 punktów. Załóż, że nie przebija (raise): sprawdzi (call) z JJ, TT i z każdym AK, AQ, AJ, AT, KQ, KJ, QJ i JT, a spasuje (fold) z każdym KT i QT. Stawiasz (bet) czy czekasz?';
const SC04 = 'Jesteś na UTG (under the gun), nikt jeszcze nie wszedł do gry. Jeśli otworzysz (open), duży blind (big blind, BB) sprawdzi (call) i na flopie poczeka (check).';
const akcjeIso = ['raise', 'raise-small', 'raise-big'].map((action) => ({ action, explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. Wyjaśnienie.' }));
const iso = (id: string, hero: string, villain: string, limpers: number) => ({
  id, module: 'm4', situation: 'Przed tobą są limperzy.', table: '6max', positions: { hero, villain }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['raise'], draws: [], reject: [] } },
  decisions: [{ street: 'preflop', kind: 'size-spot', check: 'iso-size', rule: 'R-M4-012', limpers, actions: akcjeIso }],
}) as unknown as ScenarioTemplate;
const ctxIso = (spot: string, klasa: string): GeneratorContext => ({
  spots: [{ id: spot, uncertain: [], actions: [{ label: 'raise', freqs: HAND_CLASSES.map((k) => (k === klasa ? 1 : 0)) }] }],
  thresholds: { mixedMin: 0.1, mixedLow: 0.3 },
  sizeRules: [{ id: 'R-M4-012', check: { kind: 'iso-size', params: { base: 3, perLimper: 1, oopExtra: 1 } } }],
});
const ISO_CO = iso('sc-hx-iso-co', 'CO', 'HJ', 1);
const ISO_SB = iso('sc-hx-iso-sb', 'SB', 'BTN', 2);
const wyjIb = (a: string, z: string) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. ${z}` });
const szablonIb = (id: string, module: string, hero: string, villain: string, stackBb: number, decyzja: Record<string, unknown>) => ScenarioTemplate.parse({
  id, module, situation: 'Fikstura zrzutu.', table: '6max', positions: { hero, villain }, stackBb, levels: ['latwy'], bounds: { latwy: { expected: ['call'] } }, decisions: [decyzja],
});
const wariantIb = (id: string, karty: string, point: VariantDecision): ScenarioVariant => {
  const k = parseCards(karty);
  return { templateId: id, level: 'latwy', seed: 1, hero: [k[0], k[1]] as [Card, Card], villain: [k[2], k[3]] as [Card, Card], board: k.slice(4), decisions: [], points: [point], fingerprint: id };
};
const gf = geometricFraction(130 / 25, 3);
const IB: Record<string, { szablon: ScenarioTemplate; wariant: ScenarioVariant; wybor?: Akcja }> = {
  'ib-spr-call': {
    szablon: szablonIb('sc-ib-spr', 'm9', 'BB', 'BTN', 14, { street: 'flop', kind: 'spr-call', rule: 'R-M9-002', spot: 'vs-open.bb-vs-btn', pots: [5.5], stacks: [11], actions: [wyjIb('call', 'SPR ok. {{w:spr}}: sprawdzasz.'), wyjIb('fold', 'SPR ok. {{w:spr}}: pas oddaje pulę.')] }),
    wariant: wariantIb('sc-ib-spr', 'AhKd QsQc Ks7c2dTd3h', { point: 'spr-call', street: 'flop', pot: 5.5, stack: 11, spr: 2, required: 11 / 27.5, pairKind: 'top', correct: 'call' }),
  },
  'ib-check-raise': {
    szablon: szablonIb('sc-ib-xr', 'm6', 'BB', 'BTN', 100, { street: 'flop', kind: 'check-raise', rule: 'R-M6-008', spot: 'vs-open.bb-vs-btn', pots: [6], cbet: 1 / 3, multipliers: { big: 4.5, small: 1.5 }, actions: [wyjIb('fold', 'Pas oddaje draw.'), wyjIb('call', 'Sprawdzenie też jest dobre.'), wyjIb('raise-small', 'Zbyt małe podbicie.'), wyjIb('raise-big', 'Duże check-raise.')] }),
    wariant: wariantIb('sc-ib-xr', '9h8h AsKc 7h6c2hJd4s', { point: 'check-raise', street: 'flop', pot: 6, cbet: 2, raiseBig: 9, raiseSmall: 3, requiredBig: 7 / 24, requiredSmall: 1 / 12, drawKind: 'flush', outs: 15, correct: 'raise-big' }),
    wybor: 'raise-small',
  },
  'ib-turn-action': {
    szablon: szablonIb('sc-ib-turn', 'm7', 'BTN', 'BB', 100, { street: 'turn', kind: 'turn-action', rule: 'R-M7-001', actions: [wyjIb('check', 'Czekanie jest dopuszczalne.'), wyjIb('bet-big', 'Nadkarta paruje twoją rękę, zakład.')] }),
    wariant: wariantIb('sc-ib-turn', 'KhQd Jc9h 9c5s2dKc4h', { point: 'turn-action', street: 'turn', turnClass: 'overcard', pairKind: 'top', correct: 'bet-big' }),
  },
  'ib-geo-size': {
    szablon: szablonIb('sc-ib-geo', 'm9', 'BTN', 'CO', 100, { street: 'flop', kind: 'geo-size', rule: 'R-M9-009', pots: [25], stacks: [130], streets: 3, small: 1 / 3, actions: [wyjIb('bet-small', 'SPR {{w:spr}}: zakład {{w:rozmiar}} puli nie wpłaci stacku.'), wyjIb('bet-big', 'SPR {{w:spr}}: zakład {{w:rozmiar}} puli wpłaci cały stack.')] }),
    wariant: wariantIb('sc-ib-geo', '7h7d AcQc 7sKc2d9h3s', { point: 'geo-size', street: 'flop', pot: 25, stack: 130, spr: 5.2, streets: 3, fractionBig: gf, fractionSmall: 1 / 3, smallTotal: 25 / 3 + 125 / 9 + 625 / 27, correct: 'bet-big' }),
  },
  'ib-nit-3bet': {
    szablon: ScenarioTemplate.parse({ ...szablonIb('sc-ib-nit', 'm10', 'BTN', 'BB', 100, { street: 'preflop', kind: 'nit-3bet', rule: 'R-M10-007', open: 2.5, threeBet: 10, vpips: [0.08], actions: [wyjIb('fold', 'VPIP {{w:vpip}}: pas.'), wyjIb('call', 'VPIP {{w:vpip}}: sprawdzenie to niedokładność.')] }), situation: 'Bardzo ciasny rywal 3-betuje. Otworzyłeś z Buttona, a duży blind 3-betuje.' }),
    wariant: wariantIb('sc-ib-nit', 'Ah9d QsQd Kc8d3h2s5c', { point: 'nit-3bet', street: 'preflop', handClass: 'A9o', vpip: 0.08, open: 2.5, threeBet: 10, required: 7.5 / 20.5, equity: 0.3, correct: 'fold' }),
  },
};
const wariant = wariantFg(SZABLON, 'latwy', 3);
const punkt = wariant.points[0];
const poprawna = (punkt && 'correct' in punkt ? punkt.correct : 'bet') as Akcja;
const bledna: Akcja = poprawna === 'bet' ? 'check' : 'bet';

const wielka = (x: string): string => x.charAt(0).toLocaleUpperCase() + x.slice(1);
/** IJ: zadanie ze strategią solvera jak w lekcji (CO, J9o): częstości 0,10 / 0,70 / 0,20; nazwy akcji z i18n w języku przeglądarki. */
function zadanieStrategii(): ChoiceInstance {
  const nazwa = (a: string) => wielka(i18n.t(`scenario.action.${a}`));
  return {
    kind: 'choice', key: 'k', drillId: 'rfi.co', family: 'rfi', lessonId: null, rules: [], prompt: 'CO, wszyscy przed tobą spasowali', table: { hand: ['Jc', '9d'], position: 'CO', path: 'UTG:fold,HJ:fold' },
    options: [
      { text: nazwa('fold'), correct: false, why: 'Solver pasuje z tą ręką w 10% przypadków.', czestosc: 0.1, pas: true },
      { text: nazwa('call'), correct: true, why: 'Solver sprawdza z tą ręką w 70% przypadków.', czestosc: 0.7 },
      { text: nazwa('raise'), correct: false, acceptable: true, why: 'Solver podbija z tą ręką w 20% przypadków.', czestosc: 0.2 },
    ],
  } as unknown as ChoiceInstance;
}

function Ekran({ ekran }: { ekran: string }) {
  if (ekran === 'po-ocenie' || ekran === 'po-ocenie-pas') {
    const pas = ekran === 'po-ocenie-pas';
    return <View style={{ padding: 16 }}><PanelDecyzji item={zadanieStrategii()} rekord={{ answer: { kind: 'choice', index: pas ? 0 : 1 }, grade: pas ? 'acceptable' : 'correct' }} /></View>;
  }
  const ib = IB[ekran.replace(/^ocena-/, '')];
  if (ib) {
    const wybory: Akcja[] = ekran.startsWith('ocena-') && ib.wybor ? [ib.wybor] : [];
    return <PrzebiegScenariusza sesja={sesjaFg(ib.szablon, 'latwy', ib.wariant, wybory)} faza={wybory.length ? 'ocena' : 'decyzja'} koniec={wybory.length > 0} bladZapisu={false} onWybierz={brak} onDalej={brak} onZakoncz={brak} />;
  }
  if (ekran === 'iso-co' || ekran === 'iso-sb') {
    const co = ekran === 'iso-co';
    const szablon = co ? ISO_CO : ISO_SB;
    const w = wariantFg(szablon, 'latwy', 3, ctxIso(co ? 'rfi.co' : 'rfi.sb', co ? 'AJo' : '99'));
    return <PrzebiegScenariusza sesja={sesjaFg(szablon, 'latwy', w, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={brak} onDalej={brak} onZakoncz={brak} />;
  }
  if (ekran === 'start' || ekran === 'start-sc29' || ekran === 'start-sc04') {
    const szablon = ekran === 'start-sc29' ? { ...SZABLON, situation: SC29 } : ekran === 'start-sc04' ? { ...SZABLON, situation: SC04 } : SZABLON;
    return <StartScenariusza szablon={szablon} tytulModulu="Moduł 8" wybor="auto" poziom="latwy" zastapiony={false} limit={{ bezLimitu: true }} strefa="Europe/Warsaw" onWybierz={brak} onStart={brak} onLimitWyczerpany={brak} onWroc={brak} />;
  }
  const wybory: Akcja[] = ekran === 'decyzja' ? [] : [ekran === 'ocena-blad' ? bledna : poprawna];
  return <PrzebiegScenariusza sesja={sesjaFg(SZABLON, 'latwy', wariant, wybory)} faza={ekran === 'decyzja' ? 'decyzja' : 'ocena'} koniec bladZapisu={false} onWybierz={brak} onDalej={brak} onZakoncz={brak} />;
}

function App() {
  const ekran = new URLSearchParams(globalThis.location?.search ?? '').get('ekran') ?? 'decyzja';
  return (
    <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 0, bottom: 0, left: 0, right: 0 } }}>
      <Ekran ekran={ekran} />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
