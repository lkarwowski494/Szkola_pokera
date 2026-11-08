import { Text, View } from 'react-native';
import { Button } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Ekran zastępczy po błędzie renderowania (granica błędów `GranicaBledu` w _layout). Bez treści błędu: użytkownik nic
 * z nią nie zrobi, a kod błędu trafia do dziennika lokalnego (ADR 0009).
 */
export function RenderErrorScreen({ onRetry }: { onRetry: () => void }) {
  const tk = useTokens();
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: odstep.l, padding: odstep.xxl, backgroundColor: tk.bg }}>
      <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>
        Coś poszło nie tak
      </Text>
      <Text style={[styl.tresc, { color: tk.muted }]}>Tego ekranu nie udało się wyświetlić. Spróbuj jeszcze raz.</Text>
      <Button label="Spróbuj ponownie" onPress={onRetry} />
    </View>
  );
}
