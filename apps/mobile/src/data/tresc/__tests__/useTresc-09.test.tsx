/// <reference types="jest" />
/**
 * Rola 09, K2c (reszta D-269): baza treści idzie za językiem aplikacji. Zmiana języka (wybór w ustawieniach albo
 * zapisany wybór zastosowany przy starcie) przygotowuje bazę nowego języka; do czasu gotowości zostaje poprzednia
 * (bez ekranu ładowania), a błąd nowej bazy zostawia poprzednią i zapisuje błąd w dzienniku.
 */
import { act, renderHook, waitFor } from '@testing-library/react-native';
import i18n from 'i18next';
import { useTresc } from '../useTresc';

type W = { ok: true; wartosc: { plik: string } } | { ok: false; powod: 'tresc_niedostepna' };

describe('useTresc według języka (K2c)', () => {
  afterEach(async () => {
    await act(async () => {
      await i18n.changeLanguage('pl');
    });
  });

  it('start: baza języka aplikacji; zmiana języka: baza nowego języka bez stanu ładowania po drodze', async () => {
    const wywolania: string[] = [];
    const przygotuj = jest.fn(async (j: string): Promise<W> => (wywolania.push(j), { ok: true, wartosc: { plik: `tresc-${j}.db` } }));
    const stany: string[] = [];
    const { result } = await renderHook(() => {
      const s = useTresc(przygotuj, () => undefined);
      stany.push(s.stan === 'ok' ? s.plik : s.stan);
      return s;
    });
    await waitFor(() => expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-pl.db' }));
    stany.length = 0;
    await act(async () => {
      await i18n.changeLanguage('en');
    });
    await waitFor(() => expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-en.db' }));
    expect(wywolania).toEqual(['pl', 'en']);
    expect(stany).not.toContain('ladowanie');
  });

  it('błąd bazy nowego języka: zostaje poprzednia, błąd w dzienniku', async () => {
    const przygotuj = async (j: string): Promise<W> => (j === 'en' ? { ok: false, powod: 'tresc_niedostepna' } : { ok: true, wartosc: { plik: `tresc-${j}.db` } });
    const blad = jest.fn();
    const { result } = await renderHook(() => useTresc(przygotuj, blad));
    await waitFor(() => expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-pl.db' }));
    await act(async () => {
      await i18n.changeLanguage('en');
    });
    await waitFor(() => expect(blad).toHaveBeenCalledWith('tresc_niedostepna'));
    expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-pl.db' });
  });

  it('przygotowania idą po kolei: następne zaczyna się po zakończeniu poprzedniego (przegląd D-043, znalezisko 2)', async () => {
    const wywolania: string[] = [];
    const czekajace: (() => void)[] = [];
    const przygotuj = (j: string) =>
      new Promise<W>((ok) => {
        wywolania.push(j);
        czekajace.push(() => ok({ ok: true, wartosc: { plik: `tresc-${j}.db` } }));
      });
    const { result } = await renderHook(() => useTresc(przygotuj, () => undefined));
    await act(async () => {
      await i18n.changeLanguage('en');
    });
    expect(wywolania).toEqual(['pl']);
    await act(async () => {
      czekajace.shift()!();
    });
    await waitFor(() => expect(wywolania).toEqual(['pl', 'en']));
    await act(async () => {
      czekajace.shift()!();
    });
    await waitFor(() => expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-en.db' }));
  });
});
