/// <reference types="jest" />
// Krok 7 części 4 (moduly.md „Adaptery”, ADR 0003, ADR 0004, tlo-i-bledy.md §4, K-04): adapter expo-sqlite portu postępu,
// pliki postępu na expo-file-system i start bazy przy uruchomieniu. Atrapa SQLiteDatabase na node:sqlite (prawdziwy SQLite,
// otwarcie bez kluczy obcych jak w expo-sqlite), błędy w kształcie z expo-sqlite 58.0.15 (ios/SQLiteResult.swift:7:
// „Error code <n>: <komunikat>”).
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import { kopiaBazy, otworzPostep } from '@szkola/postep';
import { adapterExpo, kontrolaK04, plikiPostepuExpo, startPostepu, type BazaExpo } from '@/data/postepExpo';
import type { SystemPlikow } from '@/data/tresc/plikiExpo';

jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));
jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));
const D = jest.requireMock<{ zapiszBlad: jest.Mock }>('@/platform/dziennik');

type Zdarzenie = { co: string; sql: string; wTx: boolean };
// plik, nie :memory: (ta ma zawsze journal_mode = memory); otwarcie bez kluczy obcych jak w expo-sqlite
const plikBazy = () => join(mkdtempSync(join(tmpdir(), 'postep-08-')), 'postep.db');
function bazaNode(db = new DatabaseSync(plikBazy(), { enableForeignKeyConstraints: false })) {
  const zdarzenia: Zdarzenie[] = [];
  let wTx = false;
  let awaria: ((sql: string) => Error | null) | null = null;
  const krok = (co: string, sql: string) => {
    zdarzenia.push({ co, sql, wTx });
    const e = awaria?.(sql);
    if (e) throw e;
  };
  const p = (w: (string | number | null)[]) => w as SQLInputValue[];
  const baza: BazaExpo = {
    execAsync: async (sql) => { krok('exec', sql); db.exec(sql); },
    getAllAsync: async <T,>(sql: string, w: (string | number | null)[]) => { krok('all', sql); return db.prepare(sql).all(...p(w)) as T[]; },
    runAsync: async (sql, w) => {
      krok('run', sql);
      const r = db.prepare(sql).run(...p(w));
      return { changes: Number(r.changes), lastInsertRowId: Number(r.lastInsertRowid) };
    },
    withTransactionAsync: async (fn) => {
      krok('BEGIN', '');
      db.exec('BEGIN');
      wTx = true;
      try { await fn(); db.exec('COMMIT'); } catch (e) { db.exec('ROLLBACK'); throw e; } finally { wTx = false; }
    },
    closeAsync: async () => { krok('close', ''); db.close(); },
  };
  return { baza, db, zdarzenia, ustawAwarie: (f: typeof awaria) => { awaria = f; } };
}
const bladExpo = (kod: number, tekst: string) => new Error(`Calling the 'runAsync' function has failed\n→ Caused by: Error code ${kod}: ${tekst}`);

beforeEach(() => D.zapiszBlad.mockClear());

describe('adapter expo-sqlite portu postępu', () => {
  it('PRAGMA foreign_keys = ON przed migracją i poza transakcją; port widzi klucze w transakcji (K-04)', async () => {
    const b = bazaNode();
    const port = await otworzPostep(adapterExpo(b.baza));
    const pierwsza = b.zdarzenia[0]!;
    expect(pierwsza).toEqual({ co: 'exec', sql: 'PRAGMA foreign_keys = ON', wTx: false });
    // migracja otwiera transakcję przez exec('BEGIN IMMEDIATE') (packages/postep/src/migracje.ts) — dopiero po pragmie
    const begin = b.zdarzenia.findIndex((z) => z.co === 'exec' && z.sql.startsWith('BEGIN'));
    expect(begin).toBeGreaterThan(0);
    expect(await kontrolaK04(port)).toEqual({ ok: true, journalMode: 'delete', kluczeObce: 1 });
    expect(D.zapiszBlad).not.toHaveBeenCalled();
  });

  it('błąd SQLite z expo-sqlite niesie errcode: 13 FULL → brak_miejsca, 10 IOERR i 5 BUSY → zapis_nieudany', async () => {
    const b = bazaNode();
    const port = await otworzPostep(adapterExpo(b.baza));
    for (const [kod, powod] of [[13, 'brak_miejsca'], [10, 'zapis_nieudany'], [5, 'zapis_nieudany']] as const) {
      b.ustawAwarie((sql) => (sql.startsWith('VACUUM INTO') ? bladExpo(kod, 'x') : null));
      expect(await kopiaBazy(port, '/tmp/nie-zapisze.db')).toEqual({ ok: false, powod });
    }
  });

  it('kontrola K-04 w buildzie deweloperskim: journal_mode ≠ delete → wpis kontrola_k04 w dzienniku', async () => {
    const b = bazaNode();
    const port = await otworzPostep(adapterExpo(b.baza));
    b.db.exec('PRAGMA journal_mode = memory');
    expect(await kontrolaK04(port)).toEqual({ ok: false, journalMode: 'memory', kluczeObce: 1 });
    expect(D.zapiszBlad).toHaveBeenCalledWith('kontrola_k04');
  });
});

