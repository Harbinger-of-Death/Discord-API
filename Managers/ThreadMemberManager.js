const GuildMember = require("../Structures/GuildMember");
const ThreadMember = require("../Structures/ThreadMember");
const User = require("../Structures/User");
const { SnowflakeRegex } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class ThreadMemberManager extends CachedManager {
    constructor(guildId, threadId, client) {
        super(ThreadMember, client, [], { guildId, threadId })
        this.guildId = guildId ?? null
        this.threadId = threadId ?? null
    }

    _add(members, options = { cache: true, force: false }) {
        if(!members) return null;
        const memberId = typeof members === "string" ? members : members.user_id ?? members.userId
        let member
        if(this.cache.has(memberId) && !options.force) {
            member = this.cache.get(memberId)
        } else {
            member = new ThreadMember(typeof members === "string" ? {
                partial: true,
                user_id: memberId
            } : members, this.client, this.extras)

            if(options.cache) this.cache.set(memberId, member)
        }

        return member
        
    }

    async fetch(member, options) {
        if(member instanceof ThreadMember || member instanceof GuildMember || member instanceof User || typeof member === "string") return this._fetchId(member, options)
        if(typeof member === "object" && !options) options = member
        const { cache = true, force = false } = options ?? {}
        const query = {
            withMember: options.withMember,
            after: typeof options.after === "string" ? options.after : options.after?.id,
            limit: options.limit ?? 100
        }
        const members = await this.client.api.get(`${this.client.root}/channels/${this.threadId}/thread-members`, { query })
        return new this.cache.constructor(members?.map(o => [o.user_id, this._add(o, { cache, force })]))
    }

    async _fetchId(member, options = {}) {
        const { cache = true, force = false } = options
        const memberId = member instanceof ThreadMember || member instanceof User || member instanceof GuildMember ? member.userId ?? member.id : member
        if(!SnowflakeRegex.test(memberId)) throw new RangeError(`Invalid Member`)
        if(this.cache.has(memberId) && !force) return this.cache.get(memberId)
        const query = {
            withMember: options.withMember
        }
        member = await this.client.api.get(`${this.client.root}/channels/${this.threadId}/thread-members/${memberId}`, { query })
        return this._add(member, { cache, force: true })
    }

    async add(member = this.client.user.id) {
        const memberId = member instanceof ThreadMember || member instanceof User || member instanceof GuildMember ? member.userId ?? member.id : member
        if(!SnowflakeRegex.test(memberId) && !this.cache.has(memberId)) throw new RangeError(`Invalid Member`)
        await this.client.api.put(`${this.client.root}/channels/${this.threadId}/thread-members/${memberId === this.client.user.id ? `@me` : memberId}`)
        return this.cache.get(memberId)
    }

    async remove(member = this.client.user.id) {
        const memberId = member instanceof ThreadMember || member instanceof User || member instanceof GuildMember ? member.userId ?? member.id : member
        if(!SnowflakeRegex.test(memberId) && !this.cache.has(memberId)) throw new RangeError(`Invalid Member`)
        await this.client.api.delete(`${this.client.root}/channels/${this.threadId}/thread-members/${memberId === this.client.user.id ? `@me` : memberId}`)
        return this.cache.get(memberId) ?? null
    }
}

module.exports = ThreadMemberManager