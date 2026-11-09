// Wspólna część narzędzi przekładu i przeglądu przez API Anthropic (K3a, plan-09 §5 pkt 8, §6; D-294, D-295).
// Wzór: Trening `scripts/i18n/przeglad-api.mjs` (SHA 2e4b0f8, odczyt 2026-11-09) — tam cennik, klient, czekanie na batch,
// przybliżenie tokenów i rejestr języków leżą w skrypcie przeglądu, a przekład je importuje (przeklad-api.mjs:20).
// Odstępstwa od Treningu (nazwane, odczyt 2026-11-09):
//  - osobny moduł zamiast eksportów z przeglad-api.mjs (Trening :17–35, 221–265): oba skrypty dzielą tu także jednostki
//    (słownik interfejsu + pliki treści) i kontrolę znaczników, której Trening nie ma (Trening porównuje tylko {…}, :74);
//  - maskowanie w tym module zamiast `scripts/maskuj.mjs` (Trening scripts/maskuj.mjs:1–13, cały plik; u nas zmiany tylko w scripts/i18n/);
//  - LIMIT_USD = 15 (D-295) zamiast 50 (przegląd, :26) i 6 (przekład, przeklad-api.mjs:24); próg zmienia tylko jawne
//    --limit-usd (osobna zgoda), bez flagi --zgoda-koszt (Trening :238, :317);
//  - MAX_TOKENS = 128 000 zamiast 64 000 (:27): jednostką jest cały plik treści, największy `content/pl/rules.yaml` ma
//    ok. 141 tys. znaków (ok. 50 tys. tokenów wyjścia); limit wyjścia Opus 5.5 i Sonnet 5.5 to 128K (umiejętność claude-api);
//    to tylko górny próg — max_tokens żądania = min(128 000, ⌈2 × szacunek wyjścia jednostki + 4000⌉), a przebieg staje
//    także wtedy, gdy najgorszy przypadek (Σ max_tokens) przekracza limit (przegląd D-043 K3a, znalezisko 2);
//  - nakładki plików wspólnych (spots.yaml, helplines.yaml): Trening ich nie ma; reguła z tools/content-build/src/nakladka.ts;
//  - rejestr języków (REJESTR) przepisany z Treningu :48–62 jako „przewodnik głosu”, bo w repo nie ma osobnego przewodnika
//    głosu dla języków docelowych (otwarte pytanie do roli 09/04).
// Cennik (tabela „Current Models” umiejętności claude-api, stan pamięci podręcznej 2026-10-06, odczyt 2026-11-09):
//   Claude Opus 5.5 `claude-opus-5-5`: 4 USD wejście / 20 USD wyjście za 1 mln tokenów; Claude Sonnet 5.5 `claude-sonnet-5-5`: 2 / 10.
//   Message Batches: −50% (RABAT_BATCH). Ponowny odczyt cennika u źródła przed pierwszym płatnym przebiegiem (D-294).
// Klient: fetch bez zależności jak Trening (:240–254); umiejętność claude-api zaleca SDK `@anthropic-ai/sdk`, ale dodanie
// zależności zmienia package.json i lockfile (poza zakresem K3a) — odstępstwo od zalecenia, zgodne z Treningiem.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { parse as parseYaml } from 'yaml';
import { tsImport } from 'tsx/esm/api';
import { splaszcz, wpisy } from '../sprawdz-i18n.mjs';

/* Nakładki plików wspólnych (K2b): reguła pól i strażnik z jednego miejsca — tools/content-build/src/nakladka.ts (POLA_SPOTS,
 * POLA_HELPLINES, roznicePoza), importowane przez tsx, nie kopiowane; content-build sprawdza po nałożeniu to samo. */
const NAKLADKA = await tsImport('../../tools/content-build/src/nakladka.ts', import.meta.url);
export const POLA_NAKLADEK = { 'content/ranges/spots.yaml': NAKLADKA.POLA_SPOTS, 'content/helplines.yaml': NAKLADKA.POLA_HELPLINES };
export const roznicePoza = NAKLADKA.roznicePoza;
/* Nakładka definicji terminów (D-335): źródło jednostki i strażnik z tools/content-build/src/definicje.ts (bez kopii). */
const DEFINICJE = await tsImport('../../tools/content-build/src/definicje.ts', import.meta.url);
export const PLIK_DEFINICJI = DEFINICJE.PLIK_DEFINICJI;
export const roznicaDefinicji = DEFINICJE.roznicaDefinicji;

