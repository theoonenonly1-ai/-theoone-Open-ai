package ai.theoone.snaile.engine.evolution

class LearningPipeline {
    fun extractSignal(
        id: String,
        category: String,
        insight: String,
        policy: LearningPolicy,
        confidence: Float,
        nowEpochMs: Long
    ): LearningSignal = LearningSignal(
        id = id,
        category = category,
        abstractInsight = insight,
        policy = policy,
        confidence = confidence.coerceIn(0f, 1f),
        createdAtEpochMs = nowEpochMs
    )

    fun collectiveEligible(signal: LearningSignal): Boolean =
        signal.policy == LearningPolicy.COLLECTIVE_OPT_IN ||
        signal.policy == LearningPolicy.TRAINING_OPT_IN
}
