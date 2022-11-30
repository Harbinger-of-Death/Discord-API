const MessageManager = require("../Managers/MessageManager");
const ThreadManager = require("../Managers/ThreadManager");
const Util = require("../Util/Util");
const GuildChannel = require("./GuildChannel");
const Webhook = require("./Webhook");
class BaseGuildTextChannel extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.nsfw = data.nsfw ?? null
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration ?? null
        this.lastMessageId = data.last_message_id ?? null
        this.lastPinnedAt = data.last_pinned_at ? new Date(data.last_pinned_at) : null
        this.lastPinnedTimestamp = this.lastPinnedAt?.getTime() ?? null
        this.threads = new ThreadManager(this.guildId, this.id, this.client, [...this.client.channels.cache.filter(o => o.parentId === this.id)?.values()])
        this.messages = new MessageManager(this.id, this.guildId, this.client)
    }

    async setType(type, reason) {
        return await this.edit({ type, reason })
    }

    async setTopic(topic, reason) {
        return await this.edit({ topic, reason })
    }

    async setNsfw(nsfw, reason) {
        return await this.edit({ nsfw, reason })
    }

    async setDefaultAutoArchiveDuration(defaultAutoArchiveDuration, reason) {
        return await this.edit({ defaultAutoArchiveDuration, reason })
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

    async createWebhook(options = {}) {
        const body = { name: options.name, avatar: await Util.generateDataURI(options.avatar) }
        const { reason } = options
        const webhook = await this.client.api.post(`${this.client.root}/channels/${this.id}/webhooks`, { body, reason })
        return new Webhook(webhook, this.client)
    }

    equals(channel) {
        return super.equals(channel) &&
        this.rateLimitPerUser === channel.rateLimitPerUser &&
        this.topic === channel.topic &&
        this.nsfw === channel.nsfw &&
        this.defaultAutoArchiveDuration === channel.defaultAutoArchiveDuration
        
    }
}

module.exports = BaseGuildTextChannel