/// <reference types="jest" />
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HelpScreen from '@/app/help';
import { HELPLINES } from '@/data/content/helplines.generated';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

// zgłoszenia idą przez moduł raportów awarii (bez DSN w testach Sentry jest wyłączone, więc sprawdzamy sam moduł)
jest.mock('@/observability/crashReports', () => ({ reportError: jest.fn() }));
const crash = jest.requireMock<{ reportError: jest.Mock }>('@/observability/crashReports');

describe('ekran Pomoc', () => {
  let openURL: jest.SpyInstance;
  beforeEach(() => {
    openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    crash.reportError.mockClear();
  });
  afterEach(() => openURL.mockRestore());

  it('pokazuje wszystkie wpisy z helplines.yaml, dopisek „za granicą” i datę sprawdzenia', async () => {
    await render(<HelpScreen />);
    // wpisy wszystkich krajów (wybór kraju i regionu: rola 08); nazwy jak „Numer alarmowy” powtarzają się między krajami
    for (const e of HELPLINES.entries) expect(screen.getAllByText(e.name).length).toBeGreaterThan(0);
    expect(screen.getByText('całą dobę, 7 dni w tygodniu, bez opłat za usługę; SMS według taryfy operatora')).toBeTruthy();
    expect(screen.getByText('W zagrożeniu życia dzwoń na lokalny numer alarmowy.')).toBeTruthy();
    expect(screen.getByText('Dane sprawdzone: 4 listopada 2026')).toBeTruthy();
  });

  it('numer otwiera tel: bez spacji, a link stronę https w przeglądarce', async () => {
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 1-800-697-3738'));
    expect(openURL).toHaveBeenLastCalledWith('tel:18006973738');
    await fireEvent.press(screen.getByText('Zadzwoń: 116 123'));
    expect(openURL).toHaveBeenLastCalledWith('tel:116123');
    await fireEvent.press(screen.getByText('Zadzwoń: 112'));
    expect(openURL).toHaveBeenLastCalledWith('tel:112');
    await fireEvent.press(screen.getByText('Gambling Therapy: gordonmoody.org.uk/gambling-therapy'));
    expect(openURL).toHaveBeenLastCalledWith('https://gordonmoody.org.uk/gambling-therapy/');
    await fireEvent.press(screen.getByLabelText('Gambling Therapy: otwórz gordonmoody.org.uk/gambling-therapy w przeglądarce'));
    expect(openURL).toHaveBeenLastCalledWith('https://gordonmoody.org.uk/gambling-therapy/');
    expect(screen.getByLabelText('Zadzwoń pod numer 1-800-697-3738: National Problem Gambling Helpline')).toBeTruthy();
  });

  it('gdy telefon nie umie otworzyć adresu, pokazuje numer do wybrania ręcznie i zgłasza błąd', async () => {
    const err = new Error('brak aplikacji Telefon');
    openURL.mockRejectedValueOnce(err);
    await render(<HelpScreen />);
    await fireEvent.press(screen.getByText('Zadzwoń: 116 123'));
    expect(await screen.findByText('Nie udało się otworzyć: 116123. Wybierz numer albo adres ręcznie.')).toBeTruthy();
    expect(crash.reportError).toHaveBeenCalledWith(err);
  });
});
