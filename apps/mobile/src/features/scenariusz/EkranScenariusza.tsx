import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { Linking, Text, View } from 'react-native';
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { Limit, OcenaOdpowiedzi } from '@szkola/domena';
import { cardToString, type ScenarioLevel } from '@szkola/poker-core';
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
import { AKCJE, bloki, ocenyAkcji, przebiegWariantu, widokDecyzji, type Akcja } from './wariant';

type TFn = (k: string, o?: Record<string, unknown>) => string;
const POZYCJE_6MAX = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
const pozycjaTekst = (p: string, t: TFn): string => ((POZYCJE_6MAX as readonly string[]).includes(p) ? nazwaPozycji(p as (typeof POZYCJE_6MAX)[number], t) : p);
const ULICE = ['preflop', 'flop', 'turn', 'river'] as const;

/** Nazwa akcji z kwotą do sprawdzenia w bb (jednostka bb); nazwy i terminy z istniejących kluczy `play.*` (wspólne z trybem gry). */
export const nazwaAkcji = (a: Akcja, t: TFn, bb: number): string => (a === 'call' ? t('play.call', { bb }) : t('play.fold'));

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

/** Wiersze dziennika do decyzji `do` (włącznie): akcja rywala, karta nowej ulicy, twoja odpowiedź i jej ocena. */
function wpisyDziennika(s: SesjaScenariusza, doIndeksu: number, t: TFn, oceny: readonly OcenaOdpowiedzi[]): WpisDziennika[] {
  const wpisy: WpisDziennika[] = [];
  for (let i = 0; i <= doIndeksu; i++) {
    const d = s.wariant.decisions[i];
    const w = widokDecyzji(s.wariant, i);
    if (!d) break;
    const karta = d.street === 'turn' ? `[[${cardToString(s.wariant.board[3] as number)}]] ` : '';
    const odp = s.wybory[i];
    const reakcja = odp ? `, ${odp === 'call' ? t('play.log.call', { pos: s.szablon.positions.hero, bb: w.doSprawdzeniaBb }) : t('play.log.fold', { pos: s.szablon.positions.hero })}` : '';
    wpisy.push({
      ulica: t(`scenario.street.${d.street}`),
      tekst: `${karta}${t('play.log.bet', { pos: s.szablon.positions.villain, bb: w.doSprawdzeniaBb })}${reakcja}`,
      ...(oceny[i] ? { ocena: oceny[i] } : {}),
      teraz: i === doIndeksu,
    });
  }
  return wpisy;
}

/** „Liczby” (BR-OCE-001): każda liczba z przełożeniem na sens w tym samym zdaniu; rachunek z wariantu (rachunek, nie treść). */
function zdanieLiczb(s: SesjaScenariusza, i: number, t: TFn): string {
  const d = s.wariant.decisions[i];
  if (!d) return '';
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
  const d = s.wariant.decisions[indeks];
  const przebieg = przebiegWariantu(s.wariant, s.wybory);
  const oceny = przebieg.ok ? przebieg.wartosc.kroki.map((k) => k.ocena) : [];
  const widok = d ? widokDecyzji(s.wariant, indeks) : null;
  const wybor = ocenaMode ? s.wybory[indeks] : undefined;
  const ocenaWyboru = ocenaMode ? oceny[indeks] : undefined;
  const ulicaDecyzji = d?.street;
  const ocenyAk = ocenaMode && d ? ocenyAkcjiSesji(s, indeks) : null;
  const nastepna = s.wariant.decisions[indeks + 1];
  // VoiceOver: po decyzji ocena z werdyktem, przed decyzją nowy wpis rywala (ulica i jego zakład, A04-11/D-283)
  const opisRywala = d && ulicaDecyzji ? `${t(`scenario.street.${ulicaDecyzji}`)}. ${t('play.log.bet', { pos: s.szablon.positions.villain, bb: d.bet })}` : null;
  useAnnounce(ocenaMode && ocenaWyboru && wybor ? t('grade.announce', { ocena: t('grade.label', { slowo: t(`grade.${ocenaWyboru}`) }), opis: t('scenario.verdict.yours', { akcja: nazwaAkcji(wybor, t, d?.bet ?? 0), lepiej: d ? nazwaAkcji(d.correct, t, d.bet) : '' }) }) : ocenaMode ? null : opisRywala);
  if (!d || !widok) return <Screen>{null}</Screen>;
  const bb = widok.doSprawdzeniaBb;
  const nazwy: Record<Akcja, string> = { fold: nazwaAkcji('fold', t, bb), call: nazwaAkcji('call', t, bb) };
  const najlepsza: Akcja = d.correct;
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
      <Text style={[styl.tresc, { color: tk.ink }]}>{t('scenario.pot', { pula: widok.pulaBb, kwota: widok.doSprawdzeniaBb })}</Text>
      <Dziennik wpisy={doDziennika} />
      {p.bladZapisu ? <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.ink }]}>{t('session.saveFailed')}</Text> : null}
      {!ocenaMode ? (
        <View style={{ gap: odstep.s }}>
          <Text style={[styl.drobny, { color: tk.muted, fontWeight: '600' }]}>{t('scenario.yourMove')}</Text>
          <PasekStrategii opcje={AKCJE.map((a) => ({ text: nazwy[a] }))} wybor={null} klasa="" onWybierz={(i) => { const a = AKCJE[i]; if (a) p.onWybierz(a); }} />
        </View>
      ) : wybor && ocenaWyboru && ocenyAk ? (
        <View style={{ gap: odstep.l }}>
          <Werdykt
            ocena={ocenaWyboru}
            zdanie={wybor === najlepsza ? t('scenario.verdict.yoursGood', { akcja: nazwy[wybor] }) : t('scenario.verdict.yours', { akcja: nazwy[wybor], lepiej: nazwy[najlepsza] })}
          />
          {bloki(s.wariant, s.szablon, indeks, wybor, t).map((b) => (
            <BlokDlaczego key={`${b.rodzaj}-${b.akcja}`} blok={b} nazwa={nazwy[b.akcja]} t={t} />
          ))}
          <PasekOcenAkcji akcje={ocenyAk} wybor={wybor} nazwy={nazwy} />
          <Rozwijany tytul={t('scenario.numbers.title')} testID="liczby">
            <Text style={[styl.tresc, { color: tk.ink }]}>{zdanieLiczb(s, indeks, t)}</Text>
          </Rozwijany>
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
          const d = s.wariant.decisions[i];
          const wyb = s.wybory[i];
          if (!d || !wyb) return null;
          const lepiej = k.ocena !== 'zgodne' && k.ocena !== 'dopuszczalne';
          return (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: odstep.m }}>
              <View style={{ flex: 1 }}>
                <Text style={[styl.tresc, { color: tk.ink }]}>{`${t(`scenario.street.${d.street}`)}: ${nazwaAkcji(wyb, t, d.bet)}`}</Text>
                {lepiej ? <Text style={[styl.przypis, { color: tk.muted }]}>{t('scenario.end.better', { akcja: nazwaAkcji(d.correct, t, d.bet) })}</Text> : null}
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
