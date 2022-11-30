const CategoryChannel = require("../Structures/CategoryChannel");
const Channel = require("../Structures/Channel");
const GuildChannel = require("../Structures/GuildChannel");
const ChannelFlags = require("../Util/ChannelFlags");
const { SnowflakeRegex } = require("../Util/Constants");
const makeChannel = require("../Util/makeChannel");
const Permissions = require("../Util/Permissions");
const CachedManager = require("./CachedManager");
class ChannelManager extends CachedManager {
    constructor(client, iterable, extras) {
        super(extras?.guildId ? GuildChannel : Channel, client, iterable, extras)
    }

    _add(channels, options = { cache: true, force: false }, extras = {}) {
        if(!channels) return null;
        const channelId = typeof channels === "string" ? channels : extras.id ?? channels.id
        let channel
        if(this.cache.has(channelId) && !options.force) {
            channel = this.cache.get(channelId)
        } else {
            const Channel = makeChannel(channels, this.holds)
            channel = new Channel(typeof channels === "string" ? {
                partial: true,
                id: channelId
            } : channels, this.client, extras)
            if(options.cache) {
                if(extras.guildId) this.client.guilds.cache.get(extras.guildId)?.channels.cache.set(channelId, channel)
                this.cache.set(channelId, channel)
            }
        }

        return channel
    }

    async fetch(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        const { cache = true, force = false } = options
        if(!SnowflakeRegex.test(channelId)) throw new RangeError(`Invalid Channel`)
        if(this.cache.has(channelId) && !force) return this.cache.get(channelId)
        channel = await this.client.api.get(`${this.client.root}/channels/${channelId}`)
        return this._add(channel, { cache, force: true }, { guildId: channel.guild_id })
    }

    async edit(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId) && !SnowflakeRegex.test(channelId)) throw new RangeError(`Invalid Channel`)
        const body = ChannelManager.transformPayload(options)
        const { reason } = options
        channel = await this.client.api.patch(`${this.client.root}/channels/${channelId}`, { body, reason })
        return this._add(channel, { cache: true, force: true }, { guildId: channel.guild_id })
    } 

    async delete(channel, reason) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!SnowflakeRegex.test(channelId) && !this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
        channel = this.cache.get(channelId)
        await this.client.api.delete(`${this.client.root}/channels/${channelId}`, { reason })
        return channel ?? null
    }

    async sendTyping(channel) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId) && !SnowflakeRegex.test(channelId)) throw new RangeError(`Invalid Channel`)
        await this.client.api.post(`${this.client.root}/channels/${channelId}/typing`)
        return this.cache.get(channelId)
    }

    
    static transformPayload(payload = {}) {
        return {
            name: payload.name,
            type: payload.type,
            topic: payload.topic,
            bitrate: payload.bitrate,
            user_limit: payload.userLimit ?? payload.user_limit,
            rate_limit_per_user: payload.rateLimitPerUser,
            position: payload.position,
            permission_overwrites: payload.permissionOverwrites?.map(o => {
                return {
                    id: typeof o.id === "string" ? o.id : o.id?.id,
                    type: o.type,
                    allow: o.allow ? Permissions.resolve(o.allow).toString() : undefined,
                    deny: o.deny ? Permissions.resolve(o.deny).toString() : undefined
                }
            }),
            parent_id: typeof payload.parent === "string" ? payload.parent : payload.parent?.id,
            nsfw: payload.nsfw,
            rtc_region: payload.rtcRegion,
            video_quality_mode: payload.videoQualityMode,
            default_auto_archive_duration: payload.defaultAutoArchiveDuration,
            archived: payload.archived,
            auto_archive_duration: payload.autoArchiveDuration,
            locked: payload.locked,
            invitable: payload.invitable,
            flags: payload.flags ? ChannelFlags.resolve(payload.flags).toString() : undefined,
            default_reaction_emoji: payload.defaultReactionEmoji ? { emoji_id: payload.defaultReactionEmoji.id, emoji_name: payload.defaultReactionEmoji.name } : undefined,
            available_tags: payload.availableTags?.map(o => {
                return {
                    id: o.id,
                    name: o.name,
                    moderated: o.moderated,
                    emoji_id: o.emojiId,
                    emoji_name: o.emojiName
                }
            }),
            default_sort_order: payload.defaultSortOrder,
            applied_tags: payload.appliedTags?.map(o => typeof o === "string" ? o : o.id)
        }
    }

}

module.exports = ChannelManager