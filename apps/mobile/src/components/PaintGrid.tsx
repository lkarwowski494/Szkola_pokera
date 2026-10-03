import { HAND_CLASSES } from '@szkola/poker-core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import type { PaintCell } from '@/features/drills/grade';
import { space, type as tp, useTokens } from '@/theme/tokens';

const N = 13;

/**
 * Siatka 13×13 do malowania zakresu (FR-04, B-016). Dotknięcie przełącza pole, przeciągnięcie maluje
 * (pierwsze pole decyduje, czy dodajesz, czy zmazujesz). Po ocenie (`result`) pokazuje porównanie z solverem:
 * trafione, brakujące (−), nadmiarowe (+), mieszane (•).
 */
export function PaintGrid({
  painted,
  onChange,
  onActive,
  result,
}: {
  painted: readonly boolean[];
  onChange?: (next: boolean[]) => void;
  /** Wywoływane na początku i końcu malowania (np. żeby wyłączyć przewijanie ekranu). */
  onActive?: (active: boolean) => void;
  result?: readonly PaintCell[];
}) {
  const tk = useTokens();
  const [size, setSize] = useState(0);
  const interactive = !!onChange && !result;
  // stan gestu i najnowsze propsy w refie: obsługa gestu działa poza renderem, więc czyta je dopiero przy dotyku
  const gesture = useRef({ mode: true, start: { x: 0, y: 0 }, last: -1, active: false, current: [...painted], size: 0, onChange, onActive });
  useEffect(() => {
    // w trakcie przeciągania ref jest źródłem prawdy (wyprzedza propsy); nadpisanie starszym renderem gubiłoby pola
    if (!gesture.current.active) gesture.current.current = [...painted];
    Object.assign(gesture.current, { size, onChange, onActive });
  }, [painted, size, onChange, onActive]);

  const responder = useMemo(() => {
    const cellAt = (x: number, y: number) => {
      const w = gesture.current.size;
      if (w <= 0) return -1;
      const col = Math.floor((x / w) * N);
      const row = Math.floor((y / w) * N);
      if (col < 0 || col >= N || row < 0 || row >= N) return -1;
      return row * N + col;
    };
    const apply = (i: number) => {
      const s = gesture.current;
      if (i < 0 || i === s.last || !s.onChange) return;
      s.last = i;
      if (s.current[i] === s.mode) return;
      const next = [...s.current];
      next[i] = s.mode;
      s.current = next;
      s.onChange(next);
    };
    // Reguła react-hooks/refs zgłasza tu fałszywy alarm: ref jest czytany wyłącznie w obsłudze dotyku, nie w renderze.
    // eslint-disable-next-line react-hooks/refs
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const s = gesture.current;
        s.start = { x: locationX, y: locationY };
        s.last = -1;
        s.active = true;
        const i = cellAt(locationX, locationY);
        s.mode = i >= 0 ? !s.current[i] : true;
        s.onActive?.(true);
        apply(i);
      },
      onPanResponderMove: (_e, g) => apply(cellAt(gesture.current.start.x + g.dx, gesture.current.start.y + g.dy)),
      onPanResponderRelease: () => {
        gesture.current.active = false;
        gesture.current.onActive?.(false);
      },
      onPanResponderTerminate: () => {
        gesture.current.active = false;
        gesture.current.onActive?.(false);
      },
    });
  }, []);

  const toggle = (i: number) => {
    if (!onChange) return;
    const next = [...painted];
    next[i] = !next[i];
    onChange(next);
  };

  const cellStyle = (i: number) => {
    if (!result) return { backgroundColor: painted[i] ? tk.felt : tk.surface, borderColor: tk.line, borderWidth: StyleSheet.hairlineWidth };
    switch (result[i]) {
      case 'hit':
        return { backgroundColor: tk.good, borderColor: tk.line, borderWidth: StyleSheet.hairlineWidth };
      case 'miss':
        return { backgroundColor: tk.badSoft, borderColor: tk.bad, borderWidth: 2 };
      case 'extra':
        return { backgroundColor: tk.warnSoft, borderColor: tk.warn, borderWidth: 2 };
      case 'mixed':
        return { backgroundColor: painted[i] ? tk.felt : tk.feltSoft, borderColor: tk.line, borderWidth: StyleSheet.hairlineWidth };
      default:
        return { backgroundColor: tk.surface, borderColor: tk.line, borderWidth: StyleSheet.hairlineWidth };
    }
  };

  const mark = (i: number) => (result ? ({ miss: '−', extra: '+', mixed: '•' } as Record<string, string>)[result[i]!] ?? '' : '');
  const labelColor = (i: number) => {
    if (result) return result[i] === 'hit' || (result[i] === 'mixed' && painted[i]) ? tk.onFelt : tk.ink;
    return painted[i] ? tk.onFelt : tk.ink;
  };
  const a11yState = (i: number) => {
    if (!result) return painted[i] ? 'zaznaczona' : 'pas';
    return { hit: 'dobrze, grasz', miss: 'brakuje, solver gra', extra: 'nadmiarowa, solver pasuje', mixed: 'mieszana, zaliczona', none: 'dobrze, pas' }[result[i]!];
  };

  return (
    <View style={{ gap: space.s }}>
      <View
        style={[styles.grid, { borderColor: tk.line }]}
        onLayout={(e) => setSize(e.nativeEvent.layout.width)}
        {...(interactive ? responder.panHandlers : {})}
      >
        {Array.from({ length: N }, (_, row) => (
          <View key={row} style={styles.row} pointerEvents="none">
            {Array.from({ length: N }, (__, col) => {
              const i = row * N + col;
              const hc = HAND_CLASSES[i]!;
              return (
                <View
                  key={col}
                  style={[styles.cell, cellStyle(i)]}
                  accessible
                  accessibilityRole={interactive ? 'checkbox' : 'text'}
                  accessibilityLabel={`${hc}, ${a11yState(i)}`}
                  {...(interactive
                    ? { accessibilityState: { checked: !!painted[i] }, accessibilityActions: [{ name: 'activate' as const }], onAccessibilityAction: () => toggle(i) }
                    : {})}
                >
                  <Text style={[styles.label, { color: labelColor(i) }]} numberOfLines={1}>
                    {hc}
                  </Text>
                  {mark(i) ? <Text style={[styles.mark, { color: result?.[i] === 'miss' ? tk.bad : result?.[i] === 'extra' ? tk.warn : tk.muted }]}>{mark(i)}</Text> : null}
                </View>
              );
            })}
          </View>
        ))}
      </View>
      {result ? (
        <View style={styles.legend}>
          <Legend color={tk.good} label="grasz" />
          <Legend color={tk.badSoft} border={tk.bad} label="− brakuje" />
          <Legend color={tk.warnSoft} border={tk.warn} label="+ za dużo" />
          <Legend color={tk.feltSoft} label="• mieszana" />
        </View>
      ) : null}
      {!result ? <Text style={[tp.caption, { color: tk.muted }]}>Dotknij pola albo przeciągnij palcem, żeby malować.</Text> : null}
    </View>
  );
}

function Legend({ color, border, label }: { color: string; border?: string; label: string }) {
  const tk = useTokens();
  return (
    <View style={styles.legendItem}>
      <View style={[styles.swatch, { backgroundColor: color, borderColor: border ?? tk.line, borderWidth: border ? 1.5 : StyleSheet.hairlineWidth }]} />
      <Text style={[tp.caption, { color: tk.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { borderWidth: StyleSheet.hairlineWidth, aspectRatio: 1, width: '100%' },
  row: { flex: 1, flexDirection: 'row' },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  label: { fontSize: 8, fontWeight: '600' },
  mark: { position: 'absolute', top: 0, right: 1, fontSize: 8, fontWeight: '800' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: space.m, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 12, height: 12, borderRadius: 2 },
});
