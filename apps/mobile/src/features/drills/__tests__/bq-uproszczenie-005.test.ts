/// <reference types="jest" />
/// <reference types="node" />
/**
 * Sesja BQ (rola 06 fix), znalezisko 06-tresci-005 (recenzja BP): „wygrywa wyższa karta” i „kicker … bije” pomijają
 * karty stołu (OAG: porównuje się pięć kart; gdy grają karty stołu, pula jest dzielona). CLAUDE.md: uproszczenie
 * dydaktyczne wolno stosować, gdy jest nazwane. Reguły: dopisek „uproszczenie” w `then`; teksty powodów: „zwykle”.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import pl from '@/i18n/locales/pl.json';

const ROOT = join(__dirname, '../../../../../..');
const pole = (lang: string, id: string, p: string) => {
  const b = readFileSync(join(ROOT, 'content', lang, 'rules.yaml'), 'utf8').split(/\n- id: /).find((x) => x.startsWith(`${id}\n`)) ?? '';
  return b.match(new RegExp(`\\n {2}${p}: "(.*)"\\n`))?.[1] ?? '';
};
const JEZYKI = readdirSync(join(ROOT, 'content')).filter((d) => existsSync(join(ROOT, 'content', d, 'rules.yaml')));

describe('06-tresci-005 (BQ): uproszczenie „karty stołu” nazwane', () => {
  it('reguły pl nazywają uproszczenie', () => {
    expect(pole('pl', 'R-M3-012', 'then')).toContain('(uproszczenie: pomijamy karty {{t:board|stołu}}');
    expect(pole('pl', 'R-M11-013', 'then')).toContain('(uproszczenie: gdy najlepsze pięć kart leży na {{t:board|stole}}, {{t:split-pot|pula jest dzielona}})');
  });

  it('R-M11-013 then w każdym języku ma dopisek w nawiasie (wcześniej bez nawiasu)', () => {
    expect(JEZYKI.length).toBe(12);
    for (const l of JEZYKI) expect([l, /[(（]/.test(pole(l, 'R-M11-013', 'then'))]).toEqual([l, true]);
  });

  it('teksty powodów pl mówią „zwykle”', () => {
    const h = pl.drill.range.hand;
    for (const k of ['high', 'dominated', 'highAllIn'] as const) expect([k, h[k].includes('zwykle')]).toEqual([k, true]);
  });
});
