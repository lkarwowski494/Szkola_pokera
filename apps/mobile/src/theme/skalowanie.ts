import { typografia } from './tokeny';

/**
 * Skalowanie tekstu (Dynamic Type) poza treścią (A04-05–A04-07, D-283 pkt 3–4, D-122). Treść skaluje się bez limitu do AX5.
 * Znaki-ikony (⚙︎, ✓ w kropce lekcji) mają limit jak w Treningu: `lib/theme.ts:37` GLYPH_SCALE_MAX = 1.4 (main, odczyt
 * 2026-11-09; uzasadnienie z telefonu T-04: znaki bez limitu wychodzą poza pole albo są ucinane).
 */
export const ZNAK_SKALA_MAX = 1.4;

/** Pasek przed decyzją zawija segmenty jak makieta: `flex: 1 1 calc(70px * dt-tresc)` (e3.css:102; A04-06, D-283 pkt 4). */
export const podstawaSegmentu = (skala: number): number => 70 * skala;
/** Skala stopni: `flex-basis` 76 pt × skala, twój przedział 112 pt × skala (e3.css:112–113). */
export const podstawaPrzedzialu = (skala: number, twoj: boolean): number => (twoj ? 112 : 76) * skala;
/** Sufit tekstu skali: `min(t-drobny, 6% szerokości)` (e3.css:112) jako `maxFontSizeMultiplier`; nigdy poniżej 1. */
export const mnoznikSkaliStopni = (szerokosc: number): number => Math.max(1, (szerokosc * 0.06) / typografia.skala.drobny.size);

/**
 * Sufit tytułów od AX1 (D-122; design-spec „Duży tekst”, `typografia.skala.*.maxW`; A04-07): tytuł po przemnożeniu przez skalę
 * tekstu nie przekracza `maxW × szerokość ekranu`. Przy tekście domyślnym bez zmian, a sufit nie schodzi poniżej rozmiaru
 * domyślnego (na 320 pt słowo stopnia: 27,2 < 34). RN mnoży `fontSize` przez skalę, więc zwracamy rozmiar przed mnożeniem.
 */
export function sufitTytulu(rozmiar: { size: number; line: number; maxW: number | null }, skala: number, szerokosc: number): { fontSize: number; lineHeight: number } {
  const domyslny = { fontSize: rozmiar.size, lineHeight: rozmiar.line };
  if (rozmiar.maxW === null || skala <= 1) return domyslny;
  const sufit = Math.max(rozmiar.maxW * szerokosc, rozmiar.size);
  if (rozmiar.size * skala <= sufit) return domyslny;
  const fontSize = sufit / skala;
  return { fontSize, lineHeight: (fontSize * rozmiar.line) / rozmiar.size };
}
