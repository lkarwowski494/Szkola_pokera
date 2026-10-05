import type { Block, Inline } from '@szkola/content-schema';
import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';
import { useSQLiteContext } from 'expo-sqlite';
import { getRangeSpot } from '@/data/content/repo';
import { CardRow } from './PlayingCard';
import { RangeGrid } from './RangeGrid';
import { columnWidths } from './tableLayout';

/** Renderer skompilowanej treści lekcji (ADR-16): drzewo JSON zbudowane offline, bez parsowania na telefonie. */

function InlineRun({ items, style }: { items: Inline[]; style?: object }) {
  const tk = useTokens();
  const hasCards = items.some((i) => i.t === 'cards');
  if (!hasCards) {
    return (
      <Text style={[tp.body, { color: tk.ink }, style]}>
        {items.map((it, i) =>
          it.t === 'text' ? (
            <Text key={i} style={{ fontWeight: it.b ? '700' : undefined, fontStyle: it.i ? 'italic' : undefined }}>
              {it.v}
            </Text>
          ) : null,
        )}
      </Text>
    );
  }
  return (
    <View style={styles.flow}>
      {items.map((it, i) =>
        it.t === 'cards' ? (
          <View key={i} style={styles.inlineCards}>
            <CardRow cards={it.v} size="sm" />
          </View>
        ) : (
          <Fragment key={i}>
            {it.v
              .split(/\s+/)
              .filter(Boolean)
              .map((w, j) => (
                <Text key={j} style={[tp.body, { color: tk.ink, fontWeight: it.b ? '700' : undefined, fontStyle: it.i ? 'italic' : undefined }, style]}>
                  {w}{' '}
                </Text>
              ))}
          </Fragment>
        ),
      )}
    </View>
  );
}

function TableBlock({ block }: { block: Extract<Block, { t: 'table' }> }) {
  const tk = useTokens();
  const [avail, setAvail] = useState<number | undefined>(undefined);
  const widths = columnWidths(block.head, block.rows, avail);
  return (
    <View onLayout={(e) => setAvail(Math.floor(e.nativeEvent.layout.width) - 2)}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.table, { borderColor: tk.line }]}>
          <View style={[styles.tr, { backgroundColor: tk.feltSoft }]}>
            {block.head.map((cell, i) => (
              <View key={i} style={[styles.td, { width: widths[i] }]}>
                <InlineRun items={cell} style={[tp.small, { fontWeight: '700' }]} />
              </View>
            ))}
          </View>
          {block.rows.map((row, r) => (
            <View key={r} style={[styles.tr, { borderTopColor: tk.line, borderTopWidth: StyleSheet.hairlineWidth }]}>
              {row.map((cell, i) => (
                <View key={i} style={[styles.td, { width: widths[i] }]}>
                  <InlineRun items={cell} style={tp.small} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function BlockView({ block }: { block: Block }) {
  const tk = useTokens();
  switch (block.t) {
    case 'h':
      return <InlineRun items={block.c} style={block.level === 2 ? [tp.h2, styles.h] : [tp.h3, styles.h]} />;
    case 'p':
      return <InlineRun items={block.c} />;
    case 'list':
      return (
        <View style={{ gap: space.s }}>
          {block.items.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={[tp.body, { color: tk.felt, width: 22, fontWeight: '700' }]}>{block.ordered ? `${i + 1}.` : '•'}</Text>
              <View style={{ flex: 1 }}>
                <InlineRun items={item} />
              </View>
            </View>
          ))}
        </View>
      );
    case 'table':
      return <TableBlock block={block} />;
    case 'note':
      return (
        <View style={[styles.note, { backgroundColor: tk.feltSoft }]}>
          {block.title ? <Text style={[tp.h3, { color: tk.felt }]}>{block.title}</Text> : null}
          {block.c.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </View>
      );
    case 'range':
      return <RangeBlock id={block.spot} />;
    case 'formula':
      return (
        <View style={[styles.formula, { borderColor: tk.felt, backgroundColor: tk.surface }]}>
          <Text style={[tp.small, { color: tk.ink, fontFamily: 'Menlo' }]}>{block.v}</Text>
        </View>
      );
  }
}

function RangeBlock({ id }: { id: string }) {
  const db = useSQLiteContext();
  const spot = getRangeSpot(db, id);
  return spot ? <RangeGrid spot={spot} /> : null;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <View style={{ gap: space.l }}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  inlineCards: { marginRight: 4, marginVertical: 2 },
  h: { marginTop: space.s },
  listItem: { flexDirection: 'row', alignItems: 'flex-start' },
  table: { borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.s, overflow: 'hidden', },
  tr: { flexDirection: 'row' },
  td: { padding: space.s, justifyContent: 'center' },
  note: { borderRadius: radius.m, padding: space.l, gap: space.s },
  formula: { borderWidth: 1, borderStyle: 'dashed', borderRadius: radius.s, padding: space.m },
});
