import ExpoModulesCore
import UIKit

// ADR 0013 pkt 1: czas wykonania w tle dla długich operacji bazy (import, eksport, kopia, „Usuń postęp”, migracja).
// Apple (UIApplication.beginBackgroundTask(withName:expirationHandler:), odczyt 2026-11-08): „This method can be safely called
// on a non-main thread”; handler: „The system calls the handler synchronously on the main thread”; „Failure to end the task
// explicitly will result in the termination of the app”. endBackgroundTask(_:): „can be safely called on a non-main thread”.
// Koniec dokładnie raz: handler (wysyła `wygasa`), `zakoncz(id)` albo `rozpocznij`, gdy handler przyszedł przed wpisem id.
public class OchronaTlaModule: Module {
  private let blokada = NSLock()
  private var aktywne = Set<Int>()
  // handler może przyjść, zanim `rozpocznij` wpisze id (Apple: „If the system is unable to grant the task assertion, it calls
  // your expiration handler”) — wtedy kończy `rozpocznij`, nie handler
  private var wygaslePrzedWpisem = Set<Int>()

  public func definition() -> ModuleDefinition {
    Name("OchronaTla")
    Events("wygasa")

    Function("rozpocznij") { (nazwa: String) -> Int in
      var zadanie: UIBackgroundTaskIdentifier = .invalid
      zadanie = UIApplication.shared.beginBackgroundTask(withName: nazwa) { [weak self] in
        guard let self = self else { UIApplication.shared.endBackgroundTask(zadanie); return }
        let id = zadanie.rawValue
        self.blokada.lock()
        let bylAktywny = self.aktywne.remove(id) != nil
        if !bylAktywny { self.wygaslePrzedWpisem.insert(id) }
        self.blokada.unlock()
        guard bylAktywny else { return }
        self.sendEvent("wygasa", ["id": id])
        UIApplication.shared.endBackgroundTask(zadanie)
      }
      if zadanie == .invalid { return -1 }
      let id = zadanie.rawValue
      blokada.lock()
      let juzWygaslo = wygaslePrzedWpisem.remove(id) != nil
      if !juzWygaslo { aktywne.insert(id) }
      blokada.unlock()
      if juzWygaslo {
        // czas nie został przyznany: koniec teraz, operacja dostaje −1 i przerywa się przy przejściu do tła (ADR 0013 pkt 4)
        UIApplication.shared.endBackgroundTask(zadanie)
        return -1
      }
      return id
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
