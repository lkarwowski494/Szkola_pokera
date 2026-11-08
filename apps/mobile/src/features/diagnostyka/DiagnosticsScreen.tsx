import { NFR03, runBenchmark, type BenchResult } from '@szkola/poker-core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text, View } from 'react-native';
import { Button, Muted, Screen, Surface, Title } from '@/components/ui';
import { space, type as tp, useTokens } from '@/theme/tokens';

declare const HermesInternal: unknown;

const fmt = (x: number, d = 1) => x.toFixed(d).replace('.', ',');

/**
 * Pomiar wydajności na telefonie (NFR-03, backlog B-009). Ta sama funkcja co `pnpm --filter @szkola/poker-core bench`
 * w Node, więc wynik z iPhone'a porównujemy wprost z wynikiem z komputera.
 */
export default function DiagnosticsScreen() {
  const tk = useTokens();
  const { t } = useTranslation();
  const [result, setResult] = useState<BenchResult | null>(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setResult(null);
    // oddajemy klatkę interfejsowi, żeby przycisk zdążył pokazać stan „mierzę”
    setTimeout(() => {
      setResult(runBenchmark(() => performance.now(), 7));
      setRunning(false);
    }, 50);
  };

  const engine = typeof HermesInternal !== 'undefined' ? 'Hermes' : 'JS';
  const os = `${Platform.OS} ${String(Platform.Version)}`;

  return (
    <Screen padTop={false}>
      <Title>{t('diagnostics.title')}</Title>
      <Muted>{t('diagnostics.intro', { n: NFR03.iterations.toLocaleString('pl-PL'), ms: NFR03.maxMs })}</Muted>
      <Button label={running ? t('diagnostics.running') : t('diagnostics.run')} onPress={run} disabled={running} />
      {result ? (
        <Surface style={{ gap: space.s }}>
          <Text style={[tp.h3, { color: result.passesNfr03 ? tk.good : tk.bad }]}>
            {result.passesNfr03 ? t('diagnostics.pass') : t('diagnostics.fail')}
          </Text>
          <Text style={[tp.body, { color: tk.ink }]} selectable>
            {t('diagnostics.equity', { ms: fmt(result.equityMedianMs), runs: result.equityRunsMs.map((x) => fmt(x)).join(', ') })}
          </Text>
          <Text style={[tp.body, { color: tk.ink }]} selectable>
            {t('diagnostics.check', { pct: fmt(result.equityCheck * 100) })}
          </Text>
          <Text style={[tp.body, { color: tk.ink }]} selectable>
            {t('diagnostics.evals', { n: Math.round(result.evalsPerSecond).toLocaleString('pl-PL') })}
          </Text>
          <View>
            <Muted>{t('diagnostics.env', { engine, os, dev: __DEV__ ? t('diagnostics.devYes') : t('diagnostics.devNo') })}</Muted>
          </View>
        </Surface>
      ) : null}
      <Muted>{t('diagnostics.note')}</Muted>
    </Screen>
  );
}
