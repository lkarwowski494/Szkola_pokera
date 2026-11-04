import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JEZYKI, NAKLADKI, ZRODLO } from '@szkola/jezyki';
import { SLOWNIKI, WYDANE } from '../slowniki';

const korzen = join(__dirname, '../../..');
const app = JSON.parse(readFileSync(join(korzen, 'app.json'), 'utf8')).expo;
const wtyczka = (app.plugins as unknown[]).find((p) => Array.isArray(p) && p[0] === 'expo-localization') as [string, { supportedLocales: { ios: string[]; android: string[] }; supportsRTL: boolean }] | undefined;
const pliki = readdirSync(join(__dirname, '../locales')).filter((f) => /^[A-Za-z-]+\.json$/.test(f) && !f.includes('kontekst')).map((f) => f.replace('.json', ''));
const razem = (a: readonly string[]) => [...a].sort();

describe('supportedLocales = słowniki = rejestr (definicja ukończenia roli 09)', () => {
  it('język źródłowy jest w wydaniu, a każdy wydany język jest na liście 35', () => {
    expect(WYDANE).toContain(ZRODLO);
    for (const j of WYDANE) expect(JEZYKI).toContain(j);
  });
  it('pliki locales/*.json = słowniki zarejestrowane w slowniki.ts', () => {
    expect(razem(pliki)).toEqual(razem(WYDANE));
    expect(razem(Object.keys(SLOWNIKI))).toEqual(razem(WYDANE));
  });
  it('wtyczka expo-localization deklaruje te same języki na iOS i Androidzie, bez RTL', () => {
    expect(wtyczka).toBeDefined();
    expect(razem(wtyczka![1].supportedLocales.ios)).toEqual(razem(WYDANE));
    expect(razem(wtyczka![1].supportedLocales.android)).toEqual(razem(WYDANE));
    expect(wtyczka![1].supportsRTL).toBe(false);
  });
  it('locales (nazwa pod ikoną i teksty systemowe) obejmuje każdy wydany język, a pliki istnieją', () => {
    expect(razem(Object.keys(app.locales))).toEqual(razem(WYDANE));
    for (const sciezka of Object.values(app.locales) as string[]) expect(existsSync(join(korzen, sciezka))).toBe(true);
  });
  it('ios.infoPlist.CFBundleAllowMixedLocalizations jest włączone', () => {
    expect(app.ios.infoPlist.CFBundleAllowMixedLocalizations).toBe(true);
  });
  it('polyfille.ts importuje dane liczby mnogiej dla każdego wydanego języka (język bazowy dla wariantów)', () => {
    const kod = readFileSync(join(__dirname, '../polyfille.ts'), 'utf8');
    const dane = [...kod.matchAll(/locale-data\/([A-Za-z-]+)\.js/g)].map((m) => m[1]!);
    const bazowe = new Set(WYDANE.map((j) => (NAKLADKI[j] ?? j).split('-')[0]!));
    expect(razem(dane)).toEqual(razem([...bazowe]));
    expect(kod).toContain('polyfill-force.js');
  });
  it('nazwa pod ikoną w każdym pliku systemowym jest niepusta', () => {
    for (const sciezka of Object.values(app.locales) as string[]) {
      const j = JSON.parse(readFileSync(join(korzen, sciezka), 'utf8'));
      expect(String(j.ios?.CFBundleDisplayName ?? '').length).toBeGreaterThan(0);
      expect(String(j.android?.app_name ?? '').length).toBeGreaterThan(0);
    }
  });
});
