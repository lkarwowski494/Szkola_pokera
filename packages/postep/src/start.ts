// Start bazy postępu z plików i stare bazy z buildów 1005–1008 (K-12 „baza_uszkodzona”, K-14; ADR 0004; tlo-i-bledy.md §4).
// Uzupełnienie roli 07 (luka dla 05, E3): moduly.md nie ma operacji na plikach bazy. Kształt `PlikiPostepu` według
// expo-file-system (getInfoAsync, moveAsync, deleteAsync); adapter testowy: tests/narzedzia/pliki-node.ts.
// Kontrakt błędów (założenie 07, do potwierdzenia przez 05): wyjątek z `SurowyPort` / `Polaczenie` niesie liczbowe `errcode`
// SQLite (podstawowy albo rozszerzony; rodzaj = errcode & 0xff, sqlite.org/rescode.html): 13 FULL → `brak_miejsca`;
// 10 IOERR, 5 BUSY → `zapis_nieudany`; 11 CORRUPT, 26 NOTADB przy otwarciu → `baza_uszkodzona`.
import type { OchronaTla, Wynik } from '@szkola/domena';
import { jakoWynik, kodSQLite, SQLITE_CORRUPT, SQLITE_NOTADB } from './bledy';
import { BladStartuPostepu, otworzPostep, type Polaczenie, type PortBazy, type SurowyPort } from './port';
import type { PowodZapisu } from './daneUzytkownika';

export interface PlikiPostepu {
  istnieje(sciezka: string): Promise<boolean>;
  przemianuj(z: string, na: string): Promise<void>; // bez nadpisywania istniejącego celu
  usun(sciezka: string): Promise<void>;
}
export interface OpcjeStartu {
  katalog: string; // bez końcowego „/”; plik bazy: `${katalog}/postep.db`
  pliki: PlikiPostepu;
  otworz: (sciezka: string) => Promise<Polaczenie & SurowyPort>;
  terazMs: number; // znacznik w nazwie `postep-uszkodzona-<ms>.db`
  ochrona?: OchronaTla;
}
// `uszkodzona`: ścieżka zachowanego pliku, gdy baza była uszkodzona (ekran z „Zgłoś błąd” i importem), inaczej null.
// Plik uszkodzony nigdy nie jest usuwany ani nadpisywany; błąd inny niż CORRUPT/NOTADB (np. IOERR) nie jest uszkodzeniem.
// Stare `user.db*` nieotwierane i nietknięte (ADR 0004).
const STARE_BAZY = ['user.db-wal', 'user.db-shm', 'user.db'] as const;
const nazwaUszkodzonej = (ms: number, n: number) => (n === 0 ? `postep-uszkodzona-${ms}.db` : `postep-uszkodzona-${ms}-${n}.db`);
const czyUszkodzona = (e: unknown) => { const k = kodSQLite(e); return k === SQLITE_CORRUPT || k === SQLITE_NOTADB; };

// Otwarcie z próbą odczytu schematu: plik bez nagłówka SQLite (NOTADB) albo z uszkodzoną stroną 1 (CORRUPT) zgłasza błąd tutaj,
// a nie przy pierwszym zapisie użytkownika. Połączenie zamykane przy każdym błędzie.
async function otworzZProba(o: OpcjeStartu, sciezka: string): Promise<PortBazy> {
  const pol = await o.otworz(sciezka);
  try {
    await pol.all('SELECT count(*) AS n FROM sqlite_schema');
    return await otworzPostep(pol, o.ochrona);
  } catch (e) {
    await pol.zamknij();
    throw e;
  }
}

// Uszkodzona baza pod wolną nazwą (D-201); nic nie jest usuwane ani nadpisywane. Dziennik `-journal` obsługuje SQLite przy otwarciu
// (próba D-201: nieprawidłowy dziennik znika przy pierwszym odczycie), więc po próbie odczytu nie ma czego przenosić.
async function odlozUszkodzona(o: OpcjeStartu, sciezka: string): Promise<string> {
  let n = 0;
  const cel = () => `${o.katalog}/${nazwaUszkodzonej(o.terazMs, n)}`;
  while (await o.pliki.istnieje(cel())) n++;
  await o.pliki.przemianuj(sciezka, cel());
  return cel();
}

export async function uruchomPostep(o: OpcjeStartu): Promise<{ port: PortBazy; uszkodzona: string | null }> {
  const sciezka = `${o.katalog}/postep.db`;
  try {
    return { port: await otworzZProba(o, sciezka), uszkodzona: null };
  } catch (e) {
    if (!czyUszkodzona(e)) throw e; // np. SQLITE_IOERR: nie uszkodzenie, plik zostaje (K-12)
  }
  let uszkodzona: string;
  try {
    uszkodzona = await odlozUszkodzona(o, sciezka);
  } catch {
    throw new BladStartuPostepu('baza_uszkodzona'); // plik nie przeniesiony: bez nowej bazy na jego miejscu
  }
  return { port: await otworzZProba(o, sciezka), uszkodzona };
}
// „Usuń postęp” (BR-DANE-003, ADR 0004 wyjątek): po usunięciu postępu przez port usuwa `user.db`, `user.db-wal`, `user.db-shm`
// (te, które istnieją); innych plików nie dotyka.
export function usunStareBazy(pliki: PlikiPostepu, katalog: string): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(async () => {
    for (const n of STARE_BAZY) if (await pliki.istnieje(`${katalog}/${n}`)) await pliki.usun(`${katalog}/${n}`);
  });
}
