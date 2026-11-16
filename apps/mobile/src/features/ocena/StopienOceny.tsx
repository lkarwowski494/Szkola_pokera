import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View } from 'react-native';
import { odstep, styl, useTokens } from '@/theme/tokens';
import { rozmiarSlowaStopnia } from './slowoStopnia';

/**
 * Stopień oceny zagrania po decyzji (PR-03, BR-CWI-001, NFR-DOST-001): słowo i znak, nie sam kolor
 * (design-spec.md, „Znaczenie kolorów”: stopnie bez koloru). Lista stopni: OCENY_ODPOWIEDZI w packages/domena
 * (cztery z BRD; trzy czy cztery rozstrzyga rola 06 z 04 — moduly.md, „Znaleziska”). Słowa: design-spec („Zgodna”,
 * „Dopuszczalna”, „Błąd”) i BRD („niedokładność”); znaki ✓ ≈ ~ ✗ — do akceptacji 04 (D-213).
 */
export type PropsStopniaOceny = {
  ocena: 'zgodne' | 'dopuszczalne' | 'niedokladnosc' | 'blad';
  /** Na suknie (panel decyzji po ocenie, 08 cz. 6): tekst `onFelt` zamiast `ink`. */
  naSuknie?: boolean;
};

export const ZNAK: Record<PropsStopniaOceny['ocena'], string> = { zgodne: '✓', dopuszczalne: '≈', niedokladnosc: '~', blad: '✗' };

export default function StopienOceny({ ocena, naSuknie = false }: PropsStopniaOceny): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const okno = useWindowDimensions(); // IH (IF P2-1): reaktywnie
  const slowo = t(`grade.${ocena}`);
  const kolor = naSuknie ? tk.onFelt : tk.ink;
  // Na suknie słowo nie zawija się w obrębie wyrazu: rozmiar ze skali (`slowoStopnia`, potem `tytulDlugi`) wg szerokości ekranu i skali tekstu (IC, D-1850).
  const rozmiar = naSuknie ? rozmiarSlowaStopnia(ZNAK[ocena], slowo, okno.width, okno.fontScale, [styl.slowoStopnia, styl.tytulDlugi]) : null;
  const wymiary = rozmiar ?? {};
  return (
    <View accessible accessibilityLabel={t('grade.label', { slowo })} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: odstep.s }}>
      <Text style={[styl.slowoStopnia, wymiary, { color: kolor }]}>{ZNAK[ocena]}</Text>
      <Text style={[styl.slowoStopnia, wymiary, { color: kolor, flexShrink: 1 }]}>{slowo}</Text>
    </View>
  );
}
