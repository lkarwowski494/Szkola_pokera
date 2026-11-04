// Adapter testowy `PlikiPostepu` na node:fs (K-12, K-14). Zapisuje każde wywołanie (sprawdzenie, że stare `user.db*` nie są dotykane),
// a `blad` pozwala wstrzyknąć błąd operacji. Odczyty kontrolne (sumy, lista plików) poza testowanym kodem.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import type { PlikiPostepu } from '../../packages/postep/src';

export type WywolaniePlikow = { op: 'istnieje' | 'przemianuj' | 'usun'; z: string; na?: string };
export function plikiNode(o: { blad?: (w: WywolaniePlikow) => Error | null } = {}) {
  const wywolania: WywolaniePlikow[] = [];
  const zapisz = (w: WywolaniePlikow) => { wywolania.push(w); const e = o.blad?.(w); if (e) throw e; };
  const pliki: PlikiPostepu = {
    istnieje: async (s) => { zapisz({ op: 'istnieje', z: s }); return existsSync(s); },
    przemianuj: async (z, na) => {
      zapisz({ op: 'przemianuj', z, na });
      if (existsSync(na)) throw new Error(`cel istnieje: ${na}`); // jak moveAsync bez nadpisywania
      renameSync(z, na);
    },
    usun: async (s) => { zapisz({ op: 'usun', z: s }); rmSync(s, { force: true }); }, // jak deleteAsync({ idempotent: true })
  };
  return { pliki, wywolania };
}
export const sha256 = (sciezka: string) => createHash('sha256').update(readFileSync(sciezka)).digest('hex');
export const sumyKatalogu = (k: string) => Object.fromEntries(readdirSync(k).sort().map((n) => [n, sha256(join(k, n))]));
