const SlashCommandBuilder = require("../Builders/SlashCommandBuilder");
const SlashOptionBuilder = require("../Builders/SlashOptionBuilder");
const ApplicationCommand = require("../Structures/ApplicationCommand");
const { RegExes } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class ApplicationCommandManager extends CachedManager {
    constructor(client, extras) {
        super(ApplicationCommand, client, [], extras)
    }

    async fetch(command, options) {
        if(command instanceof ApplicationCommand || typeof command === "string") return this._fetchId(command, options)
        if(typeof command === "object" && !options) options = command
        const { cache = true, force = false, withLocalizations = false } = options ?? {}
        const query = { with_localizations: withLocalizations }
        const commands = await this.client.api.get(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands`: `/commands`}`, { query })
        return new this.cache.constructor(commands?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(command, options = {}) {
        const { cache = true, force = false } = options
        const commandId = command instanceof ApplicationCommand ? command.id : command
        if(!RegExes.SnowflakeRegExp.test(commandId)) throw new RangeError(`Invalid Application Command`)
        if(this.cache.has(commandId) && !force) return this.cache.get(commandId)
        command = await this.client.api.get(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands/${commandId}` : `/commands/${commandId}`}`)
        return this._add(command, { cache, force: true })
    }

    async create(options = {}) {
        const body = new SlashCommandBuilder(options).toJSON()
        const command = await this.client.api.post(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands` : `/commands`}`, { body })
        return this._add(command, { cache: true })
    }

    async edit(command, options = {}) {
        const commandId = command instanceof ApplicationCommand ? command.id : command
        if(!RegExes.SnowflakeRegExp.test(commandId) && !this.cache.has(commandId)) throw new RangeError(`Invalid Application Command`)
        const body = ApplicationCommandManager.modifyCommand(options)
        command = await this.client.api.patch(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands/${commandId}` : `/commands/${commandId}`}`, { body })
        return this._add(command, command.guild_id, { cache: true, force: true })
    } 

    async set(options) {
        const body = options?.map(o => new SlashCommandBuilder(o).toJSON())
        const commands = await this.client.api.put(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands` : `/commands`}`, { body })
        return new this.cache.constructor(commands?.map(o => [o.id, this._add(o, { cache: true })]))
    }

    async delete(command) {
        const commandId = command instanceof ApplicationCommand ? command.id : command
        if(!RegExes.SnowflakeRegExp.test(commandId) && !this.cache.has(commandId)) throw new RangeError(`Invalid Application Command`)
        command = this.cache.get(commandId)
        await this.client.api.delete(`${this.client.root}/applications/${this.client.user.id}${this.guildId ? `/guilds/${this.guildId}/commands/${commandId}` : `/commands/${commandId}`}`)
        return command ?? null
    }

    static modifyCommand(commands = {}) {
        return {
            type: commands.type,
            name: commands.name,
            name_localizations: commands.nameLocalizations,
            description: commands.description,
            description_localizations: commands.descriptionLocalizations,
            options: commands.options?.map(o => new SlashOptionBuilder(o).toJSON()),
            default_member_permissions: commands.defaultMemberPermissions?.toString(),
            dm_permission: commands.dmPermission,
            nsfw: commands.nsfw
        }
    }

}

module.exports = ApplicationCommandManager