import { createRng } from '@szkola/poker-core';
import { dzienLokalny, type Limit } from '@szkola/domena';
import { odczytajKarty, porzucAktywnosc, wynikiTestow, zadaniaZTestow } from '@szkola/postep';
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, StyleSheet, Text, TextInput, View, type HostInstance, type ScrollViewInstance } from 'react-native';
import { PaintGrid } from '@/components/PaintGrid';
import { RichText } from '@/components/RichText';
import { useAnnounce, useNoweZadanie } from '@/features/dostepnosc/announce';
import { Stol } from '@/components/Stol';
import { Button, Muted, ProgressBar, Screen, Title } from '@/components/ui';
import {
  getAllRangeSpots,
  getDrillById,
  getDrillsBeforeModule,
  getDrillsForFamilies,
  getExamDrills,
  getExamDrillsBeforeModule,
  getLessonDrills,
  getLessonSummaries,
  getModuleDrills,
  getModules,
  getSeenExamDrillsForFamilies,
} from '@/data/content/repo';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { gradeAnswer, isPass, parseNumberInput, scorePaint } from '@/features/drills/grade';
import { pct, t as dt } from '@/features/drills/text';
import { EXAM_PASS, PAINT_PASS } from '@/features/drills/thresholds';
import type { ChoiceInstance, DrillAnswer, DrillInstance, GradeResult, NumericInstance, PaintInstance, TextureInstance } from '@/features/drills/types';
import { odpowiedzWSesji, otworzSesje, type PowodSesji, type RodzajSesji, type Sesja } from '@/features/session/aktywnoscSesji';
import { buildExamSession, buildFamilySession, buildLessonSession, buildPracticeSession, type SessionMode } from '@/features/session/build';
import { lekcjeDoCwiczen } from '@/features/dzis/widok';
import { ZNAK } from '@/features/ocena/StopienOceny';
import { PanelDecyzji } from '@/features/stol/PanelDecyzji';
import { maStrategie } from '@/features/stol/pasek';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import EkranStartu from '@/features/start/EkranStartu';
import { przygotujStart } from '@/features/start/wejscieStartu';
import EkranZakupu from '@/features/zakup/EkranZakupu';
import { poprosOOceneGdyPora } from '@/features/opinie/prosbaOOcene';
import { ADRES_KONTAKTOWY, ADRES_PRYWATNOSCI, ADRES_WARUNKOW } from '@/platform/adresy';
import { ZglosBlad } from '@/features/opinie/Opinie';
import { ocenaExpo } from '@/platform/opinie';
import { sklepAplikacji } from '@/platform/zakupy';
import { haptykaOceny, wykonajHaptyke } from '@/features/session/haptyka';
import { odswiezDostep, useDostep } from '@/state/dostep';
import { zapiszBlad } from '@/platform/dziennik';
import { zegarTelefonu } from '@/platform/zegar';
import { useSettings } from '@/state/settings';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

interface Record_ {
  item: DrillInstance;
  answer: DrillAnswer;
  grade: GradeResult;
  elapsedMs: number;
}

const emptyGrid = () => Array.from({ length: 169 }, () => false);
const RODZAJ: Record<SessionMode, RodzajSesji> = { lesson: 'lekcja', review: 'powtorki', exam: 'test_modulu', practice: 'sesja' };
const noweId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
type Stan =
  | { stan: 'ladowanie' }
  | { stan: 'pusta' }
  | { stan: 'blad' }
  | { stan: 'start'; limit: Limit; zalegle: number } // ekran startu z licznikiem dnia (BR-LIM-001)
  | { stan: 'zakup' } // stan przepływu przy wyczerpanym limicie (BR-LIM-001, moduly.md „— start / limit wyczerpany”)
  | { stan: 'gotowa'; sesja: Sesja };

/**
 * Sesja zadań jako aktywność (ADR 0010, część 5): wejście wznawia aktywność w toku (te same zadania, D-248) albo zaczyna nową;
 * każda odpowiedź zapisana przed pokazaniem oceny; błąd zapisu → komunikat, odpowiedź do ponowienia (tlo-i-bledy.md §4).
 * Limit dnia (cz. 5b krok 4, ADR 0007): wznowienie od razu; lekcja i pierwszy test bez ekranu startu; sesja ćwiczeń,
 * powtórki i test powtórny przez `EkranStartu` z licznikiem; wyczerpany limit → `EkranZakupu` jako stan przepływu.
 * „Zakończ” porzuca aktywność w toku (moduly.md `porzuc`); odpowiedzi zostają zapisane.
 */
