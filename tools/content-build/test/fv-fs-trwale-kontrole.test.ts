// FS-001/002/005 (06-tresci-001, -002, -005; FV): trwała kontrola zdań szkiców FQ zamiast jednorazowego docs/tresci/narzedzia/ft-test.sh.
// Zdanie jest dozwolone tylko, gdy jest prawdziwe w KAŻDYM wariancie generatora (remisy wśród sprawdzających i pasujących SC-22/25/28/29), a zdanie „Liczby” defend
// nie podaje MDF na flopie jako normy (R-M6-003, lekcja m6-l1). Rachunek W/L/T własnymi kombinacjami klas, niezależny od `classComboSplit`.
// Czerwone na treści sprzed FT (fixtures/fv-przed-ft = ae21e380 i 8bb6dfad), zielone na obecnej (docs/tresci/szablony-robocze/fq).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { generateVariant, strength, type GeneratorTemplate } from '@szkola/poker-core';

const root = resolve(import.meta.dirname, '../../..');
const AKT = join(root, 'docs', 'tresci', 'szablony-robocze', 'fq');
const ROBOCZE = join(root, 'docs', 'tresci', 'szablony-robocze');
const CONTENT = join(root, 'content');
const GB301 = join(import.meta.dirname, 'fixtures', 'gb-301', 'content');
const PRZED = join(import.meta.dirname, 'fixtures', 'fv-przed-ft');
const LICZBY = join(root, 'docs', 'tresci', 'liczby-river-catch-defend.md');
const ZIARNA = 300;
const RANGI = '23456789TJQKA';
const karta = (r: number, s: number): number => r * 4 + s; // kodowanie poker-core: ranga*4 + kolor (cards.ts)

function kombinacje(hc: string): [number, number][] {
  const a = RANGI.indexOf(hc[0]!), b = RANGI.indexOf(hc[1]!);
  const out: [number, number][] = [];
  if (hc.length === 2) { for (let s = 0; s < 4; s++) for (let t = s + 1; t < 4; t++) out.push([karta(a, s), karta(a, t)]); }
  else if (hc[2] === 's') { for (let s = 0; s < 4; s++) out.push([karta(a, s), karta(b, s)]); }
  else { for (let s = 0; s < 4; s++) for (let t = 0; t < 4; t++) if (s !== t) out.push([karta(a, s), karta(b, t)]); }
  return out;
}
function podzial(hero: readonly number[], board: readonly number[], klasy: readonly string[]) {
  const martwe = new Set([...hero, ...board]);
  const ja = strength([...hero, ...board]);
  let w = 0, l = 0, t = 0;
  for (const hc of klasy) for (const c of kombinacje(hc)) {
    if (martwe.has(c[0]) || martwe.has(c[1])) continue;
    const v = strength([...c, ...board]);
    if (ja < v) w++; else if (ja > v) l++; else t++;
  }
  return { w, l, t };
}

/** Zdania pod kontrolą: fraza (pl | en) → licznik, który musi być 0, gdy fraza jest w wyjaśnieniach szablonu. */
const ZDANIA: readonly { id: string; opis: string; fraza: RegExp; licznik: 'gorsze÷wszystkie≤50%' | 'W≤L' | 'pasujące: remis albo lepsza' | 'pasujące: lepsza' }[] = [
  { id: '06-tresci-001', opis: '„ponad X rąk, które sprawdzą, to gorsze”', fraza: /ponad \{\{n:value\.threshold\}\} rąk|more than \{\{n:value\.threshold\}\} of the hands/, licznik: 'gorsze÷wszystkie≤50%' },
  { id: '06-tresci-001', opis: '„gorszych jest więcej niż lepszych”', fraza: /gorszych od twojej jest więcej niż lepszych|more are worse than yours than better/, licznik: 'W≤L' },
  { id: '06-tresci-002', opis: '„pasujące i tak przegrałyby”', fraza: /i tak przegrałyby|would have lost to you/, licznik: 'pasujące: remis albo lepsza' },
  { id: '06-tresci-002', opis: '„po czekaniu wygrałbyś od nich tylko pulę”', fraza: /wygrałbyś od nich tylko|would also win only the/, licznik: 'pasujące: remis albo lepsza' },
  { id: '06-tresci-002', opis: '„pasujące i tak nie wygrałyby”', fraza: /i tak nie wygrałyby|would not have beaten you/, licznik: 'pasujące: lepsza' },
];

