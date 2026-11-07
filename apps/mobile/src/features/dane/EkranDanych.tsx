import { niezaimplementowane } from '../zaslepka';

/**
 * Dane (PR-07; BR-DANE-001, BR-DANE-002; maszyna `import`, ADR 0008, ADR 0010): eksport do jednego pliku przez
 * udostępnianie systemu, data ostatniego eksportu, import z ostrzeżeniem przy istniejącym postępie (systemowy Alert).
 * Port `dane` składa repozytorium daneUzytkownika (pakiet postep) z adapterem plików (platform/); atrapa w testach.
 */
export interface DaneEkranu {
  maPostep: boolean;
  ostatniEksportMs: number | null;
  eksportuj(): Promise<'zapisano' | 'anulowano' | 'blad'>;
  wybierzIZwaliduj(): Promise<{ ok: true } | { ok: false; powod: 'anulowano' | 'bledny_plik' | 'nowsza_wersja' }>;
  zapiszImport(): Promise<'gotowe' | 'blad_zapisu'>; // wołane tylko po walidacji (i po potwierdzeniu, gdy maPostep)
}
export type PropsEkranuDanych = { dane: DaneEkranu; strefa: string };

export default function EkranDanych(_: PropsEkranuDanych): React.JSX.Element {
  return niezaimplementowane('EkranDanych (BR-DANE-001, BR-DANE-002)');
}
