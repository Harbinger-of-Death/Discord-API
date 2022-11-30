const Base = require("../Base/base");
const Snowflake = require("../Util/Snowflake");
const IntegrationApplication = require("./IntegrationApplication");
class GuildIntegration extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.type = data.type ?? null
        this.enabled = data.enabled ?? null
        this.syncing = data.syncing ?? null
        this.roleId = data.role_id ?? null
        this.enableEmoticons = data.enable_emoticons ?? null
        this.expireBehavior = data.expire_behavior ?? null
        this.expireGracePeriod = data.expire_grace_period ?? null
        this.user = this.client.users._add(data.user, { cache: false }) ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.account = data.account ?? null
        this.syncedAt = data.synced_at ? new Date(data.synced_at) : null
        this.syncedTimestamp = this.syncedAt?.getTime() ?? null
        this.subscriberCount = data.subcriber_count ?? null
        this.revoked = data.revoked ?? null
        this.application = data.application ? new IntegrationApplication(data.application, this.client) : null
        this.scopes = data.scopes ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
    }
}

module.exports = GuildIntegration;