import type { Wynik } from '@szkola/domena';
import {
  BladStartuPostepu,
  uruchomPostep,
  usunPostep,
  usunStareBazy,
  type OpcjeStartu,
  type PlikiPostepu,
  type Polaczenie,
  type PortBazy,
  type PowodStartu,
  type PowodZapisu,
  type SurowyPort,
  type Wartosc,
} from '@szkola/postep';
import { openDatabaseAsync } from 'expo-sqlite';
import { katalogBazExpo, systemExpo, type SystemPlikow } from '@/data/tresc/plikiExpo';
import { utworzOchroneTla } from '@/platform/ochronaTla';
import { zapiszBlad } from '@/platform/dziennik';

/**
 * Adapter portu postępu na expo-sqlite 58.0.15 (moduly.md „Adaptery”; ADR 0003): `openDatabaseAsync('postep.db')`, `execAsync`,
 * `getAllAsync`, `runAsync`, `withTransactionAsync` (wołane wewnątrz kolejki portu `otworzPostep`), `closeAsync`.
 * Kontrakt błędów (packages/postep/src/start.ts): wyjątek niesie liczbowe `errcode` SQLite. expo-sqlite na iOS przekazuje kod
 * tylko w komunikacie (ios/SQLiteResult.swift:7: „Error code \(code): \(message)”), więc adapter go odczytuje; wyjątek bez kodu
 * przechodzi bez zmian (port traktuje go jak `zapis_nieudany`).
 */
export interface BazaExpo {
  execAsync(sql: string): Promise<void>;
  getAllAsync<T>(sql: string, params: Wartosc[]): Promise<T[]>;
  runAsync(sql: string, params: Wartosc[]): Promise<{ changes: number; lastInsertRowId: number }>;
  withTransactionAsync(fn: () => Promise<void>): Promise<void>;
  closeAsync(): Promise<void>;
}

export class BladSQLite extends Error {
  constructor(readonly errcode: number, message: string, options?: { cause: unknown }) {
    super(message, options);
    this.name = 'BladSQLite';
  }
}

/** Wyjątek expo-sqlite → BladSQLite z `errcode`, gdy komunikat ma „Error code <n>”; inny wyjątek bez zmian. */
export function zKodemSQLite(e: unknown): unknown {
  if (!(e instanceof Error) || e instanceof BladSQLite) return e;
  const m = /Error code (\d+)/.exec(e.message);
  return m ? new BladSQLite(Number(m[1]), e.message, { cause: e }) : e;
}

const owin = async <T>(f: () => Promise<T>): Promise<T> => {
  try {
    return await f();
  } catch (e) {
    throw zKodemSQLite(e);
  }
};

export function adapterExpo(db: BazaExpo): Polaczenie & SurowyPort {
  return {
    exec: (sql) => owin(() => db.execAsync(sql)),
    all: <T>(sql: string, p: Wartosc[] = []) => owin(() => db.getAllAsync<T>(sql, p)),
    run: (sql, p = []) =>
      owin(async () => {
        const r = await db.runAsync(sql, p);
        return { zmiany: r.changes, ostatnieId: r.lastInsertRowId };
      }),
    // wyjątek z `fn` (np. PrzerwanoWTle) przechodzi bez zmian — zKodemSQLite zmienia tylko wyjątki z kodem SQLite
    wTransakcji: (fn) => owin(() => db.withTransactionAsync(fn)),
    zamknij: () => owin(() => db.closeAsync()),
  };
}

/** Pliki postępu na expo-file-system (port `PlikiPostepu`, packages/postep/src/start.ts): przemianowanie bez nadpisywania. */
export function plikiPostepuExpo(sys: SystemPlikow = systemExpo): PlikiPostepu {
  return {
    istnieje: async (s) => sys.plik(s).exists,
    przemianuj: async (z, na) => {
      const cel = sys.plik(na);
      if (cel.exists) throw new Error(`Cel istnieje: ${na}`);
      await sys.plik(z).move(cel);
    },
    usun: async (s) => {
      const p = sys.plik(s);
      if (p.exists) p.delete();
    },
  };
}

