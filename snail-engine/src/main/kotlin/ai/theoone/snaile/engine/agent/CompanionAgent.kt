package ai.theoone.snaile.engine.agent

import ai.theoone.snaile.engine.device.ActionResult
import ai.theoone.snaile.engine.device.CapabilityAction
import ai.theoone.snaile.engine.device.DeviceCapabilityProvider

data class AgentPlan(
    val intent: String,
    val actions: List<CapabilityAction>
)

data class AgentExecution(
    val plan: AgentPlan,
    val results: List<ActionResult>,
    val completed: Boolean
)

class CompanionAgent(
    private val device: DeviceCapabilityProvider
) {
    suspend fun execute(plan: AgentPlan): AgentExecution {
        val results = plan.actions.map { action ->
            device.execute(action)
        }
        return AgentExecution(
            plan = plan,
            results = results,
            completed = results.all { it.success }
        )
    }
}
