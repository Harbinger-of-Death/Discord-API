const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const Snowflake = require("../Util/Snowflake");
class AutoModeration extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperty(this, "_data", { value: data })
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
        this.mentionRaidProtectionEnabled = data.trigger_metadata?.mention_raid_protection_enabled ?? null
        this.enabled = data.enabled ?? null
        this.actions = data.actions?.map(o => { return { type: o.type, metadata: { channelId: o.metadata?.channel_id, durationSeconds: o.metadata?.duration_seconds } } }) ?? []
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    get exemptChannels() {
        const collection = new Collection()
        for(const channel of this._data.exempt_channels) {
            if(!this.client.channels.cache.has(channel)) continue;
            collection.set(channel, this.client.channels.cache.get(channel))
        }

        return collection
    }

    get exemptRoles() {
        const collection = new Collection()
        for(const role of this._data.exempt_roles) {
            if(!this.guild?.roles.cache.has(role)) continue;
            collection.set(role, this.guild?.roles.cache.get(role))
        }

        return collection
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

    async setKeywordFilter(keywordFilter, reason) {
        return await this.edit({ triggerMetadata: { keywordFilter }, reason })
    }

    async setRegexPatterns(regexPatterns, reason) {
        return await this.edit({ triggerMetadata: { regexPatterns }, reason })
    }

    async setPresets(presets, reason) {
        return await this.edit({ triggerMetadata: { presets }, reason })
    }

    async setAllowList(allowList, reason) {
        return await this.edit({ triggerMetadata: { allowList }, reason })
    }

    async setMentionTotalLimit(mentionTotalLimit, reason) {
        return await this.edit({ triggerMetadata: { mentionTotalLimit }, reason })
    }

    async setMentionRaidProtectionEnabled(mentionRaidProtectionEnabled, reason) {
        return await this.edit({ triggerMetadata: { mentionRaidProtectionEnabled }, reason })
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