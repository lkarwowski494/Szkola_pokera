// Szablony scenariuszy w budowaniu treści (BR-SZB-001, D-533): wczytanie z content/<język>/scenarios/*.yaml, sprawdzenie
// źródeł oceny (reguła albo rachunek, RD-11, ADR-24), kompletności poziomów i wyjaśnień, pojemności generatora.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ScenarioTemplate, SCENARIO_LEVELS_LIST, type RuleLevel } from '@szkola/content-schema';
import { akcjeSzablonu, eligibleClasses, findVariantConditions, findVariantMarkers, generateVariant, VARIANT_CONDITIONS, VARIANT_MARKERS, type CbetCaseData, type GeneratorContext, type SizeRuleData, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';

export interface ScenarioCheckContext {
  /** id reguły → poziom pewności (rules.yaml). */
  ruleLevels: ReadonlyMap<string, RuleLevel>;
  numberKeys: ReadonlySet<string>;
  moduleIds: ReadonlySet<string>;
  /** id spotu zakresu → etykiety akcji węzła solvera (F1); bez tego punkty range-spot są błędem. */
  spots?: ReadonlyMap<string, readonly string[]>;
  /** Przypadki c-betu z reguł cbet-case (F2); bez nich punkty cbet-case są błędem. */
  cbetCases?: readonly CbetCaseData[];
  /** Reguły rozmiaru (open-size, three-bet-size, no-limp) z parametrami (F3); bez nich punkty size-spot są błędem. */
  sizeRules?: readonly SizeRuleData[];
}
/** Akcje punktu cbet-case ↔ plan z przypadku c-betu (CbetAction z content-schema). */
const CBET_AKCJE = { check: 'check', small: 'bet-small', big: 'bet-big' } as const;
export interface LoadedScenario { file: string; template: ScenarioTemplate }

const stem = (file: string) => file.replace(/\.yaml$/, '');

// Błąd schematu z id szablonu (nazwa pliku) i numerem punktu decyzji, gdy dotyczy punktu (BR-SZB-001).
function opisBledu(file: string, path: readonly PropertyKey[], message: string): string {
  const i = path.indexOf('decisions');
  const nr = i >= 0 && typeof path[i + 1] === 'number' ? ` punkt decyzji ${(path[i + 1] as number) + 1}:` : '';
  return `szablon ${stem(file)}:${nr} ${path.map(String).join('.')} ${message}`;
}

export function loadScenarioTemplates(dir: string): LoadedScenario[] {
  if (!existsSync(dir)) return [];
  const out: LoadedScenario[] = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort()) {
    const r = ScenarioTemplate.safeParse(parseYaml(readFileSync(join(dir, file), 'utf8')));
    if (!r.success) throw new Error(r.error.issues.map((x) => opisBledu(file, x.path, x.message)).join('\n'));
    out.push({ file, template: r.data });
  }
  return out;
}

