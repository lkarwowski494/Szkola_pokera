// Jeden plik parametrów (docs/architektura/moduly.md „Konfiguracja”). Wartości to decyzje z kolumny „Źródło / decyzja”;
// testy importują je stąd i nie kopiują liczb. Parametry [DO USTALENIA] (SESJA_LICZBA_ZADAN, PRZYPOMNIENIE_DOMYSLNA_PORA)
// dopisze rola 08 po decyzji (luka L-05 roli 07).
export const KONFIGURACJA = {
  LIMIT_AKTYWNOSCI_DZIENNIE: 1, // D-107 (właściciel)
  TEST_MODULU_LICZBA_ZADAN: 15, // D-106
  TEST_MODULU_PROG: 0.85, // D-106
  TEST_MODULU_UDZIAL_MODULU: 2 / 3, // decyzja właściciela 3.10.2026 (thresholds.ts:46)
  OCENA_POZIOMU_MAKS_PYTAN: 8, // D-105
  SESJA_LICZBA_ZADAN: 16, // D-260: 8 rodzin × 2 zadania, jak powtórki w features/session (obecna wartość, moduly.md „Konfiguracja”)
  OCENA_POZIOMU_CZAS_S: 120, // D-105, cel projektowy [OCENA]
  OCENA_PROG_DOPUSZCZALNE: 0.035, // RD-11, D-143
  OCENA_PROG_MIESZANA_DOLNY: 0.25, // ADR-22, B-044
  OCENA_PROG_MIESZANA_GORNY: 0.75,
  MALOWANIE_ZAKRESU_PROG: 0.9, // B-016
  TOLERANCJA_PROCENT_OK: 2, // pp, B-017
  TOLERANCJA_PROCENT_BLISKO: 5, // pp, B-017
  FSRS_RETENCJA: 0.9, // D-145
  FSRS_SZYBKO_MS: 3000, // srs DEFAULT_THRESHOLDS, pochodzenie [DO USTALENIA]
  FSRS_WOLNO_MS: 8000,
  PROSBA_O_OCENE_OD_PRACY: 3, // D-110
  PROSBA_O_OCENE_ODSTEP_DNI: 14, // D-110
  DZIENNIK_MAKS_WPISOW: 200, // ADR 0009 pkt 2 [OCENA: 200], D-240
  SCHEMAT_WERSJA: 1, // ADR 0004
  EKSPORT_WERSJA_FORMATU: 1, // ADR 0008
  TRESC_FORMAT: 1, // ADR 0005
  ROZMIAR_POBRANIA_PROG_MB: 50, // ADR 0005 [OCENA]; powyżej decyzja właściciela
  PRODUKTY_ODBLOKOWUJACE: [
    'pl.lkarwowski.szkolapokera.kwartal',
    'pl.lkarwowski.szkolapokera.rok',
    'pl.lkarwowski.szkolapokera.dozywotni',
  ] as const, // ADR 0006
  PRODUKTY_BEZ_KONCA: ['pl.lkarwowski.szkolapokera.dozywotni'] as const, // ADR 0006 pkt 2 (L8-04, D-217): `wygasaMs: null` tylko dla tych
} as const;
export type Konfiguracja = typeof KONFIGURACJA;
