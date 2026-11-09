// Haptyka z tokenów `haptyka` (A04-12, D-283 pkt 5; design-spec, tokeny 04): ekrany podają token, wywołanie expo-haptics
// (~58.0.7: impactAsync, notificationAsync, selectionAsync) jest tylko tutaj. Stopnie bez własnego tokenu (niedokładność
// liczby, błąd rozmiaru) dostają token Błędu — nie są zagraniem zgodnym (D-329; brak tokenu zgłoszony do 04).
import * as Haptics from 'expo-haptics';
import type { GradeResult } from '@/features/drills/types';
import { haptyka } from '@/theme/tokens';

export type TokenHaptyki = (typeof haptyka)[keyof typeof haptyka];

export function haptykaOceny(g: GradeResult): TokenHaptyki {
  return g === 'correct' ? haptyka.ocenaZgodna : g === 'acceptable' ? haptyka.ocenaDopuszczalna : haptyka.ocenaBlad;
}

const POWIADOMIENIE = {
  notificationSuccess: Haptics.NotificationFeedbackType.Success,
  notificationWarning: Haptics.NotificationFeedbackType.Warning,
  notificationError: Haptics.NotificationFeedbackType.Error,
} as const;

export async function wykonajHaptyke(tok: TokenHaptyki): Promise<void> {
  if (tok === 'selection') await Haptics.selectionAsync();
  else if (tok === 'impactLight') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  else await Haptics.notificationAsync(POWIADOMIENIE[tok]);
}
