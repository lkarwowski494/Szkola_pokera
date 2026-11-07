// Eksport, import, kopia i „Usuń postęp” przez port (ADR 0008, 0013; dane.md; algorytmy: e2-schemat.mjs sekcje 6–7).
// Sygnatury uzupełnione przez rolę 07 (moduly.md podaje tylko nazwy operacji) — luka dla 05, zapis w strategia.md §9.
import { FORMAT_EKSPORTU, KONFIGURACJA, TABELE_EKSPORTU, walidujEksport, type TabelaEksportu, type Wynik } from '@szkola/domena';
import { kodSQLite, powodZapisu, SQLITE_CONSTRAINT } from './bledy';
import type { PortBazy, Tx, Wartosc } from './port';

export type PowodZapisu = 'zapis_nieudany' | 'brak_miejsca' | 'przerwano_w_tle';

// Kolumny tabel postępu = docs/architektura/schemat.sql (strażnik: test kolumny-eksportu). Zamknięta lista, bo nazwy kolumn
// z pliku importu trafiają do SQL (D-202); parametr `?` zastępuje tylko wartość.
export const KOLUMNY_EKSPORTU: Record<TabelaEksportu, readonly string[]> = {
  ustawienie: ['klucz', 'wartosc', 'zmieniono_ms'],
  postep_lekcji: ['lekcja_id', 'teoria_przeczytana', 'miejsce', 'ukonczono_ms', 'zmieniono_ms'],
  aktywnosc: ['id', 'rodzaj', 'stan', 'z_limitu', 'dzien_lokalny', 'strefa', 'plan', 'krok', 'start_ms', 'koniec_ms'],
  odpowiedz: ['id', 'aktywnosc_id', 'krok', 'zadanie_id', 'rodzina_id', 'wybor', 'ocena', 'zaliczona', 'czas_ms', 'odpowiedziano_ms'],
  wynik_testu: ['aktywnosc_id', 'modul_id', 'poprawne', 'wszystkie', 'zaliczony'],
  karta: ['rodzina_id', 'termin_ms', 'stabilnosc', 'trudnosc', 'dni_zaplanowane', 'kroki_nauki', 'powtorzenia', 'zapomnienia', 'stan',
    'ostatnia_powtorka_ms', 'zmieniono_ms'],
  log_powtorki: ['id', 'rodzina_id', 'odpowiedz_id', 'ocena_fsrs', 'stan_przed', 'termin_przed_ms', 'powtorzono_ms'],
};
const KLUCZ: Record<TabelaEksportu, string> = {
  ustawienie: 'klucz', postep_lekcji: 'lekcja_id', aktywnosc: 'id', odpowiedz: 'id', wynik_testu: 'aktywnosc_id', karta: 'rodzina_id', log_powtorki: 'id',
};
// Dzieci przed rodzicami (klucze obce): kolejność usuwania; wstawianie w kolejności odwrotnej (TABELE_EKSPORTU).
const DZIECI_PRZED_RODZICAMI: readonly TabelaEksportu[] = ['log_powtorki', 'karta', 'wynik_testu', 'odpowiedz', 'aktywnosc', 'postep_lekcji', 'ustawienie'];

const czyWartosc = (v: unknown): v is Wartosc => v === null || typeof v === 'string' || (typeof v === 'number' && Number.isFinite(v));
const czyObiekt = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

// Wiersz z bazy albo pliku jako lista wartości w kolejności kolumn; null, gdy kolumny lub typy wartości się nie zgadzają.
function wartosciWiersza(t: TabelaEksportu, w: unknown): Wartosc[] | null {
  if (!czyObiekt(w)) return null;
  const kolumny = KOLUMNY_EKSPORTU[t];
  if (Object.keys(w).length !== kolumny.length) return null;
  const wartosci: Wartosc[] = [];
  for (const k of kolumny) {
    const v = w[k];
    if (!(k in w) || !czyWartosc(v)) return null;
    wartosci.push(v);
  }
  return wartosci;
}

class NieprawidloweDane extends Error {}

