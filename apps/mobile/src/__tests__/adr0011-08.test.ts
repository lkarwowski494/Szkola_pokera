/// <reference types="jest" />
// Strażnik ADR 0011 (kontrola statyczna z „Potwierdzenia”; rola 08, część 4 krok 2): kod funkcji bez BR (D-104) usunięty,
// diagnostyka tylko w gałęzi `__DEV__`. Pliki testów są poza zakresem (mogą wymieniać usunięte nazwy).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = join(__dirname, '..');
const kod = (): { sciezka: string; tekst: string }[] => {
  const wynik: { sciezka: string; tekst: string }[] = [];
  const odwiedz = (k: string) => {
    for (const n of readdirSync(k)) {
      const p = join(k, n);
      if (statSync(p).isDirectory()) {
        if (n !== '__tests__') odwiedz(p);
      } else if (/\.(ts|tsx)$/.test(n) && !/\.test\.tsx?$/.test(n)) {
        wynik.push({ sciezka: relative(SRC, p).split('\\').join('/'), tekst: readFileSync(p, 'utf8') });
      }
    }
  };
  odwiedz(SRC);
  return wynik;
};

describe('ADR 0011: kod bez BR usunięty', () => {
  it.each(['features/play', 'app/play', 'app/(tabs)/rules.tsx', 'data/user/game.ts'])('brak %s', (p) => {
    expect(existsSync(join(SRC, p))).toBe(false);
  });

  it('brak trybu „speed” (Trening na czas) i odwołań do usuniętych ekranów', () => {
    const trafienia = kod().flatMap(({ sciezka, tekst }) =>
      tekst.split('\n').flatMap((l, i) => (/'speed'|"speed"|['"`]\/play\b|features\/play|data\/user\/game\b|name="rules"/.test(l) ? [`${sciezka}:${i + 1}`] : [])),
    );
    expect(trafienia).toEqual([]);
  });

  it('diagnostyka importowana i otwierana tylko w gałęzi __DEV__', () => {
    const trafienia = kod()
      .filter(({ sciezka }) => !sciezka.startsWith('features/diagnostyka/'))
      .flatMap(({ sciezka, tekst }) =>
        tekst.split('\n').flatMap((l, i) => (/features\/diagnostyka|['"`]\/diagnostics['"`]/.test(l) && !/__DEV__/.test(l) ? [`${sciezka}:${i + 1}`] : [])),
      );
    expect(trafienia).toEqual([]);
    // strażnik: ekran diagnostyki istnieje (narzędzie dewelopera zostaje, ADR 0011) i jest wołany z gałęzi __DEV__
    expect(existsSync(join(SRC, 'features/diagnostyka/DiagnosticsScreen.tsx'))).toBe(true);
    expect(readFileSync(join(SRC, 'app/diagnostics.tsx'), 'utf8')).toMatch(/__DEV__[^\n]*features\/diagnostyka/);
  });
});
