/// <reference types="jest" />
/**
 * Przegląd D-043 sesji Q (P1): `usePostep` zwraca nowy obiekt przy każdym renderze `RootLayout`, a i18next 26.4.2 emituje
 * `languageChanged` także przy tym samym języku (dist/esm/i18next.js:2024) — efekt zależny od całego obiektu stosował
 * zapisany język po każdym renderze, a każde zastosowanie wywoływało kolejny render (pętla). Język stosowany raz na port.
 */
import { renderHook, waitFor } from '@testing-library/react-native';
import type { PortBazy } from '@szkola/postep';
import { useJezykPrzedTresca } from '../jezykStartu';

const port = {} as PortBazy;

describe('useJezykPrzedTresca (przegląd D-043 sesji Q)', () => {
  it('nowy obiekt stanu z tym samym portem: zapisany język stosowany raz', async () => {
    const zastosuj = jest.fn(async () => undefined);
    const { result, rerender } = await renderHook(({ s }: { s: { stan: 'ok'; port: PortBazy } }) => useJezykPrzedTresca(s, zastosuj), {
      initialProps: { s: { stan: 'ok' as const, port } },
    });
    await waitFor(() => expect(result.current).toBe(true));
    await rerender({ s: { stan: 'ok' as const, port } });
    await rerender({ s: { stan: 'ok' as const, port } });
    expect(zastosuj).toHaveBeenCalledTimes(1);
  });

  it('błąd startu postępu: gotowe bez stosowania (język z i18n); ładowanie: niegotowe', async () => {
    const zastosuj = jest.fn(async () => undefined);
    const { result, rerender } = await renderHook(({ s }: { s: { stan: 'ladowanie' } | { stan: 'blad' } }) => useJezykPrzedTresca(s, zastosuj), {
      initialProps: { s: { stan: 'ladowanie' } },
    });
    expect(result.current).toBe(false);
    await rerender({ s: { stan: 'blad' } });
    await waitFor(() => expect(result.current).toBe(true));
    expect(zastosuj).not.toHaveBeenCalled();
  });

  it('błąd zastosowania języka: i tak gotowe (treść startuje w języku z i18n)', async () => {
    const zastosuj = jest.fn(async () => {
      throw new Error('i18n');
    });
    const { result } = await renderHook(() => useJezykPrzedTresca({ stan: 'ok', port }, zastosuj));
    await waitFor(() => expect(result.current).toBe(true));
  });
});
