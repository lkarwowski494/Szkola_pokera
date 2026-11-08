// Pamięć dostępu (moduly.md „Repozytoria”: `uprawnienia` (pamięć); schemat.sql `uprawnienie_cache`; ADR 0006, D-209).
// Pamięć poza eksportem (dane sklepu, nie użytkownika). Zapis zastępuje całą pamięć w jednej transakcji.
import type { Pamiec, Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import type { PowodOdczytu } from './ustawienia';
import { jakoWynik } from './bledy';

const calkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);

// Brak wierszy = brak pamięci (null). Pusta pamięć po udanym odczycie bez zakupów też nie ma wierszy, więc wraca jako null:
// `decyzja` daje wtedy ten sam dostęp (brak), różni się tylko `zrodlo` (nazwane w raporcie części 5).
export async function odczytajPamiec(port: PortBazy): Promise<Wynik<Pamiec | null, PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>('SELECT produkt_id, wygasa_ms, odczytano_ms FROM uprawnienie_cache ORDER BY produkt_id');
    if (wiersze.length === 0) return { ok: true, wartosc: null };
    const produkty: { produkt: string; wygasaMs: number | null }[] = [];
    let odczytanoMs = 0;
    for (const w of wiersze) {
      if (typeof w !== 'object' || w === null || !('produkt_id' in w) || typeof w.produkt_id !== 'string') return { ok: false, powod: 'odczyt_nieudany' };
      if (!('wygasa_ms' in w) || (w.wygasa_ms !== null && !calkowita(w.wygasa_ms))) return { ok: false, powod: 'odczyt_nieudany' };
      if (!('odczytano_ms' in w) || !calkowita(w.odczytano_ms)) return { ok: false, powod: 'odczyt_nieudany' };
      produkty.push({ produkt: w.produkt_id, wygasaMs: typeof w.wygasa_ms === 'number' ? w.wygasa_ms : null });
      odczytanoMs = Math.max(odczytanoMs, w.odczytano_ms); // wiersze zapisuje jedna transakcja z tym samym czasem
    }
    return { ok: true, wartosc: { produkty, odczytanoMs } };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
export function zapiszPamiec(port: PortBazy, p: Pamiec): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    await tx.run('DELETE FROM uprawnienie_cache');
    for (const x of p.produkty) {
      await tx.run('INSERT INTO uprawnienie_cache (produkt_id, wygasa_ms, odczytano_ms) VALUES (?, ?, ?)', [x.produkt, x.wygasaMs, p.odczytanoMs]);
    }
  }));
}
