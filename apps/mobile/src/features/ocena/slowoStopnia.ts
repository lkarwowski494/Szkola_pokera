/**
 * Rozmiar słowa stopnia na suknie (IC, zadanie 1; D-1850): słowo („Niedokładność”, „Übereinstimmend”) jest jednym wyrazem, którego wiersz
 * nie zawinie, więc przy 320 pt (232 pt dostępnego miejsca) wychodziło poza ekran. Mechanizm jak przy długim tytule sytuacji (HX, D-1730):
 * oszacowanie szerokości z długości ważonej (CJK = 2) i wybór pierwszego stylu ze skali, który się mieści; ostatni styl dodatkowo
 * zmniejszany tylko tyle, ile trzeba (nie poniżej `MIN_ROZMIAR_PT`). Czyste funkcje, bez React Native.
 */
import { dlugoscWazona } from '@/features/scenariusz/tytul';

/** Szerokość znaku łacińskiego w em: pomiar zrzutu `ib-ocena-ib-check-raise-320.png` (294 pt dla „~ Niedokładność” 34 pt = 0,58 em), zapas do 0,6. */
export const SZEROKOSC_ZNAKU_EM = 0.6;
/** Szerokość ekranu − miejsce poza wierszem słowa: 2 × 16 (pole ekranu) + 2 × 12 (rama) + 2 × 16 (sukno) + 4 (obrys) = 88 pt. */
export const MARGINESY_SUKNA = 88;
/** Najmniejszy rozmiar po skali (pt), poniżej którego słowo stopnia nie schodzi (jak `przypis`, 15 pt). */
export const MIN_ROZMIAR_PT = 15;

/** Zapas przy dopasowaniu (1 %): wynik nie leży dokładnie na granicy (błąd zaokrąglenia liczb zmiennoprzecinkowych). */
export const ZAPAS_DOPASOWANIA = 0.99;

export type RozmiarTekstu = { readonly fontSize: number; readonly lineHeight: number };

/** Oszacowana szerokość najdłuższego wiersza „znak słowo” (słowa wielowyrazowe zawijają się między wyrazami; znak stoi przy wyrazie): pt po skali. */
export function szerokoscSlowaStopnia(znak: string, slowo: string, fontSize: number, skala: number): number {
  const najdluzszy = Math.max(...slowo.split(/\s+/).filter(Boolean).map((w) => dlugoscWazona(`${znak} ${w}`)));
  return najdluzszy * SZEROKOSC_ZNAKU_EM * fontSize * skala;
}

/**
 * Pierwszy kandydat (od największego), przy którym wiersz mieści się w `szerokoscEkranu − MARGINESY_SUKNA`; gdy żaden, ostatni zmniejszony
 * proporcjonalnie (z podłogą `MIN_ROZMIAR_PT / skala`). `fontSize` kandydatów jest przed skalą (RN mnoży go przez skalę tekstu).
 */
export function rozmiarSlowaStopnia(znak: string, slowo: string, szerokoscEkranu: number, skala: number, kandydaci: readonly RozmiarTekstu[]): RozmiarTekstu {
  const dostepna = szerokoscEkranu - MARGINESY_SUKNA;
  for (const k of kandydaci) if (szerokoscSlowaStopnia(znak, slowo, k.fontSize, skala) <= dostepna) return k;
  const ostatni = kandydaci[kandydaci.length - 1];
  if (!ostatni) throw new Error('rozmiarSlowaStopnia: brak kandydatów');
  const wspolczynnik = Math.max((ZAPAS_DOPASOWANIA * dostepna) / szerokoscSlowaStopnia(znak, slowo, ostatni.fontSize, skala), MIN_ROZMIAR_PT / (skala * ostatni.fontSize));
  return { fontSize: ostatni.fontSize * wspolczynnik, lineHeight: ostatni.lineHeight * wspolczynnik };
}
