import type { RuleSourceSummary } from '@szkola/content-schema';
import type { TFunction } from 'i18next';

/**
 * Źródła reguły w karcie: tylko rodzaj i liczba niezależnych źródeł (decyzja właściciela z 9.10.2026), np.
 * „Źródła: opublikowane rozwiązania solverów (2 niezależne); serwisy szkoleniowe (3)”. Reguła oparta na jednym
 * źródle innym niż rachunek dostaje dopisek „jedno źródło”.
 */
export function formatRuleSources(sources: readonly RuleSourceSummary[], t: TFunction): string {
  const parts = sources.map(({ kind, n }) => {
    if (n === 1) return t(`rules.sourceKind.one.${kind}`);
    const count = kind === 'solver-pub' ? t('rules.sourceIndependent', { count: n }) : t('rules.sourceCount', { count: n });
    return `${t(`rules.sourceKind.many.${kind}`)} (${count})`;
  });
  const total = sources.reduce((a, s) => a + s.n, 0);
  const single = total === 1 && sources[0]!.kind !== 'math' ? ` (${t('rules.singleSource')})` : '';
  return `${t(total === 1 ? 'rules.source' : 'rules.sources')}: ${parts.join('; ')}${single}`;
}
