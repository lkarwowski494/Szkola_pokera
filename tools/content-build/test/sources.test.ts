import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { RuleDef, summarizeSources } from '@szkola/content-schema';
import { findBrandNames } from '../src/brands';
import { compileContent, writeContentDb } from '../src/build';
import { checkSourceQuotes } from '../src/sources';

const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');

const rule = (extra: Record<string, unknown>) => ({
  id: 'R-M9-999',
  module: 'm9',
  if: 'warunek',
  then: 'zagranie',
  because: 'powód',
  level: 'heuristic',
  source: 'serwis szkoleniowy, Tytuł (https://example.com/a); drugi serwis (https://example.org/b)',
  sources: [
    { kind: 'training', url: 'https://example.com/a' },
    { kind: 'training', url: 'https://example.org/b' },
  ],
  ...extra,
});

describe('nazwy marek (decyzja właściciela z 9.10.2026)', () => {
  it('lista wykrywa nazwy serwisów, pokoi i solverów niezależnie od wielkości liter i odstępu', () => {
    expect(findBrandNames('Według GTO Wizard i gtowizard.com')).toEqual(['GTO Wizard']);
    expect(findBrandNames('dane z GGPoker NL25 (Bluffaces)')).toEqual(['GGPoker', 'Bluffaces']);
    expect(findBrandNames('PokerStars, Primedope, Deepfold, PokerCoaching')).toHaveLength(4);
  });
  it('wykrywa nazwiska autorów, ale nie nazwy pojęć', () => {
    expect(findBrandNames('strefa Harringtona, model Malmutha-Harville’a')).toEqual(['Harrington', 'Malmuth', 'Harville']);
    expect(findBrandNames('równowaga Nasha, push/fold, Poker Bankroll Management')).toEqual([]);
  });
  it('nie myli marek ze słowami pokerowymi', () => {
    expect(findBrandNames('przeciwieństwo upswingu; downswing; run it twice; solver aplikacji')).toEqual([]);
  });

  // lekcje i zadania (tabele lessons, drills, exam_drills) sprawdza osobny test tą samą listą (gałąź porzadki-lekcje)
  const LESSON_TABLES = new Set(['lessons', 'drills', 'exam_drills']);
  it('reguły, liczby, terminy, zakresy, moduły, słowniczek i telefony pomocy w aplikacji nie zawierają nazw marek ani autorów', () => {
    const content = compileContent(contentDir);
    const dir = mkdtempSync(join(tmpdir(), 'brands-'));
    try {
      const db = new DatabaseSync(writeContentDb(content, dir), { readOnly: true });
      const hits: string[] = [];
      const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as { name: string }[];
      expect(tables.map((t) => t.name)).toEqual(expect.arrayContaining([...LESSON_TABLES, 'rules', 'numbers', 'terms', 'ranges', 'modules', 'game_kit']));
      for (const { name } of tables.filter((t) => !LESSON_TABLES.has(t.name))) {
        for (const row of db.prepare(`SELECT * FROM ${name}`).all() as Record<string, unknown>[]) {
          for (const [col, v] of Object.entries(row)) {
            if (typeof v !== 'string') continue;
            const found = findBrandNames(v);
            if (found.length) hits.push(`${name}.${col} (${String(row.id ?? row.key ?? '')}): ${found.join(', ')}`);
          }
        }
      }
      db.close();
      for (const f of ['terms.generated.ts', 'helplines.generated.ts']) {
        const found = findBrandNames(readFileSync(join(root, 'apps/mobile/src/data/content', f), 'utf8'));
        if (found.length) hits.push(`${f}: ${found.join(', ')}`);
      }
      expect(hits).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});

describe('źródła reguły: rodzaj i liczba (decyzja właściciela z 9.10.2026)', () => {
  it('schemat wymaga pola sources ze znanymi rodzajami', () => {
    expect(RuleDef.safeParse(rule({})).success).toBe(true);
    expect(RuleDef.safeParse(rule({ sources: undefined })).success).toBe(false);
    expect(RuleDef.safeParse(rule({ sources: [] })).success).toBe(false);
    expect(RuleDef.safeParse(rule({ sources: [{ kind: 'forum' }] })).success).toBe(false);
  });
  it('adres w sources musi być w opisie źródła', () => {
    expect(RuleDef.safeParse(rule({ sources: [{ kind: 'training', url: 'https://example.net/c' }] })).success).toBe(false);
  });
  it('dwa źródła z tej samej domeny nie są niezależne', () => {
    const r = rule({
      source: 'serwis, A (https://blog.example.com/a); ten sam serwis, B (https://example.com/b)',
      sources: [
        { kind: 'training', url: 'https://blog.example.com/a' },
        { kind: 'training', url: 'https://example.com/b' },
      ],
    });
    expect(RuleDef.safeParse(r).success).toBe(false);
  });
  it('podsumowanie liczy niezależne źródła per rodzaj w stałej kolejności', () => {
    expect(
      summarizeSources([{ kind: 'training' }, { kind: 'solver-pub' }, { kind: 'training' }, { kind: 'math' }, { kind: 'solver-pub' }, { kind: 'training' }]),
    ).toEqual([
      { kind: 'math', n: 1 },
      { kind: 'solver-pub', n: 2 },
      { kind: 'training', n: 3 },
    ]);
  });

  it('baza aplikacji ma rodzaje i liczby źródeł reguł, bez pełnych opisów źródeł reguł, liczb i terminów', () => {
    const content = compileContent(contentDir);
    const dir = mkdtempSync(join(tmpdir(), 'sources-'));
    try {
      const db = new DatabaseSync(writeContentDb(content, dir), { readOnly: true });
      const cols = (t: string) => (db.prepare(`PRAGMA table_info(${t})`).all() as { name: string }[]).map((c) => c.name);
      expect(cols('rules')).toContain('sources');
      expect(cols('rules')).not.toContain('source');
      expect(cols('numbers')).not.toContain('source');
      expect(cols('terms')).not.toContain('source');
      const rows = db.prepare('SELECT id, sources FROM rules').all() as { id: string; sources: string }[];
      expect(rows.length).toBe(content.rules.length);
      for (const r of rows) {
        const s = JSON.parse(r.sources) as { kind: string; n: number }[];
        expect(s.length, r.id).toBeGreaterThan(0);
        for (const x of s) expect(Object.keys(x).sort(), r.id).toEqual(['kind', 'n']);
      }
      // R-M4-005: dwa opublikowane rozwiązania solverów i trzy serwisy szkoleniowe (dokument 10, decyzja A2)
      expect(JSON.parse(rows.find((r) => r.id === 'R-M4-005')!.sources)).toEqual([
        { kind: 'solver-pub', n: 2 },
        { kind: 'training', n: 3 },
      ]);
      expect(JSON.parse(rows.find((r) => r.id === 'R-M2-003')!.sources)).toEqual([{ kind: 'math', n: 1 }]);
      db.close();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});

describe('cytaty w polach źródeł: najwyżej 2 zdania (decyzja właściciela z 9.10.2026)', () => {
  it('wykrywa za długie cytaty', () => {
    expect(checkSourceQuotes('A (https://x.com): „Jedno zdanie. Drugie zdanie.”')).toEqual([]);
    expect(checkSourceQuotes('A: „Jedno. Drugie. Trzecie zdanie.”')).toHaveLength(1);
    expect(checkSourceQuotes(`A: „${'słowo '.repeat(60)}”`)).toHaveLength(1);
    // liczby z kropką i skróty nie dzielą zdania
    expect(checkSourceQuotes('A: „SD 75.5 bb/100, e.g. at NL25. Next one.”')).toEqual([]);
  });
  it('wszystkie pola source, population i note w treści spełniają limit', () => {
    const fields: [string, string][] = [];
    const rules = parseYaml(readFileSync(join(contentDir, 'pl/rules.yaml'), 'utf8')) as Record<string, string>[];
    for (const r of rules) for (const f of ['source', 'population'] as const) if (r[f]) fields.push([`${r.id}.${f}`, r[f]]);
    for (const file of ['terms.yaml', 'numbers.yaml']) {
      const data = parseYaml(readFileSync(join(contentDir, file), 'utf8')) as Record<string, Record<string, unknown>>;
      for (const [k, v] of Object.entries(data)) {
        for (const f of ['source', 'population', 'note']) if (typeof v[f] === 'string') fields.push([`${file}:${k}.${f}`, v[f] as string]);
      }
    }
    expect(fields.length).toBeGreaterThan(1000);
    expect(fields.flatMap(([where, text]) => checkSourceQuotes(text).map((e) => `${where}: ${e}`))).toEqual([]);
  });
});
