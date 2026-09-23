package ai.theoone.snaile.engine.device

enum class CapabilityPermission {
    NONE, READ, WRITE, EXECUTE, SENSITIVE
}

data class DeviceCapability(
    val id: String,
    val displayName: String,
    val permission: CapabilityPermission,
    val available: Boolean,
    val requiresConfirmation: Boolean = false
)

data class CapabilityAction(
    val capabilityId: String,
    val actionId: String,
    val parameters: Map<String, String> = emptyMap()
)

data class ActionResult(
    val success: Boolean,
    val message: String,
    val data: Map<String, String> = emptyMap()
)

interface DeviceCapabilityProvider {
    suspend fun capabilities(): List<DeviceCapability>
    suspend fun execute(action: CapabilityAction): ActionResult
}
