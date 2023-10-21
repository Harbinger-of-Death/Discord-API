const ClientUser = require("../Structures/ClientUser");
const GuildMember = require("../Structures/GuildMember");
const User = require("../Structures/User");
const { RegExes } = require("../Util/Constants");
const EmojiResolver = require("../Util/EmojiResolver");
const CachedManager = require("./CachedManager");
class ReactionUserManager extends CachedManager {
    constructor(channelId, messageId, emoji, client) {
        super(User, client, [])
        this.channelId = channelId ?? null
        this.messageId = messageId ?? null
        this.emoji = emoji ?? null
    }

    _add(users, options = { cache: true, force: false}) {
        if(this.client.user.id === users?.id) this.holds = ClientUser
        else this.holds = User
        return super._add(users, options)
    }

    async fetch(options = {}) {
        const { cache = true, force = false } = options
        const emoji = await EmojiResolver.create(this.emoji, this.client)
        if(emoji) {
            const query = { after: options.after instanceof User || options.after instanceof GuildMember ? options.after?.id : options.after, limit: options.limit ?? 25 }
            const users = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/messages/${this.messageId}/reactions/${emoji}`, { query })
            return new this.cache.constructor(users?.map(o => [o.id, this._add(o, { cache, force })]))
        }

        throw new RangeError(`Invalid Emoji`)
    }

    async remove(user = this.client.user.id) {
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!RegExes.SnowflakeRegExp.test(userId) && !this.cache.has(userId)) throw new RangeError(`Invalid User`)
        const emoji = await EmojiResolver.create(this.emoji, this.client)
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/messages/${this.messageId}/reactions/${emoji}/${userId}`)
        return this.cache.get(userId) ?? null
    }
}

module.exports = ReactionUserManager;