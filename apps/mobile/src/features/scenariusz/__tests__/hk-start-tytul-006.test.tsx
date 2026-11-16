/// <reference types="jest" />
// 04-studio-projektowe-006 (audyt HH, decyzja właściciela 2026-11-16 „(a) 1. zdanie tytułem”): ekran startu z prawdziwej bazy pl (SC-29, 271 znaków):
// tytuł = pierwsze zdanie sytuacji, reszta zwykłą treścią (styl.tresc); treść w `content/` bez zmian (suma tytułu i reszty = sytuacja z bazy).
import '@/i18n';
import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { styl } from '@/theme/tokens';
import { StartScenariusza } from '../EkranScenariusza';
import { podzielSytuacje } from '../zdanie';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const szablony = getScenarioTemplates(dbCn);
const sc29 = szablony.find((s) => s.id === 'sc-29')!;
const props = (szablon: typeof sc29) => ({
  szablon, tytulModulu: 'Moduł', wybor: 'auto' as const, poziom: 'sredni' as const, zastapiony: false, limit: { bezLimitu: true as const },
  strefa: 'Europe/Warsaw', onWybierz: jest.fn(), onStart: jest.fn(), onLimitWyczerpany: jest.fn(), onWroc: jest.fn(),
});

describe('04-studio-projektowe-006: ekran startu scenariusza', () => {
  it('SC-29 (pl): tytuł to pierwsze zdanie, reszta sytuacji zwykłą treścią pod tytułem', async () => {
    const { tytul, reszta } = podzielSytuacje(sc29.situation);
    expect(reszta).not.toBeNull();
    await render(<StartScenariusza {...props(sc29)} />);
    const naglowek = screen.getByRole('header');
    expect(naglowek.props.children).toBe(tytul);
    expect(tytul).toMatch(/czeka \(check\)\.$/);
    const tresc = screen.getByText(reszta as string);
    expect(StyleSheet.flatten(tresc.props.style)?.fontSize).toBe(StyleSheet.flatten(styl.tresc)?.fontSize);
    expect(StyleSheet.flatten(tresc.props.style)?.fontSize).not.toBe(StyleSheet.flatten(styl.tytul)?.fontSize);
  });
  it('treść bez zmian: tytuł i reszta składają się na sytuację każdego szablonu z bazy pl', () => {
    for (const s of szablony) {
      const { tytul, reszta } = podzielSytuacje(s.situation);
      expect([tytul, reszta].filter((x) => x !== null).join(' ')).toBe(s.situation);
    }
  });
});
