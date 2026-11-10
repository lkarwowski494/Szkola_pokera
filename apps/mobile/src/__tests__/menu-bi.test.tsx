/// <reference types="jest" />
/// <reference types="node" />
/**
 * Menu główne W2 (BI, D-541/D-542/D-540, KO-045): testy renderu prawdziwych ekranów „Dziś”, „Lekcje”, „Postęp”, „Scenariusze”
 * na bazie treści pl (node:sqlite) i `postep.db` testowym; atrapy tylko platformy (router, bezpieczne obszary).
 * Układu i wyglądu Jest nie liczy (RNTL) — zrzuty Expo web w `docs/programista/dowody/`.
 */
import '@/i18n';
import i18n from 'i18next';
import { StyleSheet } from 'react-native';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';
import { zapiszPowtorke } from '@szkola/postep';
import { PostepKontekst } from '@/data/postepKontekst';
import { portTestowy } from '@/test-utils/postepTestowy';
import { sciezkaTresciPl } from '@/test-utils/trescPl';
import { elementyBezRoliLubNazwy } from '@/test-utils/ekrany/wspolne';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const sqlite = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
const parametry = (p: unknown[]) => (p.length === 1 && Array.isArray(p[0]) ? p[0] : p) as (string | number | null)[];
const mockBaza = {
  getAllSync: (sql: string, ...p: unknown[]) => sqlite.prepare(sql).all(...parametry(p)),
  getFirstSync: (sql: string, ...p: unknown[]) => sqlite.prepare(sql).get(...parametry(p)) ?? null,
};
const mockPush = jest.fn();

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useEffect } = require('react') as typeof import('react');
  return { router: { push: (...a: unknown[]) => mockPush(...a), back: jest.fn() }, useFocusEffect: (cb: () => void) => useEffect(cb, [cb]) };
});
jest.mock('expo-constants', () => ({ expoConfig: { version: '1.0.0' } }));
jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));
jest.mock('@/data/tresc/kontekst', () => ({ useBazaTresci: () => mockBaza }));
jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));

import TodayScreen from '@/app/(tabs)/index';
import LessonsScreen from '@/app/(tabs)/lessons';
import ProgressScreen from '@/app/(tabs)/progress';
import ScenariosScreen from '@/app/scenarios';

const t = i18n.t.bind(i18n);
const ID_LEKCJI = (sqlite.prepare('SELECT id FROM lessons ORDER BY module_id, ord LIMIT 1').get() as { id: string }).id;
const LICZBA_LEKCJI = (sqlite.prepare('SELECT COUNT(*) AS n FROM lessons').get() as { n: number }).n;

async function otworz(Ekran: () => React.JSX.Element) {
  const p = await portTestowy();
  await render(
    <PostepKontekst.Provider value={p.port}>
      <Ekran />
    </PostepKontekst.Provider>,
  );
  return p;
}
const wymiar = (el: { props: { style?: unknown } }) => StyleSheet.flatten(el.props.style as Parameters<typeof StyleSheet.flatten>[0]) as { width?: number; height?: number };

beforeEach(() => mockPush.mockReset());

