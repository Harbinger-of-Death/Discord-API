const Base = require("../Base/base");
const Snowflake = require("../Util/Snowflake");

class StageInstance extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.channelId = data.channel_id ?? null
        this.topic = data.topic ?? null
        this.privacyLevel = data.privacy_level ?? null
        this.guildScheduledEventId = data.guild_scheduled_event_id ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get stageChannel() {
        return this.client.channels.cache.get(this.channelId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.stageInstances.fetch(this.channelId, options)
    }

    async edit(options = {}) {
        return await this.guild?.stageInstances.edit(this.channelId, options)
    }

    async delete(reason) {
        return await this.guild?.stageInstances.delete(this.channelId, reason)
    }

    async setTopic(topic, reason) {
        return await this.edit({ topic, reason })
    }

    async setPrivacyLevel(privacyLevel, reason) {
        return await this.edit({ privacyLevel, reason })
    }

    get guildScheduledEvent() {
        return this.guild?.guildScheduledEvents.cache.get(this.guildScheduledEventId) ?? null
    }

    equals(stageInstance) {
        return this.topic === stageInstance.topic &&
        this.privacyLevel === stageInstance.privacyLevel
    }

}


module.exports = StageInstance;