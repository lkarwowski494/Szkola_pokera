// Start bazy postępu z plików i stare bazy z buildów 1005–1008 (K-12 „baza_uszkodzona”, K-14; ADR 0004; tlo-i-bledy.md §4).
// Uzupełnienie roli 07 (luka dla 05, E3): moduly.md nie ma operacji na plikach bazy. Kształt `PlikiPostepu` według
// expo-file-system (getInfoAsync, moveAsync, deleteAsync); adapter testowy: tests/narzedzia/pliki-node.ts.
// Kontrakt błędów (założenie 07, do potwierdzenia przez 05): wyjątek z `SurowyPort` / `Polaczenie` niesie liczbowe `errcode`
// SQLite (podstawowy albo rozszerzony; rodzaj = errcode & 0xff, sqlite.org/rescode.html): 13 FULL → `brak_miejsca`;
// 10 IOERR, 5 BUSY → `zapis_nieudany`; 11 CORRUPT, 26 NOTADB przy otwarciu → `baza_uszkodzona`.
import type { OchronaTla, Wynik } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';
import type { Polaczenie, PortBazy, SurowyPort } from './port';
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
export function uruchomPostep(_o: OpcjeStartu): Promise<{ port: PortBazy; uszkodzona: string | null }> {
  return niezaimplementowane('uruchomPostep (ADR 0004, K-12, K-14)');
}
// „Usuń postęp” (BR-DANE-003, ADR 0004 wyjątek): po usunięciu postępu przez port usuwa `user.db`, `user.db-wal`, `user.db-shm`
// (te, które istnieją); innych plików nie dotyka.
export function usunStareBazy(_pliki: PlikiPostepu, _katalog: string): Promise<Wynik<void, PowodZapisu>> {
  return niezaimplementowane('usunStareBazy (ADR 0004, BR-DANE-003)');
}
