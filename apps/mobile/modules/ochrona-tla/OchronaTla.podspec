require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

# Wzorzec: Trening modules/rest-activity/RestActivity.podspec (odczyt 2026-11-08, 2e4b0f8). ADR 0013 pkt 1.
Pod::Spec.new do |s|
  s.name           = 'OchronaTla'
  s.version        = package['version']
  s.summary        = 'Background task assertion for long database operations (ADR 0013)'
  s.description    = 'beginBackgroundTask / endBackgroundTask with an expiration event for import, export, backup and migration.'
  s.author         = ''
  s.homepage       = 'https://github.com/lkarwowski494/Szkola_pokera'
  s.platforms      = { :ios => '16.4' } # SDK 58: minimum iOS 16.4 (sdk-compatibility.json, odczyt 2026-11-08)
  s.source         = { git: '' }
  s.static_framework = true
  s.swift_version  = '5.9'
  s.dependency 'ExpoModulesCore'
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES', 'SWIFT_COMPILATION_MODE' => 'wholemodule' }
  s.source_files = "ios/**/*.{h,m,mm,swift,hpp,cpp}"
end
