// Repozytorium postępu lekcji (moduly.md „Repozytoria”; schemat.sql `postep_lekcji`). Ukończenie lekcji zapisuje
// zakończenie aktywności `lekcja` (aktywnosci.ts), nie to repozytorium (moduly.md „Kurs”: jedna ścieżka zapisu).
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import type { PowodOdczytu } from './ustawienia';
import { jakoWynik } from './bledy';

export interface PostepLekcji { lekcjaId: string; teoriaPrzeczytana: boolean; ukonczonoMs: number | null }

function wierszLekcji(w: unknown): PostepLekcji | null {
  if (typeof w !== 'object' || w === null) return null;
  if (!('lekcja_id' in w) || typeof w.lekcja_id !== 'string') return null;
  if (!('teoria_przeczytana' in w) || (w.teoria_przeczytana !== 0 && w.teoria_przeczytana !== 1)) return null;
  if (!('ukonczono_ms' in w) || (w.ukonczono_ms !== null && !Number.isInteger(w.ukonczono_ms))) return null;
  return { lekcjaId: w.lekcja_id, teoriaPrzeczytana: w.teoria_przeczytana === 1, ukonczonoMs: typeof w.ukonczono_ms === 'number' ? w.ukonczono_ms : null };
}

// Wiersz niezgodny ze schematem → odczyt_nieudany (nie pominięcie: brak lekcji wyglądałby jak brak postępu).
export async function odczytajPostepLekcji(port: PortBazy): Promise<Wynik<PostepLekcji[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>('SELECT lekcja_id, teoria_przeczytana, ukonczono_ms FROM postep_lekcji ORDER BY lekcja_id');
    const wynik: PostepLekcji[] = [];
    for (const w of wiersze) {
      const l = wierszLekcji(w);
      if (!l) return { ok: false, powod: 'odczyt_nieudany' };
      wynik.push(l);
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

// UPSERT tylko teoria_przeczytana i zmieniono_ms: miejsce i ukonczono_ms zostają (ADR 0003 pkt 4).
export function oznaczTeoriePrzeczytana(port: PortBazy, lekcjaId: string, terazMs: number): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(async () => {
    await port.run(
      `INSERT INTO postep_lekcji (lekcja_id, teoria_przeczytana, zmieniono_ms) VALUES (?, 1, ?)
       ON CONFLICT (lekcja_id) DO UPDATE SET teoria_przeczytana = 1, zmieniono_ms = excluded.zmieniono_ms`,
      [lekcjaId, terazMs],
    );
  });
}
