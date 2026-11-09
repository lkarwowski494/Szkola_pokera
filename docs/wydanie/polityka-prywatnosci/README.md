# Polityka prywatności: projekt, dowody, hosting (rola 10, 2026-11-09)

Zadanie: 08-F20, P-2 (`docs/wydanie/plan-1.0.md:236`), W2 z D-297/D-301, K-10. Pliki: `pl.md` (źródło), `en.md`; ja, pt-BR, fr, zh-Hant (D-303) po przekładzie przez rolę 09. **Nie opublikowano. To nie jest opinia prawna** (OP-13: opinia prawna „nie teraz”); przy wątpliwości porada prawnika.

## 1. Stan
- Treść gotowa do publikacji poza polami `[DO USTALENIA]`: data wejścia w życie, adres poczty (W-04), administrator — imię i nazwisko lub nazwa i adres sprzedawcy (fakt właściciela; ten sam fakt co J2 z D-301 i DSA E1), dostawca poczty i podstawa przekazania poza EOG (zależne od adresu W-04).
- Etykiety przycisków w `en.md` („Delete progress”, „Write to us”, „Report a problem with this task”, „Export/Import progress”) to robocze przekłady: `apps/mobile/src/i18n/locales/` ma dziś tylko `pl.json`; po przekładzie (09) brzmienie na stronie = brzmienie w aplikacji.
- Odpowiedzi App Privacy i porównanie z manifestem: `docs/wydanie/app-privacy.md`.

## 2. Dowody: każde zdanie polityki → kod (commit `f851474`)

| Zdanie (sekcja `pl.md`) | Dowód |
|---|---|
| brak konta, serwera, analityki, reklam; nic nie jest wysyłane | `app-privacy.md` §2 1a; zależności `apps/mobile/package.json` (bez SDK analityki, reklam, awarii; ADR 0009) |
| lista danych w bazie | tabele eksportu `packages/domena/src/eksport.ts:6`; `uprawnienie_cache` i `dziennik`: `docs/architektura/prywatnosc.md` §1 |
| dziennik do 200 wpisów: czas, kod, ekran, wersja | `packages/domena/src/konfiguracja.ts:24`; `packages/postep/src/dziennik.ts:13` |
| kopia iCloud obejmuje dane | brak wyłączenia z kopii (`grep ExcludedFromBackup` w `apps/mobile/src`, `apps/mobile/modules`, `packages/*/src`: 0 trafień, 2026-11-09); baza w `Documents/SQLite` (ADR 0002) |
| język, region, strefa czasowa tylko na urządzeniu | inwentarz §1 wiersz `expo-localization` |
| zakupy przez Apple; odczyt aktywnego produktu | `apps/mobile/src/platform/zakupy.ts:9-10` |
| powiadomienia lokalne, bez push | `apps/mobile/app.json:45`; `apps/mobile/src/platform/powiadomienia.ts:18-21` |
| systemowe okno oceny | `apps/mobile/src/platform/opinie.ts:1,6` |
| odnośniki zewnętrzne | `apps/mobile/src/platform/adresy.ts:8`; `apps/mobile/src/features/opinie/Opinie.tsx:25`; `apps/mobile/src/app/help.tsx:35`; `apps/mobile/src/data/content/helplines.generated.ts:42` |
| eksport bez dziennika i stanu zakupu; zawiera daty i strefę | `eksport.ts:6` (lista tabel bez `dziennik`, `uprawnienie_cache`); strefa w `aktywnosc` (inwentarz §1); udostępnianie `apps/mobile/src/platform/pliki.ts:40`; import z wyboru użytkownika `pliki.ts:47` |
| „Usuń postęp”: co usuwa, co zostaje | `packages/postep/src/daneUzytkownika.ts:33` (lista tabel), `:155-161` (zostaje znacznik dnia i `uprawnienie_cache`, usuwany `dziennik`); przypomnienie anulowane `apps/mobile/src/app/settings.tsx:79`; tekst przycisku `apps/mobile/src/i18n/locales/pl.json:73-75` |
| „Napisz do nas” / „Zgłoś błąd”: szkic w Poczcie z id zadania, wersją, językiem | `Opinie.tsx:44`, `:61-62`; `pl.json:109-113` |
| raporty awarii przez Apple | analogia Treningu (`site/privacy.html`, sekcja „Raporty awarii”, commit 2e4b0f8); aplikacja bez SDK awarii (ADR 0009) |
| dla dorosłych, nie dla dzieci | `docs/brd/odkrywanie.md:116` („Grupa docelowa: dorośli”; „Aplikacji z symulowanym hazardem nie wolno kierować do dzieci [FAKT S-29]”) |
| przechowywanie e-maili 12 miesięcy | analogia Treningu (`site/privacy.html`, „Gdy do nas piszesz” → „Przechowywanie”); D-307 |

