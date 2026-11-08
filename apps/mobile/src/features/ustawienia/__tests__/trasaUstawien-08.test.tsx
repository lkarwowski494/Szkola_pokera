/// <reference types="jest" />
// Trasa ustawień (rola 08 cz. 5b krok 5): przełącznik przypomnienia zapisuje `przypomnienie` i planuje jedno powiadomienie;
// „Usuń postęp” po potwierdzeniu czyści postęp w postep.db i anuluje przypomnienie (dane.md „Usuń postęp”); wiersze
// „Dane” i „Język” (`ustawienia-jezyk`, flow 08) prowadzą do swoich ekranów; „Opinie” ukryte bez adresu i ID sklepu (D-270).
import '@/i18n';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert, type AlertButton } from 'react-native';
import { czytajPrzypomnienie } from '@/features/ustawienia/ustawieniaAplikacji';
import { PostepKontekst } from '@/data/postepKontekst';
import { portTestowy } from '@/test-utils/postepTestowy';

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
  return t;
}

let alert: jest.SpyInstance;
beforeEach(() => {
  mockPush.mockReset();
  mockZaplanowane.length = 0;
  alert = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
});
afterEach(() => alert.mockRestore());

describe('trasa ustawień', () => {
  it('przypomnienie: włączenie zapisuje i planuje jedno powiadomienie; wyłączenie anuluje', async () => {
    const { port } = await wyrenderuj();
    const przelacznik = await screen.findByLabelText('Codzienne przypomnienie');
    await waitFor(() => expect(przelacznik.props.disabled).toBeFalsy());
    await fireEvent(przelacznik, 'valueChange', true);
    await waitFor(async () => expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: true } }));
    expect(mockZaplanowane).toHaveLength(1);
    await fireEvent(screen.getByLabelText('Codzienne przypomnienie'), 'valueChange', false);
    await waitFor(async () => expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: false } }));
    expect(mockZaplanowane).toHaveLength(0);
  });
  it('„Usuń postęp” po potwierdzeniu: karty usunięte, przypomnienie anulowane', async () => {
    const { port, db } = await wyrenderuj();
    db.prepare("INSERT INTO karta VALUES ('r1', 1, 1, 1, 1, 0, 1, 0, 2, NULL, 1)").run();
    const przelacznik = await screen.findByLabelText('Codzienne przypomnienie');
    await waitFor(() => expect(przelacznik.props.disabled).toBeFalsy());
    await fireEvent(przelacznik, 'valueChange', true);
    await waitFor(() => expect(mockZaplanowane).toHaveLength(1));
    await fireEvent.press(screen.getByRole('button', { name: 'Usuń postęp' }));
    const przyciski = (alert.mock.calls[0]?.[2] ?? []) as AlertButton[];
    await przyciski.find((b) => b.style === 'destructive')?.onPress?.();
    await waitFor(() => expect(db.prepare('SELECT count(*) AS n FROM karta').get()).toEqual({ n: 0 }));
    await waitFor(() => expect(mockZaplanowane).toHaveLength(0));
    expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: false } });
  });
  it('wiersze „Dane” i „Język” prowadzą do ekranów; „Opinie” ukryte bez adresu i ID sklepu', async () => {
    await wyrenderuj();
    await fireEvent.press(await screen.findByTestId('ustawienia-jezyk'));
    expect(mockPush).toHaveBeenLastCalledWith('/language');
    await fireEvent.press(screen.getByTestId('ustawienia-dane'));
    expect(mockPush).toHaveBeenLastCalledWith('/data');
    expect(screen.queryByText('Oceń w sklepie')).toBeNull();
  });
});
