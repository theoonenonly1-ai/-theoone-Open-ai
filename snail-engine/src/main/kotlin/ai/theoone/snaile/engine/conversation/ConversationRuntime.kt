package ai.theoone.snaile.engine.conversation

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class ConversationRuntime(
    private val model: ConversationModel,
    private val clock: () -> Long = { System.currentTimeMillis() },
    private val maxRecentTurns: Int = 20
) {
    private val mutex = Mutex()
    private val _state = MutableStateFlow(TurnState.IDLE)
    val state: StateFlow<TurnState> = _state.asStateFlow()
    private val turns = mutableListOf<ConversationTurn>()
    private var sessionId: String = ""

    suspend fun startSession(id: String) = mutex.withLock {
        sessionId = id
        turns.clear()
        _state.value = TurnState.IDLE
    }

    suspend fun interrupt() = mutex.withLock { _state.value = TurnState.INTERRUPTED }

    suspend fun respond(input: String, mode: ConversationMode): CompanionReply {
        val context = mutex.withLock {
            _state.value = TurnState.THINKING
            ConversationContext(sessionId, turns.takeLast(maxRecentTurns))
        }
        val reply = try { model.respond(input, context) }
        finally { mutex.withLock { _state.value = TurnState.IDLE } }

        mutex.withLock {
            turns += ConversationTurn("${clock()}-user", sessionId, input, null, mode, clock())
            turns += ConversationTurn("${clock()}-assistant", sessionId, null, reply.text, mode, clock())
            if (turns.size > maxRecentTurns * 2) {
                turns.subList(0, turns.size - maxRecentTurns * 2).clear()
            }
        }
        return reply
    }
}
