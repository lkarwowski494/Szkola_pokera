import type { AdvancementReport } from '@szkola/srs';
import type { Wynik } from '@szkola/domena';
import { odczytajUstawienie, zapiszUstawienie, type PortBazy, type PowodOdczytu, type PowodZapisu } from '@szkola/postep';

/**
 * Historia wskaźnika zaawansowania (dokument 14, 4.8) w `ustawienie` pod kluczem `historia_wskaznika` (D-250; schemat v1
 * bez tabeli historii): jeden punkt na dzień lokalny (D-251), nadpisywany w ciągu dnia, ostatnie HISTORIA_DNI dni. Ekran
 * pokazuje tylko wynik ogólny; część „gra” usunięta z trybem gry (ADR 0011), więc wynik = sama wiedza.
 */
export const KLUCZ_HISTORII = 'historia_wskaznika';
export const HISTORIA_DNI = 30;
export interface PunktHistorii { dzien: string; wynik: number | null }

export function dopiszHistorie(h: readonly PunktHistorii[], dzien: string, wynik: number | null): PunktHistorii[] {
  return [...h.filter((p) => p.dzien !== dzien), { dzien, wynik }].sort((a, b) => a.dzien.localeCompare(b.dzien)).slice(-HISTORIA_DNI);
}

function parsuj(v: unknown): PunktHistorii[] | null {
  if (v === null) return [];
  if (!Array.isArray(v)) return null;
  const wynik: PunktHistorii[] = [];
  for (const p of v as unknown[]) {
    if (typeof p !== 'object' || p === null || !('dzien' in p) || typeof p.dzien !== 'string' || !('wynik' in p)) return null;
    if (p.wynik !== null && (typeof p.wynik !== 'number' || !Number.isFinite(p.wynik))) return null;
    wynik.push({ dzien: p.dzien, wynik: p.wynik });
  }
  return wynik;
}

export async function czytajHistorie(port: PortBazy): Promise<Wynik<PunktHistorii[], PowodOdczytu>> {
  const r = await odczytajUstawienie(port, KLUCZ_HISTORII);
  if (!r.ok) return r;
  const h = parsuj(r.wartosc);
  return h ? { ok: true, wartosc: h } : { ok: false, powod: 'odczyt_nieudany' };
}

export async function zapiszHistorie(port: PortBazy, r: AdvancementReport, dzien: string, teraz: number): Promise<Wynik<void, PowodZapisu | PowodOdczytu>> {
  const h = await czytajHistorie(port);
  if (!h.ok) return h; // zła zapisana wartość nie jest nadpisywana po cichu
  return zapiszUstawienie(port, KLUCZ_HISTORII, dopiszHistorie(h.wartosc, dzien, r.overall), teraz);
}
