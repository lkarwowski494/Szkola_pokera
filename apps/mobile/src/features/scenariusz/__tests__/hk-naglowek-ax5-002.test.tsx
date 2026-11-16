/// <reference types="jest" />
// 04-studio-projektowe-002 (audyt HH, naprawa HK): nagłówek przebiegu przy AX5 (fontScale 3,12) w układzie pionowym,
// bez stałej szerokości 64 pt (zrzut „Riv/er”, „Pr/efl/op”). Przy tekście domyślnym układ bez zmian.
import '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { render, screen, within } from '@testing-library/react-native';
import i18n from '@/i18n';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { propsFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';

/** Węzeł drzewa testowego RNTL, wprost z typu `screen`. */
type ReactTestInstance = NonNullable<ReturnType<typeof screen.getByText>['parent']>;

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string) => i18n.t(k) as string;
const AX5 = 3.12;
const skala = (fontScale: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 390, height: 844, scale: 3, fontScale });
afterEach(() => jest.restoreAllMocks());

function sesja(): SesjaScenariusza {
  const szablon = { id: 'sc-hk', module: 'm3', situation: '-', table: '6max', positions: { hero: 'SB', villain: 'BB' }, stackBb: 100, levels: ['latwy'], decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'call.sb', rule: 'R-M3-003', actions: ['fold', 'call', 'all-in'].map((action) => ({ action, explanation: `Wyjaśnienie ${action}.` })) }] } as unknown as ScenarioTemplate;
  const wariant = { templateId: 'sc-hk', level: 'latwy', seed: 1, hero: [48, 44], villain: [0, 5], board: [8, 13, 18, 23, 29], decisions: [], fingerprint: 'hk',
    points: [{ point: 'range-spot', street: 'preflop', spot: 'call.sb', handClass: 'AKs', options: ['fold', 'call', 'all-in'].map((action) => ({ action, f: 0.3, verdict: 'correct' })), correct: 'call', freq: 0.3 }] };
  return { id: 's1', szablon, poziom: 'latwy', wariant, wybory: [], aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-12', strefa: 'Europe/Warsaw', startMs: 0, krok: 0, plan: { liczbaKrokow: 1, trescId: 'sc-hk' } } } as unknown as SesjaScenariusza;
}
/** Najbliższy przodek z układem flex (pole flexDirection w spłaszczonym stylu); `null`, gdy brak. */
const wiersz = (el: ReactTestInstance): ReactTestInstance | null => {
  for (let n: ReactTestInstance | null = el.parent; n; n = n.parent) if (StyleSheet.flatten(n.props.style)?.flexDirection) return n;
  return null;
};
const kierunek = (el: ReactTestInstance) => StyleSheet.flatten(wiersz(el)?.props.style)?.flexDirection;

describe('04-studio-projektowe-002: nagłówek przebiegu przy dużym tekście', () => {
  const naglowek = async (fontScale: number) => {
    skala(fontScale);
    await render(<PrzebiegScenariusza sesja={sesja()} faza="decyzja" koniec={false} onWybierz={jest.fn()} {...propsFg()} />);
    return screen.getByRole('header', { name: t('scenario.nav.title') });
  };
  it('AX5: Zakończ, tytuł i ulica jeden pod drugim (kolumna), ulica bez minWidth 64 obok tytułu', async () => {
    expect(kierunek(await naglowek(AX5))).toBe('column');
  });
  // 08-programista-504 (mutant M6 recenzji HM): nazwa testu obiecuje „ulica bez minWidth 64”, więc asercja sprawdza styl ulicy, nie tylko kierunek.
  /** Styl napisu ulicy w tym samym układzie co tytuł (ten sam napis jest też gdzie indziej na ekranie). */
  const ulica = async (fontScale: number) => {
    const uklad = wiersz(await naglowek(fontScale));
    if (!uklad) throw new Error('brak układu nagłówka');
    return StyleSheet.flatten(within(uklad).getByText(t('scenario.street.preflop')).props.style);
  };
  it('AX5: ulica bez minWidth 64 i bez wyrównania do prawej', async () => {
    const st = await ulica(AX5);
    expect(st?.minWidth).toBeUndefined();
    expect(st?.textAlign).toBeUndefined();
  });
  it('tekst domyślny: ulica z minWidth 64 i wyrównaniem do prawej', async () => {
    expect(await ulica(1)).toMatchObject({ minWidth: 64, textAlign: 'right' });
  });
  it('tekst domyślny: wiersz jak dotąd (row, space-between)', async () => {
    const w = wiersz(await naglowek(1));
    expect(StyleSheet.flatten(w?.props.style)).toMatchObject({ flexDirection: 'row', justifyContent: 'space-between' });
  });
});
