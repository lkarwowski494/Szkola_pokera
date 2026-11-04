---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika i fakty); rozmiar pobrania produktowo, jeśli pomiar przekroczy próg niżej
---
# 0005. Treść w paczce aplikacji jako baza SQLite tylko do odczytu, jedna na język, kopiowana tylko przy zmianie wersji treści

## Kontekst i problem
Treść (lekcje, zadania, scenariusze, zakresy, liczby, numery pomocy) powstaje z YAML przez `tools/content-build` jako `content-v6.db` (1 024 000 B, tylko `pl`) i jest kopiowana z paczki przy każdym starcie (`forceOverwrite: true`, `apps/mobile/src/app/_layout.tsx:67-68`). Polityka języków: 35 języków (NFR-JEZ-001), zmiana języka w ustawieniach (F-16), cała nauka bez sieci (NFR-OFF-001). Dotyczy PR-01–PR-05, PR-08.

## Czynniki decyzji
- NFR-OFF-001: 0 żądań sieciowych w nauce; NFR-PRYW-001: 0 domen poza sklepem; NFR-KOSZT-001: 0 USD usług.
- Rozmiar (E0, [OCENA]): ok. 25–35 MB nieskompresowanej treści dla 35 języków; sufit iOS 4 GB („Maximum uncompressed app size”, App Store Connect Help, E0).
- `assetSource.forceOverwrite`: „Force overwrite the local database file even if it already exists. Default: false” (docs.expo.dev …/sqlite, E0). Kopiowanie 35 MB przy każdym starcie wydłuża zimny start (NFR-WYD-001, pomiar w E3).
- BR-DANE-004: zmiana treści nie psuje powtórek, usunięte ćwiczenie nie powoduje błędu.
- NFR-JEZ-002: te same liczby w każdym języku (jedno źródło `content/numbers.yaml`).

## Rozważane opcje
- A: w paczce, baza na język · B: w paczce, jedna baza ze wszystkimi językami · C: Apple-Hosted Background Assets (pobieranie przez system) · D: własny serwer

## Decyzja
Wybrano „A”, ponieważ jest jedyną opcją bez sieci od pierwszego uruchomienia przy zmianie języka offline, a na urządzenie kopiuje tylko aktywny język (ok. 1 MB [OCENA] zamiast ok. 30 MB), co nie obciąża startu.

Ustalenia wiążące:
1. `content-build` generuje 35 plików `tresc-<wersja>-<język>.db` z tych samych YAML; liczby i zakresy rozwijane z jednego `numbers.yaml` w każdym pliku (kontrola NFR-JEZ-002 porównuje pliki, rola 07/09).
2. Nazwa pliku zawiera wersję treści; `forceOverwrite: false`. Nowa wersja treści = nowa nazwa = jedna kopia z paczki; poprzedni plik usuwany po udanym otwarciu nowego (instalacja atomowa z modułu `pakiety-tresci`).
3. Identyfikatory treści (lekcja, zadanie, rodzina zadań, scenariusz) są niezależne od języka i stabilne między wersjami; baza użytkownika trzyma je jako `TEXT` bez klucza obcego do treści (inny plik). Brak identyfikatora w treści: wiersz użytkownika zostaje, ekran go pomija (BR-DANE-004).
4. Treść i dane użytkownika w osobnych plikach: podmiana treści nigdy nie dotyka postępu.
5. Manifest w każdym pliku (tabela `meta`: `format`, `wersja`, `jezyk`, `min_wersja_aplikacji`); plik o nowszym `format` niż obsługiwany jest odrzucany z komunikatem (rola 04).

### Konsekwencje
- Dobre: offline od pierwszego uruchomienia; zmiana języka bez sieci; mały plik roboczy; zgodność z NFR-PRYW-001 i NFR-KOSZT-001.
- Złe: paczka rośnie o całą treść 35 języków; zmiana treści wymaga wydania (plan kwartalny D-108 to akceptuje); 35 plików w buildzie i testach.
- Od czego zależy: pomiar rozmiaru po wygenerowaniu 35 języków (rola 08/09). Jeśli rozmiar pobrania z App Store Connect przekroczy 50 MB [OCENA progu z E0], decyzja o rozmiarze wraca do właściciela z opcjami (kompresja, C).

### Potwierdzenie
- Test `content-build`: 35 plików, każdy z `meta.jezyk`, te same identyfikatory i te same wartości liczb we wszystkich (rola 07).
- Test: nowa wersja treści → jedno kopiowanie, stary plik usunięty po otwarciu nowego; przerwanie przed przełączeniem zostawia stary.
- Test BR-DANE-004: karta powtórek z identyfikatorem usuniętym z treści nie powoduje błędu i zostaje w bazie.
- Ruch sieciowy w PR-01–PR-05 = 0 (NFR-OFF-001, metoda z BRD).

## Opcje: zalety i wady
### A: paczka, baza na język
- Zalety: offline zawsze; mała kopia robocza; prosta podmiana.
- Wady: duplikacja danych wspólnych (zakresy, liczby) w 35 plikach — mała [OCENA], kontrolowana testem.
### B: paczka, jedna baza
- Zalety: jeden plik, dane wspólne raz.
- Wady: kopia ok. 30 MB przy każdej nowej wersji i drugie tyle miejsca na urządzeniu; zapytania z filtrem języka wszędzie.
### C: Apple-Hosted Background Assets
- Zalety: mniejsza paczka; treść poza wydaniem.
- Wady: pierwsze uruchomienie i zmiana języka mogą czekać na sieć (łamie NFR-OFF-001 przy braku pobrania); dostępność w Expo `[DO USTALENIA]`; więcej stanów do zaprojektowania.
### D: własny serwer
- Wady: domena poza sklepem (NFR-PRYW-001), koszt hostingu (NFR-KOSZT-001), sieć przy starcie — odrzucona.