/** Naruszenia: lista „id szablon [poziom]: zdanie; licznik = n [pierwsze ziarno]” dla zdań obecnych w szablonie i fałszywych w którymś wariancie KAŻDEGO poziomu (08-programista-301, GB). */
function naruszenia(dir: string, szablony: readonly string[]): string[] {
  const out: string[] = [];
  for (const f of szablony) {
    const y = parse(readFileSync(join(dir, `${f}.yaml`), 'utf8'));
    const teksty = y.decisions.flatMap((d: { actions: { explanation: string }[] }) => d.actions.map((a) => a.explanation)).join('\n');
    const obecne = ZDANIA.filter((z) => z.fraza.test(teksty));
    if (obecne.length === 0) continue;
    for (const b of Object.values<Record<string, unknown>>(y.bounds)) { b.reject ??= []; b.draws ??= []; }
    const g = { id: y.id, stackBb: y.stackBb, positions: y.positions, levels: y.bounds, decisions: y.decisions } as unknown as GeneratorTemplate;
    const d = y.decisions[0] as { calls: string[]; folds: string[] };
    for (const poziom of Object.keys(y.bounds)) {
      const licz: Record<string, number> = {}; const pierwsze: Record<string, number> = {};
      const inc = (k: string, seed: number) => { licz[k] = (licz[k] ?? 0) + 1; pierwsze[k] ??= seed; };
      for (let seed = 1; seed <= ZIARNA; seed++) {
        const v = generateVariant(g, poziom as 'latwy', seed);
        const s = podzial(v.hero, v.board, d.calls), sf = podzial(v.hero, v.board, d.folds);
        if (s.w / (s.w + s.l + s.t) <= 0.5) inc('gorsze÷wszystkie≤50%', seed);
        if (s.w <= s.l) inc('W≤L', seed);
        if (sf.t > 0 || sf.l > 0) inc('pasujące: remis albo lepsza', seed);
        if (sf.l > 0) inc('pasujące: lepsza', seed);
      }
      for (const z of obecne) { const n = licz[z.licznik] ?? 0; if (n > 0) out.push(`${z.id} ${f} [poziom ${poziom}]: zdanie ${z.opis}; „${z.licznik}” = ${n} [ziarno ${pierwsze[z.licznik]}]`); }
    }
  }
  return out;
}

/** Szablony river-value (decyzja 0) w katalogach: kopie robocze (docs/tresci/szablony-robocze/<sesja>/<język>) i treść aplikacji (content/<język>/scenarios). Katalog → pliki bez rozszerzenia. */
function szablonyRiverValue(katalogi: readonly string[]): { dir: string; pliki: string[] }[] {
  const wynik: { dir: string; pliki: string[] }[] = [];
  for (const dir of katalogi) {
    if (!existsSync(dir)) continue;
    const pliki = readdirSync(dir).filter((n) => n.endsWith('.yaml')).map((n) => n.slice(0, -5)).filter((n) => {
      const y = parse(readFileSync(join(dir, `${n}.yaml`), 'utf8')) as { decisions?: { kind?: string }[] } | null;
      return y?.decisions?.[0]?.kind === 'river-value';
    });
    if (pliki.length > 0) wynik.push({ dir, pliki });
  }
  return wynik;
}
const katalogiTresci = (korzenRoboczych: string, korzenContent: string): string[] => [
  ...(existsSync(korzenRoboczych) ? readdirSync(korzenRoboczych, { withFileTypes: true }).filter((e) => e.isDirectory()).flatMap((s) => readdirSync(join(korzenRoboczych, s.name), { withFileTypes: true }).filter((e) => e.isDirectory()).map((j) => join(korzenRoboczych, s.name, j.name))) : []),
  ...(existsSync(korzenContent) ? readdirSync(korzenContent, { withFileTypes: true }).filter((e) => e.isDirectory()).map((j) => join(korzenContent, j.name, 'scenarios')) : []),
];

