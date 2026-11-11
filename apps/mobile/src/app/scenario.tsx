import { dzienLokalny, stanKursu, type Limit } from '@szkola/domena';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { Button, Muted, Screen } from '@/components/ui';
import { getKontekstGeneratora, getLessonSummaries, getModules, getScenarioTemplates } from '@/data/content/repo';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { modulyKursu } from '@/features/dzis/widok';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { otworzScenariusz, odpowiedzWScenariuszu, porzucScenariusz, type SesjaScenariusza } from '@/features/scenariusz/aktywnoscScenariusza';
import { szablonOdblokowany } from '@/features/scenariusz/dostep';
import { KoniecScenariusza, PrzebiegScenariusza, StartScenariusza } from '@/features/scenariusz/EkranScenariusza';
import type { WyborPoziomu } from '@/features/scenariusz/poziom';
import { odczytajPoziom, ustalPoziom, type UstalonyPoziom } from '@/features/scenariusz/wejscie';
import { przygotujStart } from '@/features/start/wejscieStartu';
import { zapiszPoziomScenariusza } from '@/features/ustawienia/ustawieniaAplikacji';
import EkranZakupu from '@/features/zakup/EkranZakupu';
import { ADRES_PRYWATNOSCI, ADRES_WARUNKOW } from '@/platform/adresy';
import { zapiszBlad } from '@/platform/dziennik';
import { zegarTelefonu } from '@/platform/zegar';
import { sklepAplikacji } from '@/platform/zakupy';
import { odswiezDostep, useDostep } from '@/state/dostep';
import { useTranslation } from 'react-i18next';
import type { ScenarioTemplate } from '@szkola/content-schema';

const noweId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
type Stan =
  | { stan: 'ladowanie' }
  | { stan: 'blad' }
  | { stan: 'brak' }
  | { stan: 'start'; szablon: ScenarioTemplate; tytulModulu: string; poziom: UstalonyPoziom; limit: Limit }
  | { stan: 'zakup' }
  | { stan: 'gra'; sesja: SesjaScenariusza; faza: 'decyzja' | 'ocena'; koniec: boolean; bladZapisu: boolean }
  | { stan: 'koniec'; sesja: SesjaScenariusza; bladStartu: 'blad' | null };

/**
 * Scenariusz całego rozdania (PR-05, F-12; BR-SCN-001…004, BR-GEN, BR-POZ, BR-OCE; KO-035…KO-043). Osobny ekran, nie tryb
 * `session.tsx` (D-645, do weta): model inny niż sesja zadań (wariant z ziarna i historii odcisków, graf decyzji, ocena z rachunku).
 * Wejście: wznowienie rozdania w toku od razu (bez limitu, BR-LIM-002); inaczej start z przełącznikiem poziomu i licznikiem dnia.
 * Każda odpowiedź zapisana przed pokazaniem oceny; „Zakończ” porzuca rozdanie, odpowiedzi zostają.
 */
