package ai.theoone.snaile.engine.conversation

enum class ConversationMode { TEXT, VOICE }
enum class TurnState { IDLE, LISTENING, THINKING, SPEAKING, INTERRUPTED }

data class ConversationTurn(
    val id: String,
    val sessionId: String,
    val userText: String?,
    val assistantText: String?,
    val mode: ConversationMode,
    val createdAtEpochMs: Long
)

data class ConversationContext(
    val sessionId: String,
    val recentTurns: List<ConversationTurn> = emptyList(),
    val activeTopic: String? = null,
    val interrupted: Boolean = false
)

data class CompanionReply(
    val text: String,
    val shouldSpeak: Boolean = true,
    val shouldWait: Boolean = false
)

interface ConversationModel {
    suspend fun respond(input: String, context: ConversationContext): CompanionReply
}