## 3. Przeczytane źródła prawne (2026-11-09)

| Akt | Adres | Co wynika dla polityki |
|---|---|---|
| RODO, tekst PL | publications.europa.eu (cellar `3e485e15-11bd-11e6-ba9a-01aa75ed71a1`, xhtml PL; EUR-Lex zwrócił HTTP 202 bez treści) | art. 4 pkt 7: „„administrator” oznacza osobę fizyczną lub prawną … który samodzielnie lub wspólnie z innymi ustala cele i sposoby przetwarzania danych osobowych”; art. 13 ust. 1 lit. a–f i ust. 2 lit. a–f — elementy sekcji „Gdy do nas piszesz” (tożsamość i kontakt, cele i podstawa, uzasadniony interes, odbiorcy, przekazanie do państwa trzeciego, okres, prawa, skarga, dobrowolność, decyzje automatyczne); art. 6 ust. 1 lit. f — podstawa; art. 77 ust. 1 — skarga „w szczególności w państwie członkowskim swojego zwykłego pobytu”; art. 8 ust. 1 — 16 lat (państwa mogą obniżyć do 13) przy zgodzie dziecka, nie dotyczy (brak przetwarzania na podstawie zgody). Czy twórca jest administratorem danych tylko na urządzeniu: `[DO USTALENIA]` (moduł roli 10); polityka opisuje fakty, nie rozstrzyga tego |
| CCPA | oag.ca.gov/privacy/ccpa (FAQ 5, strona „Updated on August 28, 2026”) | „applies to for-profit businesses that do business in California and meet any of the following: Have a gross annual revenue of over $25 million; Buy, sell, or share the personal information of 100,000 or more California residents or households; or Derive 50% or more of their annual revenue from selling California residents' personal information.” Próg rentowności projektu 500 USD/rok (CLAUDE.md) — CCPA nie ma zastosowania [OCENA na progach]; polityka i tak mówi „nie sprzedajemy, nie udostępniamy” |
| APPI (Japonia) | japaneselawtranslation.go.jp/en/laws/view/4241 | art. 16 ust. 2: „"Business handling personal information" … means a person that uses a personal information database or the equivalent for business”; art. 21 ust. 1: „Unless the purpose of use has already been disclosed to the public, a business handling personal information must promptly notify … or disclose this to the public”; art. 32 ust. 1 pkt i–ii: dostępne mają być „the name and address of the business handling personal information” i „the purpose of use of all personal data”. Czy skrzynka pocztowa to „personal information database”: `[DO USTALENIA]`; bezpieczniej opublikować cel i dane administratora (sekcja „Mieszkańcy Kalifornii i Japonii”) |
| COPPA | ftc.gov … complying-coppa-frequently-asked-questions (FAQ A.2) | „applies to operators of commercial websites and online services (including mobile apps …) directed to children under 13 that collect, use, or disclose personal information from children” oraz „general audience … with actual knowledge”. Aplikacja nie jest skierowana do dzieci i nie zbiera danych — nie dotyczy [OCENA] |
| Apple | `app-privacy.md` §1 (AP-1–AP-6, MP-1–MP-2, G-511, G-15, PV-1) | 5.1.1(i): polityka ma podać, jakie dane, jak i po co są zbierane, zasady przechowywania i usuwania, jak cofnąć zgodę lub zażądać usunięcia; link w ASC i w aplikacji |

## 4. Hosting adresu polityki (P-2) — rekomendacja A wg D-296 (D-308, do weta)