export default function ScenarioScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const db = useBazaTresci();
  const port = usePortPostepu();
  const { t } = useTranslation();
  const pro = useDostep((s) => s.pro);
  const [stan, ustawStan] = useState<Stan>({ stan: 'ladowanie' });
  const widziane = useRef(new Set<string>()); // odciski tej sesji scenariuszy (BR-GEN-002 a)
  const start = useRef(Date.now());
  const zapisWToku = useRef(false);

  const zegar = useCallback(() => ({ ...zegarTelefonu, dzienLokalny }), []);

  /** Szablon, tytuł modułu, poziom i limit; null = nie ma takiego szablonu albo jest zablokowany. */
  const przygotuj = useCallback(async () => {
    const szablony = getScenarioTemplates(db);
    const szablon = szablony.find((s) => s.id === id);
    if (!szablon) return 'brak' as const;
    const moduly = getModules(db);
    const lekcje = getLessonSummaries(db);
    const fakty = await czytajFaktyKursu(port);
    if (!fakty.ok) return 'blad' as const;
    const kurs = stanKursu(modulyKursu(moduly, lekcje), fakty.wartosc);
    if (!szablonOdblokowany(szablon, kurs, lekcje.filter((l) => l.moduleId === szablon.module).map((l) => l.id))) return 'brak' as const;
    const poziom = await odczytajPoziom(port, szablon, new Map(szablony.map((s) => [s.id, s.module])), kurs);
    if (!poziom.ok) return 'blad' as const;
    const p = await przygotujStart(port, { rodzaj: 'scenariusz', trescId: szablon.id, pierwszePodejscieTestu: false, pro, zegar: zegar() });
    if (!p.ok) return 'blad' as const;
    return { szablon, tytulModulu: moduly.find((m) => m.id === szablon.module)?.title ?? '', poziom: poziom.wartosc, limit: p.wartosc.limit, wznow: p.wartosc.akcja === 'wznow' };
  }, [db, port, id, pro, zegar]);

  const otworz = useCallback(async (szablon: ScenarioTemplate, poziom: UstalonyPoziom['poziom'], limit: Limit, tryb: 'nowe' | 'powtorka'): Promise<Stan> => {
    let kontekst: ReturnType<typeof getKontekstGeneratora>;
    try {
      kontekst = getKontekstGeneratora(db, szablon);
    } catch {
      zapiszBlad('odczyt_nieudany', 'scenariusz'); // uszkodzony wiersz treści: szablon wymagający kontekstu zakończy się błędem planu, bez zgadywania
    }
    const r = await otworzScenariusz(port, { szablon, poziom, tryb, limit, zegar: zegar(), noweId, ziarno: Date.now() & 0x7fffffff, sesja: widziane.current, kontekst });
    if (!r.ok) return r.powod === 'limit_wyczerpany' ? { stan: 'zakup' } : { stan: 'blad' };
    widziane.current.add(r.wartosc.wariant.fingerprint);
    start.current = Date.now();
    return { stan: 'gra', sesja: r.wartosc, faza: 'decyzja', koniec: false, bladZapisu: false };
  }, [port, zegar, db]);

  const wejdz = useCallback(async (): Promise<Stan> => {
    const p = await przygotuj();
    if (p === 'brak') return { stan: 'brak' };
    if (p === 'blad') return { stan: 'blad' };
    if (p.wznow) return otworz(p.szablon, p.poziom.poziom, p.limit, 'nowe');
    return { stan: 'start', szablon: p.szablon, tytulModulu: p.tytulModulu, poziom: p.poziom, limit: p.limit };
  }, [przygotuj, otworz]);

  const zaladuj = useCallback((wejscie: () => Promise<Stan> = wejdz) => {
    ustawStan({ stan: 'ladowanie' });
    void wejscie()
      .catch((): Stan => ({ stan: 'blad' })) // wyjątek odczytu treści (np. wiersz niezgodny ze schematem): komunikat z ponowieniem
      .then((s) => {
        if (s.stan === 'blad') zapiszBlad('odczyt_nieudany', 'scenariusz');
        ustawStan(s);
      });
  }, [wejdz]);
  useEffect(() => {
    zaladuj();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- wejście raz na otwarcie ekranu; zmiana dostępu przez efekt niżej
  }, [db, port, id]);
  useEffect(() => {
    if (pro && stan.stan === 'zakup') zaladuj(); // dostęp z nasłuchu (np. zgoda rodzica) zamyka stan zakupu
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reakcja tylko na zmianę dostępu
  }, [pro]);

  const wybierzPoziom = (w: WyborPoziomu) => {
    if (stan.stan !== 'start') return;
    const s = stan;
    ustawStan({ ...s, poziom: ustalPoziom(w, s.poziom.auto, s.szablon.levels) });
    void zapiszPoziomScenariusza(port, w, Date.now()).then((r) => {
      if (!r.ok) zapiszBladPostepu(r.powod, 'scenariusz');
    });
  };

  const odpowiedz = (a: Parameters<typeof odpowiedzWScenariuszu>[2]) => {
    if (stan.stan !== 'gra' || stan.faza !== 'decyzja' || zapisWToku.current) return;
    const s = stan;
    zapisWToku.current = true;
    void odpowiedzWScenariuszu(port, s.sesja, a, Date.now() - start.current, Date.now()).then((r) => {
      zapisWToku.current = false;
      if (!r.ok) {
        if (r.powod === 'zapis_nieudany' || r.powod === 'brak_miejsca' || r.powod === 'przerwano_w_tle') zapiszBladPostepu(r.powod, 'scenariusz');
        ustawStan({ ...s, bladZapisu: true }); // odpowiedź zostaje do ponowienia, nigdy cicho (tlo-i-bledy.md §4)
        return;
      }
      ustawStan({ stan: 'gra', sesja: r.wartosc.sesja, faza: 'ocena', koniec: r.wartosc.koniec !== null, bladZapisu: false });
    });
  };

  const dalej = () => {
    if (stan.stan !== 'gra') return;
    if (stan.koniec) ustawStan({ stan: 'koniec', sesja: stan.sesja, bladStartu: null });
    else {
      start.current = Date.now();
      ustawStan({ ...stan, faza: 'decyzja' });
    }
  };

  const zakoncz = () => {
    if (stan.stan !== 'gra') return router.back();
    void porzucScenariusz(port, stan.sesja, Date.now()).then((w) => {
      if (!w.ok) zapiszBladPostepu(w.powod, 'scenariusz');
      router.back();
    });
  };

  // „Nowe rozdanie” (nowy odcisk, liczy limit) i „Zagraj to samo jeszcze raz” (ten sam wariant, poza limitem, KO-043)
  const kolejne = (tryb: 'nowe' | 'powtorka') => {
    if (stan.stan !== 'koniec') return;
    const k = stan;
    void (async () => {
      const p = await przygotuj();
      if (p === 'brak' || p === 'blad') return ustawStan({ ...k, bladStartu: 'blad' });
      const poziom = tryb === 'powtorka' ? k.sesja.poziom : p.poziom.poziom;
      const s = await otworz(p.szablon, poziom, p.limit, tryb);
      ustawStan(s.stan === 'blad' ? { ...k, bladStartu: 'blad' } : s);
    })();
  };

  if (stan.stan === 'zakup') {
    return (
      <EkranZakupu
        sklep={sklepAplikacji()}
        onDostep={() => void odswiezDostep(port, sklepAplikacji(), Date.now()).then((d) => { useDostep.setState({ pro: d }); zaladuj(); })}
        onZamknij={() => router.back()}
        onWrocDoLekcji={() => router.back()}
        otworzWarunki={() => void Linking.openURL(ADRES_WARUNKOW)}
        otworzPrywatnosc={() => { if (ADRES_PRYWATNOSCI) void Linking.openURL(ADRES_PRYWATNOSCI); }}
      />
    );
  }
  if (stan.stan === 'ladowanie') return <Screen>{null}</Screen>;
  if (stan.stan === 'blad' || stan.stan === 'brak') {
    return (
      <Screen>
        <Muted>{stan.stan === 'brak' ? t('scenario.missing') : t('postep.odczytNieudany')}</Muted>
        {stan.stan === 'blad' ? <Button label={t('postep.ponow')} onPress={() => zaladuj()} /> : null}
        <Button label={t('session.close')} variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }
  if (stan.stan === 'start') {
    return (
      <StartScenariusza
        szablon={stan.szablon}
        tytulModulu={stan.tytulModulu}
        wybor={stan.poziom.wybor}
        poziom={stan.poziom.poziom}
        zastapiony={stan.poziom.zastapiony}
        limit={stan.limit}
        strefa={zegarTelefonu.strefa()}
        onWybierz={wybierzPoziom}
        onStart={() => zaladuj(() => otworz(stan.szablon, stan.poziom.poziom, stan.limit, 'nowe'))}
        onLimitWyczerpany={() => ustawStan({ stan: 'zakup' })}
        onWroc={() => router.back()}
      />
    );
  }
  if (stan.stan === 'gra') {
    return (
      <PrzebiegScenariusza sesja={stan.sesja} faza={stan.faza} koniec={stan.koniec} bladZapisu={stan.bladZapisu} onWybierz={odpowiedz} onDalej={dalej} onZakoncz={zakoncz} />
    );
  }
  return (
    <KoniecScenariusza sesja={stan.sesja} poziom={stan.sesja.poziom} bladStartu={stan.bladStartu} onNowe={() => kolejne('nowe')} onPowtorz={() => kolejne('powtorka')} onZamknij={() => router.back()} />
  );
}
