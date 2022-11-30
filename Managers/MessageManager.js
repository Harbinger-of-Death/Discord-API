const Message = require("../Structures/Message");
const { SnowflakeRegex } = require("../Util/Constants");
const EmojiResolver = require("../Util/EmojiResolver");
const DataPayload = require("../Util/DataPayload");
const Snowflake = require("../Util/Snowflake");
const CachedManager = require("./CachedManager");
class MessageManager extends CachedManager {
    constructor(channelId, guildId, client) {
        super(Message, client, [], { channelId, guildId })
        this.channelId = channelId
        this.guildId = guildId
    }

    _add(messages, options = { cache: true, force: false }) {
        return super._add(messages, options)
    }

    async fetch(message, options) {
        if(message instanceof Message || typeof message === "string") return this._fetchId(message, options)
        if(typeof message === "object" && !options) options = message
        const { cache = true, force = false, around, before, after, limit = 50 } = options ?? {}
        const query = { 
            around: around instanceof Message ? around.id : around,
            before: before instanceof Message ? before.id : before,
            after: after instanceof Message ? after.id : after,
            limit
        }

        const messages = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/messages`, { query })
        return messages
        return new this.cache.constructor(messages?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(message, options = {}) {
        const { cache = true, force = false } = options
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId)) throw new RangeError(`Invalid Message`)
        if(this.cache.has(messageId) && !force) return this.cache.get(messageId)
        message = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/messages/${messageId}`)
        return this._add(message, { cache, force: true })
    }

    async edit(message, options = {}) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId) && !this.cache.has(messageId)) throw new RangeError(`Invalid Message`)
        const body = await DataPayload.create(options)
        message = await this.client.api.patch(`${this.client.root}/channels/${this.channelId}/messages/${messageId}`, { body })
        return this._add(message, { cache: true, force: true })
    }

    async delete(message, reason) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId) && !this.cache.has(messageId)) throw new RangeError(`Invalid Message`)
        message = this.cache.get(messageId)
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/messages/${messageId}`, { reason })
        return message ?? null
    }

    async send(options = {}) {
        const body = await DataPayload.create(options)
        const message = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/messages`, { body })
        return this._add(message, { cache: true })
    }

    async crosspost(message) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId) && !this.cache.has(messageId)) throw new RangeError(`Invalid Message`)
        message = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/messages/${messageId}/crosspost`)
        return this._add(message)
    }

    async react(message, emoji) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId) && !this.cache.has(messageId)) throw new RangeError(`Invalid Message`)
        emoji = EmojiResolver.create(emoji, this.client)
        await this.client.api.put(`${this.client.root}/channels/${this.channelId}/messages/${messageId}/reactions/${emoji}/@me`)
        return this.cache.get(messageId) ?? null
    }

    async bulkDelete(messages, options = {}) {
        messages = MessageManager.parseBulkDeleteMessages(messages)
        if(typeof messages === "number") {
            const fetchMessages = await this.fetch({ limit: messages })
            return await this.bulkDelete(fetchMessages, options)
        }
        const { reason, filterOld = true } = options
        if(filterOld) messages = messages.filter(o => (Date.now() - Snowflake.deconstruct(o).createdAt) <= 1000 * 60 * 60 * 24 * 7)
        const body = { messages }
        if(messages?.length > 100 || messages?.length < 2) throw new RangeError(`Too few Messages, must be between 2-100 in length`)
        await this.client.api.post(`${this.client.root}/channels/${this.channelId}/messages/bulk-delete`, { body, reason })
        return new this.cache.constructor(messages?.map(o => [o, this._add(o, { cache: false })]))
    }

    async fetchPinnedMessages(options = {}) {
        const { cache = true, force = false } = options
        const messages = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/pins`)
        return new this.cache.constructor(messages?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async pin(message, reason) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId)) throw new RangeError(`Invalid Message`)
        await this.client.api.put(`${this.client.root}/channels/${this.channelId}/pins/${messageId}`, { reason })
        return this.cache.get(messageId) ?? null
    }

    async unpin(message, reason) {
        const messageId = message instanceof Message ? message.id : message
        if(!SnowflakeRegex.test(messageId)) throw new RangeError(`Invalid Message`)
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/pins/${messageId}`, { reason })
        return this.cache.get(messageId) ?? null
    }

    static parseBulkDeleteMessages(messages) {
        if(messages instanceof Map) return [...messages.keys()]
        if(Array.isArray(messages)) return messages.map(o => {
            const messageId = o instanceof Message ? o.id : o
            if(!SnowflakeRegex.test) throw new RangeError(`Invalid Message`)
            return messageId
        })
        return messages
    }
}

module.exports = MessageManager