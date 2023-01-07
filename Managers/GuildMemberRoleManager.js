const Role = require("../Structures/Role");
const { SnowflakeRegex } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class GuildMemberRoleManager extends CachedManager {
    constructor(member, guildId, iterable, client) {
        super(Role, client, iterable, { guildId })
        this.member = member ?? null
        this.guildId = guildId ?? null
    }

    _add(roles, options = { cache: true, force: false }) {
        return super._add(roles, options)
    }

    async add(roles, reason) {
        roles = GuildMemberRoleManager.transformRoles(roles)
        if(Array.isArray(roles)) {
            roles = roles.reduce((acc, prev) => {
                const roleId = prev instanceof Role ? prev.id : prev
                if(!SnowflakeRegex.test(roleId)) throw new RangeError(`Invalid Role`)
                return acc.concat(roleId)
            }, [...this.cache.keys()])
            return await this.set(roles, reason)
        }
        const roleId = roles instanceof Role ? roles.id : roles
        if(!SnowflakeRegex.test(roleId)) throw new RangeError(`Invalid Role`)
        await this.client.api.put(`${this.client.root}/guilds/${this.guildId}/members/${this.member?.id}/roles/${roleId}`, { reason })
        return this.member
    }

    async remove(roles, reason) {
        roles = GuildMemberRoleManager.transformRoles(roles)
        if(Array.isArray(roles)) {
            roles = this.cache?.filter(o => {
                const roleId = o instanceof Role ? o.id : o
                if(!SnowflakeRegex.test(roleId)) throw new RangeError(`Invalid Error`)
                return !roles.includes(roleId)
            })

            return await this.set(roles, reason)
        }

        const roleId = roles instanceof Role ? roles.id : roles
        if(!SnowflakeRegex.test(roleId)) throw new RangeError(`Invalid Role`)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/members/${this.member?.id}/roles/${roleId}`, { reason })
        return this.member
    }

    async set(roles, reason) {
        roles = GuildMemberRoleManager.transformRoles(roles)
        const guild = this.client.guilds.cache.get(this.guildId)
        if(!Array.isArray(roles)) throw new RangeError(`Must be an Array of Roles`)
        const filteredRoles = []
        for(const val of roles) {
            const cachedRole = guild?.roles.cache.get(val)
            if(cachedRole) {
                if(cachedRole.id === this.guildId) continue;
                filteredRoles.push(val)
            }
        }

        const member = await guild?.members.edit(this.member, { roles: filteredRoles, reason })
        return member
    }

    displayColor() {
        return this.highest?.color ?? 0
    }

    static transformRoles(roles) {
        if(Array.isArray(roles)) return roles.map(o => o instanceof Role ? o.id : o)
        if(roles instanceof Map) return this.transformRoles([...roles.keys()])
        return roles
    }


    get highest() {
        const highest = this.cache.sort((a, b) => b.position - a.position)
        return highest.first()
    }

    get premiumSubscriberRole() {
        return this.cache.find(o => o.tags?.premiumSubscriber) ?? null
    }

    get linkedRoles() {
        return this.cache.find(o => o.tags?.guildConnections) ?? null
    }

    botRoleFor(user = this.client.user.id) {
        const userId = typeof user === "string" ? user : user.id
        if(!this.client.users.cache.get(userId)?.bot) throw new RangeError(`This isn't a Discord Bot`)
        return this.cache.find(o => o.tags.botId === userId) ?? null
    }

    comparePositionTo(role1, role2) {
        role1 = this.cache.get(typeof role1 === "string" ? role1 : role1.id)
        role2 = this.cache.get(typeof role2 === "string" ? role2 : role2.id)
        if(role1 && role2) {
            if(role1.position > role2.position) return 1
            if(role1.position < role2.position) return -1
            if(role1.position === role2.position) return 0
        }

        throw new RangeError(`Specified Roles are invalid or uncached`)
    }

    get everyone() {
        return this.client.guilds.cache.get(this.guildId)?.roles.cache.get(this.guildId) ?? null
    }

}

module.exports = GuildMemberRoleManager