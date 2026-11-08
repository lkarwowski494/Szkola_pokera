import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { odstep, styl, useTokens } from '@/theme/tokens';

/** Wiersz z przełącznikiem (etykieta czytnika = tytuł, stan z roli `switch`). Komponenty systemu: tekst, Switch, tokeny. */
export function WierszPrzelacznika({ tytul, podpis, wartosc, onZmiana, testID, wylaczony }: { tytul: string; podpis?: string; wartosc: boolean; onZmiana(v: boolean): void; testID?: string; wylaczony?: boolean }) {
  const tk = useTokens();
  return (
    <View style={styles.wiersz}>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[styl.tresc, { color: tk.ink }]}>{tytul}</Text>
        {podpis ? <Text style={[styl.przypis, { color: tk.muted }]}>{podpis}</Text> : null}
      </View>
      <Switch testID={testID} value={wartosc} onValueChange={onZmiana} disabled={wylaczony} trackColor={{ true: tk.primaryBg }} accessibilityLabel={tytul} />
    </View>
  );
}

/** Wiersz przejścia do kolejnego ekranu (rola `button`, wartość obok, „›” ukryty dla czytnika). */
export function WierszPrzejscia({ tytul, wartosc, onPress, testID }: { tytul: string; wartosc?: string; onPress(): void; testID?: string }) {
  const tk = useTokens();
  return (
    <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={[tytul, wartosc].filter(Boolean).join('. ')} onPress={onPress} style={({ pressed }) => [styles.wiersz, { opacity: pressed ? 0.85 : 1 }]}>
      <Text style={[styl.tresc, { color: tk.ink, flex: 1 }]}>{tytul}</Text>
      {wartosc ? <Text style={[styl.tresc, { color: tk.muted }]}>{wartosc}</Text> : null}
      <Text style={[styl.tresc, { color: tk.muted }]} accessibilityElementsHidden importantForAccessibility="no">
        ›
      </Text>
    </Pressable>
  );
}

export function Sekcja({ tytul, children }: { tytul: string; children: ReactNode }) {
  const tk = useTokens();
  return (
    <View style={{ gap: odstep.s }}>
      <Text style={[styl.przypis, { color: tk.muted }]}>{tytul}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wiersz: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, minHeight: 44 },
});
