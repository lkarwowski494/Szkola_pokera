import { odczytajKarty, type PortBazy } from '@szkola/postep';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Button, Muted, Screen, Surface, Title } from '@/components/ui';
import { useOdczytPostepu } from '@/data/postep';
import { space } from '@/theme/tokens';

function formatWhen(ts: number): string {
  const d = new Date(ts);
  const sameDay = new Date().toDateString() === d.toDateString();
  const time = d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  return sameDay ? `dziś o ${time}` : d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Karty z terminem ≤ teraz i najbliższy późniejszy termin (jak dotąd dueFamilies i nextDue).
async function czytajPowtorki(port: PortBazy) {
  const k = await odczytajKarty(port);
  if (!k.ok) return k;
  const teraz = Date.now();
  return { ok: true as const, wartosc: { due: k.wartosc.filter((x) => x.termin_ms <= teraz).length, next: k.wartosc.find((x) => x.termin_ms >= teraz)?.termin_ms ?? null } };
}

export default function ReviewScreen() {
  const { t } = useTranslation();
  const odczyt = useOdczytPostepu(czytajPowtorki, 'powtorki');
  const state = odczyt.stan === 'ok' ? odczyt.wartosc : { due: 0, next: null };

  return (
    <Screen>
      <Title>{t('review.title')}</Title>
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : null}
      <Surface style={{ gap: space.m }}>
        <Muted>{state.due > 0 ? t('review.due', { count: state.due }) : t('review.none')}</Muted>
        {state.due === 0 && state.next ? <Muted>{t('review.next', { when: formatWhen(state.next) })}</Muted> : null}
        <Button label={t('review.start')} disabled={state.due === 0} onPress={() => router.push({ pathname: '/session', params: { mode: 'review' } })} />
      </Surface>
    </Screen>
  );
}
