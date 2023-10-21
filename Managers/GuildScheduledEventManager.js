const GuildScheduledEvent = require("../Structures/GuildScheduledEvent");
const { RegExes } = require("../Util/Constants");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class GuildScheduledEventManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(GuildScheduledEvent, client, iterable, { guildId })
        this.guildId = guildId
    }

    async fetch(scheduledEvent, options) {
        if(scheduledEvent instanceof GuildScheduledEvent || typeof scheduledEvent === "string") return this._fetchId(scheduledEvent, options)
        if(typeof scheduledEvent === "object" && !options) options = scheduledEvent
        const { cache = true, force = false, withUserCount = false } = options ?? {}
        const query = { with_user_count: withUserCount }
        const guildScheduledEvents = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/scheduled-events`, { query })
        return new this.cache.constructor(guildScheduledEvents?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(scheduledEvent, options = {}) {
        const { cache = true, force = false, withUserCount = false } = options
        const scheduledEventId = scheduledEvent instanceof GuildScheduledEvent ? scheduledEvent.id : scheduledEvent
        if(this.cache.has(scheduledEventId) && !force) return this.cache.get(scheduledEventId)
        const query = { with_user_count: withUserCount }
        scheduledEvent = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/scheduled-events/${scheduledEventId}`, { query })
        return this._add(scheduledEvent, { cache, force: true })
    }

    async create(options = {}) {
        const { reason } = options
        const body = await GuildScheduledEventManager.parsePayload(options)
        const scheduledEvent = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/scheduled-events`, { reason, body })
        return this._add(scheduledEvent, { cache: true })
    }

    async edit(scheduledEvent, options = {}) {
        const { reason } = options
        const scheduledEventId = scheduledEvent instanceof GuildScheduledEvent ? scheduledEvent.id : scheduledEvent
        if(!this.cache.has(scheduledEventId)) throw new RangeError(`Invalid Guild Scheduled Event`)
        const body = await GuildScheduledEventManager.parsePayload(options)
        scheduledEvent = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/scheduled-events/${scheduledEventId}`, { body, reason })
        return this._add(scheduledEvent, { cache: true })
    }

    async delete(scheduledEvent) {
        const scheduledEventId = scheduledEvent instanceof GuildScheduledEvent ? scheduledEvent.id : scheduledEvent
        if(!RegExes.SnowflakeRegExp.test(scheduledEventId)) throw new RangeError(`Invalid Guild Scheduled Event`)
        scheduledEvent = this.cache.get(scheduledEventId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/scheduled-events/${scheduledEventId}`)
        return scheduledEvent ?? null
    }

    static async parsePayload(payload = {}) {
        return {
            broadcast_to_directory_channels: true,
            channel_id: typeof payload.channel === "string" ? payload.channel : payload.channel?.id,
            entity_metadata: payload.entityMetadata,
            name: payload.name,
            privacy_level: payload.privacyLevel,
            scheduled_start_time: payload.scheduledStart ? Util.generateDateISOString(payload.scheduledStart) : undefined,
            scheduled_end_time: payload.scheduledEnd ? Util.generateDateISOString(payload.scheduledEnd) : undefined,
            description: payload.description,
            entity_type: payload.entityType,
            status: payload.status,
            image: await Util.generateDataURI(payload.image)
        }
    }
}

module.exports = GuildScheduledEventManager