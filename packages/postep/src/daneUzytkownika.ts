// Eksport, import, kopia i „Usuń postęp” przez port (ADR 0008, 0013; dane.md; algorytmy: e2-schemat.mjs sekcje 6–7).
// Sygnatury uzupełnione przez rolę 07 (moduly.md podaje tylko nazwy operacji) — luka dla 05, zapis w strategia.md §9.
import { FORMAT_EKSPORTU, KONFIGURACJA, TABELE_EKSPORTU, walidujEksport, type TabelaEksportu, type Wynik } from '@szkola/domena';
import { kodSQLite, powodZapisu, SQLITE_CONSTRAINT } from './bledy';
import { dlugaOperacja, type PortBazy, type Tx, type Wartosc } from './port';

export type PowodZapisu = 'zapis_nieudany' | 'brak_miejsca' | 'przerwano_w_tle';

// Kolumny tabel postępu i ich typy = docs/architektura/schemat.sql + schemat-v2.sql (strażnik: test kolumny-eksportu w dane-08). Zamknięta lista, bo
// nazwy kolumn z pliku importu trafiają do SQL (D-202), a SQLite przy afinicji INTEGER/REAL przyjmuje tekst bez błędu (przegląd
// D-043, P1). i = liczba całkowita, r = liczba, t = tekst; „?” = dopuszcza NULL.
type TypKolumny = 'i' | 'i?' | 'r' | 't';
export const TYPY_KOLUMN: Record<TabelaEksportu, Readonly<Record<string, TypKolumny>>> = {
  ustawienie: { klucz: 't', wartosc: 't', zmieniono_ms: 'i' },
  postep_lekcji: { lekcja_id: 't', teoria_przeczytana: 'i', miejsce: 't', ukonczono_ms: 'i?', zmieniono_ms: 'i' },
  aktywnosc: { id: 't', rodzaj: 't', stan: 't', z_limitu: 'i', dzien_lokalny: 't', strefa: 't', plan: 't', krok: 'i', start_ms: 'i', koniec_ms: 'i?' },
  odpowiedz: { id: 'i', aktywnosc_id: 't', krok: 'i', zadanie_id: 't', rodzina_id: 't', wybor: 't', ocena: 't', zaliczona: 'i', czas_ms: 'i',
    odpowiedziano_ms: 'i' },
  wynik_testu: { aktywnosc_id: 't', modul_id: 't', poprawne: 'i', wszystkie: 'i', zaliczony: 'i' },
  karta: { rodzina_id: 't', termin_ms: 'i', stabilnosc: 'r', trudnosc: 'r', dni_zaplanowane: 'r', kroki_nauki: 'i', powtorzenia: 'i',
    zapomnienia: 'i', stan: 'i', ostatnia_powtorka_ms: 'i?', zmieniono_ms: 'i' },
  log_powtorki: { id: 'i', rodzina_id: 't', odpowiedz_id: 'i?', ocena_fsrs: 'i', stan_przed: 'i', termin_przed_ms: 'i', powtorzono_ms: 'i' },
  wariant_historia: { id: 'i', szablon_id: 't', poziom: 't', odcisk: 't', ziarno: 'i', zagrano_ms: 'i' }, // schemat-v2.sql (D-532)
};
export const KOLUMNY_EKSPORTU: Record<TabelaEksportu, readonly string[]> = {
  ustawienie: Object.keys(TYPY_KOLUMN.ustawienie), postep_lekcji: Object.keys(TYPY_KOLUMN.postep_lekcji),
  aktywnosc: Object.keys(TYPY_KOLUMN.aktywnosc), odpowiedz: Object.keys(TYPY_KOLUMN.odpowiedz),
  wynik_testu: Object.keys(TYPY_KOLUMN.wynik_testu), karta: Object.keys(TYPY_KOLUMN.karta), log_powtorki: Object.keys(TYPY_KOLUMN.log_powtorki),
  wariant_historia: Object.keys(TYPY_KOLUMN.wariant_historia),
};
const KLUCZ: Record<TabelaEksportu, string> = {
  ustawienie: 'klucz', postep_lekcji: 'lekcja_id', aktywnosc: 'id', odpowiedz: 'id', wynik_testu: 'aktywnosc_id', karta: 'rodzina_id', log_powtorki: 'id', wariant_historia: 'id',
};
// Dzieci przed rodzicami (klucze obce): kolejność usuwania; wstawianie w kolejności odwrotnej (TABELE_EKSPORTU).
const DZIECI_PRZED_RODZICAMI: readonly TabelaEksportu[] = ['wariant_historia', 'log_powtorki', 'karta', 'wynik_testu', 'odpowiedz', 'aktywnosc', 'postep_lekcji', 'ustawienie'];

