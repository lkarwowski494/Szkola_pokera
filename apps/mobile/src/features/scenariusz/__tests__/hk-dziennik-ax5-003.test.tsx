/// <reference types="jest" />
// 04-studio-projektowe-003 (audyt HH, naprawa HK): etykieta ulicy w dzienniku przy AX5 (fontScale 3,12) w układzie pionowym,
// bez stałej szerokości 64 pt (zrzut „Riv/er”, „Pr/efl/op”). Przy tekście domyślnym układ bez zmian.
import '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import i18n from '@/i18n';
import { Dziennik } from '../komponenty';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string) => i18n.t(k) as string;
const AX5 = 3.12;
const skala = (fontScale: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 390, height: 844, scale: 3, fontScale });
afterEach(() => jest.restoreAllMocks());

/** Najbliższy przodek z układem flex (pole flexDirection w spłaszczonym stylu); `null`, gdy brak. */
const wiersz = (el: ReactTestInstance): ReactTestInstance | null => {
  for (let n: ReactTestInstance | null = el.parent; n; n = n.parent) if (StyleSheet.flatten(n.props.style)?.flexDirection) return n;
  return null;
};
const kierunek = (el: ReactTestInstance) => StyleSheet.flatten(wiersz(el)?.props.style)?.flexDirection;

describe('04-studio-projektowe-003: etykieta ulicy w dzienniku przy dużym tekście', () => {
  const wpis = [{ ulica: t('scenario.street.preflop'), tekst: 'BB: sprawdza' }];
  const etykieta = async (fontScale: number) => {
    skala(fontScale);
    await render(<Dziennik wpisy={wpis} />);
    return screen.getByText(wpis[0]!.ulica);
  };
  it('AX5: etykieta bez stałej szerokości, ulica nad wpisem (kolumna)', async () => {
    const el = await etykieta(AX5);
    expect(StyleSheet.flatten(el.props.style).width).toBeUndefined();
    expect(kierunek(el)).toBe('column');
  });
  it('tekst domyślny: szerokość 64 pt i wiersz jak dotąd', async () => {
    const el = await etykieta(1);
    expect(StyleSheet.flatten(el.props.style).width).toBe(64);
    expect(kierunek(el)).toBe('row');
  });
});
