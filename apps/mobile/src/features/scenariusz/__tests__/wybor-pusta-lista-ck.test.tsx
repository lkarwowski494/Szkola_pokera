/// <reference types="jest" />
// CK 08-programista-004: gałąź „wkrótce” w WyborScenariusza (pusta lista grup) ma własny test; menu-bi sprawdza tylko listę z bazą pl.
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { WyborScenariusza } from '../WyborScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

describe('WyborScenariusza: pusta lista (CK, 08-programista-004)', () => {
  it('grupy=[]: pokazuje „wkrótce” i nie ma żadnego przycisku', async () => {
    await render(<WyborScenariusza grupy={[]} onWybierz={jest.fn()} />);
    expect(screen.getByText(i18n.t('scenarios.soon'))).toBeTruthy();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
