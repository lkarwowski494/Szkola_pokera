import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, H2, Muted, Screen, Surface, Title } from '@/components/ui';
import { userDb } from '@/data/user/db';
import { dueGameCardCount, introduceGameCards } from '@/data/user/game';
import { allFamilies, dueFamilies, nextDue } from '@/data/user/repo';
import { space } from '@/theme/tokens';

function formatWhen(ts: number): string {
  const d = new Date(ts);
  const sameDay = new Date().toDateString() === d.toDateString();
  const time = d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  return sameDay ? `dziś o ${time}` : d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function ReviewScreen() {
  const { t } = useTranslation();
  const [state, setState] = useState(() => ({ due: 0, known: 0, next: null as number | null, game: 0 }));
  useFocusEffect(
    useCallback(() => {
      // karty z gry czekające w kolejce wchodzą do powtórek przy otwarciu, w granicach dziennego limitu (6.4 A)
      introduceGameCards(userDb);
      setState({ due: dueFamilies(userDb).length, known: allFamilies(userDb).length, next: nextDue(userDb), game: dueGameCardCount(userDb) });
    }, []),
  );

  return (
    <Screen>
      <Title>{t('review.title')}</Title>
      <Surface style={{ gap: space.m }}>
        <Muted>{state.due > 0 ? t('review.due', { count: state.due }) : t('review.none')}</Muted>
        {state.due === 0 && state.next ? <Muted>{t('review.next', { when: formatWhen(state.next) })}</Muted> : null}
        <Button label={t('review.start')} disabled={state.due === 0} onPress={() => router.push({ pathname: '/session', params: { mode: 'review' } })} />
      </Surface>
      {state.game > 0 ? (
        <Surface style={{ gap: space.m }}>
          <Muted>{t('play.review.entry', { count: state.game })}</Muted>
          <Button label={t('play.review.start')} onPress={() => router.push('/play/review')} />
        </Surface>
      ) : null}
      <View style={{ gap: space.m }}>
        <H2>{t('review.speed')}</H2>
        <Muted>{t('review.speedHint')}</Muted>
        <Button label={t('review.speed')} variant="ghost" disabled={state.known === 0} onPress={() => router.push({ pathname: '/session', params: { mode: 'speed' } })} />
      </View>
    </Screen>
  );
}
