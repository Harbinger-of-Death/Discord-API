const MessageManager = require("../Managers/MessageManager");
const VoiceBasedChannels = require("./VoiceBasedChannels");
const Webhook = require("./Webhook");
class VoiceChannel extends VoiceBasedChannels {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.nsfw = data.nsfw ?? null
        this.videoQualityMode = data.video_quality_mode ?? null
        this.userLimit = data.user_limit ?? null
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
        this.messages = new MessageManager(this.id, this.guildId, this.client)
    }

    async setNsfw(nsfw, reason) {
        return await this.edit({ nsfw, reason })
    }

    async setRateLimitPerUser(rateLimitPerUser, reason) {
        return await this.edit({ rateLimitPerUser, reason })
    }

    async setUserLimit(userLimit, reason) {
        return await this.edit({ userLimit, reason })
    }

    async setVideoQualityMode(videoQualityMode, reason) {
        return await this.edit({ videoQualityMode, reason })
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

    async createWebhook(options = {}) {
        const body = { name: options.name, avatar: await Util.generateDataURI(options.avatar) }
        const { reason } = options
        const webhook = await this.client.api.post(`${this.client.root}/channels/${this.id}/webhooks`, { body, reason })
        return new Webhook(webhook, this.client)
    }

    equals(channel) {
        return super.equals(channel) &&
        this.nsfw === channel.nsfw &&
        this.videoQualityMode === channel.videoQualityMode &&
        this.userLimit === channel.userLimit
    }

    createMessageCollector(options = {}) {
        return new MessageCollector(options.filter, { type: "Message", ...options }, { channelId: this.id, guildId: this.guildId }, this.client)
    }

}

module.exports = VoiceChannel