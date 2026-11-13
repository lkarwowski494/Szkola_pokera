/// <reference types="jest" />
// KO-102 (GB; obserwacja z sesji GB, polecenie koordynatora): stos w wierszach stołu (`scenario.table.seat`) przez `formatujLiczbe` wg języka zadań,
// jak każda kwota w bb na tym ekranie (DEV-16; 08-programista-204). Przed poprawką stos 12,5 bb pokazywał „12.5 bb” w pl i de (surowa liczba z JS).
// Test idzie prawdziwą ścieżką (ekran scenariusza), nie samym komponentem. Wygląd bez zmian poza separatorem dziesiętnym.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { formatujLiczbe } from '@szkola/jezyki';
import type { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { jezykZadan } from '@/features/drills/text';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;

function sesja(stackBb: number): SesjaScenariusza {
  const szablon = { id: 'sc-gb-ko102', module: 'm3', situation: '-', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb, levels: ['latwy'], decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'rfi.btn', rule: 'R-M3-003', actions: ['raise 2.5', 'fold'].map((action) => ({ action, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. Wyjaśnienie ${action}.` })) }] } as unknown as ScenarioTemplate;
  const wariant = {
    templateId: 'sc-gb-ko102', level: 'latwy', seed: 1, hero: [48, 44], villain: [0, 5], board: [8, 13, 18, 23, 29], decisions: [], fingerprint: 'gb-ko102',
    points: [{ point: 'range-spot', street: 'preflop', spot: 'rfi.btn', handClass: 'AKs', options: ['fold', 'raise 2.5'].map((action) => ({ action, f: 0.5, verdict: 'correct' })), correct: 'raise 2.5', freq: 0.5 }],
  };
  return { id: 's1', szablon, poziom: 'latwy', wariant, wybory: [], aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-13', strefa: 'Europe/Warsaw', startMs: 0, krok: 0, plan: { liczbaKrokow: 1, trescId: 'sc-gb-ko102' } } } as unknown as SesjaScenariusza;
}
const ekran = (stackBb: number) => render(<PrzebiegScenariusza sesja={sesja(stackBb)} faza="decyzja" koniec={false} onWybierz={jest.fn()} {...propsFg()} />);

describe('KO-102: stos w wierszu stołu przez formatujLiczbe', () => {
  afterEach(async () => { await i18n.changeLanguage('pl'); });

  it('pl: stos 12,5 bb z przecinkiem w obu wierszach (ty i rywal), nigdzie „12.5”', async () => {
    await ekran(12.5);
    expect(formatujLiczbe(12.5, jezykZadan())).toBe('12,5');
    const tekst = tekstEkranu();
    expect(tekst).toContain(t('scenario.table.seat', { pozycja: 'BB', rola: t('scenario.table.villain'), bb: '12,5' }));
    expect(tekst).toContain(t('scenario.table.seat', { pozycja: 'BTN', rola: t('scenario.table.you'), bb: '12,5' }));
    expect(tekst).not.toMatch(/12\.5/);
  });
  it('de: ten sam stos z przecinkiem wg języka zadań', async () => {
    await i18n.changeLanguage('de');
    await ekran(12.5);
    expect(formatujLiczbe(12.5, jezykZadan())).toBe('12,5');
    expect(tekstEkranu()).toMatch(/12,5 bb/);
    expect(tekstEkranu()).not.toMatch(/12\.5/);
  });
  it('en: kropka wg języka (liczba jest formatowana, nie surowa po polsku)', async () => {
    await i18n.changeLanguage('en');
    await ekran(12.5);
    expect(formatujLiczbe(12.5, jezykZadan())).toBe('12.5');
    expect(tekstEkranu()).toMatch(/12\.5 bb/);
  });
  it('stos całkowity bez zmian w zapisie (100 bb)', async () => {
    await ekran(100);
    expect(tekstEkranu()).toMatch(/100 bb/);
  });
});