/** Błędy szablonu względem treści (lista pusta = poprawny). Schemat sprawdza kształt, tu: powiązania z regułami, liczbami, modułami. */
/** Kolejność akcji preflop (od UTG do BB) i po flopie (SB pierwszy, BTN ostatni). */
const KOLEJNOSC_PREFLOP = ['UTG', 'UTG1', 'UTG2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
const KOLEJNOSC_PO_FLOPIE = ['SB', 'BB', 'UTG', 'UTG1', 'UTG2', 'LJ', 'HJ', 'CO', 'BTN'] as const;

/** CJ ŚR-003: pozycje size-spot wobec reguły (gracz ≠ rywal; kolejność otwarcia; ip/oop reguły rozmiaru 3-betu). */
function sprawdzPozycjeSizeSpot(pos: { hero: string; villain: string }, check: string, regulaPozycja: string | number | undefined, p: string): string[] {
  const e: string[] = [];
  if (pos.hero === pos.villain) return [`${p} gracz i rywal nie mogą siedzieć na tej samej pozycji (${pos.hero})`];
  const pre = (x: string) => (KOLEJNOSC_PREFLOP as readonly string[]).indexOf(x);
  const post = (x: string) => (KOLEJNOSC_PO_FLOPIE as readonly string[]).indexOf(x);
  if (check === 'three-bet-size') {
    if (pre(pos.villain) > pre(pos.hero)) e.push(`${p} three-bet-size: rywal otworzył przed graczem, a ${pos.villain} działa po ${pos.hero}`);
    const ip = post(pos.hero) > post(pos.villain);
    if (regulaPozycja === 'ip' && !ip) e.push(`${p} reguła ma position ip, a gracz jest poza pozycją (${pos.hero} wobec ${pos.villain})`);
    if (regulaPozycja === 'oop' && ip) e.push(`${p} reguła ma position oop, a gracz ma pozycję (${pos.hero} wobec ${pos.villain})`);
  } else if (check === 'iso-size') {
    // 08-N3: limperzy są przed graczem, rywal (np. blind) nie ma osobnej roli w ocenie; gracz może być na dowolnym miejscu poza BB-bez-akcji, więc tylko różne pozycje
  } else {
    // CJ ŚR-004: zły mały rozmiar (0,8 × standard = 2,0 bb) to rozmiar solvera z UTG (GTO Wizard, Range Morphology: UTG 2bb, CO 2,3bb, BTN 2,5bb, SB 3bb)
    if (check === 'open-size' && pos.hero !== 'BTN' && pos.hero !== 'SB') e.push(`${p} open-size tylko z BTN i SB (rozmiar solvera z ${pos.hero} jest mniejszy lub równy 2,0–2,3 bb, więc mały rozmiar nie byłby błędny)`);
    if (pos.hero === 'BB' || pre(pos.hero) > pre(pos.villain)) e.push(`${p} ${check}: otwierający (gracz, ${pos.hero}) działa przed rywalem (${pos.villain}); BB nie otwiera`);
  }
  return e;
}

export function checkScenarioTemplate(t: ScenarioTemplate, file: string, ctx: ScenarioCheckContext): string[] {
  const e: string[] = [];
  const pre = `szablon ${t.id}:`;
  if (t.id !== stem(file)) e.push(`${pre} id musi być nazwą pliku (${file}); identyfikator jest w historii wariantów użytkownika i nie zmienia się`);
  if (!ctx.moduleIds.has(t.module)) e.push(`${pre} moduł ${t.module} nie istnieje`);
  if (!t.levels.includes('latwy')) e.push(`${pre} poziom łatwy jest wymagany (BR-SZB-002)`);
  for (const l of SCENARIO_LEVELS_LIST) {
    const ma = t.bounds[l] !== undefined;
    if (t.levels.includes(l) && !ma) e.push(`${pre} poziom ${l} na liście poziomów, ale bez granic losowania`);
    if (!t.levels.includes(l) && ma) e.push(`${pre} granice poziomu ${l} bez poziomu na liście poziomów`);
    const oczekiwane = t.bounds[l]?.expected;
    if (oczekiwane !== undefined && oczekiwane.length !== t.decisions.length) {
      e.push(`${pre} poziom ${l}: oczekiwanych akcji ${oczekiwane.length}, punktów decyzji ${t.decisions.length} (po jednej na punkt, D-556)`);
    }
  }
  let exploit = false;
  t.decisions.forEach((d, i) => {
    const p = `${pre} punkt decyzji ${i + 1}:`;
    if (d.rule !== undefined) {
      const level = ctx.ruleLevels.get(d.rule);
      if (level === undefined) e.push(`${p} nieznana reguła ${d.rule}`);
      else if (level === 'exploit') exploit = true;
    }
    if (d.calc !== undefined && !ctx.numberKeys.has(d.calc)) e.push(`${p} nieznany rachunek ${d.calc}`);
    if (d.kind === 'range-spot') {
      const labels = ctx.spots?.get(d.spot);
      if (!labels) e.push(`${p} nieznany spot zakresu ${d.spot}`);
      else {
        const nieznane = d.actions.map((a) => a.action).filter((a) => !labels.includes(a));
        if (nieznane.length) e.push(`${p} akcje spoza węzła spotu ${d.spot}: ${nieznane.join(', ')} (są: ${labels.join(', ')})`);
        if (new Set(d.actions.map((a) => a.action)).size !== d.actions.length) e.push(`${p} akcja powtórzona`);
        for (const l of SCENARIO_LEVELS_LIST) {
          const ex = t.bounds[l]?.expected[i];
          if (ex !== undefined && !d.actions.some((a) => a.action === ex)) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} nie ma wyjaśnienia (BR-OCE-002)`);
          if (ex !== undefined && !labels.includes(ex)) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} spoza węzła spotu ${d.spot}`);
          if (t.bounds[l] && !t.bounds[l]!.freqs?.[i]) e.push(`${p} poziom ${l}: punkt range-spot wymaga przedziału freqs`);
        }
        // CX (D-866): ekran pokazuje wszystkie akcje węzła spotu, a wyjaśnienie każdej pokazanej akcji to BR-OCE-002
        const bezWyjasnienia = labels.filter((l) => !d.actions.some((a) => a.action === l));
        if (bezWyjasnienia.length) e.push(`${p} ekran pokazuje wszystkie akcje spotu ${d.spot}, a brak wyjaśnienia akcji: ${bezWyjasnienia.join(', ')} (BR-OCE-002)`);
      }
    } else if (d.kind === 'cbet-case') {
      const przypadki = (ctx.cbetCases ?? []).filter((c) => c.rule === d.rule);
      if (przypadki.length === 0) e.push(`${p} reguła ${d.rule} nie ma przypadku c-betu (zadanie c-btn: cases z rule: ${d.rule}); punkt cbet-case ocenia przypadek, nie rachunek`);
      const mozliwe = new Set(przypadki.map((c) => CBET_AKCJE[c.best]));
      if (new Set(d.actions.map((a) => a.action)).size !== d.actions.length) e.push(`${p} akcja powtórzona`);
      for (const l of SCENARIO_LEVELS_LIST) {
        const b = t.bounds[l];
        if (!b) continue;
        const ex = b.expected[i];
        if (ex !== undefined && !d.actions.some((a) => a.action === ex)) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} nie ma wyjaśnienia (BR-OCE-002)`);
        if (ex !== undefined && przypadki.length > 0 && !mozliwe.has(ex as 'check')) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} nie wynika z żadnego przypadku reguły ${d.rule} (są: ${[...mozliwe].join(', ')})`);
        if (b.flop === undefined) e.push(`${p} poziom ${l}: punkt cbet-case wymaga filtra flop (przypadek c-betu zależy od tekstury)`);
      }
    } else if (d.kind === 'icm-call') {
      const labels = ctx.spots?.get(d.spot);
      if (!labels) e.push(`${p} nieznany spot zakresu ${d.spot}`);
      else if (!labels.includes('all-in')) e.push(`${p} spot ${d.spot} nie ma akcji all-in (zakres all-inu rywala; są: ${labels.join(', ')})`);
      if (d.actions.map((a) => a.action).sort().join(',') !== 'call,fold') e.push(`${p} akcje to dokładnie call i fold, każda z własnym wyjaśnieniem (BR-OCE-002)`);
      for (const l of SCENARIO_LEVELS_LIST) {
        const b = t.bounds[l];
        if (!b) continue;
        const ex = b.expected[i];
        if (ex !== undefined && ex !== 'call' && ex !== 'fold') e.push(`${p} poziom ${l}: oczekiwana akcja punktu icm-call to call albo fold, jest ${ex}`);
        const m = b.margins?.[i]?.min ?? b.marginMin;
        if (!((m ?? 0) > 0)) e.push(`${p} poziom ${l}: punkt icm-call wymaga marginMin > 0 (decyzja bliska progu nie ma jednoznacznej odpowiedzi)`);
      }
    } else if (d.kind === 'size-spot') {
      const r = ctx.sizeRules?.find((x) => x.id === d.rule);
      if (!r || r.check.kind !== d.check) e.push(`${p} reguła ${d.rule} nie jest regułą ${d.check} (rozmiar liczy się z jej parametrów)`);
      if (d.check === 'three-bet-size' && d.openBb === undefined) e.push(`${p} three-bet-size wymaga openBb (otwarcie rywala w bb)`);
      if (d.check !== 'three-bet-size' && d.openBb !== undefined) e.push(`${p} openBb tylko dla three-bet-size`);
      if (d.check === 'iso-size' && d.limpers === undefined) e.push(`${p} iso-size wymaga limpers (liczba limperów przed graczem)`);
      if (d.check !== 'iso-size' && d.limpers !== undefined) e.push(`${p} limpers tylko dla iso-size`);
      if (d.check === 'iso-size' && d.limpers !== undefined) {
        const miejsca = (KOLEJNOSC_PREFLOP as readonly string[]).filter((x) => t.table === '9max' || !['UTG1', 'UTG2', 'LJ'].includes(x));
        const przed = ['SB', 'BB'].includes(t.positions.hero) ? miejsca.length - 2 : miejsca.indexOf(t.positions.hero);
        if (d.limpers > przed) e.push(`${p} iso-size: ${d.limpers} limperów przed graczem na ${t.positions.hero} (miejsc przed nim: ${przed})`);
      }
      if (d.sb !== undefined && d.check === 'three-bet-size') e.push(`${p} sb tylko dla open-size i no-limp`);
      if (d.sb === true && t.positions.hero !== 'SB') e.push(`${p} sb: true wymaga pozycji gracza SB, jest ${t.positions.hero}`);
      if (d.sb !== true && d.check !== 'three-bet-size' && d.check !== 'iso-size' && t.positions.hero === 'SB') e.push(`${p} gracz z SB wymaga sb: true (rozmiar openSb)`);
      e.push(...sprawdzPozycjeSizeSpot(t.positions, d.check, r?.check.params.position, p));
      const akcje = d.actions.map((a) => a.action);
      if (new Set(akcje).size !== akcje.length) e.push(`${p} akcja powtórzona`);
      if (d.check === 'no-limp' ? akcje.slice().sort().join(',') !== 'limp,raise' : !(akcje.includes('raise') && akcje.every((a) => a !== 'limp'))) {
        e.push(d.check === 'no-limp' ? `${p} no-limp: akcje to raise i limp, każda z wyjaśnieniem` : `${p} ${d.check}: akcje to raise oraz raise-small i/albo raise-big (limp tylko dla no-limp)`);
      }
      if (d.check !== 'no-limp' && akcje.includes('limp')) e.push(`${p} limp tylko dla no-limp`);
      for (const l of SCENARIO_LEVELS_LIST) {
        const ex = t.bounds[l]?.expected[i];
        if (ex !== undefined && ex !== 'raise') e.push(`${p} poziom ${l}: oczekiwana akcja size-spot to raise (standardowy rozmiar), jest ${ex}`);
      }
    } else if (d.kind === 'draw-call') {
      const akcje = d.actions.map((a) => a.action).sort().join(',');
      if (akcje !== 'call,fold') e.push(`${p} akcje to dokładnie call i fold, każda z własnym wyjaśnieniem (BR-OCE-002)`);
      for (const l of SCENARIO_LEVELS_LIST) {
        const ex = t.bounds[l]?.expected[i];
        if (ex !== undefined && ex !== 'call' && ex !== 'fold') e.push(`${p} poziom ${l}: oczekiwana akcja punktu draw-call to call albo fold, jest ${ex}`);
        if (t.bounds[l] && t.bounds[l]!.draws.length === 0) e.push(`${p} poziom ${l}: punkt draw-call wymaga listy draws`);
        const b = t.bounds[l];
        if (b && b.marginMin === undefined && b.margins === undefined) e.push(`${p} poziom ${l}: punkt draw-call wymaga marginMin albo margins (bez wartości domyślnej, ŚR-003)`);
        else if (b && l === 'latwy' && !((b.margins?.[i]?.min ?? b.marginMin ?? 0) > 0)) e.push(`${p} poziom ${l}: margines dolny musi być > 0 (łatwa decyzja nie leży przy progu, ŚR-003)`);
      }
      if (i === 0 && d.pots.length === 0) e.push(`${p} brak puli do losowania`);
    }
    // 08-A (DX): filtr holding jest na poziomie szablonu i generator stosuje go w punkcie cbet-case (także po range-spot), więc błąd tylko,
    // gdy żaden punkt szablonu nie jest cbet-case; zgłaszany raz na punkt niebędący cbet-case, jak dotąd
    if (d.kind !== 'cbet-case' && !t.decisions.some((x) => x.kind === 'cbet-case')) {
      for (const l of SCENARIO_LEVELS_LIST) if (t.bounds[l]?.holding !== undefined) e.push(`${p} poziom ${l}: holding tylko dla punktu cbet-case`);
    }
    if (d.kind !== 'icm-call') {
      for (const l of SCENARIO_LEVELS_LIST) if (t.bounds[l]?.chipsDiffer !== undefined) e.push(`${p} poziom ${l}: chipsDiffer tylko dla punktu icm-call`);
    }
    for (const a of d.actions) {
      // BR-OCE-001/002, D-557: pierwsze zdanie wymienia rękę, pozycję i stół z wariantu (znaczniki), a nie z przykładu w treści
      // koniec zdania szukany poza znacznikami {{…}} (kropka w kluczu {{n:a.b}} nie kończy zdania), także „。！？” (CJK); 08-programista-105
      const maska = a.explanation.replace(/\{\{[^{}]*\}\}/g, (m) => 'x'.repeat(m.length));
      const koniec = maska.search(/[.!?。！？\n]/);
      const zdanie = koniec < 0 ? a.explanation : a.explanation.slice(0, koniec);
      const znane = findVariantMarkers(a.explanation);
      const nieznane = znane.filter((m) => !(VARIANT_MARKERS as readonly string[]).includes(m));
      if (nieznane.length) e.push(`${p} akcja ${a.action}: nieznany znacznik wariantu ${nieznane.map((m) => `{{w:${m}}}`).join(', ')} (dozwolone: ${VARIANT_MARKERS.join(', ')})`);
      // KO-073 (D-1115): bloki warunkowe {{jesli:nazwa}}…{{/jesli}}: znana nazwa, domknięty blok, `nadkarty` tylko w draw-call, pierwsze zdanie bezwarunkowe
      const warunki = findVariantConditions(a.explanation);
      const nieznaneWarunki = warunki.filter((w) => !(VARIANT_CONDITIONS as readonly string[]).includes(w) && !w.startsWith('{{jesli:('));
      if (nieznaneWarunki.length) e.push(`${p} akcja ${a.action}: nieznany warunek ${nieznaneWarunki.map((m) => `{{jesli:${m}}}`).join(', ')} (nieznany warunek wariantu; dozwolone: ${VARIANT_CONDITIONS.join(', ')})`);
      if (warunki.some((w) => w.startsWith('{{jesli:('))) e.push(`${p} akcja ${a.action}: niedomknięty blok warunku {{jesli:…}}…{{/jesli}} (bloki nie zagnieżdżają się)`);
      if (warunki.includes('nadkarty') && d.kind !== 'draw-call') e.push(`${p} akcja ${a.action}: warunek nadkarty tylko w punkcie draw-call (zdanie sytuacji i nadkarty liczone z outów drawa)`);
      const otwarcie = a.explanation.indexOf('{{jesli:');
      if (otwarcie >= 0 && otwarcie <= (koniec < 0 ? a.explanation.length : koniec)) e.push(`${p} akcja ${a.action}: zdanie sytuacji (pierwsze) nie może być w bloku warunku (karty i pozycja zawsze widoczne)`);
      const w = findVariantMarkers(zdanie);
      const brak = (['reka', 'stol', 'pozycja'] as const).filter((m) => !w.includes(m));
      if (brak.length) e.push(`${p} akcja ${a.action}: zdanie sytuacji (pierwsze) musi mieć znaczniki wariantu ${brak.map((m) => `{{w:${m}}}`).join(', ')}, żeby pokazywało karty i pozycję z wylosowanego wariantu`);
    }
    if (d.kind === 'draw-call' && i === 1 && t.decisions[0]!.kind === 'draw-call' && d.street !== 'turn') e.push(`${p} druga decyzja draw-call jest na turnie`);
    if (d.kind === 'draw-call' && i === 0 && t.decisions.length === 2 && t.decisions[1]!.kind === 'draw-call' && d.street !== 'flop') e.push(`${p} przy dwóch punktach decyzji pierwszy jest na flopie`);
    if (d.kind === 'range-spot' && i !== 0) e.push(`${p} punkt range-spot jest pierwszy`);
  });
  if (t.villainType !== undefined && !exploit) e.push(`${pre} typ rywala wymaga reguły exploit z populacją (ADR-24, szczebel 5)`);
  return e;
}

