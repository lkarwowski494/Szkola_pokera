import ExpoModulesCore
import UIKit

// ADR 0013 pkt 1: czas wykonania w tle dla długich operacji bazy (import, eksport, kopia, „Usuń postęp”, migracja).
// Apple (UIApplication.beginBackgroundTask(withName:expirationHandler:), odczyt 2026-11-08): „This method can be safely called
// on a non-main thread”; handler: „The system calls the handler synchronously on the main thread”; „Failure to end the task
// explicitly will result in the termination of the app”. endBackgroundTask(_:): „can be safely called on a non-main thread”.
// Koniec dokładnie raz: handler (wysyła `wygasa`), `zakoncz(id)` albo `rozpocznij`, gdy handler przyszedł przed wpisem id.
/// Identyfikator zadania wspólny dla wątku JS (`rozpocznij`) i handlera (wątek główny); czytany i pisany tylko pod `blokada`
/// (przegląd D-043 P1-2: handler mógł czytać zmienną przed jej przypisaniem, bez synchronizacji).
private final class Zadanie {
  var id: UIBackgroundTaskIdentifier = .invalid
  var wygasloPrzedPrzypisaniem = false
}

public class OchronaTlaModule: Module {
  private let blokada = NSLock()
  private var aktywne = Set<Int>()

  public func definition() -> ModuleDefinition {
    Name("OchronaTla")
    Events("wygasa")

    Function("rozpocznij") { (nazwa: String) -> Int in
      let zadanie = Zadanie()
      // moduł żyje przez cały czas działania aplikacji: silne `self` w handlerze, żeby handler zawsze mógł zakończyć zadanie
      let id = UIApplication.shared.beginBackgroundTask(withName: nazwa) {
        self.blokada.lock()
        let biezace = zadanie.id
        if biezace == .invalid {
          // handler przed przypisaniem id (Apple: „If the system is unable to grant the task assertion, it calls your
          // expiration handler”) — kończy `rozpocznij` po przypisaniu
          zadanie.wygasloPrzedPrzypisaniem = true
          self.blokada.unlock()
          return
        }
        let bylAktywny = self.aktywne.remove(biezace.rawValue) != nil
        self.blokada.unlock()
        guard bylAktywny else { return } // już zakończone przez `zakoncz`
        self.sendEvent("wygasa", ["id": biezace.rawValue])
        UIApplication.shared.endBackgroundTask(biezace)
      }
      if id == .invalid { return -1 }
      blokada.lock()
      zadanie.id = id
      let juzWygaslo = zadanie.wygasloPrzedPrzypisaniem
      if !juzWygaslo { aktywne.insert(id.rawValue) }
      blokada.unlock()
      if juzWygaslo {
        // czas nie został przyznany: koniec teraz, operacja dostaje −1 i przerywa się przy przejściu do tła (ADR 0013 pkt 4)
        UIApplication.shared.endBackgroundTask(id)
        return -1
      }
      return id.rawValue
    }

    Function("zakoncz") { (id: Int) in
      guard id >= 0 else { return }
      blokada.lock()
      let bylAktywny = aktywne.remove(id) != nil
      blokada.unlock()
      guard bylAktywny else { return }
      UIApplication.shared.endBackgroundTask(UIBackgroundTaskIdentifier(rawValue: id))
    }
  }
}
