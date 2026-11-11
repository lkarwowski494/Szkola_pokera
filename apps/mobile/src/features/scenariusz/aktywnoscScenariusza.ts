import type { ScenarioTemplate } from '@szkola/content-schema';
import { przejscieAktywnosci, startAktywnosci, wejscieDoAktywnosci, type Aktywnosc, type AktywnoscWToku, type Limit, type OcenaOdpowiedzi, type Wynik, type Zegar } from '@szkola/domena';
import { GENERATOR_WERSJA, generateVariant, type GeneratorContext, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import {
  aktywnoscWToku, odczytajOdciski, odpowiedziAktywnosci, porzucAktywnosc, zacznijAktywnosc, zakonczAktywnosc, zapiszKrok, zapiszOdcisk,
  type OdpowiedzKroku, type PortBazy, type PowodZapisu,
} from '@szkola/postep';
import { wybierzWariant, ziarnoPowtorki } from '@szkola/domena';
import { zapiszBladPostepu } from '@/data/postep';
import { AKCJE, grafPunktow, naGenerator, odciskWariantu, przebiegWariantu, type Akcja } from './wariant';

/**
 * Scenariusz jako aktywność (ADR 0010; PR-05, BR-GEN-001, BR-GEN-002, KO-043). Wariant = szablon + poziom + ziarno: plan
 * aktywności zapisuje poziom i ziarno, więc wznowienie, „Zagraj jeszcze raz” i podsumowanie odtwarzają te same karty
 * z generatora. Każda odpowiedź jest zapisana przed pokazaniem oceny (jak w sesji ćwiczeń); ostatnia kończy aktywność.
 */
export type PowodScenariusza = PowodZapisu | 'odczyt_nieudany' | 'limit_wyczerpany' | 'plan_niepoprawny' | 'krok_niezgodny';
export interface WejscieScenariusza {
  szablon: ScenarioTemplate;
  poziom: ScenarioLevel;
  /** `nowe`: wznowienie aktywności w toku albo nowy wariant; `powtorka`: ostatni wariant szablonu na poziomie („Zagraj jeszcze raz”). */
  tryb: 'nowe' | 'powtorka';
  limit: Limit;
  zegar: Zegar;
  noweId(): string;
  /** Ziarno startowe wyboru nowego wariantu (wywołujący: czas, do testów stałe). */
  ziarno: number;
  /** Odciski już zagrane w tej sesji scenariuszy (BR-GEN-002 a). */
  sesja: ReadonlySet<string>;
  /**
   * Dane spoza szablonu dla punktów cbet-case, size-spot i icm-call (CN D-780; `getKontekstGeneratora` z bazy treści, ta sama funkcja co
   * kontrola w budowaniu). Bez nich generator odmawia takich punktów (TemplateError → `plan_niepoprawny`), nie zgaduje progów.
   */
  kontekst?: GeneratorContext | undefined;
}
export interface SesjaScenariusza {
  id: string;
  aktywnosc: Aktywnosc;
  szablon: ScenarioTemplate;
  poziom: ScenarioLevel;
  wariant: ScenarioVariant;
  /** Odpowiedzi do tej pory (kolejne decyzje po kolei). */
  wybory: readonly Akcja[];
}

const jestAkcja = (a: unknown): a is Akcja => AKCJE.some((x) => x === a);
function parsujWybor(json: string): Akcja | null {
  try {
    const v: unknown = JSON.parse(json);
    return typeof v === 'object' && v !== null && 'akcja' in v && jestAkcja(v.akcja) ? v.akcja : null;
  } catch {
    return null;
  }
}

/** Wznowienie: wariant z planu i odpowiedzi z bazy; null = nie do odtworzenia (zmiana szablonu), wywołujący zaczyna nowy. */
async function wznow(port: PortBazy, id: string, a: AktywnoscWToku, szablon: ScenarioTemplate, kontekst: GeneratorContext | undefined): Promise<Wynik<SesjaScenariusza | null, PowodScenariusza>> {
  const w = a.plan.wariant;
  if (!w) return { ok: true, wartosc: null };
  let wariant: ScenarioVariant;
  try {
    wariant = generateVariant(naGenerator(szablon), w.poziom, w.ziarno, kontekst);
  } catch {
    return { ok: true, wartosc: null };
  }
  if (wariant.points.length !== a.plan.liczbaKrokow) return { ok: true, wartosc: null };
  // NIS-004 CM: po aktualizacji treści ten sam szablon i ziarno mogą dać inne karty albo pulę pod zapisanymi odpowiedziami; plan z odciskiem to wykrywa
  if (w.odcisk !== undefined && w.odcisk !== odciskWariantu(wariant)) return { ok: true, wartosc: null };
  const zapisane = await odpowiedziAktywnosci(port, id);
  if (!zapisane.ok) return zapisane;
  const wybory: Akcja[] = [];
  for (const o of zapisane.wartosc) {
    const akcja = parsujWybor(o.wybor);
    if (akcja === null || o.krok !== wybory.length) return { ok: true, wartosc: null };
    wybory.push(akcja);
  }
  return { ok: true, wartosc: { id, aktywnosc: a, szablon, poziom: w.poziom, wariant, wybory } };
}

export async function otworzScenariusz(port: PortBazy, w: WejscieScenariusza): Promise<Wynik<SesjaScenariusza, PowodScenariusza>> {
  const wToku = await aktywnoscWToku(port, 'scenariusz');
  if (!wToku.ok) return wToku;
  const zapisana = wToku.wartosc;
  if (w.tryb === 'nowe' && zapisana && zapisana.aktywnosc.plan.trescId === w.szablon.id) {
    const r = await wznow(port, zapisana.id, zapisana.aktywnosc, w.szablon, w.kontekst);
    if (!r.ok || r.wartosc) return r.ok && r.wartosc ? { ok: true, wartosc: r.wartosc } : r.ok ? { ok: false, powod: 'plan_niepoprawny' } : r;
  }
  const historia = await odczytajOdciski(port, w.szablon.id, w.poziom);
  if (!historia.ok) return historia;
  const h = historia.wartosc.map((o) => ({ odcisk: o.odcisk, ziarno: o.ziarno, generatorWersja: o.generatorWersja }));
  const ostatni = h[h.length - 1];
  const generator = naGenerator(w.szablon);
  let wariant: ScenarioVariant;
  try {
    wariant = w.tryb === 'powtorka' && ostatni && ziarnoPowtorki(h) !== null ? generateVariant(generator, w.poziom, ostatni.ziarno, w.kontekst) : wybierzWariant(generator, w.poziom, w.ziarno, { historia: h, sesja: w.sesja, kontekst: w.kontekst });
  } catch {
    return { ok: false, powod: 'plan_niepoprawny' }; // szablon spoza granic (błąd treści), nie wariant spoza granic dla użytkownika
  }
  const liczba = wariant.points.length;
  // inna aktywność tego rodzaju w toku: porzucona przy starcie nowej, o ile start jest dozwolony (wejscieDoAktywnosci)
  const wejscie = wejscieDoAktywnosci('scenariusz', w.szablon.id, zapisana?.aktywnosc ?? null, false, w.limit, { historia: h, odcisk: wariant.fingerprint });
  if (wejscie.akcja === 'ekran_zakupu') return { ok: false, powod: 'limit_wyczerpany' };
  const teraz = w.zegar.teraz();
  const strefa = w.zegar.strefa();
  const start = startAktywnosci({
    rodzaj: 'scenariusz', pierwszePodejscieTestu: false, limit: w.limit, teraz, strefa, dzienLokalny: w.zegar.dzienLokalny(teraz, strefa),
    wariant: { historia: h, odcisk: wariant.fingerprint },
    plan: { liczbaKrokow: liczba, trescId: w.szablon.id, decyzje: grafPunktow(wariant), wariant: { poziom: w.poziom, ziarno: wariant.seed, odcisk: odciskWariantu(wariant) } },
  });
  if (!start.ok) return start;
  const id = w.noweId();
  // rozdanie w toku (inny szablon, albo ten sam przy „Zagraj jeszcze raz” / po nieudanym wznowieniu) zamykane razem ze startem nowego: w toku jest najwyżej jedno
  const porzuc = zapisana ? { id: zapisana.id, teraz } : undefined;
  const zapis = await zacznijAktywnosc(port, id, start.wartosc, porzuc);
  if (!zapis.ok) return zapis;
  // Odcisk po starcie aktywności: jego brak nie psuje rozdania (najwyżej wariant wróci wcześniej), więc błąd tylko do dziennika.
  const odcisk = await zapiszOdcisk(port, { szablonId: w.szablon.id, poziom: w.poziom, odcisk: wariant.fingerprint, ziarno: wariant.seed, terazMs: teraz, generatorWersja: GENERATOR_WERSJA });
  if (!odcisk.ok) zapiszBladPostepu(odcisk.powod, 'scenariusz');
  return { ok: true, wartosc: { id, aktywnosc: start.wartosc, szablon: w.szablon, poziom: w.poziom, wariant, wybory: [] } };
}

const ocenaNa = (o: OcenaOdpowiedzi): 0 | 1 => (o === 'zgodne' || o === 'dopuszczalne' ? 1 : 0);

/** Odpowiedź na bieżącą decyzję; pas albo ostatnia decyzja kończą aktywność (`koniec`: pokazanie kart albo samo zakończenie). */
export async function odpowiedzWScenariuszu(
  port: PortBazy,
  s: SesjaScenariusza,
  akcja: Akcja,
  elapsedMs: number,
  teraz: number,
): Promise<Wynik<{ sesja: SesjaScenariusza; koniec: 'pokazanie' | 'koniec' | null }, PowodScenariusza>> {
  const krok = s.wybory.length;
  if (krok !== s.aktywnosc.krok) return { ok: false, powod: 'krok_niezgodny' };
  const nast = przejscieAktywnosci(s.aktywnosc, { typ: 'odpowiedz', krok, akcja, teraz });
  const wybory = [...s.wybory, akcja];
  const przebieg = przebiegWariantu(s.wariant, wybory);
  const ostatni = przebieg.ok ? przebieg.wartosc.kroki[krok] : undefined;
  if (!nast.ok || !przebieg.ok || !ostatni) return { ok: false, powod: 'krok_niezgodny' };
  const odp: OdpowiedzKroku = {
    krok, zadanie_id: `${s.szablon.id}#${krok}`, rodzina_id: s.szablon.id, wybor: JSON.stringify({ akcja }), ocena: ostatni.ocena,
    zaliczona: ocenaNa(ostatni.ocena), czas_ms: Math.max(0, Math.round(elapsedMs)), odpowiedziano_ms: teraz,
  };
  if (nast.wartosc.stan === 'w_toku') {
    const z = await zapiszKrok(port, s.id, odp, nast.wartosc.krok);
    if (!z.ok) return z;
    return { ok: true, wartosc: { sesja: { ...s, aktywnosc: nast.wartosc, wybory }, koniec: null } };
  }
  const z = await zakonczAktywnosc(port, s.id, teraz, { ostatnia: odp });
  if (!z.ok) return z;
  return { ok: true, wartosc: { sesja: { ...s, aktywnosc: nast.wartosc, wybory }, koniec: przebieg.wartosc.koniec === 'pokazanie' ? 'pokazanie' : 'koniec' } };
}

/** „Zakończ” w trakcie rozdania: aktywność porzucona, odpowiedzi zostają zapisane (moduly.md `porzuc`). */
export function porzucScenariusz(port: PortBazy, s: SesjaScenariusza, teraz: number): Promise<Wynik<void, PowodZapisu>> {
  return porzucAktywnosc(port, s.id, teraz);
}
