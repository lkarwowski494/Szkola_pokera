// powtorki-pusta-makieta.mjs — generuje ekrany/powtorki-pusta.html (sesja BY, rola 04 fix, BI-002: stuknięcie kafelka Powtórki przy pustej kolejce).
// Użycie: node narzedzia/powtorki-pusta-makieta.mjs (z katalogu docs/design). Style: e3.css + menu.css + powtorki-pusta.css (kolory wyłącznie z tokeny.css).
// Treść:
// - teksty istniejących kluczy z apps/mobile/src/i18n/locales/pl.json (odczyt 2026-11-10 @ 70fdf40): review.title, review.none, review.next,
//   start.title.reviews, start.counter_few, start.renews, start.alwaysFree, start.begin, start.fullAccess, start.backToLesson, session.close,
//   today.reviewsTile, today.reviewsTileNone, today.afterFirstLesson;
// - nowe teksty pl (opcje A i C) oznaczone NOWY w obiekcie PL; przekład de: rola 09, w makiecie [PRZYKŁAD];
// - [PRZYKŁAD]: godzina następnej powtórki (jutro 14:20), godzina odnowienia limitu (00:00), lekcja „Pot odds”.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const tu = dirname(fileURLToPath(import.meta.url));
const ekrany = resolve(tu, '../ekrany');

const ikony = {
  scenariusze: '<rect x="2.5" y="6" width="19" height="12" rx="6"/><path d="M7 12h7.5M12 9.5l2.5 2.5-2.5 2.5"/>',
  cwiczenia: '<rect x="3.5" y="5" width="10" height="14" rx="2"/><path d="M15.5 6.5l4 1-3 11.5-3.2-.8"/>',
  powtorki: '<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4"/>',
  lekcje: '<path d="M3 5.5c3-1.2 6-1.2 9 .8 3-2 6-2 9-.8v13c-3-1.2-6-1.2-9 .8-3-2-6-2-9-.8z"/><path d="M12 6.3v13"/>',
  dzis: '<rect x="3" y="6" width="18" height="12" rx="6"/>',
  wskaznik: '<path d="M4 20V13M10 20V9M16 20V5M2.5 20h19"/>',
};
const ikona = (n) => `<svg class="ik" viewBox="0 0 24 24" aria-hidden="true">${ikony[n]}</svg>`;

const PL = {
  powt: 'Powtórki', sesja: 'Sesja ćwiczeń', scen: 'Scenariusze', sesjaOpis: 'Decyzje z oceną i wyjaśnieniem',
  brak: 'Brak na dziś', poPierwszej: 'Po pierwszej lekcji', poM2: 'Po pierwszej lekcji modułu 2', poziom: 'Poziom: średni (auto)',
  // istniejące klucze (przed)
  licznik: 'Dzienny limit: 2 darmowe aktywności na dziś.', licznik0: 'Dzienny limit: 0 darmowych aktywności na dziś.',
  odnowi: 'Limit odnowi się o północy (00:00).', zawsze: 'Lekcje i pierwsze podejście do egzaminu są zawsze darmowe.',
  zacznij: 'Zacznij', pelny: 'Pełny dostęp', wrocLekcja: 'Wróć do lekcji', zamknij: 'Zamknij',
  pustaDzis: 'Nic nie czeka na powtórkę. Zrób nową lekcję albo wróć później.',
  // NOWY (opcja A): review.emptyToday + review.next (istniejący klucz, „when” z formatera), review.emptyNew
  pustaBrak: 'Na dziś nie masz powtórek.', nastepna: 'Następna powtórka: jutro o 14:20',
  pustaNowy: 'Powtórki pojawią się po pierwszej lekcji.', pustaNowyOpis: 'Zadania z lekcji wracają tu w odstępach, a te z błędem wcześniej.',
  // NOWY (opcja C): today.reviewsTileNext
  kafelNastepna: 'Brak na dziś, następna jutro',
};

const nav = '<div class="stan"><span>9:41</span><i></i></div>';
const kafel = (ik, tytul, stan, { szeroki = false, nieaktywny = false } = {}) =>
  `<a class="kafel${szeroki ? ' szeroki' : ''}${nieaktywny ? ' nieaktywny' : ''}" href="#"${nieaktywny ? ' aria-disabled="true"' : ''} aria-label="${tytul}. ${stan}."><b>${ikona(ik)}${tytul}</b><span>${stan}</span></a>`;
const zakladki = `<nav class="zakladki" aria-label="Zakładki"><a href="#" aria-current="page"><span class="zk">${ikona('dzis')}</span>Dziś</a><a href="#"><span class="zk">${ikona('lekcje')}</span>Lekcje</a><a href="#"><span class="zk">${ikona('wskaznik')}</span>Postęp</a></nav>`;
const sukno = (akcja, miejsce, tytul) => `<a class="kafel sukno-kafel szeroki" href="#" aria-label="${akcja}: ${tytul}. ${miejsce}."><span>${miejsce}</span><b class="tytul">${tytul}</b><i class="mini-przycisk">${akcja}</i></a>`;

