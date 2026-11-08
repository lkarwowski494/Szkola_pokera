import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import type { BlokNastepnejLekcji } from './widok';

/**
 * BlokLekcji (design-spec „Komponenty”; makieta `ekrany/e3.html`, ekran „dzis”): następna lekcja na suknie — rama
 * i sukno, bez kart i miejsc (nic tu nie udaje rozdania, D-119). Przycisk w kolorach karty (e3.css `.lekcja .przycisk`).
 * Promienie: rama `promien.sukno`, sukno o wcięcie mniej (makieta 28/22 pt nie ma tokenu — zgłoszenie 08-F16 do 04).
 */
export default function BlokLekcji({ blok, onOtworz }: { blok: BlokNastepnejLekcji; onOtworz(lekcjaId: string): void }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const akcja = t(blok.rozpoczeta ? 'today.continueLesson' : 'today.startLesson');
  return (
    <View style={{ backgroundColor: tk.frame, borderRadius: promien.sukno, padding: odstep.s }}>
      <View style={{ backgroundColor: tk.felt1, borderRadius: promien.sukno - odstep.s, padding: odstep.l, gap: odstep.xs }}>
        <Text style={[styl.przypis, { color: tk.onFeltMuted }]}>{t('today.lessonOf', { modul: blok.modulTytul, nr: blok.nrLekcji })}</Text>
        <Text accessibilityRole="header" style={[styl.tytul, { color: tk.onFelt }]}>
          {blok.tytul}
        </Text>
        <Text style={[styl.przypis, { color: tk.onFeltMuted }]}>{blok.opis}</Text>
        <Pressable
          testID="dzis-lekcja"
          accessibilityRole="button"
          accessibilityLabel={`${akcja}: ${blok.tytul}`}
          onPress={() => onOtworz(blok.lekcjaId)}
          style={({ pressed }) => ({
            marginTop: odstep.l,
            minHeight: 56,
            borderRadius: promien.przycisk,
            backgroundColor: tk.card,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: odstep.l,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={[styl.naglowek, { color: tk.cardInk }]}>{akcja}</Text>
        </Pressable>
      </View>
    </View>
  );
}
