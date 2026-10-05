import type { AreaDef } from '@szkola/content-schema';

/**
 * Odblokowanie obszaru (dokument 14, decyzja P14): wszystkie lekcje modułu ukończone albo moduł zaliczony testem
 * wstępnym. Test wstępny czeka na decyzję B-024: `placementPassed` jest miejscem na tę ścieżkę.
 */
export interface AreaStatus {
  area: AreaDef;
  lessonsDone: number;
  lessonsTotal: number;
  unlocked: boolean;
}

export function areaStatuses(
  areas: readonly AreaDef[],
  lessons: readonly { id: string; moduleId: string }[],
  done: (lessonId: string) => boolean,
  placementPassed: (moduleId: string) => boolean = () => false,
): AreaStatus[] {
  return areas.map((area) => {
    const ls = lessons.filter((l) => l.moduleId === area.module);
    const lessonsDone = ls.filter((l) => done(l.id)).length;
    const unlocked = (ls.length > 0 && lessonsDone === ls.length) || placementPassed(area.module);
    return { area, lessonsDone, lessonsTotal: ls.length, unlocked };
  });
}
