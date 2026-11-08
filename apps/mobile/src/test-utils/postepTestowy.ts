/// <reference types="node" />
/**
 * Port `postep.db` w testach Jest (moduly.md „Adaptery”: testowy na node:sqlite, `enableForeignKeyConstraints: false`, pragmę
 * włącza port jak w aplikacji). Plik w katalogu tymczasowym: wznowienie testuje się nowym portem na tym samym pliku.
 * `require`, bo Jest 29 nie zna `node:sqlite` jako modułu wbudowanego w imporcie ESM.
 */
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { otworzPostep, type Polaczenie, type PortBazy, type SurowyPort, type Wartosc } from '@szkola/postep';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
type Db = InstanceType<typeof DatabaseSync>;

function adapter(db: Db): Polaczenie & SurowyPort {
  const p = (w?: Wartosc[]) => (w ?? []) as (string | number | null)[];
  return {
    exec: async (sql) => { db.exec(sql); },
    all: async <T,>(sql: string, w?: Wartosc[]) => db.prepare(sql).all(...p(w)) as T[],
    run: async (sql, w) => {
      const r = db.prepare(sql).run(...p(w));
      return { zmiany: Number(r.changes), ostatnieId: Number(r.lastInsertRowid) };
    },
    wTransakcji: async (fn) => {
      db.exec('BEGIN');
      try { await fn(); db.exec('COMMIT'); } catch (e) { if (db.isTransaction) db.exec('ROLLBACK'); throw e; }
    },
    zamknij: async () => { db.close(); },
  };
}

export function plikTestowy(): string {
  return join(mkdtempSync(join(tmpdir(), 'postep-jest-')), 'postep.db');
}

/** Otwiera port na pliku (nowy plik, gdy nie podano) i zwraca też surowe połączenie do odczytów kontrolnych. */
export async function portTestowy(sciezka: string = plikTestowy()): Promise<{ port: PortBazy; db: Db; sciezka: string }> {
  const db = new DatabaseSync(sciezka, { enableForeignKeyConstraints: false });
  const port = await otworzPostep(adapter(db));
  return { port, db, sciezka };
}