Źródła (2026-11-09): docs.github.com „GitHub's plans” („GitHub Free … GitHub Pages in public repositories”; Pages w repo prywatnym — od GitHub Pro; „GitHub Actions usage is free for standard GitHub-hosted runners in public repositories”); „What is GitHub Pages?” (adres projektu „http(s)://<owner>.github.io/<repositoryname>”); „Configuring a publishing source” („Under "Build and deployment", under "Source", select **GitHub Actions**.”; źródło z gałęzi: katalog `/` albo `/docs`); „GitHub Pages limits” („not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS)”; 1 GB, miękki limit 100 GB/miesiąc). Trening: `.github/workflows/pages.yml` (publikuje tylko `site/` przez Actions), `docs/41-droga-do-app-store.md` D-2 (start na github.io, potem apps4brew.com).

| Opcja | Koszt | Za | Przeciw |
|---|---|---|---|
| **A (rekomendacja): GitHub Pages tego repo, publikacja przez Actions tylko z katalogu `site/`** (`site/privacy.html`, `site/support.html`, wzór Treningu `pages.yml`) → `https://lkarwowski494.github.io/Szkola_pokera/privacy.html` | 0 USD (repo publiczne, Actions bez opłat na standardowych runnerach) | tak zaczynał Trening; brak nowych kont i usług; strona statyczna bez skryptów i ciasteczek (standard marki); zmiana strony = commit z przeglądem | adres zależy od nazwy i publiczności repo: przejście repo na prywatne wyłącza Pages na planie Free (wtedy zmiana adresu w ASC i w aplikacji = nowa wersja, MP-2: „Any changes to the URLs releases with your next app version”); wielkość liter w ścieżce `Szkola_pokera` do sprawdzenia po włączeniu `[DO USTALENIA]` |
| B: Pages z gałęzi, katalog `/docs` | 0 USD | bez workflow | **odrzucona**: opublikowałaby całe `docs/` (dokumenty wewnętrzne, rejestry) |
| C: podstrona apps4brew.com | 0 USD | adres niezależny od repo | aplikacja poza portfelem Apps4brew (CLAUDE.md; D-266) — sprzeczne z decyzją właściciela |
| D: własna domena (np. na Pages tego repo) | domena ok. kilkanaście USD/rok [OCENA, cennik niesprawdzony] | adres przeżyje zmianę repo | koszt poza Apple Developer (CLAUDE.md: tylko Apple) — później, jeśli repo ma być prywatne |
| E: Google Sites / Notion | 0 USD | szybko | zewnętrzne skrypty i ciasteczka dostawcy na stronie o prywatności; poza repo, bez przeglądu |

Uwaga do limitu GitHub: strona polityki i wsparcia aplikacji nie jest sklepem ani SaaS (zakup odbywa się w App Store); Trening robi tak samo. Ocena, nie opinia prawna.

### Kroki (po zgodzie właściciela; nic z tego nie jest zrobione)
1. Sesja kodu (08): `site/privacy.html` z `pl.md` + `en.md` (jedna strona dwujęzyczna jak Trening), `site/support.html` (adres W-04 i dane kontaktowe wymagane lokalnie, PV-1), `.github/workflows/pages.yml` na wzór Treningu (ścieżka wrażliwa CI — przegląd D-043), test zgodności treści jak Trening `tests/public-repo.test.ts`. Ok. 0,5–1 h agenta.
2. Właściciel: zgoda na scalenie do `main` (strona publikuje się dopiero z `main`).
3. Właściciel, 2 min: GitHub → repo `Szkola_pokera` → Settings → Pages → Build and deployment → Source: **GitHub Actions**. To jest włączenie publikacji — wymaga osobnej zgody.
4. Agent: sprawdzenie, że adres odpowiada 200 i treść = commit (dowód).
5. 08: `ADRES_PRYWATNOSCI` (i `ADRES_KONTAKTOWY` po W-04) w `apps/mobile/src/platform/adresy.ts` (K-09); właściciel: adresy w ASC (`app-privacy.md` §5).

Czas właściciela: decyzja P-2 + fakty W-04 (ok. 10 min), zgoda na scalenie, 2 min w ustawieniach, 10 min w ASC. Czeka się na: fakty właściciela (termin 17.11, plan 1.0).
