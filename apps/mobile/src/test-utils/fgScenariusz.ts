// FG: wspólne narzędzia testów widoków rodzajów list-hand, river-catch, defend, turn-bet (fixture w stylu tools/content-build/test/fixtures, nie treść aplikacji).
import { generateVariant, type GeneratorContext, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { SesjaScenariusza } from '@/features/scenariusz/aktywnoscScenariusza';
import { naGenerator, type Akcja } from '@/features/scenariusz/wariant';

export const wariantFg = (szablon: ScenarioTemplate, poziom: ScenarioLevel, ziarno: number, ctx?: GeneratorContext): ScenarioVariant => generateVariant(naGenerator(szablon), poziom, ziarno, ctx);
export const sesjaFg = (szablon: ScenarioTemplate, poziom: ScenarioLevel, wariant: ScenarioVariant, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom, wariant, wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-12', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
} as unknown as SesjaScenariusza);
export const propsFg = () => ({ bladZapisu: false, onDalej: jest.fn(), onZakoncz: jest.fn() });
