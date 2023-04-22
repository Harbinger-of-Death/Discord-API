const AutoModeration = require("../Structures/AutoModeration")
const { SnowflakeRegex } = require("../Util/Constants")
const CachedManager = require("./CachedManager")
class GuildAutomoderationManager extends CachedManager {
    constructor(guildId, client) {
        super(AutoModeration, client, [], { guildId })
        this.guildId = guildId ?? null
    }

    async fetch(rule, options) {
        if(rule instanceof AutoModeration || typeof rule === "string") return this._fetchId(rule, options)
        if(typeof rule === "object" && !options) options = rule
        const { cache = true, force = false } = options ?? {}
        const rules = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/auto-moderation/rules`)
        return new this.cache.constructor(rules?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(rule, options = {}) {
        const { cache = true, force = false } = options
        const ruleId = rule instanceof AutoModeration ? rule.id : rule
        if(!SnowflakeRegex.test(ruleId)) throw new RangeError(`Invalid Auto Moderation Rule`)
        if(this.cache.has(ruleId) && !force) return this.cache.get(ruleId)
        rule = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/auto-moderation/rules/${ruleId}`)
        return this._add(rule, { cache, force: true })
    }

    async create(options = {}) {
        const body = GuildAutomoderationManager.parseOptions(options)
        const { reason } = options
        const rule = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/auto-moderation/rules`, { reason, body })
        return this._add(rule, { cache: true })
    }

    async edit(rule, options = {}) {
        const ruleId = rule instanceof AutoModeration ? rule.id : rule
        if(!SnowflakeRegex.test(ruleId)) throw new RangeError(`Invalid Auto Moderation Rule`)
        const body = GuildAutomoderationManager.parseOptions(options)
        const { reason } = options
        rule = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/auto-moderation/rules/${ruleId}`, { body, reason })
        return this._add(rule, { cache: true, force: true })
    }

    async delete(rule, reason) {
        const ruleId = rule instanceof AutoModeration ? rule.id : rule
        if(!SnowflakeRegex.test(ruleId)) throw new RangeError(`Invalid Auto Moderation Rule`)
        rule = this.cache.get(ruleId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/auto-moderation/rules/${ruleId}`, { reason })
        return rule ?? null
    }

    static parseOptions(options = {}) {
        return {
            name: options.name,
            event_type: options.eventType,
            trigger_type: options.triggerType,
            trigger_metadata: options.triggerMetadata ? {
                keyword_filter: options.triggerMetadata.keywordFilter,
                regex_patterns: options.triggerMetadata.regexPatterns,
                presets: options.triggerMetadata.presets,
                allow_list: options.triggerMetadata.allowList,
                mention_total_limit: options.triggerMetadata.mentionTotalLimit
            } : undefined,
            actions: options.actions?.map(o => ({
                type: o.type,
                metadata: o.metadata ? {
                    channel_id: typeof o.metadata.channel === "string" ? o.metadata.channel : o.metadata.channel?.id,
                    duration_seconds: o.metadata.durationSeconds,
                    custom_message: o.metadata.customMessage
                } : undefined
            })),
            enabled: options.enabled,
            exempt_roles: options.exemptRoles?.map(o => typeof o === "string" ? o : o.id),
            exempt_channels: options.exemptChannels?.map(o => typeof o === "string"? o : o.id)
        }
    }
}

module.exports = GuildAutomoderationManager