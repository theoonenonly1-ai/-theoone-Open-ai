# Snaile 00.3 Roadmap

## Implemented foundation

- Natural companion architecture
- Portable voice identity
- Speech synthesis/recognition interfaces
- Universal device capability abstraction
- Agent execution core
- Permission-aware action model

## Next implementation slices

### 00.3.1 Conversation runtime
Streaming text/voice conversation, interruption and context windows.

### 00.3.2 Android adapter
Notifications, calendar, contacts, files, microphone, speech and app intents.

### 00.3.3 iPhone adapter
Use iOS-supported intents, shortcuts, notifications, files, speech and app integrations.

### 00.3.4 Windows adapter
Files, applications, browser, notifications and desktop automation through explicit capabilities.

### 00.3.5 Skill registry
Signed skills, versioning, compatibility and capability discovery.

### 00.3.6 Agent planning
Plan -> permission check -> execute -> verify -> recover.

### 00.3.7 Voice runtime
Local/cloud provider adapters with portable VoiceProfile.

### 00.3.8 Safety and confirmation policy
Per-capability confirmation levels, sensitive-action barriers and audit events.

The architecture intentionally keeps platform adapters replaceable so the same companion identity can move between devices.
