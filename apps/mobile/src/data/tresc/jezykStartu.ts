import { useEffect, useRef, useState } from 'react';
import type { PortBazy } from '@szkola/postep';

type StanPostepu = { stan: 'ladowanie' } | { stan: 'ok'; port: PortBazy } | { stan: 'blad' };

/**
 * Zapisany język (ADR 0014 pkt 3) przed pierwszym przygotowaniem bazy treści (D-324): `true`, gdy język zastosowany albo
 * nie da się go odczytać (błąd startu postępu, błąd zastosowania — treść startuje w języku z i18n).
 * Raz na port, nie przy każdym renderze: `usePostep` daje nowy obiekt przy każdym renderze, a i18next 26.4.2 emituje
 * `languageChanged` także przy tym samym języku (dist/esm/i18next.js:2024), więc zależność od obiektu dawała pętlę
 * render → zmiana języka → render (przegląd D-043 sesji Q, P1).
 */
export function useJezykPrzedTresca(postep: StanPostepu, zastosuj: (port: PortBazy) => Promise<void>): boolean {
  const [gotowy, ustaw] = useState(false);
  const fn = useRef(zastosuj);
  fn.current = zastosuj;
  const port = postep.stan === 'ok' ? postep.port : null;
  const blad = postep.stan === 'blad';
  useEffect(() => {
    if (blad) ustaw(true);
    if (port === null) return;
    void fn.current(port)
      .catch((): void => undefined) // błąd odczytu trafia do dziennika w `zastosuj`; tu tylko odblokowanie treści
      .then(() => ustaw(true));
  }, [port, blad]);
  return gotowy;
}