// Dziś: fragment z kafelkami (sukno + 3 kafelki), stan powtórek do porównania
function dzis(id, podpis, { nowy = false, stanPowt, nieaktywny = false }) {
  return `<main data-ekran="${id}" lang="pl" aria-label="Dziś">
  ${nav}
  <p class="etykieta podpis">${podpis}</p>
  <h1 class="duzy-tytul tytul">Dziś</h1>
  <div class="kafle w2">
    ${nowy ? sukno('Zacznij lekcję', 'Zasady i układy, lekcja 1', 'Układy kart') : sukno('Kontynuuj lekcję', 'Matematyka podstawowa, lekcja 2', 'Pot odds')}
    ${kafel('powtorki', PL.powt, stanPowt, { nieaktywny })}
    ${kafel('cwiczenia', PL.sesja, PL.sesjaOpis)}
    ${kafel('scenariusze', PL.scen, nowy ? PL.poM2 : PL.poziom, { szeroki: true })}
  </div>
  ${zakladki}
</main>`;
}

// Ekran startu (EkranStartu.tsx): tytuł, licznik, [odnowienie], przypis, przycisk
function start(id, podpis, { wyczerpany }) {
  return `<main data-ekran="${id}" lang="pl" aria-label="${PL.powt}">
  ${nav}
  <p class="etykieta podpis">${podpis}</p>
  <h1 class="tytul ekran-tytul">${PL.powt}</h1>
  <p class="naglowek">${wyczerpany ? PL.licznik0 : PL.licznik}</p>
  ${wyczerpany ? `<p class="tresc">${PL.odnowi}</p>` : ''}
  <p class="przypis">${PL.zawsze}</p>
  <div class="przyciski gora">
    <a class="przycisk glowny" href="#">${wyczerpany ? PL.pelny : PL.zacznij}</a>
    ${wyczerpany ? `<a class="przycisk duch" href="#">${PL.wrocLekcja}</a>` : ''}
  </div>
</main>`;
}

// Pusty stan sesji powtórek (session.tsx `stan: 'pusta'`): tytuł, treść, Zamknij
function pusta(id, podpis, linie) {
  return `<main data-ekran="${id}" lang="pl" aria-label="${PL.powt}">
  ${nav}
  <p class="etykieta podpis">${podpis}</p>
  <h1 class="tytul ekran-tytul">${PL.powt}</h1>
  ${linie.map(([kl, t]) => `<p class="${kl}">${t}</p>`).join('\n  ')}
  <div class="przyciski gora">
    <a class="przycisk glowny" href="#">${PL.zamknij}</a>
  </div>
</main>`;
}

const ekranyHtml = [
  // PRZED (stan @ 70fdf40): Dziś „Brak na dziś” → ekran startu → „Zacznij” → pusty stan
  dzis('przed-dzis-brak', 'Przed: kafelek „Brak na dziś”', { stanPowt: PL.brak }),
  start('przed-start', 'Przed, krok 2: ekran startu z licznikiem', { wyczerpany: false }),
  start('przed-start-limit', 'Przed, krok 2 przy wyczerpanym limicie', { wyczerpany: true }),
  pusta('przed-pusta', 'Przed, krok 3: po „Zacznij”', [['tresc muted', PL.pustaDzis]]),
  // OPCJA A: stuknięcie przy 0 na dziś → od razu pusty stan z terminem (bez licznika i bez „Pełny dostęp”)
  pusta('a-pusta-brak', 'A: od razu pusty stan z terminem', [['naglowek', PL.pustaBrak], ['tresc', PL.nastepna]]),
  pusta('a-pusta-nowy', 'A: przed pierwszą lekcją', [['naglowek', PL.pustaNowy], ['tresc muted', PL.pustaNowyOpis]]),
  // OPCJA B: kafelek nieaktywny w stanach „Po pierwszej lekcji” i „Brak na dziś”
  dzis('b-dzis-nowy', 'B: kafelek nieaktywny (nowy)', { nowy: true, stanPowt: PL.poPierwszej, nieaktywny: true }),
  dzis('b-dzis-brak', 'B: kafelek nieaktywny (brak na dziś)', { stanPowt: PL.brak, nieaktywny: true }),
  // OPCJA C: A + termin na kafelku
  dzis('c-dzis-brak', 'C: termin na kafelku (+ ekran jak A)', { stanPowt: PL.kafelNastepna }),
].join('\n');

writeFileSync(resolve(ekrany, 'powtorki-pusta.html'), `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>Powtórki: pusta kolejka</title>
<!-- Sesja BY (rola 04, fix BI-002): stuknięcie kafelka Powtórki przy pustej kolejce; przed (70fdf40) i opcje A, B, C.
     Wygenerowane przez narzedzia/powtorki-pusta-makieta.mjs; nie edytuj ręcznie. -->
<link rel="stylesheet" href="e3.css">
<link rel="stylesheet" href="menu.css">
<link rel="stylesheet" href="powtorki-pusta.css">
</head>
<body>
${ekranyHtml}
</body>
</html>
`);
console.log('OK powtorki-pusta.html');
