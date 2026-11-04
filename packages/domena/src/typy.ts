// Typy wspólne i listy stanów (ADR 0010). Listy stanów są porównywane z CHECK w docs/architektura/schemat.sql
// (kontrola K-03, test test/k03-stany.test.ts); wyrocznią jest schemat.sql + moduly.md (D-168).
export interface Zegar {
  teraz(): number;
  strefa(): string;
  dzienLokalny(ms: number, strefa: string): string; // RRRR-MM-DD
}
export type Wynik<T, P extends string> = { ok: true; wartosc: T } | { ok: false; powod: P };

export const RODZAJE_AKTYWNOSCI = ['ocena_poziomu', 'lekcja', 'test_modulu', 'sesja', 'powtorki', 'scenariusz'] as const;
export type RodzajAktywnosci = (typeof RODZAJE_AKTYWNOSCI)[number];
export const STANY_AKTYWNOSCI = ['w_toku', 'zakonczona', 'porzucona'] as const;
export type StanAktywnosci = (typeof STANY_AKTYWNOSCI)[number];
export const OCENY_ODPOWIEDZI = ['zgodne', 'dopuszczalne', 'niedokladnosc', 'blad'] as const;
export type OcenaOdpowiedzi = (typeof OCENY_ODPOWIEDZI)[number];

// Ochrona długich operacji (ADR 0013 pkt 2): interfejs w domenie, adapter w apps/mobile/src/platform/, atrapa w testach.
export interface OchronaTla {
  rozpocznij(nazwa: string): number; // −1 = system nie dał czasu
  zakoncz(id: number): void;
  naWygasniecie(fn: (id: number) => void): () => void; // zwraca wypisanie
}
