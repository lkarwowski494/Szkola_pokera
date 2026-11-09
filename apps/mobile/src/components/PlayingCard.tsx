import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { nazwaKarty } from '@/features/stol/uklad';
import { useSettings } from '@/state/settings';
import { krojKarty, promien, useTokens } from '@/theme/tokens';

const SUIT: Record<string, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };

export type CardSize = 'sm' | 'md' | 'lg';
const SIZES: Record<CardSize, { w: number; h: number; rank: number; suit: number }> = {
  sm: { w: 22, h: 30, rank: 13, suit: 12 },
  md: { w: 40, h: 56, rank: 20, suit: 18 },
  lg: { w: 52, h: 72, rank: 26, suit: 24 },
};

/** Karta do gry. Kod w formacie "As", "Td". Talia czterokolorowa według ustawień. */
export const PlayingCard = memo(function PlayingCard({ code, size = 'md' }: { code: string; size?: CardSize }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const fourColor = useSettings((s) => s.fourColor);
  const rank = code[0]!;
  const suit = code[1]!;
  const color =
    suit === 'h' ? tk.cardRed : suit === 'd' ? (fourColor ? tk.cardBlue : tk.cardRed) : suit === 'c' && fourColor ? tk.cardGreen : tk.cardInk;
  const d = SIZES[size];
  const label = nazwaKarty(code, t); // A04-10 (D-284): nazwa dla czytnika z kluczy card.*
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[
        styles.card,
        // A04-16: promień i cień z tokenów; sm (karta w tekście) zostaje przy 4 — mały rysunek
        { width: d.w, height: d.h, backgroundColor: tk.card, borderColor: tk.cardEdge, borderRadius: size === 'sm' ? 4 : promien.karta, shadowColor: tk.shadow },
      ]}
    >
      {/* rysunek karty o stałym rozmiarze: indeks i kolor bez skalowania (A04-05, D-283 pkt 3) */}
      <Text allowFontScaling={false} style={[styles.rank, { color, fontSize: d.rank, lineHeight: d.rank * 1.05, fontFamily: krojKarty() }]}>{rank === 'T' ? '10' : rank}</Text>
      <Text allowFontScaling={false} style={[styles.suit, { color, fontSize: d.suit, lineHeight: d.suit * 1.1 }]}>{SUIT[suit]}</Text>
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
    shadowOpacity: 0.6, // tk.shadow ma własną alfę: jasny 0x40 (0,25 × 0,6 = 0,15, jak dotąd), ciemny 0x66 (0,24)
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
  },
  rank: { fontWeight: '700', includeFontPadding: false },
  suit: { includeFontPadding: false },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
});