export default function SessionScreen() {
  const { mode = 'lesson', lessonId, moduleId } = useLocalSearchParams<{ mode?: SessionMode; lessonId?: string; moduleId?: string }>();
  const db = useBazaTresci();
  const port = usePortPostepu();
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const haptics = useSettings((s) => s.haptics);
  const pro = useDostep((s) => s.pro);
  const exam = mode === 'exam';
  const trescId = mode === 'lesson' ? (lessonId ?? null) : mode === 'exam' ? (moduleId ?? null) : null;

  const otworz = useCallback(async (limit: Limit): Promise<Stan> => {
    const [seenW, kartyW, testyW, faktyW] = await Promise.all([zadaniaZTestow(port), odczytajKarty(port), wynikiTestow(port), czytajFaktyKursu(port)]);
    if (!seenW.ok || !kartyW.ok || !testyW.ok || !faktyW.ok) return { stan: 'blad' };
    const seen = new Set(seenW.wartosc);
    const teraz = Date.now();
    const ranges = getAllRangeSpots(db);
    const ctx = { range: (id: string) => ranges.get(id) };
    const buduj = (): DrillInstance[] => {
      const rng = createRng(teraz & 0x7fffffff);
      if (mode === 'lesson' && lessonId) return buildLessonSession(getLessonDrills(db, lessonId), rng, ctx);
      if (mode === 'practice') {
        // sesja ćwiczeń (PR-03, D-260): lekcje ukończone i następna na ścieżce
        const lekcje = lekcjeDoCwiczen(getModules(db), getLessonSummaries(db), faktyW.wartosc);
        return buildPracticeSession(lekcje.flatMap((id) => getLessonDrills(db, id)), rng, ctx);
      }
      if (mode === 'exam' && moduleId) {
        const src = {
          modulePool: getExamDrills(db, moduleId),
          moduleLessons: getModuleDrills(db, moduleId),
          earlierPool: getExamDrillsBeforeModule(db, moduleId),
          earlierLessons: getDrillsBeforeModule(db, moduleId),
        };
        return buildExamSession(src, rng, ctx, undefined, seen);
      }
      // zadania z puli egzaminacyjnej trafiają do powtórek dopiero po tym, jak użytkownik zobaczył je na egzaminie
      const familyRows = (families: readonly string[]) => [...getDrillsForFamilies(db, families), ...getSeenExamDrillsForFamilies(db, families, seen)];
      // powtórki: rodziny z terminem ≤ teraz, najwcześniejsze najpierw (karty w kolejności terminu), najwyżej 8
      const families = kartyW.wartosc.filter((k) => k.termin_ms <= teraz).slice(0, 8).map((k) => k.rodzina_id);
      return buildFamilySession(familyRows(families), families, rng, 2, ctx);
    };
    const r = await otworzSesje(port, {
      rodzaj: RODZAJ[mode], trescId, limit,
      pierwszePodejscieTestu: !testyW.wartosc.some((w) => w.modulId === moduleId),
      buduj, wiersz: (id) => getDrillById(db, id), ctx, zegar: { ...zegarTelefonu, teraz: () => teraz, dzienLokalny }, noweId,
    });
    if (!r.ok) return r.powod === 'limit_wyczerpany' ? { stan: 'zakup' } : { stan: 'blad' };
    return r.wartosc ? { stan: 'gotowa', sesja: r.wartosc } : { stan: 'pusta' };
  }, [db, port, mode, lessonId, moduleId, trescId]);

  // Wejście: wznowienie i aktywności poza limitem od razu, pozostałe przez ekran startu (wejscieStartu.ts).
  const wejdz = useCallback(async (): Promise<Stan> => {
    const [testyW, kartyW] = await Promise.all([wynikiTestow(port), odczytajKarty(port)]);
    if (!testyW.ok || !kartyW.ok) return { stan: 'blad' };
    const p = await przygotujStart(port, {
      rodzaj: RODZAJ[mode], trescId, pierwszePodejscieTestu: !testyW.wartosc.some((w) => w.modulId === moduleId), pro,
      zegar: { ...zegarTelefonu, dzienLokalny },
    });
    if (!p.ok) return { stan: 'blad' };
    if (p.wartosc.akcja !== 'ekran_startu') return otworz(p.wartosc.limit);
    const teraz = Date.now();
    return { stan: 'start', limit: p.wartosc.limit, zalegle: kartyW.wartosc.filter((k) => k.termin_ms <= teraz).length };
  }, [port, mode, trescId, moduleId, pro, otworz]);

  const [stan, ustawStan] = useState<Stan>({ stan: 'ladowanie' });
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState<Record_ | null>(null);
  const [bladZapisu, ustawBladZapisu] = useState<PowodSesji | 'krok_niezgodny' | null>(null);
  const [painted, setPainted] = useState<boolean[]>(emptyGrid);
  const [numText, setNumText] = useState('');
  const [texPicks, setTexPicks] = useState<(number | null)[]>([]);
  const [painting, setPainting] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const zapisWToku = useRef(false);
  const sesja = stan.stan === 'gotowa' ? stan.sesja : null;
  const items = sesja?.items ?? [];
  const records: readonly Record_[] = sesja?.odpowiedzi ?? [];
  const finished = sesja !== null && idx >= items.length;
  const item = items[idx];

  // Prośba o ocenę na podsumowaniu lekcji albo sesji (BR-OPIN-001, D-110), raz na wejście na podsumowanie; test bez prośby.
  const prosbaSprawdzona = useRef(false);
  useEffect(() => {
    if (!finished || exam || prosbaSprawdzona.current) return;
    prosbaSprawdzona.current = true;
    void poprosOOceneGdyPora(port, ocenaExpo, mode === 'lesson' ? 'podsumowanie_lekcji' : 'podsumowanie_sesji', Date.now());
  }, [finished, exam, port, mode]);

  // A04-03 (D-283 pkt 1): VoiceOver ogłasza nagłówek oceny zadań bez strategii (ze strategią ogłasza `PanelDecyzji`)
  // i błąd zapisu; 08-F25 (D-283 pkt 2): po „Dalej” przewinięcie na górę i fokus na początek zadania.
  useAnnounce(
    current && !(current.item.kind === 'choice' && maStrategie(current.item.options)) ? (current.answer.kind === 'timeout' ? t('session.timeout') : gradeLabel(t, current.grade)) : null,
  );
  useAnnounce(bladZapisu && bladZapisu !== 'krok_niezgodny' ? t(bladZapisu === 'brak_miejsca' ? 'session.saveNoSpace' : 'session.saveFailed') : null);
  const przewijanie = useRef<ScrollViewInstance>(null);
  const poczatekZadania = useRef<HostInstance>(null);
  useNoweZadanie(idx, przewijanie, poczatekZadania);

  const resetInputs = () => {
    setCurrent(null);
    ustawBladZapisu(null);
    setPainted(emptyGrid());
    setNumText('');
    setTexPicks([]);
    setStartedAt(Date.now());
  };

  const zaladuj = useCallback((wejscie: () => Promise<Stan> = wejdz) => {
    ustawStan({ stan: 'ladowanie' });
    void wejscie()
      .catch((): Stan => ({ stan: 'blad' })) // wyjątek przy budowie zestawu: komunikat z ponowieniem, nie pusty ekran
      .then((s) => {
        if (s.stan === 'blad') zapiszBlad('odczyt_nieudany', 'sesja');
        ustawStan(s);
        setIdx(s.stan === 'gotowa' ? s.sesja.odpowiedzi.length : 0); // wznowienie: pierwszy krok bez odpowiedzi
      });
  }, [wejdz]);
  useEffect(() => {
    zaladuj();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- wejście raz na otwarcie ekranu; zmiana dostępu odświeża przez onDostep
  }, [db, port, mode, lessonId, moduleId]);

  // dostęp z nasłuchu od startu (D-247; np. zakup „oczekuje” zakończony zgodą rodzica) zamyka stan zakupu bez ponownego uruchomienia
  useEffect(() => {
    if (pro && stan.stan === 'zakup') zaladuj();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reakcja tylko na zmianę dostępu
  }, [pro]);

  // „Zakończ” (słownik 04, F-07): aktywność w toku porzucona, odpowiedzi zapisane; błąd zapisu → wpis w dzienniku i wyjście
  // (aktywność zostaje w toku i wznowi się przy następnym wejściu).
  const zakoncz = useCallback(() => {
    const s = stan.stan === 'gotowa' ? stan.sesja : null;
    if (!s || s.odpowiedzi.length >= s.items.length) {
      router.back();
      return;
    }
    void porzucAktywnosc(port, s.id, Date.now()).then((w) => {
      if (!w.ok) zapiszBladPostepu(w.powod, 'sesja');
      router.back();
    });
  }, [stan, port]);

  const next = useCallback(() => {
    resetInputs();
    setIdx((i) => i + 1);
  }, []);

  const commit = useCallback(
    (answer: DrillAnswer) => {
      if (!item || !sesja || current || zapisWToku.current || idx !== sesja.odpowiedzi.length) return;
      const elapsedMs = Date.now() - startedAt;
      const grade = gradeAnswer(item, answer);
      zapisWToku.current = true;
      void odpowiedzWSesji(port, sesja, { answer, grade, elapsedMs }, Date.now()).then((w) => {
        zapisWToku.current = false;
        if (!w.ok) {
          // nigdy cicho: komunikat, odpowiedź zostaje na ekranie do ponowienia (tlo-i-bledy.md §4)
          if (w.powod === 'zapis_nieudany' || w.powod === 'brak_miejsca' || w.powod === 'przerwano_w_tle') zapiszBladPostepu(w.powod, 'sesja');
          ustawBladZapisu(w.powod);
          return;
        }
        ustawBladZapisu(null);
        ustawStan({ stan: 'gotowa', sesja: w.wartosc.sesja });
        if (exam) {
          // egzamin: bez informacji zwrotnej po każdym zadaniu, wyjaśnienia na końcu (decyzja właściciela, B-023)
          next();
          return;
        }
        setCurrent({ item, answer, grade, elapsedMs });
        if (haptics) {
          void wykonajHaptyke(haptykaOceny(grade)).catch(() => undefined); // tokeny `haptyka` (A04-12)
        }
      });
    },
    [item, sesja, current, idx, port, haptics, exam, next, startedAt],
  );

  const restart = () => {
    resetInputs();
    zaladuj();
  };

  if (stan.stan === 'start' && RODZAJ[mode] !== 'lekcja') {
    const limit = stan.limit;
    return (
      <EkranStartu
        rodzaj={RODZAJ[mode] === 'powtorki' ? 'powtorki' : RODZAJ[mode] === 'test_modulu' ? 'test_modulu' : 'sesja'}
        limit={limit}
        strefa={zegarTelefonu.strefa()}
        zaleglePowtorki={stan.zalegle}
        onStart={() => zaladuj(() => otworz(limit))}
        onLimitWyczerpany={() => ustawStan({ stan: 'zakup' })}
        onWrocDoLekcji={() => router.back()}
      />
    );
  }
  if (stan.stan === 'zakup') {
    return (
      <EkranZakupu
        sklep={sklepAplikacji()}
        onDostep={() => {
          // dostęp z odczytu sklepu (ten sam co nasłuch od startu, D-247), potem ponowne wejście bez licznika
          void odswiezDostep(port, sklepAplikacji(), Date.now()).then((d) => {
            useDostep.setState({ pro: d });
            zaladuj();
          });
        }}
        onZamknij={() => router.back()}
        onWrocDoLekcji={() => router.back()}
        otworzWarunki={() => void Linking.openURL(ADRES_WARUNKOW)}
        otworzPrywatnosc={() => {
          if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI);
        }}
      />
    );
  }

  if (stan.stan === 'ladowanie') return <Screen>{null}</Screen>;
  if (stan.stan === 'blad') {
    return (
      <Screen>
        <Muted>{t('postep.odczytNieudany')}</Muted>
        <Button label={t('postep.ponow')} onPress={() => zaladuj()} />
        <Button label={t('session.close')} variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }

  if (stan.stan === 'pusta' || items.length === 0) {
    return (
      <Screen>
        <Title>{exam ? t('exam.title') : t('review.title')}</Title>
        <Muted>{exam ? t('exam.empty') : t('review.none')}</Muted>
        <Button label={t('session.close')} onPress={() => router.back()} />
      </Screen>
    );
  }

  if (finished || !item) {
    const correct = records.filter((r) => isPass(r.grade)).length;
    const avg = records.reduce((s, r) => s + r.elapsedMs, 0) / Math.max(1, records.length) / 1000;
    const passed = correct / items.length >= EXAM_PASS;
    return (
      <Screen>
        <Title>{exam ? t('exam.resultTitle') : t('session.resultTitle')}</Title>
        <Text style={[styles.score, { color: tk.ink }]}>{`${correct}/${items.length}`}</Text>
        {exam ? (
          <Text style={[styl.tresc, { color: tk.ink }]}>
            {passed ? t('exam.passed', { need: pct(EXAM_PASS) }) : t('exam.failed', { need: pct(EXAM_PASS) })}
          </Text>
        ) : (
          <>
            <Muted>{t('session.avgTime', { s: avg.toFixed(1).replace('.', ',') })}</Muted>
            <Text style={[styl.tresc, { color: tk.ink }]}>{correct === items.length ? t('session.resultPerfect') : t('session.resultRetry')}</Text>
          </>
        )}
        <View style={{ gap: odstep.m }}>
          <Button label={exam ? t('exam.again') : t('session.again')} variant="ghost" onPress={restart} />
          <Button label={t('session.close')} onPress={() => router.back()} />
        </View>
        {exam ? (
          <View style={{ gap: odstep.l }}>
            <Text style={[styl.naglowek, { color: tk.ink }]}>{t('exam.review')}</Text>
            {records.map((r, i) => (
              <View key={r.item.key} style={[styles.reviewItem, { borderColor: tk.separator, backgroundColor: tk.surface }]}>
                <Muted>{`${i + 1}. ${gradeLabel(t, r.grade)}`}</Muted>
                {r.item.table ? <Stol table={r.item.table} /> : null}
                <RichText text={r.item.prompt} style={[styl.tresc, { fontWeight: '600' }]} />
                <Feedback rec={r} painted={r.answer.kind === 'paint' ? [...r.answer.painted] : undefined} />
              </View>
            ))}
          </View>
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen scrollEnabled={!painting} scrollRef={przewijanie}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" onPress={zakoncz} hitSlop={12}>
          <Text style={[styl.tresc, { color: tk.link, fontWeight: '600' }]}>{t('session.end')}</Text>
        </Pressable>
        <View ref={poczatekZadania} accessible>
          <Muted>{exam ? t('exam.of', { n: idx + 1, total: items.length }) : t('session.of', { n: idx + 1, total: items.length })}</Muted>
        </View>
      </View>
      <ProgressBar value={(idx + (current ? 1 : 0)) / items.length} />

      {item.table ? <Stol table={item.table} /> : null}
      <RichText text={item.prompt} style={[styl.naglowek, { fontWeight: '600' }]} />
      {bladZapisu && bladZapisu !== 'krok_niezgodny' ? (
        <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.alert }]}>{t(bladZapisu === 'brak_miejsca' ? 'session.saveNoSpace' : 'session.saveFailed')}</Text>
      ) : null}

      {item.kind === 'choice' && maStrategie(item.options) ? (
        <PanelDecyzji item={item} rekord={current} onWybierz={(i) => commit({ kind: 'choice', index: i })} />
      ) : item.kind === 'choice' ? (
        <View style={{ gap: odstep.s }}>
          {current ? null : <Text style={[styl.drobny, { color: tk.muted, fontWeight: '600' }]}>{t('session.chooseAnswer')}</Text>}
          <ChoiceOptions item={item} picked={current?.answer.kind === 'choice' ? current.answer.index : current ? -1 : null} onPick={(i) => commit({ kind: 'choice', index: i })} />
        </View>
      ) : null}

      {item.kind === 'numeric' && !current ? (
        <NumericEntry item={item} text={numText} onText={setNumText} onSubmit={(v) => commit({ kind: 'numeric', value: v })} />
      ) : null}

      {item.kind === 'texture' && !current ? (
        <TextureEntry
          item={item}
          picks={texPicks}
          onPick={(axis, i) => setTexPicks((p) => item.axes.map((_, k) => (k === axis ? i : (p[k] ?? null))))}
          onSubmit={(picks) => commit({ kind: 'texture', picks })}
        />
      ) : null}

      {item.kind === 'paint' && !current ? (
        <View style={{ gap: odstep.m }}>
          <PaintGrid painted={painted} onChange={setPainted} onActive={setPainting} />
          <View style={styles.row}>
            <Button label={t('session.clear')} variant="ghost" onPress={() => setPainted(emptyGrid())} style={{ flex: 1 }} />
            <Button label={t('session.check')} onPress={() => commit({ kind: 'paint', painted })} style={{ flex: 1 }} />
          </View>
        </View>
      ) : null}

      {current ? (
        <View style={{ gap: odstep.m }}>
          {/* zadanie ze strategią: stopień na suknie w `PanelDecyzji`; pozostałe: nagłówek słowem, bez koloru (design-spec „Znaczenie kolorów”) */}
          {current.item.kind === 'choice' && maStrategie(current.item.options) ? null : (
            <Text style={[styl.naglowek, { color: tk.ink }]}>{current.answer.kind === 'timeout' ? t('session.timeout') : gradeLabel(t, current.grade)}</Text>
          )}
          <Feedback rec={current} painted={current.answer.kind === 'paint' ? [...current.answer.painted] : undefined} hideChoices />
          <Button label={idx + 1 < items.length ? t('session.next') : t('session.finish')} onPress={next} />
          {/* „Zgłoś błąd w tym zadaniu” pod oceną (PR-09, BR-OPIN-003); ukryte, dopóki nie ma adresu poczty (D-270) */}
          {ADRES_KONTAKTOWY ? (
            <ZglosBlad
              zadanieId={current.item.drillId}
              wersjaAplikacji={Constants.expoConfig?.version ?? '?'}
              jezyk={i18n.language}
              adresKontaktowy={ADRES_KONTAKTOWY}
              otworzAdres={(url) => Linking.openURL(url).then(() => true)}
            />
          ) : null}
        </View>
      ) : null}
    </Screen>
  );
}

