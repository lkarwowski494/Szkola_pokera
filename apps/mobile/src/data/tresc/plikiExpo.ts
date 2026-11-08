// Adapter portu `PlikiTresci` (packages/domena/src/tresc.ts, ADR 0005, D-232) na expo-file-system 57 i expo-asset 57.
// Paczka aplikacji nie jest katalogiem do listowania: pliki treści dołącza Metro przez `require` (mapa z content-build,
// tresc.generated.ts), więc „katalog paczki” to znacznik PACZKA, a ścieżka `PACZKA/<plik>` jest rozwiązywana przez
// Asset.fromModule(...).downloadAsync() do lokalnego URI w paczce. Katalog roboczy = katalog baz expo-sqlite
// (Documents/SQLite, ten sam co postęp), bez końcowego „/” (kontrakt portu).
// API (expo-file-system 57.0.7, src/internal/NativeFileSystem.types.ts): File.copy/move domyślnie bez nadpisywania
// (`RelocationOptions.overwrite` domyślnie false), File.delete rzuca przy braku pliku, Directory.list().
import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import type { PlikiTresci } from '@szkola/domena';

export const PACZKA = 'paczka:';

/** Moduły natywne w kształcie potrzebnym adapterowi (testy podstawiają atrapę). */
export interface SystemPlikow {
  plik(uri: string): { exists: boolean; copy(cel: { uri: string }): Promise<void>; move(cel: { uri: string }): Promise<void>; delete(): void; uri: string };
  katalog(uri: string): { exists: boolean; list(): { name: string }[] };
  zasob(id: number): Promise<string | null>; // lokalny URI pliku z paczki
}

export const systemExpo: SystemPlikow = {
  plik: (uri) => new File(uri),
  katalog: (uri) => new Directory(uri),
  zasob: async (id) => (await Asset.fromModule(id).downloadAsync()).localUri,
};

/** Katalog baz expo-sqlite (Documents/SQLite) jako URI bez końcowego „/”. */
export function katalogBazExpo(): string {
  const k = new Directory(Paths.document, 'SQLite');
  if (!k.exists) k.create({ intermediates: true, idempotent: true });
  return k.uri.replace(/\/+$/, '');
}

export function plikiTresciExpo(mapa: Readonly<Record<string, { plik: string; zasob: number }>>, sys: SystemPlikow = systemExpo): PlikiTresci {
  const zasoby = new Map(Object.values(mapa).map((w) => [w.plik, w.zasob]));
  const zrodlo = async (sciezka: string): Promise<string> => {
    if (!sciezka.startsWith(`${PACZKA}/`)) return sciezka;
    const id = zasoby.get(sciezka.slice(PACZKA.length + 1));
    if (id === undefined) throw new Error(`Brak pliku w paczce: ${sciezka}`);
    const uri = await sys.zasob(id);
    if (uri === null) throw new Error(`Brak lokalnego URI zasobu: ${sciezka}`);
    return uri;
  };
  return {
    lista: async (k) => {
      if (k === PACZKA) return [...zasoby.keys()];
      const d = sys.katalog(k);
      return d.exists ? d.list().map((x) => x.name) : [];
    },
    kopiuj: async (z, na) => {
      const cel = sys.plik(na);
      if (cel.exists) throw new Error(`Cel istnieje: ${na}`); // kontrakt portu: bez nadpisywania
      await sys.plik(await zrodlo(z)).copy(cel);
    },
    przemianuj: async (z, na) => {
      const cel = sys.plik(na);
      if (cel.exists) throw new Error(`Cel istnieje: ${na}`);
      await sys.plik(z).move(cel);
    },
    usun: async (s) => {
      const p = sys.plik(s);
      if (p.exists) p.delete(); // idempotentne
    },
  };
}
