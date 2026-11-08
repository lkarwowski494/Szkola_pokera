import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { PlikiPrzeniesienia } from '@/data/przeniesienie';
import { zapiszBlad } from '@/platform/dziennik';

/**
 * Adapter plików ekranu „Dane” (ADR 0008 pkt 5; D-253) na expo-file-system 58 (`File`, `Paths.cache`), expo-sharing 58.0.22
 * (`shareAsync(url, { mimeType, UTI, dialogTitle })`) i expo-document-picker 58 (`getDocumentAsync({ type, copyToCacheDirectory,
 * multiple })` → `{ canceled, assets }`); typy z build/*.d.ts, odczyt 2026-11-08. Wzór Treningu: lib/backup.ts:28–35 (plik
 * w katalogu tymczasowym tylko na czas arkusza, usuwany także po błędzie; plik wybrany do importu usuwany po odczycie).
 * Zapis `File.write` na iOS nie jest atomowy (ios/FileSystemFile.swift:117) — tu bez znaczenia: plik jest nowy i tymczasowy.
 */
const MIME = 'application/json';
const KOPIA = 'postep-przed-importem.db';

const usun = (f: File) => {
  if (f.exists) f.delete();
};

/** Sprzątanie pliku tymczasowego: błąd nie zmienia wyniku operacji, ale nie jest cichy (wpis w dzienniku, tlo-i-bledy.md §4). */
function usunZWpisem(f: File): void {
  try {
    usun(f);
  } catch {
    zapiszBlad('zapis_nieudany', 'dane');
  }
}

/** URI `file://` → ścieżka systemu plików (VACUUM INTO przyjmuje nazwę pliku, nie URI). */
export const sciezkaZUri = (uri: string) => decodeURIComponent(uri.replace(/^file:\/\//, ''));

export const pliki: PlikiPrzeniesienia = {
  async udostepnij(nazwa, tekst) {
    const plik = new File(Paths.cache, nazwa);
    try {
      usun(plik);
      await plik.write(tekst);
      if (!(await Sharing.isAvailableAsync())) throw new Error('Arkusz udostępniania niedostępny');
      await Sharing.shareAsync(plik.uri, { mimeType: MIME, UTI: 'public.json' });
    } finally {
      usunZWpisem(plik); // pozostałość w katalogu tymczasowym nie zmienia wyniku eksportu
    }
  },

  async wybierz() {
    const w = await DocumentPicker.getDocumentAsync({ type: MIME, copyToCacheDirectory: true, multiple: false });
    if (w.canceled) return null;
    const [a] = w.assets;
    if (!a) return null;
    const plik = new File(a.uri);
    try {
      return await plik.text();
    } finally {
      usunZWpisem(plik); // kopia w katalogu tymczasowym aplikacji (copyToCacheDirectory), nie oryginał użytkownika
    }
  },

  sciezkaKopii: () => sciezkaZUri(new File(Paths.cache, KOPIA).uri),

  async usunPlik(sciezka) {
    usun(new File(`file://${sciezka}`));
  },
};
