import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSettings } from '@/state/settings';
import { cardFont, useTokens } from '@/theme/tokens';

const SUIT: Record<string, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };
const SUIT_NAME: Record<string, string> = { s: 'pik', h: 'kier', d: 'karo', c: 'trefl' };
const RANK_NAME: Record<string, string> = { T: '10', J: 'walet', Q: 'dama', K: 'król', A: 'as' };

export type CardSize = 'sm' | 'md' | 'lg';
const SIZES: Record<CardSize, { w: number; h: number; rank: number; suit: number }> = {
  sm: { w: 22, h: 30, rank: 13, suit: 12 },
  md: { w: 40, h: 56, rank: 20, suit: 18 },
  lg: { w: 52, h: 72, rank: 26, suit: 24 },
};

/** Karta do gry. Kod w formacie "As", "Td". Talia czterokolorowa według ustawień. */
export const PlayingCard = memo(function PlayingCard({ code, size = 'md' }: { code: string; size?: CardSize }) {
  const tk = useTokens();
  const fourColor = useSettings((s) => s.fourColor);
  const rank = code[0]!;
  const suit = code[1]!;
  const color =
    suit === 'h' ? tk.cardRed : suit === 'd' ? (fourColor ? tk.cardBlue : tk.cardRed) : suit === 'c' && fourColor ? tk.cardGreen : tk.cardInk;
  const d = SIZES[size];
  const label = `${RANK_NAME[rank] ?? rank} ${SUIT_NAME[suit]}`;
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[
        styles.card,
        { width: d.w, height: d.h, backgroundColor: tk.cardFace, borderColor: tk.cardEdge, borderRadius: size === 'sm' ? 4 : 6 },
      ]}
    >
      <Text style={[styles.rank, { color, fontSize: d.rank, lineHeight: d.rank * 1.05, fontFamily: cardFont }]}>{rank === 'T' ? '10' : rank}</Text>
      <Text style={[styles.suit, { color, fontSize: d.suit, lineHeight: d.suit * 1.1 }]}>{SUIT[suit]}</Text>
    </View>
  );
});

export function CardRow({ cards, size = 'md' }: { cards: readonly string[]; size?: CardSize }) {
  return (
    <View style={[styles.row, { gap: size === 'sm' ? 2 : 6 }]}>
      {cards.map((c) => (
        <PlayingCard key={c} code={c} size={size} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
  },
  rank: { fontWeight: '700', includeFontPadding: false },
  suit: { includeFontPadding: false },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
});