describe('start bazy postępu przy uruchomieniu', () => {
  const plikiAtrapa = (istniejace: Set<string>) => {
    const przeniesione: [string, string][] = [];
    const sys: SystemPlikow = {
      plik: (uri) => ({
        uri,
        get exists() { return istniejace.has(uri); },
        copy: async () => undefined,
        move: async (cel) => { istniejace.delete(uri); istniejace.add(cel.uri); przeniesione.push([uri, cel.uri]); },
        delete: () => void istniejace.delete(uri),
      }),
      katalog: () => ({ exists: true, list: () => [] }),
      zasob: async () => null,
    };
    return { pliki: plikiPostepuExpo(sys), przeniesione };
  };

  it('zdrowa baza: port gotowy, bez pliku uszkodzonej, user.db nietknięta (ADR 0004)', async () => {
    const b = bazaNode();
    const { pliki, przeniesione } = plikiAtrapa(new Set(['K/postep.db', 'K/user.db']));
    const w = await startPostepu({ katalog: 'K', pliki, otworz: async () => adapterExpo(b.baza), terazMs: 5 });
    expect(w.ok).toBe(true);
    expect(w.ok && w.wartosc.uszkodzona).toBeNull();
    expect(przeniesione).toEqual([]);
  });

  it('plik nie jest bazą (Error code 26) → odłożony pod postep-uszkodzona-<ms>.db, nowa baza, wpis baza_uszkodzona', async () => {
    const zla = bazaNode();
    zla.ustawAwarie(() => bladExpo(26, 'file is not a database'));
    const dobra = bazaNode();
    const otwarcia = [zla.baza, dobra.baza];
    const { pliki, przeniesione } = plikiAtrapa(new Set(['K/postep.db']));
    const w = await startPostepu({ katalog: 'K', pliki, otworz: async () => adapterExpo(otwarcia.shift()!), terazMs: 77 });
    expect(w.ok && w.wartosc.uszkodzona).toBe('K/postep-uszkodzona-77.db');
    expect(przeniesione).toEqual([['K/postep.db', 'K/postep-uszkodzona-77.db']]);
    expect(D.zapiszBlad).toHaveBeenCalledWith('baza_uszkodzona');
  });

  it('baza z nowszej wersji aplikacji → { ok: false, powod: baza_nowsza } bez zapisu i wpis w dzienniku', async () => {
    const b = bazaNode();
    b.db.exec('PRAGMA user_version = 99');
    const { pliki } = plikiAtrapa(new Set(['K/postep.db']));
    const w = await startPostepu({ katalog: 'K', pliki, otworz: async () => adapterExpo(b.baza), terazMs: 1 });
    expect(w).toEqual({ ok: false, powod: 'baza_nowsza' });
    expect(D.zapiszBlad).toHaveBeenCalledWith('baza_nowsza');
  });

  it('przemianowanie bez nadpisywania: istniejący cel → wyjątek', async () => {
    const { pliki } = plikiAtrapa(new Set(['K/a.db', 'K/b.db']));
    await expect(pliki.przemianuj('K/a.db', 'K/b.db')).rejects.toThrow();
    expect(await pliki.istnieje('K/a.db')).toBe(true);
  });
});
