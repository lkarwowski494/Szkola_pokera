/// <reference types="jest" />
// Krok 4 części 4 (ADR 0012 pkt 1, 5): adapter PortPowiadomien na expo-notifications 58.1.8 (kształt portu:
// packages/domena/src/przypomnienie.ts). Atrapa modułu: sprawdzamy wywołania API i przekazanie błędów do domeny.
import { ID_PRZYPOMNIENIA, odtworzPrzypomnienie, wlaczPrzypomnienie } from '@szkola/domena';
import { powiadomieniaExpo } from '@/platform/powiadomienia';

jest.mock('expo-notifications', () => ({
  SchedulableTriggerInputTypes: { DAILY: 'daily' },
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(() => Promise.resolve()),
  scheduleNotificationAsync: jest.fn(() => Promise.resolve('id-systemowe')),
}));
const N = jest.requireMock<Record<string, jest.Mock>>('expo-notifications');
const TEKST = { tytul: 'T', tresc: 'B' };

beforeEach(() => Object.values(N).forEach((f) => typeof f === 'function' && f.mockClear()));

describe('adapter powiadomień (expo-notifications)', () => {
  it('zgoda i prośba: tylko granted i canAskAgain z odpowiedzi systemu', async () => {
    N.getPermissionsAsync!.mockResolvedValueOnce({ granted: false, canAskAgain: true, status: 'undetermined', expires: 'never' });
    N.requestPermissionsAsync!.mockResolvedValueOnce({ granted: true, canAskAgain: true, status: 'granted', expires: 'never' });
    expect(await powiadomieniaExpo.zgoda()).toEqual({ granted: false, canAskAgain: true });
    expect(await powiadomieniaExpo.popros()).toEqual({ granted: true, canAskAgain: true });
  });

  it('włączenie: anuluje własne, potem jedno żądanie ze stałym identyfikatorem i wyzwalaczem daily', async () => {
    N.getPermissionsAsync!.mockResolvedValue({ granted: true, canAskAgain: true });
    const w = await wlaczPrzypomnienie(powiadomieniaExpo, { godzina: 19, minuta: 5 }, TEKST);
    expect(w).toEqual({ ok: true, wartosc: { wlaczone: true, godzina: 19, minuta: 5 } });
    expect(N.cancelAllScheduledNotificationsAsync).toHaveBeenCalledTimes(1);
    expect(N.scheduleNotificationAsync).toHaveBeenCalledWith({
      identifier: ID_PRZYPOMNIENIA,
      content: { title: 'T', body: 'B' },
      trigger: { type: 'daily', hour: 19, minute: 5 },
    });
    expect(N.cancelAllScheduledNotificationsAsync!.mock.invocationCallOrder[0]).toBeLessThan(N.scheduleNotificationAsync!.mock.invocationCallOrder[0]!);
  });

  it('błąd planowania w systemie dociera do domeny jako planowanie_nieudane (adapter nie połyka wyjątku)', async () => {
    N.getPermissionsAsync!.mockResolvedValue({ granted: true, canAskAgain: true });
    N.scheduleNotificationAsync!.mockRejectedValueOnce(new Error('system'));
    expect(await wlaczPrzypomnienie(powiadomieniaExpo, { godzina: 8, minuta: 0 }, TEKST)).toEqual({ ok: false, powod: 'planowanie_nieudane' });
  });

  it('odtworzenie bez zgody: anuluje własne i nie planuje', async () => {
    N.getPermissionsAsync!.mockResolvedValue({ granted: false, canAskAgain: false });
    expect(await odtworzPrzypomnienie(powiadomieniaExpo, { wlaczone: true, godzina: 8, minuta: 0 }, TEKST)).toBe('brak_zgody');
    expect(N.requestPermissionsAsync).not.toHaveBeenCalled();
    expect(N.scheduleNotificationAsync).not.toHaveBeenCalled();
    expect(N.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
  });
});
