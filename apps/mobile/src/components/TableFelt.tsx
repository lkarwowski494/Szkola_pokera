import { StyleSheet, Text, View } from 'react-native';
import type { DrillInstance } from '@/features/drills/types';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';
import { CardRow } from './PlayingCard';

const POSITION_NAMES: Record<string, string> = {
  UTG: 'UTG, pierwszy do mówienia',
  HJ: 'HJ, środkowa pozycja',
  CO: 'CO, przed Buttonem',
  BTN: 'Button',
  SB: 'Mały blind',
  BB: 'Duży blind',
};

/** Pas sukna z kartami: główny element wizualny każdego zadania. */
export function TableFelt({ table }: { table: NonNullable<DrillInstance['table']> }) {
  const tk = useTokens();
  return (
    <View style={[styles.felt, { backgroundColor: tk.feltDeep }]}>
      {table.position ? <Text style={[styles.position, { color: tk.onFelt }]}>{POSITION_NAMES[table.position]}</Text> : null}
      <View style={styles.row}>
        {table.hand ? (
          <View style={styles.group}>
            <Text style={[styles.label, { color: tk.onFelt }]}>Twoje karty</Text>
            <CardRow cards={table.hand} size="lg" />
          </View>
        ) : null}
        {table.opp ? (
          <View style={styles.group}>
            <Text style={[styles.label, { color: tk.onFelt }]}>Przeciwnik</Text>
            <CardRow cards={table.opp} size="lg" />
          </View>
        ) : null}
      </View>
      {table.board ? (
        <View style={styles.group}>
          <Text style={[styles.label, { color: tk.onFelt }]}>Stół</Text>
          <CardRow cards={table.board} size="md" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  felt: { borderRadius: radius.l, padding: space.l, gap: space.m },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xl },
  group: { gap: space.xs },
  label: { ...tp.caption, opacity: 0.8 },
  position: { ...tp.small, fontWeight: '600' },
});
