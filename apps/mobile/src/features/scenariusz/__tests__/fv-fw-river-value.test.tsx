/// <reference types="jest" />
// FW-02 (docs/design/fw-river-value-i-mieszana.md §2, D-1501; FV): dziennik river-value przed decyzją ma wpis rywala „czeka” (play.log.check, pozycja rywala), bez nowego klucza.
// Kryterium 3: brak wiersza puli i kwoty (utrwala akceptację stanu FR). FW-01 (zakres sprawdzenia pod stołem): tu tylko logika `zakresSprawdzenia`; zdanie
// `scenario.riverValue.calls/sep` czeka na klucze we wszystkich słownikach (09, decyzja KO-097), więc ekranu nie renderujemy.
import '@/i18n';
import { render } from '@testing-library/react-native';
import type { ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import { zakresSprawdzenia, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const POZIOM: ScenarioLevel = 'latwy';
const CALLS = ['AJs', 'AJo', 'KJs', '88', '55', 'AKs', 'KQo'];
const FOLDS = ['76s', '65s', '54s', 'T9s', '98s'];
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-river-value', module: 'm8', situation: 'Fixture: river z pozycji.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: [], marginMin: 0.05, expected: ['bet'] } },
  decisions: [{
    street: 'river', kind: 'river-value', rule: 'R-M4-004', calls: CALLS, folds: FOLDS, pairKind: ['overpair'], dryBoard: true,
    actions: [
      { action: 'bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, więcej sprawdzających rąk jest gorszych od twojej niż lepszych.' },
      { action: 'check', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, sprawdzą głównie lepsze ręce.' },
    ],
  }],
});
const w = wariantFg(SZABLON, POZIOM, 3);
const decyzja = (wybory: Akcja[] = []) => render(<PrzebiegScenariusza sesja={sesjaFg(SZABLON, POZIOM, w, wybory)} faza="decyzja" koniec={false} onWybierz={jest.fn()} {...propsFg()} />);
const bezNbsp = (x: string) => x.replace(/\s/g, ' ');

describe('FW-02: wpis rywala przed decyzją river-value', () => {
  it('dziennik zawiera play.log.check z pozycją rywala, a brak wiersza puli i kwoty (kryterium 3)', async () => {
    await decyzja();
    const tekst = bezNbsp(tekstEkranu());
    expect(tekst).toContain(bezNbsp(t('play.log.check', { pos: 'BB' })));
    expect(tekst).not.toMatch(/W puli|Pula/);
  });
  it('po decyzji do wpisu rywala dochodzi twój ruch (jak dotąd)', async () => {
    await render(<PrzebiegScenariusza sesja={sesjaFg(SZABLON, POZIOM, w, ['bet'])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
    const tekst = bezNbsp(tekstEkranu());
    expect(tekst).toContain(bezNbsp(t('play.log.check', { pos: 'BB' })));
    expect(tekst).toContain('BTN');
  });
});

describe('FW-01 (logika): zakres sprawdzenia rywala z szablonu', () => {
  it('klasy z calls w kolejności szablonu, żadna z folds; null dla punktu bez zakresu', () => {
    expect(zakresSprawdzenia(SZABLON, 0)).toEqual(CALLS);
    for (const f of FOLDS) expect(zakresSprawdzenia(SZABLON, 0)).not.toContain(f);
    expect(zakresSprawdzenia(SZABLON, 5)).toBeNull();
  });
});
