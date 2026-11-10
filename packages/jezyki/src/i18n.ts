import i18next, { type InitOptions, type ThirdPartyModule, type i18n } from 'i18next';
import { znacznikIntl } from './formaty';
import { jestJezykiem, jezykZTagu, lancuchTresci, type Jezyk } from './jezyki';

/** Słowniki zagnieżdżone w formacie i18next v4 (`klucz_one`, `klucz_few`, …), język → drzewo tekstów. */
export type Slowniki = Partial<Record<Jezyk, Record<string, unknown>>>;

export interface OpcjeI18n {
  /** Tryb deweloperski i testy: klucz bez wpisu w źródle rzuca błąd zamiast zwracać klucz. */
  scisle?: boolean;
}

/**
 * Opcje i18next z łańcuchem wariant → język → en → źródło (`lancuchTresci`, D-289): brakujący klucz daje tekst źródłowy, nie klucz.
 * Pusty tekst w tłumaczeniu zatrzymuje skrypt (`sprawdz-i18n.mjs`, błąd „pusty tekst”); w czasie działania nie schodzi do źródła,
 * bo `returnEmptyString: false` psułby jawne `t(k, { defaultValue: '' })` (opcjonalne podpowiedzi, ADR 0014).
 * Wymaga `Intl.PluralRules` (polyfill w punkcie wejścia aplikacji, `sprawdzIntl`).
 */
export function opcjeI18next(slowniki: Slowniki, jezyk: Jezyk, opcje: OpcjeI18n = {}): InitOptions {
  return {
    lng: jezyk,
    // funkcja, nie stała: łańcuch liczony dla języka aktualnego, także po changeLanguage (przegląd w świeżym kontekście, 2026-11-04)
    fallbackLng: (kod?: string) => lancuchTresci((kod && (jestJezykiem(kod) ? kod : jezykZTagu(kod))) || jezyk).slice(1),
    resources: Object.fromEntries(Object.entries(slowniki).map(([j, drzewo]) => [j, { translation: drzewo }])),
    interpolation: { escapeValue: false },
    returnNull: false,
    initAsync: false,
    ...(opcje.scisle
      ? {
          // Jawna wartość domyślna (opcjonalna podpowiedź, `t(k, { defaultValue: '' })`) jest dozwolona; goły brak klucza to błąd.
          parseMissingKeyHandler: (klucz: string, domyslna?: string) => {
            if (domyslna !== undefined) return domyslna;
            throw new Error(`Brak klucza „${klucz}” w tekstach źródłowych`);
          },
        }
      : {}),
  };
}

/**
 * Reguła liczby mnogiej według `znacznikIntl` (D-405): i18next tworzy `Intl.PluralRules` z kodu języka, a „pt” w CLDR to wariant
 * brazylijski (0 → „one”); w aplikacji „pt” = pt-PT (0 → „other”). Moduł `3rdParty` jest inicjowany po utworzeniu usług
 * i18next, więc podmiana obejmuje każdy `t()` z `count`. Test: `test/pt-pt-09.test.ts`.
 */
export const regulyLiczbyMnogiej: ThirdPartyModule = {
  type: '3rdParty',
  init(instancja: i18n) {
    const r = instancja.services.pluralResolver as unknown as { getRule(kod: string, o?: object): unknown };
    const oryginal = r.getRule.bind(r);
    r.getRule = (kod, o) => oryginal(jestJezykiem(kod) ? znacznikIntl(kod) : kod, o);
  },
};

/** Osobna instancja (testy, `content-build`); aplikacja używa globalnej instancji z `react-i18next`. */
export async function utworzI18n(slowniki: Slowniki, jezyk: Jezyk, opcje: OpcjeI18n = {}): Promise<i18n> {
  const instancja = i18next.createInstance().use(regulyLiczbyMnogiej);
  await instancja.init(opcjeI18next(slowniki, jezyk, opcje));
  return instancja;
}
