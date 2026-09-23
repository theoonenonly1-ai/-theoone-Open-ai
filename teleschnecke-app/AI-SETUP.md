# Teleschnecke – KI-Avatar aktivieren

Die App enthält jetzt einen separaten Cloud-Avatar-Provider und ein serverseitiges OpenAI-Backend.

## 1. Backend auf Vercel

Vercel-Projekt auf den Ordner `teleschnecke-api` im Repository zeigen.

Build/Framework: Standard Node/Vercel Functions.

Server-Variable:
- `OPENAI_API_KEY` = der OpenAI-API-Key des Projekts

Optional:
- `TELESCHNECKE_API_TOKEN`

## 2. Mobile App

Nach dem Vercel-Deployment die Backend-Basisadresse als Expo-Variable setzen:

`EXPO_PUBLIC_TELESCHNECKE_API_URL=https://DEIN-BACKEND.vercel.app`

Danach einen neuen EAS-Build erzeugen. Die Variable muss beim Build vorhanden sein.

## 3. Ablauf

Foto → Teleschnecke-App → sicherer Server → OpenAI Bildgenerierung → fertiger Original-Avatar → zurück zur App.

Der API-Key wird niemals in die mobile App eingebaut.

## 4. Wichtig vor öffentlichem Verkauf

Sobald Cloud-KI aktiviert wird, muss die Datenschutzinformation die Fotoübertragung und den verwendeten Bilddienst beschreiben. Außerdem müssen Kostenlimits, Rate-Limiting und eine echte Nutzer-/Geräteauthentifizierung vor einem offenen kommerziellen Launch ergänzt werden.
