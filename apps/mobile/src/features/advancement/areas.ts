import type { AreaInput } from '@szkola/srs';

/** Wiersz zadania z modułem (z content.db). */
export interface FamilyModuleRow {
  family: string;
  moduleId: string;
  moduleOrd: number;
}

export interface ModuleInfo {
  id: string;
  ord: number;
  recommended: boolean;
}

/**
 * Obszary wskaźnika zaawansowania = moduły kursu (ADR-25; ten sam podział co obszary gry M13, dokument 14, 4.3).
 * Rodzina zadań należy do najwcześniejszego modułu, w którym występuje, więc liczy się raz.
 * Moduł opcjonalny (recommended: false) jest pokazany, ale nie wchodzi do wyniku ogólnego.
 */
export function buildAreas(modules: readonly ModuleInfo[], rows: readonly FamilyModuleRow[]): AreaInput[] {
  const owner = new Map<string, { moduleId: string; ord: number }>();
  for (const r of rows) {
    const prev = owner.get(r.family);
    if (!prev || r.moduleOrd < prev.ord) owner.set(r.family, { moduleId: r.moduleId, ord: r.moduleOrd });
  }
  const skills = new Map<string, string[]>();
  for (const [family, o] of owner) {
    const list = skills.get(o.moduleId) ?? [];
    list.push(family);
    skills.set(o.moduleId, list);
  }
  return [...modules]
    .sort((a, b) => a.ord - b.ord)
    .map((m) => ({ id: m.id, skills: (skills.get(m.id) ?? []).sort(), counted: m.recommended }));
}
