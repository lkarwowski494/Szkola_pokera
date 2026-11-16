// HL (D-1670): wejście zastępcze Expo web wyłącznie do zrzutów ekranów scenariusza; produkcyjny build go nie ładuje.
// Podstawia je metro.config.js zamiast `expo-router/entry`, gdy SZKOLA_ZRZUTY=1 (eksport web). Pełna aplikacja nie startuje na web
// (expo-file-system i kopiowanie bazy treści nie działają w przeglądarce), więc renderujemy prawdziwe komponenty ekranu z danych testowych.
// Wybór ekranu: `?ekran=start|decyzja|ocena-zgodna|ocena-blad`, motyw: `?tryb=jasny|ciemny` (domyślnie z przeglądarki).
import '@/i18n';
import { registerRootComponent } from 'expo';
import { ScenarioTemplate } from '@szkola/content-schema';
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
const wariant = wariantFg(SZABLON, 'latwy', 3);
const punkt = wariant.points[0];
const poprawna = (punkt && 'correct' in punkt ? punkt.correct : 'bet') as Akcja;
const bledna: Akcja = poprawna === 'bet' ? 'check' : 'bet';

function Ekran({ ekran }: { ekran: string }) {
  if (ekran === 'start') {
    return <StartScenariusza szablon={SZABLON} tytulModulu="Moduł 8" wybor="auto" poziom="latwy" zastapiony={false} limit={{ bezLimitu: true }} strefa="Europe/Warsaw" onWybierz={brak} onStart={brak} onLimitWyczerpany={brak} onWroc={brak} />;
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
