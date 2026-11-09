/// <reference types="jest" />
// 10-D01-02 (docs/wydanie/sklep.md §4, ŚREDNIE): ekran zakupu dostępny z ustawień także przed wyczerpaniem dziennego limitu.
// Wzór Treningu (D-191): components/SubscriptionCard.tsx:25 — wiersz w sekcji subskrypcji ustawień otwiera ekran planów
// (`/paywall?reason=settings`), odczyt 2026-11-09 (2e4b0f8). Wiersz tylko bez pełnego dostępu; ekran zakupu otwarty
// z ustawień nie pokazuje „Wróć do lekcji” (nie ma lekcji, do której się wraca).
import '@/i18n';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { PostepKontekst } from '@/data/postepKontekst';
import { portTestowy } from '@/test-utils/postepTestowy';
import EkranZakupu from '@/features/zakup/EkranZakupu';
import { useDostep } from '@/state/dostep';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
const mockPush = jest.fn();
jest.mock('expo-router', () => {
  const { useEffect } = jest.requireActual<typeof import('react')>('react');
  return { router: { push: (...a: unknown[]) => mockPush(...a) }, useFocusEffect: (f: () => void) => useEffect(f, [f]) };
});
jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));
jest.mock('@/data/tresc/plikiExpo', () => ({ katalogBazExpo: () => '/k', systemExpo: { plik: () => ({ exists: false }) } }));
jest.mock('@/platform/ochronaTla', () => ({ utworzOchroneTla: () => undefined }));
jest.mock('@/platform/zakupy', () => ({ sklepAplikacji: () => ({ przywroc: async () => 'brak_zakupow', zarzadzaj: async () => undefined, odczyt: async () => ({ ok: false }) }) }));
const mockZaplanowane: unknown[] = [];
jest.mock('@/platform/powiadomienia', () => ({
  powiadomieniaExpo: {
    zgoda: async () => ({ granted: true, canAskAgain: false }),
    popros: async () => ({ granted: true, canAskAgain: false }),
    anulujWszystkie: async () => { mockZaplanowane.length = 0; },
    zaplanuj: async (z: { wyzwalacz: unknown }) => { mockZaplanowane.push(z.wyzwalacz); return 'id'; },
  },
}));

import SettingsRoute from '@/app/settings';

async function wyrenderuj() {
  const t = await portTestowy();
  await render(
    <PostepKontekst.Provider value={t.port}>
      <SettingsRoute />
    </PostepKontekst.Provider>,
  );
}

beforeEach(() => {
  mockPush.mockReset();
  jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
});
afterEach(async () => {
  jest.restoreAllMocks();
  await act(async () => useDostep.setState({ pro: false }));
});

describe('10-D01-02: „Pełny dostęp” w ustawieniach', () => {
  it('bez pełnego dostępu: wiersz „Pełny dostęp” w sekcji zakupów otwiera ekran zakupu', async () => {
    await wyrenderuj();
    await fireEvent.press(await screen.findByRole('button', { name: 'Pełny dostęp' }));
    expect(mockPush).toHaveBeenCalledWith('/purchase');
  });

  it('z pełnym dostępem: wiersza nie ma', async () => {
    await act(async () => useDostep.setState({ pro: true }));
    await wyrenderuj();
    await screen.findByRole('button', { name: 'Przywróć zakupy' });
    expect(screen.queryByRole('button', { name: 'Pełny dostęp' })).toBeNull();
  });

  it('ekran zakupu bez „Wróć do lekcji”, gdy otwarty spoza lekcji (bez onWrocDoLekcji); „Zamknij” zostaje', async () => {
    const sklep = { produkty: async () => ({ ok: true as const, produkty: [] }), kup: async () => 'blad' as const, przywroc: async () => 'blad' as const };
    await render(<EkranZakupu sklep={sklep} onDostep={jest.fn()} onZamknij={jest.fn()} otworzWarunki={jest.fn()} otworzPrywatnosc={jest.fn()} />);
    await screen.findByRole('button', { name: 'Przywróć zakupy' });
    expect(screen.queryByRole('button', { name: 'Wróć do lekcji' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Zamknij' })).toBeTruthy();
  });
});
