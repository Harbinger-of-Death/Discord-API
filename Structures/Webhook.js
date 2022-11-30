const Base = require("../Base/base");
const { SnowflakeRegex } = require("../Util/Constants");
const DataPayload = require("../Util/DataPayload");
const Util = require("../Util/Util");
class Webhook extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.type = data.type ?? null
        this.guildId = data.guild_id ?? null
        this.channelId = data.channel_id ?? null
        this.user = this.client.users._add(data.user, { cache: false })
        this.name = data.name ?? null
        this.avatar = data.avatar ?? null
        this.token = data.token ?? null
        this.applicationId = data.application_id ?? null
        this.sourceGuild = data.source_guild ?? null
        this.sourceChannel = data.source_channel ?? null
    }

    get url() {
        if(this.id && this.url) return `https://canary.discord.com/api/webhooks/${this.id}/${this.token}`
        return null;
    }

    async fetch() {
        const webhook = await this.client.api.get(`${this.client.root}/webhooks/${this.id}/${this.token}`)
        return new this.constructor(webhook, this.client)
    }

    async fetchMessage(message, options = {}) {
        const messageId = typeof message === "string" ? message : message.id
        if(!SnowflakeRegex.test(messageId) && !this.client.channels.cache.get(this.channelId)?.messages.cache.has(messageId) && messageId !== "@original") throw new RangeError(`Invalid Message`)
        const query = { thread_id: typeof options.thread === "string" ? options.thread : options.thread?.id }
        message = await this.client.api.get(`${this.client.root}/webhooks/${this.id}/${this.token}/messages/${messageId}`, { query })
        return this.client.channels.cache.get(message.channel_id)?.messages._add(message)
    }

    async sendMessage(options = {}) {
        const body = await DataPayload.create(options)
        const query = { wait: options.wait, thread_id: typeof options.thread === "string" ? options.thread : options.thread?.id }
        const message = await this.client.api.post(`${this.client.root}/webhooks/${this.id}/${this.token}`, { body, query })
        return this.client.channels.cache.get(message.channel_id)?.messages._add(message)
    }

    async editMessage(message, options = {}) {
        const messageId = typeof message === "string" ? message : message.id
        if(!SnowflakeRegex.test(messageId) && !this.client.channels.cache.get(this.channelId)?.messages.cache.has(messageId) && messageId !== "@original") throw new RangeError(`Invalid Message`)
        const query = { thread_id: typeof options.thread === "string" ? options.thread : options.thread?.id }
        const body = await DataPayload.create(options)
        message = await this.client.api.patch(`${this.client.root}/webhooks/${this.id}/${this.token}/messages/${messageId}`, { query, body })
        return this.client.channels.cache.get(message.channel_id)?.messages._add(message)
    }

    async deleteMessage(message, thread) {
        const messageId = typeof message === "string" ? message : message.id
        if(!SnowflakeRegex.test(messageId) && !this.client.channels.cache.get(this.channelId)?.messages.cache.has(messageId) && messageId !== "@original") throw new RangeError(`Invalid Message`) 
        const query = { thread_id: typeof thread === "string" ? thread : thread?.id }
        await this.client.api.delete(`${this.client.root}/webhooks/${this.id}/${this.token}/messages/${messageId}`, { query })
        return;
    }

    async edit(options = {}) {
        const { reason } = options
        const body = {
            name: options.name,
            avatar: await Util.generateDataURI(options.avatar),
            channel_id: typeof options.channel === "string" ? options.channel : options.channel?.id
        }

        const webhook = await this.client.api.patch(`${this.client.root}/webhooks/${this.id}${this.token ? `/${this.token}` : ""}`, { reason, body })
        return new this.constructor(webhook, this.client)
    }

    async delete(reason) {
        await this.client.api.delete(`${this.client.root}/webhooks/${this.id}${this.token ? `/${this.token}` : ""}`, { reason })
        return this;
    }

    avatarURL(options = {}) {
        if(!this.avatar) return null;
        return this.client.cdn.UserAvatar(this.avatar, options.extension, options.size, true, this.id)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setAvatar(avatar, reason) {
        return await this.edit({ avatar, reason })
    }

    async setChannel(channel, reason) {
        return await this.edit({ channel, reason })
    }

}

module.exports = Webhook