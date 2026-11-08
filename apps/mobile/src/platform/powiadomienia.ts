import type { PortPowiadomien, ZgodaPowiadomien } from '@szkola/domena';
import * as Notifications from 'expo-notifications';

/**
 * Adapter `PortPowiadomien` (ADR 0012; kształt portu: packages/domena/src/przypomnienie.ts) na expo-notifications 58.1.8
 * (build/*.d.ts, odczyt 2026-11-08: getPermissionsAsync, requestPermissionsAsync, cancelAllScheduledNotificationsAsync,
 * scheduleNotificationAsync z `{ type: SchedulableTriggerInputTypes.DAILY, hour, minute }`). Tylko powiadomienia lokalne:
 * bez tokenów push (ADR 0012 pkt 5, K-07), wtyczka z `enableRemoteNotifications: false` (K-09-b).
 * Wyjątki API przechodzą do domeny, która zamienia je na `planowanie_nieudane` / `wylaczone` (tlo-i-bledy.md §4).
 */
const zgodaZ = (s: { granted: boolean; canAskAgain: boolean }): ZgodaPowiadomien => ({ granted: s.granted, canAskAgain: s.canAskAgain });

export const powiadomieniaExpo: PortPowiadomien = {
  zgoda: async () => zgodaZ(await Notifications.getPermissionsAsync()),
  popros: async () => zgodaZ(await Notifications.requestPermissionsAsync()),
  anulujWszystkie: () => Notifications.cancelAllScheduledNotificationsAsync(),
  zaplanuj: ({ identyfikator, tytul, tresc, wyzwalacz }) =>
    Notifications.scheduleNotificationAsync({
      identifier: identyfikator,
      content: { title: tytul, body: tresc },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: wyzwalacz.hour, minute: wyzwalacz.minute },
    }),
};
