# Snaile 00.3.1 — Conversation Runtime

Voice and text are first-class interaction modes.

Voice input -> speech recognition -> conversation context -> companion model -> natural reply -> speech synthesis.

Text uses the same conversation runtime, so personality, memory and agent behavior do not fork into separate implementations.

The runtime keeps a bounded recent-turn window. Long-term memories remain in the Snaile memory layer.

An explicit interruption state lets Android, iPhone and other clients map microphone/button/voice activity to the same conversation.

Next: connect platform audio and app-capability adapters while preserving this shared conversation domain.
