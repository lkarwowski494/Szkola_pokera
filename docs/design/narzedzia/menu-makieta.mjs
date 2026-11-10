// menu-makieta.mjs — generuje ekrany/menu.html i ekrany/zebatka.html (sesja BE, KO-036, KO-041).
// Użycie: node narzedzia/menu-makieta.mjs (z katalogu docs/design). Treść:
// - etykiety istniejących kluczy z apps/mobile/src/i18n/locales/{pl,de}.json (today.*, learn.lessonsDone, advancement.title, exam.start, session.title.scenario);
// - moduły i liczba lekcji: content/pl/modules.yaml (14 modułów), content/pl/lessons (44 pliki, liczby na moduł policzone z nazw plików); lekcje m0-l1, m2-l1, m2-l2; EXAM_SIZE 15 (apps/mobile/src/features/drills/thresholds.ts:46);
// - [PRZYKŁAD]: postęp (3 z 44), wynik wskaźnika (38), liczba powtórek (7), poziom scenariuszy, nowe etykiety bez klucza (Lekcje, Scenariusze; de: przekład roli 09).
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const tu = dirname(fileURLToPath(import.meta.url));
const ekrany = resolve(tu, '../ekrany');

const ZEBATKA = 'M9.02 4.79L10.72 4.31L10.74 1.88L13.26 1.88L13.28 4.31L14.98 4.79L16.54 5.65L18.27 3.95L20.05 5.73L18.35 7.46L19.21 9.02L19.69 10.72L22.12 10.74L22.12 13.26L19.69 13.28L19.21 14.98L18.35 16.54L20.05 18.27L18.27 20.05L16.54 18.35L14.98 19.21L13.28 19.69L13.26 22.12L10.74 22.12L10.72 19.69L9.02 19.21L7.46 18.35L5.73 20.05L3.95 18.27L5.65 16.54L4.79 14.98L4.31 13.28L1.88 13.26L1.88 10.74L4.31 10.72L4.79 9.02L5.65 7.46L3.95 5.73L5.73 3.95L7.46 5.65Z';
const svgZebatka = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ZEBATKA}"/><circle cx="12" cy="12" r="3.6"/></svg>`;
const ikony = {
  lekcje: '<path d="M3 5.5c3-1.2 6-1.2 9 .8 3-2 6-2 9-.8v13c-3-1.2-6-1.2-9 .8-3-2-6-2-9-.8z"/><path d="M12 6.3v13"/>',
  scenariusze: '<rect x="2.5" y="6" width="19" height="12" rx="6"/><path d="M7 12h7.5M12 9.5l2.5 2.5-2.5 2.5"/>',
  cwiczenia: '<rect x="3.5" y="5" width="10" height="14" rx="2"/><path d="M15.5 6.5l4 1-3 11.5-3.2-.8"/>',
  powtorki: '<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4"/>',
  dzis: '<rect x="3" y="6" width="18" height="12" rx="6"/>',
  wskaznik: '<path d="M4 20V13M10 20V9M16 20V5M2.5 20h19"/>',
};
const ikona = (n) => `<svg class="ik" viewBox="0 0 24 24" aria-hidden="true">${ikony[n]}</svg>`;
const szewron = '<svg class="szewron" aria-hidden="true"><use href="#szewron"/></svg>';
const SYMBOLE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="szewron" viewBox="0 0 10 16"><path d="M2 2l6 6-6 6"/></symbol></svg>`;

const PL = {
  lang: 'pl', dzis: 'Dziś', ust: 'Ustawienia', powt: 'Powtórki', postep: 'Postęp', lekcje: 'Lekcje', scen: 'Scenariusze', sesja: 'Sesja ćwiczeń', wsk: 'Wskaźnik zaawansowania',
  lekcjaZ: (m, n) => `${m}, lekcja ${n}`, kont: 'Kontynuuj lekcję', zacznij: 'Zacznij lekcję', zrobione: (d, t) => `${d} z ${t} lekcji`,
  wiedza: (v) => `Wiedza ${v} na 100`, naDzis: (n) => `${n} na dziś`, brakPowt: 'Brak na dziś', poziom: (p) => `Poziom: ${p} (auto)`,
  sesjaOpis: 'Decyzje z oceną i wyjaśnieniem', scenOpis: 'Rozdanie od preflopu do rivera', limitTile: 'Darmowa jutro', kursKoniec: 'Wszystkie lekcje są ukończone. Ćwiczenia i powtórki działają dalej.',
  limit: 'Dzienny limit wykorzystany. Kolejna darmowa aktywność jutro; lekcje działają bez limitu.', pelny: 'Pełny dostęp', modul: 'Matematyka podstawowa', tytul: 'Pot odds', sub: 'Kiedy opłaca się sprawdzić',
};
const DE = {
  ...PL, lang: 'de', dzis: 'Heute', ust: 'Einstellungen', powt: 'Wiederholungen', postep: 'Fortschritt', lekcje: 'Lektionen', scen: 'Szenarien', sesja: 'Übungssession', wsk: 'Leistungsindex',
  lekcjaZ: (m, n) => `${m}, Lektion ${n}`, kont: 'Lektion fortsetzen', zrobione: (d, t) => `${d} von ${t} Lektionen`, wiedza: (v) => `Wissen ${v} von 100`, naDzis: (n) => `${n} für heute`,
  poziom: (p) => `Stufe: ${p} (automatisch)`, sesjaOpis: 'Entscheidungen mit Bewertung und Erklärung', scenOpis: 'Eine Hand von Preflop bis River', modul: 'Grundlagen der Mathematik', tytul: 'Pot Odds', sub: 'Wann sich ein Call lohnt',
};

// Stan: postęp i limit
const STANY = {
  'w-trakcie': { lekcja: [PL.modul, 2], przycisk: 'kont', zrobione: 3, wiedza: 38, powt: 7, poziom: 'średni', limit: false, koniec: false },
  nowy: { lekcja: ['Zasady i układy', 1], przycisk: 'zacznij', zrobione: 0, wiedza: 0, powt: 0, poziom: 'łatwy', limit: false, koniec: false, nowy: true },
  ukonczone: { lekcja: null, zrobione: 44, wiedza: 81, powt: 3, poziom: 'trudny', limit: false, koniec: true },
  limit: { lekcja: [PL.modul, 2], przycisk: 'kont', zrobione: 3, wiedza: 38, powt: 7, poziom: 'średni', limit: true, koniec: false },
};

const nav = (L) => `<div class="stan"><span>9:41</span><i></i></div>
  <nav class="nav"><span></span><a class="zebatka" href="#" aria-label="${L.ust}">${svgZebatka}</a></nav>
  <h1 class="duzy-tytul tytul">${L.dzis}</h1>`;

const sukno = (L, s) => s.koniec
  ? `<section class="lekcja koniec" aria-label="${L.kursKoniec}"><div class="sukno"><h2 class="tytul">${L.lang === 'pl' ? 'Kurs ukończony' : 'Kurs abgeschlossen'}</h2><p>${L.kursKoniec}</p></div></section>`
  : `<section class="lekcja" aria-label="${s.nowy ? 'Pierwsza lekcja' : 'Następna lekcja'}"><div class="sukno">
      <p>${L.lekcjaZ(L.lang === 'pl' ? s.lekcja[0] : L.modul, s.lekcja[1])}</p>
      <h2 class="tytul">${s.nowy ? (L.lang === 'pl' ? 'Układy kart' : 'Hände') : L.tytul}</h2>
      <p>${s.nowy ? 'Co wygrywa z czym' : L.sub}</p>
      <a class="przycisk" href="#">${L[s.przycisk]}</a></div></section>`;

const kafel = (ik, tytul, stan, { szeroki = false, limit = false } = {}) =>
  `<a class="kafel${szeroki ? ' szeroki' : ''}${limit ? ' zablokowany' : ''}" href="#" aria-label="${tytul}. ${stan}.">${ikona(ik)}<b>${tytul}</b><span>${stan}</span></a>`;

const stopkaLimitu = (L, s) => s.limit ? `<p class="przypis limit"><b>${L.limit}</b></p><a class="link limit-link" href="#">${L.pelny}</a>` : '';

const zakladki = (pozycje, aktywna) => `<nav class="zakladki" aria-label="Zakładki">${pozycje.map(([n, ik, badge]) =>
  `<a href="#"${n === aktywna ? ' aria-current="page"' : ''} aria-label="${n}${badge ? `, ${badge} na dziś` : ''}"><span class="zk">${ikona(ik)}${badge ? `<em>${badge}</em>` : ''}</span>${n}</a>`).join('')}</nav>`;

// W1: sukno (element firmowy) + 2×2 kafelki; pasek bez zmian (Dziś · Powtórki · Postęp), liczba powtórek jako plakietka na zakładce
function w1(L, s, id) {
  return `<main data-ekran="${id}" lang="${L.lang}" aria-label="${L.dzis}, wariant 1">
  ${nav(L)}
  ${sukno(L, s)}
  <div class="kafle">
    ${kafel('lekcje', L.lekcje, L.zrobione(s.zrobione, 44))}
    ${kafel('scenariusze', L.scen, s.limit ? L.limitTile : s.nowy ? L.scenOpis : L.poziom(s.poziom), { limit: s.limit })}
    ${kafel('cwiczenia', L.sesja, s.limit ? L.limitTile : L.sesjaOpis, { limit: s.limit })}
    ${kafel('wskaznik', L.wsk, L.wiedza(s.wiedza))}
  </div>
  ${stopkaLimitu(L, s)}
  ${zakladki([[L.dzis, 'dzis'], [L.powt, 'powtorki', s.powt || 0], [L.postep, 'wskaznik']], L.dzis)}
