/// <reference types="jest" />
// 08-programista-302 (GB; recenzja FX, KO-099): test regresji 204 dla akcji innych niż raise. `reakcjaGracza` ma trzy gałęzie z kwotą
// (call, raise, all-in) i gałąź „brak kwoty zostaje brakiem” (DEV-07): każda ma własny przypadek (mutanty M9, M10, M11 z dowody/gb-mutanty-301-304.txt).
// Wariant range-spot składany ręcznie (jak TROJBET w fm-turn-bet-ekran): kwota „call” = stos − blind gracza (wariant.ts kwotaAkcji), SB: 100 − 0,5 = 99,5 bb.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { formatujLiczbe } from '@szkola/jezyki';
import type { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { jezykZadan } from '@/features/drills/text';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { Akcja } from '../wariant';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const fmt = (x: number) => formatujLiczbe(x, jezykZadan());
const bezNbsp = (x: string) => x.replace(/\s/g, ' ');

function sesjaRangeSpot(stackBb: number | undefined, wybor: Akcja): SesjaScenariusza {
  const szablon = { id: 'sc-gb-302', module: 'm3', situation: '-', table: '6max', positions: { hero: 'SB', villain: 'BB' }, ...(stackBb === undefined ? {} : { stackBb }), levels: ['latwy'], decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'call.sb', rule: 'R-M3-003', actions: ['fold', 'call', 'all-in'].map((action) => ({ action, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. Wyjaśnienie ${action}.` })) }] } as unknown as ScenarioTemplate;
  const wariant = {
    templateId: 'sc-gb-302', level: 'latwy', seed: 1, hero: [48, 44], villain: [0, 5], board: [8, 13, 18, 23, 29], decisions: [], fingerprint: 'gb-302',
    points: [{ point: 'range-spot', street: 'preflop', spot: 'call.sb', handClass: 'AKs', options: ['fold', 'call', 'all-in'].map((action) => ({ action, f: 0.3, verdict: 'correct' })), correct: 'call', freq: 0.3 }],
  };
  return { id: 's1', szablon, poziom: 'latwy', wariant, wybory: [wybor], aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-12', strefa: 'Europe/Warsaw', startMs: 0, krok: 1, plan: { liczbaKrokow: 1, trescId: 'sc-gb-302' } } } as unknown as SesjaScenariusza;
}
const dziennik = async (s: SesjaScenariusza): Promise<string> => {
  await render(<PrzebiegScenariusza sesja={s} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
  return bezNbsp(tekstEkranu());
};

describe('08-programista-302: dziennik range-spotu z liczbami wg języka i brakiem zostającym brakiem', () => {
  it('call z ułamkiem (SB, stos 100): „99,5 bb” przez formatujLiczbe (M9: bez formatowania daje „99.5”)', async () => {
    const tekst = await dziennik(sesjaRangeSpot(100, 'call'));
    expect(fmt(99.5)).toBe('99,5');
    expect(tekst).toContain(bezNbsp(t('play.log.call', { pos: 'SB', bb: fmt(99.5) })));
    expect(tekst).not.toMatch(/SB: [^.]*\d\.\d+ bb/);
  });
  it('all-in (SB, stos 12,5): „12,5 bb” przez formatujLiczbe (M10: bez formatowania daje „12.5”)', async () => {
    const tekst = await dziennik(sesjaRangeSpot(12.5, 'all-in'));
    expect(fmt(12.5)).toBe('12,5');
    expect(tekst).toContain(bezNbsp(t('play.log.allin', { pos: 'SB', bb: fmt(12.5) })));
    expect(tekst).not.toMatch(/SB: [^.]*\d\.\d+ bb/);
  });
  it('call bez stackBb w szablonie: kwota zostaje brakiem (fraza akcji), nie „0 bb” (M11: powrót do bb ?? 0)', async () => {
    const tekst = await dziennik(sesjaRangeSpot(undefined, 'call'));
    expect(tekst).not.toContain(bezNbsp(t('play.log.call', { pos: 'SB', bb: fmt(0) })));
    expect(tekst).not.toMatch(/SB[^.]*\b0 bb/);
    expect(tekst).toMatch(/SB: \S+/);
  });
});
