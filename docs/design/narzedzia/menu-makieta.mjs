// menu-makieta.mjs — generuje ekrany/menu.html i ekrany/zebatka.html (sesja BE/BH, KO-036, KO-041, wariant końcowy KO-045).
// Historia wyboru: warianty W1/W2 @ be3d801 (porównanie wzorce-zrzuty/menu/porownanie-w1-w2-*.png) i v2 @ a45979d; tu tylko układ końcowy.
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
  ustawienia: `<path d="${ZEBATKA}"/><circle cx="12" cy="12" r="3.6"/>`,
  dzis: '<rect x="3" y="6" width="18" height="12" rx="6"/>',
  wskaznik: '<path d="M4 20V13M10 20V9M16 20V5M2.5 20h19"/>',
};
const ikona = (n) => `<svg class="ik" viewBox="0 0 24 24" aria-hidden="true">${ikony[n]}</svg>`;
const szewron = '<svg class="szewron" aria-hidden="true"><use href="#szewron"/></svg>';
const SYMBOLE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="szewron" viewBox="0 0 10 16"><path d="M2 2l6 6-6 6"/></symbol></svg>`;

const PL = {
  lang: 'pl', dzis: 'Dziś', ust: 'Ustawienia', powt: 'Powtórki', postep: 'Postęp', lekcje: 'Lekcje', scen: 'Scenariusze', sesja: 'Sesja ćwiczeń', wsk: 'Wskaźnik zaawansowania', wskKrotki: 'Wskaźnik',
  lekcjaZ: (m, n) => `${m}, lekcja ${n}`, kont: 'Kontynuuj lekcję', zacznij: 'Zacznij lekcję', zrobione: (d, t) => `${d} z ${t} lekcji`,
  wiedza: (v) => `Wiedza ${v} na 100`, naDzis: (n) => `${n} na dziś`, brakPowt: 'Brak na dziś', poziom: (p) => `Poziom: ${p} (auto)`,
  sesjaOpis: 'Decyzje z oceną i wyjaśnieniem', scenOpis: 'Rozdanie od preflopu do rivera', limitTile: 'Darmowa jutro', kursKoniec: 'Wszystkie lekcje są ukończone. Ćwiczenia i powtórki działają dalej.',
  limit: 'Dzienny limit wykorzystany. Kolejna darmowa aktywność jutro; lekcje działają bez limitu.', pelny: 'Pełny dostęp', modul: 'Matematyka podstawowa', tytul: 'Pot odds', sub: 'Kiedy opłaca się sprawdzić',
};
const DE = {
  ...PL, lang: 'de', dzis: 'Heute', ust: 'Einstellungen', powt: 'Wiederholungen', postep: 'Fortschritt', lekcje: 'Lektionen', scen: 'Szenarien', sesja: 'Übungssession', wsk: 'Leistungsindex', wskKrotki: 'Leistungsindex',
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
  `<a class="kafel${szeroki ? ' szeroki' : ''}${limit ? ' zablokowany' : ''}" href="#" aria-label="${tytul}. ${stan}."><b>${ikona(ik)}${tytul}</b><span>${stan}</span></a>`;

const stopkaLimitu = (L, s) => s.limit ? `<p class="przypis limit"><b>${L.limit}</b></p><a class="link limit-link" href="#">${L.pelny}</a>` : '';

const zakladki = (pozycje, aktywna) => `<nav class="zakladki" aria-label="Zakładki">${pozycje.map(([n, ik, badge]) =>
  `<a href="#"${n === aktywna ? ' aria-current="page"' : ''} aria-label="${n}${badge ? `, ${badge} na dziś` : ''}"><span class="zk">${ikona(ik)}${badge ? `<em>${badge}</em>` : ''}</span>${n}</a>`).join('')}</nav>`;

// Treść kafelków (BR-MENU-001 po erracie ER-16: lekcje z zakładki „Lekcje”, bez kafelka lekcji; kafelek bez treści mówi, co go odblokuje)
const kPowt = (L, s) => kafel('powtorki', L.powt, s.powt ? L.naDzis(s.powt) : s.nowy ? (L.lang === 'pl' ? 'Po pierwszej lekcji' : 'Nach der ersten Lektion') : L.brakPowt);
const kSesja = (L, s) => kafel('cwiczenia', L.sesja, s.limit ? L.limitTile : L.sesjaOpis, { limit: s.limit });
const kScen = (L, s) => kafel('scenariusze', L.scen, s.nowy ? (L.lang === 'pl' ? 'Po pierwszej lekcji modułu 2' : 'Nach der ersten Lektion von Modul 2') : s.limit ? L.limitTile : L.poziom(s.poziom), { limit: s.limit && !s.nowy });
// Pasek KO-045: Dziś · Lekcje · Postęp, bez plakietki (liczba powtórek jest na kafelku)
const pasek = (L, aktywna) => zakladki([[L.dzis, 'dzis'], [L.lekcje, 'lekcje'], [L.postep, 'wskaznik']], aktywna);

// Dziś (KO-045, wariant końcowy = W2 z be3d801 bez kafelka Wskaźnik): zębatka (D-540) + szeroki kafelek „Kontynuuj” na suknie + Powtórki, Sesja ćwiczeń, Scenariusze
function dzis(L, s, id) {
  const miejsce = s.lekcja && L.lekcjaZ(L.lang === 'pl' ? s.lekcja[0] : L.modul, s.lekcja[1]);
  const tytul = s.nowy ? (L.lang === 'pl' ? 'Układy kart' : 'Hände') : L.tytul;
  const kont = s.koniec
    ? `<a class="kafel sukno-kafel szeroki" href="#" aria-label="${L.lang === 'pl' ? 'Kurs ukończony' : 'Kurs abgeschlossen'}. ${L.kursKoniec}"><b class="tytul">${L.lang === 'pl' ? 'Kurs ukończony' : 'Kurs abgeschlossen'}</b><span>${L.kursKoniec}</span></a>`
    : `<a class="kafel sukno-kafel szeroki" href="#" aria-label="${L[s.przycisk]}: ${tytul}. ${miejsce}."><span>${miejsce}</span><b class="tytul">${tytul}</b><i class="mini-przycisk">${L[s.przycisk]}</i></a>`;
  return `<main data-ekran="${id}" lang="${L.lang}" aria-label="${L.dzis}">
  ${nav(L)}
  <div class="kafle w2">
    ${kont}
    ${kPowt(L, s)}
    ${kSesja(L, s)}
    ${kScen(L, s)}
  </div>
  ${stopkaLimitu(L, s)}
  ${pasek(L, L.dzis)}
