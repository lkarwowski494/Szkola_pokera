import type { ScenarioTemplate } from '@szkola/content-schema';
import type { PostepKursu } from '@szkola/domena';

/**
 * Które szablony użytkownik może zagrać (BR-SZB-002 „szablony modułów, które ukończył albo do których ma dostęp”,
 * BR-MENU-001 „kafelek mówi, co go odblokuje”). Reguła D-647 [OCENA, do weta]: szablon modułu jest odblokowany po ukończeniu
 * co najmniej jednej lekcji tego modułu albo gdy moduł jest zaliczony (test modułu albo ocena poziomu, która go przeskoczyła).
 * Spójne z kafelkiem „Dziś” (po pierwszej lekcji modułu 2), tylko na poziomie modułu szablonu.
 */
export const modulZaliczony = (p: Pick<PostepKursu, 'zaliczoneTestem' | 'zaliczoneOcena'>, modulId: string): boolean =>
  p.zaliczoneTestem.includes(modulId) || p.zaliczoneOcena.includes(modulId);

export function szablonOdblokowany(
  s: Pick<ScenarioTemplate, 'module'>,
  p: Pick<PostepKursu, 'ukonczoneLekcje' | 'zaliczoneTestem' | 'zaliczoneOcena'>,
  lekcjeModulu: readonly string[],
): boolean {
  return modulZaliczony(p, s.module) || lekcjeModulu.some((l) => p.ukonczoneLekcje.includes(l));
}

/** Numer modułu z jego id („m2” → 2) do napisu „Po pierwszej lekcji modułu 2”; null, gdy id ma inny kształt. */
export function numerModulu(id: string): number | null {
  const m = /^m(\d+)$/.exec(id);
  return m ? Number(m[1]) : null;
}
