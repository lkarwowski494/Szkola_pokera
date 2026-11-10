/// <reference types="jest" />
/// <reference types="node" />
// Odczyt szablonów scenariuszy z bazy treści: kontrakt tabeli `scenarios` (id, module_id, ord, data JSON).
import type { SQLiteDatabase } from 'expo-sqlite';
import { getScenarioTemplates } from '../repo';
import { SC01 } from '@/test-utils/szablonSc01';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const baza = (sql: string[]) => {
  const db = new DatabaseSync(':memory:');
  db.exec('CREATE TABLE modules (id TEXT PRIMARY KEY, ord INTEGER NOT NULL)');
  db.exec("INSERT INTO modules VALUES ('m2', 2), ('m3', 3)");
  for (const s of sql) db.exec(s);
  return { getAllSync: <T,>(q: string) => db.prepare(q).all() as T[] } as Pick<SQLiteDatabase, 'getAllSync'>;
};
const TABELA = 'CREATE TABLE scenarios (id TEXT PRIMARY KEY, module_id TEXT NOT NULL, ord INTEGER NOT NULL, data TEXT NOT NULL)';
const wstaw = (id: string, modul: string, ord: number, data: unknown) => `INSERT INTO scenarios VALUES ('${id}', '${modul}', ${ord}, '${JSON.stringify(data).replace(/'/g, "''")}')`;

describe('getScenarioTemplates', () => {
  it('baza bez tabeli scenarios (treść bez scenariuszy) → pusta lista', () => {
    expect(getScenarioTemplates(baza([]))).toEqual([]);
  });
  it('szablony w kolejności modułu i porządku, zwalidowane schematem', () => {
    const sc19 = { ...SC01, id: 'sc-19', module: 'm3' as const };
    const t = getScenarioTemplates(baza([TABELA, wstaw('sc-19', 'm3', 1, sc19), wstaw('sc-01', 'm2', 1, SC01)]));
    expect(t.map((x) => x.id)).toEqual(['sc-01', 'sc-19']);
    expect(t[0]).toEqual(SC01);
  });
  it('wiersz niezgodny ze schematem albo z innym id → wyjątek (błąd treści, nie cicho zaniżona lista)', () => {
    expect(() => getScenarioTemplates(baza([TABELA, wstaw('sc-01', 'm2', 1, { id: 'sc-01' })]))).toThrow(/sc-01/);
    expect(() => getScenarioTemplates(baza([TABELA, wstaw('sc-01', 'm2', 1, { ...SC01, id: 'inny' })]))).toThrow(/sc-01/);
  });
});
