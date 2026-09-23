# Snaile Engine 00.3 — Natural Companion Experience

## Goal

Make the companion feel simple, natural and always available without exposing technical complexity.

The user communicates through text or voice. Snaile converts natural intent into safe, auditable actions across skills, apps and devices.

## Principles

- Conversation first: the user describes the goal, not the procedure.
- Voice and text are equal interaction channels.
- Context is persistent but privacy-scoped.
- The companion may act, ask, wait, or explain.
- App/device access is capability-based and permission-controlled.
- The companion identity survives device and model changes.
- Voice is part of companion identity, not a hard-coded provider.

## Flow

User -> Conversation -> Context -> Intent -> Agent Plan -> Capability/Skill -> Permission Gate -> Execution -> Result -> Natural Response

## Voice identity

Voice is represented by a portable profile rather than a provider-specific implementation:

- voiceProfileId
- locale
- speakingRate
- expressiveness
- pauseStyle
- preferredTone
- emotionPolicy

A platform can provide local TTS, cloud TTS, or another provider without changing the companion domain model.

## Universal device layer

Snaile exposes capabilities rather than assuming a particular operating system:

- notifications
- calendar
- contacts
- files
- camera
- microphone
- messaging
- browser
- media
- location when explicitly permitted
- application actions
- device settings

Each capability declares permissions, availability, confidence and whether confirmation is required.

## Agent behavior

For every request the agent should:

1. Understand the desired outcome.
2. Reuse relevant context and memory.
3. Build a minimal action plan.
4. Check permissions and risk.
5. Execute supported actions.
6. Verify results where possible.
7. Report naturally and briefly.
8. Persist only appropriate learning signals.

The engine must never silently bypass platform security or user permissions.
