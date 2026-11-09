import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import type { DrillInstance } from '@/features/drills/types';
import { etykietaStolu, opisKart, opisReki, ukladStolu, type Miejsce, type StanMiejsca } from '@/features/stol/uklad';
import { odstep, styl, typografia, useTokens } from '@/theme/tokens';
import { CardRow } from './PlayingCard';

/**
 * Stół z góry (08 cz. 6 krok 3, D-274; design-spec „`Stol`: zależy od danych zadania”, D-119; makieta e3 `przed-decyzja`
 * i `bez-pozycji`). Z pozycją i poprawnym przebiegiem: owal z 6 miejscami (ty na dole, kolejność wskazówek zegara), twoje
 * karty na suknie, pod stołem klasa ręki i dopisek. Bez pozycji albo przy złych danych: owal bez miejsc, karty wspólne na
 * suknie, twoje przy krawędzi, opis kart tekstem. Miejsca mają stały rozmiar (rysunek); informację niesie też tekst pod
 * stołem i etykieta dla czytnika (design-spec „Typografia”).
 */
type Table = NonNullable<DrillInstance['table']>;

/** Sloty miejsc w % (x, y) jak w makiecie e3: 0 = dół (ty), dalej zgodnie z ruchem wskazówek zegara. */
const SLOTY: readonly (readonly [number, number])[] = [
  [50, 100],
  [9, 78],
  [9, 22],
  [50, 0],
  [91, 22],
  [91, 78],
];
const MIEJSCE = { w: 72, h: 40 }; // stały rysunek (design-spec: miejsca mają stały rozmiar)
const STAN_KLUCZ: Record<StanMiejsca, string> = { ty: 'table.stateHero', pas: 'table.stateFold', czeka: 'table.stateAfter', przebija: 'table.stateRaise' };

export function Stol({ table }: { table: Table }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const miejsca = table.position && table.path !== undefined ? ukladStolu(table.position, table.path) : null;
  const reka = table.hand ?? [];
  const etykieta = miejsca ? etykietaStolu(miejsca, reka, t) : opisKart(table, t);
  const opis = miejsca ? opisReki(miejsca, reka, t) : null;
  return (
    <View style={{ gap: odstep.m }}>
      <View accessible accessibilityRole="image" accessibilityLabel={etykieta} style={[styles.pole, { paddingVertical: miejsca ? MIEJSCE.h / 2 : 0 }]}>
        <View style={[styles.rama, { backgroundColor: tk.frame }]}>
          <View style={[styles.sukno, { backgroundColor: tk.felt1, borderColor: tk.felt2 }]}>
            {miejsca ? (
              <CardRow cards={reka} size="lg" />
            ) : (
              <>
                {table.opp?.length ? (
                  <>
                    <PodpisRzedu tekst={t('table.rowOpp')} />
                    <CardRow cards={table.opp} size="md" />
                    {table.board?.length ? <PodpisRzedu tekst={t('table.rowBoard')} /> : null}
                  </>
                ) : null}
                {table.board?.length ? <CardRow cards={table.board} size="md" /> : null}
                {reka.length ? <CardRow cards={reka} size="lg" /> : null}
              </>
            )}
          </View>
        </View>
        {miejsca?.map((m) => <Siedzenie key={m.pozycja} m={m} />)}
      </View>
      {opis ? (
        <View style={{ gap: odstep.xs }}>
          <Text style={[styl.tytul, { color: tk.ink }]}>{opis.klasa}</Text>
          <Text style={[styl.przypis, { color: tk.muted }]}>{opis.dopisek}</Text>
        </View>
      ) : (
        <Text style={[styl.przypis, { color: tk.ink }]}>{etykieta}</Text>
      )}
    </View>
  );
}

/** Podpis rzędu kart na suknie przy kartach rywala (A04-01, D-282 pkt 1): rywal i karty wspólne mają ten sam rozmiar. */
function PodpisRzedu({ tekst }: { tekst: string }): React.JSX.Element {
  const tk = useTokens();
  return (
    <Text style={[styl.przypis, { color: tk.onFelt }]} allowFontScaling={false}>
      {tekst}
    </Text>
  );
}

function Siedzenie({ m }: { m: Miejsce }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const [x, y] = SLOTY[m.slot] ?? [50, 50];
  const ty = m.stan === 'ty';
  return (
    <View
      testID={`miejsce-${m.pozycja}`}
      accessibilityValue={{ text: m.stan }}
      style={[
        styles.miejsce,
        {
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: tk.seat,
          borderColor: ty ? tk.gold : tk.seatEdge,
          borderWidth: ty ? 2.5 : 1,
          borderStyle: m.stan === 'pas' ? 'dashed' : 'solid',
        },
      ]}
    >
      <Text style={[styles.nazwa, { color: tk.seatInk }]} numberOfLines={1}>
        {m.pozycja}
      </Text>
      <Text style={[styles.stan, { color: ty ? tk.goldText : tk.seatMuted }]} numberOfLines={1} adjustsFontSizeToFit>
        {t(STAN_KLUCZ[m.stan])}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pole: { width: '100%', paddingHorizontal: MIEJSCE.w / 2 - odstep.s },
  rama: { aspectRatio: 1.7, borderRadius: 9999, padding: odstep.s }, // promien.owal = połowa wysokości,
  sukno: { flex: 1, borderRadius: 9999, borderWidth: 2, alignItems: 'center', justifyContent: 'center', gap: odstep.s, padding: odstep.l },
  miejsce: {
    position: 'absolute',
    width: MIEJSCE.w,
    height: MIEJSCE.h,
    marginLeft: -MIEJSCE.w / 2,
    marginTop: -MIEJSCE.h / 2,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: odstep.s,
  },
  nazwa: { fontSize: typografia.skala.miejsce.size, lineHeight: typografia.skala.miejsce.line, fontWeight: '600' },
  stan: { fontSize: typografia.skala.miejsceStan.size, lineHeight: typografia.skala.miejsceStan.line },
});

