# Wyjątki „taki sam jak źródło” dla `scenario.action.*` (sesja DE, 2026-11-11)
Źródło: `pnpm i18n:kod` po zmianie; tylko te uwagi zostają dla grupy.
- **Nazwy zostające po angielsku** (tabela `content/<j>/terms-nazwy.yaml`: limp, all-in): `limp` i `allIn` w es, fr, it, pt, pt-BR, vi (12 uwag). Powód: ustalona nazwa terminu w tym języku jest angielska; znacznik `{{t:…}}` odpada, bo skrypt wymaga zbioru znaczników równego źródłu pl (jest tekst zwykły).
- **Klucze strukturalne** `amountPay`, `amountAll`, `withAmount` (10 języków × 3): ciąg złożony wyłącznie z parametrów i jednostki „bb”; skrypt liczy litery nazw parametrów, więc zgłasza „taki sam jak źródło”. Tam, gdzie szyk zmieniono (ja, ko, zh-Hant), uwaga znika dla `withAmount`.
- `ja`, `ko`, `zh-Hant`: „brak liter pisma języka” dla `{{bb}} bb` i `3-bet` (zh-Hant: tabela terminów nie ma nazwy 3-bet) — jednostka i termin łaciński.
