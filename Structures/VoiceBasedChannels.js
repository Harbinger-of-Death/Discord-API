const MessageManager = require("../Managers/MessageManager")
const Collection = require("../Util/Collection")
const { OpCodes } = require("../Util/Constants")
const GuildChannel = require("./GuildChannel")
const Webhook = require("./Webhook")
class VoiceBasedChannels extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.bitrate = data.bitrate ?? null
        this.nsfw = data.nsfw ?? null
        this.rtcRegion = data.rtc_region ?? null
        this.messages = new MessageManager(this.id, this.guildId, this.client)
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
    }

    async setNsfw(nsfw, reason) {
        return await this.edit({ nsfw, reason })
    }

    async setRateLimitPerUser(rateLimitPerUser, reason) {
        return await this.edit({ rateLimitPerUser, reason })
    }

    async send(options = {}) {
        return await this.messages.send(options)
    }

    async bulkDelete(messages, options = {}) {
        return await this.messages.bulkDelete(messages, options)
    }
    
    async sendTyping() {
        return await this.client.channels.sendTyping(this)
    }

    async setBitrate(bitrate, reason) {
        return await this.edit({ bitrate, reason })
    }

    async setRtcRegion(rtcRegion, reason) {
        return await this.edit({ rtcRegion, reason })
    }

    get members() {
        const collection = new Collection()
        for(const state of this.guild?.voiceStates.cache.values()) {
            if(state.channelId === this.id && state.member) collection.set(state.userId, state)
        }

        return collection

    }

    async createWebhook(options = {}) {
        const body = { name: options.name, avatar: await Util.generateDataURI(options.avatar) }
        const { reason } = options
        const webhook = await this.client.api.post(`${this.client.root}/channels/${this.id}/webhooks`, { body, reason })
        return new Webhook(webhook, this.client)
    }

    createMessageCollector(options = {}) {
        return new MessageCollector(options.filter, { type: "Message", ...options }, { channelId: this.id, guildId: this.guildId }, this.client)
    }

    join({ selfMute = false, selfDeaf = false } = {}) {
        return this.client.ws.send({
            op: OpCodes.VoiceStateUpdate,
            d: {
                guild_id: this.guildId,
                channel_id: this.id,
                selfMute,
                selfDeaf
            }
        })
    }

    equals(channel) {
        return super.equals(channel) &&
        this.nsfw === channel.nsfw &&
        this.rtcRegion === channel.rtcRegion &&
        this.bitrate === channel.bitrate

    }
}

module.exports = VoiceBasedChannels