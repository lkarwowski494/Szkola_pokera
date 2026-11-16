/// <reference types="jest" />
// IH (D-1894, KO-117): ekran startu pokazuje głębokość startu jako przedział z `zakresGlebokosciStartu`, nie `stackBb` (SC-26: 14 ≠ 12,5–15; SC-27 poziom Ś: 100 ≠ 100–161,75).
import '@/i18n';
import { render } from '@testing-library/react-native';
import { getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { StartScenariusza } from '../EkranScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const szablony = getScenarioTemplates(dbCn);
const sz = (id: string) => szablony.find((s) => s.id === id)!;
const props = (szablon: ReturnType<typeof sz>, poziom: 'latwy' | 'sredni' | 'trudny') => ({
  szablon, tytulModulu: 'Moduł', wybor: 'auto' as const, poziom, zastapiony: false, limit: { bezLimitu: true as const },
  strefa: 'Europe/Warsaw', onWybierz: jest.fn(), onStart: jest.fn(), onLimitWyczerpany: jest.fn(), onWroc: jest.fn(),
});

describe('IH: głębokość startu jako przedział na ekranie startu (pl)', () => {
  it('SC-26 (oba poziomy): „Głębokość 12,5–15 bb”, nie stackBb', async () => {
    for (const poziom of ['latwy', 'sredni'] as const) {
      const { unmount } = await render(<StartScenariusza {...props(sz('sc-26'), poziom)} />);
      expect(tekstEkranu()).toMatch(/Głębokość 12,5–15 bb/);
      await unmount();
    }
  });
  it('SC-27: poziom łatwy jedna liczba (100), poziom średni przedział 100–161,75', async () => {
    const l = await render(<StartScenariusza {...props(sz('sc-27'), 'latwy')} />);
    expect(tekstEkranu()).toMatch(/Głębokość 100 bb/);
    await l.unmount();
    await render(<StartScenariusza {...props(sz('sc-27'), 'sredni')} />);
    expect(tekstEkranu()).toMatch(/Głębokość 100–161,75 bb/);
  });
  it('szablon bez punktu stosu (SC-01): jak dotąd jedna liczba = stackBb', async () => {
    await render(<StartScenariusza {...props(sz('sc-01'), 'sredni')} />);
    expect(tekstEkranu()).toContain(`Głębokość ${sz('sc-01').stackBb} bb`);
  });
});
