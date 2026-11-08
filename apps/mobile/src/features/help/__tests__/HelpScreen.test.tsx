/// <reference types="jest" />
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HelpScreen from '@/app/help';
import { HELPLINES } from '@/data/content/helplines.generated';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

// region urządzenia: wybór numerów kraju (RD-12, D-152); język bez zmian
let mockRegion: string | null = 'US';
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pl-PL', languageCode: 'pl', regionCode: mockRegion }],
}));

// zgłoszenia idą do dziennika lokalnego (ADR 0009; dawniej Sentry przez observability/crashReports)
jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));
const crash = jest.requireMock<{ zapiszBlad: jest.Mock }>('@/platform/dziennik');

describe('ekran Pomoc', () => {
  let openURL: jest.SpyInstance;
  beforeEach(() => {
    mockRegion = 'US';
    openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined) // RN 0.88: openURL zwraca Promise<void>;
    crash.zapiszBlad.mockClear();
  });
  afterEach(() => openURL.mockRestore());

  // zdanie ogólne z jednego źródła prawdy (content/helplines.yaml → helplines.generated.ts), nie kopia w teście
  const GENERAL = HELPLINES.fallback.text;

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
    expect(crash.zapiszBlad).toHaveBeenCalledWith('link_niedostepny', 'help');
  });
});
