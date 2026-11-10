import type { ScenarioTemplate } from '@szkola/content-schema';
import type { PostepKursu } from '@szkola/domena';
import type { ScenarioLevel } from '@szkola/poker-core';
import { wynikiScenariuszy, type PortBazy } from '@szkola/postep';
import { czytajPoziomScenariusza } from '@/features/ustawienia/ustawieniaAplikacji';
import { modulZaliczony } from './dostep';
import { poziomAuto, poziomDlaSzablonu, type WyborPoziomu } from './poziom';

/**
 * Dane do ekranu startu scenariusza (BR-POZ-002): wybór ręczny z ustawień, poziom automatyczny z wyników wariantów tego modułu
 * i poziom ostateczny dla szablonu (najbliższy niższy, który szablon ma). Czysta część: `ustalPoziom`.
 */
export interface UstalonyPoziom { wybor: WyborPoziomu; auto: ScenarioLevel; poziom: ScenarioLevel; zastapiony: boolean }

export function ustalPoziom(wybor: WyborPoziomu, auto: ScenarioLevel, dostepne: readonly ScenarioLevel[]): UstalonyPoziom {
  const zadany = wybor === 'auto' ? auto : wybor;
  const { poziom, zastapiony } = poziomDlaSzablonu(zadany, dostepne);
  // „Automatycznie” zawsze trafia w poziom, który szablon ma, więc o zastąpieniu mówimy tylko przy wyborze ręcznym
  return { wybor, auto, poziom, zastapiony: wybor !== 'auto' && zastapiony };
}

export async function odczytajPoziom(
  port: PortBazy,
  szablon: ScenarioTemplate,
  moduly: ReadonlyMap<string, string>, // szablon id → moduł (z listy szablonów)
  postep: Pick<PostepKursu, 'zaliczoneTestem' | 'zaliczoneOcena'>,
): Promise<{ ok: true; wartosc: UstalonyPoziom } | { ok: false }> {
  const [wybor, wyniki] = await Promise.all([czytajPoziomScenariusza(port), wynikiScenariuszy(port)]);
  if (!wybor.ok || !wyniki.ok) return { ok: false };
  const tegoModulu = wyniki.wartosc.filter((w) => moduly.get(w.trescId) === szablon.module).map((w) => ({ poziom: w.poziom, oceny: w.oceny }));
  const auto = poziomAuto({ modulZaliczony: modulZaliczony(postep, szablon.module), wyniki: tegoModulu });
  return { ok: true, wartosc: ustalPoziom(wybor.wartosc, auto, szablon.levels) };
}
