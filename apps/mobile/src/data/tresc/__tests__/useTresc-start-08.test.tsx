/// <reference types="jest" />
/**
 * Przegląd sesji P (plan-09 §13): przy zimnym starcie z zapisanym językiem innym niż systemowy baza treści była
 * przygotowywana dwa razy (najpierw język systemu, potem zapisany — dwie kopie pliku przy każdym starcie). `useTresc`
 * czeka na zastosowanie zapisanego języka (`start`) i przygotowuje tylko bazę języka obowiązującego w tej chwili.
 */
import { act, renderHook, waitFor } from '@testing-library/react-native';
import i18n from 'i18next';
import { useTresc } from '../useTresc';

type W = { ok: true; wartosc: { plik: string } } | { ok: false; powod: 'tresc_niedostepna' };

describe('useTresc: start po zastosowaniu zapisanego języka (sesja P, plan-09 §13)', () => {
  afterEach(async () => {
    await act(async () => {
      await i18n.changeLanguage('pl');
    });
  });

  it('przed startem nic nie przygotowuje; po starcie jedna baza — w języku zapisanym', async () => {
    const wywolania: string[] = [];
    const przygotuj = async (j: string): Promise<W> => (wywolania.push(j), { ok: true, wartosc: { plik: `tresc-${j}.db` } });
    const { result, rerender } = await renderHook(({ start }: { start: boolean }) => useTresc(przygotuj, () => undefined, start), {
      initialProps: { start: false },
    });
    await act(async () => {
      await i18n.changeLanguage('en'); // zastosowanie zapisanego wyboru przed startem treści
    });
    expect(wywolania).toEqual([]);
    expect(result.current.stan).toBe('ladowanie');
    await rerender({ start: true });
    await waitFor(() => expect(result.current).toMatchObject({ stan: 'ok', plik: 'tresc-en.db' }));
    expect(wywolania).toEqual(['en']);
  });
});
