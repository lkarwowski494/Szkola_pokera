import { Fragment } from 'react';
import { StyleSheet, Text, View, type TextStyle } from 'react-native';
import { CardRow } from './PlayingCard';
import { splitCardTokens } from '@/features/drills/cardTokens';
import { useTokens } from '@/theme/tokens';

/**
 * Tekst z kartami w środku. Gdy tekst nie ma kart, to zwykły <Text>.
 * Z kartami: wiersz z zawijaniem, w którym karty są osobnymi elementami (Text w RN nie zagnieżdża widoków niezawodnie).
 */
export function RichText({ text, style }: { text: string; style?: TextStyle | TextStyle[] }) {
  const tk = useTokens();
  const parts = splitCardTokens(text);
  const base = [{ color: tk.ink }, style];
  if (parts.every((p) => p.t === 'text')) return <Text style={base}>{text}</Text>;
  return (
    <View style={styles.wrap}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p.t === 'cards' ? (
            <View style={styles.cards}>
              <CardRow cards={p.v} size="sm" />
            </View>
          ) : (
            p.v
              .split(/(\s+)/)
              .filter((w) => w.length > 0 && !/^\s+$/.test(w))
              .map((w, j) => (
                <Text key={j} style={base}>
                  {w}{' '}
                </Text>
              ))
          )}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  cards: { marginRight: 4, marginVertical: 2 },
});
