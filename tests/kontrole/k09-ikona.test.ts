// K-09 (ikona, D-123 / KO-025): pliki ikon aplikacji = zaakceptowane pliki z docs/design/ikona/ (sha256), a wpisy app.json
// zgodne z docs/design/design-spec.md:79–82. Wyrocznia: decyzja właściciela D-123 („Dobrze to wygląda. Akceptuję”).
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const korzen = new URL('../../', import.meta.url);
const sha = (sciezka: string): string => createHash('sha256').update(readFileSync(new URL(sciezka, korzen))).digest('hex');
const aplikacja = JSON.parse(readFileSync(new URL('apps/mobile/app.json', korzen), 'utf8')).expo as {
  icon?: string;
  ios?: { icon?: { light?: string; dark?: string } | string };
  android?: { adaptiveIcon?: Record<string, string> };
  plugins?: (string | [string, Record<string, unknown>?])[];
};
const PLIKI = ['icon.png', 'ios-dark.png', 'android-foreground.png', 'android-monochrome.png', 'splash-icon.png'] as const;
const splash = (aplikacja.plugins ?? []).flatMap((w) => (Array.isArray(w) && w[0] === 'expo-splash-screen' ? [w[1] ?? {}] : []))[0] ?? {};

describe('AK-K-09-ikona: zaakceptowana ikona w aplikacji', () => {
  it.each(PLIKI)('AK-K-09-i1 %s w apps/mobile/assets/images/ jest bajt w bajt plikiem z docs/design/ikona/', (nazwa) => {
    expect(existsSync(new URL(`apps/mobile/assets/images/${nazwa}`, korzen))).toBe(true);
    expect(sha(`apps/mobile/assets/images/${nazwa}`)).toBe(sha(`docs/design/ikona/${nazwa}`));
  });
  it('AK-K-09-i2 wpisy ikon iOS (jasna i ciemna) i ogólna ikona wg design-spec.md:82', () => {
    expect(aplikacja.icon).toBe('./assets/images/icon.png');
    expect(aplikacja.ios?.icon).toEqual({ light: './assets/images/icon.png', dark: './assets/images/ios-dark.png' });
  });
  it('AK-K-09-i3 ikona adaptacyjna Androida: pierwszy plan, monochromatyczna i tło #22488A, bez obrazu tła', () => {
    expect(aplikacja.android?.adaptiveIcon).toEqual({
      foregroundImage: './assets/images/android-foreground.png',
      monochromeImage: './assets/images/android-monochrome.png',
      backgroundColor: '#22488A',
    });
  });
  it('AK-K-09-i4 ekran startowy: splash-icon.png, tło #E9EDF5, ciemne #0A1430', () => {
    expect(splash.image).toBe('./assets/images/splash-icon.png');
    expect(splash.backgroundColor).toBe('#E9EDF5');
    expect(splash.dark).toEqual({ image: './assets/images/splash-icon.png', backgroundColor: '#0A1430' });
  });
});
