import type { OchronaTla } from '@szkola/domena';
import { modulOchronyTla, type ModulOchronyTla } from '../../modules/ochrona-tla';

/**
 * Adapter `OchronaTla` (ADR 0013 pkt 2) nad modułem `modules/ochrona-tla`. Po zdarzeniu `wygasa` handler natywny sam woła
 * `endBackgroundTask` (Apple: „Failure to end the task explicitly will result in the termination of the app”), więc późniejsze
 * `zakoncz(id)` dla tego id nic nie robi — bez drugiego `endBackgroundTask`. Bez modułu (Android, Expo Go, testy): −1,
 * a flagę przerwania przy `AppState` → `background` ustawia warstwa aplikacji (ADR 0013 pkt 4).
 */
export function utworzOchroneTla(mod: ModulOchronyTla | null = modulOchronyTla): OchronaTla {
  if (!mod) return { rozpocznij: () => -1, zakoncz: () => undefined, naWygasniecie: () => () => undefined };
  const wygasle = new Set<number>();
  // własny słuchacz rejestruje wygaśnięcia, zanim dowiedzą się o nich słuchacze portu
  mod.addListener('wygasa', ({ id }) => void wygasle.add(id));
  return {
    rozpocznij: (nazwa) => mod.rozpocznij(nazwa),
    zakoncz: (id) => {
      if (id < 0) return;
      if (wygasle.delete(id)) return;
      mod.zakoncz(id);
    },
    naWygasniecie: (fn) => {
      const s = mod.addListener('wygasa', ({ id }) => fn(id));
      return () => s.remove();
    },
  };
}
