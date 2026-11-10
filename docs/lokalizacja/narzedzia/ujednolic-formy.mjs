#!/usr/bin/env node
// Ujednolicenie form terminów poza próbą przeglądu (rola 09, sesja AH, 2026-11-09, D-391).
// Źródło reguł: plan-pt-BR-fr.md §3.5 (fr, pt-BR), terms-nazwy zh-Hant (wiersze [AB: … ujednolicić]),
// przeglad-ja-zh-Hant J2/Z2/Z3 (勝率 = equity). Zapisuje do content/<j>/ i drukuje raport zamian.
//
//   node docs/lokalizacja/narzedzia/ujednolic-formy.mjs [--zapisz] [--raport <plik.md>]
//
// Bez --zapisz: tylko raport (próba). Zasady bezpieczeństwa:
// - zamiany w formie znacznika {{t:klucz|forma}} — dokładne dopasowanie formy;
// - zamiany w tekście wolnym nie dotykają kluczy {{n:…}}, {{t:klucz…}} ani adresów (granice: : . / - i litery);
// - 勝率 → 權益 (zh-Hant) i → エクイティ (ja) tylko w wierszu, którego odpowiednik w content/en (te same numery wierszy,
//   sprawdzone: liczba wierszy równa) zawiera „equity” co najmniej tyle razy, ile 勝率, i nie zawiera „win rate/winrate”;
//   pozostałe wystąpienia trafiają do raportu bez zmiany;
// - każde trafienie w treści krytycznej m12 (lessons/m12-*, exams/m12.yaml, R-M12-* w rules.yaml) jest wypisane osobno
//   — wymaga ponownej kontroli (a).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../../../', import.meta.url).pathname;
const args = process.argv.slice(2);
const ZAPISZ = args.includes('--zapisz');
const raportPlik = args.includes('--raport') ? args[args.indexOf('--raport') + 1] : null;
// --jezyki de,es — tylko wskazane języki (sesja AK, D-393); bez flagi: wszystkie z REGULY.
const JEZYKI = args.includes('--jezyki') ? (args[args.indexOf('--jezyki') + 1] ?? '').split(',').filter(Boolean) : null;
if (JEZYKI && !JEZYKI.length) { console.error('--jezyki: podaj kody, np. --jezyki de,es'); process.exit(2); }

const tag = (klucz, stara, nowa) => ({
  opis: `{{t:${klucz}|${stara}}} → ${nowa}`,
  re: new RegExp(`\\{\\{t:${klucz}\\|${stara.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}\\}`, 'g'),
  zamien: () => `{{t:${klucz}|${nowa}}}`,
});
// Tekst wolny: słowo nie będące częścią klucza/adresu.
const slowo = (stare, nowe, opis) => ({
  opis: opis ?? `${stare} → ${nowe}`,
  re: new RegExp(`(?<![:./\\w-])${stare}(?![.\\w/-])`, 'g'),
  zamien: () => nowe,
});

// Jak slowo, ale kropka kończąca zdanie nie blokuje zamiany („플랍.”, „học phần.”) — sesja AL (ko, it, vi);
// wcześniejsze języki bez zmian (idempotencja ich przebiegów).
const slowoK = (stare, nowe, opis) => ({ ...slowo(stare, nowe, opis), re: new RegExp(`(?<![:./\\w-])${stare}(?![\\w/-]|\\.\\w)`, 'g') });

