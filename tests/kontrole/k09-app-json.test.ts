// K-09 (kontrole-07.md): konfiguracja `apps/mobile/app.json`; bramka w `pnpm run ci` (`test:kontrole`, D-236) od części 4 kroku 4. Wyrocznie: ADR 0009 (bez Sentry, manifest bez zbieranych danych),
// ADR 0012 pkt 5 i tlo-i-bledy.md §3 (`expo-notifications` z `enableRemoteNotifications: false`, bez
// `enableBackgroundRemoteNotifications`), tlo-i-bledy.md §1 (bez `UIBackgroundModes`), prywatnosc.md (`NSPrivacyTracking` false).
// Odczyt pliku zamiast `expo config --type introspect`: wtyczki mogą dopisać klucze (np. `remote-notification`), dlatego
// sprawdzane są też opcje wtyczek; pełny Info.plist po prebuildzie = build na macOS (strategia.md §8).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type Wtyczka = string | [string, Record<string, unknown>?];
const app = JSON.parse(readFileSync(new URL('../../apps/mobile/app.json', import.meta.url), 'utf8')).expo as {
  ios?: { infoPlist?: Record<string, unknown>; privacyManifests?: Record<string, unknown> };
  plugins?: Wtyczka[];
  extra?: Record<string, unknown>;
};
const wtyczki = (app.plugins ?? []).map((w) => (typeof w === 'string' ? { nazwa: w, opcje: {} } : { nazwa: w[0], opcje: w[1] ?? {} }));

describe('AK-K-09: app.json', () => {
  it('AK-K-09-a bez UIBackgroundModes (ADR 0013: brak pracy w tle poza ochroną długich operacji)', () => {
    expect(app.ios?.infoPlist ?? {}).not.toHaveProperty('UIBackgroundModes');
  });
  it('AK-K-09-b expo-notifications z enableRemoteNotifications: false, bez powiadomień zdalnych w tle (ADR 0012 pkt 5)', () => {
    const n = wtyczki.filter((w) => w.nazwa === 'expo-notifications');
    expect(n).toHaveLength(1);
    expect(n[0]!.opcje.enableRemoteNotifications).toBe(false);
    expect(n[0]!.opcje.enableBackgroundRemoteNotifications ?? false).toBe(false);
  });
  it('AK-K-09-c manifest prywatności: NSPrivacyCollectedDataTypes pusty, bez śledzenia (ADR 0009, „Data Not Collected”)', () => {
    const m = app.ios?.privacyManifests ?? {};
    expect(m.NSPrivacyCollectedDataTypes).toEqual([]);
    expect(m.NSPrivacyTracking ?? false).toBe(false);
    expect(m.NSPrivacyTrackingDomains ?? []).toEqual([]);
  });
  it('AK-K-09-d bez wtyczki i konfiguracji Sentry (ADR 0009)', () => {
    expect(wtyczki.map((w) => w.nazwa).filter((n) => /sentry/i.test(n))).toEqual([]);
    expect(Object.keys(app.extra ?? {}).filter((k) => /sentry/i.test(k))).toEqual([]);
  });
});
