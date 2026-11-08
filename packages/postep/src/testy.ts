// Repozytorium testów modułu (moduly.md „Repozytoria”, „Kurs”: FaktyKursu.testy = wynik_testu + aktywnosc.koniec_ms).
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodOdczytu } from './ustawienia';

export interface WynikTestu { aktywnoscId: string; modulId: string; poprawne: number; wszystkie: number; zaliczony: boolean; koniecMs: number }

const calkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);

export async function wynikiTestow(port: PortBazy): Promise<Wynik<WynikTestu[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      `SELECT w.aktywnosc_id, w.modul_id, w.poprawne, w.wszystkie, w.zaliczony, a.koniec_ms
       FROM wynik_testu w JOIN aktywnosc a ON a.id = w.aktywnosc_id ORDER BY a.koniec_ms, w.aktywnosc_id`,
    );
    const wynik: WynikTestu[] = [];
    for (const w of wiersze) {
      if (typeof w !== 'object' || w === null || !('aktywnosc_id' in w) || typeof w.aktywnosc_id !== 'string') return { ok: false, powod: 'odczyt_nieudany' };
      if (!('modul_id' in w) || typeof w.modul_id !== 'string' || !('poprawne' in w) || !calkowita(w.poprawne)) return { ok: false, powod: 'odczyt_nieudany' };
      if (!('wszystkie' in w) || !calkowita(w.wszystkie) || !('zaliczony' in w) || (w.zaliczony !== 0 && w.zaliczony !== 1)) return { ok: false, powod: 'odczyt_nieudany' };
      if (!('koniec_ms' in w) || !calkowita(w.koniec_ms)) return { ok: false, powod: 'odczyt_nieudany' }; // wynik bez końca aktywności: niespójne
      wynik.push({ aktywnoscId: w.aktywnosc_id, modulId: w.modul_id, poprawne: w.poprawne, wszystkie: w.wszystkie, zaliczony: w.zaliczony === 1, koniecMs: w.koniec_ms });
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
// Zadania, na które padła odpowiedź w którymkolwiek teście modułu (wybór najpierw niewidzianych, build.ts `seen`).
export async function zadaniaZTestow(port: PortBazy): Promise<Wynik<string[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      `SELECT DISTINCT o.zadanie_id FROM odpowiedz o JOIN aktywnosc a ON a.id = o.aktywnosc_id
       WHERE a.rodzaj = 'test_modulu' ORDER BY o.zadanie_id`,
    );
    const ids: string[] = [];
    for (const w of wiersze) {
      if (typeof w !== 'object' || w === null || !('zadanie_id' in w) || typeof w.zadanie_id !== 'string') return { ok: false, powod: 'odczyt_nieudany' };
      ids.push(w.zadanie_id);
    }
    return { ok: true, wartosc: ids };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