// pt-BR: fold jako czasownik → formy „desistir” (P1, P3; rules.yaml przyjęte wcześniej w próbie).
const PT_FOLD = {
  folda: 'desiste', foldar: 'desistir', foldaram: 'desistiram', foldarem: 'desistirem', foldou: 'desistiu',
  foldam: 'desistem', foldando: 'desistindo', foldo: 'desisto', folde: 'desista', foldei: 'desisti',
  foldasse: 'desistisse', 'foldará': 'desistirá', foldaria: 'desistiria', foldem: 'desistam', foldamos: 'desistimos',
};
// „desistir” jest nieprzechodni: „folda os pares” → „desiste dos pares”.
const PT_DE = {
  o: 'do', a: 'da', os: 'dos', as: 'das', esse: 'desse', essa: 'dessa', esses: 'desses', essas: 'dessas',
  este: 'deste', esta: 'desta', estes: 'destes', estas: 'destas', isso: 'disso', isto: 'disto',
  um: 'de um', uma: 'de uma', uns: 'de uns', umas: 'de umas', sua: 'de sua', seu: 'de seu', suas: 'de suas', seus: 'de seus',
};
// Dokładny ciąg (kontekst rodzajnika przy znaczniku bez formy; D2-terminy.md konflikty 1–3).
const lit = (stare, nowe) => ({
  opis: `${stare} → ${nowe}`,
  re: new RegExp(stare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
  zamien: () => nowe,
});
// Forma w znaczniku {{t:klucz|…}} przekształcana funkcją (temat czasownika/przymiotnika).
const wForme = (klucz, reForma, fn, opis) => ({
  opis,
  re: new RegExp(`(?<!(?:\\b(?:el|un|del|este|ese|tu|su|cada|sus|tus|unos|estos|esos|primer|ningún) ))\\{\\{t:${klucz}\\|(${reForma})\\}\\}`, 'g'),
  zamien: (m, forma) => `{{t:${klucz}|${fn(forma)}}}`,
});
const wielka = (wzor, s) => (wzor[0] === wzor[0].toUpperCase() ? s[0].toUpperCase() + s.slice(1) : s);
const ptFold = {
  opis: 'pt-BR fold (czasownik) → desistir (+ „de” przed dopełnieniem)',
  re: new RegExp(`(\\{\\{t:fold\\|)?(?<![:./\\w-])([Ff]old(?:${Object.keys(PT_FOLD).map((k) => k.slice(4)).sort((a, b) => b.length - a.length).join('|')}))(?![\\wá])(\\}\\})?( (\\S+))?`, 'g'),
  zamien: (m, otw, forma, zam, reszta, nast) => {
    const nowa = wielka(forma, PT_FOLD[forma.toLowerCase()]);
    let ogon = reszta ?? '';
    if (nast && PT_DE[nast] !== undefined) ogon = ` ${PT_DE[nast]}`;
    else if (nast && nast.startsWith('{{t:') && !/^\{\{t:(call|raise|check|bet|fold)\b/.test(nast)) ogon = ` de ${nast}`;
    return `${otw ?? ''}${nowa}${zam ?? ''}${ogon}`;
  },
};

// Forma w znaczniku {{t:klucz|forma}} wg słownika (małe litery; wielka litera zachowana).
const wFold = (klucz, mapa) => ({
  opis: `it ${klucz} passare/lasciare → foldare (w znaczniku)`,
  re: new RegExp(`\\{\\{t:${klucz}\\|([^}|]+)\\}\\}`, 'g'),
  zamien: (m, forma) => { const n = mapa[forma.toLowerCase()]; return n ? `{{t:${klucz}|${wielka(forma, n)}}}` : m; },
});

const REGULY = {
  fr: [
    tag('big-blind', 'grosse blind', 'grosse blinde'),
    tag('big-blind', 'La grosse blind', 'La grosse blinde'),
    slowo('grosse blind(?!e)', 'grosse blinde', 'grosse blind → grosse blinde (tekst)'),
    tag('small-blind', 'petite blind', 'petite blinde'),
    slowo('petite blind(?!e)', 'petite blinde', 'petite blind → petite blinde (tekst)'),
    slowo('une blind(?!e)', 'une blinde', 'une blind → une blinde (tekst)'),
    slowo('limpers', 'limpeurs'), slowo('Limpers', 'Limpeurs'),
    slowo('solvers', 'solveurs'), slowo('Solvers', 'Solveurs'), slowo('solver', 'solveur'), slowo('Solver', 'Solveur'),
  ],
  'pt-BR': [
    tag('top-pair', 'par mais alto', 'top pair'), tag('top-pair', 'Par mais alto', 'Top pair'),
    tag('top-pair', 'pares mais altos', 'top pairs'),
    ptFold,
  ],
  'zh-Hant': [
    tag('fold', '蓋牌', '棄牌'), tag('fold', '蓋掉', '棄掉'),
    tag('equity', '勝率', '權益'), tag('winrate', '勝率', '贏率'),
    tag('variance', '波動', '變異數'), tag('variance', '變異', '變異數'),
    tag('session', '牌局', '場次'), tag('regular', '常客', '常規玩家'),
    tag('recreational', '休閒玩家', '娛樂玩家'), tag('nit', '岩石玩家', '岩石型玩家'), tag('nit', '極緊玩家', '岩石型玩家'),
    tag('maniac', '瘋狂玩家', '瘋子'),
  ],
  ja: [],
  // de (sesja AK, D-393): D2-terminy.md konflikty 1–3 (bet i SPR żeńskie, „hohe zwei Paare”), D1 „pushen”, m8-l3 zgubiony znacznik.
  de: [
    lit('planst du einen {{t:bet}}', 'planst du eine {{t:bet}}'),
    lit('ein kleiner {{t:bet}}', 'eine kleine {{t:bet}}'), lit('Kleiner {{t:bet}}', 'Kleine {{t:bet}}'), lit('Ein kleiner {{t:bet}}', 'Eine kleine {{t:bet}}'),
    lit('und ein {{t:bet}} von', 'und eine {{t:bet}} von'), lit('den ersten {{t:bet}}', 'die erste {{t:bet}}'),
    lit('Wie heißt dieser {{t:bet}}', 'Wie heißt diese {{t:bet}}'), lit('ist ein {{t:bet}}', 'ist eine {{t:bet}}'),
    lit('mit einem {{t:bet}}', 'mit einer {{t:bet}}'),
    lit('mit dem {{t:spr}}', 'mit der {{t:spr}}'), lit('Zonen des {{t:spr}}', 'Zonen der {{t:spr}}'),
    lit('ist das {{t:spr}} zu hoch', 'ist die {{t:spr}} zu hoch'), lit('Bei welchem {{t:spr}}', 'Bei welcher {{t:spr}}'),
    lit('einem {{t:spr|SPR}}', 'einer {{t:spr|SPR}}'), lit('des {{t:spr|SPR}}', 'der {{t:spr|SPR}}'),
    lit('bei einem einzigen {{t:spr}}', 'bei einer einzigen {{t:spr}}'), lit('ein hoher {{t:spr|SPR}}', 'eine hohe {{t:spr|SPR}}'),
    lit('hohes {{t:two-pair}}', 'hohe {{t:two-pair|zwei Paare}}'),
    slowo('shoven', 'pushen'), slowo('shovst', 'pushst'), slowo('shovt', 'pusht'), slowo('Shover', 'Pusher'),
    lit('Der Big Blind checkt am River', 'Der {{t:big-blind|Big Blind}} checkt am River'),
  ],
  // es (sesja AK, D-393): call „igualar” (E3/E1, forma UI), czasowniki w znaczniku; rzeczowniki po rodzajniku bez zmian.
  // wet „húmedo”, paired „emparejado” (terms-nazwy-es), top pair „pareja mayor” (D-389).
  es: [
    // „pago/pagos” małą literą = rzeczownik („un pago”, „más pagos”) — bez zmiany; „Pago” = czasownik (opcja odpowiedzi).
    wForme('call', 'Pago|[Pp]ag(?!os?\\}\\})[a-záéíóú]*', (f) => wielka(f, f.toLowerCase().replace(/^pagu(?=[eé])/, 'igual').replace(/^pag/, 'igual')), 'es call pag… → igual… (czasownik)'),
    wForme('wet', '[Mm]ojad[oa]s?', (f) => wielka(f, f.toLowerCase().replace(/^mojad/, 'húmed')), 'es wet mojado → húmedo'),
    wForme('paired', '[Dd]oblad[oa]s?', (f) => wielka(f, f.toLowerCase().replace(/^doblad/, 'emparejad')), 'es paired doblado → emparejado'),
    lit('Siempre {{t:call|pago}}', 'Siempre {{t:call|igualo}}'),
    tag('top-pair', 'pareja máxima', 'pareja mayor'), tag('top-pair', 'Pareja máxima', 'Pareja mayor'),
    tag('top-pair', 'parejas máximas', 'parejas mayores'), tag('top-pair', 'Parejas máximas', 'Parejas mayores'),
  ],
  // ko (sesja AL, D-394; D-388, plan-de-es-ko-it-vi §3): 플롭, C벳, 방어, 분산 (tylko m12-l3), 플러시 드로우.
  // Wszystkie pary kończą się tą samą klasą głoski (samogłoska / spółgłoska), więc partykuły zostają poprawne.
  ko: [
    slowoK('프리플랍', '프리플롭'), slowoK('플랍', '플롭'),
    slowoK('[cC]벳', 'C벳', 'c벳 → C벳'), slowoK('씨벳', 'C벳'),
    slowoK('디펜드', '방어'), slowoK('디펜스', '방어'),
    { ...tag('variance', '변동성', '분산'), tylko: /^lessons\/m12-l3-/ },
    lit('완성되지 않았습니다. 빅 블라인드가 리버에서', '완성되지 않았습니다. {{t:big-blind|빅 블라인드}}가 리버에서'), // m8-l3:55 jak vi
    tag('flush-draw', '플러시 드로', '플러시 드로우'), slowoK('플러시 드로(?!우)', '플러시 드로우', '플러시 드로 → 플러시 드로우 (tekst)'),
  ],
  // it (sesja AL, D-394): fold „foldare” — passare/lasciare tylko w znaczniku {{t:fold|…}} (znacznik rozstrzyga sens;
  // w tekście wolnym „passare” bywa checkiem — bez zmian, raport); „il call” (rodzaj męski K-05); microlimiti; „i blind”.
  it: [
    wFold('fold', {
      passo: 'foldo', passi: 'foldi', passa: 'folda', passare: 'foldare', passano: 'foldano', passino: 'foldino',
      'passerà': 'folderà', passeranno: 'folderanno', passato: 'foldato', passando: 'foldando',
      'ha passato': 'ha foldato', 'hanno passato': 'hanno foldato',
      lascio: 'foldo', lasci: 'foldi', lascia: 'folda', lasciano: 'foldano', lasciando: 'foldando',
      'lascerà': 'folderà', lasceranno: 'folderanno',
    }),
    lit('la tua {{t:call}}', 'il tuo {{t:call}}'), lit('la {{t:call}}', 'il {{t:call}}'), lit('una {{t:call}}', 'un {{t:call}}'),
    slowoK('micro limiti', 'microlimiti'), slowoK('Micro limiti', 'Microlimiti'),
    slowoK('bui', 'blind'),
  ],
  // vi (sesja AL, D-394; D-387/D-388): open „mở cược”, ręka „tay bài” (tylko 6 miejsc w znaczeniu ręki —
  // „bộ bài” = talia zostaje), „mô-đun”, m8-l3:55 zgubiony znacznik big blind.
  vi: [
    slowoK('mở bài', 'mở cược'), slowoK('Mở bài', 'Mở cược'),
    lit('bộ bài mạnh', 'tay bài mạnh'), lit('của bộ bài giống', 'của tay bài giống'), lit('các bộ bài bằng nhau', 'các tay bài bằng nhau'),
    slowoK('học phần', 'mô-đun'), slowoK('Học phần', 'Mô-đun'),
    lit('bích không thành. Big blind check', 'bích không thành. {{t:big-blind|Big blind}} check'),
  ],
};
const EQUITY_WIERSZ = { 'zh-Hant': '權益', ja: 'エクイティ' };

function pliki(jezyk) {
  const baza = join(ROOT, 'content', jezyk);
  const out = [];
  for (const k of ['lessons', 'exams']) for (const f of readdirSync(join(baza, k))) out.push(`${k}/${f}`);
  for (const f of readdirSync(baza)) if (f.endsWith('.yaml') && f !== 'terms-nazwy.yaml') out.push(f);
  return out;
}

function krytyczne(rel, linie, nr) {
  if (/^lessons\/m12-/.test(rel) || rel === 'exams/m12.yaml') return true;
  if (rel !== 'rules.yaml') return false;
  for (let i = nr; i >= 0; i--) { const m = /^- id: (R-[\w-]+)/.exec(linie[i]); if (m) return m[1].startsWith('R-M12-'); }
  return false;
}

const raport = []; const m12 = []; const pozostale = []; let suma = 0;
for (const jezyk of Object.keys(REGULY).filter((j) => !JEZYKI || JEZYKI.includes(j))) {
  for (const rel of pliki(jezyk)) {
    const sciezka = join(ROOT, 'content', jezyk, rel);
    const linie = readFileSync(sciezka, 'utf8').split('\n');
    const enSc = join(ROOT, 'content', 'en', rel);
    const en = existsSync(enSc) ? readFileSync(enSc, 'utf8').split('\n') : null;
    let zmiany = 0;
    for (let i = 0; i < linie.length; i++) {
      let l = linie[i];
      // Pola `source:` (cytaty dosłowne « … » i tytuły źródeł, często po angielsku) — bez zmian (kontrola (a) AH, ŚREDNIE).
      if (/^\s*-?\s*source:/.test(l)) continue;
      for (const r of REGULY[jezyk]) {
        if (r.tylko && !r.tylko.test(rel)) continue;
        l = l.replace(r.re, (...a) => {
          const nowy = r.zamien(...a);
          if (nowy !== a[0]) { raport.push(`${jezyk} ${rel}:${i + 1} ${r.opis}: «${a[0]}» → «${nowy}»`); zmiany++; }
          return nowy;
        });
      }
      if (EQUITY_WIERSZ[jezyk] && l.includes('勝率')) {
        const ile = l.split('勝率').length - 1;
        const enL = en && en.length === linie.length ? en[i] : null;
        const eq = enL ? (enL.match(/equity/gi) ?? []).length : 0;
        if (enL && eq >= ile && !/win ?rate/i.test(enL)) {
          l = l.replaceAll('勝率', EQUITY_WIERSZ[jezyk]);
          raport.push(`${jezyk} ${rel}:${i + 1} 勝率 → ${EQUITY_WIERSZ[jezyk]} ×${ile} (en: equity ×${eq})`); zmiany += ile;
        } else pozostale.push(`${jezyk} ${rel}:${i + 1} 勝率 ×${ile} bez zmiany (en: equity ×${eq}${enL && /win ?rate/i.test(enL) ? ', win rate' : ''}${enL ? '' : ', brak wiersza en'})`);
      }
      if (l !== linie[i]) {
        if (krytyczne(rel, linie, i)) m12.push(`${jezyk} ${rel}:${i + 1}`);
        linie[i] = l;
      }
    }
    if (zmiany) { suma += zmiany; if (ZAPISZ) writeFileSync(sciezka, linie.join('\n')); }
  }
}

const tekst = [
  `# Ujednolicenie form (D-391) — ${ZAPISZ ? 'zapisane' : 'próba'}`, '',
  `Zamian: ${suma}; wierszy w treści krytycznej m12: ${m12.length}.`, '',
  '## m12 (ponowna kontrola (a))', ...m12.map((x) => `- ${x}`), '',
  '## 勝率 bez zmiany (inne znaczenie albo brak equity w en)', ...pozostale.map((x) => `- ${x}`), '',
  '## Zamiany', ...raport.map((x) => `- ${x}`), '',
].join('\n');
if (raportPlik) writeFileSync(raportPlik, tekst);
console.log(tekst.split('## Zamiany')[0]);
const policz = {};
for (const r of raport) { const k = r.split(' ')[0] + ' ' + r.split(': «')[0].split(' ').slice(2).join(' '); policz[k] = (policz[k] ?? 0) + 1; }
console.log(Object.entries(policz).map(([k, v]) => `${v}\t${k}`).join('\n'));
