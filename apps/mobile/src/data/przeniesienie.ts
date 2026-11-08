import { KONFIGURACJA, walidujEksport, type Wynik } from '@szkola/domena';
import { eksportuj, importuj, kopiaBazy, type PortBazy, type PowodOdczytu } from '@szkola/postep';
import type { DaneEkranu } from '@/features/dane/EkranDanych';
import { zapiszOstatniEksport } from '@/features/ustawienia/ustawieniaAplikacji';
import { zapiszBlad } from '@/platform/dziennik';

/**
 * Port ekranu „Dane” (PR-07; BR-DANE-001, BR-DANE-002; ADR 0008 pkt 2 i 5; L8-02/D-202: kopia przed importem robi wywołujący
 * w `src/data`). Składa repozytorium `daneUzytkownika` (pakiet postep) z adapterem plików (`platform/pliki.ts`; atrapa w testach).
 * Wzór Treningu: lib/backup.ts:28–35 (plik w katalogu tymczasowym tylko na czas arkusza udostępniania, odczyt 2026-11-08).
 */
export interface PlikiPrzeniesienia {
  /** Plik tymczasowy → arkusz udostępniania → usunięcie pliku (także po błędzie). Wyjątek = nie udało się. */
  udostepnij(nazwa: string, tekst: string): Promise<void>;
  /** Wybór pliku przez użytkownika; tekst pliku albo null (anulowano). Wyjątek = pliku nie da się odczytać. */
  wybierz(): Promise<string | null>;
  /** Ścieżka (bez `file://`) pliku kopii `VACUUM INTO` w katalogu tymczasowym. */
  sciezkaKopii(): string;
  /** Usuwa plik, gdy istnieje (brak pliku to nie błąd). */
  usunPlik(sciezka: string): Promise<void>;
}

export interface OpcjeDanych {
  port: PortBazy;
  pliki: PlikiPrzeniesienia;
  aplikacja: string; // wersja aplikacji do koperty eksportu
  terazMs(): number;
  dzienLokalny(): string; // dzień w strefie telefonu: nazwa pliku i znaczniki limitu przy imporcie (ADR 0007)
  maPostep: boolean;
  ostatniEksportMs: number | null;
  /** Po udanym imporcie: odtworzenie przypomnienia i ustawień interfejsu z nowych danych (ADR 0012 pkt „import”). */
  poImporcie?(): Promise<void>;
}

export function utworzDaneEkranu(o: OpcjeDanych): DaneEkranu {
  let tekstImportu: string | null = null; // plik po udanej walidacji, do zapisu po potwierdzeniu

  return {
    maPostep: o.maPostep,
    ostatniEksportMs: o.ostatniEksportMs,

    async eksportuj() {
      const teraz = o.terazMs();
      const e = await eksportuj(o.port, { terazMs: teraz, aplikacja: o.aplikacja });
      if (!e.ok) {
        zapiszBlad(e.powod, 'dane');
        return 'blad';
      }
      try {
        await o.pliki.udostepnij(`szkola-pokera-${o.dzienLokalny()}.json`, e.wartosc);
      } catch {
        zapiszBlad('zapis_nieudany', 'dane');
        return 'blad';
      }
      // iOS nie mówi, czy użytkownik zapisał plik w arkuszu: zamknięty arkusz = eksport gotowy (jak Trening lib/backup.ts:34)
      const z = await zapiszOstatniEksport(o.port, teraz);
      if (!z.ok) zapiszBlad(z.powod, 'dane'); // plik jest u użytkownika; brak daty to mniejsza strata niż komunikat o błędzie
      return 'zapisano';
    },

    async wybierzIZwaliduj() {
      tekstImportu = null;
      let tekst: string | null;
      try {
        tekst = await o.pliki.wybierz();
      } catch {
        return { ok: false, powod: 'bledny_plik' };
      }
      if (tekst === null) return { ok: false, powod: 'anulowano' };
      const k = walidujEksport(tekst, KONFIGURACJA.EKSPORT_WERSJA_FORMATU); // całość w pamięci, baza nietknięta
      if (!k.ok) return k;
      tekstImportu = tekst;
      return { ok: true };
    },

    async zapiszImport() {
      const tekst = tekstImportu;
      tekstImportu = null;
      if (tekst === null) return 'blad_zapisu'; // bez udanej walidacji nie ma czego zapisać (błąd wywołującego)
      const kopia = o.pliki.sciezkaKopii();
      try {
        await o.pliki.usunPlik(kopia); // VACUUM INTO wymaga, by plik nie istniał (sqlite.org/lang_vacuum.html)
      } catch {
        zapiszBlad('zapis_nieudany', 'dane');
        return 'blad_zapisu';
      }
      const k = await kopiaBazy(o.port, kopia);
      if (!k.ok) {
        zapiszBlad(k.powod, 'dane'); // bez kopii import się nie zaczyna (ADR 0008 pkt 2.3)
        return 'blad_zapisu';
      }
      const w = await importuj(o.port, tekst, o.dzienLokalny());
      if (!w.ok) {
        zapiszBlad(w.powod === 'bledny_plik' || w.powod === 'nowsza_wersja' ? 'odczyt_nieudany' : w.powod, 'dane');
        return 'blad_zapisu'; // transakcja wycofana; kopia zostaje w katalogu tymczasowym
      }
      await o.pliki.usunPlik(kopia).catch(() => undefined); // pkt 2.5; nieusunięta kopia w katalogu tymczasowym nie psuje importu
      await o.poImporcie?.().catch(() => undefined);
      return 'gotowe';
    },
  };
}

/** Czy jest postęp, który import by zastąpił (ostrzeżenie BR-DANE-002): odpowiedzi, lekcje, karty albo wyniki testów; same ustawienia — nie. */
export async function czyMaPostep(port: PortBazy): Promise<Wynik<boolean, PowodOdczytu>> {
  try {
    const [w] = await port.all<unknown>(
      `SELECT EXISTS (SELECT 1 FROM odpowiedz) OR EXISTS (SELECT 1 FROM postep_lekcji) OR EXISTS (SELECT 1 FROM karta)
         OR EXISTS (SELECT 1 FROM wynik_testu) AS jest`,
    );
    return typeof w === 'object' && w !== null && 'jest' in w && (w.jest === 0 || w.jest === 1) ? { ok: true, wartosc: w.jest === 1 } : { ok: false, powod: 'odczyt_nieudany' };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
