const Emoji = require("../Structures/Emoji");
const { SnowflakeRegex } = require("../Util/Constants");
const Util = require("../Util/Util");
const EmojiManager = require("./EmojiManager");
class GuildEmojiManager extends EmojiManager {
    constructor(guildId, client, iterable) {
        super(client, iterable, { guildId })
        this.guildId = guildId
    }

    async fetch(emoji, options) {
        if(emoji instanceof Emoji || typeof emoji === "string") return this._fetchId(emoji, options)
        if(typeof emoji === "object" && !options) options = emoji
        const { cache = true, force = false } = options ?? {}
        const emojis = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/emojis`)
        return new this.cache.constructor(emojis?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(emoji, options = {}) {
        const { cache = true, force = false } = options
        const emojiId = emoji instanceof Emoji ? emoji.id : emoji
        if(!SnowflakeRegex.test(emojiId)) throw new RangeError(`Invalid Emoji`)
        if(this.cache.has(emojiId) && !force) return this.cache.get(emojiId)
        emoji = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/emojis/${emojiId}`)
        return this._add(emoji, { cache, force: true })
    }

    async create(options = {}) {
        const body = { name: options.name, image: await Util.generateDataURI(options.image), roles: options.roles?.map(o => typeof o === "string" ? o : o.id) }
        const { reason } = options
        const emoji = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/emojis`, { body, reason })
        return this._add(emoji, { cache: true })
    }

    async edit(emoji, options = {}) {
        const emojiId = emoji instanceof Emoji ? emoji.id : emoji
        if(!SnowflakeRegex.test(emojiId) && !this.cache.has(emojiId)) throw new RangeError(`Invalid Emoji`)
        const body = { name: options.name, roles: options.roles?.map(o => typeof o === "string" ? o : o.id) }
        const { reason } = options
        emoji = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/emojis/${emojiId}`, { body, reason })
        return this._add(emoji, { cache: true, force: true })
    }

    async delete(emoji, reason) {
        const emojiId = emoji instanceof Emoji ? emoji.id : emoji
        if(!SnowflakeRegex.test(emojiId) && !this.cache.has(emojiId)) throw new RangeError(`Invalid Emoji`)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/emojis/${emojiId}`, { reason })
        return this.cache.get(emojiId) ?? null
    }
}

module.exports = GuildEmojiManager;