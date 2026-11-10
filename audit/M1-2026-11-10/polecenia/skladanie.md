# Składanie promptów ról — M1 2026-11-10 (dla koordynatora, KO-034)
Wspólne argumenty: `--tryb audit --data 2026-11-10 --statystyki`. `--wyjscie` = ścieżka względna w repo aplikacji (sesja roli pracuje w swoim klonie). Pierwsza wiadomość sesji: prompt roli, potem treść `polecenia/<rola>.md` z wpisanym SHA.

Moduły: audytor nie ma dostępu do biblioteki, więc nazw modułów poza 02 nie zna. Reguła wyboru (wzorce M1: „moduły ról według opisów `moduly` w ich `rola.json`”; wątpliwość → włącz): projekt ma iOS (Expo, expo-router), SQLite (expo-sqlite, packages/postep, migracje, eksport/import), zakupy StoreKit (subskrypcje kwartał/rok + dożywotni), 12 języków w 1.0 (polityka 35), treści krytyczne (nauka pokera + odpowiedzialna gra), TestFlight, GitHub Actions (E2E iOS na macOS), strona site/ (Pages), bez Androida w 1.0, bez sieci poza StoreKit. Wyłącz tylko moduły o Androidzie/Google Play, backendzie/koncie, reklamach. Proszę odesłać wybrane listy do `koszty.md`.

| Sesja | Linia assemble | Moduły | Partia | Model / wysiłek |
|---|---|---|---|---|
| 01-odkrywanie | `01-odkrywanie --tryb audit --data 2026-11-10 --wyjscie audit/M1-2026-11-10/role/01-odkrywanie --statystyki` + `--moduly` | dotyczące wg reguły | 1 | z `sesja` roli (`--lista`); brak → opus/high |
| 02-monetyzacja | `02-monetyzacja --tryb audit --data 2026-11-10 --moduly audyt-paywalla,storekit-expo --wyjscie audit/M1-2026-11-10/role/02-monetyzacja --statystyki` | audyt-paywalla, storekit-expo (+ inne dotyczące; bez `oplacalnosc` — MON-18) | 1 | j.w. |
| 03-zakres | `03-zakres … --wyjscie audit/M1-2026-11-10/role/03-zakres` | dotyczące | 1 | j.w. |
| 04-studio-projektowe | `04-studio-projektowe … --wyjscie audit/M1-2026-11-10/role/04-studio-projektowe` | dotyczące | 1 | j.w. |
| 10-wydanie | `10-wydanie … --wyjscie audit/M1-2026-11-10/role/10-wydanie` | dotyczące (iOS, App Store) | 1 | j.w. |
| 11-wzrost | `11-wzrost … --wyjscie audit/M1-2026-11-10/role/11-wzrost` | dotyczące | 1 | j.w. |
| 05-architekt | `05-architekt … --wyjscie audit/M1-2026-11-10/role/05-architekt` | dotyczące (SQLite, migracje, eksport) | 2 | j.w. |
| 06-tresci-a | `06-tresci … --wyjscie audit/M1-2026-11-10/role/06-tresci-a` | wszystkie dotyczące | 2 | j.w. |
| 06-tresci-b | `06-tresci … --wyjscie audit/M1-2026-11-10/role/06-tresci-b` | wszystkie dotyczące | 2 | j.w.; osobna sesja, ID od 501 |
| 08-programista | `08-programista … --wyjscie audit/M1-2026-11-10/role/08-programista` | dotyczące | 2 | j.w. |
| 09-lokalizacja | `09-lokalizacja … --wyjscie audit/M1-2026-11-10/role/09-lokalizacja` | dotyczące (12 języków) | 2 | j.w. |
| 12-niezawodnosc | `12-niezawodnosc … --wyjscie audit/M1-2026-11-10/role/12-niezawodnosc` | dotyczące | 2 | j.w. |
| 07-jakosc | `07-jakosc … --wyjscie audit/M1-2026-11-10/role/07-jakosc` | dotyczące | 3 | j.w. |

„…” = `--tryb audit --data 2026-11-10 --statystyki [--moduly <lista>]`.
Uwaga SHA: wyniki wspólne w `wspolne/` są z bca751e; po podaniu nowego SHA powtórzę je na nim przed startem partii 1 (≈ 20–30 min) — sesje ról czytają je z `sesja-ay-audyt`.
sprawdz-raport.mjs: treść biblioteki — nie commituję; sesje ról zapisują go ze swojego promptu w scratchpadzie, a ja sprawdzam każdy raport sam po odbiorze.
