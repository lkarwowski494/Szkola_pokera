# Sesja BI: menu główne W2 + zębatka + Wskaźnik w Postępie (krok G planu) — Szkoła Pokera (PokerGym)
Koordynator: session_01T66VBzjJPhrAnrqHvxsogb (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie build. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bi-menu` @ 0c24cb6 (= `sesja-be-projekt`: robocza 00b0566 + zakres BD 8cba034 + projekt BE/BH; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md — sprawdź przed pierwszym commitem.
3. Wejście: `docs/design/menu-i-zebatka.md` (układ końcowy), `docs/design/stan-be.md` („Następny krok”), makieta `docs/design/ekrany/menu.html`, zrzuty `docs/design/wzorce-zrzuty/menu/koncowy-*.png`, decyzje D-540, D-541, D-542, D-546 w `docs/decyzje.md`, BR-MENU w `docs/brd/wymagania-scenariusze.md` + ER-16 (`docs/brd/errata.md`). Decyzje właściciela: KO-036 (zębatka), KO-041, KO-045 (`git show origin/koordynacja:docs/koordynacja/decyzje.md`).
4. Zadania (każde: test najpierw czerwony, potem zielony; `pnpm run ci` kod 0 z logiem z SHA w `docs/programista/dowody/`):
   1. Pasek Dziś · Lekcje · Postęp (D-541/KO-045); ekran „Lekcje” (D-542) z dotychczasową listą modułów × lekcje + test modułu; Powtórki z liczbą na „Dziś” (nie w pasku).
   2. „Dziś”: Kontynuuj + Powtórki z liczbą, Sesja ćwiczeń, Scenariusze (kafelek prowadzi do stanu pustego/„wkrótce”, dopóki krok F nie doda ekranu scenariusza — bez martwego przycisku; opis stanu w raporcie).
   3. Wskaźnik zaawansowania (`AdvancementCard`) tylko na ekranie Postęp.
   4. Zębatka D-540: `react-native-svg` (D-546; wersja zgodna z Expo SDK projektu przez `npx expo install`, lockfile w commicie), rysunek 24 pt, kreska 2 pt, przycisk 44×44, etykieta VoiceOver; kontrast jak w `kontrast-menu.txt`.
   5. Teksty interfejsu: nowe klucze w pl + en + 10 pozostałych języków (przekład własny w sesji, bez płatnego API, oznaczony do przeglądu roli 09 — lista kluczy w pliku stanu); bramka i18n bez zmian.
   6. E2E: flowy Maestro dotknięte zmianą nawigacji zaktualizowane (bez usuwania asercji; zmiana ścieżki dotarcia do tego samego ekranu); lista zmienionych flowów w raporcie. Zrzuty Expo web 390 i 320 (jasny, ciemny) porównane z `koncowy-*.png`.
   7. Przegląd zmian w świeżym kontekście (subagent, bez twoich uzasadnień): `apps/mobile/app.json`/zależności i nawigacja — raport w `docs/programista/dowody/`.
5. Rozłączność: równolegle pracuje BF na `sesja-bf-generator` (`packages/poker-core`, `packages/postep`, `packages/domena`, `packages/content-schema`, `tools/content-build`) i BG (`content/`, generatory ćwiczeń). Tych ścieżek nie zmieniasz; gdy musisz — PYTANIE do koordynatora.
6. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz. Wygląd tylko według projektu roli 04; rozbieżność = znalezisko w raporcie.
7. Decyzje: najpierw analogia z Treningu (`lkarwowski494/trening`, publiczne; `app/(tabs)/index.tsx`, `app/(tabs)/more.tsx`, `package.json:64`), `repo:plik:linia`, wpis do weta. Numery tylko z puli D-580…D-594.
8. Kontekst: od 30% okna kończysz krok, stan w `docs/programista/stan-bi.md` na swojej gałęzi, push, PRZEKAZANIE.
9. Push: zbiorczo, tylko na `sesja-bi-menu`.
10. Raporty (≤ 10 linii, send_message): po E0 plan i szacunek; PYTANIA (opcje + rekomendacja); PRZEKAZANIE: SHA, testy czerwony→zielony, kod CI, przegląd, decyzje do weta, otwarte.
