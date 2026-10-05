/// <reference types="jest" />
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HelpScreen from '@/app/help';
import { HELPLINES } from '@/data/content/helplines.generated';

jest.mock('@formatjs/intl-pluralrules/polyfill.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/pl.js', () => ({}));
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const { Observe } = jest.requireMock<{ Observe: { reportError: jest.Mock } }>('expo-observe');

describe('ekran Pomoc', () => {
  let openURL: jest.SpyInstance;
  beforeEach(() => {
    openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    Observe.reportError.mockClear();
  });
  afterEach(() => openURL.mockRestore());

  it('pokazuje wszystkie wpisy z helplines.yaml, dopisek „za granicą” i datę sprawdzenia', async () => {
    await render(<HelpScreen />);
    for (const e of HELPLINES.entries) expect(screen.getByText(e.name)).toBeTruthy();
    expect(screen.getByText('codziennie 17.00–22.00, opłata według taryfy operatora')).toBeTruthy();
    expect(screen.getByText('Za granicą: lokalny numer pomocy lub 112.')).toBeTruthy();
    expect(screen.getByText('Dane sprawdzone: 5 października 2026')).toBeTruthy();
  });

  it('numer otwiera tel: bez spacji, a link stronę https w przeglądarce', async () => {
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 801 889 880'));
    expect(openURL).toHaveBeenLastCalledWith('tel:801889880');
    await fireEvent.press(screen.getByText('Zadzwoń: 116 123'));
    expect(openURL).toHaveBeenLastCalledWith('tel:116123');
    await fireEvent.press(screen.getByText('Zadzwoń: 112'));
    expect(openURL).toHaveBeenLastCalledWith('tel:112');
    await fireEvent.press(screen.getByText('Czat: 116sos.pl'));
    expect(openURL).toHaveBeenLastCalledWith('https://116sos.pl/');
    await fireEvent.press(screen.getByLabelText('Lista mityngów: otwórz anonimowihazardzisci.org w przeglądarce'));
    expect(openURL).toHaveBeenLastCalledWith('https://anonimowihazardzisci.org/');
    expect(screen.getByLabelText('Zadzwoń pod numer 801 889 880: Telefon Zaufania uzależnienia behawioralne')).toBeTruthy();
  });

  it('gdy telefon nie umie otworzyć adresu, pokazuje numer do wybrania ręcznie i zgłasza błąd', async () => {
    const err = new Error('brak aplikacji Telefon');
    openURL.mockRejectedValueOnce(err);
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 116 123'));
    expect(await screen.findByText('Nie udało się otworzyć: 116123. Wybierz numer albo adres ręcznie.')).toBeTruthy();
    expect(Observe.reportError).toHaveBeenCalledWith(err);
  });
});