</main>`;
}

// Postęp (KO-045): Wskaźnik zaawansowania na górze ekranu, jak AdvancementCard w apps/mobile/src/app/(tabs)/progress.tsx:45-46 (plakietka z liczbą, tytuł, „Wiedza N”, ›); niżej istniejące statystyki (progress.accuracy, answers, streak)
function postep(L, s, id) {
  const stat = s.nowy
    ? `<p class="przypis">Zrób pierwsze ćwiczenia, a tu pojawią się twoje statystyki.</p>`
    : `<div class="grupa statystyki"><div><span class="opis"><b>Trafność: 74%</b><small>212 odpowiedzi · Seria: 5 dni</small></span></div></div><p class="przypis przyklad">[PRZYKŁAD] liczby</p>`;
  return `<main data-ekran="${id}" lang="${L.lang}" aria-label="${L.postep}">
  <div class="stan"><span>9:41</span><i></i></div>
  <h1 class="duzy-tytul tytul bez-nav">${L.postep}</h1>
  <a class="wsk-karta" href="#" aria-label="${L.wsk}: ${s.wiedza} na 100. Wiedza ${s.wiedza}." aria-describedby="${id}-hint"><span class="plakietka">${s.wiedza}</span><span class="opis"><b>${L.wsk}</b><small>Wiedza ${s.wiedza}</small></span>${szewron}</a>
  <p id="${id}-hint" hidden>Pokazuje wynik w obszarach kursu</p>
  ${stat}
  ${pasek(L, L.postep)}
