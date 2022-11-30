const Role = require("../Structures/Role");
const Permissions = require("../Util/Permissions");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class RoleManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(Role, client, iterable, { guildId })
        this.guildId = guildId ?? null
    }

    _add(roles, options = { cache: true, force: false }) {
        return super._add(roles, options)
    }


    async fetch(options = {}) {
        const { cache = true, force = false } = options
        const roles = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/roles`)
        return new this.cache.constructor(roles?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async create(options = {}) {
        const { reason, position } = options
        const body = {
            name: options.name,
            permissions: options.permissions ? Permissions.resolve(options.permissions).toString() : undefined,
            color: options.color ? Util.resolveColor(options.color) : undefined,
            hoist: options.hoist,
            icon: await Util.generateDataURI(options.icon),
            unicode_emoji: options.unicodeEmoji ?? options.unicode_emoji,
            mentionable: options.mentionable
        }
        const role = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/roles`, { body, reason })
        if(options.position) await this.modifyPositions([{ role, position }], reason)
        return this._add(role, { cache: true })
    }

    async edit(role, options = {}) {
        const { reason, position } = options
        const roleId = role instanceof Role ? role.id : role?.id ?? role
        if(!this.cache.has(roleId)) throw new RangeError(`Invalid Role`)
        const body = {
            name: options.name,
            permissions: options.permissions ? Permissions.resolve(options.permissions).toString() : undefined,
            color: options.color ? Util.resolveColor(options.color) : undefined,
            hoist: options.hoist,
            icon: await Util.generateDataURI(options.icon),
            unicode_emoji: options.unicodeEmoji ?? options.unicode_emoji,
            mentionable: options.mentionable
        }
        role = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/roles/${roleId}`, { reason, body })
        if(position) await this.modifyPositions([{ role, position }], reason)
        return this._add(role, { cache: true })
    }

    async delete(role, reason) {
        const roleId = role instanceof Role ? role.id : role.id ?? role
        if(!SnowflakeRegex.test(roleId)) throw new RangeError(`Invalid Role`)
        role = super.cache.get(roleId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/roles/${roleId}`, { reason })
        return role ?? null
    }

    async modifyPositions(roles = [], reason) {
        console.log(roles)
        const body = roles?.map(o => {
            const roleId = o.role instanceof Role ? o.role.id : o.role?.id ?? o.role
            if(!this.cache.has(roleId)) throw new RangeError(`Invalid Role`)
            return {
                id: roleId,
                position: o.position
            }
        })
        await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/roles`, { body, reason })
        return new this.cache.constructor(body.map(o => [o.id, this._add(o.id, { cache: true })]))
    }


    get highest() {
        const highest = this.cache.sort((a, b) => b.position - a.position)
        return highest.first()
    }

    get premiumSubscriberRole() {
        return this.cache.find(o => o.tags?.premiumSubscriber) ?? null
    }

    get everyone() {
        return this.client.guilds.cache.get(this.guildId)?.roles.cache.get(this.guildId) ?? null
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

    async clone(role, reason) {
        role = this.cache.get(typeof role === "string" ? role : role.id)
        if(!role) throw new RangeError(`Invalid Role`)
        return await this.create({ ...role, reason })
    }
}

module.exports = RoleManager