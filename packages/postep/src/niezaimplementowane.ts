// Zaślepka roli 07 (E3): sygnatura z docs/architektura/moduly.md, ciało rzuca jawny znacznik.
// Rola 08 zamienia znacznik na najprostszy wynik zgodny z typem, widzi czerwień na asercji, potem implementuje.
export function niezaimplementowane(id: string): never {
  throw new Error(`NIEZAIMPLEMENTOWANE: ${id}`);
}
