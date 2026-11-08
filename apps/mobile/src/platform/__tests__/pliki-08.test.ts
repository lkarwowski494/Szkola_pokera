/// <reference types="jest" />
// Adapter plików ekranu „Dane” (ADR 0008 pkt 5; wzór Treningu lib/backup.ts:28–35, SEC-09): plik eksportu tylko na czas arkusza
// udostępniania (usunięty także po błędzie), plik wybrany do importu odczytany i usunięty z katalogu tymczasowego, kopia
// VACUUM INTO jako ścieżka bez `file://`. Moduły natywne zastąpione atrapami (jest-expo nie ma ich implementacji).
const mockPliki = new Map<string, string>();
jest.mock('expo-file-system', () => {
  class File {
    uri: string;
    constructor(...czesci: (string | { uri: string })[]) {
      this.uri = czesci.map((c) => (typeof c === 'string' ? c : c.uri.replace(/\/+$/, ''))).join('/');
    }
    get exists() { return mockPliki.has(this.uri); }
    async write(t: string) { mockPliki.set(this.uri, t); }
    async text() {
      const t = mockPliki.get(this.uri);
      if (t === undefined) throw new Error('brak pliku');
      return t;
    }
    delete() {
      if (!mockPliki.delete(this.uri)) throw new Error('brak pliku');
    }
  }
  return { File, Paths: { cache: { uri: 'file:///var/mobile/Caches/' } } };
});
const mockUdostepnij = jest.fn(async (_uri: string, _o?: unknown) => undefined);
jest.mock('expo-sharing', () => ({ isAvailableAsync: async () => true, shareAsync: (u: string, o?: unknown) => mockUdostepnij(u, o) }));
const mockWybor = jest.fn();
jest.mock('expo-document-picker', () => ({ getDocumentAsync: (o: unknown) => mockWybor(o) }));

import { pliki } from '@/platform/pliki';

beforeEach(() => {
  mockPliki.clear();
  mockUdostepnij.mockReset();
  mockUdostepnij.mockImplementation(async () => undefined);
  mockWybor.mockReset();
});

describe('pliki', () => {
  it('udostępnienie: plik w katalogu tymczasowym z treścią, po arkuszu usunięty', async () => {
    let wArkuszu: string | undefined;
    mockUdostepnij.mockImplementation(async (uri: string) => { wArkuszu = mockPliki.get(uri); });
    await pliki.udostepnij('szkola-pokera-2026-11-08.json', '{"a":1}');
    expect(mockUdostepnij).toHaveBeenCalledWith('file:///var/mobile/Caches/szkola-pokera-2026-11-08.json', expect.objectContaining({ mimeType: 'application/json' }));
    expect(wArkuszu).toBe('{"a":1}');
    expect(mockPliki.size).toBe(0);
  });
  it('błąd arkusza: wyjątek dalej, plik i tak usunięty', async () => {
    mockUdostepnij.mockImplementation(async () => { throw new Error('arkusz'); });
    await expect(pliki.udostepnij('x.json', '{}')).rejects.toThrow('arkusz');
    expect(mockPliki.size).toBe(0);
  });
  it('wybór anulowany → null', async () => {
    mockWybor.mockResolvedValue({ canceled: true, assets: null });
    expect(await pliki.wybierz()).toBeNull();
  });
  it('wybrany plik: tekst odczytany, kopia z katalogu tymczasowego usunięta; prośba o JSON z kopią do cache', async () => {
    mockPliki.set('file:///var/mobile/Caches/DocumentPicker/x.json', '{"format":"szkola-pokera-postep"}');
    mockWybor.mockResolvedValue({ canceled: false, assets: [{ uri: 'file:///var/mobile/Caches/DocumentPicker/x.json', name: 'x.json', lastModified: 1 }] });
    expect(await pliki.wybierz()).toBe('{"format":"szkola-pokera-postep"}');
    expect(mockWybor).toHaveBeenCalledWith(expect.objectContaining({ copyToCacheDirectory: true, multiple: false }));
    expect(mockPliki.size).toBe(0);
  });
  it('kopia VACUUM INTO: ścieżka w katalogu tymczasowym bez schematu file://, zdekodowana', () => {
    expect(pliki.sciezkaKopii()).toBe('/var/mobile/Caches/postep-przed-importem.db');
  });
  it('usunięcie pliku: brak pliku to nie błąd', async () => {
    mockPliki.set('file:///var/mobile/Caches/postep-przed-importem.db', 'x');
    await pliki.usunPlik('/var/mobile/Caches/postep-przed-importem.db');
    expect(mockPliki.size).toBe(0);
    await expect(pliki.usunPlik('/var/mobile/Caches/postep-przed-importem.db')).resolves.toBeUndefined();
  });
});