type TFn = ReturnType<typeof useTranslation>['t'];

function gradeLabel(t: TFn, g: GradeResult): string {
  return g === 'correct' ? t('session.correct') : g === 'acceptable' ? t('session.acceptable') : g === 'close' ? t('session.near') : g === 'size' ? t('session.sizeError') : t('session.wrong');
}

/**
 * Opcje zadania z wyborem bez strategii solvera (pytania z teorii; makieta e3 `bez-pozycji`). `picked`: null = jeszcze bez
 * odpowiedzi, -1 = brak wyboru (czas minął). Po odpowiedzi stopień niesie znak i słowo, obwódka `ink` — bez koloru
 * (design-spec „Znaczenie kolorów”; znaki jak `StopienOceny`, D-213).
 */
function ChoiceOptions({ item, picked, onPick, readOnly }: { item: ChoiceInstance; picked: number | null; onPick?: (i: number) => void; readOnly?: boolean }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const answered = picked !== null;
  return (
    <View style={{ gap: odstep.s }}>
      {item.options.map((o, i) => {
        const isPicked = picked === i;
        const showRight = answered && o.correct;
        const showOk = answered && isPicked && !o.correct && !!o.acceptable;
        const showSize = answered && isPicked && !o.correct && !o.acceptable && !!o.sizeError;
        const showWrong = answered && isPicked && !o.correct && !o.acceptable && !o.sizeError;
        const oznaczona = showRight || showWrong || showSize || showOk;
        return (
          <Pressable
            key={`${item.key}-${i}`}
            testID={`option-${i}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: answered || readOnly, selected: isPicked }}
            disabled={answered || readOnly}
            onPress={() => onPick?.(i)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: tk.surface,
                borderColor: oznaczona ? tk.ink : tk.separator,
                borderWidth: oznaczona ? 2.5 : 1.5,
                opacity: pressed ? 0.85 : 1, // A04-08: bez przezroczystości niewybranych po ocenie (kontrast wyjaśnienia ≥ 4,5:1)
              },
            ]}
          >
            {oznaczona ? (
              <Text style={[styl.drobny, { color: tk.ink, fontWeight: '700' }]}>
                {showRight
                  ? `${ZNAK.zgodne} ${isPicked ? t('session.yourAnswer') : t('session.rightAnswer')}`
                  : showOk
                    ? `${ZNAK.dopuszczalne} ${t('session.yourAnswerAcceptable')}`
                    : showSize
                      ? `${ZNAK.niedokladnosc} ${t('session.yourAnswerSize')}`
                      : `${ZNAK.blad} ${t('session.yourAnswer')}`}
              </Text>
            ) : null}
            <RichText text={o.text} style={[styl.tresc, { fontWeight: '600' }]} />
            {answered ? <RichText text={o.why} style={[styl.przypis, { color: tk.muted }]} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

function NumericEntry({ item, text, onText, onSubmit }: { item: NumericInstance; text: string; onText: (s: string) => void; onSubmit: (v: number) => void }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const value = parseNumberInput(text);
  const suffix = item.unit === 'percent' ? '%' : item.unit === 'bb' ? 'bb' : item.unit === 'bb100' ? 'bb/100' : item.unit === 'multiplier' ? 'x' : '';
  return (
    <View style={{ gap: odstep.m }}>
      <View style={[styles.inputRow, { borderColor: tk.separator, backgroundColor: tk.surface }]}>
        <TextInput
          value={text}
          onChangeText={onText}
          keyboardType="decimal-pad"
          returnKeyType="done"
          autoFocus
          accessibilityLabel={t('session.numberLabel')}
          placeholder="0"
          placeholderTextColor={tk.muted}
          onSubmitEditing={() => value !== null && onSubmit(value)}
          style={[styles.input, { color: tk.ink }]}
        />
        {suffix ? <Text style={[styl.naglowek, { color: tk.muted }]}>{suffix}</Text> : null}
      </View>
      <Button label={t('session.check')} disabled={value === null} onPress={() => value !== null && onSubmit(value)} />
    </View>
  );
}

/**
 * Klasyfikacja tekstury flopa (M5): w każdym wierszu jedna oś (np. wysokość) i jej wartości jako przyciski.
 * „Sprawdź” aktywne dopiero po wyborze w każdym wierszu.
 */
function TextureEntry({
  item,
  picks,
  onPick,
  onSubmit,
}: {
  item: TextureInstance;
  picks: readonly (number | null)[];
  onPick: (axis: number, option: number) => void;
  onSubmit: (picks: number[]) => void;
}) {
  const tk = useTokens();
  const { t } = useTranslation();
  const complete = item.axes.every((_, i) => picks[i] !== null && picks[i] !== undefined);
  return (
    <View style={{ gap: odstep.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: odstep.xs }}>
          <Muted>{a.label}</Muted>
          <View style={styles.segments} accessibilityRole="radiogroup" accessibilityLabel={a.label}>
            {a.options.map((o, oi) => {
              const on = picks[ai] === oi;
              return (
                <Pressable
                  key={o.text}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on, checked: on }}
                  accessibilityLabel={`${a.label}: ${o.text}`}
                  onPress={() => onPick(ai, oi)}
                  style={({ pressed }) => [
                    styles.segment,
                    { backgroundColor: tk.surface, borderColor: on ? tk.ink : tk.separator, borderWidth: on ? 2.5 : 1.5, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <Text style={[styl.przypis, { color: tk.ink, fontWeight: on ? '700' : '500', textAlign: 'center' }]}>{o.text}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <Button label={t('session.check')} disabled={!complete} onPress={() => complete && onSubmit(picks.map((p) => p ?? -1))} />
    </View>
  );
}

/** Po ocenie: każda oś z zaznaczeniem poprawnej wartości, twojego wyboru i wyjaśnieniem każdej opcji. */
function TextureFeedback({ item, picks }: { item: TextureInstance; picks: readonly number[] }) {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <View style={{ gap: odstep.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: odstep.xs }}>
          <Text style={[styl.drobny, { color: tk.muted, fontWeight: '700' }]}>{a.label}</Text>
          {a.options.map((o, oi) => {
            const picked = picks[ai] === oi;
            const oznaczona = o.correct || picked;
            return (
              <View key={o.text} style={[styles.texOption, { backgroundColor: tk.surface, borderColor: oznaczona ? tk.ink : tk.separator, borderWidth: oznaczona ? 2.5 : 1.5 }]}>
                <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600' }]}>
                  {oznaczona ? `${o.correct ? ZNAK.zgodne : ZNAK.blad} ` : ''}
                  {o.text}
                  {picked ? <Text style={[styl.drobny, { color: tk.ink, fontWeight: '700' }]}>{`  ${t('session.yourAnswer')}`}</Text> : null}
                </Text>
                <RichText text={o.why} style={[styl.przypis, { color: tk.muted }]} />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const fmtNum = (v: number, unit: NumericInstance['unit']) => {
  const s = String(Math.round(v * 100) / 100).replace('.', ',');
  return unit === 'percent' ? `${s}%` : unit === 'bb' ? `${s}bb` : unit === 'bb100' ? `${s}bb/100` : unit === 'multiplier' ? `${s}x` : s;
};

/** Informacja zwrotna po odpowiedzi (w lekcji od razu, w egzaminie w podsumowaniu). */
function Feedback({ rec, painted, hideChoices }: { rec: Record_; painted?: boolean[]; hideChoices?: boolean }) {
  const tk = useTokens();
  const { item, answer } = rec;
  return (
    <View style={{ gap: odstep.m }}>
      {item.kind === 'choice' && !hideChoices ? (
        maStrategie(item.options) ? <PanelDecyzji item={item} rekord={rec} /> : <ChoiceOptions item={item} picked={answer.kind === 'choice' ? answer.index : -1} readOnly />
      ) : null}
      {item.kind === 'numeric' ? <NumericFeedback item={item} answer={answer} /> : null}
      {item.kind === 'paint' ? <PaintFeedback item={item} painted={painted ?? emptyGrid()} /> : null}
      {item.kind === 'texture' ? <TextureFeedback item={item} picks={answer.kind === 'texture' ? answer.picks : []} /> : null}
      {item.explanation ? (
        <View style={[styles.explain, { backgroundColor: tk.surface }]}>
          <RichText text={item.explanation} style={styl.przypis} />
        </View>
      ) : null}
    </View>
  );
}

function NumericFeedback({ item, answer }: { item: NumericInstance; answer: DrillAnswer }) {
  const tk = useTokens();
  const given = answer.kind === 'numeric' ? answer.value : null;
  return (
    <View style={{ gap: odstep.xs }}>
      {given !== null ? <Text style={[styl.tresc, { color: tk.ink }]}>{dt.numeric.yours(fmtNum(given, item.unit))}</Text> : null}
      <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{dt.numeric.exact(item.display)}</Text>
      {given !== null && Math.abs(given - item.answer) >= 0.05 ? (
        <Muted>{item.unit === 'percent' ? dt.numeric.diffPp(given - item.answer) : dt.numeric.diff(given - item.answer)}</Muted>
      ) : null}
    </View>
  );
}

function PaintFeedback({ item, painted }: { item: PaintInstance; painted: boolean[] }) {
  const tk = useTokens();
  const s = scorePaint(item.spot, painted);
  return (
    <View style={{ gap: odstep.s }}>
      <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{dt.paint.score(s.score, PAINT_PASS)}</Text>
      <PaintGrid painted={painted} result={s.cells} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', gap: odstep.m },
  option: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.l, gap: odstep.xs },
  explain: { borderRadius: promien.przycisk, padding: odstep.l },
  reviewItem: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.l, gap: odstep.s },
  segments: { flexDirection: 'row', gap: odstep.s },
  segment: { flex: 1, minHeight: 44, justifyContent: 'center', borderWidth: 1.5, borderRadius: promien.przycisk, paddingHorizontal: odstep.s, paddingVertical: odstep.m },
  texOption: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.m, gap: odstep.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: promien.przycisk, paddingHorizontal: odstep.l, gap: odstep.s },
  input: { flex: 1, fontSize: 28, fontWeight: '700', paddingVertical: odstep.m, fontVariant: ['tabular-nums'] },
  score: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