/**
 * Rodzaje punktów decyzji, które ekran scenariusza faktycznie obsługuje (CN, D-782; 08-programista-001 CM; CR WYS-003): lista dozwolonych,
 * nie zakazanych, więc nowy rodzaj punktu jest odrzucany w budowaniu, dopóki ekran go nie obsłuży. Ekran składa kontekst generatora
 * z bazy treści (`buildGeneratorContext`, jak kontrola generatora) i ma akcje dla `draw-call`, `cbet-case` i `size-spot`.
 * `range-spot` (F1; CX, D-866) wszedł po obsłudze akcji spotu na ekranie (nazwy z etykiet węzła solvera, ocena z `rangeVerdict` wariantu).
 * `icm-call` (F4) wszedł z widokiem stosów wszystkich graczy i nagród (DP, D-889; projekt roli 04). Warunek SC-34 (D-825): poziom trudny icm-call czeka na 06-tresci-002
 * (odpowiedź odporna na zakres all-inu z równowagi ICM albo nazwane założenie), więc bramka odrzuca szablon icm-call z poziomem trudnym (`checkScenarioNaEkran`, D-986).
 */
export const RODZAJE_NA_EKRANIE: readonly string[] = ['draw-call', 'cbet-case', 'size-spot', 'range-spot', 'icm-call'];
const POWOD_POZA_EKRANEM: Readonly<Record<string, string>> = {};

