/// <reference types="jest" />
/// <reference types="node" />
/**
 * 08-F21 / K-07 (plan-1.0): test renderu ekranu sesji — dotąd tylko strażnik statyczny (`sesja-ekran-08`) i E2E, mutanty
 * M29–M32 (gałęzie `maStrategie` w `session.tsx`) przeżywały. Poziom (zgłoszenie do 07, D-331): RNTL na prawdziwym
 * `SessionScreen` — baza treści pl przez node:sqlite (adapter `getAllSync`/`getFirstSync`, jedyne metody używane przez repo),
 * postęp na `portTestowy`, atrapy tylko platformy (router, sklep, opinie, haptyka). Zestaw zadań z prawdziwego
 * `buildLessonSession`, zawężony filtrem do rodzaju zadania, którego dotyczy przypadek (kolejność losowa nie decyduje o teście).
 */
import '@/i18n';
import i18n from 'i18next';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { DrillInstance } from '@/features/drills/types';
import { PostepKontekst } from '@/data/postepKontekst';
import { portTestowy } from '@/test-utils/postepTestowy';
import { sciezkaTresciPl } from '@/test-utils/trescPl';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const sqlite = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
const parametry = (p: unknown[]) => (p.length === 1 && Array.isArray(p[0]) ? p[0] : p) as (string | number | null)[];
const mockBaza = {
  getAllSync: (sql: string, ...p: unknown[]) => sqlite.prepare(sql).all(...parametry(p)),
  getFirstSync: (sql: string, ...p: unknown[]) => sqlite.prepare(sql).get(...parametry(p)) ?? null,
};

let mockParametry: Record<string, string> = {};
const mockBack = jest.fn();
let mockFiltr: (it: DrillInstance) => boolean = () => true;

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-router', () => ({ router: { back: () => mockBack(), push: jest.fn() }, useLocalSearchParams: () => mockParametry }));
jest.mock('expo-constants', () => ({ expoConfig: { version: '1.0.0' } }));
jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(async () => undefined),
  notificationAsync: jest.fn(async () => undefined),
  selectionAsync: jest.fn(async () => undefined),
  ImpactFeedbackStyle: { Light: 'light' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));
jest.mock('@/data/tresc/kontekst', () => ({ useBazaTresci: () => mockBaza }));
jest.mock('@/data/tresc/plikiExpo', () => ({ katalogBazExpo: () => '/k', systemExpo: { plik: () => ({ exists: false }) } }));
jest.mock('@/platform/ochronaTla', () => ({ utworzOchroneTla: () => undefined }));
jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));
jest.mock('@/platform/opinie', () => ({ ocenaExpo: { dostepna: async () => false, popros: async () => undefined } }));
jest.mock('@/platform/zakupy', () => ({ sklepAplikacji: () => ({ odczyt: async () => ({ ok: false }), produkty: async () => ({ ok: false }) }) }));
jest.mock('@/features/session/build', () => {
  const prawdziwe = jest.requireActual<typeof import('@/features/session/build')>('@/features/session/build');
  return { ...prawdziwe, buildLessonSession: (...a: Parameters<typeof prawdziwe.buildLessonSession>) => prawdziwe.buildLessonSession(...a).filter((it) => mockFiltr(it)) };
});

import SessionScreen from '@/app/session';
import { createRng } from '@szkola/poker-core';
import { getAllRangeSpots, getLessonDrills } from '@/data/content/repo';
import { maStrategie } from '@/features/stol/pasek';
import type { SQLiteDatabase } from 'expo-sqlite';

// do wyboru lekcji prawdziwa budowa zestawu (moduł w aplikacji jest zawężony filtrem przypadku)
const { buildLessonSession } = jest.requireActual<typeof import('@/features/session/build')>('@/features/session/build');
const t = i18n.t.bind(i18n);
const db = mockBaza as unknown as SQLiteDatabase;
const zakresy = getAllRangeSpots(db);
const ctx = { range: (id: string) => zakresy.get(id) };
const zeStrategia = (it: DrillInstance) => it.kind === 'choice' && maStrategie(it.options);
const bezStrategii = (it: DrillInstance) => it.kind === 'choice' && !maStrategie(it.options);
const lekcje = (sqlite.prepare('SELECT id FROM lessons ORDER BY module_id, ord').all() as { id: string }[]).map((r) => r.id);
/** Pierwsza lekcja, której zestaw (z dowolnego ziarna — sprawdzamy 3) ma zadanie danego rodzaju. */
function lekcjaZ(filtr: (it: DrillInstance) => boolean): string {
  const id = lekcje.find((l) => [1, 2, 3].every((z) => buildLessonSession(getLessonDrills(db, l), createRng(z), ctx).some(filtr)));
  if (!id) throw new Error('brak lekcji z takim zadaniem w treści pl');
  return id;
}
const OCENY_BEZ_STRATEGII = ['session.correct', 'session.acceptable', 'session.near', 'session.sizeError', 'session.wrong'].map((k) => t(k));