/**
 * K-04 (kontrole-07.md; ADR 0003 „Kontrola przy starcie w buildzie deweloperskim”): `journal_mode` = delete i `foreign_keys` = 1
 * odczytane w transakcji zapisu przez port; przy ≠ wpis `kontrola_k04` w dzienniku. Wołane w `__DEV__` po starcie.
 */
export async function kontrolaK04(port: PortBazy): Promise<{ ok: boolean; journalMode: unknown; kluczeObce: unknown }> {
  const [j] = await port.all<unknown>('PRAGMA journal_mode');
  const journalMode = typeof j === 'object' && j !== null && 'journal_mode' in j ? j.journal_mode : null;
  const kluczeObce = await port.transakcja(async (tx) => {
    const [k] = await tx.all<unknown>('PRAGMA foreign_keys');
    return typeof k === 'object' && k !== null && 'foreign_keys' in k ? k.foreign_keys : null;
  });
  const ok = journalMode === 'delete' && kluczeObce === 1;
  if (!ok) zapiszBlad('kontrola_k04');
  return { ok, journalMode, kluczeObce };
}

const nazwaPliku = (sciezka: string) => sciezka.slice(sciezka.lastIndexOf('/') + 1);

/** Otwarcie pliku z katalogu baz expo-sqlite (Documents/SQLite) po nazwie — ten sam katalog co `katalogBazExpo`. */
export async function otworzPolaczenieExpo(sciezka: string): Promise<Polaczenie & SurowyPort> {
  const db = await owin(() => openDatabaseAsync(nazwaPliku(sciezka)));
  return adapterExpo(db);
}

const POWODY_STARTU: readonly PowodStartu[] = ['baza_nowsza', 'migracja_nieudana', 'przerwano_w_tle', 'baza_uszkodzona'];

/**
 * Start `postep.db` (ADR 0004: stare `user.db*` nietknięte): `uruchomPostep` z ochroną tła. `BladStartuPostepu` i każdy inny
 * wyjątek (np. SQLITE_IOERR) → wartość z powodem i wpis w dzienniku; nic nie jest zapisywane (tlo-i-bledy.md §4, D-200).
 * Odłożona uszkodzona baza → wpis `baza_uszkodzona` (ekran z „Zgłoś błąd” i importem: część 5, stan roli 04).
 */
export async function startPostepu(
  o: Omit<OpcjeStartu, 'ochrona'> & Partial<Pick<OpcjeStartu, 'ochrona'>>,
): Promise<Wynik<{ port: PortBazy; uszkodzona: string | null }, PowodStartu | 'zapis_nieudany'>> {
  try {
    const w = await uruchomPostep(o);
    if (w.uszkodzona !== null) zapiszBlad('baza_uszkodzona');
    return { ok: true, wartosc: w };
  } catch (e) {
    const powod = e instanceof BladStartuPostepu && POWODY_STARTU.includes(e.powod) ? e.powod : 'zapis_nieudany';
    zapiszBlad(powod);
    return { ok: false, powod };
  }
}

/** Start w aplikacji: katalog baz expo-sqlite, pliki expo-file-system, ochrona tła z modułu `ochrona-tla`. */
export function startPostepuExpo(terazMs: number = Date.now()) {
  let katalog: string;
  try {
    katalog = katalogBazExpo();
  } catch {
    zapiszBlad('zapis_nieudany');
    return Promise.resolve({ ok: false, powod: 'zapis_nieudany' } as const);
  }
  return startPostepu({ katalog, pliki: plikiPostepuExpo(), otworz: otworzPolaczenieExpo, terazMs, ochrona: utworzOchroneTla() });
}

/** „Usuń postęp” (BR-DANE-003): postęp przez port, potem stare `user.db*` (ADR 0004 wyjątek); stare pliki tylko po udanym pierwszym kroku. */
export async function usunCalyPostep(port: PortBazy, dzien: string, pliki: PlikiPostepu = plikiPostepuExpo(), katalog?: string): Promise<Wynik<void, PowodZapisu>> {
  const w = await usunPostep(port, dzien);
  if (!w.ok) return w;
  let k: string;
  try {
    k = katalog ?? katalogBazExpo();
  } catch {
    return { ok: false, powod: 'zapis_nieudany' };
  }
  return usunStareBazy(pliki, k);
}
