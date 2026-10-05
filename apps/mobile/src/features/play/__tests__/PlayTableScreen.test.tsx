/// <reference types="jest" />
/// <reference types="node" />
import '@/i18n';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

jest.mock('@formatjs/intl-pluralrules/polyfill.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/pl.js', () => ({}));
jest.mock('better-sqlite3', () => function BetterSqlite3() {}, { virtual: true });
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-haptics', () => ({ selectionAsync: jest.fn() }));
const mockReplace = jest.fn();
const mockParams: { id?: string } = {};
jest.mock('expo-router', () => ({
  router: { replace: (...a: unknown[]) => mockReplace(...a), back: jest.fn(), push: jest.fn() },
  Stack: { Screen: () => null },
  useLocalSearchParams: () => mockParams,
}));
jest.mock('expo-sqlite', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('node:path') as typeof import('node:path');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const schema = require('@szkola/content-schema') as typeof import('@szkola/content-schema');
  const db = new DatabaseSync(path.join(__dirname, `../../../../assets/content/content-v${schema.CONTENT_SCHEMA_VERSION}.db`), { readOnly: true });
  const ctx = {
    getAllSync: (sql: string, ...p: (string | number)[]) => db.prepare(sql).all(...p),
    getFirstSync: (sql: string, ...p: (string | number)[]) => db.prepare(sql).get(...p) ?? null,
  };
  return { useSQLiteContext: () => ctx };
});
jest.mock('@/data/user/db', () => ({ userDb: require('@/test-utils/userTestDb').openTestDb().db }));
jest.mock('@/features/play/usePlayKit', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('node:path') as typeof import('node:path');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const schema = require('@szkola/content-schema') as typeof import('@szkola/content-schema');
  const db = new DatabaseSync(path.join(__dirname, `../../../../assets/content/content-v${schema.CONTENT_SCHEMA_VERSION}.db`), { readOnly: true });
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const kit = (require('../kit') as typeof import('../kit')).loadPlayKit({ all: (sql: string, ...p: (string | number)[]) => db.prepare(sql).all(...p) as never });
  return { usePlayKit: () => kit };
});

jest.setTimeout(60_000);

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PlayTableScreen = (require('@/app/play/table') as typeof import('@/app/play/table')).default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { usePlaySetup } = require('@/state/play') as typeof import('@/state/play');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PlayReportScreen = (require('@/app/play/report/[id]') as typeof import('@/app/play/report/[id]')).default;

describe('ekran stołu', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('rozgrywa sesję 10 rozdań przyciskami, zapisuje ją i przechodzi do raportu', async () => {
    usePlaySetup.getState().set({ hands: 10, areaModule: null, timeLimitS: null });
    await render(<PlayTableScreen />);
    for (let step = 0; step < 2000; step++) {
      await act(async () => {
        jest.advanceTimersByTime(700);
      });
      const report = screen.queryByText('Raport');
      if (report) {
        await fireEvent.press(report);
        break;
      }
      const next = screen.queryByText('Następne rozdanie');
      if (next) {
        await fireEvent.press(next);
        continue;
      }
      // decyzja gracza: zawsze pierwszy przycisk (pas albo czekanie)
      if (screen.queryByText('Twoja decyzja')) {
        const buttons = screen.getAllByRole('button').filter((b) => b.props.accessibilityLabel === undefined);
        const first = screen.queryByText(/^Pas|^Czekam/);
        await fireEvent.press(first ?? buttons[0]!);
      }
    }
    expect(mockReplace).toHaveBeenCalledWith(expect.objectContaining({ pathname: '/play/report/[id]' }));

    // raport tej sesji: nagłówek „Oceniono X z Y”, wynik w bb z dopiskiem o wariancji
    mockParams.id = (mockReplace.mock.calls[0]![0] as { params: { id: string } }).params.id;
    jest.useRealTimers();
    await render(<PlayReportScreen />);
    expect(screen.getByText(/^Oceniono \d+ z \d+ decyzji$/)).toBeTruthy();
    expect(screen.getByText(/^Wynik w żetonach/)).toBeTruthy();
    expect(screen.getByText(/za mało, żeby wynik coś mówił/)).toBeTruthy();
  });

  it('limit czasu: po czasie aplikacja sama czeka albo pasuje', async () => {
    usePlaySetup.getState().set({ hands: 10, areaModule: 'm3', timeLimitS: 15 });
    await render(<PlayTableScreen />);
    for (let step = 0; step < 50 && !screen.queryByText('Twoja decyzja'); step++) {
      await act(async () => {
        jest.advanceTimersByTime(700);
      });
    }
    expect(screen.getByText('15 s')).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(16_000);
    });
    expect(screen.queryByText('15 s')).toBeNull();
  });
});
