/// <reference types="jest" />
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

type SentryMock = { init: jest.Mock; setUser: jest.Mock; captureException: jest.Mock; breadcrumbsIntegration: jest.Mock };

let mockDsn: unknown = '';
jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    get expoConfig() {
      return { extra: { sentry: { dsn: mockDsn } } };
    },
  },
}));

/** Świeży moduł dla każdego testu (stan „włączone” jest modułowy, jak w aplikacji). */
function load() {
  let mod!: typeof import('@/observability/crashReports');
  jest.isolateModules(() => {
    mod = require('@/observability/crashReports');
  });
  const Sentry = jest.requireMock<SentryMock>('@sentry/react-native');
  return { mod, Sentry };
}

describe('raporty awarii (Sentry)', () => {
  beforeEach(() => {
    const Sentry = jest.requireMock<SentryMock>('@sentry/react-native');
    Object.values(Sentry).forEach((f) => typeof f === 'function' && 'mockClear' in f && (f as jest.Mock).mockClear());
  });

  it('bez DSN w app.json Sentry zostaje wyłączone, a reportError nic nie wysyła', () => {
    mockDsn = '   ';
    const { mod, Sentry } = load();
    expect(mod.sentryDsn()).toBeUndefined();
    expect(mod.initCrashReports()).toBe(false);
    mod.reportError(new Error('x'));
    expect(Sentry.init).not.toHaveBeenCalled();
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('z DSN: bez danych osobowych, bez okruszków z konsoli, bez śledzenia i replay, IP 0.0.0.0', () => {
    mockDsn = 'https://klucz@o1.ingest.de.sentry.io/2';
    const { mod, Sentry } = load();
    expect(mod.initCrashReports()).toBe(true);
    expect(mod.initCrashReports()).toBe(true);
    expect(Sentry.init).toHaveBeenCalledTimes(1);
    const opts = Sentry.init.mock.calls[0][0];
    expect(opts.dsn).toBe('https://klucz@o1.ingest.de.sentry.io/2');
    expect(opts.sendDefaultPii).toBe(false);
    expect(opts.attachScreenshot).toBe(false);
    expect(opts.attachViewHierarchy).toBe(false);
    expect(Sentry.breadcrumbsIntegration).toHaveBeenCalledWith({ console: false });
    // liczba (nawet 0) włącza integracje śledzenia i replay, więc tych opcji nie ma wcale
    for (const k of ['tracesSampleRate', 'tracesSampler', 'replaysSessionSampleRate', 'replaysOnErrorSampleRate', 'profilesSampleRate']) {
      expect(opts).not.toHaveProperty(k);
    }
    expect(Sentry.setUser).toHaveBeenCalledWith({ ip_address: '0.0.0.0' });
  });

  it('reportError przekazuje błąd i nigdy nie rzuca', () => {
    mockDsn = 'https://klucz@o1.ingest.de.sentry.io/2';
    const { mod, Sentry } = load();
    mod.initCrashReports();
    const e = new Error('x');
    mod.reportError(e);
    expect(Sentry.captureException).toHaveBeenCalledWith(e);
    Sentry.captureException.mockImplementationOnce(() => {
      throw new Error('SDK niedostępne');
    });
    expect(() => mod.reportError(e)).not.toThrow();
  });

  it('granica błędów pokazuje ekran zastępczy i zgłasza błąd, a „Spróbuj ponownie” montuje drzewo od nowa', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { mod, Sentry } = load();
    const { RenderErrorScreen } = require('@/components/RenderErrorScreen');
    let fail = true;
    function Boom() {
      if (fail) throw new Error('render');
      return <Text>działa</Text>;
    }
    await render(
      <mod.CrashBoundary fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <Boom />
      </mod.CrashBoundary>,
    );
    expect(screen.getByText('Coś poszło nie tak')).toBeTruthy();
    expect(Sentry.captureException).toHaveBeenCalled();
    fail = false;
    await fireEvent.press(screen.getByText('Spróbuj ponownie'));
    expect(screen.getByText('działa')).toBeTruthy();
  });

  it('uszkodzony zapis w user.db: parseSeen zwraca null (zgłoszenie idzie przez reportError)', () => {
    const { parseSeen } = require('@/features/advancement/contentChange');
    expect(parseSeen('{zepsute')).toBeNull();
    expect(parseSeen(null)).toBeNull();
  });
});
