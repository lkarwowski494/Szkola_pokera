import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { Linking, Text, View } from 'react-native';
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { Limit, OcenaOdpowiedzi } from '@szkola/domena';
import { cardToString, type ScenarioLevel, type VariantDecision } from '@szkola/poker-core';
import { formatujProcent } from '@szkola/jezyki';
import { PasekStrategii } from '@/components/PasekStrategii';
import { Button, Muted, Screen, Title } from '@/components/ui';
import { jezykZadan } from '@/features/drills/text';
import { useAnnounce } from '@/features/dostepnosc/announce';
import { ZglosBlad } from '@/features/opinie/Opinie';
import { godzinaWStrefie } from '@/features/start/EkranStartu';
import { nazwaPozycji } from '@/features/stol/uklad';
import { ADRES_KONTAKTOWY } from '@/platform/adresy';
import { odstep, styl, useTokens } from '@/theme/tokens';
import type { SesjaScenariusza } from './aktywnoscScenariusza';
import { BlokDlaczego, Dziennik, PasekOcenAkcji, Rozwijany, StolRozdania, Werdykt, WyborPoziomuUI, type WpisDziennika } from './komponenty';
import type { WyborPoziomu } from './poziom';
import { akcjePunktu, bloki, kwotaAkcji, ocenyAkcji, poprawnaAkcja, przebiegWariantu, widokDecyzji, type Akcja } from './wariant';

type TFn = (k: string, o?: Record<string, unknown>) => string;
const POZYCJE_6MAX = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
const pozycjaTekst = (p: string, t: TFn): string => ((POZYCJE_6MAX as readonly string[]).includes(p) ? nazwaPozycji(p as (typeof POZYCJE_6MAX)[number], t) : p);
const ULICE = ['preflop', 'flop', 'turn', 'river'] as const;

const wielka = (x: string): string => x.charAt(0).toLocaleUpperCase() + x.slice(1);
/**
 * Nazwa akcji z kwotą w bb (jednostka bb); nazwy i terminy z istniejących kluczy `play.*` (wspólne z trybem gry), bez nowych tekstów (CN D-783):
 * pas, czekanie, sprawdzenie, przebicie do N bb, limp jako dopłata do dużego blinda, c-bet mały i duży z `play.report.detail.cbetPlans`.
 * Brakujące teksty (nazwy rozmiarów, zapis kwoty c-betu) do roli 04.
 */
export const nazwaAkcji = (a: Akcja, t: TFn, bb: number | null): string => {
  switch (a) {
    case 'fold': return t('play.fold');
    case 'check': return t('play.check');
    case 'call':
    case 'limp': return t('play.call', { bb: bb ?? 0 });
    case 'bet-small': return wielka(t('play.report.detail.cbetPlans.small'));
    case 'bet-big': return wielka(t('play.report.detail.cbetPlans.big'));
    case 'raise':
    case 'raise-small':
    case 'raise-big': return t('play.raise', { bb: bb ?? 0 });
  }
};

// ---------- Start ----------
export type LimitEkranuScenariusza = { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };
export interface PropsStartuScenariusza {
  szablon: ScenarioTemplate;
  tytulModulu: string;
  wybor: WyborPoziomu;
  /** Poziom, na którym wariant wystartuje (po wyborze automatu albo ręcznym i po zastąpieniu brakującego poziomu). */
  poziom: ScenarioLevel;
  zastapiony: boolean;
  limit: Limit;
  strefa: string;
  onWybierz(w: WyborPoziomu): void;
  onStart(): void;
  onLimitWyczerpany(): void;
  onWroc(): void;
}

