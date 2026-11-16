/// <reference types="jest" />
/// <reference types="node" />
// IA / HX-P3: słownik i kontekst tłumacza dla limpa i dziennika scenariusza (docs/decyzje/IA.md, D-1831…D-1834).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import '@/i18n';
import i18n from 'i18next';
import { etykietaStolu, ukladStolu } from '@/features/stol/uklad';

const SRC = join(__dirname, '..', '..');
const LOCALES = join(SRC, 'i18n', 'locales');
const JEZYKI = readdirSync(LOCALES).filter((f) => /^[\w-]+\.json$/.test(f) && !f.includes('kontekst')).map((f) => f.replace('.json', ''));
const wczytaj = (f: string): Record<string, unknown> => JSON.parse(readFileSync(join(LOCALES, f), 'utf8')) as Record<string, unknown>;
const kontekst = wczytaj('pl.kontekst.json') as Record<string, string>;
const kod = (dir: string): string[] => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  if (statSync(p).isDirectory()) return n === '__tests__' ? [] : kod(p);
  return /\.tsx?$/.test(n) && !/\.test\.tsx?$/.test(n) ? [p] : [];
});

describe('HX-P3: kontekst tłumacza wskazuje prawdziwe miejsce użycia', () => {
  it.each(['play.log.limp', 'table.limped'])('%s: wpis w pl.kontekst.json, a plik z „Użyty w:” istnieje i woła ten klucz', (klucz) => {
    const opis = kontekst[klucz];
    expect(opis).toBeDefined();
    const sciezka = /Użyty w: (\S+?\.tsx?)/.exec(opis ?? '')?.[1];
    expect(sciezka).toBeDefined();
    const plik = join(SRC, sciezka as string);
    expect(existsSync(plik)).toBe(true);
    expect(readFileSync(plik, 'utf8')).toContain(`'${klucz}'`);
  });
});

describe('HX-P3: table.seatLimp dublował table.limped (count 1) — usunięty bez zmiany tekstu', () => {
  it('klucza nie ma w słownikach, kontekście ani kodzie', () => {
    for (const j of JEZYKI) expect([j, JSON.stringify(wczytaj(`${j}.json`)).includes('"seatLimp"')]).toEqual([j, false]);
    expect(Object.keys(kontekst)).not.toContain('table.seatLimp');
    expect(kod(SRC).filter((p) => readFileSync(p, 'utf8').includes('table.seatLimp'))).toEqual([]);
  });

  it.each(JEZYKI)('%s: etykieta stołu z jednym limperem zawiera frazę table.limped (count 1)', (j) => {
    const t = i18n.getFixedT(j);
    const m = ukladStolu('CO', 'UTG:fold,HJ:limp', { limp: true });
    expect(m).not.toBeNull();
    const etykieta = etykietaStolu(m!, ['As', 'Jd'], t);
    expect(etykieta).toContain(t('table.limped', { count: 1, list: 'HJ' }));
  });
});

describe('HX-P3: separator wpisów dziennika zależy od języka (play.log.sep)', () => {
  // JLREQ: „IDEOGRAPHIC FULL STOP "。" … used for full stops” (w3.org/TR/jlreq, odczyt 2026-11-16); CLREQ 4.2.3: „the full stop (。)” (w3.org/TR/clreq).
  const OCZEKIWANE: Record<string, string> = { ja: '。', 'zh-Hant': '。' };
  it.each(JEZYKI)('%s: klucz play.log.sep istnieje, niepusty', (j) => {
    const sep = ((wczytaj(`${j}.json`).play as Record<string, Record<string, string>>).log ?? {}).sep;
    expect(sep).toBeDefined();
    expect(sep).toBe(OCZEKIWANE[j] ?? '. ');
  });
  it('kod nie skleja wpisów dziennika `. ` na sztywno', () => {
    const tekst = readFileSync(join(SRC, 'features', 'scenariusz', 'EkranScenariusza.tsx'), 'utf8');
    expect(tekst).not.toMatch(/\.join\('\. '\)/);
  });
  it('play.log.sep ma kontekst dla tłumacza', () => {
    expect(kontekst['play.log.sep']).toMatch(/Użyty w: features\/scenariusz\/EkranScenariusza\.tsx/);
  });
});