</main>`;
}

// Ekran „Lekcje” (wspólny): moduły jako lista grupowana z postępem; bieżący moduł rozwinięty, reszta zwinięta (stuknięcie rozwija w miejscu)
const MODULY = [['Zasady i układy', 1, 1], ['Przebieg rozdania', 1, 1], ['Matematyka podstawowa', 2, 1], ['Pozycja i otwarcia', 3, 0], ['Preflop wobec akcji', 4, 0], ['Flop: c-bet', 4, 0], ['Flop: obrona', 3, 0], ['Turn', 4, 0], ['River', 4, 0], ['Plan rozdania', 4, 0], ['Eksploatacja mikrostawek', 4, 0], ['Turnieje i short stacki', 3, 0], ['Mental game i bankroll', 4, 0], ['Analiza własnej gry', 3, 0]];
function lekcje() {
  const lekcjeM2 = [['Outy i szanse', 'Reguła 2 i 4', 'done'], ['Pot odds', 'Kiedy opłaca się sprawdzić', 'started']];
  const wiersz = ([t, s, st]) => `<a href="#" aria-label="${t}. ${s}.${st === 'done' ? ' Ukończona.' : st === 'started' ? ' Rozpoczęta.' : ''}"><span class="kropka ${st}">${st === 'done' ? '✓' : ''}</span><span class="opis">${t}<small>${s}</small></span>${szewron}</a>`;
  return `<main data-ekran="lekcje" lang="pl" aria-label="Lekcje">
  <div class="stan"><span>9:41</span><i></i></div>
  <h1 class="duzy-tytul tytul bez-nav">Lekcje</h1>
  <p class="przypis postep-lekcji"><b>3 z 44 lekcji</b> <span class="przyklad">[PRZYKŁAD]</span></p>
  <div class="pasek-postepu" role="img" aria-label="3 z 44 lekcji ukończonych"><i style="width:7%"></i></div>
  <div class="grupa moduly">
    ${MODULY.map(([n, razem, zrob], i) => i === 2
      ? `<div class="modul otwarty"><a href="#" aria-expanded="true" aria-label="${n}. ${zrob} z ${razem}. Zwiń."><span class="opis"><b>${n}</b><small>${zrob} z ${razem}</small></span><span class="strzalka" aria-hidden="true">⌃</span></a>
         <div class="lista">${lekcjeM2.map(wiersz).join('')}<a href="#" class="egzamin" aria-label="Egzamin modułu. 15 pytań."><span class="kropka egz"></span><span class="opis">Egzamin modułu<small>15 pytań</small></span>${szewron}</a></div></div>`
      : `<a href="#" aria-expanded="false" aria-label="${n}. ${zrob} z ${razem}${zrob === razem ? ', ukończony' : ''}. Rozwiń."><span class="opis"><b>${n}</b><small>${zrob === razem ? 'Ukończony' : `${zrob} z ${razem}`}</small></span><span class="strzalka" aria-hidden="true">⌄</span></a>`).join('')}
  </div>
  ${pasek(PL, PL.lekcje)}
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
  ...Object.entries(STANY).map(([k, s]) => dzis(PL, s, `dzis-${k}`)),
  dzis(DE, STANY['w-trakcie'], 'dzis-de'),
  lekcje(),
  postep(PL, STANY['w-trakcie'], 'postep'),
  postep(PL, STANY.nowy, 'postep-nowy'),
].join('\n');
writeFileSync(resolve(ekrany, 'menu.html'), html('Menu główne', 'Sesja BH (rola 04): menu kafelkowe, wariant końcowy KO-045 (W2 + Wskaźnik w Postępie); Dziś w stanach: w trakcie, nowy, ukończone, limit; de jako najdłuższy język; zakładki Lekcje i Postęp. Dane [PRZYKŁAD] opisane w narzedzia/menu-makieta.mjs.', 'menu.css', ekranyMenu));

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
