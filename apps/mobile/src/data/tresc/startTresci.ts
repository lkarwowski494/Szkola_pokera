// Start treści w aplikacji (ADR 0005 pkt 2, K-06, D-232): `przygotujTresc` z domeny na adapterach expo. Zwraca nazwę pliku
// w katalogu baz expo-sqlite, którą `ProviderTresci` (data/tresc/kontekst) otwiera po nazwie; baza otwarta do sprawdzenia manifestu jest zamykana.
// Błąd = `tresc_niedostepna` (ekran błędu z ponowieniem; dane użytkownika nietknięte, tlo-i-bledy.md §4).
import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { KONFIGURACJA, przygotujTresc, type PowodTresci, type Wynik } from '@szkola/domena';
import { PLIKI_TRESCI } from '../content/tresc.generated';
import { katalogBazExpo, PACZKA, plikiTresciExpo } from './plikiExpo';

const nazwaPliku = (sciezka: string) => sciezka.slice(sciezka.lastIndexOf('/') + 1);

/** Wiersze `meta` z bazy (unknown) → słownik tekstów; wiersz innego kształtu jest pomijany (manifest go wtedy odrzuci). */
export function metaZWierszy(wiersze: readonly unknown[]): Record<string, string> {
  const meta: Record<string, string> = {};
  for (const w of wiersze) {
    if (typeof w === 'object' && w !== null && 'key' in w && 'value' in w && typeof w.key === 'string' && typeof w.value === 'string') meta[w.key] = w.value;
  }
  return meta;
}

async function otworz(sciezka: string): Promise<{ baza: SQLiteDatabase; meta: Record<string, string> | null }> {
  const baza = await openDatabaseAsync(nazwaPliku(sciezka));
  try {
    const jest = await baza.getFirstAsync<unknown>("SELECT 1 AS j FROM sqlite_schema WHERE type = 'table' AND name = 'meta'");
    const meta = jest === null ? null : metaZWierszy(await baza.getAllAsync<unknown>('SELECT key, value FROM meta'));
    return { baza, meta };
  } catch (e) {
    await baza.closeAsync().catch(() => undefined); // plik nieczytelny: adapter zamyka sam
    throw e;
  }
}

export async function przygotujTrescExpo(jezyk: string): Promise<Wynik<{ plik: string }, PowodTresci>> {
  let katalog: string;
  try {
    katalog = katalogBazExpo();
  } catch {
    return { ok: false, powod: 'tresc_niedostepna' };
  }
  const wynik = await przygotujTresc<SQLiteDatabase>({
    paczka: PACZKA,
    katalog,
    jezyk,
    pliki: plikiTresciExpo(PLIKI_TRESCI),
    otworz,
    zamknij: (b) => b.closeAsync(),
    obslugiwanyFormat: KONFIGURACJA.TRESC_FORMAT,
  });
  if (!wynik.ok) return wynik;
  await wynik.wartosc.baza.closeAsync().catch(() => undefined);
  return { ok: true, wartosc: { plik: wynik.wartosc.plik } };
}

/** Otwarcie przygotowanego pliku treści dla `ProviderTresci` (katalog baz expo-sqlite, jak dotąd `SQLiteProvider`). */
export const otworzTrescExpo = (plik: string): Promise<SQLiteDatabase> => openDatabaseAsync(plik);