async function otworz(parametry: Record<string, string>, filtr: (it: DrillInstance) => boolean) {
  mockParametry = parametry;
  mockFiltr = filtr;
  const p = await portTestowy();
  await render(
    <PostepKontekst.Provider value={p.port}>
      <SessionScreen />
    </PostepKontekst.Provider>,
  );
  await waitFor(() => expect(screen.getByText(t('session.end'))).toBeTruthy());
  return p;
}

beforeEach(() => mockBack.mockReset());

describe('ekran sesji: render (08-F21, K-07)', () => {
  it('zadanie z wyborem bez strategii: lista odpowiedzi z „Wybierz odpowiedź”, po odpowiedzi nagłówek oceny słowem i „Dalej”', async () => {
    await otworz({ mode: 'lesson', lessonId: lekcjaZ(bezStrategii) }, bezStrategii);
    expect(screen.getByText(t('session.chooseAnswer'))).toBeTruthy();
    expect(screen.queryByRole('image', { name: /Strategia/ })).toBeNull();
    await act(async () => fireEvent.press(screen.getByTestId('option-0')));
    await waitFor(() => expect(screen.getByText(t('session.next'))).toBeTruthy());
    expect(OCENY_BEZ_STRATEGII.some((s) => screen.queryByText(s) !== null)).toBe(true);
    expect(screen.queryByText(t('session.chooseAnswer'))).toBeNull();
  });

  it('zadanie ze strategią solvera: panel decyzji (pasek, bez listy i bez „Wybierz odpowiedź”), po ocenie stopień w panelu zamiast nagłówka', async () => {
    await otworz({ mode: 'lesson', lessonId: lekcjaZ(zeStrategia) }, zeStrategia);
    expect(screen.queryByText(t('session.chooseAnswer'))).toBeNull();
    await act(async () => fireEvent.press(screen.getByTestId('option-0')));
    await waitFor(() => expect(screen.getByText(t('session.next'))).toBeTruthy());
    expect(OCENY_BEZ_STRATEGII.filter((s) => screen.queryByText(s) !== null)).toEqual([]);
    expect(screen.getAllByLabelText(/^Ocena: /).length).toBeGreaterThan(0); // StopienOceny w panelu
    expect(screen.getByTestId('os-paska')).toBeTruthy(); // pasek po ocenie
  });

  it('„Dalej” przechodzi do następnego zadania („2 z n”)', async () => {
    await otworz({ mode: 'lesson', lessonId: lekcjaZ(bezStrategii) }, bezStrategii);
    expect(screen.getByText(/^1 z \d+$/)).toBeTruthy();
    await act(async () => fireEvent.press(screen.getByTestId('option-0')));
    await waitFor(() => expect(screen.getByText(t('session.next'))).toBeTruthy());
    await act(async () => fireEvent.press(screen.getByText(t('session.next'))));
    await waitFor(() => expect(screen.getByText(/^2 z \d+$/)).toBeTruthy());
  });

  it('„Zakończ” w trakcie: aktywność porzucona (odpowiedzi zapisane), powrót', async () => {
    const p = await otworz({ mode: 'lesson', lessonId: lekcjaZ(bezStrategii) }, bezStrategii);
    await act(async () => fireEvent.press(screen.getByTestId('option-0')));
    await waitFor(() => expect(screen.getByText(t('session.next'))).toBeTruthy());
    await act(async () => fireEvent.press(screen.getByText(t('session.end'))));
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1));
    expect(await p.port.all('SELECT stan FROM aktywnosc')).toEqual([{ stan: 'porzucona' }]);
    expect(await p.port.all('SELECT COUNT(*) AS n FROM odpowiedz')).toEqual([{ n: 1 }]);
  });

  // 08-programista-001 (recenzja DK): flow 07 (`apps/mobile/e2e/oczekujace/07-scenariusz.yaml`) stuka po `id: 'sesja-dalej'`.
  // Kontrola przez render, nie przez tekst źródła: `Button` gubiący `testID` albo `testID` także na górnym „Zakończ” to czerwień.
  it('przycisk pod oceną ma testID `sesja-dalej` (jeden, „Dalej”), górny „Zakończ” go nie ma, stuknięcie po id daje „2 z n” bez powrotu', async () => {
    await otworz({ mode: 'lesson', lessonId: lekcjaZ(bezStrategii) }, bezStrategii);
    expect(screen.queryAllByTestId('sesja-dalej')).toHaveLength(0);
    await act(async () => fireEvent.press(screen.getByTestId('option-0')));
    await waitFor(() => expect(screen.getAllByTestId('sesja-dalej')).toHaveLength(1));
    expect(screen.getByTestId('sesja-dalej')).toHaveTextContent(t('session.next'));
    await act(async () => fireEvent.press(screen.getByTestId('sesja-dalej')));
    await waitFor(() => expect(screen.getByText(/^2 z \d+$/)).toBeTruthy());
    expect(mockBack).not.toHaveBeenCalled();
  });
});
