# Decyzje sesji IS (M2-koordynator-napraw, fix): naprawy partii 1 po audycie M1
Pula D-2010…D-2029. Właściciel może każdą zawetować. Audyt f75acdff16915aeb43ff788888216e28616c11ed, baza 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee, gałąź `claude/sesja-is-naprawy-p1`. Zakres: zadania partii 1 planu `audit/M1-2026-11-17/plan-napraw.json` (002, 007, 047, 061). Zgoda na plan: właściciel 2026-11-17 „Zgodnie z rekomendacja”.

Analogia z Treningiem (CLAUDE.md, D-191; klon publiczny `lkarwowski494/trening` @ 2d97581, odczyt 2026-11-17): akcja zewnętrzna przypięta do pełnego SHA (`.github/workflows/asc-kontrola.yml:21`); `.gitignore` z `.env*`, `*.p8`, `*.p12`, `*.mobileprovision`, `*.cer`, `credentials.json`, `*.pem`, `*.key`, `*.jks`, `*.keystore` (tamże `.gitignore:16-29`).

## D-2010 · 2026-11-17 · 007: miara limitu 250 znaków to cytat na adres w jednym pliku
- Decyzja: test `tests/narzedzia/wyciagi-zrodel.test.mjs` liczy tekst źródła (bez powtórzeń wiersza) na adres w każdym pliku odczytu i dowodu z `docs/tresci/odczyty`, `docs/tresci/dowody*`, `docs/tresci/recenzje/dowody`; limit 250 znaków (D-141, `docs/tresci/00-rozpoznanie.md:62`). Kolumny `cytat` w `*.tsv`: każde pole ≤ 250. Test w `pnpm test:skrypty`, więc w `pnpm run ci`.
- Dlaczego tak: ta sama miara co w pomiarze audytu (`odczyty-znaki.txt`, „znaki cytowanego tekstu na źródło”) i w teście akceptacyjnym znaleziska („fragment tekstu źródła dłuższy niż 250 znaków na adres”).
- Odrzucone: suma na adres we wszystkich plikach (ostrzejsza niż D-141; cytaty tego samego artykułu w kilku recenzjach musiałyby się mieścić razem); limit na pojedynczy wiersz (przepuszcza kopię strony złożoną z krótkich wierszy).
- Skrócenie: zostają cytaty, na które powołują się `docs/tresci/zrodla-krok-e.md`, `content/pl/rules.yaml` i decyzje (brzmienie ze źródła bez zmian, numery wierszy źródła bez zmian, `co-gtow-flop-heuristics-ip-2026-11-11.txt:9` nadal wierszem 9); w nagłówku każdego pliku SHA-256 pliku przed skróceniem. Pełny tekst zostaje w historii git; przepisanie historii wymagałoby osobnej zgody właściciela i go nie proponuję (ryzyko brzegowe, 06-tresci-001).
- Zależy od: weto właściciela.
