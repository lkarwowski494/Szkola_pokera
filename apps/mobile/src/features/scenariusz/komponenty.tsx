import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { OcenaOdpowiedzi } from '@szkola/domena';
import { CardRow } from '@/components/PlayingCard';
import { RichText } from '@/components/RichText';
import StopienOceny, { ZNAK } from '@/features/ocena/StopienOceny';
import { nazwaKarty } from '@/features/stol/uklad';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import type { Blok, RodzajBloku, UkladIcm } from './wariant';
import type { Akcja } from './wariant';
import type { WyborPoziomu } from './poziom';

/**
 * Elementy ekranu scenariusza (PR-05; makieta 04: `docs/design/ekrany/scenariusz.html`, opis `docs/design/scenariusz-i-ocena.md`,
 * D-543…D-545). Wygląd tylko z tokenów i komponentów systemu (`StopienOceny`, `CardRow`, `Stol`-owa rama i sukno, złoto
 * wyłącznie dla „ty”); nowych kolorów brak. Komponenty są prezentacyjne: dane i zapis w `EkranScenariusza` i `app/scenario.tsx`.
 */
type TFn = (k: string, o?: Record<string, unknown>) => string;

const CEL_DOTYKU = 44; // design-spec: cel dotyku ≥ 44 pt

