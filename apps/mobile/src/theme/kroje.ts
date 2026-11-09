/**
 * Kroje tytułów i indeksu karty (08 cz. 6 krok 8, D-274; design-spec „Typografia”, D-120, D-122). Literata 600 przy tekście
 * do XXXL; od AX1 tytuły krojem systemowym (semibold), indeks karty szeryfowym systemu. Bez załadowanego kroju (błąd, limit
 * czasu) — to samo co od AX1: start aplikacji nie czeka na krój dłużej niż limit (wzór Treningu `app/_layout.tsx:31`).
 * Plik: `assets/fonts/Literata-SemiBold.ttf` (googlefonts/literata, wersja 3.103, OFL 1.1 — `assets/fonts/OFL-literata.txt`).
 */
export const LITERATA = 'Literata-SemiBold';
/** Mnożnik XXXL w RN 0.88.1 (`React/CoreModules/RCTAccessibilityManager.mm:266`); następny rozmiar to AX1 = 1,786 (:267). */
const SKALA_XXXL = 1.353;
/** Limit czekania na krój przy starcie (ms; wzór Treningu `app/_layout.tsx:31`). */
export const LIMIT_KROJU_MS = 3000;

/** Języki z pismem, którego Literata 600 nie ma (D-368: ja, zh-Hant; ko po przekładzie) — tytuły krojem systemowym. */
const BEZ_LITERATY = new Set(['ja', 'zh', 'ko']);

/** Literata do XXXL (bez języka: indeks karty, cyfry i litery łacińskie). */
const literataDoXxxl = (zaladowany: boolean, skala: number): string | undefined => (zaladowany && skala <= SKALA_XXXL + 0.001 ? LITERATA : undefined);

/**
 * Krój tytułu: Literata do XXXL, od AX1 albo bez kroju — systemowy (`undefined`); w języku z pismem CJK zawsze systemowy
 * semibold, żeby tytuł nie mieszał Literaty (łacinka, cyfry) z krojem zastępczym znaków CJK (D-368).
 */
export function krojTytulu(zaladowany: boolean, skala: number, jezyk?: string): string | undefined {
  if (jezyk && BEZ_LITERATY.has(jezyk.split('-')[0]!)) return undefined;
  return literataDoXxxl(zaladowany, skala);
}

/** Krój indeksu karty: Literata do XXXL, inaczej szeryfowy systemu (niezależnie od języka). */
export function krojIndeksu(zaladowany: boolean, skala: number): string {
  return literataDoXxxl(zaladowany, skala) ?? 'Georgia';
}

/** Ładowanie kroju z limitem czasu; nigdy nie odrzuca (brak kroju = krój systemowy, preferencja wyglądu, nie dane). */
export async function zaladujKroje(laduj: () => Promise<void>, limitMs: number): Promise<boolean> {
  let zegar: ReturnType<typeof setTimeout> | undefined;
  const limit = new Promise<boolean>((r) => {
    zegar = setTimeout(() => r(false), limitMs);
  });
  try {
    return await Promise.race([laduj().then(() => true, () => false), limit]);
  } finally {
    clearTimeout(zegar);
  }
}
