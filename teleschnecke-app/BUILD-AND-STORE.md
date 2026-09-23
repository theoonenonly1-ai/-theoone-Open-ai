# Teleschnecke – Build & Store

## Cloud-Build

Install EAS CLI or use npx:

    npx eas-cli@latest login
    cd teleschnecke-app
    npx eas-cli@latest build --platform android --profile preview

The preview profile produces an installable Android APK for device testing.

For production:

    npx eas-cli@latest build --platform all --profile production

EAS Build is the intended cloud path for the Android and iOS binaries. Store submission can be done after the Apple and Google developer accounts are connected.

## Important release items

The codebase is intentionally prepared without a server, login, analytics or advertising in V1. Before submission, replace the placeholders in privacy.html and terms.html, publish them under a real HTTPS domain, and enter the URLs in the store consoles.

The final app icon is deliberately left as a separate brand asset because the final visual identity has not been legally finalized. Do not ship the placeholder/default icon as the final commercial identity.

## Product scope V1

The app is a personal avatar/calling companion. A user can choose a photo, create and edit an original snail avatar, assign it to a contact, and start an outgoing phone call. The app does not intercept or replace the system incoming-call screen in V1.

## V2 candidates

- richer local avatar generation
- more body/shell/accessory parts
- animated call states
- optional cloud backup
- optional AI image transformation provider
- native CallKit/Android telecom integration if the product requirements justify the added native permissions and review complexity
- creator marketplace only after moderation, reporting, blocking and rights workflows are implemented