/* ---------- liczby w jednym miejscu ---------- */
export const MODELE = { opus: 'claude-opus-5-5', sonnet: 'claude-sonnet-5-5' };
/** USD za 1 mln tokenów, ceny standardowe (claude-api, 2026-10-06); Batch liczy RABAT_BATCH tej ceny. */
export const CENY = { 'claude-opus-5-5': { we: 4, wy: 20 }, 'claude-sonnet-5-5': { we: 2, wy: 10 } };
export const RABAT_BATCH = 0.5;
export const DOMYSLNY_MODEL = MODELE.opus;
export const DOMYSLNY_EFFORT = 'medium';
export const EFFORTY = ['low', 'medium', 'high', 'xhigh', 'max'];
/** Limit kosztu jednego przebiegu (D-295: 15 USD; powyżej stop bez osobnej zgody). */
export const LIMIT_USD = 15;
export const MAX_TOKENS = 128000;
export const CZEKAJ_MIN_DOMYSLNIE = 120;
export const INTERWAL_S = 60;
const API = 'https://api.anthropic.com/v1';
const WERSJA_API = '2023-06-01';

/** 35 lokalizacji (docs/lokalizacja/jezyki.md, „Zestaw języków”, D-131); pl to źródło. */
export const JEZYKI = ['bg', 'cs', 'da', 'de', 'el', 'en', 'es-419', 'es', 'et', 'fi', 'fr', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'ms', 'nb', 'nl', 'pl', 'pt-BR', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tr', 'uk', 'vi', 'zh-Hant'];
export const ZRODLO = 'pl';

/** Rejestr zwracania się per język — przepisany z Treningu przeglad-api.mjs:48–62 (odczyt 2026-11-09). */
export const REJESTR = {
  en: 'neutralny, bezpośredni; polecenia w trybie rozkazującym („Tap”, „Choose”)',
  cs: 'standard, formalny jak w iOS', sk: 'standard, formalny jak w iOS', hu: 'standard, formalny jak w iOS', ro: 'standard, formalny jak w iOS',
  bg: 'standard, formalny jak w iOS', hr: 'standard, formalny jak w iOS', sl: 'standard, formalny jak w iOS', lt: 'standard, formalny jak w iOS',
  lv: 'standard, formalny jak w iOS', uk: 'standard, formalny jak w iOS',
  sr: 'serbski, cyrylica, ekawica; polecenia jak w iOS („Додирните”)', et: 'standard, „sina” (jak Apple w iOS po estońsku)',
  es: 'es-ES (Hiszpania), „tú”', 'es-419': 'hiszpański Ameryki Łacińskiej, „tú” (jak Apple es-MX)',
  pt: 'pt-PT (Portugalia), formalnie, bez „você”', 'pt-BR': 'pt-BR, „você”, polecenia w trybie łączącym („Toque”, „Escolha”)',
  de: '„du”', fr: '„vous” (forma grzecznościowa); spacja nierozdzielająca przed ? ! : ; i w « »', it: '„tu”', nl: '„je/jij”',
  sv: '„du”', da: '„du”', nb: '„du”', fi: '„sinä”; bez końcówek fleksyjnych przy {{parametrach}}', tr: '„siz” (forma grzecznościowa); bez przyrostków przy {{parametrach}}',
  el: 'jak Apple; „;” jako znak zapytania', id: '„Anda”, polecenia bez „-lah”', ms: '„anda”', vi: '„bạn”, uprzejme „hãy” w poleceniach',
  ru: 'interfejs „вы” (jak iOS)',
  ja: 'grzeczny styl です/ます, przyciski krótkie', ko: 'styl grzecznościowy: -니다 w zdaniach, -세요 w poleceniach',
  'zh-Hant': 'Tajwan, „你”, znaki tradycyjne, słownictwo iOS tajwańskie',
};

export const nazwaJezyka = (kod) => { try { return new Intl.DisplayNames(['pl'], { type: 'language' }).of(kod) ?? kod; } catch { return kod; } };

/** Maskowanie kluczy w logach i raportach (repo i logi CI są publiczne) — wzór Trening scripts/maskuj.mjs:4–13 (bez wzorców projektu Google Cloud — u nas nie ma tych API). */
export const maskuj = (tekst, klucz = '') => {
  let s = String(tekst ?? '');
  if (klucz && klucz.length >= 4) s = s.split(klucz).join('***');
  return s.replace(/sk-ant-[0-9A-Za-z_-]{10,}/g, '***').replace(/AIza[0-9A-Za-z_-]{20,}/g, '***').replace(/\d{9,}/g, '***');
};

export const sha256 = (s) => createHash('sha256').update(s).digest('hex');
const czytajJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

/* ---------- szacunek ---------- */
const cjk = (c) => (c >= 0x3040 && c <= 0x30ff) || (c >= 0x3400 && c <= 0x9fff) || (c >= 0xac00 && c <= 0xd7af) || (c >= 0xf900 && c <= 0xfaff);
/** Przybliżenie tokenów bez sieci, zawyżone celowo (Trening przeglad-api.mjs:222–226): łacina ~2,8 znaku/token, inne alfabety ~1,7, CJK ~1. */
export function przyblizTokeny(tekst) {
  let t = 0; for (const ch of String(tekst)) { const c = ch.codePointAt(0); t += c < 0x250 ? 0.36 : cjk(c) ? 1 : 0.6; }
  return Math.ceil(t);
}
/** [OCENA] Długość przekładu względem tokenów polskiego źródła — tabela Treningu przeklad-api.mjs:28 (tam względem angielskiego);
 * u nas źródłem jest polski, więc szacunek jest dodatkowo zawyżony dla en. */
export const WSPOLCZYNNIK = (kod) => (['ja', 'ko', 'zh-Hant'].includes(kod) ? 1.0 : ['el', 'bg', 'ru', 'uk', 'sr'].includes(kod) ? 1.6 : ['de', 'fi', 'hu', 'tr', 'nl', 'sv', 'da', 'nb', 'et', 'lt', 'lv', 'sl', 'hr', 'cs', 'sk', 'ro'].includes(kod) ? 1.35 : 1.25);
export function kosztUsd(tokWe, tokWy, model) {
  const c = CENY[model]; if (!c) throw new Error(`nieznany model dla cennika: ${model}`);
  return ((tokWe * c.we + tokWy * c.wy) / 1e6) * RABAT_BATCH;
}
/** max_tokens żądania z szacunku wyjścia jednostki: 2 × szacunek + 4000 (zapas na myślenie), najwyżej MAX_TOKENS.
 * Przegląd D-043 K3a, znalezisko 2: stałe 128 000 na żądanie dawało najgorszy przypadek kilka razy ponad limit D-295.
 * Odpowiedź dłuższa niż ten próg wraca jako „ucięta (max_tokens)” i jednostka jest odrzucona (ponowienie osobno, --tylko). */
export const maxTokensJednostki = (wy) => Math.min(MAX_TOKENS, Math.ceil(2 * wy + 4000));
/** Wiersze: { jezyk, jednostek, we, wy, wyMax } — wyMax = Σ max_tokens żądań (najgorszy przypadek: każde żądanie zużywa cały próg). */
export function szacunek(wiersze, model) {
  const suma = (k) => wiersze.reduce((s, w) => s + (w[k] ?? 0), 0);
  const we = suma('we'), wy = suma('wy'), wyMax = suma('wyMax');
  const wgModelu = (f) => Object.fromEntries(Object.values(MODELE).map((m) => [m, f(m)]));
  return { jezykow: wiersze.length, jednostek: suma('jednostek'), tokeny_we: we, tokeny_wy: wy, tokeny_wy_max: wyMax,
    koszt_usd: kosztUsd(we, wy, model), koszt_max_usd: kosztUsd(we, wyMax, model),
    koszt_wg_modelu: wgModelu((m) => kosztUsd(we, wy, m)), koszt_max_wg_modelu: wgModelu((m) => kosztUsd(we, wyMax, m)) };
}
/** Tabela szacunku do logu: wiersz na język i suma; „najgorszy przypadek” = koszt przy Σ max_tokens. */
export function tabelaSzacunku(wiersze, s, model) {
  const usd = (x) => x.toFixed(2);
  const L = [`| język | jednostek | tokeny wejścia | tokeny wyjścia (szacunek) | tokeny wyjścia (Σ max_tokens) | ${model} USD szacunek | ${model} USD najgorszy przypadek | uwagi |`, '|---|---|---|---|---|---|---|---|'];
  for (const w of wiersze) L.push(`| ${w.jezyk} | ${w.jednostek} | ${w.we} | ${w.wy} | ${w.wyMax} | ${usd(kosztUsd(w.we, w.wy, model))} | ${usd(kosztUsd(w.we, w.wyMax, model))} | ${w.uwagi ?? ''} |`);
  L.push(`| **suma** | ${s.jednostek} | ${s.tokeny_we} | ${s.tokeny_wy} | ${s.tokeny_wy_max} | ${usd(s.koszt_usd)} | ${usd(s.koszt_max_usd)} | szacunek: ${Object.entries(s.koszt_wg_modelu).map(([m, c]) => `${m} ≈ ${usd(c)}`).join('; ')}; najgorszy przypadek: ${Object.entries(s.koszt_max_wg_modelu).map(([m, c]) => `${m} ≈ ${usd(c)}`).join('; ')} |`);
  return L;
}
/** Dwa progi D-295: szacunek i najgorszy przypadek (Σ max_tokens) ≤ limit; zwraca komunikat STOP albo null. */
export function stopLimitu(s, limit, etap) {
  if (s.koszt_usd > limit) return `STOP (${etap}): szacowany koszt ${s.koszt_usd.toFixed(2)} USD przekracza limit ${limit} USD (D-295); podziel przebieg (--tylko, --jezyki)`;
  if (s.koszt_max_usd > limit) return `STOP (${etap}): najgorszy przypadek (Σ max_tokens) ${s.koszt_max_usd.toFixed(2)} USD przekracza limit ${limit} USD (D-295); podziel przebieg (--tylko, --jezyki)`;
  return null;
}

/* ---------- jednostki ---------- */
export const SCIEZKA_UI = 'apps/mobile/src/i18n/locales';
const plikiRek = (kat) => readdirSync(kat).flatMap((f) => { const p = join(kat, f); return statSync(p).isDirectory() ? plikiRek(p) : [p]; });
const bezpiecznyId = (s) => s.replace(/[^A-Za-z0-9_-]/g, '_');

/** Jednostki żądań dla języka `kod`: słownik interfejsu (jedna jednostka) i każdy plik `content/pl/**` (.md, .yaml).
 * `content/terms.yaml` nie jest tłumaczony w K3a: terminy mają nazwy angielskie (pole `en`), a nazwy lokalne dla języków
 * innych niż en rozstrzyga D-287 przy fali 1. */
/** Język docelowy z listy 35 (bez pl) — kod trafia do ścieżek zapisu, więc nic spoza listy (przegląd D-043 K3a, znalezisko 1). */
export const jezykDocelowy = (kod) => typeof kod === 'string' && kod !== ZRODLO && JEZYKI.includes(kod);
/** Cel zapisu leży w content/<kod>/ albo jest dokładnie locales/<kod>.json (po rozwiązaniu ścieżki). */
export function celBezpieczny(root, kod, cel) {
  if (!jezykDocelowy(kod) || typeof cel !== 'string') return false;
  const p = resolve(root, cel), tresc = resolve(root, 'content', kod) + sep;
  return p.startsWith(tresc) || p === resolve(root, SCIEZKA_UI, `${kod}.json`);
}

export function jednostki(root, kod, prefiks) {
  if (!jezykDocelowy(kod)) throw new Error(`nieznany język docelowy: ${String(kod).slice(0, 40)}`);
  const out = [];
  const pUi = join(root, SCIEZKA_UI, `${ZRODLO}.json`);
  if (existsSync(pUi)) {
    const pk = join(root, SCIEZKA_UI, `${ZRODLO}.kontekst.json`);
    const tekst = readFileSync(pUi, 'utf8');
    out.push({ rodzaj: 'ui', zrodlo: `${SCIEZKA_UI}/${ZRODLO}.json`, cel: `${SCIEZKA_UI}/${kod}.json`, en: `${SCIEZKA_UI}/en.json`, custom_id: `${prefiks}__${kod}__ui`, tekst, zrodlo_sha256: sha256(tekst), kontekst: existsSync(pk) ? splaszcz(czytajJson(pk)) : {} });
  }
  const kat = join(root, 'content', ZRODLO);
  const pliki = existsSync(kat) ? plikiRek(kat).map((p) => relative(kat, p).split(sep).join('/')).filter((r) => /\.(md|ya?ml)$/.test(r)).sort() : [];
  for (const r of pliki) {
    const tekst = readFileSync(join(kat, r), 'utf8');
    let id = `${prefiks}__${kod}__${bezpiecznyId(r.replace(/\.(md|ya?ml)$/, ''))}`;
    if (id.length > 64) id = `${prefiks}__${kod}__${sha256(r).slice(0, 16)}`;
    out.push({ rodzaj: r.endsWith('.md') ? 'md' : 'yaml', zrodlo: `content/${ZRODLO}/${r}`, cel: `content/${kod}/${r}`, en: `content/en/${r}`, custom_id: id, tekst, zrodlo_sha256: sha256(tekst) });
  }
  // nakładki plików wspólnych: content/<rel> → content/<kod>/<rel> (tools/content-build/src/nakladka.ts, czytajZNakladka)
  for (const [zr, pola] of Object.entries(POLA_NAKLADEK)) {
    if (!existsSync(join(root, zr))) continue;
    const rel = zr.slice('content/'.length), tekst = readFileSync(join(root, zr), 'utf8');
    out.push({ rodzaj: 'nakladka', zrodlo: zr, cel: `content/${kod}/${rel}`, en: `content/en/${rel}`, custom_id: `${prefiks}__${kod}__n_${bezpiecznyId(rel.replace(/\.ya?ml$/, ''))}`, tekst, zrodlo_sha256: sha256(tekst), pola });
  }
  // definicje terminów (pole def z content/terms.yaml) → content/<kod>/terms-def.yaml (D-335; content-build: definicje.ts)
  const pTerms = join(root, 'content/terms.yaml');
  if (existsSync(pTerms)) {
    const defs = DEFINICJE.zrodloDefinicji(parseYaml(readFileSync(pTerms, 'utf8')) ?? {});
    if (Object.keys(defs).length) {
      const tekst = DEFINICJE.tekstZrodlaDefinicji(parseYaml(readFileSync(pTerms, 'utf8')));
      out.push({ rodzaj: 'definicje', zrodlo: 'content/terms.yaml', cel: `content/${kod}/${PLIK_DEFINICJI}`, en: `content/en/${PLIK_DEFINICJI}`, custom_id: `${prefiks}__${kod}__defs`, tekst, zrodlo_sha256: sha256(tekst), klucze: Object.keys(defs) });
    }
  }
  return out;
}

/** Tekst pliku z repo albo null. */
export const czytajJesli = (root, rel) => { const p = join(root, rel); return existsSync(p) ? readFileSync(p, 'utf8') : null; };

/* ---------- glosariusz z content/terms.yaml (pl → en) ---------- */
export function glosariusz(root) {
  const p = join(root, 'content/terms.yaml');
  if (!existsSync(p)) return new Map();
  const t = parseYaml(readFileSync(p, 'utf8')) ?? {};
  return new Map(Object.entries(t).filter(([, v]) => v && typeof v === 'object' && v.en).map(([k, v]) => [k, { pl: v.pl, en: v.en, abbr: v.abbr ?? null }]));
}
export const kluczeTerminow = (tekst) => [...new Set([...String(tekst).matchAll(/\{\{t:([^}|]+)/g)].map((m) => m[1].trim()))];
/** Blok glosariusza do promptu; `klucze` = tylko terminy użyte w jednostce (null = wszystkie, np. słownik interfejsu bez znaczników). */
export function blokGlosariusza(gl, klucze = null) {
  const w = [...gl].filter(([k]) => !klucze || klucze.includes(k));
  if (!w.length) return '';
  return ['Glosariusz (content/terms.yaml; klucz: nazwa polska → nazwa angielska z przeczytanego źródła):', ...w.map(([k, v]) => `- ${k}: ${v.pl} → ${v.en}${v.abbr ? ` (${v.abbr})` : ''}`)].join('\n');
}

/* ---------- kontrola znaczników (przed nałożeniem propozycji i w kontroli lokalnej przeglądu) ---------- */
/** Pola YAML z tekstem do przekładu (pomiar 2026-11-09 na content/pl: pozostałe pola to identyfikatory, kody kart, liczby, adresy). */
export const PRZEKLADALNE = new Set(['prompt', 'text', 'why', 'explanation', 'because', 'if', 'then', 'title', 'sub', 'population', 'source']);
const WZORCE = [
  ['{{n:…}}', /\{\{n:([^}|]+)(?:\|[^}]*)?\}\}/g, (m) => `{{n:${m[1].trim()}}}`],
  ['{{t:…}}', /\{\{t:([^}|]+)(?:\|[^}]*)?\}\}/g, (m) => `{{t:${m[1].trim()}}}`],
  ['parametry {{…}}', /\{\{\s*(?![nt]:)([^{}|,\s]+)[^{}]*\}\}/g, (m) => `{{${m[1]}}}`],
  ['[[…]]', /\[\[([^\]]*)\]\]/g, (m) => `[[${m[1]}]]`],
  ['znaczniki <…>', /<\/?([A-Za-z]\w*)\s*\/?>/g, (m) => `<${m[1]}>`],
  ['identyfikatory reguł', /\bR-M\d+-\d+\b/g, (m) => m[0]],
  ['adresy URL', /https?:\/\/[^\s"'<>)\]]+/g, (m) => m[0]],
];
export function znaczniki(tekst) { return Object.fromEntries(WZORCE.map(([n, re, f]) => [n, [...String(tekst).matchAll(re)].map(f).sort()])); }
/** Ostrzeżenie (nie błąd; przegląd D-043 K3a, znalezisko 4): liczby zapisane cyframi poza znacznikami ({{n:…}}, [[…]], identyfikatory,
 * adresy itd.) różnią się od źródła. Separator dziesiętny bez znaczenia (2,5 = 2.5); liczba ręcznie w przekładzie łamie zasadę {{n:…}}. */
export function ostrzezeniaLiczb(zr, tl) {
  const liczby = (t) => { let s = String(t); for (const [, re] of WZORCE) s = s.replace(re, ' '); return (s.match(/\d+(?:[.,]\d+)?/g) ?? []).map((x) => x.replace(',', '.')).sort(); };
  const { brak, nadmiar } = roznicaMultizbiorow(liczby(zr), liczby(tl));
  return brak.length || nadmiar.length ? [`liczby cyframi poza znacznikami różne od źródła: ${brak.length ? `brakuje ${brak.join(', ')}` : ''}${brak.length && nadmiar.length ? '; ' : ''}${nadmiar.length ? `nadmiarowe ${nadmiar.join(', ')}` : ''}`] : [];
}
function roznicaMultizbiorow(a, b) {
  const licz = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());
  const la = licz(a), lb = licz(b), brak = [], nadmiar = [];
  for (const [x, n] of la) for (let i = lb.get(x) ?? 0; i < n; i++) brak.push(x);
  for (const [x, n] of lb) for (let i = la.get(x) ?? 0; i < n; i++) nadmiar.push(x);
  return { brak, nadmiar };
}
/** Porównanie znaczników źródła i przekładu (multizbiory); `zbiory` = porównanie bez krotności (formy liczby mnogiej). */
export function porownajZnaczniki(zr, tl, gdzie = '', { zbiory = false } = {}) {
  const a = znaczniki(zr), b = znaczniki(tl), out = [];
  for (const [n] of WZORCE) {
    const [xa, xb] = zbiory ? [[...new Set(a[n])], [...new Set(b[n])]] : [a[n], b[n]];
    const { brak, nadmiar } = roznicaMultizbiorow(xa, xb);
    if (brak.length || nadmiar.length) out.push(`${gdzie ? `${gdzie}: ` : ''}${n}: ${brak.length ? `brakuje ${brak.join(', ')}` : ''}${brak.length && nadmiar.length ? '; ' : ''}${nadmiar.length ? `nadmiarowe ${nadmiar.join(', ')}` : ''}`);
  }
  return out;
}

