import { niezaimplementowane } from '../zaslepka';

/**
 * Start aktywności z limitem (PR-03, PR-04; BR-LIM-001, BR-LIM-004; ADR 0007): licznik przed startem, bez licznika dla Pro.
 * `limit` to wynik `limitDnia` z packages/domena (ten sam kształt). Przy wyczerpanym limicie „Zacznij” nie startuje:
 * rodzic pokazuje ekran zakupu jako stan przepływu (`onLimitWyczerpany`), z godziną odnowienia i „Wróć do lekcji”.
 * Powtórki przy wyczerpanym limicie: komunikat, że poczekają bez utraty (BR-LIM-004).
 */
export type LimitEkranu = { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };
export type PropsEkranuStartu = {
  rodzaj: 'sesja' | 'powtorki' | 'scenariusz' | 'test_modulu';
  limit: LimitEkranu;
  strefa: string; // strefa telefonu (Zegar.strefa) do pokazania godziny odnowienia
  zaleglePowtorki?: number; // tylko rodzaj 'powtorki'
  onStart(): void;
  onLimitWyczerpany(): void;
  onWrocDoLekcji(): void;
};

export default function EkranStartu(_: PropsEkranuStartu): React.JSX.Element {
  return niezaimplementowane('EkranStartu (BR-LIM-001, BR-LIM-004)');
}
