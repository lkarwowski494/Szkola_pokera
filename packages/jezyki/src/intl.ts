/** Samosprawdzenie `Intl.PluralRules` przy starcie (zasada 5 roli 09): pusta lista = w porządku. W buildzie deweloperskim błąd na ekranie. */
export function sprawdzIntl(jezyki: readonly string[]): string[] {
  const PR = (globalThis as { Intl?: { PluralRules?: { supportedLocalesOf?(l: string[]): string[] } } }).Intl?.PluralRules;
  const sprawdz = PR?.supportedLocalesOf?.bind(PR);
  if (!PR || !sprawdz) return ['brak Intl.PluralRules: polyfill nie został załadowany'];
  const brak = (j: string) => {
    try {
      return sprawdz([j]).length === 0;
    } catch {
      return true; // niepoprawny tag
    }
  };
  return jezyki.filter(brak).map((j) => `brak reguł liczby mnogiej dla ${j}`);
}