</main>`;
}

// W2: wszystko jako kafelki; „Kontynuuj” = szeroki kafelek na suknie; pasek Dziś · Lekcje · Postęp; Powtórki jako kafelek z liczbą
function w2(L, s, id) {
  const kont = s.koniec
    ? `<a class="kafel sukno-kafel szeroki" href="#" aria-label="${L.kursKoniec}"><b class="tytul">${L.lang === 'pl' ? 'Kurs ukończony' : 'Kurs abgeschlossen'}</b><span>${L.kursKoniec}</span></a>`
    : `<a class="kafel sukno-kafel szeroki" href="#" aria-label="${L[s.przycisk]}: ${s.nowy ? 'Układy kart' : L.tytul}. ${L.lekcjaZ(L.lang === 'pl' ? s.lekcja[0] : L.modul, s.lekcja[1])}."><span>${L.lekcjaZ(L.lang === 'pl' ? s.lekcja[0] : L.modul, s.lekcja[1])}</span><b class="tytul">${s.nowy ? (L.lang === 'pl' ? 'Układy kart' : 'Hände') : L.tytul}</b><i class="mini-przycisk">${L[s.przycisk]}</i></a>`;
  return `<main data-ekran="${id}" lang="${L.lang}" aria-label="${L.dzis}, wariant 2">
  ${nav(L)}
  <div class="kafle w2">
    ${kont}
    ${kafel('powtorki', L.powt, s.powt ? L.naDzis(s.powt) : s.nowy ? (L.lang === 'pl' ? 'Po pierwszej lekcji' : 'Nach der ersten Lektion') : L.brakPowt)}
    ${kafel('cwiczenia', L.sesja, s.limit ? L.limitTile : L.sesjaOpis, { limit: s.limit })}
    ${kafel('scenariusze', L.scen, s.limit ? L.limitTile : s.nowy ? L.scenOpis : L.poziom(s.poziom), { limit: s.limit })}
    ${kafel('wskaznik', L.wsk, L.wiedza(s.wiedza))}
  </div>
  ${stopkaLimitu(L, s)}
  ${zakladki([[L.dzis, 'dzis'], [L.lekcje, 'lekcje'], [L.postep, 'wskaznik']], L.dzis)}
