// Port bazy postępu (ADR 0003; docs/architektura/moduly.md „Port bazy”). Pakiet bez React Native i expo-* (granice.mjs).
import type { OchronaTla } from '@szkola/domena';
import { listaMigracji, migruj } from './migracje';

export type Wartosc = string | number | null;
export interface Wynik { zmiany: number; ostatnieId: number }
export interface Tx { // to samo połączenie, bez ponownego kolejkowania
  run(sql: string, p?: Wartosc[]): Promise<Wynik>;
  all<T>(sql: string, p?: Wartosc[]): Promise<T[]>;
}
export interface PortBazy extends Tx { // run: przez kolejkę; all: poza kolejką
  transakcja<T>(fn: (tx: Tx) => Promise<T>): Promise<T>; // przez kolejkę; fn czeka tylko na tx.*
  zamknij(): Promise<void>;
}
export interface Polaczenie { exec(sql: string): Promise<void>; all<T>(sql: string): Promise<T[]> } // dla runnera migracji
// Uzupełnienie roli 07 (luka dla 05, E3): moduly.md używa `SurowyPort` bez definicji. Kształt według adaptera
// expo-sqlite (runAsync, getAllAsync, withTransactionAsync, closeAsync); adapter testowy: tests/narzedzia/postep-node.ts.
export interface SurowyPort {
  run(sql: string, p?: Wartosc[]): Promise<Wynik>;
  all<T>(sql: string, p?: Wartosc[]): Promise<T[]>;
  wTransakcji(fn: () => Promise<void>): Promise<void>;
  zamknij(): Promise<void>;
}

// baza_uszkodzona: plik uszkodzony, którego nie udało się odłożyć (start.ts); bez nowej bazy na jego miejscu.
export type PowodStartu = 'baza_nowsza' | 'migracja_nieudana' | 'przerwano_w_tle' | 'baza_uszkodzona';
// Błąd startu bazy (D-200, luka L8-01 dla 05): sygnatura zwraca port, więc powód z tlo-i-bledy.md §4 niesie wyjątek typowany
// (wzór Treningu: wyjątek migracji przerywa start bez zapisu, lib/state/boot.ts:96–101). Nic nie zostało zapisane.
export class BladStartuPostepu extends Error {
  constructor(readonly powod: PowodStartu) {
    super(`Start bazy postępu: ${powod}`);
    this.name = 'BladStartuPostepu';
  }
}

// foreign_keys=ON (poza transakcją) → migruj(listaMigracji()) → port z jedną kolejką zapisów (wzór: e1-sqlite.mjs, portZKolejka).
// `ochrona` (ADR 0013 pkt 2): opcjonalna; długie operacje z listy pkt 3 wołają rozpocznij/zakoncz.
export async function otworzPostep(adapter: Polaczenie & SurowyPort, ochrona?: OchronaTla): Promise<PortBazy> {
  await adapter.exec('PRAGMA foreign_keys = ON');
  const [fk] = await adapter.all<unknown>('PRAGMA foreign_keys');
  if (!(typeof fk === 'object' && fk !== null && 'foreign_keys' in fk && fk.foreign_keys === 1)) {
    throw new Error('Klucze obce wyłączone na połączeniu bazy postępu (ADR 0003 pkt 1)');
  }
  const w = await migruj(adapter, listaMigracji(), ochrona);
  if (!w.ok) throw new BladStartuPostepu(w.powod);
  return portZKolejka(adapter);
}

// Jedna kolejka zapisów (ADR 0003 pkt 3): kolejne zadanie startuje po zakończeniu poprzedniego, także nieudanego.
export function kolejka(): <T>(zadanie: () => Promise<T>) => Promise<T> {
  let ogon: Promise<unknown> = Promise.resolve();
  return <T>(zadanie: () => Promise<T>): Promise<T> => {
    const wynik = ogon.then(zadanie, zadanie);
    ogon = wynik.then(() => undefined, () => undefined);
    return wynik;
  };
}

// run i transakcja przez kolejkę; all poza kolejką (odczyt). Zapis spoza kolejki w czasie transakcji trafiłby do niej
// (docs.expo.dev …/sqlite: transakcja nie jest wyłączna; E1a), dlatego tx.* w `fn` nie kolejkuje się ponownie.
function portZKolejka(adapter: SurowyPort): PortBazy {
  const wKolejce = kolejka();
  const tx: Tx = { run: (sql, p) => adapter.run(sql, p), all: (sql, p) => adapter.all(sql, p) };
  async function wTransakcji<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    const wynik: { v: T }[] = [];
    await adapter.wTransakcji(async () => { wynik.push({ v: await fn(tx) }); });
    const [w] = wynik;
    if (!w) throw new Error('transakcja zakończona bez wyniku'); // stan niemożliwy: wTransakcji kończy się po fn albo rzuca
    return w.v;
  }
  return {
    run: (sql, p) => wKolejce(() => tx.run(sql, p)),
    all: tx.all,
    transakcja: (fn) => wKolejce(() => wTransakcji(fn)),
    zamknij: () => wKolejce(() => adapter.zamknij()),
  };
}