describe('„Dziś” (BR-MENU-001 po ER-16, D-541)', () => {
  it('kafelki Powtórki, Sesja ćwiczeń, Scenariusze jako przyciski; bez listy lekcji i bez Wskaźnika zaawansowania', async () => {
    await otworz(TodayScreen);
    await waitFor(() => expect(screen.getByTestId('dzis-lekcja')).toBeTruthy());
    for (const id of ['dzis-powtorki', 'dzis-cwiczenia', 'dzis-scenariusz']) expect(screen.getByTestId(id).props.accessibilityRole).toBe('button');
    expect(screen.getByText(t('today.practice'))).toBeTruthy();
    expect(screen.getByText(t('today.scenarios'))).toBeTruthy();
    expect(screen.queryByTestId(`lesson-${ID_LEKCJI}`)).toBeNull();
    expect(screen.queryByText(t('advancement.title'))).toBeNull();
    expect(screen.queryByText(t('today.allLessons'))).toBeNull();
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });

  it('kafelek Powtórki: liczba kart z terminem do teraz („N na dziś”) i etykieta „Powtórki. N na dziś.”', async () => {
    const p = await portTestowy();
    const teraz = Date.now();
    for (const r of ['rodzina.a', 'rodzina.b']) {
      await zapiszPowtorke(
        p.port,
        { rodzina_id: r, termin_ms: teraz - 1000, stabilnosc: 1, trudnosc: 5, dni_zaplanowane: 1, kroki_nauki: 0, powtorzenia: 1, zapomnienia: 0, stan: 2, ostatnia_powtorka_ms: teraz - 86_400_000, zmieniono_ms: teraz },
        { odpowiedz_id: null, ocena_fsrs: 3, stan_przed: 0, termin_przed_ms: teraz - 86_400_000, powtorzono_ms: teraz - 86_400_000 },
      );
    }
    await render(
      <PostepKontekst.Provider value={p.port}>
        <TodayScreen />
      </PostepKontekst.Provider>,
    );
    const kafel = await screen.findByLabelText(`${t('today.reviewsTile')}. ${t('today.reviewsTileDue', { count: 2 })}.`);
    expect(kafel.props.testID).toBe('dzis-powtorki');
    expect(screen.getByText(t('today.reviewsTileDue', { count: 2 }))).toBeTruthy();
    await fireEvent.press(kafel);
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/session', params: { mode: 'review' } });
  });

  it('kafelki prowadzą jednym dotknięciem: ćwiczenia → sesja, scenariusze → ekran scenariuszy', async () => {
    await otworz(TodayScreen);
    await fireEvent.press(await screen.findByTestId('dzis-cwiczenia'));
    expect(mockPush).toHaveBeenLastCalledWith({ pathname: '/session', params: { mode: 'practice' } });
    await fireEvent.press(screen.getByTestId('dzis-scenariusz'));
    expect(mockPush).toHaveBeenLastCalledWith('/scenarios');
  });

  it('zębatka (D-540): przycisk 44×44 pt z etykietą „Ustawienia”, bez hitSlop, rysunek SVG 24 pt, otwiera ustawienia', async () => {
    await otworz(TodayScreen);
    const z = await screen.findByTestId('ustawienia');
    expect(z.props.accessibilityRole).toBe('button');
    expect(z.props.accessibilityLabel).toBe(t('settings.title'));
    expect(z.props.hitSlop).toBeUndefined();
    const w = wymiar(z);
    expect([w.width, w.height]).toEqual([44, 44]);
    const rys = within(z).getByTestId('ikona-ustawienia', { includeHiddenElements: true });
    expect([rys.props.width, rys.props.height, rys.props.strokeWidth]).toEqual([24, 24, 2]);
    await fireEvent.press(z);
    expect(mockPush).toHaveBeenCalledWith('/settings');
  });
});

describe('„Lekcje” (D-542)', () => {
  it('licznik „N z M lekcji”, 14 modułów, bieżący moduł rozwinięty (lekcje + egzamin), reszta zwinięta', async () => {
    await otworz(LessonsScreen);
    await waitFor(() => expect(screen.getByText(t('learn.lessonsDone', { done: 0, total: LICZBA_LEKCJI }))).toBeTruthy());
    const naglowki = screen.getAllByTestId(/^modul-/);
    expect(naglowki.length).toBe((sqlite.prepare('SELECT COUNT(*) AS n FROM modules').get() as { n: number }).n);
    const rozwiniete = naglowki.filter((n) => n.props.accessibilityState?.expanded === true);
    expect(rozwiniete).toHaveLength(1);
    expect(screen.getByTestId(`lesson-${ID_LEKCJI}`)).toBeTruthy();
    expect(screen.getAllByText(t('exam.start'))).toHaveLength(1);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });

  it('stuknięcie zwiniętego modułu rozwija go w miejscu; lekcja otwiera się jak dotąd', async () => {
    await otworz(LessonsScreen);
    const zwiniety = (await screen.findAllByTestId(/^modul-/)).find((n) => n.props.accessibilityState?.expanded === false);
    expect(zwiniety).toBeTruthy();
    await fireEvent.press(zwiniety!);
    await waitFor(() => expect(screen.getAllByTestId(/^modul-/).filter((n) => n.props.accessibilityState?.expanded === true).length).toBe(2));
    await fireEvent.press(screen.getByTestId(`lesson-${ID_LEKCJI}`));
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/lesson/[id]', params: { id: ID_LEKCJI } });
  });
});

describe('„Postęp” (KO-045)', () => {
  it('Wskaźnik zaawansowania jako pierwszy element ekranu', async () => {
    await otworz(ProgressScreen);
    await screen.findByText(t('advancement.title'));
    const karta = screen.getByLabelText(new RegExp(`^${t('advancement.title')}: `));
    expect(karta.props.accessibilityRole).toBe('button');
    await act(async () => fireEvent.press(karta));
    expect(mockPush).toHaveBeenCalledWith('/advancement');
  });
});

describe('„Scenariusze” do czasu kroku F', () => {
  it('stan „wkrótce” bez przycisków (brak martwego przycisku)', async () => {
    await otworz(ScenariosScreen);
    expect(screen.getByText(t('scenarios.title'))).toBeTruthy();
    expect(screen.getByText(t('scenarios.soon'))).toBeTruthy();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
