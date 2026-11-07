import { niezaimplementowane } from '../zaslepka';

/**
 * Stopień oceny zagrania po decyzji (PR-03, BR-CWI-001, NFR-DOST-001): słowo i znak, nie sam kolor
 * (design-spec.md, „Znaczenie kolorów”: stopnie bez koloru). Lista stopni: OCENY_ODPOWIEDZI w packages/domena
 * (cztery z BRD; trzy czy cztery rozstrzyga rola 06 z 04 — moduly.md, „Znaleziska”).
 */
export type PropsStopniaOceny = { ocena: 'zgodne' | 'dopuszczalne' | 'niedokladnosc' | 'blad' };

export default function StopienOceny(_: PropsStopniaOceny): React.JSX.Element {
  return niezaimplementowane('StopienOceny (NFR-DOST-001)');
}
