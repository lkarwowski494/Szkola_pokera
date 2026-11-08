// R-56 / AK-D050: kontrakt runner ↔ narzędzia (D-050, zasada wspólna 21; L-07). Wyrocznie: ADR 0001 (SDK 58) i tabela
// minimalnego Xcode dla SDK niżej (jedno miejsce; workflowy mają tę samą liczbę w sprawdzeniu `sort -V`).
// Bramka w `pnpm run ci` (`test:kontrole`, D-236) od podniesienia SDK do 58 (rola 08, część 4 krok 3).
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// SDK → minimalny Xcode. 57: „Expo SDK 57 wymaga Xcode 26.4+” — komentarz w `iphone-local.yml` (wcześniejsza rola, źródło
// tam: actions/runner-images#14001), niesprawdzony dziś: docs.expo.dev odrzucone przez proxy kontenera (2026-11-07).
// 58: tabela „Xcode” na docs.expo.dev (`docs/pages/versions/unversioned/index.mdx` → `<AndroidIOSCompatibilityTable />`,
// kolumna `version.xcode`) czyta `packages/@expo/sdk-compatibility/src/sdk-compatibility.json` (raw.githubusercontent.com/
// expo/expo/main, odczyt 2026-11-08): `"sdk": "58.0.0"` … `"xcodeVersionRange": ">=26.4.0"` (D-235; docs.expo.dev: proxy 403).
const MIN_XCODE: Record<number, string | null> = { 57: '26.4', 58: '26.4' };

const WF = new URL('../../.github/workflows/', import.meta.url);
const workflowy = readdirSync(WF).filter((n) => n.endsWith('.yml')).map((n) => ({ n, t: readFileSync(new URL(n, WF), 'utf8') }));
const sdk = (() => {
  const v = (JSON.parse(readFileSync(new URL('../../apps/mobile/package.json', import.meta.url), 'utf8')) as { dependencies: Record<string, string> }).dependencies.expo!;
  return Number(v.match(/(\d+)\./)![1]);
})();
const macos = workflowy.filter((w) => /runs-on:\s*macos/.test(w.t));

describe('AK-D050: runner macOS ↔ Xcode ↔ SDK', () => {
  it('AK-D050-a SDK w apps/mobile/package.json zgodny z ADR 0001 (58)', () => {
    expect(sdk).toBe(58);
  });
  it('AK-D050-b minimalny Xcode dla bieżącego SDK jest ustalony (ze źródłem)', () => {
    expect(MIN_XCODE[sdk] ?? null, `SDK ${sdk}: brak wpisu w tabeli MIN_XCODE`).not.toBeNull();
  });
  it('AK-D050-c każdy workflow na macOS: przypięty obraz (nie macos-latest) i sprawdzenie Xcode z tabeli dla SDK', () => {
    expect(macos.length).toBeGreaterThan(0);
    for (const w of macos) {
      const obrazy = [...w.t.matchAll(/runs-on:\s*(\S+)/g)].map((m) => m[1]!).filter((r) => r.startsWith('macos'));
      expect({ wf: w.n, obrazy: obrazy.filter((r) => !/^macos-\d+$/.test(r)) }).toEqual({ wf: w.n, obrazy: [] });
      const progi = [...w.t.matchAll(/printf '%s\\n' ([\d.]+) "\$v" \| sort -V \| head -1\)" = "([\d.]+)"/g)].map((m) => [m[1], m[2]]);
      expect({ wf: w.n, progi }).toEqual({ wf: w.n, progi: [[MIN_XCODE[sdk], MIN_XCODE[sdk]]] });
      expect({ wf: w.n, wypisuje: /xcodebuild -version/.test(w.t), pada: /exit 1/.test(w.t) }).toEqual({ wf: w.n, wypisuje: true, pada: true });
    }
  });
});