const typ = (v) => (Array.isArray(v) ? 'lista' : v && typeof v === 'object' ? 'obiekt' : 'wartość');
const krotko = (v) => JSON.stringify(v)?.slice(0, 60);
/** Struktura YAML: te same klucze i długości list; pola przekładalne — niepusty tekst z tymi samymi znacznikami; reszta bez zmian. */
export function porownajYaml(a, b, sciezka = '', klucz = null, out = []) {
  const s = sciezka || '(korzeń)';
  if (typ(a) !== typ(b)) { out.push(`${s}: struktura różna (${typ(a)} → ${typ(b)})`); return out; }
  if (Array.isArray(a)) {
    if (a.length !== b.length) out.push(`${s}: liczba elementów ${a.length} → ${b.length}`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) porownajYaml(a[i], b[i], `${sciezka}[${i}]`, klucz, out);
    return out;
  }
  if (typ(a) === 'obiekt') {
    const ka = Object.keys(a), kb = Object.keys(b);
    const brak = ka.filter((k) => !kb.includes(k)), nadmiar = kb.filter((k) => !ka.includes(k));
    if (brak.length || nadmiar.length) out.push(`${s}: klucze różne (${[brak.length ? `brak ${brak.join(', ')}` : '', nadmiar.length ? `nadmiarowe ${nadmiar.join(', ')}` : ''].filter(Boolean).join('; ')})`);
    for (const k of ka.filter((x) => kb.includes(x))) porownajYaml(a[k], b[k], sciezka ? `${sciezka}.${k}` : k, k, out);
    return out;
  }
  if (PRZEKLADALNE.has(klucz) && typeof a === 'string') {
    if (typeof b !== 'string' || !b.trim()) out.push(`${s}: pusty albo nietekstowy przekład`);
    else out.push(...porownajZnaczniki(a, b, s));
  } else if (a !== b) out.push(`${s}: wartość zmieniona (${krotko(a)} → ${krotko(b)})`);
  return out;
}

