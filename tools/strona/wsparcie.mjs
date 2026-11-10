// Strona wsparcia (K-10, D-308; Apple 1.5: „easy way to contact you”): site/support.html, pl i en jak Trening site/support.html
// (2e4b0f8, odczyt 2026-11-09). Zdanie pomocy przy hazardzie i link: z content/helplines.yaml (jedno źródło, D-158 — bez
// numerów krajowych); wersja en = roboczy przekład do roli 09 (jak etykiety w en.md). Etykiety przycisków pl = pl.json.
// Kontakt: support@apps4brew.com (W-04, 2026-11-10); publikacja tylko za zgodą właściciela (D-308). Użycie: node tools/strona/wsparcie.mjs [--zapisz]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STYL } from './polityka.mjs';

const korzen = join(dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Zdanie ogólne (fallback.text) i adres pomocy online z content/helplines.yaml — bez parsera YAML: pola w jednej linii. */
export function pomocZTresci() {
  const y = readFileSync(join(korzen, 'content/helplines.yaml'), 'utf8');
  const zdanie = /^\s{2}text: '(.+)'$/m.exec(y)?.[1]?.replace(/''/g, "'");
  const adres = /^\s{8}url: (https:\/\/\S+)$/m.exec(y)?.[1];
  const nazwa = /^\s{4}name: '(.+)'$/m.exec(y)?.[1];
  if (!zdanie || !adres || !nazwa) throw new Error('content/helplines.yaml: brak fallback.text, nazwy albo adresu wpisu');
  return { zdanie, adres, nazwa };
}

export function stronaWsparcia() {
  const p = pomocZTresci();
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PokerGym — wsparcie / Support</title>
${STYL}
</head>
<body>
<main>
<!-- Plik generowany: node tools/strona/wsparcie.mjs --zapisz. Pomoc przy hazardzie z content/helplines.yaml (H-INT-1, H-INT-2).
     Adres poczty (W-04) wpisany 2026-11-10; publikacja i włączenie Pages tylko za zgodą właściciela (D-308). -->
<nav><a href="privacy.html">Prywatność / Privacy</a><a href="#en">English</a></nav>
<section lang="pl" id="pl">
<h1>PokerGym — wsparcie</h1>
<h2>Kontakt</h2>
<p>Pytania, błędy i pomysły: support@apps4brew.com. Aplikacja niczego nie wysyła sama — e-mail wysyłasz Ty, ze swojej poczty.
Błąd w konkretnym zadaniu zgłosisz też przyciskiem „Zgłoś błąd w tym zadaniu” pod oceną.</p>
<p>Jak przetwarzamy wiadomości, które do nas wysyłasz, opisuje <a href="privacy.html">polityka prywatności</a> (sekcja „Gdy do nas piszesz”).</p>
<h2>Pomoc przy problemie z hazardem</h2>
<p>Aplikacja uczy decyzji w pokerze i nie ma w niej gry na pieniądze ani na żetony. ${esc(p.zdanie)}</p>
<p>Pomoc online: <a href="${p.adres}">${esc(p.nazwa)}</a>. Ten sam kontakt znajdziesz w aplikacji, w ekranie „Pomoc”.</p>
<h2>Pytania i odpowiedzi</h2>
<h3>Gdzie są moje dane?</h3>
<p>Tylko na Twoim telefonie, w pamięci aplikacji. Aplikacja nie ma konta i nic nie wysyła. Szczegóły: <a href="privacy.html">polityka prywatności</a>.</p>
<h3>Jak usunąć postęp?</h3>
<p>Ustawienia → „Usuń postęp” albo usuń aplikację z telefonu. Zakupy zostają (obsługuje je Apple).</p>
<h3>Jak zmienić język?</h3>
<p>Ustawienia → „Język”.</p>
<h3>Co jest za darmo, a co daje pełny dostęp?</h3>
<p>Lekcje są darmowe. Pełny dostęp zdejmuje dzienny limit: sesje ćwiczeń, powtórki i powtórne egzaminy każdego dnia. Aktualne ceny widzisz na ekranie „Pełny dostęp” i w App Store; strona ich nie podaje.</p>
<h3>Jak anulować subskrypcję?</h3>
<p>Subskrypcję anulujesz w ustawieniach konta Apple (Subskrypcje); w aplikacji otwiera je Ustawienia → „Zarządzaj subskrypcją”. Po anulowaniu nie odnowi się, a pełny dostęp zostaje do końca opłaconego okresu. Usunięcie aplikacji nie anuluje subskrypcji. Zwroty rozpatruje Apple.</p>
<h3>Jak przywrócić zakup na nowym telefonie?</h3>
<p>Zakupy są przypisane do konta Apple. Zaloguj się na to samo konto Apple i stuknij „Przywróć zakupy” w ustawieniach albo na ekranie „Pełny dostęp”.</p>
</section>
<hr>
<section lang="en" id="en">
<!-- Roboczy przekład (rola 09 ustali brzmienie i etykiety przycisków po przekładzie aplikacji). -->
<h1>PokerGym — Support</h1>
<h2>Contact</h2>
<p>Questions, bugs and ideas: support@apps4brew.com. The app never sends anything by itself — you send the email, from your own mail app.
You can also report a mistake in a specific task with “Report a problem with this task” below the grade.</p>
<p>How we handle the messages you send us is described in the <a href="privacy.html#en">privacy policy</a> (section “When you write to us”).</p>
<h2>Help with gambling problems</h2>
<p>The app teaches poker decisions; there is no play for money or chips. If you recognise signs of a gambling problem or are unsure, talk to a doctor or a mental health professional. In an emergency, including if you or someone you know is thinking about suicide, call your local emergency number right away.</p>
<p>Online help: <a href="${p.adres}">${esc(p.nazwa)}</a>. The same contact is in the app, on the “Help” screen.</p>
<h2>FAQ</h2>
<h3>Where is my data?</h3>
<p>Only on your phone, in the app's storage. The app has no account and sends nothing. Details: <a href="privacy.html#en">privacy policy</a>.</p>
<h3>How do I delete my progress?</h3>
<p>Settings → “Delete progress”, or delete the app from your phone. Purchases stay (Apple handles them).</p>
<h3>How do I change the language?</h3>
<p>Settings → “Language”.</p>
<h3>What is free, and what does full access add?</h3>
<p>Lessons are free. Full access removes the daily limit: practice sessions, reviews and exam retakes every day. Current prices are shown on the “Full access” screen and in the App Store; this page does not list them.</p>
<h3>How do I cancel my subscription?</h3>
<p>Cancel it in your Apple account settings (Subscriptions); in the app, Settings → “Manage subscription” opens them. After you cancel, it does not renew, and full access stays until the end of the paid period. Deleting the app does not cancel the subscription. Refunds are handled by Apple.</p>
<h3>How do I restore my purchase on a new phone?</h3>
<p>Purchases are tied to your Apple account. Sign in with the same Apple account and tap “Restore purchases” in Settings or on the “Full access” screen.</p>
</section>
</main>
</body>
</html>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv.includes('--zapisz')) {
  writeFileSync(join(korzen, 'site/support.html'), stronaWsparcia());
  console.log('site/support.html zapisany');
}
