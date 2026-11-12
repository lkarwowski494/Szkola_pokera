# Decyzje sesji EU (08-programista, fix): poprawki recenzji ES (cache E2E iOS), pula D-1280…D-1284
Kto: A = agent (delegacja z `CLAUDE.md`), do weta koordynatora i właściciela.

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa | Zależy od |
|---|---|---|---|---|---|---|
| D-1280 | 2026-11-12 | A | **08-programista-001 (KO-081): usunięty krok „Cache DerivedData” z `e2e-ios.yml`; zostaje cache CocoaPods (i pnpm przez `setup-node`).** Wycofanie D-1022 na jej własnym warunku („Jeśli nie — zostaje cache CocoaPods”). Test `workflowy.test.mjs` wymusza dokładnie jeden `actions/cache` (CocoaPods) i brak kroku DerivedData. | (b) zostawić DD z kluczem bez SHA: koszt przywracania 1:11 bez zysku; (c) diagnozować reużycie celów przez Xcode: 55 min runnera macOS na próbę, wynik niepewny | `docs/programista/recenzja-es.md` (gałąź `sesja-es-recenzja`), 001: kompilacji 1147 / 1147 / 1144 z cache i bez; wpis 2,2 GB na push wobec limitu 10 GB; wzór Trening `e2e-ios.yml` (cache tylko npm, linia 86 wg ES; odczyt przez EU nie powtarzany, ES odczytał 2026-11-12) | pierwszy przebieg E2E po scaleniu: brak „Cache DerivedData”, xcodebuild w zakresie 25–31 min |
