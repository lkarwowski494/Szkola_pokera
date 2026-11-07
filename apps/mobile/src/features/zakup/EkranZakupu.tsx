import { niezaimplementowane } from '../zaslepka';

/**
 * Ekran zakupu (PR-06; BR-ZAK-001–003, stan przepływu BR-LIM-001; maszyna `zakup`, ADR 0010).
 * Ceny i okresy wyłącznie ze sklepu (`cena` sformatowana przez sklep w walucie storefrontu), nigdy wpisane w kodzie.
 * Adapter sklepu (expo-iap, ADR 0006) mieszka w apps/mobile/src/platform/; ekran dostaje go jako port (atrapa w testach).
 */
export type ProduktSklepu = { id: string; cena: string; okres: 'kwartal' | 'rok' | null }; // null = dożywotni (jednorazowy)
export type OdczytProduktow = { ok: true; produkty: readonly ProduktSklepu[] } | { ok: false; powod: 'brak_sieci' | 'blad' };
export interface SklepEkranu {
  produkty(): Promise<OdczytProduktow>;
  kup(id: string): Promise<'zakonczony' | 'anulowany' | 'oczekuje' | 'blad'>;
  przywroc(): Promise<'zakonczony' | 'brak_zakupow' | 'blad'>;
}
export type PropsEkranuZakupu = {
  sklep: SklepEkranu;
  onDostep(): void; // dostęp odblokowany (zakup albo przywrócenie) — bez ponownego uruchomienia (BR-ZAK-002)
  onZamknij(): void;
  onWrocDoLekcji(): void; // „Wróć do lekcji” (BR-LIM-001, słownik interakcji design-spec.md)
  otworzWarunki(): void; // Terms of Use
  otworzPrywatnosc(): void; // polityka prywatności
};

export default function EkranZakupu(_: PropsEkranuZakupu): React.JSX.Element {
  return niezaimplementowane('EkranZakupu (BR-ZAK-001)');
}
