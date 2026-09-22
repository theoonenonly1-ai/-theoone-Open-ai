# TheOone AI Companion — V1

TheOone AI Companion is the first modular foundation for a personal AI companion platform.

## V1 now includes
- responsive Companion dashboard
- real `/api/chat` backend route
- OpenAI Responses API integration
- server-side API key handling
- profile context (name, role, personality)
- local user-controlled Memory passed as context
- local fallback when the backend is unavailable
- modular Skills and Companion architecture

## Vercel setup

Add these Environment Variables in the Vercel project:
- `OPENAI_API_KEY` — your OpenAI API key
- `OPENAI_MODEL` — optional; defaults to `gpt-5.6-luna`

Never put the OpenAI API key into `app.js`, HTML, or browser code.

## Architecture direction
The core is modular so future versions can add authentication, cloud memory, voice, tools, gaming integrations and other optional modules without replacing the Companion core.
