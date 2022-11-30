const Base = require("../Base/base");
const GuildScheduledEventUserManager = require("../Managers/GuildScheduledEventUserManager");
const Snowflake = require("../Util/Snowflake");

class GuildScheduledEvent extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.channelId = data.channel_id ?? null
        this.creatorId = data.creator_id ?? null
        this.name = data.name ?? null
        this.description = data.description ?? null
        this.scheduledStartAt = data.scheduled_start_time ? new Date(data.scheduled_start_time) : null
        this.scheduledStartTimestamp = this.scheduledStartAt?.getTime() ?? null
        this.scheduledEndAt = data.scheduled_end_time ? new Date(data.scheduled_end_time) : null
        this.scheduledEndTimestamp = this.scheduledEndAt?.getTime() ?? null
        this.privacyLevel = data.privacy_level ?? null
        this.status = data.status ?? null
        this.entityType = data.entity_type ?? null
        this.entityId = data.entity_id ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.entityMetadata = data.entity_metadata ? { location: data.entity_metadata.location } : null
        this.creator = this.client.users._add(data.creator, { cache: true })
        this.userCount = data.user_count ?? null
        this.coverImage = data.image ?? null
        this.users = new GuildScheduledEventUserManager(this.guildId, this.id, this.client)
        this.url = data.id ? `https://discord.com/events/${this.guildId}/${this.id}` : null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.guildScheduledEvents.fetch(this, options)
    }

    async edit(options = {}) {
        return await this.guild?.guildScheduledEvents.edit(this, options)
    }

    async setChannel(channel, reason) {
        return await this.edit({ channel, reason })
    }

    async setEntityMetadata(entityMetadata, reason) {
        return await this.edit({ entityMetadata, reason })
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setPrivacyLevel(privacyLevel, reason) {
        return await this.edit({ privacyLevel, reason })
    }

    async setScheduledStartTime(scheduledStart, reason) {
        return await this.edit({ scheduledStart, reason })
    }

    async setScheduledEndTime(scheduledEnd, reason) {
        return await this.edit({ scheduledEnd, reason })
    }

    async setDescription(description, reason) {
        return await this.edit({ description, reason })
    }

    async setEntityType(entityType, reason) {
        return await this.edit({ entityType, reason })
    }

    async setStatus(status, reason) {
        return await this.edit({ status, reason })
    }

    async setImage(image, reason) {
        return await this.edit({ image, reason })
    }

    async delete() {
        return await this.guild?.guildScheduledEvents.delete(this)
    }

    coverImageURL(options = {}) {
        if(!this.coverImage) return null;
        return this.client.cdn.GuildScheduledEventCover(this.coverImage, options.extension, options.size, this.id)
    }

    equals(guildScheduledEvent) {
        return this.name === guildScheduledEvent.name &&
        this.channelId === guildScheduledEvent.channelId &&
        this.scheduledStartTimestamp === guildScheduledEvent.scheduledStartTimestamp &&
        this.scheduledEndTimestamp === guildScheduledEvent.scheduledEndTimestamp &&
        this.description === guildScheduledEvent.description &&
        this.coverImage === guildScheduledEvent.coverImage &&
        this.privacyLevel === guildScheduledEvent.privacyLevel &&
        this.entityType === guildScheduledEvent.entityType &&
        this.status === guildScheduledEvent.status &&
        (this.entityMetadata === guildScheduledEvent.entityMetadata || this.entityMetadata.location === guildScheduledEvent.entityMetadata.location)
    }

}

module.exports = GuildScheduledEvent