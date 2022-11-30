const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const Snowflake = require("../Util/Snowflake");
class AutoModeration extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.name = data.name ?? null
        this.creatorId = data.creator_id ?? null
        this.eventType = data.event_type ?? null
        this.triggerType = data.trigger_type ?? null
        this.keywordFilter = data.trigger_metadata?.keyword_filter ?? []
        this.presets = data.trigger_metadata?.presets ?? null
        this.allowList = data.trigger_metadata?.allow_list ?? null
        this.mentionTotalLimit = data.trigger_metadata?.mention_total_limit ?? null
        this.regexPatterns = data.trigger_metadata?.regex_patterns ?? null
        this.enabled = data.enabled ?? null
        this.exemptRoles = new Collection(data.exempt_roles?.map(o => [o, this.guild?.roles.cache.get(o)]).filter(item => item))
        this.exemptChannels = new Collection(data.exempt_channels?.map(o => [o, this.guild?.channels.cache.get(o)]).filter(item => item))
        this.actions = data.actions?.map(o => { return { type: o.type, metadata: { channelId: o.metadata?.channel_id, durationSeconds: o.metadata?.duration_seconds } } }) ?? []
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    get creator() {
        return this.client.users.cache.get(this.creatorId) ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.automoderations.fetch(this, options)
    }

    async edit(options = {}) {
        return await this.guild?.automoderations.edit(this, options)
    }

    async delete(reason) {
        return await this.guild?.automoderations.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setEventType(eventType, reason) {
        return await this.edit({ eventType, reason })
    }

    async setTriggerMetadata(triggerMetadata, reason) {
        return await this.edit({ triggerMetadata, reason })
    }

    async setActions(actions, reason) {
        return await this.edit({ actions, reason })
    }

    async setEnabled(enabled, reason) {
        return await this.edit({ enabled, reason })
    }

    async setExemptRoles(exemptRoles, reason) {
        return await this.edit({ exemptRoles, reason })
    }

    async setExemptChannels(exemptChannels, reason) {
        return await this.edit({ exemptChannels, reason })
    }
}

module.exports = AutoModeration