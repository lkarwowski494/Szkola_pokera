/**
 * IF (zadanie 1, WYSOKIE, blokuje build 1011; D-1880): rozmiar tekstu z jednym długim wyrazem („Sprawdzenie”, „podsumowanie”, „Niedokładność”) dopasowany do
 * szerokości pola. RN nie dzieli wyrazów, więc przy 320 pt i AX5 wyraz szerszy niż pole jest ucinany albo łamany w środku. Mechanizm jak słowo stopnia (D-1850):
 * oszacowanie szerokości = długość ważona najdłuższego wyrazu × 0,6 em × rozmiar × skala tekstu; gdy się nie mieści, rozmiar proporcjonalnie mniejszy,
 * nie poniżej `MIN_ROZMIAR_PT` po skali. Tekst zawija się między wyrazami (flexWrap, wiersze Text), więc o rozmiarze decyduje tylko najdłuższy wyraz.
 * Czyste funkcje, bez React Native.
 */
import { dlugoscWazona } from '@/features/scenariusz/tytul';
import { MIN_ROZMIAR_PT, SZEROKOSC_ZNAKU_EM } from '@/features/ocena/slowoStopnia';

export type RozmiarTekstu = { readonly fontSize: number; readonly lineHeight: number };

/** Zapas przy dopasowaniu (1 %), jak w D-1850. */
const ZAPAS = 0.99;
const SZEROKIE = /[⺀-鿿豈-﫿가-힯ᄀ-ᇿ＀-￯　-〿]/u;

/**
 * Długość ważona najdłuższego niezawijalnego odcinka: wyraz między spacjami; w tekście CJK i hangul wiersz może pęknąć przy każdym znaku
 * szerokim, więc taki znak liczy się osobno (2), a nie jako część wyrazu.
 */
export function najdluzszyOdcinek(tekst: string): number {
  let max = 0;
  for (const wyraz of tekst.split(/\s+/).filter(Boolean)) {
    let bieg = '';
    for (const znak of wyraz) {
      if (SZEROKIE.test(znak)) {
        max = Math.max(max, dlugoscWazona(bieg), dlugoscWazona(znak));
        bieg = '';
      } else bieg += znak;
    }
    max = Math.max(max, dlugoscWazona(bieg));
  }
  return max;
}

/** Oszacowana szerokość najdłuższego odcinka (pt po skali tekstu). */
export function szerokoscOdcinka(tekst: string, fontSize: number, skala: number): number {
  return najdluzszyOdcinek(tekst) * SZEROKOSC_ZNAKU_EM * fontSize * skala;
}

/** Rozmiar stylu (przed skalą; RN mnoży go przez skalę tekstu), przy którym najdłuższy odcinek mieści się w `dostepna` pt; styl bez zmian, gdy się mieści. */
export function rozmiarDoSzerokosci(tekst: string, dostepna: number, skala: number, styl: RozmiarTekstu): RozmiarTekstu {
  const szerokosc = szerokoscOdcinka(tekst, styl.fontSize, skala);
  if (szerokosc <= dostepna) return { fontSize: styl.fontSize, lineHeight: styl.lineHeight };
  const wspolczynnik = Math.min(1, Math.max((ZAPAS * dostepna) / szerokosc, MIN_ROZMIAR_PT / (skala * styl.fontSize)));
  return { fontSize: styl.fontSize * wspolczynnik, lineHeight: styl.lineHeight * wspolczynnik };
}
