import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Muted, Screen, Surface, Title } from '@/components/ui';
import { englishLabel, GLOSSARY_SIZE, glossarySections, type GlossaryEntry } from '@/features/glossary/glossary';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Słowniczek PL ↔ EN: wszystkie terminy z content/terms.yaml w obszarach, z wyszukiwaniem w obu językach. */
export default function GlossaryScreen() {
  const tk = useTokens();
  const { t } = useTranslation();
  const [q, setQ] = useState('');
  const sections = useMemo(() => glossarySections(q), [q]);
  const shown = sections.reduce((n, s) => n + s.entries.length, 0);

  return (
    <Screen padTop={false}>
      <Title>{t('glossary.title')}</Title>
      <Muted>{t('glossary.intro')}</Muted>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder={t('glossary.search')}
        placeholderTextColor={tk.muted}
        clearButtonMode="while-editing"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel={t('glossary.search')}
        style={[styles.search, tp.body, { color: tk.ink, backgroundColor: tk.surface, borderColor: tk.line }]}
      />
      <Muted>{t('glossary.count', { count: q.trim() ? shown : GLOSSARY_SIZE })}</Muted>
      {sections.length === 0 ? <Muted>{t('glossary.empty', { q })}</Muted> : null}
      {sections.map((s) => (
        <View key={s.area} style={{ gap: space.s }}>
          <Text accessibilityRole="header" style={[tp.small, { color: tk.muted, fontWeight: '700', marginTop: space.s }]}>
            {t(`glossary.areas.${s.area}`)}
          </Text>
          <Surface style={{ gap: space.m }}>
            {s.entries.map((e) => (
              <Entry key={e.key} entry={e} />
            ))}
          </Surface>
        </View>
      ))}
    </Screen>
  );
}

function Entry({ entry }: { entry: GlossaryEntry }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const en = englishLabel(entry);
  return (
    <View style={{ gap: space.xs }} accessible accessibilityLabel={`${entry.pl}: ${en}${entry.def ? `. ${entry.def}` : ''}`}>
      <View style={styles.row}>
        <Text style={[tp.body, { color: tk.ink, fontWeight: '600', flex: 1 }]}>{entry.pl}</Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[tp.body, { color: tk.felt }]}>{en}</Text>
          {entry.enAlt.length > 0 ? <Muted>{t('glossary.alsoEn', { list: entry.enAlt.join(', ') })}</Muted> : null}
        </View>
      </View>
      {entry.def ? <Text style={[tp.small, { color: tk.ink }]}>{entry.def}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.m, paddingHorizontal: space.l, paddingVertical: space.m },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.m },
});
