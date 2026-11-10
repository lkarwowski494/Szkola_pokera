import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import type { DrillInstance } from '@/features/drills/types';
import { ukladRzedow } from '@/features/stol/ukladRzedow';
import { etykietaStolu, opisKart, opisReki, ukladStolu, type Miejsce, type StanMiejsca } from '@/features/stol/uklad';
import { odstep, styl, typografia, useTokens } from '@/theme/tokens';
import { CardRow } from './PlayingCard';

/**
 * Stół z góry (08 cz. 6 krok 3, D-274; design-spec „`Stol`: zależy od danych zadania”, D-119; makieta e3 `przed-decyzja`
 * i `bez-pozycji`). Z pozycją i poprawnym przebiegiem: owal z 6 miejscami (ty na dole, kolejność wskazówek zegara), twoje
 * karty na suknie, pod stołem klasa ręki i dopisek. Bez pozycji albo przy złych danych: owal bez miejsc, karty wspólne na
 * suknie, twoje przy krawędzi, opis kart tekstem. Miejsca mają stały rozmiar (rysunek), ich tekst się nie skaluje (A04-05,
 * D-283 pkt 3); informację niesie tekst pod stołem i etykieta dla czytnika (design-spec „Typografia”).
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
const PROPORCJA_OWALU = 1.7; // owal 1,7:1 (makieta e3); z układem rzędów rama dostaje jawną szerokość i wysokość, bez proporcji (Z1, E2E 42800500800)
const MIEJSCE = { w: 72, h: 40 }; // stały rysunek (design-spec: miejsca mają stały rozmiar)
const STAN_KLUCZ: Record<StanMiejsca, string> = { ty: 'table.stateHero', pas: 'table.stateFold', czeka: 'table.stateAfter', przebija: 'table.stateRaise' };

export function Stol({ table }: { table: Table }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const [szerokosc, ustawSzerokosc] = useState(0); // szerokość pola z onLayout; 0 = jeszcze nie zmierzona (proporcja 1,7:1)
  const miejsca = table.position && table.path !== undefined ? ukladStolu(table.position, table.path) : null;
  const reka = table.hand ?? [];
  const etykieta = miejsca ? etykietaStolu(miejsca, reka, t) : opisKart(table, t, { nazwy: true }); // A04-11: czytnik dostaje nazwy kart
  const tekstKart = miejsca ? '' : opisKart(table, t); // widoczny tekst pod stołem z symbolami (A04-11)
  const opis = miejsca ? opisReki(miejsca, reka, t) : null;
  // A04-04 (D-282 pkt 2): bez kart i bez miejsc nie ma czego rysować — sam tekst (pozycja), żadnej pustej grafiki
  if (!miejsca && !table.opp?.length && !table.board?.length && !reka.length) {
    return tekstKart ? <Text style={[styl.tresc, { color: tk.ink }]}>{tekstKart}</Text> : <></>;
  }
  // D-476: stół bez miejsc z kilkoma rzędami (rywal, board, gracz): wysokość owalu z liczby rzędów, karty mniejsze, gdy się nie mieszczą
  const rzedy = { opp: table.opp?.length ?? 0, board: table.board?.length ?? 0, hero: reka.length };
  const uklad = !miejsca && szerokosc > 0 ? ukladRzedow(szerokosc, rzedy) : null;
  return (
    <View style={{ gap: odstep.m }}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={etykieta}
        onLayout={(e) => ustawSzerokosc(Math.round(e.nativeEvent.layout.width))}
        style={[styles.pole, { paddingVertical: miejsca ? MIEJSCE.h / 2 : 0 }]}
      >
        <View testID="stol-rama" style={[styles.rama, { backgroundColor: tk.frame }, uklad ? { width: uklad.szerokoscRamy, height: uklad.wysokoscRamy } : { aspectRatio: PROPORCJA_OWALU }]}>
          <View style={[styles.sukno, { backgroundColor: tk.felt1, borderColor: tk.felt2 }]}>
            {miejsca ? (
              <CardRow cards={reka} size="lg" />
            ) : (
              <>
                {table.opp?.length ? (
                  <>
                    <PodpisRzedu tekst={t('table.rowOpp')} />
                    <CardRow cards={table.opp} size={uklad?.opp ?? 'md'} />
                    {table.board?.length ? <PodpisRzedu tekst={t('table.rowBoard')} /> : null}
                  </>
                ) : null}
                {table.board?.length ? <CardRow cards={table.board} size={uklad?.board ?? 'md'} /> : null}
                {reka.length ? <CardRow cards={reka} size={uklad?.hero ?? 'lg'} /> : null}
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
        <Text accessibilityLabel={etykieta} style={[styl.przypis, { color: tk.ink }]}>
          {tekstKart}
        </Text>
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
      <Text style={[styles.nazwa, { color: tk.seatInk }]} numberOfLines={1} allowFontScaling={false}>
        {m.pozycja}
      </Text>
      <Text style={[styles.stan, { color: ty ? tk.goldText : tk.seatMuted }]} numberOfLines={1} adjustsFontSizeToFit allowFontScaling={false}>
        {t(STAN_KLUCZ[m.stan])}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pole: { width: '100%', paddingHorizontal: MIEJSCE.w / 2 - odstep.s },
  rama: { borderRadius: 9999, padding: odstep.s }, // promien.owal = połowa wysokości,
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

