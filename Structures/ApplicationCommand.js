const Base = require("../Base/base");
const GuildApplicationCommandPermissionsManager = require("../Managers/GuildApplicationCommandPermissionsManager");
const Collection = require("../Util/Collection");
const { OptionTypesEnums } = require("../Util/Constants");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");
const SlashOption = require("./SlashOption");
const SlashSubCommandGroup = require("./SlashSubCommandGroup");
const SlashSubCommand = require("./SlashSubCommand");

class ApplicationCommand extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.type = data.type ?? null
        this.applicationId = data.application_id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.name = data.name ?? null
        this.nameLocalizations = data.name_localizations ?? null
        this.description = data.description ?? null
        this.descriptionLocalizations = data.description_localizations ?? null
        this.options = new Collection(data.options?.map(o => [o.name, ApplicationCommand.parseOptions(o)]))
        this.defaultMemberPermissions = new Permissions(data.default_member_permissions ? BigInt(data.default_member_permissions) : 0n).freeze()
        this.dmPermissions = data.dm_permissions ?? null
        this.version = data.version ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.permissions = new GuildApplicationCommandPermissionsManager(this.guildId, this.id, this.client)
        this.nsfw = data.nsfw ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        if(this.guildId) return await this.guild?.commands.fetch(this, options)
        else return await this.client.application.commands.fetch(this, options)
    }

    async edit(options = {}) {
        if(this.guildId) return await this.guild?.commands.edit(this, options)
        else return await this.client.application.commands.edit(this, options)
    }

    async delete() {
        if(this.guildId) return await this.guild?.commands.delete(this)
        else return await this.client.application.commands.delete(this)
    }

    static parseOptions(options = {}) {
        switch(options.type) {
            case OptionTypesEnums.SubCommand:
                return new SlashSubCommand(options)
            case OptionTypesEnums.SubCommandGroup:
                return new SlashSubCommandGroup(options)
            default:
                return new SlashOption(options)
        }
    }
}

module.exports = ApplicationCommand