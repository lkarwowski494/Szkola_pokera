// Port bazy postępu (ADR 0003; docs/architektura/moduly.md „Port bazy”). Pakiet bez React Native i expo-* (granice.mjs).
import type { OchronaTla } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';

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

// foreign_keys=ON (poza transakcją) → migruj(listaMigracji()) → port z jedną kolejką zapisów (wzór: e1-sqlite.mjs, portZKolejka).
// `ochrona` (ADR 0013 pkt 2): opcjonalna; długie operacje z listy pkt 3 wołają rozpocznij/zakoncz.
export function otworzPostep(_adapter: Polaczenie & SurowyPort, _ochrona?: OchronaTla): Promise<PortBazy> {
  return niezaimplementowane('otworzPostep (ADR 0003, 0013)');
}
