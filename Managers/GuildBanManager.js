const GuildBan = require("../Structures/GuildBan");
const GuildMember = require("../Structures/GuildMember");
const User = require("../Structures/User");
const { RegExes } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class GuildBanManager extends CachedManager {
    constructor(guildId, client) {
        super(GuildBan, client, [], { guildId })
        this.guildId = guildId ?? null
    }

    _add(bans, options = { cache: true, force: false }, extras = {}) {
        return super._add(bans, options, Object.assign(this.extras, extras))
    }

    async fetch(user, options) {
        if(user instanceof User || user instanceof GuildMember || typeof user === "string") return this._fetchId(user, options)
        if(typeof user === "object" & !options) options = user
        const { cache = true, force = true, limit = 1000, before, after } = options ?? {}
        const query = {
            limit,
            before: before instanceof User || before instanceof GuildMember ? before.id : before,
            after: after instanceof User || after instanceof GuildMember ? after.id : after
        }

        const bans = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/bans`, { query })
        return new this.cache.constructor(bans?.map(o => [o.user?.id, this._add(o, { cache, force }, { id: o.user?.id })]))
    }

    async _fetchId(user, options = {}) {
        const { cache = true, force = false } = options
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!RegExes.SnowflakeRegExp.test(userId)) throw new RangeError(`Invalid User`)
        if(this.cache.has(userId) && !force) return this.cache.get(userId)
        const ban = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/bans/${userId}`)
        return this._add(ban, { cache, force: true }, { id: userId })
    }
    
    async create(user, options = {}) {
        const { reason, deleteMessageSeconds } = options
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!RegExes.SnowflakeRegExp.test(userId)) throw new RangeError(`Invalid User`)
        const body = { delete_message_seconds: deleteMessageSeconds }
        await this.client.api.put(`${this.client.root}/guilds/${this.guildId}/bans/${userId}`, { reason, body })
        return this._add({ user: userId }, { cache: false })
    }

    async remove(user, reason) {
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!RegExes.SnowflakeRegExp.test(userId) && !this.cache.has(userId)) throw new RangeError(`Invalid User`)
        const ban = this.cache.get(userId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/bans/${userId}`, { reason })
        return ban ?? null
    } 
}

module.exports = GuildBanManager
