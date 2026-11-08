import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { AccessibilityInfo, PixelRatio, Platform, useColorScheme, type ColorSchemeName } from 'react-native';
import { LITERATA, krojIndeksu, krojTytulu } from './kroje';
import { kolory, odstep, promien, ruch, haptyka, typografia } from './tokeny';

/**
 * Moduł motywu (08 cz. 5b krok 1, P-2 = B, D-256, D-259): kolory, odstępy, promienie, ruch i haptyka wyłącznie
 * z tokenów roli 04 (`./tokeny`, kopia `docs/design/tokeny.ts`). Wariant palety: wygląd systemu (jasny/ciemny)
 * i „Zwiększ kontrast” (iOS: `isDarkerSystemColorsEnabled`, zdarzenie `darkerSystemColorsChanged`).
 */
export { odstep, promien, ruch, haptyka, typografia };
export type Paleta = typeof kolory.light;

/**
 * Wyjątek nazwany do części 6 (D-259): kolory spoza systemu roli 04, których używa jeszcze ekran decyzji
 * (stopnie oceny kolorem, siatka zakresów) i talia czterokolorowa (ustawienie `cztery_kolory`, D-251).
 * Część 6 zastępuje stopnie komponentami `SkalaStopni`/`StopienOceny` (stopnie bez koloru, design-spec
 * „Znaczenie kolorów”); kolory talii czterokolorowej — zgłoszenie 08-F15 do roli 04. Wartości z poprzedniego motywu.
 */
const przejscioweJasne = {
  good: '#1F7A4D',
  goodSoft: '#E2F3E9',
  bad: '#B3372C',
  badSoft: '#FBE7E4',
  warn: '#8A5A00',
  warnSoft: '#FBF0D9',
  feltSoft: '#E3EFE8',
  cardBlue: '#2456A6',
  cardGreen: '#2A7A3B',
};
const przejscioweCiemne: typeof przejscioweJasne = {
  good: '#6FCF9A',
  goodSoft: '#17301F',
  bad: '#F08478',
  badSoft: '#36201D',
  warn: '#E0B24F',
  warnSoft: '#33290F',
  feltSoft: '#1C2E25',
  cardBlue: '#2456A6',
  cardGreen: '#2A7A3B',
};

export type Tokens = Paleta & { przejsciowe: typeof przejscioweJasne };

/** Czysta funkcja wyboru wariantu (test bez telefonu); brak schematu = jasny (domyślny wygląd iOS). */
export function wybierzPalete(schemat: ColorSchemeName | null | undefined, zwiekszonyKontrast: boolean): Paleta {
  const ciemny = schemat === 'dark';
  if (zwiekszonyKontrast) return ciemny ? kolory.darkHigh : kolory.lightHigh;
  return ciemny ? kolory.dark : kolory.light;
}

function useZwiekszonyKontrast(): boolean {
  const [wlaczony, ustaw] = useState(false);
  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    let aktywny = true;
    AccessibilityInfo.isDarkerSystemColorsEnabled()
      .then((v) => {
        if (aktywny) ustaw(v);
      })
      .catch(() => undefined); // brak odczytu = wariant zwykły (preferencja interfejsu, nie dane)
    const sub = AccessibilityInfo.addEventListener('darkerSystemColorsChanged', ustaw);
    return () => {
      aktywny = false;
      sub.remove();
    };
  }, []);
  return wlaczony;
}

export function useTokens(): Tokens {
  const schemat = useColorScheme();
  const kontrast = useZwiekszonyKontrast();
  const paleta = wybierzPalete(schemat, kontrast);
  return { ...paleta, przejsciowe: schemat === 'dark' ? przejscioweCiemne : przejscioweJasne };
}

const s = typografia.skala;
const krojTytulowy = () => krojTytulu(Font.isLoaded(LITERATA), PixelRatio.getFontScale());
/**
 * Style tekstu ze skali (pt). Tytuły: Literata 600 przy tekście do XXXL, od AX1 krój systemowy semibold (D-120, D-122;
 * `./kroje`); krój czytany przy każdym renderze (getter), bo ładuje się przy starcie i zależy od rozmiaru tekstu.
 * `naglowek` = treść semibold (nagłówki sekcji; skala roli 04 nie ma pośredniego rozmiaru — iOS `headline` to 17 pt semibold).
 */
export const styl = {
  get tytulDuzy() {
    return { fontSize: s.tytulDuzy.size, lineHeight: s.tytulDuzy.line, fontWeight: '600' as const, fontFamily: krojTytulowy() };
  },
  get tytul() {
    return { fontSize: s.tytul.size, lineHeight: s.tytul.line, fontWeight: '600' as const, fontFamily: krojTytulowy() };
  },
  naglowek: { fontSize: s.tresc.size, lineHeight: s.tresc.line, fontWeight: '600' as const },
  tresc: { fontSize: s.tresc.size, lineHeight: s.tresc.line, fontWeight: '400' as const },
  przypis: { fontSize: s.przypis.size, lineHeight: s.przypis.line, fontWeight: '400' as const },
  drobny: { fontSize: s.drobny.size, lineHeight: s.drobny.line, fontWeight: '400' as const },
};

/** Indeks karty: Literata do XXXL, inaczej szeryfowy systemu (`./kroje`). */
export const krojKarty = (): string => krojIndeksu(Font.isLoaded(LITERATA), PixelRatio.getFontScale());
