package ai.theoone.snaile.engine.voice

enum class VoiceEmotion {
    NEUTRAL, WARM, HAPPY, CURIOUS, SERIOUS, CALM, ALERT, EMPATHETIC
}

data class VoiceProfile(
    val id: String,
    val locale: String = "de-DE",
    val provider: String? = null,
    val speakingRate: Float = 1.0f,
    val expressiveness: Float = 0.65f,
    val emotion: VoiceEmotion = VoiceEmotion.WARM
)

data class SpeechRequest(
    val text: String,
    val voiceProfile: VoiceProfile,
    val emotion: VoiceEmotion = voiceProfile.emotion
)

data class SpeechResult(
    val requestId: String,
    val audioUri: String? = null,
    val durationMs: Long? = null
)

interface SpeechSynthesizer {
    suspend fun synthesize(request: SpeechRequest): SpeechResult
}

interface SpeechRecognizer {
    suspend fun transcribe(audioUri: String, locale: String = "de-DE"): String
}