</main>`;
}

// Ekran „Lekcje” (wspólny): moduły jako lista grupowana z postępem; bieżący moduł rozwinięty, reszta zwinięta (stuknięcie rozwija w miejscu)
const MODULY = [['Zasady i układy', 1, 1], ['Przebieg rozdania', 1, 1], ['Matematyka podstawowa', 2, 1], ['Pozycja i otwarcia', 3, 0], ['Preflop wobec akcji', 4, 0], ['Flop: c-bet', 4, 0], ['Flop: obrona', 3, 0], ['Turn', 4, 0], ['River', 4, 0], ['Plan rozdania', 4, 0], ['Eksploatacja mikrostawek', 4, 0], ['Turnieje i short stacki', 3, 0], ['Mental game i bankroll', 4, 0], ['Analiza własnej gry', 3, 0]];
function lekcje() {
  const lekcjeM2 = [['Outy i szanse', 'Reguła 2 i 4', 'done'], ['Pot odds', 'Kiedy opłaca się sprawdzić', 'started']];
  const wiersz = ([t, s, st]) => `<a href="#" aria-label="${t}. ${s}.${st === 'done' ? ' Ukończona.' : st === 'started' ? ' Rozpoczęta.' : ''}"><span class="kropka ${st}">${st === 'done' ? '✓' : ''}</span><span class="opis">${t}<small>${s}</small></span>${szewron}</a>`;
  return `<main data-ekran="lekcje" lang="pl" aria-label="Lekcje">
  <div class="stan"><span>9:41</span><i></i></div>
  <nav class="nav"><a href="#">‹ Dziś</a><span></span></nav>
  <h1 class="duzy-tytul tytul">Lekcje</h1>
  <p class="przypis postep-lekcji"><b>3 z 44 lekcji</b> <span class="przyklad">[PRZYKŁAD]</span></p>
  <div class="pasek-postepu" role="img" aria-label="3 z 44 lekcji ukończonych"><i style="width:7%"></i></div>
  <div class="grupa moduly">
    ${MODULY.map(([n, razem, zrob], i) => i === 2
      ? `<div class="modul otwarty"><a href="#" aria-expanded="true" aria-label="${n}. ${zrob} z ${razem}. Zwiń."><span class="opis"><b>${n}</b><small>${zrob} z ${razem}</small></span><span class="strzalka" aria-hidden="true">⌃</span></a>
         <div class="lista">${lekcjeM2.map(wiersz).join('')}<a href="#" class="egzamin" aria-label="Egzamin modułu. 15 pytań."><span class="kropka egz"></span><span class="opis">Egzamin modułu<small>15 pytań</small></span>${szewron}</a></div></div>`
      : `<a href="#" aria-expanded="false" aria-label="${n}. ${zrob} z ${razem}${zrob === razem ? ', ukończony' : ''}. Rozwiń."><span class="opis"><b>${n}</b><small>${zrob === razem ? 'Ukończony' : `${zrob} z ${razem}`}</small></span><span class="strzalka" aria-hidden="true">⌄</span></a>`).join('')}
  </div>
