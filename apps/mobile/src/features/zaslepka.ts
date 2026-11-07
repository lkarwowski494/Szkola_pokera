// Zaślepka roli 07 (E3, D-187): kontrakt propsów ekranu dla testów oczekujących w tests/akceptacja/ekrany/.
// Ciało komponentu rzuca jawny znacznik; rola 08 zamienia je na najprostszy render zgodny z typem, widzi czerwień
// na asercji, potem implementuje (wygląd z docs/design/, teksty przez i18n). Kontrakt propsów to luka dla roli 05
// (moduly.md nie opisuje ekranów; strategia.md §9) — zmiana kontraktu wymaga zmiany testu przez rolę 07.
export function niezaimplementowane(id: string): never {
  throw new Error(`NIEZAIMPLEMENTOWANE: ${id}`);
}
