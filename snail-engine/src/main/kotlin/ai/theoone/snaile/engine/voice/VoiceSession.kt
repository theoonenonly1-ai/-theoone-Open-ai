package ai.theoone.snaile.engine.voice

import ai.theoone.snaile.engine.conversation.ConversationMode
import ai.theoone.snaile.engine.conversation.ConversationRuntime
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class VoiceSession(
    private val conversation: ConversationRuntime,
    private val recognizer: SpeechRecognizer,
    private val synthesizer: SpeechSynthesizer,
    private val voiceProfile: VoiceProfile
) {
    private val mutex = Mutex()

    suspend fun handleAudio(audioUri: String): SpeechResult? = mutex.withLock {
        val input = recognizer.transcribe(audioUri, voiceProfile.locale)
        if (input.isBlank()) return@withLock null
        val reply = conversation.respond(input, ConversationMode.VOICE)
        if (!reply.shouldSpeak || reply.shouldWait) return@withLock null
        synthesizer.synthesize(SpeechRequest(reply.text, voiceProfile))
    }
}
