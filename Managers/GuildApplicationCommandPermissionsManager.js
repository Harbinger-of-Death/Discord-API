const ApplicationCommandPermission = require("../Structures/ApplicationCommandPermission");
const { RegExes } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class GuildApplicationCommandPermissionsManager extends CachedManager {
    constructor(guildId, commandId, client) {
        super(ApplicationCommandPermission, client)
        this.commandId = commandId ?? null
        this.guildId = guildId ?? null
    }

    _add(permissions, options = { cache: true, force: false }) {
        if(!permissions) return null;
        const applicationCommandId = typeof permissions === "string" ? permissions : permissions.id ?? commandId
        let permission
        if(this.cache.has(applicationCommandId) && !options.force) {
            permission = this.cache.get(applicationCommandId)
        } else {
            permission = new ApplicationCommandPermission(typeof permissions === "string" ? { partial: true, commandId: applicationCommandId } : permissions, this.client, { commandId: applicationCommandId, guildId: this.guildId })
            if(options.cache) this.cache.set(applicationCommandId, permission)
        }

        return permission
    }

    async fetch(command = this.commandId, options) {
        if(typeof command?.id !== "undefined" || typeof command === "string") return this._fetchId(command, options)
        if(typeof command === "object" && !options) options = command
        const { cache = true, force = false } = options ?? {}
        const permissions = await this.client.api.get(`${this.client.root}/applications/${this.client.user.id}/guilds/${this.guildId}/commands/permissions`)
        return new this.cache.constructor(permissions?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(command = this.commandId, options = {}) {
        const { cache = true, force = false } = options
        const commandId = typeof command === "string" ? command : command.id
        if(!RegExes.SnowflakeRegExp.test(commandId)) throw new RangeError(`Invalid Application Command`)
        if(this.cache.has(commandId) && !force) return this.cache.get(commandId)
        const permission = await this.client.api.get(`${this.client.root}/applications/${this.client.user.id}/guilds/${this.guildId}/commands/${commandId}/permissions`)
        return this._add(permission, { cache, force: true })
    }

    async create(options = {}) {
        const { permissions, accessToken = "", command = this.commandId } = options
        const commandId = typeof command === "string" ? command : command?.id
        if(!RegExes.SnowflakeRegExp.test(commandId)) throw new RangeError(`Invalid Application Command`)
        if(!accessToken) throw new RangeError(`No Access Token provided`)
        const body = { permissions: permissions?.map(o => {
            return {
                id: typeof o.id === "string" ? o.id : o.id?.id,
                type: o.type,
                permission: o.permission
            }
        })}
        

        const applicationCommandPermissions = await this.client.api.put(`${this.client.root}/applications/${this.client.user.id}/guilds/${this.guildId}/commands/${commandId}/permissions`, { authorization: accessToken, tokenType: "Bearer", body })
        return this._add(applicationCommandPermissions, { cache: true })
    }

}

module.exports = GuildApplicationCommandPermissionsManager