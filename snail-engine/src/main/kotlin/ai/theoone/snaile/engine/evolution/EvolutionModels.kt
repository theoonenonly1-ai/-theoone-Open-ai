package ai.theoone.snaile.engine.evolution

import kotlinx.serialization.Serializable

@Serializable
enum class LearningPolicy { PRIVATE, LOCAL_ONLY, COLLECTIVE_OPT_IN, TRAINING_OPT_IN }

@Serializable
enum class DevelopmentStage { NEWBORN, YOUNG, MATURE, EXPERIENCED, ELDER }

@Serializable
data class CompanionAge(
    val birthTimestampEpochMs: Long,
    val stage: DevelopmentStage = DevelopmentStage.NEWBORN
)

@Serializable
data class PersonalityTraits(
    val warmth: Float = 0.5f,
    val curiosity: Float = 0.5f,
    val humor: Float = 0.5f,
    val patience: Float = 0.5f,
    val independence: Float = 0.3f,
    val reflectiveness: Float = 0.3f
)

@Serializable
data class PersonalitySnapshot(
    val version: Long,
    val immutableCoreId: String,
    val traits: PersonalityTraits,
    val reason: String,
    val createdAtEpochMs: Long
)

@Serializable
data class LearningSignal(
    val id: String,
    val category: String,
    val abstractInsight: String,
    val policy: LearningPolicy,
    val confidence: Float,
    val createdAtEpochMs: Long
)

@Serializable
data class EvolutionProposal(
    val id: String,
    val target: String,
    val change: String,
    val evidenceSignalIds: List<String>,
    val risk: String,
    val requiresApproval: Boolean = true
)