export function StartScenariusza(p: PropsStartuScenariusza): React.JSX.Element {
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const wyczerpany = !p.limit.bezLimitu && p.limit.pozostalo <= 0;
  const poziomy: WyborPoziomu[] = ['auto', ...p.szablon.levels];
  const nazwaPoz = (l: ScenarioLevel) => t(`scenario.level.${l}`).toLowerCase();
  const stan =
    p.wybor === 'auto'
      ? t('scenario.start.nowAuto', { poziom: nazwaPoz(p.poziom) })
      : p.zastapiony
        ? t('scenario.start.missing', { wybrany: nazwaPoz(p.wybor), poziom: nazwaPoz(p.poziom) })
        : t('scenario.start.nowManual', { poziom: nazwaPoz(p.poziom) });
  return (
    <Screen>
      <View style={{ gap: odstep.s }}>
        <Button variant="ghost" label={t('scenario.nav.back')} onPress={p.onWroc} style={{ alignSelf: 'flex-start', minHeight: 44 }} />
        <Muted>{p.tytulModulu}</Muted>
        <Title>{p.szablon.situation}</Title>
        <Text style={[styl.tresc, { color: tk.ink }]}>
          {t('scenario.start.about', { ty: pozycjaTekst(p.szablon.positions.hero, t), rywal: pozycjaTekst(p.szablon.positions.villain, t), bb: p.szablon.stackBb })}
        </Text>
      </View>
      <View style={{ gap: odstep.s }}>
        <Text style={[styl.drobny, { color: tk.muted, fontWeight: '600' }]}>{t('scenario.level.label')}</Text>
        <WyborPoziomuUI wybor={p.wybor} dostepne={poziomy} onWybierz={p.onWybierz} />
        <Text style={[styl.tresc, { color: tk.ink }]}>{stan}</Text>
        <Text style={[styl.przypis, { color: tk.muted }]}>{t('scenario.start.hint')}</Text>
      </View>
      {p.limit.bezLimitu ? null : (
        <View style={{ gap: odstep.s }}>
          <Text style={[styl.naglowek, { color: tk.ink }]}>{t('start.counter', { count: p.limit.pozostalo })}</Text>
          {wyczerpany ? <Text style={[styl.tresc, { color: tk.ink }]}>{t('start.renews', { godzina: godzinaWStrefie(p.limit.odnowienieMs, p.strefa, i18n.language) })}</Text> : null}
          <Text style={[styl.przypis, { color: tk.muted }]}>{t('start.alwaysFree')}</Text>
        </View>
      )}
      <View style={{ gap: odstep.m }}>
        {wyczerpany ? <Button label={t('start.fullAccess')} onPress={p.onLimitWyczerpany} /> : <Button label={t('scenario.start.begin')} onPress={p.onStart} />}
      </View>
    </Screen>
  );
}

// ---------- Przebieg ----------
export interface PropsPrzebiegu {
  sesja: SesjaScenariusza;
  /** `decyzja`: wybór akcji w decyzji `sesja.wybory.length`; `ocena`: ocena ostatniej odpowiedzi (`sesja.wybory.length - 1`). */
  faza: 'decyzja' | 'ocena';
  /** Po ocenie: czy rozdanie się kończy (pas albo ostatnia decyzja). */
  koniec: boolean;
  bladZapisu: boolean;
  onWybierz(a: Akcja): void;
  onDalej(): void;
  onZakoncz(): void;
}

/** Ruch rywala przed twoją decyzją (tekst dziennika) albo null: zakład (draw-call), all-in (icm-call), otwarcie (3-bet), czekanie (c-bet). */
function ruchRywala(s: SesjaScenariusza, d: VariantDecision, i: number, t: TFn): string | null {
  const rywal = s.szablon.positions.villain;
  if (d.point === 'draw-call') return t('play.log.bet', { pos: rywal, bb: d.bet });
  if (d.point === 'icm-call') return typeof s.szablon.stackBb === 'number' ? t('play.log.allin', { pos: rywal, bb: s.szablon.stackBb }) : null;
  if (d.point === 'cbet-case') return t('play.log.check', { pos: rywal });
  const spec = s.szablon.decisions[i];
  return d.point === 'size-spot' && spec?.kind === 'size-spot' && d.check === 'three-bet-size' && spec.openBb !== undefined ? t('play.log.raise', { pos: rywal, bb: spec.openBb }) : null;
}

/** Twoja akcja w dzienniku, klucze `play.log.*` jak w trybie gry (czas teraźniejszy trzeciej osoby). */
function reakcjaGracza(a: Akcja, pos: string, bb: number | null, t: TFn): string {
  if (a === 'fold') return t('play.log.fold', { pos });
  if (a === 'check') return t('play.log.check', { pos });
  if (a === 'call' || a === 'limp') return t('play.log.call', { pos, bb: bb ?? 0 });
  if (a === 'raise' || a === 'raise-small' || a === 'raise-big') return t('play.log.raise', { pos, bb: bb ?? 0 });
  return `${pos}: ${nazwaAkcji(a, t, bb).toLowerCase()}`;
}

