/**
 * IF (zadanie 1, WYSOKIE, blokuje build 1011; D-1880): rozmiar tekstu z jednym długim wyrazem („Sprawdzenie”, „podsumowanie”, „Niedokładność”) dopasowany do
 * szerokości pola. RN nie dzieli wyrazów, więc przy 320 pt i AX5 wyraz szerszy niż pole jest ucinany albo łamany w środku. Mechanizm jak słowo stopnia (D-1850):
 * oszacowanie szerokości = długość ważona najdłuższego wyrazu × 0,6 em × rozmiar × skala tekstu; gdy się nie mieści, rozmiar proporcjonalnie mniejszy,
 * nie poniżej `MIN_ROZMIAR_PT` po skali. Tekst zawija się między wyrazami (flexWrap, wiersze Text), więc o rozmiarze decyduje tylko najdłuższy wyraz.
 * Czyste funkcje, bez React Native.
 */
import { dlugoscWazona } from '@/features/scenariusz/tytul';
import { MARGINESY_SUKNA, MIN_ROZMIAR_PT, SZEROKOSC_ZNAKU_EM, ZAPAS_DOPASOWANIA, type RozmiarTekstu } from '@/features/ocena/slowoStopnia';

// IH (IF P3-1): `RozmiarTekstu` i zapas dopasowania (1 %, D-1850) mają jedną definicję, w `slowoStopnia.ts`.
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
  const wspolczynnik = Math.min(1, Math.max((ZAPAS_DOPASOWANIA * dostepna) / szerokosc, MIN_ROZMIAR_PT / (skala * styl.fontSize)));
  return { fontSize: styl.fontSize * wspolczynnik, lineHeight: styl.lineHeight * wspolczynnik };
}

/** IJ (D-1908): padding poziomy podpisu segmentu paska po ocenie (`PasekStrategii`, `podpis`: 2 pt z każdej strony). */
export const PADDING_PODPISU = 2;

/**
 * IJ (D-1908): rozmiary tekstów i minimalna szerokość podpisu segmentu paska po ocenie („Sprawdzenie (call)”, „twój wybór” przy 320 pt i AX5 łamały się w wyrazie:
 * minWidth 70 × skala = 218 pt, pole 214 pt, wyraz 309 pt; przy skali 1 rzadki segment miał 66 pt pola na wyraz 99 pt). Najpierw rozmiar jak `rozmiarDoSzerokosci` do pola
 * minimalnego podpisu (`bazaMin` − padding, nie więcej niż miejsce na suknie: ekran − `MARGINESY_SUKNA`); wyraz, który mimo to jest szerszy (podłoga `MIN_ROZMIAR_PT`),
 * poszerza podpis (minWidth rośnie do szerokości wyrazu, najwyżej do miejsca na suknie). Oszacowanie jak w IF, bez pomiaru układu. Czysta funkcja.
 */
export function podpisSegmentu(teksty: readonly string[], skala: number, szerokoscEkranu: number, bazaMin: number, styl: RozmiarTekstu): { minWidth: number; rozmiary: RozmiarTekstu[] } {
  const miejsce = Math.max(0, szerokoscEkranu - MARGINESY_SUKNA);
  const pole = Math.min(bazaMin, miejsce) - 2 * PADDING_PODPISU;
  const rozmiary = teksty.map((t) => rozmiarDoSzerokosci(t, pole, skala, styl));
  const potrzebna = Math.max(0, ...teksty.map((t, i) => szerokoscOdcinka(t, rozmiary[i]?.fontSize ?? styl.fontSize, skala))) + 2 * PADDING_PODPISU;
  return { minWidth: Math.min(Math.max(bazaMin, potrzebna), miejsce), rozmiary };
}