function zgodnaZTypem(typ: TypKolumny | undefined, v: unknown): v is Wartosc {
  switch (typ) {
    case 'i': return typeof v === 'number' && Number.isInteger(v);
    case 'i?': return v === null || (typeof v === 'number' && Number.isInteger(v));
    case 'r': return typeof v === 'number' && Number.isFinite(v);
    case 't': return typeof v === 'string';
    default: return false;
  }
}
const czyObiekt = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

// Wiersz z bazy albo pliku jako lista wartości w kolejności kolumn; null, gdy kolumny lub typy wartości się nie zgadzają.
function wartosciWiersza(t: TabelaEksportu, w: unknown): Wartosc[] | null {
  if (!czyObiekt(w)) return null;
  const kolumny = KOLUMNY_EKSPORTU[t];
  if (Object.keys(w).length !== kolumny.length) return null;
  const wartosci: Wartosc[] = [];
  for (const k of kolumny) {
    const v = w[k];
    if (!(k in w) || !zgodnaZTypem(TYPY_KOLUMN[t][k], v)) return null;
    wartosci.push(v);
  }
  return wartosci;
}

class NieprawidloweDane extends Error {}

// Koperta ADR 0008 jako tekst JSON; odczyt w jednej transakcji (spójny stan wszystkich tabel).
export async function eksportuj(port: PortBazy, meta: { terazMs: number; aplikacja: string }): Promise<Wynik<string, PowodZapisu>> {
  try {
    const dane = await dlugaOperacja(port, 'eksport', (p) => p.transakcja(async (tx) => {
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
    }));
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
      // Lokalny znacznik dnia zastępuje tylko dzisiejsza aktywność z limitu z pliku (to samo zużycie); inna z tym samym id daje
      // konflikt klucza → bledny_plik, więc import nie odnawia limitu (ADR 0007 pkt 5; przegląd D-043).
      const kol = KOLUMNY_EKSPORTU.aktywnosc;
      const id = wartosci[kol.indexOf('id')];
      if (t === 'aktywnosc' && typeof id === 'string' && wartosci[kol.indexOf('dzien_lokalny')] === dzienLokalny && wartosci[kol.indexOf('z_limitu')] === 1) {
        idAktywnosci.add(id);
      }
      wiersze.push({ t, wartosci });
    }
  }
  try {
    await dlugaOperacja(port, 'import', (p) => p.transakcja(async (tx) => {
      for (const t of DZIECI_PRZED_RODZICAMI) if (t !== 'aktywnosc') await tx.run(`DELETE FROM ${t}`);
      await zostawZnacznikiDnia(tx, dzienLokalny, idAktywnosci);
      for (const { t, wartosci } of wiersze) {
        const kolumny = KOLUMNY_EKSPORTU[t];
        await tx.run(`INSERT INTO ${t} (${kolumny.join(', ')}) VALUES (${kolumny.map(() => '?').join(', ')})`, wartosci);
      }
      if ((await tx.all('PRAGMA foreign_key_check')).length > 0) throw new NieprawidloweDane('import: naruszenia kluczy obcych');
    }));
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
    await dlugaOperacja(port, 'kopia', (p) => p.run('VACUUM INTO ?', [sciezka]));
    return { ok: true, wartosc: undefined };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}

// BR-DANE-003: postęp usunięty; dzisiejsze zużycie limitu (puste znaczniki) i uprawnienie_cache zostają. Wynik testu usuwany jawnie:
// znacznik dnia może być powtórnym testem z wynikiem (wzór e2-schemat.mjs zostawiałby go przy znaczniku).
export async function usunPostep(port: PortBazy, dzienLokalny: string): Promise<Wynik<void, PowodZapisu>> {
  try {
    await dlugaOperacja(port, 'usun_postep', (p) => p.transakcja(async (tx) => {
      for (const t of DZIECI_PRZED_RODZICAMI) if (t !== 'aktywnosc') await tx.run(`DELETE FROM ${t}`);
      await zostawZnacznikiDnia(tx, dzienLokalny, new Set());
      await tx.run('DELETE FROM dziennik');
    }));
    return { ok: true, wartosc: undefined };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}
