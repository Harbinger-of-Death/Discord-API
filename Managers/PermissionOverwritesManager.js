const GuildMember = require("../Structures/GuildMember");
const PermissionOverwrites = require("../Structures/PermissionOverwrites");
const Role = require("../Structures/Role");
const User = require("../Structures/User");
const { RegExes } = require("../Util/Constants");
const Permissions = require("../Util/Permissions");
const CachedManager = require("./CachedManager");
class PermissionOverwritesManager extends CachedManager {
    constructor(channelId, client, iterable) {
        super(PermissionOverwrites, client, iterable, { channelId })
        this.channelId = channelId
    }

    _add(overwrites, options = { cache: true, force: false }) {
        return super._add(overwrites, options)            
    }

    async create(userOrRole, options = {}) {
        const userOrRoleId = userOrRole instanceof User || userOrRole instanceof GuildMember || userOrRole instanceof Role ? userOrRole.id : userOrRole
        if(!RegExes.SnowflakeRegExp.test(userOrRoleId)) throw new RangeError(`Invalid User or Role`)
        if(this.cache.has(userOrRoleId)) return await this.edit(userOrRole, options)
        options = Object.assign(options, { id: userOrRoleId })
        return await this.set([options], options.reason)
    }

    async edit(userOrRole, options = {}) {
        const userOrRoleId = userOrRole instanceof User || userOrRole instanceof GuildMember || userOrRole instanceof Role ? userOrRole.id : userOrRole
        if(!RegExes.SnowflakeRegExp.test(userOrRoleId)) throw new RangeError(`Invalid User or Role`)
        const { type, reason } = options
        const body = PermissionOverwritesManager.transformPermissions(options.permissions, type)
        await this.client.api.put(`${this.client.root}/channels/${this.channelId}/permissions/${userOrRoleId}`, { body, reason })
        return this.client.channels.cache.get(this.channelId) ?? null
    }

    async set(options = [], reason) {
        const permissionOverwrites = options.map(o => PermissionOverwritesManager.parseOverwritesData(o))
        return await this.client.channels.edit(this.channelId, { permissionOverwrites, reason })
    }

    async delete(userOrRole, reason) {
        const userOrRoleId = userOrRole instanceof User || userOrRole instanceof GuildMember || userOrRole instanceof Role ? userOrRole.id : userOrRole
        if(!RegExes.SnowflakeRegExp.test(userOrRoleId)) throw new RangeError(`Invalid User or Role`)
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/permissions/${userOrRoleId}`, { reason })
        return this.client.channels.cache.get(this.channelId) ?? null
    }

    static transformPermissions(payload = {}, type) {
        if(!type && type !== 0) throw new RangeError(`Missing Overwrite type`)
        let allow = new Permissions()
        let deny = new Permissions()
        for(const [key, val] of Object.entries(payload)) {
            if(val === true) {
                allow.add(key)
            } else if(val === false) {
                deny.add(key)
            } else {
                allow.remove(key)
                deny.remove(key)
            }
        }
        
        return { allow: allow.toString(), deny: deny.toString(), type }
    }

    static parseOverwritesData(overwrites = {}) {
        const id = overwrites.id instanceof User || overwrites.id instanceof GuildMember || overwrites.id instanceof Role ? overwrites.id?.id : overwrites.id
        const { allow, deny, type } = this.transformPermissions(overwrites.permissions, overwrites.type)
        if(!RegExes.SnowflakeRegExp.test(id)) throw new RangeError(`Invalid User or Role`)
        return {
            id,
            type,
            allow,
            deny
        }
    }
}

module.exports = PermissionOverwritesManager