/**
 * Bramka ekranu (CN, CR WYS-001): rodzaj punktu jest obsługiwany, a punkt c-betu albo rozmiaru ma dokładnie ten zestaw akcji, który ekran
 * pokazuje (`akcjeSzablonu` z poker-core, ta sama definicja co w generatorze i na ekranie), bo wyjaśnienie każdej akcji to BR-OCE-002.
 */
export function checkScenarioNaEkran(t: ScenarioTemplate): string[] {
  return t.decisions.flatMap((d, i) => {
    const kind = d.kind ?? 'draw-call';
    if (!RODZAJE_NA_EKRANIE.includes(kind)) {
      return [`szablon ${t.id}: punkt ${i + 1} ${kind} nie jest jeszcze obsługiwany na ekranie scenariusza (obsługiwane: ${RODZAJE_NA_EKRANIE.join(', ')}; ${kind}: ${POWOD_POZA_EKRANEM[kind] ?? 'brak obsługi'}); szablon nie może trafić do bazy treści`];
    }
    if (d.kind === 'size-spot' && d.check === 'iso-size') {
      return [`szablon ${t.id}: punkt ${i + 1} iso-size nie jest jeszcze obsługiwany na ekranie scenariusza (ekran nie pokazuje limperów przed graczem; widok: zadanie dla roli 04 i EkranScenariusza); szablon nie może trafić do bazy treści`];
    }
    if (kind === 'icm-call' && t.levels.includes('trudny')) {
      return [`szablon ${t.id}: punkt ${i + 1} icm-call: poziom trudny czeka na 06-tresci-002 (odpowiedź odporna na zakres all-inu z równowagi ICM albo nazwane założenie; docs/tresci/szablony-robocze/README.md, SC-34, D-825); szablon nie może trafić do bazy treści`];
    }
    const wymagane = akcjeSzablonu(kind, d.kind === 'size-spot' ? d.check : undefined);
    if (!wymagane) return [];
    const maja = d.actions.map((a) => a.action);
    const brak = wymagane.filter((a) => !maja.includes(a));
    const nadmiar = maja.filter((a) => !wymagane.includes(a));
    return brak.length || nadmiar.length
      ? [`szablon ${t.id}: punkt ${i + 1} ${kind}: ekran pokazuje akcje ${wymagane.join(', ')} i każda wymaga wyjaśnienia (BR-OCE-002)${brak.length ? `; brak: ${brak.join(', ')}` : ''}${nadmiar.length ? `; nadmiar: ${nadmiar.join(', ')}` : ''}`]
      : [];
  });
}

