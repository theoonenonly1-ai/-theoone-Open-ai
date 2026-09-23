# Teleschnecke AI Backend

Secure server-side bridge between the Teleschnecke mobile app and the OpenAI image API.

## Required environment variable

`OPENAI_API_KEY` — stored only in the server/Vercel project.

Optional:

`TELESCHNECKE_API_TOKEN` — if set, the API requires the mobile client to send the same token as `x-teleschnecke-token`. Do not ship a long-lived secret in a public app for a commercial release; use proper user/device authentication before opening the AI endpoint publicly.

## Endpoint

POST `/api/generate-avatar`

JSON body:

```json
{
  "imageDataUrl": "data:image/jpeg;base64,...",
  "style": "klassisch",
  "expression": "freundlich",
  "eyes": "klassisch",
  "accessory": "keins",
  "shellColor": "#3569B8",
  "bodyColor": "#E7B889",
  "customPrompt": ""
}
```

The server sends the photo to OpenAI's image editing endpoint and returns a generated image as a data URL.

The prompt explicitly asks for an original snail character and avoids named copyrighted characters, logos and trademarked costumes.

## Privacy

This is a cloud-AI feature. Once enabled in the app, the selected photo is transmitted to the backend and then to OpenAI for generation. Update the app privacy policy/store disclosures before enabling it in a public release.
