/// <reference types="jest" />
// Krok 1 części 4 (ADR 0009 pkt 1–2): zamiast Sentry lokalny dziennik bez wysyłki i granica błędu ekranu.
// Zastępuje observability/__tests__/crashReports.test.tsx (sprawdzał opcje Sentry, którego ADR 0009 nie dopuszcza).
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { KONFIGURACJA } from '@szkola/domena';

jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '9.9.9' } } }));

function load() {
  let mod!: typeof import('@/platform/dziennik');
  jest.isolateModules(() => {
    mod = require('@/platform/dziennik');
  });
  return mod;
}

describe('dziennik lokalny (ADR 0009 pkt 2)', () => {
  it('wpis: czas, kod, ekran, wersja aplikacji; bez treści błędu', () => {
    const d = load();
    d.zapiszBlad('link_niedostepny', 'help', 1_000);
    expect(d.wpisyDziennika()).toEqual([{ ms: 1_000, kod: 'link_niedostepny', ekran: 'help', wersja: '9.9.9' }]);
  });

  it(`pierścień: najwyżej DZIENNIK_MAKS_WPISOW (${KONFIGURACJA.DZIENNIK_MAKS_WPISOW}) ostatnich wpisów, najstarsze wypadają`, () => {
    const d = load();
    const n = KONFIGURACJA.DZIENNIK_MAKS_WPISOW;
    for (let i = 0; i < n + 3; i++) d.zapiszBlad('wyjatek_ekranu', null, i);
    const w = d.wpisyDziennika();
    expect(w).toHaveLength(n);
    expect(w[0]!.ms).toBe(3);
    expect(w[n - 1]!.ms).toBe(n + 2);
  });

  it('granica błędu: ekran zastępczy, wpis wyjatek_ekranu, „Spróbuj ponownie” montuje drzewo od nowa', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    let d!: typeof import('@/platform/dziennik');
    let G!: typeof import('@/components/GranicaBledu');
    jest.isolateModules(() => {
      d = require('@/platform/dziennik');
      G = require('@/components/GranicaBledu');
    });
    const { RenderErrorScreen } = require('@/components/RenderErrorScreen');
    let fail = true;
    function Boom() {
      if (fail) throw new Error('render');
      return <Text>działa</Text>;
    }
    await render(
      <G.GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <Boom />
      </G.GranicaBledu>,
    );
    expect(screen.getByText('Coś poszło nie tak')).toBeTruthy();
    expect(d.wpisyDziennika().map((w) => w.kod)).toEqual(['wyjatek_ekranu']);
    fail = false;
    await fireEvent.press(screen.getByText('Spróbuj ponownie'));
    expect(screen.getByText('działa')).toBeTruthy();
  });

  it('uszkodzony zapis w user.db: parseSeen zwraca null i dopisuje odczyt_nieudany', () => {
    let d!: typeof import('@/platform/dziennik');
    let c!: typeof import('@/features/advancement/contentChange');
    jest.isolateModules(() => {
      d = require('@/platform/dziennik');
      c = require('@/features/advancement/contentChange');
    });
    expect(c.parseSeen('{zepsute')).toBeNull();
    expect(c.parseSeen(null)).toBeNull();
    expect(d.wpisyDziennika().map((w) => w.kod)).toEqual(['odczyt_nieudany']);
  });
});