</main>`;
}

const html = (tytul, opis, css, cialo) => `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>${tytul}</title>
<!-- ${opis}
     Wygenerowane przez narzedzia/menu-makieta.mjs; nie edytuj ręcznie. -->
<link rel="stylesheet" href="e3.css">
<link rel="stylesheet" href="${css}">
</head>
<body>
${SYMBOLE}
${cialo}
</body>
</html>
`;

const ekranyMenu = [
  ...Object.entries(STANY).map(([k, s]) => w1(PL, s, `w1-${k}`)),
  ...Object.entries(STANY).map(([k, s]) => w2(PL, s, `w2-${k}`)),
  w1(DE, STANY['w-trakcie'], 'w1-de'),
  w2(DE, STANY['w-trakcie'], 'w2-de'),
  lekcje(),
].join('\n');
writeFileSync(resolve(ekrany, 'menu.html'), html('Menu główne: warianty', 'Sesja BE (rola 04): menu kafelkowe KO-041, warianty W1 i W2, stany: w trakcie, nowy, ukończone, limit; de jako najdłuższy język; ekran „Lekcje”. Dane [PRZYKŁAD] opisane w narzedzia/menu-makieta.mjs.', 'menu.css', ekranyMenu));

// Zębatka: przed (znak tekstowy „⚙︎” 17 pt, jak apps/mobile/src/app/(tabs)/index.tsx:84-88) i po (rysunek 24 pt, kreska 2 pt, przycisk 44×44)
const zebatka = `<main data-ekran="zebatka" aria-label="Zębatka ustawień: przed i po">
  <div class="stan"><span>9:41</span><i></i></div>
  <p class="etykieta">Przed (build 1010): znak tekstowy 17 pt, cel 17 pt + hitSlop 12</p>
  <nav class="nav"><span></span><a class="zebatka-przed" href="#" aria-label="Ustawienia">⚙︎</a></nav>
  <h1 class="duzy-tytul tytul">Dziś</h1>
  <p class="etykieta">Po: rysunek 24 pt, kreska 2 pt, przycisk 44×44 pt</p>
  <nav class="nav"><span></span><a class="zebatka" href="#" aria-label="Ustawienia">${svgZebatka}</a></nav>
  <h1 class="duzy-tytul tytul">Dziś</h1>
  <p class="etykieta">Po, obszar dotyku zaznaczony</p>
  <nav class="nav"><span></span><a class="zebatka pokaz-cel" href="#" aria-label="Ustawienia">${svgZebatka}</a></nav>
  <h1 class="duzy-tytul tytul">Dziś</h1>
</main>`;
writeFileSync(resolve(ekrany, 'zebatka.html'), html('Zębatka ustawień', 'Sesja BE (rola 04): zębatka KO-036, przed i po.', 'menu.css', zebatka));
console.log('OK menu.html, zebatka.html');