/** Wiersze dziennika do decyzji `do` (włącznie): akcja rywala, karta nowej ulicy, twoja odpowiedź i jej ocena. */
function wpisyDziennika(s: SesjaScenariusza, doIndeksu: number, t: TFn, oceny: readonly OcenaOdpowiedzi[]): WpisDziennika[] {
  const wpisy: WpisDziennika[] = [];
  for (let i = 0; i <= doIndeksu; i++) {
    const d = s.wariant.points[i];
    if (!d || d.point === 'range-spot') break;
    const karta = d.point === 'draw-call' && d.street === 'turn' ? `[[${cardToString(s.wariant.board[3] as number)}]] ` : '';
    const odp = s.wybory[i];
    const rywal = ruchRywala(s, d, i, t);
    const hero = s.szablon.positions.hero;
    const reakcja = odp ? reakcjaGracza(odp, hero, kwotaAkcji(d, odp, s.szablon), t) : null;
    const tekst = [rywal, reakcja].filter((x): x is string => x !== null).join(', ');
    if (tekst === '') continue;
    wpisy.push({
      ulica: t(`scenario.street.${d.street}`),
      tekst: `${karta}${tekst}`,
      ...(oceny[i] ? { ocena: oceny[i] } : {}),
      teraz: i === doIndeksu,
    });
  }
  return wpisy;
}

/** „Liczby” (BR-OCE-001): każda liczba z przełożeniem na sens w tym samym zdaniu; rachunek z wariantu (rachunek, nie treść). */
function zdanieLiczb(s: SesjaScenariusza, i: number, t: TFn): string {
  const d = s.wariant.points[i];
  if (d?.point !== 'draw-call') return ''; // „Liczby” tylko dla linii draw-call; teksty rachunku c-betu, rozmiaru i ICM do roli 04 (CN D-785)
  const j = jezykZadan();
  const nieznane = 52 - 2 - widokDecyzji(s.wariant, i).stol.length;
  return t('scenario.numbers.line', {
    kwota: d.bet, pula: d.pot + d.bet, potrzeba: formatujProcent(d.required, j), razPotrzeba: Math.max(1, Math.round(1 / d.required)),
    outy: d.outs, nieznane, trafisz: formatujProcent(d.hit, j, { miejsca: 1 }), razTrafisz: Math.max(1, Math.round(1 / d.hit)),
  });
}

