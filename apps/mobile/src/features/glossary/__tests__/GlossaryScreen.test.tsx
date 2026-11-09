/// <reference types="jest" />
import { ustawJezyk } from '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import GlossaryScreen from '@/app/glossary';

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

  // D-347 (właściciel, 2026-11-09): w en tylko termin angielski + definicja, bez polskich słów i nagłówka „Glossary PL–EN”
  describe('po angielsku', () => {
    beforeEach(async () => {
      await ustawJezyk('en');
    });
    afterEach(async () => {
      await ustawJezyk('pl');
    });

    it('termin angielski i definicja en, bez polskiej nazwy; wyszukiwanie tylko po angielsku', async () => {
      await render(<GlossaryScreen />);
      expect(screen.getByText('Tournament play')).toBeTruthy();
      expect(screen.getByText('variance')).toBeTruthy();
      expect(screen.getByText(/The spread of results around expected value/)).toBeTruthy();
      expect(screen.queryByText('wariancja')).toBeNull();
      expect(screen.queryByText(/PL–EN|Polish/)).toBeNull();
      expect(screen.getByLabelText('variance. The spread of results around expected value: even with good play, short stretches can show big losses or big wins.')).toBeTruthy();

      const search = screen.getByLabelText(/^Search/);
      await fireEvent.changeText(search, 'monotone');
      expect(screen.getByText('monotone')).toBeTruthy();
      expect(screen.queryByText('jednokolorowy')).toBeNull();
      expect(screen.queryByText('variance')).toBeNull();

      // polska nazwa nie jest kluczem wyszukiwania w en
      await fireEvent.changeText(search, 'wariancja');
      expect(screen.queryByText('variance')).toBeNull();
    });
  });
});
