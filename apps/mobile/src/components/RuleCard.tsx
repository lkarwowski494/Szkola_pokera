import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import type { RuleRow } from '@/data/content/repo';
import { formatRuleSources } from './ruleSources';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Reguła odruchowa w formacie „Jeśli X, to Y, bo Z”. */
export function RuleCard({ rule, showSource = false }: { rule: RuleRow; showSource?: boolean }) {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <View style={[styles.card, { backgroundColor: tk.surface, borderColor: tk.line }]} accessible>
      <View style={styles.head}>
        <Text style={[tp.caption, { color: tk.muted }]}>{rule.id}</Text>
        <Text style={[tp.caption, { color: tk.felt, fontWeight: '600' }]}>{t(`level.${rule.level}`)}</Text>
      </View>
      <Text style={[tp.body, { color: tk.ink }]}>
        <Text style={{ fontWeight: '700' }}>{t('rule.if')} </Text>
        {rule.ifText}, <Text style={{ fontWeight: '700' }}>{t('rule.then')} </Text>
        {rule.thenText}.
      </Text>
      <Text style={[tp.small, { color: tk.muted }]}>
        <Text style={{ fontWeight: '700' }}>{t('rule.because')} </Text>
        {rule.because}.
      </Text>
      {showSource ? (
        <Text style={[tp.caption, { color: tk.muted }]}>
          {formatRuleSources(rule.sources, t)}
          {rule.population ? `. ${t('rules.population', { population: rule.population })}` : ''}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.m, padding: space.l, gap: space.s },
  head: { flexDirection: 'row', justifyContent: 'space-between' },
});