const FM = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
export function rozdzielMd(tekst) { const m = FM.exec(tekst); return m ? { fm: m[1], tresc: tekst.slice(m[0].length) } : { fm: null, tresc: tekst }; }
const bloki = (tresc) => [...tresc.matchAll(/^(```|:::)(\S*)/gm)].map((m) => m[1] + m[2]);
const bezpiecznieYaml = (t, gdzie) => { try { return { v: parseYaml(t) }; } catch (e) { return { blad: `${gdzie}: niepoprawny YAML (${String(e.message).split('\n')[0]})` }; } };

/** Kategorie liczby mnogiej języka (CLDR przez Intl), jak scripts/sprawdz-i18n.mjs. */
export const kategorie = (kod, porzadkowe = false) => { try { return new Intl.PluralRules(kod, { type: porzadkowe ? 'ordinal' : 'cardinal' }).resolvedOptions().pluralCategories; } catch { return null; } };

/** Kontrola propozycji wobec jednostki źródłowej → lista powodów odrzucenia (pusta = zgodna). */
export function kontrolaZnacznikow(j, tekst, kod) {
  if (typeof tekst !== 'string' || !tekst.trim()) return ['pusty przekład'];
  if (j.rodzaj === 'ui') {
    let tl; try { tl = splaszcz(JSON.parse(tekst)); } catch (e) { return [`niepoprawny JSON: ${e.message}`]; }
    const zr = wpisy(splaszcz(JSON.parse(j.tekst))), we = wpisy(tl), out = [];
    for (const [k, w] of Object.entries(zr)) {
      const t = we[k];
      if (!t) { out.push(`${k}: brak klucza w przekładzie`); continue; }
      if (t.konflikt) { out.push(`${k}: klucz zwykły i formy liczby mnogiej naraz`); continue; }
      if (w.formy) {
        if (!t.formy) { out.push(`${k}: brak form liczby mnogiej`); continue; }
        const oczek = kategorie(kod, w.porzadkowe) ?? [];
        const ma = Object.keys(t.formy);
        if ([...oczek].sort().join(',') !== [...ma].sort().join(',')) out.push(`${k}: formy liczby mnogiej ${ma.join(', ')}, oczekiwane dla ${kod}: ${oczek.join(', ')}`);
        if (Object.values(t.formy).some((x) => !String(x).trim())) out.push(`${k}: pusta forma`);
        out.push(...porownajZnaczniki(Object.values(w.formy).join(' '), Object.values(t.formy).join(' '), k, { zbiory: true }));
      } else {
        if (t.formy) { out.push(`${k}: formy liczby mnogiej zamiast tekstu`); continue; }
        if (!String(t.tekst).trim()) { out.push(`${k}: pusty tekst`); continue; }
        out.push(...porownajZnaczniki(w.tekst, t.tekst, k));
      }
    }
    for (const k of Object.keys(we)) if (!zr[k]) out.push(`${k}: klucz spoza źródła`);
    return out;
  }
  if (j.rodzaj === 'nakladka') {
    // strażnik content-build (roznicePoza: poza polami tekstowymi bez zmian, {{n:…}} i {{t:…}} w każdym polu i kluczu, wrongSizes → groups)
    // plus pełne znaczniki (parametry, karty, adresy) w całym pliku
    const a = bezpiecznieYaml(j.tekst, 'źródło'), b = bezpiecznieYaml(tekst, 'przekład');
    if (a.blad || b.blad) return [a.blad ?? b.blad];
    return [...roznicePoza(a.v, b.v, j.pola), ...porownajZnaczniki(JSON.stringify(a.v), JSON.stringify(b.v), 'plik')];
  }
  if (j.rodzaj === 'definicje') {
    // strażnik content-build (roznicaDefinicji): te same klucze, niepuste napisy, czysty tekst bez znaczników
    const a = bezpiecznieYaml(j.tekst, 'źródło'), b = bezpiecznieYaml(tekst, 'przekład');
    if (a.blad || b.blad) return [a.blad ?? b.blad];
    return roznicaDefinicji(a.v, b.v);
  }
  if (j.rodzaj === 'yaml') {
    const a = bezpiecznieYaml(j.tekst, 'źródło'), b = bezpiecznieYaml(tekst, 'przekład');
    if (a.blad || b.blad) return [a.blad ?? b.blad];
    return porownajYaml(a.v, b.v);
  }
  // md: front matter jak YAML, treść — znaczniki całości, bloki ``` i ::: w tej samej kolejności, treść bloków range bez zmian, nagłówki
  const zr = rozdzielMd(j.tekst), tl = rozdzielMd(tekst), out = [];
  if (zr.fm !== null) {
    if (tl.fm === null) out.push('brak front matter (--- … ---)');
    else { const a = bezpiecznieYaml(zr.fm, 'front matter źródła'), b = bezpiecznieYaml(tl.fm, 'front matter przekładu'); if (a.blad || b.blad) out.push(a.blad ?? b.blad); else out.push(...porownajYaml(a.v, b.v)); }
  }
  out.push(...porownajZnaczniki(zr.tresc, tl.tresc, 'treść'));
  const ba = bloki(zr.tresc), bb = bloki(tl.tresc);
  if (ba.join(' ') !== bb.join(' ')) out.push(`treść: bloki ${ba.join(' ') || '—'} → ${bb.join(' ') || '—'}`);
  const range = (t) => [...t.matchAll(/^```range\r?\n([\s\S]*?)^```/gm)].map((m) => m[1].trim());
  if (range(zr.tresc).join('|') !== range(tl.tresc).join('|')) out.push(`treść: bloki range zmienione (${range(zr.tresc).join(', ')} → ${range(tl.tresc).join(', ')})`);
  const nag = (t) => [...t.matchAll(/^(#{1,6})\s/gm)].map((m) => m[1].length).join(',');
  if (nag(zr.tresc) !== nag(tl.tresc)) out.push(`treść: nagłówki (poziomy ${nag(zr.tresc) || '—'} → ${nag(tl.tresc) || '—'})`);
  return out;
}

/* ---------- odpowiedź batcha ---------- */
/** Jedna linia wyników batcha → { custom_id, blad, tekst, uzycie } (Trening przeglad-api.mjs:181–189; bez nagłówków i surowej odpowiedzi). */
export function odczytajLinie(linia) {
  const r = JSON.parse(linia); const custom_id = String(r.custom_id); const res = r.result ?? {};
  if (res.type !== 'succeeded') return { custom_id, blad: maskuj(`${res.type}${res.error?.error?.message ? `: ${res.error.error.message}` : res.error?.message ? `: ${res.error.message}` : ''}`), tekst: null, uzycie: null };
  const m = res.message ?? {};
  const tekst = (m.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
  if (m.stop_reason === 'max_tokens') return { custom_id, blad: 'odpowiedź ucięta (max_tokens)', tekst: null, uzycie: m.usage ?? null };
  if (m.stop_reason === 'refusal') return { custom_id, blad: 'odmowa modelu (refusal)', tekst: null, uzycie: m.usage ?? null };
  return { custom_id, blad: null, tekst, uzycie: m.usage ?? null };
}

/* ---------- API (fetch; klucz tylko w nagłówku x-api-key) — Trening przeglad-api.mjs:241–265 ---------- */
export function klient(fetchFn, klucz) {
  const naglowki = { 'x-api-key': klucz, 'anthropic-version': WERSJA_API, 'content-type': 'application/json' };
  const wywolaj = async (metoda, url, cialo, tekst = false) => {
    const r = await fetchFn(url, { method: metoda, headers: naglowki, body: cialo ? JSON.stringify(cialo) : undefined });
    if (!r.ok) { let m = ''; try { m = (await r.json())?.error?.message ?? ''; } catch { /* brak treści */ } throw new Error(maskuj(`API ${metoda} ${new URL(url).pathname}: HTTP ${r.status} ${m}`.trim(), klucz)); }
    return tekst ? r.text() : r.json();
  };
  return {
    liczTokeny: async (p) => (await wywolaj('POST', `${API}/messages/count_tokens`, { model: p.model, system: p.system, messages: p.messages })).input_tokens,
    utworz: (requests) => wywolaj('POST', `${API}/messages/batches`, { requests }),
    pobierz: (id) => wywolaj('GET', `${API}/messages/batches/${encodeURIComponent(id)}`),
    wyniki: (url) => wywolaj('GET', url, null, true),
  };
}

export async function czekajNaBatch(api, id, { czekajMin, interwalS, log, spij = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  const koniec = Date.now() + czekajMin * 60000;
  for (;;) {
    const b = await api.pobierz(id);
    if (b.processing_status === 'ended') return b;
    log(`batch ${id}: ${b.processing_status}, w toku ${b.request_counts?.processing ?? '?'}`);
    if (Date.now() + interwalS * 1000 > koniec) throw Object.assign(new Error(`przekroczono czas oczekiwania (${czekajMin} min); wyniki odbierzesz: --wznow ${id}`), { kodWyjscia: 4 });
    await spij(interwalS * 1000);
  }
}

/* ---------- argumenty wspólne ---------- */
export function parsujWspolne(argv, dodatkowe = {}) {
  const o = { model: DOMYSLNY_MODEL, effort: DOMYSLNY_EFFORT, szacuj: false, jezyki: ['en'], limitUsd: LIMIT_USD, wznow: null, wyjscie: null, czekajMin: CZEKAJ_MIN_DOMYSLNIE, tylko: null };
  const wart = (i, n) => { if (i + 1 >= argv.length) throw new Error(`brak wartości dla ${n}`); return argv[i + 1]; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--szacuj') o.szacuj = true;
    else if (a === '--model') { const v = wart(i++, a); o.model = MODELE[v] ?? v; }
    else if (a === '--effort') o.effort = wart(i++, a);
    else if (a === '--jezyki') o.jezyki = wart(i++, a).split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--limit-usd') { const v = wart(i++, a); const n = Number(v); if (v.trim() === '' || !Number.isFinite(n) || n <= 0) throw new Error('--limit-usd: liczba dodatnia (USD)');
      // sufit = LIMIT_USD (przegląd D-043 K3a, znalezisko 3): wejście workflowu nie podniesie limitu; wyższy tylko zmianą stałej w kodzie
      if (n > LIMIT_USD) throw new Error(`--limit-usd: ${n} USD powyżej ${LIMIT_USD} USD wymaga osobnej zgody właściciela (D-295) i zmiany stałej LIMIT_USD w scripts/i18n/wspolne.mjs; mniejszy przebieg: --tylko, --jezyki`);
      o.limitUsd = n; }
    else if (a === '--wznow') { const v = wart(i++, a); if (v) o.wznow = v; }
    else if (a === '--wyjscie') o.wyjscie = wart(i++, a);
    else if (a === '--czekaj-min') o.czekajMin = Number(wart(i++, a));
    else if (a === '--tylko') { const v = wart(i++, a).split(',').map((s) => s.trim()).filter(Boolean); o.tylko = v.length ? v : null; }
    else if (dodatkowe[a]) dodatkowe[a](o, () => wart(i++, a));
    else throw new Error(`nieznany argument: ${a}`);
  }
  if (!CENY[o.model]) throw new Error(`nieznany model: ${o.model} (dozwolone: ${Object.keys(MODELE).join(', ')} albo ${Object.values(MODELE).join(', ')})`);
  if (!EFFORTY.includes(o.effort)) throw new Error(`nieznany effort: ${o.effort} (dozwolone: ${EFFORTY.join(', ')})`);
  if (!o.jezyki.length) throw new Error('--jezyki: podaj co najmniej jeden kod');
  for (const k of o.jezyki) {
    if (k === ZRODLO) throw new Error(`--jezyki: ${ZRODLO} to źródło, nie język przekładu`);
    if (!JEZYKI.includes(k)) throw new Error(`--jezyki: nieznany język ${k} (dozwolone: ${JEZYKI.filter((x) => x !== ZRODLO).join(', ')})`);
  }
  return o;
}
export const filtruj = (js, tylko) => (tylko ? js.filter((j) => tylko.some((t) => j.zrodlo.includes(t))) : js);
