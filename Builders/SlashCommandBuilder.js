const { ApplicationCommandTypesEnums } = require("../Util/Constants")
const Permissions = require("../Util/Permissions")
const SlashOptionBuilder = require("./SlashOptionBuilder")
const SlashSubCommandBuilder = require("./SlashSubCommandBuilder")
const SlashSubCommandGroupBuilder = require("./SlashSubCommandGroupBuilder")
class SlashCommandBuilder {
    constructor(data = {}) {
        this.type = data.type ?? 1
        this.name = data.name
        this.nameLocalizations = data.nameLocalizations ?? data.name_localizations
        this.description = data.description
        this.descriptionLocalizations = data.descriptionLocalizations ?? data.description_localizations
        this.options = data.options?.map(o => SlashCommandBuilder.transformOptions(o)) ?? []
        this.defaultMemberPermissions = data.defaultMemberPermissions ? new Permissions(BigInt(data.defaultMemberPermissions)).freeze() : undefined
        this.dmPermission = data.dmPermission ?? data.dm_permission
        this.nsfw = data.nsfw ?? false
    }

    setType(type) {
        this.type = type
        return this;
    }

    setName(name) {
        this.name = name
        return this;
    }

    setNameLocalizations(nameLocalizations) {
        this.nameLocalizations = nameLocalizations
        return this;
    }

    setDescription(description) {
        this.description = description
        return this;
    }

    setDescriptionLocalizations(descriptionLocalizations) {
        this.descriptionLocalizations = descriptionLocalizations
        return this;
    }

    addOptions(...options) {
        if(Array.isArray(options[0])) {
            options[0].map(o => this.options.push(SlashCommandBuilder.transformOptions(o)))
        } else {
            options.map(o => this.options.push(SlashCommandBuilder.transformOptions(o)))
        }

        return this
    }

    setOptions(...options) {
        if(Array.isArray(options[0])) {
            this.options = options[0].map(o => SlashCommandBuilder.transformOptions(o))
        } else {
            this.options = options.map(o => SlashCommandBuilder.transformOptions(o))
        }

        return this;
    }

    setDefaultMemberPermissions(permissions) {
        this.defaultMemberPermissions = new Permissions(permissions).freeze()
        return this;
    }

    setDmPermission(dmPermission) {
        this.dmPermission = dmPermission
        return this;
    }

    addSubcommands(subcommands = []) {
        subcommands.map(o => this.options.push(new SlashSubCommandBuilder(o).toJSON()))
        return this;
    }

    addSubCommandGroups(subcommandGroup = []) {
        subcommandGroup.map(o => this.options.push(new SlashSubCommandGroupBuilder(o).toJSON()))
        return this;
    }

    setNsfw(nsfw) {
        this.nsfw = nsfw
        return this;
    }

    static transformOptions(options = {}) {
        switch(options.type) {
            case 1:
                return new SlashSubCommandBuilder(options).toJSON()
            case 2:
                return new SlashSubCommandGroupBuilder(options).toJSON()
            default:
                return new SlashOptionBuilder(options).toJSON()
        }
    }

    validation() {
        if(!Object.values(ApplicationCommandTypesEnums).filter(o => o === this.type)?.length) throw new RangeError(`Invalid Application Command Type`)
        if((!this.name || !this.description) && this.type === ApplicationCommandTypesEnums.ChatInput) throw new RangeError(`Name and description are required`)
        if(this.options?.length > 0 && [ApplicationCommandTypesEnums.Message, ApplicationCommandTypesEnums.User].includes(this.type)) throw new RangeError(`Context Menu must not have options`)
        if(this.options?.length > 25) throw new RangeError(`Slash Option must be less than 25`)
        if(typeof (this.name || this.description) !== "string") throw new TypeError(`Name and description must be string`)
        if(typeof this.dmPermission !== "boolean" && this.dmPermission) throw new TypeError(`DmPermission must be boolean`)
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: this.type,
            name: this.name,
            name_localizations: this.nameLocalizations,
            description: this.description,
            description_localizations: this.descriptionLocalizations,
            options: this.options,
            default_member_permissions: this.defaultMemberPermissions?.toString(),
            dm_permission: this.dmPermission,
            nsfw: this.nsfw
        }
    }
}

module.exports = SlashCommandBuilder;