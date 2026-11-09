import { useCallback, useEffect, useRef, useState } from 'react';
import type { PowodTresci, Wynik } from '@szkola/domena';
import i18n from '@/i18n';

export type StanTresci = { stan: 'ladowanie' } | { stan: 'ok'; plik: string } | { stan: 'blad' };
type Przygotuj = (jezyk: string) => Promise<Wynik<{ plik: string }, PowodTresci>>;

/**
 * Baza treści w języku aplikacji (ADR 0005 pkt 2; reszta D-269, rola 09 K2c). Start: baza języka z i18n; zmiana języka
 * (ustawienia albo zapisany wybór zastosowany przy starcie) przygotowuje bazę nowego języka, a do jej gotowości zostaje
 * poprzednia (bez ekranu ładowania). Błąd bazy nowego języka zostawia poprzednią i trafia do dziennika; błąd przy
 * starcie (brak żadnej bazy) daje ekran błędu z ponowieniem (tlo-i-bledy.md §4).
 */
export function useTresc(przygotuj: Przygotuj, zapiszBlad: (powod: PowodTresci) => void): StanTresci & { ponow: () => void } {
  const [stan, ustaw] = useState<StanTresci>({ stan: 'ladowanie' });
  const [proba, ustawProbe] = useState(0);
  const [jezyk, ustawJezyk] = useState(i18n.language);
  const ostatni = useRef<StanTresci>(stan);
  ostatni.current = stan;
  // funkcje z propsów w refach: nowa funkcja przy każdym renderze rodzica nie przygotowuje bazy od nowa
  const fn = useRef({ przygotuj, zapiszBlad });
  fn.current = { przygotuj, zapiszBlad };

  useEffect(() => {
    const zmiana = (j: string) => ustawJezyk(j);
    i18n.on('languageChanged', zmiana);
    return () => i18n.off('languageChanged', zmiana);
  }, []);

  useEffect(() => {
    let aktualny = true;
    void fn.current.przygotuj(jezyk).then((w) => {
      if (!aktualny) return;
      if (!w.ok) fn.current.zapiszBlad(w.powod);
      if (w.ok) ustaw({ stan: 'ok', plik: w.wartosc.plik });
      else if (ostatni.current.stan !== 'ok') ustaw({ stan: 'blad' });
    });
    return () => {
      aktualny = false;
    };
  }, [proba, jezyk]);

  const ponow = useCallback(() => {
    ustaw({ stan: 'ladowanie' });
    ustawProbe((p) => p + 1);
  }, []);
  return { ...stan, ponow };
}
