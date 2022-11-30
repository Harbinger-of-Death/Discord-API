const Base = require("../Base/base");
class AutoModerationRuleAction extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.guildId = data.guild_id ?? guildId ?? null
        this.action = data.action ? { type: data.action.type, metadata: Object.keys(data.action.metadata) ? { channelId: data.action.metadata?.channel_id, durationSeconds: data.action.metadata?.duration_seconds } : null } : null
        this.ruleId = data.rule_id ?? null
        this.ruleTriggerType = data.rule_trigger_type ?? null
        this.userId = data.user_id ?? null
        this.channelId = data.channel_id ?? null
        this.messageId = data.message_id ?? null
        this.alertSystemMessageId = data.alert_message_system_message_id ?? null
        this.content = data.content ?? null
        this.matchedKeyword = data.matched_keyword ?? null
        this.matchedContent = data.matched_content ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? null
    }

    get user() {
        return this.client.users.cache.get(this.userId) ?? null
    }

    async fetchMessage(options = {}) {
        return await this.channel?.messages.fetch(this.messageId, options)
    }

    async fetchAlertSystemMessage(options = {}) {
        return await this.channel?.messages.fetch(this.alertSystemMessageId, options)
    }

    async fetchRule(options = {}) {
        return await this.guild?.automoderations.fetch(this.ruleId, options)
    }

}

module.exports = AutoModerationRuleAction