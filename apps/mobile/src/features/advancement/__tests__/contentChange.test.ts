/// <reference types="jest" />
/**
 * Komunikat „Nowe lekcje – wskaźnik przeliczony”: pokazuje się raz, gdy aktualizacja treści dodała umiejętności
 * liczone do wyniku ogólnego, a użytkownik ma już jakiś wynik.
 */
import { computeAdvancement, type StoredCard } from '@szkola/srs';
import { buildAreas } from '../areas';
import { countedSkills, detectContentChange, parseSeen } from '../contentChange';

const seen = (hash: string, skills: string[]) => JSON.stringify({ hash, skills });

describe('wykrywanie zmiany treści dla wskaźnika', () => {
  it('pierwsze uruchomienie: bez komunikatu, zapisuje stan', () => {
    const c = detectContentChange(null, { hash: 'a', skills: ['x'] }, true);
    expect(c.notice).toBe(false);
    expect(parseSeen(c.next)).toEqual({ hash: 'a', skills: ['x'] });
  });

  it('ten sam hash: bez komunikatu i bez zapisu', () => {
    expect(detectContentChange(seen('a', ['x']), { hash: 'a', skills: ['x'] }, true)).toEqual({ notice: false, added: 0, next: null });
  });

  it('nowy hash z nowymi umiejętnościami: komunikat i nowy stan', () => {
    const c = detectContentChange(seen('a', ['x']), { hash: 'b', skills: ['x', 'y', 'z'] }, true);
    expect(c.notice).toBe(true);
    expect(c.added).toBe(2);
    expect(parseSeen(c.next)).toEqual({ hash: 'b', skills: ['x', 'y', 'z'] });
    // Drugie sprawdzenie z zapisanym stanem: komunikat już się nie pokazuje (raz).
    expect(detectContentChange(c.next, { hash: 'b', skills: ['x', 'y', 'z'] }, true).notice).toBe(false);
  });

  it('nowy hash bez nowych umiejętności: zapis po cichu', () => {
    const c = detectContentChange(seen('a', ['x', 'y']), { hash: 'b', skills: ['x'] }, true);
    expect(c.notice).toBe(false);
    expect(parseSeen(c.next)?.hash).toBe('b');
  });

  it('bez żadnej odpowiedzi: bez komunikatu (nie było wyniku, który mógł spaść)', () => {
    const c = detectContentChange(seen('a', ['x']), { hash: 'b', skills: ['x', 'y'] }, false);
    expect(c.notice).toBe(false);
    expect(c.next).not.toBeNull();
  });

  it('uszkodzony zapis traktuje jak pierwsze uruchomienie', () => {
    expect(parseSeen('nie-json')).toBeNull();
    expect(parseSeen('{"hash":1}')).toBeNull();
    expect(detectContentChange('nie-json', { hash: 'a', skills: [] }, true).notice).toBe(false);
  });

  it('umiejętności modułu opcjonalnego nie wywołują komunikatu ani nie zmieniają wyniku ogólnego', () => {
    const modules = [
      { id: 'm1', ord: 1, recommended: true },
      { id: 'm11', ord: 11, recommended: false },
    ];
    const before = buildAreas(modules, [{ family: 'x', moduleId: 'm1', moduleOrd: 1 }]);
    const after = buildAreas(modules, [
      { family: 'x', moduleId: 'm1', moduleOrd: 1 },
      { family: 't', moduleId: 'm11', moduleOrd: 11 },
    ]);
    expect(countedSkills(after)).toEqual(['x']);
    const c = detectContentChange(seen('a', countedSkills(before)), { hash: 'b', skills: countedSkills(after) }, true);
    expect(c.notice).toBe(false);
    const now = Date.UTC(2026, 9, 4);
    expect(computeAdvancement(after, [], now).overall).toBe(computeAdvancement(before, [], now).overall);
  });

  it('nowa umiejętność liczy się jako 0, więc wynik ogólny spada', () => {
    const modules = [{ id: 'm1', ord: 1, recommended: true }];
    const now = Date.UTC(2026, 9, 4);
    const card: StoredCard = { familyId: 'x', due: now, stability: 1000, difficulty: 5, scheduledDays: 0, learningSteps: 0, reps: 3, lapses: 0, state: 2, lastReview: now };
    const before = computeAdvancement(buildAreas(modules, [{ family: 'x', moduleId: 'm1', moduleOrd: 1 }]), [card], now);
    const after = computeAdvancement(
      buildAreas(modules, [
        { family: 'x', moduleId: 'm1', moduleOrd: 1 },
        { family: 'y', moduleId: 'm1', moduleOrd: 1 },
      ]),
      [card],
      now,
    );
    expect(after.overall!).toBeLessThan(before.overall!);
  });
});
