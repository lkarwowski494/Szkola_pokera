import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';
import { applyTransitional, loadRegistry, registryViolations, TRANSITIONAL_FILE } from '../src/registry';

/**
 * Strażnik powiązań z rejestrem twierdzeń (D-141): tekst aplikacji (lekcja, egzamin, zadanie, reguła, telefony pomocy)
 * nie może używać liczby, reguły ani twierdzenia, którego wpis w docs/tresci/rejestr.json nie jest „potwierdzone”.
 */
const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');
const registry = JSON.parse(readFileSync(join(root, 'docs/tresci/rejestr.json'), 'utf8')) as { id: string; status: string }[];
const exempt = JSON.parse(readFileSync(join(root, 'docs/tresci/rejestr/bez-twierdzen.json'), 'utf8')) as { klucz: string }[];

/** Kopia treści z własnym rejestrem: wszystko potwierdzone poza podanymi wpisami. */
function compileWith(statuses: Record<string, string>, opts: { exemptKeys?: string[] } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'rejestr-'));
  try {
    cpSync(contentDir, join(dir, 'content'), { recursive: true });
    symlinkSync(join(root, 'tools'), join(dir, 'tools'));
    mkdirSync(join(dir, 'docs/tresci/rejestr'), { recursive: true });
    const reg = registry.map((w) => ({ ...w, status: statuses[w.id] ?? 'potwierdzone' }));
    writeFileSync(join(dir, 'docs/tresci/rejestr.json'), JSON.stringify(reg));
    writeFileSync(join(dir, 'docs/tresci/rejestr/bez-twierdzen.json'), JSON.stringify([...exempt, ...(opts.exemptKeys ?? []).map((klucz) => ({ klucz }))]));
    return compileContent(join(dir, 'content'), 'pl', { transitional: null });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** Liczba z numbers.yaml, która nie występuje w żadnym tekście ({{n:…}}) ani jako odpowiedź zadania liczbowego. */
function numberOutsideText(): string {
  const files = (d: string): string[] =>
    readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(d, e.name)) : /\.(md|ya?ml)$/.test(e.name) ? [join(d, e.name)] : []));
  const all = files(contentDir).map((f) => readFileSync(f, 'utf8')).join('\n');
  const keys = Object.keys(parseYaml(readFileSync(join(contentDir, 'numbers.yaml'), 'utf8')) as object);
  const key = keys.find((k) => !all.includes(`{{n:${k}}}`) && !new RegExp(`answer:\\s*${k.replace(/\./g, '\\.')}\\s*$`, 'm').test(all));
  if (!key) throw new Error('brak liczby używanej tylko poza tekstem');
  return key;
}

describe('strażnik powiązań z rejestrem (D-141)', () => {
  it('funkcja: status inny niż „potwierdzone” albo brak wpisu to naruszenie; parametry produktowe (bez-twierdzen) nie', () => {
    const reg = { status: new Map([['n:a', 'potwierdzone'], ['n:b', 'otwarte'], ['R-M1-001', 'sprzeczne'], ['n:p', 'otwarte']]), exempt: new Set(['n:p']) };
    const v = registryViolations(
      [
        { plik: 'lessons/x.md', gdzie: '§1', id: 'n:a' },
        { plik: 'lessons/x.md', gdzie: '§1', id: 'n:b' },
        { plik: 'lessons/x.md', gdzie: 'x.q1', id: 'R-M1-001' },
        { plik: 'lessons/x.md', gdzie: '§2', id: 'n:c' },
        { plik: 'lessons/x.md', gdzie: '§2', id: 'n:p' },
      ],
      reg,
    );
    expect(v.map((x) => [x.id, x.status])).toEqual([
      ['n:b', 'otwarte'],
      ['R-M1-001', 'sprzeczne'],
      ['n:c', 'brak wpisu'],
    ]);
  });

  it('lista przejściowa: znane naruszenie to ostrzeżenie, nowe to błąd, wyjątek nieobecny w treści to „zbędny wyjątek”', () => {
    const v = [
      { plik: 'pl/lessons/a.md', gdzie: '§1', id: 'n:x', status: 'otwarte' },
      { plik: 'pl/lessons/b.md', gdzie: '§2', id: 'n:x', status: 'otwarte' },
    ];
    const r = applyTransitional(v, { wyjatki: [{ plik: 'pl/lessons/a.md', id: 'n:x' }, { plik: 'pl/lessons/c.md', id: 'n:y' }] });
    expect(r.errors).toEqual(['pl/lessons/b.md (§2): n:x — wpis rejestru ma status „otwarte”']);
    expect(r.warnings).toHaveLength(2);
    expect(r.warnings[1]).toMatch(/zbędny wyjątek pl\/lessons\/c\.md: n:y/);
  });

  it('rejestr projektu wczytuje się z docs/tresci (statusy i klucze bez twierdzeń)', () => {
    const reg = loadRegistry(join(root, 'docs/tresci'));
    expect(reg.status.size).toBe(new Set(registry.map((w) => w.id)).size);
    expect(reg.exempt.size).toBe(exempt.length);
    expect(() => loadRegistry(join(root, 'brak'))).toThrow(/rejestr\.json/);
  });

  it('liczba „otwarte” w lekcji przerywa budowanie z plikiem i kluczem', () => {
    expect(() => compileWith({ 'n:combos.total': 'otwarte' })).toThrow(/lessons\/m\d+-l\d+[^\n]*\.md[^\n]*n:combos\.total[^\n]*otwarte/);
  }, 60_000);

  it('reguła „sprzeczne”, do której odwołuje się lekcja albo zadanie, przerywa budowanie', () => {
    expect(() => compileWith({ 'R-M0-001': 'sprzeczne' })).toThrow(/lessons\/m0-l1-uklady\.md[^\n]*R-M0-001[^\n]*sprzeczne/);
  }, 60_000);

  it('twierdzenie numeru pomocy („claim”) niepotwierdzone przerywa budowanie', () => {
    expect(() => compileWith({ 'H-FR-1': 'sprzeczne' })).toThrow(/helplines\.yaml[^\n]*fr-jis[^\n]*H-FR-1[^\n]*sprzeczne/);
  }, 60_000);

  it('nie blokuje: parametru produktowego (bez-twierdzen) ani liczby używanej tylko poza tekstem (siatki, boty, ocena)', () => {
    expect(() => compileWith({ 'n:combos.total': 'otwarte' }, { exemptKeys: ['combos.total'] })).not.toThrow();
    const key = numberOutsideText();
    expect(() => compileWith({ [`n:${key}`]: 'otwarte' })).not.toThrow();
  }, 60_000);

  it(`treść projektu: naruszenia tylko z listy przejściowej (${TRANSITIONAL_FILE}), bez zbędnych wyjątków`, () => {
    const c = compileContent(contentDir);
    expect(c.warnings.filter((w) => w.includes('zbędny wyjątek'))).toEqual([]);
  }, 60_000);
});