/** 06-tresci-005: zdanie „Liczby” defend z {{t:mdf}} musi mieć zastrzeżenie flopu, a „bronisz w teorii” (MDF jako norma) nie może wystąpić. */
function naruszeniaMdf(plik: string): string[] {
  const linie = readFileSync(plik, 'utf8').split('\n');
  const out: string[] = [];
  const stare = linie.filter((l) => /bronisz w teorii|you defend in theory/.test(l)).length;
  if (stare > 0) out.push(`06-tresci-005: „bronisz w teorii” = ${stare}`);
  const mdf = linie.filter((l) => /\{\{t:mdf\}\} (to|is) \{\{obrona\}\}/.test(l));
  const bez = mdf.filter((l) => !/na flopie możesz bronić trochę mniej|on the flop you can defend a little less/.test(l)).length;
  if (mdf.length !== 2) out.push(`06-tresci-005: zdań MDF defend ${mdf.length} (oczekiwano 2: pl i en)`);
  if (bez > 0) out.push(`06-tresci-005: zdań MDF bez zastrzeżenia flopu = ${bez}`);
  return out;
}

describe('FS-001/002: zdania SC-22/25/28/29 prawdziwe w każdym wariancie (remisy)', () => {
  for (const j of ['pl', 'en']) {
    it(`obecna treść (${j}): 0 naruszeń na ${ZIARNA} ziarnach`, () => {
      expect(naruszenia(join(AKT, j), ['sc-22', 'sc-25', 'sc-28', 'sc-29'])).toEqual([]);
    }, 120_000);
    it(`treść sprzed FT (${j}, fixtures): wykrywa 06-tresci-001 w SC-22 i 06-tresci-002 w SC-25`, () => {
      const n = naruszenia(join(PRZED, j), ['sc-22', 'sc-25']).join('\n');
      expect(n).toMatch(/06-tresci-001 sc-22/);
      expect(n).toMatch(/06-tresci-002 sc-25/);
    }, 120_000);
  }
});

describe('FS-005: „Liczby” defend bez MDF jako normy', () => {
  it('obecny szkic: 0 naruszeń', () => { expect(naruszeniaMdf(LICZBY)).toEqual([]); });
  it('szkic sprzed FT (fixture): „w teorii bronisz” i brak zastrzeżenia flopu', () => {
    const n = naruszeniaMdf(join(PRZED, 'liczby-river-catch-defend.md')).join('\n');
    expect(n).toMatch(/bronisz w teorii. = 2/);
    expect(n).toMatch(/bez zastrzeżenia flopu = 2/);
  });
});

describe('08-programista-301 (GB): kontrola obejmuje wszystkie poziomy i wszystkie szablony river-value, także z content/', () => {
  it('odkrywanie: znajduje sc-22/25/28/29 w kopiach roboczych (pl i en), a każdy znaleziony szablon z content/ jest kontrolowany', () => {
    const znalezione = szablonyRiverValue(katalogiTresci(ROBOCZE, CONTENT));
    const roboczePl = znalezione.find((z) => z.dir === join(AKT, 'pl'));
    expect(roboczePl?.pliki.sort()).toEqual(['sc-22', 'sc-25', 'sc-28', 'sc-29']);
    expect(znalezione.some((z) => z.dir === join(AKT, 'en'))).toBe(true);
  });
  it('treść aplikacji i kopie robocze (wszystkie): 0 naruszeń na wszystkich poziomach szablonu', () => {
    const naruszone = szablonyRiverValue(katalogiTresci(ROBOCZE, CONTENT)).flatMap((z) => naruszenia(z.dir, z.pliki));
    expect(naruszone).toEqual([]);
  }, 240_000);
  it('szablon river-value w content/ z poziomem sredni (expected check) i zdaniem „gorszych jest więcej niż lepszych”: wykryty na poziomie sredni', () => {
    const znalezione = szablonyRiverValue(katalogiTresci(join(GB301, 'brak'), GB301));
    expect(znalezione.map((z) => z.pliki)).toEqual([['sc-22']]);
    const n = znalezione.flatMap((z) => naruszenia(z.dir, z.pliki)).join('\n');
    expect(n).toMatch(/06-tresci-001 sc-22 \[poziom sredni\].*W≤L/);
    expect(n).not.toMatch(/\[poziom latwy\]/);
  }, 120_000);
});
