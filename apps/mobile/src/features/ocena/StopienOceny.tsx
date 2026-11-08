import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { odstep, styl, useTokens } from '@/theme/tokens';

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
  const slowo = t(`grade.${ocena}`);
  const kolor = naSuknie ? tk.onFelt : tk.ink;
  return (
    <View accessible accessibilityLabel={t('grade.label', { slowo })} style={{ flexDirection: 'row', alignItems: 'baseline', gap: odstep.s }}>
      <Text style={[styl.tytul, { color: kolor }]}>{ZNAK[ocena]}</Text>
      <Text style={[styl.tytul, { color: kolor }]}>{slowo}</Text>
    </View>
  );
}
