// Wzory WCAG 2.x jak w docs/design/narzedzia/kontrast.mjs; wspólne dla testów kontrastu (kontrast-pary-08, RangeGrid-etykieta-kontrast-08).
const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1, 7), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
const lum = (hex: string) => {
  const [r, g, b] = rgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
export const kontrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x! + 0.05) / (y! + 0.05);
};
/** Kolor wynikowy: `tlo` z kryciem `krycie` nałożone na `podTlem` (sRGB, zaokrąglenie do 8 bitów jak w CSS). */
export const zloz = (tlo: string, krycie: number, podTlem: string) => {
  const a = rgb(tlo);
  const b = rgb(podTlem);
  return '#' + a.map((c, i) => Math.round(krycie * c + (1 - krycie) * b[i]!).toString(16).padStart(2, '0')).join('');
};
