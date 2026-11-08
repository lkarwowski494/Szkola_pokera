import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { PasekStrategii } from '@/components/PasekStrategii';
import { RichText } from '@/components/RichText';
import { SkalaStopni } from '@/components/SkalaStopni';
import type { ChoiceInstance, DrillAnswer, GradeResult } from '@/features/drills/types';
import StopienOceny from '@/features/ocena/StopienOceny';
import type { OcenaDecyzji } from '@/features/stol/skala';
import { klasaReki } from '@/features/stol/uklad';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/**
 * Panel decyzji w sesji dla zadania ze strategią solvera (08 cz. 6 krok 7, D-274; design-spec „`PasekStrategii`”,
 * „`SkalaStopni`”, „Znaczenie kolorów”; makieta e3 `przed-decyzja`, `po-ocenie`).
 * Przed decyzją: „Wybierz akcję” i pasek-przyciski (`option-<i>`, flowy E2E). Po ocenie: na suknie stopień słowem i znakiem
 * (bez koloru), pasek po ocenie i skala stopni; pod suknem wyjaśnienie wybranej opcji. Czas minął: bez znacznika i skali.
 * Niedokładność (zły rozmiar) nie ma przedziału na skali (L-4, D-274).
 */
export type RekordDecyzji = { readonly answer: DrillAnswer; readonly grade: GradeResult };

export function ocenaDecyzji(g: GradeResult): OcenaDecyzji {
  return g === 'correct' ? 'zgodne' : g === 'acceptable' ? 'dopuszczalne' : g === 'wrong' ? 'blad' : 'niedokladnosc';
}

export function PanelDecyzji({ item, rekord, onWybierz }: { item: ChoiceInstance; rekord: RekordDecyzji | null; onWybierz?: (i: number) => void }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const klasa = klasaReki(item.table?.hand ?? []);
  if (!rekord) {
    return (
      <View style={{ gap: odstep.s }}>
        <Text style={[styl.drobny, { color: tk.muted, fontWeight: '600' }]}>{t('session.chooseAction')}</Text>
        <PasekStrategii opcje={item.options} wybor={null} klasa={klasa} onWybierz={onWybierz} />
      </View>
    );
  }
  const wybor = rekord.answer.kind === 'choice' ? rekord.answer.index : -1;
  const opcja = wybor >= 0 ? item.options[wybor] : undefined;
  const ocena = ocenaDecyzji(rekord.grade);
  const skala = opcja && typeof opcja.czestosc === 'number' && ocena !== 'niedokladnosc';
  return (
    <View style={{ gap: odstep.l }}>
      <View style={[styles.rama, { backgroundColor: tk.frame }]}>
        <View accessibilityLiveRegion="polite" style={[styles.sukno, { backgroundColor: tk.felt1 }]}>
          {opcja ? <StopienOceny ocena={ocena} naSuknie /> : <Text style={[styl.tytul, { color: tk.onFelt }]}>{t('session.timeout')}</Text>}
          <PasekStrategii opcje={item.options} wybor={wybor} klasa={klasa} />
          {skala ? <SkalaStopni czestosc={opcja.czestosc ?? 0} ocena={ocena} /> : null}
        </View>
      </View>
      {opcja?.why ? <RichText text={opcja.why} style={styl.tresc} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  rama: { borderRadius: promien.rama, padding: odstep.s }, // makieta e3 `.stol-wynik`
  sukno: { borderRadius: promien.sukno, paddingHorizontal: odstep.l, paddingTop: odstep.xl, paddingBottom: odstep.xl, gap: odstep.l },
});