/** Czy szablony wymagają macierzy equity w bazie treści: punkt icm-call (F4, CN D-781) albo poziom z `equityMarginMin` (KO-076, D-1141). */
export function potrzebujeMacierzyEquity(szablony: readonly ScenarioTemplate[]): boolean {
  return szablony.some((t) => t.decisions.some((d) => d.kind === 'icm-call') || Object.values(t.bounds).some((b) => b?.equityMarginMin !== undefined));
}

/** Pojemność wariantów na poziom (BR-GEN-002 c): co najmniej tyle różnych odcisków. */
export const POJEMNOSC_MIN = 40;
export const PROBY_POJEMNOSCI = 2000;

/** Generator musi wytwarzać warianty na każdym poziomie (granice i oczekiwana akcja spełnialne) w liczbie odcisków ≥ POJEMNOSC_MIN po odrzuceniach (dolna granica z losowań; parametry do testu progu). */
export function checkScenarioGenerator(
  t: ScenarioTemplate,
  pojemnoscMin: number = POJEMNOSC_MIN,
  proby: number = PROBY_POJEMNOSCI,
  ctx?: GeneratorContext, // bez kontekstu punkty range-spot, cbet-case, size-spot i icm-call kończą się TemplateError (brak zgadywanych progów, NIS-006)
): string[] {
  const e: string[] = [];
  const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  for (const level of t.levels as ScenarioLevel[]) {
    const odciski = new Set<string>();
    try {
      for (let seed = 1; seed <= proby; seed++) odciski.add(generateVariant(g, level, seed, ctx).fingerprint);
    } catch (err) {
      e.push(`szablon ${t.id}: poziom ${level}: generator nie wytwarza wariantów (${err instanceof Error ? err.message : String(err)})`);
      continue;
    }
    // D-1040 / KO-074: szablon bez flopu (tylko range-spot i size-spot): odcisk to klasa ręki, więc próg to min(próg, liczba klas z eligibleClasses)
    let prog = pojemnoscMin;
    const pierwszy = t.decisions[0];
    const b = t.bounds[level];
    if (ctx && b && pierwszy?.kind === 'range-spot' && t.decisions.every((d) => d.kind === 'range-spot' || d.kind === 'size-spot')) {
      const spot = ctx.spots.find((x) => x.id === pierwszy.spot);
      const zakres = b.freqs?.[0];
      const oczekiwana = b.expected[0];
      if (spot && zakres && oczekiwana !== undefined) prog = Math.min(prog, eligibleClasses(spot, oczekiwana, zakres, ctx, b.equityMarginMin).length);
    }
    if (odciski.size < prog) e.push(`szablon ${t.id}: poziom ${level}: pojemność ${odciski.size} odcisków w ${proby} losowaniach, wymagane ${prog}`);
  }
  return e;
}

/** ŚR-103 b: zestaw szablonów jednego modułu nie ma wszystkich łatwych poziomów z tą samą odpowiedzią (uczyłoby „zawsze call”). */
export function checkScenarioSet(templates: readonly ScenarioTemplate[]): string[] {
  const wgModulu = new Map<string, { id: string; expected: string }[]>();
  for (const t of templates) {
    const e = t.bounds.latwy?.expected;
    if (e === undefined) continue; // brak łatwego poziomu zgłasza checkScenarioTemplate
    wgModulu.set(t.module, [...(wgModulu.get(t.module) ?? []), { id: t.id, expected: e.join(',') }]);
  }
  const errors: string[] = [];
  for (const [module, list] of wgModulu) {
    if (list.length >= 2 && new Set(list.map((x) => x.expected)).size === 1) {
      errors.push(`moduł ${module}: wszystkie szablony (${list.map((x) => x.id).join(', ')}) mają na poziomie łatwym tę samą odpowiedź ${list[0]!.expected}; dodaj szablon z inną (ŚR-103 b)`);
    }
  }
  return errors;
}
