// Wspólne przygotowanie testów portu postępu (K-02, K-04, K-10, K-11, K-15): wzorzec v1 w katalogu tymczasowym, port przez adapter node:sqlite.
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { OchronaTla } from '../../../packages/domena/src';
import { otworzPostep } from '../../../packages/postep/src';
import { adapterNode, otworzNode, type Zdarzenie } from '../../narzedzia/postep-node';
import { zbudujWzorzecV1 } from '../../narzedzia/wzorzec-bazy';

const katalogi: string[] = [];
export function katalogTymczasowy(): string {
  const k = mkdtempSync(join(tmpdir(), 'postep-'));
  katalogi.push(k);
  return k;
}
export function sprzatnij() { for (const k of katalogi.splice(0)) rmSync(k, { recursive: true, force: true }); }

// Baza: 'wzorzec' (wzorzec v1 z danymi brzegowymi) albo 'pusta' (plik nieistniejący; schemat tworzy port).
export async function przygotuj(baza: 'wzorzec' | 'pusta', o: { zdarzenie?: (z: Zdarzenie) => void; ochrona?: OchronaTla } = {}) {
  const sciezka = join(katalogTymczasowy(), 'postep.db');
  const licznosci = baza === 'wzorzec' ? zbudujWzorzecV1(sciezka) : null;
  const db = otworzNode(sciezka);
  const port = await otworzPostep(adapterNode(db, (z) => o.zdarzenie?.(z)), o.ochrona);
  return { db, port, sciezka, licznosci };
}

// Błąd jak z node:sqlite przy błędzie wejścia-wyjścia (SQLITE_IOERR = 10, sqlite.org/rescode.html).
export function bladIO(): Error {
  return Object.assign(new Error('disk I/O error'), { code: 'ERR_SQLITE_ERROR', errcode: 10, errstr: 'disk I/O error' });
}
