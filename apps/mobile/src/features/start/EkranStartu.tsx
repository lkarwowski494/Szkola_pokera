import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Start aktywności z limitem (PR-03, PR-04; BR-LIM-001, BR-LIM-004; ADR 0007): licznik przed startem, bez licznika dla Pro.
 * `limit` to wynik `limitDnia` z packages/domena (ten sam kształt). Przy wyczerpanym limicie „Zacznij” nie startuje:
 * rodzic pokazuje ekran zakupu jako stan przepływu (`onLimitWyczerpany`), z godziną odnowienia i „Wróć do lekcji”.
 * Powtórki przy wyczerpanym limicie: komunikat, że poczekają bez utraty (BR-LIM-004).
 */
export type LimitEkranu = { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };
export type PropsEkranuStartu = {
  rodzaj: 'sesja' | 'powtorki' | 'scenariusz' | 'test_modulu';
  limit: LimitEkranu;
  strefa: string; // strefa telefonu (Zegar.strefa) do pokazania godziny odnowienia
  zaleglePowtorki?: number; // tylko rodzaj 'powtorki'
  onStart(): void;
  onLimitWyczerpany(): void;
  onWrocDoLekcji(): void;
};

const TYTUL = { sesja: 'practice', powtorki: 'reviews', scenariusz: 'scenario', test_modulu: 'exam' } as const;

/** Godzina odnowienia w strefie telefonu (ADR 0007: północ czasu telefonu; przy zmianie czasu pierwsza chwila dnia). */
export function godzinaWStrefie(ms: number, strefa: string, jezyk: string): string {
  return new Intl.DateTimeFormat(jezyk, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: strefa }).format(new Date(ms));
}

export default function EkranStartu({ rodzaj, limit, strefa, zaleglePowtorki, onStart, onLimitWyczerpany, onWrocDoLekcji }: PropsEkranuStartu): React.JSX.Element {
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const wyczerpany = !limit.bezLimitu && limit.pozostalo <= 0;
  return (
    <Screen>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t(`start.title.${TYTUL[rodzaj]}`)}
      </Text>
      {limit.bezLimitu ? null : (
        <View style={{ gap: odstep.s }}>
          <Text style={[styl.naglowek, { color: tk.ink }]}>{t('start.counter', { count: limit.pozostalo })}</Text>
          {wyczerpany ? (
            <Text style={[styl.tresc, { color: tk.ink }]}>{t('start.renews', { godzina: godzinaWStrefie(limit.odnowienieMs, strefa, i18n.language) })}</Text>
          ) : null}
          {wyczerpany && rodzaj === 'powtorki' && (zaleglePowtorki ?? 0) > 0 ? (
            <Text style={[styl.tresc, { color: tk.ink }]}>{t('start.reviewsWait', { count: zaleglePowtorki })}</Text>
          ) : null}
          <Text style={[styl.przypis, { color: tk.muted }]}>{t('start.alwaysFree')}</Text>
        </View>
      )}
      <View style={{ gap: odstep.m, marginTop: odstep.l }}>
        {wyczerpany ? (
          <Button label={t('start.fullAccess')} onPress={onLimitWyczerpany} />
        ) : (
          <Button label={t('start.begin')} onPress={onStart} />
        )}
        {wyczerpany ? <Button variant="ghost" label={t('start.backToLesson')} onPress={onWrocDoLekcji} /> : null}
      </View>
    </Screen>
  );
}
