# Teleschnecke

Eigenständige Android-/iPhone-App für personalisierte Teleschnecken-Kontakt-Avatare.

## V1 – jetzt im Projekt

- Foto auswählen
- Live-Vorschau der persönlichen Teleschnecke
- fünf eigene Grundstile
- Schneckenhaus- und Körperfarben
- vier Gesichtsausdrücke
- vier Augenvarianten
- fünf Zubehörvarianten
- Kontakte verwalten
- lokale Speicherung
- Anrufansicht
- ausgehender Anruf über die native Telefonfunktion
- keine Konten, keine Werbung, kein Foto-Upload
- keine lizenzierten Fremdcharaktere
- gespeicherte ältere Avatare werden beim Laden automatisch auf die neuen Felder ergänzt

Die App ist bewusst als eigener Charakterbaukasten aufgebaut. Die mitgebrachten Fotos dienen in V1 als lokales Gesichtselement; die App kopiert keine benannten oder geschützten Figuren.

## Avatar-Engine

src/avatarGenerator.ts definiert bereits eine klare Provider-Schnittstelle. Damit kann später eine echte generative Foto-zu-Schnecken-Transformation ergänzt werden, ohne die Kontakt-, Speicher- oder Anruflogik neu zu bauen.

V1 verwendet weiterhin ausschließlich den lokalen Fallback. Dadurch werden Fotos nicht an einen KI-Dienst übertragen.

## Cloud Build

Expo SDK 57 ist dokumentiert. EAS Build kann Android- und iOS-Binaries in der Cloud erzeugen. Das Profil preview ist als Test-APK vorbereitet, production für Store-Builds.

## Vor Store-Release

- finales eigenes App-Icon einsetzen
- echte Datenschutz-/Impressums-URL hinterlegen
- Apple- und Google-Entwicklerkonto verbinden
- production Builds erzeugen
- reale Geräte testen
- Store-Metadaten übernehmen
- TestFlight und Google-Play-Testspur durchführen
- finale rechtliche Angaben des Betreibers einsetzen
