import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Muted, Screen, Surface, Title } from '@/components/ui';
import { definicjaTerminu } from '@/features/glossary/definicje';
import { englishLabel, GLOSSARY_SIZE, glossarySections, zPolskimi, type GlossaryEntry } from '@/features/glossary/glossary';
import { jezykZadan } from '@/features/drills/text';
import type { Jezyk } from '@szkola/jezyki';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/**
 * Słowniczek PL ↔ EN: wszystkie terminy z content/terms.yaml w obszarach, z wyszukiwaniem w obu językach. Poza pl tylko
 * termin angielski i definicja w języku aplikacji, bez polskich słów (D-347).
 */
export default function GlossaryScreen() {
  const tk = useTokens();
  const { t } = useTranslation(); // ponowne renderowanie po zmianie języka, więc jezykZadan() jest aktualny
  const [q, setQ] = useState('');
  const jezyk = jezykZadan();
  const sections = useMemo(() => glossarySections(q, undefined, jezyk), [q, jezyk]);
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
        style={[styles.search, styl.tresc, { color: tk.ink, backgroundColor: tk.surface, borderColor: tk.separator }]}
      />
      <Muted>{t('glossary.count', { count: q.trim() ? shown : GLOSSARY_SIZE })}</Muted>
      {sections.length === 0 ? <Muted>{t('glossary.empty', { q })}</Muted> : null}
      {sections.map((s) => (
        <View key={s.area} style={{ gap: odstep.s }}>
          <Text accessibilityRole="header" style={[styl.przypis, { color: tk.muted, fontWeight: '700', marginTop: odstep.s }]}>
            {t(`glossary.areas.${s.area}`)}
          </Text>
          <Surface style={{ gap: odstep.m }}>
            {s.entries.map((e) => (
              <Entry key={e.key} entry={e} jezyk={jezyk} />
            ))}
          </Surface>
        </View>
      ))}
    </Screen>
  );
}

function Entry({ entry, jezyk }: { entry: GlossaryEntry; jezyk: Jezyk }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const en = englishLabel(entry);
  const def = definicjaTerminu(entry.key, jezyk); // D-335: definicja w języku aplikacji, bez polskiej poza pl
  const pl = zPolskimi(jezyk);
  const inne = entry.enAlt.length > 0 ? <Muted>{t('glossary.alsoEn', { list: entry.enAlt.join(', ') })}</Muted> : null;
  const etykieta = pl ? `${entry.pl}: ${en}${def ? `. ${def}` : ''}` : `${en}${def ? `. ${def}` : ''}`;
  return (
    <View style={{ gap: odstep.xs }} accessible accessibilityLabel={etykieta}>
      {pl ? (
        <View style={styles.row}>
          <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600', flex: 1 }]}>{entry.pl}</Text>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[styl.tresc, { color: tk.muted }]}>{en}</Text>
            {inne}
          </View>
        </View>
      ) : (
        <View style={{ gap: 2 }}>
          <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600' }]}>{en}</Text>
          {inne}
        </View>
      )}
      {def ? <Text style={[styl.przypis, { color: tk.ink }]}>{def}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: promien.przycisk, paddingHorizontal: odstep.l, paddingVertical: odstep.m },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: odstep.m },
});
