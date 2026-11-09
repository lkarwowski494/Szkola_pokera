/**
 * Skalowanie tekstu (Dynamic Type) poza treścią (A04-05–A04-07, D-283 pkt 3–4, D-122). Treść skaluje się bez limitu do AX5.
 * Znaki-ikony (⚙︎, ✓ w kropce lekcji) mają limit jak w Treningu: `lib/theme.ts:37` GLYPH_SCALE_MAX = 1.4 (main, odczyt
 * 2026-11-09; uzasadnienie z telefonu T-04: znaki bez limitu wychodzą poza pole albo są ucinane).
 */
export const ZNAK_SKALA_MAX = 1.4;
