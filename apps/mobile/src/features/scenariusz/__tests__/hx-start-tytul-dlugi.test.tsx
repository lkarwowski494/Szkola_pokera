/// <reference types="jest" />
// HX (D-1730, kryteria 3–4 dla 08): ekran startu scenariusza wybiera styl tytułu wg długości ważonej i szerokości ekranu;
// inne tytuły ekranów („Rozdanie zakończone”) i nagłówki ocen nie zmieniają stylu. Dane: prawdziwa baza pl (SC-29 = długi tytuł).
import '@/i18n';
import { Dimensions, StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { Title } from '@/components/ui';
import { styl } from '@/theme/tokens';
import { StartScenariusza } from '../EkranScenariusza';
import { dlugoscWazona } from '../tytul';
import { podzielSytuacje } from '../zdanie';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const szablony = getScenarioTemplates(dbCn);
const sc29 = szablony.find((s) => s.id === 'sc-29')!;
const props = (szablon: typeof sc29) => ({
  szablon, tytulModulu: 'Moduł', wybor: 'auto' as const, poziom: 'sredni' as const, zastapiony: false, limit: { bezLimitu: true as const },
  strefa: 'Europe/Warsaw', onWybierz: jest.fn(), onStart: jest.fn(), onLimitWyczerpany: jest.fn(), onWroc: jest.fn(),
});
const przy = (szerokosc: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szerokosc, height: 844, scale: 3, fontScale: 1 });
const rozmiar = (el: { props: { style?: unknown } }) => StyleSheet.flatten(el.props.style as never)?.fontSize;
const dlugie = szablony.filter((s) => dlugoscWazona(podzielSytuacje(s.situation).tytul) > 68);
const krotkie = szablony.filter((s) => dlugoscWazona(podzielSytuacje(s.situation).tytul) <= 68);

afterEach(() => jest.restoreAllMocks());

describe('HX D-1730: styl tytułu na ekranie startu', () => {
  it('dane: baza pl ma długie (SC-29) i krótkie tytuły przy 390', () => {
    expect(dlugie.map((s) => s.id)).toContain('sc-29');
    expect(krotkie.length).toBeGreaterThan(0);
  });
  it('SC-29 (pl) przy 390 pt: tytuł w stylu tytulDlugi (20 pt), nie tytul (28 pt)', async () => {
    przy(390);
    await render(<StartScenariusza {...props(sc29)} />);
    expect(rozmiar(screen.getByRole('header'))).toBe(styl.tytulDlugi.fontSize);
    expect(rozmiar(screen.getByRole('header'))).toBe(20);
  });
  it('krótki tytuł przy 390 pt zostaje w stylu tytul (28 pt)', async () => {
    przy(390);
    await render(<StartScenariusza {...props(krotkie[0]!)} />);
    expect(rozmiar(screen.getByRole('header'))).toBe(styl.tytul.fontSize);
    expect(rozmiar(screen.getByRole('header'))).toBe(28);
  });
  it('próg zależy od szerokości: tytuł na granicy (54 < długość ≤ 68) jest długi przy 320, a zwykły przy 390', async () => {
    const posredni = szablony.find((s) => { const w = dlugoscWazona(podzielSytuacje(s.situation).tytul); return w > 54 && w <= 68; });
    expect(posredni).toBeDefined();
    przy(320);
    const { unmount } = await render(<StartScenariusza {...props(posredni!)} />);
    expect(rozmiar(screen.getByRole('header'))).toBe(20);
    await unmount();
    przy(390);
    await render(<StartScenariusza {...props(posredni!)} />);
    expect(rozmiar(screen.getByRole('header'))).toBe(28);
  });
});

describe('HX D-1730, kryterium 4: nic poza tytułem startu nie zmienia stylu', () => {
  it('Title bez parametru (tytuł ekranu „Rozdanie zakończone”, nagłówki) zostaje w stylu tytul, także dla bardzo długiego tekstu', async () => {
    przy(320);
    await render(<Title>{'x'.repeat(200)}</Title>);
    expect(rozmiar(screen.getByRole('header'))).toBe(styl.tytul.fontSize);
  });
});
