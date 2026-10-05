/// <reference types="node" />
/**
 * Baza użytkownika do testów: node:sqlite z nakładką w kształcie better-sqlite3 (synchroniczny sterownik drizzle,
 * jak expo-sqlite w aplikacji) i prawdziwymi plikami migracji z drizzle/.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '@/data/user/schema';
import type { UserDb } from '@/data/user/db';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

type Param = null | number | bigint | string | Uint8Array;

function shim(db: InstanceType<typeof DatabaseSync>) {
  const prep = (sqlText: string, arrays: boolean) => {
    const st = db.prepare(sqlText);
    if (arrays) st.setReturnArrays(true);
    return st;
  };
  return {
    prepare(sqlText: string) {
      return {
        run: (...p: Param[]) => prep(sqlText, false).run(...p),
        all: (...p: Param[]) => prep(sqlText, false).all(...p),
        get: (...p: Param[]) => prep(sqlText, false).get(...p),
        raw: () => ({
          all: (...p: Param[]) => prep(sqlText, true).all(...p),
          get: (...p: Param[]) => prep(sqlText, true).get(...p),
        }),
      };
    },
    transaction<T>(fn: (tx: unknown) => T) {
      const wrap = (tx: unknown) => {
        db.exec('BEGIN');
        try {
          const r = fn(tx);
          db.exec('COMMIT');
          return r;
        } catch (e) {
          db.exec('ROLLBACK');
          throw e;
        }
      };
      return { deferred: wrap, immediate: wrap, exclusive: wrap };
    },
  };
}

export function migrationFiles(): string[] {
  const dir = join(__dirname, '../../drizzle');
  return readdirSync(dir)
    .filter((f) => /^\d{4}_.*\.sql$/.test(f))
    .sort()
    .map((f) => readFileSync(join(dir, f), 'utf8'));
}

export function openTestDb(): { db: UserDb; raw: InstanceType<typeof DatabaseSync> } {
  const raw = new DatabaseSync(':memory:');
  for (const m of migrationFiles()) for (const stmt of m.split('--> statement-breakpoint')) if (stmt.trim()) raw.exec(stmt);
  const db = drizzle(shim(raw) as never, { schema }) as unknown as UserDb;
  return { db, raw };
}
