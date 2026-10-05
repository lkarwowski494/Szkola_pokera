import { Text, View } from 'react-native';
import { Button } from '@/components/ui';
import { space, type as tp, useTokens } from '@/theme/tokens';

/**
 * Ekran zastępczy po błędzie renderowania (granica błędów EAS Observe w _layout). Bez treści błędu: użytkownik nic
 * z nią nie zrobi, a błąd trafia do raportu awarii.
 */
export function RenderErrorScreen({ onRetry }: { onRetry: () => void }) {
  const tk = useTokens();
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: space.l, padding: space.xl, backgroundColor: tk.bg }}>
      <Text accessibilityRole="header" style={[tp.h2, { color: tk.ink }]}>
        Coś poszło nie tak
      </Text>
      <Text style={[tp.body, { color: tk.muted }]}>Tego ekranu nie udało się wyświetlić. Spróbuj jeszcze raz.</Text>
      <Button label="Spróbuj ponownie" onPress={onRetry} />
    </View>
  );
}