/** Kontrolka segmentowa poziomu (radiogroup; wybór nie tylko kolorem: znak „✓” przy wybranym). */
export function WyborPoziomuUI({ wybor, dostepne, onWybierz }: { wybor: WyborPoziomu; dostepne: readonly WyborPoziomu[]; onWybierz: (w: WyborPoziomu) => void }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={t('scenario.level.group')} style={[styles.segmenty, { borderColor: tk.separator, backgroundColor: tk.surface }]}>
      {dostepne.map((w, i) => {
        const aktywny = w === wybor;
        return (
          <Pressable
            key={w}
            testID={`poziom-${w}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: aktywny }}
            onPress={() => onWybierz(w)}
            style={[styles.segment, { minHeight: CEL_DOTYKU, borderLeftWidth: i === 0 ? 0 : StyleSheet.hairlineWidth * 2, borderColor: tk.separator, backgroundColor: aktywny ? tk.primaryBg : 'transparent' }]}
          >
            <Text style={[styl.drobny, { fontWeight: aktywny ? '700' : '400', color: aktywny ? tk.primaryInk : tk.ink, textAlign: 'center' }]}>{t(`scenario.level.${w}`)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Stół z góry, jeden rywal (makieta „hu”): ty na dole ze złotą obwódką, rywal u góry, karty wspólne pośrodku, bez żetonów i kwot na stole. */
export function StolRozdania({ stol, reka, pozycjaTy, pozycjaRywal, stosBb }: { stol: readonly string[]; reka: readonly string[]; pozycjaTy: string; pozycjaRywal: string; stosBb: number }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const etykieta = t('scenario.table.label', {
    ty: pozycjaTy, rywal: pozycjaRywal, reka: reka.map((c) => nazwaKarty(c, t)).join(', '), stol: stol.map((c) => nazwaKarty(c, t)).join(', '),
  });
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={etykieta} style={[styles.rama, { backgroundColor: tk.frame }]}>
      <View style={[styles.sukno, { backgroundColor: tk.felt1, borderColor: tk.felt2 }]}>
        <View style={[styles.miejsce, { borderColor: tk.onFeltMuted }]}>
          <Text style={[styl.drobny, { color: tk.onFelt, fontWeight: '600' }]}>{t('scenario.table.seat', { pozycja: pozycjaRywal, rola: t('scenario.table.villain'), bb: stosBb })}</Text>
        </View>
        <CardRow cards={stol} size="md" />
        <CardRow cards={reka} size="lg" />
        <View style={[styles.miejsce, { borderColor: tk.gold, borderWidth: 2 }]}>
          <Text style={[styl.drobny, { color: tk.goldText, fontWeight: '700' }]}>{t('scenario.table.seat', { pozycja: pozycjaTy, rola: t('scenario.table.you'), bb: stosBb })}</Text>
        </View>
      </View>
    </View>
  );
}

export interface WpisDziennika { ulica: string; tekst: string; ocena?: OcenaOdpowiedzi; teraz?: boolean }
/** Dziennik akcji: jeden wiersz na ulicę, ocena jako znak + słowo (nie sam kolor). Nowy wpis ogłasza `useAnnounce` w ekranie (strażnik D-283: ogłoszenia tylko przez pomocnik). */
export function Dziennik({ wpisy }: { wpisy: readonly WpisDziennika[] }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <View accessibilityRole="list" accessibilityLabel={t('scenario.log.label')} style={{ gap: odstep.s }}>
      {wpisy.map((w) => (
        <View key={w.ulica} accessibilityRole="none" style={[styles.wiersz, { borderColor: tk.separator }]}>
          <Text style={[styl.drobny, { color: tk.muted, fontWeight: '700', width: 64 }]}>{w.ulica}</Text>
          <View style={{ flex: 1 }}>
            <RichText text={w.tekst} style={styl.drobny} />
          </View>
          {w.ocena ? <Text style={[styl.drobny, { color: tk.ink, fontWeight: '700' }]}>{`${ZNAK[w.ocena]} ${t(`grade.${w.ocena}`)}`}</Text> : null}
        </View>
      ))}
    </View>
  );
}

/** Pasek ocen akcji po decyzji: słowo stopnia przy każdej akcji, twój wybór w złotej obwódce z dopiskiem; bez procentów (D-544). */
export function PasekOcenAkcji({ akcje, wybor, nazwy }: { akcje: Readonly<Partial<Record<Akcja, OcenaOdpowiedzi>>>; wybor: Akcja; nazwy: Readonly<Partial<Record<Akcja, string>>> }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const wpisy = (Object.keys(nazwy) as Akcja[]).flatMap((a) => { const o = akcje[a]; return o ? [{ a, o }] : []; });
  const lista = wpisy.map(({ a, o }) => `${nazwy[a]} ${t(`grade.${o}`).toLowerCase()}${a === wybor ? `, ${t('scenario.scale.yourChoice')}` : ''}`).join(', ');
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={t('scenario.scale.label', { lista })} style={styles.pasekOcen}>
      {wpisy.map(({ a, o }) => (
        <View key={a} style={[styles.segmentOceny, { borderColor: a === wybor ? tk.gold : tk.separator, borderWidth: a === wybor ? 2 : 1, backgroundColor: tk.surface }]}>
          <Text style={[styl.naglowek, { color: tk.ink, textAlign: 'center' }]}>{nazwy[a]}</Text>
          <Text style={[styl.drobny, { color: tk.ink, textAlign: 'center' }]}>{`${ZNAK[o]} ${t(`grade.${o}`)}`}</Text>
          {a === wybor ? <Text style={[styl.drobny, { color: tk.goldOnBg, fontWeight: '700', textAlign: 'center' }]}>{t('scenario.scale.yourChoice')}</Text> : null}
        </View>
      ))}
    </View>
  );
}

/** Wiersz rozwijany („Liczby”, „Dlaczego nie …”): domyślnie zwinięty, stan dla czytnika w `accessibilityState.expanded`. */
export function Rozwijany({ tytul, children, testID }: { tytul: string; children: ReactNode; testID?: string }): React.JSX.Element {
  const tk = useTokens();
  const [otwarty, ustaw] = useState(false);
  return (
    <View style={{ gap: odstep.s }}>
      <Pressable testID={testID} accessibilityRole="button" accessibilityState={{ expanded: otwarty }} onPress={() => ustaw((o) => !o)} style={[styles.rozwin, { borderColor: tk.separator, minHeight: CEL_DOTYKU }]}>
        <Text style={[styl.naglowek, { color: tk.ink, flex: 1 }]}>{tytul}</Text>
        <Text accessibilityElementsHidden importantForAccessibility="no" style={[styl.naglowek, { color: tk.muted }]}>{otwarty ? '⌃' : '⌄'}</Text>
      </Pressable>
      {otwarty ? children : null}
    </View>
  );
}

// ---------- Punkt ICM (D-889, docs/design/design-spec.md „Scenariusz: punkt ICM”) ----------
/** Od tej skali tekstu (iOS: AX5 ≈ 3,1; wartość spoza spec: DA podaje „przy AX5”, próg ustawiony między AX3 a AX5) pasek stosu znika, a wartość schodzi pod nazwę; liczba niesie tę samą informację (D-987). */
const SKALA_BEZ_PASKA = 2.5;

export interface MiejsceIcm { nazwa: string; stan: string; rola: 'ty' | 'rywal' | 'inny' }
/**
 * Stół 3–4 miejsc bez stosów na rysunku (przy 4 miejscach na 320 pt liczby by się nie mieściły, a w rysunku nie skalują się z tekstem): ty = BB na dole,
 * dalej zgodnie z ruchem wskazówek zegara gracze spoza pary, rywal (SB) po prawej; twoje karty na środku sukna. Etykieta dla czytnika z ekranu.
 */
export function StolIcm({ reka, etykieta, ty, rywal, inni }: { reka: readonly string[]; etykieta: string; ty: MiejsceIcm; rywal: MiejsceIcm; inni: readonly MiejsceIcm[] }): React.JSX.Element {
  const tk = useTokens();
  const miejsce = (m: MiejsceIcm) => (
    <View key={`${m.rola}-${m.nazwa}`} style={[styles.miejsce, m.rola === 'ty' ? { borderColor: tk.gold, borderWidth: 2 } : m.rola === 'rywal' ? { borderColor: tk.onFelt, borderWidth: 2 } : { borderColor: tk.onFeltMuted }]}>
      <Text style={[styl.drobny, { color: m.rola === 'ty' ? tk.goldText : tk.onFelt, fontWeight: '700', textAlign: 'center' }]}>{m.nazwa}</Text>
      <Text style={[styl.przypis, { color: m.rola === 'ty' ? tk.goldText : tk.onFeltMuted, textAlign: 'center' }]}>{m.stan}</Text>
    </View>
  );
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={etykieta} style={[styles.rama, { backgroundColor: tk.frame }]}>
      <View style={[styles.sukno, { backgroundColor: tk.felt1, borderColor: tk.felt2 }]}>
        <View style={styles.rzadMiejsc}>{[...inni, rywal].map(miejsce)}</View>
        <CardRow cards={reka} size="lg" />
        {miejsce(ty)}
      </View>
    </View>
  );
}

export interface PropsTurniejuIcm {
  uklad: UkladIcm;
  /** Pozycje z szablonu (skróty: BB, SB). */
  pozycjaTy: string;
  pozycjaRywal: string;
  /** Zapis liczby w języku zadań (z jednym miejscem po przecinku, bez końcowego zera). */
  formatBb(bb: number): string;
  formatProcent(u: number): string;
  /** Z nagłówkiem bańki (ekran decyzji) albo bez (po rozwinięciu w ocenie: sam wiersz „Stosy i nagrody” jest tytułem). */
  naglowek: boolean;
}
/** Turniej: nagłówek bańki, nagrody jednym zdaniem w % puli nagród i lista „Stosy na początku rozdania” z paskiem stosu względem największego. */
export function TurniejIcm({ uklad, pozycjaTy, pozycjaRywal, formatBb, formatProcent, naglowek }: PropsTurniejuIcm): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const { fontScale } = useWindowDimensions();
  const pasek = fontScale < SKALA_BEZ_PASKA;
  const miejsca = uklad.wyplaty.map((w, i) => t('scenario.icm.place', { n: i + 1, procent: formatProcent(w) })).join(', ');
  const brak = t(uklad.liczbaGraczy === 3 ? 'scenario.icm.noPrizeThird' : 'scenario.icm.noPrizeFourth');
  return (
    <View style={{ gap: odstep.s }}>
      {naglowek ? <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>{t('scenario.icm.bubble', { platne: uklad.wyplaty.length, gracze: uklad.liczbaGraczy })}</Text> : null}
      <Text style={[styl.przypis, { color: tk.muted }]}>{t('scenario.icm.prizes', { lista: miejsca, brak })}</Text>
      <View accessibilityRole="list" accessibilityLabel={t('scenario.icm.stacksLabel')} style={{ gap: odstep.xs }}>
        {uklad.wiersze.map((w) => {
          const poz = w.rola === 'ty' ? pozycjaTy : w.rola === 'rywal' ? pozycjaRywal : null;
          const kto = w.rola === 'ty' ? t('scenario.icm.you', { pozycja: poz }) : w.rola === 'rywal' ? t('scenario.icm.rival', { pozycja: poz }) : t('drill.icm.player', { letter: w.litera });
          const wartosc = t('scenario.icm.stackValue', { bb: formatBb(w.stosBb) });
          return (
            <View key={`${w.rola}-${w.litera ?? ''}`} testID="stos-wiersz" accessible accessibilityLabel={t('scenario.icm.rowLabel', { kto, wartosc })} style={[styles.wierszStosu, { borderColor: tk.separator, minHeight: CEL_DOTYKU }]}>
              <Text style={[styl.tresc, { color: tk.ink, flexShrink: 1 }]}>{kto}</Text>
              {pasek ? (
                <View testID="pasek-stosu" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.torStosu, { backgroundColor: tk.separator }]}>
                  <View style={{ width: `${Math.round(w.udzial * 100)}%`, height: 8, borderRadius: 4, backgroundColor: w.rola === 'ty' ? tk.goldOnBg : tk.muted }} />
                </View>
              ) : null}
              <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600', fontVariant: ['tabular-nums'], textAlign: 'right' }]}>{wartosc}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const TYTUL_BLOKU: Record<RodzajBloku, string> = { slabsza: 'scenario.why.weaker', lepsza: 'scenario.why.better', dobrze: 'scenario.why.good', dlaczego_nie: 'scenario.why.whyNot' };

/** Blok „dlaczego” (BR-OCE-002): zdanie sytuacji na pierwszym planie (tekst z wariantu), potem „grasz …, bo …”. */
export function BlokDlaczego({ blok, nazwa, t }: { blok: Blok; nazwa: string; t: TFn }): React.JSX.Element {
  const tk = useTokens();
  const tresc = <RichText text={blok.tekst} style={styl.tresc} />;
  if (blok.rodzaj === 'dlaczego_nie') return <Rozwijany tytul={t(TYTUL_BLOKU[blok.rodzaj], { akcja: nazwa })} testID="dlaczego-nie">{tresc}</Rozwijany>;
  return (
    <View style={{ gap: odstep.s }}>
      <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>{t(TYTUL_BLOKU[blok.rodzaj], { akcja: nazwa })}</Text>
      {tresc}
    </View>
  );
}

/** Werdykt na suknie (D-544): znak + słowo stopnia i zdanie „Twój wybór …”. */
export function Werdykt({ ocena, zdanie }: { ocena: OcenaOdpowiedzi; zdanie: string }): React.JSX.Element {
  const tk = useTokens();
  return (
    <View style={[styles.rama, { backgroundColor: tk.frame }]}>
      <View style={[styles.sukno, { backgroundColor: tk.felt1, borderColor: tk.felt2, alignItems: 'flex-start', gap: odstep.s }]}>
        <StopienOceny ocena={ocena} naSuknie />
        <Text style={[styl.tresc, { color: tk.onFelt }]}>{zdanie}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  segmenty: { flexDirection: 'row', borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: promien.przycisk, overflow: 'hidden' },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: odstep.s },
  rama: { borderRadius: promien.rama, padding: odstep.m },
  sukno: { borderRadius: promien.sukno, borderWidth: StyleSheet.hairlineWidth * 2, padding: odstep.l, gap: odstep.m, alignItems: 'center' },
  miejsce: { borderWidth: 1, borderRadius: 999, paddingHorizontal: odstep.m, paddingVertical: odstep.xs },
  wiersz: { flexDirection: 'row', alignItems: 'flex-start', gap: odstep.s, borderBottomWidth: StyleSheet.hairlineWidth * 2, paddingBottom: odstep.s },
  pasekOcen: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.s },
  segmentOceny: { flexGrow: 1, flexBasis: 96, borderRadius: promien.przycisk, padding: odstep.m, gap: odstep.xs },
  rzadMiejsc: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: odstep.s },
  wierszStosu: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, borderBottomWidth: StyleSheet.hairlineWidth * 2, paddingVertical: odstep.xs },
  torStosu: { flex: 1, height: 8, borderRadius: 4, minWidth: 48, overflow: 'hidden' },
  rozwin: { flexDirection: 'row', alignItems: 'center', borderTopWidth: StyleSheet.hairlineWidth * 2, paddingVertical: odstep.s },
});
