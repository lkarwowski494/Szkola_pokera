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

  const GENERAL = 'Jeśli rozpoznajesz u siebie sygnały problemu z hazardem albo masz wątpliwości, porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego. W nagłym zagrożeniu dzwoń na lokalny numer alarmowy.';

  it.each(['US', 'GB', 'CA', 'DE', 'NO', null])('D-158: kraj %s: zdanie ogólne (raz) i Gambling Therapy, bez żadnego numeru i bez listy regionów', async (region) => {
    mockRegion = region;
    await render(<HelpScreen />);
    expect(screen.queryAllByText(/^Zadzwoń:/)).toHaveLength(0);
    expect(screen.getAllByText(GENERAL)).toHaveLength(1);
    expect(screen.getByText('Gambling Therapy: gamblingtherapy.org')).toBeTruthy();
    expect(screen.queryByText(/Numery w regionach/)).toBeNull();
    expect(screen.getByText('Dane sprawdzone: 4 listopada 2026')).toBeTruthy();
  });

  it('link otwiera stronę https w przeglądarce', async () => {
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByLabelText('Gambling Therapy: otwórz gamblingtherapy.org w przeglądarce'));
    expect(openURL).toHaveBeenLastCalledWith('https://www.gamblingtherapy.org/');
  });

  it('gdy telefon nie umie otworzyć adresu, pokazuje numer do wybrania ręcznie i zgłasza błąd', async () => {
    const err = new Error('brak aplikacji Telefon');
    openURL.mockRejectedValueOnce(err);
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByLabelText('Gambling Therapy: otwórz gamblingtherapy.org w przeglądarce'));
    expect(await screen.findByText('Nie udało się otworzyć: https://www.gamblingtherapy.org/. Wybierz numer albo adres ręcznie.')).toBeTruthy();
    expect(crash.reportError).toHaveBeenCalledWith(err);
  });
});
