/// <reference types="jest" />
// A04-12 (audyt 04, D-283 pkt 5): haptyka oceny z tokenów `haptyka` — Zgodna i Dopuszczalna `impactLight`, Błąd
// `notificationWarning`; `notificationError` zarezerwowany dla błędu działania. Przed: Zgodna → Success, Błąd → Error.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as Haptics from 'expo-haptics';
import { haptykaOceny, wykonajHaptyke } from '../haptyka';
import { haptyka } from '@/theme/tokens';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(async () => undefined),
  notificationAsync: jest.fn(async () => undefined),
  selectionAsync: jest.fn(async () => undefined),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

describe('A04-12: haptyka oceny z tokenów', () => {
  beforeEach(() => jest.clearAllMocks());

  it('stopień → token: Zgodna i Dopuszczalna impactLight, Błąd notificationWarning; niedokładność i błąd rozmiaru jak Błąd', () => {
    expect(haptykaOceny('correct')).toBe(haptyka.ocenaZgodna);
    expect(haptykaOceny('acceptable')).toBe(haptyka.ocenaDopuszczalna);
    expect(haptykaOceny('wrong')).toBe(haptyka.ocenaBlad);
    expect(haptykaOceny('close')).toBe(haptyka.ocenaBlad);
    expect(haptykaOceny('size')).toBe(haptyka.ocenaBlad);
    for (const g of ['correct', 'acceptable', 'close', 'size', 'wrong'] as const) expect(haptykaOceny(g)).not.toBe(haptyka.bladDzialania);
  });

  it('token → wywołanie expo-haptics', async () => {
    await wykonajHaptyke('impactLight');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    await wykonajHaptyke('selection');
    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
    await wykonajHaptyke('notificationWarning');
    await wykonajHaptyke('notificationSuccess');
    await wykonajHaptyke('notificationError');
    expect((Haptics.notificationAsync as jest.Mock).mock.calls).toEqual([
      [Haptics.NotificationFeedbackType.Warning],
      [Haptics.NotificationFeedbackType.Success],
      [Haptics.NotificationFeedbackType.Error],
    ]);
  });

  it('strażnik: expo-haptics tylko w pomocniku (ekrany biorą token, nie typ powiadomienia)', () => {
    for (const plik of ['app/session.tsx', 'components/PasekStrategii.tsx']) {
      expect(readFileSync(join(__dirname, '../../..', plik), 'utf8')).not.toMatch(/from 'expo-haptics'/);
    }
  });
});