// Koperta ADR 0008 jako tekst JSON; odczyt w jednej transakcji (spójny stan wszystkich tabel).
export async function eksportuj(port: PortBazy, meta: { terazMs: number; aplikacja: string }): Promise<Wynik<string, PowodZapisu>> {
  try {
    const dane = await port.transakcja(async (tx) => {
      const wynik: Record<string, Record<string, Wartosc>[]> = {};
      for (const t of TABELE_EKSPORTU) {
        const kolumny = KOLUMNY_EKSPORTU[t];
        const wiersze = await tx.all<unknown>(`SELECT ${kolumny.join(', ')} FROM ${t} ORDER BY ${KLUCZ[t]}`);
        wynik[t] = wiersze.map((w) => {
          const wartosci = wartosciWiersza(t, w);
          if (!wartosci) throw new NieprawidloweDane(`eksport: nieoczekiwany wiersz w ${t}`);
          return Object.fromEntries(kolumny.map((k, i) => [k, wartosci[i] ?? null]));
        });
      }
      return wynik;
    });
    return { ok: true, wartosc: JSON.stringify({
      format: FORMAT_EKSPORTU, wersja_formatu: KONFIGURACJA.EKSPORT_WERSJA_FORMATU, utworzono: new Date(meta.terazMs).toISOString(),
      aplikacja: meta.aplikacja, dane,
    }) };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}

// Dzisiejsze aktywności z limitu, które zostają (import spoza pliku, „Usuń postęp”), jako puste znaczniki: zużycie limitu się nie
// odnawia (ADR 0007 pkt 5), a odpowiedzi i plan znikają (dane.md „Usuń postęp”; D-202). Odpowiedzi usuwa wywołujący wcześniej.
async function zostawZnacznikiDnia(tx: Tx, dzienLokalny: string, usunTakze: ReadonlySet<string>): Promise<void> {
  await tx.run('DELETE FROM aktywnosc WHERE NOT (dzien_lokalny = ? AND z_limitu = 1)', [dzienLokalny]);
  const dzis = await tx.all<unknown>('SELECT id FROM aktywnosc');
  for (const w of dzis) {
    if (!(czyObiekt(w) && typeof w.id === 'string')) throw new NieprawidloweDane('aktywnosc.id');
    if (usunTakze.has(w.id)) await tx.run('DELETE FROM aktywnosc WHERE id = ?', [w.id]);
  }
  await tx.run("UPDATE aktywnosc SET stan = 'porzucona', plan = '{}', krok = 0, koniec_ms = coalesce(koniec_ms, start_ms)");
}

// Walidacja całości przed dotknięciem bazy; jedna transakcja; dzisiejsze aktywności z limitu spoza pliku zostają (ADR 0007).
// Kopia VACUUM INTO przed importem: wywołujący przez kopiaBazy (ADR 0008 pkt 2.3; luka L8-02, D-202).
export async function importuj(
  port: PortBazy,
  tekst: string,
  dzienLokalny: string,
): Promise<Wynik<void, 'bledny_plik' | 'nowsza_wersja' | PowodZapisu>> {
  const k = walidujEksport(tekst, KONFIGURACJA.EKSPORT_WERSJA_FORMATU);
  if (!k.ok) return k;
  const wiersze: { t: TabelaEksportu; wartosci: Wartosc[] }[] = [];
  const idAktywnosci = new Set<string>();
  for (const t of TABELE_EKSPORTU) {
    const zPliku = k.wartosc.dane[t];
    if (!zPliku) return { ok: false, powod: 'bledny_plik' }; // walidujEksport już to sprawdza; brak tabeli nie staje się pustą
    for (const w of zPliku) {
      const wartosci = wartosciWiersza(t, w);
      if (!wartosci) return { ok: false, powod: 'bledny_plik' };
      const id = wartosci[KOLUMNY_EKSPORTU.aktywnosc.indexOf('id')];
      if (t === 'aktywnosc' && typeof id === 'string') idAktywnosci.add(id);
      wiersze.push({ t, wartosci });
    }
  }
  try {
    await port.transakcja(async (tx) => {
      for (const t of DZIECI_PRZED_RODZICAMI) if (t !== 'aktywnosc') await tx.run(`DELETE FROM ${t}`);
      await zostawZnacznikiDnia(tx, dzienLokalny, idAktywnosci);
      for (const { t, wartosci } of wiersze) {
        const kolumny = KOLUMNY_EKSPORTU[t];
        await tx.run(`INSERT INTO ${t} (${kolumny.join(', ')}) VALUES (${kolumny.map(() => '?').join(', ')})`, wartosci);
      }
      if ((await tx.all('PRAGMA foreign_key_check')).length > 0) throw new NieprawidloweDane('import: naruszenia kluczy obcych');
    });
    return { ok: true, wartosc: undefined };
  } catch (e) {
    // Dane z pliku łamiące CHECK, UNIQUE albo klucz obcy: błędny plik (D-202); transakcja wycofana, postęp bez zmian.
    if (e instanceof NieprawidloweDane || kodSQLite(e) === SQLITE_CONSTRAINT) return { ok: false, powod: 'bledny_plik' };
    return { ok: false, powod: powodZapisu(e) };
  }
}

// Kopia działającej bazy przed importem i migracją: VACUUM INTO ? (dane.md „Polityka kopii”); poza transakcją, przez kolejkę.
export async function kopiaBazy(port: PortBazy, sciezka: string): Promise<Wynik<void, PowodZapisu>> {
  try {
    await port.run('VACUUM INTO ?', [sciezka]);
    return { ok: true, wartosc: undefined };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}

// BR-DANE-003: postęp usunięty; dzisiejsze zużycie limitu (puste znaczniki) i uprawnienie_cache zostają. Wynik testu usuwany jawnie:
// znacznik dnia może być powtórnym testem z wynikiem (wzór e2-schemat.mjs zostawiałby go przy znaczniku).
export async function usunPostep(port: PortBazy, dzienLokalny: string): Promise<Wynik<void, PowodZapisu>> {
  try {
    await port.transakcja(async (tx) => {
      for (const t of DZIECI_PRZED_RODZICAMI) if (t !== 'aktywnosc') await tx.run(`DELETE FROM ${t}`);
      await zostawZnacznikiDnia(tx, dzienLokalny, new Set());
      await tx.run('DELETE FROM dziennik');
    });
    return { ok: true, wartosc: undefined };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}
