// Adapter testowy portu postępu na node:sqlite (moduly.md „Port bazy”; ADR 0003). Otwarcie z enableForeignKeyConstraints: false,
// jak expo-sqlite (pragma ustawia dopiero port, K-04). `zdarzenie` widzi każde wywołanie przed wykonaniem (kolejność, wstrzykiwanie błędów i wygaśnięcia).
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import type { Polaczenie, SurowyPort, Wartosc } from '../../packages/postep/src';

export type Zdarzenie = { rodzaj: 'exec' | 'all' | 'run' | 'transakcja' | 'zamknij'; sql: string };
export const otworzNode = (sciezka = ':memory:') => new DatabaseSync(sciezka, { enableForeignKeyConstraints: false });

export function adapterNode(db: DatabaseSync, zdarzenie?: (z: Zdarzenie) => void): Polaczenie & SurowyPort {
  const p = (w?: Wartosc[]) => (w ?? []) as SQLInputValue[];
  return {
    exec: async (sql) => { zdarzenie?.({ rodzaj: 'exec', sql }); db.exec(sql); },
    all: async <T>(sql: string, w?: Wartosc[]) => { zdarzenie?.({ rodzaj: 'all', sql }); return db.prepare(sql).all(...p(w)) as T[]; },
    run: async (sql, w) => {
      zdarzenie?.({ rodzaj: 'run', sql });
      const r = db.prepare(sql).run(...p(w));
      return { zmiany: Number(r.changes), ostatnieId: Number(r.lastInsertRowid) };
    },
    wTransakcji: async (fn) => { // jak withTransactionAsync: BEGIN, fn, COMMIT albo ROLLBACK i ponowienie wyjątku
      zdarzenie?.({ rodzaj: 'transakcja', sql: 'BEGIN' });
      db.exec('BEGIN');
      try { await fn(); db.exec('COMMIT'); } catch (e) { if (db.isTransaction) db.exec('ROLLBACK'); throw e; }
    },
    zamknij: async () => { zdarzenie?.({ rodzaj: 'zamknij', sql: '' }); db.close(); },
  };
}

// Odczyty kontrolne bezpośrednio z bazy (poza testowanym kodem).
export const ile = (db: DatabaseSync, t: string) => (db.prepare(`SELECT count(*) AS n FROM ${t}`).get() as { n: number }).n;
export const integralnosc = (db: DatabaseSync) => ({
  integrity: (db.prepare('PRAGMA integrity_check').get() as { integrity_check: string }).integrity_check,
  kluczeObce: db.prepare('PRAGMA foreign_key_check').all().length,
});
export const TABELE_EKSPORTU = ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki'] as const;
export const KLUCZ: Record<string, string> = { ustawienie: 'klucz', postep_lekcji: 'lekcja_id', aktywnosc: 'id', odpowiedz: 'id', wynik_testu: 'aktywnosc_id', karta: 'rodzina_id', log_powtorki: 'id' };
export const zawartosc = (db: DatabaseSync, tabele: readonly string[] = TABELE_EKSPORTU) =>
  Object.fromEntries(tabele.map((t) => [t, db.prepare(`SELECT * FROM ${t} ORDER BY ${KLUCZ[t] ?? 'rowid'}`).all().map((w) => ({ ...w }))]));