export function PrzebiegScenariusza(p: PropsPrzebiegu): React.JSX.Element {
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const { sesja: s } = p;
  const ocenaMode = p.faza === 'ocena';
  const indeks = ocenaMode ? s.wybory.length - 1 : s.wybory.length;
  const d = s.wariant.points[indeks];
  const przebieg = przebiegWariantu(s.wariant, s.wybory);
  const oceny = przebieg.ok ? przebieg.wartosc.kroki.map((k) => k.ocena) : [];
  const widok = d && d.point !== 'range-spot' ? widokDecyzji(s.wariant, indeks, s.szablon) : null;
  const wybor = ocenaMode ? s.wybory[indeks] : undefined;
  const ocenaWyboru = ocenaMode ? oceny[indeks] : undefined;
  const ulicaDecyzji = d?.street;
  const ocenyAk = ocenaMode && d ? ocenyAkcjiSesji(s, indeks) : null;
  const nastepna = s.wariant.points[indeks + 1];
  // VoiceOver: po decyzji ocena z werdyktem, przed decyzją nowy wpis rywala (ulica i jego zakład, A04-11/D-283)
  const ruch = d ? ruchRywala(s, d, Math.max(0, indeks), t) : null;
  const opisRywala = d && ulicaDecyzji ? [t(`scenario.street.${ulicaDecyzji}`), ruch].filter((x) => x).join('. ') : null;
  useAnnounce(ocenaMode && ocenaWyboru && wybor ? t('grade.announce', { ocena: t('grade.label', { slowo: t(`grade.${ocenaWyboru}`) }), opis: t('scenario.verdict.yours', { akcja: d ? nazwaAkcji(wybor, t, kwotaAkcji(d, wybor, s.szablon)) : '', lepiej: d ? nazwaAkcji(poprawnaAkcja(d), t, kwotaAkcji(d, poprawnaAkcja(d), s.szablon)) : '' }) }) : ocenaMode ? null : opisRywala);
  if (!d || !widok) return <Screen>{null}</Screen>;
  const akcje = akcjePunktu(d);
  const nazwy: Partial<Record<Akcja, string>> = Object.fromEntries(akcje.map((a) => [a, nazwaAkcji(a, t, kwotaAkcji(d, a, s.szablon))]));
  const nazwa = (a: Akcja): string => nazwy[a] ?? '';
  const najlepsza: Akcja = poprawnaAkcja(d);
  const idxUlicy = ULICE.indexOf(widok.ulica);
  const doDziennika = wpisyDziennika(s, indeks, t, ocenaMode ? oceny : oceny.slice(0, indeks));
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="ghost" label={t('scenario.nav.finish')} onPress={p.onZakoncz} style={{ minHeight: 44 }} />
        <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>{t('scenario.nav.title')}</Text>
        <Text style={[styl.drobny, { color: tk.muted, minWidth: 64, textAlign: 'right' }]}>{t(`scenario.street.${widok.ulica}`)}</Text>
      </View>
      <View accessibilityRole="list" accessibilityLabel={t('scenario.streets.label')} style={{ flexDirection: 'row', gap: odstep.s, flexWrap: 'wrap' }}>
        {ULICE.map((u, i) => (
          <Text key={u} accessibilityState={{ selected: i === idxUlicy }} style={[styl.drobny, { color: i === idxUlicy ? tk.ink : tk.muted, fontWeight: i === idxUlicy ? '700' : '400', textDecorationLine: i === idxUlicy ? 'underline' : 'none' }]}>
            {`${i < idxUlicy ? '✓ ' : ''}${t(`scenario.street.${u}`)}`}
          </Text>
        ))}
      </View>
      <StolRozdania
        stol={widok.stol}
        reka={s.wariant.hero.map(cardToString)}
        pozycjaTy={s.szablon.positions.hero}
        pozycjaRywal={s.szablon.positions.villain}
        stosBb={s.szablon.stackBb}
      />
      {widok.pulaBb !== null && widok.doSprawdzeniaBb !== null ? <Text style={[styl.tresc, { color: tk.ink }]}>{t('scenario.pot', { pula: widok.pulaBb, kwota: widok.doSprawdzeniaBb })}</Text> : null}
      <Dziennik wpisy={doDziennika} />
      {p.bladZapisu ? <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.ink }]}>{t('session.saveFailed')}</Text> : null}
      {!ocenaMode ? (
        <View style={{ gap: odstep.s }}>
          <Text style={[styl.drobny, { color: tk.muted, fontWeight: '600' }]}>{t('scenario.yourMove')}</Text>
          <PasekStrategii opcje={akcje.map((a) => ({ text: nazwa(a) }))} wybor={null} klasa="" onWybierz={(i) => { const a = akcje[i]; if (a) p.onWybierz(a); }} />
        </View>
      ) : wybor && ocenaWyboru && ocenyAk ? (
        <View style={{ gap: odstep.l }}>
          <Werdykt
            ocena={ocenaWyboru}
            zdanie={wybor === najlepsza ? t('scenario.verdict.yoursGood', { akcja: nazwa(wybor) }) : t('scenario.verdict.yours', { akcja: nazwa(wybor), lepiej: nazwa(najlepsza) })}
          />
          {bloki(s.wariant, s.szablon, indeks, wybor, t).map((b) => (
            <BlokDlaczego key={`${b.rodzaj}-${b.akcja}`} blok={b} nazwa={nazwa(b.akcja)} t={t} />
          ))}
          <PasekOcenAkcji akcje={ocenyAk} wybor={wybor} nazwy={nazwy} />
          {d.point === 'draw-call' ? (
            <Rozwijany tytul={t('scenario.numbers.title')} testID="liczby">
              <Text style={[styl.tresc, { color: tk.ink }]}>{zdanieLiczb(s, indeks, t)}</Text>
            </Rozwijany>
          ) : null}
          {ADRES_KONTAKTOWY ? (
            <ZglosBlad zadanieId={`${s.szablon.id}#${indeks + 1}`} wersjaAplikacji={Constants.expoConfig?.version ?? '?'} jezyk={i18n.language} adresKontaktowy={ADRES_KONTAKTOWY} otworzAdres={(url) => Linking.openURL(url).then(() => true)} />
          ) : null}
          <Button label={p.koniec || !nastepna ? t('scenario.next.summary') : t('scenario.next.street', { ulica: t(`scenario.street.${nastepna.street}`) })} onPress={p.onDalej} />
        </View>
      ) : null}
    </Screen>
  );
}
const ocenyAkcjiSesji = (s: SesjaScenariusza, i: number) => ocenyAkcji(s.wariant, i);

