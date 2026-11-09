# Notatki dla recenzenta App Store (App Review Information → Notes): wersja 1.0, projekt z 2026-11-09

Rola 10, D-01 z `docs/wydanie/plan-1.0.md` §4.2; decyzja D-309. Wzór: Trening `store/review-notes.md` i `store/review-notes.en.txt` (2e4b0f8, odczyt 2026-11-09): po angielsku do wklejenia, po polsku dla właściciela, bez danych osobowych i bez haseł („Sign-in required” wyłączone, bo aplikacja nie ma konta).

Ścieżki i liczby sprawdzone w kodzie (commit ab0bb2f): limit 1 aktywności dziennie `packages/domena/src/konfiguracja.ts:5`; co jest poza limitem `packages/domena/src/limit.ts:21–27`; ekran startu z licznikiem i przyciskiem „Pełny dostęp” `apps/mobile/src/features/start/EkranStartu.tsx:41–57`; ekran zakupu jako stan przepływu `apps/mobile/src/app/session.tsx:268–290`; „Przywróć zakupy” i „Zarządzaj subskrypcją” w ustawieniach `apps/mobile/src/features/ustawienia/EkranUstawien.tsx:36–37`; warunki = standardowa umowa Apple `apps/mobile/src/platform/adresy.ts:8`; egzamin 15 zadań, próg 85%, ocena poziomu do 8 pytań `konfiguracja.ts:6–9`.

**Etykiety w nawiasach.** W aplikacji jest dziś tylko pl (słownik en powstaje w K-03, rola 09). Etykiety angielskie niżej to robocze przekłady; klucz w nawiasie, np. `(start.fullAccess)`, wskazuje tekst w `apps/mobile/src/i18n/locales/en.json`. Przed wklejeniem agent podmienia każdą etykietę na wartość z en.json i usuwa klucze.

**Warunki przed wklejeniem** (agent na buildzie kandydata 1.0):
- [ ] etykiety z en.json podmienione, klucze usunięte; ścieżki przejdzione na kandydacie (lista telefonu D-04);
- [ ] tekst ekranu zakupu nie obiecuje scenariuszy, jeśli F-12 nie wchodzi do 1.0 (zgłoszenie 10-D01-01, `sklep.md` §4);
- [ ] adres poczty (W-04) znany; inaczej usunąć akapit CONTACT; pola „Contact Information” (imię, telefon, e-mail) wypełnia właściciel w App Store Connect, nie w repo;
- [ ] produkty IAP dodane do tego samego zgłoszenia co wersja 1.0 (pierwszy zakup każdego typu, plan-1.0 §5 B2), bez ofert wprowadzających;
- [ ] `node` z `sklep.md` §3 (limit 4000 B) po podmianie.

Źródła: pole Notes „can contain up to 4000 bytes” (developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information, odczyt 2026-11-09); 2.1(b), 2.3.1(a), 5.1.1(ix), 5.3.4 (App Review Guidelines, „Last Updated: October 16, 2026”, odczyt 2026-11-09). Cytaty: `docs/wydanie/sklep.md` §1.

## English (do wklejenia)

```text
Thank you for reviewing Poker School.

WHAT THE APP IS
- A course in No-Limit Texas Hold'em decision-making: lessons, exercises graded on four levels with an explanation, spaced reviews and module exams.
- No real-money gaming. There are no stakes, no chips or credits, no prizes, no leaderboards and no play against other people or bots. An exercise shows a situation and asks for a decision; the result is a grade and an explanation, never a win or a loss.
- The app does not take input from hands played elsewhere and gives no advice during live play. All hands come from the app's own course content.
- The app does not offer, link to or advertise any gambling operator.

NO ACCOUNT, NO SERVER
- No sign-in and no backend. Progress is stored only on the device. No demo account is needed.
- First launch: a welcome screen, then a short placement check (up to 8 questions); "Skip" (placement.skip) works on every question.

IN-APP PURCHASES (one subscription group: quarterly and yearly auto-renewable subscriptions, plus a one-time lifetime unlock; no introductory offers or free trials)
- Free without purchase: all lessons, the placement check and the first attempt at each module exam. One more activity per day is free: a practice session, a review session or an exam retake.
- To reach the purchase screen: on the "Today" tab (tabs.today) tap "Practice session" (today.practice), then "Start" (start.begin). This uses today's free activity. Close the session with "End" (session.end), tap "Practice session" again and then "Full access" (start.fullAccess).
- The purchase screen shows prices and periods from the App Store, the auto-renewal and cancellation terms, "Restore purchases" (purchase.restore), and links to the Terms of Use (Apple's standard EULA) and the Privacy Policy.
- Settings (gear icon on the "Today" tab): "Restore purchases"; "Manage subscription" (settings.manage) appears when a subscription is active.
- Ongoing value (3.1.2(a)): new lessons, exercises and content corrections are added in regular updates, and new exercises are generated for spaced reviews. Users who prefer one payment can choose the lifetime unlock.

DATA
- No data is collected. The only network connections are App Store purchase calls (StoreKit).
- Settings > "Data" (data.title): export progress to a file and import it. Settings > "Delete progress" (settings.reset) asks for confirmation first.

RESPONSIBLE GAMBLING
- "Help" (settings.help) in Settings and in the Progress tab: where to find support for problem gambling (talk to a doctor or a mental health professional; emergency number; an international online support service).

CONTACT
- [SUPPORT EMAIL]
```
