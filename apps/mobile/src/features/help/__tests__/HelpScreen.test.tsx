/// <reference types="jest" />
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HelpScreen from '@/app/help';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

// region urządzenia: wybór numerów kraju (RD-12, D-152); język bez zmian
let mockRegion: string | null = 'US';
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pl-PL', languageCode: 'pl', regionCode: mockRegion }],
}));

// zgłoszenia idą przez moduł raportów awarii (bez DSN w testach Sentry jest wyłączone, więc sprawdzamy sam moduł)
jest.mock('@/observability/crashReports', () => ({ reportError: jest.fn() }));
const crash = jest.requireMock<{ reportError: jest.Mock }>('@/observability/crashReports');

describe('ekran Pomoc', () => {
  let openURL: jest.SpyInstance;
  beforeEach(() => {
    mockRegion = 'US';
    openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    crash.reportError.mockClear();
  });
  afterEach(() => openURL.mockRestore());

  it('US: tylko numery USA i pomoc międzynarodowa, dopisek o numerze alarmowym i data sprawdzenia', async () => {
    await render(<HelpScreen />);
    expect(screen.getByText('Zadzwoń: 1-800-697-3738')).toBeTruthy();
    expect(screen.getByText('Zadzwoń: 911')).toBeTruthy();
    expect(screen.queryByText('Zadzwoń: 999')).toBeNull();
    expect(screen.queryByText('Zadzwoń: 112')).toBeNull();
    expect(screen.getByText('Gambling Therapy: gamblingtherapy.org')).toBeTruthy();
    expect(screen.getByText('całą dobę, 7 dni w tygodniu, bez opłat za usługę; SMS według taryfy operatora')).toBeTruthy();
    expect(screen.getByText('W zagrożeniu życia dzwoń na lokalny numer alarmowy.')).toBeTruthy();
    expect(screen.getByText('Dane sprawdzone: 4 listopada 2026')).toBeTruthy();
  });

  it('GB: numery brytyjskie bez numerów USA; lista regionów, wybór regionu dokłada jego numery (D-152)', async () => {
    mockRegion = 'GB';
    await render(<HelpScreen />);
    expect(screen.getByText('Zadzwoń: 999')).toBeTruthy();
    expect(screen.queryByText('Zadzwoń: 911')).toBeNull();
    expect(screen.queryByText('Zadzwoń: 1-800-697-3738')).toBeNull();
    expect(screen.getByText('Numery w regionach: wybierz swój region')).toBeTruthy();
    // bez regionu: linia ogólnokrajowa (national), bez linii walijskiej
    expect(screen.queryByText('Zadzwoń: 0808 281 9265')).toBeNull();
    await fireEvent.press(screen.getByText('Walia'));
    expect(screen.getByText('Walia ✓')).toBeTruthy();
    expect(screen.getByText('Zadzwoń: 0808 281 9265')).toBeTruthy();
    expect(screen.getByText('Zadzwoń: 999')).toBeTruthy();
  });

  it('kraj bez wpisu: tekst bez numeru i pomoc międzynarodowa, żadnego numeru innego kraju (D-142)', async () => {
    mockRegion = 'NO';
    await render(<HelpScreen />);
    expect(screen.queryAllByText(/^Zadzwoń:/)).toHaveLength(0);
    expect(screen.getAllByText('W zagrożeniu życia dzwoń na lokalny numer alarmowy.').length).toBeGreaterThan(0);
    expect(screen.getByText('Gambling Therapy: gamblingtherapy.org')).toBeTruthy();
  });

  it('numer otwiera tel: bez spacji i łączników, a link stronę https w przeglądarce', async () => {
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 1-800-697-3738'));
    expect(openURL).toHaveBeenLastCalledWith('tel:18006973738');
    await fireEvent.press(screen.getByText('Zadzwoń: 911'));
    expect(openURL).toHaveBeenLastCalledWith('tel:911');
    await fireEvent.press(screen.getByLabelText('Gambling Therapy: otwórz gamblingtherapy.org w przeglądarce'));
    expect(openURL).toHaveBeenLastCalledWith('https://www.gamblingtherapy.org/');
    expect(screen.getByLabelText('Zadzwoń pod numer 1-800-697-3738: National Problem Gambling Helpline')).toBeTruthy();
  });

  it('gdy telefon nie umie otworzyć adresu, pokazuje numer do wybrania ręcznie i zgłasza błąd', async () => {
    const err = new Error('brak aplikacji Telefon');
    openURL.mockRejectedValueOnce(err);
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 911'));
    expect(await screen.findByText('Nie udało się otworzyć: 911. Wybierz numer albo adres ręcznie.')).toBeTruthy();
    expect(crash.reportError).toHaveBeenCalledWith(err);
  });
});
