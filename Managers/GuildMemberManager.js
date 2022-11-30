const GuildMember = require("../Structures/GuildMember");
const User = require("../Structures/User");
const { OpCodes, SnowflakeRegex, EventTypes } = require("../Util/Constants");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class GuildMemberManager extends CachedManager  {
    constructor(guildId, iterable, client) {
        super(GuildMember, client, iterable, { guildId })
        this.guildId = guildId ?? null
    }

    async fetch(member, options) {
        if(member instanceof GuildMember || member instanceof User || typeof member === "string") return this._fetchId(member, options)
        if(typeof member === "object" && !options) options = member
        const { cache = true, force = false, query = "", limit = 0, withPresence = false, user, time = 120e3 } = options ?? {}
        this.client.ws.send({
            op: OpCodes.RequestGuildMembers,
            d: {
                guild_id: this.guildId,
                query,
                limit,
                presences: withPresence,
                user_ids: Array.isArray(user) ? user.map(o => o instanceof User ? o.id : o) : user?.id
            }
        })

        return new Promise((resolve, rej) => {
            const timeout = setTimeout(() => {
                this.client.removeListener(EventTypes.GuildMembersChunk, () => {})
                rej(new Error(`Guild Members didn't arrived in time`))
            }, time)

            this.client.on(EventTypes.GuildMembersChunk, chunk => {
                clearTimeout(timeout)
                
                if(chunk.guild_id === this.guildId) resolve(new this.cache.constructor(chunk.members?.map(o => [o.user?.id, this._add(o, { cache, force }, { id: o.user?.id })])))
            })
        })
    }

    async _fetchId(member, options = {}) {
        const { cache = true, force = false } = options
        const memberId = typeof member === "string" ? member : member.id
        if(!SnowflakeRegex.test(memberId)) throw new RangeError(`Invalid Guild Member`)
        if(this.cache.has(memberId) && !force) return this.cache.get(memberId)
        member = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/members/${memberId}`)
        return this._add(member, { cache, force: true }, { id: member.user?.id })
    }

    async search(options = {}) {
        const { cache = true, force = false, limit = 25 } = options
        const query = {
            query: options.query,
            limit
        }

        const members = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/members/search`, { query })
        return new this.cache.constructor(members?.map(o => [o.user?.id, this._add(o, { cache, force }, { id: o.user?.id })]))
    }

    async list(options = {}) {
        const { cache = true, force = false } = options
        const query = {
            limit: options.limit ?? 1000,
            after: typeof options.after === "string" ? options.after : options.after?.id
        }

        const members = await this.client.api.get(`${this.client.root}guilds/${this.guildId}/members`, { query })
        return new this.cache.constructor(members?.map(o => [o.user?.id, this._add(o, { cache, force }, { id: o.user?.id })]))
    }

    async edit(member, options = {}) {
        let memberId = typeof member === "string" ? member : member.id
        if(!SnowflakeRegex.test(memberId)) throw new RangeError(`Invalid GuildMember`)
        const { reason } = options
        const body =  GuildMemberManager.transformPayload(options)
        if(this.client.user.id === memberId && body.nick?.length) memberId = "@me"
        member = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/members/${memberId}`, { body, reason })
        return this._add(member, { cache: true, force: true }, { id: member.user?.id })
    }

    async kick(member, reason) {
        const userId = typeof member === "string" ? member : member.id
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid GuildMember`)
        member = this.cache.get(userId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/members/${userId}`, { reason })
        return member ?? null
    }

    async ban(member, options = {}) {
        const memberId = member instanceof GuildMember || member instanceof User ? member.id : member
        if(!SnowflakeRegex.test(memberId)) throw new RangeError(`Invalid User`)
        await this.client.guilds.cache.get(this.guildId)?.bans.create(member, options)
        return this.client.guilds.cache.get(this.guildId)?.members.cache.get(memberId) ?? this.client.users.cache.get(memberId) ?? null
    }

    async unban(member, reason) {
        const memberId = member instanceof User || member instanceof GuildMember ? member.id : member
        if(!SnowflakeRegex.test(memberId)) throw new RangeError(`Invalid User`)
        await this.client.guilds.cache.get(this.guildId)?.bans.remove(memberId, reason)
        return this.client.users.cache.get(memberId) ?? null
    }

    async addMember(user, options = {}) {
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        const body = {
            access_token: options.accessToken,
            nick: options.nickname ?? options.nick,
            roles: options.roles?.map(o => typeof o === "string" ? o : o.id),
            mute: options.mute,
            deaf: options.deaf
        }

        user = await this.client.api.put(`${this.client.root}/guilds/${this.guildId}/members/${userId}`, { body })
        return this._add(user, { cache: true }, { id: user.user?.id })
    }

    async addRole(user, options = {}) {
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        const { reason } = options
        await this.client.api.put(`${this.client.root}/guilds/${this.guildId}/members/${userId}/roles/${typeof options.role === "string" ? options.role : options.role?.id}`, { reason })
        return this._add(userId)
    }

    async removeRole(user, options = {}) {
        const userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        const { reason } = options
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/members/${userId}/roles/${typeof options.role === "string" ? options.role : options.role?.id}`, { reason })
        return this._add(userId)
    }

    static transformPayload(payload = {}) {
        return {
            nick: payload.nickname ?? payload.nick,
            roles: payload.roles?.map(o => typeof o === "string" ? o : o.id),
            mute: payload.mute,
            deaf: payload.deaf,
            channel_id: typeof payload.channel === "string" ? payload.channel : payload.channel?.id,
            communication_disabled_until: payload.communicationDisabledUntil === null ? payload.communicationDisabledUntil : Util.generateDateISOString(payload.communicationDisabledUntil ?? null)
        }
    }

}

module.exports = GuildMemberManager
