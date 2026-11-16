// HL (D-1670): wejście zastępcze Expo web wyłącznie do zrzutów ekranów scenariusza; produkcyjny build go nie ładuje.
// Podstawia je metro.config.js zamiast `expo-router/entry`, gdy SZKOLA_ZRZUTY=1 (eksport web). Pełna aplikacja nie startuje na web
// (expo-file-system i kopiowanie bazy treści nie działają w przeglądarce), więc renderujemy prawdziwe komponenty ekranu z danych testowych.
// Wybór ekranu: `?ekran=start|decyzja|ocena-zgodna|ocena-blad`, motyw: `?tryb=jasny|ciemny` (domyślnie z przeglądarki).
// HX (D-1730, D-1734…D-1736): dodatkowe ekrany `start-sc29` i `start-sc04` (tytuły z bazy pl, tekst już ze znacznikami rozwiniętymi) oraz `iso-co` i `iso-sb`
// (widok limperów: szablony-fikcje punktu iso-size jak SC-09, której treść jeszcze nie istnieje; zakres otwarcia i reguła rozmiaru złożone tu, bez bazy).
import '@/i18n';
import { registerRootComponent } from 'expo';
import { ScenarioTemplate } from '@szkola/content-schema';
import { HAND_CLASSES, type GeneratorContext } from '@szkola/poker-core';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PrzebiegScenariusza, StartScenariusza } from '@/features/scenariusz/EkranScenariusza';
import type { Akcja } from '@/features/scenariusz/wariant';
import { sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';

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
const wariant = wariantFg(SZABLON, 'latwy', 3);
const punkt = wariant.points[0];
const poprawna = (punkt && 'correct' in punkt ? punkt.correct : 'bet') as Akcja;
const bledna: Akcja = poprawna === 'bet' ? 'check' : 'bet';

function Ekran({ ekran }: { ekran: string }) {
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
