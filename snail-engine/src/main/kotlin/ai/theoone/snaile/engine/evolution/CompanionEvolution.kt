package ai.theoone.snaile.engine.evolution

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import java.util.concurrent.atomic.AtomicLong

class CompanionEvolution(
    initialPersonality: PersonalitySnapshot,
    initialAge: CompanionAge
) {
    private val mutex = Mutex()
    private val version = AtomicLong(initialPersonality.version)

    var age: CompanionAge = initialAge
        private set

    var personality: PersonalitySnapshot = initialPersonality
        private set

    suspend fun evolve(proposal: EvolutionProposal, nowEpochMs: Long): PersonalitySnapshot? =
        mutex.withLock {
            if (proposal.requiresApproval) return null
            val next = version.incrementAndGet()
            personality = personality.copy(
                version = next,
                reason = proposal.change,
                createdAtEpochMs = nowEpochMs
            )
            personality
        }

    fun calculateStage(nowEpochMs: Long): DevelopmentStage {
        val years = ((nowEpochMs - age.birthTimestampEpochMs).coerceAtLeast(0L)) /
            (365.2425 * 24 * 60 * 60 * 1000).toLong()
        return when {
            years < 1 -> DevelopmentStage.NEWBORN
            years < 3 -> DevelopmentStage.YOUNG
            years < 10 -> DevelopmentStage.MATURE
            years < 20 -> DevelopmentStage.EXPERIENCED
            else -> DevelopmentStage.ELDER
        }
    }

    suspend fun refreshAge(nowEpochMs: Long) = mutex.withLock {
        age = age.copy(stage = calculateStage(nowEpochMs))
    }
}