// ---------- Koniec ----------
export interface PropsKonca {
  sesja: SesjaScenariusza;
  poziom: ScenarioLevel;
  onNowe(): void;
  onPowtorz(): void;
  onZamknij(): void;
  bladStartu: 'blad' | null;
}

/** Zdanie o pokazaniu kart (RD-10): kto ma wyższy układ i jaki; bez „wygrałeś”, bez kwot. */
function zdaniePokazania(s: SesjaScenariusza, t: TFn, zwyciezca: 'gracz' | 'rywal' | 'remis'): string {
  const rywal = s.wariant.villain.map(cardToString);
  const klucz = zwyciezca === 'gracz' ? 'scenario.end.showdownYou' : zwyciezca === 'rywal' ? 'scenario.end.showdownVillain' : 'scenario.end.showdownTie';
  return t(klucz, { karty: `[[${rywal.join(' ')}]]`, river: `[[${cardToString(s.wariant.board[4] as number)}]]` });
}

export function KoniecScenariusza(p: PropsKonca): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const { sesja: s } = p;
  const przebieg = przebiegWariantu(s.wariant, s.wybory);
  const kroki = przebieg.ok ? przebieg.wartosc.kroki : [];
  const dobre = kroki.filter((k) => k.ocena === 'zgodne' || k.ocena === 'dopuszczalne').length;
  const pokaz = przebieg.ok ? przebieg.wartosc.pokazanie : null;
  return (
    <Screen>
      <Title>{t('scenario.end.title')}</Title>
      <Muted>{`${s.szablon.situation} · ${t(`scenario.level.${p.poziom}`).toLowerCase()}`}</Muted>
      <View accessibilityRole="list" style={{ gap: odstep.m }}>
        {kroki.map((k, i) => {
          const d = s.wariant.points[i];
          const wyb = s.wybory[i];
          if (!d || d.point === 'range-spot' || !wyb) return null;
          const lepiej = k.ocena !== 'zgodne' && k.ocena !== 'dopuszczalne';
          const poprawna = poprawnaAkcja(d);
          return (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: odstep.m }}>
              <View style={{ flex: 1 }}>
                <Text style={[styl.tresc, { color: tk.ink }]}>{`${t(`scenario.street.${d.street}`)}: ${nazwaAkcji(wyb, t, kwotaAkcji(d, wyb, s.szablon))}`}</Text>
                {lepiej ? <Text style={[styl.przypis, { color: tk.muted }]}>{t('scenario.end.better', { akcja: nazwaAkcji(poprawna, t, kwotaAkcji(d, poprawna, s.szablon)) })}</Text> : null}
              </View>
              <Text style={[styl.naglowek, { color: tk.ink }]}>{`${t(`grade.${k.ocena}`)}`}</Text>
            </View>
          );
        })}
        {pokaz ? <Text style={[styl.tresc, { color: tk.ink }]}>{zdaniePokazania(s, t, pokaz.zwyciezca)}</Text> : null}
      </View>
      <Text style={[styl.naglowek, { color: tk.ink }]}>{t('scenario.end.score', { dobre, wszystkie: kroki.length })}</Text>
      {p.bladStartu === 'blad' ? <Text style={[styl.tresc, { color: tk.ink }]}>{t('postep.odczytNieudany')}</Text> : null}
      <View style={{ gap: odstep.m }}>
        <Button label={t('scenario.end.newDeal')} onPress={p.onNowe} />
        <Button variant="ghost" label={t('scenario.end.again')} onPress={p.onPowtorz} />
        <Button variant="ghost" label={t('scenario.end.close')} onPress={p.onZamknij} />
      </View>
    </Screen>
  );
}
