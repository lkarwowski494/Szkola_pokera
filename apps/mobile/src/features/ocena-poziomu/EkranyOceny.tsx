import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { RichText } from '@/components/RichText';
import { Button, Screen } from '@/components/ui';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/**
 * Ocena poziomu (PR-01, BR-ONB-001, BR-ONB-002; maszyna `aktywnosc` rodzaju `ocena_poziomu`, ADR 0010).
 * Pytanie: najwyżej OCENA_POZIOMU_MAKS_PYTAN (konfiguracja.ts); „Nie wiem” zamiast „Pomiń” (D-475), rezygnacja z oceny tylko na ekranie wyboru.
 * Wynik: punkt startu i przycisk rozpoczęcia nauki; bez ekranu zakupu (D-105).
 */
export type PropsPytaniaOceny = {
  numer: number; // 1..liczba
  liczba: number;
  tresc: string;
  odpowiedzi: readonly string[];
  onOdpowiedz(indeks: number): void;
  onNieWiem(): void; // liczone jak błędna odpowiedź (D-475)
  stol?: React.ReactNode; // karty albo stół pytania z egzaminu (docs/tresci/ocena-poziomu-pytania.md „Uwaga dla 08”; D-265)
};
export type PropsWynikuOceny = {
  punktStartu: { modul: string; tytulLekcji: string };
  zaliczoneOcena: readonly string[]; // moduły zaliczone oceną (BR-ONB-002), np. ['M0', 'M1', 'M2']
  onZacznij(): void;
};

export function EkranPytaniaOceny({ numer, liczba, tresc, odpowiedzi, onOdpowiedz, onNieWiem, stol }: PropsPytaniaOceny): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <Screen>
      <Text style={[styl.przypis, { color: tk.muted }]}>{t('placement.of', { n: numer, total: liczba })}</Text>
      {stol}
      {/* A04-02: treść i odpowiedzi z kartami [[…]] przez RichText, jak w sesji (session.tsx); nagłówek obejmuje karty */}
      <View accessible accessibilityRole="header">
        <RichText text={tresc} style={styl.tytul} />
      </View>
      <View style={{ gap: odstep.s }}>
        {odpowiedzi.map((o, i) => (
          <Pressable
            key={i}
            testID={`option-${i}`}
            accessibilityRole="button"
            onPress={() => onOdpowiedz(i)}
            style={({ pressed }) => ({
              minHeight: 56,
              justifyContent: 'center',
              paddingHorizontal: odstep.l,
              paddingVertical: odstep.m,
              borderRadius: promien.przycisk,
              borderWidth: 1.5,
              borderColor: tk.separator,
              backgroundColor: tk.surface,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <RichText text={o} style={styl.tresc} />
          </Pressable>
        ))}
      </View>
      <Button variant="ghost" label={t('placement.dontKnow')} onPress={onNieWiem} />
    </Screen>
  );
}

export function EkranWynikuOceny({ punktStartu, zaliczoneOcena, onZacznij }: PropsWynikuOceny): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <Screen>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t('placement.resultTitle')}
      </Text>
      <Text style={[styl.tresc, { color: tk.ink }]}>{t('placement.startAt', { modul: punktStartu.modul, lekcja: punktStartu.tytulLekcji })}</Text>
      {zaliczoneOcena.length > 0 ? (
        <Text style={[styl.tresc, { color: tk.ink }]}>{t('placement.passed', { moduly: zaliczoneOcena.join(', ') })}</Text>
      ) : null}
      <Button label={t('placement.begin')} onPress={onZacznij} />
    </Screen>
  );
}
