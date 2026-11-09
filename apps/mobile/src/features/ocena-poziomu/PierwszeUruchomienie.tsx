import type { Zegar } from '@szkola/domena';
import type { PortBazy } from '@szkola/postep';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Stol } from '@/components/Stol';
import { Screen } from '@/components/ui';
import type { DrillRow } from '@/data/content/repo';
import { zapiszBladPostepu } from '@/data/postep';
import EkranPowitania from '@/features/powitanie/EkranPowitania';
import { EkranPytaniaOceny, EkranWynikuOceny } from '@/features/ocena-poziomu/EkranyOceny';
import { etapStartu, odpowiedzOceny, pominOcene, zacznijOcene, type Ocena } from '@/features/ocena-poziomu/ocenaPoziomu';
import { styl, useTokens } from '@/theme/tokens';

export interface ModulStartu { id: string; title: string; pierwszaLekcja: string | null }
type Etap =
  | { e: 'ladowanie' }
  | { e: 'blad' }
  | { e: 'powitanie' }
  | { e: 'pytanie'; ocena: Ocena; bladZapisu: boolean }
  | { e: 'wynik'; modulId: string }
  | { e: 'gotowe' };

const noweId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

/**
 * Pierwsze uruchomienie (PR-01): stan w układzie głównym, nie trasa — jak Trening `app/_layout.tsx:38–73` (ekran startu
 * jako stan nad treścią; odczyt 2026-11-08). Etap z postep.db (`etapStartu`): punkt startu → `children` („Dziś”); ocena
 * w toku → ocena od początku (BR-ONB-001-c); inaczej powitanie. Każda odpowiedź zapisana przed następnym pytaniem;
 * błąd zapisu → komunikat, odpowiedź do ponowienia (tlo-i-bledy.md §4).
 */
export default function PierwszeUruchomienie({
  port, moduly, wiersz, zegar, children,
}: { port: PortBazy; moduly: readonly ModulStartu[]; wiersz(id: string): DrillRow | undefined; zegar: Zegar; children: ReactNode }) {
  const { t } = useTranslation();
  const tk = useTokens();
  const [etap, ustawEtap] = useState<Etap>({ e: 'ladowanie' });
  const zapisWToku = useRef(false);
  const pierwszy = moduly[0]?.id ?? 'm0';

  const zacznij = useCallback(async (): Promise<Etap> => {
    const r = await zacznijOcene(port, { wiersz, moduly: moduly.map((m) => m.id), ziarno: zegar.teraz() & 0x7fffffff, zegar, noweId });
    if (!r.ok) {
      zapiszBladPostepu(r.powod === 'odczyt_nieudany' || r.powod === 'zapis_nieudany' || r.powod === 'brak_miejsca' || r.powod === 'przerwano_w_tle' ? r.powod : 'zapis_nieudany', 'ocena_poziomu');
      return { e: 'blad' };
    }
    if (r.wartosc) return { e: 'pytanie', ocena: r.wartosc, bladZapisu: false };
    // treść bez pytań oceny: jak „Pomiń” (punkt startu = pierwszy moduł)
    const p = await pominOcene(port, null, zegar.teraz(), pierwszy);
    return p.ok ? { e: 'gotowe' } : { e: 'blad' };
  }, [port, wiersz, moduly, zegar, pierwszy]);

  // `zacznij` przez ref: nowa baza treści po zmianie języka daje nowe `moduly` i `wiersz`, a ponowny odczyt startu
  // ustawiałby „ładowanie” i odmontował nawigację (powrót na „Dziś” z ekranu „Język”, D-357). Start czytany raz na port.
  const zacznijRef = useRef(zacznij);
  zacznijRef.current = zacznij;
  const wczytaj = useCallback(() => {
    ustawEtap({ e: 'ladowanie' });
    void etapStartu(port)
      .then(async (w): Promise<Etap> => {
        if (!w.ok) {
          zapiszBladPostepu(w.powod, 'ocena_poziomu');
          return { e: 'blad' };
        }
        if (w.wartosc === 'gotowe') return { e: 'gotowe' };
        if (w.wartosc === 'powitanie') return { e: 'powitanie' };
        return zacznijRef.current();
      })
      .catch((): Etap => ({ e: 'blad' }))
      .then(ustawEtap);
  }, [port]);
  useEffect(wczytaj, [wczytaj]);

  const pomin = (ocena: Ocena | null) => {
    if (zapisWToku.current) return;
    zapisWToku.current = true;
    void pominOcene(port, ocena, zegar.teraz(), pierwszy).then((w) => {
      zapisWToku.current = false;
      if (w.ok) ustawEtap({ e: 'gotowe' });
      else {
        zapiszBladPostepu(w.powod, 'ocena_poziomu');
        if (ocena) ustawEtap({ e: 'pytanie', ocena, bladZapisu: true });
      }
    });
  };

  const odpowiedz = (ocena: Ocena, indeks: number) => {
    if (zapisWToku.current) return;
    zapisWToku.current = true;
    void odpowiedzOceny(port, ocena, indeks, zegar.teraz()).then((w) => {
      zapisWToku.current = false;
      if (!w.ok) {
        if (w.powod !== 'krok_niezgodny') zapiszBladPostepu(w.powod === 'zapis_nieudany' || w.powod === 'brak_miejsca' || w.powod === 'przerwano_w_tle' ? w.powod : 'zapis_nieudany', 'ocena_poziomu');
        ustawEtap({ e: 'pytanie', ocena, bladZapisu: true });
        return;
      }
      ustawEtap(w.wartosc.punktStartu ? { e: 'wynik', modulId: w.wartosc.punktStartu } : { e: 'pytanie', ocena: w.wartosc.ocena, bladZapisu: false });
    });
  };

  switch (etap.e) {
    case 'gotowe':
      return <>{children}</>;
    case 'ladowanie':
      return <Screen>{null}</Screen>;
    case 'blad':
      return (
        <Screen>
          <BladOdczytu onPonow={wczytaj} />
        </Screen>
      );
    case 'powitanie':
      return (
        <EkranPowitania
          onDalej={() => {
            ustawEtap({ e: 'ladowanie' });
            void zacznij().catch((): Etap => ({ e: 'blad' })).then(ustawEtap);
          }}
        />
      );
    case 'pytanie': {
      const o = etap.ocena;
      const item = o.items[o.odpowiedzi.length];
      if (!item || item.kind !== 'choice') return <Screen>{null}</Screen>;
      return (
        <EkranPytaniaOceny
          key={item.key}
          numer={o.odpowiedzi.length + 1}
          liczba={o.items.length}
          tresc={item.prompt}
          odpowiedzi={item.options.map((x) => x.text)}
          stol={
            <>
              {item.table ? <Stol table={item.table} /> : null}
              {etap.bladZapisu ? (
                <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.alert }]}>
                  {t('session.saveFailed')}
                </Text>
              ) : null}
            </>
          }
          onOdpowiedz={(i) => odpowiedz(o, i)}
          onPomin={() => pomin(o)}
        />
      );
    }
    case 'wynik': {
      const i = moduly.findIndex((m) => m.id === etap.modulId);
      const m = moduly[i];
      return (
        <EkranWynikuOceny
          punktStartu={{ modul: m?.title ?? etap.modulId, tytulLekcji: m?.pierwszaLekcja ?? '' }}
          zaliczoneOcena={moduly.slice(0, Math.max(0, i)).map((x) => x.title)}
          onZacznij={() => ustawEtap({ e: 'gotowe' })}
        />
      );
    }
  }
}
