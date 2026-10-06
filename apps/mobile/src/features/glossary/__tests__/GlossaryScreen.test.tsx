/// <reference types="jest" />
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import GlossaryScreen from '@/app/glossary';

// Node ma Intl.PluralRules; polyfill dla Hermesa (moduł ESM) jest tu zbędny.
jest.mock('@formatjs/intl-pluralrules/polyfill.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/pl.js', () => ({}));
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

// pełna lista (ok. 140 terminów) renderuje się w zimnym przebiegu jest dłużej niż domyślne 5 s
jest.setTimeout(30_000);

describe('ekran Słowniczek', () => {
  it('pokazuje obszary i pary PL – EN, a wyszukiwanie zawęża listę w obu językach', async () => {
    await render(<GlossaryScreen />);
    expect(screen.getByText('Gra turniejowa')).toBeTruthy();
    expect(screen.getByText('wariancja')).toBeTruthy();
    expect(screen.getByText('variance')).toBeTruthy();

    const search = screen.getByLabelText('Szukaj po polsku albo po angielsku');
    await fireEvent.changeText(search, 'monotone');
    expect(screen.getByText('jednokolorowy')).toBeTruthy();
    expect(screen.queryByText('wariancja')).toBeNull();
    expect(screen.queryByText('Bankroll i psychika')).toBeNull();

    // definicja pod terminem (wariant „słowniczek + ćwiczenie”)
    expect(screen.getByText(/Flop z trzema kartami w jednym kolorze/)).toBeTruthy();

    await fireEvent.changeText(search, 'odchylenie');
    expect(screen.getByText('standard deviation')).toBeTruthy();

    await fireEvent.changeText(search, 'xyzxyz');
    expect(screen.getByText('Nie ma terminu pasującego do „xyzxyz”.')).toBeTruthy();
  });
});
